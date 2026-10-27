import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'flx-001',
    slug: 'flex-oversized-muscle-tee-washed-black',
    name: 'FLEX Oversized Muscle Tee',
    tagline: 'Raw Edge Sleeves. Streetwear Cut. Built to Perform.',
    price: 1199,
    compareAtPrice: 1799,
    category: 'tanks',
    fit: 'Oversized Fit',
    badge: 'BESTSELLER',
    images: [
      '/assets/products/muscle-tee-black.png',
      '/assets/products/muscle-tee-features.png',
      '/assets/products/FLEX Washed Black Muscle Tee Collage.png',
    ],
    colors: [
      { name: 'Washed Black', hex: '#1C1C1E', image: '/assets/products/muscle-tee-black.png' },
      { name: 'Vintage Slate', hex: '#2C2D30', image: '/assets/products/muscle-tee-features.png' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockRemaining: 8,
    isFeatured: true,
    isBestSeller: true,
    collection: ['bestsellers', 'muscle-tees', 'summer-drop'],
    description: 'Designed for high-intensity lifts and effortless street transition. The FLEX Oversized Muscle Tee features a raw edge sleeveless cut that accentuates upper-body definition while giving your delts and lats total freedom of movement. Crafted from a premium 240 GSM washed cotton with a soft, broken-in vintage feel.',
    keyFeatures: [
      'Raw edge armhole finish for rugged aesthetic and zero friction',
      'High-density screen-printed Gothic FLEX chest and back emblem',
      'Heavyweight 240 GSM pre-shrunk combed cotton',
      'Reinforced ribbed crew neckline that maintains shape wash after wash',
      'Oversized dropped shoulder silhouette with straight hem'
    ],
    specs: {
      composition: '100% Combed Heavyweight Cotton (Acid Washed)',
      weight: '240 GSM Heavyweight',
      stretch: 'Natural 2-Way Cotton Stretch',
      care: [
        'Machine wash cold (30°C / 85°F) inside out',
        'Do not iron directly over chest or spine graphic',
        'Tumble dry low or hang dry in shade for maximum longevity',
        'Do not bleach'
      ]
    }
  },
  {
    id: 'flx-002',
    slug: 'flex-pro-seamless-compression-tee-onyx',
    name: 'FLEX Pro Seamless Compression Tee',
    tagline: 'Zoned 4-Way Compression. Anti-Chafe Flatlock Stitching.',
    price: 1299,
    compareAtPrice: 1899,
    category: 'compression',
    fit: 'Compression Fit',
    badge: 'HIGH DEMAND',
    images: [
      '/assets/products/compression-tee-black.jpg',
      '/assets/hero/hero-lifestyle.png'
    ],
    colors: [
      { name: 'Onyx Black', hex: '#0B0B0B', image: '/assets/products/compression-tee-black.jpg' },
      { name: 'Ocean Blue', hex: '#1B3B6F', image: '/assets/products/compression-tee-blue.png' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 98,
    inStock: true,
    stockRemaining: 14,
    isFeatured: true,
    isNewArrival: true,
    collection: ['compression', 'new-arrivals'],
    description: 'Engineered for athletes demanding surgical precision from their training kit. The FLEX Pro Compression Tee utilizes micro-geometric warp knitting to apply graduated pressure across the chest and upper back, improving thoracic posture and muscle oxygenation during maximal exertion.',
    keyFeatures: [
      'Engineered geometric texture with localized ventilation zones',
      'Targeted upper-body compression stabilizes major muscle groups',
      'Quick-drying moisture transfer yarn keeps you cool under load',
      'Ergonomic raglan sleeve seams eliminate friction under armpits',
      'Reflective tonal FLEX logo at sternum'
    ],
    specs: {
      composition: '82% Technical Polyester, 18% Spandex Hydro-Warp',
      weight: '210 GSM Compression Weave',
      stretch: '4-Way Dynamic Omni-Stretch',
      care: [
        'Gentle cycle cold wash with like colors',
        'Air dry recommended; do not use fabric softeners',
        'Do not iron'
      ]
    }
  },
  {
    id: 'flx-003',
    slug: 'flex-pro-seamless-compression-tee-ocean-blue',
    name: 'FLEX Pro Compression Tee - Ocean Blue',
    tagline: 'High-Performance Body Contour & Breathability.',
    price: 1299,
    compareAtPrice: 1899,
    category: 'compression',
    fit: 'Compression Fit',
    badge: 'NEW DROP',
    images: [
      '/assets/products/compression-tee-blue.png',
      '/assets/products/compression-blue-poster.png'
    ],
    colors: [
      { name: 'Ocean Blue', hex: '#1B3B6F', image: '/assets/products/compression-tee-blue.png' },
      { name: 'Onyx Black', hex: '#0B0B0B', image: '/assets/products/compression-tee-black.jpg' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewCount: 64,
    inStock: true,
    stockRemaining: 19,
    isFeatured: true,
    isNewArrival: true,
    collection: ['compression', 'new-arrivals'],
    description: 'Dynamic ocean blue edition of our flagship technical compression silhouette. Cut close to the physique to lock in muscle heat and accelerate recovery between intense intervals.',
    keyFeatures: [
      'Deep ocean blue tonal dye with sweat-resistant finish',
      'Micro-perforated upper spinal strip for continuous ventilation',
      'Chafe-free ergonomic seams designed for barbell contact',
      'Anti-odor antimicrobial silver-ion fabric treatment'
    ],
    specs: {
      composition: '82% Technical Microfiber, 18% High-Elastic Elastane',
      weight: '210 GSM Compression',
      stretch: 'Omni-directional 4-Way Stretch',
      care: [
        'Machine wash cold inside out',
        'Do not tumble dry; dry flat in shade'
      ]
    }
  },
  {
    id: 'flx-004',
    slug: 'flex-waffle-henley-long-sleeve-heather',
    name: 'FLEX Waffle Henley Long Sleeve',
    tagline: 'Thermal Textured Knit. 3-Button Minimalist Placket.',
    price: 1499,
    compareAtPrice: 2199,
    category: 't-shirts',
    fit: 'Athletic Regular',
    badge: 'HEAVYWEIGHT',
    images: [
      '/assets/products/waffle-henley.png',
      '/assets/products/FLEX Waffle Henley Lookbook.png'
    ],
    colors: [
      { name: 'Heather Grey', hex: '#D1D5DB', image: '/assets/products/waffle-henley.png' },
      { name: 'Pitch Black', hex: '#111111', image: '/assets/products/FLEX Waffle Henley Lookbook.png' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviewCount: 76,
    inStock: true,
    stockRemaining: 11,
    isFeatured: true,
    collection: ['t-shirts', 'streetwear', 'lifestyle'],
    description: 'The definitive transitional training piece. Our Waffle Henley combines micro-thermal honeycomb knit with an athletic drop-shoulder cut, keeping you warm on chilly morning commutes while breathing effortlessly as your body temperature rises.',
    keyFeatures: [
      'Micro-waffle honeycomb knit locks in ambient warmth',
      'Subtle 3-button buttoned placket with matte tonal buttons',
      'Embroidered minimal chest script emblem',
      'Fitted ribbed wrist cuffs prevent sleeve ride-up during workouts',
      'Pre-shrunk organic cotton and recycled poly blend'
    ],
    specs: {
      composition: '65% Combed Cotton, 35% Recycled Thermal Polyester',
      weight: '280 GSM Waffle Knit',
      stretch: 'Moderate Mechanical Stretch',
      care: [
        'Cool delicate cycle with mild detergent',
        'Do not wring; dry flat to preserve honeycomb structure'
      ]
    }
  },
  {
    id: 'flx-005',
    slug: 'flex-double-stripe-training-joggers-grey',
    name: 'FLEX Double Stripe Training Joggers',
    tagline: 'French Terry Comfort. Concealed Zippers. Athletic Taper.',
    price: 1699,
    compareAtPrice: 2499,
    category: 'joggers',
    fit: 'Athletic Regular',
    badge: 'BESTSELLER',
    images: [
      '/assets/products/stripe-joggers-grey.png',
      '/assets/products/Minimalist FLEX Stripe Sweatpants Catalog Shot (1).png'
    ],
    colors: [
      { name: 'Heather Grey', hex: '#BFBFBF', image: '/assets/products/stripe-joggers-grey.png' },
      { name: 'Jet Black', hex: '#181818', image: '/assets/products/wide-leg-sweatpants.png' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviewCount: 189,
    inStock: true,
    stockRemaining: 6,
    isFeatured: true,
    isBestSeller: true,
    collection: ['bestsellers', 'joggers'],
    description: 'Cut from heavyweight 360 GSM loopback French terry, the FLEX Double Stripe Joggers provide the quintessential blend of gym functionality and high-street aesthetics. Twin contrast side panels elongate the legs while a reinforced crotch gusset prevents tears during deep squats.',
    keyFeatures: [
      'Twin contrast athletic racing stripes along outer legs',
      'Concealed YKK zippered hip pockets keep phone and keys secure',
      'Heavyweight 360 GSM loopback fleece with smooth outer surface',
      'Custom thick-braided drawcord with matte black metal aglets',
      'Engineered ankle taper that highlights your sneakers'
    ],
    specs: {
      composition: '85% French Terry Cotton, 15% Poly Core',
      weight: '360 GSM Heavyweight Fleece',
      stretch: '4-Way Comfort Stretch',
      care: [
        'Machine wash cold, tumble dry low',
        'Warm iron on reverse if necessary'
      ]
    }
  },
  {
    id: 'flx-006',
    slug: 'flex-wide-leg-minimalist-sweatpants-charcoal',
    name: 'FLEX Wide-Leg Minimalist Sweatpants',
    tagline: 'Oversized Street Drape. Heavyweight Fleece. Minimalist Script.',
    price: 1799,
    compareAtPrice: 2599,
    category: 'joggers',
    fit: 'Relaxed Street',
    badge: 'NEW DROP',
    images: [
      '/assets/products/wide-leg-sweatpants.png',
      '/assets/products/athletic-sweatpants.png'
    ],
    colors: [
      { name: 'Vintage Charcoal', hex: '#262626', image: '/assets/products/wide-leg-sweatpants.png' },
      { name: 'Raw Bone', hex: '#E2DEC9', image: '/assets/products/athletic-sweatpants.png' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.8,
    reviewCount: 52,
    inStock: true,
    stockRemaining: 15,
    isFeatured: false,
    collection: ['joggers', 'streetwear'],
    description: 'Embodying modern oversized proportions, the FLEX Wide-Leg Sweatpants fall with an architectural drape over your sneakers. Designed for post-workout recovery or relaxed city outings, featuring an un-cuffed open leg hem.',
    keyFeatures: [
      'Relaxed straight-to-wide leg opening with clean ungathered hem',
      'Tone-on-tone embroidered high-density FLEX script logo',
      'Extra-thick elasticated waistband with interior cotton cord',
      'Double back welt pockets with magnetic closure',
      'Ultra-soft brushed interior feel'
    ],
    specs: {
      composition: '100% Ring-Spun Cotton Fleece',
      weight: '380 GSM Heavy Fleece',
      stretch: '2-Way Natural Stretch',
      care: [
        'Cold wash gentle cycle',
        'Do not tumble dry; hang dry to preserve length and drape'
      ]
    }
  },
  {
    id: 'flx-007',
    slug: 'flex-heavyweight-oversized-hoodie-pitch-black',
    name: 'FLEX Heavyweight Oversized Hoodie',
    tagline: '420 GSM Brushback Cotton. Double-Layer Crossover Hood.',
    price: 2499,
    compareAtPrice: 3499,
    category: 'hoodies',
    fit: 'Oversized Fit',
    badge: 'HEAVYWEIGHT',
    images: [
      '/assets/branding/homepage-mockup.jpg',
      '/assets/branding/brand-kit.jpg'
    ],
    colors: [
      { name: 'Pitch Black', hex: '#0D0D0D', image: '/assets/products/athletic-sweatpants.png' },
      { name: 'Charcoal Dust', hex: '#2A2A2A', image: '/assets/products/FLEX Performance Apparel Feature Poster.png' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5.0,
    reviewCount: 112,
    inStock: true,
    stockRemaining: 9,
    isFeatured: true,
    isBestSeller: true,
    collection: ['hoodies', 'bestsellers'],
    description: 'Our most substantial garment yet. The 420 GSM FLEX Heavyweight Hoodie features a structured, double-layered hood without drawstrings for a modern, clean collar profile. Oversized dropped shoulders provide the signature silhouette with ample room for layering over gym shirts.',
    keyFeatures: [
      '420 GSM brushback cotton creates a substantial, structured drape',
      'Crossover hood with zero drawstrings for a clean architectural silhouette',
      'Tonal 3D puff print back logo with matte finish',
      'Hidden interior media pocket inside front kangaroo pouch',
      'Heavy 2x2 ribbed cuffs and waistband that resist stretching out'
    ],
    specs: {
      composition: '100% Combed Heavy Cotton Fleece',
      weight: '420 GSM Ultra-Heavyweight',
      stretch: '2-Way Comfort Stretch',
      care: [
        'Machine wash cold inside out',
        'Lay flat to dry; do not iron decoration'
      ]
    }
  },
  {
    id: 'flx-008',
    slug: 'flex-performance-stringer-tank-black',
    name: 'FLEX Performance Stringer Tank',
    tagline: 'Deep Cut Armholes. Bamboo-Cotton Blend. Y-Back Taper.',
    price: 999,
    compareAtPrice: 1499,
    category: 'tanks',
    fit: 'Athletic Regular',
    badge: '20% OFF',
    images: [
      '/assets/products/muscle-tee-black.png',
      '/assets/products/muscle-tee-features.png'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#111111', image: '/assets/products/muscle-tee-black.png' },
      { name: 'Steel Grey', hex: '#4B4B4B', image: '/assets/products/muscle-tee-features.png' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviewCount: 88,
    inStock: true,
    stockRemaining: 24,
    isFeatured: false,
    collection: ['tanks', 'summer-drop'],
    description: 'Crafted for bodybuilders and athletes who want uninterrupted shoulder clearance and back visibility on pull days. The lightweight bamboo-cotton composition pulls sweat from the skin and evaporates rapidly.',
    keyFeatures: [
      'Deep armhole contours ensure zero barbell or dumbbell interference',
      'Ergonomic narrow Y-back design reveals lat development',
      'Curved scalloped hem adds coverage during overhead presses',
      'Silky bamboo blend delivers anti-odor cooling comfort'
    ],
    specs: {
      composition: '70% Bamboo Viscose, 25% Combed Cotton, 5% Elastane',
      weight: '180 GSM Featherweight',
      stretch: '4-Way High Mobility Stretch',
      care: [
        'Machine wash cold with mild detergent',
        'Do not tumble dry'
      ]
    }
  }
];

export const CATEGORIES = [
  {
    id: 'compression',
    name: 'COMPRESSION',
    tagline: 'SUPPORT | PERFORMANCE | RECOVERY',
    image: '/assets/products/compression-tee-black.jpg',
    description: 'Targeted muscular support, posture alignment, and accelerated warm-up performance.'
  },
  {
    id: 't-shirts',
    name: 'T-SHIRTS',
    tagline: 'PREMIUM FABRIC | EVERYDAY STYLE',
    image: '/assets/products/waffle-henley.png',
    description: 'Textured waffles, heavyweight streetwear cuts, and minimal clean aesthetics.'
  },
  {
    id: 'tanks',
    name: 'TANKS & MUSCLE TEES',
    tagline: 'FREEDOM | BREATHABILITY | FLEXIBILITY',
    image: '/assets/products/muscle-tee-black.png',
    description: 'Raw-cut armholes, dropped arm designs, and unconstrained shoulder mobility.'
  },
  {
    id: 'joggers',
    name: 'JOGGERS & SWEATS',
    tagline: 'COMFORT | MOBILITY | STYLE',
    image: '/assets/products/stripe-joggers-grey.png',
    description: 'Heavyweight French terry, secure zipper pockets, and modern athletic silhouettes.'
  }
];

export const BRAND_PILLARS = [
  {
    title: 'PREMIUM FABRICS',
    subtitle: 'Soft, breathable & built to last under heavy loads'
  },
  {
    title: 'DURABLE STITCHING',
    subtitle: 'Reinforced flatlock seams made for intense movement'
  },
  {
    title: '4-WAY STRETCH',
    subtitle: 'Moves dynamically with your body without sagging'
  },
  {
    title: 'BREATHABLE MATERIAL',
    subtitle: 'Engineered air channels keep you cool and focused'
  },
  {
    title: 'MODERN ATHLETIC FITS',
    subtitle: 'Tailored proportions developed for muscular physiques'
  }
];
