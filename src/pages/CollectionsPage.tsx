import React from 'react';
import { useStore } from '../context/StoreContext';
import { PageView } from '../types';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface CollectionsPageProps {
  setCurrentPage: (page: PageView) => void;
  onSelectCategory: (slug: string) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  setCurrentPage,
  onSelectCategory
}) => {
  const { categories, loadingData } = useStore();

  const handleCollectionClick = (slug: string) => {
    onSelectCategory(slug);
    setCurrentPage('category');
  };

  const activeCategories = categories.filter((c) => c.published !== false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentPage('home')}
          aria-label="Back to home"
          className="p-2 rounded-xl hover:bg-[#EFECE6] text-[#1C2A20] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1C2A20]">
            Collections
          </h1>
          <p className="text-xs text-[#6B7280]">
            Explore handcrafted genuine leather categories & accessories
          </p>
        </div>
      </div>

      {/* Dynamic categories list updated via admin.html */}
      {loadingData ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 rounded-2xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : activeCategories.length === 0 ? (
        <div className="bg-white border border-[#ECE8E1] rounded-3xl p-10 text-center space-y-3 shadow-xs">
          <p className="text-sm text-gray-500">No categories created yet.</p>
          <a
            href="/admin.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C2A20] text-white text-xs font-semibold hover:bg-[#2B3E30] transition-colors"
          >
            Manage Categories in Admin Portal
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {activeCategories.map((cat) => (
            <div
              key={cat.id}
              id={`collection-card-${cat.slug}`}
              onClick={() => handleCollectionClick(cat.slug)}
              className="group cursor-pointer relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#18231C] text-[#F8F6F0] p-6 sm:p-8 flex items-center justify-between shadow-md hover:shadow-xl transition-all duration-300 min-h-[140px] sm:min-h-[160px]"
            >
              {/* Background Image with Dark Gradient */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'}
                  alt={cat.name}
                  className="w-full h-full object-cover object-right sm:object-center opacity-55 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141C16] via-[#141C16]/85 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-xs sm:max-w-sm">
                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {cat.name}
                </h2>
                {cat.description && (
                  <p className="text-xs sm:text-sm text-[#D1D9D3] mt-1 line-clamp-1">
                    {cat.description}
                  </p>
                )}
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E5C9A6] group-hover:underline">
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Circle Arrow Button */}
              <div className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-white text-white group-hover:text-[#1C2A20] flex items-center justify-center transition-all shadow-md shrink-0 ml-4">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
