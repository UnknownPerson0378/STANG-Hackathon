import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Footer } from "@/components/gut-instinct/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="font-serif text-lg font-medium tracking-tight">Gut Instinct</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 lg:px-8 py-16 max-w-3xl">
          <div className="mb-12">
            <h1 className="text-4xl font-serif tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: March 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Account information (email, password)</li>
                <li>Ticket logging data (game type, purchase location, amounts)</li>
                <li>Emotional and confidence ratings you provide</li>
                <li>Usage data and interaction patterns</li>
              </ul>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Generate personalized analytics and insights</li>
                <li>Communicate with you about updates and features</li>
                <li>Protect against fraud and abuse</li>
              </ul>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">3. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information. 
                All data is encrypted in transit and at rest. We regularly review and update our 
                security practices to ensure your data remains protected.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">4. Data Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell your personal information. We may share anonymized, aggregated data 
                for research purposes. We will never share your individual data without your explicit consent.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">5. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">6. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at{" "}
                <Link href="/support" className="text-primary hover:text-primary/80 transition-colors">
                  our support page
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
