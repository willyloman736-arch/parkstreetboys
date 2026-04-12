export type ProductCategory =
  | "lows"
  | "zaa"
  | "indoors"
  | "exotics-indoors"
  | "snow-cap"
  | "moon-rocks"
  | "shrooms"
  | "wax";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  description: string;
  volume: string;
  unitPrice: number;
  minOrder: number;
  caseSize: number;
  abv?: number;
  origin: string;
  imageUrl: string;
  imageUrl2?: string;
  videoUrl?: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
  smellRating?: number;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
}

export interface OrderState {
  items: OrderItem[];
  customerInfo: CustomerInfo | null;
  isDrawerOpen: boolean;
  isFormStep: boolean;
  isPaymentStep: boolean;
  isSubmitted: boolean;
}

export type OrderAction =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "TOGGLE_DRAWER" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "SET_FORM_STEP"; isFormStep: boolean }
  | { type: "SET_PAYMENT_STEP"; isPaymentStep: boolean }
  | { type: "SET_CUSTOMER_INFO"; info: CustomerInfo }
  | { type: "SUBMIT_ORDER" }
  | { type: "RESET_ORDER" };

export type BlogCategory =
  | "industry-news"
  | "product-spotlight"
  | "business-tips"
  | "trends"
  | "events";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  coverImageUrl: string;
  category: BlogCategory;
  tags: string[];
  readTimeMinutes: number;
  featured: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  telegramHandle: string;
}
