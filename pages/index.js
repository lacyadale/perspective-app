import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

  const mentalHealthFolders = [
    { 
      title: 'Anxiety', 
      path: '/folders/anxiety',
      description: 'Turn worry into focus with 5-minute reframes',
      users: '2.3k helped',
      category: 'mental-health',
      icon: '🧠'
    },
    { 
      title: 'Burnout', 
      path: '/folders/burnout',
      description: 'Recover energy with micro-breaks that actually work',
      users: '1.8k helped',
      category: 'mental-health',
      icon: '⚡'
    },
    { 
      title: 'ADHD', 
      path: '/folders/adhd',
      description: 'Beat procrastination with brain-friendly strategies',
      users: '3.1k helped',
      category: 'mental-health',
      icon: '🎯'
    },
  ];

  const productivityTools = [
    {
      title: 'Report Writer',
      path: '/report-writer',
      description: 'Generate professional reports with AI assistance',
      users: '1.2k created',
      category: 'productivity',
      icon: '📊'
    },
    {
      title: 'Wheel Mate',
      path: '/wheel-mate',
      description: 'Interactive decision-making and planning wheels',
      users: '890 decisions',
      category: 'productivity',
      icon: '🎡'
    },
    {
      title: 'Task Optimizer',
      path: '/task-optimizer',
      description: 'Break down complex tasks into manageable steps',
      users: '1.5k optimized',
      category: 'productivity',
      icon: '✅'
    },
  ];

  const creativeTools = [
    {
      title: 'Idea Generator',
      path: '/idea-generator',
      description: 'Spark creativity with AI-powered brainstorming',
      users: '2.1k ideas',
      category: 'creative',
      icon: '💡'
    },
    {
      title: 'Content Planner',
      path: '/content-planner',
      description: 'Plan and organize your content strategy',
      users: '750 plans',
      category: 'creative',
      icon: '📝'
    },
    {
      title: 'Mood Board',
      path: '/mood-board',
      description: 'Visual inspiration and concept development',
      users: '580 boards',
      category: 'creative',
      icon: '🎨'
    },
  ];

  const allFeatures = [...mentalHealthFolders, ...productivityTools, ...creativeTools];

  const getFilteredFeatures = () => {
    switch(activeCategory) {
      case 'mental-health':
        return mentalHealthFolders;
      case 'productivity':
        return productivityTools;
      case 'creative':
        return creativeTools;
      default:
        return allFeatures;
    }
  };

  const categories = [
    { id: 'all', label: 'All Features', count: allFeatures.length },
    { id: 'mental-health', label: 'Mental Health', count: mentalHealthFolders.length },
    { id: 'productivity', label: 'Productivity', count: productivityTools.length },
    { id: 'creative', label: 'Creative', count: creativeTools.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 text-gray-800">
      <Head>
        <title>Perspective App Dashboard - Your Complete Toolkit</title>
        <meta name="description" content="Access all your mental health, productivity, and creative tools in one place. Transform challenges into superpowers." />
      </Head>
      
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Perspective</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Profile
              </Link>
              <Link href="/settings" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Settings
              </Link>
              <Link href="/help" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Help
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-8 pt-12 pb-8 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">
          Your Complete <span className="text-yellow-600">Toolkit</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform challenges into superpowers with mental health strategies, productivity tools, and creative resources.
        </p>
        
        {/* Quick Stats */}
        <div className="flex justify-center space-x-8 mb-8 text-sm text-gray-500">
          <div><span className="font-semibold text-gray-800">12+</span> tools available</div>
          <div><span className="font-semibold text-gray-800">7.2k+</span> people helped</div>
          <div><span className="font-semibold text-gray-800">&lt; 5 min</span> quick sessions</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-8 mb-8">
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-sm p-1 flex space-x-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-yellow-400 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {getFilteredFeatures().map((feature) => (
            <Link key={feature.title} href={feature.path} className="group block transform hover:scale-105 transition-all duration-200">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-yellow-400 h-full">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {feature.users}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded capitalize">
                    {feature.category.replace('-', ' ')}
                  </span>
                  <div className="text-yellow-600 font-medium text-sm group-hover:text-yellow-700">
                    Open →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white border-t border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/quick-session" className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
              🚀 Start Quick Session
            </Link>
            <Link href="/recent" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              📈 View Recent Activity
            </Link>
            <Link href="/favorites" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              ⭐ My Favorites
            </Link>
            <Link href="/progress" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              📊 Progress Tracker
            </Link>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-yellow-400 text-center py-8 px-8">
        <p className="text-gray-800 font-medium">
          💡 <strong>New here?</strong> Start with a mental health challenge or explore productivity tools. Most people see results in their first session.
        </p>
      </div>
    </div>
  );
}