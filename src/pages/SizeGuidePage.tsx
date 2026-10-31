import React, { useState } from 'react';
import { Ruler, Sparkles, Check, Info, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SEO } from '../components/common/SEO';

export const SizeGuidePage: React.FC = () => {
  const { setIsSizeAdvisorOpen } = useStore();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeCategory, setActiveCategory] = useState<'tops' | 'bottoms' | 'compression'>('tops');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEO
        title="Official Size Guide & Fit Specifications"
        description="FLEX exact body measurement charts for compression shirts, oversized muscle tees, and joggers. Find your perfect fit in inches and centimeters."
        canonical="/size-guide"
      />
      
      {/* Header */}
      <div className="border-b border-white/10 pb-8 text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
          FIT GUIDE & SPECIFICATIONS
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl uppercase text-white tracking-tight">
          FLEX SIZE GUIDE
        </h1>
        <p className="text-sm text-neutral-400">
          Our cuts are purposefully designed with athletic tailoring. Use these precise garment specs to pick the perfect silhouette.
        </p>

        <div className="pt-2">
          <button
            onClick={() => setIsSizeAdvisorOpen(true)}
            className="inline-flex items-center space-x-2 bg-brand-beige text-black hover:bg-white px-6 py-3 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-colors shadow-xl"
          >
            <Ruler className="w-4 h-4" />
            <span>LAUNCH INTERACTIVE FIT ADVISOR</span>
          </button>
        </div>
      </div>

      {/* Category Tabs & Unit Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-surface p-4 rounded-2xl border border-white/10">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveCategory('tops')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeCategory === 'tops' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Tops & Muscle Tees
          </button>
          <button
            onClick={() => setActiveCategory('bottoms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeCategory === 'bottoms' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Joggers & Sweats
          </button>
          <button
            onClick={() => setActiveCategory('compression')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeCategory === 'compression' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Compression Tops
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center space-x-1 bg-black/60 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setUnit('in')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors ${
              unit === 'in' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Inches (")
          </button>
          <button
            onClick={() => setUnit('cm')}
            className={`px-3 py-1 rounded-lg font-bold transition-colors ${
              unit === 'cm' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Centimeters (cm)
          </button>
        </div>
      </div>

      {/* Measurement Tables */}
      <div className="bg-brand-surface/50 rounded-2xl border border-white/10 p-6 sm:p-8 overflow-x-auto shadow-2xl">
        {activeCategory === 'tops' && (
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-white/20 text-neutral-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Chest Width</th>
                <th className="py-3 px-4">Body Length</th>
                <th className="py-3 px-4">Shoulder Width</th>
                <th className="py-3 px-4">Recommended Height</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-mono text-neutral-200">
              <tr className="hover:bg-white/5">
                <td className="py-4 px-4 font-bold text-white">S (Small)</td>
                <td className="py-4 px-4">{unit === 'in' ? '40.0"' : '101.6 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '28.5"' : '72.4 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '18.5"' : '47.0 cm'}</td>
                <td className="py-4 px-4 font-sans text-neutral-400">165 - 173 cm (5'5" - 5'8")</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-4 px-4 font-bold text-white">M (Medium)</td>
                <td className="py-4 px-4">{unit === 'in' ? '42.5"' : '108.0 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '29.5"' : '74.9 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '19.5"' : '49.5 cm'}</td>
                <td className="py-4 px-4 font-sans text-neutral-400">173 - 180 cm (5'8" - 5'11")</td>
              </tr>
              <tr className="hover:bg-white/5 bg-brand-beige/5 border-l-2 border-brand-beige">
                <td className="py-4 px-4 font-bold text-brand-beige">L (Large - Most Popular)</td>
                <td className="py-4 px-4">{unit === 'in' ? '45.0"' : '114.3 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '30.5"' : '77.5 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '20.5"' : '52.0 cm'}</td>
                <td className="py-4 px-4 font-sans text-neutral-400">178 - 186 cm (5'10" - 6'1")</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-4 px-4 font-bold text-white">XL (Extra Large)</td>
                <td className="py-4 px-4">{unit === 'in' ? '48.0"' : '121.9 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '31.5"' : '80.0 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '21.5"' : '54.6 cm'}</td>
                <td className="py-4 px-4 font-sans text-neutral-400">183 - 192 cm (6'0" - 6'3")</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-4 px-4 font-bold text-white">XXL (Double XL)</td>
                <td className="py-4 px-4">{unit === 'in' ? '51.0"' : '129.5 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '32.5"' : '82.5 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '22.5"' : '57.1 cm'}</td>
                <td className="py-4 px-4 font-sans text-neutral-400">188+ cm (6'2"+)</td>
              </tr>
            </tbody>
          </table>
        )}

        {activeCategory === 'bottoms' && (
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-white/20 text-neutral-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Waist (Elastic Extended)</th>
                <th className="py-3 px-4">Inseam Length</th>
                <th className="py-3 px-4">Thigh Width</th>
                <th className="py-3 px-4">Outseam Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-mono text-neutral-200">
              <tr className="hover:bg-white/5">
                <td className="py-4 px-4 font-bold text-white">S (28 - 30)</td>
                <td className="py-4 px-4">{unit === 'in' ? '28.0 - 30.5"' : '71.1 - 77.5 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '29.0"' : '73.6 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '24.0"' : '61.0 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '38.5"' : '97.8 cm'}</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-4 px-4 font-bold text-white">M (31 - 33)</td>
                <td className="py-4 px-4">{unit === 'in' ? '31.0 - 33.5"' : '78.7 - 85.1 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '29.5"' : '74.9 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '25.0"' : '63.5 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '39.5"' : '100.3 cm'}</td>
              </tr>
              <tr className="hover:bg-white/5 bg-brand-beige/5 border-l-2 border-brand-beige">
                <td className="py-4 px-4 font-bold text-brand-beige">L (34 - 36)</td>
                <td className="py-4 px-4">{unit === 'in' ? '34.0 - 36.5"' : '86.4 - 92.7 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '30.0"' : '76.2 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '26.0"' : '66.0 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '40.5"' : '102.9 cm'}</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-4 px-4 font-bold text-white">XL (37 - 39)</td>
                <td className="py-4 px-4">{unit === 'in' ? '37.0 - 39.5"' : '94.0 - 100.3 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '30.5"' : '77.5 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '27.0"' : '68.6 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '41.5"' : '105.4 cm'}</td>
              </tr>
            </tbody>
          </table>
        )}

        {activeCategory === 'compression' && (
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-white/20 text-neutral-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Chest (Taut Stretch)</th>
                <th className="py-3 px-4">Arm Bicep Grip</th>
                <th className="py-3 px-4">Torso Compression</th>
                <th className="py-3 px-4">Athlete Weight Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-mono text-neutral-200">
              <tr className="hover:bg-white/5">
                <td className="py-4 px-4 font-bold text-white">S</td>
                <td className="py-4 px-4">{unit === 'in' ? '36 - 38"' : '91 - 96 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '13 - 14.5"' : '33 - 37 cm'}</td>
                <td className="py-4 px-4 font-sans text-neutral-400">Firm / Posture Grip</td>
                <td className="py-4 px-4 font-sans text-neutral-400">58 - 68 kg</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-4 px-4 font-bold text-white">M</td>
                <td className="py-4 px-4">{unit === 'in' ? '39 - 41"' : '99 - 104 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '14.5 - 16"' : '37 - 41 cm'}</td>
                <td className="py-4 px-4 font-sans text-neutral-400">Firm / Core Support</td>
                <td className="py-4 px-4 font-sans text-neutral-400">69 - 80 kg</td>
              </tr>
              <tr className="hover:bg-white/5 bg-brand-beige/5 border-l-2 border-brand-beige">
                <td className="py-4 px-4 font-bold text-brand-beige">L</td>
                <td className="py-4 px-4">{unit === 'in' ? '42 - 44"' : '107 - 112 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '16 - 17.5"' : '41 - 44 cm'}</td>
                <td className="py-4 px-4 font-sans text-neutral-400">Firm / Scapular Support</td>
                <td className="py-4 px-4 font-sans text-neutral-400">81 - 92 kg</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="py-4 px-4 font-bold text-white">XL</td>
                <td className="py-4 px-4">{unit === 'in' ? '45 - 47"' : '114 - 119 cm'}</td>
                <td className="py-4 px-4">{unit === 'in' ? '17.5 - 19"' : '44 - 48 cm'}</td>
                <td className="py-4 px-4 font-sans text-neutral-400">Firm / Heavy Volume</td>
                <td className="py-4 px-4 font-sans text-neutral-400">93 - 105 kg</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Guide Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300">
        <div className="p-6 rounded-2xl bg-brand-surface border border-white/10 space-y-2">
          <h4 className="font-display font-bold uppercase text-white text-sm">Oversized Styling Tip</h4>
          <p className="text-neutral-400 leading-relaxed">
            Our Oversized Muscle Tees and Hoodies are already drafted with a boxy dropped shoulder. Select your true standard size for the intended streetwear drape.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-brand-surface border border-white/10 space-y-2">
          <h4 className="font-display font-bold uppercase text-white text-sm">Compression Sizing Tip</h4>
          <p className="text-neutral-400 leading-relaxed">
            Compression tees are meant to sit directly against your skin. If you are between sizes or prefer an easier pull-over on sweaty skin, size up one notch.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-brand-surface border border-white/10 space-y-2">
          <h4 className="font-display font-bold uppercase text-white text-sm">7-Day Free Size Swaps</h4>
          <p className="text-neutral-400 leading-relaxed">
            If your order arrives and the length or fit isn't 100% how you like it, initiate a hassle-free size exchange within 7 days of delivery.
          </p>
        </div>
      </div>

    </div>
  );
};
