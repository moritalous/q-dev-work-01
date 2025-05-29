"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full p-6 bg-background border border-border rounded-lg shadow-lg text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">エラーが発生しました</h1>
        
        <p className="text-muted-foreground mb-6">
          申し訳ありませんが、問題が発生しました。もう一度お試しいただくか、ホームページに戻ってください。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            再試行
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
          >
            <Home className="w-4 h-4" />
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}