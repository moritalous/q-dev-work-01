"use client";

import { TetrisGame } from "@/components/tetris/TetrisGame";
import Link from "next/link";

export default function TetrisPage() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 gap-8">
      <header className="w-full max-w-3xl flex justify-between items-center">
        <h1 className="text-3xl font-bold">テトリス (Tetris)</h1>
        <Link 
          href="/"
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          ホーム (Home)
        </Link>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <TetrisGame />
      </main>
      
      <footer className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Tetris Game
      </footer>
    </div>
  );
}