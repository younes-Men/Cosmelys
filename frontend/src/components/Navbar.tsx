import React, { useState, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { GAMMES_DATA } from '../data/catalogData';
import {
  Menu,
  X,
  FileText,
  ArrowRight,
  ChevronDown,
  Layers
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedGammeId?: string;
  onSelectGamme?: (gammeId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  selectedGammeId,
  onSelectGamme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gammesDropdownOpen, setGammesDropdownOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setGammesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setGammesDropdownOpen(false);
    }, 150);
  };

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    setGammesDropdownOpen(false);
    if (tabId === 'catalogue' && onSelectGamme) {
      onSelectGamme('all');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGammeClick = (gammeId: string) => {
    setGammesDropdownOpen(false);
    setMobileMenuOpen(false);
    setCurrentTab('catalogue');
    if (onSelectGamme) {
      onSelectGamme(gammeId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F4]/95 backdrop-blur-md border-b border-[#E8DFD8]">
      {/* Top Announcement Bar */}
      <div className="bg-[#B26B59] text-white text-[9px] sm:text-[11px] tracking-widest uppercase py-2 px-4 w-full text-center font-medium leading-tight">
        <span className="hidden sm:inline">Laboratoire de formulation &amp; création cosmétique au Maroc</span>
        <span className="sm:hidden">Laboratoire Cosmétique · Maroc</span>
      </div>

      {/* Main Navbar */}
      <div className="relative w-full px-4 sm:px-6 lg:px-12 h-16 sm:h-20 flex items-center justify-between">

        {/* Left: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 z-10">
          {/* CATALOGUE */}
          <button
            onClick={() => handleNavClick('catalogue')}
            className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 cursor-pointer ${
              currentTab === 'catalogue' && !gammesDropdownOpen
                ? 'text-[#B26B59] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#B26B59]'
                : 'text-[#4A4542] hover:text-[#B26B59]'
            }`}
          >
            Catalogue
          </button>

          {/* GAMMES (HOVER DROPDOWN) */}
          <div
            className="relative py-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleNavClick('catalogue')}
              className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 cursor-pointer flex items-center gap-1.5 ${
                gammesDropdownOpen
                  ? 'text-[#B26B59] font-bold'
                  : currentTab === 'catalogue'
                  ? 'text-[#B26B59] font-bold'
                  : 'text-[#4A4542] hover:text-[#B26B59]'
              }`}
            >
              <span>Gammes</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  gammesDropdownOpen ? 'rotate-180 text-[#B26B59]' : 'text-[#8A7D75]'
                }`}
              />
            </button>

            {/* Floating Dropdown Card */}
            <div
              className={`absolute top-full left-0 pt-2 w-80 lg:w-96 z-50 transition-all duration-200 ease-out ${
                gammesDropdownOpen
                  ? 'opacity-100 translate-y-0 visible pointer-events-auto'
                  : 'opacity-0 -translate-y-2 invisible pointer-events-none'
              }`}
            >
              <div className="bg-[#FAF7F4] border border-[#E8DFD8] rounded-2xl shadow-2xl p-3 backdrop-blur-xl">
                {/* Eyebrow header */}
                <div className="px-3 py-2 border-b border-[#EAE1DA] mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#B26B59]" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#B26B59] font-bold">
                      Nos Gammes de Produits
                    </span>
                  </div>
                  <span className="text-[10px] text-[#968982] font-medium">
                    {GAMMES_DATA.length} Catégories
                  </span>
                </div>

                {/* Gamme Items */}
                <div className="space-y-1">
                  {GAMMES_DATA.map((gamme) => {
                    const isSelected = currentTab === 'catalogue' && selectedGammeId === gamme.id;
                    return (
                      <button
                        key={gamme.id}
                        onClick={() => handleGammeClick(gamme.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-between group/item cursor-pointer ${
                          isSelected
                            ? 'bg-white shadow-xs border border-[#E8DFD8] text-[#B26B59]'
                            : 'hover:bg-white hover:shadow-xs text-[#231F20] hover:text-[#B26B59]'
                        }`}
                      >
                        <div className="flex flex-col pr-2">
                          <span className={`text-xs font-semibold tracking-wide ${isSelected ? 'text-[#B26B59]' : 'group-hover/item:text-[#B26B59]'}`}>
                            {gamme.tabLabel}
                          </span>
                          <span className="text-[10px] text-[#8A7D75] line-clamp-1 mt-0.5">
                            {gamme.badge}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-colors ${
                            isSelected
                              ? 'bg-[#B26B59] text-white'
                              : 'bg-[#F3EDE8] text-[#7A6F68] group-hover/item:bg-[#B26B59] group-hover/item:text-white'
                          }`}>
                            {gamme.products.length}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#B26B59] opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* À PROPOS */}
          <button
            onClick={() => handleNavClick('a-propos')}
            className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 cursor-pointer ${
              currentTab === 'a-propos'
                ? 'text-[#B26B59] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#B26B59]'
                : 'text-[#4A4542] hover:text-[#B26B59]'
            }`}
          >
            À Propos
          </button>

          {/* CONTACT */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-xs uppercase tracking-[0.2em] transition-all relative py-1 cursor-pointer ${
              currentTab === 'contact'
                ? 'text-[#B26B59] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#B26B59]'
                : 'text-[#4A4542] hover:text-[#B26B59]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Center: Brand Name */}
        <div
          onClick={() => handleNavClick('catalogue')}
          className="md:absolute md:left-1/2 md:-translate-x-1/2 flex flex-col items-center justify-center cursor-pointer group text-center z-10"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-luxury tracking-[0.25em] sm:tracking-[0.3em] text-[#231F20] uppercase group-hover:text-[#B26B59] transition-colors select-none">
            {SITE_CONFIG.name}
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.3em] sm:tracking-[0.38em] uppercase text-[#968982] font-medium mt-0.5 select-none">
            {SITE_CONFIG.tagline}
          </span>
        </div>

        {/* Right: Devis Button (Desktop) */}
        <div className="hidden md:flex items-center justify-end z-10">
          <button
            onClick={() => handleNavClick('devis')}
            className={`px-6 py-2.5 text-xs uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
              currentTab === 'devis'
                ? 'bg-[#B26B59] text-white border-[#B26B59] shadow-sm'
                : 'bg-transparent text-[#231F20] border-[#231F20] hover:bg-[#231F20] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Demander un Devis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile: Devis + Hamburger */}
        <div className="flex md:hidden items-center gap-2 z-10">
          <button
            onClick={() => handleNavClick('devis')}
            className="px-3.5 py-1.5 text-[11px] uppercase tracking-wider bg-[#B26B59] text-white font-medium"
          >
            Devis
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#231F20]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F4] border-t border-[#E8DFD8] px-6 py-5 space-y-3">
          <button
            onClick={() => handleNavClick('catalogue')}
            className={`block w-full text-left py-2 text-xs uppercase tracking-[0.2em] ${
              currentTab === 'catalogue' ? 'text-[#B26B59] font-bold' : 'text-[#4A4542]'
            }`}
          >
            Catalogue
          </button>

          {/* Mobile Gammes Sub-list */}
          <div className="pl-3 border-l-2 border-[#E8DFD8] space-y-1.5 my-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B26B59] font-bold block mb-1">
              Nos Gammes
            </span>
            {GAMMES_DATA.map((gamme) => (
              <button
                key={gamme.id}
                onClick={() => handleGammeClick(gamme.id)}
                className="w-full text-left py-1 text-xs text-[#5C524C] hover:text-[#B26B59] flex items-center justify-between"
              >
                <span>{gamme.tabLabel}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F3EDE8] text-[#8A7D75]">
                  {gamme.products.length}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick('a-propos')}
            className={`block w-full text-left py-2 text-xs uppercase tracking-[0.2em] ${
              currentTab === 'a-propos' ? 'text-[#B26B59] font-bold' : 'text-[#4A4542]'
            }`}
          >
            À Propos
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`block w-full text-left py-2 text-xs uppercase tracking-[0.2em] ${
              currentTab === 'contact' ? 'text-[#B26B59] font-bold' : 'text-[#4A4542]'
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => handleNavClick('devis')}
            className="w-full mt-3 py-3 bg-[#B26B59] text-white text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Demander un Devis</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
