export default function Loading() {
  return (
    <div className="container max-w-4xl py-6">
      <div className="flex flex-col gap-4">
        <div className="h-8 w-[200px] animate-pulse bg-muted rounded" />
        <div className="h-4 w-[100px] animate-pulse bg-muted rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse bg-muted rounded" />
          <div className="h-4 w-full animate-pulse bg-muted rounded" />
          <div className="h-4 w-2/3 animate-pulse bg-muted rounded" />
        </div>
      </div>
    </div>
  )
}
