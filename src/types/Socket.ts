import { Socket } from "socket.io-client";

export type SocketContextType = {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket>>;
};
