import { Download, Github, Package } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-neon-purple bg-clip-text text-transparent">
              Download ReconSphere
            </h1>
            <p className="text-foreground/60 text-lg">
              Get started with our domain intelligence platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Latest Release */}
            <div className="p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10">
              <div className="mb-4 inline-block p-3 rounded-lg bg-accent/10">
                <Package className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                CLI Version
              </h3>
              <p className="text-foreground/60 text-sm mb-4">
                ReconSphere CLI Version– Download the command line based version of ReconShpere now!
              </p>
              <a
                href="/downloads/reconsphere-cli.zip"   // 🔁 Put your actual file path here
                download
               className="w-full block text-center px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-neon-electric-blue text-accent-foreground font-medium hover:shadow-lg hover:shadow-accent/20 transition-all">
                 Download Now
              </a>
            </div>

            {/* GitHub Repository */}
            <div className="p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10">
              <div className="mb-4 inline-block p-3 rounded-lg bg-neon-purple/10">
                <Github className="h-6 w-6 text-neon-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                GitHub Repository
              </h3>
              <p className="text-foreground/60 text-sm mb-4">
                Access the source code of ReconShpere and contribute to the project
              </p>
              <a
                href="/downloads/reconsphere-blackbook.pdf"   // 🔁 Put your actual file path here
                download
                className="w-full block text-center px-4 py-2 rounded-lg border border-border bg-card hover:border-accent/50 text-foreground font-medium transition-all">
                 View on GitHub
              </a>

            </div>

            {/* Documentation */}
            <div className="p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/10">
              <div className="mb-4 inline-block p-3 rounded-lg bg-neon-teal/10">
                <Download className="h-6 w-6 text-neon-teal" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                Documentation
              </h3>
              <p className="text-foreground/60 text-sm mb-4">
                Detailed and documented infromation about ReconSphere available. 
              </p>
              <a
                href="/downloads/reconsphere-blackbook.pdf"   // 🔁 Put your actual file path here
                download
                className="w-full block text-center px-4 py-2 rounded-lg border border-border bg-card hover:border-accent/50 text-foreground font-medium transition-all">
                 Download PDF
              </a>

            </div>
          </div>

          {/* Installation Instructions */}
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Installation Guide
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-accent">
                  System Requirements
                </h3>
                <ul className="space-y-2 text-foreground/80">
                  <li>• OS: Linux, macOS, or Windows 10+</li>
                  <li>• Processor: Intel Core i5 or equivalent</li>
                  <li>• RAM: 4GB minimum, 8GB recommended</li>
                  <li>• Storage: 500MB available space</li>
                  <li>• Network: Internet connection required</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-accent">
                  Quick Start
                </h3>
                <div className="bg-secondary/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="text-foreground/70">
                    <p>$ wget https://releases.reconsphere.io/latest</p>
                    <p>$ unzip reconsphere-latest.zip</p>
                    <p>$ cd reconsphere</p>
                    <p>$ ./install.sh</p>
                    <p>$ reconsphere --start</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-accent">
                  Included Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <span className="text-accent">✓</span>
                    <span className="text-foreground/80">
                      Complete WHOIS lookups
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent">✓</span>
                    <span className="text-foreground/80">
                      DNS record analysis
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent">✓</span>
                    <span className="text-foreground/80">
                      SSL certificate verification
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent">✓</span>
                    <span className="text-foreground/80">
                      Subdomain enumeration
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent">✓</span>
                    <span className="text-foreground/80">
                      Server geolocation tracking
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent">✓</span>
                    <span className="text-foreground/80">
                      Technology stack detection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
