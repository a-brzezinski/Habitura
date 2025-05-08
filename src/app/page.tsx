import { LandingNavigation } from "@/components/navigations/LandingNavigation";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col">
      <LandingNavigation />
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-extrabold text-gray-800">Welcome to Habitura</h1>
        <p className="text-md text-gray-600 text-center">A simple and effective habit tracker to improve your daily routine</p>
      </div>
    </div>
  );
}
