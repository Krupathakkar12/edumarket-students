
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { Book, Note } from '../types';
import { Star, X, Zap, CheckCircle } from 'lucide-react';
import { paymentService } from '../services/payment';

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
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | null>(null);

  const handleBuy = () => {
    setShowBuyModal(true);
  };

  const handlePayment = () => {
    if (paymentMethod === 'upi') {
      paymentService.initiateUPIPayment(note.price, note.subject);
      setShowBuyModal(false);
    }
  };

  return (
    <>
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
            <button
              onClick={handleBuy}
              className="px-4 py-2 bg-white text-indigo-900 text-sm font-semibold rounded-lg hover:bg-indigo-50"
            >
              Preview Notes
            </button>
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
              <button
                onClick={handleBuy}
                className="px-4 py-1.5 bg-emerald-500-custom text-white text-xs font-medium rounded-lg hover:bg-emerald-600"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBuyModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold dark:text-white">Purchase Notes</h3>
              <button onClick={() => setShowBuyModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <img src={note.previewImage} alt={note.subject} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h4 className="text-lg font-bold dark:text-white mb-2">{note.subject}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{note.pages} pages</span>
                <span>{note.university}</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {note.rating}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3 dark:text-white">Payment Method</label>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`w-full p-4 rounded-xl border-2 transition-all ${paymentMethod === 'upi'
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold dark:text-white">UPI Payment</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PhonePe, GPay, Paytm</p>
                    </div>
                  </div>
                  {paymentMethod === 'upi' && <CheckCircle className="w-5 h-5 text-indigo-600" />}
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <span className="font-semibold dark:text-white">Total Amount</span>
              <span className="text-2xl font-bold text-indigo-600">₹{note.price}</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={!paymentMethod}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Pay ₹{note.price}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
