
import React from 'react';
import { MapPin, AlertCircle } from 'lucide-react';

const CampusMarket: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <MapPin className="w-20 h-20 mx-auto text-indigo-600 dark:text-indigo-400 mb-4" />
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Campus Market
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Buy and sell everything on campus - furniture, electronics, stationery, and more!
                    </p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-8 mb-8">
                    <div className="flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
                        <div className="text-left">
                            <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                                Coming Soon! 🚀
                            </h3>
                            <p className="text-sm text-indigo-800 dark:text-indigo-200">
                                We're building a full campus marketplace where you can buy and sell
                                furniture, electronics, bicycles, stationery, and everything else students need.
                                Stay tuned!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { name: 'Furniture', icon: '🛋️' },
                        { name: 'Electronics', icon: '💻' },
                        { name: 'Bicycles', icon: '🚲' },
                        { name: 'Stationery', icon: '📚' },
                        { name: 'Clothing', icon: '👕' },
                        { name: 'Sports', icon: '⚽' },
                        { name: 'Musical', icon: '🎸' },
                        { name: 'Other', icon: '📦' },
                    ].map((category) => (
                        <div
                            key={category.name}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-not-allowed opacity-60"
                        >
                            <div className="text-4xl mb-2">{category.icon}</div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                                {category.name}
                            </h3>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Want to be notified when Campus Market launches?
                    </p>
                    <div className="flex gap-3 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                            disabled
                        />
                        <button
                            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors cursor-not-allowed opacity-60"
                            disabled
                        >
                            Notify Me
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampusMarket;
