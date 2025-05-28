"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onAddTodo: (title: string, description?: string) => void;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim()) {
      onAddTodo(
        title.trim(),
        description.trim() ? description.trim() : undefined
      );
      setTitle("");
      setDescription("");
      
      // Collapse the form after submission if there's no focus
      if (!isExpanded) {
        setIsExpanded(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-lg border border-border bg-card p-4 shadow-sm transition-all"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="新しいタスクを追加"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button
            type="submit"
            disabled={!title.trim()}
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <Plus className="mr-1 h-4 w-4" />
            追加
          </button>
        </div>

        {isExpanded && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="詳細（任意）"
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        )}
      </div>
    </form>
  );
}