import Model from "./Model";
import Message from "./Message";

class Room extends Model {
  private name: string;
  private messages: Message[];
  private numOfUsers: number;
  private creatorId: string;

  constructor(
    name: string,
    messages: Message[],
    numOfUsers: number,
    creatorId: string,
    id?: string,
    creationDate?: Date
  ) {
    super(id, creationDate);
    this.name = name;
    this.messages = messages;
    this.numOfUsers = numOfUsers;
    this.creatorId = creatorId;
  }

  Name(): string {
    return this.name;
  }

  Messages(): Message[] {
    return this.messages;
  }

  NumOfUsers(): number {
    return this.numOfUsers;
  }

  CreatorId(): string {
    return this.creatorId;
  }

  UpdateNumOfUsers(n: number) {
    this.numOfUsers = n;
  }
}

export default Room;
