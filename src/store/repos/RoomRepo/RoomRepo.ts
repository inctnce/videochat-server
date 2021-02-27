import Room from "@models/Room";
import messageRepo from "@repos/MessageRepo";
import Repo from "@repos/Repo";

import IRepo from "../IRepo";
import QueryOneResult from "./QueryOneResult";
import QueryResult from "./QueryResult";

class RoomRepo extends Repo implements IRepo {
  private static instance: RoomRepo;

  constructor() {
    super();

    if (RoomRepo.instance) {
      return this;
    }
    RoomRepo.instance = this;
  }

  async create(room: Room): Promise<QueryResult> {
    const query = `INSERT INTO rooms VALUES("${room.Id()}", "${room.Name()}", "${room.CreatorId()}","${room.convertDateToMySQLFormat()}", "${room.NumOfUsers()}")`;
    const { result, error } = await this.db.query(query);

    if (error) {
      console.log(error);
      return { rooms: undefined, error: error };
    }

    return {};
  }

  async read(): Promise<QueryResult> {
    const query = "SELECT * FROM rooms";
    const { result, error } = await this.db.query(query);

    if (error) {
      return { rooms: undefined, error: new Error("error getting room") };
    }

    const rooms: Room[] = [];
    result!.forEach((r) => {
      rooms.push(new Room(r.name, [], 0, r.creatorId, r.id, r.creationDate));
    });

    return { rooms: rooms, error: undefined };
  }

  async readOne(key: string, field: string): Promise<QueryOneResult> {
    const query: string = "SELECT * FROM rooms WHERE " + `${field}` + "=" + `"${key}"`;
    const room = await this.db.query(query);

    if (room.error) {
      return { room: undefined, error: new Error("error getting room") };
    }

    if (room.result![0]) {
      const { messages, error } = await messageRepo.readOne(room.result![0].id);

      if (error) {
        return { room: undefined, error: error };
      }

      const r: Room = new Room(room.result![0].name, messages!, room.result![0].numOfUsers, room.result![0].creatorId);
      return { room: r };
    }

    return { error: new Error("room not found") };
  }

  async update(id: string, value: string, field: string): Promise<QueryResult> {
    const query = `UPDATE rooms SET \`${field}\` = "${value}" WHERE id = "${id}"`;
    const { error } = await this.db.query(query);

    if (error) {
      return { rooms: undefined, error: new Error("error updating room") };
    }

    return {};
  }

  async delete(id: string): Promise<QueryResult> {
    const query = `DELETE FROM rooms WHERE id = "${id}"`;
    const { error } = await this.db.query(query);

    if (error) {
      return { error: new Error("error deleting room") };
    }

    return {};
  }

  async doesExist(name: string): Promise<boolean> {
    const { room } = await this.readOne(name, "name");

    return !!room;
  }
}

export default RoomRepo;
