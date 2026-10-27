import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-28 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-brand-beige">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-beige font-mono">
          ERROR 404 • ROUTE UNCHARTED
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
          LOOKS LIKE THIS SPACE NEEDS A LITTLE REARRANGING.
        </h1>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          The page or garment drop you are looking for has been relocated or retired from the active roster.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Link
          href="/"
          className="bg-white text-black hover:bg-brand-beige px-8 py-3.5 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-colors shadow-2xl"
        >
          BACK TO HOME
        </Link>
        <Link
          href="/shop"
          className="border border-white/20 text-white hover:border-white px-8 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-colors"
        >
          EXPLORE SHOP
        </Link>
      </div>
    </div>
  );
};
