# Component API Contracts

**Date**: 2025-01-27  
**Feature**: Static To-Do Website  
**Purpose**: Define React component interfaces and props contracts

## Overview

This contract defines the props, state, and behavior for each React component in the application. All components must be accessible, typed with TypeScript, and tested.

---

## Component Contracts

### TodoInput

Text input for adding new tasks.

**Props**:
```typescript
interface TodoInputProps {
  onAdd: (text: string) => void;
  placeholder?: string;
}
```

**Behavior**:
- Fires `onAdd` when Enter key pressed
- Trims whitespace before adding
- Validates text is non-empty
- Clears input after successful add
- Accessible: proper label, keyboard support

**Accessibility**:
- ARIA label: "Add new task"
- Keyboard: Enter to submit, Escape to clear
- Focus: Auto-focus on mount (optional)

---

### TodoItem

Individual task display with checkbox, text, edit, and delete.

**Props**:
```typescript
interface TodoItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}
```

**Behavior**:
- Checkbox toggles completion state
- Click text to edit inline
- Delete button removes task
- Visual styling for completed state
- Preserves inline edit on outside click

**Accessibility**:
- ARIA checked state on checkbox
- Keyboard shortcuts: Space/Escape to exit edit
- Focus management during edit mode
- Delete button labeled for screen readers

---

### TodoList

Container for task items with filtering.

**Props**:
```typescript
interface TodoListProps {
  tasks: Task[];
  filter: "all" | "active" | "completed";
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}
```

**Behavior**:
- Renders filtered subset of tasks
- Shows empty state when no tasks
- Scrollable list with proper overflow
- Maintains focus on filtered tasks

**Accessibility**:
- ARIA list role and landmarks
- Announce filter changes to screen readers
- Keyboard navigation between tasks

---

### Filters

Filter buttons for viewing all/active/completed tasks.

**Props**:
```typescript
interface FiltersProps {
  currentFilter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
}
```

**Behavior**:
- Highlights active filter button
- Switches view on click
- Resets to "all" on page reload

**Accessibility**:
- ARIA selected state on active button
- Keyboard navigation between filters
- Button labels clearly indicate filter

---

### Footer

Task count and clear completed button.

**Props**:
```typescript
interface FooterProps {
  activeCount: number;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}
```

**Behavior**:
- Shows count of remaining active tasks
- Clear button visible only if completed tasks exist
- Clears all completed tasks on click

**Accessibility**:
- Screen reader announces count
- Clear button properly labeled
- Confirmation pattern (optional for MVP)

---

### ThemeToggle

Light/dark theme switcher button.

**Props**:
```typescript
interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
  ariaLabel: string;
}
```

**Behavior**:
- Toggles between light/dark themes
- Updates CSS classes immediately
- Persists preference
- Icon or text shows current theme

**Accessibility**:
- ARIA label describes current theme
- Keyboard accessible
- Focus visible on toggle
- Announce theme change to screen readers

---

### EmptyState

Message shown when no tasks exist.

**Props**:
```typescript
interface EmptyStateProps {
  filter: "all" | "active" | "completed";
}
```

**Behavior**:
- Shows friendly message
- Different messages per filter state
- Encourages first task creation
- Optional illustration or icon

**Accessibility**:
- Semantic heading for message
- Text is readable and informative

---

## Custom Hooks

### useTodos

Task management state and operations.

**Returns**:
```typescript
interface UseTodosReturn {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  editTask: (id: string, text: string) => void;
  deleteTask: (id: string) => void;
  clearCompleted: () => void;
  isLoading: boolean;
  error: StorageError | null;
}
```

**Behavior**:
- Manages tasks state
- Syncs with localStorage
- Handles storage errors
- Provides loading state
- Optimistic UI updates

---

### useTheme

Theme preference state and toggle.

**Returns**:
```typescript
interface UseThemeReturn {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
```

**Behavior**:
- Reads theme from localStorage on mount
- Toggles theme on demand
- Applies theme to document
- Persists changes

---

### useLocalStorage

Generic localStorage hook for any key-value pair.

**Returns**:
```typescript
interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  error: StorageError | null;
}
```

**Behavior**:
- Read/write localStorage with validation
- Type-safe generic implementation
- Error handling built-in
- Subscription to changes

---

## Event Handlers

All event handlers must:
- Be typed with TypeScript
- Handle errors gracefully
- Provide user feedback on failure
- Not block UI interactions
- Be debounced when appropriate

---

## Styling Contracts

### CSS Class Names

Follow BEM or utility class naming:
- `.todo-input__field`
- `.todo-item--completed`
- `.filter-button--active`

### Theme Variables

CSS custom properties for theming:
```css
:root[data-theme="light"] {
  --bg-color: #ffffff;
  --text-color: #333333;
  --border-color: #e0e0e0;
}

:root[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
  --border-color: #404040;
}
```

---

## Performance Requirements

- Component render: <16ms for 60fps
- Initial mount: <100ms total
- Re-renders minimized with React.memo
- No unnecessary side effects
- Efficient list rendering (virtual scroll if >500 items)

---

## Testing Contracts

Each component must have:
- Unit tests for props and behavior
- Accessibility tests (axe-core)
- Snapshot tests for UI consistency
- Integration tests for user workflows

---

## Error Boundaries

React error boundary components for:
- Storage operation failures
- Invalid data handling
- Unexpected errors during render
- Graceful degradation messages

---

## Accessibility Contracts

All components must:
- Meet WCAG 2.1 Level AA standards
- Work with keyboard-only navigation
- Provide ARIA labels where needed
- Support screen readers
- Have visible focus indicators
- Maintain color contrast ratios

---

## Usage Examples

### TodoItem Usage

```typescript
<TodoItem
  task={task}
  onToggle={(id) => setTaskCompleted(id)}
  onEdit={(id, text) => updateTaskText(id, text)}
  onDelete={(id) => removeTask(id)}
/>
```

### useTodos Usage

```typescript
const { tasks, addTask, toggleTask, deleteTask } = useTodos();

function handleAdd() {
  addTask("New task text");
  // Automatically syncs to localStorage
}
```

### ThemeToggle Usage

```typescript
<ThemeToggle
  theme="dark"
  onToggle={() => setTheme('light')}
  ariaLabel="Switch to light theme"
/>
```

