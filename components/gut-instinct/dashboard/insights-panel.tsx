"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Zap,
  Target,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

type InsightType = "positive" | "warning" | "insight";

interface Insight {
  title: string;
  description: string;
  type: InsightType;
  confidence: number;
  isNew: boolean;
}

function getTypeStyles(type: string) {
  switch (type) {
    case "positive":
      return {
        border: "border-success/30 hover:border-success/50",
        bg: "bg-success/5",
        icon: "text-success bg-success/10 border-success/20",
      };
    case "warning":
      return {
        border: "border-accent/30 hover:border-accent/50",
        bg: "bg-accent/5",
        icon: "text-accent bg-accent/10 border-accent/20",
      };
    default:
      return {
        border: "border-border/40 hover:border-primary/30",
        bg: "bg-transparent",
        icon: "text-primary bg-primary/10 border-primary/20",
      };
  }
}

function pickIcon(type: InsightType, index: number) {
  if (type === "warning") return AlertTriangle;
  if (type === "positive") return TrendingUp;
  return [Target, Zap, Clock, Sparkles][index % 4];
}

export function InsightsPanel() {
  const [insights, setInsights] = useState<Insight[]>([
    {
      title: "Loading insights",
      description: "Analyzing your local ticket history with Gemini.",
      type: "insight",
      confidence: 60,
      isNew: true,
    },
  ]);

  useEffect(() => {
    async function loadInsights() {
      try {
        const tickets = JSON.parse(localStorage.getItem("gut_tickets") || "[]");

        if (!tickets.length) {
          setInsights([
            {
              title: "No data yet",
              description: "Log a few tickets to generate AI insights.",
              type: "insight",
              confidence: 60,
              isNew: true,
            },
          ]);
          return;
        }

        const response = await fetch("/api/insights", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tickets }),
        });

        const data = await response.json();

        if (Array.isArray(data.insights) && data.insights.length) {
          setInsights(data.insights);
        } else {
          setInsights([
            {
              title: "Insight error",
              description: "Could not generate AI insights right now.",
              type: "warning",
              confidence: 70,
              isNew: true,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
        setInsights([
          {
            title: "Insight error",
            description: "Could not generate AI insights right now.",
            type: "warning",
            confidence: 70,
            isNew: true,
          },
        ]);
      }
    }

    loadInsights();
  }, []);

  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-border/30">
        <h3 className="font-semibold text-foreground">AI Insights</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Generated from your local ticket history
        </p>
      </div>

      <div className="p-4 space-y-3">
        {insights.map((insight, index) => {
          const styles = getTypeStyles(insight.type);
          const Icon = pickIcon(insight.type, index);

          return (
            <div
              key={index}
              className={cn(
                "rounded-xl border p-4 transition-all",
                styles.border,
                styles.bg
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg border flex items-center justify-center shrink-0",
                    styles.icon
                  )}
                >
                  <Icon className="w-4 h-4" />
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

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1 bg-secondary/50 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          insight.type === "positive"
                            ? "bg-success/60"
                            : insight.type === "warning"
                            ? "bg-accent/60"
                            : "bg-primary/60"
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

      <div className="p-4 bg-secondary/10 border-t border-border/20">
        <p className="text-[11px] text-muted-foreground/70 text-center">
          Behavioral reflection only — not prediction or gambling advice
        </p>
      </div>
    </div>
  );
}