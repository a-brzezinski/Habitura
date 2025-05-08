import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface MonthNavigationProps {
  month: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

export const MonthNavigation = ({ month, year, onPrev, onNext }: MonthNavigationProps) => (
  <div className="mb-4 flex w-full items-center justify-between">
    <Button onClick={onPrev}>
      <ChevronLeft />
    </Button>
    <h1 className="text-2xl font-bold">{`${month} ${year}`}</h1>
    <Button onClick={onNext}>
      <ChevronRight />
    </Button>
  </div>
);
