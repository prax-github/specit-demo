'use client';

import { Task, Filter } from '@/lib/types';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';

interface TodoListProps {
  tasks: Task[];
  filter: Filter;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ tasks, filter, onToggle, onEdit, onDelete }: TodoListProps) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (tasks.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <ul role="list" className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
      {filteredTasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

