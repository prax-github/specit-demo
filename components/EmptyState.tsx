import { Filter } from '@/lib/types';

interface EmptyStateProps {
  filter: Filter;
}

const messages: Record<Filter, string> = {
  all: "No tasks yet. What's one thing you want to get done today?",
  active: 'No active tasks. Great job!',
  completed: 'No completed tasks yet.',
};

export default function EmptyState({ filter }: EmptyStateProps) {
  return (
    <div className="text-center py-12 px-4">
      <p className="text-lg text-gray-600 dark:text-gray-400">{messages[filter]}</p>
    </div>
  );
}

