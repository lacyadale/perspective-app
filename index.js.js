// pages/index.js (Main Dashboard - your home page)
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '../components/Navigation';

export default function Dashboard() {
  const [apps, setApps] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
    fetchAnalytics();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await fetch('/api/lexlocal/apps');
      const data = await response.json();
      setApps(data.apps);
    } catch (error) {
      console.error('Error fetching apps:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/lexlocal/analytics');
      const data = await response.json();
      setAnalytics(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const toggleApp = async (appId) => {
    try {
      const response = await fetch(`/api/lexlocal/apps/${appId}/toggle`, {
        method: 'POST',
      });
      const result = await response.json();
      
      if (result.success) {
        fetchApps();
        fetchAnalytics();
      }
    } catch (error) {
      console.error('Error toggling app:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>LexLocal - Dashboard</title>
        <meta name="description" content="AI-powered app management and monetization platform" />
      </Head>

      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link href="/chat" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Chat with LexLocal
          </Link>
        </div>
        
        {/* Analytics Overview */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
              <p className="text-2xl font-bold text-green-600">${analytics.overview.totalRevenue}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
              <p className="text-2xl font-bold text-blue-600">{analytics.overview.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Avg Revenue/User</h3>
              <p className="text-2xl font-bold text-purple-600">${analytics.overview.avgRevenuePerUser}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-700">Conversion Rate</h3>
              <p className="text-2xl font-bold text-orange-600">{analytics.overview.overallConversionRate}%</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/chat" className="block p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold text-blue-600 mb-2">💬 Chat with LexLocal</h3>
                <p className="text-sm text-gray-600">Get insights and advice about your apps</p>
              </Link>
              <Link href="/analytics" className="block p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold text-green-600 mb-2">📊 View Analytics</h3>
                <p className="text-sm text-gray-600">Deep dive into your app performance</p>
              </Link>
              <Link href="/apps" className="block p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold text-purple-600 mb-2">🚀 Manage Apps</h3>
                <p className="text-sm text-gray-600">Configure and optimize your apps</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Apps Overview */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Your Apps</h2>
            <Link href="/apps" className="text-blue-500 hover:text-blue-600">
              View All →
            </Link>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {apps.slice(0, 3).map((app) => (
                <div key={app.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{app.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      app.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {app.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{app.category}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-green-600">${app.revenue}</span>
                    <span className="text-sm text-gray-500">{app.users} users</span>
                  </div>
                  <button
                    onClick={() => toggleApp(app.id)}
                    className={`w-full py-2 px-4 rounded text-sm font-medium ${
                      app.active
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {app.active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Insights */}
        {analytics?.insights && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Recent Insights</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {analytics.insights.topPerformer && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-1">🏆 Top Performer</h3>
                    <p className="text-green-700">
                      {analytics.insights.topPerformer.name} is your highest revenue generator with ${analytics.insights.topPerformer.revenue}
                    </p>
                  </div>
                )}
                {analytics.insights.growthOpportunities?.length > 0 && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-1">📈 Growth Opportunity</h3>
                    <p className="text-blue-700">
                      {analytics.insights.growthOpportunities[0].description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}