"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createTodo } from "@/app/actions/todos/create-todo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { todoSchema, TodoSchemaType } from "@/schemas/todos";

interface CreateTodoFormProps {
  closeModal: (open: boolean) => void;
}

export const CreateTodoForm = ({ closeModal }: CreateTodoFormProps) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      dueDate: "",
      priority: "MEDIUM",
    },
  });

  function onSubmit(values: TodoSchemaType) {
    startTransition(async () => {
      try {
        const response = await createTodo(values);
        if (response.status === "SUCCESS") {
          queryClient.invalidateQueries({ queryKey: ["todos"] });
          closeModal(false);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("Failed to create todo");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Title</FormLabel>
              <FormControl>
                <Input disabled={isPending} placeholder="Enter title" {...field} />
              </FormControl>
              <FormDescription className="text-sm text-gray-500">This is the title of your todo.</FormDescription>
              <FormMessage className="mt-1 text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-sm text-gray-500">
                Set the todo&apos;s priority level. If left unchanged, it will default to &apos;medium&apos;.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Due Date (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  disabled={isPending}
                  placeholder="Enter title"
                  className="mt-1 block w-full"
                  min={new Date().toISOString().split("T")[0]}
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500">
                Optional. Set a due date if this todo has a deadline.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full cursor-pointer">
          {isPending ? "Creating..." : "Create Note"}
        </Button>
      </form>
    </Form>
  );
};
