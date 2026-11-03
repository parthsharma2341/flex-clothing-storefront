import React, { useState } from 'react';
import { Link } from 'wouter';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    formatPrice, 
    toggleWishlist, 
    isInWishlist, 
    addToCart, 
    setQuickViewProduct 
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Default');
  const [showSizePicker, setShowSizePicker] = useState(false);

  const isSaved = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!showSizePicker) {
      setShowSizePicker(true);
      return;
    }
    addToCart(product, selectedSize, selectedColor, 1);
    setShowSizePicker(false);
  };

  return (
    <div 
      className="group relative flex flex-col bg-brand-surface/40 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowSizePicker(false);
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-brand-card overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <img 
            src={isHovered && secondaryImage ? secondaryImage : product.images[0]} 
            alt={product.name} 
            width="400"
            height="500"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
              product.badge === 'BESTSELLER' 
                ? 'bg-white text-black' 
                : product.badge === 'NEW DROP'
                ? 'bg-brand-beige text-black'
                : 'bg-black/80 text-white border border-white/20'
            }`}>
              {product.badge}
            </span>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-600/90 text-white">
              {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors z-20 ${
            isSaved 
              ? 'bg-white text-black shadow-lg' 
              : 'bg-black/60 text-white hover:bg-white hover:text-black'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute bottom-3 left-3 p-2 rounded-full bg-black/70 text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 z-20"
          aria-label="Quick preview"
          title="Quick preview"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute bottom-3 right-3 z-20">
          {showSizePicker ? (
            <div className="bg-brand-black/95 p-2 rounded-lg border border-white/20 shadow-2xl flex flex-col space-y-1.5 animate-fadeIn">
              <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold px-1">
                Select Size
              </span>
              <div className="flex space-x-1">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSize(size);
                      addToCart(product, size, selectedColor, 1);
                      setShowSizePicker(false);
                    }}
                    className={`w-7 h-7 rounded text-[11px] font-bold transition-colors ${
                      selectedSize === size
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="p-2 sm:px-3 sm:py-2 rounded-full bg-white text-black hover:bg-brand-beige transition-all shadow-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
              aria-label="Quick Add to Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Fit & Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
            <span className="uppercase tracking-wider font-medium">{product.fit}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-brand-beige fill-brand-beige" />
              <span className="text-white font-medium">{product.rating}</span>
              <span className="text-neutral-500">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-display text-sm font-bold text-white group-hover:text-brand-beige transition-colors line-clamp-1 tracking-tight">
              {product.name}
            </h3>
          </Link>

          {/* Tagline snippet */}
          <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Colors & Pricing */}
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
          {/* Color dots */}
          <div className="flex items-center space-x-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === color.name 
                    ? 'border-white scale-125 ring-1 ring-white/50' 
                    : 'border-white/20 hover:border-white/60'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              />
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-2">
            <span className="font-display font-black text-sm text-white">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-neutral-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
