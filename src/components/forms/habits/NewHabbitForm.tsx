"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createHabit } from "@/actions/habits/create-habit";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BaseQueryKeys } from "@/lib/api/queryKeys";
import { habitSchema, HabitSchemaType } from "@/schemas/habits";

interface CreateHabitFormProps {
  closeDialog: (open: boolean) => void;
}

export const NewHabitForm = ({ closeDialog }: CreateHabitFormProps) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: HabitSchemaType) => {
    startTransition(async () => {
      try {
        const response = await createHabit(values);

        if (response.status === "SUCCESS") {
          toast.success(response.message);
          queryClient.invalidateQueries({ queryKey: [BaseQueryKeys.USER_HABITS] });
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("Failed to create habit");
      } finally {
        closeDialog(false);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habit Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Drink water" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="e.g., Drink 8 glasses of water daily" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          Add Habit
        </Button>
      </form>
    </Form>
  );
};
