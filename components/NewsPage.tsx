import React, { useState } from 'react';
import { NewsItem } from '../types';
import { Calendar, AlertTriangle, ExternalLink, X, FileText, Globe } from 'lucide-react';

interface NewsPageProps {
  news: NewsItem[];
}

export const NewsPage: React.FC<NewsPageProps> = ({ news }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <div className="animate-fade-in pt-6 relative">
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
            className="pro-card p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start border border-white/5 hover:border-white/10 group cursor-pointer"
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
              <p className="text-neutral-400 leading-relaxed max-w-3xl">
                {item.summary}
              </p>
            </div>

            {/* Action */}
            <div className="md:w-32 flex-shrink-0 flex items-center justify-end">
               <button className="text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity underline decoration-neutral-700 underline-offset-4 hover:decoration-white">
                 Read Full Report
               </button>
            </div>

          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div 
            className="pro-card max-w-2xl w-full p-8 relative shadow-2xl shadow-black border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedNews.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                selectedNews.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                <FileText size={24} />
              </div>
              <div>
                <span className="block text-xs text-neutral-500 font-bold uppercase tracking-wider">{selectedNews.source || 'Intelligence Brief'}</span>
                <h3 className="text-2xl font-bold text-white leading-tight">{selectedNews.title}</h3>
              </div>
            </div>

            <div className="prose prose-invert max-w-none mb-8">
              <div className="flex gap-4 mb-6 text-sm text-neutral-400 border-b border-white/5 pb-4">
                <span className="flex items-center gap-2"><Calendar size={14}/> {selectedNews.date}</span>
                <span className={`flex items-center gap-2 font-semibold ${
                   selectedNews.severity === 'Critical' ? 'text-red-400' :
                   selectedNews.severity === 'High' ? 'text-orange-400' :
                   'text-blue-400'
                }`}>
                  <AlertTriangle size={14}/> {selectedNews.severity} Priority
                </span>
              </div>
              
              <p className="text-lg text-neutral-300 leading-relaxed">
                {selectedNews.detailedContent || selectedNews.summary}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={selectedNews.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-neutral-200 transition-colors text-center flex items-center justify-center gap-2"
              >
                <Globe size={16} /> Visit Source
              </a>
              <button 
                onClick={() => setSelectedNews(null)}
                className="flex-1 bg-neutral-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-neutral-700 transition-colors"
              >
                Close Briefing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};