"use client";

import { useCallback, useEffect, useState } from "react";
import { GameBoard } from "./GameBoard";
import { GameControls } from "./GameControls";
import { GameStats } from "./GameStats";
import { useGameStatus } from "./hooks/useGameStatus";
import { useInterval } from "./hooks/useInterval";
import { usePlayer } from "./hooks/usePlayer";
import { useStage } from "./hooks/useStage";
import { checkCollision, createStage } from "./tetrisUtils";

export const TetrisGame = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const movePlayer = (dir: number) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ code }: KeyboardEvent) => {
    if (!gameOver) {
      if (code === 'ArrowDown') {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = useCallback(({ code }: KeyboardEvent) => {
    if (!gameOver) {
      if (code === 'ArrowLeft') {
        movePlayer(-1);
      } else if (code === 'ArrowRight') {
        movePlayer(1);
      } else if (code === 'ArrowDown') {
        dropPlayer();
      } else if (code === 'ArrowUp') {
        playerRotate(stage, 1);
      }
    }
  }, [gameOver, movePlayer, dropPlayer, playerRotate, stage]);

  useEffect(() => {
    window.addEventListener('keydown', move);
    window.addEventListener('keyup', keyUp);
    return () => {
      window.removeEventListener('keydown', move);
      window.removeEventListener('keyup', keyUp);
    };
  }, [move, keyUp]);

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-4xl">
      <div className="flex flex-col items-center">
        <GameBoard stage={stage} />
        {gameOver && (
          <div className="mt-4 text-xl font-bold text-destructive">Game Over!</div>
        )}
      </div>
      <div className="flex flex-col gap-8">
        <GameStats score={score} rows={rows} level={level} />
        <GameControls startGame={startGame} />
      </div>
    </div>
  );
};