import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, PageView } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoaders';
import { ArrowLeft, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface CategoryPageProps {
  categorySlug: string;
  setCurrentPage: (page: PageView) => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (slug: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug,
  setCurrentPage,
  onSelectProduct,
  onSelectCategory
}) => {
  const { products, categories, loadingData } = useStore();
  const [filterTag, setFilterTag] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);

  // Find category meta
  const currentCat = categories.find((c) => c.slug === categorySlug) || {
    id: categorySlug,
    name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace('-', ' '),
    slug: categorySlug,
    description: 'Artisanal handcrafted leather accessories tailored for everyday confidence.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    published: true
  };

  // Filter chips
  const filterChips = ['All', 'Leather', 'Minimal', 'Bestseller', 'RFID Safe'];

  // Products filtered by category
  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (p) => p.published !== false && (p.category === categorySlug || categorySlug === 'all')
    );

    if (filterTag === 'Minimal') {
      result = result.filter(
        (p) => p.name.toLowerCase().includes('slim') || p.name.toLowerCase().includes('minimal')
      );
    } else if (filterTag === 'Bestseller') {
      result = result.filter((p) => p.featured);
    } else if (filterTag === 'RFID Safe') {
      result = result.filter(
        (p) => p.description.toLowerCase().includes('rfid') || p.name.toLowerCase().includes('wallet')
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // featured
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, categorySlug, filterTag, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5">
      {/* Top Bar with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('collections')}
            aria-label="Back to collections"
            className="p-2 rounded-xl hover:bg-[#EFECE6] text-[#1C2A20] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-[#1C2A20]">
            {currentCat.name}
          </h1>
        </div>
      </div>

      {/* Category Hero Banner (Matches reference screenshot 2) */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#18231C] text-[#F8F6F0] p-6 sm:p-8 flex items-center justify-between shadow-md">
        <div className="absolute inset-0 z-0">
          <img
            src={currentCat.image || 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'}
            alt={currentCat.name}
            className="w-full h-full object-cover object-right sm:object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141C16] via-[#141C16]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-sm sm:max-w-md">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            {currentCat.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#D1D9D3] mt-2 line-clamp-2">
            {currentCat.description || 'More than just accessories. A smarter everyday companion.'}
          </p>
        </div>
      </div>

      {/* Filter Chips (Matches reference screenshot 2) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filterChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setFilterTag(chip)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              filterTag === chip
                ? 'bg-[#1C2A20] text-white shadow-sm'
                : 'bg-[#ECE8E1] text-[#4A5568] hover:bg-[#DFD9CE]'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Results Header: Count & Sort */}
      <div className="flex items-center justify-between pt-1 border-b border-[#ECE7DF] pb-3">
        <span className="text-xs sm:text-sm font-medium text-[#4A5568]">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
        </span>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            id="sort-menu-toggle"
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#1C2A20] hover:text-[#8B5E34] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>
              Sort: {sortBy === 'featured' ? 'Featured' : sortBy === 'price-asc' ? 'Price: Low' : sortBy === 'price-desc' ? 'Price: High' : 'Rating'}
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {showSortMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-[#ECE8E1] py-1.5 z-30">
              <button
                onClick={() => {
                  setSortBy('featured');
                  setShowSortMenu(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-[#374151] hover:bg-[#F7F5F0]"
              >
                Featured
              </button>
              <button
                onClick={() => {
                  setSortBy('price-asc');
                  setShowSortMenu(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-[#374151] hover:bg-[#F7F5F0]"
              >
                Price: Low to High
              </button>
              <button
                onClick={() => {
                  setSortBy('price-desc');
                  setShowSortMenu(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-[#374151] hover:bg-[#F7F5F0]"
              >
                Price: High to Low
              </button>
              <button
                onClick={() => {
                  setSortBy('rating');
                  setShowSortMenu(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs text-[#374151] hover:bg-[#F7F5F0]"
              >
                Customer Rating
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {loadingData ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#ECE8E1] rounded-2xl p-12 text-center space-y-3">
          <p className="text-base font-medium text-[#1C2A20]">No products found in this category</p>
          <p className="text-xs text-[#6B7280]">Try selecting another filter or browsing all categories.</p>
          <button
            onClick={() => setFilterTag('All')}
            className="px-4 py-2 bg-[#1C2A20] text-white text-xs font-semibold rounded-full"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};
