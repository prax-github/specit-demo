'use client';

import { Filter } from '@/lib/types';

interface FiltersProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export default function Filters({ currentFilter, onFilterChange }: FiltersProps) {
  return (
    <div className="flex gap-2 justify-center my-8">
      <button
        onClick={() => onFilterChange('all')}
        aria-pressed={currentFilter === 'all'}
        aria-label="Show all tasks"
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white ${
          currentFilter === 'all'
            ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('active')}
        aria-pressed={currentFilter === 'active'}
        aria-label="Show active tasks"
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white ${
          currentFilter === 'active'
            ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        aria-pressed={currentFilter === 'completed'}
        aria-label="Show completed tasks"
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white ${
          currentFilter === 'completed'
            ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        Completed
      </button>
    </div>
  );
}

