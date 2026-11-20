import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import {
  Phone,
  Mail,
  MapPin,
  Clock
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
    <footer className="bg-[#F4ECE7] text-[#443D39] border-t border-[#E5D7CE] pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="cursor-pointer inline-block" onClick={() => handleNavClick('catalogue')}>
              <span className="text-2xl font-luxury tracking-[0.25em] text-[#231F20] uppercase block">
                Cosmelys
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-[#B26B59] font-medium">
                Laboratoire Cosmétique
              </span>
            </div>

            <p className="text-xs text-[#6B615B] leading-relaxed max-w-sm">
              Laboratoire marocain de formulation, façonnage et fabrication de produits cosmétiques sur-mesure. Nous accompagnons les créateurs et marques en marque blanche (Private Label) de l'idée jusqu'à la mise sur le marché.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#231F20] border-b border-[#E5D7CE] pb-2">
              Navigation
            </p>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-[#615751]">
              <li>
                <button
                  onClick={() => handleNavClick('catalogue')}
                  className="hover:text-[#B26B59] transition-colors cursor-pointer"
                >
                  Catalogue des Produits
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('a-propos')}
                  className="hover:text-[#B26B59] transition-colors cursor-pointer"
                >
                  À Propos du Laboratoire
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('devis')}
                  className="hover:text-[#B26B59] transition-colors text-[#B26B59] font-bold cursor-pointer"
                >
                  Demander un Devis
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-[#B26B59] transition-colors cursor-pointer"
                >
                  Contact &amp; Échange
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#231F20] border-b border-[#E5D7CE] pb-2">
              Coordonnées
            </p>
            <ul className="space-y-2 text-xs text-[#615751]">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B26B59] flex-shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B26B59] flex-shrink-0" />
                <a href={`tel:${SITE_CONFIG.whatsappDisplay}`} className="hover:text-[#B26B59]">
                  {SITE_CONFIG.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B26B59] flex-shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-[#B26B59]">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#B26B59] flex-shrink-0" />
                <span>{SITE_CONFIG.hours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-[#E5D7CE] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-wider text-[#8A7F78] text-center sm:text-left">
          <p>© {new Date().getFullYear()} Cosmelys · Tous droits réservés.</p>
          <p>Made with care in Morocco 🇲🇦</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
