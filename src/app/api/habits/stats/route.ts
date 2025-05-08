import { NextResponse } from "next/server";

import { getUserHabitStats } from "@/lib/prisma/habits";

export async function GET() {
  try {
    const stats = await getUserHabitStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching habit stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
