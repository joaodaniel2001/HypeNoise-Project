"use client";

import { ArrowRight, Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GooeyInput } from "./ui/gooey-input";

const NAV_LINKS = [
  { name: "NEW", href: "/#arrivals" },
  { name: "SHOP", href: "/shop" },
  { name: "COLLECTIONS", href: "/collections" },
  { name: "ABOUT", href: "/about" },
];

const NavLogo = () => (
  <Link href="/" className="font-bebas text-3xl">
    HYPE<span className="text-primary">NOISE</span>
  </Link>
);

const NavItems = ({ isMobile = false }: { isMobile?: boolean }) => (
  <div
    className={`flex ${isMobile ? "flex-col w-full" : "flex-row items-center gap-8"}`}
  >
    {NAV_LINKS.map((item, i) => (
      <Link
        key={i}
        href={item.href}
        className={`
          ${
            isMobile
              ? "flex justify-between items-center w-full py-6 border-b border-white/10 px-6 text-2xl"
              : "text-sm"
          } 
          font-mono font-semibold hover:text-primary transition-all uppercase group hover:underline
        `}
      >
        <span>{item.name}</span>
        {isMobile && (
          <ArrowRight
            className="text-white/50 group-hover:text-primary transition-transform group-hover:translate-x-1"
            size={20}
          />
        )}
      </Link>
    ))}

    {isMobile && (
      <Link
        href="/login"
        className="flex items-center w-full py-6 px-6 text-2xl font-mono font-semibold uppercase hover:text-primary"
      >
        Login
      </Link>
    )}
  </div>
);

const NavMenu = () => (
  <div className="absolute top-full left-0 w-screen h-screen bg-background backdrop-blur-3xl z-200">
    <NavItems isMobile />
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full py-5 sm:px-20 px-10 flex justify-between items-center z-100 transition-all ${isScrolled && "backdrop-blur-3xl bg-background/80"}`}
    >
      {/* Botão Mobile */}
      <div className="sm:hidden block relative">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          <Menu
            className={`${isOpen ? "rotate-90 text-primary" : ""} transition-all`}
          />
        </button>
        {isOpen && <NavMenu />}
      </div>

      <NavLogo />

      <div className="hidden sm:block">
        <NavItems />
      </div>

      <div className="flex gap-4 items-center justify-center">
        <div className="cursor-pointer hidden sm:block">
          <GooeyInput placeholder="Search..." />
        </div>

        <Link
          href="/"
          className="cursor-pointer hover:text-primary transition-all"
        >
          <User />
        </Link>

        <div className="cursor-pointer hover:text-primary transition-all">
          <ShoppingCart />
        </div>
      </div>
    </nav>
  );
}
