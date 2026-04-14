import Link from "next/link";
import { Camera, Gift, MapPin, Phone, Sparkles, Users } from "lucide-react";

import { restaurantInfo } from "../_data/restaurant-info";

export function Footer() {
  return (
    <footer className="bg-[var(--senlek-dark)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div>
            <p className="font-display text-3xl font-bold tracking-[0.16em]">SENLEK</p>
            <p className="mt-2 text-xs uppercase tracking-[0.38em] text-white/65">Thai Rice & Noodles</p>
          </div>
          <p className="max-w-xs text-sm leading-7 text-white/70">{restaurantInfo.tagline}</p>
          <p className="text-sm leading-7 text-white/60">
            Authentic Thai street food in Hoover, Alabama with house-made sauces, broths, and warm hospitality.
          </p>
        </div>

        <div className="space-y-4">
          <p className="font-semibold uppercase tracking-[0.24em] text-[var(--senlek-gold-300)]">Quick Links</p>
          <div className="flex flex-col gap-3 text-sm text-white/75">
            <Link href={restaurantInfo.basePath}>Home</Link>
            <Link href={`${restaurantInfo.basePath}/menu`}>Menu</Link>
            <Link href={`${restaurantInfo.basePath}/catering`}>Catering</Link>
            <Link href={`${restaurantInfo.basePath}/gift-cards`}>Gift Cards</Link>
            <Link href={`${restaurantInfo.basePath}/rewards`}>Rewards</Link>
            <Link href={`${restaurantInfo.basePath}/about`}>About</Link>
            <Link href={`${restaurantInfo.basePath}/contact`}>Contact</Link>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-semibold uppercase tracking-[0.24em] text-[var(--senlek-gold-300)]">Client Ready</p>
          <div className="space-y-3 text-sm text-white/75">
            <p className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 shrink-0 text-[var(--senlek-gold-300)]" />
              Live order status and sticky order bar
            </p>
            <p className="flex items-center gap-3">
              <Users className="h-4 w-4 shrink-0 text-[var(--senlek-gold-300)]" />
              Catering planner and event brief builder
            </p>
            <p className="flex items-center gap-3">
              <Gift className="h-4 w-4 shrink-0 text-[var(--senlek-gold-300)]" />
              Gift flows and repeat-guest passport
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-semibold uppercase tracking-[0.24em] text-[var(--senlek-gold-300)]">Visit & Connect</p>
          <div className="space-y-3 text-sm text-white/75">
            <a href={restaurantInfo.mapsLink} target="_blank" rel="noreferrer" className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--senlek-gold-300)]" />
              <span>
                {restaurantInfo.addressLine1}
                <br />
                {restaurantInfo.addressLine2}
              </span>
            </a>
            <a href={restaurantInfo.phoneHref} className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-[var(--senlek-gold-300)]" />
              <span>{restaurantInfo.phoneDisplay}</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={restaurantInfo.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition duration-300 hover:rotate-[10deg] hover:scale-105 hover:border-[var(--senlek-gold-300)]"
              aria-label="Instagram"
            >
              <Camera className="h-5 w-5" />
            </a>
            <a
              href={restaurantInfo.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition duration-300 hover:rotate-[10deg] hover:scale-105 hover:border-[var(--senlek-gold-300)]"
              aria-label="Facebook"
            >
              <Users className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-[rgba(212,160,23,0.28)] px-4 py-5 text-sm text-white/60 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8">
        <p>© 2025 Senlek Thai Rice & Noodles. All rights reserved.</p>
        <p>
          Website by{" "}
          <Link href="/" className="text-[var(--senlek-gold-300)] transition hover:text-white">
            Arituza
          </Link>
        </p>
      </div>
    </footer>
  );
}
