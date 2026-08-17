import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  Check,
  Scale,
  Info,
} from 'lucide-react';
import { motion } from 'framer-motion';

import './App.css';

// Logo
import logoImg from './assets/grbakeslogo.png';

// Bakery Images
import darkChocolateBrownieImg from './assets/DarkChocolateBrownie.jpg';
import whiteChocolateBlondiesImg from './assets/Whitechocolateblondies.jpg';
import wheatChocoChipCookiesImg from './assets/Wheatchocochipcookies.jpg';
import homemadeChocolatesImg from './assets/homemadechcolates.jpg';

// Masala & Premix Images
import idlyBatterImg from './assets/idlybatter.png';
import sambarPowderImg from './assets/sambarpowder.png';
import kulambuMilagaiPowderImg from './assets/kulambuilagaipowder.png';
import redChilliPowderImg from './assets/redchllipowder.png';
import kothamalliPodiImg from './assets/kothamallipodi.png';
import turmericPowderImg from './assets/turmericpowder.png';
import blackPepperPowderImg from './assets/blackpepperpowder.png';
import whitePepperImg from './assets/whitepepper.png';
import idlyPowderImg from './assets/idlypowder.png';
import rasamPowderImg from './assets/Rasampowder.png';
import sathumaavuKanjiImg from './assets/sathumaavukanjipremix.png';
import karuppuKavuniKanjiImg from './assets/Karuppu Kavuni Kanji Mix.png';
import uluthanKanjiImg from './assets/Traditional Uluthan Kanji Mix Packaging.png';
import multiDosaGrainImg from './assets/multidosagrainpremix.png';
import venpongalPremixImg from './assets/venpongalpremix.png';
import milletPongalPremixImg from './assets/Milletpongalpremix.png';

import { SplitText } from './components/SplitText';
import { TiltCard } from './components/TiltCard';
import { MagneticButton } from './components/MagneticButton';
import { ImageTrail } from './components/ImageTrail';
import { CustomCursor } from './components/CustomCursor';
import { FloatingParticles } from './components/FloatingParticles';

const InstagramIcon = ({ size = 16, className = '' }) => (
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
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WHATSAPP_NUMBER = '919443524677';
const openWhatsApp = (productName = '') => {
  const message = productName
    ? `Hi GR Home Bakers, I would like to order ${productName}.`
    : `Hi GR Home Bakers, I would like to place an order.`;
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer'
  );
};

// ---------------------------------------------------------------------------
// THEME SYSTEM
// ---------------------------------------------------------------------------
const THEMES = [
  { id: 'signature', label: 'Signature', description: 'Maroon & gold', swatch: '#7B171C' },
  { id: 'festive', label: 'Festive', description: 'Magenta & gold', swatch: '#A11245' },
  { id: 'botanical', label: 'Botanical', description: 'Spice green', swatch: '#2F6B47' },
];
const THEME_STORAGE_KEY = 'gr-home-theme';

const useTheme = () => {
  const [theme, setThemeState] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return stored ?? 'signature';
    } catch {
      return 'signature';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore storage errors */
    }
  }, [theme]);

  const setTheme = useCallback((id) => setThemeState(id), []);
  return [theme, setTheme];
};

// ---------------------------------------------------------------------------
// SCROLL REVEAL HOOK
// ---------------------------------------------------------------------------
const useScrollReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

