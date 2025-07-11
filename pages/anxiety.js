import React, { useState, useEffect } from 'react';
import { Heart, Wind, Eye, Brain, Shield, TrendingDown, Calendar, Bell, Zap, Pause, Play, RotateCcw } from 'lucide-react';

export default function Anxiety() {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale'); // inhale, hold, exhale
  const [breathingCount, setBreathingCount] = useState(4);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [dailyCheckIn, setDailyCheckIn] = useState(null);
  const [anxietyLevel, setAnxietyLevel] = useState(5);
  const [triggers, setTriggers] = useState([]);
  const [newTrigger, setNewTrigger] = useState('');
  const [groundingActive, setGroundingActive] = useState(false);
  const [groundingStep, setGroundingStep] = useState(0);
  const [copingStrategies, setCopingStrategies] = useState([]);
  const [thoughtRecord, setThoughtRecord] = useState({ situation: '', thoughts: '', feelings: '', evidence: '' });
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Breathing exercise timer
  useEffect(() => {
    let interval = null;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingTimer(prev => {
          if (prev >= breathingCount) {
            // Switch phases
            if (breathingPhase === 'inhale') {
              setBreathingPhase('hold');
              return 0;
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('exhale');
              return 0;
            } else {
              setBreathingPhase('inhale');
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathingPhase, breathingCount, breathingTimer]);

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathingPhase('inhale');
    setBreathingTimer(0);
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    setBreathingTimer(0);
    setSessionsCompleted(prev => prev + 1);
  };

  const groundingSteps = [
    "Look around and name 5 things you can see",
    "Listen and identify 4 things you can hear", 
    "Touch and notice 3 things you can feel",
    "Smell and identify 2 scents around you",
    "Taste or think of 1 thing you can taste"
  ];

  const startGrounding = () => {
    setGroundingActive(true);
    setGroundingStep(0);
  };

  const nextGroundingStep = () => {
    if (groundingStep < groundingSteps.length - 1) {
      setGroundingStep(prev => prev + 1);
    } else {
      setGroundingActive(false);
      setGroundingStep(0);
      setSessionsCompleted(prev => prev + 1);
    }
  };

  const addTrigger = () => {
    if (newTrigger.trim()) {
      setTriggers([...triggers, { id: Date.now(), text: newTrigger, frequency: 1 }]);
      setNewTrigger('');
    }
  };

  const removeTrigger = (id) => {
    setTriggers(triggers.filter(t => t.id !== id));
  };

  const addCopingStrategy = (strategy) => {
    setCopingStrategies([...copingStrategies, { id: Date.now(), text: strategy, used: false }]);
  };

  const markStrategyUsed = (id) => {
    setCopingStrategies(copingStrategies.map(s => 
      s.id === id ? { ...s, used: !s.used } : s
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Anxiety Support Center</h1>
          <p className="text-gray-600">Evidence-based tools to help you manage anxiety and find calm</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessions Today</p>
                <p className="text-2xl font-bold text-blue-600">{sessionsCompleted}</p>
              </div>
              <Wind className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Anxiety Level</p>
                <p className="text-2xl font-bold text-green-600">{anxietyLevel}/10</p>
              </div>
              <TrendingDown className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Triggers Tracked</p>
                <p className="text-2xl font-bold text-orange-600">{triggers.length}</p>
              </div>
              <Shield className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Coping Tools</p>
                <p className="text-2xl font-bold text-purple-600">{copingStrategies.length}</p>
              </div>
              <Brain className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Main Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Breathing Exercise */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Wind className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Breathing Exercise</h2>
            </div>
            
            <div className="text-center">
              <div className="mb-6">
                <div className={`w-32 h-32 rounded-full mx-auto border-4 border-blue-500 flex items-center justify-center transition-all duration-1000 ${
                  breathingActive ? (breathingPhase === 'inhale' ? 'scale-110 bg-blue-100' : 
                                   breathingPhase === 'hold' ? 'scale-105 bg-blue-50' : 
                                   'scale-95 bg-blue-25') : 'bg-gray-50'
                }`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{breathingTimer}</div>
                    <div className="text-sm text-gray-600 capitalize">{breathingPhase}</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Rhythm: 4-4-6 (Inhale-Hold-Exhale)</p>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={startBreathing}
                    disabled={breathingActive}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button
                    onClick={stopBreathing}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Pause className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                {breathingActive ? 'Follow the circle and breathe with the rhythm' : 'Click play to start your breathing session'}
              </div>
            </div>
          </div>

          {/* 5-4-3-2-1 Grounding */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-xl font-semibold">5-4-3-2-1 Grounding</h2>
            </div>
            
            {!groundingActive ? (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Use your senses to ground yourself in the present moment
                </p>
                <button
                  onClick={startGrounding}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Start Grounding
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <div className="text-lg font-semibold text-gray-800 mb-2">
                    Step {groundingStep + 1} of 5
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-green-800">{groundingSteps[groundingStep]}</p>
                  </div>
                </div>
                
                <button
                  onClick={nextGroundingStep}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  {groundingStep < groundingSteps.length - 1 ? 'Next' : 'Complete'}
                </button>
              </div>
            )}
          </div>

          {/* Anxiety Check-In */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold">Anxiety Check-In</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How are you feeling right now? (1-10)
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Calm</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={anxietyLevel}
                    onChange={(e) => setAnxietyLevel(e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">Anxious</span>
                </div>
                <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-gray-800">{anxietyLevel}</span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  {anxietyLevel <= 3 && "You're doing great! Keep up the good work."}
                  {anxietyLevel >= 4 && anxietyLevel <= 6 && "Try a breathing exercise or grounding technique."}
                  {anxietyLevel >= 7 && "Consider reaching out to someone or using multiple coping strategies."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trigger Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-orange-500 mr-2" />
              <h2 className="text-xl font-semibold">Trigger Tracker</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTrigger}
                  onChange={(e) => setNewTrigger(e.target.value)}
                  placeholder="What triggered your anxiety?"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onKeyPress={(e) => e.key === 'Enter' && addTrigger()}
                />
                <button
                  onClick={addTrigger}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Add
                </button>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {triggers.map((trigger) => (
                  <div key={trigger.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{trigger.text}</span>
                    <button
                      onClick={() => removeTrigger(trigger.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {triggers.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No triggers tracked yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Coping Strategies */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-purple-500 mr-2" />
              <h2 className="text-xl font-semibold">Coping Toolkit</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Take 5 deep breaths",
                  "Go for a short walk",
                  "Listen to calming music",
                  "Call a friend",
                  "Write in a journal",
                  "Practice progressive muscle relaxation"
                ].map((strategy, index) => (
                  <button
                    key={index}
                    onClick={() => addCopingStrategy(strategy)}
                    className="text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-sm"
                  >
                    + {strategy}
                  </button>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Your Active Strategies:</h3>
                <div className="space-y-2">
                  {copingStrategies.map((strategy) => (
                    <div key={strategy.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className={`text-sm ${strategy.used ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                        {strategy.text}
                      </span>
                      <button
                        onClick={() => markStrategyUsed(strategy.id)}
                        className={`text-xs px-2 py-1 rounded ${
                          strategy.used ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {strategy.used ? 'Used' : 'Try'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thought Record (CBT) */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-indigo-500 mr-2" />
            <h2 className="text-xl font-semibold">Thought Record (CBT)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What happened? (Situation)
              </label>
              <textarea
                value={thoughtRecord.situation}
                onChange={(e) => setThoughtRecord({...thoughtRecord, situation: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="2"
                placeholder="Describe the situation..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What thoughts came up?
              </label>
              <textarea
                value={thoughtRecord.thoughts}
                onChange={(e) => setThoughtRecord({...thoughtRecord, thoughts: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="2"
                placeholder="What were you thinking..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How did you feel?
              </label>
              <textarea
                value={thoughtRecord.feelings}
                onChange={(e) => setThoughtRecord({...thoughtRecord, feelings: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="2"
                placeholder="Describe your emotions..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What evidence challenges these thoughts?
              </label>
              <textarea
                value={thoughtRecord.evidence}
                onChange={(e) => setThoughtRecord({...thoughtRecord, evidence: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="2"
                placeholder="What facts contradict anxious thoughts..."
              />
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setThoughtRecord({situation: '', thoughts: '', feelings: '', evidence: ''})}
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Save & Clear
            </button>
          </div>
        </div>

        {/* Emergency Resources */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-red-800 mb-4">Crisis Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-red-800">Crisis Text Line</div>
              <div className="text-red-700">Text HOME to 741741</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-800">Suicide Prevention</div>
              <div className="text-red-700">Call 988</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-800">Emergency</div>
              <div className="text-red-700">Call 911</div>
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Premium Anxiety Support</h2>
              <p className="text-indigo-100 mb-4">
                Get personalized insights, guided therapy sessions, and 24/7 support
              </p>
              <ul className="text-sm space-y-1 text-indigo-100">
                <li>• AI-powered anxiety pattern analysis</li>
                <li>• Personalized CBT exercises</li>
                <li>• Guided meditation library</li>
                <li>• Progress tracking and insights</li>
                <li>• Connect with licensed therapists</li>
              </ul>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-2">$14.99/mo</div>
              <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
