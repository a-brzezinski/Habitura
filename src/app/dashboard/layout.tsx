import { DashboardNavigation } from "@/components/navigations/DashboardNavigation";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <div className="flex min-h-screen w-full flex-col">
        <DashboardNavigation />
        <div className="container mx-auto flex-1 p-4">{children}</div>
      </div>
      <Toaster richColors/>
    </ReactQueryProvider>
  );
}
