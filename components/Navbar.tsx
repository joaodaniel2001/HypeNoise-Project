"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { NavItems } from "./NavItems";
import { SearchForm } from "./SearchForm";

const NavLogo = () => (
  <Link href="/" className="font-bebas text-3xl">
    HYPE<span className="text-primary">NOISE</span>
  </Link>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full py-5 sm:px-20 px-10 flex justify-between items-center z-50 transition-all ${
        isScrolled
          ? "backdrop-blur-3xl bg-background/80 border-b border-white/5"
          : ""
      }`}
    >
      {/* Botão e Menu Mobile */}
      <MobileMenu />

      {/* Logo da Marca */}
      <NavLogo />

      {/* Links Desktop */}
      <div className="hidden sm:block">
        <NavItems />
      </div>

      {/* Ações da Direita */}
      <div className="flex gap-4 items-center justify-center">
        <SearchForm />

        <Link
          href="/login"
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
