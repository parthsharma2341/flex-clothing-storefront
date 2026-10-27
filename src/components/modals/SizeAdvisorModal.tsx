import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SizeAdvisorModal: React.FC = () => {
  const { isSizeAdvisorOpen, setIsSizeAdvisorOpen } = useStore();

  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [height, setHeight] = useState<number>(178);
  const [weight, setWeight] = useState<number>(78);
  const [fitPreference, setFitPreference] = useState<'snug' | 'athletic' | 'oversized'>('oversized');
  const [activeTab, setActiveTab] = useState<'calculator' | 'table'>('calculator');

  if (!isSizeAdvisorOpen) return null;

  // Fit Calculation Logic
  const calculateRecommendation = () => {
    let size = 'M';
    if (weight < 65) size = 'S';
    else if (weight <= 75) size = 'M';
    else if (weight <= 86) size = 'L';
    else if (weight <= 98) size = 'XL';
    else size = 'XXL';

    if (fitPreference === 'oversized' && size !== 'XXL') {
      if (weight >= 72 && size === 'M') size = 'L';
      if (weight >= 83 && size === 'L') size = 'XL';
    } else if (fitPreference === 'snug') {
      if (weight <= 78 && size === 'M') size = 'S';
      if (weight <= 88 && size === 'L') size = 'M';
    }

    return size;
  };

  const recommendedSize = calculateRecommendation();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsSizeAdvisorOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div className="relative transform overflow-hidden rounded-2xl bg-brand-surface border border-white/15 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl p-6 sm:p-8 animate-fadeIn">
          
          {/* Close button */}
          <button
            onClick={() => setIsSizeAdvisorOpen(false)}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close fit advisor"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-2 text-brand-beige mb-1">
            <Ruler className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">PRECISION FIT ADVISOR</span>
          </div>
          <h2 className="font-display font-black text-2xl uppercase text-white tracking-tight">
            FIND YOUR PERFECT FLEX FIT
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Engineered tailored sizing based on actual garment patterns and athlete body proportions.
          </p>

          {/* Tabs */}
          <div className="flex border-b border-white/10 mt-6 mb-6">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'calculator'
                  ? 'border-brand-beige text-white'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Interactive Fit Calculator
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'table'
                  ? 'border-brand-beige text-white'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Measurement Chart
            </button>
          </div>

          {activeTab === 'calculator' ? (
            <div className="space-y-6">
              {/* Unit Toggle */}
              <div className="flex justify-end">
                <div className="bg-white/5 p-1 rounded-lg border border-white/10 text-xs flex space-x-1">
                  <button
                    onClick={() => setUnit('cm')}
                    className={`px-3 py-1 rounded font-bold transition-colors ${
                      unit === 'cm' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Metric (cm/kg)
                  </button>
                  <button
                    onClick={() => setUnit('in')}
                    className={`px-3 py-1 rounded font-bold transition-colors ${
                      unit === 'in' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Imperial (in/lbs)
                  </button>
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Height */}
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-neutral-300">YOUR HEIGHT</span>
                    <span className="text-white font-mono text-sm">
                      {unit === 'cm' ? `${height} cm` : `${Math.round(height / 2.54)} in`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="210"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full accent-brand-beige cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500">
                    <span>150 cm</span>
                    <span>180 cm</span>
                    <span>210 cm</span>
                  </div>
                </div>

                {/* Weight */}
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-neutral-300">BODY WEIGHT</span>
                    <span className="text-white font-mono text-sm">
                      {unit === 'cm' ? `${weight} kg` : `${Math.round(weight * 2.204)} lbs`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="125"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full accent-brand-beige cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500">
                    <span>50 kg</span>
                    <span>85 kg</span>
                    <span>125 kg</span>
                  </div>
                </div>
              </div>

              {/* Fit Preference */}
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-300 block mb-2">
                  Preferred Fit Style
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setFitPreference('snug')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      fitPreference === 'snug'
                        ? 'border-brand-beige bg-brand-beige/10 text-white font-bold'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/30'
                    }`}
                  >
                    <p className="text-xs font-bold uppercase">Snug / Compression</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">Tight to body</p>
                  </button>

                  <button
                    onClick={() => setFitPreference('athletic')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      fitPreference === 'athletic'
                        ? 'border-brand-beige bg-brand-beige/10 text-white font-bold'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/30'
                    }`}
                  >
                    <p className="text-xs font-bold uppercase">Athletic Standard</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">Tapered & sharp</p>
                  </button>

                  <button
                    onClick={() => setFitPreference('oversized')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      fitPreference === 'oversized'
                        ? 'border-brand-beige bg-brand-beige/10 text-white font-bold'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/30'
                    }`}
                  >
                    <p className="text-xs font-bold uppercase">Oversized Street</p>
                    <p className="text-[10px] text-neutral-400 mt-0.5">Relaxed & boxy</p>
                  </button>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="bg-gradient-to-r from-brand-surface via-brand-dark to-black p-5 rounded-xl border border-brand-beige/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-beige block">
                    RECOMMENDED SIZE
                  </span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="font-display font-black text-3xl text-white">
                      SIZE {recommendedSize}
                    </span>
                    <span className="text-xs text-neutral-400 font-sans">
                      (97% Athlete Confidence Match)
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-1">
                    Ideal for your {height}cm frame and {weight}kg body structure with an {fitPreference} drape.
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full bg-brand-beige text-black flex items-center justify-center font-display font-black text-xl">
                  {recommendedSize}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/20 text-neutral-400 uppercase tracking-wider font-semibold">
                      <th className="py-2.5 px-3">Size</th>
                      <th className="py-2.5 px-3">Chest (in)</th>
                      <th className="py-2.5 px-3">Length (in)</th>
                      <th className="py-2.5 px-3">Waist (in)</th>
                      <th className="py-2.5 px-3">Inseam (in)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 font-mono text-neutral-300">
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-3 font-bold text-white">S</td>
                      <td className="py-3 px-3">38 - 40"</td>
                      <td className="py-3 px-3">28.5"</td>
                      <td className="py-3 px-3">28 - 30"</td>
                      <td className="py-3 px-3">29.0"</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-3 font-bold text-white">M</td>
                      <td className="py-3 px-3">41 - 43"</td>
                      <td className="py-3 px-3">29.5"</td>
                      <td className="py-3 px-3">31 - 33"</td>
                      <td className="py-3 px-3">29.5"</td>
                    </tr>
                    <tr className="hover:bg-white/5 bg-brand-beige/5 border-l-2 border-brand-beige">
                      <td className="py-3 px-3 font-bold text-brand-beige">L</td>
                      <td className="py-3 px-3">44 - 46"</td>
                      <td className="py-3 px-3">30.5"</td>
                      <td className="py-3 px-3">34 - 36"</td>
                      <td className="py-3 px-3">30.0"</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-3 font-bold text-white">XL</td>
                      <td className="py-3 px-3">47 - 49"</td>
                      <td className="py-3 px-3">31.5"</td>
                      <td className="py-3 px-3">37 - 39"</td>
                      <td className="py-3 px-3">30.5"</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="py-3 px-3 font-bold text-white">XXL</td>
                      <td className="py-3 px-3">50 - 52"</td>
                      <td className="py-3 px-3">32.5"</td>
                      <td className="py-3 px-3">40 - 42"</td>
                      <td className="py-3 px-3">31.0"</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-400 flex items-start space-x-3">
                <Info className="w-5 h-5 text-brand-beige flex-shrink-0 mt-0.5" />
                <p>
                  <strong>How to measure:</strong> Measure around the fullest part of your chest, keeping the tape level under your arms. For joggers, measure around your natural waistline where your waistband rests.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={() => setIsSizeAdvisorOpen(false)}
              className="bg-white text-black hover:bg-brand-beige px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
