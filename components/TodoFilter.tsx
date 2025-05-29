"use client";

import { cn } from "@/lib/utils";
import { FilterType } from "@/hooks/useTodos";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function TodoFilter({
  currentFilter,
  onFilterChange,
}: TodoFilterProps) {
  // フィルターオプションの定義
  const filterOptions: { value: FilterType; label: string }[] = [
    { value: "all", label: "すべて" },
    { value: "active", label: "未完了" },
    { value: "completed", label: "完了済み" },
  ];

  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={cn(
            "px-3 py-1 text-xs rounded-md transition-colors",
            currentFilter === option.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-current={currentFilter === option.value ? "page" : undefined}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}