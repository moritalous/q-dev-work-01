"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, CheckSquare } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "ホーム",
      icon: <Home className="w-4 h-4" />,
    },
    {
      href: "/todo",
      label: "TODOアプリ",
      icon: <CheckSquare className="w-4 h-4" />,
    },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 bg-background/80 backdrop-blur-md border border-border rounded-full p-1 shadow-lg">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors",
              pathname === link.href
                ? "bg-foreground text-background"
                : "hover:bg-muted"
            )}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}