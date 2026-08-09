import { motion } from 'framer-motion';

const TodoItem = ({
  todo,
  isEditing,
  editingText,
  onStartEdit,
  onCancelEdit,
  onEditChange,
  onSaveEdit,
  onToggle,
  onDelete,
  onKeyDown,
}) => {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.22 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-lg shadow-slate-950/20"
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
            todo.completed
              ? 'border-emerald-400 bg-emerald-400/15 text-emerald-300'
              : 'border-slate-600 bg-slate-950/70 text-transparent hover:border-slate-400'
          }`}
        >
          {todo.completed ? '✓' : ''}
        </button>

        {isEditing ? (
          <div className="flex-1">
            <input
              value={editingText}
              onChange={(event) => onEditChange(event.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 outline-none ring-0"
            />
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={onSaveEdit}
                className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-slate-100 transition hover:bg-white/20"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancelEdit}
                className="rounded-full border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className={`text-sm leading-6 ${todo.completed ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
                {todo.text}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onStartEdit}
                className="rounded-full border border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="rounded-full border border-rose-500/30 px-2.5 py-1 text-xs font-medium text-rose-300 transition hover:bg-rose-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.li>
  );
};

export default TodoItem;
