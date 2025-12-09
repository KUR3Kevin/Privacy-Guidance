import React from 'react';
import { Mail, MapPin, Code, ShieldCheck, Terminal } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="animate-fade-in pt-12 md:pt-20 max-w-4xl mx-auto">
      
      {/* Header Profile */}
      <div className="text-center mb-16">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-full flex items-center justify-center border border-white/10 mb-6 shadow-2xl shadow-blue-900/20">
          <Terminal size={32} className="text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Las Vegas Based</h2>
        <p className="text-lg text-neutral-400 font-medium">Developer & Security Analyst</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <ShieldCheck size={20} className="text-blue-500" />
            The Mission
          </h3>
          <p className="text-neutral-400 leading-relaxed mb-4">
            GuardianWeb was founded to demystify the complex world of digital privacy. In an era where data is the new currency, understanding how to protect your digital footprint shouldn't require a computer science degree.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            We provide simple, actionable intelligence for everyday users to reclaim their online anonymity.
          </p>
        </div>
        <div>
           <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code size={20} className="text-purple-500" />
            The Developer
          </h3>
          <p className="text-neutral-400 leading-relaxed mb-4">
            An emerging professional in the Las Vegas tech scene, I am continuously exploring the intersection of data analysis, cybersecurity, and full-stack development.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            Currently dabbling in advanced threat detection and secure application architecture, I built GuardianWeb as a testament to clean code and safer internet practices.
          </p>
        </div>
      </div>

      {/* Contact Card */}
      <div className="pro-card p-8 md:p-12 text-center border border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <h3 className="text-2xl font-bold text-white mb-6 relative z-10">Get in Touch</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative z-10">
          
          <div className="flex items-center gap-3 text-neutral-400">
            <MapPin size={18} />
            <span>Las Vegas, NV</span>
          </div>

          <a href="mailto:contact@guardianweb.dev" className="flex items-center gap-3 text-white bg-white/10 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all">
            <Mail size={18} />
            <span className="font-semibold">Contact Me</span>
          </a>

        </div>
      </div>

    </div>
  );
};