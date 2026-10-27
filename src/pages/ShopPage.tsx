import React, { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { Filter, SlidersHorizontal, Grid3X3, Grid2X2, RotateCcw, X, Check, Search } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const [location] = useLocation();

  // Parse query params if any (e.g. ?category=compression)
  const queryParams = useMemo(() => {
    const search = window.location.search;
    return new URLSearchParams(search);
  }, [location]);

  const initialCategory = queryParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedFit, setSelectedFit] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(3000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'compression', label: 'Compression' },
    { id: 't-shirts', label: 'T-Shirts & Henley' },
    { id: 'tanks', label: 'Tanks & Muscle Tees' },
    { id: 'joggers', label: 'Joggers & Sweats' },
    { id: 'hoodies', label: 'Hoodies' }
  ];

  const fits = ['all', 'Compression Fit', 'Oversized Fit', 'Athletic Regular', 'Relaxed Street'];
  const sizes = ['all', 'S', 'M', 'L', 'XL', 'XXL'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedFit !== 'all' && p.fit !== selectedFit) return false;
      if (selectedSize !== 'all' && !p.sizes.includes(selectedSize as any)) return false;
      if (selectedColor !== 'all' && !p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))) return false;
      if (p.price > priceMax) return false;
      if (inStockOnly && !p.inStock) return false;
      if (searchFilter.trim() && !p.name.toLowerCase().includes(searchFilter.toLowerCase()) && !p.tagline.toLowerCase().includes(searchFilter.toLowerCase())) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured default
    });
  }, [selectedCategory, selectedFit, selectedSize, selectedColor, priceMax, inStockOnly, sortBy, searchFilter]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFit('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setPriceMax(3000);
    setInStockOnly(false);
    setSearchFilter('');
    setSortBy('featured');
  };

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedFit !== 'all' || 
    selectedSize !== 'all' || 
    selectedColor !== 'all' || 
    priceMax < 3000 || 
    inStockOnly || 
    searchFilter !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title & Breadcrumb */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
            DISCOVER THE CATALOG
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl uppercase text-white tracking-tight mt-1">
            ALL PERFORMANCE GEAR
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Engineered silhouettes built with heavyweight cottons, zoned technical compression, and ergonomic tailoring.
          </p>
        </div>

        <div className="text-xs text-neutral-400 font-mono">
          SHOWING <span className="text-white font-bold">{filteredProducts.length}</span> OF {PRODUCTS.length} ITEMS
        </div>
      </div>

      {/* Top Filter & Toolbar Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-brand-surface/60 p-4 rounded-xl border border-white/10">
        
        {/* Left Toolbar: Category Pills & Drawer Trigger */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 max-w-full">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="lg:hidden flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Toolbar: Sort Dropdown & Grid View Toggle */}
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
          {/* Search within page */}
          <div className="relative">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search in shop..."
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-500 w-36 sm:w-44 focus:outline-none focus:border-brand-beige"
            />
            {searchFilter && (
              <button 
                onClick={() => setSearchFilter('')} 
                className="absolute right-2 top-2 text-neutral-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2 text-xs text-neutral-400">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-brand-beige"
            >
              <option value="featured" className="bg-brand-surface text-white">Featured</option>
              <option value="price-low" className="bg-brand-surface text-white">Price: Low to High</option>
              <option value="price-high" className="bg-brand-surface text-white">Price: High to Low</option>
              <option value="rating" className="bg-brand-surface text-white">Customer Rating</option>
              <option value="newest" className="bg-brand-surface text-white">Newest Drops</option>
            </select>
          </div>

          {/* Grid Toggle on Desktop */}
          <div className="hidden md:flex items-center space-x-1 border border-white/10 rounded-lg p-1 bg-black/40">
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded transition-colors ${gridCols === 3 ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
              aria-label="3 Columns"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={`p-1.5 rounded transition-colors ${gridCols === 4 ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
              aria-label="4 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Grid & Desktop Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-brand-surface/40 p-6 rounded-2xl border border-white/10 sticky top-28">
          
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="font-display font-black text-sm uppercase tracking-wider text-white flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-beige" />
              <span>Filters</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-brand-beige hover:underline flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Fit Filter */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-neutral-300">
              Garment Fit
            </label>
            <div className="space-y-1">
              {fits.map((fit) => (
                <button
                  key={fit}
                  onClick={() => setSelectedFit(fit)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded flex items-center justify-between transition-colors ${
                    selectedFit === fit
                      ? 'bg-white/10 text-brand-beige font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="capitalize">{fit === 'all' ? 'All Fits' : fit}</span>
                  {selectedFit === fit && <Check className="w-3.5 h-3.5 text-brand-beige" />}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2 pt-4 border-t border-white/5">
            <label className="text-xs uppercase font-bold tracking-wider text-neutral-300">
              Size
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-1.5 rounded text-xs font-bold transition-colors ${
                    selectedSize === s
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-4 border-t border-white/5">
            <div className="flex justify-between text-xs font-semibold text-neutral-300">
              <span>Max Price</span>
              <span className="text-white font-mono">₹{priceMax.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="999"
              max="3000"
              step="100"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-brand-beige cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
              <span>₹999</span>
              <span>₹3,000</span>
            </div>
          </div>

          {/* In Stock Only Switch */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-neutral-300 font-medium">In-Stock Only</span>
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                inStockOnly ? 'bg-brand-beige' : 'bg-white/15'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded-full bg-black absolute top-0.5 transition-transform ${
                  inStockOnly ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-brand-surface/40 rounded-2xl border border-white/10 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-neutral-500">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-xl text-white">No products match your criteria</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Try widening your price range or clearing fit and size selections to see available stock.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 bg-white text-black hover:bg-brand-beige px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={`grid grid-cols-2 ${gridCols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 xl:grid-cols-4'} gap-4 sm:gap-6`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filters Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-brand-surface p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-display font-black text-base uppercase text-white">Filters</h3>
                  <button onClick={() => setIsFilterDrawerOpen(false)} className="p-1 text-neutral-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-neutral-300">Category</label>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left text-xs py-1.5 px-2 rounded ${
                          selectedCategory === cat.id ? 'bg-white text-black font-bold' : 'text-neutral-400'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <label className="text-xs uppercase font-bold text-neutral-300">Size</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-1.5 rounded text-xs font-bold ${
                          selectedSize === s ? 'bg-white text-black' : 'bg-white/5 text-neutral-300'
                        }`}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  <div className="flex justify-between text-xs font-semibold text-neutral-300">
                    <span>Max Price</span>
                    <span className="text-white font-mono">₹{priceMax}</span>
                  </div>
                  <input
                    type="range"
                    min="999"
                    max="3000"
                    step="100"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-brand-beige"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-2">
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full bg-white text-black py-3 rounded-lg text-xs font-bold uppercase tracking-wider"
                >
                  Apply Filters ({filteredProducts.length} items)
                </button>
                <button
                  onClick={resetFilters}
                  className="w-full py-2 text-xs text-neutral-400 hover:text-white"
                >
                  Reset All
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
