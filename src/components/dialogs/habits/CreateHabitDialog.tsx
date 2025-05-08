"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { NewHabitForm } from "@/components/forms/habits/NewHabbitForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CreateHabitDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Habit
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
          <DialogDescription>Create a new habit to track your progress.</DialogDescription>
        </DialogHeader>
        <NewHabitForm closeDialog={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
