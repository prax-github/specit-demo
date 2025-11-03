# Todo App - Simple Task Management

A minimal, instant todo list application that saves locally in your browser. No login required, no installation needed, just open and start adding tasks.

## Features

- ✅ **Add Tasks**: Quickly add tasks by typing and pressing Enter
- ✅ **Complete Tasks**: Mark tasks as done with a checkbox
- ✅ **Edit Tasks**: Double-click to edit task text inline
- ✅ **Delete Tasks**: Remove unwanted tasks
- ✅ **Filter Tasks**: View all, active, or completed tasks
- ✅ **Clear Completed**: Remove all completed tasks at once
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Persistent Storage**: Tasks saved locally in browser
- ✅ **Keyboard Navigation**: Fully accessible with keyboard
- ✅ **Responsive Design**: Works on phone, tablet, and desktop

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage
- **Deployment**: Static site export

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd specit-demo
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

This creates an `out/` directory with static files ready for deployment.

### Deploy

The application can be deployed to any static hosting service:

- **Vercel**: `vercel`
- **Netlify**: Drag and drop the `out/` folder
- **GitHub Pages**: Use GitHub Actions or manually deploy
- **Any static host**: Upload the `out/` folder

## Project Structure

```
specit-demo/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main todo application
│   ├── globals.css      # Global styles and theme
│   └── not-found.tsx    # 404 page
├── components/          # React components
│   ├── TodoInput.tsx    # Task input field
│   ├── TodoItem.tsx     # Individual task item
│   ├── TodoList.tsx     # Task list container
│   ├── Filters.tsx      # Filter buttons
│   ├── Footer.tsx       # Task count and clear button
│   ├── ThemeToggle.tsx  # Light/dark theme switcher
│   ├── EmptyState.tsx   # Empty state message
│   └── StorageWarning.tsx # Storage error warning
├── hooks/               # Custom React hooks
│   ├── useTodos.ts      # Task management logic
│   ├── useTheme.ts      # Theme management
│   └── useLocalStorage.ts # Storage hook
├── lib/                 # Utilities
│   ├── types.ts         # TypeScript types
│   ├── storage.ts       # localStorage wrapper
│   └── utils.ts         # Helper functions
└── public/              # Static assets
    ├── robots.txt
    └── sitemap.xml
```

## Usage

1. **Add a Task**: Type in the input field and press Enter
2. **Complete a Task**: Click the checkbox next to any task
3. **Edit a Task**: Double-click on the task text
4. **Delete a Task**: Hover over a task and click the × button
5. **Filter Tasks**: Click All, Active, or Completed buttons
6. **Clear Completed**: Click "Clear completed" in the footer
7. **Toggle Theme**: Click the moon/sun icon in the top right

## Data Storage

All tasks are stored locally in your browser using localStorage. This means:
- Tasks persist across browser sessions
- No server or database required
- Data stays on your device (privacy-first)
- Tasks are specific to each browser/device

## Accessibility

The application follows WCAG 2.1 Level AA standards:
- Full keyboard navigation support
- Proper ARIA labels for screen readers
- High contrast colors in both themes
- Focus indicators for all interactive elements

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Development

### Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Tailwind CSS for styling

## License

MIT License - feel free to use and modify as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

