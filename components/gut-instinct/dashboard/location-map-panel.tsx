"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Info, Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterType = "all" | "positive" | "negative";

interface Ticket {
  id: string;
  location?: string;
  latitude?: number | null;
  longitude?: number | null;
  cost: number;
  amountWon: number;
  confidence: number;
}

interface LocationPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  wins: number;
  losses: number;
  totalSpent: number;
  totalWon: number;
  avgConfidence: number;
}

function hashStringToPercent(str: string, min: number, max: number) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const normalized = Math.abs(hash % 1000) / 1000;
  return min + normalized * (max - min);
}

function coordsToPercent(latitude?: number | null, longitude?: number | null) {
  if (typeof latitude === "number" && typeof longitude === "number") {
    const x = ((longitude + 180) / 360) * 100;
    const y = ((90 - latitude) / 180) * 100;
    return {
      x: Math.max(8, Math.min(92, x)),
      y: Math.max(12, Math.min(88, y)),
    };
  }
  return null;
}

function getNetIncome(loc: LocationPoint) {
  return loc.totalWon - loc.totalSpent;
}

function getPinStyles(net: number) {
  if (net > 20) {
    return {
      color: "bg-success",
      ring: "ring-success/30",
      glow: "shadow-success/30",
    };
  }
  if (net > 0) {
    return {
      color: "bg-primary",
      ring: "ring-primary/30",
      glow: "shadow-primary/30",
    };
  }
  if (net === 0) {
    return {
      color: "bg-muted-foreground",
      ring: "ring-muted-foreground/30",
      glow: "shadow-muted-foreground/20",
    };
  }
  return {
    color: "bg-destructive/80",
    ring: "ring-destructive/30",
    glow: "shadow-destructive/30",
  };
}

function getPinSize(totalTickets: number) {
  if (totalTickets >= 5) return "w-5 h-5";
  if (totalTickets >= 3) return "w-4 h-4";
  return "w-3.5 h-3.5";
}

