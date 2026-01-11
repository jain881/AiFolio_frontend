import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Users, Activity, Clock, 
  RefreshCcw, Trash2, ArrowRight,
  Layout, Search, Filter, AlertTriangle
} from 'lucide-react';

export default function AdminPanel() {
  const [deployments, setDeployments] = useState([
    { id: '1', name: 'Alex Chen', template: 'Nexu 3D', daysLeft: 12, status: 'Active', price: '$36.00' },
    { id: '2', name: 'Sarah Miller', template: 'Arcade Rush', daysLeft: 2, status: 'Warning', price: '$21.00' },
    { id: '3', name: 'James Wilson', template: 'Terminal', daysLeft: 0, status: 'Expired', price: '$0.00' },
  ]);

  const handleRenew = (id) => {
    setDeployments(prev => prev.map(d => 
      d.id === id ? { ...d, daysLeft: d.daysLeft + 30, status: 'Active' } : d
    ));
    alert('Deployment renewed for 30 days');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this portfolio from online?')) {
      setDeployments(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
              <Shield className="text-purple-500 w-10 h-10" /> 
              SYSTEM_ADMIN <span className="text-slate-500 font-normal">v1.2</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium">Managing deployment cycles and license rotations.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex items-center gap-6">
                <div className="text-center">
                    <p className="text-xs font-bold text-slate-500 uppercase">Active</p>
                    <p className="text-2xl font-black">24</p>
                </div>
                <div className="w-px h-8 bg-slate-700" />
                <div className="text-center">
                    <p className="text-xs font-bold text-slate-500 uppercase">Revant</p>
                    <p className="text-2xl font-black text-purple-500">$1,240</p>
                </div>
            </div>
          </div>
        </header>

        {/* Search & Actions */}
        <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input 
                    type="text" 
                    placeholder="Search by user or template..." 
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-xl py-4 pl-12 pr-4 focus:border-purple-500 outline-none transition-all font-bold"
                />
            </div>
            <button className="bg-slate-800 border-2 border-slate-700 px-6 rounded-xl flex items-center gap-2 font-bold hover:bg-slate-700 transition-colors">
                <Filter className="w-5 h-5" /> Filter
            </button>
        </div>

        {/* Deployment Table */}
        <div className="bg-slate-800/50 rounded-[2.5rem] border border-slate-700 overflow-hidden backdrop-blur-xl">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-700 bg-slate-800/50">
                        <th className="p-6 text-xs font-black text-slate-500 uppercase">Deployment Target</th>
                        <th className="p-6 text-xs font-black text-slate-500 uppercase">Template</th>
                        <th className="p-6 text-xs font-black text-slate-500 uppercase">Lifecycle Status</th>
                        <th className="p-6 text-xs font-black text-slate-500 uppercase">Revenue</th>
                        <th className="p-6 text-xs font-black text-slate-500 uppercase">Action Protocol</th>
                    </tr>
                </thead>
                <tbody>
                    {deployments.map((d) => (
                        <tr key={d.id} className="border-b border-slate-700/50 hover:bg-white/5 transition-colors">
                            <td className="p-6 font-black text-xl">{d.name}</td>
                            <td className="p-6">
                                <span className="bg-slate-700 px-3 py-1 rounded-lg text-xs font-black text-slate-300 uppercase tracking-widest">{d.template}</span>
                            </td>
                            <td className="p-6">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${
                                        d.status === 'Active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 
                                        d.status === 'Warning' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
                                    }`} />
                                    <div>
                                        <p className="font-black text-sm uppercase">{d.status}</p>
                                        <p className="text-xs font-bold text-slate-500 italic">{d.daysLeft} days remaining</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-6 font-black text-slate-400">{d.price}</td>
                            <td className="p-6">
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => handleRenew(d.id)}
                                        className="bg-purple-600/20 text-purple-400 p-3 rounded-xl border border-purple-500/20 hover:bg-purple-600 hover:text-white transition-all group"
                                        title="Renew Deployment"
                                    >
                                        <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(d.id)}
                                        className="bg-red-600/20 text-red-400 p-3 rounded-xl border border-red-500/20 hover:bg-red-600 hover:text-white transition-all"
                                        title="Terminate Link"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Footer Warning */}
        <div className="mt-8 flex items-center gap-4 bg-red-500/10 border border-red-500/20 p-6 rounded-3xl">
            <AlertTriangle className="text-red-500 w-8 h-8 flex-shrink-0" />
            <p className="text-xs font-bold text-red-200 uppercase leading-relaxed">
                CRITICAL_NOTICE: PORTFOLIOS WITH 0 DAYS REMAINING ARE AUTOMATICALLY DISCONNECTED FROM THE GLOBAL NETWORK. RENEWAL MUST BE AUTHORIZED MANUALLY VIA THE ACTION PROTOCOLS ABOVE.
            </p>
        </div>
      </div>
    </div>
  );
}
