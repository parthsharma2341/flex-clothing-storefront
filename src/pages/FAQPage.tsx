import React, { useState } from 'react';
import { Link } from 'wouter';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    '0': true,
    '3': true
  });

  const faqs = [
    {
      category: 'shipping',
      question: 'What are the delivery timelines and shipping charges across India?',
      answer: 'We provide Free Express Delivery on all orders over ₹1,499. For orders under ₹1,499, a flat standard delivery fee of ₹99 applies. Orders for metro cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Pune) are delivered within 2 to 3 business days. Non-metro locations are delivered within 4 to 6 business days via air express partners (BlueDart, DTDC, Delhivery).'
    },
    {
      category: 'shipping',
      question: 'How do I track my active order?',
      answer: 'Once your order is processed and packaged at our warehouse, you will receive an automated SMS and email containing your direct AWB tracking link. You can also view live tracking anytime on our website under your Account dashboard.'
    },
    {
      category: 'returns',
      question: 'What is the 7-day Exchange and Return Policy?',
      answer: 'We offer a 7-day hassle-free exchange policy from the date of delivery. If you need a size adjustment or alternative color, you can initiate a swap directly through our contact portal or email. We arrange door-to-door reverse pickup. Garments must be unworn, unwashed, and have original tags intact.'
    },
    {
      category: 'sizing',
      question: 'How does the Oversized Muscle Tee fit compared to standard tees?',
      answer: 'Our Oversized Muscle Tees are engineered with a dropped shoulder and an architectural boxy drape. They feature raw-edge armholes designed to sit clean around your delts and lats without digging in. We recommend ordering your true standard size for the intended streetwear drape, or sizing down if you prefer a tighter athletic taper.'
    },
    {
      category: 'sizing',
      question: 'Should I size up for the Seamless Compression Tee?',
      answer: 'Our compression tops are crafted with an 18% high-elastic spandex matrix that provides targeted posture compression. If you prefer a second-skin snug grip, pick your standard size. If you have broader shoulders or prefer easier pull-on convenience, we recommend sizing up one size.'
    },
    {
      category: 'care',
      question: 'How should I wash and care for heavyweight acid-washed cotton?',
      answer: 'Always wash inside out in cold water (30°C / 85°F) on a gentle cycle. Use mild liquid detergents and avoid chlorine bleach. Hang dry in the shade to preserve the washed vintage patina and prevent shrinkage. Never iron directly over the chest or back screen-printed Gothic sigil.'
    },
    {
      category: 'payment',
      question: 'Which payment options are supported?',
      answer: 'We support all major Indian payment gateways including Instant UPI (Google Pay, PhonePe, Paytm, BHIM, Cred), Credit and Debit Cards (Visa, MasterCard, RuPay), Net Banking across 50+ banks, and Cash on Delivery (COD) for eligible pincodes.'
    },
    {
      category: 'payment',
      question: 'Is online transaction data secure?',
      answer: 'Yes. All payments are encrypted through 256-bit SSL banking-grade protocols. FLEX never stores your credit card numbers or banking passwords on our servers.'
    }
  ];

  const toggleItem = (idx: string) => {
    setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <SEO
        title="Frequently Asked Questions (FAQ) & Customer Help"
        description="Official answers to FLEX sizing recommendations, delivery timelines across India, 7-day hassle-free exchange policy, and garment care instructions."
        canonical="/faq"
        schema={{
          '@type': 'FAQPage',
          'mainEntity': faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        }}
      />
      
      {/* Header */}
      <div className="border-b border-white/10 pb-8 text-center space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
          HELP & SUPPORT DESK
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl uppercase text-white tracking-tight">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto">
          Instant answers regarding our textile engineering, orders, shipping timelines, sizing advice, and exchange procedures.
        </p>

        {/* Search input */}
        <div className="pt-4 max-w-lg mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. shipping, wash care, return)..."
            className="w-full bg-white/5 border border-white/15 rounded-2xl px-5 py-3.5 pl-11 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-beige shadow-xl"
          />
          <Search className="w-5 h-5 text-neutral-400 absolute left-3.5 top-4" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-2 justify-start sm:justify-center">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'shipping', label: 'Shipping & Delivery' },
          { id: 'returns', label: 'Exchanges & Returns' },
          { id: 'sizing', label: 'Sizing & Fit' },
          { id: 'care', label: 'Garment Care' },
          { id: 'payment', label: 'Payments' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-white text-black shadow-lg'
                : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 p-8 space-y-3">
            <HelpCircle className="w-8 h-8 text-neutral-500 mx-auto" />
            <h3 className="font-display font-bold text-white text-base">No questions found matching your query</h3>
            <p className="text-xs text-neutral-400">Can't find what you're looking for? Reach out directly to our support crew.</p>
            <Link href="/contact" className="inline-block text-xs uppercase font-bold text-brand-beige underline mt-2">
              Contact Athlete Support &rarr;
            </Link>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = !!openItems[idx.toString()];
            return (
              <div 
                key={idx}
                className="bg-brand-surface rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleItem(idx.toString())}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-white tracking-tight leading-snug">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full bg-white/5 flex-shrink-0 text-brand-beige">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed border-t border-white/5 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-brand-surface/60 rounded-3xl p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-display font-black text-xl text-white uppercase">Still have questions?</h3>
          <p className="text-xs text-neutral-400">Our customer care athletes are available Mon–Sat, 10 AM to 7 PM IST.</p>
        </div>
        <Link
          href="/contact"
          className="bg-white text-black hover:bg-brand-beige px-6 py-3.5 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center space-x-2 transition-colors whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4" />
          <span>CONTACT ATHLETE CARE</span>
        </Link>
      </div>

    </div>
  );
};
