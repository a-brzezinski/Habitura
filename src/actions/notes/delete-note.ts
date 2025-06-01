"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";
import { ActionResponse } from "@/types/response";

export const deleteNote = async (noteId: string): Promise<ActionResponse> => {
  try {
    const user = await requireUser();

    await prisma.note.delete({
      where: {
        id: noteId,
        creatorId: user.id,
      },
    });

    revalidatePath("/dashboard/notes");

    return {
      status: "SUCCESS",
      message: "Note deleted successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "Failed to delete note",
    };
  }
};
