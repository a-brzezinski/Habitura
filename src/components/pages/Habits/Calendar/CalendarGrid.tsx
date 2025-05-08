import { Button } from "@/components/ui/button";
import { dayNames } from "@/helpers/calendar";

interface CalendarGridProps {
  currentDate: Date;
  pickedDates: Date[];
  calendarDays: (number | null)[];
  onDateClick: (day: number | null) => void;
}

export const CalendarGrid = ({ currentDate, pickedDates, calendarDays, onDateClick }: CalendarGridProps) => (
  <div className="mt-4 grid grid-cols-7 gap-4">
    {dayNames.map(day => (
      <div key={day} className="text-center font-bold">
        {day}
      </div>
    ))}
    {calendarDays.map((day, index) => {
      const isPicked = pickedDates.some(
        d =>
          day !== null &&
          d.getDate() === day &&
          d.getMonth() === currentDate.getMonth() &&
          d.getFullYear() === currentDate.getFullYear()
      );

      return (
        <Button
          onClick={() => onDateClick(day)}
          variant={day ? "secondary" : "ghost"}
          key={index}
          disabled={day === null}
          className={`cursor-pointer hover:bg-black/10 ${isPicked ? "bg-black text-white hover:bg-black/70" : ""}`}>
          {day ?? ""}
        </Button>
      );
    })}
  </div>
);
