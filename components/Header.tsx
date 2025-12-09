import React from 'react';
import { Shield, Menu } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const navItems: { label: string; value: Page }[] = [
    { label: 'Overview', value: 'overview' },
    { label: 'Tools', value: 'tools' },
    { label: 'Tech News', value: 'news' },
    { label: 'About', value: 'about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pro-glass border-b border-white/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => setCurrentPage('overview')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <Shield className="w-5 h-5 text-gray-200 group-hover:text-white transition-colors" />
          <span className="text-sm font-semibold tracking-tight text-white">GuardianWeb</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setCurrentPage(item.value)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                currentPage === item.value 
                  ? 'text-white bg-white/10' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentPage('tools')}
            className="bg-white text-black text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
          >
            Get Protected
          </button>
          <button className="md:hidden text-white">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};