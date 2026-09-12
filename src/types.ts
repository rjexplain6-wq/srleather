export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  images: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  published: boolean;
  rating?: number;
  reviewsCount?: number;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  displayOrder?: number;
  published: boolean;
  itemCount?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
  stock: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: 'standard' | 'express';
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'Cash on Delivery' | 'Card' | 'Mobile Payment';
  status: OrderStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId?: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  approved: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  active: boolean;
  expiryDate?: string;
}

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    imageUrl: string;
    badge?: string;
  };
  announcementBar: {
    text: string;
    enabled: boolean;
    link?: string;
  };
  promoBanners: Array<{
    id: string;
    title: string;
    subtitle?: string;
    imageUrl: string;
    link: string;
    enabled: boolean;
  }>;
  posters: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    enabled: boolean;
  }>;
  collections: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    enabled: boolean;
  }>;
  footer: {
    brandName?: string;
    tagline?: string;
    aboutText: string;
    phone: string;
    email: string;
    address: string;
    facebookUrl?: string;
    instagramUrl?: string;
    youtubeUrl?: string;
    whatsappNumber?: string;
    websiteUrl?: string;
  };
}

export type PageView =
  | 'home'
  | 'collections'
  | 'category'
  | 'product-details'
  | 'search'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'login'
  | 'register'
  | 'account'
  | 'about';
