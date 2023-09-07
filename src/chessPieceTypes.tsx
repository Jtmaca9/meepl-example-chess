import type { PieceBlueprintType } from "meepl";

export enum ChessPieceType {
  w_rook = "w_rook",
  b_rook = "b_rook",
  w_pawn = "w_pawn",
  b_pawn = "b_pawn",
  w_knight = "w_knight",
  b_knight = "b_knight",
  w_bishop = "w_bishop",
  b_bishop = "b_bishop",
  w_queen = "w_queen",
  b_queen = "b_queen",
  w_king = "w_king",
  b_king = "b_king",
}

const activeStyle = {
  shadowColor: "black",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 10,
};

const availableStyle = {};

const ChessPieces: PieceBlueprintType[] = [
  {
    id: ChessPieceType.w_rook,
    asset: ChessPieceType.w_rook,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
  {
    id: ChessPieceType.b_rook,
    asset: ChessPieceType.b_rook,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
  {
    id: ChessPieceType.w_pawn,
    asset: ChessPieceType.w_pawn,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
  {
    id: ChessPieceType.b_pawn,
    asset: ChessPieceType.b_pawn,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
  {
    id: ChessPieceType.w_knight,
    asset: ChessPieceType.w_knight,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
  {
    id: ChessPieceType.b_knight,
    asset: ChessPieceType.b_knight,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
  {
    id: ChessPieceType.w_bishop,
    asset: ChessPieceType.w_bishop,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
  {
    id: ChessPieceType.b_bishop,
    asset: ChessPieceType.b_bishop,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
  {
    id: ChessPieceType.w_queen,
    asset: ChessPieceType.w_queen,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
  {
    id: ChessPieceType.b_queen,
    asset: ChessPieceType.b_queen,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
  {
    id: ChessPieceType.w_king,
    asset: ChessPieceType.w_king,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
  {
    id: ChessPieceType.b_king,
    asset: ChessPieceType.b_king,
    width: 45,
    height: 45,
    activeStyle,
    availableStyle,
  },
];

export default ChessPieces;
