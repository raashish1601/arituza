"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { restaurantInfo } from "../_data/restaurant-info";
import { cn } from "../_lib/utils";
import { Button } from "./ui/button";

const navLinks = [
  { href: restaurantInfo.basePath, label: "Home" },
  { href: `${restaurantInfo.basePath}/menu`, label: "Menu" },
  { href: `${restaurantInfo.basePath}/about`, label: "About" },
  { href: `${restaurantInfo.basePath}/contact`, label: "Contact" }
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-x-0 top-0 z-50 bg-[rgba(28,23,20,0.9)] shadow-[0_18px_40px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href={restaurantInfo.basePath} className="group shrink-0 text-white" aria-label="Senlek Thai Rice & Noodles home">
            <div className="font-display text-3xl font-extrabold tracking-[0.18em] text-white">SENLEK</div>
            <div className="mt-1 border-t border-[var(--senlek-gold-400)] pt-1 text-[0.65rem] uppercase tracking-[0.4em] text-white/80">
              Thai Rice & Noodles
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Senlek Thai primary">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative py-2 text-sm font-semibold tracking-[0.08em] text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-1 h-px overflow-hidden">
                    <span
                      className={cn(
                        "block h-full bg-[var(--senlek-gold-400)] transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </span>
                  {isActive ? (
                    <motion.span
                      layoutId="senlek-active-nav"
                      className="absolute inset-x-0 -bottom-3 mx-auto h-1.5 w-1.5 rounded-full bg-[var(--senlek-gold-400)]"
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="secondary">
              <Link href={`${restaurantInfo.basePath}/menu`}>View Menu</Link>
            </Button>
            <Button asChild className="senlek-shimmer">
              <a href={restaurantInfo.toast} target="_blank" rel="noreferrer">
                Order Online
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:border-[var(--senlek-gold-300)] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="senlek-mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.aside
            id="senlek-mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col bg-[var(--senlek-blue-900)] px-6 pb-8 pt-24 text-white shadow-[0_24px_60px_rgba(0,0,0,0.3)]"
          >
            <div className="space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex min-h-12 items-center justify-between rounded-[20px] border border-white/10 px-5 py-4 text-lg font-semibold tracking-[0.06em]",
                      pathname === link.href && "border-[var(--senlek-gold-300)] bg-white/10"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                    <ArrowRight className="h-5 w-5 text-[var(--senlek-gold-300)]" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              <Button asChild className="w-full senlek-shimmer">
                <a href={restaurantInfo.toast} target="_blank" rel="noreferrer">
                  Order Online
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <a href={restaurantInfo.phoneHref}>Call {restaurantInfo.phoneDisplay}</a>
              </Button>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
