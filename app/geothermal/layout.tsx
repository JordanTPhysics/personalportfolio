export default function GeothermalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100dvh-5rem)] overflow-hidden">{children}</div>
  );
}
