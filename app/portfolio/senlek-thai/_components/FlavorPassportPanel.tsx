"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { menuItems } from "../_data/menu";
import { restaurantInfo } from "../_data/restaurant-info";
import type { MenuItem } from "../_lib/types";
import { formatPrice } from "../_lib/utils";
import { Button } from "./ui/button";

interface PassportPreferences {
  spiceProfile: string;
  usualOrder: string;
}

const defaultPreferences: PassportPreferences = {
  spiceProfile: "Balanced",
  usualOrder: "Pickup after work"
};

export function FlavorPassportPanel() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<PassportPreferences>(defaultPreferences);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const rawFavorites = window.localStorage.getItem(restaurantInfo.storageKeys.favorites);
      const rawPreferences = window.localStorage.getItem(restaurantInfo.storageKeys.preferences);

      setFavoriteIds(rawFavorites ? JSON.parse(rawFavorites) : []);
      setPreferences(rawPreferences ? JSON.parse(rawPreferences) : defaultPreferences);
    } catch {
      setFavoriteIds([]);
      setPreferences(defaultPreferences);
    } finally {
      setReady(true);
    }
  }, []);

  function persist(nextFavorites: string[], nextPreferences = preferences) {
    setFavoriteIds(nextFavorites);
    setPreferences(nextPreferences);
    window.localStorage.setItem(restaurantInfo.storageKeys.favorites, JSON.stringify(nextFavorites));
    window.localStorage.setItem(restaurantInfo.storageKeys.preferences, JSON.stringify(nextPreferences));
  }

  function removeFavorite(itemId: string) {
    persist(favoriteIds.filter((favoriteId) => favoriteId !== itemId));
  }

  function updatePreference(field: keyof PassportPreferences, value: string) {
    const nextPreferences = {
      ...preferences,
      [field]: value
    };
    persist(favoriteIds, nextPreferences);
  }

  const favorites = menuItems.filter((item) => favoriteIds.includes(item.id));

  if (!ready) {
    return null;
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]" data-testid="flavor-passport">
      <div className="rounded-[32px] border border-[rgba(57,73,171,0.12)] bg-[linear-gradient(180deg,rgba(26,35,126,0.98),rgba(40,53,147,0.96))] p-6 text-white shadow-[0_22px_52px_rgba(26,35,126,0.18)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--senlek-gold-300)]">
          Your local profile
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold">Save the dishes you crave most.</h2>
        <p className="mt-4 text-sm leading-7 text-white/78">
          This passport lives in the browser, so it works today without forcing the restaurant to manage accounts or a loyalty backend before they are ready.
        </p>

        <div className="mt-8 grid gap-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-white">Spice profile</span>
            <select
              value={preferences.spiceProfile}
              onChange={(event) => updatePreference("spiceProfile", event.target.value)}
              className="h-12 w-full rounded-[18px] border border-white/12 bg-white/8 px-4 text-sm text-white outline-none transition focus:border-[var(--senlek-gold-300)]"
            >
              <option className="text-black">Balanced</option>
              <option className="text-black">Mild and cozy</option>
              <option className="text-black">Medium Thai heat</option>
              <option className="text-black">Bring the chili</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-white">Usual order mood</span>
            <select
              value={preferences.usualOrder}
              onChange={(event) => updatePreference("usualOrder", event.target.value)}
              className="h-12 w-full rounded-[18px] border border-white/12 bg-white/8 px-4 text-sm text-white outline-none transition focus:border-[var(--senlek-gold-300)]"
            >
              <option className="text-black">Pickup after work</option>
              <option className="text-black">Weekend comfort order</option>
              <option className="text-black">Lunch reset</option>
              <option className="text-black">Delivery night in</option>
            </select>
          </label>
        </div>

        <div className="mt-8 rounded-[24px] border border-white/10 bg-black/10 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--senlek-gold-300)]">
            Current profile
          </p>
          <div className="mt-3 grid gap-2 text-sm text-white/80">
            <p>Favorites saved: {favorites.length}</p>
            <p>Spice profile: {preferences.spiceProfile}</p>
            <p>Usual order mode: {preferences.usualOrder}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a href={restaurantInfo.toast} target="_blank" rel="noreferrer">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reorder With Toast
            </a>
          </Button>
          <Button asChild variant="secondary">
            <Link href={`${restaurantInfo.basePath}/menu`}>Browse Menu</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-[32px] border border-[rgba(57,73,171,0.12)] bg-white p-6 shadow-[0_18px_44px_rgba(26,35,126,0.08)] sm:p-8">
        <div className="flex items-center gap-3">
          <Heart className="h-5 w-5 text-[var(--senlek-gold-600)]" />
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--senlek-gold-600)]">
            Saved favorites
          </p>
        </div>
        <h3 className="mt-4 font-display text-4xl font-bold text-[var(--senlek-blue-900)]">
          {favorites.length ? "Your repeat-order shortlist." : "No favorites saved yet."}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--senlek-warm-gray-500)]">
          Save dishes from the menu details view, then come back here to build faster reorders and keep your go-to Thai night organized.
        </p>

        {favorites.length ? (
          <div className="mt-8 grid gap-4">
            {favorites.map((item) => (
              <FavoriteCard key={item.id} item={item} onRemove={removeFavorite} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[26px] border border-dashed border-[rgba(57,73,171,0.18)] bg-[var(--senlek-cream)] p-6 text-sm leading-7 text-[var(--senlek-warm-gray-500)]">
            Open a dish from the menu, tap <span className="font-semibold text-[var(--senlek-blue-900)]">Save To Passport</span>, and your favorites will appear here automatically.
          </div>
        )}
      </div>
    </div>
  );
}

function FavoriteCard({ item, onRemove }: { item: MenuItem; onRemove: (itemId: string) => void }) {
  return (
    <article className="grid gap-4 rounded-[24px] border border-[rgba(57,73,171,0.12)] bg-[var(--senlek-warm-white)] p-4 sm:grid-cols-[104px_1fr]">
      <div className="senlek-watermark relative overflow-hidden rounded-[18px]">
        <Image
          src={item.image}
          alt={`${item.name} from Senlek Thai Rice & Noodles.`}
          width={400}
          height={400}
          className="aspect-square w-full object-cover"
          placeholder="empty"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-2xl font-bold text-[var(--senlek-blue-900)]">{item.name}</p>
          <p className="mt-2 text-sm leading-7 text-[var(--senlek-warm-gray-500)]">{item.description}</p>
          <p className="mt-3 text-sm font-semibold text-[var(--senlek-gold-600)]">{formatPrice(item.price)}</p>
        </div>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(57,73,171,0.14)] text-[var(--senlek-blue-900)] transition hover:border-[var(--senlek-gold-500)] hover:text-[var(--senlek-gold-600)]"
          aria-label={`Remove ${item.name} from flavor passport`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
