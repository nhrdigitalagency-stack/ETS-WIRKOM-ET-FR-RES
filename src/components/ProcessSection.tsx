import React from 'react';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="demarche"
      className="py-16 sm:py-24 bg-[#262626] text-white relative overflow-hidden"
    >
      {/* Détail géométrique diagonal inspiré du document */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-2 w-40 bg-[#FF6600]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 bg-[#115B38]/35 hidden lg:block"
        style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#FF6600] mb-3">
              <span
                aria-hidden="true"
                className="inline-block h-0.5 w-8 bg-[#FF6600]"
              />
              <span>Notre démarche</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
              Un parcours de prise de contact simple et structuré
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#BFBFBF] leading-relaxed">
              Chaque besoin professionnel présentant ses propres paramètres, voici le déroulement proposé pour étudier votre demande dans de bonnes conditions :
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="#devis"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-[#262626] hover:bg-[#e55c00] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Préparer ma demande</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Les 4 étapes */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.processSteps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#115B38] text-sm font-mono font-bold text-white tabular-nums">
                    {step.stepNumber}
                  </span>
                  {idx < siteConfig.processSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden lg:inline-block h-px flex-1 bg-white/15 ml-2"
                    />
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#BFBFBF] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mention honnête et transparente */}
        <p className="mt-8 text-xs text-[#BFBFBF] max-w-3xl">
          Note : Ce parcours de contact vise à faciliter vos échanges avec les ETS WIRKOM ET FRÈRES. Chaque projet fait l’objet d’une appréciation préalable selon sa nature et ses contraintes.
        </p>
      </div>
    </section>
  );
};
