"use client";

import Title from "@/components/Title";
import { createClient } from "@/lib/supabase";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

interface Product {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string[] | null;
  category: "Masculino" | "Feminino" | "Unissex" | "Kids";
  type: "Camiseta" | "Calça" | "Bermuda" | "Moletom" | "Acessório" | "Calçado";
  quantity_in_stock: number;
  available_sizes: ("PP" | "P" | "M" | "G" | "GG" | "XG" | "Único")[];
  is_featured: boolean;
}

const ContentBox = ({ product }: { product: Product }) => (
  <Link href={`shop/${product.slug}`}>
    {product.image_url ? (
      <div className="relative aspect-video h-150 w-full bg-zinc-900 overflow-hidden group hover:bg-background/20">
        <Image
          src={product.image_url[0]}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/0" />

        <div className="absolute inset-0 hover:bg-background/40 z-10 transition-all cursor-pointer" />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground p-2 font-bebas text-2xl z-20 whitespace-nowrap hover:text-primary transition-colors">
          {product.title}
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center h-full text-zinc-500">
        No Image
      </div>
    )}
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
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setProducts(data as Product[]);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <section className="min-h-screen bg-background">
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/content-model.jpg"
          alt="Shop Banner Model"
          fill
          priority
          className="object-cover object-top"
        />

        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/0" />

        <div className="absolute bottom-10 left-4 md:left-10 z-10">
          <Title StartTitle="Our" EndTitle="Collections" />
        </div>
      </div>

      <div className="mx-auto py-5">
        {loading ? (
          <div className="text-white animate-pulse font-bebas text-2xl">
            Loading products...
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-2 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {products.map((product) => (
              <ContentBox key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
