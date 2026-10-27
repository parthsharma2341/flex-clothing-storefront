import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/modals/QuickViewModal';
import { SizeAdvisorModal } from './components/modals/SizeAdvisorModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { AboutPage } from './pages/AboutPage';
import { SizeGuidePage } from './pages/SizeGuidePage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import { WishlistPage } from './pages/WishlistPage';
import { SearchPage } from './pages/SearchPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ShippingReturnsPage } from './pages/ShippingReturnsPage';
import { LookbookPage } from './pages/LookbookPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

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
        </main>

        <Footer />

        {/* Global Modals & Drawers */}
        <CartDrawer />
        <QuickViewModal />
        <SizeAdvisorModal />
        <ToastContainer />
      </div>
    </StoreProvider>
  );
};

export default App;
