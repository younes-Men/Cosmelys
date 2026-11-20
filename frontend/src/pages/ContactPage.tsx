import React, { useState, useRef, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle,
  Sparkles,
  FlaskConical,
  Package,
  ShieldCheck,
  Calendar,
  HelpCircle,
  Check,
  ChevronDown,
  User,
  Send,
  Building2
} from 'lucide-react';

interface SubjectOption {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SUBJECT_OPTIONS: SubjectOption[] = [
  {
    id: "private-label",
    label: "Lancement de marque cosmétique (Private Label)",
    desc: "Formulations clés en main avec packaging personnalisé dès 50 pièces",
    icon: Sparkles
  },
  {
    id: "rd-formulation",
    label: "Demande d'information sur les formulations R&D",
    desc: "Développement sur-mesure d'actifs, textures et parfums signatures",
    icon: FlaskConical
  },
  {
    id: "tarifs-moq",
    label: "Tarifs et quantités minimales (MOQ)",
    desc: "Grille tarifaire dégressive, volumes et conditions de commande",
    icon: Building2
  },
  {
    id: "packaging-design",
    label: "Packaging et design sur-mesure",
    desc: "Flacons en verre/PET, sérigraphie haute définition et étiquetage",
    icon: Package
  },
  {
    id: "reglementation",
    label: "Réglementation cosmétique (DIP / DMP / Export)",
    desc: "Conformité ISO 22716, certificats COA et dossiers légaux",
    icon: ShieldCheck
  },
  {
    id: "rdv-labo",
    label: "Visite du laboratoire ou rendez-vous téléphonique",
    desc: "Planifier un échange approfondi avec nos formulateurs",
    icon: Calendar
  },
  {
    id: "autre",
    label: "Autre demande personnalisée",
    desc: "Partenariat, distribution ou projet cosmétique spécifique",
    icon: HelpCircle
  }
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    sujet: SUBJECT_OPTIONS[0].label,
    message: ''
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMessage('');
  };

  const handleSelectSubject = (option: SubjectOption) => {
    setFormData(prev => ({
      ...prev,
      sujet: option.label
    }));
    setDropdownOpen(false);
    setErrorMessage('');
  };

  const selectedOption = SUBJECT_OPTIONS.find(opt => opt.label === formData.sujet) || SUBJECT_OPTIONS[0];
  const SelectedIcon = selectedOption.icon;

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

- Expéditeur : ${formData.prenom.trim()} ${formData.nom.trim()}
${formData.telephone ? `- Téléphone : ${formData.telephone.trim()}\n` : ''}- Sujet : ${formData.sujet}

*Message :*
${formData.message.trim()}

---
_Envoyé via le formulaire de contact cosmelys.com_`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${SITE_CONFIG.whatsappNumber}&text=${encodeURIComponent(formattedText)}`;

