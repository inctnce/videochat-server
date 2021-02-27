import "../store/db/Database";

import router from "../routes";

import dotenv from "dotenv";
import Server from "./Server";
dotenv.config();

const whitelist = ["http://localhost:3000", "https://inctnce-videochat-client.herokuapp.com"];
const server = new Server(whitelist, router);

// Export express instance
export default server;
