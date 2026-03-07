"use client";

import { useState, useEffect } from "react";
import { X, Calendar, MapPin, DollarSign, Sparkles, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LogTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SliderProps {
  label: string;
  sublabel?: string;
  value: number;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
  color?: "primary" | "accent";
}

function PremiumSlider({ 
  label, 
  sublabel,
  value, 
  onChange, 
  leftLabel = "Low", 
  rightLabel = "High",
  color = "primary"
}: SliderProps) {
  const gradientColor = color === "primary" 
    ? "from-primary/80 to-primary"
    : "from-accent/80 to-accent";
  const thumbColor = color === "primary" ? "bg-primary" : "bg-accent";
  const glowColor = color === "primary" ? "shadow-primary/50" : "shadow-accent/50";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-foreground">{label}</label>
          {sublabel && (
            <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
          )}
        </div>
        <span className={cn(
          "text-sm font-mono font-medium px-2.5 py-1 rounded-lg",
          color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
        )}>
          {value}%
        </span>
      </div>
      
      <div className="relative h-10 flex items-center">
        {/* Track background */}
        <div className="absolute inset-x-0 h-2 bg-secondary/50 rounded-full" />
        
        {/* Filled track */}
        <div 
          className={cn("absolute h-2 rounded-full bg-gradient-to-r", gradientColor)}
          style={{ width: `${value}%`, left: 0 }}
        />
        
        {/* Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-x-0 w-full h-10 opacity-0 cursor-pointer z-10"
        />
        
        {/* Custom thumb */}
        <div 
          className={cn(
            "absolute w-5 h-5 rounded-full border-2 border-background",
            thumbColor,
            "shadow-lg",
            glowColor,
            "transition-transform hover:scale-110 pointer-events-none"
          )}
          style={{ left: `calc(${value}% - 10px)` }}
        />
      </div>
      
      <div className="flex justify-between">
        <span className="text-xs text-muted-foreground">{leftLabel}</span>
        <span className="text-xs text-muted-foreground">{rightLabel}</span>
      </div>
    </div>
  );
}

export function LogTicketModal({ open, onOpenChange }: LogTicketModalProps) {
  const [step, setStep] = useState(1);
  const [ticketType, setTicketType] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  
  // Pre-result intuition
  const [confidence, setConfidence] = useState(50);
  const [excitement, setExcitement] = useState(50);
  const [feelsDifferent, setFeelsDifferent] = useState(50);
  
  // Post-result
  const [amountWon, setAmountWon] = useState("");
  const [postSatisfaction, setPostSatisfaction] = useState(50);
  const [wasRight, setWasRight] = useState(50);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setTicketType("");
        setCost("");
        setDate("");
        setLocation("");
        setConfidence(50);
        setExcitement(50);
        setFeelsDifferent(50);
        setAmountWon("");
        setPostSatisfaction(50);
        setWasRight(50);
      }, 300);
    }
  }, [open]);

  const ticketTypes = [
    { value: "scratch", label: "Scratch-off", emoji: "🎫" },
    { value: "powerball", label: "Powerball", emoji: "🔴" },
    { value: "mega", label: "Mega Millions", emoji: "💰" },
    { value: "daily", label: "Daily Numbers", emoji: "🔢" },
    { value: "pick3", label: "Pick 3", emoji: "3️⃣" },
    { value: "other", label: "Other", emoji: "🎲" },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Modal */}
      <div className="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg max-h-[calc(100vh-2rem)] overflow-hidden">
        <div className="bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col max-h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border/30">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Log New Ticket</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Step {step} of 3</p>
            </div>
            <button 
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 rounded-lg bg-secondary/50 hover:bg-secondary flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="h-1 bg-secondary/30">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* Step 1: Ticket Details */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">Ticket Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {ticketTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setTicketType(type.value)}
                        className={cn(
                          "p-3 rounded-xl border text-center transition-all",
                          ticketType === type.value 
                            ? "border-primary bg-primary/10 ring-1 ring-primary/50" 
                            : "border-border/50 hover:border-border hover:bg-secondary/20"
                        )}
                      >
                        <span className="text-xl mb-1 block">{type.emoji}</span>
                        <span className="text-xs text-foreground">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Cost</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="number"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-11 pl-9 pr-4 bg-secondary/30 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full h-11 pl-9 pr-4 bg-secondary/30 border border-border/40 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Location <span className="text-muted-foreground font-normal">(optional)</span></label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Store name or area"
                      className="w-full h-11 pl-9 pr-4 bg-secondary/30 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Pre-Result Intuition */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                  <p className="text-sm text-foreground">
                    Record how you feel <strong>before</strong> knowing the result
                  </p>
                </div>
                
                <PremiumSlider
                  label="Confidence Level"
                  sublabel="How certain are you about winning?"
                  value={confidence}
                  onChange={setConfidence}
                  leftLabel="Very uncertain"
                  rightLabel="Very confident"
                  color="primary"
                />
                
                <PremiumSlider
                  label="Excitement Level"
                  sublabel="How excited do you feel right now?"
                  value={excitement}
                  onChange={setExcitement}
                  leftLabel="Calm & neutral"
                  rightLabel="Very excited"
                  color="primary"
                />
                
                <PremiumSlider
                  label="This Feels Different"
                  sublabel="Does this ticket feel special somehow?"
                  value={feelsDifferent}
                  onChange={setFeelsDifferent}
                  leftLabel="Same as always"
                  rightLabel="Something special"
                  color="accent"
                />
              </div>
            )}
            
            {/* Step 3: Post-Result */}
            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  <p className="text-sm text-foreground">
                    Now record the outcome and how you feel <strong>after</strong>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Amount Won</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      value={amountWon}
                      onChange={(e) => setAmountWon(e.target.value)}
                      placeholder="0.00"
                      className="w-full h-12 pl-9 pr-4 bg-secondary/30 border border-border/40 rounded-xl text-foreground text-lg placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Enter 0 if you didn&apos;t win anything</p>
                </div>
                
                <PremiumSlider
                  label="Post-Result Satisfaction"
                  sublabel="How do you feel about the outcome?"
                  value={postSatisfaction}
                  onChange={setPostSatisfaction}
                  leftLabel="Disappointed"
                  rightLabel="Very satisfied"
                  color="accent"
                />
                
                <PremiumSlider
                  label="Was Your Gut Right?"
                  sublabel="Looking back, was your intuition accurate?"
                  value={wasRight}
                  onChange={setWasRight}
                  leftLabel="Completely wrong"
                  rightLabel="Spot on"
                  color="accent"
                />
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="p-5 border-t border-border/30 bg-secondary/10">
            <div className="flex items-center justify-between">
              {step > 1 ? (
                <Button 
                  variant="ghost" 
                  onClick={() => setStep(step - 1)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Back
                </Button>
              ) : (
                <div />
              )}
              
              {step < 3 ? (
                <Button 
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && (!ticketType || !cost)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  onClick={() => onOpenChange(false)}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground gap-2 shadow-lg"
                >
                  <Check className="w-4 h-4" />
                  Save Ticket
                </Button>
              )}
            </div>
            
            {/* Skip post-result option */}
            {step === 3 && (
              <p className="text-center text-xs text-muted-foreground mt-3">
                Don&apos;t know the result yet? <button className="text-primary hover:underline" onClick={() => onOpenChange(false)}>Save and add later</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
