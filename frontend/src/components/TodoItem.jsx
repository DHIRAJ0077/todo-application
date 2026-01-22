export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg border
        bg-white p-3 shadow-sm transition
        ${todo.completed ? 'opacity-70 line-through' : ''}`}
    >
      
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
        className="h-4 w-4 cursor-pointer accent-amber-500"
      />

      <span className="flex-1 text-sm text-gray-800">
        {todo.title}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
        className=" text-red-600  active:scale-95"
      >
        Deleted
      </button>
    </div>
  );
}
