"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Trash2, Edit, Check, X } from "lucide-react";

// TodoItemのプロパティの型定義
export interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TodoItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  // 編集モードの状態管理
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  // 編集を保存する関数
  const handleSave = () => {
    if (editText.trim()) {
      onEdit(id, editText);
      setIsEditing(false);
    }
  };

  // 編集をキャンセルする関数
  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  // キーボードイベントの処理（Enterで保存、Escでキャンセル）
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-3 rounded-lg transition-all",
        "border border-border hover:border-primary/50",
        "group animate-in fade-in-0 slide-in-from-top-5 duration-300",
        completed && "bg-muted/30"
      )}
    >
      {/* チェックボックス */}
      <button
        onClick={() => onToggle(id)}
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors",
          completed
            ? "bg-primary border-primary text-primary-foreground"
            : "border-muted-foreground hover:border-primary"
        )}
        aria-label={completed ? "タスクを未完了にする" : "タスクを完了にする"}
      >
        {completed && <Check className="w-4 h-4" />}
      </button>

      {/* テキスト部分（編集モードによって表示を切り替え） */}
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-background border border-input rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="p-1 rounded-md hover:bg-primary/10 text-primary"
            aria-label="保存"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 rounded-md hover:bg-destructive/10 text-destructive"
            aria-label="キャンセル"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <span
          className={cn(
            "flex-1 text-sm transition-colors",
            completed && "line-through text-muted-foreground"
          )}
        >
          {text}
        </span>
      )}

      {/* アクションボタン（編集モードでない場合のみ表示） */}
      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 rounded-md hover:bg-primary/10 text-primary"
            aria-label="編集"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1 rounded-md hover:bg-destructive/10 text-destructive"
            aria-label="削除"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}