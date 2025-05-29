import TodoList from "@/components/TodoList";

export const metadata = {
  title: "TODOアプリ",
  description: "シンプルで使いやすいTODOアプリ",
};

export default function TodoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-md mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">TODOアプリ</h1>
        <p className="text-muted-foreground">
          タスクを簡単に管理できるシンプルなアプリケーション
        </p>
      </header>

      <main className="flex-1 w-full">
        <TodoList />
      </main>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} TODOアプリ</p>
      </footer>
    </div>
  );
}