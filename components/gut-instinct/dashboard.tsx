"use client";

import { TicketIcon, DollarSign, TrendingUp, Brain, Info, ArrowUpRight, ArrowDownRight } from "lucide-react";
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
  Legend,
  ReferenceLine,
} from "recharts";

// Mock data
const confidenceVsOutcome = [
  { name: "W1", confidence: 65, outcome: 20 },
  { name: "W2", confidence: 80, outcome: 35 },
  { name: "W3", confidence: 45, outcome: 60 },
  { name: "W4", confidence: 90, outcome: 25 },
  { name: "W5", confidence: 55, outcome: 50 },
  { name: "W6", confidence: 70, outcome: 45 },
  { name: "W7", confidence: 85, outcome: 30 },
  { name: "W8", confidence: 60, outcome: 55 },
];

const expectationVsReality = [
  { name: "Jan", expected: 40, actual: 25 },
  { name: "Feb", expected: 55, actual: 60 },
  { name: "Mar", expected: 70, actual: 45 },
  { name: "Apr", expected: 30, actual: 50 },
  { name: "May", expected: 80, actual: 35 },
  { name: "Jun", expected: 45, actual: 55 },
];

const emotionalDelta = [
  { name: "T1", delta: 15 },
  { name: "T2", delta: -25 },
  { name: "T3", delta: 40 },
  { name: "T4", delta: -10 },
  { name: "T5", delta: 5 },
  { name: "T6", delta: -30 },
  { name: "T7", delta: 20 },
  { name: "T8", delta: -15 },
  { name: "T9", delta: 35 },
  { name: "T10", delta: -5 },
];

const stats = [
  { 
    label: "Tickets Logged", 
    value: "47", 
    icon: TicketIcon,
    change: "+3",
    changeLabel: "this week",
    positive: true
  },
  { 
    label: "Net Income", 
    value: "$214", 
    icon: DollarSign,
    change: "+$48",
    changeLabel: "vs last month",
    positive: true
  },
  { 
    label: "Total Won", 
    value: "$342", 
    icon: TrendingUp,
    change: "+$45",
    changeLabel: "this month",
    positive: true
  },
  { 
    label: "Calibration", 
    value: "62%", 
    icon: Brain,
    change: "+4%",
    changeLabel: "improving",
    positive: true
  },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-xl">
        <p className="text-xs text-muted-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function Dashboard() {
  return (
    <section id="dashboard" className="py-24 lg:py-32 relative">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.03] to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-4">
            Dashboard
          </p>
          <h2 className="text-4xl lg:text-5xl font-serif tracking-tight text-balance">
            Your behavioral patterns
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base">
            Real-time analysis of your intuition accuracy over time
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-5 lg:p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 group"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-secondary/60 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.positive ? 'text-success' : 'text-destructive/80'}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-3xl lg:text-4xl font-semibold text-foreground mb-1 tabular-nums">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground/60 mt-2">{stat.changeLabel}</p>
            </div>
          ))}
        </div>
        
        {/* CALIBRATION SCORE - THE CENTERPIECE */}
        <div className="relative mb-10">
          {/* Glow effect behind */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 rounded-3xl blur-2xl opacity-50" />
          
          <div className="relative glass-card-elevated rounded-2xl p-8 lg:p-10 border-primary/20 glow-primary">
            <div className="grid lg:grid-cols-[1fr,auto] gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                    <Brain className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl lg:text-2xl font-medium text-foreground">Intuition Calibration Score</h3>
                      <button className="w-5 h-5 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors">
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">How well your confidence matches actual outcomes</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed max-w-xl">
                  You tend to feel highly confident before low-return tickets. Your calibration 
                  improves on weekends, when you report lower pre-purchase excitement. Consider logging 
                  more tickets to strengthen this pattern.
                </p>
                
                {/* Progress bar */}
                <div className="space-y-3">
                  <div className="relative h-4 bg-secondary/50 rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/80 via-primary to-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '62%' }}
                    />
                    {/* Animated shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" style={{ width: '62%' }} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Uncalibrated</span>
                    <span className="text-primary font-medium">62% Calibrated</span>
                    <span className="text-muted-foreground">Perfect</span>
                  </div>
                </div>
              </div>
              
              {/* Big score display */}
              <div className="text-center lg:text-right lg:pr-4">
                <div className="inline-block relative">
                  <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                  <p className="relative text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary to-accent tabular-nums">
                    62
                  </p>
                  <p className="text-lg text-muted-foreground mt-1">out of 100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Confidence vs Outcome */}
          <div className="glass-card rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:border-primary/20">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-foreground">Confidence vs Outcome</h3>
                <p className="text-sm text-muted-foreground mt-1">Weekly comparison</p>
              </div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Confidence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Outcome</span>
                </div>
              </div>
            </div>
            <div className="h-64 lg:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={confidenceVsOutcome}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2.5}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                    name="Confidence"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="outcome" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2.5}
                    dot={{ fill: "hsl(var(--accent))", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                    name="Outcome"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Expectation vs Reality */}
          <div className="glass-card rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:border-primary/20">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-foreground">Expectation vs Reality</h3>
                <p className="text-sm text-muted-foreground mt-1">Monthly analysis</p>
              </div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Expected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Actual</span>
                </div>
              </div>
            </div>
            <div className="h-64 lg:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={expectationVsReality}>
                  <defs>
                    <linearGradient id="expectedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="expected" 
                    stroke="hsl(var(--primary))" 
                    fill="url(#expectedGradient)"
                    strokeWidth={2.5}
                    name="Expected"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="hsl(var(--accent))" 
                    fill="url(#actualGradient)"
                    strokeWidth={2.5}
                    name="Actual"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Emotional Delta - Full Width */}
          <div className="glass-card rounded-2xl p-6 lg:p-8 lg:col-span-2 transition-all duration-300 hover:border-primary/20">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-medium text-foreground">Emotional Delta Over Time</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The difference between pre-result excitement and post-result satisfaction
                </p>
              </div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
                  <span className="text-muted-foreground">Positive delta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm bg-destructive/70" />
                  <span className="text-muted-foreground">Negative delta</span>
                </div>
              </div>
            </div>
            <div className="h-52 lg:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionalDelta}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="delta" 
                    radius={[4, 4, 0, 0]}
                    name="Delta"
                  >
                    {emotionalDelta.map((entry, index) => (
                      <rect 
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
    </section>
  );
}
