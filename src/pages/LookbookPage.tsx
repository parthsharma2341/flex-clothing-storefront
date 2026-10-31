import React, { useRef, useState } from 'react';
import { Link } from 'wouter';
import { Play, Pause, Volume2, VolumeX, ArrowRight, Sparkles, Film, Eye } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const LookbookPage: React.FC = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const [isPlaying1, setIsPlaying1] = useState(true);
  const [isPlaying2, setIsPlaying2] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const storyboardScenes = [
    { num: '01', title: 'THE HOOK', time: '0:00 – 0:03', vo: '"Gym ke liye bana hai... but sirf gym ke liye nahi."', visual: 'Extreme close-up, chest graphic revealed with slow push-in.' },
    { num: '02', title: 'FULL FIT REVEAL', time: '0:03 – 0:06', vo: '"Ye hai FLEX Oversized Muscle Tee."', visual: 'Full-body shot, walking towards camera. Low-angle tracking.' },
    { num: '03', title: 'OVERSIZED MUSCLE FIT', time: '0:06 – 0:09', vo: '"Relaxed fit... but shoulders aur arms ko proper shape deta hai."', visual: 'Front, side, and back movement with quick cuts.' },
    { num: '04', title: 'FABRIC / WASHED BLACK', time: '0:09 – 0:12', vo: '"Washed black finish... soft, lightweight aur breathable feel."', visual: '85mm macro shot of fabric texture, folds and light.' },
    { num: '05', title: 'RAW EDGE SLEEVES', time: '0:12 – 0:14', vo: '"Aur ye raw-edge sleeves? Pure streetwear vibe."', visual: 'Sleeve close-up with arm flex and quick whip-pan.' },
    { num: '06', title: 'DETAIL SHOTS', time: '0:14 – 0:17', vo: '"Details clean hain. Print bold hai. Quality feel hoti hai."', visual: 'Ribbed neckline, FLEX neck tag, high-density chest print.' },
    { num: '07', title: 'THE PRINT', time: '0:17 – 0:19', vo: '"Because basic tee nahi... statement piece chahiye."', visual: 'Macro print shot with model walking into shadows.' },
    { num: '08', title: 'GYM → STREET TRANSITION', time: '0:19 – 0:22', vo: '"Workout khatam? Outfit bhi khatam nahi."', visual: 'Gym interior into urban street transition.' },
    { num: '09', title: 'FINAL HERO SHOT', time: '0:22 – 0:25', vo: '"FLEX. Wear the mindset."', visual: 'Close-up hero framing, slow push-in, cut to black.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <SEO
        title="Editorial Lookbook & Campaign Storyboard"
        description="FLEX Drop 01 campaign storyboard: Raw-edge oversized muscle tees and high-performance athletic streetwear cinema."
        canonical="/lookbook"
      />
      
      {/* Header */}
      <div className="border-b border-white/10 pb-8 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-brand-beige/10 border border-brand-beige/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-beige">
          <Film className="w-3.5 h-3.5" />
          <span>EDITORIAL DIRECTION & CINEMA</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl uppercase text-white tracking-tight">
          CAMPAIGN REEL & STORYBOARD
        </h1>
        <p className="text-sm text-neutral-400">
          Dark, premium, and raw. Explore the creative vision and storyboard breakdown behind the FLEX Oversized Muscle Tee campaign.
        </p>
      </div>

      {/* Dual Video Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* Video 1: 3D / Campaign Look */}
        <div className="bg-brand-surface rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between shadow-2xl relative">
          <div className="relative aspect-[9/12] sm:aspect-[16/10] overflow-hidden bg-black">
            <video
              ref={video1Ref}
              src="/assets/video/gemini_generated_video_90ca3e3c.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-beige border border-white/10">
              REEL 01 • MOTION DROP
            </div>
          </div>
          <div className="p-6 space-y-3">
            <h3 className="font-display font-black text-xl text-white uppercase">
              KINETIC MOTION TEASER
            </h3>
            <p className="text-xs text-neutral-400">
              A dynamic visual exploration of fabric fluid mechanics, athletic compression contouring, and architectural silhouette.
            </p>
            <div className="pt-2">
              <Link
                href="/products/flex-pro-seamless-compression-tee-onyx"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-beige hover:underline"
              >
                <span>View Featured Compression Top</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Video 2: Muscle Tee Gym x Streetwear Reel */}
        <div className="bg-brand-surface rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between shadow-2xl relative">
          <div className="relative aspect-[9/12] sm:aspect-[16/10] overflow-hidden bg-black">
            <video
              ref={video2Ref}
              src="/assets/video/WhatsApp Video 2026-10-21 at 9.16.08 PM.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-beige border border-white/10">
              REEL 02 • STORYBOARD RUN
            </div>
          </div>
          <div className="p-6 space-y-3">
            <h3 className="font-display font-black text-xl text-white uppercase">
              OVERSIZED MUSCLE TEE REEL
            </h3>
            <p className="text-xs text-neutral-400">
              Shot on location in high-contrast athletic warehouse spaces. Demonstrating the seamless transition from workout to city street.
            </p>
            <div className="pt-2">
              <Link
                href="/products/flex-oversized-muscle-tee-washed-black"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-beige hover:underline"
              >
                <span>Shop Washed Black Muscle Tee (₹1,199)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Storyboard 9-Panel Breakdown */}
      <div className="space-y-8 border-t border-white/10 pt-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
            SCENE-BY-SCENE DIRECTORS CUT
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white tracking-tight">
            THE 9-PANEL STORYBOARD
          </h2>
          <p className="text-xs text-neutral-400">
            Duration: 20–25 Sec • Format: 9:16 Reels • Mood: Gym x Streetwear Dark / Premium / Real
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {storyboardScenes.map((scene) => (
            <div 
              key={scene.num}
              className="bg-brand-surface p-6 rounded-2xl border border-white/10 space-y-3 hover:border-brand-beige/50 transition-colors"
            >
              <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                <span className="font-mono text-brand-beige font-black">PANEL {scene.num}</span>
                <span className="text-neutral-500 font-mono text-[10px]">{scene.time}</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white tracking-wide uppercase">
                {scene.title}
              </h4>
              <p className="text-xs italic text-neutral-300 bg-white/5 p-2.5 rounded-lg border border-white/5">
                {scene.vo}
              </p>
              <p className="text-[11px] text-neutral-400 leading-snug">
                <strong>Visual:</strong> {scene.visual}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
