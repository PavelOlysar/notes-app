export default function WikiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="max-w-5xl mx-auto px-4">{children}</div>
}
