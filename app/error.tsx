"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-start justify-center px-6">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        Error
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
        An unexpected error occurred while rendering this page. Please try
        again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
