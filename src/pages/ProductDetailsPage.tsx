import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, PageView } from '../types';
import { ProductCard } from '../components/ProductCard';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Star,
  Shield,
  Award,
  Lock,
  Clock,
  Plus,
  Minus,
  Check,
  Share2,
  Truck,
  RotateCcw
} from 'lucide-react';

interface ProductDetailsPageProps {
  product: Product;
  setCurrentPage: (page: PageView) => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (slug: string) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  setCurrentPage,
  onSelectProduct,
  onSelectCategory
}) => {
  const {
    addToCart,
    isWishlisted,
    toggleWishlist,
    products,
    submitReview,
    getProductReviews,
    showToast,
    user
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  const wishlisted = isWishlisted(product.id);
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ['https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'];

  const reviews = getProductReviews(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, quantity);
    setCurrentPage('cart');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out ${product.name} on SR Leather`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    setSubmittingReview(true);
    try {
      await submitReview(
        product.id,
        reviewRating,
        reviewComment,
        reviewerName || user?.displayName || 'Verified Buyer'
      );
      setReviewComment('');
    } finally {
      setSubmittingReview(false);
    }
  };

  // Related products in the same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id && p.published !== false)
    .slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8">
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('category')}
          aria-label="Back to category"
          className="p-2 rounded-xl hover:bg-[#EFECE6] text-[#1C2A20] transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            aria-label="Share product"
            className="p-2 rounded-xl hover:bg-[#EFECE6] text-[#4A5568] transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Wishlist"
            className="p-2 rounded-xl hover:bg-[#EFECE6] transition-colors text-[#1C2A20]"
          >
            <Heart
              className={`w-5 h-5 ${
                wishlisted ? 'fill-[#B91C1C] text-[#B91C1C]' : 'text-[#4A5568]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main product showcase: Gallery & Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Image Gallery (Matches reference screenshot 3) */}
        <div className="space-y-3">
          <div className="relative w-full aspect-square bg-[#FFFFFF] border border-[#ECE8E1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {/* Slider counter badge (e.g. 1/5) */}
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-full font-mono">
              {activeImageIndex + 1}/{images.length}
            </div>

            {/* Discount badge */}
            {product.discount && product.discount > 0 && (
              <div className="absolute top-3 left-3 bg-[#1C2A20] text-[#F8F6F0] text-xs font-semibold px-2.5 py-1 rounded-full">
                -{product.discount}% OFF
              </div>
            )}
          </div>

          {/* Thumbnail list */}
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                    activeImageIndex === idx
                      ? 'border-[#1C2A20] ring-2 ring-[#1C2A20]/20'
                      : 'border-[#ECE8E1] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="space-y-6">
          <div>
            <span
              onClick={() => {
                onSelectCategory(product.category);
                setCurrentPage('category');
              }}
              className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-[#8B5E34] hover:underline"
            >
              {product.category.replace('-', ' ')}
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C2A20] mt-1">
              {product.name}
            </h1>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-[#EAB308]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#1C2A20]">
                {product.rating ? product.rating.toFixed(1) : '4.9'}
              </span>
              <span className="text-xs text-[#6B7280]">
                ({reviews.length > 0 ? reviews.length + 42 : product.reviewsCount || 42} reviews)
              </span>
            </div>
          </div>

          {/* Price section */}
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#1C2A20]">
              ৳{product.price.toLocaleString()}
            </span>
            {product.oldPrice && product.oldPrice > product.price && (
              <>
                <span className="text-base text-[#9CA3AF] line-through">
                  ৳{product.oldPrice.toLocaleString()}
                </span>
                <span className="bg-[#E8F0EA] text-[#22502F] text-xs font-semibold px-2 py-0.5 rounded-full">
                  Save ৳{(product.oldPrice - product.price).toLocaleString()}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-[#4A5568] leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1C2A20]">
                Color: <span className="font-normal text-[#4A5568]">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                      selectedColor === color
                        ? 'border-[#1C2A20] bg-[#1C2A20] text-white shadow-sm'
                        : 'border-[#ECE8E1] bg-white text-[#4A5568] hover:border-[#8B5E34]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls & Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#ECE8E1] rounded-full bg-white px-2 py-1 shadow-xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="p-1.5 hover:bg-[#F7F5F0] rounded-full text-[#4A5568]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-[#1C2A20]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
                  aria-label="Increase quantity"
                  className="p-1.5 hover:bg-[#F7F5F0] rounded-full text-[#4A5568]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                id="details-add-to-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 rounded-full bg-[#1C2A20] hover:bg-[#2B3E30] text-[#F8F6F0] font-semibold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              id="details-buy-now-btn"
              onClick={handleBuyNow}
              className="w-full py-3 px-6 rounded-full border-2 border-[#1C2A20] text-[#1C2A20] hover:bg-[#1C2A20] hover:text-white font-semibold text-sm transition-all"
            >
              Buy Now
            </button>
          </div>

          {/* 4 Feature Badges (Matches reference screenshot 3) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-[#ECE7DF]">
            <div className="p-3 bg-white border border-[#ECE8E1] rounded-xl flex flex-col items-center text-center gap-1.5 shadow-xs">
              <Award className="w-5 h-5 text-[#8B5E34]" />
              <span className="text-[11px] font-semibold text-[#1C2A20]">Genuine Leather</span>
            </div>
            <div className="p-3 bg-white border border-[#ECE8E1] rounded-xl flex flex-col items-center text-center gap-1.5 shadow-xs">
              <Shield className="w-5 h-5 text-[#8B5E34]" />
              <span className="text-[11px] font-semibold text-[#1C2A20]">Slim Design</span>
            </div>
            <div className="p-3 bg-white border border-[#ECE8E1] rounded-xl flex flex-col items-center text-center gap-1.5 shadow-xs">
              <Lock className="w-5 h-5 text-[#8B5E34]" />
              <span className="text-[11px] font-semibold text-[#1C2A20]">RFID Protection</span>
            </div>
            <div className="p-3 bg-white border border-[#ECE8E1] rounded-xl flex flex-col items-center text-center gap-1.5 shadow-xs">
              <Clock className="w-5 h-5 text-[#8B5E34]" />
              <span className="text-[11px] font-semibold text-[#1C2A20]">1 Year Warranty</span>
            </div>
          </div>

          {/* Shipping & Returns Details */}
          <div className="p-4 rounded-2xl bg-[#ECE7DE]/60 border border-[#DDD6C8] space-y-2 text-xs text-[#4A5568]">
            <div className="flex items-center gap-2 text-[#1C2A20] font-semibold">
              <Truck className="w-4 h-4 text-[#8B5E34]" />
              <span>Standard Delivery: 3–5 Business Days (৳60 Dhaka / ৳120 Out of Dhaka)</span>
            </div>
            <div className="flex items-center gap-2 text-[#1C2A20] font-semibold">
              <RotateCcw className="w-4 h-4 text-[#8B5E34]" />
              <span>7-Day Hassle-Free Exchange Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-12 pt-8 border-t border-[#ECE7DF] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1C2A20]">
              Customer Reviews
            </h3>
            <p className="text-xs text-[#6B7280]">
              Real feedback from verified SR Leather owners
            </p>
          </div>
        </div>

        {/* Add a review form */}
        <form
          onSubmit={handleReviewSubmit}
          className="p-5 rounded-2xl bg-white border border-[#ECE8E1] space-y-4 shadow-sm"
        >
          <h4 className="text-sm font-semibold text-[#1C2A20]">Write a Review</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#4A5568]">Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setReviewRating(s)}
                  className="p-0.5 text-[#EAB308] focus:outline-none"
                >
                  <Star
                    className={`w-5 h-5 ${
                      s <= reviewRating ? 'fill-[#EAB308]' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your Name (e.g. Tanvir Hasan)"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="px-3.5 py-2 text-xs sm:text-sm border border-[#ECE8E1] rounded-xl bg-[#F7F5F0] focus:outline-none focus:border-[#1C2A20]"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Share your experience with the craftsmanship, texture, and durability..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            required
            className="w-full px-3.5 py-2 text-xs sm:text-sm border border-[#ECE8E1] rounded-xl bg-[#F7F5F0] focus:outline-none focus:border-[#1C2A20]"
          />

          <button
            type="submit"
            disabled={submittingReview}
            className="px-5 py-2 rounded-full bg-[#1C2A20] text-white text-xs font-semibold hover:bg-[#2B3E30] transition-colors"
          >
            {submittingReview ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>

        {/* Reviews List */}
        <div className="space-y-3">
          {reviews.length === 0 ? (
            <div className="p-4 bg-white border border-[#ECE8E1] rounded-xl text-center text-xs text-[#6B7280]">
              Be the first to review this handcrafted product!
            </div>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-xl bg-white border border-[#ECE8E1] space-y-1.5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-[#1C2A20]">
                    {rev.userName}
                  </span>
                  <span className="text-[10px] text-[#9CA3AF]">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex text-[#EAB308]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[#ECE7DF] space-y-4">
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1C2A20]">
            You May Also Like
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
