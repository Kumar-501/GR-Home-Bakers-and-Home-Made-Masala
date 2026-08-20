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
    ? `Hi GR Home Bakers Salem, I would like to order ${productName}.`
    : `Hi GR Home Bakers Salem, I would like to place an order.`;
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

const SafeImage = ({ src, alt, className = '', fallbackEmoji = '🌿', fallbackLabel, isHero = false }) => {
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
      loading={isHero ? 'eager' : 'lazy'}
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
// DATA WITH SEO ALT TEXTS & DESCRIPTIONS
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
    altText: 'Fresh homemade dark chocolate brownie made in Salem by GR Home Bakers',
    description: 'Rich, moist & fudgy homemade brownies loaded with real dark chocolate, baked fresh in Salem for every order.',
    tags: ['Fudgy Brownies', 'Egg & Eggless', 'Salem Home Bakery'],
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
    altText: 'Soft white chocolate blondies baked fresh at GR Home Bakers in Salem',
    description: 'Soft, chewy & perfectly sweet homemade white chocolate blondies with premium choco chunks baked in Salem.',
    tags: ['Chewy Blondies', 'Vanilla & Butter', 'Freshly Baked'],
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
    altText: 'Healthy whole wheat chocolate chip cookies made fresh in Salem',
    description: 'Healthy & crispy whole wheat cookies loaded with dark choco chips, baked in Salem without added preservatives.',
    tags: ['Whole Wheat', 'Healthy Cookies', 'Preservative-Free'],
    fallbackEmoji: '🍪',
  },
  {
    id: 'b4',
    name: 'Homemade Chocolates',
    badge: 'GIFTING PICK',
    prices: [{ size: 'Custom Box', price: 'from ₹350' }],
    image: homemadeChocolatesImg,
    altText: 'Custom artisanal homemade chocolates box from GR Home Bakers Salem',
    description: 'Handcrafted artisanal chocolates made with rich cocoa for custom gifting and celebrations in Salem.',
    tags: ['Custom Boxes', 'Artisanal Chocolates', 'Gift Hampers Salem'],
    fallbackEmoji: '🍬',
  },
];

