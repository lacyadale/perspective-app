import Head from 'next/head';
import Link from 'next/link';
import Card from '../components/Card';

export default function Home() {
  const folders = [
    { 
      title: 'Anxiety', 
      path: '/folders/anxiety',
      description: 'Turn worry into focus with 5-minute reframes',
      users: '2.3k helped'
    },
    { 
      title: 'Burnout', 
      path: '/folders/burnout',
      description: 'Recover energy with micro-breaks that actually work',
      users: '1.8k helped'
    },
    { 
      title: 'ADHD', 
      path: '/folders/adhd',
      description: 'Beat procrastination with brain-friendly strategies',
      users: '3.1k helped'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 text-gray-800">
      <Head>
        <title>Perspective App - Turn Mental Health Challenges Into Superpowers</title>
        <meta name="description" content="Transform anxiety, burnout, and ADHD from obstacles into advantages. Quick, evidence-based strategies that actually work." />
      </Head>
      
      {/* Hero Section */}
      <div className="px-8 pt-16 pb-8 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Turn Your Brain's "Bugs" Into <span className="text-yellow-600">Features</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Stop fighting your anxiety, burnout, and ADHD. Learn to redirect them into productivity superpowers in under 5 minutes.
        </p>
        
        {/* Quick Stats */}
        <div className="flex justify-center space-x-8 mb-12 text-sm text-gray-500">
          <div><span className="font-semibold text-gray-800">7.2k+</span> people helped</div>
          <div><span className="font-semibold text-gray-800">&lt; 5 min</span> per strategy</div>
          <div><span className="font-semibold text-gray-800">Evidence-based</span> methods</div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="px-8 pb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
          Choose Your Challenge → Get Your Superpower
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {folders.map((folder) => (
            <Link key={folder.title} href={folder.path} className="group block transform hover:scale-105 transition-all duration-200">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-yellow-400">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                    {folder.title}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {folder.users}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{folder.description}</p>
                <div className="text-yellow-600 font-medium text-sm group-hover:text-yellow-700">
                  Start Now →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick CTA */}
      <div className="bg-yellow-400 text-center py-8 px-8">
        <p className="text-gray-800 font-medium">
          💡 <strong>Quick tip:</strong> Most people see results in their first session. Which challenge resonates most with you right now?
        </p>
      </div>
    </div>
  );
}
