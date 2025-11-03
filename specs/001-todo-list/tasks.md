# Tasks: Static To-Do Website

**Input**: Design documents from `/specs/001-todo-list/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No test tasks included. Tests are OPTIONAL and not explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Following Next.js App Router structure from plan.md:
- **Components**: `src/components/`
- **Hooks**: `src/hooks/`
- **Utilities**: `src/lib/`
- **App**: `src/app/`
- **Tests**: `tests/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Next.js project with TypeScript and Tailwind CSS
- [ ] T002 [P] Configure Next.js for static export in next.config.js
- [ ] T003 [P] Configure ESLint and Prettier with Next.js recommended settings
- [ ] T004 Create project directory structure (components, hooks, lib, tests)
- [ ] T005 [P] Setup TypeScript configuration and path aliases
- [ ] T006 [P] Configure Tailwind CSS with theme colors and responsive breakpoints

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Create type definitions in src/lib/types.ts (Task, TaskList, Filter, Theme)
- [ ] T008 [P] Create localStorage wrapper functions in src/lib/storage.ts (getTasks, saveTasks, getTheme, saveTheme)
- [ ] T009 [P] Create useLocalStorage generic hook in src/hooks/useLocalStorage.ts
- [ ] T010 [P] Create utility functions in src/lib/utils.ts for task validation and helpers
- [ ] T011 Create root layout in src/app/layout.tsx with metadata and SEO tags
- [ ] T012 Create global styles in src/app/globals.css with CSS variables for theming
- [ ] T013 [P] Create 404 page in src/app/not-found.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Basic Task Management (Priority: P1) 🎯 MVP

**Goal**: Users can add tasks, mark them complete, see progress, and have tasks persist across sessions

**Independent Test**: A user can open the website, add 3-5 tasks, mark 2 as complete, refresh the page, and verify all tasks persist with correct completion state displayed. The footer shows the remaining active task count.

### Implementation for User Story 1

- [ ] T014 [P] [US1] Create useTodos custom hook in src/hooks/useTodos.ts with addTask, toggleTask, saveTasks integration
- [ ] T015 [P] [US1] Create TodoInput component in src/components/TodoInput.tsx with Enter key handling and validation
- [ ] T016 [P] [US1] Create TodoItem component in src/components/TodoItem.tsx with checkbox and completed styling
- [ ] T017 [P] [US1] Create TodoList component in src/components/TodoList.tsx to render filtered tasks
- [ ] T018 [US1] Create main page in src/app/page.tsx integrating useTodos, TodoInput, TodoList, and Footer
- [ ] T019 [US1] Implement empty state display with friendly message in TodoList component
- [ ] T020 [US1] Add keyboard accessibility (Enter, Escape) and ARIA labels to all interactive elements

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Editing and Deletion (Priority: P2)

**Goal**: Users can edit task text inline and delete unwanted tasks

**Independent Test**: A user can add tasks, edit text by clicking on a task, delete tasks using delete icon, refresh the page, and verify all edits and deletions persist correctly.

### Implementation for User Story 2

- [ ] T021 [US2] Add editTask and deleteTask functions to useTodos hook in src/hooks/useTodos.ts
- [ ] T022 [P] [US2] Implement inline text editing in TodoItem component in src/components/TodoItem.tsx
- [ ] T023 [P] [US2] Add delete icon button to TodoItem component in src/components/TodoItem.tsx
- [ ] T024 [US2] Integrate edit and delete functionality in page.tsx handlers
- [ ] T025 [US2] Add keyboard shortcuts for edit mode (Enter to save, Escape to cancel)
- [ ] T026 [US2] Add visual focus indicators for edit mode and delete button

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Task Filtering and Organization (Priority: P3)

**Goal**: Users can filter tasks by status and clear all completed tasks

**Independent Test**: A user can create active and completed tasks, use All/Active/Completed filter buttons, clear all completed tasks, refresh the page, and verify remaining tasks persist and filter resets to All.

### Implementation for User Story 3

- [ ] T027 [P] [US3] Create Filters component in src/components/Filters.tsx with All/Active/Completed buttons
- [ ] T028 [P] [US3] Add clearCompleted function to useTodos hook in src/hooks/useTodos.ts
- [ ] T029 [P] [US3] Create Footer component in src/components/Footer.tsx with active count and clear button
- [ ] T030 [US3] Integrate Filters and Footer components in page.tsx with filter state management
- [ ] T031 [US3] Implement filtered task display logic in TodoList component
- [ ] T032 [US3] Add conditional clear button visibility when completed tasks exist
- [ ] T033 [US3] Add ARIA labels and keyboard navigation for filter buttons

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Theme Preference and Accessibility (Priority: P4)

**Goal**: Users can toggle between light/dark themes with persisted preference and enhanced accessibility

**Independent Test**: A user can toggle theme, verify visual changes, refresh the page, and confirm theme persists. User can navigate entire app with keyboard only and all interactive elements have clear focus indicators.

### Implementation for User Story 4

- [ ] T034 [P] [US4] Create useTheme custom hook in src/hooks/useTheme.ts with toggle and persistence
- [ ] T035 [P] [US4] Create ThemeToggle component in src/components/ThemeToggle.tsx
- [ ] T036 [US4] Add dark theme color variables to globals.css
- [ ] T037 [US4] Apply theme variables throughout all components (TodoInput, TodoItem, Filters, Footer)
- [ ] T038 [US4] Integrate ThemeToggle in page.tsx header
- [ ] T039 [US4] Ensure all interactive elements meet WCAG 2.1 AA contrast requirements
- [ ] T040 [US4] Add comprehensive keyboard navigation support across all components
- [ ] T041 [US4] Verify and fix all ARIA labels for screen reader compatibility

**Checkpoint**: All user stories should now be independently functional with full accessibility

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T042 [P] Add storage quota exceeded error handling in src/lib/storage.ts
- [ ] T043 [P] Add storage unavailable warning banner component
- [ ] T044 Add responsive design breakpoints for mobile, tablet, and desktop
- [ ] T045 [P] Implement progressive enhancement fallback for no-JavaScript mode
- [ ] T046 [P] Add input sanitization to prevent XSS attacks
- [ ] T047 Create robots.txt in public/ directory
- [ ] T048 Create sitemap.xml in public/ directory
- [ ] T049 [P] Add favicon and app icons in public/ directory
- [ ] T050 Optimize bundle size and verify Lighthouse performance >90
- [ ] T051 Run accessibility audit and fix any issues
- [ ] T052 Validate all pages with HTML validator
- [ ] T053 Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] T054 Create comprehensive README with setup and deployment instructions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can be developed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Extends US1 but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Extends US1/US2 but independently testable
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Cosmetic enhancements, independently testable

### Within Each User Story

- Core functionality before enhancements
- Components before integration
- Accessibility features throughout
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003, T005, T006)
- All Foundational tasks marked [P] can run in parallel (T008, T009, T010, T013)
- User stories can be worked on in parallel by different developers after Phase 2
- Component creation within each story marked [P] can run in parallel
- Polish tasks marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create TodoInput component in src/components/TodoInput.tsx"
Task: "Create TodoItem component in src/components/TodoItem.tsx"
Task: "Create TodoList component in src/components/TodoList.tsx"
Task: "Create useTodos custom hook in src/hooks/useTodos.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Basic Task Management)
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All tasks are immediately executable with clear file paths

