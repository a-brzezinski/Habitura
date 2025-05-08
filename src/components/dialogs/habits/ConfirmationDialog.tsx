import { Trash2 } from "lucide-react";
import { useState } from "react";

import { SubmitDeleteHabitButton } from "@/components/pages/Habits/UserHabits/SubmitDeleteHabitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ConfirmationDialogProps {
  habitId: string;
}

export const ConfirmationDialog = ({ habitId }: ConfirmationDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this habit? This action cannot be undone. You lose all your stats.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <SubmitDeleteHabitButton habitId={habitId} closeDialog={setOpen} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
