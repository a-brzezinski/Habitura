"use client";

import { HabitStatsList } from "@/components/pages/Habits/Stats/HabitStatsList";
import { InlineMessage } from "@/components/shared/InlineMessage";
import { useUserStats } from "@/lib/hooks/useUserStats";

export const Stats = () => {
  const { data: stats, isLoading, isError, error } = useUserStats();

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <InlineMessage variant="info">Loading...</InlineMessage>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <InlineMessage variant="error">Error: {error.message}</InlineMessage>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-3xl font-bold">Your Habit Statistics</h3>
      <HabitStatsList stats={stats} />
      {stats.length === 0 && <InlineMessage variant="info">No habit statistics found.</InlineMessage>}
    </div>
  );
};
