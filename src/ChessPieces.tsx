import type { PieceBlueprintType } from 'meepl';

export enum ChessPieceType {
  rook = 'rook',
}

const activeStyle = {
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 10,
};

const availableStyle = {
  borderWidth: 2,
  borderColor: 'green',
  borderRadius: 5,
};

const ChessPieces: PieceBlueprintType[] = [
  {
    id: ChessPieceType.rook,
    asset: ChessPieceType.rook,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
];

export default ChessPieces;
