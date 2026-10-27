import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10 text-xs text-neutral-300 font-sans leading-relaxed">
      
      <div className="border-b border-white/10 pb-6 space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
          LEGAL & DATA COMPLIANCE
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
          PRIVACY POLICY
        </h1>
        <p className="text-neutral-500 font-mono text-[11px]">
          LAST UPDATED: OCTOBER 2026 • OPERATING DOMAIN: FLEX-FIT.SHOP
        </p>
      </div>

      <div className="space-y-6 bg-brand-surface p-8 rounded-3xl border border-white/10">
        <section className="space-y-2">
          <h2 className="font-display font-bold text-base uppercase text-white">1. INTRODUCTION</h2>
          <p>
            FLEX IT ("we", "our", or "us"), operating at <strong>flex-fit.shop</strong>, respects your privacy and is dedicated to protecting the personal information you share with us. This Privacy Policy details how we collect, store, and utilize your information when you visit our storefront or make purchases.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-base uppercase text-white">2. INFORMATION WE COLLECT</h2>
          <p>
            When you purchase our activewear or interact with our services, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-400">
            <li><strong>Personal Contact Data:</strong> Name, delivery address, phone number, and email address.</li>
            <li><strong>Order Data:</strong> Garment purchases, sizes, quantities, and transaction records.</li>
            <li><strong>Device & Browsing Data:</strong> IP address, browser type, and operating system collected via essential cookies to preserve your bag state.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-base uppercase text-white">3. PAYMENT PROCESSING SECURITY</h2>
          <p>
            All financial transactions on flex-fit.shop are processed through PCI-DSS compliant payment gateways (UPI, RuPay, Visa, MasterCard). We do not store full credit/debit card numbers or CVV codes on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-base uppercase text-white">4. THIRD-PARTY LOGISTICS</h2>
          <p>
            Your shipping details (name, delivery address, and telephone number) are shared exclusively with trusted air courier partners (e.g. BlueDart, DTDC, Delhivery) strictly for parcel transit and SMS delivery alerts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display font-bold text-base uppercase text-white">5. CONTACT & DATA INQUIRIES</h2>
          <p>
            For any privacy inquiries or to request data deletion, contact our Data Governance Officer at <strong className="text-white">support@flex-fit.shop</strong>.
          </p>
        </section>
      </div>

    </div>
  );
};
