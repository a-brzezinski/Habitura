import { requireUser } from "@/helpers/require-user";

import { prisma } from "../prisma";

export async function getUserHabitStats() {
  const user = await requireUser();
  const habits = await prisma.habit.findMany({
    where: { creatorId: user.id },
    include: { HabitCompletion: true },
  });

  return habits.map(habit => {
    const dates = habit.HabitCompletion.map(c => new Date(c.date)).sort((a, b) => +a - +b);

    const total = dates.length;
    let longestStreak = 0;

    let tempStreak = 1;
    for (let i = 1; i < dates.length; i++) {
      const prev = dates[i - 1];
      const curr = dates[i];
      const diff = Math.floor((+curr - +prev) / (1000 * 60 * 60 * 24));
      if (diff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }

    return {
      id: habit.id,
      name: habit.name,
      total,
      longestStreak,
    };
  });
}
