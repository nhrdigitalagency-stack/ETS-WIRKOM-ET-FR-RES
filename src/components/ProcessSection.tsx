import React from 'react';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="demarche"
      className="w-full max-w-full overflow-hidden py-12 sm:py-20 lg:py-24 bg-[#262626] dark:bg-[#161917] text-white relative"
    >
      {/* Détail géométrique diagonal inspiré du document */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-2 w-32 sm:w-40 bg-[#FF6600]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 bg-[#115B38]/35 hidden lg:block"
        style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
      />

      <div className="mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6">
          <div className="max-w-2xl min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#FF6600] mb-2.5 sm:mb-3">
              <span
                aria-hidden="true"
                className="inline-block h-0.5 w-6 sm:w-8 bg-[#FF6600] shrink-0"
              />
              <span>Notre démarche</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance break-words">
              Un parcours de prise de contact simple et structuré
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#BFBFBF] leading-relaxed break-words">
              Chaque besoin professionnel présentant ses propres paramètres, voici le déroulement proposé pour étudier votre demande dans de bonnes conditions :
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <a
              href="#devis"
              className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#FF6600] px-5 py-3 text-xs sm:text-sm font-semibold text-[#262626] hover:bg-[#e55c00] transition-colors text-center"
            >
              <span>Préparer ma demande</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Les 4 étapes */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {siteConfig.processSteps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6 flex flex-col justify-between relative min-w-0"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3.5 sm:mb-4">
                  <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#115B38] text-xs sm:text-sm font-mono font-bold text-white tabular-nums shrink-0">
                    {step.stepNumber}
                  </span>
                  {idx < siteConfig.processSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden lg:inline-block h-px flex-1 bg-white/15 ml-2"
                    />
                  )}
                </div>
                <h3 className="text-sm sm:text-lg font-semibold text-white leading-snug break-words">
                  {step.title}
                </h3>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#BFBFBF] leading-relaxed break-words">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mention honnête et transparente */}
        <p className="mt-6 sm:mt-8 text-xs text-[#BFBFBF] max-w-3xl leading-relaxed">
          Note : Ce parcours de contact vise à faciliter vos échanges avec les ETS WIRKOM ET FRÈRES. Chaque projet fait l’objet d’une appréciation préalable selon sa nature et ses contraintes.
        </p>
      </div>
    </section>
  );
};
