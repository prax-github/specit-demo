'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { getTasks, saveTasks } from '@/lib/storage';
import { generateTaskId } from '@/lib/utils';

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const syncToStorage = async (updatedTasks: Task[]) => {
    try {
      await saveTasks(updatedTasks);
      setError(null);
    } catch (err) {
      console.error('Failed to save tasks:', err);
      setError('Failed to save tasks');
      throw err;
    }
  };

  const addTask = (text: string) => {
    const newTask: Task = {
      id: generateTaskId(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    syncToStorage(updated);
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: Date.now() }
        : task
    );
    setTasks(updated);
    syncToStorage(updated);
  };

  const editTask = (id: string, text: string) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, text: text.trim(), updatedAt: Date.now() }
        : task
    );
    setTasks(updated);
    syncToStorage(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    syncToStorage(updated);
  };

  const clearCompleted = () => {
    const updated = tasks.filter((task) => !task.completed);
    setTasks(updated);
    syncToStorage(updated);
  };

  return {
    tasks,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    clearCompleted,
    isLoading,
    error,
  };
}

