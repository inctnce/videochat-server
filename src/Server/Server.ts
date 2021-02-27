import cors from "cors";
import express from "express";
import { Router } from "express";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import { Socket } from "socket.io";
import userio from "@socketio/user";
import Message from "@models/Message";
import MessageT from "../types/Message";
import Store from "@store";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const socketio = require("socket.io");

class Server {
	private server;
	private io: Socket;

	constructor(whitelist: string[], router: Router) {
		const app = express();
		this.server = http.createServer(app);

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(cors());
		app.use("/", router);

		// Show routes called in console during development
		if (process.env.NODE_ENV === "development") {
			app.use(morgan("dev"));
		}

		// Security
		if (process.env.NODE_ENV === "production") {
			app.use(helmet());
		}

		const options = {
			cors: true,
			origins: whitelist,
			transports: ["websocket", "polling", "flashsocket"],
		};

		this.io = socketio(this.server, options);
	}

	private listen(port: number) {
		this.server.listen(port, () => {
			console.log("Express server started on port: " + port);
		});
	}

	start(port: number) {
		this.listen(port);

		this.io.on("connect", (socket: Socket) => {
			console.log("new connection", socket.id);
			socket.emit("connection", null);

			this.onJoin(socket);

			this.onSendMessage(socket);

			socket.on("signal", (data) => {
				this.io.to(data.room).emit("desc", data.desc);
			});

			this.onDisconnect(socket);
		});
	}

	private onJoin(socket: Socket) {
		socket.on("join", async ({ id, name, roomId }, callback: any) => {
			const { user, error } = userio.add(id, name, roomId, socket.id);

			if (error) return callback(error);

			await this.emitSetRoom(socket.id, roomId);

			socket.broadcast
				.to(user!.roomId)
				.emit("message", new Message(`пользователь ${name} присоединился к беседе`, "admin", "admin", roomId));

			this.broadcastEmitNumOfUsers(socket, roomId);

			socket.join(user!.roomId);
		});
	}

	private async emitSetRoom(socketId: string, roomId: string) {
		const { room, error } = await Store.Room().readOne(roomId, "id");
		room!.UpdateNumOfUsers(userio.getNumInRoom(roomId));

		this.io.to(socketId).emit("setRoom", room);
	}

	private onSendMessage(socket: Socket) {
		socket.on("sendMessage", (m: MessageT, callback: any) => {
			const message: Message = new Message(
				m.text,
				m.creatorId,
				m.creatorNickname,
				m.roomId,
				m.isEdited,
				m.id,
				m.creationDate
			);

			Store.Message().create(message);
			this.emitMessage(message);
		});
	}

	private emitMessage(message: Message) {
		this.io.to(message.RoomId()).emit("message", message);
	}

	private broadcastEmitNumOfUsers(socket: Socket, roomId: string) {
		const numOfUsers: number = userio.getNumInRoom(roomId);
		socket.broadcast.to(roomId).emit("updateNumOfUsers", numOfUsers);
	}

	private onDisconnect(socket: Socket) {
		socket.on("disconnect", () => {
			const user = userio.remove(socket.id);

			if (user) {
				this.broadcastEmitNumOfUsers(socket, user.roomId);
				this.emitMessage(new Message(`пользователь ${user.name} покинул беседу`, "admin", "admin", user.roomId));
			}

			console.log("disconnected");
		});
	}
}

export default Server;
