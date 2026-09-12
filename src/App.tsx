import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { PageView, Product } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { SearchPage } from './pages/SearchPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AuthPage } from './pages/AuthPage';
import { AccountPage } from './pages/AccountPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { SplashScreen } from './components/SplashScreen';

function StoreAppContent() {
  const { products } = useStore();
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('wallets');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastOrderId, setLastOrderId] = useState<string>('');
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    // Show splash screen on first visit of browser session
    return !sessionStorage.getItem('sr_splash_seen');
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('sr_splash_seen', 'true');
    setShowSplash(false);
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProduct, selectedCategory]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage('category');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2522] flex flex-col font-sans selection:bg-[#C49A6C]/30 selection:text-[#1C2A20]">
      {/* First-visit Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Toast Notification Container */}
      <Toast />

      {/* Global Navigation Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={setCurrentPage}
            onSelectProduct={handleSelectProduct}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentPage === 'collections' && (
          <CollectionsPage
            setCurrentPage={setCurrentPage}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentPage === 'category' && (
          <CategoryPage
            categorySlug={selectedCategory}
            setCurrentPage={setCurrentPage}
            onSelectProduct={handleSelectProduct}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentPage === 'product-details' && (
          <ProductDetailsPage
            product={
              selectedProduct ||
              products[0] || {
                id: 'fallback',
                name: 'Classic Leather Wallet',
                category: 'wallets',
                price: 1290,
                description: 'Full-grain cowhide leather wallet.',
                images: [],
                rating: 4.9,
                reviewsCount: 42,
                featured: true,
                stock: 25,
                colors: ['Brown', 'Black', 'Tan']
              }
            }
            setCurrentPage={setCurrentPage}
            onSelectProduct={handleSelectProduct}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentPage === 'search' && (
          <SearchPage
            setCurrentPage={setCurrentPage}
            onSelectProduct={handleSelectProduct}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage
            setCurrentPage={setCurrentPage}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            setCurrentPage={setCurrentPage}
            setLastOrderId={setLastOrderId}
          />
        )}

        {currentPage === 'order-success' && (
          <OrderSuccessPage
            orderId={lastOrderId}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'login' && (
          <AuthPage mode="login" setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'register' && (
          <AuthPage mode="register" setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'account' && (
          <AccountPage setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'about' && (
          <AboutUsPage setCurrentPage={setCurrentPage} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        onSelectCategory={handleSelectCategory}
      />

      {/* Mobile Bottom Navigation (Visible on mobile/tablet) */}
      <BottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export function App() {
  return (
    <StoreProvider>
      <StoreAppContent />
    </StoreProvider>
  );
}

export default App;
