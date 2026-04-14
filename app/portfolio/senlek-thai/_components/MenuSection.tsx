"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { startTransition, useDeferredValue, useEffect, useState } from "react";

import { menuFilters, menuItems } from "../_data/menu";
import { restaurantInfo } from "../_data/restaurant-info";
import type { DietaryTag, MenuFilter, MenuItem } from "../_lib/types";
import { cn, getSuggestedPairings } from "../_lib/utils";
import { DishDetailDialog } from "./DishDetailDialog";
import { MenuCard } from "./MenuCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type QuickFilter = "all" | "popular" | DietaryTag;
type SpiceFilter = "all" | "mild" | "medium" | "hot";

const quickFilters: Array<{ id: QuickFilter; label: string }> = [
  { id: "all", label: "All dishes" },
  { id: "popular", label: "Popular" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "seafood", label: "Seafood" },
  { id: "pork", label: "Pork" },
  { id: "beef", label: "Beef" },
  { id: "tofu", label: "Tofu" },
  { id: "spicy", label: "Spicy" }
];

const spiceFilters: Array<{ id: SpiceFilter; label: string }> = [
  { id: "all", label: "Any heat" },
  { id: "mild", label: "Mild" },
  { id: "medium", label: "Medium+" },
  { id: "hot", label: "Hot" }
];

