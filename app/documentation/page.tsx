import Link from "next/link";
import { Sparkles, BookOpen, BarChart3, Target, MapPin, Lightbulb } from "lucide-react";
import { Footer } from "@/components/gut-instinct/footer";

const sections = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Learn the basics of tracking your lottery intuition",
    content: [
      "Create an account with your email address",
      "Navigate to the Dashboard after logging in",
      "Click 'Log Ticket' to record your first purchase",
      "Fill in the ticket details including game type and amount",
      "Rate your confidence and emotional state"
    ]
  },
  {
    icon: Target,
    title: "Logging Tickets",
    description: "How to effectively log your lottery ticket purchases",
    content: [
      "Log tickets immediately after purchase for accurate emotional data",
      "Be honest with your confidence ratings - accuracy improves calibration",
      "Include location data for regional pattern analysis",
      "Add notes about why you chose specific numbers or tickets",
      "Update outcomes as soon as results are available"
    ]
  },
  {
    icon: BarChart3,
    title: "Understanding Analytics",
    description: "Making sense of your behavioral data",
    content: [
      "Confidence vs Outcome shows how your feelings correlate with wins",
      "Emotional Delta tracks mood changes before and after results",
      "Calibration Score measures prediction accuracy over time",
      "Location Map reveals geographic patterns in your purchases",
      "Use time filters to analyze specific periods"
    ]
  },
  {
    icon: Lightbulb,
    title: "Insights & Patterns",
    description: "How to use insights for self-improvement",
    content: [
      "Review weekly pattern summaries for behavioral trends",
      "Identify emotional triggers that lead to overconfidence",
      "Track spending patterns to maintain healthy habits",
      "Compare your calibration to population averages",
      "Use insights to set personal improvement goals"
    ]
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    description: "Using geographic data for deeper analysis",
    content: [
      "Enable location services for automatic store detection",
      "View heat maps of your purchase locations",
      "Analyze success rates by region or store",
      "Identify patterns in where you buy tickets",
      "Location data is encrypted and never shared"
    ]
  }
];

export default function DocumentationPage() {
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
        <div className="container mx-auto px-4 lg:px-8 py-16 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif tracking-tight mb-4">Documentation</h1>
            <p className="text-muted-foreground">Learn how to get the most out of Gut Instinct</p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div 
                key={index}
                className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                    <p className="text-muted-foreground text-sm mt-1">{section.description}</p>
                  </div>
                </div>
                <ul className="space-y-3 ml-16">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Need more help?</p>
            <Link 
              href="/faq" 
              className="text-primary hover:text-primary/80 font-medium transition-colors mr-4"
            >
              View FAQs
            </Link>
            <Link 
              href="/support" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
