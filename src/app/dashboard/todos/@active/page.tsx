import { CreateTodoDialog } from "@/components/dialogs/todos/CreateTodoDialog";
import { TodosList } from "@/components/pages/Todos/TodosList";

export default function TodoActive() {
  return (
    <div className="flex w-full flex-col rounded-xl bg-slate-50 p-4 shadow-2xl lg:w-1/2">
      <h3 className="text-2xl font-medium">Active Todos</h3>
      <CreateTodoDialog />
      <TodosList />
    </div>
  );
}
