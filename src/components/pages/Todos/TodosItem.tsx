"use client";

import { Todo } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { completeTodo } from "@/app/actions/todos/complete-todo";
import { deleteTodo } from "@/app/actions/todos/delete-todo";
import { Button } from "@/components/ui/button";
import { BaseQueryKeys } from "@/lib/api/queryKeys";

export const TodosItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();
  const [pending, startTransition] = useTransition();
  const { id, title, createdAt, priority, dueDate } = todo;

  const handleCompleteTodo = () => {
    startTransition(async () => {
      try {
        const response = await completeTodo(id);
        if (response.status === "SUCCESS") {
          queryClient.invalidateQueries({ queryKey: [BaseQueryKeys.TODOS] });
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("Failed to complete todo");
      }
    });
  };

  const handleDeleteTodo = () => {
    startTransition(async () => {
      try {
        const response = await deleteTodo(id);
        if (response.status === "SUCCESS") {
          queryClient.invalidateQueries({ queryKey: [BaseQueryKeys.TODOS] });
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      } catch {
        toast.error("Failed to delete todo");
      }
    });
  };

  const createdDate = new Date(createdAt).toLocaleDateString();
  const dueDateFormatted = dueDate ? new Date(dueDate).toLocaleDateString() : null;

  return (
    <li className="flex items-center justify-between border-b border-gray-200 p-4 transition-colors duration-200 hover:bg-gray-50">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">Created: {createdDate}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600">Priority: {priority}</p>
        {dueDate && <p className="text-sm text-gray-600">Due: {dueDateFormatted}</p>}
        <div className="mt-2 flex items-center gap-2">
          <Button
            onClick={handleDeleteTodo}
            disabled={pending}
            className="rounded bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50">
            <Trash />
          </Button>

          <Button
            disabled={pending}
            className="rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleCompleteTodo}>
            Complete
          </Button>
        </div>
      </div>
    </li>
  );
};
