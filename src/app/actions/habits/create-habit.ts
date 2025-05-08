"use server";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";
import { habitSchema, HabitSchemaType } from "@/schemas/habits";
import { ActionResponse } from "@/types/response";

export const createHabit = async (habit: HabitSchemaType): Promise<ActionResponse> => {
  try {
    const user = await requireUser();

    const result = habitSchema.safeParse(habit);
    if (!result.success) {
      throw new Error("Validation was not successful");
    }

    const habitCount = await prisma.habit.count({
      where: {
        creatorId: user.id,
      },
    });

    if (habitCount >= 10) {
      return {
        status: "ERROR",
        message: "You can only create up to 10 habits",
      };
    }

    await prisma.habit.create({
      data: {
        name: habit.name,
        description: habit.description || null,
        creatorId: user.id,
      },
    });

    return {
      status: "SUCCESS",
      message: "Habit created successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "Failed to create habit",
    };
  }
};
