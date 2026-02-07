
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import { authService } from '../services/auth';
import { marketplaceService } from '../services/marketplace';

const SellBook: React.FC = () => {
    const navigate = useNavigate();
    const currentUser = authService.getCurrentUser();

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        subject: '',
        condition: 'Good' as 'New' | 'Like New' | 'Good' | 'Fair',
        price: '',
        description: '',
        phone: '',
        upiId: ''
    });

    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (!currentUser) {
            navigate('/signin');
        }
    }, [currentUser, navigate]);

    if (!currentUser) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        if (images.length + files.length > 3) {
            setError('Maximum 3 images allowed');
            return;
        }

        Array.from(files).forEach((file: File) => {
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setImages(prev => [...prev, event.target!.result as string]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validation
        if (!formData.title || !formData.author || !formData.subject || !formData.price) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        if (images.length === 0) {
            setError('Please upload at least one image');
            setLoading(false);
            return;
        }

        const price = parseFloat(formData.price);
        if (isNaN(price) || price <= 0) {
            setError('Please enter a valid price');
            setLoading(false);
            return;
        }

        // Create listing
        const result = marketplaceService.createListing({
            sellerId: currentUser.id,
            sellerName: currentUser.name,
            sellerEmail: currentUser.email,
            sellerPhone: formData.phone,
            sellerUPI: formData.upiId,
            title: formData.title,
            author: formData.author,
            subject: formData.subject,
            condition: formData.condition,
            price: price,
            description: formData.description,
            images: images
        });

        if (result.success) {
            navigate('/books');
        } else {
            setError(result.error || 'Failed to create listing');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Book</h1>
                    <p className="text-gray-600">List your book and earn money from fellow students</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Book Images <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {images.map((img, index) => (
                                <div key={index} className="relative group">
                                    <img src={img} alt={`Book ${index + 1}`} className="w-full h-32 object-cover rounded-lg border-2 border-gray-200" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {images.length < 3 && (
                            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">Click to upload ({3 - images.length} remaining)</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    multiple
                                />
                            </label>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Book Title */}
                        <div className="md:col-span-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Book Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g., Data Structures and Algorithms"
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                                Author <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g., Thomas H. Cormen"
                            />
                        </div>

                        {/* Subject */}
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                Subject/Category <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g., Computer Science"
                            />
                        </div>

                        {/* Condition */}
                        <div>
                            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                                Condition <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="condition"
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="New">New</option>
                                <option value="Like New">Like New</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                Price (₹) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="299"
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Tell buyers about the book's condition, any highlights, etc."
                        />
                    </div>

                    {/* Contact Info */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-4">Contact & Payment Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div>
                                <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-2">
                                    UPI ID (for payments)
                                </label>
                                <input
                                    type="text"
                                    id="upiId"
                                    name="upiId"
                                    value={formData.upiId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="yourname@paytm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/books')}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Publish Listing
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellBook;
