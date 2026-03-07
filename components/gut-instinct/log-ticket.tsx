"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, Sparkles } from "lucide-react";

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
}

function CustomSlider({ label, value, onChange, leftLabel = "Low", rightLabel = "High" }: SliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm text-primary font-mono">{value}%</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-secondary/40 rounded-full appearance-none cursor-pointer 
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:w-5 
                     [&::-webkit-slider-thumb]:h-5 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-primary 
                     [&::-webkit-slider-thumb]:shadow-lg
                     [&::-webkit-slider-thumb]:shadow-primary/30
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:transition-transform
                     [&::-webkit-slider-thumb]:hover:scale-110
                     [&::-moz-range-thumb]:w-5 
                     [&::-moz-range-thumb]:h-5 
                     [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:bg-primary 
                     [&::-moz-range-thumb]:border-0
                     [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${value}%, hsl(var(--secondary) / 0.4) ${value}%, hsl(var(--secondary) / 0.4) 100%)`
          }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-xs text-muted-foreground">{leftLabel}</span>
        <span className="text-xs text-muted-foreground">{rightLabel}</span>
      </div>
    </div>
  );
}

export function LogTicket() {
  const [ticketType, setTicketType] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [expectedOutcome, setExpectedOutcome] = useState("");
  
  // Pre-result sliders
  const [confidence, setConfidence] = useState(50);
  const [excitement, setExcitement] = useState(50);
  const [feelsDifferent, setFeelsDifferent] = useState(50);
  
  // Post-result
  const [amountWon, setAmountWon] = useState("");
  const [postConfidence, setPostConfidence] = useState(50);
  const [postExcitement, setPostExcitement] = useState(50);
  const [postFeelsDifferent, setPostFeelsDifferent] = useState(50);
  
  const [showPostResult, setShowPostResult] = useState(false);

  return (
    <section id="log-ticket" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Log Ticket
          </p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-balance">
            Capture your intuition
          </h2>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-8 space-y-8">
            {/* Ticket Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">1</span>
                Ticket Details
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Ticket Type</label>
                  <select
                    value={ticketType}
                    onChange={(e) => setTicketType(e.target.value)}
                    className="w-full h-11 px-4 bg-secondary/30 border border-border/30 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select type...</option>
                    <option value="powerball">Powerball</option>
                    <option value="megamillions">Mega Millions</option>
                    <option value="scratch">Scratch-off</option>
                    <option value="daily">Daily Numbers</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Cost</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      placeholder="0.00"
                      className="w-full h-11 pl-10 pr-4 bg-secondary/30 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 bg-secondary/30 border border-border/30 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Location (optional)</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Store or area"
                      className="w-full h-11 pl-10 pr-4 bg-secondary/30 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Expected Outcome (optional)</label>
                <input
                  type="text"
                  value={expectedOutcome}
                  onChange={(e) => setExpectedOutcome(e.target.value)}
                  placeholder="What do you think you'll win?"
                  className="w-full h-11 px-4 bg-secondary/30 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
            
            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            
            {/* Pre-Result Intuition */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">2</span>
                Pre-Result Intuition
                <Sparkles className="w-4 h-4 text-accent ml-1" />
              </h3>
              
              <div className="space-y-6 bg-secondary/10 rounded-xl p-6">
                <CustomSlider
                  label="Confidence"
                  value={confidence}
                  onChange={setConfidence}
                  leftLabel="Uncertain"
                  rightLabel="Very Confident"
                />
                
                <CustomSlider
                  label="Excitement"
                  value={excitement}
                  onChange={setExcitement}
                  leftLabel="Calm"
                  rightLabel="Thrilled"
                />
                
                <CustomSlider
                  label="This Feels Different"
                  value={feelsDifferent}
                  onChange={setFeelsDifferent}
                  leftLabel="Same as usual"
                  rightLabel="Something special"
                />
              </div>
            </div>
            
            {/* Toggle Post-Result */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowPostResult(!showPostResult)}
                className="border-border/50 hover:border-primary/50"
              >
                {showPostResult ? "Hide Post-Result Section" : "Add Post-Result Data"}
              </Button>
            </div>
            
            {/* Post-Result Section */}
            {showPostResult && (
              <>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-xs text-accent">3</span>
                    Post-Result Reflection
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Amount Won</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="number"
                        value={amountWon}
                        onChange={(e) => setAmountWon(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-11 pl-10 pr-4 bg-secondary/30 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6 bg-accent/5 rounded-xl p-6">
                    <CustomSlider
                      label="Post-Result Confidence"
                      value={postConfidence}
                      onChange={setPostConfidence}
                      leftLabel="I was wrong"
                      rightLabel="I was right"
                    />
                    
                    <CustomSlider
                      label="Post-Result Excitement"
                      value={postExcitement}
                      onChange={setPostExcitement}
                      leftLabel="Disappointed"
                      rightLabel="Elated"
                    />
                    
                    <CustomSlider
                      label="It Really Was Different"
                      value={postFeelsDifferent}
                      onChange={setPostFeelsDifferent}
                      leftLabel="Just like others"
                      rightLabel="Truly unique"
                    />
                  </div>
                </div>
              </>
            )}
            
            {/* Save Button */}
            <Button 
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium transition-all duration-300"
            >
              Save Ticket Entry
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
