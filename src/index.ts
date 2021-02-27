import "./preStart"; // Must be the first import
import server from "@server";

// Start the server
const port = Number(process.env.PORT || 8000);
server.start(port);
