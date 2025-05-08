"use server";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";
import { todoSchema, TodoSchemaType } from "@/schemas/todos";
import { ActionResponse } from "@/types/response";

export const createTodo = async (todo: TodoSchemaType): Promise<ActionResponse> => {
  try {
    const user = await requireUser();


    const result = todoSchema.safeParse(todo);
    if (!result.success) {
      throw new Error("Validation was not successful");
    }

    await prisma.todo.create({
      data: {
        title: todo.title,
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
        priority: todo.priority,
        creatorId: user.id,
      },
    });

    return {
      status: "SUCCESS",
      message: "Todo created successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "Failed to create todo",
    };
  }
};
