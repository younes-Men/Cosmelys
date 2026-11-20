import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { GAMMES_DATA, QUANTITY_TIERS } from '../data/catalogData';
import type { ProductItem, GammeItem } from '../data/catalogData';
import {
  Plus,
  Trash2,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  AlertCircle,
  Check
} from 'lucide-react';

interface DevisItem {
  id: string;
  gammeId: string;
  gammeName: string;
  productId: string;
  productName: string;
  quantite: string;
  notes: string;
}

interface DevisPageProps {
  preSelectedProduct?: ProductItem | null;
  onClearPreselected?: () => void;
}

interface LuxurySelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface LuxurySelectProps {
  label: string;
  stepNumber: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: LuxurySelectOption[];
  placeholder: string;
  disabled?: boolean;
  disabledPlaceholder?: string;
}

const LuxurySelect: React.FC<LuxurySelectProps> = ({
  label,
  stepNumber,
  required,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  disabledPlaceholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="space-y-1.5" ref={containerRef}>
      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#695D56] font-bold">
        {stepNumber} {label} {required && <span className="text-[#B26B59]">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
            disabled
              ? 'bg-[#F5F2EF]/60 border-[#E5DDD6] text-[#A89E97] cursor-not-allowed opacity-60'
              : isOpen
              ? 'bg-white border-[#B26B59] ring-2 ring-[#B26B59]/20 shadow-md'
              : 'bg-[#FAF7F4] hover:bg-[#F6F1EC] border-[#E0D5CD] text-[#231F20]'
          }`}
        >
          <div className="min-w-0 flex-1">
            <span className={`block text-xs uppercase tracking-wider font-semibold leading-relaxed ${
              selectedOption ? 'text-[#231F20]' : 'text-[#8C8078]'
            }`}>
              {selectedOption ? selectedOption.label : (disabled ? disabledPlaceholder || placeholder : placeholder)}
            </span>
            {selectedOption?.sublabel && (
              <span className="block text-[11px] text-[#8C8078] mt-0.5 leading-normal">
                {selectedOption.sublabel}
              </span>
            )}
          </div>

          <ChevronDown
            className={`w-4 h-4 text-[#8C827A] flex-shrink-0 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-[#B26B59]' : ''
            }`}
          />
        </button>

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-white border border-[#E5D7CE] rounded-2xl shadow-2xl p-2 space-y-1 max-h-[320px] overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-200">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#FAF2EE] text-[#231F20] border border-[#E9D6CC]'
                      : 'hover:bg-[#FAF7F4] text-[#4F4641]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs uppercase tracking-wider font-semibold leading-relaxed ${
                      isSelected ? 'text-[#B26B59]' : 'text-[#231F20]'
                    }`}>
                      {opt.label}
                    </p>
                    {opt.sublabel && (
                      <p className="text-[11px] text-[#80726A] mt-0.5 leading-normal">
                        {opt.sublabel}
                      </p>
                    )}
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#B26B59] text-white flex items-center justify-center flex-shrink-0 ml-2">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const emptyItem = (): DevisItem => ({
  id: Math.random().toString(36).substr(2, 9),
  gammeId: '',
  gammeName: '',
  productId: '',
  productName: '',
  quantite: '100',
  notes: ''
});

const createItemFromProduct = (product: ProductItem): DevisItem => ({
  id: Math.random().toString(36).substr(2, 9),
  gammeId: product.gammeId,
  gammeName: product.gammeName,
  productId: product.id,
  productName: product.name,
  quantite: '100',
  notes: ''
});

