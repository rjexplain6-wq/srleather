import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PageView } from '../types';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  User as UserIcon,
  ChevronRight,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  Info,
  ExternalLink,
  Video,
  MessageCircle
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  onSelectCategory?: (slug: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  onSelectCategory
}) => {
  const { siteContent, cartCount, wishlist, user, categories: firestoreCategories } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close moreMenu on outside click or escape
  useEffect(() => {
    const handleOutsideInteraction = (event: Event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMoreMenuOpen(false);
      }
    };

    if (moreMenuOpen) {
      document.addEventListener('pointerdown', handleOutsideInteraction);
      document.addEventListener('touchstart', handleOutsideInteraction);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('pointerdown', handleOutsideInteraction);
      document.removeEventListener('touchstart', handleOutsideInteraction);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [moreMenuOpen]);

  const defaultCategories = [
    { name: 'Wallets', slug: 'wallets' },
    { name: 'Belts', slug: 'belts' },
    { name: 'Bags', slug: 'bags' },
    { name: 'Backpacks', slug: 'backpacks' },
    { name: 'Laptop Bags', slug: 'laptop-bags' },
    { name: 'Sling Bags', slug: 'sling-bags' },
    { name: 'Card Holders', slug: 'card-holders' },
    { name: 'Keychains', slug: 'keychains' },
    { name: 'Sunglasses', slug: 'sunglasses' },
    { name: 'Gift Sets', slug: 'gift-sets' }
  ];

  const categories = firestoreCategories.length > 0 ? firestoreCategories : defaultCategories;

  const footer = siteContent.footer;
  const facebookUrl = footer?.facebookUrl?.trim() || '';
  const youtubeUrl = footer?.youtubeUrl?.trim() || '';
  const instagramUrl = footer?.instagramUrl?.trim() || '';
  const whatsappNumber = footer?.whatsappNumber?.trim() || '';
  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');
  const hasSocials = !!(facebookUrl || youtubeUrl || instagramUrl || cleanWhatsApp);

  const handleCategoryClick = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    }
    setCurrentPage('category');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#ECE7DF] transition-all">
      {/* Announcement Bar */}
      {siteContent.announcementBar?.enabled && !announcementDismissed && (
        <div className="bg-[#1C2A20] text-[#F8F6F0] px-4 py-2 text-xs text-center flex items-center justify-between tracking-wide">
          <div className="flex-1 flex items-center justify-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C49A6C]" />
            <span>{siteContent.announcementBar.text}</span>
          </div>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            aria-label="Dismiss banner"
            className="text-white/60 hover:text-white ml-2 text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Mobile Menu & Desktop Brand */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 rounded-xl text-[#1E2522] hover:bg-[#EFECE6] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo */}
            <div
              id="brand-logo-btn"
              onClick={() => setCurrentPage('home')}
              className="cursor-pointer flex items-center gap-2.5 sm:gap-3 select-none group"
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full p-0.5 bg-[#1C2A20] border border-[#C49A6C]/50 shadow-xs shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src="https://i.ibb.co.com/VWPSZgVT/1000244284.jpg"
                  alt="SR Leather Logo"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-[#1C2A20]">
                    SR LEATHER
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E34]" />
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#8B5E34] font-medium hidden sm:inline-block">
                  Carry Quality, Carry Confidence
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-[#1C2A20] font-semibold underline underline-offset-8 decoration-[#8B5E34] decoration-2'
                  : 'text-[#4A5568] hover:text-[#1C2A20]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('collections')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'collections'
                  ? 'text-[#1C2A20] font-semibold underline underline-offset-8 decoration-[#8B5E34] decoration-2'
                  : 'text-[#4A5568] hover:text-[#1C2A20]'
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => handleCategoryClick('wallets')}
              className="text-sm font-medium text-[#4A5568] hover:text-[#1C2A20] transition-colors"
            >
              Wallets
            </button>
            <button
              onClick={() => handleCategoryClick('belts')}
              className="text-sm font-medium text-[#4A5568] hover:text-[#1C2A20] transition-colors"
            >
              Belts
            </button>
            <button
              onClick={() => handleCategoryClick('bags')}
              className="text-sm font-medium text-[#4A5568] hover:text-[#1C2A20] transition-colors"
            >
              Bags
            </button>
            <button
              onClick={() => handleCategoryClick('card-holders')}
              className="text-sm font-medium text-[#4A5568] hover:text-[#1C2A20] transition-colors"
            >
              Card Holders
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search */}
            <button
              id="header-search-btn"
              onClick={() => setCurrentPage('search')}
              aria-label="Search"
              className="p-2 sm:p-2.5 rounded-xl text-[#1E2522] hover:bg-[#EFECE6] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              id="header-wishlist-btn"
              onClick={() => setCurrentPage('wishlist')}
              aria-label="Wishlist"
              className="relative p-2 sm:p-2.5 rounded-xl text-[#1E2522] hover:bg-[#EFECE6] transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B5E34] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              id="header-cart-btn"
              onClick={() => setCurrentPage('cart')}
              aria-label="Cart"
              className="relative p-2 sm:p-2.5 rounded-xl text-[#1E2522] hover:bg-[#EFECE6] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#1C2A20] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account */}
            <button
              id="header-account-btn"
              onClick={() => setCurrentPage(user ? 'account' : 'login')}
              aria-label="Account"
              className="hidden sm:flex items-center gap-2 p-2 sm:p-2.5 rounded-xl text-[#1E2522] hover:bg-[#EFECE6] transition-colors"
            >
              <UserIcon className="w-5 h-5" />
            </button>

            {/* 3-Dot More Menu */}
            <div className="relative" ref={moreMenuRef}>
              <button
                id="header-more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setMoreMenuOpen((prev) => !prev);
                }}
                aria-label="More options"
                aria-expanded={moreMenuOpen}
                className={`p-2 sm:p-2.5 rounded-xl transition-colors ${
                  moreMenuOpen ? 'bg-[#EFECE6] text-[#1C2A20]' : 'text-[#1E2522] hover:bg-[#EFECE6]'
                }`}
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              {moreMenuOpen && (
                <div
                  id="header-more-dropdown"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-white border border-[#ECE8E1] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-4 py-2 border-b border-[#ECE8E1]">
                    <span className="font-serif-luxury text-sm font-bold text-[#1C2A20]">
                      SR LEATHER
                    </span>
                    <p className="text-[10px] text-[#8B5E34] uppercase tracking-wider">
                      Carry Quality, Carry Confidence
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setCurrentPage('about');
                        setMoreMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-gray-800 hover:bg-[#FAF8F5] transition-colors text-left"
                    >
                      <Info className="w-4 h-4 text-[#8B5E34]" />
                      <span>About Us & Brand Story</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentPage('collections');
                        setMoreMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-gray-800 hover:bg-[#FAF8F5] transition-colors text-left"
                    >
                      <Sparkles className="w-4 h-4 text-[#8B5E34]" />
                      <span>All Collections</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentPage(user ? 'account' : 'login');
                        setMoreMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-gray-800 hover:bg-[#FAF8F5] transition-colors text-left"
                    >
                      <UserIcon className="w-4 h-4 text-[#8B5E34]" />
                      <span>{user ? 'My Account & Orders' : 'Sign In / Register'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentPage('wishlist');
                        setMoreMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-medium text-gray-800 hover:bg-[#FAF8F5] transition-colors text-left"
                    >
                      <Heart className="w-4 h-4 text-[#8B5E34]" />
                      <span>Saved Wishlist ({wishlist.length})</span>
                    </button>

                    <a
                      href="/admin.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMoreMenuOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-[#8B5E34] hover:bg-[#FAF8F5] transition-colors text-left border-t border-[#F5F2ED] mt-1"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#8B5E34]/15 text-[#8B5E34] flex items-center justify-center text-[10px] font-bold">⚙</span>
                      <span>Admin Portal (অ্যাডমিন)</span>
                    </a>
                  </div>

                  {/* Social Redirect Links (Only shown if configured) */}
                  {hasSocials && (
                    <div className="border-t border-[#ECE8E1] px-4 pt-2.5 pb-1">
                      <span className="text-[10px] font-semibold text-[#8B5E34] uppercase tracking-wider block mb-1.5">
                        Social Channels
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {facebookUrl && (
                          <a
                            href={facebookUrl.startsWith('http') ? facebookUrl : `https://${facebookUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Facebook"
                            className="w-8 h-8 rounded-lg bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                          >
                            f
                          </a>
                        )}
                        {youtubeUrl && (
                          <a
                            href={youtubeUrl.startsWith('http') ? youtubeUrl : `https://${youtubeUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="YouTube"
                            className="w-8 h-8 rounded-lg bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-colors"
                          >
                            <Video className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {instagramUrl && (
                          <a
                            href={instagramUrl.startsWith('http') ? instagramUrl : `https://${instagramUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Instagram"
                            className="w-8 h-8 rounded-lg bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C] hover:text-white flex items-center justify-center text-[10px] font-bold transition-colors"
                          >
                            IG
                          </a>
                        )}
                        {cleanWhatsApp && (
                          <a
                            href={`https://wa.me/${cleanWhatsApp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="WhatsApp"
                            className="w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#FAF8F5] shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#ECE7DF]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full p-0.5 bg-[#1C2A20] border border-[#C49A6C]/50 shadow-xs shrink-0 overflow-hidden">
                    <img
                      src="https://i.ibb.co.com/VWPSZgVT/1000244284.jpg"
                      alt="SR Leather Logo"
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-serif-luxury text-xl font-bold text-[#1C2A20]">
                      SR LEATHER
                    </span>
                    <p className="text-[10px] uppercase tracking-wider text-[#8B5E34]">
                      Carry Quality, Carry Confidence
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-xl text-[#1E2522] hover:bg-[#EFECE6]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main links */}
              <div className="mt-4 space-y-1">
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#EFECE6] text-left font-medium text-[#1C2A20]"
                >
                  <span>Home</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('collections');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#EFECE6] text-left font-medium text-[#1C2A20]"
                >
                  <span>All Collections</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('about');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#EFECE6] text-left font-medium text-[#1C2A20]"
                >
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#8B5E34]" />
                    <span>About Us</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button
                  onClick={() => {
                    setCurrentPage(user ? 'account' : 'login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#EFECE6] text-left font-medium text-[#1C2A20]"
                >
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-[#8B5E34]" />
                    <span>{user ? 'My Account' : 'Sign In / Register'}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Category Links */}
              <div className="mt-6 pt-4 border-t border-[#ECE7DF]">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8B5E34] px-3">
                  Categories
                </span>
                <div className="mt-2 space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className="w-full flex items-center justify-between p-2.5 px-3 rounded-xl hover:bg-[#EFECE6] text-left text-sm text-[#374151]"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Channels in Drawer */}
              <div className="mt-6 pt-4 border-t border-[#ECE7DF]">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8B5E34] px-3 block mb-2">
                  Social Channels
                </span>
                <div className="flex items-center gap-2 px-3">
                  <a
                    href={facebookUrl.startsWith('http') ? facebookUrl : `https://${facebookUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="w-9 h-9 rounded-xl bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
                  >
                    f
                  </a>
                  <a
                    href={youtubeUrl.startsWith('http') ? youtubeUrl : `https://${youtubeUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube"
                    className="w-9 h-9 rounded-xl bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Video className="w-4 h-4" />
                  </a>
                  <a
                    href={instagramUrl.startsWith('http') ? instagramUrl : `https://${instagramUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="w-9 h-9 rounded-xl bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C] hover:text-white flex items-center justify-center text-xs font-bold transition-colors"
                  >
                    IG
                  </a>
                  <a
                    href={`https://wa.me/${cleanWhatsApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="w-9 h-9 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="p-5 bg-[#F2EDE4] border-t border-[#ECE7DF] space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#555]">
                <Phone className="w-3.5 h-3.5 text-[#8B5E34]" />
                <span>{footer?.phone || '+880 1712-345678'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#555]">
                <Mail className="w-3.5 h-3.5 text-[#8B5E34]" />
                <span>{footer?.email || 'support@srleather.com'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#555]">
                <MapPin className="w-3.5 h-3.5 text-[#8B5E34]" />
                <span>{footer?.address || 'Dhaka, Bangladesh'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