const mainMasalaProducts = [
  {
    id: 'm0',
    name: 'Idly Maavu & Batter Premix',
    icon: '🍚',
    badge: 'Min Order: 5 kg',
    slogan: 'Softest idlis & crispest dosas in Salem, ground fresh on order.',
    prices: [{ size: '5 kg', price: '₹780' }],
    image: idlyBatterImg,
    altText: 'Fresh homemade Idly Maavu batter freshly prepared in Salem',
    description:
      'Freshly ground traditional rice & urad dal batter in Salem, 100% natural without added preservatives for soft idlis.',
    fallbackEmoji: '🍚',
    minOrder: true,
  },
  {
    id: 'm00',
    name: 'Traditional Idiyappam Maavu',
    icon: '🌾',
    badge: '100% Natural',
    slogan: 'Soft, delicate & authentic homemade Idiyappam flour.',
    prices: [
      { size: '500g', price: '₹120' },
      { size: '1 kg', price: '₹230' },
    ],
    image: sathumaavuKanjiImg,
    altText: 'Authentic traditional Idiyappam Maavu flour prepared in Salem',
    description:
      'Premium steam-processed rice flour prepared specifically for soft, non-sticky traditional South Indian Idiyappam in Salem.',
    fallbackEmoji: '🌾',
  },
  {
    id: 'm1',
    name: 'Sambar Podi',
    icon: '🌶️',
    badge: '100% Natural',
    slogan: "One spoon, and it's Amma's kitchen again in Salem.",
    prices: [
      { size: '500g', price: '₹290' },
      { size: '1 kg', price: '₹580' },
    ],
    image: sambarPowderImg,
    altText: 'Authentic homemade Sambar Podi spice powder prepared in Salem',
    description:
      'Traditional homemade sambar podi prepared with hand-selected spices in Salem for rich aroma and authentic Tamil taste.',
    fallbackEmoji: '🌶️',
  },
  {
    id: 'm2',
    name: 'Kulambu Milagai Podi',
    icon: '🌶️',
    badge: '100% Natural',
    slogan: 'The secret behind every soul-warming kuzhambu in Tamil Nadu.',
    prices: [
      { size: '500g', price: '₹280' },
      { size: '1 kg', price: '₹560' },
    ],
    image: kulambuMilagaiPowderImg,
    altText: 'Traditional Tamil Kulambu Milagai Podi spice blend made in Salem',
    description:
      'Traditional Tamil-style curry spice powder crafted in Salem with hand-roasted chillies and coriander seeds.',
    fallbackEmoji: '🌶️',
  },
  {
    id: 'm3',
    name: 'Red Chilli Powder (Vara Milagai Podi)',
    icon: '🔥',
    badge: '100% Natural',
    slogan: 'Fiery, fragrant & stone-ground fresh in Salem.',
    prices: [
      { size: '500g', price: '₹280' },
      { size: '1 kg', price: '₹560' },
    ],
    image: redChilliPowderImg,
    altText: 'Pure stone ground red chilli powder vara milagai podi from Salem',
    description:
      'Aromatic dry red chilli spice blend made from premium chillies, stone-ground in Salem with balanced heat.',
    fallbackEmoji: '🔥',
  },
  {
    id: 'm4',
    name: 'Kothamalli Podi (Vara Kothamalli)',
    icon: '🌿',
    badge: '100% Natural',
    slogan: 'Fresh coriander magic, stone-ground for real flavor.',
    prices: [
      { size: '500g', price: '₹235' },
      { size: '1 kg', price: '₹560' },
    ],
    image: kothamalliPodiImg,
    altText: 'Fresh homemade Kothamalli Podi coriander spice powder in Salem',
    description:
      'Freshly prepared coriander-based spice powder milled in Salem for authentic rich aroma and traditional taste.',
    fallbackEmoji: '🌿',
  },
  {
    id: 'm5',
    name: 'Turmeric Powder',
    icon: '🟠',
    badge: '100% Natural',
    slogan: 'Pure gold from the earth, stone-ground in Salem for curcumin power.',
    prices: [
      { size: '250g', price: '₹95' },
      { size: '500g', price: '₹190' },
      { size: '1 kg', price: '₹365' },
    ],
    image: turmericPowderImg,
    altText: 'High curcumin stone ground turmeric powder made fresh in Salem',
    description:
      'High-curcumin turmeric, sun-dried and stone-ground in Salem for vibrant natural color and maximum health benefits.',
    fallbackEmoji: '🟠',
  },
  {
    id: 'm6',
    name: 'Black Pepper Powder',
    icon: '⚫',
    badge: '100% Natural',
    slogan: 'The king of spices, freshly cracked for real heat in Salem.',
    prices: [
      { size: '250g', price: '₹270' },
      { size: '500g', price: '₹530' },
    ],
    image: blackPepperPowderImg,
    altText: 'Freshly cracked pure black pepper powder prepared in Salem',
    description:
      'Sun-dried whole peppercorns stone-ground fresh on order in Salem for a sharp, fragrant bite.',
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
    altText: 'Natural stone ground white pepper powder made in Salem',
    description:
      'Milder and earthier than black pepper, perfect for white gravies, soups and mild South Indian dishes.',
    fallbackEmoji: '⚪',
  },
  {
    id: 'm8',
    name: 'Idly Podi (Gunpowder)',
    icon: '🍛',
    badge: '100% Natural',
    slogan: "Idli's best friend — nutty, spicy and stone-ground in Salem.",
    prices: [
      { size: '250g', price: '₹125' },
      { size: '500g', price: '₹240' },
      { size: '1 kg', price: '₹460' },
    ],
    image: idlyPowderImg,
    altText: 'Traditional homemade Idly Podi gunpowder made in Salem',
    description:
      'Classic lentil & chilli gunpowder blend, roasted and ground fresh in Salem — just add gingelly oil or ghee.',
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
    altText: 'Authentic South Indian Rasam Podi spice mix made in Salem',
    description:
      'Aromatic, digestion-friendly spice blend roasted the traditional way in Salem for authentic rasam.',
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
    altText: 'Healthy multi-grain Sathumaavu Kanji health mix made in Salem',
    description:
      'Wholesome multi-grain health mix, slow-roasted and stone-ground in Salem — cook with milk or water.',
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
    altText: 'Antioxidant rich Karuppu Kavuni black rice kanji mix made in Salem',
    description:
      'Stone-ground black kavuni rice premix made in Salem, naturally rich in antioxidants and deep flavor.',
    fallbackEmoji: '🥣',
  },
  {
    id: 'm12',
    name: 'Uluthan Kanji Mix',
    icon: '🥣',
    badge: '100% Natural',
    slogan: 'Protein-rich warmth, the way traditional home kitchens make it.',
    prices: [
      { size: '250g', price: '₹95' },
      { size: '500g', price: '₹185' },
    ],
    image: uluthanKanjiImg,
    altText: 'Traditional black gram Uluthan Kanji health premix made in Salem',
    description:
      'Traditional black gram (uluthan) health mix, rich in protein — roasted and ground fresh in Salem.',
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
    altText: 'Protein-rich multi grain dosa flour premix in Salem',
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
    altText: 'Temple-style Venpongal rice and lentil premix made in Salem',
    description:
      'Traditional rice & moong dal premix with cumin, pepper & ghee aroma ready for quick home cooking.',
    fallbackEmoji: '🍲',
  },
  {
    id: 'm15',
    name: 'Millet Pongal Premix',
    icon: '🌾',
    badge: 'Customisable',
    slogan: 'Healthy millet comfort, cooked in minutes in Salem.',
    prices: [{ size: '500g', price: 'Customisable' }],
    image: milletPongalPremixImg,
    altText: 'Nutritious millet pongal health mix made in Salem',
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
// HEADER COMPONENT
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
          aria-label="GR Home Bakers Salem - Back to top"
        >
          <img src={logoImg} alt="GR Home Bakers & Home Made Masala Salem Logo" className="logo-img" />
          <div className="brand-titles">
            <span className="brand-main">GR Home Bakers</span>
            <span className="brand-sub">&amp; HOME MADE MASALA · SALEM</span>
          </div>
        </motion.div>

        <nav className="desktop-nav" aria-label="Main Navigation">
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
            aria-label="Call or WhatsApp GR Home Bakers Salem"
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

      <main>
        {/* HERO SECTION */}
        <section className="hero-section">
          <FloatingParticles />
          <div className="hero-glow" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="pill-badge reveal-in">
                <Sparkles size={14} className="pill-icon" />
                <span>BEST HOME BAKERY &amp; MASALAS IN SALEM, TAMIL NADU</span>
              </div>

              <h1 className="hero-title">
                <SplitText
                  text="Homemade Bakes & Traditional Masalas in Salem"
                  highlightWords={['Bakes', 'Masalas', 'Salem']}
                  delay={100}
                />
              </h1>

              <p className="hero-description">
                Order freshly baked fudgy chocolate brownies, chewy blondies, and whole wheat cookies from{' '}
                <strong>GR Home Bakers in Salem</strong>. Discover pure stone-ground spice powders,
                fresh Idly Maavu (batter), traditional <strong>Idiyappam Maavu</strong>, and healthy kanji premixes made by{' '}
                <strong>GR Home Made Masala</strong>. Prepared fresh on order with pure ingredients and zero preservatives.
              </p>

              <div className="hero-buttons">
                <MagneticButton onClick={() => openWhatsApp('Fresh Order')} className="btn-primary">
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
                    <span>100% Fresh in Salem</span>
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
                    alt="Freshly baked chocolate brownie in Salem from GR Home Bakers"
                    className="hero-img"
                    fallbackEmoji="🎂"
                    fallbackLabel="GR Home Bakers Salem"
                    isHero={true}
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
                    <small>in Salem</small>
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
                  <span>Loved in Salem, TN</span>
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
        <div className="marquee-strip" aria-hidden="true">
          <div className="marquee-content">
            <span>HOMEMADE IN SALEM</span>
            <span>FRESHLY BAKED EVERYDAY</span>
            <span>FRESH IDLY MAAVU &amp; IDIYAPPAM MAAVU</span>
            <span>TRADITIONAL HOMEMADE MASALAS SALEM</span>
            <span>NO ADDED PRESERVATIVES</span>
            <span>CUSTOM CAKES &amp; GIFT BOXES</span>
            <span>DELIVERY CHARGES APPLICABLE BY WEIGHT</span>
            <span>HOMEMADE IN SALEM</span>
            <span>FRESHLY BAKED EVERYDAY</span>
          </div>
        </div>

        {/* BAKERY SECTION */}
        <section id="bakes" className="section-padding bakes-section">
          <ImageTrail images={TRAIL_IMAGES} className="container">
            <Reveal className="section-header text-center">
              <span className="brand-tag">GR HOME BAKERS SALEM</span>
              <h2 className="section-title">Fresh Homemade Bakery Products</h2>
              <p className="section-subtitle">
                Baked fresh on order in Salem with rich premium ingredients — available in both egg and
                eggless custom options.
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
                        alt={product.altText}
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
                        aria-label={`Order ${product.name} on WhatsApp`}
                      >
                        Order Fresh Brownies on WhatsApp <ChevronRight size={16} />
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
                  <span>SPECIAL GIFTING IN SALEM</span>
                </div>
                <h2 className="celebration-title">Made-to-Order Celebration Gift Boxes</h2>
                <p className="celebration-desc">
                  Order custom birthday brownies, blondie boxes, and artisanal chocolates in Salem.
                  Complete with personalized messages and festive gift packing. Share your event date on WhatsApp to book a fresh order.
                </p>
                <MagneticButton
                  onClick={() => openWhatsApp('Celebration Brownie Box Salem')}
                  className="btn-primary"
                >
                  <MessageCircle size={18} />
                  Pre-order a celebration box
                </MagneticButton>
              </div>

              <div className="celebration-right-grid">
                {[
                  { icon: Calendar, label: 'Birthday Cakes & Bakes' },
                  { icon: Sparkles, label: 'Festive Hampers' },
                  { icon: Gift, label: 'Return Gifts Salem' },
                  { icon: Star, label: 'Special Occasions' },
                ].map((box, i) => (
                  <Reveal delay={i * 80} key={box.label} className="feature-mini-box">
                    <box.icon className="box-icon" />
                    <h3>{box.label}</h3>
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
                    alt="Traditional homemade masala and spice powder in Salem"
                    className="masala-main-img"
                    fallbackEmoji="🌶️"
                    fallbackLabel="GR Home Made Masala Salem"
                  />
                  <div className="gold-stamp">
                    <span>100%</span>
                    <small>HOMEMADE</small>
                  </div>
                </TiltCard>
              </div>

              <div className="masala-content-column">
                <span className="brand-tag masala-tag">GR HOME MADE MASALA · SALEM</span>
                <h2 className="section-title masala-title">
                  <SplitText text="Traditional Homemade Masalas & Batter" delay={80} />
                </h2>
                <p className="section-subtitle masala-desc">
                  Fresh Idly Maavu (batter), authentic <strong>Idiyappam Maavu</strong>, stone-ground spice powders and traditional kanji premixes prepared in Salem — 
                  made in small hygienic batches without chemical additives, artificial colors, or preservatives.
                </p>

                <ul className="masala-benefits-list">
                  {[
                    '100% Natural, zero artificial preservatives or colors',
                    'Fresh Idly Maavu Batter in Salem (Min order: 5 kg — ₹780)',
                    'Traditional Idiyappam Maavu & stone-ground spice powders',
                    'Hygienically prepared in clean home kitchen in Salem',
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
                    onClick={() => openWhatsApp('Homemade Masala Salem Order')}
                    className="btn-gold"
                  >
                    Order Homemade Masalas
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
                  Authentic Tamil recipes ground fresh in Salem for healthy everyday meals.
                </p>
              </Reveal>

              {/* WEIGHT NOTICE BANNER */}
              <div className="weight-notice-banner">
                <Info size={18} className="notice-icon" />
                <span>
                  <strong>Note:</strong> Delivery charges are calculated based on total package weight for all orders from Salem.
                </span>
              </div>

              <div className="masala-grid">
                {mainMasalaProducts.map((masala, i) => (
                  <Reveal delay={(i % 4) * 80} key={masala.id} as="article">
                    <TiltCard className="masala-card">
                      <div className="masala-card-img-box">
                        <SafeImage
                          src={masala.image}
                          alt={masala.altText}
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
                          <h3 className="masala-card-title">{masala.name}</h3>
                        </div>
                        <p className="masala-card-slogan">"{masala.slogan}"</p>
                        <p className="masala-card-desc">{masala.description}</p>

                        <div className="price-tag-list masala-price-list">
                          {masala.prices.map((pTier) => (
                            <div key={pTier.size} className="price-pill masala-pill">
                              <span className="price-size">{pTier.size}</span>
                              <span className="price-val">{pTier.price}</span>
                            </div>
                          ))}
                        </div>

                        <div className="masala-purity-tags">
                          <span>✓ Stone-Ground in Salem</span>
                          <span>✓ Preservative Free</span>
                          <span>
                            {masala.minOrder ? '✓ Min Order: 5 kg' : '✓ Made Fresh'}
                          </span>
                        </div>

                        <button
                          onClick={() => openWhatsApp(`${masala.name} Salem`)}
                          className="masala-order-btn"
                          aria-label={`Order ${masala.name} on WhatsApp`}
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
                  <h2>Delivery Process &amp; Fast Orders in Salem</h2>
                  <p>
                    Every spice powder, batter, and bakery item is freshly prepared upon order in Salem to maintain high nutritional value, authentic aroma, and taste. Standard delivery charges apply based on total weight.
                  </p>
                </div>
              </div>

              <div className="delivery-steps-grid">
                {[
                  { num: '01', title: 'Order on WhatsApp', desc: 'Select your bakes or masala quantities and message us' },
                  { num: '02', title: 'Weight & Payment', desc: 'We calculate order weight and share exact doorstep delivery costs' },
                  { num: '03', title: 'Made Fresh in Salem', desc: 'Stone-ground and freshly baked in clean home kitchen' },
                  { num: '04', title: 'Prompt Delivery', desc: 'Hygienically packed and delivered within 7 days' },
                ].map((step, i) => (
                  <Reveal delay={i * 90} key={step.num} className="step-card">
                    <span className="step-num">{step.num}</span>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROMISE SECTION */}
        <section id="delivery" className="section-padding delivery-process-section">
          <div className="container text-center">
            <Reveal className="section-header">
              <span className="brand-tag">WHY CHOOSE US IN SALEM</span>
              <h2>Why Choose GR Home Bakers &amp; Home Made Masala</h2>
              <p className="section-subtitle">
                Homemade quality, pure ingredients, and zero shortcuts for Salem households.
              </p>
            </Reveal>

            <div className="process-grid">
              {[
                {
                  icon: MessageCircle,
                  title: '1. Easy Direct Booking',
                  desc: 'Send your choice or customized requirements directly through WhatsApp.',
                },
                {
                  icon: Flame,
                  title: '2. Fresh Small Batches',
                  desc: 'Prepared in Salem with natural ingredients following traditional family recipes.',
                },
                {
                  icon: Scale,
                  title: '3. Hygienic Packaging',
                  desc: 'Airtight packaging to lock in freshness, priced fairly by weight.',
                },
                {
                  icon: Truck,
                  title: '4. Reliable Salem Delivery',
                  desc: 'Local doorstep pickup/delivery across Salem, Tamil Nadu.',
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
              <h2>Order Homemade Products in Salem</h2>
              <p className="cta-text">
                Fresh bakes, Idly Maavu (batter min. 5 kg — ₹780), traditional Idiyappam Maavu, stone-ground masalas and kanji premixes made with love in Salem, Tamil Nadu.
              </p>
              <div className="cta-buttons">
                <MagneticButton
                  onClick={() => openWhatsApp('Order Homemade Products Salem')}
                  className="btn-primary btn-large"
                >
                  <MessageCircle size={20} />
                  Place Your Order Today
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
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <img src={logoImg} alt="GR Home Bakers Salem Logo" className="footer-logo-img" />
              <div>
                <h3 className="footer-brand-title">GR Home Bakers</h3>
                <span className="footer-brand-sub">GR Home Made Masala · Salem</span>
              </div>
            </div>
            <p className="footer-tagline">"Homemade with love, baked and ground for happiness in Salem."</p>
            <div className="fssai-pill">
              <ShieldCheck size={16} />
              <span>
                FSSAI Reg. No. <strong>224680000279</strong>
              </span>
            </div>
          </div>

          <div className="footer-col contact-col">
            <h3>Get in Touch</h3>
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
                <span>Salem, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>

          <div className="footer-col links-col">
            <h3>Quick Links</h3>
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
                <button onClick={() => openWhatsApp('Custom Order Salem')}>Custom Orders</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom text-center">
          <p>© 2026 GR Home Bakers &amp; Home Made Masala · Salem, Tamil Nadu · Delivery charges as per weight</p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <MagneticButton onClick={() => openWhatsApp()} className="floating-whatsapp" aria-label="Order on WhatsApp">
        <MessageCircle size={22} className="wa-floating-icon" />
        <span className="wa-floating-text">Order on WhatsApp</span>
      </MagneticButton>
    </div>
  );
}