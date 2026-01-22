import { useState } from 'react';

export function TodoForm({ onAddTodo }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    onAddTodo(trimmed);
    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 bg-amber-50 p-4 rounded-lg shadow-sm"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo..."
        autoFocus
        className="flex-1 rounded-md border border-gray-300 px-3 py-2
                   text-sm outline-none focus:border-amber-500 focus:ring-2
                   focus:ring-amber-200"
      />

      <button
        type="submit"
        className="rounded-full bg-amber-500 px-4 py-3 text-sm
        font-medium text-white transition
       hover:bg-amber-600 active:scale-95"
      >
        Add
      </button>
    </form>
  );
}
