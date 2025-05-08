export const dynamic = "force-dynamic";

import { Metadata } from "next";

import { Card, CardContent } from "@/components/ui/card";
import { requireUser } from "@/helpers/require-user";
import { getDashboardStats } from "@/lib/prisma/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const user = await requireUser();
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Welcome back, {user?.given_name || user?.email} 👋</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Notes</p>
            <p className="text-2xl font-bold">{stats.notes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Open Todos</p>
            <p className="text-2xl font-bold">{stats.todosOpen}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completed Today</p>
            <p className="text-2xl font-bold">{stats.todosCompletedToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Habits</p>
            <p className="text-2xl font-bold">{stats.habitsToday}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
