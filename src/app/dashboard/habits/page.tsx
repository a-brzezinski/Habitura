import { Metadata } from "next";

import { Calendar } from "@/components/pages/Habits/Calendar/Calendar";
import { Stats } from "@/components/pages/Habits/Stats/Stats";
import { UserHabits } from "@/components/pages/Habits/UserHabits/UserHabits";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Habits",
};

export default function Habits() {
  return (
    <Tabs defaultValue="Habits" className="w-full">
      <TabsList className="grid w-full grid-cols-3 gap-4">
        <TabsTrigger value="Habits">Your Habits</TabsTrigger>
        <TabsTrigger value="Callendar">Callendar</TabsTrigger>
        <TabsTrigger value="Stats">Stats</TabsTrigger>
      </TabsList>
      <TabsContent value="Habits">
        <UserHabits />
      </TabsContent>
      <TabsContent value="Callendar">
        <Calendar />
      </TabsContent>
      <TabsContent value="Stats">
        <Stats />
      </TabsContent>
    </Tabs>
  );
}
