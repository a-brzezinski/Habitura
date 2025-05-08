import { Habit } from "@prisma/client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalendarHeaderProps {
  habits: Habit[] | undefined;
  onSelect: (value: string) => void;
}

export const CalendarHeader = ({ habits, onSelect }: CalendarHeaderProps) => {
  return (
    <div className="mb-4 flex w-full items-center justify-between">
      <h3 className="text-xl font-semibold">Habit Calendar</h3>
      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Habit" />
        </SelectTrigger>
        <SelectContent>
          {habits?.map(habit => (
            <SelectItem key={habit.id} value={habit.id}>
              {habit.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
