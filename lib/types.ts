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

