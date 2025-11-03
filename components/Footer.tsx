'use client';

interface FooterProps {
  activeCount: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

export default function Footer({ activeCount, hasCompleted, onClearCompleted }: FooterProps) {
  if (!hasCompleted) {
    return null;
  }

  return (
    <footer className="mt-8 px-4 py-6 bg-white dark:bg-gray-900 rounded-lg shadow-md flex justify-between items-center">
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {activeCount === 0 ? (
          <span aria-live="polite">No tasks remaining</span>
        ) : (
          <span aria-live="polite">
            {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
          </span>
        )}
      </span>

      <button
        onClick={onClearCompleted}
        aria-label="Clear all completed tasks"
        className="px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-600 rounded transition-colors"
      >
        Clear completed
      </button>
    </footer>
  );
}

