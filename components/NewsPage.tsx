import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { Calendar, AlertTriangle, ExternalLink, X, FileText, Globe } from 'lucide-react';

interface NewsPageProps {
  news: NewsItem[];
}

export const NewsPage: React.FC<NewsPageProps> = ({ news }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Lock body scroll when modal is open to prevent background scrolling
  useEffect(() => {
    if (selectedNews) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedNews]);

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-fade-in pt-6 relative pb-24">
      <div className="mb-10 border-b border-neutral-800 pb-8">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Tech Intelligence</h2>
        <p className="text-neutral-400">
          Breaking updates on AI security, API protocols, and data breaches.
        </p>
      </div>

      <div className="space-y-4">
        {news.map((item, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedNews(item)}
            className="pro-card p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start border border-white/5 hover:border-white/10 group cursor-pointer relative"
          >
            
            {/* Date/Source Column */}
            <div className="md:w-48 flex-shrink-0 flex flex-col gap-2">
              <span className="flex items-center text-xs text-neutral-500 font-medium">
                <Calendar size={12} className="mr-2" /> {item.date}
              </span>
              <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                {item.source || 'Tech Wire'}
              </span>
              <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md w-fit border ${
                item.severity === 'Critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                item.severity === 'High' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                'bg-blue-500/10 border-blue-500/20 text-blue-400'
              }`}>
                <AlertTriangle size={10} />
                <span className="text-[10px] font-bold uppercase">{item.severity} Impact</span>
              </div>
            </div>

            {/* Content Column */}
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed max-w-3xl line-clamp-2 md:line-clamp-none">
                {item.summary}
              </p>
            </div>

            {/* Action */}
            <div className="md:w-32 flex-shrink-0 flex items-center justify-end gap-3">
               {/* Quick Link Button */}
               <button 
                 onClick={(e) => handleLinkClick(e, item.url)}
                 className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                 title="Open Source Link Directly"
               >
                 <ExternalLink size={18} />
               </button>
               <button className="hidden md:block text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity underline decoration-neutral-700 underline-offset-4 hover:decoration-white">
                 Read Brief
               </button>
            </div>

          </div>
        ))}
      </div>

      {/* Detail Modal - Mobile Optimized */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          {/* Click outside to close */}
          <div className="absolute inset-0" onClick={() => setSelectedNews(null)}></div>
          
          <div 
            className="pro-card w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col relative shadow-2xl shadow-black border-t sm:border border-white/10 rounded-t-2xl sm:rounded-2xl overflow-hidden bg-[#1c1c1e]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header with Exit Symbol */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-white/5 bg-[#1c1c1e] z-10 shrink-0">
               <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${
                    selectedNews.severity === 'Critical' ? 'bg-red-500' :
                    selectedNews.severity === 'High' ? 'bg-orange-500' :
                    'bg-blue-500'
                 }`} />
                 Briefing
               </span>
               <button 
                  onClick={() => setSelectedNews(null)}
                  className="p-2 -mr-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Exit"
                >
                  <X size={24} />
                </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${
                  selectedNews.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                  selectedNews.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  <FileText size={24} />
                </div>
                <div>
                  <span className="block text-xs text-neutral-500 font-bold uppercase tracking-wider">
                    {selectedNews.source || 'Intelligence Brief'}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mt-1">
                    {selectedNews.title}
                  </h3>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-neutral-400 border-b border-white/5 pb-4">
                  <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
                    <Calendar size={14}/> {selectedNews.date}
                  </span>
                  <span className={`flex items-center gap-2 font-semibold px-3 py-1 rounded-full ${
                     selectedNews.severity === 'Critical' ? 'bg-red-500/10 text-red-400' :
                     selectedNews.severity === 'High' ? 'bg-orange-500/10 text-orange-400' :
                     'bg-blue-500/10 text-blue-400'
                  }`}>
                    <AlertTriangle size={14}/> {selectedNews.severity} Priority
                  </span>
                </div>
                
                <p className="text-base md:text-lg text-neutral-300 leading-relaxed whitespace-pre-line">
                  {selectedNews.detailedContent || selectedNews.summary}
                </p>
              </div>
            </div>

            {/* Fixed Footer with Source Link */}
            <div className="p-4 md:p-6 border-t border-white/5 bg-[#1c1c1e] shrink-0 pb-8 sm:pb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href={selectedNews.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-neutral-200 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Globe size={18} /> Visit {selectedNews.source || "Source"}
                </a>
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="flex-1 bg-neutral-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-neutral-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};