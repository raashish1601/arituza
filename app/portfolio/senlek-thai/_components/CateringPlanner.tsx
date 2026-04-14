"use client";

import { Copy, ExternalLink, PartyPopper, PhoneCall } from "lucide-react";
import { useMemo, useState } from "react";

import { cateringPackages } from "../_data/experience";
import { restaurantInfo } from "../_data/restaurant-info";
import { Button } from "./ui/button";

const defaultPackageId = cateringPackages[1]?.id ?? cateringPackages[0]?.id ?? "";

export function CateringPlanner() {
  const [selectedPackage, setSelectedPackage] = useState(defaultPackageId);
  const [eventType, setEventType] = useState("Office lunch");
  const [guestCount, setGuestCount] = useState("16");
  const [serviceStyle, setServiceStyle] = useState("Pickup");
  const [timing, setTiming] = useState("Next Thursday at 12:15 PM");
  const [notes, setNotes] = useState("A mix of comforting noodles, one vegetarian dish, and medium spice overall.");
  const [copied, setCopied] = useState(false);

  const activePackage = cateringPackages.find((item) => item.id === selectedPackage) ?? cateringPackages[0];

  const brief = useMemo(() => {
    return [
      `Senlek catering brief`,
      `Package: ${activePackage?.title ?? "Custom quote"}`,
      `Event: ${eventType}`,
      `Guests: ${guestCount}`,
      `Service style: ${serviceStyle}`,
      `Timing: ${timing}`,
      `Notes: ${notes}`
    ].join("\n");
  }, [activePackage?.title, eventType, guestCount, notes, serviceStyle, timing]);

  function setCopiedState() {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  function fallbackCopy(value: string) {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, value.length);

    const didCopy = document.execCommand("copy");
    document.body.removeChild(textArea);

    return didCopy;
  }

  async function copyBrief() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(brief);
        setCopiedState();
        return;
      }

      if (fallbackCopy(brief)) {
        setCopiedState();
        return;
      }
    } catch {
      if (fallbackCopy(brief)) {
        setCopiedState();
        return;
      }
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[32px] border border-[rgba(57,73,171,0.12)] bg-white p-6 shadow-[0_18px_44px_rgba(26,35,126,0.08)] sm:p-8">
        <div className="flex items-center gap-3">
          <PartyPopper className="h-5 w-5 text-[var(--senlek-gold-600)]" />
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--senlek-gold-600)]">
            Event Planner
          </p>
        </div>
        <h2 className="mt-4 font-display text-4xl font-bold text-[var(--senlek-blue-900)]">
          Build your event brief in under two minutes.
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--senlek-warm-gray-500)]">
          Pick the closest service style, shape the event details, and generate a clean summary for your call with the restaurant.
        </p>

        <div className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--senlek-blue-900)]">Package direction</span>
            <select
              value={selectedPackage}
              onChange={(event) => setSelectedPackage(event.target.value)}
              className="h-12 w-full rounded-[18px] border border-[rgba(57,73,171,0.16)] bg-[var(--senlek-warm-white)] px-4 text-sm text-[var(--senlek-blue-900)] outline-none transition focus:border-[var(--senlek-gold-500)]"
            >
              {cateringPackages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} - {item.guestRange}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--senlek-blue-900)]">Event type</span>
              <input
                value={eventType}
                onChange={(event) => setEventType(event.target.value)}
                className="h-12 w-full rounded-[18px] border border-[rgba(57,73,171,0.16)] bg-[var(--senlek-warm-white)] px-4 text-sm text-[var(--senlek-blue-900)] outline-none transition focus:border-[var(--senlek-gold-500)]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--senlek-blue-900)]">Guest count</span>
              <input
                value={guestCount}
                onChange={(event) => setGuestCount(event.target.value)}
                className="h-12 w-full rounded-[18px] border border-[rgba(57,73,171,0.16)] bg-[var(--senlek-warm-white)] px-4 text-sm text-[var(--senlek-blue-900)] outline-none transition focus:border-[var(--senlek-gold-500)]"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--senlek-blue-900)]">Service style</span>
              <select
                value={serviceStyle}
                onChange={(event) => setServiceStyle(event.target.value)}
                className="h-12 w-full rounded-[18px] border border-[rgba(57,73,171,0.16)] bg-[var(--senlek-warm-white)] px-4 text-sm text-[var(--senlek-blue-900)] outline-none transition focus:border-[var(--senlek-gold-500)]"
              >
                <option>Pickup</option>
                <option>Delivery</option>
                <option>Not sure yet</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[var(--senlek-blue-900)]">Timing</span>
              <input
                value={timing}
                onChange={(event) => setTiming(event.target.value)}
                className="h-12 w-full rounded-[18px] border border-[rgba(57,73,171,0.16)] bg-[var(--senlek-warm-white)] px-4 text-sm text-[var(--senlek-blue-900)] outline-none transition focus:border-[var(--senlek-gold-500)]"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--senlek-blue-900)]">Notes for the team</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={5}
              className="w-full rounded-[20px] border border-[rgba(57,73,171,0.16)] bg-[var(--senlek-warm-white)] px-4 py-3 text-sm leading-7 text-[var(--senlek-blue-900)] outline-none transition focus:border-[var(--senlek-gold-500)]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-[32px] border border-[rgba(57,73,171,0.12)] bg-[linear-gradient(180deg,rgba(26,35,126,0.98),rgba(40,53,147,0.96))] p-6 text-white shadow-[0_22px_52px_rgba(26,35,126,0.18)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--senlek-gold-300)]">
          Event summary
        </p>
        <h3 className="mt-4 font-display text-4xl font-bold leading-tight">Your Senlek brief is ready.</h3>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/74">
          Copy this summary before you call, then move into direct ordering or final approval with the restaurant.
        </p>

        <pre
          className="mt-8 w-full overflow-auto whitespace-pre-wrap break-words rounded-[28px] border border-white/10 bg-white/6 p-5 text-sm leading-7 text-white/88"
          data-testid="catering-brief-preview"
        >
          {brief}
        </pre>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={copyBrief}>
            <Copy className="mr-2 h-4 w-4" />
            {copied ? "Copied" : "Copy Brief"}
          </Button>
          <Button asChild variant="secondary">
            <a href={restaurantInfo.toast} target="_blank" rel="noreferrer">
              Start With Toast
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href={restaurantInfo.phoneHref}>
              <PhoneCall className="mr-2 h-4 w-4" />
              Call To Confirm
            </a>
          </Button>
        </div>

        <div className="mt-8 rounded-[24px] border border-white/10 bg-black/10 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--senlek-gold-300)]">
            Why this works
          </p>
          <p className="mt-3 text-sm leading-7 text-white/78">
            The planner keeps the website operationally useful even before a restaurant-specific catering backend is connected. The guest arrives prepared, the call gets shorter, and the order starts cleaner.
          </p>
        </div>
      </div>
    </div>
  );
}
