import React from 'react';
import { ChevronRight } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsFeedProps {
  news: NewsItem[];
  loading: boolean;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ news, loading }) => {
  return (
    <div className="flex flex-col h-full animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white tracking-tight">Intelligence</h3>
        <span className="text-xs text-neutral-400">Real-time Updates</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {loading ? (
           [1, 2, 3, 4].map((i) => (
             <div key={i} className="pro-card h-40 animate-pulse bg-neutral-800"></div>
           ))
        ) : (
          news.map((item, index) => (
            <div key={index} className="pro-card p-6 flex flex-col justify-between group cursor-pointer border border-white/5 hover:border-white/10">
              
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium text-neutral-500">{item.date}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    item.severity === 'Critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' :
                    item.severity === 'High' ? 'bg-orange-500' :
                    item.severity === 'Medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                </div>
                
                <h4 className="text-base font-semibold text-gray-100 mb-2 leading-snug group-hover:text-white transition-colors">
                  {item.title}
                </h4>
                
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 flex items-center text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                Read Full Brief <ChevronRight size={12} className="ml-1" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};