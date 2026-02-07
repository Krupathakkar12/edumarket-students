
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { authService } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { marketplaceService } from '../services/marketplace';

const data = [
  { name: 'Jan', earnings: 4000, views: 2400 },
  { name: 'Feb', earnings: 3000, views: 1398 },
  { name: 'Mar', earnings: 2000, views: 9800 },
  { name: 'Apr', earnings: 2780, views: 3908 },
  { name: 'May', earnings: 1890, views: 4800 },
  { name: 'Jun', earnings: 2390, views: 3800 },
];

const StatCard: React.FC<{ label: string, value: string, icon: any, color: string }> = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center text-white`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold dark:text-white">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  // Redirect to signin if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleLogout = () => {
    authService.signOut();
    navigate('/');
  };

  // Calculate user's actual stats from their listings
  const userListings = marketplaceService.getUserListings(currentUser.id);
  const soldListings = userListings.filter(l => l.sold);
  const totalEarnings = soldListings.reduce((sum, listing) => sum + listing.price, 0);
  const booksSold = soldListings.length;
  const activeListings = userListings.filter(l => !l.sold).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 space-y-2">
          {[
            { name: 'Dashboard', icon: ICONS.LayoutDashboard, active: true },
            { name: 'My Listings', icon: ICONS.ShoppingBag },
            { name: 'My Notes', icon: ICONS.FileText },
            { name: 'Earnings', icon: ICONS.Wallet },
            { name: 'Orders', icon: ICONS.CheckCircle },
            { name: 'Messages', icon: ICONS.MessageCircle },
            { name: 'Study Tools', icon: ICONS.BrainCircuit },
            { name: 'Settings', icon: ICONS.Settings },
          ].map(item => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-semibold ${item.active ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 mt-8 rounded-xl text-red-500 font-semibold hover:bg-red-50"
          >
            <ICONS.LogOut className="w-5 h-5" />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold dark:text-white">Welcome back, {currentUser.name}! 👋</h1>
            <div className="bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-800 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">University Rank: 14</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Earnings" value={`₹${totalEarnings.toLocaleString('en-IN')}`} icon={ICONS.Wallet} color="bg-emerald-500" />
            <StatCard label="Active Listings" value={activeListings.toString()} icon={ICONS.FileText} color="bg-blue-500" />
            <StatCard label="Books Sold" value={booksSold.toString()} icon={ICONS.ShoppingBag} color="bg-orange-500" />
            <StatCard label="Wallet Balance" value={`₹${totalEarnings.toLocaleString('en-IN')}`} icon={ICONS.CheckCircle} color="bg-purple-500" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold mb-6 dark:text-white">Earnings Growth</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="earnings" stroke="#10B981" fillOpacity={1} fill="url(#colorEarnings)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold mb-6 dark:text-white">Notes Popularity</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="views" fill="#1E3A8A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold dark:text-white">Recent Transactions</h3>
              <button className="text-sm text-indigo-600 font-bold">View History</button>
            </div>
            <div className="space-y-4">
              {soldListings.length > 0 ? (
                soldListings.slice(0, 3).map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                        <ICONS.ShoppingBag className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-bold dark:text-white">{listing.title}</p>
                        <p className="text-xs text-gray-500">Sold • {new Date(listing.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-500">+ ₹{listing.price.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Completed</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No transactions yet</p>
                  <p className="text-sm">Start selling books to see your earnings here!</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
