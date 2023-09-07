import type { ZoneType } from 'meepl';
import { ChessPieceType } from './ChessPieces';

export function isZoneAvailable(id: string, player: any, args: any): boolean {
  const { G } = args;
  const activePlayer = player;
  const activePiece = G.pieces.find((p) => p.id === activePlayer.activePiece);

  if (!activePiece) return false;

  const currZone = G.zones.find((z) => z.id === activePiece.currZoneId);
  const targetZone = G.zones.find((z) => z.id === id);

  switch (activePiece.type) {
    case ChessPieceType.rook:
      return isZoneAvailableForRook(currZone, targetZone, activePlayer, G);
    default:
      return false;
  }
}

function isZoneAvailableForRook(
  currZone: ZoneType,
  targetZone: ZoneType,
  activePlayer: any,
  G: any
): boolean {
  const {
    meta: { gridX: currX, gridY: currY },
  } = currZone;
  const {
    meta: { gridX: targetX, gridY: targetY },
  } = targetZone;

  const zones = G.zones;
  const pieces = G.pieces;

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
