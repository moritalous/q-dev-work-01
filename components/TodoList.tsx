"use client";

import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import TodoFilter from "./TodoFilter";
import { useTodos } from "@/hooks/useTodos";

export default function TodoList() {
  const {
    filteredTodos,
    filter,
    isLoading,
    activeTodosCount,
    hasCompletedTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
  } = useTodos();

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Todoフォーム */}
      <TodoForm onAddTodo={addTodo} />

      {/* Todoリスト */}
      <div className="space-y-2">
        {isLoading ? (
          <div className="text-center py-4 text-muted-foreground">
            読み込み中...
          </div>
        ) : filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            {filter === "all"
              ? "タスクがありません。新しいタスクを追加してください。"
              : filter === "active"
              ? "未完了のタスクはありません。"
              : "完了したタスクはありません。"}
          </div>
        )}
      </div>

      {/* フッター（タスクが1つ以上ある場合のみ表示） */}
      {filteredTodos.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
          <div>
            {activeTodosCount} 件の未完了タスク
          </div>
          
          {/* フィルター */}
          <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
          
          {/* 完了したタスクをクリアするボタン */}
          {hasCompletedTodos && (
            <button
              onClick={clearCompleted}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              完了したタスクを削除
            </button>
          )}
        </div>
      )}
    </div>
  );
}