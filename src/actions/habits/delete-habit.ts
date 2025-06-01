"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";
import { ActionResponse } from "@/types/response";

export const deleteHabit = async (habitId: string): Promise<ActionResponse> => {
  try {
   
    const user = await requireUser();
 

    await prisma.habitCompletion.deleteMany({
      where: {
        habitId,
      },
    });

    await prisma.habit.delete({
      where: {
        id: habitId,
        creatorId: user.id,
      },
    });

    revalidatePath("/dashboard/habits");

    return {
      status: "SUCCESS",
      message: "Habit deleted successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "Failed to delete habit",
    };
  }
};
