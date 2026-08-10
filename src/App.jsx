import React, { useState, useEffect, useCallback } from 'react';
import {
  MessageCircle,
  Phone,
  Sparkles,
  ShieldCheck,
  Clock,
  Heart,
  Menu,
  X,
  ChevronRight,
  MapPin,
  Leaf,
  PackageCheck,
  Truck,
  CheckCircle2,
  Gift,
  Flame,
  Star,
  Calendar,
  Palette,
  Check
} from 'lucide-react';
import './App.css';
import grLogo from './assets/grbakeslogo.png';
import heroImg from './assets/hero.png';
import sambarImg from './assets/sambar_powder.png';
import kulambuMilagaiImg from './assets/kulambu_milagai_powder.png';
import varaMilagaiImg from './assets/roasted_chilli_powder.png';
import varaKothamalliImg from './assets/roasted_coriander_powder.png';
import turmericImg from './assets/turmericpowder.png';
import blackPepperImg from './assets/black_pepper_powder.png';
import whitePepperImg from './assets/white_pepper_powder.png';
import idlyPodiImg from './assets/idly_podi.png';
import rasamImg from './assets/rasam_powder.png';
import sathumaavuImg from './assets/sathumaavu_porridge_mix.png';
import uluthanImg from './assets/black_gram_porridge_mix.png';
import karuppuKavuniImg from './assets/karuppu_kavuni_porridge_mix.png';

