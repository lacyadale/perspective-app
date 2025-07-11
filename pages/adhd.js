import React, { useState, useEffect } from 'react';
import { Clock, CheckSquare, Calendar, Brain, Timer, Target, Zap, TrendingUp, Settings, Bell } from 'lucide-react';

export default function ADHD() {
  const [activeTimer, setActiveTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [streakCount, setStreakCount] = useState(0);
  const [showBreakTimer, setShowBreakTimer] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setShowBreakTimer(true);
      setTimeLeft(5 * 60); // 5 minute break
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (type) => {
    setActiveTimer(type);
    setIsRunning(true);
    if (type === 'pomodoro') {
      setTimeLeft(25 * 60);
      setShowBreakTimer(false);
    } else if (type === 'break') {
      setTimeLeft(5 * 60);
      setShowBreakTimer(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setActiveTimer(null);
    setShowBreakTimer(false);
  };

  const addTask = () => {
    if (currentTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: currentTask, priority: 'medium' }]);
      setCurrentTask('');
    }
  };

  const completeTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setCompletedTasks([...completedTasks, task]);
    setTasks(tasks.filter(t => t.id !== taskId));
    setStreakCount(streakCount + 1);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">ADHD Management Tools</h1>
          <p className="text-gray-600">Evidence-based tools to help you focus, organize, and thrive</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedTasks.length}</p>
              </div>
              <CheckSquare className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Focus Streak</p>
                <p className="text-2xl font-bold text-blue-600">{streakCount}</p>
              </div>
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Tasks</p>
                <p className="text-2xl font-bold text-orange-600">{tasks.length}</p>
              </div>
              <Target className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Focus Time</p>
                <p className="text-2xl font-bold text-purple-600">{Math.floor(completedTasks.length * 25 / 60)}h</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Main Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Pomodoro Timer */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Timer className="w-6 h-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold">Pomodoro Timer</h2>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-800 mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {showBreakTimer ? 'Break Time!' : 'Focus Time'}
                </p>
              </div>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => startTimer('pomodoro')}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  disabled={isRunning}
                >
                  Start Focus
                </button>
                <button
                  onClick={pauseTimer}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  {isRunning ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={resetTimer}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Task Management */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <CheckSquare className="w-6 h-6 text-green-500 mr-2" />
              <h2 className="text-xl font-semibold">Task Manager</h2>
            </div>
            
            <div className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button
                  onClick={addTask}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{task.text}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => completeTask(task.id)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <CheckSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-gray-500 text-center py-4">No tasks yet. Add one above!</p>
              )}
            </div>
          </div>

          {/* Time Tracking & Insights */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-500 mr-2" />
              <h2 className="text-xl font-semibold">Progress Insights</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Today's Wins</h3>
                <p className="text-sm text-green-700">
                  {completedTasks.length > 0 
                    ? `Great job! You've completed ${completedTasks.length} tasks today.`
                    : "Ready to tackle your first task?"
                  }
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Focus Pattern</h3>
                <p className="text-sm text-blue-700">
                  Your best focus time appears to be in the morning. 
                  Try scheduling important tasks between 9-11 AM.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Productivity Tip</h3>
                <p className="text-sm text-purple-700">
                  Break large tasks into 25-minute chunks. 
                  This matches your natural attention span!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Tools Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Body Doubling */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-indigo-500 mr-2" />
              <h2 className="text-lg font-semibold">Body Doubling</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Work alongside others virtually to stay focused and accountable.
            </p>
            <button className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors">
              Find Study Buddy
            </button>
          </div>

          {/* Habit Tracker */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-teal-500 mr-2" />
              <h2 className="text-lg font-semibold">Habit Tracker</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Build consistent routines with visual progress tracking.
            </p>
            <button className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors">
              Track Habits
            </button>
          </div>

          {/* Focus Sounds */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <Bell className="w-6 h-6 text-pink-500 mr-2" />
              <h2 className="text-lg font-semibold">Focus Sounds</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Curated soundscapes to enhance concentration and reduce distractions.
            </p>
            <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors">
              Play Sounds
            </button>
          </div>
        </div>

        {/* Premium Features Preview */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Unlock Premium Features</h2>
              <p className="text-purple-100 mb-4">
                Get advanced analytics, personalized coaching, and unlimited tools
              </p>
              <ul className="text-sm space-y-1 text-purple-100">
                <li>• Detailed focus analytics and patterns</li>
                <li>• AI-powered task prioritization</li>
                <li>• Custom timer intervals and sounds</li>
                <li>• Progress reports and goal tracking</li>
              </ul>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-2">$9.99/mo</div>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
