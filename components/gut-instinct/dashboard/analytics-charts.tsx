"use client";

import { useState } from "react";
import { Info, BarChart3, LineChart as LineChartIcon, TrendingUp, TrendingDown } from "lucide-react";
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
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Color definitions for semantic meaning
const CHART_COLORS = {
  profit: "#22c55e",      // Green - profit/positive
  loss: "#ef4444",        // Red - loss/negative
  confidence: "#3b82f6",  // Blue - confidence metrics
  expectation: "#a855f7", // Purple - expectation metrics
  neutral: "#6b7280",     // Gray - neutral/placeholder
  actual: "#22c55e",      // Green for actual values
  expected: "#a855f7",    // Purple for expected values
};

// Enhanced mock data for Spending Over Time
const spendingOverTime = [
  { name: "Jan", spent: 45, won: 25 },
  { name: "Feb", spent: 60, won: 85 },
  { name: "Mar", spent: 38, won: 15 },
  { name: "Apr", spent: 72, won: 120 },
  { name: "May", spent: 55, won: 30 },
  { name: "Jun", spent: 48, won: 65 },
  { name: "Jul", spent: 65, won: 45 },
  { name: "Aug", spent: 42, won: 90 },
];

// Win vs Loss Distribution
const winLossDistribution = [
  { name: "Scratch", wins: 12, losses: 8 },
  { name: "Powerball", wins: 2, losses: 10 },
  { name: "Mega", wins: 1, losses: 6 },
  { name: "Daily", wins: 8, losses: 5 },
  { name: "Pick 3", wins: 5, losses: 3 },
];

// Confidence vs Outcome
const confidenceVsOutcome = [
  { name: "W1", confidence: 65, outcome: 40 },
  { name: "W2", confidence: 80, outcome: 25 },
  { name: "W3", confidence: 45, outcome: 55 },
  { name: "W4", confidence: 90, outcome: 35 },
  { name: "W5", confidence: 55, outcome: 60 },
  { name: "W6", confidence: 70, outcome: 45 },
  { name: "W7", confidence: 85, outcome: 50 },
  { name: "W8", confidence: 60, outcome: 65 },
];

// Expectation vs Reality
const expectationVsReality = [
  { name: "Jan", expected: 40, actual: 25 },
  { name: "Feb", expected: 55, actual: 60 },
  { name: "Mar", expected: 70, actual: 45 },
  { name: "Apr", expected: 30, actual: 50 },
  { name: "May", expected: 80, actual: 35 },
  { name: "Jun", expected: 45, actual: 55 },
  { name: "Jul", expected: 60, actual: 52 },
  { name: "Aug", expected: 55, actual: 58 },
];

