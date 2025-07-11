import { useRouter } from 'next/router';

export default function WheelMateRoute() {
  const router = useRouter();
  const { slug } = router.query;
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            WheelMate - Organization Tools
          </h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              🚧 Coming Soon
            </h2>
            <p className="text-blue-700 mb-4">
              WheelMate is your comprehensive organization system for managing life's complexities.
            </p>
            <div className="space-y-2 text-sm text-blue-600">
              <p>• Visual wheel-based organization</p>
              <p>• Priority management</p>
              <p>• Task categorization</p>
              <p>• Progress tracking</p>
            </div>
          </div>
          <div className="mt-6">
            <button 
              onClick={() => router.push('/dashboard')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}