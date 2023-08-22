import socketio from "socket.io-client";
import io from "socket.io-client";
import { serverApi } from "../../lib/config";

export const socket = socketio.connect(serverApi);
export const SocketContext = React.createContext();
