import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ message: "Database is reachable" });
  } catch (error) {
    console.error("Error pinging database:", error);
    return NextResponse.json({ error: "Database is not reachable" }, { status: 500 });
  }
}
