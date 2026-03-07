"use client";

import { useEffect, useMemo, useState } from "react";
import { Info, BarChart3, LineChart as LineChartIcon } from "lucide-react";
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
  ReferenceLine,
  Legend,
} from "recharts";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const CHART_COLORS = {
  profit: "#22c55e",
  loss: "#ef4444",
  confidence: "#3b82f6",
  expectation: "#a855f7",
  actual: "#22c55e",
};

type TimeRange = "1W" | "1M" | "3M" | "6M" | "1Y";

interface Ticket {
  id: string;
  ticketType: string;
  cost: number;
  amountWon: number;
  confidence: number;
  excitement: number;
  feelsDifferent: number;
  postSatisfaction: number;
  wasRight: number;
  date: string;
  createdAt?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; color: string; dataKey: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-popover border border-border rounded-lg p-3 shadow-xl min-w-[140px]">
      <p className="text-xs font-medium text-foreground mb-2 border-b border-border pb-2">
        {label}
      </p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-4 text-sm py-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground capitalize text-xs">{entry.dataKey}</span>
          </div>
          <span className="font-semibold text-foreground tabular-nums">
            {["spent", "won", "net"].includes(entry.dataKey) ? "$" : ""}
            {entry.value}
            {["confidence", "outcome", "expected", "actual"].includes(entry.dataKey) ? "%" : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

const EmptyChartState = ({ height = "h-72" }: { height?: string }) => (
  <div className={cn("flex flex-col items-center justify-center text-center", height)}>
    <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
      <BarChart3 className="w-8 h-8 text-muted-foreground/50" />
    </div>
    <p className="text-sm text-muted-foreground font-medium">No data yet</p>
    <p className="text-xs text-muted-foreground/70 mt-1">Log tickets to see insights</p>
  </div>
);

const ChartTypeToggle = ({
  chartType,
  setChartType,
}: {
  chartType: "line" | "bar";
  setChartType: (type: "line" | "bar") => void;
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

function getCutoffDate(range: TimeRange) {
  const now = new Date();
  const d = new Date(now);

  if (range === "1W") d.setDate(now.getDate() - 7);
  if (range === "1M") d.setMonth(now.getMonth() - 1);
  if (range === "3M") d.setMonth(now.getMonth() - 3);
  if (range === "6M") d.setMonth(now.getMonth() - 6);
  if (range === "1Y") d.setFullYear(now.getFullYear() - 1);

  return d;
}

function monthLabel(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleString("en-US", { month: "short" });
}

function formatType(type: string) {
  const map: Record<string, string> = {
    scratch: "Scratch",
    powerball: "Powerball",
    mega: "Mega",
    daily: "Daily",
    pick3: "Pick 3",
    other: "Other",
  };
  return map[type] || type;
}

export function AnalyticsCharts() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");
  const [spendingChartType, setSpendingChartType] = useState<"line" | "bar">("line");
  const [confidenceChartType, setConfidenceChartType] = useState<"line" | "bar">("line");
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gut_tickets") || "[]");
    setTickets(stored);
  }, []);

  const filteredTickets = useMemo(() => {
    const cutoff = getCutoffDate(timeRange);
    return tickets.filter((ticket) => new Date(ticket.date || ticket.createdAt || 0) >= cutoff);
  }, [tickets, timeRange]);

  const spendingOverTime = useMemo(() => {
    const grouped = new Map<string, { name: string; spent: number; won: number }>();

    filteredTickets.forEach((ticket) => {
      const label = monthLabel(ticket.date || ticket.createdAt || new Date().toISOString());
      const current = grouped.get(label) || { name: label, spent: 0, won: 0 };
      current.spent += Number(ticket.cost || 0);
      current.won += Number(ticket.amountWon || 0);
      grouped.set(label, current);
    });

    return Array.from(grouped.values());
  }, [filteredTickets]);

  const winLossDistribution = useMemo(() => {
    const grouped = new Map<string, { name: string; wins: number; losses: number }>();

    filteredTickets.forEach((ticket) => {
      const label = formatType(ticket.ticketType);
      const current = grouped.get(label) || { name: label, wins: 0, losses: 0 };
      const net = Number(ticket.amountWon || 0) - Number(ticket.cost || 0);

      if (net > 0) current.wins += 1;
      else current.losses += 1;

      grouped.set(label, current);
    });

    return Array.from(grouped.values());
  }, [filteredTickets]);

  const confidenceVsOutcome = useMemo(() => {
    return filteredTickets.slice(0, 12).map((ticket, index) => ({
      name: `T${index + 1}`,
      confidence: Number(ticket.confidence || 0),
      outcome: Number(ticket.wasRight || 0),
    }));
  }, [filteredTickets]);

  const expectationVsReality = useMemo(() => {
    return filteredTickets.slice(0, 12).map((ticket, index) => ({
      name: `T${index + 1}`,
      expected: Number(ticket.confidence || 0),
      actual: Number(ticket.postSatisfaction || 0),
    }));
  }, [filteredTickets]);

  const hasData = filteredTickets.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Track your behavioral patterns over time
          </p>
        </div>

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

      <div className="grid gap-6">
        <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-4 sm:p-6">
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
              <p className="text-sm text-muted-foreground mt-1">Based on logged tickets</p>
            </div>

            <ChartTypeToggle
              chartType={spendingChartType}
              setChartType={setSpendingChartType}
            />
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
                        <stop offset="0%" stopColor={CHART_COLORS.loss} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={CHART_COLORS.loss} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="wonGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS.profit} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={CHART_COLORS.profit} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.12} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="spent"
                      stroke={CHART_COLORS.loss}
                      fill="url(#spentGrad)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="won"
                      stroke={CHART_COLORS.profit}
                      fill="url(#wonGrad)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={spendingOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.12} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="spent" fill={CHART_COLORS.loss} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="won" fill={CHART_COLORS.profit} radius={[6, 6, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h4 className="font-medium text-foreground">Win vs Loss by Ticket Type</h4>
                <p className="text-sm text-muted-foreground mt-1">Positive net vs not positive</p>
              </div>
            </div>

            <div className="h-72">
              {!hasData ? (
                <EmptyChartState />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={winLossDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.12} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="wins" fill={CHART_COLORS.profit} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="losses" fill={CHART_COLORS.loss} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h4 className="font-medium text-foreground">Confidence vs Gut Accuracy</h4>
                <p className="text-sm text-muted-foreground mt-1">How your confidence compares</p>
              </div>

              <ChartTypeToggle
                chartType={confidenceChartType}
                setChartType={setConfidenceChartType}
              />
            </div>

            <div className="h-72">
              {!hasData ? (
                <EmptyChartState />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  {confidenceChartType === "line" ? (
                    <LineChart data={confidenceVsOutcome}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.12} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <ReferenceLine y={50} stroke="currentColor" opacity={0.2} />
                      <Line
                        type="monotone"
                        dataKey="confidence"
                        stroke={CHART_COLORS.confidence}
                        strokeWidth={2.5}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="outcome"
                        stroke={CHART_COLORS.profit}
                        strokeWidth={2.5}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  ) : (
                    <BarChart data={confidenceVsOutcome}>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.12} />
                      <XAxis dataKey="name" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="confidence" fill={CHART_COLORS.confidence} radius={[6, 6, 0, 0]} />
                      <Bar dataKey="outcome" fill={CHART_COLORS.profit} radius={[6, 6, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-4 sm:p-6">
          <div className="mb-6">
            <h4 className="font-medium text-foreground">Expectation vs Reality</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Confidence before purchase vs satisfaction after result
            </p>
          </div>

          <div className="h-72">
            {!hasData ? (
              <EmptyChartState />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expectationVsReality}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.12} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="expected"
                    stroke="#a855f7"
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke={CHART_COLORS.actual}
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}