
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { geminiService } from '../services/gemini';

const AITools: React.FC = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [mode, setMode] = useState<'summary' | 'flashcards' | 'questions'>('summary');

  const handleProcess = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      if (mode === 'summary') {
        const res = await geminiService.generateSummary(content);
        setResult(res);
      } else if (mode === 'flashcards') {
        const res = await geminiService.generateFlashcards(content);
        setResult(res);
      } else if (mode === 'questions') {
        const res = await geminiService.generatePracticeQuestions(content);
        setResult(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 dark:text-white">AI Study Ecosystem</h1>
        <p className="text-gray-500 dark:text-gray-400">Boost your productivity with neural network-powered study assistants.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Input */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold mb-4 dark:text-white">Select Tool</h3>
            <div className="space-y-2">
              {[
                { id: 'summary', name: 'Notes Summarizer', icon: ICONS.FileText },
                { id: 'flashcards', name: 'Flashcard Gen', icon: ICONS.BrainCircuit },
                { id: 'questions', name: 'Exam Questioner', icon: ICONS.CheckCircle },
              ].map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setMode(tool.id as any)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    mode === tool.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' 
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <tool.icon className="w-5 h-5" />
                  <span className="font-semibold text-sm">{tool.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
             <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 mb-2">
                <ICONS.Zap className="w-5 h-5" />
                <h4 className="font-bold">Pro Tip</h4>
             </div>
             <p className="text-xs text-emerald-600 dark:text-emerald-300">
                Paste your lecture notes or syllabus to get the most accurate AI-generated materials for your revision.
             </p>
          </div>
        </div>

        {/* Right Column: Input & Output */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500">Input Source</span>
                <button className="text-xs text-indigo-600 font-bold hover:underline">Clear</button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your notes here..."
              className="w-full h-48 p-6 bg-transparent resize-none focus:outline-none dark:text-white"
            />
            <div className="p-4 bg-gray-50 dark:bg-gray-900 flex justify-end gap-3">
              <input type="file" className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium cursor-pointer hover:bg-white dark:hover:bg-gray-800 transition-colors">
                Upload Document
              </label>
              <button 
                onClick={handleProcess}
                disabled={loading || !content}
                className="px-8 py-2 bg-indigo-600 text-white font-bold rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div> : <ICONS.Zap className="w-4 h-4" />}
                Generate {mode}
              </button>
            </div>
          </div>

          {/* Results Area */}
          {(result || loading) && (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-xl font-bold mb-6 dark:text-white flex items-center gap-2">
                <ICONS.CheckCircle className="text-emerald-500" />
                Your Generated {mode}
              </h3>
              
              {loading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                </div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  {mode === 'summary' && (
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                      {result}
                    </div>
                  )}
                  
                  {mode === 'flashcards' && Array.isArray(result) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.map((card: any, idx: number) => (
                        <div key={idx} className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
                          <p className="text-xs font-bold text-indigo-500 uppercase mb-2">Q: {idx + 1}</p>
                          <p className="font-semibold mb-2 dark:text-white">{card.question}</p>
                          <hr className="my-2 border-indigo-100 dark:border-indigo-800" />
                          <p className="text-sm text-gray-600 dark:text-gray-300">{card.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {mode === 'questions' && Array.isArray(result) && (
                    <div className="space-y-6">
                      {result.map((q: any, idx: number) => (
                        <div key={idx} className="space-y-3">
                          <p className="font-bold dark:text-white">{idx + 1}. {q.question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt: string, oIdx: number) => (
                              <div key={oIdx} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:border-indigo-500 cursor-pointer">
                                {opt}
                              </div>
                            ))}
                          </div>
                          <details className="text-xs text-emerald-600 font-bold cursor-pointer">
                            <summary>Show Answer</summary>
                            <div className="mt-2 p-2 bg-emerald-50 dark:bg-emerald-900/30 rounded">Correct: {q.correctAnswer}</div>
                          </details>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex gap-3">
                <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg">Export to PDF</button>
                <button className="px-6 py-2 border border-gray-200 dark:border-gray-700 text-sm font-bold rounded-lg dark:text-white">Save to My Dashboard</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITools;
