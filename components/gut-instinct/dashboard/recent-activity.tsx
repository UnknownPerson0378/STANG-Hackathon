"use client";

import { ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const recentTickets = [
  { 
    type: "Scratch-off", 
    cost: 5, 
    result: 20, 
    confidence: 75, 
    date: "Today",
    outcome: "win"
  },
  { 
    type: "Powerball", 
    cost: 10, 
    result: 0, 
    confidence: 85, 
    date: "Yesterday",
    outcome: "loss"
  },
  { 
    type: "Daily Numbers", 
    cost: 2, 
    result: 2, 
    confidence: 45, 
    date: "Mar 5",
    outcome: "break-even"
  },
  { 
    type: "Mega Millions", 
    cost: 5, 
    result: 0, 
    confidence: 90, 
    date: "Mar 4",
    outcome: "loss"
  },
  { 
    type: "Scratch-off", 
    cost: 3, 
    result: 10, 
    confidence: 55, 
    date: "Mar 3",
    outcome: "win"
  },
];

function getOutcomeStyles(outcome: string) {
  switch (outcome) {
    case "win":
      return { 
        icon: TrendingUp, 
        color: "text-success",
        bg: "bg-success/10"
      };
    case "loss":
      return { 
        icon: TrendingDown, 
        color: "text-destructive/70",
        bg: "bg-destructive/10"
      };
    default:
      return { 
        icon: Minus, 
        color: "text-muted-foreground",
        bg: "bg-muted/20"
      };
  }
}

export function RecentActivity() {
  return (
    <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border/30">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Recent Tickets</h3>
          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            View history
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
      
      {/* Activity List */}
      <div className="divide-y divide-border/20">
        {recentTickets.map((ticket, index) => {
          const outcomeStyles = getOutcomeStyles(ticket.outcome);
          const OutcomeIcon = outcomeStyles.icon;
          const netResult = ticket.result - ticket.cost;
          
          return (
            <div 
              key={index}
              className="p-4 hover:bg-secondary/10 transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    outcomeStyles.bg
                  )}>
                    <OutcomeIcon className={cn("w-4 h-4", outcomeStyles.color)} />
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-foreground">{ticket.type}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>${ticket.cost} spent</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{ticket.confidence}% conf</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-medium tabular-nums",
                    netResult > 0 ? "text-success" : 
                    netResult < 0 ? "text-destructive/70" : "text-muted-foreground"
                  )}>
                    {netResult > 0 ? "+" : ""}{netResult === 0 ? "±" : ""}{netResult !== 0 ? `$${netResult}` : "$0"}
                  </p>
                  <p className="text-xs text-muted-foreground">{ticket.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Load More */}
      <div className="p-3 border-t border-border/20">
        <button className="w-full py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/20 rounded-lg transition-colors">
          Load more tickets
        </button>
      </div>
    </div>
  );
}
