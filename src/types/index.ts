export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSpec {
  composition: string;
  weight: string;
  stretch: string;
  care: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased: string;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  compareAtPrice?: number;
  category: 'compression' | 't-shirts' | 'tanks' | 'joggers' | 'shorts' | 'hoodies';
  fit: 'Compression Fit' | 'Oversized Fit' | 'Athletic Regular' | 'Relaxed Street';
  badge?: 'BESTSELLER' | 'NEW DROP' | 'HEAVYWEIGHT' | 'HIGH DEMAND' | '20% OFF';
  images: string[];
  colors: ProductColor[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockRemaining?: number;
  description: string;
  keyFeatures: string[];
  specs: ProductSpec;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  collection: string[];
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface CustomerAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: CustomerAddress;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  trackingNumber: string;
}
