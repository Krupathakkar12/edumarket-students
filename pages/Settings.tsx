
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Bell, Palette, AlertCircle } from 'lucide-react';
import { authService } from '../services/auth';

const Settings: React.FC = () => {
    const navigate = useNavigate();
    const currentUser = authService.getCurrentUser();

    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: '',
        bio: '',
        notifications: true,
        darkMode: false,
    });

    React.useEffect(() => {
        if (!currentUser) {
            navigate('/signin');
        }
    }, [currentUser, navigate]);

    if (!currentUser) return null;

    const handleSave = () => {
        // In a real app, this would update the user data
        alert('Settings saved! (Demo mode - changes not persisted)');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold dark:text-white mb-8">Settings</h1>

                <div className="space-y-6">
                    {/* Profile Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="w-6 h-6 text-indigo-600" />
                            <h2 className="text-xl font-semibold dark:text-white">Profile Information</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+91 98765 43210"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={3}
                                    placeholder="Tell us about yourself..."
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Bell className="w-6 h-6 text-indigo-600" />
                            <h2 className="text-xl font-semibold dark:text-white">Notifications</h2>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="font-medium dark:text-white">Email Notifications</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates about your orders</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={formData.notifications}
                                    onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                />
                            </label>

                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="font-medium dark:text-white">Marketing Emails</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive promotional offers and updates</p>
                                </div>
                                <input
                                    type="checkbox"
                                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Lock className="w-6 h-6 text-indigo-600" />
                            <h2 className="text-xl font-semibold dark:text-white">Security</h2>
                        </div>

                        <button className="w-full sm:w-auto px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                            Change Password
                        </button>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                            <h2 className="text-xl font-semibold text-red-900 dark:text-red-400">Danger Zone</h2>
                        </div>

                        <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                            Delete Account
                        </button>
                    </div>

                    {/* Save Button */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
