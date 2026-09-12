import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart, isWishlisted, toggleWishlist } = useStore();
  const wishlisted = isWishlisted(product.id);

  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors?.[0] || 'Standard', 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer bg-[#FFFFFF] border border-[#ECE8E1] hover:border-[#D1C9BE] transition-all duration-300 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="relative w-full aspect-square bg-[#F7F5F0] rounded-xl overflow-hidden mb-3">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount badge */}
        {product.discount && product.discount > 0 ? (
          <span className="absolute top-2.5 left-2.5 bg-[#1C2A20] text-[#F8F6F0] text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full tracking-wide">
            -{product.discount}%
          </span>
        ) : null}

        {/* Wishlist button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlist}
          aria-label="Wishlist"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1E2522] hover:text-[#B91C1C] transition-colors shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              wishlisted ? 'fill-[#B91C1C] text-[#B91C1C]' : 'text-[#4A5568]'
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-medium text-[#1E2522] text-sm sm:text-base line-clamp-1 group-hover:text-[#8B5E34] transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1 text-xs text-[#6B7280]">
            <div className="flex text-[#EAB308]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-medium text-[#374151]">
              {product.rating ? product.rating.toFixed(1) : '4.9'}
            </span>
            <span className="text-[#9CA3AF]">
              ({product.reviewsCount || 42})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F5F2ED]">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#1C2A20]">
                ৳{product.price.toLocaleString()}
              </span>
              {product.oldPrice && product.oldPrice > product.price ? (
                <span className="text-xs text-[#9CA3AF] line-through">
                  ৳{product.oldPrice.toLocaleString()}
                </span>
              ) : null}
            </div>
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className="w-9 h-9 rounded-full bg-[#1C2A20] hover:bg-[#2B3E30] active:scale-95 text-[#F8F6F0] flex items-center justify-center transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
