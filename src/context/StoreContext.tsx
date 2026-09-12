import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth, db, googleProvider } from '../firebase';
import {
  Product,
  Category,
  CartItem,
  Order,
  Coupon,
  SiteContent,
  Review
} from '../types';
import {
  DEFAULT_SITE_CONTENT,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS
} from '../data/defaults';

interface StoreContextType {
  // Data
  products: Product[];
  categories: Category[];
  siteContent: SiteContent;
  coupons: Coupon[];
  reviews: Review[];
  loadingData: boolean;

  // Auth
  user: User | null;
  authLoading: boolean;
  loginWithEmail: (e: string, p: string) => Promise<void>;
  registerWithEmail: (e: string, p: string, name: string, phone?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color?: string, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Coupons
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;

  // Orders
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<string>;
  getUserOrders: () => Promise<Order[]>;
  getOrderById: (orderId: string) => Promise<Order | null>;

  // Reviews
  submitReview: (productId: string, rating: number, comment: string, userName: string) => Promise<void>;
  getProductReviews: (productId: string) => Review[];

  // Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sr_leather_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sr_leather_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (currentUser) {
        // Sync user profile to Firestore
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName || '',
              createdAt: new Date().toISOString()
            });
          }

          // Load / merge cart from Firestore
          const cartRef = doc(db, 'carts', currentUser.uid);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            const remoteItems = (cartSnap.data().items as CartItem[]) || [];
            // Merge with local guest cart
            setCart((currentLocal) => {
              const merged = [...remoteItems];
              currentLocal.forEach((localItem) => {
                const existingIndex = merged.findIndex(
                  (m) => m.productId === localItem.productId && m.color === localItem.color
                );
                if (existingIndex > -1) {
                  merged[existingIndex].quantity += localItem.quantity;
                } else {
                  merged.push(localItem);
                }
              });
              setDoc(cartRef, { items: merged, updatedAt: new Date().toISOString() }).catch(() => {});
              return merged;
            });
          } else {
            // Push guest cart up if remote empty
            if (cart.length > 0) {
              await setDoc(cartRef, { items: cart, updatedAt: new Date().toISOString() });
            }
          }

          // Load / merge wishlist from Firestore
          const wishlistRef = doc(db, 'wishlists', currentUser.uid);
          const wishlistSnap = await getDoc(wishlistRef);
          if (wishlistSnap.exists()) {
            const remoteProductIds = (wishlistSnap.data().productIds as string[]) || [];
            setWishlist((currentLocal) => {
              const combined = Array.from(new Set([...currentLocal, ...remoteProductIds]));
              setDoc(wishlistRef, { productIds: combined, updatedAt: new Date().toISOString() }).catch(() => {});
              return combined;
            });
          } else if (wishlist.length > 0) {
            await setDoc(wishlistRef, { productIds: wishlist, updatedAt: new Date().toISOString() });
          }
        } catch (err) {
          console.error('Error syncing user cloud state:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Save guest cart & wishlist locally
  useEffect(() => {
    localStorage.setItem('sr_leather_cart', JSON.stringify(cart));
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      setDoc(cartRef, { items: cart, updatedAt: new Date().toISOString() }).catch(() => {});
    }
  }, [cart, user]);

  useEffect(() => {
    localStorage.setItem('sr_leather_wishlist', JSON.stringify(wishlist));
    if (user) {
      const wishlistRef = doc(db, 'wishlists', user.uid);
      setDoc(wishlistRef, { productIds: wishlist, updatedAt: new Date().toISOString() }).catch(() => {});
    }
  }, [wishlist, user]);

  // Realtime Firestore listeners
  useEffect(() => {
    let mounted = true;

    // Listen to siteContent
    const unsubContent = onSnapshot(doc(db, 'siteContent', 'main'), (snap) => {
      if (snap.exists() && mounted) {
        setSiteContent((prev) => ({ ...prev, ...(snap.data() as SiteContent) }));
      }
    }, (err) => console.warn('siteContent listener warning:', err));

    const unsubContentFallback = onSnapshot(doc(db, 'site_content', 'main'), (snap) => {
      if (snap.exists() && mounted) {
        setSiteContent((prev) => ({ ...prev, ...(snap.data() as SiteContent) }));
      }
    }, () => {});

    // Listen to categories
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snap) => {
      if (mounted) {
        const catList: Category[] = [];
        snap.forEach((d) => {
          const data = d.data() as Category;
          catList.push({ ...data, id: d.id });
        });
        catList.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
        setCategories(catList);
      }
    }, (err) => console.warn('categories listener warning:', err));

    // Listen to products
    const unsubProducts = onSnapshot(collection(db, 'products'), (snap) => {
      if (mounted) {
        const prodList: Product[] = [];
        snap.forEach((d) => {
          const data = d.data() as Product;
          prodList.push({ ...data, id: d.id });
        });
        setProducts(prodList);
        setLoadingData(false);
      }
    }, (err) => {
      console.warn('products listener warning:', err);
      if (mounted) setLoadingData(false);
    });

    // Listen to coupons
    const unsubCoupons = onSnapshot(collection(db, 'coupons'), (snap) => {
      if (mounted) {
        const couponList: Coupon[] = [];
        snap.forEach((d) => {
          couponList.push({ ...(d.data() as Coupon), id: d.id });
        });
        setCoupons(couponList);
      }
    }, () => {});

    // Listen to reviews
    const unsubReviews = onSnapshot(collection(db, 'reviews'), (snap) => {
      if (mounted) {
        const revList: Review[] = [];
        snap.forEach((d) => {
          revList.push({ ...(d.data() as Review), id: d.id });
        });
        setReviews(revList);
      }
    }, () => {});

    return () => {
      mounted = false;
      unsubContent();
      unsubContentFallback();
      unsubCategories();
      unsubProducts();
      unsubCoupons();
      unsubReviews();
    };
  }, []);

  // Auth operations
  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
    showToast('Welcome back to SR Leather!', 'success');
  };

  const registerWithEmail = async (email: string, pass: string, name: string, phone?: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (cred.user) {
      await updateProfile(cred.user, { displayName: name });
      const userRef = doc(db, 'users', cred.user.uid);
      await setDoc(userRef, {
        uid: cred.user.uid,
        email,
        displayName: name,
        phone: phone || '',
        createdAt: new Date().toISOString()
      });
    }
    showToast('Account created successfully!', 'success');
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    showToast('Signed in with Google!', 'success');
  };

  const logout = async () => {
    await signOut(auth);
    showToast('Logged out successfully', 'info');
  };

  // Cart operations
  const addToCart = (product: Product, color?: string, quantity: number = 1) => {
    const selectedColor = color || (product.colors && product.colors.length > 0 ? product.colors[0] : 'Standard');
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.productId === product.id && item.color === selectedColor
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: Math.min(newQty, product.stock || 99)
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${selectedColor}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images && product.images.length > 0 ? product.images[0] : '',
          color: selectedColor,
          quantity: Math.min(quantity, product.stock || 99),
          stock: product.stock || 99
        };
        return [...prev, newItem];
      }
    });
    showToast(`Added ${product.name} to cart`, 'success');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.includes(productId);
  };

  // Coupon operations
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(
      (c) => c.code.toUpperCase() === cleanCode && c.active
    );

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }

    if (found.minOrderAmount && cartSubtotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Minimum order of ৳${found.minOrderAmount.toLocaleString()} required for this coupon`
      };
    }

    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied!`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountType === 'percentage') {
      return Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    }
    return Math.min(appliedCoupon.discountValue, cartSubtotal);
  }, [appliedCoupon, cartSubtotal]);

  // Orders
  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<string> => {
    const newOrder: Omit<Order, 'id'> = {
      ...orderData,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'orders'), newOrder);
    clearCart();
    setAppliedCoupon(null);
    return docRef.id;
  };

  const getUserOrders = async (): Promise<Order[]> => {
    if (!user) return [];
    try {
      const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
      const snap = await getDocs(q);
      const ordersList: Order[] = [];
      snap.forEach((d) => {
        ordersList.push({ ...(d.data() as Order), id: d.id });
      });
      ordersList.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return ordersList;
    } catch (err) {
      console.error('Error fetching user orders:', err);
      return [];
    }
  };

  const getOrderById = async (orderId: string): Promise<Order | null> => {
    try {
      const snap = await getDoc(doc(db, 'orders', orderId));
      if (snap.exists()) {
        return { ...(snap.data() as Order), id: snap.id };
      }
      return null;
    } catch (err) {
      console.error('Error fetching order by ID:', err);
      return null;
    }
  };

  // Reviews
  const submitReview = async (
    productId: string,
    rating: number,
    comment: string,
    userName: string
  ) => {
    const newReview = {
      productId,
      userId: user?.uid || 'guest',
      userName: userName || (user?.displayName || 'Verified Customer'),
      rating,
      comment,
      createdAt: new Date().toISOString(),
      approved: true
    };
    await addDoc(collection(db, 'reviews'), newReview);
    showToast('Thank you for your review!', 'success');
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter((r) => r.productId === productId && r.approved !== false);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        siteContent,
        coupons,
        reviews,
        loadingData,

        user,
        authLoading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,

        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,

        wishlist,
        toggleWishlist,
        isWishlisted,

        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,

        createOrder,
        getUserOrders,
        getOrderById,

        submitReview,
        getProductReviews,

        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
