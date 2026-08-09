import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ParallaxScene from './components/ParallaxScene';
import TodoItem from './components/TodoItem';

const FILTERS = ['all', 'active', 'completed'];

const createTodo = (text) => ({
  id: crypto.randomUUID(),
  text,
  completed: false,
});

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('premium-todos');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch {
        localStorage.removeItem('premium-todos');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('premium-todos', JSON.stringify(todos));
  }, [todos]);

  const visibleTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    setTodos((current) => [createTodo(trimmed), ...current]);
    setDraft('');
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const saveEdit = () => {
    const trimmed = editingText.trim();
    if (!trimmed) {
      deleteTodo(editingId);
      cancelEdit();
      return;
    }

    setTodos((current) =>
      current.map((todo) => (todo.id === editingId ? { ...todo, text: trimmed } : todo))
    );
    cancelEdit();
  };

  const clearCompleted = () => {
    setTodos((current) => current.filter((todo) => !todo.completed));
  };

  return (
    <div className="min-h-screen bg-transparent px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <ParallaxScene totalCount={todos.length} completedCount={completedCount} remainingCount={remainingCount} />

        <motion.main
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]"
        >
          <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-6">
            <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-3 sm:p-4">
              <label htmlFor="todo-input" className="mb-3 block text-sm font-medium text-slate-300">
                Add a fresh focus
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="todo-input"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="What deserves your attention today?"
                  className="flex-1 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01]"
                >
                  Add task
                </button>
              </div>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
                {FILTERS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition ${
                      filter === item ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={clearCompleted}
                disabled={completedCount === 0}
                className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition disabled:cursor-not-allowed disabled:opacity-40 hover:border-white/20 hover:text-white"
              >
                Clear completed
              </button>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-3 sm:p-4">
              <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
                <span>{remainingCount} remaining</span>
                <span>{todos.length} total</span>
              </div>
              <AnimatePresence mode="popLayout">
                {visibleTodos.length > 0 ? (
                  <ul className="space-y-3">
                    {visibleTodos.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        isEditing={editingId === todo.id}
                        editingText={editingText}
                        onStartEdit={() => startEdit(todo)}
                        onCancelEdit={cancelEdit}
                        onEditChange={setEditingText}
                        onSaveEdit={saveEdit}
                        onToggle={() => toggleTodo(todo.id)}
                        onDelete={() => deleteTodo(todo.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            saveEdit();
                          }
                          if (event.key === 'Escape') {
                            event.preventDefault();
                            cancelEdit();
                          }
                        }}
                      />
                    ))}
                  </ul>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400"
                  >
                    {todos.length === 0 ? 'Your calm list is empty. Add a task to begin.' : 'No tasks match this filter right now.'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/70 p-5 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Flow</p>
              <h2 className="mt-2 text-xl font-semibold text-white">A premium rhythm for doing less, better.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                This experience keeps focus lightweight, responsive, and beautifully paced for daily capture and completion.
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Today’s momentum</p>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <span>Completed</span>
                  <span className="font-semibold text-emerald-300">{completedCount}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <span>Pending</span>
                  <span className="font-semibold text-sky-300">{remainingCount}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <span>Focus score</span>
                  <span className="font-semibold text-white">{Math.max(1, Math.round((remainingCount / Math.max(1, todos.length || 1)) * 100))}%</span>
                </div>
              </div>
            </div>
          </aside>
        </motion.main>
      </div>
    </div>
  );
};

export default App;
