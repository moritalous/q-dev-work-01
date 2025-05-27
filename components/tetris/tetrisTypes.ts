import { TETROMINOS } from "./tetrominos";

export type TETROMINO_TYPES = keyof typeof TETROMINOS;

export type CellType = [TETROMINO_TYPES | 0, string];

export type StageType = CellType[][];

export interface PlayerType {
  pos: {
    x: number;
    y: number;
  };
  tetromino: (string | 0)[][];
  collided: boolean;
}

export interface MoveType {
  x: number;
  y: number;
  collided: boolean;
}