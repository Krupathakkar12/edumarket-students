
interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
}

interface CurrentUser {
    id: string;
    name: string;
    email: string;
}

const USERS_KEY = 'edumarket_users';
const CURRENT_USER_KEY = 'edumarket_current_user';

// Simple hash function (NOT secure for production)
const hashPassword = (password: string): string => {
    return btoa(password); // Base64 encoding for demo purposes
};

export const authService = {
    signUp: (name: string, email: string, password: string): { success: boolean; error?: string } => {
        try {
            // Get existing users
            const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

            // Check if email already exists
            if (users.some(u => u.email === email)) {
                return { success: false, error: 'Email already registered' };
            }

            // Create new user
            const newUser: User = {
                id: crypto.randomUUID(),
                name,
                email,
                password: hashPassword(password),
                createdAt: new Date().toISOString()
            };

            // Save user
            users.push(newUser);
            localStorage.setItem(USERS_KEY, JSON.stringify(users));

            // Auto sign in
            const currentUser: CurrentUser = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            };
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

            return { success: true };
        } catch (error) {
            return { success: false, error: 'Failed to create account' };
        }
    },

    signIn: (email: string, password: string): { success: boolean; error?: string } => {
        try {
            const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
            const user = users.find(u => u.email === email && u.password === hashPassword(password));

            if (!user) {
                return { success: false, error: 'Invalid email or password' };
            }

            const currentUser: CurrentUser = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

            return { success: true };
        } catch (error) {
            return { success: false, error: 'Failed to sign in' };
        }
    },

    signOut: (): void => {
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser: (): CurrentUser | null => {
        try {
            const user = localStorage.getItem(CURRENT_USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    },

    isAuthenticated: (): boolean => {
        return authService.getCurrentUser() !== null;
    }
};
