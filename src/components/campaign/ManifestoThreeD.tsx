import React, { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Sparkles, Layers, ShieldCheck, Compass } from 'lucide-react';
import { ThreeDPaper, ThreeDPaperVariant } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';

export const ManifestoThreeD: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<ThreeDPaperVariant>('original');

  const variants: { id: ThreeDPaperVariant; label: string; badge: string }[] = [
    { id: 'original', label: 'Edition 01 — Original', badge: 'HERITAGE' },
    { id: 'certificate', label: 'Edition 02 — Certificate of Caliber', badge: 'ATHLETE SPEC' },
    { id: 'japanese', label: 'Edition 03 — Tokyo Capsule', badge: 'INTERNATIONAL' },
    { id: 'site-of-the-year', label: 'Edition 04 — Editorial Standard', badge: 'ATELIER' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white border-y border-white/10 py-20 lg:py-28">
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-neutral-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
              <span>EDITORIAL INTERLUDE &bull; THREEUI ARCHITECTURAL SHADER</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-none">
              FLEX ATELIER <span className="text-neutral-500 font-light">/</span> MANIFESTO
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-sans leading-relaxed">
            Interact with the tactile, translucent certificate of craftsmanship. Built with custom WebGL GLSL shaders, procedural CanvasTexture, and dynamic lighting physics.
          </p>
        </div>

        {/* Interactive Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3D Paper Interactive Canvas Frame */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-[#08080A] shadow-2xl group">
              
              {/* Interactive ThreeDPaper Shader Container */}
              <div className="w-full h-[460px] sm:h-[540px] relative shader-frame">
                <ThreeDPaper 
                  variant={selectedVariant} 
                  className="w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              {/* Floating interactive hint */}
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex items-center justify-between text-[11px] font-mono text-neutral-400 bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10">
                <span className="flex items-center space-x-2">
                  <Compass className="w-3.5 h-3.5 text-white animate-spin" style={{ animationDuration: '8s' }} />
                  <span>POINTER RESPONSIVE &bull; DRAG OR MOVE CURSOR</span>
                </span>
                <span className="text-white uppercase font-bold tracking-wider">
                  VARIANT: {selectedVariant.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Edition Switcher Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
                    selectedVariant === v.id
                      ? 'bg-white text-black border-white font-bold shadow-md'
                      : 'bg-white/5 text-neutral-300 border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
                  aria-label={`Select 3D paper variant ${v.label}`}
                >
                  <span className="mr-1.5 opacity-60">[{v.badge}]</span>
                  <span>{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Brand Pillars & Specifications */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                DISCIPLINE &bull; TACTILE &bull; EDITORIAL
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                THE PHYSICAL MANIFESTO OF CALIBER
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                Every FLEX piece is governed by uncompromising athletic parameters. We reject thin, fast-fashion gym apparel that falls apart under chalk and heavy barbell knurling.
              </p>
            </div>

            {/* Architectural Spec Cards */}
            <div className="space-y-3 border-t border-white/10 pt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display font-bold text-sm uppercase text-white tracking-wide">
                    240 – 420 GSM HEAVYWEIGHT KNITS
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400">STRUCTURE</span>
                </div>
                <p className="text-xs text-neutral-400 leading-snug">
                  Unbrushed loopback French terry and combed heavyweight acid-washed cotton that holds an architectural drape on your frame.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display font-bold text-sm uppercase text-white tracking-wide">
                    ZONED 4-WAY OMNI-COMPRESSION
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400">MOBILITY</span>
                </div>
                <p className="text-xs text-neutral-400 leading-snug">
                  High-elastane warp knitting that stabilizes major muscle groups, enhances oxygen delivery, and ensures zero chafing during max lifts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display font-bold text-sm uppercase text-white tracking-wide">
                    RAW EDGE & REINFORCED SEAMS
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400">DURABILITY</span>
                </div>
                <p className="text-xs text-neutral-400 leading-snug">
                  Deep armhole drop geometry engineered to eliminate lat friction on pull days, coupled with quadruple flatlock stitching.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className="bg-white text-black hover:bg-neutral-200 px-6 py-3.5 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-xl"
              >
                <span>SHOP THE COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="border border-white/20 text-white hover:bg-white/10 px-6 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all"
              >
                <span>BRAND PHILOSOPHY</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
