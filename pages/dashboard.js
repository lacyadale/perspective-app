
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "User", // This will come from auth later
    subscription: "free", // free, premium, enterprise
    appAccess: {
      adhdTools: true,
      wheelmate: true,
      anxietyTracker: false, // Not available in free tier
      burnoutPrevention: false,
      lexlocal: true,
      reportWriter: false // Premium feature
    }
  });

  const [stats, setStats] = useState({
    appsAvailable: 0,
    tasksCompleted: 0,
    daysStreak: 0,
    memberStatus: 'New'
  });

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const apps = [
    {
      id: 'adhd-tools',
      name: 'ADHD Tools',
      description: 'Focus, organization, and productivity tools designed for ADHD minds',
      icon: '🧠',
      route: '/apps/adhd',
      available: user.appAccess.adhdTools,
      tier: 'free',
      category: 'productivity',
      features: ['Task Management', 'Focus Timer', 'Habit Tracking']
    },
    {
      id: 'wheelmate',
      name: 'WheelMate',
      description: 'Visual organization system for managing life\'s complexities',
      icon: '⚙️',
      route: '/apps/wheelmate',
      available: user.appAccess.wheelmate,
      tier: 'free',
      category: 'organization',
      features: ['Visual Planning', 'Goal Setting', 'Progress Tracking']
    },
    {
      id: 'lexlocal',
      name: 'LexLocal',
      description: 'Your custom AI assistant for personalized support',
      icon: '🤖',
      route: '/apps/lexlocal',
      available: user.appAccess.lexlocal,
      tier: 'free',
      category: 'ai',
      features: ['Smart Chat', 'Custom Responses', 'Learning Mode']
    },
    {
      id: 'report-writer',
      name: 'Report Writer',
      description: 'AI-powered report generation for professional documents',
      icon: '📝',
      route: '/apps/report-writer',
      available: user.appAccess.reportWriter,
      tier: 'premium',
      category: 'productivity',
      features: ['Auto-Generation', 'Templates', 'Export Options']
    },
    {
      id: 'anxiety-tracker',
      name: 'Anxiety Tracker',
      description: 'Monitor and manage anxiety with personalized insights',
      icon: '🌱',
      route: '/apps/anxiety',
      available: user.appAccess.anxietyTracker,
      tier: 'premium',
      category: 'wellness',
      features: ['Mood Tracking', 'Triggers Analysis', 'Coping Strategies']
    },
    {
      id: 'burnout-prevention',
      name: 'Burnout Prevention',
      description: 'Proactive tools to maintain work-life balance and prevent burnout',
      icon: '🔥',
      route: '/apps/burnout',
      available: user.appAccess.burnoutPrevention,
      tier: 'premium',
      category: 'wellness',
      features: ['Stress Monitoring', 'Recovery Plans', 'Work-Life Balance']
    }
  ];

  // Calculate stats on component mount
  useEffect(() => {
    const availableApps = apps.filter(app => app.available).length;
    // These would come from your backend/localStorage in real implementation
    const savedStats = {
      appsAvailable: availableApps,
      tasksCompleted: parseInt(localStorage.getItem('tasksCompleted') || '0'),
      daysStreak: parseInt(localStorage.getItem('daysStreak') || '0'),
      memberStatus: localStorage.getItem('memberStatus') || 'New'
    };
    setStats(savedStats);
  }, [user.appAccess]);

  const handleAppClick = (app) => {
    if (app.available) {
      // Track usage for monetization insights
      trackAppUsage(app.id);
      router.push(app.route);
    } else {
      setSelectedApp(app);
      setShowUpgradeModal(true);
    }
  };

  const trackAppUsage = (appId) => {
    // Track usage for analytics and monetization
    const usage = JSON.parse(localStorage.getItem('appUsage') || '{}');
    usage[appId] = (usage[appId] || 0) + 1;
    localStorage.setItem('appUsage', JSON.stringify(usage));
  };

  const handleUpgrade = (tier) => {
    // Redirect to pricing page or handle upgrade flow
    router.push(`/pricing?plan=${tier}&app=${selectedApp?.id}`);
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'productivity': return '⚡';
      case 'wellness': return '🌟';
      case 'organization': return '📊';
      case 'ai': return '🚀';
      default: return '🔧';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Your personal wellness & productivity toolkit
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className={`${getTierColor(user.subscription)} px-4 py-2 rounded-full text-sm font-semibold`}>
                  {user.subscription.toUpperCase()} Plan
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.appsAvailable} apps available
                </p>
              </div>
              <button 
                onClick={() => router.push('/pricing')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => router.push('/apps/lexlocal')}
                className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <span>🤖</span>
                <span>Quick Chat</span>
              </button>
              <button 
                onClick={() => router.push('/apps/adhd')}
                className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors"
              >
                <span>⚡</span>
                <span>Focus Mode</span>
              </button>
            </div>
            <div className="text-sm text-gray-600">
              Last active: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Apps Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Apps</h2>
          <p className="text-gray-600">Choose from our suite of specialized tools</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => handleAppClick(app)}
              className={`
                bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl
                ${app.available 
                  ? 'hover:scale-105 border-2 border-transparent hover:border-blue-300 transform' 
                  : 'opacity-70 cursor-not-allowed bg-gray-50 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{app.icon}</div>
                  <div className="text-lg">{getCategoryIcon(app.category)}</div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`${getTierColor(app.tier)} px-2 py-1 rounded-full text-xs font-medium mb-1`}>
                    {app.tier.toUpperCase()}
                  </span>
                  {!app.available && (
                    <span className="text-red-500 text-xs">🔒</span>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {app.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {app.description}
              </p>

              {/* Feature List */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {app.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${app.available
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                  disabled={!app.available}
                >
                  {app.available ? 'Launch App' : 'Upgrade to Access'}
                </button>
                {app.available && (
                  <div className="text-xs text-gray-500">
                    Ready
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{stats.appsAvailable}</div>
              <div className="text-sm text-gray-600">Apps Available</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{stats.tasksCompleted}</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{stats.daysStreak}</div>
              <div className="text-sm text-gray-600">Days Streak</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">{stats.memberStatus}</div>
              <div className="text-sm text-gray-600">Member Status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="text-6xl mb-4">{selectedApp?.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Unlock {selectedApp?.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedApp?.description}
              </p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Features included:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {selectedApp?.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleUpgrade(selectedApp?.tier)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
                >
                  Upgrade to {selectedApp?.tier.toUpperCase()}
                </button>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
