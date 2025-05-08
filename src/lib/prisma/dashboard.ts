import { endOfDay, startOfDay } from "date-fns";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const user = await requireUser();
  const userId = user.id;
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const [notes, openTodos, completedTodosToday, habits] = await Promise.all([
    prisma.note.count({
      where: { creatorId: userId },
    }),
    prisma.todo.count({
      where: {
        creatorId: userId,
        isCompleted: false,
      },
    }),
    prisma.todo.count({
      where: {
        creatorId: userId,
        isCompleted: true,
        completedAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    }),
    prisma.habit.count({
      where: { creatorId: userId },
    }),
  ]);

  return {
    notes,
    todosOpen: openTodos,
    todosCompletedToday: completedTodosToday,
    habitsToday: habits,
  };
}
