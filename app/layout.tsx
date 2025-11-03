import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Todo App - Simple Task Management',
  description: 'A minimal, instant todo list that saves locally in your browser. No login required.',
  keywords: ['todo', 'task management', 'productivity', 'local storage'],
  authors: [{ name: 'Todo App' }],
  creator: 'Todo App',
  publisher: 'Todo App',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Todo App - Simple Task Management',
    description: 'A minimal, instant todo list that saves locally in your browser.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Todo App - Simple Task Management',
    description: 'A minimal, instant todo list that saves locally in your browser.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

