import { GoogleGenAI, Type } from "@google/genai";
import { DashboardData } from "../types";

// Fallback data reflecting the specific "watchdog" energy user requested
// UPDATED: Now includes the specific December 2025 news items requested
const FALLBACK_DATA: DashboardData = {
  badSites: [
    { 
      name: "Google Chrome", 
      category: "Web Browser", 
      reason: "Extensive data collection for ad targeting.", 
      alternative: "Brave Browser",
      detailedExplanation: "Google Chrome is designed to feed the world's largest advertising network. It tracks your history, extensions, and behavior. Brave is built on the same speed engine (Chromium) but automatically blocks trackers, ads, and fingerprinting scripts by default, keeping your data on your device."
    },
    { 
      name: "Unsecured Wi-Fi", 
      category: "Network", 
      reason: "Exposes traffic to local interceptors.", 
      alternative: "VPN Service",
      detailedExplanation: "Public Wi-Fi networks in cafes or airports are often unencrypted. Hackers can sit on the same network and 'sniff' your packets to steal passwords or session cookies. A VPN creates an encrypted tunnel for your traffic, making it unreadable to anyone else on the network."
    },
    { 
      name: "Default Search", 
      category: "Search Engine", 
      reason: "Prioritizes sponsored content and tracking.", 
      alternative: "DuckDuckGo",
      detailedExplanation: "Standard search engines build a profile of you based on your queries to sell ads. DuckDuckGo does not store your personal information or search history. You get the same search results without the 'filter bubble' or invasive tracking cookies following you around the web."
    },
    { 
      name: "ISP Tracking", 
      category: "Connection", 
      reason: "Your ISP logs all visited domains.", 
      alternative: "Encrypted DNS",
      detailedExplanation: "Even with HTTPS, your Internet Service Provider (ISP) can see the domain names of websites you visit via DNS lookups. Switching to Encrypted DNS (like DNS-over-HTTPS) hides this lookup process, preventing your ISP from logging your browsing habits or selling that data."
    },
  ],
  tools: [
    { name: "Portmaster", category: "App Firewall", description: "Open-source firewall that visualizes every connection your PC makes to block trackers.", icon: "Activity", link: "https://safing.io/portmaster/", recommended: true },
    { name: "Proton Pass", category: "Identity", description: "Generate burner emails on the fly to mask your true identity from data brokers.", icon: "Key", link: "https://proton.me/pass", recommended: true },
    { name: "Tor Browser", category: "Anonymity", description: "Defends against tracking by bouncing communications around a distributed network.", icon: "Globe", link: "https://www.torproject.org/download/", recommended: true },
    { name: "Brave Browser", category: "Browser", description: "Blocks trackers & ads by default. Fast, private, and secure.", icon: "Shield", link: "https://brave.com/", recommended: true },
    { name: "Proton VPN", category: "VPN", description: "High-speed Swiss VPN that protects your privacy.", icon: "Lock", link: "https://protonvpn.com/", recommended: true },
    { name: "Signal", category: "Messaging", description: "State-of-the-art end-to-end encryption.", icon: "MessageCircle", link: "https://signal.org/download/", recommended: true },
  ],
  news: [
    { 
      title: "Google Rolls Out Gemini 3 \"Deep Think\" Mode", 
      date: "Dec 2025", 
      source: "9to5Google", 
      summary: "New capability allows Gemini 3 to explore multiple hypotheses simultaneously for complex reasoning.", 
      severity: "High",
      url: "https://blog.google/products/gemini/gemini-3/",
      detailedContent: "Google has officially released its advanced \"Deep Think\" reasoning mode for Gemini 3 to Ultra subscribers. This new capability allows the model to explore multiple hypotheses simultaneously for complex math, science, and logic problems, effectively bridging the gap between chat and deep reasoning."
    },
    { 
      title: "DeepSeek V3.2 Challenges Global Leaders", 
      date: "This Week", 
      source: "Indian Express", 
      summary: "New models claim performance metrics that rival GPT-5 and Gemini 3 Pro.", 
      severity: "High",
      url: "https://indianexpress.com/article/technology/artificial-intelligence/deepseek-unveils-new-ai-models-rivalling-gpt-5-and-gemini-3-pro-10398473/",
      detailedContent: "Chinese AI startup DeepSeek released its V3.2 and \"Speciale\" models this week, claiming performance metrics that rival or exceed GPT-5 and Gemini 3 Pro. The release highlights a significant leap in open-source reasoning and \"agentic\" capabilities, intensifying the global AI arms race as we head into 2026."
    },
    { 
      title: "New US Privacy Laws Effective Jan 1, 2026", 
      date: "Jan 1, 2026", 
      source: "Morrison Foerster", 
      summary: "Laws in CA, IN, KY, and RI go live, mandating stricter data breach notifications.", 
      severity: "Medium",
      url: "https://www.mofo.com/resources/insights/251205-a-mofo-privacy-minute-q-a-2026",
      detailedContent: "As of Jan 1, 2026, California's SB 446 (shortening data breach notification timelines) and AB 656 (mandating easier social media account deletion) will take effect. Additionally, new comprehensive consumer privacy laws in Indiana, Kentucky, and Rhode Island will go live, requiring businesses to update privacy policies immediately."
    },
    { 
      title: "2025 Tech Job Cuts Hit Highest Since 2020", 
      date: "Dec 2025", 
      source: "HR Executive", 
      summary: "General tech roles see massive cuts while AI/ML specialized roles grow by 42%.", 
      severity: "Medium",
      url: "https://hrexecutive.com/job-cuts-highest-since-2020-the-real-reasons-why/",
      detailedContent: "A new report from Challenger, Gray & Christmas reveals that announced job cuts in 2025 have reached their highest point since 2020. However, the market shows a \"paradox\": while general tech roles are being cut, job postings for specialized AI and machine learning roles have grown by over 42% year-over-year."
    },
    { 
      title: "AI \"Agentic\" Platforms Redefine Development", 
      date: "Dec 2025", 
      source: "Google Blog", 
      summary: "Development shifting to platforms where AI writes and executes code autonomously.", 
      severity: "High", 
      url: "https://9to5google.com/2025/12/04/gemini-3-deep-think/",
      detailedContent: "Both Google (with \"Antigravity\") and DeepSeek are shifting focus toward \"Agentic\" development platforms where AI writes and executes code autonomously. This trend suggests that in 2026, software development will move from human-led coding to human-supervised AI architectural design."
    },
  ]
};

