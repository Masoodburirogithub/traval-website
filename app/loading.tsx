// app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-6">GURKHAS TRAVEL</h2>
        <p className="text-gray-600 mt-2">Loading your travel experience...</p>
      </div>
    </div>
  );
}