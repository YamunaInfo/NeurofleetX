import React, { useState } from 'react';
import { User, Settings, Clock, Shield, Bell, Eye, Save, CreditCard as Edit3, Phone, Mail, MapPin, Calendar, Award, Activity, Download, FileText } from 'lucide-react';
import { User as UserType } from '../../types';

interface UserProfileProps {
  user: UserType;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    department: 'Traffic Management Division',
    position: 'Senior Traffic Analyst',
    location: 'New Delhi, India',
    joinDate: '2022-03-15',
    employeeId: 'TM-2024-001',
    notifications: {
      email: true,
      sms: false,
      push: true,
      emergencyAlerts: true,
      systemUpdates: false,
      weeklyReports: true
    },
    theme: 'dark',
    language: 'en',
    timezone: 'Asia/Kolkata',
    dashboardLayout: 'default'
  });

  const activityHistory = [
    { 
      id: 1, 
      action: 'Logged into system', 
      timestamp: '2025-01-15T14:30:00Z', 
      type: 'login',
      details: 'Successful login from 192.168.1.100',
      duration: '2h 45m'
    },
    { 
      id: 2, 
      action: 'Updated traffic signal timing', 
      timestamp: '2025-01-15T13:45:00Z', 
      type: 'update',
      details: 'Modified timing for Main St & 1st Ave intersection',
      duration: '15m'
    },
    { 
      id: 3, 
      action: 'Responded to emergency alert', 
      timestamp: '2025-01-15T12:20:00Z', 
      type: 'emergency',
      details: 'Coordinated ambulance route optimization',
      duration: '8m'
    },
    { 
      id: 4, 
      action: 'Generated analytics report', 
      timestamp: '2025-01-15T11:15:00Z', 
      type: 'report',
      details: 'Weekly traffic flow analysis exported',
      duration: '25m'
    },
    { 
      id: 5, 
      action: 'Optimized route for emergency vehicle', 
      timestamp: '2025-01-15T10:30:00Z', 
      type: 'optimization',
      details: 'Fire truck route to downtown incident',
      duration: '5m'
    },
    { 
      id: 6, 
      action: 'Updated user preferences', 
      timestamp: '2025-01-15T09:45:00Z', 
      type: 'settings',
      details: 'Changed notification settings and theme',
      duration: '3m'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return '🔐';
      case 'update': return '⚙️';
      case 'emergency': return '🚨';
      case 'report': return '📊';
      case 'optimization': return '🎯';
      case 'settings': return '⚙️';
      default: return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'login': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'update': return 'bg-green-100 text-green-800 border-green-200';
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'report': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'optimization': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'settings': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'operator': return 'bg-blue-500';
      case 'citizen': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const permissions = [
    { name: 'View Dashboard', granted: true, icon: Eye },
    { name: 'Manage Traffic Signals', granted: true, icon: Settings },
    { name: 'Handle Emergency Alerts', granted: true, icon: Bell },
    { name: 'Generate Reports', granted: true, icon: FileText },
    { name: 'System Administration', granted: user.role === 'admin', icon: Shield },
    { name: 'User Management', granted: user.role === 'admin', icon: User },
    { name: 'Digital Twin Control', granted: user.role !== 'citizen', icon: Activity },
    { name: 'Export Data', granted: true, icon: Download }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
  };

  const handleExportActivity = () => {
    const csvData = activityHistory.map(activity => 
      `${new Date(activity.timestamp).toLocaleString()},${activity.action},${activity.type},${activity.details},${activity.duration}`
    ).join('\n');
    const header = 'Timestamp,Action,Type,Details,Duration\n';
    const blob = new Blob([header + csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_activity_history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <User className="w-8 h-8 mr-3 text-blue-400" />
          Comprehensive User Profile
        </h2>
        
        <div className="flex space-x-3">
          <button
            onClick={handleExportActivity}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Export Activity
          </button>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center"
          >
            {isEditing ? <Save className="w-5 h-5 mr-2" /> : <Edit3 className="w-5 h-5 mr-2" />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Management */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{profileData.name}</h3>
                <p className="text-gray-600">{profileData.email}</p>
                <div className="flex items-center mt-2 space-x-3">
                  <span className={`${getRoleBadgeColor(user.role)} px-3 py-1 rounded-full text-sm font-medium text-white capitalize`}>
                    {user.role}
                  </span>
                  <span className="text-gray-500 text-sm">{profileData.position}</span>
                  <span className="text-gray-400 text-sm">ID: {profileData.employeeId}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  value={profileData.department}
                  onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input
                  type="text"
                  value={profileData.position}
                  onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-600" />
                Contact Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800 font-medium">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-800 font-medium">{profileData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-800 font-medium">{profileData.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-6">
              <Settings className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">Preferences & Settings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select 
                  value={profileData.theme}
                  onChange={(e) => setProfileData({...profileData, theme: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select 
                  value={profileData.language}
                  onChange={(e) => setProfileData({...profileData, language: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select 
                  value={profileData.timezone}
                  onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Layout</label>
                <select 
                  value={profileData.dashboardLayout}
                  onChange={(e) => setProfileData({...profileData, dashboardLayout: e.target.value})}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-50"
                >
                  <option value="default">Default</option>
                  <option value="compact">Compact</option>
                  <option value="expanded">Expanded</option>
                </select>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center mb-4">
                <Bell className="w-5 h-5 text-yellow-600 mr-2" />
                <h4 className="text-lg font-bold text-gray-800">Notification Settings</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(profileData.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setProfileData({
                          ...profileData,
                          notifications: {...profileData.notifications, [key]: e.target.checked}
                        })}
                        disabled={!isEditing}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Role & Permissions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-bold text-gray-800">Role Management</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Current Role</span>
                  <span className={`${getRoleBadgeColor(user.role)} px-3 py-1 rounded-full text-sm font-medium text-white capitalize`}>
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Since: {new Date(profileData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-gray-800 font-medium flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Permissions:
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {permissions.map((permission, index) => {
                    const Icon = permission.icon;
                    return (
                      <div key={index} className={`flex items-center p-2 rounded-lg ${
                        permission.granted ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                      }`}>
                        <Icon className="w-4 h-4 mr-2" />
                        <span className="text-sm">{permission.name}</span>
                        {permission.granted && (
                          <span className="ml-auto text-green-500">✓</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Activity History */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Activity History</h3>
              </div>
              <span className="text-sm text-gray-500">{activityHistory.length} activities</span>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activityHistory.map((activity) => (
                <div key={activity.id} className={`border rounded-lg p-3 ${getActivityColor(activity.type)}`}>
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{getActivityIcon(activity.type)}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs opacity-75 mt-1">{activity.details}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs opacity-60">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                        <span className="text-xs bg-white/50 px-2 py-1 rounded-full">
                          {activity.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};