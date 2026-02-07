
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ICONS } from '../constants';
import { Theme } from '../types';
import { Phone, Mail, LogOut, ChevronDown } from 'lucide-react';
import { authService } from '../services/auth';

export const Header: React.FC<{ theme: Theme, toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check auth status on mount and location change
  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, [location]);

  const handleLogout = () => {
    authService.signOut();
    setCurrentUser(null);
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Buy Books', path: '/books', icon: ICONS.ShoppingBag },
    { name: 'Notes Marketplace', path: '/notes', icon: ICONS.FileText },
    { name: 'Python Lab', path: '/python-lab', icon: ICONS.Code2 },
    { name: 'Study Tools', path: '/tools', icon: ICONS.BrainCircuit },
    { name: 'Campus Market', path: '/campus', icon: ICONS.MapPin },
  ];

  return (
    <header className="sticky top-0 z-50 bg-indigo-900-custom text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <ICONS.Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/10 ${location.pathname === link.path ? 'bg-white/20' : ''
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <ICONS.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search subject, university..."
                className="w-full pl-10 pr-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm placeholder:text-gray-300 focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={toggleTheme} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              {theme === 'light' ? <ICONS.Moon className="w-5 h-5" /> : <ICONS.Sun className="w-5 h-5" />}
            </button>

            {currentUser ? (
              <>
                <Link to="/wishlist" className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
                  <ICONS.Heart className="w-5 h-5" />
                </Link>
                <Link to="/messages" className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
                  <ICONS.MessageCircle className="w-5 h-5" />
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500-custom hover:bg-emerald-600 text-white rounded-full text-sm font-semibold transition-colors"
                  >
                    <ICONS.User className="w-4 h-4" />
                    <span className="hidden sm:inline">{currentUser.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <Link
                        to="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center gap-2">
                          <ICONS.User className="w-4 h-4" />
                          Dashboard
                        </div>
                      </Link>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <div className="flex items-center gap-2">
                          <LogOut className="w-4 h-4" />
                          Logout
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/signin" className="px-4 py-1.5 text-sm font-medium hover:bg-white/10 rounded-full transition-colors hidden sm:block">
                  Sign In
                </Link>
                <Link to="/signup" className="px-4 py-1.5 bg-emerald-500-custom hover:bg-emerald-600 text-white rounded-full text-sm font-semibold transition-colors">
                  Sign Up
                </Link>
              </>
            )}

            <button
              className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <ICONS.X className="w-6 h-6" /> : <ICONS.Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-indigo-950 border-t border-white/10 py-4 animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                <link.icon className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <ICONS.Logo />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
              The ultimate student ecosystem. Buy, sell, learn, and grow together with verified materials and AI-powered study tools.
            </p>
            <Link to="/contact" className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm inline-block hover:shadow-md transition-shadow group">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-400 text-sm mb-3">For Any Doubts, Contact:</h4>
              <div className="space-y-2">
                <p className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-indigo-600">Krupa Thakkar</p>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <Phone className="w-3.5 h-3.5" />
                  +91 9512262984
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <Mail className="w-3.5 h-3.5" />
                  Krupathakkar1210@gmail.com
                </div>
              </div>
            </Link>
          </div>
          <div>
            <h4 className="font-bold mb-4 dark:text-white">Marketplace</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/books" className="hover:text-indigo-600">Old Books</Link></li>
              <li><Link to="/notes" className="hover:text-indigo-600">Lecture Notes</Link></li>
              <li><Link to="/toppers" className="hover:text-indigo-600">Topper Specials</Link></li>
              <li><Link to="/campus" className="hover:text-indigo-600">Campus Deals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 dark:text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/tools" className="hover:text-indigo-600">AI Study Tools</Link></li>
              <li><Link to="/python-lab" className="hover:text-indigo-600">Python Kaggle Lab</Link></li>
              <li><Link to="/blog" className="hover:text-indigo-600">Student Blog</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 dark:text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-600">Terms of Service</Link></li>
              <li><Link to="/safety" className="hover:text-indigo-600">Safety Tips</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 font-bold text-indigo-600">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EduMarket. Built for Students.
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
