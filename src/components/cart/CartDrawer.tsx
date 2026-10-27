import React, { useState } from 'react';
import { Link } from 'wouter';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    freeShippingThreshold,
    freeShippingProgress,
    formatPrice,
    appliedPromo,
    applyPromoCode,
    removePromoCode
  } = useStore();

  const [inputCode, setInputCode] = useState('');

  if (!isCartDrawerOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-surface border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-brand-beige" />
              <h2 className="font-display font-black text-lg uppercase text-white tracking-tight">
                YOUR BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-black/50 px-6 py-3 border-b border-white/5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {remainingForFreeShipping === 0 ? (
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>YOU UNLOCKED FREE EXPRESS SHIPPING!</span>
                </span>
              ) : (
                <span className="text-neutral-300">
                  Add <strong className="text-white font-mono">{formatPrice(remainingForFreeShipping)}</strong> for Free Shipping
                </span>
              )}
              <span className="text-[10px] text-neutral-500 font-mono">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-beige transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Your bag is empty</h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                  Discover our engineered compression shirts, oversized muscle tees, and French terry joggers.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="mt-6 bg-white text-black hover:bg-brand-beige px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  START SHOPPING
                </Link>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div 
                  key={`${item.product.id}-${item.size}-${item.color}-${idx}`}
                  className="flex space-x-4 bg-white/5 p-3 rounded-lg border border-white/5"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-center rounded bg-brand-card flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link 
                          href={`/products/${item.product.slug}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="font-display text-sm font-bold text-white hover:text-brand-beige transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          className="text-neutral-500 hover:text-rose-400 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Size: <span className="text-white font-semibold">{item.size}</span> | Color: <span className="text-white font-semibold">{item.color}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2 border border-white/10 rounded px-2 py-0.5 bg-black/40">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="text-neutral-400 hover:text-white p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-display font-bold text-sm text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-brand-dark/95 space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-brand-beige/10 border border-brand-beige/30 px-3 py-2 rounded text-xs">
                    <div className="flex items-center space-x-2 text-brand-beige font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Coupon <strong className="font-mono">{appliedPromo}</strong> applied</span>
                    </div>
                    <button 
                      onClick={removePromoCode}
                      className="text-neutral-400 hover:text-white text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex space-x-2">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Promo code (e.g. FLEX10)"
                      className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-neutral-500 uppercase focus:outline-none focus:border-brand-beige"
                    />
                    <button
                      type="submit"
                      className="bg-white/10 hover:bg-white hover:text-black text-white text-xs font-bold px-3 py-2 rounded uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-neutral-400 border-t border-white/5 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-brand-beige">
                    <span>Discount ({appliedPromo})</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-white font-mono">
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="font-display font-black text-base text-brand-beige">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full bg-white text-black hover:bg-brand-beige py-3.5 rounded-lg text-xs font-black uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors shadow-xl"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full block text-center py-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                >
                  View Full Bag Details
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
