"use client";

import { useState } from "react";
import { GooeyInput } from "./ui/gooey-input";
import { useRouter } from "next/navigation"; 

export function SearchForm() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    router.push(`/shop/${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="cursor-pointer hidden sm:block"
    >
      <GooeyInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Search..."
      />
    </form>
  );
}