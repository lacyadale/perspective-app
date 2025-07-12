// backend/routes/lex.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// OpenAI API endpoint
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// System prompt for LexLocal
const SYSTEM_PROMPT = `You are LexLocal, an AI assistant for app management. You can:
- Update app configurations
- View analytics and performance metrics
- Toggle apps on/off
- Provide pricing strategies
- Monitor system health

Available commands:
- "update app [name]" - Update app configuration
- "analytics" - View performance metrics
- "toggle app [name]" - Enable/disable apps
- "pricing" - View pricing strategy
- "status" - Check system status

Respond with structured JSON when possible for command execution.`;

// Mock app data (replace with your actual database)
let appData = {
  apps: [
    { id: 'adhd', name: 'ADHD Focus', active: true, revenue: 2500, conversions: 45 },
    { id: 'anxiety', name: 'Anxiety Helper', active: true, revenue: 1800, conversions: 32 },
    { id: 'sleep', name: 'Sleep Tracker', active: false, revenue: 950, conversions: 18 }
  ],
  totalRevenue: 5250,
  totalUsers: 1250,
  conversionRate: 7.6
};

// Chat with LexLocal
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Process commands locally first
    const commandResponse = processCommand(message);
    if (commandResponse) {
      return res.json(commandResponse);
    }

    // If no local command, send to OpenAI
    const response = await axios.post(OPENAI_API_URL, {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply, timestamp: new Date().toISOString() });

  } catch (error) {
    console.error('Lex API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message 
    });
  }
});

// Process local commands
function processCommand(message) {
  const msg = message.toLowerCase().trim();

  // Analytics command
  if (msg === 'analytics') {
    return {
      reply: `📊 **Analytics Dashboard**
      
**Revenue Metrics:**
- Total Revenue: $${appData.totalRevenue}
- Conversion Rate: ${appData.conversionRate}%
- Total Users: ${appData.totalUsers}

**App Performance:**
${appData.apps.map(app => 
  `• ${app.name}: $${app.revenue} (${app.conversions} conversions) - ${app.active ? '🟢 Active' : '🔴 Inactive'}`
).join('\n')}`,
      data: appData,
      timestamp: new Date().toISOString()
    };
  }

  // Toggle app command
  if (msg.startsWith('toggle app ')) {
    const appName = msg.replace('toggle app ', '');
    const app = appData.apps.find(a => a.id === appName || a.name.toLowerCase().includes(appName));
    
    if (app) {
      app.active = !app.active;
      return {
        reply: `✅ ${app.name} has been ${app.active ? 'activated' : 'deactivated'}`,
        data: { app },
        timestamp: new Date().toISOString()
      };
    } else {
      return {
        reply: `❌ App "${appName}" not found. Available apps: ${appData.apps.map(a => a.id).join(', ')}`,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Pricing command
  if (msg === 'pricing') {
    return {
      reply: `💰 **Pricing Strategy**
      
**Current Pricing:**
- Basic: $9.99/month
- Pro: $19.99/month
- Enterprise: $49.99/month

**Recommendations:**
- Consider freemium model for ADHD Focus
- A/B test $14.99 price point for Anxiety Helper
- Bundle pricing for multiple apps: $24.99/month`,
      timestamp: new Date().toISOString()
    };
  }

  // Status command
  if (msg === 'status') {
    return {
      reply: `🔧 **System Status**
      
**App Status:**
${appData.apps.map(app => 
  `• ${app.name}: ${app.active ? '🟢 Running' : '🔴 Stopped'}`
).join('\n')}

**System Health:** 🟢 All systems operational
**Last Update:** ${new Date().toLocaleString()}`,
      timestamp: new Date().toISOString()
    };
  }

  return null; // No local command found
}

// Get app data
router.get('/apps', (req, res) => {
  res.json(appData);
});

// Update app data
router.put('/apps/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const app = appData.apps.find(a => a.id === id);
  if (app) {
    Object.assign(app, updates);
    res.json({ success: true, app });
  } else {
    res.status(404).json({ error: 'App not found' });
  }
});

module.exports = router;