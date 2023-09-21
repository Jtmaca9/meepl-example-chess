import { createGameConfig } from "meepl/lib/commonjs/Game/gameConfig";
import { createGridZones } from "meepl/lib/commonjs/Zone/createGridZones";
import { MOVE_ERROR } from "meepl/lib/commonjs/Game/state";
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
  movePiece: ({ G, player, events }, activePieceID, zoneId) => {
    let moveSuccessful = false;
    const currPlayer = player.get();
    const piece = G.pieces.find((p) => p.id === activePieceID);
    if (!piece) return MOVE_ERROR.INVALID_MOVE;
    if (
      isZoneAvailable(activePieceID, {
        id: zoneId,
        activePlayer: currPlayer,
        pieces: G.pieces,
        zones: G.zones,
      })
    ) {
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
  },
};

const ChessGame = createGameConfig({
  name: "Chess",
  zones,
  pieces,
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
