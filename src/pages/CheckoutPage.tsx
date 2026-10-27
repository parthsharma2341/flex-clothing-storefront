import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Lock, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ShoppingBag, 
  Smartphone, 
  Building, 
  Banknote,
  Printer,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomerAddress, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const { 
    cart, 
    subtotal, 
    discount, 
    shipping, 
    total, 
    formatPrice, 
    appliedPromo, 
    placeOrder, 
    user,
    showToast 
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3 | 'success'>(1);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form State
  const [formData, setFormData] = useState<CustomerAddress>({
    fullName: user?.name || 'Parth Sharma',
    phone: user?.phone || '9876543210',
    email: user?.email || 'parth@example.com',
    addressLine1: '402 High-Street Heights, Bandra West',
    addressLine2: 'Opposite Athletic Park',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('parth@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty and not on success, redirect
  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display font-black text-2xl uppercase text-white">No items to checkout</h2>
        <p className="text-xs text-neutral-400">Your bag is currently empty.</p>
        <Link href="/shop" className="inline-block bg-white text-black px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      showToast('Please fill in all contact information', 'error');
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.addressLine1 || !formData.city || !formData.pincode) {
      showToast('Please provide a complete shipping address', 'error');
      return;
    }
    setStep(3);
  };

  const handleFinalOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = placeOrder(formData, paymentMethod);
      setCompletedOrder(order);
      setStep('success');
      setIsProcessing(false);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFFFFF', '#CBB89A', '#1C1C1E', '#E5E5E5']
      });

      showToast(`Order ${order.id} placed successfully!`, 'success');
    }, 1200);
  };

  // SUCCESS SCREEN
  if (step === 'success' && completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-8 animate-fadeIn">
        
        {/* Success Card */}
        <div className="bg-brand-surface border border-brand-beige/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-brand-beige text-black flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-beige">
              CONFIRMED & SCHEDULED FOR DISPATCH
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white tracking-tight">
              THANK YOU FOR YOUR ORDER
            </h1>
            <p className="text-sm text-neutral-300 max-w-md mx-auto">
              Your garments have entered our expedited athlete fulfillment queue. A confirmation dispatch SMS and email have been delivered.
            </p>
          </div>

          <div className="p-4 bg-black/60 rounded-2xl border border-white/10 max-w-sm mx-auto flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">ORDER ID:</span>
            <span className="text-brand-beige font-black text-sm">{completedOrder.id}</span>
          </div>

          {/* Order Details Breakdown */}
          <div className="text-left bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4 text-xs">
            <div className="flex justify-between border-b border-white/10 pb-3">
              <span className="text-neutral-400">Estimated Delivery:</span>
              <span className="text-white font-bold">2 - 3 Business Days (Express)</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-3">
              <span className="text-neutral-400">Tracking Reference:</span>
              <span className="text-brand-beige font-mono">{completedOrder.trackingNumber}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-3">
              <span className="text-neutral-400">Shipping To:</span>
              <span className="text-white text-right">
                {completedOrder.shippingAddress.fullName}, {completedOrder.shippingAddress.addressLine1}, {completedOrder.shippingAddress.city} - {completedOrder.shippingAddress.pincode}
              </span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold">
              <span className="text-white">Amount Paid ({completedOrder.paymentMethod}):</span>
              <span className="font-display text-base text-brand-beige">{formatPrice(completedOrder.total)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Order Receipt</span>
            </button>

            <Link
              href="/account"
              className="px-8 py-3 rounded-xl bg-white text-black hover:bg-brand-beige text-xs font-black uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors shadow-xl"
            >
              <span>TRACK IN ACCOUNT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
            SECURE CHECKOUT
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase text-white tracking-tight mt-0.5">
            FAST ORDER FULFILLMENT
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-xs text-neutral-400">
          <Lock className="w-4 h-4 text-brand-beige" />
          <span>256-Bit Encrypted</span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setStep(1)}
          className={`py-2.5 rounded-lg border transition-colors ${
            step === 1 ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-400 border-white/10'
          }`}
        >
          1. Contact
        </button>
        <button
          onClick={() => { if (formData.fullName && formData.email) setStep(2); }}
          className={`py-2.5 rounded-lg border transition-colors ${
            step === 2 ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-400 border-white/10'
          }`}
        >
          2. Shipping
        </button>
        <button
          onClick={() => { if (formData.addressLine1) setStep(3); }}
          className={`py-2.5 rounded-lg border transition-colors ${
            step === 3 ? 'bg-white text-black border-white' : 'bg-white/5 text-neutral-400 border-white/10'
          }`}
        >
          3. Payment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Form Left Column */}
        <div className="lg:col-span-7 bg-brand-surface p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
          
          {/* STEP 1: CONTACT INFO */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4 animate-fadeIn">
              <h2 className="font-display font-black text-lg uppercase text-white tracking-wide border-b border-white/10 pb-3">
                1. CONTACT INFORMATION
              </h2>
              <div>
                <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Mobile Number (for SMS Tracking)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black hover:bg-brand-beige py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors mt-6 shadow-xl"
              >
                <span>CONTINUE TO SHIPPING ADDRESS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: SHIPPING ADDRESS */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h2 className="font-display font-black text-lg uppercase text-white tracking-wide">
                  2. SHIPPING DESTINATION
                </h2>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-brand-beige hover:underline"
                >
                  Edit Contact
                </button>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Street Address</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  required
                  placeholder="Flat / House No. / Building / Street"
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Landmark / Area (Optional)</label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Apartment, suite, unit, etc."
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white font-mono focus:outline-none focus:border-brand-beige"
                  />
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs text-neutral-400">Country: <strong>India</strong> (Express Air Transit)</span>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-5 rounded-xl border border-white/15 text-xs uppercase font-bold text-neutral-300 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-white text-black hover:bg-brand-beige py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors shadow-xl"
                >
                  <span>PROCEED TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h2 className="font-display font-black text-lg uppercase text-white tracking-wide">
                  3. PAYMENT METHOD
                </h2>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-brand-beige hover:underline"
                >
                  Edit Address
                </button>
              </div>

              <div className="space-y-3">
                
                {/* UPI Option */}
                <label className={`p-4 rounded-xl border block cursor-pointer transition-all ${
                  paymentMethod === 'UPI' ? 'border-brand-beige bg-brand-beige/10 ring-1 ring-brand-beige/50' : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                        className="accent-brand-beige"
                      />
                      <div className="flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-brand-beige" />
                        <span className="font-bold text-xs uppercase text-white">Instant UPI (GPay / PhonePe / Paytm / BHIM)</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">Fastest</span>
                  </div>
                  {paymentMethod === 'UPI' && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full bg-black/60 border border-white/15 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-brand-beige"
                      />
                      <p className="text-[10px] text-neutral-400 mt-1">
                        You will receive an instant payment request on your UPI application.
                      </p>
                    </div>
                  )}
                </label>

                {/* Card Option */}
                <label className={`p-4 rounded-xl border block cursor-pointer transition-all ${
                  paymentMethod === 'Card' ? 'border-brand-beige bg-brand-beige/10 ring-1 ring-brand-beige/50' : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Card'}
                        onChange={() => setPaymentMethod('Card')}
                        className="accent-brand-beige"
                      />
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-brand-beige" />
                        <span className="font-bold text-xs uppercase text-white">Credit / Debit Card (Visa, RuPay, Mastercard)</span>
                      </div>
                    </div>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className={`p-4 rounded-xl border block cursor-pointer transition-all ${
                  paymentMethod === 'COD' ? 'border-brand-beige bg-brand-beige/10 ring-1 ring-brand-beige/50' : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                        className="accent-brand-beige"
                      />
                      <div className="flex items-center space-x-2">
                        <Banknote className="w-4 h-4 text-brand-beige" />
                        <span className="font-bold text-xs uppercase text-white">Cash on Delivery (Pay upon arrival)</span>
                      </div>
                    </div>
                  </div>
                </label>

              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleFinalOrder}
                  className="w-full bg-white text-black hover:bg-brand-beige py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-2xl disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>AUTHORIZING TRANSACTION...</span>
                    </div>
                  ) : (
                    <span>CONFIRM & PLACE ORDER • {formatPrice(total)}</span>
                  )}
                </button>

                <p className="text-[10px] text-center text-neutral-500">
                  By clicking Place Order, you confirm your acceptance of the FLEX Terms of Service and 7-day exchange conditions.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Order Summary Right Column */}
        <div className="lg:col-span-5 bg-brand-surface p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-display font-black text-base uppercase text-white">
              SUMMARY ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
            <Link href="/cart" className="text-xs text-brand-beige hover:underline">
              Edit Bag
            </Link>
          </div>

          {/* Mini Items List */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 text-xs">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-14 object-cover rounded bg-brand-card flex-shrink-0 border border-white/10"
                />
                <div className="flex-1">
                  <p className="font-display font-bold text-white line-clamp-1">{item.product.name}</p>
                  <p className="text-[11px] text-neutral-400">Qty: {item.quantity} • {item.size} • {item.color}</p>
                </div>
                <span className="font-mono text-white font-bold">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2 text-xs text-neutral-400 border-t border-white/10 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white font-mono">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-brand-beige">
                <span>Discount ({appliedPromo})</span>
                <span className="font-mono">-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-white font-mono">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
              <span>Total to Pay</span>
              <span className="font-display font-black text-xl text-brand-beige">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-neutral-400 space-y-1">
            <div className="flex items-center space-x-1.5 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-brand-beige" />
              <span>FLEX Authenticity Guarantee</span>
            </div>
            <p>Direct from our state-of-the-art textile manufacturing facility to your doorstep.</p>
          </div>

        </div>

      </div>

    </div>
  );
};
