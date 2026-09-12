import React from 'react';
import { useStore } from '../context/StoreContext';
import { Product, PageView } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

interface WishlistPageProps {
  setCurrentPage: (page: PageView) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  setCurrentPage,
  onSelectProduct
}) => {
  const { wishlist, products, addToCart, showToast } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistedProducts.forEach((p) => {
      addToCart(p, p.colors?.[0] || 'Standard', 1);
    });
    showToast('All items added to cart', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ECE7DF]">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1C2A20]">
            Saved Wishlist
          </h1>
          <p className="text-xs text-[#6B7280]">
            {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'handcrafted piece' : 'handcrafted pieces'} saved
          </p>
        </div>

        {wishlistedProducts.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C2A20] text-white text-xs font-semibold hover:bg-[#2B3E30] transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Move All to Cart</span>
          </button>
        )}
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="p-12 sm:p-16 bg-white border border-[#ECE8E1] rounded-3xl text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F7F5F0] text-[#8B5E34] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif-luxury text-2xl font-bold text-[#1C2A20]">
            Your wishlist is empty
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Explore our artisanal leather wallets, bags, belts, and accessories. Click the heart icon to save your favorites here.
          </p>
          <button
            onClick={() => setCurrentPage('collections')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C2A20] text-white text-xs sm:text-sm font-semibold hover:bg-[#2B3E30] transition-all"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {wishlistedProducts.map((p) => (
            <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
          ))}
        </div>
      )}
    </div>
  );
};
