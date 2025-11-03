# Quick Start Guide

**Date**: 2025-01-27  
**Feature**: Static To-Do Website  
**Purpose**: Get started quickly with the todo application

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Modern code editor (VS Code recommended)

## Installation

### 1. Clone and Setup Project

```bash
# Create Next.js project
npx create-next-app@latest todo-app --typescript --tailwind --app

cd todo-app

# Install additional dependencies
npm install zustand  # Optional: if using Zustand for state
```

### 2. Project Structure

```
todo-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Main todo page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── TodoInput.tsx
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   ├── Filters.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── EmptyState.tsx
│   ├── lib/
│   │   ├── storage.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   └── hooks/
│       ├── useTodos.ts
│       ├── useTheme.ts
│       └── useLocalStorage.ts
├── public/
├── tests/
└── package.json
```

## Development

### 1. Configure Next.js for Static Export

Edit `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### 2. Create Type Definitions

Create `src/lib/types.ts`:

```typescript
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface TaskList {
  tasks: Task[];
  version: string;
}

export type Filter = "all" | "active" | "completed";
export type Theme = "light" | "dark";
```

### 3. Create Storage Wrapper

Create `src/lib/storage.ts`:

```typescript
import { Task, TaskList, Theme } from './types';

const STORAGE_KEY = 'todo-app';
const THEME_KEY = 'todo-app-theme';
const CURRENT_VERSION = '1.0.0';

export async function getTasks(): Promise<Task[]> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const taskList: TaskList = JSON.parse(stored);
    return taskList.tasks;
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<boolean> {
  try {
    const taskList: TaskList = {
      tasks,
      version: CURRENT_VERSION
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
    return true;
  } catch (error) {
    console.error('Failed to save tasks:', error);
    return false;
  }
}

export async function getTheme(): Promise<Theme> {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    return (theme as Theme) || 'light';
  } catch (error) {
    return 'light';
  }
}

export async function saveTheme(theme: Theme): Promise<boolean> {
  try {
    localStorage.setItem(THEME_KEY, theme);
    return true;
  } catch (error) {
    console.error('Failed to save theme:', error);
    return false;
  }
}
```

### 4. Create useTodos Hook

Create `src/hooks/useTodos.ts`:

```typescript
import { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { getTasks, saveTasks } from '@/lib/storage';

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks(updated);
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: Date.now() }
        : task
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const editTask = (id: string, text: string) => {
    const updated = tasks.map(task =>
      task.id === id
        ? { ...task, text: text.trim(), updatedAt: Date.now() }
        : task
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const clearCompleted = () => {
    const updated = tasks.filter(task => !task.completed);
    setTasks(updated);
    saveTasks(updated);
  };

  return {
    tasks,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    clearCompleted
  };
}
```

### 5. Create useTheme Hook

Create `src/hooks/useTheme.ts`:

```typescript
import { useState, useEffect } from 'react';
import { Theme } from '@/lib/types';
import { getTheme, saveTheme } from '@/lib/storage';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    getTheme().then(setThemeState);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    saveTheme(newTheme);
  };

  return { theme, toggleTheme };
}
```

### 6. Build Main Page Component

Create `src/app/page.tsx`:

```typescript
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

export default function Home() {
  const { tasks, addTask, toggleTask, editTask, deleteTask, clearCompleted } = useTodos();
  const { theme, toggleTheme } = useTheme();
  const [filter, setFilter] = useState<Filter>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;
  const hasCompleted = tasks.some(t => t.completed);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Todo App</h1>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <TodoInput onAdd={addTask} />
        
        {tasks.length > 0 && (
          <Filters currentFilter={filter} onFilterChange={setFilter} />
        )}

        <TodoList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
          filter={filter}
        />

        <Footer
          activeCount={activeCount}
          hasCompleted={hasCompleted}
          onClearCompleted={clearCompleted}
        />
      </div>
    </main>
  );
}
```

## Running the Application

### Development Mode

```bash
npm run dev
```

Open `http://localhost:3000` in browser.

### Production Build

```bash
npm run build
npm run start
```

### Static Export

```bash
npm run build
# Outputs static files to 'out' directory
```

## Testing

### Run Tests

```bash
npm run test        # Unit tests
npm run test:e2e    # Integration tests
```

### Accessibility Testing

```bash
npm run lint:a11y   # Run axe-core
```

### Performance Testing

```bash
npm run lighthouse  # Performance audit
```

## Deployment

### Vercel

```bash
npx vercel
```

### Netlify

```bash
netlify deploy --dir=out
```

### GitHub Pages

```bash
npm run build
git subtree push --prefix out origin gh-pages
```

## Next Steps

1. Implement remaining components (TodoInput, TodoItem, etc.)
2. Add Tailwind CSS styling
3. Implement dark mode theme
4. Add keyboard shortcuts
5. Test on mobile devices
6. Deploy to production

## Troubleshooting

### localStorage not working

- Check browser settings (private mode may disable storage)
- Verify storage isn't disabled
- Check for quota exceeded errors

### Build errors

- Ensure TypeScript types are correct
- Run `npm run lint` to check errors
- Clear `.next` cache: `rm -rf .next`

### Performance issues

- Check bundle size: `npm run build`
- Analyze with webpack-bundle-analyzer
- Verify code splitting is working

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks API](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

