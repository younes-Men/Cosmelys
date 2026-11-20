import React, { useEffect } from 'react';
import type { ProductItem } from '../data/catalogData';
import {
  X,
  Check,
  Box,
  Droplet,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onSelectForDevis: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectForDevis
}) => {
  // Lock background scroll when modal is open
  useEffect(() => {
    if (!product) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [product]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overscroll-contain"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF7F4] border border-[#EAE1DA] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE1DA] bg-white">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#B26B59] font-bold">
              {product.gammeName.replace('Gamme ', '')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#8A7D75]">
              · MOQ Dès {product.moq} pcs
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#8A7D75] hover:text-[#231F20] transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative aspect-square bg-white border border-[#EAE1DA] p-4 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80";
                }}
              />
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-luxury uppercase tracking-wider text-[#231F20]">
                  {product.name}
                </h3>
                <p className="text-xs text-[#6B5E57] mt-2 leading-relaxed">
                  {product.fullDesc}
                </p>
              </div>

              <div className="p-4 bg-white border border-[#EAE1DA] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#4A423D]">
                  <Droplet className="w-3.5 h-3.5 text-[#B26B59]" />
                  <span className="font-bold uppercase tracking-wider text-[10px]">Texture :</span>
                  <span>{product.texture}</span>
                </div>
                <div className="space-y-1 text-[#4A423D]">
                  <div className="flex items-center gap-2">
                    <Box className="w-3.5 h-3.5 text-[#B26B59]" />
                    <span className="font-bold uppercase tracking-wider text-[10px]">Flaconnage :</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pl-5">
                    {product.packagingOptions.map((opt, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#FAF7F4] border border-[#EAE1DA] text-[10px] text-[#554C46]">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-[#786D66]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B26B59]" />
                  <span>Dossier DIP &amp; DMP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#B26B59]" />
                  <span>Norme ISO 22716</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Ingredients */}
          <div className="border-t border-[#EAE1DA] pt-4">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#231F20] mb-2">
              Ingrédients Actifs
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.keyIngredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white border border-[#EAE1DA] text-[10px] uppercase tracking-wider text-[#63574F]"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="border-t border-[#EAE1DA] pt-4">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#231F20] mb-2">
              Bénéfices de la Formule
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#63574F]">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 p-2 bg-white border border-[#EAE1DA]">
                  <Check className="w-3.5 h-3.5 text-[#B26B59] flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#EAE1DA] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-[#8C8078] uppercase tracking-wider">
            Intégrer ce produit à votre future marque
          </span>
          <button
            onClick={() => {
              onSelectForDevis(product);
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#B26B59] hover:bg-[#9E5746] text-white text-xs uppercase tracking-[0.16em] font-medium transition-colors flex items-center justify-center gap-2"
          >
            <span>Ajouter Au Devis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
