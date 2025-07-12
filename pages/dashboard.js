import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "User", // This will come from auth later
    subscription: "free", // free, premium, enterprise
    isAdmin: false, // Set to true for admin access
    appAccess: {
      adhdTools: true,
      wheelmate: true,
      anxietyTracker: false,
      burnoutPrevention: false,
      lexlocal: true,
      reportWriter: false
    }
  });

  const [stats, setStats] = useState({
    appsAvailable: 0,
    tasksCompleted: 0,
    daysStreak: 0,
    memberStatus: 'New',
    totalUsers: 0,
    revenue: 0,
    conversionRate: 0
  });

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showLexInterface, setShowLexInterface] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [lexCommand, setLexCommand] = useState('');
  const [lexResponse, setLexResponse] = useState('');
  const [systemLogs, setSystemLogs] = useState([]);

  // Enhanced apps array with admin controls
  const [apps, setApps] = useState([
    {
      id: 'adhd-tools',
      name: 'ADHD Tools',
      description: 'Focus, organization, and productivity tools designed for ADHD minds',
      icon: '🧠',
      route: '/apps/adhd',
      available: user.appAccess.adhdTools,
      tier: 'free',
      category: 'productivity',
      features: ['Task Management', 'Focus Timer', 'Habit Tracking'],
      status: 'active',
      usage: 156,
      revenue: 0,
      conversionRate: 0
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
      features: ['Visual Planning', 'Goal Setting', 'Progress Tracking'],
      status: 'active',
      usage: 89,
      revenue: 0,
      conversionRate: 0
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
      features: ['Smart Chat', 'Custom Responses', 'Learning Mode'],
      status: 'active',
      usage: 234,
      revenue: 0,
      conversionRate: 0
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
      features: ['Auto-Generation', 'Templates', 'Export Options'],
      status: 'active',
      usage: 45,
      revenue: 1250,
      conversionRate: 12.5
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
      features: ['Mood Tracking', 'Triggers Analysis', 'Coping Strategies'],
      status: 'active',
      usage: 78,
      revenue: 890,
      conversionRate: 8.9
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
      features: ['Stress Monitoring', 'Recovery Plans', 'Work-Life Balance'],
      status: 'active',
      usage: 67,
      revenue: 745,
      conversionRate: 9.2
    }
  ]);

  // Admin key combination to enable admin mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.key === 'A') {
        setUser(prev => ({ ...prev, isAdmin: !prev.isAdmin }));
        setAdminMode(!adminMode);
        addSystemLog('Admin mode toggled');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [adminMode]);

  // Calculate stats on component mount
  useEffect(() => {
    const availableApps = apps.filter(app => app.available).length;
    const totalRevenue = apps.reduce((sum, app) => sum + app.revenue, 0);
    const avgConversion = apps.reduce((sum, app) => sum + app.conversionRate, 0) / apps.length;
    
    const savedStats = {
      appsAvailable: availableApps,
      tasksCompleted: parseInt(localStorage.getItem('tasksCompleted') || '0'),
      daysStreak: parseInt(localStorage.getItem('daysStreak') || '0'),
      memberStatus: localStorage.getItem('memberStatus') || 'New',
      totalUsers: apps.reduce((sum, app) => sum + app.usage, 0),
      revenue: totalRevenue,
      conversionRate: avgConversion
    };
    setStats(savedStats);
  }, [apps, user.appAccess]);

  const addSystemLog = (message) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      message,
      type: 'system'
    };
    setSystemLogs(prev => [newLog, ...prev.slice(0, 49)]); // Keep last 50 logs
  };

  const handleLexCommand = async (command) => {
    addSystemLog(`Lex command: ${command}`);
    
    // Simulate LexLocal processing
    setLexResponse('Processing...');
    
    setTimeout(() => {
      let response = '';
      
      // Parse admin commands
      if (command.toLowerCase().includes('update app')) {
        const appName = command.match(/update app (\w+)/i)?.[1];
        if (appName) {
          response = `Updating ${appName}... Configuration changes applied.`;
          addSystemLog(`App ${appName} updated via Lex`);
        }
      } else if (command.toLowerCase().includes('analytics')) {
        response = `Analytics Summary:\n• Total Users: ${stats.totalUsers}\n• Revenue: $${stats.revenue}\n• Conversion Rate: ${stats.conversionRate.toFixed(1)}%`;
      } else if (command.toLowerCase().includes('toggle app')) {
        const appName = command.match(/toggle app (\w+)/i)?.[1];
        if (appName) {
          setApps(prev => prev.map(app => 
            app.id.includes(appName.toLowerCase()) 
              ? { ...app, status: app.status === 'active' ? 'inactive' : 'active' }
              : app
          ));
          response = `App ${appName} status toggled.`;
          addSystemLog(`App ${appName} toggled via Lex`);
        }
      } else if (command.toLowerCase().includes('pricing')) {
        response = `Current Pricing Strategy:\n• Free Tier: 3 apps\n• Premium: $9.99/month\n• Enterprise: Custom pricing\n\nSuggestion: Consider A/B testing $7.99 price point.`;
      } else {
        response = `Command received: "${command}"\n\nAvailable commands:\n• "update app [name]" - Update app configuration\n• "analytics" - View performance metrics\n• "toggle app [name]" - Enable/disable app\n• "pricing" - View pricing strategy`;
      }
      
      setLexResponse(response);
    }, 1000);
  };

  const handleAppClick = (app) => {
    if (app.available && app.status === 'active') {
      trackAppUsage(app.id);
      router.push(app.route);
    } else if (app.status === 'inactive') {
      addSystemLog(`Attempted access to inactive app: ${app.name}`);
    } else {
      setSelectedApp(app);
      setShowUpgradeModal(true);
    }
  };

  const trackAppUsage = (appId) => {
    const usage = JSON.parse(localStorage.getItem('appUsage') || '{}');
    usage[appId] = (usage[appId] || 0) + 1;
    localStorage.setItem('appUsage', JSON.stringify(usage));
    
    // Update app usage in state
    setApps(prev => prev.map(app => 
      app.id === appId ? { ...app, usage: app.usage + 1 } : app
    ));
    
    addSystemLog(`App usage tracked: ${appId}`);
  };

  const handleUpgrade = (tier) => {
    router.push(`/pricing?plan=${tier}&app=${selectedApp?.id}`);
    addSystemLog(`Upgrade initiated: ${tier} plan for ${selectedApp?.name}`);
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

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header with Admin Controls */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {user.name}! 👋
                {user.isAdmin && <span className="text-red-500 text-sm ml-2">ADMIN</span>}
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
              
              {user.isAdmin && (
                <button 
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Admin Panel
                </button>
              )}
              
              <button 
                onClick={() => setShowLexInterface(!showLexInterface)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                🤖 Lex Control
              </button>
              
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

      {/* Admin Panel */}
      {showAdminPanel && user.isAdmin && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-red-800 mb-4">🔧 Admin Control Panel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Revenue Analytics</h3>
                <p className="text-2xl font-bold text-green-600">${stats.revenue}</p>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Conversion Rate</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.conversionRate.toFixed(1)}%</p>
                <p className="text-sm text-gray-600">Average Conversion</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-800 mb-2">Total Users</h3>
                <p className="text-2xl font-bold text-purple-600">{stats.totalUsers}</p>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-2">System Logs</h3>
              <div className="max-h-32 overflow-y-auto text-sm">
                {systemLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="text-gray-600 mb-1">
                    <span className="text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    : {log.message}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lex Interface */}
      {showLexInterface && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">🤖 LexLocal Command Interface</h2>
            <div className="space-y-4">
              <div>
                <textarea
                  value={lexCommand}
                  onChange={(e) => setLexCommand(e.target.value)}
                  placeholder="Enter command (e.g., 'update app adhd', 'analytics', 'toggle app wheelmate')"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleLexCommand(lexCommand)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Execute Command
                </button>
                <button
                  onClick={() => setLexCommand('')}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Clear
                </button>
              </div>
              {lexResponse && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Lex Response:</h4>
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap">{lexResponse}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
                ${app.available && app.status === 'active'
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
                  {user.isAdmin && (
                    <span className={`${getStatusColor(app.status)} px-2 py-1 rounded-full text-xs font-medium mb-1`}>
                      {app.status.toUpperCase()}
                    </span>
                  )}
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

              {/* Admin Stats */}
              {user.isAdmin && (
                <div className="mb-4 p-2 bg-gray-50 rounded text-xs">
                  <div>Usage: {app.usage} | Revenue: ${app.revenue}</div>
                  <div>Conversion: {app.conversionRate}%</div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <button
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${app.available && app.status === 'active'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                  disabled={!app.available || app.status !== 'active'}
                >
                  {app.available && app.status === 'active' ? 'Launch App' : 
                   app.status === 'inactive' ? 'Temporarily Disabled' : 'Upgrade to Access'}
                </button>
                {app.available && app.status === 'active' && (
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