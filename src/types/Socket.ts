import { Socket } from "socket.io-client";

export type SocketContextType = {
  socket: Socket | null;
  isSocketConnected: boolean;
};
