import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { user, logout, orders, formatPrice, wishlist } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');

  if (!user) {
    setLocation('/login');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Account Profile Header */}
      <div className="bg-brand-surface rounded-3xl p-6 sm:p-10 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center space-x-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-beige to-white text-black font-display font-black text-2xl flex items-center justify-center shadow-xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-display font-black text-2xl uppercase text-white tracking-tight">
                {user.name}
              </h1>
              <span className="text-[10px] bg-brand-beige/20 text-brand-beige border border-brand-beige/30 font-bold px-2.5 py-0.5 rounded-full uppercase">
                Tier 1 Athlete
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5 font-mono">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Link
            href="/wishlist"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center space-x-2 transition-colors"
          >
            <Heart className="w-4 h-4 text-brand-beige" />
            <span>Saved ({wishlist.length})</span>
          </Link>

          <button
            onClick={() => {
              logout();
              setLocation('/login');
            }}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-neutral-400 hover:text-rose-400 hover:border-rose-400/40 text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 space-x-6 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 border-b-2 flex items-center space-x-2 transition-colors ${
            activeTab === 'orders' ? 'border-brand-beige text-white' : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-4 border-b-2 flex items-center space-x-2 transition-colors ${
            activeTab === 'addresses' ? 'border-brand-beige text-white' : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Addresses</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-4 border-b-2 flex items-center space-x-2 transition-colors ${
            activeTab === 'profile' ? 'border-brand-beige text-white' : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Athlete Preferences</span>
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-brand-surface/40 p-12 rounded-3xl border border-white/10 text-center space-y-4">
              <Package className="w-10 h-10 text-neutral-500 mx-auto" />
              <h3 className="font-display font-black text-xl text-white">NO ORDERS YET</h3>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                You haven't placed an order yet. Check out our latest drops and heavyweight drops.
              </p>
              <Link href="/shop" className="inline-block bg-white text-black px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider">
                Start Shopping
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div 
                key={order.id}
                className="bg-brand-surface rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-display font-black text-lg text-white">{order.id}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        order.status === 'Confirmed' || order.status === 'Shipped'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/10 text-white'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-mono">Placed on {order.date}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 uppercase block">Total</span>
                      <span className="font-display font-black text-lg text-brand-beige">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-neutral-400">
                      <Truck className="w-5 h-5 text-brand-beige" />
                    </div>
                  </div>
                </div>

                {/* Tracking Progress */}
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-400">Air Express AWB:</span>
                    <span className="font-mono text-brand-beige font-bold">{order.trackingNumber}</span>
                  </div>
                  <span className="text-neutral-400">
                    Carrier: <strong>BlueDart Express Air</strong> (On Schedule)
                  </span>
                </div>

                {/* Item List */}
                <div className="divide-y divide-white/5">
                  {order.items.map((item, i) => (
                    <div key={i} className="py-3 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-14 object-cover rounded bg-brand-card flex-shrink-0 border border-white/5"
                        />
                        <div>
                          <p className="font-display font-bold text-white">{item.product.name}</p>
                          <p className="text-neutral-400 text-[11px]">Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-mono text-white font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping address info */}
                <div className="text-[11px] text-neutral-400 pt-2 border-t border-white/5 flex justify-between">
                  <span>Shipping to: {order.shippingAddress.fullName}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</span>
                  <span>Payment: {order.paymentMethod}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-brand-surface p-6 rounded-3xl border border-brand-beige/40 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-beige bg-brand-beige/10 px-2.5 py-1 rounded">
                DEFAULT SHIPPING
              </span>
              <span className="text-xs text-neutral-400">Primary</span>
            </div>
            <div className="space-y-1 text-xs text-neutral-300">
              <p className="font-bold text-white text-sm">{user.name}</p>
              <p>402 High-Street Heights, Bandra West</p>
              <p>Opposite Athletic Park</p>
              <p>Mumbai, Maharashtra - 400050</p>
              <p>India • +91 98765 43210</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="max-w-xl bg-brand-surface p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          <h3 className="font-display font-black text-lg uppercase text-white">Athlete Details</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-neutral-400 block mb-1">Name</label>
              <input type="text" readOnly value={user.name} className="w-full bg-white/5 p-3 rounded-lg text-white border border-white/10" />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Email</label>
              <input type="email" readOnly value={user.email} className="w-full bg-white/5 p-3 rounded-lg text-white border border-white/10" />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Primary Discipline</label>
              <input type="text" readOnly value="Hypertrophy & Street Conditioning" className="w-full bg-white/5 p-3 rounded-lg text-white border border-white/10" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
