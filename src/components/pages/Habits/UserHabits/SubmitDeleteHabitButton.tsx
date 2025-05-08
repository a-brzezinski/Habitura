"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { toast } from "sonner";

import { deleteHabit } from "@/app/actions/habits/delete-habit";
import { Button } from "@/components/ui/button";
import { BaseQueryKeys } from "@/lib/api/queryKeys";

interface SubmitDeleteHabitButtonProps {
  habitId: string;
  closeDialog: (open: boolean) => void;
}

export const SubmitDeleteHabitButton = ({ habitId, closeDialog }: SubmitDeleteHabitButtonProps) => {
  const [pending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleDeleteHabit = () => {
    startTransition(async () => {
      try {
        const response = await deleteHabit(habitId);
        if (response.status === "SUCCESS") {
          toast.success(response.message);
          closeDialog(false);
          queryClient.invalidateQueries({ queryKey: [BaseQueryKeys.USER_HABITS] });
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("Failed to delete habit");
      }
    });
  };

  return (
    <Button onClick={handleDeleteHabit} disabled={pending}>
      Delete
    </Button>
  );
};
