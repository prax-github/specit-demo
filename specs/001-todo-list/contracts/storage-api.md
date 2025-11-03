# Storage API Contract

**Date**: 2025-01-27  
**Feature**: Static To-Do Website  
**Purpose**: Define localStorage wrapper API for task persistence

## Overview

This contract defines the interface for browser localStorage operations used for persisting task data and theme preferences. All methods must handle errors gracefully and provide fallback behavior when storage is unavailable.

---

## Types

```typescript
interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

interface TaskList {
  tasks: Task[];
  version: string;
}

type Theme = "light" | "dark";
```

---

## Storage Operations

### getTasks()

Retrieve all tasks from localStorage.

**Returns**: `Promise<Task[]>`  
**Errors**: Returns empty array if storage fails or data is corrupted  
**Behavior**: 
- Validates stored JSON structure
- Falls back to empty array on any error
- Logs errors for debugging

**Example**:
```typescript
const tasks = await getTasks();
// Returns: Task[] or []
```

---

### saveTasks(tasks: Task[])

Persist tasks to localStorage.

**Parameters**: `tasks` - Array of Task objects  
**Returns**: `Promise<boolean>` - true on success, false on failure  
**Errors**: Handles quota exceeded, storage disabled, JSON serialization errors  
**Behavior**:
- Wraps tasks in TaskList structure with version
- Creates backup before writing (optional for MVP)
- Provides user feedback on failure

**Example**:
```typescript
const success = await saveTasks([...tasks]);
if (!success) {
  showStorageWarning();
}
```

---

### getTheme()

Retrieve theme preference from localStorage.

**Returns**: `Promise<Theme>`  
**Errors**: Returns "light" as default if storage unavailable  
**Behavior**:
- Returns user's preferred theme
- Falls back to system preference or "light"
- Handles invalid stored values gracefully

**Example**:
```typescript
const theme = await getTheme();
// Returns: "light" or "dark"
```

---

### saveTheme(theme: Theme)

Persist theme preference to localStorage.

**Parameters**: `theme` - "light" or "dark"  
**Returns**: `Promise<boolean>` - true on success, false on failure  
**Errors**: Silent failure, continues with in-memory theme  
**Behavior**:
- Stores immediately on user toggle
- Updates UI optimistically
- Fails silently if storage unavailable

**Example**:
```typescript
await saveTheme("dark");
```

---

## Error Handling

### StorageError

Custom error type for storage operations.

```typescript
class StorageError extends Error {
  constructor(
    message: string,
    public code: 'QUOTA_EXCEEDED' | 'STORAGE_DISABLED' | 'INVALID_DATA' | 'UNKNOWN'
  ) {
    super(message);
  }
}
```

### Error Codes

- `QUOTA_EXCEEDED`: Browser storage quota exceeded, user should clear data
- `STORAGE_DISABLED`: localStorage disabled in browser settings
- `INVALID_DATA`: Corrupted or invalid JSON in storage
- `UNKNOWN`: Unexpected error, fallback gracefully

---

## Validation

### validateTask(task: unknown): task is Task

Type guard to validate task structure.

**Returns**: boolean  
**Checks**:
- Required fields present
- Correct types for all fields
- Text length within limits
- Valid timestamps

---

### validateTaskList(taskList: unknown): taskList is TaskList

Type guard to validate task list structure.

**Returns**: boolean  
**Checks**:
- Valid array of tasks
- Version field present
- No duplicate IDs

---

## Storage Keys

| Key | Purpose | Data Type |
|-----|---------|-----------|
| `todo-app` | Main task storage | JSON string (TaskList) |
| `todo-app-theme` | Theme preference | String ("light"/"dark") |

---

## Performance Requirements

- Read operations: <1ms response time
- Write operations: <5ms response time
- No blocking of UI interactions
- Batch writes when possible to minimize localStorage calls

---

## Browser Compatibility

- **Supported**: All modern browsers with ES6+ support
- **Fallback**: Feature detection, graceful degradation
- **Storage Limits**: Typically 5-10MB per domain
- **Testing**: Verify in Chrome, Firefox, Safari, Edge

---

## Usage Example

```typescript
// Initialize application state
const tasks = await getTasks();
const theme = await getTheme();

// Update state
async function addTask(text: string) {
  const newTask = createTask(text);
  const updated = [...tasks, newTask];
  await saveTasks(updated);
}

// Handle errors
try {
  await saveTasks(tasks);
} catch (error) {
  if (error instanceof StorageError) {
    if (error.code === 'QUOTA_EXCEEDED') {
      showQuotaWarning();
    }
  }
}
```

---

## Testing Considerations

- Mock localStorage for unit tests
- Test error scenarios (disabled storage, quota exceeded)
- Verify data validation and sanitization
- Test concurrent reads/writes
- Validate backward compatibility with schema changes

