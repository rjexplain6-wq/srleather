import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, PageView } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton, HeroSkeleton, CategoryRowSkeleton } from '../components/SkeletonLoaders';
import { ArrowRight, ChevronRight, Sparkles, Shield, Compass, HeartHandshake } from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: PageView) => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onSelectProduct,
  onSelectCategory
}) => {
  const { products, categories, siteContent, loadingData } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'wallets'>('all');

  const hero = siteContent.hero || {
    title: 'Carry Your Story',
    subtitle: 'Premium accessories for everyday life.',
    buttonText: 'Shop Now',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80'
  };

  const publishedProducts = products.filter((p) => p.published !== false);
  const featuredProducts = publishedProducts.filter((p) => p.featured);

  const displayedProducts =
    activeTab === 'featured'
      ? featuredProducts
      : activeTab === 'wallets'
      ? publishedProducts.filter((p) => p.category === 'wallets')
      : publishedProducts;

  const promoBanner = siteContent.promoBanners?.[0] || {
    title: 'Minimal. Durable. Timeless.',
    subtitle: 'Handcrafted 100% Genuine Leather',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
    link: 'wallets'
  };

  return (
    <div className="space-y-8 sm:space-y-12 pb-8">
      {/* 1. Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-3 sm:pt-6">
        {loadingData ? (
          <HeroSkeleton />
        ) : (
          <div className="relative rounded-3xl overflow-hidden bg-[#18231C] text-[#F8F6F0] min-h-[420px] sm:min-h-[480px] md:min-h-[520px] flex items-end sm:items-center shadow-xl">
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0 z-0">
              <img
                src={hero.imageUrl}
                alt="SR Leather Hero"
                className="w-full h-full object-cover object-center opacity-70 scale-105 transition-transform duration-700 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141C16] via-[#141C16]/60 to-black/20" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-xl flex flex-col items-start gap-4">
              {hero.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C49A6C]/20 border border-[#C49A6C]/40 text-[#E5C9A6]">
                  <Sparkles className="w-3 h-3" />
                  {hero.badge}
                </span>
              )}

              <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-[1.1]">
                {hero.title}
              </h1>

              <p className="text-sm sm:text-base text-[#D1D9D3] leading-relaxed max-w-md">
                {hero.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  id="hero-shop-now-btn"
                  onClick={() => setCurrentPage('collections')}
                  className="px-6 py-3 rounded-full bg-[#FFFFFF] text-[#1C2A20] hover:bg-[#F2EDE4] active:scale-95 transition-all text-sm font-semibold flex items-center gap-2 shadow-lg"
                >
                  <span>{hero.buttonText || 'Shop Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Aesthetic slide indicator (matches reference screenshot) */}
            <div className="absolute bottom-5 right-6 z-10 hidden sm:flex items-center gap-2 text-xs font-mono text-white/70">
              <span className="text-white font-bold">01</span>
              <span>/</span>
              <span>03</span>
            </div>
          </div>
        )}
      </section>

      {/* 2. Circular Categories Row (Matches reference screenshot 1) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-[#1C2A20] tracking-tight">
            Browse By Category
          </h2>
          <button
            onClick={() => setCurrentPage('collections')}
            className="text-xs sm:text-sm font-medium text-[#8B5E34] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loadingData ? (
          <CategoryRowSkeleton />
        ) : (
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-circle-${cat.slug}`}
                onClick={() => {
                  onSelectCategory(cat.slug);
                  setCurrentPage('category');
                }}
                className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none snap-start"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-[#FFFFFF] border border-[#E8E3DA] group-hover:border-[#8B5E34] group-hover:shadow-md transition-all duration-300 overflow-hidden flex items-center justify-center">
                  <img
                    src={cat.image || 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=200&q=80'}
                    alt={cat.name}
                    className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#2D3748] group-hover:text-[#1C2A20] transition-colors whitespace-nowrap">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 3. Promotional Banner Card (Matches reference screenshot 1) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div
          id="promo-banner-card"
          onClick={() => {
            onSelectCategory(promoBanner.link || 'wallets');
            setCurrentPage('category');
          }}
          className="group cursor-pointer relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#18231C] text-[#F8F6F0] p-6 sm:p-10 flex items-center justify-between shadow-md hover:shadow-xl transition-all duration-300"
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={promoBanner.imageUrl}
              alt={promoBanner.title}
              className="w-full h-full object-cover object-right sm:object-center opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141C16] via-[#141C16]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-md">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              {promoBanner.title}
            </h3>
            {promoBanner.subtitle && (
              <p className="text-xs sm:text-sm text-[#D1D9D3] mt-2">
                {promoBanner.subtitle}
              </p>
            )}
          </div>

          <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-white text-white group-hover:text-[#1C2A20] flex items-center justify-center transition-all shadow-md shrink-0 ml-4">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </section>

      {/* 4. Featured & Bestselling Products */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#8B5E34]">
              Signature Collection
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1C2A20] mt-1">
              Curated Essentials
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-[#1C2A20] text-white shadow-sm'
                  : 'bg-[#ECE8E1] text-[#4A5568] hover:bg-[#DFD9CE]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'featured'
                  ? 'bg-[#1C2A20] text-white shadow-sm'
                  : 'bg-[#ECE8E1] text-[#4A5568] hover:bg-[#DFD9CE]'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab('wallets')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'wallets'
                  ? 'bg-[#1C2A20] text-white shadow-sm'
                  : 'bg-[#ECE8E1] text-[#4A5568] hover:bg-[#DFD9CE]'
              }`}
            >
              Wallets
            </button>
          </div>
        </div>

        {loadingData ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#ECE8E1] rounded-3xl p-10 sm:p-14 text-center space-y-4 shadow-xs">
            <p className="text-[#1C2A20] font-medium text-base">No products available in this category.</p>
            <p className="text-gray-500 text-xs max-w-md mx-auto">
              Real products added via the Admin Portal will automatically appear here in real-time.
            </p>
            <a
              href="/admin.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C2A20] text-white text-xs font-semibold hover:bg-[#2B3E30] transition-colors"
            >
              Open Admin Portal
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {displayedProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentPage('collections')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1C2A20] text-[#1C2A20] hover:bg-[#1C2A20] hover:text-white transition-all text-sm font-semibold"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. Brand Craftsmanship Banner (Dynamic from siteContent) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#ECE7DE] border border-[#DDD6C8] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#8B5E34]">
              Artisan Heritage
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1C2A20] leading-tight">
              {siteContent.posters?.[0]?.title || 'Crafted in Bangladesh, Designed For a Lifetime.'}
            </h2>
            <p className="text-sm text-[#4A5568] leading-relaxed">
              {siteContent.posters?.[0]?.description ||
                'Every SR Leather creation starts with hand-selected Bangladeshi cowhide. From individual pattern cutting and saddle stitching to waxed edge burnishing, our master craftspeople treat each piece as an heirloom in the making.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#8B5E34]" />
                <span className="text-xs font-semibold text-[#1C2A20]">Full-Grain Leather</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[#8B5E34]" />
                <span className="text-xs font-semibold text-[#1C2A20]">Artisan Stitching</span>
              </div>
              <div className="flex items-center gap-2.5">
                <HeartHandshake className="w-5 h-5 text-[#8B5E34]" />
                <span className="text-xs font-semibold text-[#1C2A20]">Ethical Sourcing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#8B5E34]" />
                <span className="text-xs font-semibold text-[#1C2A20]">Natural Patina</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md">
            <img
              src={
                siteContent.posters?.[0]?.imageUrl ||
                'https://images.unsplash.com/photo-1473188557897-f95e082c7688?auto=format&fit=crop&w=800&q=80'
              }
              alt={siteContent.posters?.[0]?.title || 'Artisan Leather Crafting'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
