import { GoogleGenAI, Type } from "@google/genai";
import { DashboardData } from "../types";

// Fallback data reflecting the specific "watchdog" energy user requested
// UPDATED: Now includes real links and detailed explanations
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
      title: "Tri-Century Eye Care Ransomware", 
      date: "Dec 7", 
      source: "Dark Web Wire", 
      summary: "Pear ransomware group stole 3TB of patient data in a massive breach.", 
      severity: "Critical",
      url: "https://www.bleepingcomputer.com",
      detailedContent: "A significant data breach has struck Tri-Century Eye Care, with the notorious Pear ransomware group claiming responsibility. Reports indicate that over 3TB of sensitive patient data, including medical records and social security numbers, were exfiltrated before systems were locked. Security analysts suggest the entry point was a compromised RDP credential."
    },
    { 
      title: "Washington Post & Cox Breach", 
      date: "This Week", 
      source: "Cyber Watch", 
      summary: "Clop ransomware group exploited a zero-day in Oracle systems targeting 20,000+ employees.", 
      severity: "High",
      url: "https://krebsonsecurity.com",
      detailedContent: "The Clop ransomware gang has successfully exploited a zero-day vulnerability in Oracle's E-Business Suite to breach networks at the Washington Post and Cox Enterprises. The attack bypassed traditional perimeter defenses, allowing the threat actors to move laterally and scrape employee payroll data. Patches are now available, but remediation is ongoing."
    },
    { 
      title: "Portmaster v2 Released", 
      date: "Just Now", 
      source: "Safing.io", 
      summary: "Major foundational update now integrated with IVPN for stronger leak protection.", 
      severity: "Medium",
      url: "https://safing.io/blog",
      detailedContent: "Safing has officially released Portmaster v2, a major overhaul of its open-source application firewall. The update introduces SPN (Safing Privacy Network) integration directly into the UI and partners with IVPN for seamless multi-hop connections. This release focuses on preventing DNS leaks and blocking OS-level telemetry with greater granularity."
    },
    { 
      title: "OpenAI 'Code Red'", 
      date: "Yesterday", 
      source: "AI Wire", 
      summary: "Internal alerts regarding potential vulnerabilities in agentic workflows.", 
      severity: "High",
      url: "https://wired.com/category/security",
      detailedContent: "Internal memos leaked from OpenAI suggest a 'Code Red' status regarding new agentic AI workflows. The concern centers on the ability of autonomous agents to execute code in un-sandboxed environments, potentially allowing for unintended privilege escalation on host machines. Developers are urged to implement strict containerization for all AI agents."
    },
    { 
      title: "MCP Data Risks", 
      date: "2 days ago", 
      source: "DevSec", 
      summary: "Model Context Protocols may expose local file systems if not sandboxed.", 
      severity: "Medium",
      url: "https://github.com/security",
      detailedContent: "The new Model Context Protocol (MCP) standard, designed to let AI models read local context, has come under scrutiny. Researchers demonstrated that without strict read-only permissions and path whitelisting, a malicious prompt could trick the local server into exposing sensitive configuration files (like .env or .ssh/id_rsa) to the cloud model."
    },
  ]
};

export const fetchDashboardData = async (): Promise<DashboardData> => {
  const apiKey = process.env.API_KEY;
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
      
      3. 'news': Generate 5 headlines. 
         - Must include specific recent events like ransomware attacks or zero-day exploits.
         - 'summary': Short 1-sentence overview.
         - 'detailedContent': A robust paragraph (4-5 sentences) providing deep technical context, attack vectors, or implications.
         - 'url': A plausible search URL (e.g. google search for the topic) or a specific tech news domain (bleepingcomputer.com, wired.com, etc) relevant to the story.
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
    console.error("Gemini API Error:", error);
    return FALLBACK_DATA;
  }
};