import { TodoPriority } from "@prisma/client";
import { NextResponse } from "next/server";

import { requireUser } from "@/helpers/require-user";
import { prisma } from "@/lib/prisma";

const VALID_PRIORITIES = [...Object.values(TodoPriority), "ALL"] as const;
type Priority = (typeof VALID_PRIORITIES)[number];

const isValidPriority = (value: string): value is Priority => VALID_PRIORITIES.includes(value as Priority);

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const allowedParams = ["priority"];
    const unknownParams = [...searchParams.keys()].filter(key => !allowedParams.includes(key));
    if (unknownParams.length > 0) {
      return NextResponse.json({ error: "Unknown query parameters" }, { status: 400 });
    }

    const rawPriority = searchParams.get("priority") || "ALL";
    if (!isValidPriority(rawPriority)) {
      return NextResponse.json({ error: "Invalid priority value" }, { status: 400 });
    }
    const priority: Priority = rawPriority;


    const user = await requireUser()

    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const where = {
      creatorId: user.id,
      ...(priority !== "ALL" && { priority: priority as TodoPriority }),
      isCompleted: false,
    };

    const todos = await prisma.todo.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
