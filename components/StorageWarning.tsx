'use client';

interface StorageWarningProps {
  error: string | null;
}

export default function StorageWarning({ error }: StorageWarningProps) {
  if (!error) {
    return null;
  }

  return (
    <div
      role="alert"
      className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mb-6"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-xl" role="img" aria-label="Warning">
            ⚠️
          </span>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Storage Issue:</strong> {error}. Your tasks may not be saved.
          </p>
        </div>
      </div>
    </div>
  );
}

