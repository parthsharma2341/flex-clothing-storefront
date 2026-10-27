import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center space-x-3 p-4 rounded-xl shadow-2xl border text-xs font-medium backdrop-blur-md transition-all duration-300 animate-fadeIn ${
            toast.type === 'success'
              ? 'bg-neutral-900/95 border-brand-beige/40 text-white'
              : toast.type === 'error'
              ? 'bg-rose-950/95 border-rose-500/40 text-white'
              : 'bg-neutral-900/95 border-white/20 text-neutral-200'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-brand-beige flex-shrink-0" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-neutral-400 flex-shrink-0" />
          )}
          <span className="flex-1 leading-snug">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
