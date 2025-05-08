import { Todo, TodoPriority } from "@prisma/client";

export const fetchTodos = async (priority: TodoPriority | "ALL"): Promise<Todo[]> => {
  try {
    const response = await fetch(`/api/todos?priority=${priority}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unknown error from server");
    }

    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong");
  }
};

