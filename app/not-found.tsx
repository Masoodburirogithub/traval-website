// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-home mr-2"></i>
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            <i className="fas fa-envelope mr-2"></i>
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}