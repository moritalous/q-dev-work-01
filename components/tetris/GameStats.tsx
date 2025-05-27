"use client";

interface GameStatsProps {
  score: number;
  rows: number;
  level: number;
}

export const GameStats = ({ score, rows, level }: GameStatsProps) => (
  <div className="flex flex-col gap-2 min-w-[200px] p-5 bg-card text-card-foreground rounded-md border border-border">
    <div>
      <h4 className="text-sm font-medium text-muted-foreground">Score:</h4>
      <p className="text-2xl font-bold">{score}</p>
    </div>
    
    <div>
      <h4 className="text-sm font-medium text-muted-foreground">Rows:</h4>
      <p className="text-xl font-medium">{rows}</p>
    </div>
    
    <div>
      <h4 className="text-sm font-medium text-muted-foreground">Level:</h4>
      <p className="text-xl font-medium">{level}</p>
    </div>
  </div>
);