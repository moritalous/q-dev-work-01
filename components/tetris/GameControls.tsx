"use client";

import { cn } from "@/lib/utils";

interface GameControlsProps {
  startGame: () => void;
}

export const GameControls = ({ startGame }: GameControlsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={startGame}
        className={cn(
          "px-6 py-3 rounded-md bg-primary text-primary-foreground",
          "hover:bg-primary/90 transition-colors text-lg font-medium"
        )}
      >
        Start Game
      </button>
      
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Controls:</h3>
        <ul className="space-y-1 text-sm">
          <li>← → : Move left/right</li>
          <li>↓ : Move down</li>
          <li>↑ : Rotate</li>
        </ul>
      </div>
    </div>
  );
};