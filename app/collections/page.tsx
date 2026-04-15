"use client";

import Title from "@/components/Title";
import { createClient } from "@/lib/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  slug: string;
  image_url: string[] | null;
  collections: string[] | null;
}

const ContentBanner = () => (
  <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
    <Image
      src="/content-model.jpg"
      alt="Shop Banner Model"
      fill
      priority
      className="object-cover object-center"
    />
    <div className="absolute inset-0 bg-black/70 z-0" />
    <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/0" />
    <div className="absolute bottom-10 left-4 md:left-10 z-10">
      <Title StartTitle="Our" EndTitle="Collections" />
    </div>
  </div>
);

const SeasonCard = ({
  season,
  imageUrl,
}: {
  season: string;
  imageUrl: string;
}) => (
  <Link
    href={`/shop?collection=${season.toLowerCase()}`}
    className="group relative overflow-hidden bg-zinc-900 aspect-3/4 md:aspect-4/5 w-full border-r border-white/5 last:border-0"
  >
    {imageUrl ? (
      <Image
        src={imageUrl}
        alt={`${season} Collection`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-bebas">
        No Image Found
      </div>
    )}

    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />

    <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 z-20">
      <h2 className="text-white font-bebas text-5xl tracking-widest uppercase mb-2">
        {season}
      </h2>
      <span className="text-white/60 text-xs tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
        Explore
      </span>
    </div>
  </Link>
);

export default function Content() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function getProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, title, slug, image_url, collections");

        if (error) throw error;
        if (data) setProducts(data as Product[]);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  const seasons = ["Winter", "Autumn", "Summer", "Spring"];

  return (
    <section className="min-h-screen bg-background">
      <ContentBanner />

      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="text-white animate-pulse font-bebas text-3xl tracking-widest">
              Loading Seasons...
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {seasons.map((seasonName) => {
              const matchedProduct = products.find((p) =>
                p.collections?.some(
                  (s) => s.toLowerCase() === seasonName.toLowerCase()
                )
              );

              return (
                <SeasonCard
                  key={seasonName}
                  season={seasonName}
                  imageUrl={matchedProduct?.image_url?.[0] || ""}
                />
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
