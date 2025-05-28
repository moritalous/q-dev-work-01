"use client";

import { Todo } from "@/lib/types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: { title: string; description?: string }) => void;
}

export function TodoList({ todos, onToggleStatus, onDelete, onUpdate }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-muted p-8 text-center">
        <p className="text-muted-foreground">タスクがありません</p>
        <p className="text-sm text-muted-foreground">新しいタスクを追加してください</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}