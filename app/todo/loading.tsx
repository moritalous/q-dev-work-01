export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-md mx-auto mb-8 text-center">
        <div className="h-8 w-48 bg-muted/50 animate-pulse rounded-md mx-auto mb-2"></div>
        <div className="h-4 w-64 bg-muted/30 animate-pulse rounded-md mx-auto"></div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto">
        {/* フォームのスケルトン */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 h-10 bg-muted/50 animate-pulse rounded-lg"></div>
          <div className="w-20 h-10 bg-muted/50 animate-pulse rounded-lg"></div>
        </div>

        {/* タスクリストのスケルトン */}
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-3 rounded-lg border border-muted/50 animate-pulse"
            >
              <div className="w-6 h-6 rounded-md bg-muted/50"></div>
              <div className="flex-1 h-4 bg-muted/30 rounded-md"></div>
              <div className="w-16 h-6 bg-muted/20 rounded-md"></div>
            </div>
          ))}
        </div>

        {/* フッターのスケルトン */}
        <div className="flex justify-between items-center mt-4 pt-2 border-t border-border">
          <div className="h-4 w-32 bg-muted/30 animate-pulse rounded-md"></div>
          <div className="h-6 w-48 bg-muted/30 animate-pulse rounded-lg"></div>
        </div>
      </main>

      <footer className="mt-12 text-center">
        <div className="h-4 w-36 bg-muted/20 animate-pulse rounded-md mx-auto"></div>
      </footer>
    </div>
  );
}