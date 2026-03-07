import Link from "next/link";
import { Sparkles, Quote } from "lucide-react";
import { Footer } from "@/components/gut-instinct/footer";

export default function PhilosophyPage() {
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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-6">Our Philosophy</h1>
            <p className="text-muted-foreground text-lg">The principles that guide everything we build</p>
          </div>

          {/* Main Quote */}
          <div className="relative mb-16">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-[2rem] blur-2xl opacity-60" />
            <div className="relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
              <Quote className="w-12 h-12 text-primary/30 mb-6" />
              <blockquote className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed mb-6 text-balance">
                &quot;The lottery ticket is just the vehicle. The real subject is you.&quot;
              </blockquote>
              <p className="text-muted-foreground">- Gut Instinct Core Philosophy</p>
            </div>
          </div>

          {/* Philosophy sections */}
          <div className="space-y-12">
            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-serif mb-4 text-foreground">The Mirror, Not The Magic</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not promise to help you win. We promise to help you see. Every ticket 
                you log becomes a data point in understanding yourself - your hopes, your 
                patterns, your relationship with uncertainty. The value is not in the outcome, 
                but in the observation.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-serif mb-4 text-foreground">Calibration Over Prediction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your calibration score is not about being right more often - it is about 
                understanding when your confidence matches reality. A well-calibrated mind 
                knows when it knows, and knows when it does not. This awareness extends far 
                beyond lottery tickets into every decision you make.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-serif mb-4 text-foreground">Emotions As Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not ask you to suppress your feelings - we ask you to track them. 
                The excitement before a draw, the disappointment after a loss, the 
                rationalization that follows - these are not flaws to fix but patterns to 
                understand. Emotional intelligence begins with emotional awareness.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-serif mb-4 text-foreground">Harm Reduction Through Awareness</h2>
              <p className="text-muted-foreground leading-relaxed">
                By making spending patterns visible and emotional triggers explicit, we 
                believe people naturally develop healthier relationships with games of 
                chance. Knowledge is not just power - it is protection. When you see your 
                patterns clearly, you can choose whether to follow them.
              </p>
            </section>

            <section className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-serif mb-4 text-foreground">The Long Game</h2>
              <p className="text-muted-foreground leading-relaxed">
                Real insight requires time. A single data point tells you nothing. A 
                hundred data points begin to reveal truth. We are building for people who 
                value self-knowledge over quick thrills, who understand that understanding 
                yourself is a lifetime pursuit worth undertaking.
              </p>
            </section>
          </div>

          {/* Final thought */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6 text-lg">
              Every ticket tells a story. What will yours reveal?
            </p>
            <Link 
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start Your Journey
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
