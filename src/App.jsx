import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useRef } from 'react';
import { MessageCircle, Phone, Sparkles, ShieldCheck, Clock, Heart, Menu, X, ChevronRight, MapPin, Leaf, PackageCheck, Truck, CheckCircle2, Gift, Flame, Star, Calendar, Palette, Check, } from 'lucide-react';
import './App.css';
const InstagramIcon = ({ size = 16, className = '' }) => (_jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: className, "aria-hidden": "true", children: [_jsx("rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5" }), _jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }), _jsx("line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5" })] }));
const WHATSAPP_NUMBER = '919443524677';
const openWhatsApp = (productName = '') => {
    const message = productName
        ? `Hi GR Home Bakers, I would like to order ${productName}.`
        : `Hi GR Home Bakers, I would like to place an order.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
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
        }
        catch {
            return 'signature';
        }
    });
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        }
        catch {
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
        if (!node)
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
    return { ref, visible };
};
const Reveal = ({ children, delay = 0, className = '', as = 'div' }) => {
    const { ref, visible } = useScrollReveal();
    const Tag = as;
    return (_jsx(Tag, { ref: ref, className: `reveal ${visible ? 'reveal-in' : ''} ${className}`.trim(), style: { transitionDelay: `${delay}ms` }, children: children }));
};
const SafeImage = ({ src, alt, className = '', fallbackEmoji = '🌿', fallbackLabel, }) => {
    const [failed, setFailed] = useState(false);
    if (failed || !src) {
        return (_jsxs("div", { className: `${className} img-fallback`, role: "img", "aria-label": alt, children: [_jsx("span", { className: "img-fallback-emoji", children: fallbackEmoji }), fallbackLabel && _jsx("span", { className: "img-fallback-label", children: fallbackLabel })] }));
    }
    return (_jsx("img", { src: src, alt: alt, className: className, loading: "lazy", onError: () => setFailed(true) }));
};
const ThemeSwitcher = ({ theme, setTheme, variant = 'header' }) => {
    const [open, setOpen] = useState(false);
    const handlePick = useCallback((id) => {
        setTheme(id);
        setOpen(false);
    }, [setTheme]);
    if (variant === 'inline') {
        return (_jsx("div", { className: "theme-inline-group", role: "group", "aria-label": "Choose a colour theme", children: THEMES.map((t) => (_jsxs("button", { className: `theme-swatch-btn ${theme === t.id ? 'is-active' : ''}`, style: { ['--swatch-color']: t.swatch }, onClick: () => handlePick(t.id), "aria-pressed": theme === t.id, children: [_jsx("span", { className: "theme-swatch-dot" }), _jsxs("span", { className: "theme-swatch-text", children: [_jsx("strong", { children: t.label }), _jsx("small", { children: t.description })] }), theme === t.id && _jsx(Check, { size: 16, className: "theme-swatch-check" })] }, t.id))) }));
    }
    const activeSwatch = THEMES.find((t) => t.id === theme)?.swatch;
    return (_jsxs("div", { className: "theme-switcher desktop-only", children: [_jsxs("button", { className: "theme-trigger-btn", onClick: () => setOpen((o) => !o), "aria-label": "Change colour theme", "aria-expanded": open, children: [_jsx(Palette, { size: 16 }), _jsx("span", { className: "theme-trigger-dot", style: { ['--swatch-color']: activeSwatch } })] }), open && (_jsxs(_Fragment, { children: [_jsx("div", { className: "theme-dropdown-backdrop", onClick: () => setOpen(false) }), _jsxs("div", { className: "theme-dropdown", children: [_jsx("span", { className: "theme-dropdown-title", children: "Choose a theme" }), THEMES.map((t) => (_jsxs("button", { className: `theme-option ${theme === t.id ? 'is-active' : ''}`, style: { ['--swatch-color']: t.swatch }, onClick: () => handlePick(t.id), children: [_jsx("span", { className: "theme-swatch-dot" }), _jsxs("span", { className: "theme-swatch-text", children: [_jsx("strong", { children: t.label }), _jsx("small", { children: t.description })] }), theme === t.id && _jsx(Check, { size: 15 })] }, t.id)))] })] }))] }));
};
// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------
const bakeryProducts = [
    {
        id: 'b1',
        name: 'Dark Chocolate Brownie',
        badge: 'BESTSELLER',
        image: 'https://images.pexels.com/photos/6390689/pexels-photo-6390689.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Rich, moist & fudgy — loaded with real dark chocolate and baked fresh to order.',
        tags: ['Fudgy', 'Egg & Eggless Options', 'Pure Chocolate'],
        fallbackEmoji: '🍫',
    },
    {
        id: 'b2',
        name: 'White Chocolate Blondies',
        badge: 'CROWD FAVOURITE',
        image: 'https://images.pexels.com/photos/29207376/pexels-photo-29207376.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Soft, chewy & perfectly sweet with rich white choco chunks baked into every bite.',
        tags: ['Chewy', 'Vanilla & Butter', 'Melt-in-mouth'],
        fallbackEmoji: '🍪',
    },
    {
        id: 'b3',
        name: 'Wheat Choco Chip Cookies',
        badge: 'KIDS LOVE IT',
        image: 'https://images.pexels.com/photos/27355747/pexels-photo-27355747.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Healthy & tasty whole wheat cookies packed generously with premium dark choco chips.',
        tags: ['Whole Wheat', 'Crunchy', 'Preservative-Free'],
        fallbackEmoji: '🍪',
    },
    {
        id: 'b4',
        name: 'Homemade Chocolates',
        badge: 'GIFTING PICK',
        image: 'https://images.pexels.com/photos/7407236/pexels-photo-7407236.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Handcrafted artisanal chocolates made with the finest cocoa for pure chocolate delight.',
        tags: ['Custom Boxes', 'Artisanal', 'Perfect Gift'],
        fallbackEmoji: '🍬',
    },
];
const mainMasalaProducts = [
    {
        id: 'm0',
        name: 'Idly Maavu (Idly Batter)',
        icon: '🍚',
        badge: 'Min Order: 5 kg',
        slogan: 'Softest idlis & crispest dosas, freshly ground on order.',
        image: 'https://images.pexels.com/photos/20422126/pexels-photo-20422126.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Freshly ground traditional rice & urad dal batter, naturally fermented without added preservatives. Perfect for soft fluffy idlis and crisp golden dosas.',
        fallbackEmoji: '🍚',
        minOrder: true,
    },
    {
        id: 'm1',
        name: 'Sambar Podi',
        icon: '🌶️',
        badge: '100% Natural',
        slogan: "One spoon, and it's Amma's kitchen again.",
        image: 'https://images.pexels.com/photos/30203310/pexels-photo-30203310.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Traditional homemade sambar powder prepared with carefully selected spices for rich aroma and authentic South Indian flavour.',
        fallbackEmoji: '🌶️',
    },
    {
        id: 'm2',
        name: 'Kulambu Milagai Podi',
        icon: '🌶️',
        badge: '100% Natural',
        slogan: 'The secret behind every soul-warming kuzhambu.',
        image: 'https://images.pexels.com/photos/30203312/pexels-photo-30203312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'A traditional Tamil-style spice blend for flavourful kuzhambu, made with carefully hand-roasted spices.',
        fallbackEmoji: '🌶️',
    },
    {
        id: 'm3',
        name: 'Vara Milagai Podi',
        icon: '🔥',
        badge: '100% Natural',
        slogan: 'Fiery, fragrant & fried-rice ready.',
        image: 'https://images.pexels.com/photos/33440713/pexels-photo-33440713.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Aromatic dry chilli spice blend with the perfect balance of heat and traditional stone-ground flavour.',
        fallbackEmoji: '🔥',
    },
    {
        id: 'm4',
        name: 'Vara Kothamalli Podi',
        icon: '🌿',
        badge: '100% Natural',
        slogan: 'Fresh coriander magic, stone-ground for real flavour.',
        image: 'https://images.pexels.com/photos/14430641/pexels-photo-14430641.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Freshly prepared coriander-based spice powder with rich aroma and authentic homemade taste.',
        fallbackEmoji: '🌿',
    },
    {
        id: 'm5',
        name: 'Turmeric Powder',
        icon: '🟠',
        badge: '100% Natural',
        slogan: 'Pure gold from the earth, stone-ground for real curcumin power.',
        image: 'https://images.pexels.com/photos/2633406/pexels-photo-2633406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'High-curcumin turmeric, sun-dried and stone-ground the traditional way for colour, aroma and everyday wellness.',
        fallbackEmoji: '🟠',
    },
    {
        id: 'm6',
        name: 'Black Pepper Powder',
        icon: '⚫',
        badge: '100% Natural',
        slogan: 'The king of spices, freshly cracked for real heat.',
        image: 'https://images.pexels.com/photos/7829483/pexels-photo-7829483.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Sun-dried whole peppercorns, stone-ground fresh on order for a sharper, more fragrant bite than store-bought powder.',
        fallbackEmoji: '⚫',
    },
    {
        id: 'm7',
        name: 'White Pepper Powder',
        icon: '⚪',
        badge: '100% Natural',
        slogan: 'Subtle heat, refined for delicate dishes.',
        image: 'https://images.pexels.com/photos/7956502/pexels-photo-7956502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Milder and earthier than black pepper, perfect for light gravies, soups and dishes that need warmth without overpowering heat.',
        fallbackEmoji: '⚪',
    },
    {
        id: 'm8',
        name: 'Idly Podi',
        icon: '🍛',
        badge: '100% Natural',
        slogan: "Idli's best friend — nutty, spicy and stone-ground perfect.",
        image: 'https://images.pexels.com/photos/30203314/pexels-photo-30203314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'A classic lentil & chilli gunpowder blend, roasted and ground fresh — just mix with sesame oil for the ultimate idli or dosa side.',
        fallbackEmoji: '🍛',
    },
    {
        id: 'm9',
        name: 'Rasam Podi',
        icon: '🍲',
        badge: '100% Natural',
        slogan: 'A pinch of comfort in every hot bowl of rasam.',
        image: 'https://images.pexels.com/photos/8743923/pexels-photo-8743923.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Aromatic, digestion-friendly spice blend roasted the traditional way — the base of every good South Indian rasam.',
        fallbackEmoji: '🍲',
    },
    {
        id: 'm10',
        name: 'Sathumaavu Kanji Premix',
        icon: '🥣',
        badge: '100% Natural',
        slogan: 'Multi-grain goodness, spooned straight from tradition.',
        image: 'https://images.pexels.com/photos/101669/pexels-photo-101669.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'A wholesome multi-grain health mix, slow-roasted and stone-ground — just cook with milk or water for a nourishing everyday kanji.',
        fallbackEmoji: '🥣',
    },
    {
        id: 'm11',
        name: 'Uluthan Kanji Premix',
        icon: '🥣',
        badge: '100% Natural',
        slogan: 'Protein-rich warmth, the way ammachi made it.',
        image: 'https://images.pexels.com/photos/13882288/pexels-photo-13882288.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'A traditional black gram (uluthan) premix, rich in protein — roasted and ground fresh for a hearty, warming kanji.',
        fallbackEmoji: '🥣',
    },
    {
        id: 'm12',
        name: 'Karuppu Kavuni Kanji Mix',
        icon: '🥣',
        badge: '100% Natural',
        slogan: 'Black rice richness, antioxidant-packed and earthy.',
        image: 'https://images.pexels.com/photos/24206916/pexels-photo-24206916.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        description: 'Stone-ground black kavuni rice premix, naturally rich in antioxidants — a nutritious, deeply flavourful traditional kanji.',
        fallbackEmoji: '🥣',
    },
];
const HERO_IMAGE = 'https://images.pexels.com/photos/33312981/pexels-photo-33312981.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200';
const MASALA_INTRO_IMAGE = 'https://images.pexels.com/photos/31280796/pexels-photo-31280796.jpeg?auto=compress&cs=tinysrgb&h=900&w=1000';
// ---------------------------------------------------------------------------
// HEADER
// ---------------------------------------------------------------------------
const NAV_ITEMS = [
    { id: 'bakes', label: 'Bakes' },
    { id: 'masala', label: 'Masala & Maavu' },
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
    return (_jsxs("header", { className: `header-sticky ${scrolled ? 'is-scrolled' : ''}`, children: [_jsxs("div", { className: "header-inner container", children: [_jsxs("div", { className: "logo-brand", onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }), role: "button", tabIndex: 0, "aria-label": "Back to top", children: [_jsx("div", { className: "logo-badge", children: _jsx("span", { children: "GR" }) }), _jsxs("div", { className: "brand-titles", children: [_jsx("span", { className: "brand-main", children: "GR Home Bakers" }), _jsx("span", { className: "brand-sub", children: "& HOME MADE MASALA" })] })] }), _jsx("nav", { className: "desktop-nav", "aria-label": "Primary", children: NAV_ITEMS.map((item) => (_jsx("button", { onClick: () => handleNav(item.id), className: "nav-link", children: item.label }, item.id))) }), _jsxs("div", { className: "header-actions", children: [_jsx(ThemeSwitcher, { theme: theme, setTheme: setTheme }), _jsxs("button", { onClick: () => openWhatsApp(), className: "phone-btn desktop-only", "aria-label": "Call or WhatsApp us", children: [_jsx(Phone, { className: "btn-icon-sm" }), _jsx("span", { children: "9443524677" })] }), _jsx("button", { className: "mobile-menu-toggle", onClick: () => setMobileMenuOpen((o) => !o), "aria-label": "Toggle navigation menu", "aria-expanded": mobileMenuOpen, children: mobileMenuOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) })] })] }), mobileMenuOpen && (_jsxs("div", { className: "mobile-nav-drawer", children: [NAV_ITEMS.map((item) => (_jsxs("button", { onClick: () => handleNav(item.id), className: "mobile-nav-link", children: [item.label, _jsx(ChevronRight, { size: 16, className: "mobile-nav-chevron" })] }, item.id))), _jsxs("div", { className: "mobile-theme-block", children: [_jsxs("span", { className: "mobile-theme-label", children: [_jsx(Palette, { size: 15 }), " Theme"] }), _jsx(ThemeSwitcher, { theme: theme, setTheme: setTheme, variant: "inline" })] }), _jsxs("button", { onClick: () => { setMobileMenuOpen(false); openWhatsApp(); }, className: "whatsapp-btn-full", children: [_jsx(MessageCircle, { className: "btn-icon" }), "WhatsApp: 9443524677"] })] }))] }));
};
// ---------------------------------------------------------------------------
// APP
// ---------------------------------------------------------------------------
export default function App() {
    const [theme, setTheme] = useTheme();
    const scrollToSection = useCallback((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);
    return (_jsxs("div", { className: "app-container", children: [_jsx(Header, { theme: theme, setTheme: setTheme, scrollToSection: scrollToSection }), _jsxs("section", { className: "hero-section", children: [_jsx("div", { className: "hero-glow", "aria-hidden": "true" }), _jsxs("div", { className: "container hero-grid", children: [_jsxs("div", { className: "hero-content", children: [_jsxs("div", { className: "pill-badge reveal-in", children: [_jsx(Sparkles, { size: 14, className: "pill-icon" }), _jsx("span", { children: "2 BRANDS \u00B7 1 KITCHEN \u00B7 SALEM" })] }), _jsxs("h1", { className: "hero-title", children: ["Taste the love in ", _jsx("br", {}), _jsx("span", { className: "text-highlight", children: "every bite" }), " \u2014 and ", _jsx("br", {}), _jsx("span", { className: "text-highlight-pink", children: "every spoonful." })] }), _jsxs("p", { className: "hero-description", children: ["Fudgy brownies, chewy blondies and wheat cookies from ", _jsx("strong", { children: "GR Home Bakers" }), ", plus fresh Idly Maavu (batter), pure stone-ground powders and traditional kanji premixes from ", _jsx("strong", { children: "GR Home Made Masala" }), ". Homemade with love, prepared for happiness."] }), _jsxs("div", { className: "hero-buttons", children: [_jsxs("button", { onClick: () => openWhatsApp(), className: "btn-primary", children: [_jsx(MessageCircle, { size: 18 }), "Order on WhatsApp"] }), _jsx("button", { onClick: () => scrollToSection('masala'), className: "btn-secondary", children: "Shop masala & batter" })] }), _jsxs("div", { className: "hero-trust-grid", children: [_jsxs("div", { className: "trust-card", children: [_jsx(Clock, { className: "trust-icon" }), _jsxs("div", { className: "trust-text", children: [_jsx("strong", { children: "Within 7 days" }), _jsx("span", { children: "Powder delivery" })] })] }), _jsxs("div", { className: "trust-card", children: [_jsx(Heart, { className: "trust-icon" }), _jsxs("div", { className: "trust-text", children: [_jsx("strong", { children: "Made on order" }), _jsx("span", { children: "Always fresh" })] })] }), _jsxs("div", { className: "trust-card", children: [_jsx(ShieldCheck, { className: "trust-icon" }), _jsxs("div", { className: "trust-text", children: [_jsx("strong", { children: "FSSAI registered" }), _jsx("span", { children: "Hygienic kitchen" })] })] })] })] }), _jsx("div", { className: "hero-visual", children: _jsxs("div", { className: "hero-image-wrapper", children: [_jsx("div", { className: "hero-image-frame", children: _jsx(SafeImage, { src: HERO_IMAGE, alt: "Freshly baked chocolate brownie drizzled with love", className: "hero-img", fallbackEmoji: "\uD83C\uDF70", fallbackLabel: "GR Home Bakers" }) }), _jsx("div", { className: "hero-floating-badge", children: _jsxs("div", { className: "hero-float-inner", children: [_jsx(Heart, { size: 16 }), _jsx("span", { children: "Baked fresh" }), _jsx("small", { children: "on order" })] }) }), _jsxs("div", { className: "hero-floating-rating", children: [_jsxs("div", { className: "rating-stars", children: [_jsx(Star, { size: 14, className: "star-filled" }), _jsx(Star, { size: 14, className: "star-filled" }), _jsx(Star, { size: 14, className: "star-filled" }), _jsx(Star, { size: 14, className: "star-filled" }), _jsx(Star, { size: 14, className: "star-filled" })] }), _jsx("span", { children: "Loved in Salem" })] })] }) })] }), _jsx("div", { className: "hero-wave", "aria-hidden": "true", children: _jsx("svg", { viewBox: "0 0 1440 100", preserveAspectRatio: "none", children: _jsx("path", { d: "M0,60 C240,100 480,20 720,50 C960,80 1200,30 1440,60 L1440,100 L0,100 Z", fill: "currentColor" }) }) })] }), _jsx("div", { className: "marquee-strip", children: _jsxs("div", { className: "marquee-content", children: [_jsx("span", { children: "WITH LOVE" }), _jsx("span", { children: "FRESHLY BAKED EVERYDAY" }), _jsx("span", { children: "FRESH IDLY MAAVU (MIN 5KG)" }), _jsx("span", { children: "EGG & EGGLESS OPTIONS" }), _jsx("span", { children: "NO PRESERVATIVES" }), _jsx("span", { children: "PRE-ORDERS TAKEN" }), _jsx("span", { children: "POWDERS DELIVERED WITHIN 7 DAYS" }), _jsx("span", { children: "WITH LOVE" }), _jsx("span", { children: "FRESHLY BAKED EVERYDAY" }), _jsx("span", { children: "FRESH IDLY MAAVU (MIN 5KG)" }), _jsx("span", { children: "EGG & EGGLESS OPTIONS" }), _jsx("span", { children: "NO PRESERVATIVES" }), _jsx("span", { children: "PRE-ORDERS TAKEN" })] }) }), _jsx("section", { id: "bakes", className: "section-padding bakes-section", children: _jsxs("div", { className: "container", children: [_jsxs(Reveal, { className: "section-header text-center", children: [_jsx("span", { className: "brand-tag", children: "GR HOME BAKERS" }), _jsx("h2", { className: "section-title", children: "Our specialties" }), _jsx("p", { className: "section-subtitle", children: "Baked fresh on order with premium ingredients \u2014 available in both egg and eggless options." })] }), _jsx("div", { className: "products-grid", children: bakeryProducts.map((product, i) => (_jsxs(Reveal, { delay: i * 90, as: "article", className: "product-card", children: [_jsxs("div", { className: "card-image-box", children: [_jsx("span", { className: "product-badge", children: product.badge }), _jsx(SafeImage, { src: product.image, alt: product.name, className: "product-img", fallbackEmoji: product.fallbackEmoji }), _jsx("div", { className: "card-image-overlay" })] }), _jsxs("div", { className: "card-content", children: [_jsx("h3", { className: "card-title", children: product.name }), _jsx("p", { className: "card-desc", children: product.description }), _jsx("div", { className: "tag-list", children: product.tags?.map((t) => (_jsx("span", { className: "mini-tag", children: t }, t))) }), _jsxs("button", { onClick: () => openWhatsApp(product.name), className: "card-cta-btn", children: ["Order this ", _jsx(ChevronRight, { size: 16 })] })] })] }, product.id))) })] }) }), _jsx("section", { className: "section-padding celebration-section", children: _jsx("div", { className: "container", children: _jsxs(Reveal, { className: "celebration-card", children: [_jsxs("div", { className: "celebration-left", children: [_jsxs("div", { className: "pill-badge gold-pill", children: [_jsx(Gift, { size: 14 }), _jsx("span", { children: "SPECIAL GIFTING" })] }), _jsx("h2", { className: "celebration-title", children: "Birthday brownie & blondie boxes" }), _jsx("p", { className: "celebration-desc", children: "Custom message on top, party-ready packing and gift wrapping. Pre-orders taken \u2014 share the date on WhatsApp and we bake it fresh for you." }), _jsxs("button", { onClick: () => openWhatsApp('Celebration Brownie Box'), className: "btn-primary", children: [_jsx(MessageCircle, { size: 18 }), "Pre-order a celebration box"] })] }), _jsx("div", { className: "celebration-right-grid", children: [
                                    { icon: Calendar, label: 'Birthdays' },
                                    { icon: Sparkles, label: 'Celebrations' },
                                    { icon: Gift, label: 'Return gifts' },
                                    { icon: Star, label: 'Special occasions' },
                                ].map((box, i) => (_jsxs(Reveal, { delay: i * 80, className: "feature-mini-box", children: [_jsx(box.icon, { className: "box-icon" }), _jsx("h4", { children: box.label })] }, box.label))) })] }) }) }), _jsx("section", { id: "masala", className: "section-padding masala-hero-section", children: _jsxs("div", { className: "container", children: [_jsxs(Reveal, { className: "masala-intro-grid", children: [_jsx("div", { className: "masala-img-column", children: _jsxs("div", { className: "masala-img-wrapper", children: [_jsx(SafeImage, { src: MASALA_INTRO_IMAGE, alt: "Traditional South Indian spices and masalas", className: "masala-main-img", fallbackEmoji: "\uD83C\uDF36\uFE0F", fallbackLabel: "GR Home Made Masala" }), _jsxs("div", { className: "gold-stamp", children: [_jsx("span", { children: "100%" }), _jsx("small", { children: "HOMEMADE" })] })] }) }), _jsxs("div", { className: "masala-content-column", children: [_jsx("span", { className: "brand-tag masala-tag", children: "GR HOME MADE MASALA" }), _jsx("h2", { className: "section-title masala-title", children: "Pure \u00B7 Natural \u00B7 Homemade" }), _jsx("p", { className: "section-subtitle masala-desc", children: "Fresh Idly Maavu (batter), traditional powders and kanji premixes made in small batches, exactly the way our grandmothers made them \u2014 no preservatives, no colours, no shortcuts." }), _jsxs("ul", { className: "masala-benefits-list", children: [_jsxs("li", { children: [_jsx(CheckCircle2, { className: "benefit-icon" }), " No preservatives or chemicals"] }), _jsxs("li", { children: [_jsx(CheckCircle2, { className: "benefit-icon" }), " Fresh Idly Maavu / Batter (Min order: 5 kg)"] }), _jsxs("li", { children: [_jsx(CheckCircle2, { className: "benefit-icon" }), " Hygienically prepared in clean home kitchen"] }), _jsxs("li", { children: [_jsx(CheckCircle2, { className: "benefit-icon" }), " Authentic Tamil Nadu traditional taste & quality"] })] }), _jsxs("div", { className: "masala-cta-group", children: [_jsx("button", { onClick: () => openWhatsApp('Masala Order'), className: "btn-gold", children: "Pre-order products" }), _jsxs("div", { className: "delivery-badge-pill", children: [_jsx(Truck, { size: 16 }), _jsx("span", { children: "DELIVERED WITHIN 7 DAYS" })] })] })] })] }), _jsxs("div", { className: "masala-products-wrapper", children: [_jsxs(Reveal, { className: "section-header text-center", children: [_jsx("h3", { className: "sub-section-title", children: "Fresh Batter, Spices & Kanji Premixes" }), _jsx("p", { className: "section-subtitle", children: "Freshly prepared and stone-ground traditional recipes for authentic everyday meals." })] }), _jsx("div", { className: "masala-grid", children: mainMasalaProducts.map((masala, i) => (_jsxs(Reveal, { delay: (i % 4) * 80, as: "article", className: "masala-card", children: [_jsxs("div", { className: "masala-card-img-box", children: [_jsx(SafeImage, { src: masala.image, alt: masala.name, className: "masala-img", fallbackEmoji: masala.fallbackEmoji }), _jsxs("span", { className: "nature-badge", children: [_jsx(Leaf, { size: 12 }), " ", masala.badge] }), _jsx("div", { className: "masala-card-overlay" })] }), _jsxs("div", { className: "masala-card-body", children: [_jsxs("div", { className: "masala-header-row", children: [_jsx("span", { className: "masala-emoji", children: masala.icon }), _jsx("h4", { className: "masala-card-title", children: masala.name })] }), _jsxs("p", { className: "masala-card-slogan", children: ["\"", masala.slogan, "\""] }), _jsx("p", { className: "masala-card-desc", children: masala.description }), _jsxs("div", { className: "masala-purity-tags", children: [_jsx("span", { children: "\u2713 100% Natural" }), _jsx("span", { children: "\u2713 No Added Preservatives" }), _jsx("span", { children: masala.minOrder ? '✓ Min Order: 5 kg' : '✓ Homemade' })] }), _jsxs("button", { onClick: () => openWhatsApp(masala.name), className: "masala-order-btn", children: [_jsx(MessageCircle, { size: 16 }), "Order on WhatsApp"] })] })] }, masala.id))) })] })] }) }), _jsx("section", { className: "section-padding delivery-info-section", children: _jsx("div", { className: "container", children: _jsxs(Reveal, { className: "delivery-info-card", children: [_jsxs("div", { className: "delivery-header", children: [_jsxs("div", { className: "days-badge-circle", children: [_jsx("span", { children: "7" }), _jsx("small", { children: "DAYS" })] }), _jsxs("div", { className: "delivery-title-area", children: [_jsx("h2", { children: "Order any powder or batter \u2014 delivered within 7 days" }), _jsx("p", { children: "We prepare fresh batches upon order to maintain maximum aroma, softness & nutritional value." })] })] }), _jsx("div", { className: "delivery-steps-grid", children: [
                                    { num: '01', title: 'Message us', desc: 'Send your requirement on WhatsApp' },
                                    { num: '02', title: 'Pay & confirm', desc: 'Confirm your order easily' },
                                    { num: '03', title: 'Packed hygienically', desc: 'Freshly prepared and packed' },
                                    { num: '04', title: 'Delivered in 7 days', desc: 'Reliable delivery to your doorstep' },
                                ].map((step, i) => (_jsxs(Reveal, { delay: i * 90, className: "step-card", children: [_jsx("span", { className: "step-num", children: step.num }), _jsx("h4", { children: step.title }), _jsx("p", { children: step.desc })] }, step.num))) })] }) }) }), _jsx("section", { id: "delivery", className: "section-padding delivery-process-section", children: _jsxs("div", { className: "container text-center", children: [_jsxs(Reveal, { className: "section-header", children: [_jsx("span", { className: "brand-tag", children: "OUR PROMISE" }), _jsx("h2", { className: "section-title", children: "Freshly made. Carefully packed. Delivered with love." }), _jsx("p", { className: "section-subtitle", children: "How we get delicious bakes, idly batter and aromatic masalas to your kitchen." })] }), _jsx("div", { className: "process-grid", children: [
                                { icon: MessageCircle, title: '1. Order', desc: 'Send your choice or requirements directly to our WhatsApp number.' },
                                { icon: Flame, title: '2. Prepare', desc: 'Made fresh in small batches using wholesome traditional recipes.' },
                                { icon: PackageCheck, title: '3. Pack', desc: 'Hygienically packed with care in party-ready or sturdy boxes.' },
                                { icon: Truck, title: '4. Deliver', desc: 'Prompt local pickup/delivery & powder/batter delivery within 7 days.' },
                            ].map((step, i) => (_jsxs(Reveal, { delay: i * 100, className: "process-step", children: [_jsx("div", { className: "icon-circle", children: _jsx(step.icon, { size: 24 }) }), _jsx("h3", { children: step.title }), _jsx("p", { children: step.desc })] }, step.title))) })] }) }), _jsx("section", { id: "order", className: "section-padding cta-section", children: _jsx("div", { className: "container text-center", children: _jsxs(Reveal, { className: "cta-box", children: [_jsx("div", { className: "cta-glow", "aria-hidden": "true" }), _jsx("h2", { className: "cta-title", children: "Ready to taste homemade goodness?" }), _jsx("p", { className: "cta-text", children: "Fresh bakes, Idly Maavu (batter min. 5 kg), traditional masalas and homemade flavours \u2014 made especially for you." }), _jsxs("div", { className: "cta-buttons", children: [_jsxs("button", { onClick: () => openWhatsApp(), className: "btn-primary btn-large", children: [_jsx(MessageCircle, { size: 20 }), "Order on WhatsApp"] }), _jsx("button", { onClick: () => scrollToSection('masala'), className: "btn-secondary-light btn-large", children: "Explore Masala & Batter" })] })] }) }) }), _jsxs("footer", { className: "footer", children: [_jsxs("div", { className: "container footer-grid", children: [_jsxs("div", { className: "footer-col brand-col", children: [_jsxs("div", { className: "footer-logo", children: [_jsx("div", { className: "logo-badge", children: "GR" }), _jsxs("div", { children: [_jsx("h3", { className: "footer-brand-title", children: "GR Home Bakers" }), _jsx("span", { className: "footer-brand-sub", children: "GR Home Made Masala" })] })] }), _jsx("p", { className: "footer-tagline", children: "\"Homemade with love, baked for happiness.\"" }), _jsxs("div", { className: "fssai-pill", children: [_jsx(ShieldCheck, { size: 16 }), _jsxs("span", { children: ["FSSAI Reg. No. ", _jsx("strong", { children: "224680000279" })] })] })] }), _jsxs("div", { className: "footer-col contact-col", children: [_jsx("h4", { children: "Get in Touch" }), _jsxs("ul", { className: "footer-contacts", children: [_jsxs("li", { children: [_jsx(Phone, { size: 16, className: "contact-icon" }), _jsx("a", { href: "tel:9443524677", children: "9443524677" }), " (WhatsApp orders)"] }), _jsxs("li", { children: [_jsx(InstagramIcon, { size: 16, className: "contact-icon" }), _jsx("a", { href: "https://instagram.com/gr_home_bakers", target: "_blank", rel: "noopener noreferrer", children: "@gr_home_bakers" })] }), _jsxs("li", { children: [_jsx(MapPin, { size: 16, className: "contact-icon" }), _jsx("span", { children: "Salem, Tamil Nadu" })] })] })] }), _jsxs("div", { className: "footer-col links-col", children: [_jsx("h4", { children: "Quick Links" }), _jsxs("ul", { className: "footer-links", children: [_jsx("li", { children: _jsx("button", { onClick: () => scrollToSection('bakes'), children: "Fresh Bakery Specials" }) }), _jsx("li", { children: _jsx("button", { onClick: () => scrollToSection('masala'), children: "Stone-Ground Masala & Batter" }) }), _jsx("li", { children: _jsx("button", { onClick: () => scrollToSection('delivery'), children: "Delivery Process" }) }), _jsx("li", { children: _jsx("button", { onClick: () => openWhatsApp(), children: "Custom Orders" }) })] })] })] }), _jsx("div", { className: "footer-bottom text-center", children: _jsx("p", { children: "\u00A9 2026 GR Home Bakers & Home Made Masala \u00B7 Salem, Tamil Nadu" }) })] }), _jsxs("button", { className: "floating-whatsapp", onClick: () => openWhatsApp(), "aria-label": "Chat on WhatsApp", children: [_jsx(MessageCircle, { size: 22, className: "wa-floating-icon" }), _jsx("span", { className: "wa-floating-text", children: "Order on WhatsApp" })] })] }));
}
