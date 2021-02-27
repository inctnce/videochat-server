import Model from "./Model";

class Message extends Model {
	private text: string;
	private isChanged: boolean;
	private creatorId: string;
	private creatorNickname: string;
	private roomId: string;

	constructor(
		text: string,
		creatorId: string,
		creatorNickname: string,
		roomId: string,
		isEdited?: boolean,
		id?: string,
		creationDate?: Date
	) {
		super(id, creationDate);

		this.text = text;
		this.isChanged = !!isEdited;
		this.creatorId = creatorId;
		this.creatorNickname = creatorNickname;
		this.roomId = roomId;
	}

	Text(): string {
		return this.text;
	}

	IsEdited(): boolean {
		return this.isChanged;
	}

	CreatorId(): string {
		return this.creatorId;
	}

	CreatorNickname(): string {
		return this.creatorNickname;
	}

	RoomId(): string {
		return this.roomId;
	}
}

export default Message;
