import React, { useEffect, Suspense, lazy } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';

import { HomePage } from './pages/HomePage';
// Code-split subsequent pages on demand to reduce initial JS execution and TBT
const ShopPage = lazy(() => import('./pages/ShopPage').then((m) => ({ default: m.ShopPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage').then((m) => ({ default: m.CollectionsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const SizeGuidePage = lazy(() => import('./pages/SizeGuidePage').then((m) => ({ default: m.SizeGuidePage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then((m) => ({ default: m.FAQPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const CartPage = lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const AccountPage = lazy(() => import('./pages/AccountPage').then((m) => ({ default: m.AccountPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const WishlistPage = lazy(() => import('./pages/WishlistPage').then((m) => ({ default: m.WishlistPage })));
const SearchPage = lazy(() => import('./pages/SearchPage').then((m) => ({ default: m.SearchPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const ShippingReturnsPage = lazy(() => import('./pages/ShippingReturnsPage').then((m) => ({ default: m.ShippingReturnsPage })));
const LookbookPage = lazy(() => import('./pages/LookbookPage').then((m) => ({ default: m.LookbookPage })));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage').then((m) => ({ default: m.TrackOrderPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Code-split modals and slide-overs loaded only when triggered
const CartDrawer = lazy(() => import('./components/cart/CartDrawer').then((m) => ({ default: m.CartDrawer })));
const QuickViewModal = lazy(() => import('./components/modals/QuickViewModal').then((m) => ({ default: m.QuickViewModal })));
const SizeAdvisorModal = lazy(() => import('./components/modals/SizeAdvisorModal').then((m) => ({ default: m.SizeAdvisorModal })));

// Minimal zero-layout-shift route transition skeleton
const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center" aria-hidden="true">
    <div className="w-6 h-6 border-2 border-white/10 border-t-brand-beige rounded-full animate-spin" />
  </div>
);

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  return null;
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-brand-black text-brand-light font-sans selection:bg-brand-beige selection:text-black">
        <ScrollToTop />
        <Header />

        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/shop" component={ShopPage} />
              <Route path="/products/:slug" component={ProductDetailPage} />
              <Route path="/collections" component={CollectionsPage} />
              <Route path="/collections/:slug" component={CollectionsPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/size-guide" component={SizeGuidePage} />
              <Route path="/faq" component={FAQPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/cart" component={CartPage} />
              <Route path="/checkout" component={CheckoutPage} />
              <Route path="/account" component={AccountPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/wishlist" component={WishlistPage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/privacy-policy" component={PrivacyPolicyPage} />
              <Route path="/terms-and-conditions" component={TermsPage} />
              <Route path="/terms" component={TermsPage} />
              <Route path="/shipping-returns" component={ShippingReturnsPage} />
              <Route path="/track-order" component={TrackOrderPage} />
              <Route path="/lookbook" component={LookbookPage} />
              <Route path="/admin" component={AdminPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Suspense>
        </main>

        <Footer />

        {/* Global Modals & Drawers Loaded Asynchronously on Demand */}
        <Suspense fallback={null}>
          <CartDrawer />
          <QuickViewModal />
          <SizeAdvisorModal />
        </Suspense>
        <ToastContainer />
      </div>
    </StoreProvider>
  );
};

export default App;
