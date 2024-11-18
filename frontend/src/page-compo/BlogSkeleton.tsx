'use client'




export function BlogSkeleton() {
  return (
    <div className="py-6 animate-pulse">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </div>

      <div className="grid sm:grid-cols-[1fr,200px] gap-4 sm:gap-8">
        <div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>

          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <div className="h-6 bg-gray-300 rounded w-16"></div>

            <div className="flex items-center gap-2 sm:gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative order-first sm:order-last">
          <div className="w-full bg-gray-300 h-40 sm:h-full rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}