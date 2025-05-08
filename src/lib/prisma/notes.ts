import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";

export const getUserNotes = async () => {
  const user = await requireUser();

  const notes = await prisma.note.findMany({
    where: {
      creatorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notes;
};
