"use server";

import { prisma } from "@/lib/prisma";
import { ActionResponse } from "@/types/response";

interface HabitSchemaType {
  id: string;
  habits: Date[];
}

export const updateHabit = async (habit: HabitSchemaType): Promise<ActionResponse> => {
  try {
    await prisma.habitCompletion.deleteMany({
      where: { habitId: habit.id },
    });

    await prisma.habitCompletion.createMany({
      data: habit.habits.map(date => ({
        habitId: habit.id,
        date: new Date(date),
      })),
    });

    return {
      status: "SUCCESS",
      message: "Habit updated successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "Failed to update habit",
    };
  }
};
