// pages/api/lexlocal/chat.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { messages, appData, context } = req.body;

  try {
    // Enhanced system prompt with app context
    const systemPrompt = `You are LexLocal, an advanced AI assistant for app management and monetization. You have access to the user's app data and can provide insights on:

1. **App Management**: Help with configuration, troubleshooting, and optimization
2. **Analytics**: Provide insights on user behavior, performance metrics, and growth
3. **Monetization**: Suggest pricing strategies, revenue optimization, and market analysis
4. **Technical Support**: Help with implementation, integrations, and best practices

Current App Data: ${JSON.stringify(appData, null, 2)}
Current Context: ${JSON.stringify(context, null, 2)}

Be helpful, concise, and actionable. Format responses with markdown for better readability. When discussing numbers, always format them clearly and provide context.`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.data.choices[0].message.content;
    
    // Log for monetization tracking
    console.log('LexLocal Query:', {
      timestamp: new Date().toISOString(),
      query: messages[messages.length - 1].content,
      context: context?.mode,
      tokenUsage: completion.data.usage
    });

    res.status(200).json({ response });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      message: error.message 
    });
  }
}

// pages/api/lexlocal/apps.js
let appDatabase = {
  apps: [
    {
      id: 'adhd-focus',
      name: 'ADHD Focus',
      active: true,
      revenue: 2500,
      users: 150,
      category: 'Mental Health',
      features: ['Focus Timer', 'Task Management', 'Progress Tracking'],
      pricing: { tier: 'Pro', price: 9.99 },
      metrics: {
        dailyActiveUsers: 45,
        monthlyActiveUsers: 120,
        conversionRate: 12.5,
        avgSessionTime: 18,
        retention: { day1: 85, day7: 72, day30: 45 }
      }
    },
    {
      id: 'anxiety-helper',
      name: 'Anxiety Helper',
      active: true,
      revenue: 1800,
      users: 200,
      category: 'Mental Health',
      features: ['Breathing Exercises', 'Meditation', 'Mood Tracking'],
      pricing: { tier: 'Pro', price: 9.99 },
      metrics: {
        dailyActiveUsers: 60,
        monthlyActiveUsers: 180,
        conversionRate: 8.5,
        avgSessionTime: 22,
        retention: { day1: 90, day7: 78, day30: 52 }
      }
    },
    {
      id: 'sleep-tracker',
      name: 'Sleep Tracker',
      active: false,
      revenue: 950,
      users: 80,
      category: 'Health & Wellness',
      features: ['Sleep Monitoring', 'Smart Alarms', 'Sleep Insights'],
      pricing: { tier: 'Basic', price: 4.99 },
      metrics: {
        dailyActiveUsers: 15,
        monthlyActiveUsers: 65,
        conversionRate: 6.2,
        avgSessionTime: 8,
        retention: { day1: 70, day7: 58, day30: 35 }
      }
    }
  ],
  globalMetrics: {
    totalRevenue: 5250,
    totalUsers: 430,
    avgRevenuePerUser: 12.21,
    totalSessions: 2450,
    avgSessionTime: 16.5,
    overallConversionRate: 9.1
  }
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return app data
    res.status(200).json(appDatabase);
  } else if (req.method === 'POST') {
    // Create new app
    const newApp = req.body;
    newApp.id = newApp.name.toLowerCase().replace(/\s+/g, '-');
    appDatabase.apps.push(newApp);
    res.status(201).json(newApp);
  } else if (req.method === 'PUT') {
    // Update existing app
    const { appId } = req.query;
    const updates = req.body;
    
    const appIndex = appDatabase.apps.findIndex(app => app.id === appId);
    if (appIndex === -1) {
      return res.status(404).json({ error: 'App not found' });
    }
    
    appDatabase.apps[appIndex] = { ...appDatabase.apps[appIndex], ...updates };
    res.status(200).json(appDatabase.apps[appIndex]);
  } else if (req.method === 'DELETE') {
    // Delete app
    const { appId } = req.query;
    const appIndex = appDatabase.apps.findIndex(app => app.id === appId);
    
    if (appIndex === -1) {
      return res.status(404).json({ error: 'App not found' });
    }
    
    const deletedApp = appDatabase.apps.splice(appIndex, 1)[0];
    res.status(200).json({ message: 'App deleted successfully', app: deletedApp });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// pages/api/lexlocal/apps/[appId]/toggle.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { appId } = req.query;
  
  // Find app (support both ID and name matching)
  const app = appDatabase.apps.find(app => 
    app.id === appId || 
    app.name.toLowerCase() === appId.toLowerCase() ||
    app.name.toLowerCase().includes(appId.toLowerCase())
  );

  if (!app) {
    return res.status(404).json({ 
      error: 'App not found',
      availableApps: appDatabase.apps.map(a => ({ id: a.id, name: a.name }))
    });
  }

  // Toggle app status
  app.active = !app.active;
  
  // Log the action for monetization tracking
  console.log('App Toggle:', {
    timestamp: new Date().toISOString(),
    appId: app.id,
    appName: app.name,
    newStatus: app.active,
    revenue: app.revenue,
    users: app.users
  });

  res.status(200).json({ 
    success: true, 
    app,
    message: `${app.name} has been ${app.active ? 'activated' : 'deactivated'}`
  });
}

