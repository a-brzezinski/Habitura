import { LandingNavigation } from "@/components/navigations/LandingNavigation";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col">
      <LandingNavigation />
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-bold">Welcome to Habitura</h1>
        <p className="text-lg text-balance">A simple habit tracker</p>
      </div>
    </div>
  );
}
