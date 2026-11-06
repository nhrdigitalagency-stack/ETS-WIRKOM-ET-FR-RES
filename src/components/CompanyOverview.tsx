import React from 'react';
import { ArrowRight, MapPin, Building2, Layers, CheckCircle2 } from 'lucide-react';
import { siteConfig, ServiceId } from '../config/siteConfig';

interface CompanyOverviewProps {
  onSelectService: (serviceId: ServiceId) => void;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({
  onSelectService,
}) => {
  return (
    <section
      id="entreprise"
      className="w-full max-w-full overflow-hidden py-12 sm:py-20 lg:py-24 bg-white dark:bg-[#171A18] border-y border-[#E2E7E2] dark:border-[#2C332E] transition-colors duration-200"
    >
      <div className="mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-start">
          {/* Présentation structurée de l'entreprise */}
          <div className="lg:col-span-6 min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#115B38] dark:text-[#42C082] mb-2.5 sm:mb-3">
              <span
                aria-hidden="true"
                className="inline-block h-0.5 w-6 sm:w-8 bg-[#115B38] dark:bg-[#42C082] shrink-0"
              />
              <span>Présentation</span>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#262626] dark:text-[#F3F5F3] text-balance break-words">
              {siteConfig.companyOverview.title}
            </h2>

            <p className="mt-3.5 sm:mt-5 text-sm sm:text-lg text-[#626B65] dark:text-[#B4BEB8] leading-relaxed break-words">
              {siteConfig.companyOverview.description}
            </p>

            {/* Points de repère factuels */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              <div className="rounded-xl bg-[#F7F8F6] dark:bg-[#1E2320] border border-[#E2E7E2] dark:border-[#2C332E] p-4 sm:p-5 min-w-0">
                <div className="flex items-center gap-2 text-[#115B38] dark:text-[#42C082] font-semibold text-sm">
                  <Layers className="h-4 w-4 text-[#FF6600] shrink-0" aria-hidden="true" />
                  <span className="truncate">Approche polyvalente</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-[#626B65] dark:text-[#B4BEB8] leading-relaxed">
                  Un point de contact unique capable d’étudier des besoins d’approvisionnement, de services ou d’organisation.
                </p>
              </div>

              <div className="rounded-xl bg-[#F7F8F6] dark:bg-[#1E2320] border border-[#E2E7E2] dark:border-[#2C332E] p-4 sm:p-5 min-w-0">
                <div className="flex items-center gap-2 text-[#115B38] dark:text-[#42C082] font-semibold text-sm">
                  <MapPin className="h-4 w-4 text-[#FF6600] shrink-0" aria-hidden="true" />
                  <span className="truncate">Ancrage local à Yaoundé</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-[#626B65] dark:text-[#B4BEB8] leading-relaxed">
                  Siège implanté au secteur Tradex Ahala à Yaoundé pour recevoir et étudier vos demandes professionnelles.
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 rounded-xl bg-[#EEF5F0] dark:bg-[#115B38]/20 border border-[#115B38]/15 dark:border-[#115B38]/40 p-3.5 sm:p-4 flex items-start gap-2.5 sm:gap-3 min-w-0">
              <Building2 className="h-5 w-5 text-[#115B38] dark:text-[#42C082] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-xs sm:text-sm text-[#262626] dark:text-[#F3F5F3] break-words min-w-0">
                <span className="font-semibold">Dénomination officielle : </span>
                <span>{siteConfig.companyName}</span>
                <span className="mx-1.5 text-[#626B65] dark:text-[#A3ADA7]">·</span>
                <span className="text-[#626B65] dark:text-[#B4BEB8]">{siteConfig.locationDetail}</span>
              </div>
            </div>
          </div>

          {/* Bloc interactif : « Parlons de votre besoin » */}
          <div className="lg:col-span-6 min-w-0 w-full">
            <div className="rounded-2xl bg-[#F7F8F6] dark:bg-[#1E2320] border border-[#E2E7E2] dark:border-[#2C332E] p-4 sm:p-7 lg:p-8 relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-1.5 w-24 sm:w-28 bg-[#FF6600]"
              />
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-lg sm:text-2xl font-bold text-[#262626] dark:text-[#F3F5F3]">
                  {siteConfig.companyOverview.needsPromptTitle}
                </h3>
                <span className="text-xs font-medium text-[#626B65] dark:text-[#A3ADA7]">
                  Orientation directe
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#626B65] dark:text-[#B4BEB8] mb-4 sm:mb-6 leading-relaxed">
                Choisissez la situation qui correspond le mieux à votre démarche actuelle pour préremplir le formulaire de demande :
              </p>

              <div className="space-y-3 sm:space-y-3.5">
                {siteConfig.companyOverview.needsPrompts.map((promptItem) => (
                  <button
                    key={promptItem.id}
                    type="button"
                    onClick={() => onSelectService(promptItem.targetServiceId)}
                    className="group w-full text-left rounded-xl bg-white dark:bg-[#171A18] hover:bg-[#FFF2E8]/60 dark:hover:bg-[#252A27] border border-[#E2E7E2] dark:border-[#2C332E] hover:border-[#FF6600] dark:hover:border-[#FF6600] p-3.5 sm:p-5 transition-all duration-150 flex items-start justify-between gap-3 min-w-0"
                  >
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-start gap-2">
                        <CheckCircle2
                          className="h-4 w-4 text-[#115B38] dark:text-[#42C082] group-hover:text-[#FF6600] shrink-0 mt-0.5 transition-colors"
                          aria-hidden="true"
                        />
                        <span className="text-xs sm:text-base font-semibold text-[#262626] dark:text-[#F3F5F3] group-hover:text-[#115B38] dark:group-hover:text-[#FF6600] transition-colors break-words">
                          {promptItem.question}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#626B65] dark:text-[#B4BEB8] pl-6 leading-relaxed break-words">
                        {promptItem.subtext}
                      </p>
                    </div>
                    <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-[#F7F8F6] dark:bg-[#252A27] group-hover:bg-[#FF6600] text-[#262626] dark:text-[#F3F5F3] group-hover:text-[#262626] shrink-0 transition-colors mt-0.5">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
