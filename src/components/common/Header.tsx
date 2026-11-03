import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  ArrowRight,
  Sparkles,
  Percent,
  Flame,
  Home,
  Grid
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES, PRODUCTS } from '../../data/products';

export const Header: React.FC = () => {
  const [location, setLocation] = useLocation();
  const { 
    cartCount, 
    wishlist, 
    currency, 
    setCurrency, 
    setIsCartDrawerOpen, 
    user,
    searchQuery,
    setSearchQuery,
    formatPrice
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Live autocomplete matches
  const autocompleteResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((p) => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) || 
      p.tagline.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top Announcement Bar - Disciplined Minimalist Editorial Ticker */}
      <div className="bg-[#0B0B0B] border-b border-white/10 text-xs py-2 px-4 relative z-50 text-neutral-300 font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center space-x-2 text-[11px] text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
            <span className="uppercase tracking-widest font-mono">DROP 01 ACTIVE &bull; ATHLETE ATELIER</span>
          </div>

          <div className="flex-1 text-center text-[11px] uppercase tracking-widest font-mono text-neutral-300">
            COMPLIMENTARY DOMESTIC LOGISTICS OVER ₹999 &bull; DISPATCHED WITHIN 24 HOURS
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {/* Currency Selector */}
            <div className="flex items-center space-x-1 bg-white/5 px-2 py-0.5 rounded border border-white/15">
              <button 
                onClick={() => setCurrency('INR')}
                className={`transition-colors font-mono text-xs ${currency === 'INR' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
                aria-label="Set currency to INR"
              >
                ₹ INR
              </button>
              <span className="text-neutral-500">|</span>
              <button 
                onClick={() => setCurrency('USD')}
                className={`transition-colors font-mono text-xs ${currency === 'USD' ? 'text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
                aria-label="Set currency to USD"
              >
                $ USD
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'glass-panel shadow-2xl py-3 border-b border-white/10 bg-[#0A0A0A]/95' 
            : 'bg-[#0A0A0A]/95 backdrop-blur-md py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-white hover:text-neutral-300 transition-colors touch-manipulation"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Minimal Luxury FLEX Wordmark */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="group flex items-center space-x-2.5">
              <span className="font-display font-black text-2xl sm:text-3xl tracking-tighter uppercase text-white leading-none group-hover:opacity-90 transition-opacity">
                FLEX
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono uppercase tracking-widest text-neutral-400 border-l border-white/20 pl-2">
                EST. 2026
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-widest font-semibold">
            {/* Shop with Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setIsShopHovered(true)}
              onMouseLeave={() => setIsShopHovered(false)}
            >
              <Link 
                href="/shop" 
                className={`transition-colors flex items-center space-x-1 ${location.startsWith('/shop') ? 'text-white border-b-2 border-white pb-0.5' : 'text-neutral-300 hover:text-white'}`}
              >
                <span>SHOP</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isShopHovered ? 'rotate-180' : ''}`} />
              </Link>

              {/* Mega Menu Dropdown */}
              {isShopHovered && (
                <div className="absolute top-full -left-20 w-[680px] pt-4 z-50 animate-fadeIn">
                  <div className="glass-panel rounded-2xl p-6 shadow-2xl border border-white/10 grid grid-cols-3 gap-6 bg-brand-surface/98 backdrop-blur-xl">
                    <div className="col-span-2">
                      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                        <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-white">
                          PERFORMANCE CATEGORIES
                        </p>
                        <span className="text-[10px] text-neutral-500 font-mono">EDITION 2026</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {CATEGORIES.map((cat) => (
                          <Link 
                            key={cat.id} 
                            href={`/collections/${cat.id}`}
                            className="group p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex flex-col border border-white/5 hover:border-white/20"
                          >
                            <span className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-neutral-200 flex items-center justify-between">
                              {cat.name}
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                            <span className="text-[10px] text-neutral-400 mt-1 line-clamp-1">
                              {cat.tagline}
                            </span>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <Link href="/shop" className="text-white hover:underline font-bold flex items-center space-x-1 uppercase tracking-wider font-mono">
                          <span>View All Products</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link href="/collections" className="text-neutral-400 hover:text-white text-xs font-mono">
                          All Capsules &rarr;
                        </Link>
                      </div>
                    </div>

                    {/* Featured Highlight Card */}
                    <div className="col-span-1 rounded-xl overflow-hidden relative group border border-white/10 bg-black">
                      <img 
                        src="/assets/products/muscle-tee-black.webp" 
                        alt="Featured drop" 
                        className="w-full h-44 object-cover object-top opacity-75 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-3.5 flex flex-col justify-end">
                        <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-400">FEATURED DROP</span>
                        <p className="text-xs font-bold text-white leading-tight">Oversized Muscle Tee</p>
                        <p className="text-[10px] text-neutral-400 font-mono">₹1,199</p>
                        <Link 
                          href="/products/flex-oversized-muscle-tee-washed-black" 
                          className="mt-2 text-[10px] uppercase tracking-wider text-white font-bold flex items-center space-x-1 hover:text-neutral-300 font-mono"
                        >
                          <span>Explore Drop</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/collections" 
              className={`transition-colors hover:text-white ${location.startsWith('/collections') ? 'text-white border-b-2 border-white pb-0.5' : 'text-neutral-300'}`}
            >
              COLLECTIONS
            </Link>

            <Link 
              href="/collections/compression" 
              className={`transition-colors hover:text-white ${location === '/collections/compression' ? 'text-white border-b-2 border-white pb-0.5' : 'text-neutral-300'}`}
            >
              COMPRESSION
            </Link>

            <Link 
              href="/collections/oversized-tees" 
              className={`transition-colors hover:text-white ${location === '/collections/oversized-tees' ? 'text-white border-b-2 border-white pb-0.5' : 'text-neutral-300'}`}
            >
              STREETWEAR
            </Link>

            <Link 
              href="/lookbook" 
              className={`transition-colors hover:text-white flex items-center space-x-1 ${location === '/lookbook' ? 'text-white border-b-2 border-white pb-0.5' : 'text-neutral-300'}`}
            >
              <span>LOOKBOOK</span>
            </Link>

            <Link 
              href="/about" 
              className={`transition-colors hover:text-white ${location === '/about' ? 'text-white border-b-2 border-white pb-0.5' : 'text-neutral-300'}`}
            >
              ABOUT
            </Link>

            <Link 
              href="/contact" 
              className={`transition-colors hover:text-white ${location === '/contact' ? 'text-white border-b-2 border-white pb-0.5' : 'text-neutral-300'}`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Trigger & Autocomplete Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-neutral-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
                aria-label="Search store"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Search Modal / Live Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 glass-panel rounded-2xl p-4 shadow-2xl border border-white/15 z-50 animate-fadeIn">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search compression, muscle tees, joggers..."
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-beige shadow-inner"
                    />
                    <button 
                      type="submit" 
                      className="absolute right-3 top-2.5 p-0.5 text-neutral-400 hover:text-white"
                      aria-label="Submit search"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Live Autocomplete Results */}
                  {autocompleteResults.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-brand-beige px-1">
                        Instant Matches
                      </p>
                      <div className="space-y-1.5">
                        {autocompleteResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-9 h-11 object-cover rounded bg-brand-card flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-white truncate">{product.name}</p>
                              <p className="text-[10px] text-neutral-400">{product.fit}</p>
                            </div>
                            <span className="font-mono text-xs font-bold text-brand-beige">
                              {formatPrice(product.price)}
                            </span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="block text-center text-[11px] font-bold text-white hover:text-brand-beige pt-2 border-t border-white/5 uppercase"
                      >
                        View all results &rarr;
                      </Link>
                    </div>
                  )}

                  <div className="mt-2 text-[10px] text-neutral-400 flex items-center justify-between px-1">
                    <span>Popular: Compression, Muscle Tee, Joggers</span>
                    <button 
                      onClick={() => setIsSearchOpen(false)}
                      className="hover:text-white text-neutral-500 underline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              className="p-2 text-neutral-300 hover:text-white transition-colors relative rounded-full hover:bg-white/5"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-0.5 right-0.5 w-4 h-4 rounded-full bg-white text-black text-[10px] font-black flex items-center justify-center shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link 
              href="/account" 
              className="p-2 text-neutral-300 hover:text-white transition-colors relative rounded-full hover:bg-white/5"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
              {user && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-beige ring-2 ring-black" />
              )}
            </Link>

            {/* Cart Button - Studio Freight Architectural Pill */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="group flex items-center space-x-2 bg-white text-black hover:bg-neutral-200 px-3.5 py-1.5 rounded font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-xl"
              aria-label="Open Shopping Bag"
            >
              <span>BAG</span>
              <span className="bg-black text-white px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">
                [ {cartCount} ]
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[88px] bg-brand-black/98 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto border-t border-white/10 animate-fadeIn">
            <div className="space-y-6">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-beige"
                />
                <button type="submit" className="absolute right-3 top-3.5 text-neutral-400" aria-label="Submit search">
                  <Search className="w-5 h-5" />
                </button>
              </form>

              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-beige">Main Menu</p>
                <div className="flex flex-col space-y-2">
                  <Link 
                    href="/" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-display uppercase tracking-wide text-white py-1.5 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>Home</span>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </Link>
                  <Link 
                    href="/shop" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-display uppercase tracking-wide text-white py-1.5 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>Shop All</span>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </Link>
                  <Link 
                    href="/collections" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-display uppercase tracking-wide text-white py-1.5 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>Collections</span>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </Link>
                  <Link 
                    href="/lookbook" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-display uppercase tracking-wide text-white py-1.5 border-b border-white/5 flex items-center justify-between text-brand-beige"
                  >
                    <span>Lookbook & Reels</span>
                    <Flame className="w-4 h-4" />
                  </Link>
                  <Link 
                    href="/about" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-display uppercase tracking-wide text-white py-1.5 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>About Us</span>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </Link>
                  <Link 
                    href="/size-guide" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-display uppercase tracking-wide text-white py-1.5 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>Size Guide & Fit</span>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </Link>
                  <Link 
                    href="/contact" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-display uppercase tracking-wide text-white py-1.5 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-4 h-4 text-neutral-500" />
                  </Link>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-beige">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs font-bold uppercase tracking-wider text-white"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white font-bold">
                {user ? `Account (${user.name})` : 'Sign In / Register'}
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-brand-beige font-black">FLEX IT</span>
                <span>• INDIA</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Navigation Bar for Mobile */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-brand-black/95 backdrop-blur-xl border-t border-white/10 py-2.5 px-4 z-40 flex items-center justify-around text-[10px] font-bold uppercase tracking-wider">
        <Link 
          href="/" 
          className={`flex flex-col items-center space-y-1 ${location === '/' ? 'text-brand-beige' : 'text-neutral-400'}`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link 
          href="/shop" 
          className={`flex flex-col items-center space-y-1 ${location.startsWith('/shop') ? 'text-brand-beige' : 'text-neutral-400'}`}
        >
          <Grid className="w-4 h-4" />
          <span>Shop</span>
        </Link>
        <Link 
          href="/wishlist" 
          className={`flex flex-col items-center space-y-1 relative ${location === '/wishlist' ? 'text-brand-beige' : 'text-neutral-400'}`}
        >
          <Heart className="w-4 h-4" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-white text-black text-[9px] font-black flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span>Saved</span>
        </Link>
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center space-y-1 relative text-neutral-400"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand-beige text-black text-[9px] font-black flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span>Bag</span>
        </button>
        <Link 
          href="/account" 
          className={`flex flex-col items-center space-y-1 ${location === '/account' ? 'text-brand-beige' : 'text-neutral-400'}`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </Link>
      </nav>
    </>
  );
};
