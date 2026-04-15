export interface Product {
    id: string;
    created_at: string;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    image_url: string[] | null;
    category: string;
    type: string;
    quantity_in_stock: number;
    available_sizes: string[];
    is_featured: boolean;
    collections: string[] | null; // Match com o seu JSON
  }