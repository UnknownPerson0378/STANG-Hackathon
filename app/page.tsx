import { Navbar } from "@/components/gut-instinct/navbar";
import { Hero } from "@/components/gut-instinct/hero";
import { Features } from "@/components/gut-instinct/features";
import { HowItWorks } from "@/components/gut-instinct/how-it-works";
import { Dashboard } from "@/components/gut-instinct/dashboard";
import { LogTicket } from "@/components/gut-instinct/log-ticket";
import { Insights } from "@/components/gut-instinct/insights";
import { LocationMap } from "@/components/gut-instinct/location-map";
import { Privacy } from "@/components/gut-instinct/privacy";
import { Footer } from "@/components/gut-instinct/footer";

export default function GutInstinctPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Dashboard />
      <LogTicket />
      <Insights />
      <LocationMap />
      <Privacy />
      <Footer />
    </main>
  );
}
