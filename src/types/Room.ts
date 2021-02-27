import MessageT from "./Message";

type RoomT = {
	id: string;
	creationDate: string;
	name: string;
	messages: MessageT[];
	numOfUsers: number;
	creatorId: string;
};

export default RoomT;