const Reveal = ({ children, delay = 0, className = '', as = 'div' }) => {
  const { ref, visible } = useScrollReveal();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-in' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

const SafeImage = ({ src, alt, className = '', fallbackEmoji = '🌿', fallbackLabel }) => {
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

const ThemeSwitcher = ({ theme, setTheme, variant = 'header' }) => {
  const [open, setOpen] = useState(false);
  const handlePick = useCallback(
    (id) => {
      setTheme(id);
      setOpen(false);
    },
    [setTheme]
  );

  if (variant === 'inline') {
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

  const activeSwatch = THEMES.find((t) => t.id === theme)?.swatch;
  return (
    <div className="theme-switcher desktop-only">
      <button
        className="theme-trigger-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Change colour theme"
        aria-expanded={open}
      >
        <Palette size={16} />
        <span className="theme-trigger-dot" style={{ '--swatch-color': activeSwatch }} />
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

// ---------------------------------------------------------------------------
// DATA WITH UPDATED BAKERY & MASALA PRODUCT PATHS
// ---------------------------------------------------------------------------
const bakeryProducts = [
  {
    id: 'b1',
    name: 'Dark Chocolate Brownie',
    badge: 'BESTSELLER',
    prices: [
      { size: '500g', price: '₹520' },
      { size: '1 kg', price: '₹1,000' },
    ],
    image: darkChocolateBrownieImg,
    description: 'Rich, moist & fudgy — loaded with real dark chocolate and baked fresh to order.',
    tags: ['Fudgy', 'Egg & Eggless Options', 'Pure Chocolate'],
    fallbackEmoji: '🍫',
  },
  {
    id: 'b2',
    name: 'White Chocolate Blondies',
    badge: 'CROWD FAVOURITE',
    prices: [
      { size: '500g', price: '₹580' },
      { size: '1 kg', price: '₹1,100' },
    ],
    image: whiteChocolateBlondiesImg,
    description: 'Soft, chewy & perfectly sweet with rich white choco chunks baked into every bite.',
    tags: ['Chewy', 'Vanilla & Butter', 'Melt-in-mouth'],
    fallbackEmoji: '🍪',
  },
  {
    id: 'b3',
    name: 'Wheat Choco Chip Cookies',
    badge: 'KIDS LOVE IT',
    prices: [
      { size: '250g', price: '₹250' },
      { size: '500g', price: '₹480' },
    ],
    image: wheatChocoChipCookiesImg,
    description: 'Healthy & tasty whole wheat cookies packed generously with premium dark choco chips.',
    tags: ['Whole Wheat', 'Crunchy', 'Preservative-Free'],
    fallbackEmoji: '🍪',
  },
  {
    id: 'b4',
    name: 'Homemade Chocolates',
    badge: 'GIFTING PICK',
    prices: [{ size: 'Custom Box', price: 'from ₹350' }],
    image: homemadeChocolatesImg,
    description: 'Handcrafted artisanal chocolates made with the finest cocoa for pure chocolate delight.',
    tags: ['Custom Boxes', 'Artisanal', 'Perfect Gift'],
    fallbackEmoji: '🍬',
  },
];

const mainMasalaProducts = [
  {
    id: 'm0',
    name: 'Idly Maavu (Idly Batter Premix)',
    icon: '🍚',
    badge: 'Min Order: 5 kg',
    slogan: 'Softest idlis & crispest dosas, freshly ground on order.',
    prices: [{ size: '5 kg', price: '₹780' }],
    image: idlyBatterImg,
    description:
      'Freshly ground traditional rice & urad dal batter premix, naturally prepared without added preservatives.',
    fallbackEmoji: '🍚',
    minOrder: true,
  },
  {
    id: 'm1',
    name: 'Sambar Podi',
    icon: '🌶️',
    badge: '100% Natural',
    slogan: "One spoon, and it's Amma's kitchen again.",
    prices: [
      { size: '500g', price: '₹290' },
      { size: '1 kg', price: '₹580' },
    ],
    image: sambarPowderImg,
    description:
      'Traditional homemade sambar powder prepared with carefully selected spices for rich aroma and authentic flavour.',
    fallbackEmoji: '🌶️',
  },
  {
    id: 'm2',
    name: 'Kulambu Milagai Podi',
    icon: '🌶️',
    badge: '100% Natural',
    slogan: 'The secret behind every soul-warming kuzhambu.',
    prices: [
      { size: '500g', price: '₹280' },
      { size: '1 kg', price: '₹560' },
    ],
    image: kulambuMilagaiPowderImg,
    description:
      'A traditional Tamil-style spice blend for flavourful kuzhambu, made with carefully hand-roasted spices.',
    fallbackEmoji: '🌶️',
  },
  {
    id: 'm3',
    name: 'Red Chilli Powder (Vara Milagai Podi)',
    icon: '🔥',
    badge: '100% Natural',
    slogan: 'Fiery, fragrant & fried-rice ready.',
    prices: [
      { size: '500g', price: '₹280' },
      { size: '1 kg', price: '₹560' },
    ],
    image: redChilliPowderImg,
    description:
      'Aromatic dry chilli spice blend with the perfect balance of heat and traditional stone-ground flavour.',
    fallbackEmoji: '🔥',
  },
  {
    id: 'm4',
    name: 'Kothamalli Podi (Vara Kothamalli)',
    icon: '🌿',
    badge: '100% Natural',
    slogan: 'Fresh coriander magic, stone-ground for real flavour.',
    prices: [
      { size: '500g', price: '₹235' },
      { size: '1 kg', price: '₹560' },
    ],
    image: kothamalliPodiImg,
    description:
      'Freshly prepared coriander-based spice powder with rich aroma and authentic homemade taste.',
    fallbackEmoji: '🌿',
  },
  {
    id: 'm5',
    name: 'Turmeric Powder',
    icon: '🟠',
    badge: '100% Natural',
    slogan: 'Pure gold from the earth, stone-ground for real curcumin power.',
    prices: [
      { size: '250g', price: '₹95' },
      { size: '500g', price: '₹190' },
      { size: '1 kg', price: '₹365' },
    ],
    image: turmericPowderImg,
    description:
      'High-curcumin turmeric, sun-dried and stone-ground the traditional way for rich colour and aroma.',
    fallbackEmoji: '🟠',
  },
  {
    id: 'm6',
    name: 'Black Pepper Powder',
    icon: '⚫',
    badge: '100% Natural',
    slogan: 'The king of spices, freshly cracked for real heat.',
    prices: [
      { size: '250g', price: '₹270' },
      { size: '500g', price: '₹530' },
    ],
    image: blackPepperPowderImg,
    description:
      'Sun-dried whole peppercorns, stone-ground fresh on order for a sharper, fragrant bite.',
    fallbackEmoji: '⚫',
  },
  {
    id: 'm7',
    name: 'White Pepper Powder',
    icon: '⚪',
    badge: '100% Natural',
    slogan: 'Subtle heat, refined for delicate dishes.',
    prices: [
      { size: '250g', price: '₹290' },
      { size: '500g', price: '₹570' },
    ],
    image: whitePepperImg,
    description:
      'Milder and earthier than black pepper, perfect for light gravies, soups and white sauces.',
    fallbackEmoji: '⚪',
  },
  {
    id: 'm8',
    name: 'Idly Podi',
    icon: '🍛',
    badge: '100% Natural',
    slogan: "Idli's best friend — nutty, spicy and stone-ground perfect.",
    prices: [
      { size: '250g', price: '₹125' },
      { size: '500g', price: '₹240' },
      { size: '1 kg', price: '₹460' },
    ],
    image: idlyPowderImg,
    description:
      'A classic lentil & chilli gunpowder blend, roasted and ground fresh — just mix with sesame oil.',
    fallbackEmoji: '🍛',
  },
  {
    id: 'm9',
    name: 'Rasam Podi',
    icon: '🍲',
    badge: '100% Natural',
    slogan: 'A pinch of comfort in every hot bowl of rasam.',
    prices: [
      { size: '500g', price: '₹300' },
      { size: '1 kg', price: '₹600' },
    ],
    image: rasamPowderImg,
    description:
      'Aromatic, digestion-friendly spice blend roasted the traditional way — base of South Indian rasam.',
    fallbackEmoji: '🍲',
  },
  {
    id: 'm10',
    name: 'Sathumaavu Kanji Premix',
    icon: '🥣',
    badge: '100% Natural',
    slogan: 'Multi-grain goodness, spooned straight from tradition.',
    prices: [
      { size: '500g', price: '₹225' },
      { size: '1 kg', price: '₹450' },
    ],
    image: sathumaavuKanjiImg,
    description:
      'Wholesome multi-grain health mix, slow-roasted and stone-ground — cook with milk or water.',
    fallbackEmoji: '🥣',
  },
  {
    id: 'm11',
    name: 'Karuppu Kavuni Kanji Mix',
    icon: '🥣',
    badge: '100% Natural',
    slogan: 'Black rice richness, antioxidant-packed and earthy.',
    prices: [
      { size: '250g', price: '₹200' },
      { size: '500g', price: '₹390' },
    ],
    image: karuppuKavuniKanjiImg,
    description:
      'Stone-ground black kavuni rice premix, naturally rich in antioxidants — deeply flavourful.',
    fallbackEmoji: '🥣',
  },
  {
    id: 'm12',
    name: 'Uluthan Kanji Mix',
    icon: '🥣',
    badge: '100% Natural',
    slogan: 'Protein-rich warmth, the way ammachi made it.',
    prices: [
      { size: '250g', price: '₹95' },
      { size: '500g', price: '₹185' },
    ],
    image: uluthanKanjiImg,
    description:
      'Traditional black gram (uluthan) premix, rich in protein — roasted and ground fresh.',
    fallbackEmoji: '🥣',
  },
  {
    id: 'm13',
    name: 'Multi Grain Dosa Premix',
    icon: '🥞',
    badge: '100% Natural',
    slogan: 'Crispy, protein-rich dosas in minutes.',
    prices: [{ size: '500g', price: '₹190' }],
    image: multiDosaGrainImg,
    description:
      'Healthy multi-grain dosa flour blend prepared with protein-packed grains for golden crispy dosas.',
    fallbackEmoji: '🥞',
  },
  {
    id: 'm14',
    name: 'Venpongal Premix',
    icon: '🍲',
    badge: '100% Natural',
    slogan: 'Authentic temple-style Venpongal made easy.',
    prices: [{ size: '500g', price: '₹180' }],
    image: venpongalPremixImg,
    description:
      'Traditional rice & moong dal premix with cumin, pepper & ghee aroma ready for quick home cooking.',
    fallbackEmoji: '🍲',
  },
  {
    id: 'm15',
    name: 'Millet Pongal Premix',
    icon: '🌾',
    badge: 'Customisable',
    slogan: 'Healthy millet comfort, cooked in minutes.',
    prices: [{ size: '500g', price: 'Customisable' }],
    image: milletPongalPremixImg,
    description:
      'Nutritious millet-based pongal mix tailored with your choice of foxtail, kodo, or barnyard millet.',
    fallbackEmoji: '🌾',
  },
];

const HERO_IMAGE = darkChocolateBrownieImg;
const MASALA_INTRO_IMAGE = sambarPowderImg;
const TRAIL_IMAGES = [
  darkChocolateBrownieImg,
  sambarPowderImg,
  wheatChocoChipCookiesImg,
  turmericPowderImg,
];

// ---------------------------------------------------------------------------
// HEADER
// ---------------------------------------------------------------------------
const NAV_ITEMS = [
  { id: 'bakes', label: 'Bakes' },
  { id: 'masala', label: 'Masala & Premixes' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'order', label: 'Order' },
];

const Header = ({ theme, setTheme, scrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className={`header-sticky ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="logo-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          role="button"
          tabIndex={0}
          aria-label="Back to top"
        >
          <img src={logoImg} alt="GR Home Bakers Logo" className="logo-img" />
          <div className="brand-titles">
            <span className="brand-main">GR Home Bakers</span>
            <span className="brand-sub">&amp; HOME MADE MASALA</span>
          </div>
        </motion.div>

        <nav className="desktop-nav" aria-label="Primary">
          {NAV_ITEMS.map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
              onClick={() => handleNav(item.id)}
              className="nav-link"
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
          <MagneticButton
            onClick={() => openWhatsApp()}
            className="phone-btn desktop-only"
            aria-label="Call or WhatsApp us"
          >
            <Phone className="btn-icon-sm" />
            <span>9443524677</span>
          </MagneticButton>
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mobile-nav-drawer"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="mobile-nav-link"
            >
              {item.label}
              <ChevronRight size={16} className="mobile-nav-chevron" />
            </button>
          ))}
          <div className="mobile-theme-block">
            <span className="mobile-theme-label">
              <Palette size={15} /> Theme
            </span>
            <ThemeSwitcher theme={theme} setTheme={setTheme} variant="inline" />
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openWhatsApp();
            }}
            className="whatsapp-btn-full"
          >
            <MessageCircle className="btn-icon" />
            WhatsApp: 9443524677
          </button>
        </motion.div>
      )}
    </header>
  );
};

// ---------------------------------------------------------------------------
// MAIN APP COMPONENT
// ---------------------------------------------------------------------------
export default function App() {
  const [theme, setTheme] = useTheme();

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="app-container">
      <CustomCursor />
      <Header theme={theme} setTheme={setTheme} scrollToSection={scrollToSection} />

      {/* HERO SECTION */}
      <section className="hero-section">
        <FloatingParticles />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="pill-badge reveal-in">
              <Sparkles size={14} className="pill-icon" />
              <span>2 BRANDS · 1 KITCHEN · SALEM</span>
            </div>

            <h1 className="hero-title">
              <SplitText
                text="Taste the love in every bite — and every spoonful."
                highlightWords={['bite', 'spoonful']}
                delay={100}
              />
            </h1>

            <p className="hero-description">
              Fudgy brownies, chewy blondies and wheat cookies from{' '}
              <strong>GR Home Bakers</strong>, plus fresh Idly Maavu (batter), pure
              stone-ground powders and traditional kanji premixes from{' '}
              <strong>GR Home Made Masala</strong>. Homemade with love, prepared for
              happiness.
            </p>

            <div className="hero-buttons">
              <MagneticButton onClick={() => openWhatsApp()} className="btn-primary">
                <MessageCircle size={18} />
                Order on WhatsApp
              </MagneticButton>
              <button
                onClick={() => scrollToSection('masala')}
                className="btn-secondary"
              >
                Shop masala &amp; batter
              </button>
            </div>

            <div className="hero-trust-grid">
              <div className="trust-card">
                <Scale className="trust-icon" />
                <div className="trust-text">
                  <strong>Delivery by weight</strong>
                  <span>Standard charges apply</span>
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
                  <span>Reg No. 224680000279</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <TiltCard className="hero-image-wrapper">
              <div className="hero-image-frame">
                <SafeImage
                  src={HERO_IMAGE}
                  alt="Freshly baked chocolate brownie drizzled with love"
                  className="hero-img"
                  fallbackEmoji="🎂"
                  fallbackLabel="GR Home Bakers"
                />
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="hero-floating-badge"
              >
                <div className="hero-float-inner">
                  <Heart size={16} />
                  <span>Baked fresh</span>
                  <small>on order</small>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hero-floating-rating"
              >
                <div className="rating-stars">
                  <Star size={14} className="star-filled" />
                  <Star size={14} className="star-filled" />
                  <Star size={14} className="star-filled" />
                  <Star size={14} className="star-filled" />
                  <Star size={14} className="star-filled" />
                </div>
                <span>Loved in Salem</span>
              </motion.div>
            </TiltCard>
          </div>
        </div>

        <div className="hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0,60 C240,100 480,20 720,50 C960,80 1200,30 1440,60 L1440,100 L0,100 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="marquee-strip">
        <div className="marquee-content">
          <span>WITH LOVE</span>
          <span>FRESHLY BAKED EVERYDAY</span>
          <span>FRESH IDLY MAAVU (MIN 5KG)</span>
          <span>DELIVERY CHARGES APPLICABLE AS PER WEIGHT</span>
          <span>EGG &amp; EGGLESS OPTIONS</span>
          <span>NO PRESERVATIVES</span>
          <span>PRE-ORDERS TAKEN</span>
          <span>POWDERS DELIVERED WITHIN 7 DAYS</span>
          <span>WITH LOVE</span>
          <span>FRESHLY BAKED EVERYDAY</span>
          <span>FRESH IDLY MAAVU (MIN 5KG)</span>
          <span>DELIVERY CHARGES APPLICABLE AS PER WEIGHT</span>
          <span>EGG &amp; EGGLESS OPTIONS</span>
        </div>
      </div>

      {/* BAKERY SECTION */}
      <section id="bakes" className="section-padding bakes-section">
        <ImageTrail images={TRAIL_IMAGES} className="container">
          <Reveal className="section-header text-center">
            <span className="brand-tag">GR HOME BAKERS</span>
            <h2 className="section-title">Our Bakery Specialties</h2>
            <p className="section-subtitle">
              Baked fresh on order with premium ingredients — available in both egg and
              eggless options.
            </p>
          </Reveal>

          <div className="products-grid">
            {bakeryProducts.map((product, i) => (
              <Reveal delay={i * 90} key={product.id} as="article">
                <TiltCard className="product-card">
                  <div className="card-image-box">
                    <span className="product-badge">{product.badge}</span>
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className="product-img"
                      fallbackEmoji={product.fallbackEmoji}
                    />
                    <div className="card-image-overlay" />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">{product.name}</h3>
                    <p className="card-desc">{product.description}</p>

                    <div className="price-tag-list">
                      {product.prices.map((pTier) => (
                        <div key={pTier.size} className="price-pill">
                          <span className="price-size">{pTier.size}</span>
                          <span className="price-val">{pTier.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="tag-list">
                      {product.tags?.map((t) => (
                        <span key={t} className="mini-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => openWhatsApp(`${product.name} (${product.prices[0]?.price})`)}
                      className="card-cta-btn"
                    >
                      Order this <ChevronRight size={16} />
                    </button>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </ImageTrail>
      </section>

      {/* CELEBRATION SECTION */}
      <section className="section-padding celebration-section">
        <div className="container">
          <Reveal className="celebration-card">
            <div className="celebration-left">
              <div className="pill-badge gold-pill">
                <Gift size={14} />
                <span>SPECIAL GIFTING</span>
              </div>
              <h2 className="celebration-title">Birthday brownie &amp; blondie boxes</h2>
              <p className="celebration-desc">
                Custom message on top, party-ready packing and gift wrapping.
                Pre-orders taken — share the date on WhatsApp and we bake it fresh for you.
              </p>
              <MagneticButton
                onClick={() => openWhatsApp('Celebration Brownie Box')}
                className="btn-primary"
              >
                <MessageCircle size={18} />
                Pre-order a celebration box
              </MagneticButton>
            </div>

            <div className="celebration-right-grid">
              {[
                { icon: Calendar, label: 'Birthdays' },
                { icon: Sparkles, label: 'Celebrations' },
                { icon: Gift, label: 'Return gifts' },
                { icon: Star, label: 'Special occasions' },
              ].map((box, i) => (
                <Reveal delay={i * 80} key={box.label} className="feature-mini-box">
                  <box.icon className="box-icon" />
                  <h4>{box.label}</h4>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* MASALA INTRO SECTION */}
      <section id="masala" className="section-padding masala-hero-section">
        <div className="container">
          <Reveal className="masala-intro-grid">
            <div className="masala-img-column">
              <TiltCard className="masala-img-wrapper">
                <SafeImage
                  src={MASALA_INTRO_IMAGE}
                  alt="Traditional South Indian spices and masalas"
                  className="masala-main-img"
                  fallbackEmoji="🌶️"
                  fallbackLabel="GR Home Made Masala"
                />
                <div className="gold-stamp">
                  <span>100%</span>
                  <small>HOMEMADE</small>
                </div>
              </TiltCard>
            </div>

            <div className="masala-content-column">
              <span className="brand-tag masala-tag">GR HOME MADE MASALA</span>
              <h2 className="section-title masala-title">
                <SplitText text="Pure · Natural · Homemade" delay={80} />
              </h2>
              <p className="section-subtitle masala-desc">
                Fresh Idly Maavu (batter), traditional powders and kanji premixes made in
                small batches, exactly the way our grandmothers made them — no
                preservatives, no colours, no shortcuts.
              </p>

              <ul className="masala-benefits-list">
                {[
                  'No preservatives or artificial chemicals',
                  'Fresh Idly Maavu / Batter (Min order: 5 kg — ₹780)',
                  'Hygienically prepared in clean home kitchen',
                  'Delivery charges applicable according to weight',
                ].map((text, i) => (
                  <motion.li
                    key={text}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className="benefit-icon" /> {text}
                  </motion.li>
                ))}
              </ul>

              <div className="masala-cta-group">
                <MagneticButton
                  onClick={() => openWhatsApp('Masala Order')}
                  className="btn-gold"
                >
                  Pre-order products
                </MagneticButton>
                <div className="delivery-badge-pill">
                  <Truck size={16} />
                  <span>DELIVERY CHARGES AS PER WEIGHT</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* MASALA PRODUCTS SHOWCASE */}
          <div className="masala-products-wrapper">
            <Reveal className="section-header text-center">
              <h3 className="sub-section-title">Fresh Batter, Spices &amp; Kanji Premixes</h3>
              <p className="section-subtitle">
                Freshly prepared and stone-ground traditional recipes for authentic
                everyday meals.
              </p>
            </Reveal>

            {/* WEIGHT NOTICE BANNER */}
            <div className="weight-notice-banner">
              <Info size={18} className="notice-icon" />
              <span>
                <strong>Note:</strong> Delivery charges are applicable according to total order package weight.
              </span>
            </div>

            <div className="masala-grid">
              {mainMasalaProducts.map((masala, i) => (
                <Reveal delay={(i % 4) * 80} key={masala.id} as="article">
                  <TiltCard className="masala-card">
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
                      <div className="masala-card-overlay" />
                    </div>

                    <div className="masala-card-body">
                      <div className="masala-header-row">
                        <span className="masala-emoji">{masala.icon}</span>
                        <h4 className="masala-card-title">{masala.name}</h4>
                      </div>
                      <p className="masala-card-slogan">"{masala.slogan}"</p>
                      <p className="masala-card-desc">{masala.description}</p>

                      {/* PRICES DISPLAY */}
                      <div className="price-tag-list masala-price-list">
                        {masala.prices.map((pTier) => (
                          <div key={pTier.size} className="price-pill masala-pill">
                            <span className="price-size">{pTier.size}</span>
                            <span className="price-val">{pTier.price}</span>
                          </div>
                        ))}
                      </div>

                      <div className="masala-purity-tags">
                        <span>✓ 100% Natural Spice</span>
                        <span>✓ No Added Preservatives</span>
                        <span>
                          {masala.minOrder ? '✓ Min Order: 5 kg' : '✓ Prepared Fresh'}
                        </span>
                      </div>

                      <button
                        onClick={() => openWhatsApp(masala.name)}
                        className="masala-order-btn"
                      >
                        <MessageCircle size={16} />
                        Order on WhatsApp
                      </button>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY INFO SECTION */}
      <section className="section-padding delivery-info-section">
        <div className="container">
          <Reveal className="delivery-info-card">
            <div className="delivery-header">
              <div className="days-badge-circle">
                <span>7</span>
                <small>DAYS</small>
              </div>
              <div className="delivery-title-area">
                <h2>Order any powder or batter — delivered within 7 days</h2>
                <p>
                  We prepare fresh batches upon order to maintain maximum aroma, softness
                  &amp; nutritional value. Delivery charges applicable according to weight.
                </p>
              </div>
            </div>

            <div className="delivery-steps-grid">
              {[
                { num: '01', title: 'Message us', desc: 'Send your requirement & quantities on WhatsApp' },
                { num: '02', title: 'Weight & Payment', desc: 'We calculate delivery cost by weight and confirm' },
                { num: '03', title: 'Packed hygienically', desc: 'Freshly stone-ground and packed' },
                { num: '04', title: 'Delivered in 7 days', desc: 'Reliable delivery straight to your doorstep' },
              ].map((step, i) => (
                <Reveal delay={i * 90} key={step.num} className="step-card">
                  <span className="step-num">{step.num}</span>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DELIVERY PROCESS SECTION */}
      <section id="delivery" className="section-padding delivery-process-section">
        <div className="container text-center">
          <Reveal className="section-header">
            <span className="brand-tag">OUR PROMISE</span>
            <h2 className="section-title">
              Freshly made. Carefully packed. Delivered with love.
            </h2>
            <p className="section-subtitle">
              How we get delicious bakes, idly batter and aromatic masalas to your kitchen.
            </p>
          </Reveal>

          <div className="process-grid">
            {[
              {
                icon: MessageCircle,
                title: '1. Order',
                desc: 'Send your choice or requirements directly to our WhatsApp number.',
              },
              {
                icon: Flame,
                title: '2. Prepare',
                desc: 'Made fresh in small batches using wholesome traditional recipes.',
              },
              {
                icon: Scale,
                title: '3. Weigh & Pack',
                desc: 'Hygienically packed. Delivery charges calculated as per package weight.',
              },
              {
                icon: Truck,
                title: '4. Deliver',
                desc: 'Prompt local pickup/delivery & powder/batter delivery within 7 days.',
              },
            ].map((step, i) => (
              <Reveal delay={i * 100} key={step.title} className="process-step">
                <div className="icon-circle">
                  <step.icon size={24} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER CTA SECTION */}
      <section id="order" className="section-padding cta-section">
        <div className="container text-center">
          <Reveal className="cta-box">
            <div className="cta-glow" aria-hidden="true" />
            <h2 className="cta-title">Ready to taste homemade goodness?</h2>
            <p className="cta-text">
              Fresh bakes, Idly Maavu (batter min. 5 kg — ₹780), traditional masalas and premixes — made especially for you.
            </p>
            <div className="cta-buttons">
              <MagneticButton
                onClick={() => openWhatsApp()}
                className="btn-primary btn-large"
              >
                <MessageCircle size={20} />
                Order on WhatsApp
              </MagneticButton>
              <button
                onClick={() => scrollToSection('masala')}
                className="btn-secondary-light btn-large"
              >
                Explore Masala &amp; Premixes
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <img src={logoImg} alt="GR Home Bakers Logo" className="footer-logo-img" />
              <div>
                <h3 className="footer-brand-title">GR Home Bakers</h3>
                <span className="footer-brand-sub">GR Home Made Masala</span>
              </div>
            </div>
            <p className="footer-tagline">"Homemade with love, baked for happiness."</p>
            <div className="fssai-pill">
              <ShieldCheck size={16} />
              <span>
                FSSAI Reg. No. <strong>224680000279</strong>
              </span>
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
                <a
                  href="https://instagram.com/gr_home_bakers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @gr_home_bakers
                </a>
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
              <li>
                <button onClick={() => scrollToSection('bakes')}>Fresh Bakery Specials</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('masala')}>Stone-Ground Masala &amp; Premixes</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('delivery')}>Delivery Process</button>
              </li>
              <li>
                <button onClick={() => openWhatsApp()}>Custom Orders</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom text-center">
          <p>© 2026 GR Home Bakers &amp; Home Made Masala · Salem, Tamil Nadu · Delivery charges as per weight</p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <MagneticButton onClick={() => openWhatsApp()} className="floating-whatsapp">
        <MessageCircle size={22} className="wa-floating-icon" />
        <span className="wa-floating-text">Order on WhatsApp</span>
      </MagneticButton>
    </div>
  );
}