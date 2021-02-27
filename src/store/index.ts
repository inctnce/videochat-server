import MessageRepo from "@repos/MessageRepo/MessageRepo";
import RoomRepo from "@repos/RoomRepo/RoomRepo";
import UserRepo from "@repos/UserRepo/UserRepo";

class Store {
  User(): UserRepo {
    return new UserRepo();
  }

  Message(): MessageRepo {
    return new MessageRepo();
  }

  Room(): RoomRepo {
    return new RoomRepo();
  }
}

export default new Store();
