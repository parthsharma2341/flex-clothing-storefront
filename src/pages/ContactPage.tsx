import React, { useState } from 'react';
import { Mail, Clock, ShieldCheck, CheckCircle2, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Status & Tracking',
    orderId: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }
    setIsSubmitted(true);
    showToast('Your message has been dispatched to our athlete care desk!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-8 text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brand-beige">
          ATHLETE CARE & INQUIRIES
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl uppercase text-white tracking-tight">
          CONNECT WITH FLEX
        </h1>
        <p className="text-sm text-neutral-400">
          Have questions regarding an upcoming release, your tracking number, or sizing exchanges? We respond within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Form Left */}
        <div className="lg:col-span-7 bg-brand-surface p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-brand-beige text-black flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-display font-black text-2xl uppercase text-white">
                MESSAGE DELIVERED
              </h3>
              <p className="text-sm text-neutral-300 max-w-sm mx-auto">
                Thank you for reaching out, {form.name}. Our athlete care desk has received your ticket and will follow up via email at <strong className="text-white">{form.email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setForm({ name: '', email: '', phone: '', subject: 'Order Status & Tracking', orderId: '', message: '' });
                }}
                className="mt-4 bg-white/10 hover:bg-white hover:text-black text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-display font-black text-xl uppercase text-white tracking-wide border-b border-white/10 pb-3">
                SEND DIRECT INQUIRY
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Parth Sharma"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="parth@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Inquiry Topic</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                  >
                    <option value="Order Status & Tracking" className="bg-brand-surface text-white">Order Status & Tracking</option>
                    <option value="Size Exchange & Return" className="bg-brand-surface text-white">Size Exchange & Return</option>
                    <option value="Product Sizing Recommendation" className="bg-brand-surface text-white">Product Sizing Recommendation</option>
                    <option value="Athlete Sponsorship / Collab" className="bg-brand-surface text-white">Athlete Sponsorship / Collab</option>
                    <option value="Bulk & Gym Orders" className="bg-brand-surface text-white">Bulk & Gym Orders</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Order ID (if applicable)</label>
                <input
                  type="text"
                  value={form.orderId}
                  onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                  placeholder="e.g. FLX-91823"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white font-mono uppercase focus:outline-none focus:border-brand-beige"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-300 block mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your question or size exchange request in detail..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-beige"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black hover:bg-brand-beige py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-colors shadow-2xl mt-4"
              >
                <span>TRANSMIT MESSAGE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Right */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brand-surface p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
            <h3 className="font-display font-black text-lg uppercase text-white border-b border-white/10 pb-4">
              DIRECT REACH
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-beige">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white uppercase tracking-wider">Email Support</p>
                  <a href="mailto:support@flex-fit.shop" className="text-neutral-400 hover:text-white transition-colors">
                    support@flex-fit.shop
                  </a>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Average reply time: 4 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-beige">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white uppercase tracking-wider">Operating Hours</p>
                  <p className="text-neutral-400">Monday - Saturday</p>
                  <p className="text-[11px] text-neutral-400">10:00 AM – 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-beige">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white uppercase tracking-wider">Dispatch Center</p>
                  <p className="text-neutral-400">FLEX Fulfillment Hub, Mumbai Metro, India</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-neutral-400 space-y-1">
              <p className="font-bold text-white">Need an immediate size swap?</p>
              <p className="text-[11px]">
                Mention your Order ID and the replacement size in your message. We dispatch the exchange as soon as the reverse pickup is assigned.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
