"use client";

import { useTodoStore } from "@/lib/store";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoFilter } from "./TodoFilter";
import { Trash2 } from "lucide-react";

export function TodoApp() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    toggleTodoStatus,
    deleteTodo,
    clearCompletedTodos,
    isLoaded,
  } = useTodoStore();

  // Calculate counts for filters
  const allTodos = useTodoStore().todos;
  const todoCount = {
    all: allTodos.length,
    pending: allTodos.filter((todo) => todo.status === "pending").length,
    completed: allTodos.filter((todo) => todo.status === "completed").length,
  };

  if (!isLoaded) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">TODOリスト</h1>
        <p className="text-muted-foreground">
          タスクを追加、編集、完了、削除できます
        </p>
      </div>

      <TodoForm onAddTodo={addTodo} />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          todoCount={todoCount}
        />

        {todoCount.completed > 0 && (
          <button
            onClick={clearCompletedTodos}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            完了済みをクリア
          </button>
        )}
      </div>

      <TodoList
        todos={todos}
        onToggleStatus={toggleTodoStatus}
        onDelete={deleteTodo}
        onUpdate={(id, { title, description }) =>
          updateTodo(id, { title, description })
        }
      />
    </div>
  );
}