"use client";

import { MapPin, TrendingUp, TrendingDown, Info } from "lucide-react";

// Mock location data
const locations = [
  { id: 1, name: "Downtown Mart", x: 65, y: 35, wins: 8, losses: 3, net: 45 },
  { id: 2, name: "Eastside Convenience", x: 78, y: 48, wins: 12, losses: 5, net: 87 },
  { id: 3, name: "Corner Shop", x: 42, y: 55, wins: 2, losses: 8, net: -34 },
  { id: 4, name: "Lucky Gas Station", x: 55, y: 28, wins: 6, losses: 4, net: 22 },
  { id: 5, name: "West End Store", x: 25, y: 42, wins: 3, losses: 9, net: -52 },
  { id: 6, name: "Central Kiosk", x: 50, y: 62, wins: 5, losses: 5, net: 12 },
  { id: 7, name: "Northside Deli", x: 38, y: 22, wins: 4, losses: 6, net: -8 },
  { id: 8, name: "Suburban Quick Stop", x: 82, y: 68, wins: 9, losses: 4, net: 63 },
];

function getPinColor(net: number) {
  if (net > 30) return "bg-primary shadow-primary/30";
  if (net > 0) return "bg-primary/60 shadow-primary/20";
  if (net > -20) return "bg-muted-foreground shadow-muted-foreground/20";
  return "bg-destructive/70 shadow-destructive/20";
}

function getPinSize(wins: number) {
  if (wins >= 10) return "w-5 h-5";
  if (wins >= 5) return "w-4 h-4";
  return "w-3 h-3";
}

export function LocationMap() {
  return (
    <section id="map" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Location Patterns
          </p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-balance">
            Where intuition meets geography
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            A behavioral trend map of your ticket purchases—not gambling advice.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-6 lg:p-8">
            {/* Map Area */}
            <div className="relative aspect-[16/10] bg-secondary/10 rounded-xl overflow-hidden mb-6">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" className="text-border">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Stylized roads/paths */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 Q30,30 50,50 T100,50" stroke="hsl(var(--border))" strokeWidth="0.3" fill="none" />
                <path d="M50,0 Q60,30 50,50 T50,100" stroke="hsl(var(--border))" strokeWidth="0.3" fill="none" />
                <path d="M20,20 Q40,40 60,30 T90,60" stroke="hsl(var(--border))" strokeWidth="0.2" fill="none" />
                <path d="M10,70 Q30,60 50,70 T80,55" stroke="hsl(var(--border))" strokeWidth="0.2" fill="none" />
              </svg>
              
              {/* Heatmap-style background gradients */}
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-destructive/10 rounded-full blur-3xl" />
              
              {/* Location pins */}
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="absolute group cursor-pointer"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={`${getPinSize(loc.wins)} ${getPinColor(loc.net)} rounded-full shadow-lg transition-all duration-300 group-hover:scale-150`} />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                    <div className="bg-popover border border-border rounded-lg p-3 shadow-xl min-w-40">
                      <p className="text-sm font-medium text-foreground mb-1">{loc.name}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-primary flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {loc.wins} wins
                        </span>
                        <span className="text-destructive/70 flex items-center gap-1">
                          <TrendingDown className="w-3 h-3" />
                          {loc.losses} losses
                        </span>
                      </div>
                      <p className={`text-xs mt-1 ${loc.net >= 0 ? 'text-primary' : 'text-destructive/70'}`}>
                        Net: {loc.net >= 0 ? '+' : ''}{loc.net}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Map label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span>Your Purchase Locations</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/30" />
                <span className="text-muted-foreground">Strong positive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/60 shadow-lg shadow-primary/20" />
                <span className="text-muted-foreground">Slight positive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground shadow-lg shadow-muted-foreground/20" />
                <span className="text-muted-foreground">Neutral</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/70 shadow-lg shadow-destructive/20" />
                <span className="text-muted-foreground">Negative</span>
              </div>
            </div>
            
            {/* Disclaimer */}
            <div className="mt-6 flex items-start gap-3 p-4 bg-secondary/20 rounded-xl">
              <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                This map shows historical purchase patterns and outcomes. Location patterns may be 
                coincidental and do not indicate future results. This is behavioral analytics, not gambling advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
