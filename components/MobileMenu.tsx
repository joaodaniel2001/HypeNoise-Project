"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { NavItems } from "./NavItems";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="sm:hidden block relative">
      <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        <Menu
          className={`${isOpen ? "rotate-90 text-primary" : ""} transition-all`}
        />
      </button>

      {isOpen && (
        <div className="fixed top-19 left-0 w-screen h-[calc(100vh-76px)] bg-background/95 backdrop-blur-3xl z-50">
          <NavItems isMobile onLinkClick={closeMenu} />
        </div>
      )}
    </div>
  );
}