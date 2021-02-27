import "./preStart";
import Server from "./Server";
import router from "./routes";

const whitelist = ["http://localhost:3000", "https://inctnce-videochat-client.herokuapp.com"];
const server = new Server(whitelist, router);
const port = Number(process.env.PORT || 8000);
server.start(port);
