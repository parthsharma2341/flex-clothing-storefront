import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, CustomerAddress } from '../types';
import { PRODUCTS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  promoCode: string;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Currency
  currency: 'INR' | 'USD';
  setCurrency: (c: 'INR' | 'USD') => void;
  formatPrice: (amountInINR: number) => string;

  // Modals
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSizeAdvisorOpen: boolean;
  setIsSizeAdvisorOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // User & Orders
  user: { name: string; email: string; phone: string; address?: CustomerAddress } | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  orders: Order[];
  placeOrder: (shippingAddress: CustomerAddress, paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD') => Order;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 1499;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state persisted
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('flex_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('flex_wishlist');
      return saved ? JSON.parse(saved) : ['flx-001', 'flx-005'];
    } catch {
      return ['flx-001', 'flx-005'];
    }
  });

  // User state
  const [user, setUser] = useState<{ name: string; email: string; phone: string; address?: CustomerAddress } | null>(() => {
    try {
      const saved = localStorage.getItem('flex_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('flex_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'FLX-91823',
          date: '2026-10-18',
          items: [
            { product: PRODUCTS[0], size: 'L', color: 'Washed Black', quantity: 1 },
            { product: PRODUCTS[4], size: 'L', color: 'Heather Grey', quantity: 1 }
          ],
          subtotal: 2898,
          discount: 289,
          shipping: 0,
          total: 2609,
          status: 'Shipped',
          shippingAddress: {
            fullName: 'Parth Sharma',
            phone: '+91 98765 43210',
            email: 'parth@example.com',
            addressLine1: '402 High-Street Heights',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400050',
            country: 'India'
          },
          paymentMethod: 'UPI',
          trackingNumber: 'DTDC-9928174'
        }
      ];
    } catch {
      return [];
    }
  });

  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('FLEX10');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeAdvisorOpen, setIsSizeAdvisorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    try {
      localStorage.setItem('flex_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('flex_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('flex_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('flex_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('flex_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, size, color, quantity }];
    });
    showToast(`Added ${product.name} (${size}) to your bag`, 'success');
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size && item.color === color)
      )
    );
    showToast('Item removed from bag', 'info');
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.size === size && item.color === color) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discountRate = 0;
  if (appliedPromo === 'FLEX10') discountRate = 0.10;
  if (appliedPromo === 'TRAIN20') discountRate = 0.20;

  const discount = Math.round(subtotal * discountRate);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const total = Math.max(0, subtotal - discount + shipping);

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FLEX10') {
      setAppliedPromo('FLEX10');
      showToast('Promo code FLEX10 applied (10% OFF)', 'success');
      return { success: true, message: '10% discount applied!' };
    }
    if (clean === 'TRAIN20') {
      setAppliedPromo('TRAIN20');
      showToast('Promo code TRAIN20 applied (20% OFF)', 'success');
      return { success: true, message: '20% discount applied!' };
    }
    showToast('Invalid promo code', 'error');
    return { success: false, message: 'Invalid coupon code. Try "FLEX10" or "TRAIN20".' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  const formatPrice = (amountInINR: number) => {
    if (currency === 'USD') {
      const inUSD = (amountInINR / 85).toFixed(2);
      return `$${inUSD}`;
    }
    return `₹${amountInINR.toLocaleString('en-IN')}`;
  };

  const login = (email: string, name = 'Athlete') => {
    const newUser = {
      name,
      email,
      phone: '+91 98765 43210'
    };
    setUser(newUser);
    showToast(`Welcome back, ${name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out of your account', 'info');
  };

  const placeOrder = (shippingAddress: CustomerAddress, paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD'): Order => {
    const newOrder: Order = {
      id: `FLX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal,
      discount,
      shipping,
      total,
      status: 'Confirmed',
      shippingAddress,
      paymentMethod,
      trackingNumber: `EXP-${Math.floor(1000000 + Math.random() * 9000000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount,
        shipping,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        promoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currency,
        setCurrency,
        formatPrice,
        quickViewProduct,
        setQuickViewProduct,
        isSizeAdvisorOpen,
        setIsSizeAdvisorOpen,
        searchQuery,
        setSearchQuery,
        user,
        login,
        logout,
        orders,
        placeOrder,
        toasts,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
