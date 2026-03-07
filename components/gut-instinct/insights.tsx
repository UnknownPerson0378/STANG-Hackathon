"use client";

import { TrendingUp, TrendingDown, AlertTriangle, MapPin, Sparkles, Target, Zap, Clock } from "lucide-react";

const insights = [
  {
    icon: AlertTriangle,
    title: "Overconfidence Pattern",
    description: "You are usually more confident than your outcomes justify. Your average pre-result confidence is 72%, but your win rate is 23%.",
    type: "warning",
    confidence: 89,
    priority: "high"
  },
  {
    icon: Zap,
    title: "Cost-Excitement Correlation",
    description: "Your excitement spikes most on higher-cost tickets. Tickets over $10 trigger 40% more excitement than average.",
    type: "insight",
    confidence: 76,
    priority: "medium"
  },
  {
    icon: Target,
    title: "Small Win Blindspot",
    description: "You tend to underestimate small wins. When you win $5-20, your post-result satisfaction is consistently lower than expected.",
    type: "insight",
    confidence: 82,
    priority: "medium"
  },
  {
    icon: MapPin,
    title: "Location Pattern Detected",
    description: "Locations on the east side have produced more wins for you. 67% of your winning tickets came from this area.",
    type: "positive",
    confidence: 71,
    priority: "low"
  },
  {
    icon: Clock,
    title: "Weekend Effect",
    description: "Your calibration improves significantly on weekends. Saturday purchases show 35% better expectation-reality alignment.",
    type: "positive",
    confidence: 84,
    priority: "medium"
  },
  {
    icon: Sparkles,
    title: "'Feels Different' Inaccuracy",
    description: "When you rate 'feels different' above 80%, your actual outcomes are no better than average. This signal appears uncalibrated.",
    type: "warning",
    confidence: 91,
    priority: "high"
  },
];

function getTypeStyles(type: string) {
  switch (type) {
    case "positive":
      return "border-success/30 bg-success/[0.03] hover:border-success/50 hover:bg-success/[0.05]";
    case "warning":
      return "border-accent/30 bg-accent/[0.03] hover:border-accent/50 hover:bg-accent/[0.05]";
    default:
      return "border-border/40 bg-card/30 hover:border-primary/30 hover:bg-card/50";
  }
}

function getIconStyles(type: string) {
  switch (type) {
    case "positive":
      return "text-success bg-success/10 border-success/20";
    case "warning":
      return "text-accent bg-accent/10 border-accent/20";
    default:
      return "text-primary bg-primary/10 border-primary/20";
  }
}

function getBadgeStyles(type: string) {
  switch (type) {
    case "positive":
      return "bg-success/15 text-success border-success/20";
    case "warning":
      return "bg-accent/15 text-accent border-accent/20";
    default:
      return "bg-primary/15 text-primary border-primary/20";
  }
}

function getPriorityDot(priority: string) {
  switch (priority) {
    case "high":
      return "bg-accent";
    case "medium":
      return "bg-primary";
    default:
      return "bg-muted-foreground";
  }
}

export function Insights() {
  return (
    <section id="insights" className="py-24 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">
            AI-Powered Insights
          </p>
          <h2 className="text-4xl lg:text-5xl font-serif tracking-tight text-balance">
            Behavioral patterns revealed
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base">
            These are observations, not predictions. They reflect patterns in your logged data.
          </p>
        </div>
        
        {/* Featured insight - First warning */}
        <div className="relative mb-10">
          <div className="absolute -inset-2 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent rounded-3xl blur-xl opacity-60" />
          <div className="relative glass-card-elevated rounded-2xl p-8 border-accent/30 glow-accent">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-medium text-foreground">{insights[0].title}</h3>
                  <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium bg-accent/15 text-accent border border-accent/20">
                    High Priority
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {insights[0].description}
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Confidence</span>
                    <div className="w-24 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent/70 rounded-full"
                        style={{ width: `${insights[0].confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-accent">{insights[0].confidence}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground/60">
                    Based on 47 logged tickets
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Insights grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {insights.slice(1).map((insight, index) => (
            <div
              key={index}
              className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 group ${getTypeStyles(insight.type)}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${getIconStyles(insight.type)}`}>
                  <insight.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${getPriorityDot(insight.priority)}`} />
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {insight.priority} priority
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground truncate">{insight.title}</h3>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {insight.description}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-full border font-medium ${getBadgeStyles(insight.type)}`}>
                  {insight.type === "positive" ? "Positive" : insight.type === "warning" ? "Attention" : "Observation"}
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-14 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-muted-foreground/40 rounded-full transition-all duration-500"
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{insight.confidence}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty state hint */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground/60">
            Log more tickets to unlock additional behavioral insights
          </p>
        </div>
      </div>
    </section>
  );
}