export const fetchDashboardData = async (): Promise<DashboardData> => {
  // SAFE KEY ACCESS: This prevents crashes if process.env is undefined in browser (common Netlify issue)
  const apiKey = (typeof process !== "undefined" && process.env) ? process.env.API_KEY : undefined;
  
  if (!apiKey) {
    console.warn("No API_KEY found. Using fallback data.");
    return FALLBACK_DATA;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a JSON object for a Cyber Security & Tech Dashboard with a "Watchdog" tone.
      
      1. 'badSites': 4 items focusing on "Stop Doing This". Include a 'detailedExplanation' field.
      
      2. 'tools': List exactly 6 tools with valid download links.
      
      3. 'news': Generate 5 headlines. FOCUS ON THESE SPECIFIC STORIES: 
         - Google Gemini 3 "Deep Think" Mode (High Severity)
         - DeepSeek V3.2 Challenges Global AI Leaders (High Severity)
         - New US Privacy Laws Effective Jan 1, 2026 (Medium Severity)
         - 2025 Tech Job Cuts Hit Highest Level Since 2020 (Medium Severity)
         - AI "Agentic" Platforms Redefine Development (High Severity)
         
         Structure:
         - 'summary': Short 1-sentence overview.
         - 'detailedContent': A robust paragraph (3-4 sentences) covering the update.
         - 'url': Use plausible URLs.
         Severity: Low, Medium, High, Critical.
      
      Return ONLY valid JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            badSites: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  alternative: { type: Type.STRING },
                  detailedExplanation: { type: Type.STRING },
                }
              }
            },
            tools: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  icon: { type: Type.STRING },
                  link: { type: Type.STRING },
                  recommended: { type: Type.BOOLEAN },
                }
              }
            },
            news: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  date: { type: Type.STRING },
                  source: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ["Low", "Medium", "High", "Critical"] },
                  url: { type: Type.STRING },
                  detailedContent: { type: Type.STRING },
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DashboardData;
    }
    return FALLBACK_DATA;
  } catch (error) {
    // FALLBACK ON ERROR: If AdBlocker blocks the API request, we return static data immediately.
    console.error("Gemini API Error or Blocked:", error);
    return FALLBACK_DATA;
  }
};