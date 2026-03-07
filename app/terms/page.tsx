import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Footer } from "@/components/gut-instinct/footer";

export default function TermsPage() {
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
            <h1 className="text-4xl font-serif tracking-tight mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: March 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using Gut Instinct, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gut Instinct is a behavioral analytics platform designed to help users track and analyze 
                their lottery ticket purchases and associated emotional states. The service is for 
                informational and entertainment purposes only.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">3. Not Gambling Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gut Instinct does not provide gambling advice, predictions, or recommendations. 
                The analytics and insights provided are based solely on your historical data and 
                are intended for self-reflection purposes only. We do not guarantee any outcomes 
                and are not responsible for any gambling losses.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">4. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate information when creating your account</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the service in compliance with all applicable laws</li>
                <li>Not use the service if you are under 18 years of age</li>
                <li>Gamble responsibly and within your means</li>
              </ul>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, features, and functionality of Gut Instinct are owned by us and are 
                protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gut Instinct is provided &quot;as is&quot; without warranties of any kind. We are not liable 
                for any damages arising from your use of the service, including but not limited to 
                gambling losses, data loss, or business interruption.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">7. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the service 
                after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">8. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please visit our{" "}
                <Link href="/support" className="text-primary hover:text-primary/80 transition-colors">
                  support page
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
