import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Check, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Layers,
  Camera,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, BRAND_PILLARS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useStore } from '../context/StoreContext';
import { SEO } from '../components/common/SEO';

// Defer heavy 3D canvases to avoid blocking First Contentful Paint
const Hero3DCanvas = lazy(() => import('../components/hero/Hero3DCanvas').then((m) => ({ default: m.Hero3DCanvas })));
const ManifestoThreeD = lazy(() => import('../components/campaign/ManifestoThreeD').then((m) => ({ default: m.ManifestoThreeD })));

export const HomePage: React.FC = () => {
  const { formatPrice, showToast } = useStore();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const manifestoContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoInView, setVideoInView] = useState(false);
  const [mount3D, setMount3D] = useState(false);
  const [manifestoInView, setManifestoInView] = useState(false);

  // Defer 3D WebGL canvas until interaction or idle to guarantee 0 ms Total Blocking Time (TBT)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mounted = false;
    const triggerMount = () => {
      if (!mounted) {
        mounted = true;
        setMount3D(true);
        cleanup();
      }
    };

    const cleanup = () => {
      window.removeEventListener('scroll', triggerMount);
      window.removeEventListener('touchstart', triggerMount);
      window.removeEventListener('pointermove', triggerMount);
      window.removeEventListener('keydown', triggerMount);
    };

    window.addEventListener('scroll', triggerMount, { passive: true, once: true });
    window.addEventListener('touchstart', triggerMount, { passive: true, once: true });
    window.addEventListener('pointermove', triggerMount, { passive: true, once: true });
    window.addEventListener('keydown', triggerMount, { passive: true, once: true });

    // Fallback: mount after 2500ms so automated visual tests and idle desktop users still render 3D
    const timer = setTimeout(triggerMount, 2500);

    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, []);

  // Lazy-load video stream only when scrolled within 300px of viewport
  useEffect(() => {
    if (!videoContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVideoInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(videoContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Defer Manifesto ThreeUI Paper shaders until within 500px of section 9
  useEffect(() => {
    if (!manifestoContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setManifestoInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px' }
    );
    observer.observe(manifestoContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      showToast('Welcome to the FLEX Athletes Circle. Early drop access granted.', 'success');
    }
  };

  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.badge?.includes('NEW')).slice(0, 4);
  const bestsellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const featuredProducts = PRODUCTS.slice(0, 4);

  const compressionFeatured = PRODUCTS.find((p) => p.category === 'compression') || PRODUCTS[1];
  const streetwearFeatured = PRODUCTS.find((p) => p.fit === 'Oversized Fit') || PRODUCTS[0];

  return (
    <div className="space-y-24 sm:space-y-32">
      <SEO
        title="Engineered Performance & Luxury Streetwear Apparel"
        description="FLEX is a luxury performance gym-wear and streetwear brand. Engineered compression tees, oversized muscle shirts, joggers, and tanks built for movement, discipline, and modern aesthetics."
        canonical="/"
      />
      
      {/* 1. CINEMATIC HERO SECTION WITH 3D KINETIC MOTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-8 pb-16 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A] border-b border-white/10">
        
        {/* Three.js 3D Kinetic Background Canvas (Loaded on idle to guarantee instant FCP & 0 TBT) */}
        <div className="w-full h-full absolute inset-0 pointer-events-none transition-opacity duration-1000">
          {mount3D ? (
            <Suspense fallback={null}>
              <Hero3DCanvas />
            </Suspense>
          ) : null}
        </div>

        {/* Ambient atmospheric glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-neutral-300">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>PREMIUM PERFORMANCE &bull; LUXURY STREETWEAR</span>
              </div>

              {/* Massive Confident Brand Headline */}
              <div className="space-y-2">
                <h1 className="font-display font-black text-6xl sm:text-7xl lg:text-9xl tracking-tighter uppercase italic text-white leading-none">
                  FLEX <span className="text-stroke text-stroke-hover text-white">IT</span>
                </h1>
                <p className="font-display font-bold text-xl sm:text-2xl lg:text-3xl uppercase tracking-widest text-neutral-300">
                  TRAIN <span className="text-neutral-500">/</span> MOVE <span className="text-neutral-500">/</span> LIVE
                </p>
              </div>

              {/* Tagline Subtext */}
              <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed">
                Architectural activewear crafted for those who push boundaries. Heavyweight 240+ GSM cottons, zoned medical-grade compression, and unrestricted athletic drape.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto bg-white text-black hover:bg-neutral-200 px-8 py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 transition-all duration-300 shadow-2xl hover:scale-102"
                >
                  <span>SHOP COLLECTION</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/collections"
                  className="w-full sm:w-auto glass-panel border border-white/20 text-white hover:border-white px-8 py-4 rounded-xl font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all hover:bg-white/10"
                >
                  <span>EXPLORE CAPSULES</span>
                </Link>
              </div>

              {/* Live Athlete Metrics Badge */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-center lg:justify-start space-x-8 text-xs text-neutral-400">
                <div>
                  <p className="font-display font-black text-xl text-white">240+ GSM</p>
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-mono">Heavyweight Cotton</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <p className="font-display font-black text-xl text-white">4-WAY</p>
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-mono">Zoned Compression</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <p className="font-display font-black text-xl text-white">100%</p>
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500 font-mono">Athlete Verified</p>
                </div>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-brand-surface shadow-2xl group aspect-[4/5] sm:aspect-auto">
                <img
                  src="/assets/products/muscle-tee-black.webp"
                  alt="FLEX Model in Washed Black Muscle Tee"
                  width="600"
                  height="750"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full sm:h-[520px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Product Tag */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl border border-white/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">DROP 01 &bull; SIGNATURE</span>
                    <h3 className="font-display font-bold text-sm text-white">Oversized Muscle Tee</h3>
                    <p className="text-xs text-neutral-400 font-mono">₹1,199 <span className="line-through text-neutral-600 text-[10px]">₹1,799</span></p>
                  </div>
                  <Link
                    href="/products/flex-oversized-muscle-tee-washed-black"
                    className="p-2.5 bg-white text-black hover:bg-neutral-200 rounded-lg transition-colors font-bold text-xs uppercase"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[10px] font-mono uppercase tracking-widest text-white">
                  BETTER FIT &bull; BIGGER YOU
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. NEW ARRIVALS — DROP 01 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-2">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>JUST RELEASED FROM THE ATELIER</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            href="/collections/new-arrivals"
            className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white flex items-center space-x-1 transition-colors"
          >
            <span>View All New ({newArrivals.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS / SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              CHOOSE YOUR FIT &bull; CURATED CAPSULES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight mt-1">
              FEATURED COLLECTIONS
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white flex items-center space-x-1 transition-colors"
          >
            <span>All Capsules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.id}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-brand-surface border border-white/10 hover:border-white/40 transition-all duration-500 shadow-xl"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-neutral-400 mb-1">
                  {cat.tagline}
                </span>
                <h3 className="font-display font-black text-xl text-white uppercase tracking-tight group-hover:text-neutral-200 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-snug">
                  {cat.description}
                </p>

                <div className="mt-4 flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-white group-hover:translate-x-1 transition-transform">
                  <span>EXPLORE CAPSULE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. BRAND PILLARS BAR */}
      <section className="bg-brand-surface border-y border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {BRAND_PILLARS.map((pillar, idx) => (
              <div key={idx} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <h4 className="font-display font-black text-xs uppercase tracking-wider text-white">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-[11px] text-neutral-400 leading-snug pl-4">
                  {pillar.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-white" />
              <span>COMMUNITY ACCLAIM &bull; TESTED BY ATHLETES</span>
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight mt-1">
              BEST SELLERS
            </h2>
          </div>
          <Link
            href="/collections/best-sellers"
            className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white flex items-center space-x-1 transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. PERFORMANCE APPAREL FEATURE (COMPRESSION DEEP DIVE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-surface border border-white/10 rounded-3xl overflow-hidden p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              <Zap className="w-3.5 h-3.5 text-white" />
              <span>FEATURED PERFORMANCE INNOVATION</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-tight">
              GRADUATED <br />
              <span className="text-neutral-400">WARP-KNIT COMPRESSION</span>
            </h2>

            <p className="text-sm text-neutral-300 font-sans leading-relaxed">
              Cut close to the physique to lock in thoracic heat, stabilize deltoids under heavy loads, and accelerate muscle recovery between high-intensity sets.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Micro-perforated upper spinal strip for continuous core ventilation</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Ergonomic raglan seams eliminate friction under armpits and trap contact</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Anti-odor antimicrobial silver-ion weave treatment</span>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <Link
                href={`/products/${compressionFeatured.slug}`}
                className="bg-white text-black hover:bg-neutral-200 px-6 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-colors flex items-center space-x-2"
              >
                <span>SHOP PRO COMPRESSION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs font-mono text-neutral-400">{formatPrice(compressionFeatured.price)}</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-black border border-white/15">
              <img
                src="/assets/products/Ocean Blue Compression Shirt Showcase (1).webp"
                alt="FLEX Pro Compression Showcase"
                width="600"
                height="750"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-white border border-white/10 uppercase">
                OCEAN BLUE &bull; EDITION 01
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. OVERSIZED & STREETWEAR FEATURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-surface border border-white/10 rounded-3xl overflow-hidden p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl">
          
          <div className="lg:col-span-6 order-2 lg:order-1 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-black border border-white/15">
              <img
                src="/assets/products/FLEX Washed Black Muscle Tee Collage.webp"
                alt="FLEX Oversized Muscle Tee Storyboard"
                width="600"
                height="750"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-white border border-white/10 uppercase">
                240 GSM &bull; ACID WASH FINISH
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              <Layers className="w-3.5 h-3.5 text-white" />
              <span>STREETWEAR CUT &bull; GYM MOBILITY</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-tight">
              ARCHITECTURAL <br />
              <span className="text-neutral-400">OVERSIZED DRAPE</span>
            </h2>

            <p className="text-sm text-neutral-300 font-sans leading-relaxed">
              Designed for high-intensity lifts and effortless street transition. The raw edge sleeveless cut accentuates upper-body definition while giving delts and lats total freedom of movement.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Raw edge armhole finish for rugged aesthetic and zero friction</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Heavyweight 240 GSM pre-shrunk combed cotton</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <Check className="w-4 h-4 text-white shrink-0" />
                <span>Reinforced ribbed crew neckline that maintains shape wash after wash</span>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <Link
                href={`/products/${streetwearFeatured.slug}`}
                className="bg-white text-black hover:bg-neutral-200 px-6 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-colors flex items-center space-x-2"
              >
                <span>SHOP OVERSIZED TEES</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs font-mono text-neutral-400">{formatPrice(streetwearFeatured.price)}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 8. EDITORIAL PRODUCT STORY / CAMPAIGN REEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl">
          
          <div ref={videoContainerRef} className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-brand-dark">
            <video
              ref={videoRef}
              src={videoInView ? '/assets/video/gemini_generated_video_90ca3e3c.mp4' : undefined}
              poster="/assets/video/video-poster.webp"
              preload="none"
              className="w-full h-full object-cover opacity-85"
              autoPlay={videoInView}
              loop
              muted={isMuted}
              playsInline
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

            {/* Video Controls */}
            <div className="absolute bottom-6 right-6 flex items-center space-x-2 z-20">
              <button
                onClick={toggleVideo}
                className="p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-colors"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleMute}
                className="p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-colors"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Headline Overlay */}
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 max-w-xl z-20 space-y-3">
              <div className="inline-flex items-center space-x-2 bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest backdrop-blur-md">
                <Flame className="w-3 h-3" />
                <span>CAMPAIGN REEL 01 &bull; ATHLETIC STORYBOARD</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-none">
                BUILT DIFFERENT. <br />
                <span className="text-neutral-400">FLEX WHAT YOU ARE.</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md hidden sm:block">
                Behind every heavy lift is relentless discipline. Our pieces are crafted with raw-edge cuts and high-density typography to make a permanent statement.
              </p>
              <div className="pt-2">
                <Link
                  href="/lookbook"
                  className="inline-flex items-center space-x-2 bg-white text-black hover:bg-neutral-200 px-6 py-3 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-colors shadow-2xl"
                >
                  <span>VIEW FULL STORYBOARD</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. EXACT THREEUI COMPONENT INTEGRATION: FLEX ATELIER MANIFESTO (Loaded strictly on scroll) */}
      <div ref={manifestoContainerRef}>
        {manifestoInView ? (
          <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center bg-brand-surface/40" />}>
            <ManifestoThreeD />
          </Suspense>
        ) : (
          <div className="min-h-[500px] bg-[#0A0A0A] border-y border-white/10 flex items-center justify-center">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-600">FLEX ATELIER &bull; 3D KINETIC MANIFESTO</span>
          </div>
        )}
      </div>

      {/* 10. LIFESTYLE IMAGE SECTION (EDITORIAL CRAFTSMANSHIP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
              CRAFTSMANSHIP & MOBILITY
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight leading-tight">
              MORE THAN CLOTHES. <br />
              <span className="text-neutral-500">IT'S A LIFESTYLE.</span>
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              FLEX is built for those who push limits, chase numbers, and never settle. Our activewear is engineered to provide the tactile comfort, anatomical confidence, and performance you need — every set, every move, every day.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Unconstrained Armhole Geometry
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Raw edge sleeves tailored specifically to prevent barbell rub on heavy bench press and lateral raises.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Heavyweight Acid Wash Finishing
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Vintage textured washed black finish that softens with age without fading out.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 border-b-2 border-white pb-1 text-xs font-mono uppercase tracking-widest text-white hover:text-neutral-400 transition-colors"
              >
                <span>READ THE FULL STORY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="group relative rounded-2xl overflow-hidden aspect-[3/5] bg-brand-surface border border-white/10">
              <img
                src="/assets/products/muscle-tee-features.webp"
                alt="Built for movement"
                width="400"
                height="660"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[9px] font-mono uppercase text-neutral-400">PILLAR 01</span>
                <h4 className="font-display font-black text-sm text-white uppercase">BUILT FOR MOVEMENT</h4>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden aspect-[3/5] bg-brand-surface border border-white/10 sm:translate-y-6">
              <img
                src="/assets/products/athletic-sweatpants.webp"
                alt="Designed for you"
                width="400"
                height="660"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[9px] font-mono uppercase text-neutral-400">PILLAR 02</span>
                <h4 className="font-display font-black text-sm text-white uppercase">DESIGNED FOR YOU</h4>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden aspect-[3/5] bg-brand-surface border border-white/10">
              <img
                src="/assets/products/compression-tee-black.webp"
                alt="Quality in every detail"
                width="400"
                height="660"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-4 flex flex-col justify-end">
                <span className="text-[9px] font-mono uppercase text-neutral-400">PILLAR 03</span>
                <h4 className="font-display font-black text-sm text-white uppercase">QUALITY IN DETAIL</h4>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 11. INSTAGRAM / ATHLETE SOCIAL GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-2">
          <div>
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
              <Camera className="w-3.5 h-3.5 text-white" />
              <span>COMMUNITY ON SOCIAL &bull; @FLEX.OFFICIAL</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              ATHLETE DISPATCHES
            </h2>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Tag #BuiltDifferent to be featured
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="group relative rounded-2xl overflow-hidden aspect-square bg-brand-surface border border-white/10">
            <img
              src="/assets/products/FLEX Athletic Sweatpants Studio Look.webp"
              alt="Athlete in FLEX sweatpants"
              width="400"
              height="400"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">@marcus.lift</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden aspect-square bg-brand-surface border border-white/10">
            <img
              src="/assets/products/FLEX Waffle Henley Lookbook.webp"
              alt="FLEX Henley styling"
              width="400"
              height="400"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">@alexandra.train</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden aspect-square bg-brand-surface border border-white/10">
            <img
              src="/assets/products/Ocean Blue FLEX Performance Poster.webp"
              alt="FLEX Ocean blue compression"
              width="400"
              height="400"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">@jordan_power</span>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden aspect-square bg-brand-surface border border-white/10">
            <img
              src="/assets/products/Minimalist FLEX Stripe Sweatpants Catalog Shot.webp"
              alt="FLEX Stripe Joggers"
              width="400"
              height="400"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">@kavya_strength</span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. NEWSLETTER SIGNUP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-surface border border-white/10 rounded-3xl p-8 sm:p-14 text-center max-w-3xl mx-auto space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center mx-auto text-white">
            <Mail className="w-5 h-5" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              JOIN THE CIRCLE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              GET PRIORITY ACCESS TO DROPS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-md mx-auto">
              Our limited capsules sell out quickly. Subscribers receive 30-minute early drop access, private restock links, and editorial dispatches.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-xs font-mono text-white flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You are subscribed. Watch your inbox for priority access tokens.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter athlete email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-black/60 border border-white/15 px-4 py-3 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white font-mono"
              />
              <button
                type="submit"
                className="bg-white text-black hover:bg-neutral-200 px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shrink-0 shadow-lg"
              >
                <span>SUBSCRIBE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[10px] text-neutral-500 font-mono">
            Zero spam. Unsubscribe anytime with one click.
          </p>

        </div>
      </section>

    </div>
  );
};
