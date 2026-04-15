"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase";
import { ContentBanner, SeasonCard } from "./_components/SeasonCard";
import Banner from "./_components/Banner";

// Definição da interface para garantir o match com seu JSON
interface Product {
  id: string;
  image_url: string[] | null;
  collections: string[] | null;
}

export default function Content() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function getProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("image_url, collections");

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

  const seasonsList = ["Winter", "Autumn", "Summer", "Spring"];

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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {seasonsList.map((name) => {
              const productMatch = products.find((p) =>
                p.collections?.some(
                  (c) => c.toLowerCase() === name.toLowerCase()
                )
              );

              return (
                <SeasonCard
                  key={name}
                  season={name}
                  imageUrl={productMatch?.image_url?.[0] || ""}
                />
              );
            })}
          </motion.div>
        )}
        <Banner/>
      </div>
    </section>
  );
}
