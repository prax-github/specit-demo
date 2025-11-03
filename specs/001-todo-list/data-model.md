# Data Model

**Date**: 2025-01-27  
**Feature**: Static To-Do Website  
**Purpose**: Define data structures, entities, and their relationships

## Entities

### Task

Represents a single todo item in the user's task list.

**Fields**:
- `id` (string): Unique identifier for the task (UUID or timestamp-based)
- `text` (string): Task description text (required, max length: 1000 characters)
- `completed` (boolean): Completion status (false = active, true = completed)
- `createdAt` (number): Unix timestamp when task was created
- `updatedAt` (number): Unix timestamp when task was last modified

**Validation Rules**:
- `id`: Required, unique, non-empty string
- `text`: Required, non-empty string after trimming whitespace, max 1000 characters
- `completed`: Required, boolean value
- `createdAt`: Required, positive integer (Unix timestamp in milliseconds)
- `updatedAt`: Required, positive integer (Unix timestamp in milliseconds), >= createdAt

**State Transitions**:
1. Task created: `completed: false` → no change
2. Task completed: `completed: false` → `completed: true`
3. Task uncompleted: `completed: true` → `completed: false`
4. Task edited: `text` changes, `updatedAt` updates to current timestamp
5. Task deleted: Removed from collection entirely

**Business Rules**:
- Tasks cannot be empty strings
- Task text must be trimmed of leading/trailing whitespace before saving
- Completion toggle always updates `updatedAt` timestamp
- Text edits update both `text` and `updatedAt`

---

### TaskList

Collection of tasks managed by the user, stored in browser localStorage.

**Fields**:
- `tasks` (Array<Task>): Ordered collection of all tasks
- `version` (string): Data schema version (e.g., "1.0.0") for migration support

**Validation Rules**:
- `tasks`: Required, array of valid Task objects
- `version`: Required, semantic version string

**Business Rules**:
- Tasks array maintains insertion order (newest tasks at end)
- No duplicate task IDs allowed
- Empty tasks array is valid (empty state)
- Version is used for future data migration if schema changes

---

### FilterState

Current view filter selection affecting which tasks are displayed.

**Values**:
- `"all"`: Display all tasks regardless of completion status
- `"active"`: Display only tasks with `completed: false`
- `"completed"`: Display only tasks with `completed: true`

**Business Rules**:
- Filter state is not persisted across sessions (resets to "all" on reload)
- Filter change triggers re-render of displayed tasks
- Filter affects display only, not underlying data

---

### ThemePreference

User's selected theme preference stored with the task list.

**Values**:
- `"light"`: Light color scheme
- `"dark"`: Dark color scheme

**Business Rules**:
- Theme preference is persisted in localStorage
- Theme toggle updates persisted preference immediately
- On first visit, defaults to system preference or "light"
- Theme change should be instant (<100ms perceived delay)

---

### AppState

Complete application state combining all entities.

**Fields**:
- `tasks`: TaskList.tasks (Array<Task>)
- `filter`: FilterState (string: "all" | "active" | "completed")
- `theme`: ThemePreference (string: "light" | "dark")

**Business Rules**:
- Tasks and theme are persisted, filter is ephemeral
- State updates trigger React re-renders
- localStorage syncs on every state change
- Optimistic UI updates (no loading states needed)

---

## Data Storage

### localStorage Structure

**Key**: `"todo-app"`

**Value**: JSON string containing TaskList object
```json
{
  "tasks": [
    {
      "id": "task-123",
      "text": "Complete project proposal",
      "completed": false,
      "createdAt": 1706371200000,
      "updatedAt": 1706371200000
    }
  ],
  "version": "1.0.0"
}
```

**Theme Storage Key**: `"todo-app-theme"`

**Value**: String (`"light"` or `"dark"`)

### Error Handling

**Storage Unavailable**:
- Gracefully degrade: display UI normally
- Show warning banner to user
- Disable persistence operations
- Store in memory only (lost on refresh)

**Storage Quota Exceeded**:
- Catch quota exceeded error
- Display user-friendly message
- Suggest clearing browser data
- Allow deletion of old tasks

**Corrupted Data**:
- Validate JSON structure on load
- Fallback to empty state if invalid
- Log error for debugging
- Prevent data loss through validation

