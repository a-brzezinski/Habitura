"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";
import { noteSchema } from "@/schemas/notes";
import { ActionResponse } from "@/types/response";

export const updateNote = async (noteId: string, title: string, content: string): Promise<ActionResponse> => {
  try {
    await requireUser();

    const result = noteSchema.safeParse({ title, content });
    if (!result.success) {
      throw new Error("Validation was not successful");
    }

    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title: title,
        content: content,
      },
    });

    revalidatePath("/dashboard/notes");

    return {
      status: "SUCCESS",
      message: "Note updated successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "Failed to update note",
    };
  }
};
