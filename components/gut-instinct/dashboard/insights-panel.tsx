"use client";

import { 
  AlertTriangle, 
  Zap, 
  Target, 
  Clock, 
  Sparkles,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const insights = [
  {
    icon: AlertTriangle,
    title: "Overconfidence Alert",
    description: "High confidence (>80%) tickets have only 18% win rate",
    type: "warning",
    confidence: 92,
    isNew: true
  },
  {
    icon: Clock,
    title: "Weekend Pattern",
    description: "Your Saturday calibration is 35% better than weekdays",
    type: "positive",
    confidence: 87,
    isNew: true
  },
  {
    icon: Target,
    title: "Small Wins Blindspot",
    description: "You consistently undervalue $5-20 wins in satisfaction",
    type: "insight",
    confidence: 79,
    isNew: false
  },
  {
    icon: Zap,
    title: "Cost-Emotion Link",
    description: "Tickets over $10 trigger 40% more pre-purchase excitement",
    type: "insight",
    confidence: 84,
    isNew: false
  },
];

function getTypeStyles(type: string) {
  switch (type) {
    case "positive":
      return {
        border: "border-success/30 hover:border-success/50",
        bg: "bg-success/5",
        icon: "text-success bg-success/10 border-success/20",
        badge: "bg-success/15 text-success"
      };
    case "warning":
      return {
        border: "border-accent/30 hover:border-accent/50",
        bg: "bg-accent/5",
        icon: "text-accent bg-accent/10 border-accent/20",
        badge: "bg-accent/15 text-accent"
      };
    default:
      return {
        border: "border-border/40 hover:border-primary/30",
        bg: "bg-transparent",
        icon: "text-primary bg-primary/10 border-primary/20",
        badge: "bg-primary/15 text-primary"
      };
  }
}

export function InsightsPanel() {
  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">AI Insights</h3>
            <span className="px-1.5 py-0.5 bg-primary/15 text-primary text-[10px] font-medium rounded-full">
              2 new
            </span>
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            View all
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      {/* Insights List */}
      <div className="divide-y divide-border/20">
        {insights.map((insight, index) => {
          const styles = getTypeStyles(insight.type);
          return (
            <div 
              key={index}
              className={cn(
                "p-4 transition-all duration-200 cursor-pointer group",
                styles.border,
                styles.bg,
                "hover:bg-secondary/20"
              )}
            >
              <div className="flex gap-3">
                <div className={cn(
                  "w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0",
                  "transition-transform duration-200 group-hover:scale-105",
                  styles.icon
                )}>
                  <insight.icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {insight.title}
                    </h4>
                    {insight.isNew && (
                      <span className="px-1.5 py-0.5 bg-primary text-primary-foreground text-[9px] font-medium rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {insight.description}
                  </p>
                  
                  {/* Confidence bar */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 bg-secondary/50 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          insight.type === "positive" ? "bg-success/60" :
                          insight.type === "warning" ? "bg-accent/60" : "bg-primary/60"
                        )}
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {insight.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Footer */}
      <div className="p-4 bg-secondary/10 border-t border-border/20">
        <p className="text-[11px] text-muted-foreground/70 text-center">
          Insights are based on your logged ticket data, not predictions
        </p>
      </div>
    </div>
  );
}
