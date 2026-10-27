import React from 'react';
import { Truck, RotateCcw, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-8 text-center space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
          DELIVERY & POLICIES
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl uppercase text-white tracking-tight">
          SHIPPING & RETURNS
        </h1>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto">
          Fast air express logistics across India and guaranteed 7-day hassle-free size exchanges.
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-surface p-6 rounded-2xl border border-white/10 space-y-2">
          <Truck className="w-6 h-6 text-brand-beige" />
          <h3 className="font-display font-bold text-white text-base">FREE EXPRESS AIR</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Automatic free shipping on all orders over ₹1,499. Orders below ₹1,499 are shipped for a flat ₹99.
          </p>
        </div>

        <div className="bg-brand-surface p-6 rounded-2xl border border-white/10 space-y-2">
          <Clock className="w-6 h-6 text-brand-beige" />
          <h3 className="font-display font-bold text-white text-base">2 - 3 DAY METRO DELIVERY</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Dispatched within 24 hours from our Mumbai hub. Delivered directly via BlueDart and DTDC Air.
          </p>
        </div>

        <div className="bg-brand-surface p-6 rounded-2xl border border-white/10 space-y-2">
          <RotateCcw className="w-6 h-6 text-brand-beige" />
          <h3 className="font-display font-bold text-white text-base">7-DAY HASSLE-FREE SWAPS</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Wrong fit or size? We arrange door-to-door reverse pickup with zero extra courier fees.
          </p>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="bg-brand-surface/50 rounded-3xl p-8 border border-white/10 space-y-6 text-xs text-neutral-300 leading-relaxed font-sans">
        <h2 className="font-display font-black text-xl uppercase text-white tracking-wide border-b border-white/10 pb-3">
          1. DOMESTIC SHIPPING TIMELINES
        </h2>
        <p>
          We fulfill all orders from Monday through Saturday, excluding national holidays. Once your parcel departs our facility, you receive a direct tracking AWB number via SMS and email.
        </p>
        <ul className="space-y-2 pl-4 border-l-2 border-brand-beige">
          <li><strong>Tier 1 Metro Hubs (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune):</strong> 2 to 3 Business Days.</li>
          <li><strong>Tier 2 & Tier 3 Cities:</strong> 3 to 5 Business Days.</li>
          <li><strong>Rest of India & Remote Postal Zones:</strong> 5 to 7 Business Days.</li>
        </ul>
      </div>

      {/* Exchange & Return Process */}
      <div id="returns" className="bg-brand-surface/50 rounded-3xl p-8 border border-white/10 space-y-6 text-xs text-neutral-300 leading-relaxed font-sans">
        <h2 className="font-display font-black text-xl uppercase text-white tracking-wide border-b border-white/10 pb-3">
          2. EASY SIZE EXCHANGE & RETURN PROCEDURE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1.5">
            <span className="font-display font-bold text-sm text-brand-beige">STEP 01</span>
            <p className="font-bold text-white">Initiate Request</p>
            <p className="text-[11px] text-neutral-400">Email support@flex-fit.shop or message our Contact portal within 7 days of delivery with your Order ID.</p>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1.5">
            <span className="font-display font-bold text-sm text-brand-beige">STEP 02</span>
            <p className="font-bold text-white">Reverse Pickup</p>
            <p className="text-[11px] text-neutral-400">Our courier partner arrives at your address within 24-48 hours to collect the unworn garment with original tags.</p>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1.5">
            <span className="font-display font-bold text-sm text-brand-beige">STEP 03</span>
            <p className="font-bold text-white">Instant Dispatch</p>
            <p className="text-[11px] text-neutral-400">Your exchange size is dispatched via air priority or refunded to your original payment mode within 48 hours.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-neutral-400">Have an active exchange request?</span>
          <Link href="/contact" className="text-brand-beige font-bold uppercase tracking-wider hover:underline flex items-center space-x-1">
            <span>Contact Support Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
};
