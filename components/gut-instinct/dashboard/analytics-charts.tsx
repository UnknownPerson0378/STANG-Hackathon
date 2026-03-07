"use client";

import { useState } from "react";
import { Info, ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Enhanced mock data
const confidenceVsOutcome = [
  { name: "W1", confidence: 65, outcome: 40, tickets: 5 },
  { name: "W2", confidence: 80, outcome: 25, tickets: 7 },
  { name: "W3", confidence: 45, outcome: 55, tickets: 4 },
  { name: "W4", confidence: 90, outcome: 35, tickets: 8 },
  { name: "W5", confidence: 55, outcome: 60, tickets: 3 },
  { name: "W6", confidence: 70, outcome: 45, tickets: 6 },
  { name: "W7", confidence: 85, outcome: 50, tickets: 5 },
  { name: "W8", confidence: 60, outcome: 65, tickets: 4 },
  { name: "W9", confidence: 75, outcome: 55, tickets: 6 },
  { name: "W10", confidence: 68, outcome: 58, tickets: 5 },
];

const expectationVsReality = [
  { name: "Jan", expected: 40, actual: 25, gap: -15 },
  { name: "Feb", expected: 55, actual: 60, gap: 5 },
  { name: "Mar", expected: 70, actual: 45, gap: -25 },
  { name: "Apr", expected: 30, actual: 50, gap: 20 },
  { name: "May", expected: 80, actual: 35, gap: -45 },
  { name: "Jun", expected: 45, actual: 55, gap: 10 },
  { name: "Jul", expected: 60, actual: 52, gap: -8 },
  { name: "Aug", expected: 55, actual: 58, gap: 3 },
];

const emotionalDelta = [
  { name: "T1", delta: 15, type: "scratch" },
  { name: "T2", delta: -25, type: "powerball" },
  { name: "T3", delta: 40, type: "scratch" },
  { name: "T4", delta: -10, type: "daily" },
  { name: "T5", delta: 5, type: "scratch" },
  { name: "T6", delta: -30, type: "mega" },
  { name: "T7", delta: 20, type: "scratch" },
  { name: "T8", delta: -15, type: "daily" },
  { name: "T9", delta: 35, type: "scratch" },
  { name: "T10", delta: -5, type: "powerball" },
  { name: "T11", delta: 28, type: "scratch" },
  { name: "T12", delta: -18, type: "mega" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string; dataKey: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/95 backdrop-blur-md border border-border/50 rounded-xl p-3 shadow-2xl">
        <p className="text-xs text-muted-foreground mb-2 font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground capitalize">{entry.dataKey}:</span>
            <span className="font-medium text-foreground">
              {entry.dataKey === "delta" ? (entry.value > 0 ? "+" : "") + entry.value : entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

type TimeRange = "1W" | "1M" | "3M" | "6M" | "1Y";

export function AnalyticsCharts() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");

  return (
    <div className="space-y-6">
      {/* Charts Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Analytics</h3>
          <p className="text-sm text-muted-foreground">Track your behavioral patterns over time</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Time Range Selector */}
          <div className="flex items-center bg-secondary/30 rounded-lg p-0.5">
            {(["1W", "1M", "3M", "6M", "1Y"] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  timeRange === range 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid gap-6">
        {/* Confidence vs Outcome - Primary Chart */}
        <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-border/60 transition-colors">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground">Confidence vs Outcome</h4>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">How your pre-game confidence correlates with results</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Confidence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-muted-foreground">Outcome</span>
              </div>
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={confidenceVsOutcome}>
                <defs>
                  <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="outcomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  dx={-10}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="confidence" 
                  stroke="hsl(var(--primary))" 
                  fill="url(#confidenceGrad)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 2, stroke: "hsl(var(--background))", fill: "hsl(var(--primary))" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="outcome" 
                  stroke="hsl(var(--accent))" 
                  fill="url(#outcomeGrad)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 2, stroke: "hsl(var(--background))", fill: "hsl(var(--accent))" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two Column Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Expectation vs Reality */}
          <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-border/60 transition-colors">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h4 className="font-medium text-foreground">Expectation Gap</h4>
                <p className="text-sm text-muted-foreground mt-1">Monthly analysis</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Expected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Actual</span>
                </div>
              </div>
            </div>
            
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expectationVsReality}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="expected" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Emotional Delta */}
          <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-border/60 transition-colors">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h4 className="font-medium text-foreground">Emotional Delta</h4>
                <p className="text-sm text-muted-foreground mt-1">Pre vs post-result mood</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
                  <span className="text-muted-foreground">Positive</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-destructive/70" />
                  <span className="text-muted-foreground">Negative</span>
                </div>
              </div>
            </div>
            
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionalDelta}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="delta" 
                    radius={[4, 4, 0, 0]}
                  >
                    {emotionalDelta.map((entry, index) => (
                      <Cell 
                        key={index}
                        fill={entry.delta >= 0 ? "hsl(var(--primary))" : "hsl(var(--destructive) / 0.7)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
