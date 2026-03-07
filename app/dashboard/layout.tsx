import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Gut Instinct",
  description: "Track your intuition accuracy and behavioral patterns with Gut Instinct's premium analytics dashboard.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
