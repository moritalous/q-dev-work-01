"use client";

import { memo } from "react";
import { TETROMINOS } from "./tetrominos";

interface CellProps {
  type: keyof typeof TETROMINOS | 0;
}

export const Cell = memo(({ type }: CellProps) => {
  return (
    <div
      className="w-full h-full"
      style={{
        background: `rgba(${type === 0 ? '0,0,0,0.1' : TETROMINOS[type].color})`,
        border: type === 0 ? '0px solid' : '4px solid',
        borderBottomColor: `rgba(${type === 0 ? '0,0,0,0.1' : TETROMINOS[type].color}, 0.1)`,
        borderRightColor: `rgba(${type === 0 ? '0,0,0,0.1' : TETROMINOS[type].color}, 1)`,
        borderTopColor: `rgba(${type === 0 ? '0,0,0,0.1' : TETROMINOS[type].color}, 1)`,
        borderLeftColor: `rgba(${type === 0 ? '0,0,0,0.1' : TETROMINOS[type].color}, 0.3)`,
      }}
    />
  );
});