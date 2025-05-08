import { NextResponse } from "next/server";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser();

    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const { id } = await params;

    const habitCompletions = await prisma.habitCompletion.findMany({
      where: {
        habitId: id,
      },
      select: {
        date: true,
      },
    });

    return NextResponse.json(habitCompletions);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
