import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#F4ECE7] text-[#443D39] border-t border-[#E5D7CE] pt-12 sm:pt-14 pb-10">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-18">

        {/* 4 Wide Columns Grid Spanning the Full Left-Right Screen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-10">
          
          {/* Column 1: Brand & Presentation (span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className="cursor-pointer inline-block group"
              onClick={() => handleNavClick('catalogue')}
            >
              <span className="text-3xl font-luxury tracking-[0.25em] text-[#231F20] uppercase block group-hover:text-[#B26B59] transition-colors">
                Cosmelys
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#B26B59] font-bold block mt-0.5">
                Laboratoire Cosmétique &amp; Façonnage
              </span>
            </div>

            <p className="text-xs text-[#6B615B] leading-relaxed pr-0 sm:pr-4">
              Laboratoire marocain de référence en formulation cosmétique, recherche &amp; développement et façonnage en marque blanche (Private Label). Nous concevons vos soins d'exception de la matière première jusqu'au packaging finalisé.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B26B59] hover:bg-[#9E5746] text-white text-xs uppercase tracking-wider font-bold transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discussion WhatsApp Directe</span>
              </a>
            </div>
          </div>

          {/* Column 2: Nos Gammes Cosmétiques (span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#231F20] border-b border-[#E5D7CE] pb-2">
              Nos Formulations
            </p>
            <ul className="space-y-2.5 text-xs text-[#615751]">
              <li>
                <button
                  onClick={() => handleNavClick('catalogue')}
                  className="hover:text-[#B26B59] transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B26B59]" />
                  <span>Gamme Visage &amp; Sérums Ciblés</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('catalogue')}
                  className="hover:text-[#B26B59] transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B26B59]" />
                  <span>Gamme Capillaire Haute Performance</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('catalogue')}
                  className="hover:text-[#B26B59] transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B26B59]" />
                  <span>Gamme Corps &amp; Rituel Hammam Spa</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('catalogue')}
                  className="hover:text-[#B26B59] transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B26B59]" />
                  <span>Gamme Soins Homme &amp; Barbe</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('catalogue')}
                  className="hover:text-[#B26B59] transition-colors flex items-center gap-2 cursor-pointer text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B26B59]" />
                  <span>Formulation R&amp;D Sur-Mesure</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation Rapide (span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#231F20] border-b border-[#E5D7CE] pb-2">
              Navigation
            </p>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-[#615751]">
              <li>
                <button
                  onClick={() => handleNavClick('catalogue')}
                  className="hover:text-[#B26B59] transition-colors cursor-pointer"
                >
                  Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('a-propos')}
                  className="hover:text-[#B26B59] transition-colors cursor-pointer"
                >
                  À Propos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('devis')}
                  className="hover:text-[#B26B59] transition-colors text-[#B26B59] font-bold cursor-pointer flex items-center gap-1"
                >
                  <span>Devis Rapide</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-[#B26B59] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Coordonnées & Laboratoire (span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#231F20] border-b border-[#E5D7CE] pb-2">
              Coordonnées
            </p>
            <ul className="space-y-3 text-xs text-[#615751]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B26B59] flex-shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}, Maroc</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B26B59] flex-shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.whatsappNumber}`}
                  className="hover:text-[#B26B59] transition-colors font-medium text-[#231F20]"
                >
                  {SITE_CONFIG.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B26B59] flex-shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-[#B26B59] transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#B26B59] flex-shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.hours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Full-Width Bar */}
        <div className="pt-6 border-t border-[#E5D7CE] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-wider text-[#8A7F78] text-center sm:text-left">
          <p>© {new Date().getFullYear()} Cosmelys · Laboratoire Cosmétique au Maroc. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-[#7A6F68]">
            <span>Norme ISO 22716</span>
            <span>·</span>
            <span>Façonnage Clé en Main</span>
            <span>·</span>
            <span className="text-[#B26B59] font-medium">Made in Morocco 🇲🇦</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
