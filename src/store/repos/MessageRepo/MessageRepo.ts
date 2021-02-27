import Message from "@models/Message";
import IRepo from "@repos/IRepo";
import Repo from "@repos/Repo";
import QueryOneResult from "./QueryOneResult";
import QueryResult from "./QueryResult";

class MessageRepo extends Repo implements IRepo {
	private static instance: MessageRepo;

	constructor() {
		super();

		if (MessageRepo.instance) {
			return this;
		}

		MessageRepo.instance = this;
	}

	async readOne(roomId: string): Promise<QueryResult> {
		const query = `SELECT messages.id,  messages.text, messages.roomId, messages.creatorId, users.nickname AS creatorNickname, messages.isEdited, messages.creationDate  FROM messages JOIN users ON messages.creatorId = users.id WHERE messages.roomId = "${roomId}"`;
		const { result, error } = await this.db.query(query);
		if (error) {
			return { messages: undefined, error: new Error(`error getting messages for room ${roomId}`) };
		}

		if (result) {
			const messages: Message[] = [];
			result.forEach((m) => {
				messages.push(new Message(m.text, m.creatorId, m.creatorNickname, m.roomId, m.isEdited, m.id, m.creationDate));
			});
			messages.sort((a: Message, b: Message) => (a.CreationDate() > b.CreationDate() ? 1 : -1));

			return { messages, error: undefined };
		}

		return {};
	}

	async update(id: string, newText: string): Promise<QueryResult> {
		const query = `UPDATE messages SET \`text\` = "${newText}" WHERE id = "${id}"`;
		const { error } = await this.db.query(query);

		if (error) {
			return { messages: undefined, error: new Error(`error updating message with id ${id}`) };
		}

		return {};
	}

	async create(message: Message): Promise<QueryOneResult> {
		const query = `INSERT INTO messages VALUES("${message.Id()}", "${message.Text()}", "${message.CreatorId()}", "${message.RoomId()}", "${message.IsEdited()}", "${message.CreationDate()}")`;
		const { error } = await this.db.query(query);
		if (error) {
			return { error: new Error("error creating message") };
		}

		return {};
	}
	async delete(id: string): Promise<QueryResult> {
		const query = `DELETE FROM messages WHERE id = ${id}`;
		const { error } = await this.db.query(query);
		if (error) {
			return { error: new Error("error deleting user") };
		}

		return {};
	}
}

export default MessageRepo;
