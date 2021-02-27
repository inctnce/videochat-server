import verifyToken from "@middlewares/verifyToken";
import { Router } from "express";
import Store from "@store";
import Room from "@models/Room";

const roomRouter: Router = Router();

roomRouter.post("/create", verifyToken, async (req, res) => {
	const name: string = req.body.name;
	const doesExist: boolean = await Store.Room().doesExist(name);

	if (doesExist) {
		return res.status(409).send({ error: "room already exists" });
	}

	const creatorId: string = req.body.creatorId;

	const newRoom: Room = new Room(name, [], 0, creatorId);

	const { error } = await Store.Room().create(newRoom);
	if (error) {
		return res.status(503).send({ error: "cannot create room" });
	}

	return res.status(201).send(newRoom);
});

roomRouter.get("/get", async (req, res) => {
	const { rooms: room, error } = await Store.Room().read();

	if (error) {
		return res.status(503).send(error);
	}

	return res.status(200).send(room);
});

roomRouter.get("/get/:id", verifyToken, async (req, res) => {
	const id: string = req.params.id;
	const { room, error } = await Store.Room().readOne(id, "id");

	if (error) {
		return res.status(503).send(error);
	}

	return res.status(200).send(room);
});

roomRouter.delete("/delete/:id", verifyToken, async (req, res) => {
	const id: string = req.params.id;
	const { error } = await Store.Room().delete(id);

	if (error) {
		return res.status(503).send(error);
	}

	return res.sendStatus(200);
});

export default roomRouter;
