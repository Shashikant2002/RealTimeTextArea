import express from "express";
const app = express();
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Server is Fine !!",
  });
});

const server = new http.createServer(app);

const IO = new Server(server);

const id = [];
let filterMe = (input) =>
  id.filter((ele) => {
    if (ele != input) {
      return ele;
    }
  });

IO.on("connection", (socket) => {
  id.push(socket.id);

  socket.on("CHANGE", (data) => {
    console.log(filterMe(socket.id));

    for (let user of filterMe(socket.id)) {
      socket.to(user).emit("DATA", { data, id });
    }
  });
});

const port = process.env.port || 5000;

server.listen(port, () => {
  console.log("working fine " + port);
});
