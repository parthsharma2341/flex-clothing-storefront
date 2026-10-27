import React from 'react';
import { Link } from 'wouter';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, addToCart } = useStore();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    savedProducts.forEach((p) => {
      addToCart(p, p.sizes[1] || p.sizes[0], p.colors[0]?.name || 'Default', 1);
    });
  };

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display font-black text-3xl uppercase text-white">
            YOUR WISHLIST IS EMPTY
          </h1>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Save your favorite cuts, raw-edge muscle tees, and French terry sweatpants for later review.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center space-x-2 bg-white text-black hover:bg-brand-beige px-8 py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-colors shadow-2xl"
        >
          <span>DISCOVER CATALOG</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
            SAVED GEAR
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight mt-1">
            MY WISHLIST ({savedProducts.length})
          </h1>
        </div>

        <button
          onClick={handleMoveAllToBag}
          className="bg-white text-black hover:bg-brand-beige px-6 py-3 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center space-x-2 transition-colors shadow-xl"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>MOVE ALL TO BAG</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {savedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};
