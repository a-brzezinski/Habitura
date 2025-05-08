"use server";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";
import { ActionResponse } from "@/types/response";

export const deleteTodo = async (id: string): Promise<ActionResponse> => {
  try {
    await requireUser();

    await prisma.todo.delete({
      where: {
        id,
      },
    });

    return {
      status: "SUCCESS",
      message: "Todo deleted successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "Failed to delete todo",
    };
  }
};
