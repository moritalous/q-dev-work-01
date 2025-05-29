import Link from "next/link";
import { Home } from "lucide-react";
import { Metadata } from "next";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "TODOリスト | TODOアプリ",
  description: "タスクを管理するためのTODOリスト",
};

export default function TodosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold transition-colors hover:text-foreground/80"
            >
              <Home className="h-5 w-5" />
              <span>ホーム</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">{children}</main>
      <Footer />
    </div>
  );
}