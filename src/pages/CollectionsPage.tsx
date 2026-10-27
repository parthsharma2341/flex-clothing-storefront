import React, { useState, useMemo } from 'react';
import { useRoute, Link } from 'wouter';
import { 
  ArrowRight, 
  Sparkles, 
  SlidersHorizontal, 
  Grid3X3, 
  Grid2X2, 
  RotateCcw, 
  Flame, 
  ShieldCheck, 
  ChevronRight,
  Bell
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { Product } from '../types';

interface CollectionMeta {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  badge?: string;
}

const COLLECTION_DEFINITIONS: Record<string, CollectionMeta> = {
  'all': {
    id: 'all',
    slug: 'all',
    title: 'THE COMPLETE ARCHIVE',
    subtitle: 'All Engineered Apparel & Streetwear Silhouettes',
    description: 'Explore the entire FLEX catalog. Precision-engineered compression wear, 240+ GSM heavyweight oversized muscle tees, textured waffle henleys, and architectural fleece sweatpants.',
    heroImage: '/assets/products/Flex It Athletic Streetwear Homepage.png',
    badge: 'FULL CATALOG'
  },
  'compression': {
    id: 'compression',
    slug: 'compression',
    title: 'TECHNICAL PRO COMPRESSION',
    subtitle: 'Zoned Warp-Knit Pressure & Ergonomic Flatlock Seams',
    description: 'Engineered for maximal exertion and rapid muscle oxygenation. Micro-geometric knit panels deliver targeted thoracic support, zero-chafe underarm mobility, and continuous sweat evacuation.',
    heroImage: '/assets/products/compression-tee-blue.png',
    badge: 'ATHLETE SPEC'
  },
  't-shirts': {
    id: 't-shirts',
    slug: 't-shirts',
    title: 'T-SHIRTS & THERMAL HENLEYS',
    subtitle: 'Heavyweight Combed Cottons & Textured Waffles',
    description: 'The foundation of everyday performance and street layering. Crafted with structured rib collars, 3-button plackets, and pre-shrunk organic yarn.',
    heroImage: '/assets/products/waffle-henley.png',
    badge: 'ESSENTIALS'
  },
  'oversized-tees': {
    id: 'oversized-tees',
    slug: 'oversized-tees',
    title: 'OVERSIZED MUSCLE TEES',
    subtitle: 'Raw-Edge Armholes & 240 GSM Acid-Washed Cotton',
    description: 'Cut specifically to accentuate deltoid and lat development while eliminating sleeve drag on heavy bench presses, lateral raises, and cleans.',
    heroImage: '/assets/products/muscle-tee-black.png',
    badge: 'STREETWEAR CUT'
  },
  'tank-tops': {
    id: 'tank-tops',
    slug: 'tank-tops',
    title: 'PERFORMANCE STRINGERS & TANKS',
    subtitle: 'Deep Y-Back Contour & Featherweight Bamboo-Cotton',
    description: 'Unrestricted upper-body ventilation. Engineered with thin aesthetic shoulder straps and an elongated curved hem that stays anchored under load.',
    heroImage: '/assets/products/muscle-tee-features.png',
    badge: 'MAX MOBILITY'
  },
  'joggers': {
    id: 'joggers',
    slug: 'joggers',
    title: 'ATHLETIC JOGGERS & SWEATS',
    subtitle: '360 GSM French Terry & Concealed YKK Zipper Storage',
    description: 'Heavyweight recovery fleece tailored with reinforced crotch gussets for squat mobility, twin outer racing stripes, and structured ankle tapers.',
    heroImage: '/assets/products/stripe-joggers-grey.png',
    badge: 'RECOVERY & STREET'
  },
  'shorts': {
    id: 'shorts',
    slug: 'shorts',
    title: 'ATHLETIC PERFORMANCE SHORTS',
    subtitle: 'Drop 02 Preview — 5" & 7" Inseam Engineered Silhouettes',
    description: 'Currently in prototype development and athlete wear-testing. Featuring lightweight 4-way stretch ripstop, internal compression liner, and concealed bounce-free phone pocket.',
    heroImage: '/assets/branding/brand-kit.jpg',
    badge: 'UPCOMING DROP'
  },
  'henley': {
    id: 'henley',
    slug: 'henley',
    title: 'THERMAL WAFFLE HENLEYS',
    subtitle: '280 GSM Honeycomb Knit & Matte Hardware',
    description: 'Micro-thermal knit architecture that retains warmth during chilly commutes while breathing effortlessly as internal body temperature rises.',
    heroImage: '/assets/products/FLEX Waffle Henley Lookbook.png',
    badge: 'TEXTURED KNIT'
  },
  'new-arrivals': {
    id: 'new-arrivals',
    slug: 'new-arrivals',
    title: 'NEW ARRIVALS — DROP 01',
    subtitle: 'The Latest Technical Drops & Seasonal Colorways',
    description: 'Fresh from the FLEX atelier. Ocean Blue compression editions, vintage slate muscle tees, and wide-leg architectural sweatpants.',
    heroImage: '/assets/products/Ocean Blue FLEX Performance Poster.png',
    badge: 'JUST RELEASED'
  },
  'best-sellers': {
    id: 'best-sellers',
    slug: 'best-sellers',
    title: 'COMMUNITY BESTSELLERS',
    subtitle: 'Most Highly Rated Pieces Tested by Competitive Lifters',
    description: 'Our most demanded performance silhouettes with verified 4.8+ ratings across hundreds of competitive athletes.',
    heroImage: '/assets/products/FLEX Washed Black Muscle Tee Collage.png',
    badge: 'TOP RATED'
  }
};

export const CollectionsPage: React.FC = () => {
  const [, params] = useRoute('/collections/:slug');
  const slug = params?.slug?.toLowerCase();

  // Filter state for single collection view
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);

  // If a specific collection is requested
  const collectionMeta = slug ? COLLECTION_DEFINITIONS[slug] : null;

  // Filter products for the requested collection
  const collectionProducts = useMemo(() => {
    if (!slug) return [];

    let filtered = PRODUCTS.filter((p) => {
      if (slug === 'all') return true;
      if (slug === 'compression') return p.category === 'compression' || p.collection.includes('compression');
      if (slug === 't-shirts') return p.category === 't-shirts' || p.collection.includes('t-shirts') || p.name.includes('Henley');
      if (slug === 'oversized-tees') return p.fit === 'Oversized Fit' || p.name.includes('Muscle Tee') || p.collection.includes('muscle-tees');
      if (slug === 'tank-tops') return p.category === 'tanks' || p.name.includes('Stringer') || p.name.includes('Tank');
      if (slug === 'joggers') return p.category === 'joggers' || p.collection.includes('joggers');
      if (slug === 'henley') return p.name.toLowerCase().includes('henley') || p.slug.includes('henley');
      if (slug === 'new-arrivals') return p.isNewArrival === true || p.collection.includes('new-arrivals');
      if (slug === 'best-sellers') return p.isBestSeller === true || p.collection.includes('bestsellers');
      if (slug === 'shorts') return false; // Upcoming drop
      return p.collection.includes(slug) || p.category === slug;
    });

    if (selectedSize !== 'all') {
      filtered = filtered.filter((p) => p.sizes.includes(selectedSize as any));
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0;
    });
  }, [slug, selectedSize, sortBy]);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setNotified(true);
    }
  };

  // 1. SINGLE COLLECTION VIEW
  if (slug && collectionMeta) {
    const isUpcoming = slug === 'shorts' || collectionProducts.length === 0;

    return (
      <div className="space-y-12 pb-20">
        
        {/* Collection Hero Banner */}
        <section className="relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden border-b border-white/10 bg-brand-black">
          <img
            src={collectionMeta.heroImage}
            alt={collectionMeta.title}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4 py-16">
            
            {/* Breadcrumb */}
            <div className="flex items-center justify-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-neutral-600" />
              <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
              <ChevronRight className="w-3 h-3 text-neutral-600" />
              <span className="text-white font-bold">{collectionMeta.title}</span>
            </div>

            {collectionMeta.badge && (
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-white border border-white/20">
                <Sparkles className="w-3 h-3" />
                <span>{collectionMeta.badge}</span>
              </div>
            )}

            <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
              {collectionMeta.title}
            </h1>

            <p className="font-display text-sm sm:text-base uppercase tracking-wider text-neutral-300 font-semibold max-w-2xl mx-auto">
              {collectionMeta.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto font-sans leading-relaxed">
              {collectionMeta.description}
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Quick Collection Switcher Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10 text-xs">
            <span className="text-neutral-500 font-mono text-[11px] uppercase mr-2 shrink-0">BROWSE DROPS:</span>
            {Object.values(COLLECTION_DEFINITIONS).map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors border ${
                  col.slug === slug
                    ? 'bg-white text-black font-bold border-white'
                    : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white hover:border-white/25'
                }`}
              >
                {col.title.split('—')[0]}
              </Link>
            ))}
          </div>

          {/* Filtering & Layout Bar */}
          {!isUpcoming && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 text-xs">
              
              <div className="flex items-center space-x-3">
                <span className="font-mono text-neutral-400">
                  SHOWING <strong className="text-white">{collectionProducts.length}</strong> GARMENTS
                </span>

                {/* Size Filter Pills */}
                <div className="hidden md:flex items-center space-x-1 pl-4 border-l border-white/10">
                  <span className="text-neutral-500 mr-1 text-[11px] font-mono">SIZE:</span>
                  {['all', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                        selectedSize === sz
                          ? 'bg-white text-black font-bold'
                          : 'bg-white/5 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {sz.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sorting & Grid Density */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-neutral-400 text-[11px] font-mono">SORT:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-brand-surface border border-white/15 text-white px-3 py-1.5 rounded-lg text-xs font-mono focus:outline-none focus:border-white"
                  >
                    <option value="featured">Featured / Curated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">New Arrivals</option>
                  </select>
                </div>

                <div className="hidden lg:flex items-center space-x-1 bg-white/5 p-1 rounded-lg border border-white/10">
                  <button
                    onClick={() => setGridCols(3)}
                    className={`p-1.5 rounded transition-colors ${gridCols === 3 ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
                    aria-label="3 columns grid"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridCols(4)}
                    className={`p-1.5 rounded transition-colors ${gridCols === 4 ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
                    aria-label="4 columns grid"
                  >
                    <Grid2X2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Product Grid */}
          {!isUpcoming ? (
            <div className={`grid grid-cols-2 ${gridCols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4 sm:gap-6`}>
              {collectionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Upcoming / Prototype Notice */
            <div className="bg-brand-surface border border-white/10 rounded-3xl p-10 sm:p-16 text-center max-w-2xl mx-auto space-y-6 shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-white">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  DROP 02 • IN DEVELOPMENT & ATHLETE WEAR TESTING
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-white tracking-tight">
                  {collectionMeta.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                  {collectionMeta.description}
                </p>
              </div>

              {/* Notification Signup */}
              {notified ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs font-mono">
                  ✓ Priority drop alert registered. You will receive an SMS & Email 30 minutes before public release.
                </div>
              ) : (
                <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="Enter email for priority drop alert"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    className="flex-1 bg-black/60 border border-white/15 px-4 py-3 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black hover:bg-neutral-200 px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shrink-0"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>NOTIFY ME</span>
                  </button>
                </form>
              )}

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/shop"
                  className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
                >
                  <span>BROWSE CURRENTLY STOCKED COLLECTIONS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>
    );
  }

  // 2. ROOT COLLECTIONS DIRECTORY VIEW (/collections)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="border-b border-white/10 pb-8 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          <Sparkles className="w-3 h-3 text-white" />
          <span>CURATED CAPSULES & PERFORMANCE DROPS</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl uppercase text-white tracking-tight">
          FLEX COLLECTIONS
        </h1>
        <p className="text-sm text-neutral-400 font-sans leading-relaxed">
          Purpose-built capsules engineered for high-performance weightlifting, athletic conditioning, and luxury minimalist street aesthetics.
        </p>
      </div>

      {/* Collections Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.values(COLLECTION_DEFINITIONS).map((col) => {
          // Count active items
          const count = PRODUCTS.filter((p) => {
            if (col.slug === 'all') return true;
            if (col.slug === 'compression') return p.category === 'compression' || p.collection.includes('compression');
            if (col.slug === 't-shirts') return p.category === 't-shirts' || p.collection.includes('t-shirts');
            if (col.slug === 'oversized-tees') return p.fit === 'Oversized Fit' || p.name.includes('Muscle Tee');
            if (col.slug === 'tank-tops') return p.category === 'tanks';
            if (col.slug === 'joggers') return p.category === 'joggers';
            if (col.slug === 'henley') return p.name.toLowerCase().includes('henley');
            if (col.slug === 'new-arrivals') return p.isNewArrival === true;
            if (col.slug === 'best-sellers') return p.isBestSeller === true;
            return false;
          }).length;

          return (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group relative rounded-3xl overflow-hidden aspect-[16/10] bg-brand-surface border border-white/10 hover:border-white/40 transition-all duration-500 shadow-2xl flex flex-col justify-end p-8"
            >
              <img
                src={col.heroImage}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 opacity-75 group-hover:opacity-95"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-white border border-white/15">
                  <Sparkles className="w-3 h-3" />
                  <span>{col.slug === 'shorts' ? 'PREVIEW / DROP 02' : `${count} GARMENTS`}</span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-white tracking-tight group-hover:text-neutral-200 transition-colors">
                  {col.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-lg line-clamp-2 font-sans">
                  {col.subtitle}
                </p>

                <div className="pt-2 flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-white group-hover:translate-x-2 transition-transform">
                  <span>{col.slug === 'shorts' ? 'VIEW PROTOTYPE DETAILS' : 'SHOP THIS CAPSULE'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
};
