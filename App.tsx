
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import AITools from './pages/AITools';
import Dashboard from './pages/Dashboard';
import PythonLab from './pages/PythonLab';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Books from './pages/Books';
import SellBook from './pages/SellBook';
import CampusMarket from './pages/CampusMarket';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import Notes from './pages/Notes';
import SellNotes from './pages/SellNotes';

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
          <Route path="/sell-book" element={<SellBook />} />
          <Route path="/sell-notes" element={<SellNotes />} />
          <Route path="/campus" element={<CampusMarket />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
