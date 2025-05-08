import { getHistoryTodos } from "@/lib/prisma/todos";

export default async function TodoHistory() {
  const todoHistory = await getHistoryTodos();

  return (
    <div className="flex w-full flex-col gap-6 rounded-lg bg-gray-800 p-6 text-white shadow-lg lg:w-1/2">
      <h3 className="text-3xl font-semibold">Completed Tasks</h3>
      <p className="text-base text-gray-400">Last 10 finished tasks</p>
      {todoHistory.length === 0 && <p className="text-base text-gray-500">No completed tasks found.</p>}
      {todoHistory.map(todo => (
        <div key={todo.id} className="flex items-center justify-between rounded-lg bg-gray-700 p-4 shadow-sm">
          <p className="text-base font-medium">{todo.title}</p>
          <p className="text-sm text-gray-400">{new Date(todo.completedAt!).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
