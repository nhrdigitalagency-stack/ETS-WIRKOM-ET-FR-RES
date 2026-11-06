import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const FAQ: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([siteConfig.faq[0].id]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      className="w-full max-w-full overflow-hidden py-12 sm:py-20 lg:py-24 bg-[#F7F8F6] dark:bg-[#121413] border-b border-[#E2E7E2] dark:border-[#2C332E] transition-colors duration-200"
    >
      <div className="mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 items-start">
          {/* En-tête FAQ */}
          <div className="lg:col-span-5 min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#115B38] dark:text-[#42C082] mb-2.5 sm:mb-3">
              <span
                aria-hidden="true"
                className="inline-block h-0.5 w-6 sm:w-8 bg-[#FF6600] shrink-0"
              />
              <span>Questions fréquentes</span>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#262626] dark:text-[#F3F5F3] text-balance break-words">
              Réponses utiles avant votre prise de contact
            </h2>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#626B65] dark:text-[#B4BEB8] leading-relaxed break-words">
              Retrouvez les précisions essentielles sur nos cinq activités, notre localisation à Yaoundé et les modalités de demande de devis.
            </p>

            <div className="mt-5 sm:mt-6 rounded-2xl bg-white dark:bg-[#1B1E1C] border border-[#E2E7E2] dark:border-[#2C332E] p-4 sm:p-5 flex items-start gap-3 min-w-0">
              <HelpCircle
                className="h-5 w-5 text-[#115B38] dark:text-[#42C082] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div className="text-xs sm:text-sm text-[#626B65] dark:text-[#B4BEB8] leading-relaxed min-w-0">
                <p className="font-semibold text-[#262626] dark:text-[#F3F5F3]">
                  Vous avez une question spécifique ?
                </p>
                <p className="mt-1">
                  Contactez directement l’entreprise par téléphone ou e-mail pour échanger sur votre situation.
                </p>
                <a
                  href="#contact"
                  className="mt-2 inline-block font-semibold text-[#115B38] dark:text-[#42C082] underline underline-offset-4 hover:text-[#262626] dark:hover:text-[#FF6600]"
                >
                  Consulter les coordonnées →
                </a>
              </div>
            </div>
          </div>

          {/* Accordéons accessibles */}
          <div className="lg:col-span-7 space-y-2.5 sm:space-y-3 min-w-0 w-full">
            {siteConfig.faq.map((item, idx) => {
              const isOpen = openIds.includes(item.id);
              const panelId = `faq-panel-${item.id}`;
              const buttonId = `faq-button-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl bg-white dark:bg-[#1B1E1C] border transition-colors min-w-0 ${
                    isOpen
                      ? 'border-[#115B38] dark:border-[#42C082]'
                      : 'border-[#E2E7E2] dark:border-[#2C332E]'
                  }`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full text-left px-3.5 sm:px-6 py-3.5 sm:py-5 flex items-center justify-between gap-3 rounded-2xl focus-visible:outline-2 focus-visible:outline-[#FF6600] min-w-0"
                    >
                      <span className="flex items-start gap-2 sm:gap-3 text-xs sm:text-base font-semibold text-[#262626] dark:text-[#F3F5F3] min-w-0">
                        <span className="font-mono text-xs font-bold text-[#FF6600] tabular-nums mt-0.5 sm:mt-1 shrink-0">
                          0{idx + 1}.
                        </span>
                        <span className="break-words">{item.question}</span>
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F8F6] dark:bg-[#252A27] text-[#262626] dark:text-[#F3F5F3] shrink-0">
                        {isOpen ? (
                          <ChevronUp
                            className="h-4 w-4 text-[#115B38] dark:text-[#42C082]"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDown
                            className="h-4 w-4 text-[#626B65] dark:text-[#A3ADA7]"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </button>
                  </h3>

                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="px-3.5 sm:px-6 pb-4 sm:pb-5 pt-2 text-xs sm:text-sm text-[#626B65] dark:text-[#B4BEB8] leading-relaxed border-t border-[#E2E7E2]/60 dark:border-[#2C332E]"
                    >
                      <p className="pl-5 sm:pl-7 break-words">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
