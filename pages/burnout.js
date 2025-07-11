import React, { useState, useEffect } from 'react';
import { 
  Battery, 
  Brain, 
  Heart, 
  Clock, 
  Target, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Star,
  Calendar,
  BarChart3,
  BookOpen,
  Headphones,
  Moon,
  Crown,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

export default function Burnout() {
  const [activeTab, setActiveTab] = useState('assess');
  const [burnoutScore, setBurnoutScore] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [boundariesSet, setBoundariesSet] = useState(0);
  const [selfCareStreak, setSelfCareStreak] = useState(0);
  const [recoveryPlan, setRecoveryPlan] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [currentTime, setCurrentTime] = useState(timerMinutes * 60);

  // Pomodoro Timer
  useEffect(() => {
    let interval = null;
    if (timerActive && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime(time => time - 1);
      }, 1000);
    } else if (currentTime === 0) {
      setTimerActive(false);
      setCurrentTime(timerMinutes * 60);
    }
    return () => clearInterval(interval);
  }, [timerActive, currentTime, timerMinutes]);

  const burnoutQuestions = [
    { id: 1, text: "I feel emotionally drained by my work", weight: 3 },
    { id: 2, text: "I have trouble sleeping due to work stress", weight: 2 },
    { id: 3, text: "I feel cynical about my job's value", weight: 3 },
    { id: 4, text: "I lack energy for daily activities", weight: 2 },
    { id: 5, text: "I feel unappreciated at work", weight: 2 },
    { id: 6, text: "I have physical symptoms (headaches, stomach issues)", weight: 2 },
    { id: 7, text: "I avoid work-related tasks when possible", weight: 3 },
    { id: 8, text: "I feel like I'm not making a difference", weight: 2 }
  ];

  const recoveryStrategies = [
    { 
      category: "Energy Management", 
      icon: <Battery className="h-5 w-5" />,
      strategies: [
        "Prioritize 7-9 hours of quality sleep",
        "Take regular micro-breaks (5 min every hour)",
        "Practice the 90-minute ultradian rhythm work cycles",
        "Schedule energy-giving activities daily"
      ]
    },
    { 
      category: "Boundary Setting", 
      icon: <Shield className="h-5 w-5" />,
      strategies: [
        "Learn to say 'no' to non-essential requests",
        "Set clear work hours and stick to them",
        "Create physical separation between work and personal space",
        "Practice the 'minimum viable response' to emails"
      ]
    },
    { 
      category: "Stress Reduction", 
      icon: <Heart className="h-5 w-5" />,
      strategies: [
        "Practice progressive muscle relaxation",
        "Use the 4-7-8 breathing technique",
        "Try mindfulness meditation (10 min daily)",
        "Engage in nature-based activities"
      ]
    },
    { 
      category: "Meaning & Purpose", 
      icon: <Target className="h-5 w-5" />,
      strategies: [
        "Reconnect with your core values",
        "Identify what aspects of work bring joy",
        "Set small, achievable daily goals",
        "Practice gratitude journaling"
      ]
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateBurnoutLevel = (score) => {
    if (score < 15) return { level: "Low", color: "text-green-600", description: "Minimal burnout indicators" };
    if (score < 30) return { level: "Moderate", color: "text-yellow-600", description: "Some burnout symptoms present" };
    if (score < 45) return { level: "High", color: "text-orange-600", description: "Significant burnout indicators" };
    return { level: "Severe", color: "text-red-600", description: "Critical burnout level - seek professional help" };
  };

  const burnoutLevel = calculateBurnoutLevel(burnoutScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Battery className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Burnout Recovery</h1>
                <p className="text-gray-600">Evidence-based tools for recovery and prevention</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{energyLevel}/10</div>
                <div className="text-sm text-gray-600">Energy Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{selfCareStreak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'assess', label: 'Assessment', icon: <BarChart3 className="h-4 w-4" /> },
              { id: 'recover', label: 'Recovery Tools', icon: <Heart className="h-4 w-4" /> },
              { id: 'prevent', label: 'Prevention', icon: <Shield className="h-4 w-4" /> },
              { id: 'premium', label: 'Premium', icon: <Crown className="h-4 w-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Assessment Tab */}
        {activeTab === 'assess' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                Burnout Assessment
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Rate each statement (1-5 scale)</h3>
                  <div className="space-y-4">
                    {burnoutQuestions.map(question => (
                      <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 mb-3">{question.text}</p>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map(rating => (
                            <button
                              key={rating}
                              onClick={() => {
                                const newScore = burnoutScore + (rating * question.weight);
                                setBurnoutScore(newScore);
                              }}
                              className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center text-sm font-medium transition-colors"
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Your Results</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{burnoutScore}</div>
                      <div className={`text-xl font-semibold ${burnoutLevel.color} mb-2`}>
                        {burnoutLevel.level} Risk
                      </div>
                      <p className="text-gray-600 mb-4">{burnoutLevel.description}</p>
                      
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            burnoutScore < 15 ? 'bg-green-500' :
                            burnoutScore < 30 ? 'bg-yellow-500' :
                            burnoutScore < 45 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min((burnoutScore / 60) * 100, 100)}%` }}
                        ></div>
                      </div>
                      
                      <button 
                        onClick={() => setBurnoutScore(0)}
                        className="flex items-center space-x-2 mx-auto text-blue-600 hover:text-blue-700"
                      >
                        <RotateCcw className="h-4 w-4" />
                        <span>Reset Assessment</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recovery Tools Tab */}
        {activeTab === 'recover' && (
          <div className="space-y-8">
            {/* Pomodoro Timer */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 mr-3 text-blue-600" />
                Focus Timer (Pomodoro Technique)
              </h2>
              
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900 mb-4">
                    {formatTime(currentTime)}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setTimerActive(!timerActive)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                        timerActive 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {timerActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      <span>{timerActive ? 'Pause' : 'Start'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setTimerActive(false);
                        setCurrentTime(timerMinutes * 60);
                      }}
                      className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-gray-500 hover:bg-gray-600 text-white transition-colors"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recovery Strategies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recoveryStrategies.map((strategy, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {strategy.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{strategy.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {strategy.strategies.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Energy Level Tracker */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="h-6 w-6 mr-3 text-blue-600" />
                Daily Energy Tracker
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How's your energy level today? ({energyLevel}/10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Exhausted</span>
                    <span>Energized</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{energyLevel}/10</div>
                    <div className="text-sm text-gray-600">Current Energy</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selfCareStreak}</div>
                    <div className="text-sm text-gray-600">Self-Care Streak</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{boundariesSet}</div>
                    <div className="text-sm text-gray-600">Boundaries Set</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">7</div>
                    <div className="text-sm text-gray-600">Days Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prevention Tab */}
        {activeTab === 'prevent' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="h-6 w-6 mr-3 text-blue-600" />
                Burnout Prevention Strategies
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Work-Life Balance",
                    icon: <Clock className="h-5 w-5" />,
                    tips: [
                      "Set clear start/end times",
                      "Take lunch breaks away from desk",
                      "Use vacation time regularly",
                      "Create transition rituals"
                    ]
                  },
                  {
                    title: "Stress Management",
                    icon: <Heart className="h-5 w-5" />,
                    tips: [
                      "Practice daily meditation",
                      "Exercise regularly",
                      "Deep breathing exercises",
                      "Progressive muscle relaxation"
                    ]
                  },
                  {
                    title: "Social Support",
                    icon: <Users className="h-5 w-5" />,
                    tips: [
                      "Maintain friendships",
                      "Join support groups",
                      "Seek mentorship",
                      "Professional counseling"
                    ]
                  },
                  {
                    title: "Personal Growth",
                    icon: <TrendingUp className="h-5 w-5" />,
                    tips: [
                      "Set learning goals",
                      "Develop new skills",
                      "Seek feedback regularly",
                      "Career planning sessions"
                    ]
                  },
                  {
                    title: "Physical Health",
                    icon: <Battery className="h-5 w-5" />,
                    tips: [
                      "7-9 hours sleep nightly",
                      "Regular exercise routine",
                      "Healthy eating habits",
                      "Regular health check-ups"
                    ]
                  },
                  {
                    title: "Mental Health",
                    icon: <Brain className="h-5 w-5" />,
                    tips: [
                      "Practice mindfulness",
                      "Journaling daily",
                      "Limit negative news",
                      "Gratitude practice"
                    ]
                  }
                ].map((section, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {section.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900">{section.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Premium Tab */}
        {activeTab === 'premium' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-sm p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Unlock Premium Recovery</h2>
                  <p className="text-purple-100">Advanced tools for comprehensive burnout prevention and recovery</p>
                </div>
                <Crown className="h-12 w-12 text-yellow-300" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Professional Support</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>Connect with licensed therapists</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>Personalized recovery plans</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>24/7 crisis support</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Advanced Analytics</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>Burnout pattern analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>Predictive risk assessment</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>Detailed progress tracking</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Exclusive Content</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>Guided meditation library</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>Sleep optimization tools</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>Workplace wellness programs</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Integration & Sync</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>Wearable device integration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>Calendar and task sync</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-300" />
                      <span>Healthcare provider sharing</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">$19.99/month</div>
                <p className="text-purple-100 mb-6">Cancel anytime • 7-day free trial</p>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
