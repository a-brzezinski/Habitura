"use client";

import { TodoPriority } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { TodosItem } from "@/components/pages/Todos/TodosItem";
import { InlineMessage } from "@/components/shared/InlineMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BaseQueryKeys } from "@/lib/api/queryKeys";
import { fetchTodos } from "@/lib/api/todos";

type PriorityFilter = TodoPriority | "ALL";

export const TodosList = () => {
  const [priority, setPriority] = useState<PriorityFilter>("ALL");

  const {
    data: todos = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: [BaseQueryKeys.TODOS, priority],
    queryFn: () => fetchTodos(priority),
  });

  const handleSelectChange = (value: string) => {
    setPriority(value as PriorityFilter);
  };

  const renderContent = () => {
    if (isLoading) {
      return <InlineMessage variant="info">Loading...</InlineMessage>;
    }

    if (isError) {
      return <InlineMessage variant="error">Error: {error?.message || "Something went wrong."}</InlineMessage>;
    }

    if (todos.length === 0) {
      return <InlineMessage variant="info">No todos found.</InlineMessage>;
    }

    return (
      <ScrollArea className="mt-4 h-[400px] w-full rounded-md border bg-white shadow-sm lg:h-[700px]">
        <ul>
          {todos.map(todo => (
            <TodosItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </ScrollArea>
    );
  };

  return (
    <div className="mt-4">
      <p className="mb-1 text-sm text-gray-500">Filter by priority</p>
      <Select onValueChange={handleSelectChange} defaultValue="ALL">
        <SelectTrigger className="w-full lg:w-[200px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Todos</SelectItem>
          <SelectItem value={TodoPriority.HIGH}>High Priority</SelectItem>
          <SelectItem value={TodoPriority.MEDIUM}>Medium Priority</SelectItem>
          <SelectItem value={TodoPriority.LOW}>Low Priority</SelectItem>
        </SelectContent>
      </Select>
      {renderContent()}
    </div>
  );
};
