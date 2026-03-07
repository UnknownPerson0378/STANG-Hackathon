"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/components/gut-instinct/dashboard/header";
import { StatsGrid } from "@/components/gut-instinct/dashboard/stats-grid";
import { CalibrationScore } from "@/components/gut-instinct/dashboard/calibration-score";
import { AnalyticsCharts } from "@/components/gut-instinct/dashboard/analytics-charts";
import { InsightsPanel } from "@/components/gut-instinct/dashboard/insights-panel";
import { LocationMapPanel } from "@/components/gut-instinct/dashboard/location-map-panel";
import { LogTicketModal } from "@/components/gut-instinct/dashboard/log-ticket-modal";
import { RecentActivity } from "@/components/gut-instinct/dashboard/recent-activity";

interface UserData {
  id: string;
  email: string;
  name: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isLogTicketOpen, setIsLogTicketOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          router.push("/login");
          return;
        }
        const data = await response.json();
        setUser(data.user);
      } catch {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <DashboardHeader onLogTicket={() => setIsLogTicketOpen(true)} user={user} />
        
        <main className="container mx-auto px-4 lg:px-8 py-8 space-y-8">
          {/* Stats Row */}
          <StatsGrid />
          
          {/* Calibration Score - The Centerpiece */}
          <CalibrationScore />
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Charts - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <AnalyticsCharts />
            </div>
            
            {/* Side Panel - Takes 1 column */}
            <div className="space-y-6">
              <InsightsPanel />
              <RecentActivity />
            </div>
          </div>
          
          {/* Location Map - Full Width */}
          <LocationMapPanel />
        </main>
      </div>

      {/* Log Ticket Modal */}
      <LogTicketModal open={isLogTicketOpen} onOpenChange={setIsLogTicketOpen} />
    </div>
  );
}
