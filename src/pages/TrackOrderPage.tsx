import React, { useState } from 'react';
import { Link } from 'wouter';
import { 
  Package, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TrackOrderPage: React.FC = () => {
  const { orders, formatPrice } = useStore();
  const [orderQuery, setOrderQuery] = useState('FLX-91823');
  const [searched, setSearched] = useState(true);

  // Search in orders list or synthesize realistic tracking
  const foundOrder = orders.find(
    (o) => o.id.toLowerCase() === orderQuery.trim().toLowerCase() || 
           o.trackingNumber.toLowerCase() === orderQuery.trim().toLowerCase()
  ) || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const milestones = [
    { label: 'Order Confirmed', time: '18 Oct, 10:45 AM', completed: true, desc: 'Verified and queued in athletic fulfillment system' },
    { label: 'Atelier Packaging', time: '18 Oct, 03:20 PM', completed: true, desc: 'Inspected for seam durability and packed in matte black mailer' },
    { label: 'Dispatched with Courier', time: '19 Oct, 09:15 AM', completed: true, desc: 'Handed over to Express Air Logistics (AWB: DTDC-9928174)' },
    { label: 'Out for Delivery', time: 'Expected 28 Oct', completed: false, current: true, desc: 'Arrived at regional delivery hub; courier assigned' },
    { label: 'Delivered', time: 'Estimated 28 Oct by 6 PM', completed: false, desc: 'Recipient signature requested' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-neutral-400">
          <Truck className="w-3.5 h-3.5 text-white" />
          <span>REAL-TIME LOGISTICS TRACKING</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          TRACK YOUR SHIPMENT
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-sans">
          Enter your FLEX Order ID (e.g. FLX-91823) or Courier Tracking Reference to verify real-time transit status.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <Package className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="Enter Order ID (e.g., FLX-91823)"
            className="w-full bg-brand-surface border border-white/15 pl-11 pr-4 py-3.5 rounded-xl text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <button
          type="submit"
          className="bg-white text-black hover:bg-neutral-200 px-6 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-colors flex items-center space-x-2 shrink-0 shadow-lg"
        >
          <Search className="w-4 h-4" />
          <span>TRACK</span>
        </button>
      </form>

      {/* Tracking Results Card */}
      {searched && foundOrder && (
        <div className="bg-brand-surface border border-white/10 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
          
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center space-x-3">
                <span className="font-display font-black text-2xl uppercase text-white">
                  ORDER {foundOrder.id}
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold">
                  IN TRANSIT
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 mt-1">
                AWB TRACKING: <strong className="text-white">{foundOrder.trackingNumber}</strong> &bull; CARRIER: EXPRESS AIR
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono uppercase text-neutral-500 block">ESTIMATED ARRIVAL</span>
              <span className="font-display font-black text-lg text-white">TOMORROW BY 6:00 PM</span>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-neutral-400">
              MILESTONE VERIFICATION
            </h3>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/15">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative">
                  {/* Indicator Dot */}
                  <div className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full flex items-center justify-center ${
                    m.completed 
                      ? 'bg-white text-black' 
                      : m.current 
                        ? 'bg-emerald-400 text-black ring-4 ring-emerald-400/20 animate-pulse' 
                        : 'bg-white/10 border border-white/20 text-neutral-500'
                  }`}>
                    {m.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className={`text-sm font-bold uppercase tracking-wide ${m.completed || m.current ? 'text-white' : 'text-neutral-500'}`}>
                      {m.label}
                    </h4>
                    <span className="text-[11px] font-mono text-neutral-400">{m.time}</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipment Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10 text-xs">
            
            {/* Destination */}
            <div className="space-y-2 bg-black/40 p-5 rounded-2xl border border-white/5">
              <div className="flex items-center space-x-2 text-neutral-400 font-mono text-[11px] uppercase">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>DELIVERY DESTINATION</span>
              </div>
              <p className="font-bold text-white">{foundOrder.shippingAddress.fullName}</p>
              <p className="text-neutral-400">
                {foundOrder.shippingAddress.addressLine1}, {foundOrder.shippingAddress.city} - {foundOrder.shippingAddress.pincode}
              </p>
              <p className="text-neutral-500 font-mono">{foundOrder.shippingAddress.phone}</p>
            </div>

            {/* Items in Consignment */}
            <div className="space-y-3 bg-black/40 p-5 rounded-2xl border border-white/5">
              <div className="flex items-center space-x-2 text-neutral-400 font-mono text-[11px] uppercase">
                <Package className="w-3.5 h-3.5 text-white" />
                <span>PARCEL CONTENTS ({foundOrder.items.length} ITEMS)</span>
              </div>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-2">
                {foundOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-1.5">
                    <div>
                      <p className="font-semibold text-white truncate max-w-[200px]">{it.product.name}</p>
                      <p className="text-[10px] text-neutral-400 font-mono">Size: {it.size} &bull; {it.color} &bull; Qty: {it.quantity}</p>
                    </div>
                    <span className="font-mono text-neutral-300">{formatPrice(it.product.price * it.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-neutral-400">
            <span>Need assistance with this shipment?</span>
            <Link href="/contact" className="text-white hover:underline font-mono uppercase tracking-wider font-bold">
              Contact Logistics Concierge &rarr;
            </Link>
          </div>

        </div>
      )}

    </div>
  );
};
