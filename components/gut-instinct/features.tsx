"use client";

import { Heart, BarChart2, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Log the Feeling",
    description: "Capture your emotional state before each ticket—confidence, excitement, and that ineffable sense of 'something different.'"
  },
  {
    icon: BarChart2,
    title: "Compare Expectation vs Reality",
    description: "See how your predictions align with actual outcomes. Track the delta between what you felt and what happened."
  },
  {
    icon: TrendingUp,
    title: "See Your Personal Patterns",
    description: "Discover trends in your intuition over time. Learn when your gut is calibrated and when it's misleading you."
  }
];

export function Features() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            What It Is
          </p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-balance">
            A mirror for your intuition
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-8 h-full transition-all duration-300 hover:border-border/60 hover:shadow-xl hover:shadow-primary/5">
                <div className="w-14 h-14 rounded-xl bg-secondary/50 flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
