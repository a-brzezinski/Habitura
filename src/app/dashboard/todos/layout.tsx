export default function Layout({
  children,
  active,
  history,
}: {
  children: React.ReactNode;
  active: React.ReactNode;
  history: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="mt-4 flex h-full flex-col items-start gap-4 lg:flex-row">
        {active}
        {history}
      </div>
    </>
  );
}
