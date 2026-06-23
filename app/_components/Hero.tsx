"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <Image
        src="/hero-model.jpg"
        alt="Hero Model"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/85 z-0" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <h1 className="font-bebas tracking-tighter leading-none">
          Hype<span className="text-primary glow">Noise</span>
        </h1>

        <h3 className="py-5 mb-4 tracking-[0.3em] font-sans uppercase text-sm md:text-base">
          Culture • Style • Exclusive
        </h3>

        <Link
          href="/shop"
          className="btn-glow hover:shadow-[0_0_20px_rgba(0,255,0,0.8)] transition-all"
        >
          SHOP NOW
        </Link>
      </motion.div>
    </div>
  );
}
