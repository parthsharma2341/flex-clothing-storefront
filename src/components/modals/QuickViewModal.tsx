import React, { useState } from 'react';
import { Link } from 'wouter';
import { X, Star, ShoppingBag, Heart, ArrowRight, ShieldCheck, Ruler } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsSizeAdvisorOpen 
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.sizes[0];
  const currentColor = selectedColor || quickViewProduct.colors[0]?.name || 'Default';
  const isSaved = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, currentSize, currentColor, 1);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div className="relative transform overflow-hidden rounded-2xl bg-brand-surface border border-white/15 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl p-6 md:p-8 animate-fadeIn">
          
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Gallery Left */}
            <div className="space-y-3">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-brand-card border border-white/5 relative">
                <img 
                  src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]} 
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-center"
                />
                {quickViewProduct.badge && (
                  <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex space-x-2">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx ? 'border-brand-beige scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Right */}
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="uppercase tracking-widest text-brand-beige font-semibold">
                    {quickViewProduct.fit}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-brand-beige fill-brand-beige" />
                    <span className="text-white font-bold">{quickViewProduct.rating}</span>
                    <span className="text-neutral-500">({quickViewProduct.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h2 className="font-display text-2xl font-black text-white tracking-tight uppercase">
                  {quickViewProduct.name}
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-sans">
                  {quickViewProduct.tagline}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline space-x-3">
                  <span className="font-display font-black text-2xl text-white">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.compareAtPrice && (
                    <span className="text-sm text-neutral-500 line-through">
                      {formatPrice(quickViewProduct.compareAtPrice)}
                    </span>
                  )}
                  {quickViewProduct.stockRemaining && (
                    <span className="text-[11px] text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      Only {quickViewProduct.stockRemaining} left in stock
                    </span>
                  )}
                </div>

                {/* Color Selector */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="uppercase tracking-wider font-semibold text-neutral-300">
                      Color: <span className="text-white">{currentColor}</span>
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {quickViewProduct.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                          currentColor === color.name
                            ? 'border-white bg-white/10 text-white font-bold'
                            : 'border-white/15 text-neutral-400 hover:border-white/40'
                        }`}
                      >
                        <span 
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="uppercase tracking-wider font-semibold text-neutral-300">
                      Select Size: <span className="text-white">{currentSize}</span>
                    </span>
                    <button
                      onClick={() => setIsSizeAdvisorOpen(true)}
                      className="text-brand-beige hover:underline flex items-center space-x-1"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Fit Advisor</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {quickViewProduct.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 rounded-lg font-display text-xs font-bold transition-all ${
                          currentSize === size
                            ? 'bg-white text-black shadow-lg scale-102'
                            : 'bg-white/5 text-white hover:bg-white/15 border border-white/10'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Features bullet snippet */}
                <div className="mt-6 p-4 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-beige block mb-1">
                    Garment Highlights
                  </span>
                  {quickViewProduct.keyFeatures.slice(0, 3).map((feat, i) => (
                    <p key={i} className="text-xs text-neutral-300 flex items-start space-x-2">
                      <span className="text-brand-beige">•</span>
                      <span>{feat}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex space-x-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-white text-black hover:bg-brand-beige py-3.5 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-xl"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      isSaved 
                        ? 'bg-white text-black border-white' 
                        : 'border-white/15 text-white hover:bg-white/10'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link
                  href={`/products/${quickViewProduct.slug}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="block text-center text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                >
                  View Full Product Specification &rarr;
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