export function LocationMapPanel() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gut_tickets") || "[]");
    setTickets(stored);
  }, []);

  const locations = useMemo(() => {
    const grouped = new Map<
      string,
      {
        id: string;
        name: string;
        x: number;
        y: number;
        wins: number;
        losses: number;
        totalSpent: number;
        totalWon: number;
        confidenceValues: number[];
      }
    >();

    tickets.forEach((ticket: Ticket, index) => {
      const name = (ticket.location || "Unknown location").trim();
      const id = `${name}-${index}`;
      const fromCoords = coordsToPercent(ticket.latitude, ticket.longitude);

      const x = fromCoords?.x ?? hashStringToPercent(name + "-x", 12, 88);
      const y = fromCoords?.y ?? hashStringToPercent(name + "-y", 18, 82);

      const key = typeof ticket.latitude === "number" && typeof ticket.longitude === "number"
        ? `${ticket.latitude.toFixed(3)},${ticket.longitude.toFixed(3)}`
        : name.toLowerCase();

      const current = grouped.get(key) || {
        id,
        name,
        x,
        y,
        wins: 0,
        losses: 0,
        totalSpent: 0,
        totalWon: 0,
        confidenceValues: [],
      };

      const net = Number(ticket.amountWon || 0) - Number(ticket.cost || 0);

      current.totalSpent += Number(ticket.cost || 0);
      current.totalWon += Number(ticket.amountWon || 0);
      current.confidenceValues.push(Number(ticket.confidence || 0));

      if (net > 0) current.wins += 1;
      else current.losses += 1;

      grouped.set(key, current);
    });

    return Array.from(grouped.values()).map((loc) => ({
      id: loc.id,
      name: loc.name,
      x: loc.x,
      y: loc.y,
      wins: loc.wins,
      losses: loc.losses,
      totalSpent: Math.round(loc.totalSpent),
      totalWon: Math.round(loc.totalWon),
      avgConfidence: loc.confidenceValues.length
        ? Math.round(
            loc.confidenceValues.reduce((a, b) => a + b, 0) / loc.confidenceValues.length
          )
        : 0,
    }));
  }, [tickets]);

  const filteredLocations = useMemo(() => {
    if (filter === "all") return locations;
    return locations.filter((loc) => {
      const net = getNetIncome(loc);
      return filter === "positive" ? net > 0 : net < 0;
    });
  }, [locations, filter]);

  const totalStats = useMemo(() => {
    const totalWon = locations.reduce((sum, loc) => sum + loc.totalWon, 0);
    const totalSpent = locations.reduce((sum, loc) => sum + loc.totalSpent, 0);
    const bestLocation =
      [...locations].sort((a, b) => getNetIncome(b) - getNetIncome(a))[0] || {
        name: "None",
      };

    return {
      locations: locations.length,
      totalWon,
      totalSpent,
      bestLocation,
    };
  }, [locations]);

  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-border/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-foreground">Location Patterns</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Purchase locations from your logged tickets
            </p>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 border-border/50 gap-2">
                  <Filter className="w-3.5 h-3.5" />
                  {filter === "all"
                    ? "All Locations"
                    : filter === "positive"
                    ? "Positive Only"
                    : "Negative Only"}
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
            <p className="text-xl font-semibold text-primary tabular-nums truncate">
              {totalStats.bestLocation.name}
            </p>
            <p className="text-xs text-muted-foreground">Best Location</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="relative aspect-[2/1] lg:aspect-[3/1] bg-secondary/10 rounded-xl overflow-hidden">
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

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,35 50,50 T100,50" stroke="hsl(var(--border))" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M50,0 Q55,25 50,50 T50,100" stroke="hsl(var(--border))" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M15,25 Q35,35 55,25 T85,45" stroke="hsl(var(--border))" strokeWidth="0.25" fill="none" opacity="0.3" />
            <path d="M10,65 Q30,55 50,65 T90,50" stroke="hsl(var(--border))" strokeWidth="0.25" fill="none" opacity="0.3" />
          </svg>

          <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-success/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-destructive/10 rounded-full blur-3xl" />

          {filteredLocations.map((loc) => {
            const net = getNetIncome(loc);
            const pinStyles = getPinStyles(net);
            const isHovered = hoveredLocation === loc.id;
            const totalTickets = loc.wins + loc.losses;

            return (
              <div
                key={loc.id}
                className="absolute cursor-pointer"
                style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%, -50%)" }}
                onMouseEnter={() => setHoveredLocation(loc.id)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {isHovered && (
                  <div
                    className={cn("absolute inset-0 rounded-full animate-ping", pinStyles.color, "opacity-30")}
                    style={{ animationDuration: "1s" }}
                  />
                )}

                <div
                  className={cn(
                    getPinSize(totalTickets),
                    pinStyles.color,
                    "rounded-full ring-2 shadow-lg transition-transform duration-200",
                    pinStyles.ring,
                    pinStyles.glow,
                    isHovered && "scale-150"
                  )}
                />

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
                        <span
                          className={cn(
                            "text-sm font-semibold",
                            net > 0
                              ? "text-success"
                              : net < 0
                              ? "text-destructive/80"
                              : "text-muted-foreground"
                          )}
                        >
                          {net > 0 ? "+" : ""}
                          {net === 0 ? "±$0" : `$${net}`}
                        </span>
                      </div>

                      <div className="mt-2 pt-2 border-t border-border/30">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Avg Confidence</span>
                          <span className="text-foreground font-medium">{loc.avgConfidence}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                      <div className="border-8 border-transparent border-t-popover/95" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-muted-foreground bg-background/50 backdrop-blur-sm px-2 py-1 rounded-md">
            <MapPin className="w-3 h-3" />
            <span>{filteredLocations.length} purchase locations</span>
          </div>
        </div>

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