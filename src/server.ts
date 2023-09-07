import { Server, Origins } from "boardgame.io/server";
import ChessGame from "./gameConfig/gameConfig";

const server = Server({
  games: [ChessGame],
  origins: [/\.+/],
});

server.run(8000);
