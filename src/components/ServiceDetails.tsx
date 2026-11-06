import React from 'react';
import { Check, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ServiceItem, ServiceId } from '../config/siteConfig';

interface ServiceDetailsProps {
  service: ServiceItem;
  isOpen: boolean;
  triggerId: string;
  onSelectForQuote: (serviceId: ServiceId) => void;
  onClosePanel: () => void;
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  service,
  isOpen,
  triggerId,
  onSelectForQuote,
  onClosePanel,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleRegionKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClosePanel();
    }
  };

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={`details-${service.id}`}
          role="region"
          aria-labelledby={triggerId}
          onKeyDown={handleRegionKeyDown}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-[#E2E7E2] dark:border-[#2C332E] text-left w-full min-w-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
            {/* Périmètre d'échange */}
            <div className="rounded-xl bg-[#F7F8F6] dark:bg-[#141715] p-3.5 sm:p-4 border border-[#E2E7E2] dark:border-[#2C332E] min-w-0">
              <h4 className="text-xs font-semibold text-[#115B38] dark:text-[#42C082] tracking-wide mb-2">
                Points abordés lors de l’échange
              </h4>
              <ul className="space-y-2">
                {service.scopePoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs sm:text-sm text-[#262626] dark:text-[#E2E8E4] leading-relaxed break-words"
                  >
                    <Check
                      className="h-4 w-4 text-[#115B38] dark:text-[#42C082] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Éléments utiles à préparer */}
            <div className="rounded-xl bg-[#FFF2E8]/60 dark:bg-[#FF6600]/10 p-3.5 sm:p-4 border border-[#FF6600]/20 dark:border-[#FF6600]/30 min-w-0">
              <h4 className="text-xs font-semibold text-[#262626] dark:text-[#F3F5F3] tracking-wide mb-2">
                Éléments utiles à préciser dans votre demande
              </h4>
              <ul className="space-y-2">
                {service.preparationTips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-xs sm:text-sm text-[#262626] dark:text-[#E2E8E4] leading-relaxed break-words"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF6600] shrink-0 mt-2"
                    />
                    <span className="min-w-0 flex-1">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-3.5 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 rounded-xl bg-[#EEF5F0] dark:bg-[#115B38]/20 px-3.5 sm:px-4 py-3 text-xs text-[#626B65] dark:text-[#B4BEB8] min-w-0">
            <div className="flex items-start sm:items-center gap-2 min-w-0">
              <Info
                className="h-4 w-4 text-[#115B38] dark:text-[#42C082] shrink-0 mt-0.5 sm:mt-0"
                aria-hidden="true"
              />
              <span className="break-words">{service.cautionNote}</span>
            </div>
            <button
              type="button"
              tabIndex={0}
              onClick={() => onSelectForQuote(service.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelectForQuote(service.id);
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 font-semibold text-[#115B38] dark:text-[#42C082] hover:text-[#262626] dark:hover:text-[#FF6600] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] text-left sm:text-right underline underline-offset-4 shrink-0"
            >
              <span>Remplir le formulaire pour ce service</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
