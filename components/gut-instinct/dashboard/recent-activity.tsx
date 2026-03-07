"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Ticket {
  id: string;
  ticketType: string;
  cost: number;
  amountWon: number;
  confidence: number;
  date: string;
}

function getOutcomeStyles(outcome: string) {
  switch (outcome) {
    case "win":
      return {
        icon: TrendingUp,
        color: "text-success",
        bg: "bg-success/10",
      };
    case "loss":
      return {
        icon: TrendingDown,
        color: "text-destructive/70",
        bg: "bg-destructive/10",
      };
    default:
      return {
        icon: Minus,
        color: "text-muted-foreground",
        bg: "bg-muted/20",
      };
  }
}

function formatType(type: string) {
  const map: Record<string, string> = {
    scratch: "Scratch-off",
    powerball: "Powerball",
    mega: "Mega Millions",
    daily: "Daily Numbers",
    pick3: "Pick 3",
    other: "Other",
  };
  return map[type] || type;
}

export function RecentActivity() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("gut_tickets") || "[]");
    setTickets(stored.slice(0, 5));
  }, []);

  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-border/30">
        <h3 className="font-semibold text-foreground">Recent Tickets</h3>
      </div>

      <div className="divide-y divide-border/20">
        {tickets.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">
            No tickets logged yet.
          </div>
        ) : (
          tickets.map((ticket) => {
            const netResult = Number(ticket.amountWon || 0) - Number(ticket.cost || 0);
            const outcome = netResult > 0 ? "win" : netResult < 0 ? "loss" : "break-even";
            const outcomeStyles = getOutcomeStyles(outcome);
            const OutcomeIcon = outcomeStyles.icon;

            return (
              <div key={ticket.id} className="p-4 hover:bg-secondary/10 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", outcomeStyles.bg)}>
                      <OutcomeIcon className={cn("w-4 h-4", outcomeStyles.color)} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {formatType(ticket.ticketType)}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>${ticket.cost} spent</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span>{ticket.confidence}% conf</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={cn(
                        "text-sm font-medium tabular-nums",
                        netResult > 0
                          ? "text-success"
                          : netResult < 0
                          ? "text-destructive/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {netResult > 0 ? "+" : ""}
                      {netResult === 0 ? "±$0" : `$${netResult}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{ticket.date}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}