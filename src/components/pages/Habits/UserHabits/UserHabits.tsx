import { CreateHabitDialog } from "@/components/dialogs/habits/CreateHabitDialog";
import { PageHeading } from "@/components/shared/PageHeading";

import { UserHabitsList } from "./UserHabitsList";

export const UserHabits = () => {
  return (
    <>
      <div className="flex justify-between gap-4 pt-4">
        <PageHeading>Your Habits</PageHeading>
        <CreateHabitDialog />
      </div>

      <UserHabitsList />
    </>
  );
};
