"use client";

import Title from "@/components/Title";
import { createClient } from "@/lib/supabase";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string[] | null; // Alterado para array conforme sua necessidade de galeria
  category: "Masculino" | "Feminino" | "Unissex" | "Kids";
  type: "Camiseta" | "Calça" | "Bermuda" | "Moletom" | "Acessório" | "Calçado";
  quantity_in_stock: number;
  available_sizes: ("PP" | "P" | "M" | "G" | "GG" | "XG" | "Único")[];
  is_featured: boolean;
  available_colors: string[];
}

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const supabase = createClient();

  useEffect(() => {
    async function getProduct() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug as string)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) getProduct();
  }, [slug, supabase]);

  if (loading) return <div className="text-center py-20">Carregando...</div>;
  if (!product)
    return <div className="text-center py-20">Produto não encontrado.</div>;

  return (
    <section className="pt-40 min-h-screen py-20 px-4 md:px-10 bg-background w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        <div className="flex flex-row md:flex-col gap-4 mr-4 mb-4 md:mb-0">
          {product.image_url?.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg cursor-pointer border-2 transition-all ${selectedImage === index ? "border-primary" : "border-transparent opacity-70"}`}
            >
              <Image
                src={img}
                alt={`thumb-${index}`}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        <div className="h-150 w-full md:w-100 overflow-hidden rounded-lg">
          <Image
            src={product.image_url?.[selectedImage] || "/placeholder.png"}
            alt={product.title}
            width={500}
            height={750}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        <div className="px-10 py-5 flex-1">
          <h5 className="text-muted-foreground">{product.id}</h5>
          <h3>{product.title}</h3>
          <h4 className="glow text-primary">R$ {product.price.toFixed(2)}</h4>

          <div className="mt-10">
            <h4 className="font-sans text-2xl">Sizes</h4>
            <div className="flex gap-2">
              {product.available_sizes?.map((size, i) => (
                <div
                  key={i}
                  className="min-w-10 min-h-10 border rounded items-center justify-center flex text-center hover:text-primary cursor-pointer hover:border-primary/20 mt-5 transition-all"
                >
                  {size}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h4 className="font-sans text-2xl">Colors</h4>
              <div className="flex gap-5">
                {product.available_colors?.map((color, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 mt-3 rounded-full cursor-pointer hover:border-double hover:border-4 border-primary-foreground transition-all"
                      style={{ backgroundColor: color }}
                    />
                    <h5 className="text-muted-foreground text-xs mt-2">
                      {color}
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            <button className="transition-all bg-primary px-10 py-5 text-primary-foreground font-bebas text-xl tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,0,0.8)] w-full my-5 active:scale-95">
              SHOP NOW
            </button>

            <h6 className="flex gap-2">{product.description}</h6>
          </div>
        </div>
      </div>
    </section>
  );
}
