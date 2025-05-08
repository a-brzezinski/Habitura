import { NextResponse } from "next/server";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await requireUser();

    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const habits = await prisma.habit.findMany({
      where: {
        creatorId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(habits);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