// pages/api/lexlocal/analytics.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { timeframe = '30d', appId } = req.query;
  
  try {
    let analytics = {
      timeframe,
      generatedAt: new Date().toISOString(),
      overview: appDatabase.globalMetrics,
      apps: appDatabase.apps.map(app => ({
        id: app.id,
        name: app.name,
        active: app.active,
        revenue: app.revenue,
        users: app.users,
        metrics: app.metrics,
        revenuePerUser: app.users > 0 ? (app.revenue / app.users).toFixed(2) : 0,
        category: app.category,
        performance: {
          score: calculatePerformanceScore(app),
          trend: generateTrendData(app.id, timeframe),
          recommendations: generateRecommendations(app)
        }
      })),
      insights: {
        topPerformer: findTopPerformer(),
        growthOpportunities: findGrowthOpportunities(),
        revenueOptimization: getRevenueOptimization(),
        userEngagement: getUserEngagementInsights()
      }
    };

    // Filter for specific app if requested
    if (appId) {
      analytics.apps = analytics.apps.filter(app => app.id === appId);
    }

    res.status(200).json(analytics);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to generate analytics' });
  }
}

// Helper functions
function calculatePerformanceScore(app) {
  const revenueScore = Math.min(app.revenue / 1000, 10) * 10;
  const userScore = Math.min(app.users / 100, 10) * 10;
  const conversionScore = (app.metrics.conversionRate || 0) * 10;
  const retentionScore = (app.metrics.retention?.day30 || 0) * 2;
  
  return Math.round((revenueScore + userScore + conversionScore + retentionScore) / 4);
}

function generateTrendData(appId, timeframe) {
  // Generate mock trend data
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
  const data = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 200) + 50,
      users: Math.floor(Math.random() * 20) + 10,
      sessions: Math.floor(Math.random() * 100) + 30
    });
  }
  
  return data;
}

function generateRecommendations(app) {
  const recommendations = [];
  
  if (app.revenue < 1000) {
    recommendations.push({
      type: 'revenue',
      priority: 'high',
      title: 'Increase Revenue',
      description: 'Consider implementing premium features or subscription tiers',
      action: 'Add premium pricing tier'
    });
  }
  
  if (app.metrics.conversionRate < 10) {
    recommendations.push({
      type: 'conversion',
      priority: 'medium',
      title: 'Improve Conversion Rate',
      description: 'Optimize onboarding flow and free trial experience',
      action: 'A/B test onboarding'
    });
  }
  
  if (app.metrics.retention.day30 < 50) {
    recommendations.push({
      type: 'retention',
      priority: 'high',
      title: 'Boost User Retention',
      description: 'Implement engagement features and push notifications',
      action: 'Add retention features'
    });
  }
  
  if (app.metrics.avgSessionTime < 15) {
    recommendations.push({
      type: 'engagement',
      priority: 'medium',
      title: 'Increase Session Duration',
      description: 'Add more engaging content and interactive features',
      action: 'Enhance user experience'
    });
  }
  
  if (!app.active) {
    recommendations.push({
      type: 'activation',
      priority: 'critical',
      title: 'Reactivate App',
      description: 'Your app is currently inactive. Consider reactivating to resume revenue generation.',
      action: 'Activate app'
    });
  }
  
  return recommendations;
}