    // Open WhatsApp directly
    const opened = window.open(whatsappUrl, '_blank');
    if (!opened) {
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F4] text-[#231F20] pb-28">

      {/* Form + Information Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EAE1DA] shadow-xs p-6 sm:p-10 space-y-7 relative">

            <div className="border-b border-[#F0E6DF] pb-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#B26B59] font-bold block mb-1">
                  Formulaire Direct
                </span>
                <h2 className="text-2xl font-luxury uppercase tracking-wider text-[#231F20]">
                  Transmettre Votre Demande
                </h2>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#FAF5F2] border border-[#EADFD7] flex items-center justify-center text-[#B26B59]">
                <Send className="w-4 h-4" />
              </div>
            </div>

            {errorMessage && (
              <div className="p-4 bg-[#FBEBE8] border border-[#F0CEC7] rounded-xl text-[#9E3E2E] text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Nom & Prénom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#695D56] font-bold mb-2">
                    Nom <span className="text-[#B26B59]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="nom"
                      required
                      placeholder="Votre nom de famille"
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#FAF7F4] hover:bg-[#F6F1EC] focus:bg-white border border-[#E0D5CD] focus:border-[#B26B59] rounded-xl text-xs text-[#231F20] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#B26B59]/15"
                    />
                    <User className="w-4 h-4 text-[#A89C94] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#695D56] font-bold mb-2">
                    Prénom <span className="text-[#B26B59]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="prenom"
                      required
                      placeholder="Votre prénom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#FAF7F4] hover:bg-[#F6F1EC] focus:bg-white border border-[#E0D5CD] focus:border-[#B26B59] rounded-xl text-xs text-[#231F20] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#B26B59]/15"
                    />
                    <User className="w-4 h-4 text-[#A89C94] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* CUSTOM LUXURY SELECT DROPDOWN */}
              <div className="space-y-2" ref={dropdownRef}>
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] uppercase tracking-[0.16em] text-[#695D56] font-bold">
                    Sujet de votre démarche <span className="text-[#B26B59]">*</span>
                  </label>
                  <span className="text-[10px] text-[#A89C94] uppercase tracking-wider">
                    {SUBJECT_OPTIONS.length} options disponibles
                  </span>
                </div>

                <div className="relative">
                  {/* Select Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                      dropdownOpen
                        ? 'border-[#B26B59] ring-2 ring-[#B26B59]/20 bg-white shadow-md'
                        : 'border-[#E0D5CD] bg-[#FAF7F4] hover:bg-[#F6F1EC] hover:border-[#CBBDB4]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#F4EBE5] text-[#B26B59] flex items-center justify-center flex-shrink-0 border border-[#E8D9CF]">
                        <SelectedIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs uppercase tracking-wider font-bold text-[#231F20] truncate">
                          {selectedOption.label}
                        </span>
                        <span className="block text-[11px] text-[#80726A] truncate">
                          {selectedOption.desc}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-[#8C8078] flex-shrink-0 transition-transform duration-300 ${
                        dropdownOpen ? 'rotate-180 text-[#B26B59]' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Panel */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white border border-[#E5D7CE] rounded-2xl shadow-2xl p-2 space-y-1 max-h-[380px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#A6978E] font-bold border-b border-[#F4EAE3]">
                        Choisissez votre sujet
                      </div>

                      {SUBJECT_OPTIONS.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = opt.label === formData.sujet;

                        return (
                          <div
                            key={opt.id}
                            onClick={() => handleSelectSubject(opt)}
                            className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-[#FAF2EE] text-[#231F20] border border-[#E9D6CC]'
                                : 'hover:bg-[#FAF7F4] text-[#4F4641]'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  isSelected
                                    ? 'bg-[#B26B59] text-white shadow-xs'
                                    : 'bg-[#F4ECE6] text-[#8C7A70]'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <p className={`text-xs uppercase tracking-wider font-semibold truncate ${
                                  isSelected ? 'text-[#B26B59]' : 'text-[#231F20]'
                                }`}>
                                  {opt.label}
                                </p>
                                <p className="text-[11px] text-[#80726A] truncate">
                                  {opt.desc}
                                </p>
                              </div>
                            </div>

                            {isSelected && (
                              <div className="w-6 h-6 rounded-full bg-[#B26B59] text-white flex items-center justify-center flex-shrink-0">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-[#695D56] font-bold mb-2">
                  Détail de votre projet ou question <span className="text-[#B26B59]">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Décrivez vos besoins : type de cosmétique souhaité (crème, sérum, gommage, capillaire...), quantités envisagées, délais..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 bg-[#FAF7F4] hover:bg-[#F6F1EC] focus:bg-white border border-[#E0D5CD] focus:border-[#B26B59] rounded-xl text-xs text-[#231F20] placeholder-[#A4978F] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#B26B59]/15 resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4.5 bg-[#B26B59] hover:bg-[#9E5746] text-white text-xs uppercase tracking-[0.22em] font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Envoyer directement sur WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] text-center text-[#94877F] leading-relaxed">
                Votre message est préparé instantanément pour notre laboratoire. Une copie de sauvegarde est archivée pour un suivi rigoureux.
              </p>
            </form>
          </div>

          {/* Right Column: Direct Channels & Laboratory Info */}
          <div className="lg:col-span-5 space-y-6">

            {/* Direct WhatsApp Callout Card */}
            <div className="p-7 sm:p-8 bg-[#231F20] text-white rounded-3xl shadow-sm space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#B26B59]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E0A89C] font-bold">
                  Canal Prioritaire
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#352D2E] text-[10px] text-[#A6E3B5] border border-[#483C3D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                  En Ligne
                </span>
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="text-2xl font-luxury uppercase tracking-wider text-white">
                  WhatsApp Direct
                </h3>
                <p className="text-xs text-[#B5ABA5] leading-relaxed">
                  Idéal pour obtenir une estimation tarifaire immédiate, poser une question sur nos textures ou demander l'envoi d'échantillons.
                </p>
              </div>

              <div className="pt-2 relative z-10">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#B26B59] hover:bg-[#C27A68] text-white text-xs uppercase tracking-[0.18em] font-bold rounded-2xl transition-all duration-300 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuter Maintenant</span>
                </a>
              </div>
            </div>

            {/* Practical Contact Info Card */}
            <div className="p-7 sm:p-8 bg-white border border-[#EAE1DA] rounded-3xl shadow-xs space-y-6">
              <div className="border-b border-[#EAE1DA] pb-3 flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#231F20] font-bold">
                  Coordonnées du Laboratoire
                </h4>
                <Building2 className="w-4 h-4 text-[#B26B59]" />
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3.5 group">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5F2] border border-[#EBDED5] text-[#B26B59] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#9C8F87] font-semibold">
                      Adresse &amp; Site de Production
                    </span>
                    <span className="text-xs text-[#231F20] font-medium">
                      {SITE_CONFIG.address}, Maroc
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5 group">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5F2] border border-[#EBDED5] text-[#B26B59] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#9C8F87] font-semibold">
                      Téléphone Commercial
                    </span>
                    <a
                      href={`tel:${SITE_CONFIG.whatsappNumber}`}
                      className="text-xs text-[#231F20] font-medium hover:text-[#B26B59] transition-colors"
                    >
                      {SITE_CONFIG.whatsappDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5 group">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5F2] border border-[#EBDED5] text-[#B26B59] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#9C8F87] font-semibold">
                      Email de Contact
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-xs text-[#231F20] font-medium hover:text-[#B26B59] transition-colors"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3.5 group">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5F2] border border-[#EBDED5] text-[#B26B59] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#9C8F87] font-semibold">
                      Horaires d'Ouverture
                    </span>
                    <span className="text-xs text-[#231F20]">
                      {SITE_CONFIG.hours}
                    </span>
                  </div>
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