// Custom tooltip component with improved styling
const CustomTooltip = ({ 
  active, 
  payload, 
  label 
}: { 
  active?: boolean; 
  payload?: Array<{ value: number; name: string; color: string; dataKey: string }>; 
  label?: string 
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-xl min-w-[140px]">
        <p className="text-xs font-medium text-foreground mb-2 border-b border-border pb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm py-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground capitalize text-xs">{entry.dataKey}</span>
            </div>
            <span className="font-semibold text-foreground tabular-nums">
              {entry.dataKey.includes("spent") || entry.dataKey.includes("won") ? "$" : ""}
              {entry.value}
              {entry.dataKey.includes("confidence") || entry.dataKey.includes("outcome") || 
               entry.dataKey.includes("expected") || entry.dataKey.includes("actual") ? "%" : ""}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Empty state component
const EmptyChartState = ({ height = "h-72" }: { height?: string }) => (
  <div className={cn("flex flex-col items-center justify-center text-center", height)}>
    <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
      <BarChart3 className="w-8 h-8 text-muted-foreground/50" />
    </div>
    <p className="text-sm text-muted-foreground font-medium">No data yet</p>
    <p className="text-xs text-muted-foreground/70 mt-1">Log tickets to see insights</p>
  </div>
);

// Chart type toggle component
const ChartTypeToggle = ({ 
  chartType, 
  setChartType 
}: { 
  chartType: "line" | "bar"; 
  setChartType: (type: "line" | "bar") => void 
}) => (
  <div className="flex items-center bg-secondary/40 rounded-lg p-0.5">
    <button
      onClick={() => setChartType("line")}
      className={cn(
        "p-1.5 rounded-md transition-all",
        chartType === "line" 
          ? "bg-background text-foreground shadow-sm" 
          : "text-muted-foreground hover:text-foreground"
      )}
      aria-label="Line chart"
    >
      <LineChartIcon className="w-4 h-4" />
    </button>
    <button
      onClick={() => setChartType("bar")}
      className={cn(
        "p-1.5 rounded-md transition-all",
        chartType === "bar" 
          ? "bg-background text-foreground shadow-sm" 
          : "text-muted-foreground hover:text-foreground"
      )}
      aria-label="Bar chart"
    >
      <BarChart3 className="w-4 h-4" />
    </button>
  </div>
);

type TimeRange = "1W" | "1M" | "3M" | "6M" | "1Y";

export function AnalyticsCharts() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");
  const [spendingChartType, setSpendingChartType] = useState<"line" | "bar">("line");
  const [confidenceChartType, setConfidenceChartType] = useState<"line" | "bar">("line");
  const [hasData] = useState(true); // Toggle this to test empty states

  return (
    <div className="space-y-6">
      {/* Charts Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                suppressHydrationWarning
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
        {/* Spending Over Time - Primary Chart */}
        <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-4 sm:p-6 hover:border-border/60 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground">Spending Over Time</h4>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Compare your spending vs winnings over time</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Monthly spending vs winnings</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.loss }} />
                  <span className="text-muted-foreground">Spent</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.profit }} />
                  <span className="text-muted-foreground">Won</span>
                </div>
              </div>
              <ChartTypeToggle chartType={spendingChartType} setChartType={setSpendingChartType} />
            </div>
          </div>
          
          <div className="h-72">
            {!hasData ? (
              <EmptyChartState />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                {spendingChartType === "line" ? (
                  <AreaChart data={spendingOverTime}>
                    <defs>
                      <linearGradient id="spentGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS.loss} stopOpacity={0.3}/>
                        <stop offset="100%" stopColor={CHART_COLORS.loss} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="wonGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS.profit} stopOpacity={0.3}/>
                        <stop offset="100%" stopColor={CHART_COLORS.profit} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
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
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="spent" 
                      stroke={CHART_COLORS.loss}
                      fill="url(#spentGrad)"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6, strokeWidth: 2, stroke: "hsl(var(--background))", fill: CHART_COLORS.loss }}
                      animationDuration={500}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="won" 
                      stroke={CHART_COLORS.profit}
                      fill="url(#wonGrad)"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 6, strokeWidth: 2, stroke: "hsl(var(--background))", fill: CHART_COLORS.profit }}
                      animationDuration={500}
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={spendingOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
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
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="spent" fill={CHART_COLORS.loss} radius={[4, 4, 0, 0]} animationDuration={500} />
                    <Bar dataKey="won" fill={CHART_COLORS.profit} radius={[4, 4, 0, 0]} animationDuration={500} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Two Column Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Win vs Loss Distribution */}
          <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-4 sm:p-6 hover:border-border/60 transition-colors">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground">Win vs Loss Distribution</h4>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Wins and losses by game type</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-muted-foreground mt-1">By game type</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: CHART_COLORS.profit }} />
                  <span className="text-muted-foreground">Wins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: CHART_COLORS.loss }} />
                  <span className="text-muted-foreground">Losses</span>
                </div>
              </div>
            </div>
            
            <div className="h-56">
              {!hasData ? (
                <EmptyChartState height="h-56" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={winLossDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} horizontal={false} />
                    <XAxis 
                      type="number"
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis 
                      type="category"
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      width={70}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="wins" fill={CHART_COLORS.profit} radius={[0, 4, 4, 0]} animationDuration={500} />
                    <Bar dataKey="losses" fill={CHART_COLORS.loss} radius={[0, 4, 4, 0]} animationDuration={500} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Confidence vs Outcome */}
          <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-4 sm:p-6 hover:border-border/60 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground">Confidence vs Outcome</h4>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>How your confidence correlates with results</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Weekly analysis</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS.confidence }} />
                    <span className="text-muted-foreground">Confidence</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS.profit }} />
                    <span className="text-muted-foreground">Outcome</span>
                  </div>
                </div>
                <ChartTypeToggle chartType={confidenceChartType} setChartType={setConfidenceChartType} />
              </div>
            </div>
            
            <div className="h-56">
              {!hasData ? (
                <EmptyChartState height="h-56" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  {confidenceChartType === "line" ? (
                    <LineChart data={confidenceVsOutcome}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
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
                        dataKey="confidence" 
                        stroke={CHART_COLORS.confidence}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))", fill: CHART_COLORS.confidence }}
                        animationDuration={500}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="outcome" 
                        stroke={CHART_COLORS.profit}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))", fill: CHART_COLORS.profit }}
                        animationDuration={500}
                      />
                    </LineChart>
                  ) : (
                    <BarChart data={confidenceVsOutcome}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
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
                      <Bar dataKey="confidence" fill={CHART_COLORS.confidence} radius={[4, 4, 0, 0]} animationDuration={500} />
                      <Bar dataKey="outcome" fill={CHART_COLORS.profit} radius={[4, 4, 0, 0]} animationDuration={500} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Expectation vs Reality - Full Width */}
        <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-4 sm:p-6 hover:border-border/60 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground">Expectation vs Reality</h4>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Compare what you expected vs actual results</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Monthly gap analysis</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.expectation }} />
                <span className="text-muted-foreground">Expected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS.actual }} />
                <span className="text-muted-foreground">Actual</span>
              </div>
            </div>
          </div>
          
          <div className="h-64">
            {!hasData ? (
              <EmptyChartState height="h-64" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={expectationVsReality}>
                  <defs>
                    <linearGradient id="expectedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CHART_COLORS.expectation} stopOpacity={0.2}/>
                      <stop offset="100%" stopColor={CHART_COLORS.expectation} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CHART_COLORS.actual} stopOpacity={0.2}/>
                      <stop offset="100%" stopColor={CHART_COLORS.actual} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
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
                    dataKey="expected" 
                    stroke={CHART_COLORS.expectation}
                    fill="url(#expectedGrad)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))", fill: CHART_COLORS.expectation }}
                    animationDuration={500}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke={CHART_COLORS.actual}
                    fill="url(#actualGrad)"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))", fill: CHART_COLORS.actual }}
                    animationDuration={500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
