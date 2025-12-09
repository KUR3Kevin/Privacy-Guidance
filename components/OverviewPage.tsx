import React from 'react';
import { HeroSection } from './HeroSection';
import { BadSitesList } from './BadSitesList';
import { NewsFeed } from './NewsFeed';
import { DashboardData } from '../types';

interface OverviewPageProps {
  data: DashboardData | null;
  loading: boolean;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ data, loading }) => {
  return (
    <>
      <HeroSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        {/* Section 1: The Switch (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <BadSitesList 
            sites={data?.badSites || []} 
            loading={loading} 
          />
        </div>

        {/* Section 2: Intel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <NewsFeed 
            news={data?.news || []} 
            loading={loading} 
          />
        </div>
      </div>
    </>
  );
};