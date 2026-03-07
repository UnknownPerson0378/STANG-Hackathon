"use client";

import { useEffect, useMemo, useState } from "react";
import { Target, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ticket {
  confidence?: number;
  wasRight?: number;
  excitement?: number;
  feelsDifferent?: number;
}

function average(nums: number[]) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function CalibrationScore() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gut_tickets") || "[]");
    setTickets(stored);
  }, []);

  const stats = useMemo(() => {
    if (!tickets.length) {
      return {
        score: 0,
        avgConfidence: 0,
        avgGutAccuracy: 0,
        gap: 0,
        trend: "neutral" as "up" | "down" | "neutral",
        label: "No data yet",
      };
    }

    const confidenceValues = tickets
      .map((t) => Number(t.confidence ?? 0))
      .filter((n) => !Number.isNaN(n));

    const accuracyValues = tickets
      .map((t) => Number(t.wasRight ?? 0))
      .filter((n) => !Number.isNaN(n));

    const avgConfidence = average(confidenceValues);
    const avgGutAccuracy = average(accuracyValues);
    const gap = Math.abs(avgConfidence - avgGutAccuracy);
    const score = Math.max(0, Math.round(100 - gap));

    let trend: "up" | "down" | "neutral" = "neutral";
    let label = "Fairly calibrated";

    if (score >= 80) {
      trend = "up";
      label = "Strong calibration";
    } else if (score < 60) {
      trend = "down";
      label = "Confidence mismatch";
    }

    return {
      score,
      avgConfidence: Math.round(avgConfidence),
      avgGutAccuracy: Math.round(avgGutAccuracy),
      gap: Math.round(gap),
      trend,
      label,
    };
  }, [tickets]);

  const TrendIcon =
    stats.trend === "up" ? TrendingUp : stats.trend === "down" ? TrendingDown : Minus;

  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Calibration Score</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Based on confidence vs self-rated gut accuracy
          </p>
        </div>

        <div
          className={cn(
            "flex items-center gap-1 text-xs px-2 py-1 rounded-full",
            stats.trend === "up"
              ? "bg-success/10 text-success"
              : stats.trend === "down"
              ? "bg-destructive/10 text-destructive/80"
              : "bg-secondary/40 text-muted-foreground"
          )}
        >
          <TrendIcon className="w-3.5 h-3.5" />
          {stats.label}
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[220px_1fr] gap-6 items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 rounded-full border-[10px] border-secondary/40 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(hsl(var(--primary)) ${stats.score}%, transparent 0)`,
                WebkitMask:
                  "radial-gradient(circle at center, transparent 58%, black 59%)",
                mask: "radial-gradient(circle at center, transparent 58%, black 59%)",
              }}
            />
            <div className="relative text-center">
              <div className="text-4xl font-semibold text-foreground tabular-nums">
                {stats.score}
              </div>
              <div className="text-xs text-muted-foreground mt-1">out of 100</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-secondary/20 p-4">
            <p className="text-xs text-muted-foreground">Avg Confidence</p>
            <p className="text-2xl font-semibold text-foreground tabular-nums mt-1">
              {stats.avgConfidence}%
            </p>
          </div>

          <div className="rounded-xl bg-secondary/20 p-4">
            <p className="text-xs text-muted-foreground">Avg Gut Accuracy</p>
            <p className="text-2xl font-semibold text-foreground tabular-nums mt-1">
              {stats.avgGutAccuracy}%
            </p>
          </div>

          <div className="rounded-xl bg-secondary/20 p-4">
            <p className="text-xs text-muted-foreground">Confidence Gap</p>
            <p className="text-2xl font-semibold text-foreground tabular-nums mt-1">
              {stats.gap}%
            </p>
          </div>
        </div>
      </div>

      {!tickets.length && (
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Log some tickets to calculate a real calibration score.
        </p>
      )}
    </div>
  );
}