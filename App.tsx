import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { OverviewPage } from './components/OverviewPage';
import { ToolsPage } from './components/ToolsPage';
import { NewsPage } from './components/NewsPage';
import { AboutPage } from './components/AboutPage';
import { fetchDashboardData } from './services/geminiService';
import { DashboardData, Page } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('overview');

  useEffect(() => {
    const loadData = async () => {
      const dashboardData = await fetchDashboardData();
      setData(dashboardData);
      setLoading(false);
    };
    loadData();
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'tools':
        return <ToolsPage tools={data?.tools || []} />;
      case 'news':
        return <NewsPage news={data?.news || []} />;
      case 'about':
        return <AboutPage />;
      case 'overview':
      default:
        return <OverviewPage data={data} loading={loading} />;
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-black selection:bg-neutral-700 selection:text-white pb-20 pt-14">
      
      {/* Subtle Background Glows - Fixed across pages */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-20%] left-[20%] w-[80vw] h-[80vw] bg-purple-900/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-20%] right-[20%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="relative z-10 max-w-6xl mx-auto px-6">
        {renderContent()}
        
        <footer className="mt-24 border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600">
          <p>© 2024 GuardianWeb. Privacy first.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <button onClick={() => setCurrentPage('about')} className="hover:text-neutral-400">About Developer</button>
             <a href="#" className="hover:text-neutral-400">Terms of Service</a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;