import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PageView } from '../types';
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  X
} from 'lucide-react';

interface CartPageProps {
  setCurrentPage: (page: PageView) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ setCurrentPage }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount
  } = useStore();

  const [promoInput, setPromoInput] = useState<string>('');
  const [couponError, setCouponError] = useState<string>('');

  const shippingFee = cartSubtotal >= 5000 ? 0 : 60;
  const orderTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    setCouponError('');
    const res = applyCoupon(promoInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DF]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('home')}
            aria-label="Back to store"
            className="p-2 rounded-xl hover:bg-[#EFECE6] text-[#1C2A20] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1C2A20]">
              Your Cart
            </h1>
            <p className="text-xs text-[#6B7280]">
              {cart.length} {cart.length === 1 ? 'item' : 'items'} in your shopping bag
            </p>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-[#9CA3AF] hover:text-[#B91C1C] transition-colors"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="p-12 sm:p-16 bg-white border border-[#ECE8E1] rounded-3xl text-center space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#F7F5F0] text-[#8B5E34] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif-luxury text-2xl font-bold text-[#1C2A20]">
            Your shopping bag is empty
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Explore our artisanal full-grain leather wallets, belts, backpacks, and card holders.
          </p>
          <button
            onClick={() => setCurrentPage('collections')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C2A20] text-white text-xs sm:text-sm font-semibold hover:bg-[#2B3E30] transition-all"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart items list (Matches reference screenshot 4) */}
          <div className="lg:col-span-7 space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                className="flex items-center justify-between p-3.5 sm:p-4 bg-white border border-[#ECE8E1] rounded-2xl shadow-xs gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-[#F7F5F0] shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-[#1C2A20] truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6B7280] mt-0.5">
                      Color: <span className="text-[#1C2A20] font-medium">{item.color}</span>
                    </p>
                    <span className="text-sm font-bold text-[#1C2A20] block mt-1.5">
                      ৳{item.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Controls: Quantity + Trash */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="flex items-center border border-[#ECE8E1] rounded-full bg-[#F7F5F0] px-1.5 py-0.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="p-1 hover:text-[#1C2A20] text-[#6B7280]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-semibold text-[#1C2A20]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="p-1 hover:text-[#1C2A20] text-[#6B7280]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="p-1.5 text-gray-400 hover:text-[#B91C1C] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Promo Code Input (Matches reference screenshot 4) */}
            <div className="p-4 bg-white border border-[#ECE8E1] rounded-2xl space-y-2 shadow-xs">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1 flex items-center">
                  <Tag className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. SRWELCOME10)"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setCouponError('');
                    }}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-[#ECE8E1] rounded-xl bg-[#F7F5F0] focus:outline-none focus:border-[#1C2A20] uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1C2A20] text-white text-xs font-semibold hover:bg-[#2B3E30] transition-colors shrink-0"
                >
                  Apply
                </button>
              </form>

              {couponError && (
                <p className="text-xs text-[#B91C1C] font-medium">{couponError}</p>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#E8F0EA] text-[#22502F] text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>
                      Coupon <strong>{appliedCoupon.code}</strong> applied (-৳{discountAmount.toLocaleString()})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-[#22502F] hover:text-black"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Summary (Matches reference screenshot 4) */}
          <div className="lg:col-span-5 bg-white border border-[#ECE8E1] rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
            <h3 className="font-serif-luxury text-lg font-bold text-[#1C2A20]">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#4A5568] border-b border-[#ECE7DF] pb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1C2A20]">
                  ৳{cartSubtotal.toLocaleString()}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#22502F]">
                  <span>Discount</span>
                  <span className="font-semibold">-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-[#1C2A20]">
                  {shippingFee === 0 ? (
                    <span className="text-[#22502F]">FREE</span>
                  ) : (
                    `৳${shippingFee.toLocaleString()}`
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-base sm:text-lg font-bold text-[#1C2A20] pt-1">
              <span>Total</span>
              <span>৳{orderTotal.toLocaleString()}</span>
            </div>

            <button
              id="cart-proceed-checkout-btn"
              onClick={() => setCurrentPage('checkout')}
              className="w-full py-3.5 rounded-full bg-[#1C2A20] hover:bg-[#2B3E30] active:scale-98 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-[#6B7280] pt-2">
              <ShieldCheck className="w-4 h-4 text-[#8B5E34]" />
              <span>Secure Checkout | Easy Returns</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