---

## Data Operations

### Create Task

**Input**: Task text string
**Process**:
1. Validate text (non-empty, trimmed, < 1000 chars)
2. Generate unique ID
3. Create Task object with current timestamp
4. Append to tasks array
5. Persist to localStorage
6. Update UI

**Errors**: Invalid text, localStorage quota exceeded

---

### Update Task Completion

**Input**: Task ID, new completed state
**Process**:
1. Find task by ID
2. Update completed boolean
3. Update updatedAt timestamp
4. Persist to localStorage
5. Update UI

**Errors**: Task not found, localStorage failure

---

### Update Task Text

**Input**: Task ID, new text string
**Process**:
1. Validate text (non-empty, trimmed, < 1000 chars)
2. Find task by ID
3. Update text field
4. Update updatedAt timestamp
5. Persist to localStorage
6. Update UI

**Errors**: Invalid text, task not found, localStorage failure

---

### Delete Task

**Input**: Task ID
**Process**:
1. Find task by ID
2. Remove from tasks array
3. Persist to localStorage
4. Update UI

**Errors**: Task not found, localStorage failure

---

### Delete All Completed Tasks

**Input**: None
**Process**:
1. Filter tasks to remove completed ones
2. Update tasks array
3. Persist to localStorage
4. Update UI

**Errors**: localStorage failure

---

### Change Filter

**Input**: Filter state string
**Process**:
1. Update filter state (in-memory only)
2. Filter displayed tasks
3. Re-render UI

**Errors**: None (ephemeral state)

---

### Toggle Theme

**Input**: None
**Process**:
1. Toggle between "light" and "dark"
2. Persist to localStorage
3. Apply CSS classes
4. Update UI immediately

**Errors**: localStorage failure (graceful degradation)

---

## Data Validation

### Task Validation

```typescript
function validateTask(task: Task): boolean {
  // All required fields present
  if (!task.id || !task.text || typeof task.completed !== 'boolean') {
    return false;
  }
  
  // Text validation
  const trimmed = task.text.trim();
  if (trimmed.length === 0 || trimmed.length > 1000) {
    return false;
  }
  
  // Timestamp validation
  if (task.createdAt <= 0 || task.updatedAt < task.createdAt) {
    return false;
  }
  
  return true;
}
```

---

### TaskList Validation

```typescript
function validateTaskList(taskList: TaskList): boolean {
  // Required fields
  if (!Array.isArray(taskList.tasks) || !taskList.version) {
    return false;
  }
  
  // All tasks valid
  if (!taskList.tasks.every(validateTask)) {
    return false;
  }
  
  // No duplicate IDs
  const ids = taskList.tasks.map(t => t.id);
  if (new Set(ids).size !== ids.length) {
    return false;
  }
  
  return true;
}
```

---

## Data Migration

### Version 1.0.0

**Current schema**: Standard Task/TaskList structure as defined above

**Migration Support**:
- Check `version` field on load
- Future migrations can transform data if version changes
- Always preserve backward compatibility
- Provide fallback to empty state if migration fails

---

## Performance Considerations

### Efficient Storage Access

- Batch localStorage writes when possible
- Debounce rapid consecutive writes
- Store only essential data (no derived/computed values)
- Minimize JSON serialization overhead

### Filtering and Sorting

- Filter tasks in-memory (fast, no external queries)
- Preserve task order from insertion
- No complex sorting required (simple linear filter)
- Virtual scrolling if >500 tasks displayed

### Memory Management

- Store only current tasks (no history/audit log for MVP)
- Clear completed tasks on demand
- No memory leaks from event listeners
- Proper React cleanup in hooks

---

## Edge Cases

1. **Long task text**: Truncate or scroll display, but store full text
2. **Many tasks**: Virtual scrolling if needed, but unlikely for personal todo
3. **Concurrent edits**: localStorage is synchronous, no race conditions
4. **Storage disabled**: Functionality works, data not persisted
5. **Corrupted data**: Validate and fallback to empty state
6. **Old browser**: Feature detection, graceful degradation
7. **Copy/paste tasks**: Text sanitization to prevent XSS
8. **Special characters**: Unicode support, emoji allowed

