import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10 text-xs text-neutral-300 font-sans leading-relaxed">
      
      <div className="border-b border-white/10 pb-6 space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
          TERMS OF SERVICE
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
          TERMS & CONDITIONS
        </h1>
        <p className="text-neutral-500 font-mono text-[11px]">
          LAST REVISED: OCTOBER 2026 • STORE: FLEX-FIT.SHOP
        </p>
      </div>

      <div className="space-y-6 bg-brand-surface p-8 rounded-3xl border border-white/10">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-base uppercase text-white">1. OVERVIEW & ACCEPTANCE</h2>
          <p>
            By accessing or using the website <strong>flex-fit.shop</strong>, or purchasing garments from FLEX IT, you agree to be bound by these Terms and Conditions. Please review them carefully prior to completing any purchase.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-base uppercase text-white">2. PRODUCT SPECIFICATIONS & PRICING</h2>
          <p>
            We strive to display our garments, colors, textures, and GSM weights as accurately as possible. However, monitor displays may cause slight tonal variations in acid-washed cotton finishes. Prices are stated in Indian Rupees (INR) and are subject to adjustment without prior notice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-base uppercase text-white">3. ORDERS & FULFILLMENT</h2>
          <p>
            We reserve the right to decline or cancel any order in instances of typographical inaccuracies, inventory oversights, or fraudulent payment flags. In any such circumstance, a full refund will be processed promptly to your original payment method.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-base uppercase text-white">4. INTELLECTUAL PROPERTY</h2>
          <p>
            All content, including graphics, logo designs, typography, brand assets, product names, and photography displayed on flex-fit.shop, are the exclusive intellectual property of FLEX IT. Any unauthorized commercial duplication or redistribution is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-base uppercase text-white">5. JURISDICTION & DISPUTES</h2>
          <p>
            These Terms and any related agreements are governed by and construed in accordance with the laws of India, with jurisdiction situated in Mumbai, Maharashtra.
          </p>
        </section>
      </div>

    </div>
  );
};
