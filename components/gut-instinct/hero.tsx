"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Sliders, MapPin, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-accent/[0.02] rounded-full blur-[100px]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                  Behavioral Analytics
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-balance leading-[1.1]">
                <span className="block text-foreground">Gut</span>
                <span className="block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  Instinct
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-lg">
                Track your intuition. Measure the truth.
              </p>
            </div>
            
            <p className="text-muted-foreground/80 leading-relaxed max-w-md text-base">
              Log your feelings before and after lottery outcomes to reveal whether 
              your gut instinct is signal or noise. No predictions. No advice. Just patterns.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 text-base font-medium"
              >
                Try the Demo
                <ArrowRight className="ml-2.5 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 border-border/60 bg-secondary/30 hover:bg-secondary/50 hover:border-border transition-all duration-300 text-base"
              >
                Log a Ticket
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground/60">No predictions</span>
              </div>
              <div className="w-px h-4 bg-border/50" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/60" />
                <span className="text-xs text-muted-foreground/60">No advice</span>
              </div>
              <div className="w-px h-4 bg-border/50" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/40" />
                <span className="text-xs text-muted-foreground/60">Just patterns</span>
              </div>
            </div>
          </div>
          
          {/* Right: Premium product mockup */}
          <div className="relative">
            {/* Glow backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-[2rem] blur-2xl opacity-60" />
            
            <div className="relative glass-card-elevated rounded-2xl p-1">
              <div className="rounded-xl bg-card/80 p-6 space-y-5">
                {/* Window chrome */}
                <div className="flex items-center justify-between pb-4 border-b border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/50" />
                      <div className="w-3 h-3 rounded-full bg-accent/50" />
                      <div className="w-3 h-3 rounded-full bg-success/50" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium ml-2">Dashboard Preview</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Live</span>
                  </div>
                </div>
                
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "24", label: "Tickets", color: "text-foreground" },
                    { value: "67%", label: "Calibration", color: "text-primary" },
                    { value: "+$42", label: "Net", color: "text-accent" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-secondary/40 rounded-xl p-4 text-center border border-border/20">
                      <p className={`text-2xl font-semibold ${stat.color} tabular-nums`}>{stat.value}</p>
                      <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
                
                {/* Mini chart */}
                <div className="bg-secondary/30 rounded-xl p-5 border border-border/20">
                  <div className="flex items-end justify-between h-20 gap-1.5">
                    {[35, 60, 25, 75, 50, 85, 40, 65, 55, 80, 45, 70].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-primary/30 via-primary/60 to-primary rounded-t transition-all duration-500 hover:from-primary/50 hover:to-primary"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/20">
                    <BarChart3 className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] text-muted-foreground">Confidence vs Outcome Trend</span>
                  </div>
                </div>
                
                {/* Slider preview */}
                <div className="space-y-3 bg-secondary/20 rounded-xl p-5 border border-border/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-[11px] text-muted-foreground">Pre-Result Confidence</span>
                    </div>
                    <span className="text-xs font-mono text-primary">75%</span>
                  </div>
                  <div className="relative h-2 bg-secondary/60 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-primary/70 to-primary rounded-full" />
                    <div className="absolute top-1/2 -translate-y-1/2 left-[75%] -translate-x-1/2 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/40 border-2 border-background" />
                  </div>
                </div>
                
                {/* Mini map preview */}
                <div className="bg-secondary/20 rounded-xl p-4 relative overflow-hidden border border-border/20">
                  <div className="absolute inset-0 opacity-10">
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                      <path d="M5,25 Q25,5 45,20 T85,25" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-border" />
                      <path d="M10,40 Q35,30 55,40 T95,35" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-border" />
                    </svg>
                  </div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[11px] text-muted-foreground">Location Patterns</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/30 animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-accent/70" />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
