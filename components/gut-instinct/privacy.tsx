"use client";

import { Shield, Eye, Users, Bell, Lock } from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "No Predictions",
    description: "We analyze patterns, never forecast outcomes"
  },
  {
    icon: Shield,
    title: "No Recommendations",
    description: "Your data informs you, not us"
  },
  {
    icon: Users,
    title: "No Social Feed",
    description: "This is private reflection, not public performance"
  },
  {
    icon: Bell,
    title: "No Pressure to Play",
    description: "We never encourage more purchases"
  },
  {
    icon: Lock,
    title: "Private by Design",
    description: "Your data stays yours, always"
  },
];

export function Privacy() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Our Philosophy
          </p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-balance mb-6">
            Private by design
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-16">
            Gut Instinct is a tool for self-reflection, not a gambling platform. 
            We built it with principles that prioritize your wellbeing.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {principles.map((principle, index) => (
              <div 
                key={index}
                className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 text-center transition-all duration-300 hover:border-primary/30 hover:bg-card/50"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
