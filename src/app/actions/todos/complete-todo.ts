"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";
import { ActionResponse } from "@/types/response";

export const completeTodo = async (id: string): Promise<ActionResponse> => {
  try {
    const user = await requireUser();

    await prisma.todo.update({
      where: { id },
      data: {
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    const completedTodos = await prisma.todo.findMany({
      where: {
        creatorId: user.id,
        isCompleted: true,
      },
      orderBy: {
        completedAt: "desc",
      },
      skip: 10,
      select: {
        id: true,
      },
    });

    if (completedTodos.length > 0) {
      await prisma.todo.deleteMany({
        where: {
          id: {
            in: completedTodos.map(todo => todo.id),
          },
        },
      });
    }

    revalidatePath("/todos");

    return {
      status: "SUCCESS",
      message: "Todo completed successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "Failed to complete todo",
    };
  }
};
