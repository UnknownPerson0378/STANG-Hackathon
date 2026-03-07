"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Bell, 
  Settings, 
  ChevronDown,
  Sparkles,
  User,
  LogOut,
  HelpCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserData {
  id: string;
  email: string;
  name: string | null;
}

interface DashboardHeaderProps {
  onLogTicket: () => void;
  user?: UserData | null;
}

export function DashboardHeader({ onLogTicket, user }: DashboardHeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch {
      console.error("Logout failed");
    }
  };

  const userInitials = user?.name 
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || "U";
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Nav */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="font-serif text-lg font-medium tracking-tight">Gut Instinct</span>
            </a>
            
            <nav className="hidden md:flex items-center gap-1">
              <a href="/dashboard" className="px-3 py-2 text-sm font-medium text-foreground rounded-lg bg-secondary/50">
                Dashboard
              </a>
              <a href="#" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/30 transition-colors">
                History
              </a>
              <a href="#" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/30 transition-colors">
                Insights
              </a>
              <a href="#" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary/30 transition-colors">
                Settings
              </a>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Log Ticket CTA */}
            <Button
              onClick={onLogTicket}
              className="hidden sm:flex items-center gap-2 h-9 px-4 bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:bg-primary/80 hover:text-primary-foreground hover:shadow-primary/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              Log Ticket
            </Button>
            
            {/* Mobile Log Button */}
            <Button
              onClick={onLogTicket}
              size="icon"
              className="sm:hidden h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground shadow-lg shadow-primary/20"
            >
              <Plus className="w-4 h-4" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 px-2 gap-2 text-muted-foreground hover:text-foreground">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <span className="text-xs font-medium text-foreground">{userInitials}</span>
                  </div>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || ""}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
