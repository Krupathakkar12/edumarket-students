
import React, { useState } from 'react';
import { ICONS, KAGGLE_DATASETS } from '../constants';
import { geminiService } from '../services/gemini';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MOCK_RESULTS = [
  { name: 'Survived', value: 342, color: '#10B981' },
  { name: 'Perished', value: 549, color: '#EF4444' }
];

const PythonLab: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState(KAGGLE_DATASETS[0]);
  const [goal, setGoal] = useState('Predict survival probabilities');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [executionState, setExecutionState] = useState<'idle' | 'running' | 'completed'>('idle');

  const handleGenerate = async () => {
    setLoading(true);
    const generated = await geminiService.generatePythonCode(selectedDataset.name, goal);
    setCode(generated);
    setLoading(false);
    setExecutionState('idle');
  };

  const handleRun = () => {
    setExecutionState('running');
    setTimeout(() => {
      setExecutionState('completed');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold dark:text-white flex items-center gap-3">
            <ICONS.Code2 className="text-indigo-600" />
            Python Kaggle Lab
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Master Python by exploring the world's most famous datasets.</p>
        </div>
        <div className="flex gap-2">
           <div className="bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-xl border border-indigo-100 dark:border-indigo-800 flex items-center gap-2">
              <ICONS.Database className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-bold text-indigo-900 dark:text-indigo-300">3,400+ Datasets Available</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Datasets */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="font-bold dark:text-white text-lg px-2">Featured Datasets</h3>
          <div className="space-y-3">
            {KAGGLE_DATASETS.map(ds => (
              <button
                key={ds.id}
                onClick={() => setSelectedDataset(ds)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selectedDataset.id === ds.id 
                  ? 'bg-white dark:bg-gray-800 border-indigo-500 shadow-lg' 
                  : 'bg-gray-50 dark:bg-gray-900 border-transparent hover:border-gray-200'
                }`}
              >
                <div className={`w-8 h-8 ${ds.color} rounded-lg mb-3 flex items-center justify-center`}>
                    <ICONS.Database className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-bold text-sm dark:text-white mb-1">{ds.name}</h4>
                <div className="flex gap-1 flex-wrap">
                    <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 px-1.5 py-0.5 rounded">{ds.difficulty}</span>
                    {ds.tasks.map(t => <span key={t} className="text-[10px] bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">{t}</span>)}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-2xl text-white shadow-xl">
             <h4 className="font-bold mb-2">Want a custom dataset?</h4>
             <p className="text-xs text-indigo-100 mb-4">Paste any Kaggle URL and our AI will fetch the structure for you.</p>
             <div className="relative">
                <input type="text" placeholder="kaggle.com/..." className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-sm focus:outline-none" />
                <button className="absolute right-1 top-1 p-1 bg-white text-indigo-600 rounded">
                    <ICONS.Search className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

        {/* Center/Right: Notebook Environment */}
        <div className="lg:col-span-3 space-y-8">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Analysis Goal</label>
                <input 
                    type="text" 
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    placeholder="e.g. Exploratory Data Analysis"
                />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div> : <ICONS.Zap className="w-4 h-4" />}
              Generate Python
            </button>
          </div>

          {/* Code Area */}
          {code && (
            <div className="animate-in fade-in slide-in-from-top-4">
                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                    <div className="px-4 py-3 bg-gray-800 flex items-center justify-between border-b border-gray-700">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">analysis_script.py</span>
                        <div className="flex items-center gap-4">
                            <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                                <ICONS.CheckCircle className="w-3 h-3" /> Copy
                            </button>
                            <button 
                                onClick={handleRun}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-md flex items-center gap-1 transition-colors"
                            >
                                <ICONS.Terminal className="w-3 h-3" /> RUN
                            </button>
                        </div>
                    </div>
                    <pre className="p-6 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed max-h-[500px]">
                        <code>{code}</code>
                    </pre>
                </div>

                {/* Simulated Output */}
                {executionState !== 'idle' && (
                    <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-indigo-500 shadow-xl animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-8">
                             <div>
                                <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                                    <ICONS.ChartIcon className="text-emerald-500" />
                                    Execution Results
                                </h3>
                                <p className="text-sm text-gray-500">Output from your generated Python script</p>
                             </div>
                             <div className={`px-3 py-1 rounded text-xs font-bold ${executionState === 'running' ? 'bg-yellow-100 text-yellow-700 animate-pulse' : 'bg-emerald-100 text-emerald-700'}`}>
                                {executionState === 'running' ? 'COMPUTING...' : 'COMPLETED'}
                             </div>
                        </div>

                        {executionState === 'running' ? (
                            <div className="h-64 flex flex-col items-center justify-center space-y-4">
                                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent animate-spin rounded-full"></div>
                                <p className="text-gray-500 font-mono text-xs">import pandas as pd...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div className="space-y-4">
                                    <div className="bg-gray-900 p-4 rounded-xl font-mono text-[10px] text-emerald-400 overflow-x-auto">
                                        <p>&gt;&gt;&gt; df.describe()</p>
                                        <p>count: 891.000000</p>
                                        <p>mean:  29.699118</p>
                                        <p>std:   14.526497</p>
                                        <p>&gt;&gt;&gt; Accuracy: 0.824</p>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                                        "The model suggests that Passenger Class and Sex were the most significant predictors of survival."
                                    </p>
                                </div>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={MOCK_RESULTS}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip cursor={{fill: 'transparent'}} />
                                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                                {MOCK_RESULTS.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
          )}

          {!code && !loading && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
                <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center text-indigo-600">
                    <ICONS.Code2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold dark:text-white">Ready to start?</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                    Select a dataset and goal to generate high-quality Python analysis code powered by Gemini AI.
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PythonLab;
