import { ArrowRight } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { name: "NEW", href: "/#arrivals" },
  { name: "SHOP", href: "/shop" },
  { name: "COLLECTIONS", href: "/collections" },
  { name: "ABOUT", href: "/about" },
];

interface NavItemsProps {
  isMobile?: boolean;
  onLinkClick?: () => void; 
}

export function NavItems({ isMobile = false, onLinkClick }: NavItemsProps) {
  return (
    <div
      className={`flex ${isMobile ? "flex-col w-full" : "flex-row items-center gap-8"}`}
    >
      {NAV_LINKS.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          onClick={onLinkClick}
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
          onClick={onLinkClick}
          className="flex items-center w-full py-6 px-6 text-2xl font-mono font-semibold uppercase hover:text-primary"
        >
          Login
        </Link>
      )}
    </div>
  );
}
