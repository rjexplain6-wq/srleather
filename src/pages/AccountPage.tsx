import React from 'react';
import { useStore } from '../context/StoreContext';
import { PageView } from '../types';
import {
  User as UserIcon,
  LogOut,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  ShoppingBag,
  Info,
  Heart,
  ExternalLink,
  MessageCircle,
  Video
} from 'lucide-react';

interface AccountPageProps {
  setCurrentPage: (page: PageView) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ setCurrentPage }) => {
  const { user, userOrders, logout, showToast, siteContent, wishlist } = useStore();
  const footer = siteContent.footer;
  const facebookUrl = footer?.facebookUrl || 'https://facebook.com';
  const youtubeUrl = footer?.youtubeUrl || 'https://youtube.com';
  const instagramUrl = footer?.instagramUrl || 'https://instagram.com';
  const whatsappNumber = footer?.whatsappNumber || '+8801712345678';
  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');

  const handleLogout = async () => {
    await logout();
    showToast('Signed out successfully', 'info');
    setCurrentPage('home');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8F0EA] text-[#22502F]">
            <CheckCircle2 className="w-3 h-3" />
            Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E0F2FE] text-[#0369A1]">
            <Truck className="w-3 h-3" />
            In Transit
          </span>
        );
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#92400E]">
            <CheckCircle2 className="w-3 h-3" />
            Confirmed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F5F2ED] text-[#4A5568]">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#EFECE6] text-[#1C2A20] flex items-center justify-center mx-auto shadow-xs">
          <UserIcon className="w-8 h-8" />
        </div>
        <div>
          <h2 className="font-serif-luxury text-2xl font-bold text-[#1C2A20]">
            Welcome to SR Leather
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Sign in with email or Google to track orders, save wishlists, and manage your account.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setCurrentPage('login')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1C2A20] text-white font-semibold text-xs sm:text-sm hover:bg-[#2B3E30] transition-colors shadow-xs"
          >
            Sign In with Email or Google
          </button>
          <button
            onClick={() => setCurrentPage('about')}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#ECE8E1] hover:bg-[#FAF8F5] text-xs sm:text-sm font-semibold text-[#1C2A20] transition-colors"
          >
            About Us
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6">
      {/* User Header Profile Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border border-[#ECE8E1] rounded-2xl sm:rounded-3xl shadow-xs gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#1C2A20] text-white flex items-center justify-center text-lg font-bold shadow-xs">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1C2A20]">
              {user.displayName || 'SR Leather Member'}
            </h2>
            <p className="text-xs text-[#6B7280]">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ECE8E1] hover:bg-[#F7F5F0] text-xs font-semibold text-[#4A5568] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setCurrentPage('about')}
          className="p-4 rounded-2xl bg-white border border-[#ECE8E1] hover:border-[#8B5E34] hover:shadow-sm transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] text-[#8B5E34] group-hover:bg-[#8B5E34] group-hover:text-white transition-colors">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">About Us</h4>
              <p className="text-[11px] text-gray-500">Brand story & artisan roots</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#8B5E34] transition-colors" />
        </button>

        <button
          onClick={() => setCurrentPage('wishlist')}
          className="p-4 rounded-2xl bg-white border border-[#ECE8E1] hover:border-[#8B5E34] hover:shadow-sm transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FAF8F5] text-[#8B5E34] group-hover:bg-[#8B5E34] group-hover:text-white transition-colors">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">Saved Wishlist</h4>
              <p className="text-[11px] text-gray-500">{wishlist.length} items saved</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#8B5E34] transition-colors" />
        </button>

        <a
          href={`https://wa.me/${cleanWhatsApp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-2xl bg-white border border-[#ECE8E1] hover:border-[#25D366] hover:shadow-sm transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900">WhatsApp Concierge</h4>
              <p className="text-[11px] text-gray-500">Instant customer support</p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#25D366] transition-colors" />
        </a>
      </div>

      {/* Order History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-luxury text-xl font-bold text-[#1C2A20]">
            Order History
          </h3>
          <span className="text-xs text-[#6B7280]">
            {userOrders.length} {userOrders.length === 1 ? 'Order' : 'Orders'}
          </span>
        </div>

        {userOrders.length === 0 ? (
          <div className="p-8 sm:p-12 bg-white border border-[#ECE8E1] rounded-2xl text-center space-y-3 shadow-xs">
            <Package className="w-10 h-10 text-gray-400 mx-auto" />
            <h4 className="font-medium text-base text-[#1C2A20]">No orders found yet</h4>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
              You haven&apos;t placed any orders yet. Discover our handcrafted leather catalog and elevate your everyday carry.
            </p>
            <button
              onClick={() => setCurrentPage('collections')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#1C2A20] text-white text-xs font-semibold hover:bg-[#2B3E30] transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Explore Products</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <div
                key={order.id}
                className="p-5 bg-white border border-[#ECE8E1] rounded-2xl space-y-3 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ECE7DF] pb-3">
                  <div>
                    <span className="text-xs text-[#6B7280]">Order Reference:</span>
                    <h4 className="font-mono font-bold text-sm text-[#1C2A20]">
                      {order.id}
                    </h4>
                    <span className="text-[11px] text-[#9CA3AF]">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    <span className="font-bold text-sm text-[#1C2A20]">
                      ৳{order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={it.image}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-[#F7F5F0]"
                        />
                        <div>
                          <p className="font-semibold text-[#1C2A20]">{it.name}</p>
                          <p className="text-[#6B7280]">Color: {it.color} | Qty: {it.quantity}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-[#1C2A20]">
                        ৳{(it.price * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment summary */}
                <div className="pt-2 border-t border-[#ECE7DF] flex flex-col sm:flex-row justify-between text-[11px] text-[#6B7280] gap-1">
                  <p>Shipping to: <span className="text-[#1C2A20] font-medium">{order.address}, {order.city}</span></p>
                  <p>Payment: <span className="text-[#1C2A20] font-medium">{order.paymentMethod}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
