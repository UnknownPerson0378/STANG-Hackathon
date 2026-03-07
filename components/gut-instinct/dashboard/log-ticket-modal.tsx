"use client";

import { useEffect, useMemo, useState } from "react";
import {
  X,
  Calendar,
  MapPin,
  DollarSign,
  ChevronRight,
  Check,
  LocateFixed,
  ImagePlus,
  Loader2,
  Sparkles,
  PencilLine,
  UploadCloud,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LogTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type InputMode = "image" | "manual";

interface SliderProps {
  label: string;
  sublabel?: string;
  value: number;
  onChange: (value: number) => void;
  leftLabel?: string;
  rightLabel?: string;
  color?: "primary" | "accent";
}

function PremiumSlider({
  label,
  sublabel,
  value,
  onChange,
  leftLabel = "Low",
  rightLabel = "High",
  color = "primary",
}: SliderProps) {
  const gradientColor =
    color === "primary" ? "from-primary/80 to-primary" : "from-accent/80 to-accent";
  const thumbColor = color === "primary" ? "bg-primary" : "bg-accent";
  const glowColor = color === "primary" ? "shadow-primary/50" : "shadow-accent/50";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-foreground">{label}</label>
          {sublabel && <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>}
        </div>
        <span
          className={cn(
            "text-sm font-mono font-medium px-2.5 py-1 rounded-lg",
            color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
          )}
        >
          {value}%
        </span>
      </div>

      <div className="relative h-10 flex items-center">
        <div className="absolute inset-x-0 h-2 bg-secondary/50 rounded-full" />
        <div
          className={cn("absolute h-2 rounded-full bg-gradient-to-r", gradientColor)}
          style={{ width: `${value}%`, left: 0 }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-x-0 w-full h-10 opacity-0 cursor-pointer z-10"
        />
        <div
          className={cn(
            "absolute w-5 h-5 rounded-full border-2 border-background",
            thumbColor,
            "shadow-lg",
            glowColor,
            "transition-transform hover:scale-110 pointer-events-none"
          )}
          style={{ left: `calc(${value}% - 10px)` }}
        />
      </div>

      <div className="flex justify-between">
        <span className="text-xs text-muted-foreground">{leftLabel}</span>
        <span className="text-xs text-muted-foreground">{rightLabel}</span>
      </div>
    </div>
  );
}

export function LogTicketModal({ open, onOpenChange }: LogTicketModalProps) {
  const [step, setStep] = useState(1);
  const [inputMode, setInputMode] = useState<InputMode>("image");

  const [ticketType, setTicketType] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const [confidence, setConfidence] = useState(50);
  const [excitement, setExcitement] = useState(50);
  const [feelsDifferent, setFeelsDifferent] = useState(50);

  const [amountWon, setAmountWon] = useState("");
  const [postSatisfaction, setPostSatisfaction] = useState(50);
  const [wasRight, setWasRight] = useState(50);

  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [aiSummary, setAiSummary] = useState("");

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageSummary, setImageSummary] = useState("");
  const [extractMessage, setExtractMessage] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  const ticketTypes = useMemo(
    () => [
      { value: "scratch", label: "Scratch-off", emoji: "🎫" },
      { value: "powerball", label: "Powerball", emoji: "🔴" },
      { value: "mega", label: "Mega Millions", emoji: "💰" },
      { value: "daily", label: "Daily Numbers", emoji: "🔢" },
      { value: "pick3", label: "Pick 3", emoji: "3️⃣" },
      { value: "other", label: "Other", emoji: "🎲" },
    ],
    []
  );

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        setStep(1);
        setInputMode("image");
        setTicketType("");
        setCost("");
        setDate("");
        setLocation("");
        setConfidence(50);
        setExcitement(50);
        setFeelsDifferent(50);
        setAmountWon("");
        setPostSatisfaction(50);
        setWasRight(50);
        setCoords(null);
        setIsSaving(false);
        setSaveError("");
        setSuccessMessage("");
        setAiSummary("");
        setUploadedFile(null);
        setPreviewUrl("");
        setImageSummary("");
        setExtractMessage("");
        setIsExtracting(false);
      }, 250);

      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    if (!uploadedFile) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(uploadedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [uploadedFile]);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setSaveError("This browser does not support location access.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setSaveError("Location access was denied or unavailable.");
      }
    );
  };

