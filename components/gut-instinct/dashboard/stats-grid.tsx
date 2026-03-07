"use client";

import { useEffect, useState } from "react";
import {
  TicketIcon,
  DollarSign,
  TrendingUp,
  Target,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

function getColorClasses(color: string, type: "icon" | "bg" | "glow") {
  const colors: Record<string, Record<string, string>> = {
    primary: {
      icon: "text-primary",
      bg: "bg-primary/10 border-primary/20",
      glow: "group-hover:shadow-primary/20",
    },
    success: {
      icon: "text-success",
      bg: "bg-success/10 border-success/20",
      glow: "group-hover:shadow-success/20",
    },
    accent: {
      icon: "text-accent",
      bg: "bg-accent/10 border-accent/20",
      glow: "group-hover:shadow-accent/20",
    },
  };
  return colors[color]?.[type] || colors.primary[type];
}

export function StatsGrid() {
  const [stats, setStats] = useState([
    { label: "Tickets Logged", value: "0", change: "+0", changeLabel: "local", color: "primary", icon: TicketIcon },
    { label: "Net Income", value: "$0", change: "+$0", changeLabel: "local", color: "success", icon: DollarSign },
    { label: "Total Won", value: "$0", change: "+$0", changeLabel: "local", color: "accent", icon: TrendingUp },
    { label: "Win Rate", value: "0%", change: "+0%", changeLabel: "local", color: "primary", icon: Target },
  ]);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("gut_tickets") || "[]");

    const totalLogged = tickets.length;
    const totalWon = tickets.reduce((sum: number, t: any) => sum + Number(t.amountWon || 0), 0);
    const totalSpent = tickets.reduce((sum: number, t: any) => sum + Number(t.cost || 0), 0);
    const net = totalWon - totalSpent;
    const wins = tickets.filter((t: any) => Number(t.amountWon || 0) > Number(t.cost || 0)).length;
    const winRate = totalLogged ? Math.round((wins / totalLogged) * 100) : 0;

    setStats([
      {
        label: "Tickets Logged",
        value: String(totalLogged),
        change: `+${Math.min(totalLogged, 7)}`,
        changeLabel: "saved locally",
        color: "primary",
        icon: TicketIcon,
      },
      {
        label: "Net Income",
        value: `$${net}`,
        change: `+$${Math.max(net, 0)}`,
        changeLabel: "won minus spent",
        color: "success",
        icon: DollarSign,
      },
      {
        label: "Total Won",
        value: `$${totalWon}`,
        change: `+$${totalWon}`,
        changeLabel: "all logged tickets",
        color: "accent",
        icon: TrendingUp,
      },
      {
        label: "Win Rate",
        value: `${winRate}%`,
        change: `+${winRate}%`,
        changeLabel: "positive net tickets",
        color: "primary",
        icon: Target,
      },
    ]);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            "group relative bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-5 lg:p-6",
            "transition-all duration-300 hover:border-border/60 hover:bg-card/50",
            "hover:shadow-xl",
            getColorClasses(stat.color, "glow")
          )}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div
                className={cn(
                  "w-11 h-11 rounded-xl border flex items-center justify-center",
                  "transition-transform duration-300 group-hover:scale-105",
                  getColorClasses(stat.color, "bg")
                )}
              >
                <stat.icon className={cn("w-5 h-5", getColorClasses(stat.color, "icon"))} />
              </div>

              <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full text-success bg-success/10">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change}
              </div>
            </div>

            <p className="text-3xl lg:text-4xl font-semibold text-foreground mb-1 tabular-nums tracking-tight">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground/60 mt-1.5">{stat.changeLabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}