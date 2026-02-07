
import React from 'react';
import { ICONS } from '../constants';
import { Phone, Mail, MapPin, MessageSquare, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Have doubts about a book or need help with notes? We're here for you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info Card */}
          <div className="space-y-8">
            {/* Contact Team */}
            <h2 className="text-2xl font-bold dark:text-white">Our Support Team</h2>

            {/* Harshil Sharma */}
            <div className="bg-indigo-900-custom rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                    HS
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Harshil Sharma</h3>
                    <p className="text-indigo-200">Support & Queries</p>
                  </div>
                </div>
                <p className="text-indigo-100 mb-6">For doubts about books, notes, or general inquiries.</p>

                <div className="space-y-4">
                  <a href="tel:6378498638" className="flex items-center gap-4 hover:bg-white/5 p-3 -m-3 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Mobile</p>
                      <p className="text-lg font-bold">+91 63784 98638</p>
                    </div>
                  </a>

                  <a href="mailto:sharshilsharma294@gmail.com" className="flex items-center gap-4 hover:bg-white/5 p-3 -m-3 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Email</p>
                      <p className="text-sm font-bold break-all">sharshilsharma294@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
            </div>

            {/* Krupa Thakkar */}
            <div className="bg-purple-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                    KT
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Krupa Thakkar</h3>
                    <p className="text-purple-100">Technical Support</p>
                  </div>
                </div>
                <p className="text-purple-100 mb-6">For technical issues, verification, and payment queries.</p>

                <div className="space-y-4">
                  <a href="tel:9512262984" className="flex items-center gap-4 hover:bg-white/5 p-3 -m-3 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-200 font-bold uppercase tracking-wider">Mobile</p>
                      <p className="text-lg font-bold">+91 95122 62984</p>
                    </div>
                  </a>

                  <a href="mailto:Krupathakkar1210@gmail.com" className="flex items-center gap-4 hover:bg-white/5 p-3 -m-3 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-200 font-bold uppercase tracking-wider">Email</p>
                      <p className="text-sm font-bold break-all">Krupathakkar1210@gmail.com</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <Clock className="w-6 h-6 text-indigo-600 mb-3" />
                <h4 className="font-bold dark:text-white">Response Time</h4>
                <p className="text-sm text-gray-500">Under 2 hours</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <MessageSquare className="w-6 h-6 text-indigo-600 mb-3" />
                <h4 className="font-bold dark:text-white">Availability</h4>
                <p className="text-sm text-gray-500">10 AM - 8 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Send a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">First Name</label>
                  <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Last Name</label>
                  <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Email Address</label>
                <input type="email" className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="john@university.edu" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Subject</label>
                <select className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 dark:text-white">
                  <option>Buying Inquiry</option>
                  <option>Selling Inquiry</option>
                  <option>Topper Verification</option>
                  <option>Technical Issue</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Message</label>
                <textarea rows={4} className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 dark:text-white" placeholder="How can we help you today?"></textarea>
              </div>
              <button className="w-full py-4 bg-indigo-900-custom text-white font-bold rounded-xl hover:bg-indigo-800 transition-colors shadow-lg">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
