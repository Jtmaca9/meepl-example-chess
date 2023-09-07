import { Server, Origins } from "boardgame.io/server";
import ChessGame from "./gameConfig";

const server = Server({
  games: [ChessGame],
  origins: [Origins.LOCALHOST],
});

server.run(8000);
