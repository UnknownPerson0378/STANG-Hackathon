"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/gut-instinct/footer";

const faqs = [
  {
    question: "What is Gut Instinct?",
    answer: "Gut Instinct is a behavioral analytics platform that helps lottery players track their intuition, emotions, and decision-making patterns over time. By logging your tickets and feelings, you gain insights into how your gut feelings correlate with actual outcomes."
  },
  {
    question: "How does the tracking work?",
    answer: "When you purchase a lottery ticket, you log it in the app along with your confidence level, emotional state, and expectations. After the results, you record the outcome. Over time, the app analyzes patterns to show you how accurate your intuition really is."
  },
  {
    question: "Is my data private?",
    answer: "Yes, your data is completely private and secure. We use industry-standard encryption and never share your personal information with third parties. You can delete your account and all associated data at any time."
  },
  {
    question: "What types of lottery games can I track?",
    answer: "You can track any type of lottery game including scratch-off tickets, Powerball, Mega Millions, daily draws, and state-specific games. The app is flexible enough to accommodate any game format."
  },
  {
    question: "How do I interpret my calibration score?",
    answer: "Your calibration score measures how well your confidence aligns with actual outcomes. A score of 100 means your predictions are perfectly calibrated - when you're 80% confident, you win about 80% of the time. Most people start around 40-60 and improve with practice."
  },
  {
    question: "Can I export my data?",
    answer: "Yes, you can export all your ticket history and analytics data in CSV format from your account settings. This allows you to perform your own analysis or keep records offline."
  },
  {
    question: "Is there a mobile app?",
    answer: "Currently, Gut Instinct is a web application optimized for both desktop and mobile browsers. A dedicated mobile app is on our roadmap for future development."
  },
  {
    question: "How much does it cost?",
    answer: "Gut Instinct is free to use during our beta period. We may introduce premium features in the future, but core tracking functionality will always remain free."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/30 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="font-medium text-foreground group-hover:text-primary transition-colors pr-4">
          {question}
        </span>
        <ChevronDown className={cn(
          "w-5 h-5 text-muted-foreground transition-transform shrink-0",
          isOpen && "rotate-180"
        )} />
      </button>
      <div className={cn(
        "overflow-hidden transition-all",
        isOpen ? "max-h-96 pb-5" : "max-h-0"
      )}>
        <p className="text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="font-serif text-lg font-medium tracking-tight">Gut Instinct</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 lg:px-8 py-16 max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif tracking-tight mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">Everything you need to know about Gut Instinct</p>
          </div>

          <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link 
              href="/support" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Contact our support team
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
