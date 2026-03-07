"use client";

import { useState } from "react";
import { MapPin, TrendingUp, TrendingDown, Info, Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Enhanced mock location data
const locations = [
  { id: 1, name: "Downtown Mart", x: 62, y: 32, wins: 8, losses: 3, totalSpent: 85, totalWon: 130, avgConfidence: 72 },
  { id: 2, name: "Eastside Convenience", x: 78, y: 45, wins: 12, losses: 5, totalSpent: 142, totalWon: 229, avgConfidence: 68 },
  { id: 3, name: "Corner Shop", x: 38, y: 52, wins: 2, losses: 8, totalSpent: 78, totalWon: 44, avgConfidence: 81 },
  { id: 4, name: "Lucky Gas Station", x: 52, y: 25, wins: 6, losses: 4, totalSpent: 65, totalWon: 87, avgConfidence: 59 },
  { id: 5, name: "West End Store", x: 22, y: 40, wins: 3, losses: 9, totalSpent: 96, totalWon: 44, avgConfidence: 77 },
  { id: 6, name: "Central Kiosk", x: 48, y: 58, wins: 5, losses: 5, totalSpent: 55, totalWon: 67, avgConfidence: 65 },
  { id: 7, name: "Northside Deli", x: 35, y: 20, wins: 4, losses: 6, totalSpent: 72, totalWon: 64, avgConfidence: 70 },
  { id: 8, name: "Suburban Quick Stop", x: 82, y: 65, wins: 9, losses: 4, totalSpent: 98, totalWon: 161, avgConfidence: 62 },
];

function getNetIncome(loc: typeof locations[0]) {
  return loc.totalWon - loc.totalSpent;
}

function getPinStyles(net: number) {
  if (net > 50) return { color: "bg-success", ring: "ring-success/30", glow: "shadow-success/40" };
  if (net > 0) return { color: "bg-primary", ring: "ring-primary/30", glow: "shadow-primary/40" };
  if (net > -30) return { color: "bg-muted-foreground", ring: "ring-muted-foreground/30", glow: "shadow-muted-foreground/40" };
  return { color: "bg-destructive/80", ring: "ring-destructive/30", glow: "shadow-destructive/40" };
}

function getPinSize(totalTickets: number) {
  if (totalTickets >= 15) return "w-5 h-5";
  if (totalTickets >= 8) return "w-4 h-4";
  return "w-3 h-3";
}

export function LocationMapPanel() {
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "positive" | "negative">("all");

  const filteredLocations = locations.filter(loc => {
    const net = getNetIncome(loc);
    if (filter === "positive") return net > 0;
    if (filter === "negative") return net < 0;
    return true;
  });

  const totalStats = {
    locations: locations.length,
    totalWon: locations.reduce((sum, loc) => sum + loc.totalWon, 0),
    totalSpent: locations.reduce((sum, loc) => sum + loc.totalSpent, 0),
    bestLocation: locations.reduce((best, loc) => 
      getNetIncome(loc) > getNetIncome(best) ? loc : best
    , locations[0])
  };

  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Location Patterns</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Geographic analysis of your purchase history</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-border/50 gap-2">
                  <Filter className="w-3.5 h-3.5" />
                  {filter === "all" ? "All Locations" : filter === "positive" ? "Positive Only" : "Negative Only"}
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>All Locations</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("positive")}>Positive Only</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("negative")}>Negative Only</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-secondary/20 rounded-xl p-3 text-center">
            <p className="text-xl font-semibold text-foreground tabular-nums">{totalStats.locations}</p>
            <p className="text-xs text-muted-foreground">Locations</p>
          </div>
          <div className="bg-secondary/20 rounded-xl p-3 text-center">
            <p className="text-xl font-semibold text-success tabular-nums">${totalStats.totalWon}</p>
            <p className="text-xs text-muted-foreground">Total Won</p>
          </div>
          <div className="bg-secondary/20 rounded-xl p-3 text-center">
            <p className="text-xl font-semibold text-foreground tabular-nums">${totalStats.totalSpent}</p>
            <p className="text-xs text-muted-foreground">Total Spent</p>
          </div>
          <div className="bg-secondary/20 rounded-xl p-3 text-center">
            <p className="text-xl font-semibold text-primary tabular-nums truncate">{totalStats.bestLocation.name.split(" ")[0]}</p>
            <p className="text-xs text-muted-foreground">Best Location</p>
          </div>
        </div>
      </div>
      
      {/* Map Area */}
      <div className="p-6">
        <div className="relative aspect-[2/1] lg:aspect-[3/1] bg-secondary/10 rounded-xl overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="text-border">
              <defs>
                <pattern id="dashboardGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dashboardGrid)" />
            </svg>
          </div>
          
          {/* Abstract road network */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,35 50,50 T100,50" stroke="hsl(var(--border))" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M50,0 Q55,25 50,50 T50,100" stroke="hsl(var(--border))" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M15,25 Q35,35 55,25 T85,45" stroke="hsl(var(--border))" strokeWidth="0.25" fill="none" opacity="0.3" />
            <path d="M10,65 Q30,55 50,65 T90,50" stroke="hsl(var(--border))" strokeWidth="0.25" fill="none" opacity="0.3" />
          </svg>
          
          {/* Heatmap glows */}
          <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-success/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-destructive/10 rounded-full blur-3xl" />
          
          {/* Location pins */}
          {filteredLocations.map((loc) => {
            const net = getNetIncome(loc);
            const pinStyles = getPinStyles(net);
            const isHovered = hoveredLocation === loc.id;
            const totalTickets = loc.wins + loc.losses;
            
            return (
              <div
                key={loc.id}
                className="absolute cursor-pointer"
                style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setHoveredLocation(loc.id)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {/* Pulse ring on hover */}
                {isHovered && (
                  <div className={cn(
                    "absolute inset-0 rounded-full animate-ping",
                    pinStyles.color,
                    "opacity-30"
                  )} style={{ animationDuration: "1s" }} />
                )}
                
                {/* Pin */}
                <div className={cn(
                  getPinSize(totalTickets),
                  pinStyles.color,
                  "rounded-full ring-2",
                  pinStyles.ring,
                  "shadow-lg",
                  pinStyles.glow,
                  "transition-transform duration-200",
                  isHovered && "scale-150"
                )} />
                
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="bg-popover/95 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-2xl min-w-56">
                      <p className="font-medium text-foreground mb-2">{loc.name}</p>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Wins:</span>
                          <span className="ml-1 text-success font-medium">{loc.wins}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Losses:</span>
                          <span className="ml-1 text-destructive/70 font-medium">{loc.losses}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Spent:</span>
                          <span className="ml-1 text-foreground">${loc.totalSpent}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Won:</span>
                          <span className="ml-1 text-foreground">${loc.totalWon}</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-border/30 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Net Income</span>
                        <span className={cn(
                          "text-sm font-semibold",
                          net > 0 ? "text-success" : net < 0 ? "text-destructive/80" : "text-muted-foreground"
                        )}>
                          {net > 0 ? "+" : ""}{net === 0 ? "±" : ""}{net !== 0 ? `$${net}` : "$0"}
                        </span>
                      </div>
                      
                      <div className="mt-2 pt-2 border-t border-border/30">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Avg Confidence</span>
                          <span className="text-foreground font-medium">{loc.avgConfidence}%</span>
                        </div>
                      </div>
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                      <div className="border-8 border-transparent border-t-popover/95" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Corner label */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-muted-foreground bg-background/50 backdrop-blur-sm px-2 py-1 rounded-md">
            <MapPin className="w-3 h-3" />
            <span>{filteredLocations.length} purchase locations</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success shadow-lg shadow-success/30" />
            <span className="text-muted-foreground">Strong positive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/30" />
            <span className="text-muted-foreground">Slight positive</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted-foreground shadow-lg shadow-muted-foreground/30" />
            <span className="text-muted-foreground">Neutral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/80 shadow-lg shadow-destructive/30" />
            <span className="text-muted-foreground">Negative</span>
          </div>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="px-6 pb-6">
        <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-xl">
          <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            This map visualizes historical purchase patterns and outcomes for behavioral analysis only. 
            Location patterns may be coincidental and do not predict future results.
          </p>
        </div>
      </div>
    </div>
  );
}
