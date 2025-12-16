export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header skeleton */}
      <div className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex items-center h-16 px-4">
          <div className="flex items-center gap-6 flex-1">
            <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
            <div className="hidden md:flex items-center space-x-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category header skeleton */}
        <div className="mb-8 p-6 rounded-lg bg-muted animate-pulse">
          <div className="h-6 w-24 bg-white/20 rounded mb-2"></div>
          <div className="h-10 w-48 bg-white/20 rounded"></div>
        </div>

        {/* Search field skeleton */}
        <div className="flex justify-end mb-6">
          <div className="h-10 w-80 bg-muted rounded animate-pulse"></div>
        </div>

        {/* Featured books skeleton */}
        <div className="space-y-4 mb-8">
          <div className="flex gap-4 overflow-x-auto pb-4">
            <div className="h-[180px] w-[280px] flex-shrink-0 bg-muted rounded-xl animate-pulse"></div>
            <div className="h-[180px] w-[280px] flex-shrink-0 bg-muted rounded-xl animate-pulse"></div>
            <div className="h-[180px] w-[280px] flex-shrink-0 bg-muted rounded-xl animate-pulse hidden sm:block"></div>
          </div>
        </div>

        {/* Books grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[2/3] w-full bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
