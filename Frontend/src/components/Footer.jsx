export default function Footer() {
  return (
    <footer className="border-t border-border bg-card text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-4 font-bold text-foreground">ReconSphere</h3>
            <p className="text-sm text-foreground/60">
              Automated domain intelligence suite for comprehensive security
              analysis and reconnaissance.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/download"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  Download
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/60 hover:text-accent transition-colors"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-foreground/60">
            &copy; {new Date().getFullYear()} ReconSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
