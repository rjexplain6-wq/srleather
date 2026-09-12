import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, PageView } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Search as SearchIcon, X, ArrowLeft, ChevronRight, TrendingUp } from 'lucide-react';

interface SearchPageProps {
  setCurrentPage: (page: PageView) => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (slug: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  setCurrentPage,
  onSelectProduct,
  onSelectCategory
}) => {
  const { products, categories } = useStore();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const recentSearches = ['wallet', 'backpack', 'belt', 'card holder', 'leather briefcase'];

  const popularCategories = [
    {
      name: 'Leather Wallets',
      slug: 'wallets',
      count: products.filter((p) => p.category === 'wallets').length || 12,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Backpacks',
      slug: 'backpacks',
      count: products.filter((p) => p.category === 'backpacks').length || 8,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Belts',
      slug: 'belts',
      count: products.filter((p) => p.category === 'belts').length || 6,
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Card Holders',
      slug: 'card-holders',
      count: products.filter((p) => p.category === 'card-holders').length || 7,
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Sunglasses & Cases',
      slug: 'sunglasses',
      count: products.filter((p) => p.category === 'sunglasses').length || 4,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=200&q=80'
    }
  ];

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.published !== false &&
        (p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query))
    );
  }, [searchTerm, products]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6">
      {/* Search Input Bar (Matches reference screenshot 6) */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentPage('home')}
          aria-label="Back to home"
          className="p-2 rounded-xl hover:bg-[#EFECE6] text-[#1C2A20] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 relative flex items-center">
          <SearchIcon className="w-4 h-4 text-[#8C938E] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products, wallets, belts, bags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-[#FFFFFF] border border-[#ECE8E1] rounded-full pl-10 pr-10 py-2.5 sm:py-3 text-sm text-[#1C2A20] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1C2A20] shadow-xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 p-1 text-[#8C938E] hover:text-[#1C2A20]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* When no query typed: show Recent Searches & Popular Right Now */}
      {!searchTerm.trim() ? (
        <div className="space-y-6">
          {/* Recent Searches chips */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8B5E34]">
              Recent Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#ECE8E1] text-[#4A5568] hover:border-[#8B5E34] hover:text-[#1C2A20] transition-all shadow-2xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Right Now list */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8B5E34]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Popular Right Now</span>
            </div>

            <div className="space-y-2">
              {popularCategories.map((item) => (
                <div
                  key={item.slug}
                  onClick={() => {
                    onSelectCategory(item.slug);
                    setCurrentPage('category');
                  }}
                  className="cursor-pointer flex items-center justify-between p-3 rounded-2xl bg-[#FFFFFF] border border-[#ECE8E1] hover:border-[#8B5E34] transition-all shadow-xs group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover bg-[#F7F5F0]"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-[#1C2A20] group-hover:text-[#8B5E34] transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#9CA3AF]">
                        {item.count} items in collection
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Search Results Grid */
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Found <span className="font-semibold text-[#1C2A20]">{searchResults.length}</span> results for &ldquo;{searchTerm}&rdquo;
          </p>

          {searchResults.length === 0 ? (
            <div className="p-10 bg-white border border-[#ECE8E1] rounded-2xl text-center space-y-2">
              <p className="text-base font-semibold text-[#1C2A20]">No results matching your query</p>
              <p className="text-xs text-[#6B7280]">Try searching for &quot;wallet&quot;, &quot;belt&quot;, &quot;bag&quot;, or browse our collections.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
