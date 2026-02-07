
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import AITools from './pages/AITools';
import Dashboard from './pages/Dashboard';
import PythonLab from './pages/PythonLab';
import Contact from './pages/Contact';

// Mock Marketplace Pages for navigation
const Books = () => (
    <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold dark:text-white">Book Marketplace</h1>
        <p className="text-gray-500 mt-2">Explore thousands of academic books available near you.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <p className="col-span-full dark:text-gray-400">Filter system and full catalog coming soon in this demo.</p>
        </div>
    </div>
);

const Notes = () => (
    <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold dark:text-white">Notes Marketplace</h1>
        <p className="text-gray-500 mt-2">High-quality, AI-scanned notes from the brightest students.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <p className="col-span-full dark:text-gray-400">Discover topper-verified materials and boost your grades.</p>
        </div>
    </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/python-lab" element={<PythonLab />} />
          <Route path="/tools" element={<AITools />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
