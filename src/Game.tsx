import React, { useEffect } from "react";
import {
  Table,
  Board,
  UI,
  PieceRenderer,
  ZoneRenderer,
  GameViewWrapper,
  useGameState,
} from "meepl";
import assets from "./assets";
import { isZoneAvailable } from "./gameLogic";
import ChessPieces from "./chessPieceTypes";
import Test from "./test";

export default function Game(props) {
  const { moves, handleMove, players, meta, pieces, zones } =
    useGameState(props);

  const availableStyle = {
    backgroundColor: "rgba(0, 0, 200, 0.5)",
  };

  return (
    <GameViewWrapper
      pieceTypes={ChessPieces}
      assets={assets}
      //state
      zones={zones}
      pieces={pieces}
      currentPlayer={meta.currentPlayer}
      players={players}
      isCurrentPlayer={meta.isCurrentPlayer}
    >
      <Table tableWidth={400} tableHeight={400}>
        <Board height={400} width={400} asset={"Chessboard"} />
        <ZoneRenderer
          isZoneAvailable={isZoneAvailable}
          availableStyle={availableStyle}
          onHandleZonePress={(id) => handleMove(moves.movePiece, [id])}
        />
        <PieceRenderer
          legalMoveCheck={(targetZoneId) =>
            isZoneAvailable({
              id: targetZoneId,
              activePlayer: players[meta.currentPlayerID],
              pieces: pieces,
              zones: zones,
            })
          }
          setActive={(id) => handleMove(moves.setActivePiece, [id])}
          movePiece={(id) => handleMove(moves.movePiece, [id])}
        />
      </Table>
      <UI>
        {players[meta.currentPlayerID].name}'s turn! Active Piece:{" "}
        {players[meta.currentPlayerID].activePiece}
      </UI>
    </GameViewWrapper>
  );
}