export function MenuSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<MenuFilter>("all");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [spiceFilter, setSpiceFilter] = useState<SpiceFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDishId, setActiveDishId] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const deferredSearchTerm = useDeferredValue(searchTerm.trim().toLowerCase());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    try {
      const storedFavorites = window.localStorage.getItem(restaurantInfo.storageKeys.favorites);
      setFavoriteIds(storedFavorites ? JSON.parse(storedFavorites) : []);
    } catch {
      setFavoriteIds([]);
    }
  }, []);

  function persistFavorites(nextFavorites: string[]) {
    setFavoriteIds(nextFavorites);
    window.localStorage.setItem(restaurantInfo.storageKeys.favorites, JSON.stringify(nextFavorites));
  }

  function toggleFavorite(itemId: string) {
    if (favoriteIds.includes(itemId)) {
      persistFavorites(favoriteIds.filter((favoriteId) => favoriteId !== itemId));
      return;
    }

    persistFavorites([...favoriteIds, itemId]);
  }

  function matchesQuickFilter(item: MenuItem) {
    if (quickFilter === "all") {
      return true;
    }

    if (quickFilter === "popular") {
      return item.isPopular;
    }

    return item.dietaryTags.includes(quickFilter);
  }

  function matchesSpiceFilter(item: MenuItem) {
    if (spiceFilter === "all") {
      return true;
    }

    if (spiceFilter === "mild") {
      return item.spiceLevel <= 1;
    }

    if (spiceFilter === "medium") {
      return item.spiceLevel >= 2;
    }

    return item.spiceLevel === 3;
  }

  const selectedMenuFilter = menuFilters.find((filter) => filter.id === activeFilter) ?? menuFilters[0];
  const visibleItems = menuItems.filter((item) => {
    const matchesCategory = selectedMenuFilter.categories.includes(item.category);
    const matchesSearch =
      !deferredSearchTerm ||
      [item.name, item.thaiName ?? "", item.description, item.code].join(" ").toLowerCase().includes(deferredSearchTerm);

    return matchesCategory && matchesSearch && matchesQuickFilter(item) && matchesSpiceFilter(item);
  });

  const activeDish = menuItems.find((item) => item.id === activeDishId) ?? null;
  const relatedItems = activeDish ? getSuggestedPairings(activeDish, menuItems) : [];

  function clearRefinements() {
    setQuickFilter("all");
    setSpiceFilter("all");
    setSearchTerm("");
  }

  if (!isMounted) {
    return (
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {menuItems.slice(0, 12).map((item) => (
          <div key={item.id} className="h-full">
            <MenuCard item={item} isSaved={false} onOpen={() => undefined} onToggleSave={() => undefined} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[32px] border border-[rgba(57,73,171,0.12)] bg-white/70 p-5 shadow-[0_18px_40px_rgba(26,35,126,0.06)] backdrop-blur-sm sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_auto] lg:items-end">
          <div>
            <label htmlFor="senlek-menu-search" className="text-sm font-semibold text-[var(--senlek-blue-900)]">
              Search the menu
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-[20px] border border-[rgba(57,73,171,0.12)] bg-[var(--senlek-warm-white)] px-4 py-3">
              <Search className="h-4 w-4 text-[var(--senlek-warm-gray-500)]" />
              <input
                id="senlek-menu-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Pad Thai, curry, noodles, Thai tea..."
                className="w-full bg-transparent text-sm text-[var(--senlek-blue-900)] outline-none placeholder:text-[var(--senlek-warm-gray-500)]"
              />
              {searchTerm ? (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--senlek-warm-gray-500)] transition hover:bg-[var(--senlek-blue-50)]"
                  aria-label="Clear menu search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-[20px] border border-[rgba(57,73,171,0.12)] bg-[var(--senlek-warm-white)] px-4 py-3 text-sm text-[var(--senlek-warm-gray-500)]">
            <SlidersHorizontal className="h-4 w-4 text-[var(--senlek-gold-600)]" />
            <span>
              Showing <span className="font-semibold text-[var(--senlek-blue-900)]">{visibleItems.length}</span> dishes
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setQuickFilter(filter.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                quickFilter === filter.id
                  ? "border-[var(--senlek-gold-500)] bg-[var(--senlek-gold-100)] text-[var(--senlek-blue-900)]"
                  : "border-[rgba(57,73,171,0.14)] bg-white text-[var(--senlek-warm-gray-500)] hover:border-[var(--senlek-gold-400)]"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {spiceFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setSpiceFilter(filter.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition",
                spiceFilter === filter.id
                  ? "border-[var(--senlek-red-500)] bg-[rgba(229,57,53,0.08)] text-[var(--senlek-red-600)]"
                  : "border-[rgba(57,73,171,0.14)] bg-white text-[var(--senlek-warm-gray-500)] hover:border-[var(--senlek-red-400)]"
              )}
            >
              {filter.label}
            </button>
          ))}

          {(quickFilter !== "all" || spiceFilter !== "all" || searchTerm) && (
            <button
              type="button"
              onClick={clearRefinements}
              className="inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--senlek-blue-900)] transition hover:border-[rgba(57,73,171,0.14)] hover:bg-white"
            >
              <X className="h-3.5 w-3.5" />
              Clear refinements
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Tabs
          value={activeFilter}
          onValueChange={(value) => startTransition(() => setActiveFilter(value as MenuFilter))}
        >
          <TabsList aria-label="Menu categories" className="max-w-full">
            {menuFilters.map((filter) => (
              <TabsTrigger key={filter.id} value={filter.id} className="data-[state=active]:font-bold">
                {filter.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeFilter} key={activeFilter}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFilter}-${quickFilter}-${spiceFilter}-${deferredSearchTerm}`}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.28 }}
                className={cn("grid items-stretch gap-6", "lg:grid-cols-2")}
              >
                {visibleItems.length ? (
                  visibleItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                      className="h-full"
                    >
                      <MenuCard
                        item={item}
                        isSaved={favoriteIds.includes(item.id)}
                        onOpen={setActiveDishId}
                        onToggleSave={toggleFavorite}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[32px] border border-dashed border-[rgba(57,73,171,0.18)] bg-white px-6 py-12 text-center lg:col-span-2"
                  >
                    <Sparkles className="mx-auto h-8 w-8 text-[var(--senlek-gold-600)]" />
                    <h3 className="mt-4 font-display text-3xl font-bold text-[var(--senlek-blue-900)]">
                      No dishes match those filters yet.
                    </h3>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--senlek-warm-gray-500)]">
                      Reset the refinements or try a broader search to explore more of the menu.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>

      <DishDetailDialog
        item={activeDish}
        relatedItems={relatedItems}
        isSaved={activeDish ? favoriteIds.includes(activeDish.id) : false}
        onClose={() => setActiveDishId(null)}
        onToggleSave={toggleFavorite}
      />
    </>
  );
}
