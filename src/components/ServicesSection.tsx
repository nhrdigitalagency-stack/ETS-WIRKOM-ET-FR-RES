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

  const toggleDetails = (id: ServiceId) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="w-full max-w-full overflow-hidden py-12 sm:py-20 lg:py-24 bg-[#F7F8F6] dark:bg-[#121413] transition-colors duration-200"
    >
      <div className="mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#115B38] dark:text-[#42C082] mb-2.5 sm:mb-3">
            <span
              aria-hidden="true"
              className="inline-block h-0.5 w-6 sm:w-8 bg-[#FF6600] shrink-0"
            />
            <span>Domaines d’intervention</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#262626] dark:text-[#F3F5F3] text-balance">
            Cinq pôles d’activité pour répondre à vos demandes
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-[#626B65] dark:text-[#B4BEB8] leading-relaxed">
            Découvrez nos cinq domaines d’intervention figurant dans notre référentiel d’entreprise. Cliquez sur l’action d’un service pour présélectionner votre besoin dans le formulaire de demande.
          </p>
        </div>

        {/* Grille asymétrique avec transitions Tailwind fluides au survol (hover:scale-105 hover:translate-y-[-4px]) */}
        <div className="mt-7 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-7">
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
              <article
                key={service.id}
                className={`group ${colSpanClass} w-full min-w-0 rounded-2xl bg-white dark:bg-[#1B1E1C] border p-4 sm:p-6 lg:p-7 flex flex-col justify-between transform-gpu transition-all duration-300 ease-out hover:scale-105 hover:translate-y-[-4px] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0 hover:z-10 ${
                  isCurrentlySelectedInForm
                    ? 'border-[#115B38] dark:border-[#42C082] shadow-[0_8px_28px_rgb(17,91,56,0.10)] dark:shadow-[0_8px_28px_rgb(0,0,0,0.4)]'
                    : 'border-[#E2E7E2] dark:border-[#2C332E] hover:border-[#FF6600]/70 dark:hover:border-[#FF6600]/70 hover:shadow-[0_14px_34px_rgb(38,38,38,0.10)] dark:hover:shadow-[0_14px_34px_rgb(0,0,0,0.5)]'
                }`}
              >
                <div className="min-w-0">
                  {/* En-tête de la carte : Numéro éditorial + Icône */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="text-sm font-mono font-bold text-[#FF6600] tabular-nums">
                        {service.number}.
                      </span>
                      <div className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#EEF5F0] dark:bg-[#115B38]/30 text-[#115B38] dark:text-[#42C082] group-hover:bg-[#115B38] group-hover:text-white transition-colors duration-300 shrink-0">
                        <IconComponent
                          className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {isCurrentlySelectedInForm && (
                      <span className="text-xs font-medium text-[#115B38] dark:text-[#42C082] break-words">
                        Présélectionné dans le devis
                      </span>
                    )}
                  </div>

                  {/* Titre et description officielle */}
                  <h3 className="mt-4 sm:mt-5 text-base sm:text-xl font-bold text-[#262626] dark:text-[#F3F5F3] group-hover:text-[#115B38] dark:group-hover:text-[#FF6600] transition-colors duration-300 break-words">
                    {service.title}
                  </h3>
                  <p className="mt-2 sm:mt-2.5 text-xs sm:text-base text-[#626B65] dark:text-[#B4BEB8] leading-relaxed break-words">
                    {service.description}
                  </p>
                </div>

                {/* Actions : Bouton CTA spécifique + bouton Demander des informations (détails) */}
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#E2E7E2] dark:border-[#2C332E] flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#115B38] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#0c4329] active:scale-[0.99] transition-all text-center"
                  >
                    <span className="truncate">{service.ctaLabel}</span>
                    <ArrowRight
                      className="h-4 w-4 text-[#FF6600] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleDetails(service.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`details-${service.id}`}
                    className="inline-flex min-h-[42px] w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium text-[#262626] dark:text-[#D5DDD8] hover:bg-[#F7F8F6] dark:hover:bg-[#252A27] transition-colors text-center"
                  >
                    <span className="truncate">Demander des informations</span>
                    {isExpanded ? (
                      <ChevronUp
                        className="h-4 w-4 text-[#626B65] dark:text-[#A3ADA7] shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronDown
                        className="h-4 w-4 text-[#626B65] dark:text-[#A3ADA7] shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>

                {/* Panneau dépliable accessible */}
                <ServiceDetails
                  service={service}
                  isOpen={isExpanded}
                  onSelectForQuote={onSelectService}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
