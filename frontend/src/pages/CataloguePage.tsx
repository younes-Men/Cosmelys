import React, { useState, useEffect, useRef } from 'react';
import { GAMMES_DATA } from '../data/catalogData';
import type { ProductItem, GammeItem } from '../data/catalogData';
import { ProductDetailModal } from '../components/ProductDetailModal';
import {
  Eye,
  FileText,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Layers,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

interface CataloguePageProps {
  onSelectForDevis: (product: ProductItem) => void;
  onGoToDevis: () => void;
  selectedGammeId?: string;
  onSelectGamme?: (id: string) => void;
}

const SLIDES = [
  {
    id: 1,
    title: "Laboratoire de Formulation & Façonnage Cosmétique",
    subtitle: "Création de marques Private Label sur-mesure",
    desc: "De la recherche en laboratoire jusqu'au flaconnage final. Formulations nobles enrichies en actifs purs, prêtes à commercialiser dès 50 pièces.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    title: "Formulations Avancées & R&D Cosmétique",
    subtitle: "Sérums purs titrés · Soins régénérants · Actifs botaniques",
    desc: "Textures sensorielles haut de gamme élaborées par nos formulateurs chimistes, garanties stables, sécurisées et testées sous contrôle strict.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    title: "Flaconnages d'Exception & Ligne Sur-Mesure",
    subtitle: "Packaging luxe, sérigraphie personnalisée & dossier DIP",
    desc: "Flacons verre ambré, pots double paroi et étiquetage soigné pour donner à votre marque une identité visuelle digne des plus grands salons.",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=1920&q=80",
  },
];

export const CataloguePage: React.FC<CataloguePageProps> = ({
  onSelectForDevis,
  onGoToDevis,
  selectedGammeId = 'all',
  onSelectGamme,
}) => {
  const [modalProduct, setModalProduct] = useState<ProductItem | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Slider State (Auto-slides automatically every 4 seconds)
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (selectedGammeId !== 'all') return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedGammeId]);

  // Scroll to top when gamme changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedGammeId]);

  // Window scroll for floating Scroll-to-Top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 280);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToFirstGamme = () => {
    const firstGamme = document.getElementById('gamme-cheveux');
    if (firstGamme) {
      const navbarHeight = 85;
      const breathingSpace = 25; // Marge confortable au-dessus du titre
      const targetY = firstGamme.getBoundingClientRect().top + window.pageYOffset - (navbarHeight + breathingSpace);
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  };

  const handleBackToAll = () => {
    if (onSelectGamme) {
      onSelectGamme('all');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find targeted single gamme if user selected one
  const isSingleGammeView = selectedGammeId !== 'all';
  const singleGamme = GAMMES_DATA.find((g) => g.id === selectedGammeId);

  return (
    <div className="w-full bg-[#FAF7F4] min-h-screen pb-28">

      {/* ══════════════════════════════════════════════════════════════
          MODE 1: VUE GAMME UNIQUE SÉLECTIONNÉE (DEPUIS LA NAVBAR)
          Affiche TOUS les produits de cette gamme en grille complète
          (Ligne sous ligne - Star taht star - Pleine largeur d'écran)
      ══════════════════════════════════════════════════════════════ */}
      {isSingleGammeView && singleGamme ? (
        <div className="w-full animate-hero-left">
          {/* Header Dédié de la Gamme Sélectionnée */}
          <div className="w-full bg-white border-b border-[#EAE1DA] py-6 sm:py-7 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 shadow-xs">
            <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                {/* Back Button */}
                <button
                  onClick={handleBackToAll}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B26B59] hover:text-[#9E5746] font-bold transition-colors cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Revenir au Catalogue Général</span>
                </button>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-luxury uppercase tracking-[0.05em] text-[#231F20]">
                  {singleGamme.name}
                </h1>
              </div>

              {/* Formulation count badge & Devis CTA */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 flex-shrink-0">
                <span className="px-4 py-2 rounded-full bg-[#FAF3F0] border border-[#F0DFD8] text-xs text-[#B26B59] font-bold tracking-wide">
                  {singleGamme.products.length} formulations disponibles
                </span>
                <button
                  onClick={onGoToDevis}
                  className="px-5 py-2.5 bg-[#B26B59] hover:bg-[#9E5746] text-white text-xs uppercase tracking-[0.18em] font-bold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Demander un Devis
                </button>
              </div>
            </div>
          </div>

          {/* Grille Complète des Produits : Pleine Largeur, Ligne sous Ligne (Star taht Star) */}
          <main className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-10">
            <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
              {singleGamme.products.map((product, pIdx) => (
                <ProductGridCard
                  key={product.id}
                  product={product}
                  staggerDelay={pIdx * 40}
                  onDetail={() => setModalProduct(product)}
                  onDevis={() => onSelectForDevis(product)}
                />
              ))}
            </div>
          </main>
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════════════
            MODE 2: VUE CATALOGUE GÉNÉRAL (AVEC HERO SLIDER &
            DÉFILEMENT HORIZONTAL AVEC FLÈCHE DROITE POUR CHAQUE GAMME)
        ══════════════════════════════════════════════════════════════ */
        <>
          {/* Hero Slider Automatique (4s) */}
          <section className="w-full relative h-[480px] sm:h-[540px] md:h-[620px] overflow-hidden bg-[#181413] select-none">
            <div
              className="flex h-full w-full transition-transform duration-800 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className="w-full h-full flex-shrink-0 relative overflow-hidden"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=80';
                      }}
                      className={`w-full h-full object-cover transform transition-transform duration-6000 ease-out ${
                        isActive ? 'scale-106' : 'scale-100'
                      }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#181413]/90 via-[#181413]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181413]/85 via-transparent to-black/30" />

                    <div className="absolute inset-0 z-20 flex items-center">
                      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20">
                        <div className="max-w-2xl space-y-4">
                          <h1 className="text-2xl sm:text-4xl md:text-5xl font-luxury uppercase tracking-[0.05em] text-white leading-tight">
                            {slide.title}
                          </h1>

                          <p className="text-sm sm:text-base md:text-lg text-[#E8DDD8] font-medium tracking-wide">
                            {slide.subtitle}
                          </p>

                          <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light max-w-xl">
                            {slide.desc}
                          </p>

                          <div className="pt-2 flex flex-wrap items-center gap-3.5">
                            <button
                              onClick={scrollToFirstGamme}
                              className="px-6 py-3.5 bg-[#B26B59] hover:bg-[#9E5746] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-102 cursor-pointer flex items-center gap-2"
                            >
                              <span>Explorer le Catalogue</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                              onClick={onGoToDevis}
                              className="px-6 py-3.5 bg-white/10 hover:bg-white text-white hover:text-[#231F20] text-xs uppercase tracking-[0.2em] font-bold rounded-xl backdrop-blur-md border border-white/30 transition-all cursor-pointer"
                            >
                              Demander un Devis
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Gammes en Défilement Horizontal */}
          <main className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-12 space-y-16">
            {GAMMES_DATA.map((gamme, idx) => (
              <GammeHorizontalRow
                key={gamme.id}
                gamme={gamme}
                idx={idx}
                onSelectGamme={() => onSelectGamme?.(gamme.id)}
                onDetail={(product) => setModalProduct(product)}
                onDevis={(product) => onSelectForDevis(product)}
              />
            ))}
          </main>
        </>
      )}

      {/* Floating Scroll-To-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-7 z-50 w-11 h-11 bg-[#231F20] hover:bg-[#B26B59] text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white transition-all duration-300 hover:scale-110 cursor-pointer animate-hero-left"
          aria-label="Remonter en haut de page"
          title="Remonter en haut"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Product Detail Modal */}
      {modalProduct && (
        <ProductDetailModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onSelectForDevis={onSelectForDevis}
        />
      )}
    </div>
  );
};

/* ─── Gamme Horizontal Row (Pour la Page Catalogue Générale) ─── */
interface GammeHorizontalRowProps {
  gamme: GammeItem;
  idx: number;
  onSelectGamme: () => void;
  onDetail: (product: ProductItem) => void;
  onDevis: (product: ProductItem) => void;
}

const GammeHorizontalRow: React.FC<GammeHorizontalRowProps> = ({
  gamme,
  idx,
  onSelectGamme,
  onDetail,
  onDevis,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [gamme.products]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <section
      id={`gamme-${gamme.id}`}
      className="w-full bg-white rounded-3xl border border-[#EAE1DA] p-6 sm:p-8 lg:p-10 shadow-xs relative scroll-mt-28"
    >
      {/* Header de la Gamme */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#F0EAE4] mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-luxury uppercase tracking-[0.06em] text-[#231F20]">
            {gamme.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6F68] mt-2 max-w-3xl leading-relaxed">
            {gamme.description}
          </p>
        </div>

        {/* Right side: Badge + Navigation Arrows */}
        <div className="flex items-center gap-2.5 flex-shrink-0 self-start md:self-auto">
          {/* Bouton pour ouvrir toute la gamme en grille complète */}
          <button
            onClick={onSelectGamme}
            className="px-3.5 py-1.5 rounded-full bg-[#FAF3F0] hover:bg-[#B26B59] text-[#B26B59] hover:text-white border border-[#F0DFD8] hover:border-[#B26B59] text-xs font-bold tracking-wide transition-all cursor-pointer mr-1 flex items-center gap-1.5"
            title="Voir toutes les formulations en grille"
          >
            <span>{gamme.products.length} formulations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Fleche Gauche */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-[#FAF7F4] hover:bg-[#B26B59] hover:text-white text-[#231F20] border border-[#EAE1DA] flex items-center justify-center transition-all cursor-pointer shadow-xs hover:scale-105"
              aria-label="Défiler à gauche"
              title="Formulations précédentes"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Fleche Droite pour scroller horizontalement */}
          <button
            onClick={() => scroll('right')}
            className={`w-9 h-9 rounded-full transition-all flex items-center justify-center shadow-xs ${
              canScrollRight
                ? 'bg-[#B26B59] text-white hover:bg-[#9E5746] hover:scale-105 cursor-pointer ring-2 ring-[#B26B59]/20'
                : 'bg-[#F0EAE4] text-[#A89E97] cursor-not-allowed opacity-40'
            }`}
            disabled={!canScrollRight}
            aria-label="Défiler à droite"
            title="Voir plus de formulations"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Row */}
      <div className="relative group/row">
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="w-full flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 px-0.5"
        >
          {gamme.products.map((product, pIdx) => (
            <ProductHorizontalCard
              key={product.id}
              product={product}
              staggerDelay={pIdx * 30}
              onDetail={() => onDetail(product)}
              onDevis={() => onDevis(product)}
            />
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-[#B26B59] text-[#231F20] hover:text-white shadow-xl border border-[#EAE1DA] items-center justify-center transition-all cursor-pointer hover:scale-110"
            title="Défiler pour voir les autres produits"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  );
};

/* ─── Product Card pour la ligne horizontale (largeur fixe flex-shrink-0) ─── */
interface ProductCardProps {
  product: ProductItem;
  staggerDelay: number;
  onDetail: () => void;
  onDevis: () => void;
}

const ProductHorizontalCard: React.FC<ProductCardProps> = ({
  product,
  staggerDelay,
  onDetail,
  onDevis,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex-shrink-0 w-[270px] sm:w-[290px] md:w-[310px] lg:w-[325px] animate-slide-left group bg-white rounded-2xl overflow-hidden border border-[#EAE1DA] flex flex-col justify-between"
      style={{
        animationDelay: `${staggerDelay}ms`,
        boxShadow: hovered
          ? '0 20px 40px rgba(35,31,32,0.11)'
          : '0 2px 8px rgba(35,31,32,0.04)',
        transition: 'box-shadow 0.4s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F0EAE4]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80';
            }}
          />

          <div
            className="absolute inset-0 transition-opacity duration-350"
            style={{ background: 'rgba(35,31,32,0.65)', opacity: hovered ? 1 : 0 }}
          />

          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 pointer-events-none"
            style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: hovered ? 'auto' : 'none' }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); onDetail(); }}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 bg-white text-[#231F20] text-[10px] uppercase tracking-[0.18em] font-bold rounded-xl hover:bg-[#FAF7F4] transition-colors cursor-pointer"
              style={{ transform: hovered ? 'translateY(0)' : 'translateY(10px)', transition: 'transform 0.28s ease 0.04s' }}
            >
              <Eye className="w-3.5 h-3.5" />
              Détails
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDevis(); }}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 bg-[#B26B59] text-white text-[10px] uppercase tracking-[0.18em] font-bold rounded-xl hover:bg-[#9E5746] transition-colors cursor-pointer"
              style={{ transform: hovered ? 'translateY(0)' : 'translateY(10px)', transition: 'transform 0.28s ease 0.09s' }}
            >
              <FileText className="w-3.5 h-3.5" />
              Devis
            </button>
          </div>
        </div>

        <div className="p-3.5 sm:p-4">
          <h3 className="text-[12px] font-luxury uppercase tracking-[0.06em] text-[#231F20] leading-snug group-hover:text-[#B26B59] transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[10px] text-[#8A7D75] mt-1.5 leading-relaxed line-clamp-2">
            {product.shortDesc}
          </p>
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.keyIngredients.slice(0, 2).map((ing, i) => (
              <span key={i} className="text-[8px] uppercase tracking-wider text-[#736359] bg-[#FAF7F4] px-2 py-0.5 border border-[#EAE1DA] rounded-full">
                {ing}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Product Card pour la grille complète (Star taht Star - responsive width) ─── */
const ProductGridCard: React.FC<ProductCardProps> = ({
  product,
  staggerDelay,
  onDetail,
  onDevis,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="w-full animate-slide-left group bg-white rounded-2xl overflow-hidden border border-[#EAE1DA] flex flex-col justify-between"
      style={{
        animationDelay: `${staggerDelay}ms`,
        boxShadow: hovered
          ? '0 20px 40px rgba(35,31,32,0.11)'
          : '0 2px 8px rgba(35,31,32,0.04)',
        transition: 'box-shadow 0.4s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F0EAE4]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80';
            }}
          />

          <div
            className="absolute inset-0 transition-opacity duration-350"
            style={{ background: 'rgba(35,31,32,0.65)', opacity: hovered ? 1 : 0 }}
          />

          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 pointer-events-none"
            style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: hovered ? 'auto' : 'none' }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); onDetail(); }}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 bg-white text-[#231F20] text-[10px] uppercase tracking-[0.18em] font-bold rounded-xl hover:bg-[#FAF7F4] transition-colors cursor-pointer"
              style={{ transform: hovered ? 'translateY(0)' : 'translateY(10px)', transition: 'transform 0.28s ease 0.04s' }}
            >
              <Eye className="w-3.5 h-3.5" />
              Détails
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDevis(); }}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 bg-[#B26B59] text-white text-[10px] uppercase tracking-[0.18em] font-bold rounded-xl hover:bg-[#9E5746] transition-colors cursor-pointer"
              style={{ transform: hovered ? 'translateY(0)' : 'translateY(10px)', transition: 'transform 0.28s ease 0.09s' }}
            >
              <FileText className="w-3.5 h-3.5" />
              Devis
            </button>
          </div>
        </div>

        <div className="p-3.5 sm:p-4">
          <h3 className="text-[12px] font-luxury uppercase tracking-[0.06em] text-[#231F20] leading-snug group-hover:text-[#B26B59] transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[10px] text-[#8A7D75] mt-1.5 leading-relaxed line-clamp-2">
            {product.shortDesc}
          </p>
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.keyIngredients.slice(0, 2).map((ing, i) => (
              <span key={i} className="text-[8px] uppercase tracking-wider text-[#736359] bg-[#FAF7F4] px-2 py-0.5 border border-[#EAE1DA] rounded-full">
                {ing}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CataloguePage;
