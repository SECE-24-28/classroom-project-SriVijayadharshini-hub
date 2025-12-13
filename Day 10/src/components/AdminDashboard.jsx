import { useState } from 'react';

function AdminDashboard({ onLogout, userName }) {
  // Mock data as initial state
  const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210', balance: '₹500', joinDate: 'Jan 10, 2024', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 98765 43211', balance: '₹750', joinDate: 'Jan 12, 2024', status: 'active' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '+91 98765 43212', balance: '₹300', joinDate: 'Jan 13, 2024', status: 'active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '+91 98765 43213', balance: '₹1,200', joinDate: 'Jan 14, 2024', status: 'inactive' },
    { id: 5, name: 'Michael Chen', email: 'michael@example.com', phone: '+91 98765 43214', balance: '₹950', joinDate: 'Jan 15, 2024', status: 'active' },
    { id: 6, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+91 98765 43215', balance: '₹600', joinDate: 'Jan 16, 2024', status: 'active' },
    { id: 7, name: 'David Miller', email: 'david@example.com', phone: '+91 98765 43216', balance: '₹1,500', joinDate: 'Jan 17, 2024', status: 'inactive' },
    { id: 8, name: 'Lisa Taylor', email: 'lisa@example.com', phone: '+91 98765 43217', balance: '₹400', joinDate: 'Jan 18, 2024', status: 'active' },
  ];

  const initialRecharges = [
    { id: 'TXN001245', user: 'John Doe', amount: '₹299', provider: 'Jio', date: 'Jan 15, 2024', time: '14:30', status: 'success' },
    { id: 'TXN001244', user: 'Jane Smith', amount: '₹399', provider: 'Airtel', date: 'Jan 14, 2024', time: '11:15', status: 'success' },
    { id: 'TXN001243', user: 'Robert Johnson', amount: '₹199', provider: 'Vi', date: 'Jan 13, 2024', time: '09:45', status: 'failed' },
    { id: 'TXN001242', user: 'Alice Brown', amount: '₹499', provider: 'BSNL', date: 'Jan 12, 2024', time: '16:20', status: 'success' },
    { id: 'TXN001241', user: 'Michael Chen', amount: '₹349', provider: 'Jio', date: 'Jan 15, 2024', time: '10:30', status: 'success' },
    { id: 'TXN001240', user: 'Sarah Wilson', amount: '₹599', provider: 'Airtel', date: 'Jan 14, 2024', time: '15:45', status: 'success' },
    { id: 'TXN001239', user: 'David Miller', amount: '₹199', provider: 'Vi', date: 'Jan 13, 2024', time: '12:20', status: 'failed' },
    { id: 'TXN001238', user: 'Lisa Taylor', amount: '₹299', provider: 'Jio', date: 'Jan 12, 2024', time: '17:30', status: 'success' },
  ];

  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState(initialUsers);
  const [recharges] = useState(initialRecharges);
  const [searchTerm, setSearchTerm] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState('all');
  const [rechargeStatusFilter, setRechargeStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    maintenanceMode: false,
    smsAlerts: true,
    lowBalanceAlerts: true
  });
  const [commissionRate, setCommissionRate] = useState(2.5);

  // Dashboard Stats
  const stats = {
    totalUsers: 1247,
    totalRecharges: 3842,
    totalRevenue: 3128450,
    successRate: 98.2,
    activeUsers: 892,
    growthRate: 12.5,
    pendingTransactions: 18,
    avgTransactionValue: '₹327'
  };

  // Filter users based on search term and status filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesStatus = 
      userStatusFilter === 'all' || 
      user.status === userStatusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Filter recharges based on status filter
  const filteredRecharges = recharges.filter(recharge => {
    return rechargeStatusFilter === 'all' || recharge.status === rechargeStatusFilter;
  });

  // Calculate statistics for dashboard
  const calculateDashboardStats = () => {
    const totalUsers = filteredUsers.length;
    const activeUsers = filteredUsers.filter(user => user.status === 'active').length;
    const totalBalance = filteredUsers.reduce((sum, user) => {
      const balance = parseInt(user.balance.replace(/[^0-9]/g, ''));
      return sum + (isNaN(balance) ? 0 : balance);
    }, 0);
    
    return {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      totalBalance: `₹${totalBalance.toLocaleString()}`,
      avgBalance: `₹${Math.round(totalBalance / totalUsers).toLocaleString()}`
    };
  };

  const dashboardStats = calculateDashboardStats();

  // Handle user deletion
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  // Handle toggle user status
  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  // Handle toggle notification setting
  const handleToggleNotification = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle save settings
  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert('Settings saved successfully!');
      setIsLoading(false);
    }, 1000);
  };

  // Add new user
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: `New User ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`,
      phone: `+91 ${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      balance: `₹${Math.floor(Math.random() * 2000) + 100}`,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'active'
    };
    setUsers([...users, newUser]);
  };

  // Simple SVG icons as inline components with theme colors
  const Icons = {
    Search: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    Users: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 5.197v-1a6 6 0 00-9-5.197M9 9a3 3 0 116 0 3 3 0 01-6 0z" />
      </svg>
    ),
    CreditCard: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    BarChart: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    TrendingUp: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    Settings: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    DollarSign: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    CheckCircle: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    UserPlus: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    Download: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    Eye: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    Edit: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    Trash: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    Filter: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
    ),
    Refresh: () => (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    Bell: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    Home: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Navigation Header - Black theme */}
      <header className="bg-gray-900 border-b border-gray-800 shadow-xl sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
                  <span className="text-silver font-bold text-lg">MR</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-sm text-gray-400">Mobile Recharge Management</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Icons.Search />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  <Icons.Bell />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-medium text-white">{userName || 'Administrator'}</p>
                  <p className="text-xs text-gray-400">Super Admin</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-silver font-semibold border border-gray-700">
                  {userName ? userName.charAt(0).toUpperCase() : 'A'}
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all text-sm font-medium shadow-md"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation - Silver theme */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'dashboard' 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-l-4 border-blue-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icons.BarChart />
                <span className="font-medium">Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'users' 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-l-4 border-blue-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icons.Users />
                <div className="flex-1 flex justify-between items-center">
                  <span className="font-medium">Users</span>
                  <span className="bg-gray-700 text-silver text-xs px-2 py-1 rounded-full">
                    {users.length}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('recharges')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'recharges' 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-l-4 border-blue-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icons.CreditCard />
                <div className="flex-1 flex justify-between items-center">
                  <span className="font-medium">Recharges</span>
                  <span className="bg-gray-700 text-silver text-xs px-2 py-1 rounded-full">
                    {recharges.length}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'analytics' 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-l-4 border-blue-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icons.TrendingUp />
                <span className="font-medium">Analytics</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'settings' 
                    ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white border-l-4 border-blue-500' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icons.Settings />
                <span className="font-medium">Settings</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
                  <p className="text-gray-400 mt-1">Welcome back, here's what's happening with your platform.</p>
                </div>

                {/* Stats Grid - White/Silver containers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Users</p>
                        <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center border border-gray-600">
                        <Icons.Users className="text-silver" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <Icons.TrendingUp className="text-green-400" />
                      <span className="text-sm text-green-400 font-medium ml-2">+{stats.growthRate}%</span>
                      <span className="text-sm text-gray-400 ml-2">from last month</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Recharges</p>
                        <p className="text-3xl font-bold text-white mt-2">{stats.totalRecharges.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center border border-gray-600">
                        <Icons.CreditCard className="text-silver" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <Icons.TrendingUp className="text-green-400" />
                      <span className="text-sm text-green-400 font-medium ml-2">+8.2%</span>
                      <span className="text-sm text-gray-400 ml-2">from last month</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Revenue</p>
                        <p className="text-3xl font-bold text-white mt-2">₹{stats.totalRevenue.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center border border-gray-600">
                        <Icons.DollarSign className="text-silver" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <Icons.TrendingUp className="text-green-400" />
                      <span className="text-sm text-green-400 font-medium ml-2">+15.3%</span>
                      <span className="text-sm text-gray-400 ml-2">from last month</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Success Rate</p>
                        <p className="text-3xl font-bold text-white mt-2">{stats.successRate}%</p>
                      </div>
                      <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center border border-gray-600">
                        <Icons.CheckCircle className="text-silver" />
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      <Icons.TrendingUp className="text-green-400" />
                      <span className="text-sm text-green-400 font-medium ml-2">+0.5%</span>
                      <span className="text-sm text-gray-400 ml-2">from last month</span>
                    </div>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Active Users</p>
                        <p className="text-2xl font-bold text-white mt-2">{dashboardStats.activeUsers}</p>
                        <p className="text-xs text-gray-400 mt-1">Out of {dashboardStats.totalUsers} total</p>
                      </div>
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                        <span className="text-green-400 font-bold">{Math.round((dashboardStats.activeUsers / dashboardStats.totalUsers) * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Balance</p>
                        <p className="text-2xl font-bold text-white mt-2">{dashboardStats.totalBalance}</p>
                        <p className="text-xs text-gray-400 mt-1">Across all users</p>
                      </div>
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                        <Icons.DollarSign className="text-silver" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Pending Transactions</p>
                        <p className="text-2xl font-bold text-white mt-2">{stats.pendingTransactions}</p>
                        <p className="text-xs text-gray-400 mt-1">Require attention</p>
                      </div>
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                        <span className="text-yellow-400 font-bold">{stats.pendingTransactions}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-lg overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
                        <p className="text-sm text-gray-400 mt-1">Latest recharge activities</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <select 
                          value={rechargeStatusFilter}
                          onChange={(e) => setRechargeStatusFilter(e.target.value)}
                          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="all" className="bg-gray-800">All Status</option>
                          <option value="success" className="bg-gray-800">Success</option>
                          <option value="failed" className="bg-gray-800">Failed</option>
                        </select>
                        <button className="text-sm text-blue-400 font-medium hover:text-blue-300">
                          View All
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-900">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Transaction ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Provider</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredRecharges.slice(0, 6).map((recharge) => (
                          <tr key={recharge.id} className="hover:bg-gray-800 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">{recharge.id}</div>
                              <div className="text-xs text-gray-400">{recharge.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-silver font-semibold text-xs mr-3 border border-gray-600">
                                  {recharge.user.charAt(0)}
                                </div>
                                <span className="text-sm text-white">{recharge.user}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 border ${
                                  recharge.provider === 'Jio' ? 'bg-blue-900/30 border-blue-700' :
                                  recharge.provider === 'Airtel' ? 'bg-red-900/30 border-red-700' :
                                  recharge.provider === 'Vi' ? 'bg-purple-900/30 border-purple-700' : 'bg-green-900/30 border-green-700'
                                }`}>
                                  <span className={`text-xs font-bold ${
                                    recharge.provider === 'Jio' ? 'text-blue-400' :
                                    recharge.provider === 'Airtel' ? 'text-red-400' :
                                    recharge.provider === 'Vi' ? 'text-purple-400' : 'text-green-400'
                                  }`}>
                                    {recharge.provider.charAt(0)}
                                  </span>
                                </div>
                                <span className="text-sm text-white">{recharge.provider}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-white">{recharge.amount}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                recharge.status === 'success' 
                                  ? 'bg-green-900/30 text-green-400 border border-green-700' 
                                  : 'bg-red-900/30 text-red-400 border border-red-700'
                              }`}>
                                {recharge.status === 'success' ? 'Successful' : 'Failed'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-400">{recharge.time}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Users View */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white">User Management</h2>
                    <p className="text-gray-400 mt-1">Manage all registered users on the platform</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={handleAddUser}
                      className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2 shadow-lg"
                    >
                      <Icons.UserPlus />
                      <span className="font-medium">Add New User</span>
                    </button>
                    <button 
                      onClick={() => window.location.reload()}
                      className="p-2.5 bg-gray-800 text-gray-400 rounded-xl hover:bg-gray-700 hover:text-white border border-gray-700"
                      title="Refresh"
                    >
                      <Icons.Refresh />
                    </button>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl border border-gray-700 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Icons.Search />
                      </div>
                      <input
                        type="text"
                        placeholder="Search users by name, email, or phone..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Icons.Filter className="text-gray-400" />
                        <select 
                          value={userStatusFilter}
                          onChange={(e) => setUserStatusFilter(e.target.value)}
                          className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="all" className="bg-gray-800">All Status</option>
                          <option value="active" className="bg-gray-800">Active</option>
                          <option value="inactive" className="bg-gray-800">Inactive</option>
                        </select>
                      </div>
                      <button className="px-4 py-3 bg-gray-800 text-gray-400 rounded-xl hover:bg-gray-700 hover:text-white border border-gray-700 flex items-center space-x-2 transition-colors">
                        <Icons.Download />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Users Table */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-900">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">User</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Contact</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Balance</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-800 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-silver font-semibold border border-gray-600">
                                  {user.name.charAt(0)}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-white">{user.name}</div>
                                  <div className="text-sm text-gray-400">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-white">{user.phone}</div>
                              <div className="text-sm text-gray-400">Joined {user.joinDate}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-lg font-semibold text-white">{user.balance}</div>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleToggleUserStatus(user.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border ${
                                  user.status === 'active' 
                                    ? 'bg-green-900/30 text-green-400 border-green-700 hover:bg-green-800/30' 
                                    : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                                }`}
                              >
                                {user.status === 'active' ? 'Active' : 'Inactive'}
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button 
                                  className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                                  title="View Details"
                                >
                                  <Icons.Eye />
                                </button>
                                <button 
                                  className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded-lg transition-colors"
                                  title="Edit User"
                                >
                                  <Icons.Edit />
                                </button>
                                <button 
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                                  title="Delete User"
                                >
                                  <Icons.Trash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                      <div className="text-center py-8">
                        <p className="text-gray-400">No users found matching your search criteria.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Settings View */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Settings</h2>
                  <p className="text-gray-400 mt-1">Manage platform settings and configurations</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* General Settings */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-6">General Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Email Notifications</p>
                          <p className="text-sm text-gray-400 mt-1">Send email notifications for important updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.emailNotifications}
                            onChange={() => handleToggleNotification('emailNotifications')}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Maintenance Mode</p>
                          <p className="text-sm text-gray-400 mt-1">Put the platform under maintenance</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.maintenanceMode}
                            onChange={() => handleToggleNotification('maintenanceMode')}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">SMS Alerts</p>
                          <p className="text-sm text-gray-400 mt-1">Send SMS notifications for transactions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.smsAlerts}
                            onChange={() => handleToggleNotification('smsAlerts')}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">Low Balance Alerts</p>
                          <p className="text-sm text-gray-400 mt-1">Alert users when balance is low</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notificationSettings.lowBalanceAlerts}
                            onChange={() => handleToggleNotification('lowBalanceAlerts')}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Commission Settings */}
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-6">Commission Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Default Commission Rate (%)
                        </label>
                        <input
                          type="number"
                          value={commissionRate}
                          onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
                          step="0.1"
                          min="0"
                          max="100"
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />
                        <p className="text-sm text-gray-400 mt-2">
                          Current rate: {commissionRate}% per transaction
                        </p>
                      </div>
                      <button 
                        onClick={handleSaveSettings}
                        disabled={isLoading}
                        className={`w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors font-medium shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isLoading ? 'Saving...' : 'Save Settings'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Settings */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
                  <h3 className="text-lg font-semibold text-white mb-6">Platform Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Platform Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Mobile Recharge Portal"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Support Email
                      </label>
                      <input
                        type="email"
                        defaultValue="support@rechargeportal.com"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Support Phone
                      </label>
                      <input
                        type="text"
                        defaultValue="+91 1800 123 4567"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Time Zone
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none">
                        <option className="bg-gray-800">IST (Indian Standard Time)</option>
                        <option className="bg-gray-800">UTC</option>
                        <option className="bg-gray-800">EST</option>
                        <option className="bg-gray-800">PST</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl hover:from-gray-800 hover:to-gray-900 transition-colors font-medium shadow-lg border border-gray-700">
                      Update Platform Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add custom CSS for silver color */}
      <style jsx>{`
        .text-silver {
          color: #C0C0C0;
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;