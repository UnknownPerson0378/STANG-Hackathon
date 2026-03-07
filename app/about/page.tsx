import Link from "next/link";
import { Sparkles, Target, Brain, TrendingUp, Users } from "lucide-react";
import { Footer } from "@/components/gut-instinct/footer";

export default function AboutPage() {
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
        {/* Hero */}
        <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-6 text-balance">
              About Gut Instinct
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              A behavioral analytics platform designed to help you understand the patterns 
              behind your decisions - one ticket at a time.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-serif mb-6 text-center">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed text-lg text-center max-w-3xl mx-auto">
              We believe that understanding yourself is the first step to making better decisions. 
              Gut Instinct transforms the simple act of buying a lottery ticket into an opportunity 
              for self-reflection and behavioral insight.
            </p>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Self-Awareness</h3>
              <p className="text-muted-foreground">
                Track your emotional states and confidence levels to better understand how 
                feelings influence your decisions.
              </p>
            </div>

            <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Calibration</h3>
              <p className="text-muted-foreground">
                Learn how accurate your gut feelings really are and improve your 
                intuition over time through data-driven insights.
              </p>
            </div>

            <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Growth</h3>
              <p className="text-muted-foreground">
                Use behavioral analytics to identify patterns, track progress, and 
                develop healthier decision-making habits.
              </p>
            </div>

            <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Join a community of self-aware individuals who value understanding 
                themselves over chasing wins.
              </p>
            </div>
          </div>

          {/* Story */}
          <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-serif mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Gut Instinct was born from a simple observation: people buy lottery tickets 
                for many reasons, but few ever reflect on why. We noticed that the excitement, 
                hope, and anticipation surrounding each purchase held valuable insights about 
                human behavior.
              </p>
              <p className="leading-relaxed">
                Rather than focus on winning - something largely outside our control - we 
                decided to focus on something we can control: understanding ourselves. By 
                tracking the emotional and psychological patterns behind our decisions, we 
                can learn more about who we are.
              </p>
              <p className="leading-relaxed">
                Today, Gut Instinct helps thousands of users gain insights into their 
                decision-making processes, develop better self-awareness, and maintain 
                healthier relationships with games of chance.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">Ready to understand your gut feelings?</p>
            <Link 
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
