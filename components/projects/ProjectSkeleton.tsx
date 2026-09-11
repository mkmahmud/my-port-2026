'use client'

export function ProjectSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 flex flex-col h-full animate-pulse">
      <div className="relative aspect-video w-full bg-elevated rounded-t-lg -mx-6 -mt-6 mb-4" />
      <div className="h-6 w-3/4 bg-elevated rounded mt-4" />
      <div className="mt-4 flex flex-col gap-2 flex-grow">
        <div className="h-4 w-full bg-elevated rounded" />
        <div className="h-4 w-2/3 bg-elevated rounded" />
      </div>
      <div className="flex gap-2 mt-3">
        <div className="h-5 w-16 bg-elevated rounded-full" />
        <div className="h-5 w-16 bg-elevated rounded-full" />
        <div className="h-5 w-16 bg-elevated rounded-full" />
      </div>
      <div className="mt-4 pt-4 border-t border-border flex justify-between">
        <div className="h-4 w-24 bg-elevated rounded" />
        <div className="flex gap-3">
          <div className="h-5 w-5 bg-elevated rounded-full" />
          <div className="h-5 w-5 bg-elevated rounded-full" />
        </div>
      </div>
    </div>
  )
}
