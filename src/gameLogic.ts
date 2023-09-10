import type { PieceType, ZoneType } from "meepl";
import { ChessPieceType } from "./chessPieceTypes";

export function isZoneAvailable({
  id,
  activePlayer,
  pieces,
  zones,
}: {
  id: string;
  activePlayer: any;
  pieces: PieceType[];
  zones: ZoneType[];
}): boolean {
  const activePiece = pieces.find((p) => p.id === activePlayer.activePiece);

  if (!activePiece) return false;

  const currZone = zones.find((z) => z.id === activePiece.currZoneId);
  const targetZone = zones.find((z) => z.id === id);

  switch (activePiece.type) {
    case ChessPieceType.w_rook:
    case ChessPieceType.b_rook:
      return isZoneAvailableForRook({
        currZone,
        targetZone,
        activePlayer,
        zones,
        pieces,
      });
    case ChessPieceType.w_pawn:
    case ChessPieceType.b_pawn:
      return isZoneAvailableForPawn({
        currZone,
        targetZone,
        activePlayer,
        pieces,
        zones,
      });
    case ChessPieceType.w_knight:
    case ChessPieceType.b_knight:
      return isZoneAvailableForKnight({
        currZone,
        targetZone,
        activePlayer,
        pieces,
      });
    case ChessPieceType.w_bishop:
    case ChessPieceType.b_bishop:
      return isZoneAvailableForBishop({
        currZone,
        targetZone,
        activePlayer,
        pieces,
        zones,
      });
    case ChessPieceType.w_queen:
    case ChessPieceType.b_queen:
      return isZoneAvailableForQueen({
        currZone,
        targetZone,
        activePlayer,
        pieces,
        zones,
      });
    case ChessPieceType.w_king:
    case ChessPieceType.b_king:
      return isZoneAvailableForKing({
        currZone,
        targetZone,
        activePlayer,
        pieces,
      });
    default:
      return false;
  }
}

function isZoneAvailableForRook({
  currZone,
  targetZone,
  activePlayer,
  pieces,
  zones,
}: {
  currZone: ZoneType;
  targetZone: ZoneType;
  activePlayer: any;
  pieces: PieceType[];
  zones: ZoneType[];
}): boolean {
  const {
    meta: { gridX: currX, gridY: currY },
  } = currZone;
  const {
    meta: { gridX: targetX, gridY: targetY },
  } = targetZone;

  if (currX === targetX || currY === targetY) {
    const isPieceBetween =
      currX === targetX
        ? pieces.some(({ currZoneId }) => {
            const zone = zones.find((z) => z.id === currZoneId);
            const { gridX, gridY } = zone.meta;
            return (
              gridX === currX &&
              gridY > Math.min(currY, targetY) &&
              gridY < Math.max(currY, targetY)
            );
          })
        : pieces.some(({ currZoneId }) => {
            const zone = zones.find((z) => z.id === currZoneId);
            const { gridX, gridY } = zone.meta;
            return (
              gridY === currY &&
              gridX > Math.min(currX, targetX) &&
              gridX < Math.max(currX, targetX)
            );
          });
    if (!isPieceBetween) {
      const pieceOnTarget = pieces.find(
        ({ currZoneId }) => currZoneId === targetZone.id
      );
      if (!pieceOnTarget || pieceOnTarget.owner !== activePlayer.id)
        return true;
    }
  }
  return false;
}

function isZoneAvailableForPawn({
  currZone,
  targetZone,
  activePlayer,
  pieces,
  zones,
}: {
  currZone: ZoneType;
  targetZone: ZoneType;
  activePlayer: any;
  pieces: PieceType[];
  zones: ZoneType[];
}): boolean {
  const {
    meta: { gridX: currX, gridY: currY },
  } = currZone;
  const {
    meta: { gridX: targetX, gridY: targetY },
  } = targetZone;

  const isWhite = activePlayer.id === "0";
  const direction = isWhite ? -1 : 1;
  const isInitialPosition = isWhite ? currY === 6 : currY === 1;
  const isOneStepForward = targetY === currY + direction && targetX === currX;
  const isTwoStepsForward =
    isInitialPosition && targetY === currY + 2 * direction && targetX === currX;
  const isCapture =
    Math.abs(targetX - currX) === 1 &&
    targetY === currY + direction &&
    pieces.some(
      (piece) =>
        piece.currZoneId === targetZone.id && piece.owner !== activePlayer.id
    );
  const isPieceInFront = pieces.some(
    (piece) =>
      piece.currZoneId ===
      zones.find(
        (z) => z.meta.gridX === currX && z.meta.gridY === currY + direction
      )?.id
  );

  return (
    (!isPieceInFront && (isOneStepForward || isTwoStepsForward)) || isCapture
  );
}

