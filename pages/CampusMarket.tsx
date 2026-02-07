
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';
import { AlertCircle, BookOpen, Laptop } from 'lucide-react';
import { INDIAN_UNIVERSITIES, requestUserLocation, getNearbyUniversities } from '../services/location';

const CampusMarket: React.FC = () => {
    const [selectedCampus, setSelectedCampus] = useState<any>(null);
    const [nearbyCampuses, setNearbyCampuses] = useState<any[]>([]);
    const [locationPermission, setLocationPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    const handleRequestLocation = async () => {
        setLoadingLocation(true);
        try {
            const location = await requestUserLocation();
            setUserLocation(location);
            setLocationPermission('granted');

            // Get universities within 100km
            const nearby = getNearbyUniversities(location.lat, location.lng, 100);
            setNearbyCampuses(nearby);

            if (nearby.length > 0) {
                setSelectedCampus(nearby[0]); // Select closest campus
            }
        } catch (error) {
            console.error('Location error:', error);
            setLocationPermission('denied');
            // Show all universities if location denied
            setNearbyCampuses(INDIAN_UNIVERSITIES.slice(0, 10));
            setSelectedCampus(INDIAN_UNIVERSITIES[0]);
        } finally {
            setLoadingLocation(false);
        }
    };

    useEffect(() => {
        // Try to get location automatically
        handleRequestLocation();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Location Permission Banner */}
            {locationPermission === 'pending' && (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-8 mb-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-start gap-4 flex-1">
                            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <ICONS.MapPin className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">📍 Find Campus Items Near You</h3>
                                <p className="text-indigo-100 mb-4">Allow location access to discover books, notes, and items available at your university and nearby campuses.</p>
                                <ul className="text-sm text-indigo-100 space-y-1">
                                    <li>✅ See items from students in your campus</li>
                                    <li>✅ Quick pickup - no shipping needed</li>
                                    <li>✅ Meet sellers face-to-face</li>
                                </ul>
                            </div>
                        </div>
                        <button
                            onClick={handleRequestLocation}
                            disabled={loadingLocation}
                            className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-all flex-shrink-0 disabled:opacity-50"
                        >
                            {loadingLocation ? 'Getting Location...' : 'Allow Location'}
                        </button>
                    </div>
                </div>
            )}

            {locationPermission === 'denied' && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 mb-8">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-yellow-900 dark:text-yellow-200 mb-1">Location Access Denied</h4>
                            <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-3">We'll show you universities across India. Enable location to see items near you.</p>
                            <button onClick={handleRequestLocation} className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 hover:underline">
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold dark:text-white flex items-center gap-3">
                        <ICONS.MapPin className="text-indigo-600" />
                        Campus Marketplace
                    </h1>
                    {selectedCampus && (
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Showing items from <span className="font-bold text-emerald-600">{selectedCampus.name}</span>
                                {selectedCampus.distance !== undefined && (
                                    <span className="ml-2 text-sm">({selectedCampus.distance.toFixed(1)} km away)</span>
                                )}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Nearby Campuses */}
            {nearbyCampuses.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 dark:text-white">
                        {locationPermission === 'granted' ? '📍 Nearby Campuses' : '🎓 Popular Indian Universities'}
                    </h3>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {nearbyCampuses.map((campus) => (
                            <button
                                key={campus.id}
                                onClick={() => setSelectedCampus(campus)}
                                className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${selectedCampus?.id === campus.id
                                    ? 'bg-indigo-600 text-white shadow-lg'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                                    }`}
                            >
                                {campus.name}
                                {campus.distance !== undefined && (
                                    <span className="ml-2 text-xs opacity-75">({campus.distance.toFixed(0)}km)</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Coming Soon Content */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ICONS.MapPin className="w-12 h-12 text-indigo-600" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 dark:text-white">Campus Marketplace Coming Soon! 🚀</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        Buy and sell items with students from <span className="font-bold text-indigo-600">{selectedCampus?.name || 'your campus'}</span>.
                        No shipping needed - meet up on campus!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                            { icon: BookOpen, title: 'Textbooks', desc: 'Course materials & references' },
                            { icon: Laptop, title: 'Electronics', desc: 'Laptops, calculators, gadgets' },
                            { icon: ICONS.ShoppingBag, title: 'Essentials', desc: 'Notes, stationery, more' }
                        ].map((category, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
                                <category.icon className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                                <h4 className="font-bold dark:text-white mb-1">{category.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{category.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 inline-block">
                        <p className="text-sm text-gray-600 dark:text-gray-400">🎓 Currently available at</p>
                        <p className="text-2xl font-bold text-indigo-600 mt-1">{INDIAN_UNIVERSITIES.length}+ Indian Universities</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampusMarket;
