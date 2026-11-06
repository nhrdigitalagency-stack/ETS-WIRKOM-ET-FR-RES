import React from 'react';
import { siteConfig } from '../config/siteConfig';

export const RealizationsSection: React.FC = () => {
  // Masqué par défaut tant que de vraies réalisations et leurs médias ne sont pas fournis
  if (!siteConfig.showRealizations || siteConfig.realizations.length === 0) {
    return null;
  }

  return (
    <section
      id="realisations"
      className="py-14 sm:py-24 bg-[#F7F8F6] dark:bg-[#121413] border-b border-[#E2E7E2] dark:border-[#2C332E] transition-colors duration-200"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#115B38] dark:text-[#42C082] mb-3">
            <span aria-hidden="true" className="inline-block h-0.5 w-8 bg-[#FF6600]" />
            <span>Réalisations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#262626] dark:text-[#F3F5F3]">
            Projets et interventions réalisés
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.realizations.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl bg-white dark:bg-[#1B1E1C] border border-[#E2E7E2] dark:border-[#2C332E] overflow-hidden flex flex-col justify-between p-6"
            >
              <div>
                <p className="text-xs font-semibold text-[#115B38] dark:text-[#42C082]">
                  {item.category}
                </p>
                <h3 className="mt-2 text-lg font-bold text-[#262626] dark:text-[#F3F5F3]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#626B65] dark:text-[#B4BEB8] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