function findTopPerformer() {
  const activeApps = appDatabase.apps.filter(app => app.active);
  if (activeApps.length === 0) return null;
  
  const topApp = activeApps.reduce((best, current) => 
    current.revenue > best.revenue ? current : best
  );
  
  return {
    id: topApp.id,
    name: topApp.name,
    revenue: topApp.revenue,
    users: topApp.users,
    reason: 'Highest revenue generator'
  };
}

function findGrowthOpportunities() {
  const opportunities = [];
  
  appDatabase.apps.forEach(app => {
    if (app.metrics.conversionRate < 10 && app.users > 100) {
      opportunities.push({
        app: app.name,
        type: 'conversion',
        potential: 'High',
        description: `${app.name} has high user count but low conversion rate`,
        estimatedImpact: Math.round(app.users * 0.05 * app.pricing.price)
      });
    }
    
    if (app.metrics.retention.day30 < 40 && app.revenue > 1000) {
      opportunities.push({
        app: app.name,
        type: 'retention',
        potential: 'Medium',
        description: `${app.name} has good revenue but poor retention`,
        estimatedImpact: Math.round(app.revenue * 0.3)
      });
    }
    
    if (!app.active && app.revenue > 500) {
      opportunities.push({
        app: app.name,
        type: 'reactivation',
        potential: 'High',
        description: `${app.name} is inactive but previously generated good revenue`,
        estimatedImpact: app.revenue
      });
    }
  });
  
  return opportunities.sort((a, b) => b.estimatedImpact - a.estimatedImpact);
}

function getRevenueOptimization() {
  const totalRevenue = appDatabase.globalMetrics.totalRevenue;
  const totalUsers = appDatabase.globalMetrics.totalUsers;
  const avgRevenuePerUser = totalRevenue / totalUsers;
  
  const lowPerformers = appDatabase.apps.filter(app => 
    app.users > 0 && (app.revenue / app.users) < avgRevenuePerUser
  );
  
  const optimizationSuggestions = [];
  
  lowPerformers.forEach(app => {
    const currentRPU = app.revenue / app.users;
    const potentialIncrease = (avgRevenuePerUser - currentRPU) * app.users;
    
    optimizationSuggestions.push({
      app: app.name,
      currentRPU: currentRPU.toFixed(2),
      targetRPU: avgRevenuePerUser.toFixed(2),
      potentialIncrease: potentialIncrease.toFixed(2),
      suggestion: currentRPU < 5 ? 'Increase pricing' : 'Add premium features'
    });
  });
  
  return {
    totalPotentialIncrease: optimizationSuggestions.reduce((sum, item) => 
      sum + parseFloat(item.potentialIncrease), 0
    ).toFixed(2),
    suggestions: optimizationSuggestions
  };
}

function getUserEngagementInsights() {
  const totalDAU = appDatabase.apps.reduce((sum, app) => sum + app.metrics.dailyActiveUsers, 0);
  const totalMAU = appDatabase.apps.reduce((sum, app) => sum + app.metrics.monthlyActiveUsers, 0);
  const stickinessRatio = (totalDAU / totalMAU * 100).toFixed(1);
  
  const avgSessionTime = appDatabase.apps.reduce((sum, app) => 
    sum + app.metrics.avgSessionTime, 0
  ) / appDatabase.apps.length;
  
  const avgRetention = appDatabase.apps.reduce((sum, app) => 
    sum + app.metrics.retention.day30, 0
  ) / appDatabase.apps.length;
  
  return {
    stickinessRatio: `${stickinessRatio}%`,
    avgSessionTime: `${avgSessionTime.toFixed(1)} minutes`,
    avgRetention: `${avgRetention.toFixed(1)}%`,
    engagement: stickinessRatio > 20 ? 'High' : stickinessRatio > 10 ? 'Medium' : 'Low',
    recommendations: [
      {
        metric: 'Stickiness',
        current: stickinessRatio,
        target: '25%',
        action: 'Implement daily engagement features'
      },
      {
        metric: 'Session Time',
        current: avgSessionTime.toFixed(1),
        target: '20 minutes',
        action: 'Add more interactive content'
      },
      {
        metric: 'Retention',
        current: avgRetention.toFixed(1),
        target: '60%',
        action: 'Improve onboarding and add retention hooks'
      }
    ]
  };
}

