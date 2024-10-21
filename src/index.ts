import express from "express";
import { createServer } from "http";
import path from "path";
import realtimeServer from "./realtimeServer";
import router from "./routes";

const app = express();
const httpServer = createServer(app);

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));

// Routes
app.use(router);

// Public
app.use(express.static(path.join(__dirname, "public")));

httpServer.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

// Call the realtime server
realtimeServer(httpServer);
