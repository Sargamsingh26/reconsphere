import { Database, Server, FileText } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16">
          
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-neon-purple bg-clip-text text-transparent">
              About ReconSphere
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              An automated domain intelligence suite designed to perform
              OSINT-based reconnaissance and generate structured security reports.
            </p>
          </div>

          {/* Mission */}
          <div className="rounded-lg border border-border bg-card p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Our Mission
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              ReconSphere was built to automate domain-level reconnaissance by
              integrating multiple cybersecurity intelligence APIs into a single
              platform. The system collects WHOIS data, DNS records, SSL details,
              subdomains, open ports, geolocation information, technology stack,
              reputation status, blacklist checks, robots.txt analysis, and more.
              Our goal is to provide a structured and downloadable intelligence
              report that simplifies security analysis and investigation.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Modular Intelligence */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="mb-4 inline-block p-3 rounded-lg bg-accent/10">
                <Database className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                Modular Intelligence Modules
              </h3>
              <p className="text-foreground/70 text-sm">
                Separate and scalable modules for WHOIS, DNS, SSL, ports,
                reputation, geolocation, technology detection and more.
              </p>
            </div>

            {/* API Driven */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="mb-4 inline-block p-3 rounded-lg bg-neon-electric-blue/10">
                <Server className="h-6 w-6 text-neon-electric-blue" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                API-Driven Architecture
              </h3>
              <p className="text-foreground/70 text-sm">
                Integrated with WhoisXML, ViewDNS, SecurityTrails and Genelify
                APIs for real-time domain intelligence data collection.
              </p>
            </div>

            {/* Structured Reporting */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="mb-4 inline-block p-3 rounded-lg bg-neon-purple/10">
                <FileText className="h-6 w-6 text-neon-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                Structured Reporting
              </h3>
              <p className="text-foreground/70 text-sm">
                Generates organized JSON-based intelligence reports with
                downloadable output for further security analysis.
              </p>
            </div>

          </div>

          {/* Technology Stack */}
          <div className="rounded-lg border border-border bg-card p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Technology Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <h3 className="font-semibold text-accent mb-3">Backend</h3>
                <ul className="space-y-2 text-foreground/70">
                  <li>• Python 3.9+</li>
                  <li>• FastAPI Framework</li>
                  <li>• Modular Tool-Based Architecture</li>
                  <li>• REST API Endpoints</li>
                  <li>• Environment-based API Key Management (.env)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-accent mb-3">Frontend</h3>
                <ul className="space-y-2 text-foreground/70">
                  <li>• React (Vite Setup)</li>
                  <li>• JavaScript (ES6+)</li>
                  <li>• Tailwind CSS</li>
                  <li>• Light/Dark Theme using CSS Variables</li>
                  <li>• Responsive Multi-page Interface</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Roadmap */}
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Upcoming Enhancements
            </h2>

            <div className="space-y-4">
              
              <div className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                <div>
                  <h4 className="font-semibold text-foreground">
                    Enhanced Reporting Dashboard
                  </h4>
                  <p className="text-foreground/70 text-sm">
                    Visual analytics and graphical representation of domain intelligence.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-neon-electric-blue mt-2" />
                <div>
                  <h4 className="font-semibold text-foreground">
                    Automated Threat Scoring
                  </h4>
                  <p className="text-foreground/70 text-sm">
                    Risk scoring based on reputation, blacklist status, SSL and DNS analysis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-neon-teal mt-2" />
                <div>
                  <h4 className="font-semibold text-foreground">
                    Continuous Monitoring
                  </h4>
                  <p className="text-foreground/70 text-sm">
                    Real-time monitoring with alert notifications for tracked domains.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
