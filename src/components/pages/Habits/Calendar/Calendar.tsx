"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { updateHabit } from "@/actions/habits/update-habits";
import { InlineMessage } from "@/components/shared/InlineMessage";
import { Button } from "@/components/ui/button";
import { datesAreEqual, getDaysInMonth, getFirstDayOfMonth, monthNames } from "@/helpers/calendar";
import { BaseQueryKeys } from "@/lib/api/queryKeys";
import { useUserCompletions } from "@/lib/hooks/useUserCompletions";
import { useUserHabits } from "@/lib/hooks/useUserHabits";

import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";
import { MonthNavigation } from "./MonthNavigation";

export const Calendar = () => {
  const [isPending, startTransition] = useTransition();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pickedDates, setPickedDates] = useState<Date[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);
  const [initialDates, setInitialDates] = useState<Date[]>([]);

  const queryClient = useQueryClient();

  const { data: habits } = useUserHabits();
  const { data: habitCompletions } = useUserCompletions(selectedHabit);

  useEffect(() => {
    if (habitCompletions) {
      const dates = habitCompletions.map((completion: { date: string }) => new Date(completion.date));
      setPickedDates(dates);
      setInitialDates(dates);
    }
  }, [habitCompletions]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
  };

  const handleDateClick = (day: number | null) => {
    if (day === null) return;

    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const isAlreadyPicked = pickedDates.some(d => d.toDateString() === clickedDate.toDateString());

    if (isAlreadyPicked) {
      setPickedDates(prev => prev.filter(d => d.toDateString() !== clickedDate.toDateString()));
    } else {
      setPickedDates(prev => [...prev, clickedDate]);
    }
  };

  const handleSave = async () => {
    if (!selectedHabit) return;

    startTransition(async () => {
      try {
        const response = await updateHabit({
          id: selectedHabit,
          habits: pickedDates,
        });

        if (response.status === "SUCCESS") {
          toast.success(response.message);
          setInitialDates(pickedDates);

          queryClient.invalidateQueries({ queryKey: [BaseQueryKeys.COMPLETIONS, selectedHabit] });
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("An error occurred while updating the habit");
      }
    });
  };

  const hasChanges = !datesAreEqual(pickedDates, initialDates);

  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="flex flex-col rounded-lg bg-white p-4 shadow-md">
      <CalendarHeader habits={habits} onSelect={setSelectedHabit} />
      {habits?.length === 0 && (
        <InlineMessage variant="info">No habits found. Please create a habit to track.</InlineMessage>
      )}
      {!selectedHabit && Array.isArray(habits) && habits.length > 0 && (
        <InlineMessage variant="info">Select a habit to view its calendar.</InlineMessage>
      )}
      {selectedHabit && (
        <>
          <MonthNavigation onPrev={handlePrevMonth} onNext={handleNextMonth} month={monthNames[month]} year={year} />

          <CalendarGrid
            currentDate={currentDate}
            pickedDates={pickedDates}
            calendarDays={calendarDays}
            onDateClick={handleDateClick}
          />

          <Button
            className="mt-4"
            onClick={handleSave}
            disabled={!selectedHabit || pickedDates.length === 0 || isPending || !hasChanges}>
            Save
          </Button>
        </>
      )}
    </div>
  );
};
