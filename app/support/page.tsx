"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/gut-instinct/footer";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    setSubmitted(true);
  };

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
            <h1 className="text-4xl font-serif tracking-tight mb-4">Support</h1>
            <p className="text-muted-foreground">We are here to help you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Get help via email within 24 hours
              </p>
              <p className="text-primary font-medium">support@gutinstinct.app</p>
            </div>

            <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Community</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Join discussions with other users
              </p>
              <p className="text-primary font-medium">Coming Soon</p>
            </div>
          </div>

          {submitted ? (
            <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-serif mb-4">Message Sent!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for reaching out. We will get back to you within 24 hours.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Send Another Message
              </Button>
            </div>
          ) : (
            <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6">Contact Form</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-muted-foreground">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 bg-secondary/30 border-border/40"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 bg-secondary/30 border-border/40"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-muted-foreground">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="h-12 bg-secondary/30 border-border/40"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-muted-foreground">Message</Label>
                  <textarea
                    id="message"
                    placeholder="Describe your issue or question..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full min-h-32 px-3 py-3 bg-secondary/30 border border-border/40 rounded-lg text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/80"
                >
                  Send Message
                </Button>
              </form>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Looking for quick answers?</p>
            <Link 
              href="/faq" 
              className="text-primary hover:text-primary/80 font-medium transition-colors mr-4"
            >
              Browse FAQs
            </Link>
            <Link 
              href="/documentation" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
