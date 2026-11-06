import React, { useState, useEffect } from 'react';
import {
  Mail,
  Copy,
  Check,
  AlertCircle,
  RotateCcw,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { siteConfig, ServiceId } from '../config/siteConfig';

interface QuoteFormProps {
  selectedServiceId: ServiceId;
  onServiceChange: (serviceId: ServiceId) => void;
}

interface QuoteFormData {
  fullName: string;
  organization: string;
  phone: string;
  email: string;
  locality: string;
  desiredDate: string;
  budget: string;
  description: string;
  recipientEmail: string;
  cateringGuestCount: string;
  cateringFrequency: string;
  cateringLocation: string;
  eventType: string;
  eventDate: string;
  eventParticipants: string;
  productType: string;
  productQuantity: string;
  originDestination: string;
  serviceNature: string;
  serviceConstraints: string;
}

interface FormErrors {
  fullName?: string;
  contact?: string;
  emailFormat?: string;
  service?: string;
  description?: string;
}

const STORAGE_KEY = 'wirkom_quote_draft_v1';
const MAX_MAILTO_LENGTH = 1850;

const initialFormData: QuoteFormData = {
  fullName: '',
  organization: '',
  phone: '',
  email: '',
  locality: '',
  desiredDate: '',
  budget: siteConfig.budgetOptions[0],
  description: '',
  recipientEmail: siteConfig.primaryEmail,
  cateringGuestCount: '',
  cateringFrequency: '',
  cateringLocation: '',
  eventType: '',
  eventDate: '',
  eventParticipants: '',
  productType: '',
  productQuantity: '',
  originDestination: '',
  serviceNature: '',
  serviceConstraints: '',
};

export const QuoteForm: React.FC<QuoteFormProps> = ({
  selectedServiceId,
  onServiceChange,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initialFormData, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage error
    }
    return initialFormData;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [copiedState, setCopiedState] = useState(false);
  const [mailtoPreparedState, setMailtoPreparedState] = useState<{
    opened: boolean;
    wasTruncated: boolean;
  } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // Ignore storage error
    }
  }, [formData]);

  const currentService =
    siteConfig.services.find((s) => s.id === selectedServiceId) ||
    siteConfig.services[0];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors.fullName && name === 'fullName') {
      setErrors((prev) => ({ ...prev, fullName: undefined }));
    }
    if (
      (errors.contact || errors.emailFormat) &&
      (name === 'phone' || name === 'email')
    ) {
      setErrors((prev) => ({
        ...prev,
        contact: undefined,
        emailFormat: undefined,
      }));
    }
    if (errors.description && name === 'description') {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Veuillez indiquer votre nom complet.';
    }

    const hasPhone = formData.phone.trim().length > 0;
    const hasEmail = formData.email.trim().length > 0;

    if (!hasPhone && !hasEmail) {
      newErrors.contact =
        'Veuillez renseigner au moins un numéro de téléphone ou une adresse e-mail pour que nous puissions vous recontacter.';
    }

    if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.emailFormat = 'Le format de l’adresse e-mail semble invalide.';
    }

    if (!selectedServiceId) {
      newErrors.service = 'Veuillez sélectionner le service recherché.';
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description =
        'Veuillez décrire brièvement votre besoin (au moins 10 caractères).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildFormattedMessage = (shortVersion = false): string => {
    const lines: string[] = [
      `Bonjour ${siteConfig.companyName},`,
      '',
      `Je souhaite vous soumettre une demande concernant le domaine : ${currentService.title}.`,
      '',
      '--- COORDONNÉES DU DEMANDEUR ---',
      `Nom complet : ${formData.fullName.trim() || 'Non renseigné'}`,
    ];

    if (formData.organization.trim()) {
      lines.push(`Entreprise / Organisation : ${formData.organization.trim()}`);
    }
    if (formData.phone.trim()) {
      lines.push(`Téléphone : ${formData.phone.trim()}`);
    }
    if (formData.email.trim()) {
      lines.push(`E-mail : ${formData.email.trim()}`);
    }

    lines.push('');
    lines.push('--- CADRE DU PROJET ---');
    lines.push(`Service recherché : ${currentService.title}`);
    if (formData.locality.trim()) {
      lines.push(`Localité du projet : ${formData.locality.trim()}`);
    }
    if (formData.desiredDate.trim()) {
      lines.push(`Date ou échéance souhaitée : ${formData.desiredDate.trim()}`);
    }
    if (formData.budget.trim()) {
      lines.push(`Budget indicatif : ${formData.budget.trim()}`);
    }

    const specificLines: string[] = [];
    if (selectedServiceId === 'restauration-collective') {
      if (formData.cateringGuestCount.trim()) {
        specificLines.push(
          `Nombre estimatif de personnes : ${formData.cateringGuestCount.trim()}`
        );
      }
      if (formData.cateringFrequency.trim()) {
        specificLines.push(
          `Fréquence ou date : ${formData.cateringFrequency.trim()}`
        );
      }
      if (formData.cateringLocation.trim()) {
        specificLines.push(
          `Lieu de la prestation : ${formData.cateringLocation.trim()}`
        );
      }
    } else if (selectedServiceId === 'evenementiel') {
      if (formData.eventType.trim()) {
        specificLines.push(`Type d’événement : ${formData.eventType.trim()}`);
      }
      if (formData.eventDate.trim()) {
        specificLines.push(`Date de l’événement : ${formData.eventDate.trim()}`);
      }
      if (formData.eventParticipants.trim()) {
        specificLines.push(
          `Nombre estimatif de participants : ${formData.eventParticipants.trim()}`
        );
      }
    } else if (
      selectedServiceId === 'commerce-general' ||
      selectedServiceId === 'import-export'
    ) {
      if (formData.productType.trim()) {
        specificLines.push(
          `Produit ou marchandise : ${formData.productType.trim()}`
        );
      }
      if (formData.productQuantity.trim()) {
        specificLines.push(
          `Quantité indicative : ${formData.productQuantity.trim()}`
        );
      }
      if (formData.originDestination.trim()) {
        specificLines.push(
          `Origine ou destination : ${formData.originDestination.trim()}`
        );
      }
    } else if (selectedServiceId === 'prestations-services') {
      if (formData.serviceNature.trim()) {
        specificLines.push(
          `Nature du besoin : ${formData.serviceNature.trim()}`
        );
      }
      if (formData.serviceConstraints.trim()) {
        specificLines.push(
          `Contraintes principales : ${formData.serviceConstraints.trim()}`
        );
      }
    }

    if (specificLines.length > 0) {
      lines.push('');
      lines.push(`--- PRÉCISIONS (${currentService.title.toUpperCase()}) ---`);
      lines.push(...specificLines);
    }

    lines.push('');
    lines.push('--- DESCRIPTION DU BESOIN ---');
    if (shortVersion && formData.description.trim().length > 350) {
      lines.push(
        `${formData.description.trim().slice(0, 350)}... [Message complet copié dans le presse-papiers : collez-le ici]`
      );
    } else {
      lines.push(formData.description.trim() || 'À préciser');
    }

    lines.push('');
    lines.push('Cordialement,');
    lines.push(formData.fullName.trim() || '');

    return lines.join('\n');
  };

  const buildEmailSubject = (): string => {
    const orgSuffix = formData.organization.trim()
      ? ` - ${formData.organization.trim()}`
      : formData.fullName.trim()
      ? ` - ${formData.fullName.trim()}`
      : '';
    return `Demande de devis [${currentService.title}]${orgSuffix}`;
  };

  const handleCopyRequest = async () => {
    const textToCopy = `Objet : ${buildEmailSubject()}\nDestinataire : ${
      formData.recipientEmail
    }\n\n${buildFormattedMessage(false)}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 3500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 3500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = encodeURIComponent(buildEmailSubject());
    const fullBody = buildFormattedMessage(false);
    const encodedFullBody = encodeURIComponent(fullBody);
    const fullMailtoUrl = `mailto:${formData.recipientEmail}?subject=${subject}&body=${encodedFullBody}`;

    if (fullMailtoUrl.length > MAX_MAILTO_LENGTH) {
      await handleCopyRequest();
      const shortBody = encodeURIComponent(buildFormattedMessage(true));
      const safeMailtoUrl = `mailto:${formData.recipientEmail}?subject=${subject}&body=${shortBody}`;
      setMailtoPreparedState({ opened: true, wasTruncated: true });
      window.location.href = safeMailtoUrl;
    } else {
      setMailtoPreparedState({ opened: true, wasTruncated: false });
      window.location.href = fullMailtoUrl;
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setMailtoPreparedState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const hasValidWhatsApp = siteConfig.whatsappNumber.trim().length > 0;
  const whatsappCleanNumber = siteConfig.whatsappNumber.replace(/[^\d+]/g, '');

  const inputBaseClasses =
    'w-full rounded-xl border border-[#E2E7E2] dark:border-[#2C332E] bg-white dark:bg-[#141715] px-3.5 py-2.5 text-sm text-[#262626] dark:text-[#F3F5F3] placeholder:text-[#626B65]/60 dark:placeholder:text-[#A3ADA7]/60 focus:border-[#115B38] dark:focus:border-[#FF6600] transition-colors';

  const subInputClasses =
    'w-full rounded-lg border border-[#E2E7E2] dark:border-[#2C332E] bg-[#F7F8F6] dark:bg-[#1E2320] px-3 py-2 text-xs sm:text-sm text-[#262626] dark:text-[#F3F5F3] placeholder:text-[#626B65]/60 dark:placeholder:text-[#A3ADA7]/60 focus:border-[#115B38] dark:focus:border-[#FF6600] transition-colors';

  return (
    <section
      id="devis"
      className="py-14 sm:py-24 bg-white dark:bg-[#171A18] border-b border-[#E2E7E2] dark:border-[#2C332E] transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Colonne gauche : Explications et récapitulatif */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#115B38] dark:text-[#42C082] mb-3">
              <span
                aria-hidden="true"
                className="inline-block h-0.5 w-8 bg-[#FF6600]"
              />
              <span>Demande de devis</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#262626] dark:text-[#F3F5F3] text-balance">
              Préparez votre demande sur mesure
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#626B65] dark:text-[#B4BEB8] leading-relaxed">
              Ce formulaire structure toutes les informations utiles selon le service choisi. Changer de service conserve vos informations déjà saisies.
            </p>

            {/* Encadré d'explication honnête de la transmission */}
            <div className="mt-6 rounded-2xl bg-[#F7F8F6] dark:bg-[#1E2320] border border-[#E2E7E2] dark:border-[#2C332E] p-5 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#115B38] dark:text-[#42C082] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-[#262626] dark:text-[#F3F5F3]">
                    Fonctionnement transparent par e-mail
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#626B65] dark:text-[#B4BEB8] leading-relaxed">
                    Votre application de messagerie s’ouvrira avec les informations saisies. Envoyez le message pour transmettre votre demande.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E7E2] dark:border-[#2C332E] text-xs space-y-2">
                <label
                  htmlFor="recipientEmailSelect"
                  className="block font-medium text-[#262626] dark:text-[#F3F5F3]"
                >
                  Adresse e-mail destinataire :
                </label>
                <select
                  id="recipientEmailSelect"
                  name="recipientEmail"
                  value={formData.recipientEmail}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-[#E2E7E2] dark:border-[#2C332E] bg-white dark:bg-[#141715] px-3 py-2.5 text-xs sm:text-sm font-medium text-[#115B38] dark:text-[#42C082] focus:border-[#115B38] dark:focus:border-[#FF6600]"
                >
                  {siteConfig.emails.map((emailAddr) => (
                    <option key={emailAddr} value={emailAddr}>
                      {emailAddr}
                      {emailAddr === siteConfig.primaryEmail
                        ? ' (Contact principal)'
                        : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Aperçu en direct du service actif */}
            <div className="mt-6 rounded-2xl bg-[#EEF5F0] dark:bg-[#115B38]/20 border border-[#115B38]/15 dark:border-[#115B38]/40 p-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-[#115B38] dark:text-[#42C082]">
                  Service actuellement sélectionné
                </span>
                <span className="text-xs font-mono font-bold text-[#FF6600]">
                  N° {currentService.number}
                </span>
              </div>
              <p className="text-base font-bold text-[#262626] dark:text-[#F3F5F3]">
                {currentService.title}
              </p>
              <p className="mt-1 text-xs text-[#626B65] dark:text-[#B4BEB8] leading-relaxed">
                {currentService.description}
              </p>
            </div>
          </div>

          {/* Colonne droite : Formulaire progressif */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl bg-[#F7F8F6] dark:bg-[#1E2320] border border-[#E2E7E2] dark:border-[#2C332E] p-5 sm:p-8 space-y-6"
            >
              {/* 1. Choix du service recherché */}
              <div>
                <label className="block text-sm font-semibold text-[#262626] dark:text-[#F3F5F3] mb-2">
                  Service recherché <span className="text-[#FF6600]">*</span>
                </label>
                <div
                  role="radiogroup"
                  aria-label="Service recherché"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                >
                  {siteConfig.services.map((service) => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => onServiceChange(service.id)}
                        className={`text-left rounded-xl px-4 py-3 text-xs sm:text-sm font-medium border transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-[#115B38] text-white border-[#115B38] font-semibold shadow-xs'
                            : 'bg-white dark:bg-[#141715] text-[#262626] dark:text-[#F3F5F3] border-[#E2E7E2] dark:border-[#2C332E] hover:border-[#115B38]/50 dark:hover:border-[#FF6600]/60'
                        }`}
                      >
                        <span className="truncate">
                          {service.number}. {service.title}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                            isSelected ? 'bg-[#FF6600]' : 'bg-[#E2E7E2] dark:bg-[#2C332E]'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                {errors.service && (
                  <p className="mt-1.5 text-xs text-red-700 dark:text-red-400 font-medium flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.service}</span>
                  </p>
                )}
              </div>

              {/* 2. Coordonnées du demandeur */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E2E7E2] dark:border-[#2C332E]">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs sm:text-sm font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1.5"
                  >
                    Nom complet <span className="text-[#FF6600]">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                    placeholder="Ex. Jean-Marc Nkoa"
                    className={inputBaseClasses}
                  />
                  {errors.fullName && (
                    <p
                      id="error-fullName"
                      className="mt-1.5 text-xs text-red-700 dark:text-red-400 font-medium flex items-center gap-1"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    className="block text-xs sm:text-sm font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1.5"
                  >
                    Entreprise ou organisation{' '}
                    <span className="text-xs font-normal text-[#626B65] dark:text-[#A3ADA7]">
                      (facultatif)
                    </span>
                  </label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    autoComplete="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="Nom de votre structure"
                    className={inputBaseClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1.5"
                  >
                    Téléphone{' '}
                    <span className="text-xs font-normal text-[#626B65] dark:text-[#A3ADA7]">
                      (requis si aucun e-mail)
                    </span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(errors.contact)}
                    placeholder="Ex. +237 6XX XXX XXX"
                    className={inputBaseClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1.5"
                  >
                    Adresse e-mail{' '}
                    <span className="text-xs font-normal text-[#626B65] dark:text-[#A3ADA7]">
                      (requise si aucun téléphone)
                    </span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(errors.contact || errors.emailFormat)}
                    placeholder="votre.email@domaine.com"
                    className={inputBaseClasses}
                  />
                </div>
              </div>

              {(errors.contact || errors.emailFormat) && (
                <div
                  role="alert"
                  className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 px-4 py-3 text-xs text-red-800 dark:text-red-300 font-medium flex items-start gap-2"
                >
                  <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>{errors.contact || errors.emailFormat}</span>
                </div>
              )}

              {/* 3. Champs dynamiques facultatifs selon le service sélectionné */}
              <div className="rounded-xl bg-white dark:bg-[#141715] border border-[#E2E7E2] dark:border-[#2C332E] p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-[#115B38] dark:text-[#42C082]">
                    Précisions pour : {currentService.title}
                  </h3>
                  <span className="text-[11px] text-[#626B65] dark:text-[#A3ADA7]">
                    Champs facultatifs
                  </span>
                </div>

                {selectedServiceId === 'restauration-collective' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label
                        htmlFor="cateringGuestCount"
                        className="block text-xs font-medium text-[#262626] dark:text-[#E2E8E4] mb-1"
                      >
                        Nombre estimatif de personnes
                      </label>
                      <input
                        id="cateringGuestCount"
                        name="cateringGuestCount"
                        type="text"
                        value={formData.cateringGuestCount}
                        onChange={handleInputChange}
                        placeholder="Ex. 80 personnes"
                        className={subInputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cateringFrequency"
                        className="block text-xs font-medium text-[#262626] dark:text-[#E2E8E4] mb-1"
                      >
                        Fréquence ou date
                      </label>
                      <input
                        id="cateringFrequency"
                        name="cateringFrequency"
                        type="text"
                        value={formData.cateringFrequency}
                        onChange={handleInputChange}
                        placeholder="Ex. Quotidien / Ponctuel"
                        className={subInputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cateringLocation"
                        className="block text-xs font-medium text-[#262626] dark:text-[#E2E8E4] mb-1"
                      >
                        Lieu de prestation
                      </label>
                      <input
                        id="cateringLocation"
                        name="cateringLocation"
                        type="text"
                        value={formData.cateringLocation}
                        onChange={handleInputChange}
                        placeholder="Quartier ou site"
                        className={subInputClasses}
                      />
                    </div>
                  </div>
                )}

                {selectedServiceId === 'evenementiel' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label
                        htmlFor="eventType"
                        className="block text-xs font-medium text-[#262626] dark:text-[#E2E8E4] mb-1"
                      >
                        Type d’événement
                      </label>
                      <input
                        id="eventType"
                        name="eventType"
                        type="text"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        placeholder="Séminaire, réception..."
                        className={subInputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="eventDate"
                        className="block text-xs font-medium text-[#262626] dark:text-[#E2E8E4] mb-1"
                      >
                        Date de l’événement
                      </label>
                      <input
                        id="eventDate"
                        name="eventDate"
                        type="text"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        placeholder="JJ/MM/AAAA ou période"
                        className={subInputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="eventParticipants"
                        className="block text-xs font-medium text-[#262626] dark:text-[#E2E8E4] mb-1"
                      >
                        Participants estimés
                      </label>
                      <input
                        id="eventParticipants"
                        name="eventParticipants"
                        type="text"
                        value={formData.eventParticipants}
                        onChange={handleInputChange}
                        placeholder="Ex. 150 invités"
                        className={subInputClasses}
                      />
                    </div>
                  </div>
                )}

                {(selectedServiceId === 'commerce-general' ||
                  selectedServiceId === 'import-export') && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label
                        htmlFor="productType"
                        className="block text-xs font-medium text-[#262626] dark:text-[#E2E8E4] mb-1"
                      >
                        Produit ou marchandise
                      </label>
                      <input
                        id="productType"
                        name="productType"
                        type="text"
                        value={formData.productType}
                        onChange={handleInputChange}
                        placeholder="Nature des produits"
                        className={subInputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="productQuantity"
                        className="block text-xs font-medium text-[#262626] dark:text-[#E2E8E4] mb-1"
                      >
                        Quantité indicative
                      </label>
                      <input
                        id="productQuantity"
                        name="productQuantity"
                        type="text"
                        value={formData.productQuantity}
                        onChange={handleInputChange}
                        placeholder="Volume, lots, unités..."
                        className={subInputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="originDestination"
                        className="block text-xs font-medium text-[#262626] dark:text-[#E2E8E4] mb-1"
                      >
                        Origine / Destination
                      </label>
                      <input
                        id="originDestination"
                        name="originDestination"
                        type="text"
                        value={formData.originDestination}
                        onChange={handleInputChange}
                        placeholder="Si connue"
                        className={subInputClasses}
                      />
                    </div>
                  </div>
                )}

                {selectedServiceId === 'prestations-services' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label
                        htmlFor="serviceNature"
                        className="block text-xs font-medium text-[#262626] dark:text-[#E2E8E4] mb-1"
                      >
                        Nature du besoin
                      </label>
                      <input
                        id="serviceNature"
                        name="serviceNature"
                        type="text"
                        value={formData.serviceNature}
                        onChange={handleInputChange}
                        placeholder="Type de prestation recherchée"
                        className={subInputClasses}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="serviceConstraints"
                        className="block text-xs font-medium text-[#262626] dark:text-[#E2E8E4] mb-1"
                      >
                        Contraintes principales
                      </label>
                      <input
                        id="serviceConstraints"
                        name="serviceConstraints"
                        type="text"
                        value={formData.serviceConstraints}
                        onChange={handleInputChange}
                        placeholder="Délais, horaires, accès..."
                        className={subInputClasses}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Localité, Date souhaitée et Budget indicatif */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="locality"
                    className="block text-xs sm:text-sm font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1.5"
                  >
                    Localité du projet{' '}
                    <span className="text-xs font-normal text-[#626B65] dark:text-[#A3ADA7]">
                      (facultatif)
                    </span>
                  </label>
                  <input
                    id="locality"
                    name="locality"
                    type="text"
                    value={formData.locality}
                    onChange={handleInputChange}
                    placeholder="Ex. Yaoundé"
                    className={inputBaseClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="desiredDate"
                    className="block text-xs sm:text-sm font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1.5"
                  >
                    Date souhaitée{' '}
                    <span className="text-xs font-normal text-[#626B65] dark:text-[#A3ADA7]">
                      (facultatif)
                    </span>
                  </label>
                  <input
                    id="desiredDate"
                    name="desiredDate"
                    type="date"
                    value={formData.desiredDate}
                    onChange={handleInputChange}
                    className={inputBaseClasses}
                  />
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-xs sm:text-sm font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1.5"
                  >
                    Budget indicatif
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={inputBaseClasses}
                  >
                    {siteConfig.budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 5. Description obligatoire du besoin */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-xs sm:text-sm font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1.5"
                >
                  Description du besoin <span className="text-[#FF6600]">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description ? 'error-description' : undefined
                  }
                  placeholder="Décrivez votre besoin, le contexte, ainsi que toute précision utile pour préparer notre échange..."
                  className="w-full rounded-xl border border-[#E2E7E2] dark:border-[#2C332E] bg-white dark:bg-[#141715] px-3.5 py-3 text-sm text-[#262626] dark:text-[#F3F5F3] placeholder:text-[#626B65]/60 dark:placeholder:text-[#A3ADA7]/60 focus:border-[#115B38] dark:focus:border-[#FF6600] transition-colors"
                />
                {errors.description && (
                  <p
                    id="error-description"
                    className="mt-1.5 text-xs text-red-700 dark:text-red-400 font-medium flex items-center gap-1"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{errors.description}</span>
                  </p>
                )}
              </div>

              {/* 6. Boutons d'action de transmission */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#FF6600] px-5 sm:px-6 py-3.5 text-sm font-semibold text-[#262626] hover:bg-[#e55c00] active:scale-[0.99] transition-all whitespace-nowrap shrink-0 shadow-xs"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Préparer ma demande par e-mail</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-75" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyRequest}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#262626]/20 dark:border-[#2C332E] bg-white dark:bg-[#141715] px-4 py-3.5 text-sm font-medium text-[#262626] dark:text-[#F3F5F3] hover:border-[#115B38] dark:hover:border-[#FF6600] hover:text-[#115B38] dark:hover:text-[#FF6600] transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedState ? (
                      <>
                        <Check className="h-4 w-4 text-[#115B38] dark:text-[#42C082] shrink-0" aria-hidden="true" />
                        <span className="text-[#115B38] dark:text-[#42C082] font-semibold">
                          Demande copiée
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Copier ma demande</span>
                      </>
                    )}
                  </button>

                  {hasValidWhatsApp && (
                    <a
                      href={`https://wa.me/${whatsappCleanNumber}?text=${encodeURIComponent(
                        buildFormattedMessage(false)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#115B38] px-4 py-3.5 text-sm font-semibold text-white hover:bg-[#0c4329] transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#626B65] dark:text-[#A3ADA7] hover:text-[#262626] dark:hover:text-white hover:bg-white dark:hover:bg-[#141715] transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Effacer les champs</span>
                </button>
              </div>

              {/* Message d'accompagnement honnête après clic sur Préparer ma demande */}
              {mailtoPreparedState?.opened && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-xl bg-[#EEF5F0] dark:bg-[#115B38]/20 border border-[#115B38]/30 dark:border-[#115B38]/50 p-4 text-xs sm:text-sm text-[#262626] dark:text-[#F3F5F3] space-y-2"
                >
                  <p className="font-semibold text-[#115B38] dark:text-[#42C082]">
                    Ouverture de votre messagerie en cours…
                  </p>
                  <p className="text-[#626B65] dark:text-[#B4BEB8] leading-relaxed">
                    Votre application de messagerie s’ouvre avec votre demande adressée à{' '}
                    <strong className="text-[#262626] dark:text-white">
                      {formData.recipientEmail}
                    </strong>
                    . N’oubliez pas de cliquer sur <strong>Envoyer</strong> dans votre messagerie pour transmettre effectivement votre message.
                  </p>
                  {mailtoPreparedState.wasTruncated && (
                    <p className="text-[#262626] dark:text-[#F3F5F3] bg-[#FFF2E8] dark:bg-[#FF6600]/15 p-2.5 rounded-lg border border-[#FF6600]/30">
                      Votre description étant particulièrement détaillée, le texte complet a été automatiquement copié dans votre presse-papiers. Vous pouvez le coller directement dans le corps de l’e-mail.
                    </p>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
