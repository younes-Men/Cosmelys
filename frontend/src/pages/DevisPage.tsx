import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { API_BASE_URL } from '../config/api';
import { GAMMES_DATA, QUANTITY_TIERS } from '../data/catalogData';
import type { ProductItem, GammeItem } from '../data/catalogData';
import {
  Plus,
  Trash2,
  MessageCircle,
  ArrowRight,
  ChevronDown,
  AlertCircle
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
        // If already in list, do not duplicate
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

    const validItems = items.filter(item => item.gammeId && item.productId);
    const whatsappText = buildWhatsAppMessage();
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(whatsappText)}`;

    // Save to backend (non-blocking)
    fetch(`${API_BASE_URL}/api/devis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: validItems })
    }).catch(() => {});

    // Instantly open WhatsApp directly
    const opened = window.open(whatsappUrl, '_blank');
    if (!opened) {
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-[#231F20] pb-28">

      {/* Header - Editorial Title */}
      <section className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-12 border-b border-[#EAE1DA]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-luxury uppercase tracking-[0.08em] text-[#231F20]">
            Demander Un Devis
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[#918177] mt-3">
            Composez Votre Gamme Personnalisée · Devis Instantané sur WhatsApp
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] sm:text-[11px] uppercase tracking-wider text-[#695D56]">
            <span>· Réponse sous 24h</span>
            <span>· Dès 50 unités par référence</span>
            <span>· Sans engagement</span>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12">

        {errorMsg && (
          <div className="mb-6 p-4 bg-[#FBEBE8] border border-[#F0CEC7] text-[#9E3E2E] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Devis Items */}
          {items.map((item, index) => {
            const selectedGamme: GammeItem | undefined = GAMMES_DATA.find(g => g.id === item.gammeId);

            return (
              <div
                key={item.id}
                className="bg-white border border-[#EAE1DA] p-5 sm:p-8 space-y-5"
              >
                {/* Item Header */}
                <div className="flex items-center justify-between border-b border-[#EAE1DA] pb-3">
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
                      className="text-[10px] uppercase tracking-wider text-[#A4948A] hover:text-[#B26B59] transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Supprimer</span>
                    </button>
                  )}
                </div>

                {/* Item Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">

                  {/* Step 1: Gamme */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#695D56] font-bold mb-2">
                      1. Gamme Cosmétique <span className="text-[#B26B59]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={item.gammeId}
                        onChange={(e) => updateItem(item.id, 'gammeId', e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF7F4] border border-[#E0D5CD] text-xs uppercase tracking-wider text-[#231F20] focus:outline-hidden focus:border-[#B26B59] appearance-none cursor-pointer"
                      >
                        <option value="">— Sélectionner une gamme —</option>
                        {GAMMES_DATA.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A] pointer-events-none" />
                    </div>
                  </div>

                  {/* Step 2: Product */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#695D56] font-bold mb-2">
                      2. Type de Produit <span className="text-[#B26B59]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={item.productId}
                        onChange={(e) => updateItem(item.id, 'productId', e.target.value)}
                        disabled={!item.gammeId}
                        className="w-full px-4 py-3 bg-[#FAF7F4] border border-[#E0D5CD] text-xs uppercase tracking-wider text-[#231F20] focus:outline-hidden focus:border-[#B26B59] appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <option value="">— Sélectionner un produit —</option>
                        {selectedGamme?.products.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A] pointer-events-none" />
                    </div>
                  </div>

                  {/* Step 3: Quantity */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#695D56] font-bold mb-2">
                      3. Quantité Souhaitée <span className="text-[#B26B59]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={item.quantite}
                        onChange={(e) => updateItem(item.id, 'quantite', e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF7F4] border border-[#E0D5CD] text-xs uppercase tracking-wider text-[#231F20] focus:outline-hidden focus:border-[#B26B59] appearance-none cursor-pointer"
                      >
                        {QUANTITY_TIERS.map(tier => (
                          <option key={tier.value} value={tier.value}>{tier.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C827A] pointer-events-none" />
                    </div>
                  </div>

                  {/* Step 4: Notes */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#695D56] font-bold mb-2">
                      4. Notes &amp; Spécifications (Optionnel)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Parfum, couleur, texture, packaging en verre, sans étiquette..."
                      value={item.notes}
                      onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF7F4] border border-[#E0D5CD] text-xs text-[#231F20] placeholder-[#A4978F] focus:outline-hidden focus:border-[#B26B59] resize-none"
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
            className="w-full py-4 border border-dashed border-[#C5B5A8] hover:border-[#231F20] text-[#6B5E55] hover:text-[#231F20] text-xs uppercase tracking-[0.18em] font-medium transition-colors flex items-center justify-center gap-2 bg-white"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter Une Autre Gamme / Produit</span>
          </button>

          {/* Summary & Submit Box */}
          <div className="p-6 sm:p-8 bg-[#F4ECE7] border border-[#E5D7CE] space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5D7CE] pb-3">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#231F20]">
                Récapitulatif de la Demande
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#B26B59]">
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
              className="w-full py-4 bg-[#B26B59] hover:bg-[#9E5746] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
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

