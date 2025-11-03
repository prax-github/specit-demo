import { Task, TaskList, Theme } from './types';

const STORAGE_KEY = 'todo-app';
const THEME_KEY = 'todo-app-theme';
const CURRENT_VERSION = '1.0.0';

export class StorageError extends Error {
  constructor(
    message: string,
    public code: 'QUOTA_EXCEEDED' | 'STORAGE_DISABLED' | 'INVALID_DATA' | 'UNKNOWN'
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

function validateTask(task: unknown): task is Task {
  if (typeof task !== 'object' || task === null) {
    return false;
  }

  const t = task as Record<string, unknown>;

  if (
    typeof t.id !== 'string' ||
    typeof t.text !== 'string' ||
    typeof t.completed !== 'boolean' ||
    typeof t.createdAt !== 'number' ||
    typeof t.updatedAt !== 'number'
  ) {
    return false;
  }

  if (t.text.trim().length === 0 || t.text.length > 1000) {
    return false;
  }

  if (t.createdAt <= 0 || t.updatedAt < t.createdAt) {
    return false;
  }

  return true;
}

function validateTaskList(taskList: unknown): taskList is TaskList {
  if (typeof taskList !== 'object' || taskList === null) {
    return false;
  }

  const tl = taskList as Record<string, unknown>;

  if (!Array.isArray(tl.tasks) || typeof tl.version !== 'string') {
    return false;
  }

  if (!tl.tasks.every(validateTask)) {
    return false;
  }

  const ids = tl.tasks.map((t: Task) => t.id);
  if (new Set(ids).size !== ids.length) {
    return false;
  }

  return true;
}

export async function getTasks(): Promise<Task[]> {
  if (!isStorageAvailable()) {
    console.warn('localStorage is not available');
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    if (!validateTaskList(parsed)) {
      console.error('Invalid task list structure:', parsed);
      return [];
    }

    return parsed.tasks;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Failed to parse stored tasks:', error);
    } else {
      console.error('Failed to load tasks:', error);
    }
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<boolean> {
  if (!isStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }

  try {
    const taskList: TaskList = {
      tasks,
      version: CURRENT_VERSION,
    };

    const serialized = JSON.stringify(taskList);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      throw new StorageError('Storage quota exceeded', 'QUOTA_EXCEEDED');
    } else {
      console.error('Failed to save tasks:', error);
      throw new StorageError('Failed to save tasks', 'UNKNOWN');
    }
  }
}

export async function getTheme(): Promise<Theme> {
  if (!isStorageAvailable()) {
    return 'light';
  }

  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === 'light' || theme === 'dark') {
      return theme;
    }
    return 'light';
  } catch (error) {
    console.error('Failed to get theme:', error);
    return 'light';
  }
}

export async function saveTheme(theme: Theme): Promise<boolean> {
  if (!isStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }

  try {
    localStorage.setItem(THEME_KEY, theme);
    return true;
  } catch (error) {
    console.error('Failed to save theme:', error);
    return false;
  }
}

