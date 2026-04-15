"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { motion } from "motion/react";
import Title from "@/components/Title";
import Link from "next/link";

interface Product {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  image_url:string[] | null;
  category: "Masculino" | "Feminino" | "Unissex" | "Kids";
  type: "Camiseta" | "Calça" | "Bermuda" | "Moletom" | "Acessório" | "Calçado";
  quantity_in_stock: number;
  available_sizes: ("PP" | "P" | "M" | "G" | "GG" | "XG" | "Único")[];
  is_featured: boolean;
}

const ArrivalsBox = ({ product }: { product: Product }) => (
  <Link href={`shop/${product.slug}`} className="relative aspect-video h-200 w-full bg-zinc-900 overflow-hidden rounded-lg group">
    {product.image_url ? (
      <>
        <Image
          src={product.image_url[0]}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        <div className="absolute inset-0 hover:bg-background/60 z-10 transition-all cursor-pointer" />

        <span className="absolute top-0 right-0 bg-primary p-2 font-bebas text-primary-foreground text-2xl z-10 m-10">
          {product.category}
        </span>

        <span className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white p-4 font-bebas z-20 flex flex-col min-w-30">
          <span className="text-2xl leading-none mb-1 tracking-wider border-b border-primary/50 pb-1">
            {product.title}
          </span>

          <span className="text-primary text-xl tracking-widest">
            ${Number(product.price).toFixed(2)}
          </span>
        </span>
      </>
    ) : (
      <div className="flex items-center justify-center h-full text-zinc-500">
        No Image
      </div>
    )}
  </Link>
);

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    async function getProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(4);

        if (error) throw error;
        if (data) setProducts(data as Product[]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <section id="arrivals" className="min-h-screen py-20 px-4 md:px-10 bg-background w-full">
      <div className="max-w-7xl mx-auto">
        <Title StartTitle="New" EndTitle="Arrivals" />

        {loading ? (
          <div className="text-white animate-pulse font-bebas text-2xl">
            Loading products...
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {products.length > 0 ? (
              products.map((product) => (
                <ArrivalsBox key={product.id} product={product} />
              ))
            ) : (
              <p className="text-white">No products found.</p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
