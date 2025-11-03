'use client';

import { useState } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { useTheme } from '@/hooks/useTheme';
import { Filter } from '@/lib/types';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import Filters from '@/components/Filters';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import StorageWarning from '@/components/StorageWarning';

export default function Home() {
  const { tasks, addTask, toggleTask, editTask, deleteTask, clearCompleted, error } = useTodos();
  const { theme, toggleTheme } = useTheme();
  const [filter, setFilter] = useState<Filter>('all');

  const activeCount = tasks.filter((t) => !t.completed).length;
  const hasCompleted = tasks.some((t) => t.completed);

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Todo App</h1>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <StorageWarning error={error} />

        <TodoInput onAdd={addTask} />

        {tasks.length > 0 && <Filters currentFilter={filter} onFilterChange={setFilter} />}

        <TodoList tasks={tasks} filter={filter} onToggle={toggleTask} onEdit={editTask} onDelete={deleteTask} />

        <Footer
          activeCount={activeCount}
          hasCompleted={hasCompleted}
          onClearCompleted={clearCompleted}
        />
      </div>
    </main>
  );
}

