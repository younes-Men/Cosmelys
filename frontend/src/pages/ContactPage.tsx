import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { API_BASE_URL } from '../config/api';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    sujet: 'Lancement de marque cosmétique',
    message: ''
  });

  const [isSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subjectOptions = [
    "Lancement de marque cosmétique (Private Label)",
    "Demande d'information sur les formulations R&D",
    "Tarifs et quantités minimales (MOQ)",
    "Packaging et design sur-mesure",
    "Réglementation cosmétique (DIP / DMP / Export)",
    "Visite du laboratoire ou rendez-vous téléphonique",
    "Autre demande personnalisée"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nom.trim() || !formData.prenom.trim() || !formData.message.trim()) {
      setErrorMessage('Veuillez remplir votre nom, prénom et votre message.');
      return;
    }

    setErrorMessage('');

    // Format WhatsApp message
    const formattedText =
`*NOUVEAU MESSAGE DE CONTACT - COSMELYS*

- Expediteur : ${formData.prenom.trim()} ${formData.nom.trim()}
${formData.telephone ? `- Telephone : ${formData.telephone.trim()}\n` : ''}- Sujet : ${formData.sujet}

*Message :*
${formData.message.trim()}

---
_Envoye via le formulaire de contact cosmelys.com_`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(formattedText)}`;

    // Background log to backend
    fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).catch(() => {});

    // Instantly open WhatsApp directly
    const opened = window.open(whatsappUrl, '_blank');
    if (!opened) {
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-[#231F20] pb-28">

      {/* Header */}
      <section className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-12 border-b border-[#EAE1DA]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-luxury uppercase tracking-[0.08em] text-[#231F20]">
            Contact
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[#918177] mt-3">
            Échangez Directement Avec Notre Laboratoire · Réponse Rapide
          </p>
        </div>
      </section>

      {/* Form + Info Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">

          {/* Form */}
          <div className="lg:col-span-7 bg-white border border-[#EAE1DA] p-6 sm:p-8 lg:p-10 space-y-6">
            <div className="border-b border-[#EAE1DA] pb-3">
              <h2 className="text-xl font-luxury uppercase tracking-wider text-[#231F20]">
                Envoyer un Message
              </h2>
              <p className="text-[11px] uppercase tracking-wider text-[#918177] mt-1">
                Votre message sera transmis directement sur WhatsApp
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-[#FBEBE8] border border-[#F0CEC7] text-[#9E3E2E] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#695D56] font-bold mb-1.5">
                    Nom <span className="text-[#B26B59]">*</span>
                  </label>
                  <input
                    type="text"
                    name="nom"
                    required
                    placeholder="Votre nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FAF7F4] border border-[#E0D5CD] text-xs text-[#231F20] focus:outline-hidden focus:border-[#B26B59]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#695D56] font-bold mb-1.5">
                    Prénom <span className="text-[#B26B59]">*</span>
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    required
                    placeholder="Votre prénom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FAF7F4] border border-[#E0D5CD] text-xs text-[#231F20] focus:outline-hidden focus:border-[#B26B59]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#695D56] font-bold mb-1.5">
                  Téléphone (WhatsApp)
                </label>
                <input
                  type="tel"
                  name="telephone"
                  placeholder="06 00 00 00 00"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAF7F4] border border-[#E0D5CD] text-xs text-[#231F20] focus:outline-hidden focus:border-[#B26B59]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#695D56] font-bold mb-1.5">
                  Sujet <span className="text-[#B26B59]">*</span>
                </label>
                <select
                  name="sujet"
                  value={formData.sujet}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAF7F4] border border-[#E0D5CD] text-xs uppercase tracking-wider text-[#231F20] focus:outline-hidden focus:border-[#B26B59] cursor-pointer"
                >
                  {subjectOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#695D56] font-bold mb-1.5">
                  Message <span className="text-[#B26B59]">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Décrivez votre projet, vos questions sur les formulations, packaging..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#FAF7F4] border border-[#E0D5CD] text-xs text-[#231F20] focus:outline-hidden focus:border-[#B26B59] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#B26B59] hover:bg-[#9E5746] text-white text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isSubmitting ? 'Préparation...' : 'Envoyer sur WhatsApp'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Laboratory Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#F4ECE7] border border-[#E5D7CE] space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B26B59] font-bold">
                Échange Direct
              </span>
              <h3 className="text-2xl font-luxury uppercase tracking-wider text-[#231F20]">
                Discuter avec notre équipe
              </h3>
              <p className="text-xs text-[#6B5D55] leading-relaxed">
                Notre responsable technique et commercial est joignable pour vous conseiller sur la formulation, le packaging et les formalités réglementaires.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#231F20] hover:bg-[#B26B59] text-white text-xs uppercase tracking-[0.16em] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discussion WhatsApp Directe</span>
                </a>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#EAE1DA] space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#231F20] font-bold border-b border-[#EAE1DA] pb-2">
                Informations Clés
              </p>
              <ul className="space-y-3 text-xs text-[#615751]">
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#B26B59] flex-shrink-0" />
                  <span>{SITE_CONFIG.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B26B59] flex-shrink-0" />
                  <span>{SITE_CONFIG.whatsappDisplay}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#B26B59] flex-shrink-0" />
                  <span>{SITE_CONFIG.email}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#B26B59] flex-shrink-0" />
                  <span>{SITE_CONFIG.hours}</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ContactPage;

