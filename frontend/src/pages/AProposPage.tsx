import React from 'react';
import {
  FlaskConical,
  ShieldCheck,
  Leaf,
  Box,
  ArrowRight,
  Gem,
  Factory,
  HeartHandshake
} from 'lucide-react';

interface AProposPageProps {
  onGoToDevis: () => void;
  onGoToCatalogue: () => void;
}

export const AProposPage: React.FC<AProposPageProps> = ({
  onGoToDevis,
  onGoToCatalogue
}) => {
  const steps = [
    {
      num: "01",
      title: "Cahier des Charges & Formules",
      desc: "Définition de votre concept, choix des gammes (cheveux, visage, corps, hammam) et sélection des actifs nobles marocains.",
      icon: FlaskConical
    },
    {
      num: "02",
      title: "Échantillons & Validation R&D",
      desc: "Développement et envoi des échantillons en laboratoire pour tester texture, odeur signature et efficacité cutanée.",
      icon: Gem
    },
    {
      num: "03",
      title: "Packaging & Identité Graphique",
      desc: "Choix des contenants (verre, flacons pompe, pots luxe) et personnalisation graphique avec votre logo et étiquette.",
      icon: Box
    },
    {
      num: "04",
      title: "Production & Dossier Réglementaire",
      desc: "Fabrication stérile sous normes ISO 22716, constitution du DIP/DMP et livraison clé en main partout au Maroc et à l'export.",
      icon: Factory
    }
  ];

  const pillars = [
    {
      icon: Leaf,
      title: "Actifs Marocains Nobles",
      desc: "Argan Bio certifiée, Figue de Barbarie première pression, Eau de Rose de Damas et Rhassoul de l'Atlas."
    },
    {
      icon: ShieldCheck,
      title: "Conformité ISO 22716",
      desc: "Formulations respectant les Bonnes Pratiques de Fabrication cosmétiques internationales et dossiers DMP."
    },
    {
      icon: Gem,
      title: "Séries Dès 50 Pièces",
      desc: "Des quantités minimales accessibles pour vous permettre de lancer votre marque sans immobiliser un gros budget."
    },
    {
      icon: HeartHandshake,
      title: "Accompagnement Clé en Main",
      desc: "De la conception jusqu'à la mise en vente, un chef de projet dédié vous accompagne à chaque étape."
    }
  ];

  const faqs = [
    {
      q: "Quel est le minimum de commande (MOQ) chez Cosmelys ?",
      a: "Cosmelys propose des séries accessibles dès 50 unités par référence pour tester votre marché sereinement."
    },
    {
      q: "Combien de temps prend la fabrication ?",
      a: "Pour nos formules catalogues, le délai moyen est de 7 à 14 jours ouvrés. Pour une formule 100% sur-mesure R&D, comptez 3 à 4 semaines."
    },
    {
      q: "Les produits sont-ils conformes pour la vente légale ?",
      a: "Oui, toutes nos formules sont testées en laboratoire, conformes aux exigences réglementaires avec DIP (Dossier d'Information Produit) et autorisations."
    },
    {
      q: "Puis-je personnaliser le packaging et le parfum ?",
      a: "Oui, à 100%. Vous choisissez le contenant, le type de bouchon, le parfum signature (oriental, floral, frais) et vos étiquettes de marque."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-[#231F20] pb-28">

      {/* Header */}
      <section className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-12 border-b border-[#EAE1DA]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-luxury uppercase tracking-[0.08em] text-[#231F20]">
            À Propos Du Laboratoire
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[#918177] mt-3">
            Votre Partenaire Stratégique en Façonnage Cosmétique au Maroc
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative border border-[#EAE1DA] rounded-2xl p-6 bg-white shadow-xs">
            <div className="w-full aspect-4/3 bg-[#FAF7F4] rounded-xl flex items-center justify-center p-8 border border-[#EAE1DA]/60">
              <img
                src="/logo.png"
                alt="Cosmelys Logo"
                className="max-h-52 max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/logo.png.png";
                }}
              />
            </div>
            <div className="p-4 text-center border-t border-[#EAE1DA] bg-white mt-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B26B59] font-bold">
                Excellence &amp; Savoir-Faire Marocain 🇲🇦
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B26B59] font-bold">
              Notre Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-luxury uppercase tracking-wider text-[#231F20]">
              Donner vie à votre propre marque cosmétique
            </h2>
            <p className="text-xs sm:text-sm text-[#665B54] leading-relaxed">
              Basé au Maroc, le laboratoire <strong>Cosmelys</strong> est spécialisé dans la recherche, la formulation et le façonnage de cosmétiques haut de gamme en <strong>marque blanche</strong> (Private Label) ou en <strong>formulation sur-mesure</strong>.
            </p>
            <p className="text-xs sm:text-sm text-[#665B54] leading-relaxed">
              Nous permettons aux entrepreneurs, cliniques esthétiques, salons et créateurs de marques de lancer des produits aux standards internationaux avec des <strong>petites séries dès 50 unités</strong>.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <button
                onClick={onGoToDevis}
                className="px-6 py-3 bg-[#B26B59] text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#9E5746] transition-colors inline-flex items-center gap-2 rounded-xl"
              >
                <span>Demander un Devis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onGoToCatalogue}
                className="px-6 py-3 border border-[#231F20] text-[#231F20] text-xs uppercase tracking-[0.18em] hover:bg-[#231F20] hover:text-white transition-colors rounded-xl"
              >
                <span>Voir le Catalogue</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-24">
        <div className="text-center mb-10 sm:mb-12 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B26B59] font-bold">
            Nos Engagements
          </span>
          <h2 className="text-2xl sm:text-3xl font-luxury uppercase tracking-wider text-[#231F20]">
            Pourquoi Choisir Cosmelys ?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((p, i) => (
            <div key={i} className="p-6 bg-white border border-[#EAE1DA] rounded-2xl space-y-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#B26B59] font-bold">
                {p.title}
              </p>
              <p className="text-xs text-[#6B5E57] leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-24">
        <div className="p-6 sm:p-8 lg:p-14 bg-[#F2EAE4] border border-[#E2D4CB] rounded-2xl">
          <div className="text-center mb-10 sm:mb-12 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B26B59] font-bold">
              Processus de Création
            </span>
            <h2 className="text-2xl sm:text-3xl font-luxury uppercase tracking-wider text-[#231F20]">
              Lancer Votre Marque En 4 Étapes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="p-6 bg-white border border-[#EAE1DA] rounded-xl space-y-3">
                <span className="text-2xl font-luxury text-[#B26B59]">{s.num}</span>
                <p className="text-xs uppercase tracking-wider font-bold text-[#231F20]">{s.title}</p>
                <p className="text-xs text-[#6B5E57] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={onGoToDevis}
              className="px-8 py-3.5 bg-[#231F20] text-white text-xs uppercase tracking-[0.18em] hover:bg-[#B26B59] transition-colors rounded-xl"
            >
              <span>Démarrer Mon Projet</span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-24">
        <div className="text-center mb-10 sm:mb-12 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B26B59] font-bold">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-luxury uppercase tracking-wider text-[#231F20]">
            Questions Fréquentes
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 bg-white border border-[#EAE1DA] rounded-xl space-y-2">
              <p className="text-xs uppercase tracking-wider font-bold text-[#231F20]">
                {faq.q}
              </p>
              <p className="text-xs text-[#6B5E57] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AProposPage;