const handleAnalyzeImage = async () => {
  setSaveError("");
  setExtractMessage("");
  setSuccessMessage("");

  if (!uploadedFile) {
    setSaveError("Please upload an image first.");
    return;
  }

  if (!uploadedFile.type.startsWith("image/")) {
    setSaveError("Please upload a valid image file.");
    return;
  }

  if (uploadedFile.size > 8 * 1024 * 1024) {
    setSaveError("Image is too large. Please keep it under 8 MB.");
    return;
  }

  try {
    setIsExtracting(true);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    const response = await fetch("/api/extract-ticket", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setSaveError(data?.error || "Failed to analyze image.");
      return;
    }

    if (data.ticketType) setTicketType(data.ticketType);
    if (data.cost !== undefined && data.cost !== null && data.cost !== "") {
      setCost(String(data.cost));
    }
    if (data.date) setDate(data.date);
    if (data.location) setLocation(data.location);
    if (data.summary) setImageSummary(data.summary);

    setExtractMessage("Image analyzed. Review and edit anything before saving.");
  } catch (error) {
    console.error(error);
    setSaveError(
      error instanceof Error ? error.message : "Failed to analyze image."
    );
  } finally {
    setIsExtracting(false);
  }
};
  const validateBeforeSave = () => {
    const parsedCost = Number(cost);
    const parsedAmountWon = amountWon === "" ? 0 : Number(amountWon);
    const selectedDate = new Date(`${date}T00:00:00`);

    if (inputMode === "image" && !uploadedFile) {
      return "Please upload a ticket image or switch to manual entry.";
    }

    if (!ticketType) return "Please choose a ticket type.";
    if (cost.trim() === "") return "Please enter the ticket cost.";
    if (Number.isNaN(parsedCost)) return "Ticket cost must be a valid number.";
    if (parsedCost <= 0) return "Ticket cost must be greater than 0.";
    if (parsedCost > 1000) return "Ticket cost looks too high. Please check it.";

    if (!date) return "Please choose the purchase date.";
    if (Number.isNaN(selectedDate.getTime())) return "Please enter a valid date.";

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    if (selectedDate > endOfToday) return "Purchase date cannot be in the future.";

    if (amountWon !== "" && Number.isNaN(parsedAmountWon)) {
      return "Amount won must be a valid number.";
    }

    if (parsedAmountWon < 0) return "Amount won cannot be negative.";
    if (parsedAmountWon > 100000000) {
      return "Amount won looks unrealistically high. Please check it.";
    }

    if (location.trim().length > 120) {
      return "Location is too long. Keep it under 120 characters.";
    }

    return null;
  };

  const handleSaveTicket = async () => {
    setSaveError("");
    setSuccessMessage("");
    setAiSummary("");

    const validationError = validateBeforeSave();
    if (validationError) {
      setSaveError(validationError);
      return;
    }

    const parsedCost = Number(cost);
    const parsedAmountWon = amountWon === "" ? 0 : Number(amountWon);

    setIsSaving(true);

    const ticket = {
      id: crypto.randomUUID(),
      inputMethod: inputMode,
      ticketType,
      cost: parsedCost,
      date,
      location: location.trim(),
      latitude: coords?.latitude ?? null,
      longitude: coords?.longitude ?? null,
      confidence,
      excitement,
      feelsDifferent,
      amountWon: parsedAmountWon,
      postSatisfaction,
      wasRight,
      imageSummary,
      imageName: uploadedFile?.name ?? null,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("gut_tickets") || "[]");
      localStorage.setItem("gut_tickets", JSON.stringify([ticket, ...existing]));

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to analyze ticket.");
      }

      const analysis = {
        ticketId: ticket.id,
        summary: data.summary ?? "",
        calibration: data.calibration ?? "",
        observation: data.observation ?? "",
        createdAt: new Date().toISOString(),
      };

      const existingAnalyses = JSON.parse(
        localStorage.getItem("gut_ticket_analyses") || "[]"
      );
      localStorage.setItem(
        "gut_ticket_analyses",
        JSON.stringify([analysis, ...existingAnalyses])
      );

      setAiSummary(data.summary ?? "Ticket saved successfully.");
      setSuccessMessage("Ticket saved successfully.");

      setTimeout(() => {
        onOpenChange(false);
        window.location.reload();
      }, 700);
    } catch (error) {
      console.error(error);
      setSaveError(
        error instanceof Error
          ? error.message
          : "Failed to save ticket or generate AI analysis."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />

      <div className="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl max-h-[calc(100vh-2rem)] overflow-hidden animate-scale-in">
        <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl shadow-black/30 flex flex-col max-h-full overflow-hidden">
          <div className="relative overflow-hidden border-b border-border/30">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-accent/8" />
            <div className="relative flex items-center justify-between p-5">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Log New Ticket</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Step {step} of 3
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="w-9 h-9 rounded-xl bg-secondary/50 hover:bg-secondary flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="h-1 bg-secondary/30">
              <div
                className="h-full bg-gradient-to-r from-primary via-primary to-accent transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {step === 1 && (
              <div className="space-y-6 animate-fade-up">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInputMode("image")}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition-all",
                      inputMode === "image"
                        ? "border-primary bg-primary/10 ring-1 ring-primary/40"
                        : "border-border/50 bg-secondary/20 hover:bg-secondary/30"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <ImagePlus className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Upload image</p>
                        <p className="text-xs text-muted-foreground">Analyze a ticket photo</p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputMode("manual")}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition-all",
                      inputMode === "manual"
                        ? "border-accent bg-accent/10 ring-1 ring-accent/40"
                        : "border-border/50 bg-secondary/20 hover:bg-secondary/30"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <PencilLine className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Type manually</p>
                        <p className="text-xs text-muted-foreground">Enter everything yourself</p>
                      </div>
                    </div>
                  </button>
                </div>

                {inputMode === "image" && (
                  <div className="rounded-2xl border border-border/40 bg-secondary/15 p-4 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Ticket image</p>
                        <p className="text-xs text-muted-foreground">
                          Upload a photo and let Gemini fill the fields
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider bg-primary/10 text-primary">
                        Vision
                      </div>
                    </div>

                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setUploadedFile(file);
                          setExtractMessage("");
                          setImageSummary("");
                          setSaveError("");
                        }}
                      />
                      <div className="cursor-pointer rounded-2xl border border-dashed border-border/50 bg-background/40 p-5 hover:bg-background/60 transition-colors">
                        <div className="flex flex-col items-center justify-center text-center gap-2">
                          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <UploadCloud className="w-6 h-6 text-primary" />
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            {uploadedFile ? uploadedFile.name : "Choose an image"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, WEBP — best with clear receipt/ticket text
                          </p>
                        </div>
                      </div>
                    </label>

                    {previewUrl && (
                      <div className="overflow-hidden rounded-2xl border border-border/40 bg-background/30">
                        <img
                          src={previewUrl}
                          alt="Ticket preview"
                          className="w-full max-h-72 object-contain bg-black/20"
                        />
                      </div>
                    )}

                    <Button
                      type="button"
                      onClick={handleAnalyzeImage}
                      disabled={!uploadedFile || isExtracting}
                      className="w-full gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    >
                      {isExtracting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Analyzing image...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          Analyze image with Gemini
                        </>
                      )}
                    </Button>

                    {extractMessage && (
                      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                        <p className="text-sm text-muted-foreground">{extractMessage}</p>
                      </div>
                    )}

                    {imageSummary && (
                      <div className="rounded-xl border border-border/40 bg-background/40 p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <p className="text-sm font-medium text-foreground">Image summary</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{imageSummary}</p>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Ticket Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {ticketTypes.map((type) => (
                      <button
                        type="button"
                        key={type.value}
                        onClick={() => setTicketType(type.value)}
                        className={cn(
                          "p-3 rounded-xl border text-center transition-all",
                          ticketType === type.value
                            ? "border-primary bg-primary/10 ring-1 ring-primary/50"
                            : "border-border/50 hover:border-border hover:bg-secondary/20"
                        )}
                      >
                        <span className="text-xl mb-1 block">{type.emoji}</span>
                        <span className="text-xs text-foreground">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Cost</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-11 pl-9 pr-4 bg-secondary/30 border border-border/40 rounded-xl text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full h-11 pl-9 pr-4 bg-secondary/30 border border-border/40 rounded-xl text-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Store name or area"
                      className="w-full h-11 pl-9 pr-4 bg-secondary/30 border border-border/40 rounded-xl text-foreground"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleUseLocation}
                    className="w-full gap-2"
                  >
                    <LocateFixed className="w-4 h-4" />
                    Use Current Location
                  </Button>

                  {coords && (
                    <p className="text-xs text-muted-foreground">
                      Location captured: {coords.latitude.toFixed(4)},{" "}
                      {coords.longitude.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-up">
                <PremiumSlider
                  label="Confidence"
                  sublabel="How sure did you feel before buying?"
                  value={confidence}
                  onChange={setConfidence}
                />
                <PremiumSlider
                  label="Excitement"
                  sublabel="How emotionally charged did this ticket feel?"
                  value={excitement}
                  onChange={setExcitement}
                  color="accent"
                />
                <PremiumSlider
                  label="Feels Different"
                  sublabel="Did this ticket feel unusually special?"
                  value={feelsDifferent}
                  onChange={setFeelsDifferent}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-up">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Amount Won</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amountWon}
                    onChange={(e) => setAmountWon(e.target.value)}
                    placeholder="0.00"
                    className="w-full h-11 px-4 bg-secondary/30 border border-border/40 rounded-xl text-foreground"
                  />
                </div>

                <PremiumSlider
                  label="Post-result Satisfaction"
                  sublabel="How satisfied were you after the result?"
                  value={postSatisfaction}
                  onChange={setPostSatisfaction}
                />

                <PremiumSlider
                  label="How right was your gut?"
                  sublabel="Your own rating after seeing the result"
                  value={wasRight}
                  onChange={setWasRight}
                  color="accent"
                />

                {successMessage && (
                  <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                    <p className="text-sm font-medium text-foreground mb-1">
                      Saved successfully
                    </p>
                    <p className="text-sm text-muted-foreground">{successMessage}</p>
                  </div>
                )}

                {aiSummary && (
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm font-medium text-foreground mb-1">AI quick read</p>
                    <p className="text-sm text-muted-foreground">{aiSummary}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-5 border-t border-border/30 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1 || isSaving || isExtracting}
            >
              Back
            </Button>

            <div className="flex items-center gap-3">
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={() => setStep((s) => Math.min(3, s + 1))}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSaveTicket}
                  disabled={isSaving || isExtracting}
                  className="gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Save Ticket
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {saveError && (
            <div className="px-5 pb-5">
              <p className="text-sm text-destructive">{saveError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}