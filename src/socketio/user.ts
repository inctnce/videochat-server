type User = {
	id: string;
	name: string;
	roomId: string;
	socketId: string;
};

type Response = {
	user?: User;
	error?: Error;
};

const users: User[] = [];

function add(id: string, name: string, roomId: string, socketId: string): Response {
	const existingUser = users.find((user) => user.id === id && user.roomId === roomId);

	if (existingUser) {
		return { user: existingUser };
	}

	const existingSocket = users.find((user) => user.socketId === socketId && user.roomId === roomId && user.id === id);
	if (existingSocket) {
		return { error: new Error("user is already in the room") };
	}

	users.push({ id: id, name: name, roomId: roomId, socketId: socketId });
	return { user: { id, name, roomId, socketId } };
}

function remove(socketId: string): User | undefined {
	const index = users.findIndex((user) => user.socketId === socketId);

	if (index !== -1) return users.splice(index, 1)[0];
}

function get(socketId: string): User | undefined {
	return users.find((user) => user.socketId === socketId);
}

function getInRoom(roomId: string): User[] {
	return users.filter((user) => user.roomId === roomId);
}

function getNumInRoom(roomId: string): number {
	let result = 0;
	users.forEach((user: User) => {
		if (user.roomId === roomId) {
			result++;
		}
	});

	return result;
}

const user = { add, remove, get, getInRoom, getNumInRoom };

export default user;