export const DevisPage: React.FC<DevisPageProps> = ({
  preSelectedProduct,
  onClearPreselected
}) => {
  const [items, setItems] = useState<DevisItem[]>(() => {
    return preSelectedProduct ? [createItemFromProduct(preSelectedProduct)] : [emptyItem()];
  });
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-fill from catalogue selection (guaranteed no duplication)
  useEffect(() => {
    if (preSelectedProduct) {
      setItems(prev => {
        if (prev.some(item => item.productId === preSelectedProduct.id)) {
          return prev;
        }
        const hasOnlyEmpty = prev.length === 1 && !prev[0].gammeId;
        return hasOnlyEmpty
          ? [createItemFromProduct(preSelectedProduct)]
          : [...prev, createItemFromProduct(preSelectedProduct)];
      });
      onClearPreselected?.();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [preSelectedProduct]);

  const updateItem = (id: string, field: keyof DevisItem, value: string) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      if (field === 'gammeId') {
        const gamme = GAMMES_DATA.find(g => g.id === value);
        return {
          ...item,
          gammeId: value,
          gammeName: gamme?.name || '',
          productId: '',
          productName: ''
        };
      }
      if (field === 'productId') {
        const gamme = GAMMES_DATA.find(g => g.id === item.gammeId);
        const product = gamme?.products.find(p => p.id === value);
        return { ...item, productId: value, productName: product?.name || '' };
      }
      return { ...item, [field]: value };
    }));
  };

  const addItem = () => setItems(prev => [...prev, emptyItem()]);

  const removeItem = (id: string) => {
    if (items.length === 1) return;
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const isValid = items.some(item => item.gammeId && item.productId);

  const buildWhatsAppMessage = () => {
    const lines: string[] = [
      `*DEMANDE DE DEVIS - COSMELYS*`,
      ``,
      `*Detail des produits demandes :*`,
      ``
    ];

    items.forEach((item, i) => {
      if (!item.gammeId || !item.productId) return;
      lines.push(`*Produit ${i + 1} :*`);
      lines.push(`  - Gamme : ${item.gammeName}`);
      lines.push(`  - Produit : ${item.productName}`);
      lines.push(`  - Quantite souhaitee : ${item.quantite} unites`);
      if (item.notes.trim()) lines.push(`  - Notes : ${item.notes.trim()}`);
      lines.push('');
    });

    lines.push(`---`);
    lines.push(`_Demande envoyee depuis cosmelys.com_`);

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setErrorMsg('Veuillez sélectionner au moins une gamme et un type de produit.');
      return;
    }

    setErrorMsg('');

    const whatsappText = buildWhatsAppMessage();
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(whatsappText)}`;

    // Instantly open WhatsApp directly
    const opened = window.open(whatsappUrl, '_blank');
    if (!opened) {
      window.location.href = whatsappUrl;
    }
  };

  const gammeOptions: LuxurySelectOption[] = GAMMES_DATA.map(g => ({
    value: g.id,
    label: g.name,
    sublabel: `${g.products.length} références disponibles`
  }));

  const quantityOptions: LuxurySelectOption[] = QUANTITY_TIERS.map(tier => ({
    value: tier.value,
    label: `${tier.value} unités`,
    sublabel: tier.label.includes('(') ? tier.label.replace(/^.*?\((.*?)\)$/, '$1') : undefined
  }));

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-[#231F20] pb-28">

      {/* Header - Cleaned per user request */}
      <section className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-12 border-b border-[#EAE1DA]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-luxury uppercase tracking-[0.08em] text-[#231F20]">
            Demander Un Devis
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[#918177] mt-3">
            Composez Votre Gamme Personnalisée
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12">

        {errorMsg && (
          <div className="mb-6 p-4 bg-[#FBEBE8] border border-[#F0CEC7] text-[#9E3E2E] text-xs flex items-center gap-2 rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Devis Items */}
          {items.map((item, index) => {
            const selectedGamme: GammeItem | undefined = GAMMES_DATA.find(g => g.id === item.gammeId);

            const productOptions: LuxurySelectOption[] = selectedGamme?.products.map(p => ({
              value: p.id,
              label: p.name,
              sublabel: p.shortDesc || undefined
            })) || [];

            return (
              <div
                key={item.id}
                className="bg-white border border-[#EAE1DA] p-5 sm:p-8 space-y-6 rounded-3xl shadow-xs"
              >
                {/* Item Header */}
                <div className="flex items-center justify-between border-b border-[#EAE1DA] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-widest text-[#B26B59] font-bold">
                      Produit #{index + 1}
                    </span>
                    {item.productName && (
                      <span className="text-xs uppercase tracking-wide text-[#231F20] font-medium hidden sm:inline">
                        — {item.productName}
                      </span>
                    )}
                  </div>

                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] uppercase tracking-wider text-[#A4948A] hover:text-[#B26B59] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Supprimer</span>
                    </button>
                  )}
                </div>

                {/* Item Fields with Luxury Custom Selects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">

                  {/* Step 1: Gamme */}
                  <LuxurySelect
                    stepNumber="1."
                    label="Gamme Cosmétique"
                    required
                    value={item.gammeId}
                    onChange={(val) => updateItem(item.id, 'gammeId', val)}
                    options={gammeOptions}
                    placeholder="— Sélectionner une gamme —"
                  />

                  {/* Step 2: Product */}
                  <LuxurySelect
                    stepNumber="2."
                    label="Type de Produit"
                    required
                    value={item.productId}
                    onChange={(val) => updateItem(item.id, 'productId', val)}
                    options={productOptions}
                    placeholder="— Sélectionner un produit —"
                    disabled={!item.gammeId}
                    disabledPlaceholder="— Choisissez d'abord une gamme —"
                  />

                  {/* Step 3: Quantity */}
                  <LuxurySelect
                    stepNumber="3."
                    label="Quantité Souhaitée"
                    required
                    value={item.quantite}
                    onChange={(val) => updateItem(item.id, 'quantite', val)}
                    options={quantityOptions}
                    placeholder="— Choisir une quantité —"
                  />

                  {/* Step 4: Notes */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#695D56] font-bold">
                      4. Notes &amp; Spécifications (Optionnel)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Parfum, couleur, texture, packaging en verre, sans étiquette..."
                      value={item.notes}
                      onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF7F4] hover:bg-[#F6F1EC] focus:bg-white border border-[#E0D5CD] focus:border-[#B26B59] rounded-xl text-xs text-[#231F20] placeholder-[#A4978F] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#B26B59]/15 resize-none"
                    />
                  </div>

                </div>
              </div>
            );
          })}

          {/* Add Another Item Button */}
          <button
            type="button"
            onClick={addItem}
            className="w-full py-4 border border-dashed border-[#C5B5A8] hover:border-[#231F20] text-[#6B5E55] hover:text-[#231F20] text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2 bg-white rounded-2xl cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter Une Autre Gamme / Produit</span>
          </button>

          {/* Summary & Submit Box */}
          <div className="p-6 sm:p-8 bg-[#F4ECE7] border border-[#E5D7CE] space-y-5 rounded-3xl">
            <div className="flex items-center justify-between border-b border-[#E5D7CE] pb-3">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#231F20]">
                Récapitulatif de la Demande
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#B26B59] font-semibold">
                {items.filter(i => i.gammeId && i.productId).length} Sélection(s)
              </span>
            </div>

            <div className="space-y-2">
              {items.filter(i => i.gammeId && i.productId).map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-[#EAE0D7]/60">
                  <span className="font-medium uppercase tracking-wide text-[#231F20]">{item.productName}</span>
                  <span className="text-[#B26B59] font-semibold">{item.quantite} unités</span>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="w-full py-4.5 bg-[#B26B59] hover:bg-[#9E5746] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer rounded-2xl shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Envoyer la Demande sur WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] uppercase tracking-wider text-center text-[#8C8078]">
              Votre message sera prêt à envoyer directement dans votre conversation WhatsApp avec Cosmelys.
            </p>
          </div>

        </form>
      </section>
    </div>
  );
};

export default DevisPage;
