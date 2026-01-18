// app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-exclamation-triangle text-4xl text-red-600"></i>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We&apos;re sorry, but there was an error loading this page. Please try again.
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-redo mr-2"></i>
            Try Again
          </button>
          <Link
            href="/"
            className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            <i className="fas fa-home mr-2"></i>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}