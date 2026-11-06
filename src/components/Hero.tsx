import React from 'react';
import {
  ArrowRight,
  MapPin,
  PackageCheck,
  Briefcase,
  Globe,
  Utensils,
  CalendarRange,
  PhoneCall,
} from 'lucide-react';
import { siteConfig, ServiceId } from '../config/siteConfig';

interface HeroProps {
  onSelectService: (serviceId: ServiceId) => void;
}

const iconMap = {
  PackageCheck,
  Briefcase,
  Globe,
  Utensils,
  CalendarRange,
};

export const Hero: React.FC<HeroProps> = ({ onSelectService }) => {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden pt-5 pb-14 sm:pt-10 sm:pb-20 lg:pb-28 transition-colors duration-200"
    >
      {/* Décor géométrique subtil inspiré des découpes diagonales du document */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 -z-10 h-full w-1/3 bg-[#EEF5F0]/70 dark:bg-[#115B38]/15 hidden lg:block transition-colors duration-200"
        style={{ clipPath: 'polygon(22% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch">
          {/* Colonne gauche : Proposition éditoriale claire */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Petit label sobre non encapsulé */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#115B38] dark:text-[#42C082] mb-3 sm:mb-4">
              <span
                aria-hidden="true"
                className="inline-block h-0.5 w-8 bg-[#FF6600]"
              />
              <span>{siteConfig.hero.kicker}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold tracking-tight text-[#262626] dark:text-[#F3F5F3] leading-[1.18] sm:leading-[1.15] text-balance">
              {siteConfig.hero.title}
            </h1>

            <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-[#626B65] dark:text-[#B4BEB8] leading-relaxed max-w-2xl">
              {siteConfig.hero.description}
            </p>

            {/* Boutons d'action principaux : 100% largeur sur très petit mobile, côte à côte dès sm */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#devis"
                className="inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-xl bg-[#FF6600] px-6 py-3.5 text-sm sm:text-base font-semibold text-[#262626] hover:bg-[#e55c00] active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 shadow-xs"
              >
                <span>{siteConfig.hero.primaryCta}</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>

              <a
                href="#services"
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#262626]/20 dark:border-[#2C332E] bg-white dark:bg-[#1B1E1C] px-6 py-3.5 text-sm sm:text-base font-medium text-[#262626] dark:text-[#F3F5F3] hover:border-[#115B38] dark:hover:border-[#FF6600] hover:text-[#115B38] dark:hover:text-[#FF6600] hover:bg-[#EEF5F0]/50 dark:hover:bg-[#252A27] transition-all duration-150 whitespace-nowrap shrink-0"
              >
                <span>{siteConfig.hero.secondaryCta}</span>
              </a>
            </div>

            {/* Petit repère de localisation et contact rapide */}
            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#E2E7E2] dark:border-[#2C332E] flex flex-wrap items-center gap-y-2.5 gap-x-5 text-xs sm:text-sm text-[#626B65] dark:text-[#A3ADA7]">
              <div className="flex items-center gap-2 font-medium text-[#262626] dark:text-[#F3F5F3]">
                <MapPin className="h-4 w-4 text-[#FF6600] shrink-0" aria-hidden="true" />
                <span>{siteConfig.hero.locationBadge}</span>
              </div>
              <span aria-hidden="true" className="hidden sm:inline text-[#BFBFBF] dark:text-[#4A524D]">
                ·
              </span>
              <a
                href={`tel:${siteConfig.phones[siteConfig.primaryPhoneIndex]}`}
                className="inline-flex items-center gap-1.5 text-[#115B38] dark:text-[#42C082] font-medium hover:underline underline-offset-4"
              >
                <PhoneCall className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{siteConfig.phonesFormatted[siteConfig.primaryPhoneIndex]}</span>
              </a>
              <span aria-hidden="true" className="hidden md:inline text-[#BFBFBF] dark:text-[#4A524D]">
                ·
              </span>
              <a
                href={`mailto:${siteConfig.primaryEmail}`}
                className="text-[#626B65] dark:text-[#B4BEB8] hover:text-[#262626] dark:hover:text-white underline underline-offset-4 break-all"
              >
                {siteConfig.primaryEmail}
              </a>
            </div>
          </div>

          {/* Colonne droite : Composition graphique corporate fidèle à l'identité du document */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative h-full rounded-2xl bg-[#262626] dark:bg-[#1B1E1C] text-white p-5 sm:p-7 lg:p-8 overflow-hidden border border-[#262626] dark:border-[#2C332E] shadow-sm flex flex-col justify-between">
              {/* Bandeau géométrique diagonal supérieur inspiré de l'en-tête du document */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-2 bg-[#FF6600]"
              />
              <div
                aria-hidden="true"
                className="absolute -right-10 -bottom-10 w-44 h-44 bg-[#115B38] opacity-90"
                style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
              />

              {/* En-tête de la carte corporate */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-white/15">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#BFBFBF] tracking-wide">
                      Identité & Domaines d’intervention
                    </p>
                    <p className="text-base sm:text-xl font-bold text-[#FF6600] tracking-tight mt-0.5 truncate">
                      {siteConfig.companyName}
                    </p>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-lg bg-[#115B38] text-white text-xs font-semibold shrink-0"
                    style={{ clipPath: 'polygon(0 0, 92% 0, 100% 100%, 0% 100%)' }}
                  >
                    5 Pôles
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-[#BFBFBF] leading-relaxed">
                  Sélectionnez directement un domaine ci-dessous pour préparer une demande ciblée :
                </p>

                {/* Liste interactive des 5 domaines d'intervention */}
                <div className="mt-4 space-y-2.5">
                  {siteConfig.services.map((service) => {
                    const IconComponent = iconMap[service.iconName];
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => onSelectService(service.id)}
                        className="group w-full text-left flex items-center justify-between gap-3 rounded-xl bg-white/5 hover:bg-[#115B38] border border-white/10 hover:border-[#FF6600]/60 px-3.5 sm:px-4 py-3 transition-all duration-150"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <span className="text-xs font-mono font-semibold text-[#FF6600] tabular-nums shrink-0">
                            {service.number}.
                          </span>
                          <IconComponent
                            className="h-4 w-4 text-[#BFBFBF] group-hover:text-white shrink-0 transition-colors"
                            aria-hidden="true"
                          />
                          <span className="text-xs sm:text-sm font-medium text-white truncate">
                            {service.title}
                          </span>
                        </div>
                        <span className="text-xs text-[#BFBFBF] group-hover:text-white inline-flex items-center gap-1 shrink-0 transition-colors">
                          <span className="hidden sm:inline">Cibler</span>
                          <ArrowRight className="h-3.5 w-3.5 text-[#FF6600] group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pied de la composition visuelle */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs text-[#BFBFBF]">
                <div>
                  <span className="text-white font-medium">Siège :</span>{' '}
                  <span>Tradex Ahala, Yaoundé</span>
                </div>
                <a
                  href="#contact"
                  className="text-[#FF6600] hover:underline font-medium whitespace-nowrap shrink-0"
                >
                  Voir les contacts →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
