"use client";

import { Brain, Info, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CalibrationScore() {
  const score = 72;
  const previousScore = 68;
  const improvement = score - previousScore;
  
  // Calculate the circumference and offset for the circular progress
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/10 rounded-[2rem] blur-3xl opacity-40" />
      
      <div className="relative bg-card/50 backdrop-blur-xl border border-primary/20 rounded-2xl overflow-hidden">
        {/* Top highlight bar */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="p-6 lg:p-8">
          <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-8 lg:gap-12 items-center">
            {/* Left: Info Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                  <Brain className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl lg:text-2xl font-semibold text-foreground">Intuition Calibration</h3>
                    <button className="w-5 h-5 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors">
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">How well your confidence matches outcomes</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Your calibration has <span className="text-primary font-medium">improved {improvement}%</span> since last month. 
                You perform best with scratch-off tickets on weekends, where your predictions are notably more accurate.
              </p>
              
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary/30 rounded-xl p-3 text-center">
                  <p className="text-2xl font-semibold text-foreground tabular-nums">47</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Tickets</p>
                </div>
                <div className="bg-secondary/30 rounded-xl p-3 text-center">
                  <p className="text-2xl font-semibold text-primary tabular-nums">31%</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Win Rate</p>
                </div>
                <div className="bg-secondary/30 rounded-xl p-3 text-center">
                  <p className="text-2xl font-semibold text-accent tabular-nums">89%</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Data Quality</p>
                </div>
              </div>
            </div>

            {/* Center: Circular Score */}
            <div className="flex justify-center lg:justify-center py-4">
              <div className="relative">
                {/* Glow behind */}
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-75" />
                
                {/* SVG Circle */}
                <svg className="relative w-48 h-48 lg:w-56 lg:h-56 -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="hsl(var(--secondary))"
                    strokeWidth="12"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50%"
                    cy="50%"
                    r={radius}
                    stroke="url(#scoreGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-1000 ease-out"
                  />
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Score in center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                  <span className="text-5xl lg:text-6xl font-bold text-foreground tabular-nums">{score}</span>
                  <span className="text-sm text-muted-foreground mt-1">out of 100</span>
                  <div className="flex items-center gap-1 mt-2 text-success text-sm font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +{improvement}%
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Breakdown & CTA */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-4">Score Breakdown</h4>
                <div className="space-y-3">
                  {[
                    { label: "Confidence Accuracy", value: 78, color: "primary" },
                    { label: "Emotional Stability", value: 65, color: "accent" },
                    { label: "Pattern Recognition", value: 82, color: "success" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="text-foreground font-medium tabular-nums">{item.value}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${
                            item.color === "primary" ? "bg-primary" : 
                            item.color === "accent" ? "bg-accent" : "bg-success"
                          }`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button variant="outline" className="w-full justify-between border-border/50 hover:border-primary/50 hover:bg-primary/5">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  View Detailed Analysis
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom progress bar */}
        <div className="h-1 bg-secondary/30">
          <div 
            className="h-full bg-gradient-to-r from-primary via-primary to-accent transition-all duration-1000"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}
