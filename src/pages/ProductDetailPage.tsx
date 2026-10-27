import React, { useState, useEffect } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Ruler, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Plus, 
  Minus, 
  Share2,
  ArrowRight,
  Sparkles,
  Lock,
  MessageSquare,
  Clock
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useStore } from '../context/StoreContext';
import { Review } from '../types';

export const ProductDetailPage: React.FC = () => {
  const [, params] = useRoute('/products/:slug');
  const [, setLocation] = useLocation();
  const slug = params?.slug;

  const product = PRODUCTS.find((p) => p.slug === slug || (slug && (p.slug.startsWith(slug) || slug.startsWith(p.slug)))) || PRODUCTS[0];

  const { 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsSizeAdvisorOpen, 
    setIsCartDrawerOpen, 
    showToast 
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Default');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // ElevenLabs / Studio Freight Inspired Audio Resonance Generator
  const playFabricResonance = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.12);
        osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      }
    } catch {
      // Fallback if audio context is blocked
    }
    setIsPlayingAudio(true);
    showToast('Fabric Acoustic Resonance Profile Activated [ 0:14 ]', 'info');
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  // Reviews state with dynamic addition
  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: 'rev-1',
      author: 'Arjun Kapoor',
      rating: 5,
      date: '2026-10-18',
      title: 'Insane drape and arm clearance on bench press',
      comment: 'The raw cut armholes do not bite into your lats during heavy lateral raises or benching. The 240 GSM washed cotton feels heavy and premium without overheating. Definitely purchasing the slate colorway next.',
      verified: true,
      sizePurchased: 'L',
      fitFeedback: 'True to Size'
    },
    {
      id: 'rev-2',
      author: 'Devansh Patel',
      rating: 5,
      date: '2026-10-14',
      title: 'Holds collar structure after multiple heavy washes',
      comment: 'Usually oversized tees get bacon collars after 3 washes. This collar is thick, ribbed, and stays completely flat. The graphic print is deeply embedded and does not crack.',
      verified: true,
      sizePurchased: 'XL',
      fitFeedback: 'True to Size'
    },
    {
      id: 'rev-3',
      author: 'Rohan Mehta',
      rating: 5,
      date: '2026-10-10',
      title: 'Perfect transition from gym to street style',
      comment: 'Paired it with the double stripe sweatpants. It looks straight out of an editorial lookbook. Super fast 2-day delivery to Mumbai.',
      verified: true,
      sizePurchased: 'M',
      fitFeedback: 'Runs Large'
    }
  ]);

  // New review form
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    title: '',
    comment: '',
    fitFeedback: 'True to Size' as 'Runs Small' | 'True to Size' | 'Runs Large'
  });

  // Collapsible accordions
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    features: true,
    specs: false,
    shipping: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Scroll listener for sticky mobile ATC bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 550);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSaved = isInWishlist(product.id);

  // Handle color change and auto-switch image if available
  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    const colorObj = product.colors.find((c) => c.name === colorName);
    if (colorObj?.image) {
      let idx = product.images.indexOf(colorObj.image);
      if (idx === -1) {
        product.images.push(colorObj.image);
        idx = product.images.length - 1;
      }
      setActiveImageIndex(idx);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartDrawerOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setLocation('/checkout');
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Available! Free delivery by ${new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}.`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) {
      showToast('Please fill out all review fields', 'error');
      return;
    }
    const created: Review = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      title: newReview.title || 'Verified Athlete Feedback',
      comment: newReview.comment,
      verified: true,
      sizePurchased: selectedSize,
      fitFeedback: newReview.fitFeedback
    };
    setReviewsList((prev) => [created, ...prev]);
    setShowReviewModal(false);
    setNewReview({ author: '', rating: 5, title: '', comment: '', fitFeedback: 'True to Size' });
    showToast('Review submitted and published successfully!', 'success');
  };

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24 lg:pb-16 font-sans">
      
      {/* Studio Freight / ElevenLabs Technical Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs">
        <div className="flex items-center space-x-3">
          <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300">
            SYS_REF: FLX-{product.id}-2026
          </span>
          <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-white/10 border border-white/20 text-white font-semibold">
            FLEX ATELIER &bull; ATHLETE SPEC
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block -ml-3" />
          <span>IN STOCK &bull; DISPATCHES IN 24H</span>
        </div>
      </div>

      {/* Main Two-Column Product Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Media Gallery */}
        <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-24">
          
          {/* Main Hero Photo with Zoom */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-brand-surface border border-white/10 group shadow-2xl">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-all duration-500 ease-out group-hover:scale-105 cursor-zoom-in"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col space-y-1.5 z-10 pointer-events-none font-mono">
              <span className="bg-white/90 backdrop-blur-md text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                FIG. 0{activeImageIndex + 1}_ELEVATION
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                  -33% BATCH DROP
                </span>
              )}
            </div>

            {/* Wishlist & Share Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 z-10">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-lg bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 transition-colors shadow-lg"
                aria-label="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-lg backdrop-blur-md border transition-colors shadow-lg ${
                  isSaved 
                    ? 'bg-white text-black border-white' 
                    : 'bg-black/70 hover:bg-black/90 text-white border-white/10'
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Studio Freight Numbered Angle Switcher */}
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`px-3 py-2 rounded border transition-all flex items-center space-x-1.5 ${
                  activeImageIndex === idx 
                    ? 'border-white bg-white/10 text-white font-bold ring-1 ring-white/30' 
                    : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30 bg-black/40'
                }`}
              >
                <span className="text-brand-beige">[ 0{idx + 1} ]</span>
                <span className="text-[11px] uppercase tracking-wider">
                  {idx === 0 ? 'FRONT ELEVATION' : idx === 1 ? 'MACRO DETAIL' : 'STUDIO DRAPE'}
                </span>
              </button>
            ))}
          </div>

          {/* ElevenLabs Signature: Interactive Fabric Soundwave & Kinetic Visualizer */}
          <div 
            onClick={playFabricResonance}
            className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 flex items-center justify-between cursor-pointer transition-all group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform">
                ▶
              </div>
              <div>
                <p className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  FABRIC RESONANCE &amp; TENSION PREVIEW
                </p>
                <p className="font-mono text-[10px] text-neutral-400">
                  ACOUSTIC MOTION FIELD RECORDING &bull; 0:14
                </p>
              </div>
            </div>

            {/* Soundwave bars */}
            <div className="flex items-center space-x-1 h-5">
              {[40, 70, 30, 90, 50, 100, 45, 80].map((height, i) => (
                <span 
                  key={i} 
                  className={`w-0.5 bg-brand-beige rounded-full transition-all duration-300 ${isPlayingAudio ? 'animate-pulse' : 'opacity-60'}`}
                  style={{ height: isPlayingAudio ? `${Math.min(100, height + 20)}%` : `${height}%` }}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Buying Controls & Information */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400 mb-1.5">
              <span className="uppercase tracking-widest text-brand-beige font-bold">
                [ {product.fit} // ATHLETIC TEXTILE ]
              </span>
              <span className="text-neutral-500 font-mono">
                BATCH #004 / 2026
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-sans">
              {product.tagline}
            </p>
          </div>

          {/* Pricing Box with Studio Freight Architecture */}
          <div className="p-4 rounded-xl bg-brand-surface/70 border border-white/10 flex items-center justify-between shadow-xl">
            <div>
              <div className="flex items-baseline space-x-3 font-mono">
                <span className="text-2xl font-bold text-white">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-sm text-neutral-500 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                    {product.compareAtPrice > product.price && (
                      <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 bg-emerald-400/10 border border-emerald-400/20 rounded">
                        SAVE {formatPrice(product.compareAtPrice - product.price)}
                      </span>
                    )}
                  </>
                )}
              </div>
              <p className="text-[10px] font-mono text-neutral-400 mt-1">
                Taxes included. Free express logistics across India on orders &gt; ₹999.
              </p>
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-xs font-semibold">
              <span className="text-neutral-400">COLORWAY // SPEC: <span className="text-white font-bold">{selectedColor}</span></span>
            </div>
            <div className="flex space-x-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorChange(color.name)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg border text-xs font-mono transition-all ${
                    selectedColor === color.name
                      ? 'border-white bg-white/10 text-white font-bold ring-1 ring-white/30'
                      : 'border-white/10 text-neutral-400 hover:border-white/30'
                  }`}
                >
                  <span 
                    className="w-3.5 h-3.5 rounded border border-white/20" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Studio Freight Size Selection with Chest Measurements */}
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-xs font-semibold">
              <span className="text-neutral-400">SPECIFICATION // SIZE: <span className="text-white font-bold">{selectedSize}</span></span>
              <button
                onClick={() => setIsSizeAdvisorOpen(true)}
                className="text-brand-beige hover:underline flex items-center space-x-1 font-bold"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>[ FIT ADVISOR &rarr; ]</span>
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 px-2 rounded-lg font-mono text-center transition-all ${
                    selectedSize === size
                      ? 'bg-white text-black shadow-xl font-bold ring-2 ring-brand-beige/40'
                      : 'bg-white/5 text-neutral-300 hover:bg-white/15 border border-white/10'
                  }`}
                >
                  <span className="block text-xs font-bold">{size}</span>
                  <span className="block text-[9px] opacity-70 mt-0.5">
                    {size === 'S' ? '38" CHEST' : size === 'M' ? '40" CHEST' : size === 'L' ? '42" CHEST' : size === 'XL' ? '44" CHEST' : '46" CHEST'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex space-x-3">
              {/* Quantity Counter */}
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 font-mono">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-neutral-400 hover:text-white p-1"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-white text-xs px-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-neutral-400 hover:text-white p-1"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white text-black hover:bg-neutral-200 py-3.5 px-6 rounded-lg font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-between transition-all shadow-xl hover:scale-101"
              >
                <span>ADD TO BAG</span>
                <span>{formatPrice(product.price * quantity)} [ &rarr; ]</span>
              </button>
            </div>

            {/* Instant Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full bg-brand-surface hover:bg-white hover:text-black text-white border border-white/20 py-3.5 rounded-lg font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-lg"
            >
              EXPRESS CHECKOUT &bull; FAST DISPATCH GATEWAY
            </button>
          </div>

          {/* Studio Freight Technical Specification Sheet (2-Column Grid) */}
          <div className="pt-2">
            <div className="flex justify-between items-baseline mb-2 font-mono text-[11px]">
              <span className="font-bold uppercase tracking-wider text-white">
                TECHNICAL SPECIFICATIONS SHEET
              </span>
              <span className="text-neutral-500">
                DOC: SPEC-FLX-0{product.id}
              </span>
            </div>

            <div className="border-t border-b border-white/10 divide-y divide-white/5 font-mono text-xs">
              <div className="flex justify-between py-2.5">
                <span className="text-neutral-500">FABRICATION</span>
                <span className="text-white text-right">{product.specs.composition}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-neutral-500">GSM DENSITY</span>
                <span className="text-white text-right">{product.specs.weight}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-neutral-500">CONSTRUCTION</span>
                <span className="text-white text-right">4-NEEDLE FLATLOCK REINFORCEMENT</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-neutral-500">SILHOUETTE</span>
                <span className="text-white text-right">{product.fit.toUpperCase()} / DROP-SHOULDER</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-neutral-500">TREATMENT</span>
                <span className="text-white text-right">ENZYME PRE-WASH / ZERO SHRINKAGE</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-neutral-500">ORIGIN</span>
                <span className="text-white text-right">STUDIO CRAFTED IN INDIA</span>
              </div>
            </div>
          </div>

          {/* Collapsible Accordion Sections with Studio Freight Monospaced Brackets */}
          <div className="border-t border-white/10 divide-y divide-white/10 pt-2 text-xs font-mono">
            
            {/* Features Accordion */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('features')}
                className="w-full flex justify-between items-center text-left font-bold uppercase tracking-wider text-white"
              >
                <span>[ 01 // PRODUCT NARRATIVE &amp; FIT PROFILE ]</span>
                {openAccordions.features ? <ChevronUp className="w-4 h-4 text-brand-beige" /> : <ChevronDown className="w-4 h-4 text-brand-beige" />}
              </button>
              {openAccordions.features && (
                <div className="mt-3 space-y-2 text-neutral-300 font-sans text-xs leading-relaxed animate-fadeIn">
                  <p>{product.description}</p>
                  <ul className="space-y-1.5 pt-2 font-mono text-[11px]">
                    {product.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-brand-beige flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Technical Specs Accordion */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('specs')}
                className="w-full flex justify-between items-center text-left font-bold uppercase tracking-wider text-white"
              >
                <span>[ 02 // CARE PROTOCOL &amp; LONGEVITY ]</span>
                {openAccordions.specs ? <ChevronUp className="w-4 h-4 text-brand-beige" /> : <ChevronDown className="w-4 h-4 text-brand-beige" />}
              </button>
              {openAccordions.specs && (
                <div className="mt-3 space-y-2 text-neutral-300 font-sans text-xs leading-relaxed animate-fadeIn">
                  <p>Machine wash cold (max 30&deg;C) with similar dark tones. Avoid harsh chemical softeners. Hang dry naturally in ambient shadow. Iron inside out on low heat if desired.</p>
                </div>
              )}
            </div>

            {/* Shipping & Returns Accordion */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full flex justify-between items-center text-left font-bold uppercase tracking-wider text-white"
              >
                <span>[ 03 // DISPATCH, LOGISTICS &amp; GUARANTEE ]</span>
                {openAccordions.shipping ? <ChevronUp className="w-4 h-4 text-brand-beige" /> : <ChevronDown className="w-4 h-4 text-brand-beige" />}
              </button>
              {openAccordions.shipping && (
                <div className="mt-3 space-y-2 text-neutral-300 font-sans text-xs leading-relaxed animate-fadeIn">
                  <p>Central hub dispatch within 24 hours. Express air courier transit delivers within 3-5 business days across all Indian PIN codes. 7-day hassle-free size exchanges and returns guaranteed.</p>
                </div>
              )}
            </div>

          </div>

          {/* Delivery & Pincode Checker */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center space-x-2 font-mono text-[11px] font-bold text-neutral-300 uppercase tracking-wider">
              <Truck className="w-4 h-4 text-brand-beige" />
              <span>PINCODE LOGISTICS CHECKER</span>
            </div>
            <form onSubmit={handlePincodeCheck} className="flex space-x-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="INPUT 6-DIGIT PINCODE"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-brand-beige"
              />
              <button
                type="submit"
                className="bg-white/10 hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-colors"
              >
                CHECK
              </button>
            </form>
            {pincodeStatus && (
              <p className={`font-mono text-[11px] pt-1 ${pincodeStatus.startsWith('Available') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {pincodeStatus}
              </p>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-[10px] text-neutral-400">
            <div className="p-2.5 bg-white/5 rounded-xl flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-brand-beige mb-1" />
              <span>Reinforced Seams</span>
            </div>
            <div className="p-2.5 bg-white/5 rounded-xl flex flex-col items-center">
              <RotateCcw className="w-4 h-4 text-brand-beige mb-1" />
              <span>Easy Size Swaps</span>
            </div>
            <div className="p-2.5 bg-white/5 rounded-xl flex flex-col items-center">
              <Lock className="w-4 h-4 text-brand-beige mb-1" />
              <span>100% Encrypted</span>
            </div>
          </div>

        </div>

      </div>

      {/* Customer Reviews & Ratings Section */}
      <section className="border-t border-white/10 pt-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
              COMMUNITY FEEDBACK
            </span>
            <h2 className="font-display font-black text-3xl uppercase text-white tracking-tight mt-1">
              ATHLETE REVIEWS ({reviewsList.length})
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-white text-black hover:bg-brand-beige px-6 py-3 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center space-x-2 transition-colors shadow-xl"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WRITE A REVIEW</span>
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="bg-brand-surface/50 p-6 rounded-3xl border border-white/10 space-y-3 shadow-xl">
              <div className="flex justify-between items-start">
                <div className="flex text-brand-beige">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Verified Athlete
                </span>
              </div>
              <h4 className="font-display font-bold text-sm text-white">{rev.title}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                "{rev.comment}"
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] text-neutral-500 flex justify-between">
                <span>{rev.author} • Size {rev.sizePurchased}</span>
                <span className="text-brand-beige font-semibold">{rev.fitFeedback}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Carousel */}
      <section className="border-t border-white/10 pt-16 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
              COMPLETE THE ATHLETE KIT
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-white tracking-tight mt-1">
              YOU MAY ALSO LIKE
            </h2>
          </div>
          <Link href="/shop" className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Sticky Mobile Add-To-Cart Bar */}
      {showStickyBar && (
        <div className="lg:hidden fixed bottom-14 inset-x-0 glass-panel border-t border-white/15 p-3 z-30 flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center space-x-2.5 min-w-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-10 h-12 object-cover rounded-lg bg-brand-card flex-shrink-0 border border-white/10"
            />
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">{product.name}</p>
              <p className="text-[10px] text-neutral-400">Size: <strong className="text-white">{selectedSize}</strong> • {formatPrice(product.price)}</p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-white text-black hover:bg-brand-beige px-4 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider whitespace-nowrap flex items-center space-x-1.5 shadow-xl"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>ADD TO BAG</span>
          </button>
        </div>
      )}

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setShowReviewModal(false)}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-brand-surface rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white/15 shadow-2xl space-y-4 animate-fadeIn">
              <h3 className="font-display font-black text-xl text-white uppercase">
                Write Athlete Review
              </h3>
              <p className="text-xs text-neutral-400">
                Reviewing: <strong className="text-white">{product.name}</strong>
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    placeholder="e.g. Sahil R."
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-brand-beige"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-300 block mb-1 font-bold">Star Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-brand-beige"
                    >
                      <option value={5} className="bg-brand-surface text-white">5 Stars (Flawless)</option>
                      <option value={4} className="bg-brand-surface text-white">4 Stars (Great)</option>
                      <option value={3} className="bg-brand-surface text-white">3 Stars (Average)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-300 block mb-1 font-bold">Fit Assessment</label>
                    <select
                      value={newReview.fitFeedback}
                      onChange={(e) => setNewReview({ ...newReview, fitFeedback: e.target.value as any })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-brand-beige"
                    >
                      <option value="True to Size" className="bg-brand-surface text-white">True to Size</option>
                      <option value="Runs Small" className="bg-brand-surface text-white">Runs Small</option>
                      <option value="Runs Large" className="bg-brand-surface text-white">Runs Large / Boxy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Headline</label>
                  <input
                    type="text"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    placeholder="e.g. Best muscle tee cut I own"
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-brand-beige"
                  />
                </div>

                <div>
                  <label className="text-neutral-300 block mb-1 font-bold">Review Comments</label>
                  <textarea
                    rows={3}
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share how the fabric feels during workouts or street layering..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-white focus:outline-none focus:border-brand-beige"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 py-3 rounded-xl border border-white/15 text-neutral-400 hover:text-white uppercase font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-white text-black hover:bg-brand-beige py-3 rounded-xl font-display font-black uppercase tracking-wider"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
