import Link from "next/link";
import { Sparkles, Zap, Bug, Star } from "lucide-react";
import { Footer } from "@/components/gut-instinct/footer";

const releases = [
  {
    version: "1.0.0",
    date: "March 2026",
    type: "major",
    title: "Public Launch",
    changes: [
      { type: "feature", text: "Full dashboard with analytics visualization" },
      { type: "feature", text: "Ticket logging with confidence and emotional tracking" },
      { type: "feature", text: "Calibration score algorithm" },
      { type: "feature", text: "Location-based insights" },
      { type: "feature", text: "User authentication system" }
    ]
  },
  {
    version: "0.9.0",
    date: "February 2026",
    type: "minor",
    title: "Beta Release",
    changes: [
      { type: "feature", text: "Redesigned dashboard UI with glass-card effects" },
      { type: "feature", text: "Added expectation vs reality chart" },
      { type: "feature", text: "Emotional delta tracking" },
      { type: "improvement", text: "Improved mobile responsiveness" },
      { type: "fix", text: "Fixed chart rendering on Safari" }
    ]
  },
  {
    version: "0.8.0",
    date: "January 2026",
    type: "minor",
    title: "Analytics Update",
    changes: [
      { type: "feature", text: "New confidence vs outcome visualization" },
      { type: "feature", text: "Time range filters for all charts" },
      { type: "improvement", text: "Better tooltip formatting" },
      { type: "fix", text: "Resolved timezone issues in date display" }
    ]
  },
  {
    version: "0.7.0",
    date: "December 2025",
    type: "minor",
    title: "Location Features",
    changes: [
      { type: "feature", text: "Interactive location map" },
      { type: "feature", text: "Store detection for common retailers" },
      { type: "improvement", text: "Optimized database queries" },
      { type: "fix", text: "Fixed duplicate ticket entries" }
    ]
  },
  {
    version: "0.5.0",
    date: "November 2025",
    type: "minor",
    title: "Initial Alpha",
    changes: [
      { type: "feature", text: "Basic ticket logging functionality" },
      { type: "feature", text: "Simple win/loss tracking" },
      { type: "feature", text: "User account creation" }
    ]
  }
];

function ChangeIcon({ type }: { type: string }) {
  switch (type) {
    case "feature":
      return <Star className="w-4 h-4 text-primary" />;
    case "improvement":
      return <Zap className="w-4 h-4 text-accent" />;
    case "fix":
      return <Bug className="w-4 h-4 text-muted-foreground" />;
    default:
      return null;
  }
}

export default function ChangelogPage() {
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif tracking-tight mb-4">Changelog</h1>
            <p className="text-muted-foreground">Track our progress and updates</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border/50 hidden md:block" />

            <div className="space-y-8">
              {releases.map((release, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-6 top-8 w-3 h-3 -ml-1.5 rounded-full bg-primary border-2 border-background z-10" />

                  <div className="md:ml-16 bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                        v{release.version}
                      </span>
                      <span className="text-muted-foreground text-sm">{release.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">{release.title}</h2>
                    <ul className="space-y-3">
                      {release.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-start gap-3">
                          <ChangeIcon type={change.type} />
                          <span className="text-muted-foreground">{change.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
