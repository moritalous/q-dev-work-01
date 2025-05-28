import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col p-4 sm:p-6 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="container flex justify-end py-4">
        <ThemeToggle />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            TODOアプリへようこそ
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            シンプルで使いやすいTODOアプリで、タスク管理を効率化しましょう。
          </p>
          <Link
            href="/todos"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            TODOアプリを開く
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
