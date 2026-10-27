import React, { useMemo } from 'react';
import { useLocation, Link } from 'wouter';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useStore } from '../context/StoreContext';

export const SearchPage: React.FC = () => {
  const [location, setLocation] = useLocation();
  const { searchQuery, setSearchQuery } = useStore();

  const queryParam = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || searchQuery;
  }, [location, searchQuery]);

  const searchResults = useMemo(() => {
    if (!queryParam.trim()) return PRODUCTS;
    const q = queryParam.toLowerCase().trim();
    return PRODUCTS.filter((p) => 
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.fit.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-8 text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
          CATALOG QUERY
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
          {queryParam ? `RESULTS FOR "${queryParam.toUpperCase()}"` : 'SEARCH STORE'}
        </h1>
        <p className="text-xs text-neutral-400">
          Showing <strong className="text-white font-mono">{searchResults.length}</strong> matching athletic garments.
        </p>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-md mx-auto pt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search compression, muscle tee, joggers..."
            className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 pl-11 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-beige shadow-xl"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-5.5" />
        </form>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-neutral-500">Popular:</span>
          {['Compression', 'Muscle Tee', 'Joggers', 'Waffle Henley', 'Heavyweight'].map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchQuery(term);
                setLocation(`/search?q=${encodeURIComponent(term)}`);
              }}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 text-[11px] border border-white/10"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      {searchResults.length === 0 ? (
        <div className="bg-brand-surface/40 p-12 rounded-3xl border border-white/10 text-center space-y-4">
          <h3 className="font-display font-black text-xl text-white">No products found</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            We couldn't find any items matching your exact query. Try browsing by category or checking out our bestsellers.
          </p>
          <Link href="/shop" className="inline-block bg-white text-black px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider">
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
