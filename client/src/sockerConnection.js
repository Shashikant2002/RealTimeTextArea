import { io } from "socket.io-client";
import { baseUrl } from "../config";

export const initSocketMain = async () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: "10000",
    transports: ["websocket"],
  };

  return io(baseUrl, options);
};
