import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Factory,
  CheckCircle2,
  FileText,
  ChevronDown,
  ArrowUp
} from 'lucide-react';

interface AProposPageProps {
  onGoToDevis: () => void;
  onGoToCatalogue: () => void;
}

const AnimatedStatCounter: React.FC<{
  target: number;
  target2?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}> = ({ target, target2, prefix = '', suffix = '', duration = 1800 }) => {
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      setHasStarted(true);
    }
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setVal1(Math.round(ease * target));
      if (target2 !== undefined) {
        setVal2(Math.round(ease * target2));
      }

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setVal1(target);
        if (target2 !== undefined) setVal2(target2);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [hasStarted, target, target2, duration]);

  return (
    <span ref={containerRef} className="tabular-nums">
      {target2 !== undefined
        ? `${prefix}${val1}-${val2}${suffix}`
        : `${prefix}${val1}${suffix}`}
    </span>
  );
};

export const AProposPage: React.FC<AProposPageProps> = ({
  onGoToDevis,
  onGoToCatalogue
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  const stats = [
    { target: 50, suffix: " pcs", label: "Minimum de Commande", desc: "Idéal pour tester votre marché sans risque financier" },
    { prefix: "ISO ", target: 22716, label: "Norme Internationale BPF", desc: "Production en salle blanche certifiée & traçabilité stricte" },
    { target: 100, suffix: "%", label: "Actifs Botaniques Purs", desc: "Argan Bio, Figue de Barbarie, Rose & Rhassoul de l'Atlas" },
    { target: 7, target2: 14, suffix: "j", label: "Délai de Façonnage", desc: "Production rapide et expédition partout au Maroc & Export" }
  ];

  const steps = [
    {
      num: "01",
      title: "Sélection des Formulations & Cahier des Charges",
      desc: "Définition de votre concept de marque, choix parmi notre catalogue de +50 formules éprouvées ou formulation sur-mesure de votre texture et parfum signature.",
      tag: "Étape 1"
    },
    {
      num: "02",
      title: "Échantillonnage & Validation Sensorielle",
      desc: "Envoi rapide d'échantillons personnalisés sous 48h. Vous testez la texture, le toucher de peau, la pénétration et le sillage olfactif avant de valider la production.",
      tag: "Étape 2"
    },
    {
      num: "03",
      title: "Design Packaging & Personnalisation de Marque",
      desc: "Application de votre identité visuelle : choix du flaconnage, validation du BAT d'étiquette, pose d'étiquettes professionnelles ou sérigraphie directe haut de gamme.",
      tag: "Étape 3"
    },
    {
      num: "04",
      title: "Fabrication Stérile, Conditionnement & Livraison",
      desc: "Fabrication en salle propre sous norme ISO 22716, contrôle qualité rigoureux lot par lot, emballage sécurisé et expédition express à votre adresse.",
      tag: "Étape 4"
    }
  ];

  const qualityStandards = [
    {
      icon: Factory,
      title: "Salle Blanche & Cuves Inox 316L",
      desc: "Atmosphère contrôlée, filtration particulaire de l'air et réacteurs de mélange sous vide pour des émulsions parfaitement homogènes et sans bulles."
    },
    {
      icon: ShieldCheck,
      title: "Tests Microbiologiques Systématiques",
      desc: "Chaque lot produit subit des contrôles rigoureux de pH, viscosité, stabilité thermique et tests d'absence totale de germes ou bactéries."
    },
    {
      icon: FileText,
      title: "Traçabilité & Certificats d'Analyse (COA)",
      desc: "Transparence totale : fiche de données de sécurité (FDS), certificat de conformité et traçabilité de chaque matière première jusqu'au produit fini."
    }
  ];

  const faqs = [
    {
      q: "Quel est le minimum de commande (MOQ) chez Cosmelys ?",
      a: "Cosmelys est pionnier dans l'accessibilité au Private Label au Maroc : nous permettons aux créateurs de marque, salons de beauté et cliniques de commander dès 50 unités par produit. Vous pouvez ainsi démarrer sans immobiliser un budget colossal."
    },
    {
      q: "Quel est le délai de fabrication et de livraison ?",
      a: "Pour nos formulations du catalogue avec packaging standard, le délai de fabrication et d'étiquetage est de 7 à 14 jours ouvrés. Pour une formulation sur-mesure créée de zéro en R&D, comptez 3 à 4 semaines pour l'ensemble des tests."
    },
    {
      q: "Puis-je personnaliser le packaging, les odeurs et les flacons ?",
      a: "Absolument. Vous pouvez choisir vos contenants (flacons pompes verre ou PET, pots luxe, flacons pipettes compte-gouttes), vos senteurs exclusives (notes orientales boisées, fleur d'oranger, ambre solaire, fruits gourmands) et apposer vos étiquettes personnalisées."
    },
    {
      q: "Fournissez-vous les documents réglementaires pour commercialiser légalement ?",
      a: "Oui, tous nos produits sont formulés en conformité stricte avec les exigences de la DMP au Maroc et les standards ISO 22716. Nous vous fournissons la liste INCI officielle, les fiches techniques, les certificats d'analyse et le Dossier d'Information Produit (DIP)."
    },
    {
      q: "Comment tester les produits avant de lancer une production ?",
      a: "Vous pouvez commander un pack d'échantillons de nos formulations directement auprès de notre équipe commerciale. Cela vous permet d'évaluer la qualité de la texture, le parfum et la tenue avant de valider votre première série."
    },
    {
      q: "Livrez-vous partout au Maroc et à l'International ?",
      a: "Oui, nous expédions quotidiennement sur l'ensemble du territoire marocain (Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir, etc.) via des transporteurs express spécialisés, et nous disposons des documents d'exportation pour l'international (Europe, Moyen-Orient, Afrique)."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FAF7F4] text-[#231F20] pb-24">

      {/* ======================================================== */}
      {/* 1. HERO BANNER - FULL WIDTH LUXURY INTRO                 */}
      {/* ======================================================== */}
      <section className="w-full bg-[#F4ECE7] border-b border-[#E8DCD4] py-14 sm:py-20 px-4 sm:px-8 lg:px-14 xl:px-18">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-luxury uppercase tracking-[0.05em] text-[#231F20] leading-[1.12]">
              L'Excellence du Façonnage Cosmétique Clé en Main
            </h1>

            <p className="text-sm sm:text-base text-[#61544D] leading-relaxed max-w-3xl">
              Implanté au Maroc, le laboratoire <strong>Cosmelys</strong> est le partenaire stratégique des entrepreneurs, créateurs de marques, salons haut de gamme et spas. De la sélection des actifs naturels nobles jusqu'au flaconnage finalisé avec votre logo, nous concevons votre ligne cosmétique complète <strong>dès 50 pièces seulement</strong>.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onGoToDevis}
                className="px-7 py-3.5 bg-[#B26B59] hover:bg-[#9E5746] text-white text-xs uppercase tracking-[0.18em] font-bold rounded-full transition-all shadow-md hover:scale-[1.02] cursor-pointer flex items-center gap-2.5"
              >
                <span>Démarrer Votre Projet</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onGoToCatalogue}
                className="px-7 py-3.5 bg-white hover:bg-[#231F20] text-[#231F20] hover:text-white border border-[#D9C8BE] text-xs uppercase tracking-[0.18em] font-bold rounded-full transition-all shadow-xs cursor-pointer"
              >
                <span>Explorer le Catalogue</span>
              </button>
            </div>
          </div>

          {/* Right Column: Logo Image */}
          {/* Right Column: Logo Image */}
          <div className="lg:col-span-5 flex items-center justify-center py-4">
            <img
              src="/logo.png.png"
              alt="Cosmelys Logo Laboratoire"
              className="w-full h-auto object-contain scale-150 origin-center transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/logo.png";
              }}
            />
          </div>

        </div>

        {/* 4 Stats Cards Spanning Full Width */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-14 pt-10 border-t border-[#E8DCD4]">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-[#E0D0C6] shadow-xs flex flex-col justify-between hover:border-[#B26B59]/60 hover:shadow-md transition-all duration-300"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-luxury text-[#B26B59] block mb-1">
                  <AnimatedStatCounter
                    target={s.target}
                    target2={s.target2}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </span>
                <span className="text-xs uppercase tracking-[0.15em] font-bold text-[#231F20] block mb-2">
                  {s.label}
                </span>
              </div>
              <p className="text-xs text-[#786C65] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. PROCESSUS DE CRÉATION - FULL WIDTH PIPELINE (4 ÉTAPES) */}
      {/* ======================================================== */}
      <section className="w-full bg-[#F5EFEA] border-y border-[#E8DDD4] py-16 sm:py-24 px-4 sm:px-8 lg:px-14 xl:px-18">
        <div className="w-full text-center mb-12 sm:mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B26B59] font-bold">
            Méthodologie Éprouvée
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-luxury uppercase tracking-[0.06em] text-[#231F20]">
            Lancer Votre Marque En 4 Étapes Simples
          </h2>
          <p className="text-xs sm:text-sm text-[#786C65] max-w-2xl mx-auto">
            Nous avons simplifié au maximum le processus industriel pour vous permettre de passer de l'idée au produit commercialisé rapidement.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE1DA] shadow-xs relative flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-luxury text-[#B26B59] font-bold">
                    {st.num}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-[#FAF3F0] text-[#B26B59] border border-[#F0DFD8]">
                    {st.tag}
                  </span>
                </div>
                <h3 className="text-sm uppercase tracking-wider font-bold text-[#231F20] mb-3 leading-snug">
                  {st.title}
                </h3>
                <p className="text-xs text-[#6E615A] leading-relaxed">
                  {st.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#F2ECE7] flex items-center gap-1.5 text-[11px] font-bold text-[#B26B59]">
                <span>Phase {idx + 1} validée</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onGoToDevis}
            className="px-8 py-4 bg-[#B26B59] hover:bg-[#9E5746] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-full transition-all shadow-md hover:scale-[1.02] cursor-pointer inline-flex items-center gap-2"
          >
            <span>Demander Un Devis En Ligne</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. ÉQUIPEMENTS & NORMES QUALITÉ - 3-COL FULL WIDTH        */}
      {/* ======================================================== */}
      <section className="w-full bg-[#231F20] text-white py-16 sm:py-24 px-4 sm:px-8 lg:px-14 xl:px-18">
        <div className="w-full text-center mb-12 sm:mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D89C8E] font-bold">
            Garantie Industrielle
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-luxury uppercase tracking-[0.06em] text-white">
            Infrastructures &amp; Rigueur Qualité
          </h2>
          <p className="text-xs sm:text-sm text-[#A89E97] max-w-2xl mx-auto">
            Toutes nos productions respectent scrupuleusement les exigences de la norme internationale ISO 22716 régissant les cosmétiques.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {qualityStandards.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-[#2C2728] border border-[#3D3637] rounded-3xl p-6 sm:p-8 space-y-4 hover:border-[#B26B59]/60 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#B26B59]/20 text-[#D89C8E] flex items-center justify-center border border-[#B26B59]/30">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base uppercase tracking-wider font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-[#B5ABA4] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. FAQ QUESTIONS FRÉQUENTES - SMOOTH ANIMATED ACCORDION  */}
      {/* ======================================================== */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-14 xl:px-18">
        <div className="w-full text-center mb-12 sm:mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#B26B59] font-bold">
            Questions Fréquentes
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-luxury uppercase tracking-[0.06em] text-[#231F20]">
            Tout Ce Que Vous Devez Savoir Pour Débuter
          </h2>
          <p className="text-xs sm:text-sm text-[#786C65] max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus posées par nos partenaires lors du lancement de leur marque.
          </p>
        </div>

        {/* 2 Columns Wide FAQ Grid with Smooth Height Animation */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 ease-in-out overflow-hidden ${isOpen
                  ? 'bg-white border-[#B26B59]/60 shadow-md ring-2 ring-[#B26B59]/10'
                  : 'bg-white/90 border-[#EAE1DA] shadow-xs hover:border-[#D4C3B7] hover:bg-white'
                  }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md transition-colors duration-300 ${isOpen ? 'bg-[#B26B59] text-white' : 'bg-[#FAF3F0] text-[#B26B59] group-hover:bg-[#B26B59] group-hover:text-white'
                      }`}>
                      0{idx + 1}
                    </span>
                    <span className={`text-xs sm:text-sm uppercase tracking-wider font-bold transition-colors duration-200 leading-snug ${isOpen ? 'text-[#B26B59]' : 'text-[#231F20] group-hover:text-[#B26B59]'
                      }`}>
                      {faq.q}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-in-out ${isOpen
                      ? 'bg-[#B26B59] text-white rotate-180 shadow-xs'
                      : 'bg-[#FAF3F0] text-[#B26B59] group-hover:bg-[#B26B59] group-hover:text-white'
                      }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Smooth Height Expansion with CSS Grid */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-7 pb-6 pt-2 text-xs sm:text-sm text-[#61544D] leading-relaxed border-t border-[#F5EFEA]">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. GRAND CALL TO ACTION FINAL - FULL WIDTH LUXURY BANNER */}
      {/* ======================================================== */}
      <section className="w-full px-4 sm:px-8 lg:px-14 xl:px-18">
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#231F20] via-[#2F2728] to-[#231F20] text-white p-8 sm:p-12 lg:p-16 border border-[#3E3435] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D89C8E] font-bold block">
              Prêt à Franchir Le Pas ?
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-luxury uppercase tracking-wider text-white">
              Donnez Vie À Votre Propre Marque Cosmétique
            </h2>
            <p className="text-xs sm:text-sm text-[#C2B7B0] leading-relaxed">
              Consultez notre catalogue, sélectionnez vos formulations favorites et recevez une estimation tarifaire sur-mesure sous 24h.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <button
              onClick={onGoToDevis}
              className="w-full sm:w-auto px-8 py-4 bg-[#B26B59] hover:bg-[#9E5746] text-white text-xs uppercase tracking-[0.18em] font-bold rounded-full transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              Demander Un Devis Gratuit
            </button>
            <button
              onClick={onGoToCatalogue}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 text-xs uppercase tracking-[0.18em] font-bold rounded-full transition-colors cursor-pointer"
            >
              Consulter Le Catalogue
            </button>
          </div>
        </div>
      </section>

      {/* Floating Scroll-To-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-7 z-50 w-11 h-11 bg-[#231F20] hover:bg-[#B26B59] text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white transition-all duration-300 hover:scale-110 cursor-pointer animate-hero-left"
          aria-label="Remonter en haut de page"
          title="Remonter en haut"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};

export default AProposPage;
