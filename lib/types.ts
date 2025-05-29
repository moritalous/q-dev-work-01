export type TodoStatus = "pending" | "completed";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: Date;
}

export type TodoFilter = "all" | "pending" | "completed";