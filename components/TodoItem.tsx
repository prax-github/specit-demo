'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Task } from '@/lib/types';

interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ task, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== task.text) {
      onEdit(task.id, editText);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <li className="group flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
        className="w-5 h-5 cursor-pointer accent-gray-900 dark:accent-white"
      />

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSaveEdit}
          aria-label="Edit task text"
          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-white"
        />
      ) : (
        <span
          onClick={handleStartEdit}
          className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-400 dark:text-gray-600' : ''}`}
          aria-label={`Task: ${task.text}. Double click to edit.`}
          onDoubleClick={handleStartEdit}
        >
          {task.text}
        </span>
      )}

      <button
        onClick={handleDelete}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
      >
        ×
      </button>
    </li>
  );
}

