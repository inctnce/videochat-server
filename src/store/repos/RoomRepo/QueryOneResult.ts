import Room from "@models/Room";

type QueryOneResult = {
	room?: Room;
	error?: Error;
};

export default QueryOneResult;
