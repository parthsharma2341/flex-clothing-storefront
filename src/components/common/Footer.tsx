import React, { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Check, ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setIsSubscribed(true);
    showToast('Welcome to the FLEX inner circle! Check your inbox for your 10% code.', 'success');
  };

  return (
    <footer className="bg-brand-dark text-neutral-300 border-t border-white/10 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter & Brand Statement Banner */}
        <div className="border border-white/10 rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-brand-surface via-brand-dark to-brand-black mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-brand-beige/5 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-beige mb-2 inline-block">
                JOIN THE FLEX SYNDICATE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                SUBSCRIBE & GET 10% OFF YOUR FIRST DROP
              </h3>
              <p className="text-sm text-neutral-400 mt-2 max-w-xl">
                Be the first to access unreleased collections, heavyweight restocks, and private athlete early-bird access. Zero spam.
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="bg-white/10 border border-brand-beige/30 p-4 rounded-lg flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 rounded-full bg-brand-beige text-black flex items-center justify-center font-bold">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">You're in the inner circle!</p>
                    <p className="text-xs text-neutral-400">Use promo code <span className="text-brand-beige font-mono font-bold">FLEX10</span> at checkout.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-beige"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-white text-black hover:bg-brand-beige px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors whitespace-nowrap"
                  >
                    <span>JOIN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Brand Value Props */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/10 mb-12 text-xs">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-brand-beige">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider">Free Delivery</p>
              <p className="text-neutral-400 text-[11px]">Orders over ₹1,499</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-brand-beige">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider">7-Day Exchanges</p>
              <p className="text-neutral-400 text-[11px]">Hassle-free size swaps</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-brand-beige">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider">Reinforced Seams</p>
              <p className="text-neutral-400 text-[11px]">Heavyweight durability</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-brand-beige">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider">Encrypted Checkout</p>
              <p className="text-neutral-400 text-[11px]">UPI, Cards & Net Banking</p>
            </div>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h4 className="font-display uppercase text-xs tracking-widest text-white font-bold mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/shop?category=compression" className="hover:text-white transition-colors">
                  Compression Gear
                </Link>
              </li>
              <li>
                <Link href="/shop?category=t-shirts" className="hover:text-white transition-colors">
                  T-Shirts & Waffle Knits
                </Link>
              </li>
              <li>
                <Link href="/shop?category=tanks" className="hover:text-white transition-colors">
                  Muscle Tees & Tanks
                </Link>
              </li>
              <li>
                <Link href="/shop?category=joggers" className="hover:text-white transition-colors">
                  Joggers & Sweatpants
                </Link>
              </li>
              <li>
                <Link href="/shop?category=hoodies" className="hover:text-white transition-colors">
                  Heavyweight Hoodies
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors text-brand-beige font-semibold">
                  Curated Collections &rarr;
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase text-xs tracking-widest text-white font-bold mb-4">
              ABOUT FLEX
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Philosophy & Story
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition-colors">
                  Fit Guide & Sizing Chart
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-white transition-colors">
                  Editorial Reel & Storyboard
                </Link>
              </li>
              <li>
                <Link href="/about#fabric" className="hover:text-white transition-colors">
                  Technical Fabric Specs
                </Link>
              </li>
              <li>
                <span className="text-neutral-500">Domain: flex-fit.shop</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase text-xs tracking-widest text-white font-bold mb-4">
              SUPPORT
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Customer Care
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-white transition-colors">
                  Shipping & Return Policy
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a href="mailto:support@flex-fit.shop" className="hover:text-white transition-colors">
                  support@flex-fit.shop
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase text-xs tracking-widest text-white font-bold mb-4">
              LEGAL
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns#returns" className="hover:text-white transition-colors">
                  Exchange & Refund Terms
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors font-mono text-[11px] text-neutral-500">
                  Staff / Admin Console &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Country */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="font-display font-black text-white text-base tracking-tighter">FLEX</span>
            <span>•</span>
            <span>TRAIN / MOVE / LIVE</span>
            <span>•</span>
            <span>© 2026 FLEX IT. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1 text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>India (INR ₹)</span>
            </span>
            <div className="flex items-center space-x-2 text-neutral-400">
              <span className="border border-white/10 px-2 py-0.5 rounded text-[10px]">UPI</span>
              <span className="border border-white/10 px-2 py-0.5 rounded text-[10px]">VISA</span>
              <span className="border border-white/10 px-2 py-0.5 rounded text-[10px]">RUPAY</span>
              <span className="border border-white/10 px-2 py-0.5 rounded text-[10px]">COD</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
