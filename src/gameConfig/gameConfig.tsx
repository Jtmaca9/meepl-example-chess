import { createGameConfig } from "meepl/lib/commonjs/Game/gameConfig";
import { createGridZones } from "meepl/lib/commonjs/Zone/utils";
import { MOVE_ERROR } from "meepl/lib/commonjs/Game/actions";
import ChessPieces from "../chessPieceTypes";
import pieces from "./pieces";
import { isZoneAvailable } from "../gameLogic";

const zones = createGridZones({
  rows: 8,
  columns: 8,
  gridSize: 45,
  offsetX: 20,
  offsetY: 20,
});

const moves = {
  // @ts-ignore
  setActivePiece: ({ G, ctx, player }, pieceId) => {
    if (G.pieces.find((p) => p.id === pieceId).owner !== ctx.currentPlayer)
      return MOVE_ERROR.INVALID_MOVE;
    player.set({
      ...player.get(),
      activePiece: pieceId,
    });
  },
  // @ts-ignore
  movePiece: ({ G, player, events }, zoneId) => {
    let moveSuccessful = false;
    const currPlayer = player.get();
    const piece = G.pieces.find((p) => p.id === currPlayer.activePiece);
    if (!piece) return MOVE_ERROR.INVALID_MOVE;
    if (isZoneAvailable(zoneId, currPlayer, { G })) {
      const pieceOnZone = G.pieces.find((p) => p.currZoneId === zoneId);
      // take piece
      if (pieceOnZone) {
        G.pieces = G.pieces.filter((p) => p.id !== pieceOnZone.id);
        player.set({
          ...currPlayer,
          takenPieces: [...currPlayer.takenPieces, pieceOnZone],
        });
      }
      // move piece
      piece.currZoneId = zoneId;
      moveSuccessful = true;
      events.endTurn();
    }
    player.set({
      ...currPlayer,
      activePiece: null,
    });
    return moveSuccessful ? undefined : MOVE_ERROR.INVALID_MOVE;
  },
};

const ChessGame = createGameConfig({
  name: "Chess",
  zones,
  pieces,
  pieceTypes: ChessPieces,
  moves,
  minPlayers: 1,
  maxPlayers: 2,
  undoAllowed: true,
  playerView: (players) => players,
  playerSetup: (playerID) => ({
    name: `Player ${playerID}`,
    id: playerID,
    activePiece: null,
    takenPieces: [],
  }),
});

export default ChessGame;
