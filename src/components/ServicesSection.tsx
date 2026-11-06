import React, { useState } from 'react';
import {
  PackageCheck,
  Briefcase,
  Globe,
  Utensils,
  CalendarRange,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { siteConfig, ServiceId } from '../config/siteConfig';
import { ServiceDetails } from './ServiceDetails';

interface ServicesSectionProps {
  selectedServiceId: ServiceId;
  onSelectService: (serviceId: ServiceId) => void;
}

const iconMap = {
  PackageCheck,
  Briefcase,
  Globe,
  Utensils,
  CalendarRange,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServiceId,
  onSelectService,
}) => {
  const [expandedServiceId, setExpandedServiceId] = useState<ServiceId | null>(
    'commerce-general'
  );
  const shouldReduceMotion = useReducedMotion();

  const toggleDetails = (id: ServiceId) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="py-14 sm:py-24 bg-[#F7F8F6] dark:bg-[#121413] transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#115B38] dark:text-[#42C082] mb-3">
            <span
              aria-hidden="true"
              className="inline-block h-0.5 w-8 bg-[#FF6600]"
            />
            <span>Domaines d’intervention</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#262626] dark:text-[#F3F5F3] text-balance">
            Cinq pôles d’activité pour répondre à vos demandes
          </h2>
          <p className="mt-4 text-sm sm:text-lg text-[#626B65] dark:text-[#B4BEB8] leading-relaxed">
            Découvrez nos cinq domaines d’intervention figurant dans notre référentiel d’entreprise. Cliquez sur l’action d’un service pour présélectionner votre besoin dans le formulaire de demande.
          </p>
        </div>

        {/* Grille asymétrique (Bento éditorial) avec animations fluides au survol */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {siteConfig.services.map((service, index) => {
            const IconComponent = iconMap[service.iconName];
            const isExpanded = expandedServiceId === service.id;
            const isCurrentlySelectedInForm = selectedServiceId === service.id;
            const colSpanClass = isExpanded
              ? 'md:col-span-2 lg:col-span-12'
              : index < 2
              ? 'lg:col-span-6'
              : 'lg:col-span-4';

            return (
              <motion.article
                key={service.id}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        scale: 1.012,
                      }
                }
                transition={{
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group ${colSpanClass} rounded-2xl bg-white dark:bg-[#1B1E1C] border transition-colors duration-200 p-5 sm:p-7 flex flex-col justify-between ${
                  isCurrentlySelectedInForm
                    ? 'border-[#115B38] dark:border-[#42C082] shadow-[0_8px_28px_rgb(17,91,56,0.10)] dark:shadow-[0_8px_28px_rgb(0,0,0,0.4)]'
                    : 'border-[#E2E7E2] dark:border-[#2C332E] hover:border-[#FF6600]/70 dark:hover:border-[#FF6600]/70 hover:shadow-[0_12px_32px_rgb(38,38,38,0.08)] dark:hover:shadow-[0_12px_32px_rgb(0,0,0,0.45)]'
                }`}
              >
                <div>
                  {/* En-tête de la carte : Numéro éditorial + Icône */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-bold text-[#FF6600] tabular-nums">
                        {service.number}.
                      </span>
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF5F0] dark:bg-[#115B38]/30 text-[#115B38] dark:text-[#42C082] group-hover:bg-[#115B38] group-hover:text-white transition-colors duration-200">
                        <IconComponent
                          className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {isCurrentlySelectedInForm && (
                      <span className="text-xs font-medium text-[#115B38] dark:text-[#42C082]">
                        Présélectionné dans le devis
                      </span>
                    )}
                  </div>

                  {/* Titre et description officielle */}
                  <h3 className="mt-5 text-lg sm:text-xl font-bold text-[#262626] dark:text-[#F3F5F3] group-hover:text-[#115B38] dark:group-hover:text-[#FF6600] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base text-[#626B65] dark:text-[#B4BEB8] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Actions : Bouton CTA spécifique + bouton Demander des informations (détails) */}
                <div className="mt-6 pt-5 border-t border-[#E2E7E2] dark:border-[#2C332E] flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[#115B38] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#0c4329] active:scale-[0.99] transition-all whitespace-nowrap shrink-0"
                  >
                    <span>{service.ctaLabel}</span>
                    <ArrowRight
                      className="h-4 w-4 text-[#FF6600] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleDetails(service.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`details-${service.id}`}
                    className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-[#262626] dark:text-[#D5DDD8] hover:bg-[#F7F8F6] dark:hover:bg-[#252A27] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Demander des informations</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-[#626B65] dark:text-[#A3ADA7]" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[#626B65] dark:text-[#A3ADA7]" aria-hidden="true" />
                    )}
                  </button>
                </div>

                {/* Panneau dépliable accessible */}
                <ServiceDetails
                  service={service}
                  isOpen={isExpanded}
                  onSelectForQuote={onSelectService}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
