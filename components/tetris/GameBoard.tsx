"use client";

import { Cell } from "./Cell";
import { StageType } from "./tetrisTypes";

interface GameBoardProps {
  stage: StageType;
}

export const GameBoard = ({ stage }: GameBoardProps) => (
  <div 
    className="grid border-2 border-gray-700 bg-black/20 relative"
    style={{ 
      gridTemplateRows: `repeat(${stage.length}, 1fr)`,
      gridTemplateColumns: `repeat(${stage[0].length}, 1fr)`,
      gap: '1px',
      width: '300px',
      height: '600px'
    }}
  >
    {stage.map((row, y) =>
      row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell[0]} />)
    )}
  </div>
);