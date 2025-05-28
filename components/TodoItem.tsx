"use client";

import { useState } from "react";
import { Todo } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, Pencil, Trash2, X, Save } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: { title: string; description?: string }) => void;
}

export function TodoItem({ todo, onToggleStatus, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || "");

  const handleToggleStatus = () => {
    onToggleStatus(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description || "");
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onUpdate(todo.id, {
        title: editedTitle,
        description: editedDescription.trim() ? editedDescription : undefined,
      });
      setIsEditing(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-2 rounded-lg border p-4 transition-all",
        todo.status === "completed"
          ? "border-muted bg-muted/30"
          : "border-border hover:border-primary/50"
      )}
    >
      {isEditing ? (
        // Edit mode
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="タスク名"
            autoFocus
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="詳細（任意）"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancelEdit}
              className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium text-muted-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="mr-1 h-3 w-3" />
              キャンセル
            </button>
            <button
              onClick={handleSaveEdit}
              className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              disabled={!editedTitle.trim()}
            >
              <Save className="mr-1 h-3 w-3" />
              保存
            </button>
          </div>
        </div>
      ) : (
        // View mode
        <>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3">
              <button
                onClick={handleToggleStatus}
                className={cn(
                  "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                  todo.status === "completed"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary"
                )}
              >
                {todo.status === "completed" && <Check className="h-3 w-3" />}
              </button>
              <div className="flex flex-col">
                <h3
                  className={cn(
                    "text-base font-medium",
                    todo.status === "completed" && "text-muted-foreground line-through"
                  )}
                >
                  {todo.title}
                </h3>
                {todo.description && (
                  <p
                    className={cn(
                      "mt-1 text-sm text-muted-foreground",
                      todo.status === "completed" && "line-through"
                    )}
                  >
                    {todo.description}
                  </p>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  {formatDate(todo.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={handleEdit}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-muted-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">編集</span>
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">削除</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}