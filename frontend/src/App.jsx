import { useState, useEffect } from 'react'

import { TodoForm } from './components/TodoForm'

import { TodoList } from './components/TodoList'

const API_URL = 'http://localhost:5000/api'

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(`${API_URL}/todos`)


      if (!res.ok) throw   new Error('Failed to get  todos')

      const data = await res.json()
      setTodos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  };


  const createTodo = async (title) => {
    try {
      setError(null);

      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) throw new Error('Failed to create todo');

      const newTodo = await res.json();


      setTodos(prev => [newTodo, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  };


  const toggleTodo = async (id, completed) => {
  try {
    setError(null);

    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    });

    if (!res.ok) throw new Error('Failed to update todo');

    const updatedTodo = await res.json();

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? updatedTodo : todo
      )
    );
  } catch (err) {
    setError(err.message);
  }
};


  const deleteTodo = async (id) => {
    try {
      setError(null);

      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete todo');

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow">

        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Todo App
        </h1>
        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
            <h2 className='text-red-700 text-3xl'> {error} </h2>
          </div>
        )}

        <TodoForm onAddTodo={createTodo} />

        <div className="mt-4">
          <TodoList
            todos={todos}
            loading={loading}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>

        {todos.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Total: {todos.length} | Completed:{' '}
            {todos.filter(t => t.completed).length} | Pending:{' '}
            {todos.filter(t => !t.completed).length}
          </div>
        )}
      </div>
    </div>

  );
}

export default App;
