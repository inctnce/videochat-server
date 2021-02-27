import Server from "./Server";

import "../store/db/Database";

import dotenv from "dotenv";

import router from "../routes";
dotenv.config();

const whitelist = ["http://localhost:3000", "https://inctnce-videochat-client.herokuapp.com"];
const server = new Server(whitelist, router);

// Export express instance
export default server;
