// pages/api/lexlocal/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    const userMessage = messages[messages.length - 1]?.content || '';
    
    // Simple AI-like responses for now
    const responses = [
      "I'm Lex, your AI assistant! I'm currently being set up with full capabilities. What would you like to know?",
      "That's an interesting question! I'm here to help you with whatever you need.",
      "I understand you're looking for assistance. Let me help you with that.",
      "Great question! I'm designed to be your personal AI companion.",
      "I'm here to help! What specific task can I assist you with today?"
    ];
    
    // Simple keyword-based responses
    let response = responses[Math.floor(Math.random() * responses.length)];
    
    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      response = "Hello! I'm Lex, your personal AI assistant. How can I help you today?";
    } else if (userMessage.toLowerCase().includes('help')) {
      response = "I'm here to help! I can assist with various tasks like answering questions, helping with research, writing, analysis, and more. What do you need help with?";
    } else if (userMessage.toLowerCase().includes('what') && userMessage.toLowerCase().includes('do')) {
      response = "I can help you with many things! I can answer questions, help with writing, research topics, analyze data, provide explanations, and much more. I'm your personal AI assistant - what would you like to explore?";
    } else if (userMessage.toLowerCase().includes('who') && userMessage.toLowerCase().includes('you')) {
      response = "I'm Lex, your custom AI assistant built into the Perspective platform. I'm designed to be helpful, harmless, and honest. I'm here to assist you with whatever you need!";
    }
    
    res.status(200).json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}