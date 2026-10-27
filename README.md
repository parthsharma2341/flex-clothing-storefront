# FLEX — Premium Performance & Modern Streetwear Storefront

An elite, luxury e-commerce experience designed for **FLEX**, balancing architectural minimalist fashion with athletic performance. Featuring 3D kinetic visuals, exact-source ThreeUI paper shader integration, authentic product photography, and an end-to-end commerce engine.

---

## ⚡ Tech Stack & Architecture

- **Core Framework**: React 19 + TypeScript
- **Bundler & Build Tool**: Vite 6 (HMR & optimized production bundling)
- **Styling & Visual Design System**: Disciplined monochrome palette:
  - Primary Background: `#FFFFFF`
  - Primary Text & Dark Surfaces: `#111111`
  - Secondary Background: `#F5F5F5`
  - Subtle Borders & Dividers: `#E5E5E5`
  - Secondary Text: `#737373`
  - Muted Surfaces: `#EBEBEB`
  - Authentic Garment Colors: Washed Black, Vintage Slate, Ocean Blue, Heather Grey, Charcoal
- **Exact ThreeUI Component Integration**:
  - Component: `ThreeDPaper`
  - Package: `@designcodeio/threeui`
  - Source Bundle: Canonical `https://threeui.com/source-code/3d-paper.json`
  - Reference SHA-256 Prefix: `8ec1b71c0dbc` (Verified 100%)
  - Configured Variant: `original` (with interactive edition switcher: `original`, `certificate`, `japanese`, `site-of-the-year`)
  - Integration: `src/components/campaign/ManifestoThreeD.tsx`
- **Routing**: `wouter` lightweight client-side routing (Zero reload lag across all routes)
- **State Management**: Reactive `StoreContext` with persistent `localStorage` synchronization for Cart, Wishlist, User Authentication, Orders, Promo Codes (`FLEX10`, `TRAIN20`), and Currency (`INR ₹` / `USD $`).
- **Order Engine**: Real checkout pipeline with validation, order ID generation (e.g. `FLX-91823`), tracking number generation, receipt rendering, and celebration confetti.
- **Structured Data (SEO)**: JSON-LD for Organization, ClothingStore, OfferCatalog, and Products, plus OpenGraph and Twitter card metadata.

---

## 🗺️ Complete Website Sitemap

### A. Storefront & Collections
1. **Home (`/`)**:
   - Disciplined Announcement Bar (*Complimentary Domestic Logistics Over ₹999 &bull; Dispatched in 24h*)
   - Minimalist Header with FLEX Wordmark, Category Navigation, Search, Account, and Cart
   - Cinematic Hero Campaign with 3D Kinetic Background Canvas & Product Callout
   - New Arrivals Showcase (*Fresh drops from the atelier*)
   - Featured Collections (*Compression, T-Shirts & Henleys, Muscle Tees, Joggers*)
   - Brand Pillars (*240+ GSM Combed Cotton, Zoned 4-Way Compression, Reinforced Flatlock Seams*)
   - Best Sellers Grid
   - Performance Apparel Feature (*Deep dive into zoned compression wear*)
   - Oversized & Streetwear Feature (*240 GSM acid-washed muscle tees & 420 GSM hoodies*)
   - Editorial Product Story & Video Campaign Reel with custom play/pause/audio controls
   - **FLEX Atelier Manifesto & Certificate of Caliber** (*Exact-source ThreeDPaper WebGL shader*)
   - Lifestyle Image Section (*Editorial craftsmanship & athletic tailoring*)
   - Athlete Dispatches / Social Gallery (*@flex.official*)
   - VIP Drop Access Newsletter Signup (*Instant email validation and priority token confirmation*)
   - Comprehensive Luxury Footer

2. **Shop Catalog (`/shop`)**:
   - Complete product archive with active filters
   - Filters: Category, Fit (Compression, Oversized, Athletic Regular, Relaxed Street), Size (S, M, L, XL, XXL), Color, Price slider, In-stock toggle
   - Sorting: Featured, Price Low-High, Price High-Low, Highest Rated, New Arrivals
   - Grid Density Switcher (3 cols / 4 cols) & active filter reset

3. **Collection Pages (`/collections` and `/collections/:slug`)**:
   - `/collections` — Curated capsules directory
   - `/collections/all` — Complete archive
   - `/collections/compression` — Technical pro compression wear
   - `/collections/t-shirts` — T-shirts & thermal waffle henleys
   - `/collections/oversized-tees` — Raw-edge acid-washed muscle tees
   - `/collections/tank-tops` — Performance stringers & Y-back tanks
   - `/collections/joggers` — 360 GSM French terry joggers & wide-leg sweats
   - `/collections/shorts` — Drop 02 Prototype Preview with early-access alert form
   - `/collections/henley` — Honeycomb waffle thermal henleys
   - `/collections/new-arrivals` — Latest technical drops
   - `/collections/best-sellers` — Community favorites

4. **Product Detail (`/products/:slug`)**:
   - High-resolution image gallery with front, macro, and studio drape views
   - Dynamic variant selectors (Size & Color) with live stock counters
   - Interactive Size Guide / Fit Advisor modal
   - Quantity selector
   - Add to Bag with drawer activation
   - Buy Now express checkout button
   - Technical Specification Sheet (Fabrication, GSM density, Seams, Silhouette, Origin)
   - Collapsible accordions (Product Narrative, Composition & Care, 7-Day Free Swaps)
   - Fabric Acoustic Resonance Preview generator
   - Verified athlete review system (with dynamic review submission modal)
   - Related products carousel

5. **Search (`/search?q=`)**:
   - Header search overlay with instant autocomplete suggestions
   - Dedicated search results page with keyword filtering and popular query tags

