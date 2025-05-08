import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";

export const getHistoryTodos = async () => {
  const user = await requireUser();

  const finishedTodos = await prisma.todo.findMany({
    where: {
      isCompleted: true,
      creatorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return finishedTodos;
};
