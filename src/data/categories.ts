import type { ProductCategory } from "@/types";

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  productCount: number;
}

export const categories: CategoryInfo[] = [
  {
    id: "lows",
    name: "Lows",
    description: "Quality everyday selections at competitive wholesale pricing",
    productCount: 15,
  },
  {
    id: "zaa",
    name: "Zaa",
    description: "Premium hand-selected Zaa with rich flavor profiles",
    productCount: 15,
  },
  {
    id: "indoors",
    name: "Indoors",
    description: "Top-shelf indoor-grown with controlled environment quality",
    productCount: 15,
  },
  {
    id: "exotics-indoors",
    name: "Exotics Indoors",
    description: "Rare exotic strains grown in premium indoor facilities",
    productCount: 12,
  },
  {
    id: "snow-cap",
    name: "Snow Cap",
    description: "Frosty, trichome-heavy Snow Cap premium selections",
    productCount: 12,
  },
  {
    id: "moon-rocks",
    name: "Moon Rocks",
    description: "Ultra-potent Moon Rocks crafted with premium concentrates",
    productCount: 10,
  },
  {
    id: "shrooms",
    name: "Shrooms",
    description: "Curated selection of premium specialty mushroom products",
    productCount: 11,
  },
  {
    id: "wax",
    name: "Wax",
    description: "High-quality wax concentrates for the discerning buyer",
    productCount: 10,
  },
];