6. **Cart (`/cart` & Slide-Out `CartDrawer`)**:
   - Line items with variant details, size, color, SKU, and quantity counters
   - Dynamic Free Express Logistics meter (Threshold: ₹1,499)
   - Coupon system: `FLEX10` (10% off), `TRAIN20` (20% off)
   - Order subtotal, discount, shipping fee, and grand total calculation
   - One-click checkout CTA

7. **Checkout (`/checkout`)**:
   - 3-step luxury checkout flow: Contact info &rarr; Delivery Address &rarr; Payment
   - Payment options: Instant UPI (Google Pay, PhonePe, Paytm, QR), Cards (Visa, MasterCard, RuPay), Net Banking, Cash on Delivery
   - Confetti celebration upon order verification
   - Authoritative order creation with persistent record in `localStorage`
   - Direct receipt printing / download action

8. **Shipment Tracking (`/track-order`)**:
   - Live Order ID (e.g. `FLX-91823`) and AWB tracking lookup
   - 5-stage milestone verification timeline (Confirmed &rarr; Packed &rarr; Dispatched &rarr; Out for Delivery &rarr; Delivered)
   - Recipient address and itemized parcel manifest

9. **Customer Account (`/account` & `/login`)**:
   - Sign in and registration with 1-click Athlete Demo Login
   - Athlete Profile with past orders history and tracking status
   - Saved shipping addresses manager
   - Saved wishlist navigation

10. **Saved Wishlist (`/wishlist`)**:
    - Grid of saved pieces with instant "Move to Bag" action

11. **Supporting Pages**:
    - `/about` — The FLEX brand genesis, blueprint, and textile engineering principles
    - `/lookbook` — Campaign reels and 9-scene cinematic storyboard
    - `/size-guide` — Interactive metric (cm) and imperial (in) sizing tables
    - `/faq` — Categorized interactive accordion FAQ
    - `/contact` — Interactive inquiry form with 24h response guarantee
    - `/shipping-returns` — Domestic air express timelines and 7-day exchange terms
    - `/privacy-policy` — Data protection and PCI-DSS compliance
    - `/terms` & `/terms-and-conditions` — Terms of purchase and service

---

## 📦 Authentic Product Catalog

Derived from the verified `shopify-products-import.csv` specification:

1. **FLEX Oversized Muscle Tee** (`flex-oversized-muscle-tee-washed-black`)
   - Price: ₹1,199 (Compare at ₹1,799)
   - GSM: 240 GSM Heavyweight Acid-Washed Cotton
   - Details: Raw-edge armhole cut, Gothic emblem, ribbed crew neck
2. **FLEX Pro Seamless Compression Tee — Onyx Black** (`flex-pro-seamless-compression-tee-onyx`)
   - Price: ₹1,299 (Compare at ₹1,899)
   - GSM: 210 GSM Compression Weave (82% Poly, 18% Spandex)
   - Details: Zoned 4-way compression, spinal ventilation, raglan seams
3. **FLEX Pro Compression Tee — Ocean Blue** (`flex-pro-seamless-compression-tee-ocean-blue`)
   - Price: ₹1,299 (Compare at ₹1,899)
   - GSM: 210 GSM Compression Weave
   - Details: Tonal ocean blue dye, sweat-resistant finish
4. **FLEX Waffle Henley Long Sleeve** (`flex-waffle-henley-long-sleeve-heather`)
   - Price: ₹1,499 (Compare at ₹2,199)
   - GSM: 280 GSM Waffle Knit (65% Cotton, 35% Recycled Poly)
   - Details: 3-button placket, micro-honeycomb knit, ribbed cuffs
5. **FLEX Double Stripe Training Joggers** (`flex-double-stripe-training-joggers-grey`)
   - Price: ₹1,699 (Compare at ₹2,499)
   - GSM: 360 GSM Heavyweight Loopback French Terry
   - Details: Twin outer racing stripes, concealed YKK zip pockets, squat gusset
6. **FLEX Wide-Leg Minimalist Sweatpants** (`flex-wide-leg-minimalist-sweatpants-charcoal`)
   - Price: ₹1,799 (Compare at ₹2,599)
   - GSM: 380 GSM Ring-Spun Fleece
   - Details: Un-cuffed open leg hem, architectural streetwear drape
7. **FLEX Heavyweight Oversized Hoodie** (`flex-heavyweight-oversized-hoodie-pitch-black`)
   - Price: ₹2,499 (Compare at ₹3,499)
   - GSM: 420 GSM Ultra-Heavy Brushback Cotton
   - Details: Double-layered crossover hood without drawstrings, 3D puff print
8. **FLEX Performance Stringer Tank** (`flex-performance-stringer-tank-black`)
   - Price: ₹999 (Compare at ₹1,499)
   - GSM: 180 GSM Bamboo-Cotton Blend
   - Details: Deep Y-back taper, curved scalloped hem

---

## 🛠️ Local Development & Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The server will start on `http://localhost:3000`.

### 3. Production Build
```bash
npm run build
```
This executes `tsc` for strict type checking and `vite build` for production minification and chunk generation.

### 4. Preview Production Build
```bash
npm run preview
```
Previews the production assets from the `dist/` folder on `http://localhost:4173`.

---

## 🌐 Production Deployment

### Vercel / Netlify
1. Connect repository to Vercel or Netlify.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Routing Rule: Single-Page Application (SPA) rewrite to `index.html`.

---

## 🔒 Security & Environment Variables

Copy `.env.example` to `.env` to configure your payment keys:
- Never expose private keys, database passwords, or administrative tokens in client code.
- Payment testing uses verified sandbox/mock gateways without real charges.
