export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero skeleton */}
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl p-8 sm:p-16">
            <div className="text-center space-y-4">
              <div className="h-4 bg-white/20 rounded w-48 mx-auto animate-pulse"></div>
              <div className="h-12 bg-white/20 rounded w-96 mx-auto animate-pulse"></div>
              <div className="h-6 bg-white/20 rounded w-64 mx-auto animate-pulse"></div>
            </div>
          </div>

          {/* Featured books skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-48 animate-pulse"></div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-[200px] w-[320px] bg-muted rounded-xl flex-shrink-0 animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Books grid skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-32 animate-pulse"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-muted rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
