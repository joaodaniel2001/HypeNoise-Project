import Link from "next/link";
import {
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoYoutube,
} from "react-icons/io";

const SHOP_ITEMS = [
  { name: "New Arrivals", href: "/" },
  { name: "Collections", href: "/" },
  { name: "Sale", href: "/" },
  { name: "Gift Cards", href: "/" },
];

const SUPPORT_ITEMS = [
  { name: "Contact", href: "/" },
  { name: "Shipping", href: "/" },
  { name: "Returns", href: "/" },
  { name: "FAQ", href: "/" },
];

const CONNECT_ITENS = [
  { icon: <IoLogoLinkedin size={25} />, href: "/" },
  { icon: <IoLogoInstagram size={25} />, href: "/" },
  { icon: <IoLogoYoutube size={25} />, href: "/" },
  { icon: <IoLogoTwitter size={25} />, href: "/" },
];

const FOOTER_ITENS = [
  { name: "Privacy", href: "/" },
  { name: "Terms", href: "/" },
  { name: "Cookies", href: "/" },
];

export default function Footer() {
  return (
    <footer className="px-4 md:px-10 bg-background w-full border-t mt-20">
      <div className="mt-10 block md:hidden">
        <h3 className="text-3xl font-bebas tracking-tighter leading-none">
          HYPE<span className="text-primary">NOISE</span>
        </h3>
        <p className="text-muted-foreground">
          Elevating the culture since 2024.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex justify-between py-10">
        <div className="hidden md:block">
          <h3 className="text-3xl font-bebas tracking-tighter leading-none">
            HYPE<span className="text-primary">NOISE</span>
          </h3>
          <p className="text-muted-foreground">
            Elevating the culture since 2024.
          </p>
        </div>

        <div className="flex flex-col">
          <p className="font-mono font-bold ">SHOP</p>
          {SHOP_ITEMS.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className="text-muted-foreground hover:underline"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col">
          <p className="font-mono font-bold ">SUPPORT</p>
          {SUPPORT_ITEMS.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className="text-muted-foreground hover:underline"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono font-bold">CONNECT</p>
          <div className="flex flex-row gap-4">
            {CONNECT_ITENS.map((item, i) => (
              <Link
                href={item.href}
                key={i}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-5 md:flex-row md:justify-between py-5 border-t">
        <p className="text-muted-foreground text-center md:text-left">
          © 2026 HYPENOISE. All rights reserved.
        </p>

        <div className="flex gap-10">
          {FOOTER_ITENS.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className="text-muted-foreground hover:text-primary transition-all"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
