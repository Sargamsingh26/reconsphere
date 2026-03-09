import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-neon-purple bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-foreground/60 text-lg">
              Have questions? We'd love to hear from you. Send us a message.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Email */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="mb-4 inline-block p-3 rounded-lg bg-accent/10">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Email</h3>
              <p className="text-foreground/70">reconspheresupport@gmail.com</p>
              <p className="text-foreground/50 text-sm">
                We typically reply within 24 hours
              </p>
            </div>

            {/* Phone */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="mb-4 inline-block p-3 rounded-lg bg-neon-electric-blue/10">
                <Phone className="h-6 w-6 text-neon-electric-blue" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Phone</h3>
              <p className="text-foreground/70">+91 0987654321</p>
              <p className="text-foreground/50 text-sm">
                Mon-Fri, 9AM-6PM
              </p>
            </div>

            {/* Location */}
            <div className="p-6 rounded-lg border border-border bg-card">
              <div className="mb-4 inline-block p-3 rounded-lg bg-neon-purple/10">
                <MapPin className="h-6 w-6 text-neon-purple" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">
                Location
              </h3>
              <p className="text-foreground/70">Mumbai, Maharashtra</p>
              <p className="text-foreground/50 text-sm">India</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              
              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-2">What is ReconSphere?</h3>
                <p className="text-sm text-foreground/70">
                  ReconSphere is an automated domain intelligence suite that
                  performs OSINT-based domain reconnaissance and generates
                  structured intelligence reports.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-2">
                  What technologies power ReconSphere?
                </h3>
                <p className="text-sm text-foreground/70">
                  The backend is built using FastAPI (Python) and the frontend
                  uses React with Tailwind CSS. It integrates APIs such as
                  WhoisXML, ViewDNS, SecurityTrails, and Genelify for domain
                  intelligence collection.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card">
                <h3 className="font-semibold mb-2">
                  Does ReconSphere store personal user data?
                </h3>
                <p className="text-sm text-foreground/70">
                  No. ReconSphere processes domain-based intelligence queries
                  and generates structured reports without storing personal
                  user information.
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
