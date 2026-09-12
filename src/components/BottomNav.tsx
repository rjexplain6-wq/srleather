import React from 'react';
import { PageView } from '../types';
import { useStore } from '../context/StoreContext';
import { Home, LayoutGrid, Heart, User } from 'lucide-react';

interface BottomNavProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage }) => {
  const { wishlist, user } = useStore();

  const isHomeActive = currentPage === 'home';
  const isShopActive = currentPage === 'collections' || currentPage === 'category' || currentPage === 'product-details';
  const isWishlistActive = currentPage === 'wishlist';
  const isAccountActive = currentPage === 'account' || currentPage === 'login' || currentPage === 'register';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#ECE7DF] pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-4">
        {/* Home */}
        <button
          id="bottom-nav-home"
          onClick={() => setCurrentPage('home')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all ${
            isHomeActive ? 'text-[#1C2A20]' : 'text-[#8C938E] hover:text-[#1C2A20]'
          }`}
        >
          <div className="relative">
            <Home className={`w-5 h-5 ${isHomeActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {isHomeActive && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1C2A20]" />
            )}
          </div>
          <span className={`text-[11px] mt-1 ${isHomeActive ? 'font-semibold' : 'font-medium'}`}>
            Home
          </span>
        </button>

        {/* Shop */}
        <button
          id="bottom-nav-shop"
          onClick={() => setCurrentPage('collections')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all ${
            isShopActive ? 'text-[#1C2A20]' : 'text-[#8C938E] hover:text-[#1C2A20]'
          }`}
        >
          <div className="relative">
            <LayoutGrid className={`w-5 h-5 ${isShopActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {isShopActive && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1C2A20]" />
            )}
          </div>
          <span className={`text-[11px] mt-1 ${isShopActive ? 'font-semibold' : 'font-medium'}`}>
            Shop
          </span>
        </button>

        {/* Wishlist */}
        <button
          id="bottom-nav-wishlist"
          onClick={() => setCurrentPage('wishlist')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all ${
            isWishlistActive ? 'text-[#1C2A20]' : 'text-[#8C938E] hover:text-[#1C2A20]'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${isWishlistActive ? 'stroke-[2.5] fill-[#1C2A20]' : 'stroke-[1.8]'}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#8B5E34] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
            {isWishlistActive && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1C2A20]" />
            )}
          </div>
          <span className={`text-[11px] mt-1 ${isWishlistActive ? 'font-semibold' : 'font-medium'}`}>
            Wishlist
          </span>
        </button>

        {/* Account */}
        <button
          id="bottom-nav-account"
          onClick={() => setCurrentPage(user ? 'account' : 'login')}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all ${
            isAccountActive ? 'text-[#1C2A20]' : 'text-[#8C938E] hover:text-[#1C2A20]'
          }`}
        >
          <div className="relative">
            <User className={`w-5 h-5 ${isAccountActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {isAccountActive && (
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1C2A20]" />
            )}
          </div>
          <span className={`text-[11px] mt-1 ${isAccountActive ? 'font-semibold' : 'font-medium'}`}>
            Account
          </span>
        </button>
      </div>
    </nav>
  );
};
