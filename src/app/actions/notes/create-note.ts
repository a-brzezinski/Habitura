"use server";

import { revalidatePath } from "next/cache";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";
import { noteSchema, NoteSchemaType } from "@/schemas/notes";
import { ActionResponse } from "@/types/response";

export const createNote = async (note: NoteSchemaType): Promise<ActionResponse> => {
  try {
    const user = await requireUser();

    const result = noteSchema.safeParse(note);
    if (!result.success) {
      throw new Error("Validation was not successful");
    }

    await prisma.note.create({
      data: {
        title: note.title,
        content: note.content,
        creatorId: user.id,
      },
    });

    revalidatePath("/dashboard/notes");

    return {
      status: "SUCCESS",
      message: "Note created successfully",
    };
  } catch {
    return {
      status: "ERROR",
      message: "Failed to create note",
    };
  }
};
