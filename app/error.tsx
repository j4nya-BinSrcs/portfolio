"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

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
    <div className="mx-auto flex min-h-dvh max-w-[1600px] flex-col items-start justify-center px-8">
      <p className="font-mono text-xs tracking-widest text-mute">error</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-tx sm:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-soft">
        An unexpected error occurred while rendering this page. Please try
        again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent-soft px-5 py-3 text-sm font-semibold text-tx transition-all hover:-translate-y-0.5 hover:brightness-110"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Try again
      </button>
    </div>
  );
}
