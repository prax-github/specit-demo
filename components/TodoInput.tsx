'use client';

import { useState, KeyboardEvent } from 'react';
import { validateTaskText } from '@/lib/utils';

interface TodoInputProps {
  onAdd: (text: string) => void;
  placeholder?: string;
}

export default function TodoInput({ onAdd, placeholder = 'What needs to be done?' }: TodoInputProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const validation = validateTaskText(text);
    if (validation.valid) {
      onAdd(text);
      setText('');
      setError(null);
    } else {
      setError(validation.error || 'Invalid task');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      setText('');
      setError(null);
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Add new task"
        aria-invalid={!!error}
        aria-describedby={error ? 'task-error' : undefined}
        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-white placeholder-gray-400 dark:placeholder-gray-500"
      />
      {error && (
        <p id="task-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

