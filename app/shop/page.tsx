"use client";

import Title from "@/components/Title";
import { createClient } from "@/lib/supabase";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react"; 
import { motion } from "motion/react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ShopFilter from "./filter";
import { useSearchParams } from "next/navigation";

interface Product {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string[] | null;
  category: "Men" | "Women" | "Unisex" | "Kids";
  type: "T-shirt" | "Pants" | "Sweatshirt" | "Accessory";
  collections: string[];
  quantity_in_stock: number;
  available_sizes: ("PP" | "P" | "M" | "G" | "GG" | "XG" | "Único")[];
  is_featured: boolean;
}

const ShopBox = ({ product }: { product: Product }) => (
  <div className="group relative">
    {product.image_url && product.image_url.length > 0 ? (
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {product.image_url.map((url, index) => (
            <CarouselItem key={index} className="basis-full">
              <Link href={`/shop/${product.slug}`}>
                <div className="relative aspect-square md:aspect-video w-full min-h-120 bg-zinc-900 overflow-hidden">
                  <Image
                    src={url}
                    alt={`${product.title} - imagem ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {product.image_url.length > 1 && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </div>
        )}
        <Link href={`/shop/${product.slug}`}>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-black/60 backdrop-blur-md px-6 py-2 font-bebas z-20 whitespace-nowrap flex flex-col items-center rounded-sm transition-all">
            <span className="text-2xl tracking-wide">{product.title}</span>
            <div>
              <span className="text-lg opacity-90 text-primary glow">
                $ {product.price}
              </span>
            </div>
          </div>
        </Link>
      </Carousel>
    ) : (
      <div className="flex items-center justify-center aspect-video bg-zinc-900 text-zinc-500">
        No Image
      </div>
    )}
  </div>
);

function ShopContent() {
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "All";
  const initialType = searchParams.get("type") || "All";
  const initialSize = searchParams.get("size") || "All";
  const initialCollection = searchParams.get("collection") || "All";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedSize, setSelectedSize] = useState<string>(initialSize);
  const [selectedCollection, setSelectedCollection] =
    useState<string>(initialCollection);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

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

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesType = selectedType === "All" || product.type === selectedType;
    const matchesCollection =
      selectedCollection === "All" ||
      product.collections?.some(
        (c) => c.toLowerCase() === selectedCollection.toLowerCase(),
      );
    const matchesSize =
      selectedSize === "All" ||
      product.available_sizes?.includes(
        selectedSize as Product["available_sizes"][number],
      );
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return (
      matchesCategory &&
      matchesType &&
      matchesSize &&
      matchesPrice &&
      matchesCollection
    );
  });

  return (
    <section className="min-h-screen bg-background">
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/shop-model.jpg"
          alt="Shop Banner Model"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/0" />

        <div className="absolute bottom-10 left-4 md:left-10 z-10">
          <Title StartTitle="Shop" EndTitle="Collection" />
        </div>
      </div>

      <div className="mx-auto py-5 grid grid-cols-[20%_80%]">
        <ShopFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
        />

        <section className="pb-10">
          <div className="btn-no-animation text-center group mb-2">
            ACCESSORY 15% OFF! CODE:&nbsp;
            <span className="font-sans group-hover:underline transition-all duration-35">
              WEAREHYPED
            </span>
          </div>

          {loading ? (
            <div className="w-full text-white animate-pulse font-bebas text-2xl flex items-center justify-center py-10">
              Loading products...
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-2 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-zinc-500 font-sans text-xl py-10 flex flex-col items-center justify-center w-full">
                  <p>No products were found for that filter.</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <ShopBox key={product.id} product={product} />
                ))
              )}
            </motion.div>
          )}
        </section>
      </div>
    </section>
  );
}

export default function Shop() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen text-white font-bebas text-2xl flex items-center justify-center bg-background">
          Loading Shop...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}