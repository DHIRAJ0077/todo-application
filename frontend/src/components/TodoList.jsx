import { TodoItem } from "./TodoItem";

export function TodoList({ todos, onToggle, onDelete, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center py-6 text-sm text-gray-500">
        loding.
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="rounded-lg bg-amber-50 py-8 text-center text-sm text-gray-600">
        No Todos 
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
