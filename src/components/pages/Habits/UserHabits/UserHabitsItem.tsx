import { Habit } from "@prisma/client";

import { ConfirmationDialog } from "@/components/dialogs/habits/ConfirmationDialog";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const UserHabitsItem = ({ habit }: { habit: Habit }) => {
  const { name, id, description } = habit;

  return (
    <li>
      <Card key={habit.id} className="h-[120px]">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{name}</CardTitle>
            <ConfirmationDialog habitId={id} />
          </div>
          {habit.description && <p className="text-sm text-muted-foreground">{description}</p>}
        </CardHeader>
      </Card>
    </li>
  );
};
