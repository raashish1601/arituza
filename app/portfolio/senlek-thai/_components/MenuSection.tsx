"use client";

import { AnimatePresence, motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";
import { useMemo, useState } from "react";

import { menuFilters, menuItems } from "../_data/menu";
import type { MenuFilter } from "../_lib/types";
import { cn } from "../_lib/utils";
import { restaurantInfo } from "../_data/restaurant-info";
import { MenuCard } from "./MenuCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function MenuSection() {
  const [activeFilter, setActiveFilter] = useState<MenuFilter>("all");

  const groupedItems = useMemo(() => {
    const filter = menuFilters.find((item) => item.id === activeFilter) ?? menuFilters[0];
    return menuItems.filter((item) => filter.categories.includes(item.category));
  }, [activeFilter]);

  return (
    <>
      <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as MenuFilter)}>
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
              key={activeFilter}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.28 }}
              className={cn("grid items-stretch gap-6", "lg:grid-cols-2")}
            >
              {groupedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="h-full"
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>

      <a
        href={restaurantInfo.toast}
        target="_blank"
        rel="noreferrer"
        className="senlek-fab fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--senlek-gold-500)] text-[var(--senlek-dark)] shadow-[0_18px_40px_rgba(212,160,23,0.35)] transition hover:-translate-y-1 md:hidden"
        aria-label="Order online"
      >
        <UtensilsCrossed className="h-6 w-6" />
      </a>
    </>
  );
}
