
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, MapPin, Phone, Mail, X } from 'lucide-react';
import { marketplaceService, BookListing } from '../services/marketplace';
import { paymentService } from '../services/payment';
import { authService } from '../services/auth';

const BookCard: React.FC<{ book: BookListing; onBuyClick: (book: BookListing) => void }> = ({ book, onBuyClick }) => {
    const getConditionColor = (condition: string) => {
        switch (condition) {
            case 'New': return 'bg-green-100 text-green-800';
            case 'Like New': return 'bg-blue-100 text-blue-800';
            case 'Good': return 'bg-yellow-100 text-yellow-800';
            case 'Fair': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
            {/* Image */}
            <div className="relative h-48 bg-gray-200">
                <img
                    src={book.images[0] || '/placeholder-book.png'}
                    alt={book.title}
                    className="w-full h-full object-cover"
                />
                <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(book.condition)}`}>
                    {book.condition}
                </span>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {book.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                    {book.subject}
                </p>

                {/* Seller Info */}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3 pb-3 border-b border-gray-100 dark:border-gray-700">
                    <MapPin className="w-3 h-3" />
                    <span>Sold by {book.sellerName}</span>
                </div>

                {/* Price & Buy Button */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {paymentService.formatPrice(book.price)}
                        </span>
                    </div>
                    <button
                        onClick={() => onBuyClick(book)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-sm"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const BuyModal: React.FC<{ book: BookListing; onClose: () => void }> = ({ book, onClose }) => {
    const handleBuyNow = () => {
        if (book.sellerUPI) {
            paymentService.openUPIPayment(book.sellerUPI, book.price, book.title);
        } else {
            alert('Seller has not provided UPI payment information. Please contact seller directly.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Confirm Purchase</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Book Details */}
                    <div className="flex gap-4">
                        <img
                            src={book.images[0]}
                            alt={book.title}
                            className="w-32 h-40 object-cover rounded-lg"
                        />
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{book.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
                            <p className="text-xs text-indigo-600 font-medium mb-2">{book.subject}</p>
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {book.condition}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    {book.description && (
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{book.description}</p>
                        </div>
                    )}

                    {/* Seller Info */}
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Seller Information</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <span className="font-medium">Name:</span>
                                <span>{book.sellerName}</span>
                            </div>
                            {book.sellerEmail && (
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <Mail className="w-4 h-4" />
                                    <span>{book.sellerEmail}</span>
                                </div>
                            )}
                            {book.sellerPhone && (
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                    <Phone className="w-4 h-4" />
                                    <span>{book.sellerPhone}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300 font-medium">Total Amount:</span>
                            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                {paymentService.formatPrice(book.price)}
                            </span>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">💳 How Payment Works</h4>
                        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                            <li>• Click "Pay with UPI" below</li>
                            <li>• Your UPI app will open automatically (PhonePe, Google Pay, Paytm, etc.)</li>
                            <li>• Complete the payment in your app</li>
                            <li>• Seller will contact you for book delivery</li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        {book.sellerUPI ? '💰 Pay with UPI' : '📞 Contact Seller'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const Books: React.FC = () => {
    const [listings, setListings] = useState<BookListing[]>([]);
    const [filteredListings, setFilteredListings] = useState<BookListing[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBook, setSelectedBook] = useState<BookListing | null>(null);
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        loadListings();
    }, []);

    const loadListings = () => {
        const allListings = marketplaceService.getAllListings();
        setListings(allListings);
        setFilteredListings(allListings);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setFilteredListings(listings);
        } else {
            const results = marketplaceService.searchListings(query);
            setFilteredListings(results);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white mb-2">Book Marketplace</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {filteredListings.length} book{filteredListings.length !== 1 ? 's' : ''} available
                    </p>
                </div>
                {currentUser && (
                    <Link
                        to="/sell-book"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Sell Your Book
                    </Link>
                )}
            </div>

            {/* Search */}
            <div className="mb-8">
                <div className="relative max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search by title, author, subject..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredListings.map(book => (
                        <BookCard key={book.id} book={book} onBuyClick={setSelectedBook} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {searchQuery ? 'No books found' : 'No books available yet'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {searchQuery
                            ? 'Try a different search term'
                            : 'Be the first to list a book!'}
                    </p>
                    {currentUser && !searchQuery && (
                        <Link
                            to="/sell-book"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            List Your First Book
                        </Link>
                    )}
                </div>
            )}

            {/* Buy Modal */}
            {selectedBook && (
                <BuyModal book={selectedBook} onClose={() => setSelectedBook(null)} />
            )}
        </div>
    );
};

export default Books;
