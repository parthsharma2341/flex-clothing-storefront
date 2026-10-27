import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { 
  ShieldCheck, 
  Lock, 
  Package, 
  TrendingUp, 
  Users, 
  Tag, 
  ShoppingBag, 
  AlertTriangle, 
  CheckCircle2, 
  Edit3, 
  Plus, 
  RefreshCw, 
  LogOut, 
  Eye, 
  ChevronRight,
  Sliders,
  DollarSign,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Product, Order } from '../types';

export const AdminPage: React.FC = () => {
  const { orders, formatPrice, showToast } = useStore();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('flex_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'coupons' | 'customers'>('overview');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [localInventory, setLocalInventory] = useState<Product[]>(PRODUCTS);

  // Demo Admin Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (adminEmail.trim().toLowerCase() === 'admin@flex-fit.shop' || adminEmail.trim().toLowerCase() === 'admin') &&
      adminPassword.trim() === 'flex-admin-2026'
    ) {
      setIsAuthenticated(true);
      sessionStorage.setItem('flex_admin_auth', 'true');
      showToast('Admin authorization verified. Welcome to FLEX Command.', 'success');
    } else {
      showToast('Invalid credentials. Check demo credentials.', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('flex_admin_auth');
    showToast('Admin session terminated.', 'info');
  };

  // Metrics calculation
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const totalUnitsInStock = useMemo(() => {
    return localInventory.reduce((sum, p) => sum + (p.stockRemaining || 0), 0);
  }, [localInventory]);

  const lowStockCount = useMemo(() => {
    return localInventory.filter((p) => (p.stockRemaining || 0) < 10).length;
  }, [localInventory]);

  const filteredOrders = useMemo(() => {
    if (orderFilter === 'all') return orders;
    return orders.filter((o) => o.status.toLowerCase() === orderFilter.toLowerCase());
  }, [orders, orderFilter]);

  // Adjust stock in inventory
  const handleRestock = (productId: string, amount: number) => {
    setLocalInventory((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updated = (p.stockRemaining || 0) + amount;
          return { ...p, stockRemaining: updated, inStock: updated > 0 };
        }
        return p;
      })
    );
    showToast(`Stock updated for ${productId} (+${amount} units)`, 'success');
  };

  // 1. UNAUTHENTICATED LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-brand-surface border border-white/15 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-white text-black font-display font-black text-2xl flex items-center justify-center mx-auto mb-2 shadow-xl">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              RESTRICTED ATHLETIC CONSOLE
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              FLEX COMMAND DESK
            </h1>
            <p className="text-xs text-neutral-400 font-sans">
              Enter administrator credentials to manage inventory, fulfill athlete orders, and configure releases.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1">
                Admin Email
              </label>
              <input
                type="text"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@flex-fit.shop"
                className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 block mb-1">
                Security Passcode
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black hover:bg-neutral-200 py-3.5 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-colors shadow-lg mt-2"
            >
              AUTHENTICATE CONSOLE &rarr;
            </button>
          </form>

          {/* Quick Demo Credentials Info Box */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-[11px] font-mono text-neutral-400 space-y-1">
            <p className="text-white font-bold uppercase tracking-wider text-[10px]">DEMO AUTHENTICATION KEYS:</p>
            <p>Email: <span className="text-neutral-200">admin@flex-fit.shop</span></p>
            <p>Passcode: <span className="text-neutral-200">flex-admin-2026</span></p>
            <button
              onClick={() => {
                setAdminEmail('admin@flex-fit.shop');
                setAdminPassword('flex-admin-2026');
              }}
              className="text-[10px] text-white hover:underline uppercase font-bold pt-1 block"
            >
              Autofill Credentials
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED ADMIN CONSOLE
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Bar */}
      <div className="bg-brand-surface border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <span className="font-display font-black text-2xl uppercase tracking-tight text-white">
              FLEX ATELIER COMMAND
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold">
              SYSTEM LIVE
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-mono">
            OPERATOR: admin@flex-fit.shop &bull; SESSION ID: SEC-FLX-{orders.length + 94}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/shop"
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-wider text-white flex items-center space-x-2 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-neutral-400 hover:text-rose-400 hover:border-rose-400/40 text-xs font-mono uppercase tracking-wider flex items-center space-x-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 font-mono text-xs">
            <span>GROSS SALES</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-display font-black text-2xl sm:text-3xl text-white">
            {formatPrice(totalRevenue)}
          </p>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> +18.4% vs last cycle
          </span>
        </div>

        <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 font-mono text-xs">
            <span>TOTAL ORDERS</span>
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <p className="font-display font-black text-2xl sm:text-3xl text-white">
            {orders.length}
          </p>
          <span className="text-[10px] font-mono text-neutral-400">
            100% fulfilled without dispute
          </span>
        </div>

        <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 font-mono text-xs">
            <span>INVENTORY UNITS</span>
            <Package className="w-4 h-4 text-white" />
          </div>
          <p className="font-display font-black text-2xl sm:text-3xl text-white">
            {totalUnitsInStock}
          </p>
          <span className="text-[10px] font-mono text-neutral-400">
            Across 8 core styles
          </span>
        </div>

        <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 space-y-2">
          <div className="flex items-center justify-between text-neutral-400 font-mono text-xs">
            <span>LOW STOCK ALERTS</span>
            <AlertTriangle className={`w-4 h-4 ${lowStockCount > 0 ? 'text-amber-400' : 'text-neutral-500'}`} />
          </div>
          <p className="font-display font-black text-2xl sm:text-3xl text-white">
            {lowStockCount}
          </p>
          <span className="text-[10px] font-mono text-amber-400">
            {lowStockCount} styles require reorder
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-white/10 pb-4 overflow-x-auto text-xs font-mono uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition-colors border ${
            activeTab === 'overview'
              ? 'bg-white text-black font-bold border-white'
              : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
          }`}
        >
          Orders Queue ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl transition-colors border ${
            activeTab === 'inventory'
              ? 'bg-white text-black font-bold border-white'
              : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
          }`}
        >
          Catalog & Inventory (8)
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2 rounded-xl transition-colors border ${
            activeTab === 'coupons'
              ? 'bg-white text-black font-bold border-white'
              : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
          }`}
        >
          Coupons & Discounts
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          className={`px-4 py-2 rounded-xl transition-colors border ${
            activeTab === 'customers'
              ? 'bg-white text-black font-bold border-white'
              : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
          }`}
        >
          Athlete Directory
        </button>
      </div>

      {/* TAB 1: ORDERS OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-black text-xl uppercase text-white tracking-wide">
              DISPATCH & FULFILLMENT QUEUE
            </h2>

            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-neutral-500">FILTER:</span>
              {['all', 'confirmed', 'shipped'].map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderFilter(status)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] uppercase transition-colors ${
                    orderFilter === status
                      ? 'bg-white text-black font-bold border-white'
                      : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-brand-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/5 border-b border-white/10 text-neutral-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Athlete / Recipient</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Tracking AWB</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-white">{o.id}</td>
                      <td className="py-3.5 px-4 text-neutral-400">{o.date}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-white block font-sans font-semibold">{o.shippingAddress.fullName}</span>
                        <span className="text-[10px] text-neutral-500">{o.shippingAddress.city}, {o.shippingAddress.pincode}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        {o.items.map((it, idx) => (
                          <div key={idx} className="truncate max-w-[180px] text-[11px]">
                            {it.product.name} ({it.size}) × {it.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">{formatPrice(o.total)}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.status === 'Confirmed' 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-400 text-[11px]">
                        <Link href="/track-order" className="hover:text-white underline">
                          {o.trackingNumber}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-black text-xl uppercase text-white tracking-wide">
              CATALOG STOCK & ALLOCATION
            </h2>
            <span className="text-xs font-mono text-neutral-400">
              Total 8 styles &bull; Instant batch restock enabled
            </span>
          </div>

          <div className="bg-brand-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/5 border-b border-white/10 text-neutral-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Style / Garment</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Fit Profile</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">In Stock Units</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Restock Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  {localInventory.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-lg bg-black border border-white/10"
                          />
                          <div>
                            <span className="text-white font-bold block font-sans">{p.name}</span>
                            <span className="text-[10px] text-neutral-500">ID: {p.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 uppercase text-neutral-400">{p.category}</td>
                      <td className="py-3.5 px-4">{p.fit}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{formatPrice(p.price)}</td>
                      <td className="py-3.5 px-4">
                        <span className={`font-bold ${
                          (p.stockRemaining || 0) < 10 ? 'text-amber-400' : 'text-white'
                        }`}>
                          {p.stockRemaining} units
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                          ACTIVE
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleRestock(p.id, 15)}
                          className="px-2.5 py-1 bg-white/10 hover:bg-white hover:text-black rounded text-[11px] font-bold transition-colors"
                        >
                          +15 Restock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COUPONS & DISCOUNTS */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <h2 className="font-display font-black text-xl uppercase text-white tracking-wide">
            PROMOTIONAL COUPONS & REDEMPTION RULES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-xl text-white">FLEX10</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                10% Off Sitewide on any checkout cart total.
              </p>
              <div className="pt-2 border-t border-white/10 flex justify-between text-[11px] font-mono text-neutral-400">
                <span>Usage: Public</span>
                <span>Type: Percentage</span>
              </div>
            </div>

            <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-xl text-white">TRAIN20</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  ACTIVE
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                20% Off Athlete Early Access VIP coupon.
              </p>
              <div className="pt-2 border-t border-white/10 flex justify-between text-[11px] font-mono text-neutral-400">
                <span>Usage: VIP Subscribers</span>
                <span>Type: Percentage</span>
              </div>
            </div>

            <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-xl text-white">ATHLETE500</span>
                <span className="bg-white/10 text-neutral-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  RESERVED
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Flat ₹500 discount on orders exceeding ₹2,999.
              </p>
              <div className="pt-2 border-t border-white/10 flex justify-between text-[11px] font-mono text-neutral-400">
                <span>Usage: Special Drop</span>
                <span>Type: Fixed Amount</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ATHLETE DIRECTORY */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          <h2 className="font-display font-black text-xl uppercase text-white tracking-wide">
            REGISTERED ATHLETES & ORDER CLIENTELE
          </h2>

          <div className="bg-brand-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-white/5 border-b border-white/10 text-neutral-400 uppercase text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Total Orders</th>
                    <th className="py-3 px-4">Tier Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-bold text-white font-sans">Parth Sharma</td>
                    <td className="py-3.5 px-4 text-neutral-400">parth@example.com</td>
                    <td className="py-3.5 px-4">Mumbai, Maharashtra (400050)</td>
                    <td className="py-3.5 px-4 font-bold text-white">{orders.length} orders</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-brand-beige/20 text-brand-beige border border-brand-beige/30 px-2 py-0.5 rounded text-[10px] font-bold">
                        TIER 1 ATHLETE
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