// pages/api/lexlocal/apps/[appId]/metrics.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { appId } = req.query;
  
  const app = appDatabase.apps.find(app => app.id === appId);
  
  if (!app) {
    return res.status(404).json({ error: 'App not found' });
  }

  const detailedMetrics = {
    ...app.metrics,
    revenueMetrics: {
      totalRevenue: app.revenue,
      revenuePerUser: app.users > 0 ? (app.revenue / app.users).toFixed(2) : 0,
      monthlyRecurringRevenue: (app.revenue * 0.8).toFixed(2), // Estimate
      churnRate: (100 - app.metrics.retention.day30).toFixed(1)
    },
    userMetrics: {
      totalUsers: app.users,
      activeUsers: app.metrics.monthlyActiveUsers,
      newUsers: Math.round(app.users * 0.1), // Estimate
      growthRate: '12.5%' // Mock data
    },
    performanceScore: calculatePerformanceScore(app),
    recommendations: generateRecommendations(app)
  };

  res.status(200).json(detailedMetrics);
}

// pages/api/lexlocal/insights.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const insights = {
    timestamp: new Date().toISOString(),
    summary: {
      totalApps: appDatabase.apps.length,
      activeApps: appDatabase.apps.filter(app => app.active).length,
      totalRevenue: appDatabase.globalMetrics.totalRevenue,
      totalUsers: appDatabase.globalMetrics.totalUsers,
      avgRevenuePerUser: appDatabase.globalMetrics.avgRevenuePerUser
    },
    trends: {
      revenueGrowth: '+15.2%',
      userGrowth: '+8.7%',
      conversionImprovement: '+2.3%'
    },
    alerts: generateAlerts(),
    actionItems: generateActionItems()
  };

  res.status(200).json(insights);
}

function generateAlerts() {
  const alerts = [];
  
  appDatabase.apps.forEach(app => {
    if (app.metrics.retention.day30 < 30) {
      alerts.push({
        type: 'warning',
        app: app.name,
        message: `Low retention rate: ${app.metrics.retention.day30}%`,
        severity: 'medium'
      });
    }
    
    if (app.metrics.conversionRate < 5) {
      alerts.push({
        type: 'error',
        app: app.name,
        message: `Very low conversion rate: ${app.metrics.conversionRate}%`,
        severity: 'high'
      });
    }
    
    if (!app.active && app.revenue > 1000) {
      alerts.push({
        type: 'info',
        app: app.name,
        message: `High-revenue app is inactive`,
        severity: 'high'
      });
    }
  });
  
  return alerts;
}

function generateActionItems() {
  const actionItems = [];
  
  const inactiveApps = appDatabase.apps.filter(app => !app.active);
  const lowConversionApps = appDatabase.apps.filter(app => app.metrics.conversionRate < 10);
  const lowRetentionApps = appDatabase.apps.filter(app => app.metrics.retention.day30 < 50);
  
  if (inactiveApps.length > 0) {
    actionItems.push({
      priority: 'high',
      action: 'Reactivate dormant apps',
      description: `${inactiveApps.length} apps are currently inactive`,
      apps: inactiveApps.map(app => app.name),
      estimatedImpact: inactiveApps.reduce((sum, app) => sum + app.revenue, 0)
    });
  }
  
  if (lowConversionApps.length > 0) {
    actionItems.push({
      priority: 'medium',
      action: 'Optimize conversion funnels',
      description: `${lowConversionApps.length} apps have conversion rates below 10%`,
      apps: lowConversionApps.map(app => app.name),
      estimatedImpact: lowConversionApps.reduce((sum, app) => sum + (app.users * 0.05 * app.pricing.price), 0)
    });
  }
  
  if (lowRetentionApps.length > 0) {
    actionItems.push({
      priority: 'high',
      action: 'Improve user retention',
      description: `${lowRetentionApps.length} apps have retention below 50%`,
      apps: lowRetentionApps.map(app => app.name),
      estimatedImpact: lowRetentionApps.reduce((sum, app) => sum + (app.revenue * 0.2), 0)
    });
  }
  
  return actionItems.sort((a, b) => b.estimatedImpact - a.estimatedImpact);
}