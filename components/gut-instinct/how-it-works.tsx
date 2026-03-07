"use client";

import { Ticket, Sliders, LineChart } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Ticket,
    title: "Log Ticket Details",
    description: "Record the basics—ticket type, cost, date, and location. Build a foundation for pattern analysis."
  },
  {
    number: "02",
    icon: Sliders,
    title: "Capture Pre-Result Intuition",
    description: "Before the outcome, rate your confidence, excitement, and whether 'this one feels different.' Lock in your gut feeling."
  },
  {
    number: "03",
    icon: LineChart,
    title: "Record & Analyze",
    description: "After the result, log the outcome and your post-result feelings. Watch your personal patterns emerge over time."
  }
];

export function HowItWorks() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-balance">
            Three simple steps
          </h2>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent hidden lg:block" />
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-8 h-full relative z-10 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-serif text-primary/30">{step.number}</span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Dot connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-3 h-3 rounded-full bg-primary/40 border-2 border-background z-20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
