export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateTaskId(): string {
  return Date.now().toString();
}

export function validateTaskText(text: string): { valid: boolean; error?: string } {
  const trimmed = text.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Task cannot be empty' };
  }
  
  if (trimmed.length > 1000) {
    return { valid: false, error: 'Task cannot exceed 1000 characters' };
  }
  
  return { valid: true };
}

