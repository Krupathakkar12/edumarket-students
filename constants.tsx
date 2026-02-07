
import React from 'react';
import {
  Book as BookIcon,
  GraduationCap,
  Search,
  Heart,
  MessageCircle,
  User,
  FileText,
  BrainCircuit,
  MapPin,
  ShoppingBag,
  Star,
  Zap,
  LayoutDashboard,
  Settings,
  LogOut,
  Wallet,
  CheckCircle,
  Menu,
  X,
  Sun,
  Moon,
  Code2,
  Database,
  Terminal,
  LineChart as ChartIcon
} from 'lucide-react';

export const ICONS = {
  Logo: () => (
    <div className="flex items-center gap-2">
      <div className="relative">
        <BookIcon className="w-8 h-8 text-white" />
        <GraduationCap className="w-5 h-5 text-emerald-400 absolute -top-1 -right-2" />
      </div>
      <span className="text-xl font-bold tracking-tight text-white hidden sm:inline">EduMarket</span>
    </div>
  ),
  Search,
  Heart,
  MessageCircle,
  User,
  FileText,
  BrainCircuit,
  MapPin,
  ShoppingBag,
  Star,
  Zap,
  LayoutDashboard,
  Settings,
  LogOut,
  Wallet,
  CheckCircle,
  Menu,
  X,
  Sun,
  Moon,
  Code2,
  Database,
  Terminal,
  ChartIcon
};

export const KAGGLE_DATASETS = [
  {
    id: 'k1',
    name: 'Titanic - Machine Learning from Disaster',
    description: 'Predict survival on the Titanic and get familiar with ML basics.',
    difficulty: 'Beginner',
    language: 'Python',
    tasks: ['Classification', 'Cleaning'],
    color: 'bg-blue-500'
  },
  {
    id: 'k2',
    name: 'House Prices: Advanced Regression',
    description: 'Predict sales prices and practice feature engineering.',
    difficulty: 'Intermediate',
    language: 'Python',
    tasks: ['Regression', 'XGBoost'],
    color: 'bg-purple-500'
  },
  {
    id: 'k3',
    name: 'Iris Species Dataset',
    description: 'The classic dataset for multi-class classification.',
    difficulty: 'Beginner',
    language: 'Python',
    tasks: ['Classification', 'EDA'],
    color: 'bg-emerald-500'
  }
];


export const MOCK_BOOKS: any[] = [
  {
    id: '1',
    title: 'Advanced Calculus',
    author: 'Morris Kline',
    price: 450,
    condition: 'Good',
    university: 'IIT Bombay',
    location: 'Hostel 4, North Campus',
    image: 'https://picsum.photos/seed/calc/400/500',
    rating: 4.8,
    sellerName: 'Rahul M.'
  },
  {
    id: '2',
    title: 'Organic Chemistry',
    author: 'Jonathan Clayden',
    price: 800,
    condition: 'New',
    university: 'IIT Delhi',
    location: 'Main Gate, Local Pickup',
    image: 'https://picsum.photos/seed/chem/400/500',
    rating: 4.9,
    sellerName: 'Priya K.'
  }
];

export const MOCK_NOTES: any[] = [
  {
    id: 'n1',
    subject: 'Data Structures & Algorithms',
    semester: 'Sem 4',
    university: 'IIT Bombay',
    pages: 120,
    price: 199,
    rating: 4.9,
    isTopperVerified: true,
    topperRank: 'Rank 1',
    aiQualityScore: 98,
    author: 'Priya Sharma',
    authorImage: 'https://picsum.photos/seed/priya/100/100',
    previewImage: 'https://picsum.photos/seed/notes1/400/500'
  }
];
