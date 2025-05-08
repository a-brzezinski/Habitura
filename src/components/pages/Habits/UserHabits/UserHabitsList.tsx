"use client";

import { InlineMessage } from "@/components/shared/InlineMessage";
import { useUserHabits } from "@/lib/hooks/useUserHabits";

import { UserHabitsItem } from "./UserHabitsItem";

export const UserHabitsList = () => {
  const { data: habits, isLoading, isError, error } = useUserHabits();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <InlineMessage variant="info">Loading...</InlineMessage>
      </div>
    );
  }

  if (isError) {
    const err = error as Error;
    return <InlineMessage variant="error">{err.message}</InlineMessage>;
  }

  if (!habits || habits.length === 0) {
    return (
      <InlineMessage variant="info">
        You haven&apos;t added any habits yet.
        <br /> Click &quot;Add Habit&quot; to get started!
      </InlineMessage>
    );
  }

  return (
    <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {habits.map(habit => (
        <UserHabitsItem key={habit.id} habit={habit} />
      ))}
    </ul>
  );
};
