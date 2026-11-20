import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingBtn: React.FC = () => {

  const directWhatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Bonjour Cosmelys, je souhaite avoir des informations sur la fabrication de produits cosmétiques pour lancer ma marque."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      <a
        href={directWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 bg-[#B26B59] hover:bg-[#9E5746] text-white shadow-xl hover:scale-105 transition-all duration-300 border border-white"
        aria-label="Discuter sur WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-white group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
};
