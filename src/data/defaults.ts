import { Product, Category, SiteContent } from '../types';

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    title: "Carry Your Story",
    subtitle: "Premium handcrafted leather accessories for everyday life.",
    buttonText: "Shop Collection",
    buttonLink: "collections",
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80",
    badge: "New Season 2025"
  },
  announcementBar: {
    text: "✨ Free standard delivery on all prepaid orders across Bangladesh!",
    enabled: true,
    link: "collections"
  },
  promoBanners: [
    {
      id: "promo-1",
      title: "Minimal. Durable. Timeless.",
      subtitle: "Handcrafted 100% Genuine Bangladeshi Leather",
      imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80",
      link: "wallets",
      enabled: true
    },
    {
      id: "promo-2",
      title: "Work & Travel Companions",
      subtitle: "Engineered for durability, designed for elegance",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
      link: "bags",
      enabled: true
    }
  ],
  posters: [
    {
      id: "poster-1",
      title: "Built For Generations",
      description: "Every SR Leather piece is cut, stitched, and burnished by master artisans using ethical full-grain hide.",
      imageUrl: "https://images.unsplash.com/photo-1473188557897-f95e082c7688?auto=format&fit=crop&w=1000&q=80",
      link: "collections",
      enabled: true
    }
  ],
  collections: [
    {
      id: "col-bags",
      title: "Bags & Backpacks",
      description: "For work, travel and beyond.",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      link: "bags",
      enabled: true
    },
    {
      id: "col-belts",
      title: "Handcrafted Belts",
      description: "Small details. Big impression.",
      imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80",
      link: "belts",
      enabled: true
    },
    {
      id: "col-wallets",
      title: "Leather Wallets",
      description: "Carry essentials with style.",
      imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
      link: "wallets",
      enabled: true
    },
    {
      id: "col-accessories",
      title: "Accessories & Sets",
      description: "Keychains, card holders, and gift sets.",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      link: "card-holders",
      enabled: true
    }
  ],
  footer: {
    brandName: "SR Leather",
    tagline: "Carry Quality, Carry Confidence.",
    aboutText: "SR Leather is an artisan leather house based in Dhaka, Bangladesh. We craft timeless leather goods designed to age beautifully with you.",
    phone: "+880 1712-345678",
    email: "support@srleather.com",
    address: "H-42, Road-11, Banani, Dhaka-1213, Bangladesh",
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com"
  }
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-wallets",
    name: "Wallets",
    slug: "wallets",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80",
    description: "More than just a wallet. A smarter everyday companion.",
    displayOrder: 1,
    published: true
  },
  {
    id: "cat-belts",
    name: "Belts",
    slug: "belts",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=400&q=80",
    description: "Top-grain cowhide belts made to endure decades of daily wear.",
    displayOrder: 2,
    published: true
  },
  {
    id: "cat-bags",
    name: "Bags",
    slug: "bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80",
    description: "Versatile weekenders, messengers and travel companions.",
    displayOrder: 3,
    published: true
  },
  {
    id: "cat-backpacks",
    name: "Backpacks",
    slug: "backpacks",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    description: "Ergonomic leather backpacks engineered for work and adventure.",
    displayOrder: 4,
    published: true
  },
  {
    id: "cat-laptop-bags",
    name: "Laptop Bags",
    slug: "laptop-bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80",
    description: "Shock-resistant executive briefcases for your modern tech.",
    displayOrder: 5,
    published: true
  },
  {
    id: "cat-sling-bags",
    name: "Sling Bags",
    slug: "sling-bags",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80",
    description: "Compact crossbody silhouettes for effortless mobility.",
    displayOrder: 6,
    published: true
  },
  {
    id: "cat-card-holders",
    name: "Card Holders",
    slug: "card-holders",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
    description: "Ultra-slim RFID-shielded card cases for minimalists.",
    displayOrder: 7,
    published: true
  },
  {
    id: "cat-keychains",
    name: "Keychains",
    slug: "keychains",
    image: "https://images.unsplash.com/photo-1589782183866-5d070b42f61a?auto=format&fit=crop&w=400&q=80",
    description: "Solid brass hardware wrapped in full-grain leather.",
    displayOrder: 8,
    published: true
  },
  {
    id: "cat-sunglasses",
    name: "Sunglasses",
    slug: "sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80",
    description: "Handcrafted polarized eyewear complete with genuine leather cases.",
    displayOrder: 9,
    published: true
  },
  {
    id: "cat-gift-sets",
    name: "Gift Sets",
    slug: "gift-sets",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80",
    description: "Curated leather bundles presented in embossed luxury boxes.",
    displayOrder: 10,
    published: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-classic-wallet",
    name: "Classic Leather Wallet",
    description: "A timeless bi-fold wallet crafted from premium genuine Bangladeshi cowhide. Slim, stylish, and built to last — the perfect everyday companion with 8 card slots, dual cash compartments, and RFID blocking protection.",
    price: 1290,
    oldPrice: 1590,
    discount: 19,
    category: "wallets",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Brown", "Black", "Tan"],
    stock: 45,
    featured: true,
    published: true,
    rating: 4.9,
    reviewsCount: 124,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-urban-slim-wallet",
    name: "Urban Slim Wallet",
    description: "Designed for modern minimalists who value lightness. Fits effortlessly into front pockets while securing up to 10 cards and folded currency.",
    price: 1090,
    oldPrice: 1290,
    discount: 15,
    category: "wallets",
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Black", "Cognac", "Dark Brown"],
    stock: 30,
    featured: true,
    published: true,
    rating: 4.8,
    reviewsCount: 98,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-vintage-fold-wallet",
    name: "Vintage Fold Wallet",
    description: "Hand-burnished pull-up leather that develops a distinctive patina with every journey. Features contrast cream thread work and antique brass badge accent.",
    price: 1490,
    oldPrice: 1750,
    discount: 15,
    category: "wallets",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Vintage Brown", "Black"],
    stock: 22,
    featured: true,
    published: true,
    rating: 4.9,
    reviewsCount: 76,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-minimal-card-holder",
    name: "Minimal Card Holder",
    description: "Ultra-compact card case made with 100% full-grain oil pull-up leather. 6 outer card slots with a lined middle pocket for receipts and folded banknotes.",
    price: 790,
    oldPrice: 990,
    discount: 20,
    category: "card-holders",
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Black", "Brown", "Burgundy"],
    stock: 50,
    featured: true,
    published: true,
    rating: 4.8,
    reviewsCount: 112,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-premium-leather-belt",
    name: "Classic Reversible Belt",
    description: "Handcrafted 35mm wide full-grain cow leather belt with a rotating solid zinc buckle. Switch seamlessly between deep charcoal black and warm cognac brown.",
    price: 1190,
    oldPrice: 1450,
    discount: 18,
    category: "belts",
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Reversible Black/Brown"],
    stock: 40,
    featured: true,
    published: true,
    rating: 4.9,
    reviewsCount: 88,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-heritage-casual-belt",
    name: "Heritage Casual Belt",
    description: "Thick vegetable-tanned leather strap equipped with a heavy-duty brushed nickel buckle. Built to withstand decades of daily wear with denim and chinos.",
    price: 1090,
    oldPrice: 1350,
    discount: 19,
    category: "belts",
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Antique Tan", "Dark Brown"],
    stock: 35,
    featured: false,
    published: true,
    rating: 4.7,
    reviewsCount: 54,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-urban-backpack",
    name: "Urban Everyday Backpack",
    description: "An exceptional companion for daily commutes and weekend escapes. Features padded 15.6-inch laptop pocket, water-repellent oiled leather finish, ergonomic straps, and hidden back luggage strap.",
    price: 3890,
    oldPrice: 4500,
    discount: 14,
    category: "backpacks",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Rich Cognac", "Midnight Black"],
    stock: 18,
    featured: true,
    published: true,
    rating: 5.0,
    reviewsCount: 65,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-executive-laptop-briefcase",
    name: "Executive Laptop Briefcase",
    description: "Tailored for business leaders. Houses dedicated padded compartments for laptop, tablet, charger, pens, and documents with solid brass YKK double-zippers.",
    price: 4850,
    oldPrice: 5800,
    discount: 16,
    category: "laptop-bags",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Espresso Brown", "Executive Black"],
    stock: 15,
    featured: true,
    published: true,
    rating: 4.9,
    reviewsCount: 42,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-crossbody-sling-bag",
    name: "Artisan Crossbody Sling Bag",
    description: "Hands-free luxury designed for effortless city navigation. Quick-access magnetic buckle, internal card slots, and an adjustable cotton-webbing reinforced leather shoulder strap.",
    price: 2490,
    oldPrice: 2990,
    discount: 17,
    category: "sling-bags",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Tan", "Dark Olive", "Black"],
    stock: 28,
    featured: true,
    published: true,
    rating: 4.8,
    reviewsCount: 39,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-handcrafted-keychain",
    name: "Handcrafted Brass Keychain",
    description: "Solid brass quick-release snap hook with a hand-stitched thick leather loop. An understated daily accessory that protects keys and looks timeless.",
    price: 350,
    oldPrice: 450,
    discount: 22,
    category: "keychains",
    images: [
      "https://images.unsplash.com/photo-1589782183866-5d070b42f61a?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Tan Leather", "Black Leather"],
    stock: 80,
    featured: false,
    published: true,
    rating: 4.8,
    reviewsCount: 51,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-aviator-sunglasses",
    name: "Classic Polarized Sunglasses",
    description: "German-engineered TAC polarized UV400 lenses housed in high-grade stainless frame. Comes with an artisanal hard-shell leather case and micro-fiber cloth.",
    price: 1850,
    oldPrice: 2200,
    discount: 16,
    category: "sunglasses",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Gold/Brown Case", "Gunmetal/Black Case"],
    stock: 25,
    featured: false,
    published: true,
    rating: 4.9,
    reviewsCount: 33,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-gentleman-gift-set",
    name: "The Gentleman's Executive Gift Set",
    description: "The ultimate celebratory gift. Contains our bestselling Classic Leather Bi-Fold Wallet, Reversible Leather Belt, and Handcrafted Brass Keychain packaged in an embossed matte gold gift box.",
    price: 2750,
    oldPrice: 3300,
    discount: 17,
    category: "gift-sets",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
    ],
    colors: ["Signature Walnut Box"],
    stock: 20,
    featured: true,
    published: true,
    rating: 5.0,
    reviewsCount: 78,
    createdAt: new Date().toISOString()
  }
];
