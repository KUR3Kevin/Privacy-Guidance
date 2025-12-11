import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Overview', value: 'overview' },
    { label: 'Tools', value: 'tools' },
    { label: 'Tech News', value: 'news' },
    { label: 'About', value: 'about' },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close menu when an item is clicked
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pro-glass border-b border-white/10 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between relative z-50 bg-transparent">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('overview')}
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <Shield className="w-5 h-5 text-gray-200 group-hover:text-white transition-colors" />
            <span className="text-sm font-semibold tracking-tight text-white">GuardianWeb</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
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

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleNavClick('tools')}
              className="hidden md:block bg-white text-black text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              Get Protected
            </button>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-1 hover:bg-white/10 rounded-md transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-[#1c1c1e] border-b border-white/10 md:hidden animate-slide-up shadow-2xl z-40">
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                    currentPage === item.value 
                      ? 'bg-white/10 text-white' 
                      : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <button 
                onClick={() => handleNavClick('tools')}
                className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-200 transition-colors text-sm"
              >
                Get Protected
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Backdrop - Closes menu when clicking outside */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden pt-14"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};