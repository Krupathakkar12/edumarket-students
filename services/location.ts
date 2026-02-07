// Indian Universities with locations
export const INDIAN_UNIVERSITIES = [
    { id: 1, name: 'IIT Bombay', city: 'Mumbai', state: 'Maharashtra', lat: 19.1334, lng: 72.9133 },
    { id: 2, name: 'IIT Delhi', city: 'New Delhi', state: 'Delhi', lat: 28.5450, lng: 77.1920 },
    { id: 3, name: 'IIT Madras', city: 'Chennai', state: 'Tamil Nadu', lat: 12.9916, lng: 80.2336 },
    { id: 4, name: 'IIT Kanpur', city: 'Kanpur', state: 'Uttar Pradesh', lat: 26.5123, lng: 80.2329 },
    { id: 5, name: 'IIT Kharagpur', city: 'Kharagpur', state: 'West Bengal', lat: 22.3149, lng: 87.3105 },
    { id: 6, name: 'BITS Pilani', city: 'Pilani', state: 'Rajasthan', lat: 28.3638, lng: 75.5868 },
    { id: 7, name: 'Delhi University', city: 'New Delhi', state: 'Delhi', lat: 28.6889, lng: 77.2090 },
    { id: 8, name: 'Mumbai University', city: 'Mumbai', state: 'Maharashtra', lat: 18.9696, lng: 72.8205 },
    { id: 9, name: 'Pune University', city: 'Pune', state: 'Maharashtra', lat: 18.5477, lng: 73.8270 },
    { id: 10, name: 'Anna University', city: 'Chennai', state: 'Tamil Nadu', lat: 13.0115, lng: 80.2338 },
    { id: 11, name: 'Jadavpur University', city: 'Kolkata', state: 'West Bengal', lat: 22.4987, lng: 88.3716 },
    { id: 12, name: 'VIT Vellore', city: 'Vellore', state: 'Tamil Nadu', lat: 12.9697, lng: 79.1559 },
    { id: 13, name: 'NIT Trichy', city: 'Tiruchirappalli', state: 'Tamil Nadu', lat: 10.7558, lng: 78.7148 },
    { id: 14, name: 'BHU Varanasi', city: 'Varanasi', state: 'Uttar Pradesh', lat: 25.2681, lng: 82.9912 },
    { id: 15, name: 'AMU Aligarh', city: 'Aligarh', state: 'Uttar Pradesh', lat: 27.8952, lng: 78.0854 },
    { id: 16, name: 'Manipal University', city: 'Manipal', state: 'Karnataka', lat: 13.3497, lng: 74.7869 },
    { id: 17, name: 'NITK Surathkal', city: 'Mangalore', state: 'Karnataka', lat: 13.0117, lng: 74.7952 },
    { id: 18, name: 'IISc Bangalore', city: 'Bangalore', state: 'Karnataka', lat: 13.0219, lng: 77.5671 },
    { id: 19, name: 'Hyderabad University', city: 'Hyderabad', state: 'Telangana', lat: 17.4565, lng: 78.5294 },
    { id: 20, name: 'Jamia Millia Islamia', city: 'New Delhi', state: 'Delhi', lat: 28.5616, lng: 77.2801 },
];

// Calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
};

// Get nearby universities based on user's location
export const getNearbyUniversities = (userLat: number, userLng: number, maxDistance = 100): typeof INDIAN_UNIVERSITIES => {
    return INDIAN_UNIVERSITIES
        .map(uni => ({
            ...uni,
            distance: calculateDistance(userLat, userLng, uni.lat, uni.lng)
        }))
        .filter(uni => uni.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance);
};

// Request user's location
export const requestUserLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
};
