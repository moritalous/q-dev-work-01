"use client";

import { useState, useEffect } from "react";

// Todoの型定義
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

// フィルタータイプの型定義
export type FilterType = "all" | "active" | "completed";

export function useTodos() {
  // Todoリストの状態
  const [todos, setTodos] = useState<Todo[]>([]);
  // 現在のフィルター状態
  const [filter, setFilter] = useState<FilterType>("all");
  // ローディング状態
  const [isLoading, setIsLoading] = useState(true);

  // コンポーネントマウント時にローカルストレージからデータを読み込む
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (e) {
        console.error("ローカルストレージからのデータ読み込みに失敗しました:", e);
      }
    }
    setIsLoading(false);
  }, []);

  // todosが変更されたらローカルストレージに保存
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  // 新しいTodoを追加する関数
  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: text.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  // Todoの完了状態を切り替える関数
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Todoを削除する関数
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Todoのテキストを編集する関数
  const editTodo = (id: string, newText: string) => {
    if (newText.trim()) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, text: newText.trim() } : todo
        )
      );
    }
  };

  // 完了したTodoをすべて削除する関数
  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  // フィルターに基づいてTodoをフィルタリングする
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"の場合はすべて表示
  });

  // 残りのタスク数を計算
  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  // 完了したタスクがあるかどうか
  const hasCompletedTodos = todos.some((todo) => todo.completed);

  return {
    todos,
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
  };
}