import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type HabitStat = {
  id: string;
  name: string;
  total: number;
  longestStreak: number;
};

export function HabitStatsList({ stats }: { stats: HabitStat[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map(habit => (
        <Card key={habit.id} className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{habit.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-xl font-bold">{habit.total}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Longest Streak</p>
              <p className="text-xl font-bold">{habit.longestStreak} days</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
