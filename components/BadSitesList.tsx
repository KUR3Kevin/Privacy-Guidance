import React, { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle2, X, ShieldCheck } from 'lucide-react';
import { BadSite } from '../types';

interface BadSitesListProps {
  sites: BadSite[];
  loading: boolean;
}

export const BadSitesList: React.FC<BadSitesListProps> = ({ sites, loading }) => {
  const [selectedSite, setSelectedSite] = useState<BadSite | null>(null);

  return (
    <>
      <div className="flex flex-col h-full animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white tracking-tight">Essentials</h3>
          <span className="text-xs text-neutral-400">Recommended Actions</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
             [1, 2, 3, 4].map((i) => (
               <div key={i} className="pro-card h-28 animate-pulse bg-neutral-800"></div>
             ))
          ) : (
            sites.map((site, index) => (
              <div key={index} className="pro-card p-5 group relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* The "Bad" Side */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-500/10 text-red-400 p-1 rounded-md">
                        <AlertCircle size={16} />
                      </span>
                      <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Stop Using</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">{site.name}</h4>
                    <p className="text-sm text-neutral-400 leading-snug">{site.reason}</p>
                  </div>

                  {/* Arrow Divider */}
                  <div className="hidden md:flex items-center justify-center px-4 opacity-20">
                    <ArrowRight size={24} />
                  </div>

                  {/* The "Good" Side */}
                  <div className="flex-1 md:text-right">
                    <div className="flex items-center gap-2 mb-1 md:justify-end">
                       <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Start Using</span>
                       <span className="bg-green-500/10 text-green-400 p-1 rounded-md">
                        <CheckCircle2 size={16} />
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-1">{site.alternative}</h4>
                    <button 
                      onClick={() => setSelectedSite(site)}
                      className="text-xs text-blue-400 hover:text-blue-300 hover:underline cursor-pointer outline-none focus:text-blue-300"
                    >
                      Why is this better?
                    </button>
                  </div>

                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/5 rounded-2xl pointer-events-none transition-colors"></div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal / Popup */}
      {selectedSite && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div 
            className="pro-card max-w-md w-full p-6 relative shadow-2xl shadow-black border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedSite(null)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <span className="block text-xs text-neutral-500 font-bold uppercase tracking-wider">Upgrade Recommendation</span>
                <h3 className="text-xl font-bold text-white">Why {selectedSite.alternative}?</h3>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-neutral-300 leading-relaxed text-sm">
                {selectedSite.detailedExplanation || `Switching to ${selectedSite.alternative} significantly reduces your digital footprint compared to using ${selectedSite.name}.`}
              </p>
              
              <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-1">
                  <X size={12} className="text-red-500" /> Removed:
                </div>
                <p className="text-sm text-neutral-500 line-through decoration-red-500/50">
                   {selectedSite.reason}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setSelectedSite(null)}
              className="w-full mt-8 bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-neutral-200 transition-colors text-sm"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};