"use client";

import { TodoFilter as TodoFilterType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TodoFilterProps {
  currentFilter: TodoFilterType;
  onFilterChange: (filter: TodoFilterType) => void;
  todoCount: {
    all: number;
    pending: number;
    completed: number;
  };
}

export function TodoFilter({ currentFilter, onFilterChange, todoCount }: TodoFilterProps) {
  const filters: { value: TodoFilterType; label: string }[] = [
    { value: "all", label: `すべて (${todoCount.all})` },
    { value: "pending", label: `未完了 (${todoCount.pending})` },
    { value: "completed", label: `完了済み (${todoCount.completed})` },
  ];

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            currentFilter === filter.value
              ? "bg-primary text-primary-foreground"
              : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}