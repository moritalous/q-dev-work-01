import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full p-6 bg-background border border-border rounded-lg shadow-lg text-center">
        <div className="text-6xl font-bold mb-4">404</div>
        
        <h1 className="text-2xl font-bold mb-2">ページが見つかりません</h1>
        
        <p className="text-muted-foreground mb-6">
          お探しのページは存在しないか、移動された可能性があります。
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Home className="w-4 h-4" />
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}