"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState("");

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText(""); // 入力フィールドをクリア
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="新しいタスクを入力..."
        className="flex-1 px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        aria-label="新しいタスクを入力"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors flex items-center gap-1"
        aria-label="タスクを追加"
        disabled={!text.trim()}
      >
        <Plus className="w-4 h-4" />
        <span>追加</span>
      </button>
    </form>
  );
}