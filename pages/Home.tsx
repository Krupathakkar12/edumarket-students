
import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS, MOCK_BOOKS, MOCK_NOTES } from '../constants';
import { BookCard, NoteCard, Badge } from '../components/Shared';

const FeatureCard: React.FC<{ icon: any, title: string, description: string, color: string }> = ({ icon: Icon, title, description, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-bold mb-2 dark:text-white">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
  </div>
);

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Banner */}
      <section className="relative bg-indigo-900-custom pt-20 pb-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Buy, Sell & Learn — <br />
                <span className="text-emerald-400">From Students, For Students</span>
              </h1>
              <p className="text-lg text-indigo-100 font-medium">
                Old books • Verified topper notes • AI-powered study tools. Join the most trusted student ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/notes" className="px-8 py-4 bg-emerald-500-custom hover:bg-emerald-600 text-white font-bold rounded-full transition-all flex items-center gap-2">
                  <ICONS.FileText className="w-5 h-5" />
                  Browse Notes
                </Link>
                <Link to="/sell" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur transition-all flex items-center gap-2">
                  <ICONS.ShoppingBag className="w-5 h-5" />
                  Sell Your Books
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i}/40/40`} className="w-10 h-10 rounded-full border-2 border-indigo-900" alt="Student" />
                  ))}
                </div>
                <p className="text-sm font-medium text-indigo-200">
                  <span className="text-white font-bold">10k+</span> students already joined
                </p>
              </div>
            </div>
            <div className="hidden lg:block relative">
                <div className="relative z-20 animate-bounce-slow">
                    <img 
                        src="https://picsum.photos/seed/student/600/600" 
                        alt="Student illustration" 
                        className="rounded-3xl shadow-2xl border-4 border-white/10 transform rotate-3"
                    />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={ICONS.ShoppingBag} 
            title="Buy & Sell Old Books" 
            description="Give your books a second life and save up to 70%."
            color="bg-blue-500"
          />
          <FeatureCard 
            icon={ICONS.FileText} 
            title="Monetize Your Notes" 
            description="Upload your high-quality notes and earn passive income."
            color="bg-emerald-500"
          />
          <FeatureCard 
            icon={ICONS.BrainCircuit} 
            title="AI Study Tools" 
            description="Generate flashcards and summaries instantly using AI."
            color="bg-purple-500"
          />
          <FeatureCard 
            icon={ICONS.Star} 
            title="Learn from Toppers" 
            description="Get access to exclusive content from university rankers."
            color="bg-orange-500"
          />
        </div>
      </section>

      {/* Topper-Verified Notes */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold dark:text-white">Topper-Verified Notes ⭐</h2>
            <p className="text-gray-500 dark:text-gray-400">Hand-picked excellence for your grades</p>
          </div>
          <Link to="/toppers" className="text-indigo-600 font-semibold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_NOTES.map(note => <NoteCard key={note.id} note={note} />)}
          {/* Add more clones for demo */}
          {MOCK_NOTES.map(note => <NoteCard key={note.id + 'alt'} note={{...note, id: note.id + 'alt'}} />)}
        </div>
      </section>

      {/* Campus Marketplace */}
      <section className="bg-gray-100 dark:bg-gray-800/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-bold dark:text-white">Campus Marketplace</h2>
              <div className="flex items-center gap-2 text-emerald-600 font-medium mt-1">
                <ICONS.MapPin className="w-5 h-5" />
                <span>Available in your campus: <span className="underline cursor-pointer">Stanford University</span></span>
              </div>
            </div>
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium">Pickup Only</button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium">Books</button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium">Notes</button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_BOOKS.map(book => <BookCard key={book.id} book={book} />)}
            <div className="bg-indigo-600 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-white space-y-4">
                <ICONS.MapPin className="w-12 h-12 text-emerald-400" />
                <h3 className="text-xl font-bold">See everything near you?</h3>
                <p className="text-sm text-indigo-100">Browse 250+ more items available at your university.</p>
                <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl">Open Campus Map</button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-16 dark:text-white">How EduMarket Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
            {[
                { title: 'Upload', desc: 'Books or notes', icon: ICONS.ShoppingBag },
                { title: 'AI Enhance', desc: 'Quality checked', icon: ICONS.BrainCircuit },
                { title: 'Purchase', desc: 'Secure payments', icon: ICONS.CheckCircle },
                { title: 'Escrow', desc: 'Funds held safely', icon: ICONS.Wallet },
                { title: 'Earn', desc: 'Get paid instantly', icon: ICONS.Zap },
            ].map((step, idx) => (
                <div key={idx} className="relative group">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                        <step.icon className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="font-bold mb-1 dark:text-white">{step.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                    {idx < 4 && <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gray-200 dark:bg-gray-700"></div>}
                </div>
            ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4">
          <div className="bg-emerald-500 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                      <h2 className="text-4xl font-bold mb-6">Loved by thousands of students</h2>
                      <div className="space-y-6">
                          <div className="bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/20">
                              <p className="italic mb-4">"EduMarket changed my final year. I made over ₹15,000 just selling my handwritten notes! Plus, the AI summary tool saved my life during exams."</p>
                              <div className="flex items-center gap-3">
                                  <img src="https://picsum.photos/seed/stu1/48/48" className="rounded-full" alt="Reviewer" />
                                  <div>
                                      <p className="font-bold">Rahul Verma</p>
                                      <p className="text-xs text-emerald-100">IIT Bombay • Final Year</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center space-y-6">
                      <div className="text-6xl font-black">4.9/5</div>
                      <div className="flex gap-1">
                          {[1,2,3,4,5].map(i => <ICONS.Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <p className="text-xl font-medium">Average Student Rating</p>
                      <button className="px-10 py-4 bg-white text-emerald-600 font-bold rounded-full shadow-xl hover:scale-105 transition-transform">Start Your Journey</button>
                  </div>
              </div>
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>
      </section>
    </div>
  );
};

export default Home;