// Inline Instagram SVG component to avoid missing export issues in lucide-react
const InstagramIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Dynamic WhatsApp order helper
const openWhatsApp = (productName = "") => {
  const message = productName
    ? `Hi GR Home Bakers, I would like to order ${productName}.`
    : `Hi GR Home Bakers, I would like to place an order.`;

  window.open(
    `https://wa.me/919443524677?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

// A resilient <img> that gracefully swaps to an on-brand emoji tile
// instead of a broken image icon if the source fails to load.
const SafeImage = ({ src, alt, className, fallbackEmoji = "🌿", fallbackLabel }) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`${className} img-fallback`} role="img" aria-label={alt}>
        <span className="img-fallback-emoji">{fallbackEmoji}</span>
        {fallbackLabel && <span className="img-fallback-label">{fallbackLabel}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

// ==========================================================================
// THEME SYSTEM
// ==========================================================================
const THEMES = [
  {
    id: 'signature',
    label: 'Signature',
    description: 'Maroon & gold',
    swatch: '#7B171C'
  },
  {
    id: 'festive',
    label: 'Festive',
    description: 'Magenta & gold',
    swatch: '#A11245'
  },
  {
    id: 'botanical',
    label: 'Botanical',
    description: 'Spice green',
    swatch: '#2F6B47'
  }
];

const THEME_STORAGE_KEY = 'gr-home-theme';

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) || 'signature';
    } catch {
      return 'signature';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }, [theme]);

  return [theme, setTheme];
};

const ThemeSwitcher = ({ theme, setTheme, variant = "header" }) => {
  const [open, setOpen] = useState(false);

  const handlePick = useCallback((id) => {
    setTheme(id);
    setOpen(false);
  }, [setTheme]);

  if (variant === "inline") {
    return (
      <div className="theme-inline-group" role="group" aria-label="Choose a colour theme">
        {THEMES.map((t) => (
          <button
            key={t.id}
            className={`theme-swatch-btn ${theme === t.id ? 'is-active' : ''}`}
            style={{ '--swatch-color': t.swatch }}
            onClick={() => handlePick(t.id)}
            aria-pressed={theme === t.id}
          >
            <span className="theme-swatch-dot" />
            <span className="theme-swatch-text">
              <strong>{t.label}</strong>
              <small>{t.description}</small>
            </span>
            {theme === t.id && <Check size={16} className="theme-swatch-check" />}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="theme-switcher desktop-only">
      <button
        className="theme-trigger-btn"
        onClick={() => setOpen(!open)}
        aria-label="Change colour theme"
        aria-expanded={open}
      >
        <Palette size={16} />
        <span className="theme-trigger-dot" style={{ '--swatch-color': THEMES.find(t => t.id === theme)?.swatch }} />
      </button>

      {open && (
        <>
          <div className="theme-dropdown-backdrop" onClick={() => setOpen(false)} />
          <div className="theme-dropdown">
            <span className="theme-dropdown-title">Choose a theme</span>
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`theme-option ${theme === t.id ? 'is-active' : ''}`}
                style={{ '--swatch-color': t.swatch }}
                onClick={() => handlePick(t.id)}
              >
                <span className="theme-swatch-dot" />
                <span className="theme-swatch-text">
                  <strong>{t.label}</strong>
                  <small>{t.description}</small>
                </span>
                {theme === t.id && <Check size={15} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ==========================================================================
// DATA
// ==========================================================================

// Data: Bakery Products
const bakeryProducts = [
  {
    id: 'b1',
    name: "Dark Chocolate Brownie",
    badge: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
    description: "Rich, moist & fudgy — loaded with real dark chocolate and baked fresh to order.",
    tags: ["Fudgy", "Egg & Eggless Options", "Pure Chocolate"],
    fallbackEmoji: "🍫"
  },
  {
    id: 'b2',
    name: "White Chocolate Blondies",
    badge: "CROWD FAVOURITE",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800",
    description: "Soft, chewy & perfectly sweet with rich white choco chunks baked into every bite.",
    tags: ["Chewy", "Vanilla & Butter", "Melt-in-mouth"],
    fallbackEmoji: "🍪"
  },
  {
    id: 'b3',
    name: "Wheat Choco Chip Cookies",
    badge: "KIDS LOVE IT",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800",
    description: "Healthy & tasty whole wheat cookies packed generously with premium dark choco chips.",
    tags: ["Whole Wheat", "Crunchy", "Preservative-Free"],
    fallbackEmoji: "🍪"
  },
  {
    id: 'b4',
    name: "Homemade Chocolates",
    badge: "GIFTING PICK",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=800",
    description: "Handcrafted artisanal chocolates made with the finest cocoa for pure chocolate delight.",
    tags: ["Custom Boxes", "Artisanal", "Perfect Gift"],
    fallbackEmoji: "🍬"
  }
];

// Data: Main Masala & Traditional Kitchen Products
const mainMasalaProducts = [
  {
    id: 'm0',
    name: "Idly Maavu (Idly Batter)",
    icon: "🍚",
    badge: "Min Order: 5 kg",
    slogan: "Softest idlis & crispest dosas, freshly ground on order.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=800",
    description: "Freshly ground traditional rice & urad dal batter, naturally fermented without added preservatives. Perfect for soft fluffy idlis and crisp golden dosas. (Minimum order quantity: 5 kg)",
    fallbackEmoji: "🍚"
  },
  {
    id: 'm1',
    name: "Sambar Podi",
    icon: "🌶️",
    badge: "100% Natural",
    slogan: "One spoon, and it's Amma's kitchen again.",
    image: sambarImg,
    description: "Traditional homemade sambar powder prepared with carefully selected spices for rich aroma and authentic South Indian flavour.",
    fallbackEmoji: "🌶️"
  },
  {
    id: 'm2',
    name: "Kulambu Milagai Podi",
    icon: "🌶️",
    badge: "100% Natural",
    slogan: "The secret behind every soul-warming kuzhambu.",
    image: kulambuMilagaiImg,
    description: "A traditional Tamil-style spice blend for flavourful kuzhambu, made with carefully hand-roasted spices.",
    fallbackEmoji: "🌶️"
  },
  {
    id: 'm3',
    name: "Vara Milagai Podi",
    icon: "🔥",
    badge: "100% Natural",
    slogan: "Fiery, fragrant & fried-rice ready.",
    image: varaMilagaiImg,
    description: "Aromatic dry chilli spice blend with the perfect balance of heat and traditional stone-ground flavour.",
    fallbackEmoji: "🔥"
  },
  {
    id: 'm4',
    name: "Vara Kothamalli Podi",
    icon: "🌿",
    badge: "100% Natural",
    slogan: "Fresh coriander magic, stone-ground for real flavour.",
    image: varaKothamalliImg,
    description: "Freshly prepared coriander-based spice powder with rich aroma and authentic homemade taste.",
    fallbackEmoji: "🌿"
  },
  {
    id: 'm5',
    name: "Turmeric Powder",
    icon: "🟠",
    badge: "100% Natural",
    slogan: "Pure gold from the earth, stone-ground for real curcumin power.",
    image: turmericImg,
    description: "High-curcumin turmeric, sun-dried and stone-ground the traditional way for colour, aroma and everyday wellness.",
    fallbackEmoji: "🟠"
  },
  {
    id: 'm6',
    name: "Black Pepper Powder",
    icon: "⚫",
    badge: "100% Natural",
    slogan: "The king of spices, freshly cracked for real heat.",
    image: blackPepperImg,
    description: "Sun-dried whole peppercorns, stone-ground fresh on order for a sharper, more fragrant bite than store-bought powder.",
    fallbackEmoji: "⚫"
  },
  {
    id: 'm7',
    name: "White Pepper Powder",
    icon: "⚪",
    badge: "100% Natural",
    slogan: "Subtle heat, refined for delicate dishes.",
    image: whitePepperImg,
    description: "Milder and earthier than black pepper, perfect for light gravies, soups and dishes that need warmth without overpowering heat.",
    fallbackEmoji: "⚪"
  },
  {
    id: 'm8',
    name: "Idly Podi",
    icon: "🍛",
    badge: "100% Natural",
    slogan: "Idli's best friend — nutty, spicy and stone-ground perfect.",
    image: idlyPodiImg,
    description: "A classic lentil & chilli gunpowder blend, roasted and ground fresh — just mix with sesame oil for the ultimate idli or dosa side.",
    fallbackEmoji: "🍛"
  },
  {
    id: 'm9',
    name: "Rasam Podi",
    icon: "🍲",
    badge: "100% Natural",
    slogan: "A pinch of comfort in every hot bowl of rasam.",
    image: rasamImg,
    description: "Aromatic, digestion-friendly spice blend roasted the traditional way — the base of every good South Indian rasam.",
    fallbackEmoji: "🍲"
  },
  {
    id: 'm10',
    name: "Sathumaavu Kanji Premix",
    icon: "🥣",
    badge: "100% Natural",
    slogan: "Multi-grain goodness, spooned straight from tradition.",
    image: sathumaavuImg,
    description: "A wholesome multi-grain health mix, slow-roasted and stone-ground — just cook with milk or water for a nourishing everyday kanji.",
    fallbackEmoji: "🥣"
  },
  {
    id: 'm11',
    name: "Uluthan Kanji Premix",
    icon: "🥣",
    badge: "100% Natural",
    slogan: "Protein-rich warmth, the way ammachi made it.",
    image: uluthanImg,
    description: "A traditional black gram (uluthan) premix, rich in protein — roasted and ground fresh for a hearty, warming kanji.",
    fallbackEmoji: "🥣"
  },
  {
    id: 'm12',
    name: "Karupu Kavuni Kanji Mix",
    icon: "🥣",
    badge: "100% Natural",
    slogan: "Black rice richness, antioxidant-packed and earthy.",
    image: karuppuKavuniImg,
    description: "Stone-ground black kavuni rice premix, naturally rich in antioxidants — a nutritious, deeply flavourful traditional kanji.",
    fallbackEmoji: "🥣"
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme();

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* HEADER / NAVIGATION */}
      <header className="header-sticky">
        <div className="header-inner container">
          <div className="logo-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={grLogo} alt="GR Home Bakers logo" className="logo-badge-img" />
            <div className="brand-titles">
              <span className="brand-main">GR Home Bakers</span>
              <span className="brand-sub">& HOME MADE MASALA</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <button onClick={() => scrollToSection('bakes')} className="nav-link">Bakes</button>
            <button onClick={() => scrollToSection('masala')} className="nav-link">Masala & Maavu</button>
            <button onClick={() => scrollToSection('delivery')} className="nav-link">Delivery</button>
            <button onClick={() => scrollToSection('order')} className="nav-link">Order</button>
          </nav>

          <div className="header-actions">
            <ThemeSwitcher theme={theme} setTheme={setTheme} />

            <button
              onClick={() => openWhatsApp()}
              className="phone-btn desktop-only"
              aria-label="Call or WhatsApp us"
            >
              <Phone className="btn-icon-sm" />
              <span>9443524677</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <button onClick={() => scrollToSection('bakes')} className="mobile-nav-link">Bakes</button>
            <button onClick={() => scrollToSection('masala')} className="mobile-nav-link">Masala & Maavu</button>
            <button onClick={() => scrollToSection('delivery')} className="mobile-nav-link">Delivery</button>
            <button onClick={() => scrollToSection('order')} className="mobile-nav-link">Order</button>

            <div className="mobile-theme-block">
              <span className="mobile-theme-label">
                <Palette size={15} /> Theme
              </span>
              <ThemeSwitcher theme={theme} setTheme={setTheme} variant="inline" />
            </div>

            <button
              onClick={() => { setMobileMenuOpen(false); openWhatsApp(); }}
              className="whatsapp-btn-full"
            >
              <MessageCircle className="btn-icon" />
              WhatsApp: 9443524677
            </button>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="pill-badge">
              <Sparkles size={14} className="pill-icon" />
              <span>2 BRANDS · 1 KITCHEN · SALEM</span>
            </div>

            <h1 className="hero-title">
              Taste the love in <br />
              <span className="text-highlight">every bite</span> — and <br />
              <span className="text-highlight-pink">every spoonful.</span>
            </h1>

            <p className="hero-description">
              Fudgy brownies, chewy blondies and wheat cookies from <strong>GR Home Bakers</strong>,
              plus fresh Idly Maavu (batter), pure stone-ground powders and traditional kanji premixes from <strong>GR Home Made Masala</strong>.
              Homemade with love, prepared for happiness.
            </p>

            <div className="hero-buttons">
              <button onClick={() => openWhatsApp()} className="btn-primary">
                <MessageCircle size={18} />
                Order on WhatsApp
              </button>
              <button onClick={() => scrollToSection('masala')} className="btn-secondary">
                Shop masala & batter
              </button>
            </div>

            {/* Hero Trust Cards */}
            <div className="hero-trust-grid">
              <div className="trust-card">
                <Clock className="trust-icon" />
                <div className="trust-text">
                  <strong>Within 7 days</strong>
                  <span>Powder delivery</span>
                </div>
              </div>
              <div className="trust-card">
                <Heart className="trust-icon" />
                <div className="trust-text">
                  <strong>Made on order</strong>
                  <span>Always fresh</span>
                </div>
              </div>
              <div className="trust-card">
                <ShieldCheck className="trust-icon" />
                <div className="trust-text">
                  <strong>FSSAI registered</strong>
                  <span>Hygienic kitchen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual Image */}
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <SafeImage
                src={heroImg}
                alt="Freshly baked chocolate brownie with scoop of love"
                className="hero-img"
                fallbackEmoji="🍰"
                fallbackLabel="GR Home Bakers"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE / BRAND STRIP */}
      <div className="marquee-strip">
        <div className="marquee-content">
          <span>♥ WITH LOVE</span>
          <span>♥ FRESHLY BAKED EVERYDAY</span>
          <span>♥ FRESH IDLY MAAVU (MIN 5KG)</span>
          <span>♥ EGG & EGGLESS OPTIONS</span>
          <span>♥ NO PRESERVATIVES</span>
          <span>♥ PRE-ORDERS TAKEN</span>
          <span>♥ POWDERS DELIVERED WITHIN 7 DAYS</span>
          <span>♥ WITH LOVE</span>
          <span>♥ FRESHLY BAKED EVERYDAY</span>
          <span>♥ FRESH IDLY MAAVU (MIN 5KG)</span>
          <span>♥ EGG & EGGLESS OPTIONS</span>
          <span>♥ NO PRESERVATIVES</span>
          <span>♥ PRE-ORDERS TAKEN</span>
        </div>
      </div>

      {/* BAKERY SPECIALITIES SECTION */}
      <section id="bakes" className="section-padding bakes-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="brand-tag">GR HOME BAKERS</span>
            <h2 className="section-title">Our specialties</h2>
            <p className="section-subtitle">
              Baked fresh on order with premium ingredients — available in both egg and eggless options.
            </p>
          </div>

          <div className="products-grid">
            {bakeryProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="card-image-box">
                  <span className="product-badge">{product.badge}</span>
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                    fallbackEmoji={product.fallbackEmoji}
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-desc">{product.description}</p>
                  <div className="tag-list">
                    {product.tags.map((t, idx) => (
                      <span key={idx} className="mini-tag">{t}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => openWhatsApp(product.name)}
                    className="card-cta-btn"
                  >
                    Order this <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CELEBRATION BOX SECTION */}
      <section className="section-padding celebration-section">
        <div className="container">
          <div className="celebration-card">
            <div className="celebration-left">
              <div className="pill-badge gold-pill">
                <Gift size={14} />
                <span>SPECIAL GIFTING</span>
              </div>
              <h2 className="celebration-title">Birthday brownie & blondie boxes</h2>
              <p className="celebration-desc">
                Custom message on top, party-ready packing and gift wrapping. Pre-orders taken —
                share the date on WhatsApp and we bake it fresh for you.
              </p>
              <button onClick={() => openWhatsApp("Celebration Brownie Box")} className="btn-primary">
                <MessageCircle size={18} />
                Pre-order a celebration box
              </button>
            </div>

            <div className="celebration-right-grid">
              <div className="feature-mini-box">
                <Calendar className="box-icon" />
                <h4>Birthdays</h4>
              </div>
              <div className="feature-mini-box">
                <Sparkles className="box-icon" />
                <h4>Celebrations</h4>
              </div>
              <div className="feature-mini-box">
                <Gift className="box-icon" />
                <h4>Return gifts</h4>
              </div>
              <div className="feature-mini-box">
                <Star className="box-icon" />
                <h4>Special occasions</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GR HOME MADE MASALA SECTION */}
      <section id="masala" className="section-padding masala-hero-section">
        <div className="container">
          <div className="masala-intro-grid">
            <div className="masala-img-column">
              <div className="masala-img-wrapper">
                <SafeImage
                  src={turmericImg}
                  alt="Traditional South Indian Spices and Masalas"
                  className="masala-main-img"
                  fallbackEmoji="🌶️"
                  fallbackLabel="GR Home Made Masala"
                />
                <div className="gold-stamp">
                  <span>100%</span>
                  <small>HOMEMADE</small>
                </div>
              </div>
            </div>

            <div className="masala-content-column">
              <span className="brand-tag masala-tag">GR HOME MADE MASALA</span>
              <h2 className="section-title masala-title">Pure · Natural · Homemade</h2>
              <p className="section-subtitle masala-desc">
                Fresh Idly Maavu (batter), traditional powders and kanji premixes made in small batches, exactly the way our grandmothers
                made them — no preservatives, no colours, no shortcuts.
              </p>

              <ul className="masala-benefits-list">
                <li><CheckCircle2 className="benefit-icon" /> No preservatives or chemicals</li>
                <li><CheckCircle2 className="benefit-icon" /> Fresh Idly Maavu / Batter (Min order: 5 kg)</li>
                <li><CheckCircle2 className="benefit-icon" /> Hygienically prepared in clean home kitchen</li>
                <li><CheckCircle2 className="benefit-icon" /> Authentic Tamil Nadu traditional taste & quality</li>
              </ul>

              <div className="masala-cta-group">
                <button onClick={() => openWhatsApp("Masala Order")} className="btn-gold">
                  Pre-order products
                </button>
                <div className="delivery-badge-pill">
                  <Truck size={16} />
                  <span>DELIVERED WITHIN 7 DAYS</span>
                </div>
              </div>
            </div>
          </div>

          {/* MASALA & TRADITIONAL PRODUCTS GRID */}
          <div className="masala-products-wrapper">
            <div className="section-header text-center">
              <h3 className="sub-section-title">Fresh Batter, Spices & Kanji Premixes</h3>
              <p className="section-subtitle">Freshly prepared and stone-ground traditional recipes for authentic everyday meals.</p>
            </div>

            <div className="masala-grid">
              {mainMasalaProducts.map((masala) => (
                <div className="masala-card" key={masala.id}>
                  <div className="masala-card-img-box">
                    <SafeImage
                      src={masala.image}
                      alt={masala.name}
                      className="masala-img"
                      fallbackEmoji={masala.fallbackEmoji}
                    />
                    <span className="nature-badge">
                      <Leaf size={12} /> {masala.badge}
                    </span>
                  </div>
                  <div className="masala-card-body">
                    <div className="masala-header-row">
                      <span className="masala-emoji">{masala.icon}</span>
                      <h4 className="masala-card-title">{masala.name}</h4>
                    </div>
                    <p className="masala-card-slogan">"{masala.slogan}"</p>
                    <p className="masala-card-desc">{masala.description}</p>

                    <div className="masala-purity-tags">
                      <span>✓ 100% Natural</span>
                      <span>✓ No Added Preservatives</span>
                      <span>{masala.id === 'm0' ? '✓ Min Order: 5 kg' : '✓ Homemade'}</span>
                    </div>

                    <button
                      onClick={() => openWhatsApp(masala.name)}
                      className="masala-order-btn"
                    >
                      <MessageCircle size={16} />
                      Order on WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MASALA DELIVERY INFORMATION */}
      <section className="section-padding delivery-info-section">
        <div className="container">
          <div className="delivery-info-card">
            <div className="delivery-header">
              <div className="days-badge-circle">
                <span>7</span>
                <small>DAYS</small>
              </div>
              <div className="delivery-title-area">
                <h2>Order any powder or batter — delivered within 7 days</h2>
                <p>We prepare fresh batches upon order to maintain maximum aroma, softness & nutritional value.</p>
              </div>
            </div>

            <div className="delivery-steps-grid">
              <div className="step-card">
                <span className="step-num">01</span>
                <h4>Message us</h4>
                <p>Send your requirement on WhatsApp</p>
              </div>
              <div className="step-card">
                <span className="step-num">02</span>
                <h4>Pay & confirm</h4>
                <p>Confirm your order easily</p>
              </div>
              <div className="step-card">
                <span className="step-num">03</span>
                <h4>Packed hygienically</h4>
                <p>Freshly prepared and packed</p>
              </div>
              <div className="step-card">
                <span className="step-num">04</span>
                <h4>Delivered in 7 days</h4>
                <p>Reliable delivery to your doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GENERAL DELIVERY SECTION */}
      <section id="delivery" className="section-padding delivery-process-section">
        <div className="container text-center">
          <span className="brand-tag">OUR PROMISE</span>
          <h2 className="section-title">Freshly made. Carefully packed. Delivered with love.</h2>
          <p className="section-subtitle">How we get delicious bakes, idly batter and aromatic masalas to your kitchen.</p>

          <div className="process-grid">
            <div className="process-step">
              <div className="icon-circle"><MessageCircle size={24} /></div>
              <h3>1. Order</h3>
              <p>Send your choice or requirements directly to our WhatsApp number.</p>
            </div>

            <div className="process-step">
              <div className="icon-circle"><Flame size={24} /></div>
              <h3>2. Prepare</h3>
              <p>Made fresh in small batches using wholesome traditional recipes.</p>
            </div>

            <div className="process-step">
              <div className="icon-circle"><PackageCheck size={24} /></div>
              <h3>3. Pack</h3>
              <p>Hygienically packed with care in party-ready or sturdy boxes.</p>
            </div>

            <div className="process-step">
              <div className="icon-circle"><Truck size={24} /></div>
              <h3>4. Deliver</h3>
              <p>Prompt local pickup/delivery & powder/batter delivery within 7 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER CTA SECTION */}
      <section id="order" className="section-padding cta-section">
        <div className="container text-center">
          <div className="cta-box">
            <h2 className="cta-title">Ready to taste homemade goodness?</h2>
            <p className="cta-text">
              Fresh bakes, Idly Maavu (batter min. 5 kg), traditional masalas and homemade flavours — made especially for you.
            </p>
            <div className="cta-buttons">
              <button onClick={() => openWhatsApp()} className="btn-primary btn-large">
                <MessageCircle size={20} />
                Order on WhatsApp
              </button>
              <button onClick={() => scrollToSection('masala')} className="btn-secondary-light btn-large">
                Explore Masala & Batter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <div className="logo-badge">GR</div>
              <div>
                <h3 className="footer-brand-title">GR Home Bakers</h3>
                <span className="footer-brand-sub">GR Home Made Masala</span>
              </div>
            </div>
            <p className="footer-tagline">"Homemade with love, baked for happiness."</p>
            <div className="fssai-pill">
              <ShieldCheck size={16} />
              <span>FSSAI Reg. No. <strong>224680000279</strong></span>
            </div>
          </div>

          <div className="footer-col contact-col">
            <h4>Get in Touch</h4>
            <ul className="footer-contacts">
              <li>
                <Phone size={16} className="contact-icon" />
                <a href="tel:9443524677">9443524677</a> (WhatsApp orders)
              </li>
              <li>
                <InstagramIcon size={16} className="contact-icon" />
                <a href="https://instagram.com/gr_home_bakers" target="_blank" rel="noopener noreferrer">@gr_home_bakers</a>
              </li>
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Salem, Tamil Nadu</span>
              </li>
            </ul>
          </div>

          <div className="footer-col links-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('bakes')}>Fresh Bakery Specials</button></li>
              <li><button onClick={() => scrollToSection('masala')}>Stone-Ground Masala & Batter</button></li>
              <li><button onClick={() => scrollToSection('delivery')}>Delivery Process</button></li>
              <li><button onClick={() => openWhatsApp()}>Custom Orders</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom text-center">
          <p>© 2026 GR Home Bakers & Home Made Masala · Salem, Tamil Nadu</p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <button
        className="floating-whatsapp"
        onClick={() => openWhatsApp()}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} className="wa-floating-icon" />
        <span className="wa-floating-text">Order on WhatsApp</span>
      </button>
    </div>
  );
}