
import React from 'react';
import { ICONS } from '../constants';
import { Book, Note } from '../types';

export const Badge: React.FC<{ children: React.ReactNode, variant?: 'primary' | 'secondary' | 'accent' | 'outline' }> = ({ children, variant = 'primary' }) => {
  const styles = {
    primary: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    secondary: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    accent: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    outline: 'border border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400'
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[variant]}`}>
      {children}
    </span>
  );
};

export const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge variant={book.condition === 'New' ? 'secondary' : 'primary'}>{book.condition}</Badge>
        </div>
        <div className="absolute bottom-2 right-2">
            <button className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm text-gray-600 hover:text-red-500 transition-colors">
                <ICONS.Heart className="w-4 h-4" />
            </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{book.author}</p>
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
          <ICONS.MapPin className="w-3 h-3" />
          <span className="line-clamp-1">{book.location}</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-indigo-900-custom dark:text-indigo-300">₹{book.price}</span>
          <button className="px-3 py-1.5 bg-indigo-900-custom text-white text-xs font-medium rounded-lg hover:bg-indigo-800 transition-colors">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group">
      <div className="relative aspect-video overflow-hidden">
        <img src={note.previewImage} alt={note.subject} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 blur-[2px]" />
        {note.isTopperVerified && (
          <div className="absolute top-2 left-2">
            <Badge variant="accent">⭐ Verified Topper</Badge>
          </div>
        )}
        <div className="absolute top-2 right-2">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-emerald-600 border border-emerald-500">
                AI Quality: {note.aiQualityScore}%
            </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
            <button className="px-4 py-2 bg-white text-indigo-900 text-sm font-semibold rounded-lg">Preview Notes</button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
            <img src={note.authorImage} className="w-6 h-6 rounded-full" alt={note.author} />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{note.author}</span>
            {note.topperRank && <span className="text-[10px] text-orange-500 font-bold ml-auto">{note.topperRank}</span>}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1">{note.subject}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{note.university} • {note.pages} Pages</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">₹{note.price}</span>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 hover:text-indigo-600">
                <ICONS.Heart className="w-4 h-4" />
            </button>
            <button className="px-4 py-1.5 bg-emerald-500-custom text-white text-xs font-medium rounded-lg hover:bg-emerald-600">
                Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
