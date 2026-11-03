import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Check, Layers, Cpu, Compass } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-32 py-10">
      <SEO
        title="About FLEX | Textile Engineering & Athletic Ethos"
        description="Learn about FLEX: Our mission to bridge heavyweight 240+ GSM streetwear drape with zoned 4-way compression performance gear for athletes."
        canonical="/about"
        schema={{
          '@type': 'AboutPage',
          'name': 'About FLEX Apparel',
          'description': 'Textile engineering principles and athletic performance streetwear manifesto by FLEX.',
          'url': 'https://www.flex-fit.shop/about',
          'mainEntity': {
            '@type': 'Organization',
            'name': 'FLEX',
            'url': 'https://www.flex-fit.shop/'
          }
        }}
      />
      
      {/* 1. Hero Manifesto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-brand-beige/10 border border-brand-beige/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-beige">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ESTABLISHED 2024 • ATHLETIC STREETWEAR</span>
        </div>

        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter text-white max-w-4xl mx-auto leading-none">
          ENGINEERED FOR THE DISCIPLINED.
        </h1>

        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-sans leading-relaxed">
          FLEX was born out of frustration with generic, flimsy gym merchandise. We engineer performance activewear with the heavyweight architectural drape of high-end streetwear and the kinetic tolerance of elite strength gear.
        </p>

        <div className="pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-white text-black hover:bg-brand-beige px-8 py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-all shadow-2xl"
          >
            <span>EXPLORE OUR RELEASES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 2. Visual Storyboard & Brand Kit Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-brand-surface shadow-2xl group aspect-[4/3]">
            <img
              src="/assets/branding/brand-kit.webp"
              alt="FLEX Brand Proposal & Kit"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-beige">THE BLUEPRINT</span>
              <h3 className="font-display font-bold text-lg text-white">OVERSIZED. STREET. YOU.</h3>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-beige">OUR TARGET & ETHOS</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
              BUILT FOR THOSE WHO CHASE GOALS AND NEVER SETTLE.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              Our target audience is athletes, collegiate lifters, and urban creators (16–28) who live at the intersection of heavy gym volume and streetwear culture. When you step out of the rack, you shouldn't have to change outfits to make a statement in the city.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="font-display font-black text-2xl text-white">240+ GSM</span>
                <p className="text-xs text-neutral-400">Vintage washed heavy cotton with natural drape</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <span className="font-display font-black text-2xl text-brand-beige">ZERO RUB</span>
                <p className="text-xs text-neutral-400">Raw-cut armholes crafted for barbell clearance</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Three Pillars of Engineering */}
      <section className="bg-brand-surface py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
              HOW WE BUILD
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
              TEXTILE ENGINEERING PRINCIPLES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-beige">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-lg uppercase text-white">
                ZONED 4-WAY COMPRESSION
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We combine technical polyester and high-grade spandex in a warp-knitted matrix. Graduated thoracic pressure supports scapular retraction and muscle temperature retention.
              </p>
            </div>

            <div className="bg-black/50 p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-beige">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-lg uppercase text-white">
                360 GSM FRENCH TERRY
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Our sweatpants use loopback French terry rather than synthetic brushed polyester fleece. The looped interior pulls moisture away from the skin while the heavy drape creates an elongated leg line.
              </p>
            </div>

            <div className="bg-black/50 p-8 rounded-2xl border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-beige">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-lg uppercase text-white">
                REINFORCED FLATLOCK SEAMS
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Every stress point—crotch gusset, armholes, and ribbed neckband—is secured with high-tensile 4-needle 6-thread flatlock stitching to survive thousands of squats and heavy clean-and-jerks.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Full Width Editorial Lookbook Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black p-8 sm:p-16 flex flex-col items-center text-center space-y-6 shadow-2xl">
          <img
            src="/assets/products/FLEX Washed Black Muscle Tee Collage.png"
            alt="Lookbook visual"
            className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-beige">
              COMMUNITY DIRECTORY
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
              WEAR IT. OWN IT. FLEX IT.
            </h2>
            <p className="text-sm text-neutral-300">
              Join thousands of dedicated athletes across India and worldwide who wear FLEX in the gym, on campus, and on the street.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center space-x-2 bg-white text-black hover:bg-brand-beige px-8 py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-all shadow-2xl"
              >
                <span>SHOP THE COLLECTION NOW</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
