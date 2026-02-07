
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Send, Search } from 'lucide-react';
import { authService } from '../services/auth';

const Messages: React.FC = () => {
    const navigate = useNavigate();
    const currentUser = authService.getCurrentUser();
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [messageText, setMessageText] = useState('');

    React.useEffect(() => {
        if (!currentUser) {
            navigate('/signin');
        }
    }, [currentUser, navigate]);

    if (!currentUser) return null;

    // Mock conversations
    const conversations = [
        { id: 1, name: 'John Doe', lastMessage: 'Is the book still available?', time: '2h ago', unread: 2 },
        { id: 2, name: 'Sarah Smith', lastMessage: 'Thanks for the quick response!', time: '1d ago', unread: 0 },
        { id: 3, name: 'Mike Johnson', lastMessage: 'When can we meet?', time: '2d ago', unread: 1 },
    ];

    const messages = selectedChat ? [
        { id: 1, sender: 'John Doe', text: 'Hi! Is the Data Structures book still available?', time: '2:30 PM', isMine: false },
        { id: 2, sender: 'You', text: 'Yes, it is! Are you interested?', time: '2:35 PM', isMine: true },
        { id: 3, sender: 'John Doe', text: 'Great! Can we meet tomorrow?', time: '2:40 PM', isMine: false },
    ] : [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold dark:text-white mb-6">Messages</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                    {/* Conversations List */}
                    <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto h-[500px]">
                            {conversations.map((conv) => (
                                <button
                                    key={conv.id}
                                    onClick={() => setSelectedChat(conv.id)}
                                    className={`w-full p-4 text-left border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors ${selectedChat === conv.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{conv.name}</h3>
                                        <span className="text-xs text-gray-500">{conv.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{conv.lastMessage}</p>
                                        {conv.unread > 0 && (
                                            <span className="ml-2 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                                                {conv.unread}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col">
                        {selectedChat ? (
                            <>
                                {/* Chat Header */}
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="font-semibold text-gray-900 dark:text-white">
                                        {conversations.find(c => c.id === selectedChat)?.name}
                                    </h2>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[70%] rounded-lg px-4 py-2 ${msg.isMine
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.text}</p>
                                                <p
                                                    className={`text-xs mt-1 ${msg.isMine ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'
                                                        }`}
                                                >
                                                    {msg.time}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            placeholder="Type a message..."
                                            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:text-white"
                                        />
                                        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2">
                                            <Send className="w-4 h-4" />
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                <div className="text-center">
                                    <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>Select a conversation to start messaging</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
