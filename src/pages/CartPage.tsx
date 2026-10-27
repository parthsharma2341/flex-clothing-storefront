import React, { useState } from 'react';
import { Link } from 'wouter';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
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

  const [couponInput, setCouponInput] = useState('');
  const [orderNote, setOrderNote] = useState('');

  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyPromoCode(couponInput);
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display font-black text-3xl uppercase text-white">
            YOUR SHOPPING BAG IS EMPTY
          </h1>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            You haven't added any garments to your bag yet. Explore our latest drops, heavyweight oversized muscle tees, and French terry joggers.
          </p>
        </div>
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-white text-black hover:bg-brand-beige px-8 py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-colors shadow-2xl"
          >
            <span>START EXPLORING</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Recommended Products */}
        <div className="pt-20 border-t border-white/10 text-left space-y-6">
          <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
            RECOMMENDED FOR YOU
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {PRODUCTS.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
            SHOPPING BAG
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight mt-1">
            REVIEW YOUR ITEMS ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-neutral-400 hover:text-rose-400 underline transition-colors"
        >
          Clear Bag
        </button>
      </div>

      {/* Free Shipping Notification Banner */}
      <div className="bg-brand-surface p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <Truck className="w-5 h-5 text-brand-beige flex-shrink-0" />
          <p className="text-xs text-neutral-300">
            {remainingForFree === 0 ? (
              <strong className="text-emerald-400">Awesome! You've unlocked FREE EXPRESS SHIPPING.</strong>
            ) : (
              <span>Add <strong className="text-white font-mono">{formatPrice(remainingForFree)}</strong> more to unlock Free Standard Shipping across India.</span>
            )}
          </p>
        </div>
        <div className="w-full sm:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-beige transition-all duration-500 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Items Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-brand-surface/40 rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/5">
            {cart.map((item, idx) => (
              <div 
                key={`${item.product.id}-${item.size}-${item.color}-${idx}`}
                className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Product Media & Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 sm:w-24 aspect-[4/5] object-cover object-center rounded-xl bg-brand-card flex-shrink-0 border border-white/5"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-beige">
                      {item.product.fit}
                    </span>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-display font-bold text-base sm:text-lg text-white hover:text-brand-beige transition-colors block line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Size: <strong className="text-white">{item.size}</strong> • Color: <strong className="text-white">{item.color}</strong>
                    </p>
                    <p className="text-xs font-mono text-neutral-400 mt-1">
                      Unit: {formatPrice(item.product.price)}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto pt-2 sm:pt-0">
                  <div className="flex items-center space-x-2 border border-white/10 rounded-lg px-3 py-1 bg-black/40">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                      className="text-neutral-400 hover:text-white p-0.5"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono font-bold text-white px-2">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                      className="text-neutral-400 hover:text-white p-0.5"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[90px]">
                    <span className="font-display font-black text-base text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                    className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Notes Field */}
          <div className="bg-brand-surface/40 p-5 rounded-2xl border border-white/10 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Special Order Instructions / Delivery Notes
            </label>
            <textarea
              rows={2}
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="e.g. Leave package with building security, call upon delivery..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-beige"
            />
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 bg-brand-surface p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl sticky top-28">
          <h3 className="font-display font-black text-lg uppercase tracking-tight text-white border-b border-white/10 pb-4">
            ORDER SUMMARY
          </h3>

          {/* Promo Code Form */}
          <div>
            {appliedPromo ? (
              <div className="bg-brand-beige/10 border border-brand-beige/30 p-3 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-brand-beige font-semibold">
                  <Tag className="w-4 h-4" />
                  <span>Code <strong className="font-mono">{appliedPromo}</strong> Active</span>
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-neutral-400 hover:text-white underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Promo Code (FLEX10)"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white uppercase placeholder-neutral-500 focus:outline-none focus:border-brand-beige font-mono"
                />
                <button
                  type="submit"
                  className="bg-white/10 hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-3 text-xs text-neutral-400 border-t border-white/10 pt-4">
            <div className="flex justify-between">
              <span>Bag Subtotal</span>
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

            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="text-neutral-400 text-[11px]">Included in product price</span>
            </div>

            <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
              <span>Grand Total</span>
              <span className="font-display font-black text-xl text-brand-beige">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="space-y-3 pt-2">
            <Link
              href="/checkout"
              className="w-full bg-white text-black hover:bg-brand-beige py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-2xl"
            >
              <span>CHECKOUT SECURELY</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop"
              className="w-full block text-center py-2 text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
              &larr; Continue Browsing
            </Link>
          </div>

          {/* Security badge */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-center space-x-2 text-[11px] text-neutral-500">
            <Lock className="w-3.5 h-3.5 text-brand-beige" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>

        </div>

      </div>

    </div>
  );
};
