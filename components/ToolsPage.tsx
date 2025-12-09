import React from 'react';
import { Tool } from '../types';
import { Shield, Globe, Lock, Flame, MessageCircle, Search, Download, Activity, Key } from 'lucide-react';

interface ToolsPageProps {
  tools: Tool[];
}

const IconMap: Record<string, React.ReactNode> = {
  'Shield': <Shield size={24} />,
  'Globe': <Globe size={24} />,
  'Lock': <Lock size={24} />,
  'Flame': <Flame size={24} />,
  'MessageCircle': <MessageCircle size={24} />,
  'Search': <Search size={24} />,
  'Activity': <Activity size={24} />,
  'Key': <Key size={24} />,
};

export const ToolsPage: React.FC<ToolsPageProps> = ({ tools }) => {
  return (
    <div className="animate-fade-in pt-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Privacy Toolkit</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Essential software to harden your digital defense. We recommend these industry-standard tools for active defense and identity masking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div key={index} className="pro-card p-6 flex flex-col items-start group relative border border-white/5 hover:border-white/10">
            {tool.recommended && (
              <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/20">
                RECOMMENDED
              </span>
            )}
            
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
              {IconMap[tool.icon] || <Shield size={24} />}
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{tool.name}</h3>
            <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold mb-3">{tool.category}</span>
            
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-grow">
              {tool.description}
            </p>

            <a 
              href={tool.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full mt-auto flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold py-3 rounded-lg transition-colors"
            >
              <Download size={14} /> Download / Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};