function isZoneAvailableForKnight({
  currZone,
  targetZone,
  activePlayer,
  pieces,
}: {
  currZone: ZoneType;
  targetZone: ZoneType;
  activePlayer: any;
  pieces: PieceType[];
}): boolean {
  const {
    meta: { gridX: currX, gridY: currY },
  } = currZone;
  const {
    meta: { gridX: targetX, gridY: targetY },
  } = targetZone;

  const dx = Math.abs(targetX - currX);
  const dy = Math.abs(targetY - currY);

  if ((dx === 1 && dy === 2) || (dx === 2 && dy === 1)) {
    const pieceOnTarget = pieces.find(
      ({ currZoneId }) => currZoneId === targetZone.id
    );
    if (!pieceOnTarget || pieceOnTarget.owner !== activePlayer.id) {
      return true;
    }
  }

  return false;
}

function isZoneAvailableForBishop({
  currZone,
  targetZone,
  activePlayer,
  pieces,
  zones,
}: {
  currZone: ZoneType;
  targetZone: ZoneType;
  activePlayer: any;
  pieces: PieceType[];
  zones: ZoneType[];
}): boolean {
  const {
    meta: { gridX: currX, gridY: currY },
  } = currZone;
  const {
    meta: { gridX: targetX, gridY: targetY },
  } = targetZone;

  const dx = Math.abs(targetX - currX);
  const dy = Math.abs(targetY - currY);

  if (dx === dy) {
    const pieceOnTarget = pieces.find(
      ({ currZoneId }) => currZoneId === targetZone.id
    );
    if (!pieceOnTarget || pieceOnTarget.owner !== activePlayer.id) {
      const xDir = targetX > currX ? 1 : -1;
      const yDir = targetY > currY ? 1 : -1;
      for (
        let x = currX + xDir, y = currY + yDir;
        x !== targetX;
        x += xDir, y += yDir
      ) {
        const zone = zones.find(
          (z) => z.meta.gridX === x && z.meta.gridY === y
        );
        const pieceOnZone = pieces.find(
          ({ currZoneId }) => currZoneId === zone.id
        );
        if (pieceOnZone) {
          return false;
        }
      }
      return true;
    }
  }

  return false;
}

function isZoneAvailableForQueen({
  currZone,
  targetZone,
  activePlayer,
  pieces,
  zones,
}: {
  currZone: ZoneType;
  targetZone: ZoneType;
  activePlayer: any;
  pieces: PieceType[];
  zones: ZoneType[];
}): boolean {
  return (
    isZoneAvailableForRook({
      currZone,
      targetZone,
      activePlayer,
      pieces,
      zones,
    }) ||
    isZoneAvailableForBishop({
      currZone,
      targetZone,
      activePlayer,
      pieces,
      zones,
    })
  );
}

function isZoneAvailableForKing({
  currZone,
  targetZone,
  activePlayer,
  pieces,
}: {
  currZone: ZoneType;
  targetZone: ZoneType;
  activePlayer: any;
  pieces: PieceType[];
}): boolean {
  const {
    meta: { gridX: currX, gridY: currY },
  } = currZone;
  const {
    meta: { gridX: targetX, gridY: targetY },
  } = targetZone;

  const dx = Math.abs(targetX - currX);
  const dy = Math.abs(targetY - currY);

  if (dx <= 1 && dy <= 1) {
    const pieceOnTarget = pieces.find(
      ({ currZoneId }) => currZoneId === targetZone.id
    );
    if (!pieceOnTarget || pieceOnTarget.owner !== activePlayer.id) {
      return true;
    }
  }

  return false;
}

export function isKingInCheck({
  playerId,
  pieces,
  zones,
}: {
  playerId: string;
  pieces: PieceType[];
  zones: ZoneType[];
}): boolean {
  const kingPiece = pieces.find(
    ({ owner, type }) =>
      owner === playerId &&
      (type === ChessPieceType.w_king || type === ChessPieceType.b_king)
  );
  if (!kingPiece) {
    return false;
  }

  const kingZone = zones.find((z) => z.id === kingPiece.currZoneId);
  const opponentPieces = pieces.filter(({ owner }) => owner !== playerId);

  for (const piece of opponentPieces) {
    if (
      piece.type !== ChessPieceType.w_king &&
      piece.type !== ChessPieceType.b_king &&
      isZoneAvailable({
        id: kingZone.id,
        activePlayer: { id: playerId, activePiece: piece.id },
        pieces,
        zones,
      })
    ) {
      return true;
    }
  }

  return false;
}
