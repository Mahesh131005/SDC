import React, { useState, useEffect } from 'react';
import { Heart, X, MessageCircle, Settings, User, Mail, Camera, Send, ArrowLeft, CheckCircle, Bell } from 'lucide-react';

const CollegeDatingApp = () => {
  const [currentView, setCurrentView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data for demo
  const mockProfiles = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 20,
      college: 'MIT',
      major: 'Computer Science',
      interests: ['Coding', 'Gaming', 'Coffee'],
      bio: 'CS major who loves hackathons and late-night coding sessions ☕',
      photo: '👩‍💻',
      year: 'Junior'
    },
    {
      id: 2,
      name: 'Alex Chen',
      age: 21,
      college: 'Stanford',
      major: 'Engineering',
      interests: ['Basketball', 'Music', 'Hiking'],
      bio: 'Engineering student by day, amateur guitarist by night 🎸',
      photo: '👨‍🎓',
      year: 'Senior'
    },
    {
      id: 3,
      name: 'Emma Davis',
      age: 19,
      college: 'Harvard',
      major: 'Psychology',
      interests: ['Reading', 'Yoga', 'Travel'],
      bio: 'Bookworm seeking adventure partner 📚✈️',
      photo: '👩‍🎓',
      year: 'Sophomore'
    },
    {
      id: 4,
      name: 'Michael Brown',
      age: 22,
      college: 'Berkeley',
      major: 'Business',
      interests: ['Entrepreneurship', 'Fitness', 'Photography'],
      bio: 'Building the next big startup 🚀',
      photo: '👨‍💼',
      year: 'Senior'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      age: 20,
      college: 'Yale',
      major: 'Art History',
      interests: ['Museums', 'Painting', 'Coffee'],
      bio: 'Art lover and coffee enthusiast ☕🎨',
      photo: '👩‍🎨',
      year: 'Junior'
    }
  ];

  useEffect(() => {
    if (currentUser && profiles.length === 0) {
      setProfiles(mockProfiles);
    }
  }, [currentUser]);

  const handleSignup = () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    
    if (!email.endsWith('.edu')) {
      alert('Please use a valid college email (.edu)');
      return;
    }

    const user = {
      id: Date.now(),
      email,
      name,
      verified: true
    };
    
    setCurrentUser(user);
    addNotification('Welcome! Your account has been verified ✓');
    setCurrentView('createProfile');
  };

  const handleCreateProfile = () => {
    const fullName = document.getElementById('profile-name').value;
    const age = document.getElementById('profile-age').value;
    const college = document.getElementById('profile-college').value;
    const year = document.getElementById('profile-year').value;
    const major = document.getElementById('profile-major').value;
    const interests = document.getElementById('profile-interests').value.split(',').map(i => i.trim());
    const bio = document.getElementById('profile-bio').value;
    
    setCurrentUser({
      ...currentUser,
      name: fullName,
      age,
      college,
      major,
      interests,
      bio,
      photo: '😊',
      year
    });
    
    setCurrentView('swipe');
    addNotification('Profile created! Start swiping to find matches');
  };

  const handleSwipe = (liked) => {
    const currentProfile = profiles[currentProfileIndex];
    
    if (liked) {
      const newMatch = {
        ...currentProfile,
        matchedAt: new Date().toISOString()
      };
      setMatches([...matches, newMatch]);
      addNotification(`It's a match! You matched with ${currentProfile.name} 💕`);
      
      // Initialize empty chat
      setMessages(prev => ({
        ...prev,
        [currentProfile.id]: []
      }));
    }
    
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const msg = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), msg]
    }));
    
    setNewMessage('');
    
    // Simulate response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: 'Hey! Thanks for reaching out 😊',
        sender: 'them',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), response]
      }));
      
      addNotification(`New message from ${selectedChat.name}`);
    }, 2000);
  };

  const addNotification = (text) => {
    const notif = {
      id: Date.now(),
      text,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Login View
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">💕</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Campus Connect</h1>
            <p className="text-gray-600">College Dating Made Easy</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                id="signup-name"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                College Email (.edu)
              </label>
              <input
                id="signup-email"
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="student@college.edu"
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <CheckCircle size={12} /> Email verification required
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                id="signup-password"
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            
            <button
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition"
            >
              Sign Up & Verify
            </button>
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <button className="text-purple-600 font-semibold">Log In</button>
          </p>
        </div>
      </div>
    );
  }

  // Create Profile View
  if (currentView === 'createProfile') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Profile</h2>
          
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-6xl">
                  😊
                </div>
                <button type="button" className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
                  <Camera size={20} className="text-purple-600" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  id="profile-name"
                  type="text"
                  defaultValue={currentUser?.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  id="profile-age"
                  type="number"
                  min="18"
                  max="30"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                <input
                  id="profile-college"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="MIT"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  id="profile-year"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option>Freshman</option>
                  <option>Sophomore</option>
                  <option>Junior</option>
                  <option>Senior</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
              <input
                id="profile-major"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Computer Science"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests (comma-separated)
              </label>
              <input
                id="profile-interests"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Coding, Gaming, Coffee"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                id="profile-bio"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Tell us about yourself..."
              />
            </div>
            
            <button
              onClick={handleCreateProfile}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentProfile = profiles[currentProfileIndex];
  const chatMessages = selectedChat ? messages[selectedChat.id] || [] : [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Campus Connect
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <Bell size={24} className="text-gray-700" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('profile')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Settings size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
        
        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-xl p-4 max-h-96 overflow-y-auto z-20">
            <h3 className="font-semibold mb-3">Notifications</h3>
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No notifications yet</p>
            ) : (
              <div className="space-y-2">
                {notifications.map(notif => (
                  <div key={notif.id} className="p-3 bg-purple-50 rounded-lg text-sm">
                    {notif.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-4 flex gap-2">
          <button
            onClick={() => setCurrentView('swipe')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              currentView === 'swipe'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart className="inline mr-2" size={20} />
            Discover
          </button>
          <button
            onClick={() => setCurrentView('matches')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              currentView === 'matches'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageCircle className="inline mr-2" size={20} />
            Matches ({matches.length})
          </button>
        </div>

        {/* Swipe View */}
        {currentView === 'swipe' && currentProfile && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-9xl">
                {currentProfile.photo}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {currentProfile.year}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-1">{currentProfile.college} • {currentProfile.major}</p>
                <p className="text-gray-700 mb-4">{currentProfile.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProfile.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handleSwipe(false)}
                    className="bg-white border-2 border-red-500 text-red-500 rounded-full p-4 hover:bg-red-50 transform hover:scale-110 transition"
                  >
                    <X size={32} />
                  </button>
                  <button
                    onClick={() => handleSwipe(true)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-4 hover:shadow-lg transform hover:scale-110 transition"
                  >
                    <Heart size={32} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Matches View */}
        {currentView === 'matches' && !selectedChat && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">💔</div>
                <p className="text-gray-600">No matches yet. Keep swiping!</p>
              </div>
            ) : (
              matches.map(match => (
                <div
                  key={match.id}
                  onClick={() => setSelectedChat(match)}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-6xl">
                    {match.photo}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{match.name}, {match.age}</h3>
                    <p className="text-sm text-gray-600">{match.college}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Matched {new Date(match.matchedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Chat View */}
        {selectedChat && (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 flex items-center gap-3">
              <button
                onClick={() => setSelectedChat(null)}
                className="hover:bg-white/20 rounded-full p-1"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="text-4xl">{selectedChat.photo}</div>
              <div>
                <h3 className="font-semibold">{selectedChat.name}</h3>
                <p className="text-sm opacity-90">{selectedChat.college}</p>
              </div>
            </div>
            
            <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  Start the conversation! Say hi 👋
                </div>
              ) : (
                chatMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                          : 'bg-white text-gray-800 shadow'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 bg-white border-t flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-3 hover:shadow-lg transition"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeDatingApp;