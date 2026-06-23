"use client";

import FilterGroup from "./components/FilterGroup";
import FilterBlock from "./components/FilterBlock";
import { Slider } from "@/components/ui/slider";

interface ShopFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedCollection: string;
  setSelectedCollection: (size: string) => void;
}

export default function ShopFilter({
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
  selectedCollection,
  setSelectedCollection,
}: ShopFilterProps) {
  const categories = ["All", "Men", "Women", "Unisex", "Kids"];
  const types = ["All", "T-shirt", "Pants", "Sweatshirt", "Accessory"];
  const sizes = ["All", "PP", "P", "M", "G", "GG", "XG"];
  const collections = ["All", "Spring", "Winter", "Autumn", "Summer"];

  return (
    <aside className="px-7 flex flex-col gap-6 text-white font-sans">
      <FilterGroup
        title="Category"
        options={categories}
        selectedValue={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <hr className="border-zinc-800" />

      <FilterGroup
        title="Cloth Type"
        options={types}
        selectedValue={selectedType}
        onSelect={setSelectedType}
      />

      <hr className="border-zinc-800" />

      <FilterGroup
        title="Colections"
        options={collections}
        selectedValue={selectedCollection}
        onSelect={setSelectedCollection}
      />

      <hr className="border-zinc-800" />

      <FilterBlock
        title="Cloth Size"
        options={sizes}
        selectedValue={selectedSize}
        onSelect={setSelectedSize}
      />

      <hr className="border-zinc-800" />

      <div>
        <h3 className="font-bold text-lg mb-3 tracking-wide uppercase">
          Price Range
        </h3>

        <div className="flex justify-between text-sm text-zinc-400 mb-4">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>

        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          min={0}
          step={5}
          value={priceRange}
          onValueChange={(value: number[]) =>
            setPriceRange(value as [number, number])
          }
          className="cursor-pointer"
        />
      </div>
    </aside>
  );
}
