import "./preStart"; // Must be the first import
import Server from "./Server";
import router from "./routes";

import dotenv from "dotenv";
dotenv.config();

const whitelist = ["http://localhost:3000", "https://inctnce-videochat-client.herokuapp.com"];
const server = new Server(whitelist, router);
const port = Number(process.env.PORT || 8000);
server.start(port);
