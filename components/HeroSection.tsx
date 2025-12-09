import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-24 md:py-32 flex flex-col items-center text-center animate-fade-in px-4">
      <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-[10px] uppercase tracking-wide text-neutral-400 font-medium">System Secure</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white max-w-4xl leading-tight">
        Privacy. <span className="text-neutral-500">Simplified.</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed font-normal">
        Take back control of your digital footprint. Simple tools to block trackers, hide your IP, and browse freely.
      </p>
    </section>
  );
};