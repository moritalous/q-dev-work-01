"use client";

import { useState, useEffect } from "react";
import { Todo, TodoStatus, TodoFilter } from "./types";

// Helper function to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Helper function to get todos from localStorage
const getTodosFromStorage = (): Todo[] => {
  if (typeof window === "undefined") return [];
  
  const storedTodos = localStorage.getItem("todos");
  if (!storedTodos) return [];
  
  try {
    // Parse the stored todos and convert string dates back to Date objects
    return JSON.parse(storedTodos).map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  } catch (error) {
    console.error("Failed to parse todos from localStorage:", error);
    return [];
  }
};

// Helper function to save todos to localStorage
const saveTodosToStorage = (todos: Todo[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const useTodoStore = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage on initial render
  useEffect(() => {
    setTodos(getTodosFromStorage());
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveTodosToStorage(todos);
    }
  }, [todos, isLoaded]);

  // Get filtered todos based on the current filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    return todo.status === filter;
  });

  // Add a new todo
  const addTodo = (title: string, description?: string): void => {
    const newTodo: Todo = {
      id: generateId(),
      title,
      description,
      status: "pending",
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  // Update an existing todo
  const updateTodo = (id: string, updates: Partial<Omit<Todo, "id" | "createdAt">>): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  // Toggle todo status
  const toggleTodoStatus = (id: string): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, status: todo.status === "pending" ? "completed" : "pending" }
          : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: string): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Clear all completed todos
  const clearCompletedTodos = (): void => {
    setTodos(todos.filter((todo) => todo.status !== "completed"));
  };

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    toggleTodoStatus,
    deleteTodo,
    clearCompletedTodos,
    isLoaded,
  };
};