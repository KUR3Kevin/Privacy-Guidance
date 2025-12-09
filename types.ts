export type Page = 'overview' | 'tools' | 'news' | 'about';

export interface BadSite {
  name: string;
  category: string;
  reason: string;
  alternative: string;
  detailedExplanation: string; // Added for the popup
}

export interface Tool {
  name: string;
  category: string;
  description: string;
  icon: string; // Lucide icon name placeholder
  link: string;
  recommended: boolean;
}

export interface NewsItem {
  title: string;
  date: string;
  source?: string;
  summary: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  url: string; // Added for external link
  detailedContent: string; // Added for the modal popup
}

export interface DashboardData {
  badSites: BadSite[];
  tools: Tool[];
  news: NewsItem[];
}