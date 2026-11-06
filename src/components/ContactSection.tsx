import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  Compass,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ContactSection: React.FC = () => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(null), 2500);
    } catch {
      const input = document.createElement('input');
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopiedValue(value);
      setTimeout(() => setCopiedValue(null), 2500);
    }
  };

  return (
    <section
      id="contact"
      className="w-full max-w-full overflow-hidden py-12 sm:py-20 lg:py-24 bg-white dark:bg-[#171A18] transition-colors duration-200"
    >
      <div className="mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold tracking-wide text-[#115B38] dark:text-[#42C082] mb-2.5 sm:mb-3">
            <span
              aria-hidden="true"
              className="inline-block h-0.5 w-6 sm:w-8 bg-[#FF6600] shrink-0"
            />
            <span>Contacts & Localisation</span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#262626] dark:text-[#F3F5F3] text-balance break-words">
            Joindre directement {siteConfig.companyName}
          </h2>

          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[#626B65] dark:text-[#B4BEB8] leading-relaxed break-words">
            Retrouvez ci-dessous l’ensemble des coordonnées figurant sur le document officiel de l’entreprise. Vous pouvez appeler directement, envoyer un e-mail ou copier un contact en un clic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
          {/* Coordonnées téléphoniques et électroniques */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 min-w-0">
            {/* Bloc Téléphones */}
            <div className="rounded-2xl bg-[#F7F8F6] dark:bg-[#1E2320] border border-[#E2E7E2] dark:border-[#2C332E] p-4 sm:p-6 flex flex-col justify-between min-w-0">
              <div>
                <div className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#115B38] text-white mb-3.5 sm:mb-4">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#262626] dark:text-[#F3F5F3]">
                  Téléphones
                </h3>
                <p className="mt-1 text-xs text-[#626B65] dark:text-[#A3ADA7]">
                  Cliquez sur un numéro pour lancer un appel ou copiez-le :
                </p>

                <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
                  {siteConfig.phones.map((rawPhone, index) => {
                    const formatted = siteConfig.phonesFormatted[index] || rawPhone;
                    const isCopied = copiedValue === formatted;
                    return (
                      <div
                        key={rawPhone}
                        className="rounded-xl bg-white dark:bg-[#141715] border border-[#E2E7E2] dark:border-[#2C332E] p-3 sm:p-3.5 flex flex-wrap items-center justify-between gap-2 min-w-0"
                      >
                        <a
                          href={`tel:${rawPhone}`}
                          className="text-xs sm:text-base font-semibold text-[#262626] dark:text-[#F3F5F3] hover:text-[#115B38] dark:hover:text-[#FF6600] transition-colors tabular-nums"
                        >
                          {formatted}
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(formatted)}
                          aria-label={`Copier le numéro ${formatted}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#F7F8F6] dark:bg-[#252A27] hover:bg-[#EEF5F0] dark:hover:bg-[#115B38]/30 px-2.5 py-1.5 text-xs font-medium text-[#626B65] dark:text-[#B4BEB8] hover:text-[#115B38] dark:hover:text-[#42C082] transition-colors shrink-0"
                        >
                          {isCopied ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-[#115B38] dark:text-[#42C082]" />
                              <span className="text-[#115B38] dark:text-[#42C082]">
                                Copié
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              <span>Copier</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#E2E7E2] dark:border-[#2C332E] text-xs text-[#626B65] dark:text-[#A3ADA7]">
                Deux lignes directes à votre disposition à Yaoundé.
              </div>
            </div>

            {/* Bloc E-mails */}
            <div className="rounded-2xl bg-[#F7F8F6] dark:bg-[#1E2320] border border-[#E2E7E2] dark:border-[#2C332E] p-4 sm:p-6 flex flex-col justify-between min-w-0">
              <div>
                <div className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#FF6600] text-[#262626] mb-3.5 sm:mb-4">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#262626] dark:text-[#F3F5F3]">
                  Messagerie électronique
                </h3>
                <p className="mt-1 text-xs text-[#626B65] dark:text-[#A3ADA7]">
                  Cliquez sur une adresse pour écrire un e-mail ou copiez-la :
                </p>

                <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
                  {siteConfig.emails.map((emailAddr) => {
                    const isCopied = copiedValue === emailAddr;
                    return (
                      <div
                        key={emailAddr}
                        className="rounded-xl bg-white dark:bg-[#141715] border border-[#E2E7E2] dark:border-[#2C332E] p-3 sm:p-3.5 flex flex-col gap-2 min-w-0"
                      >
                        <a
                          href={`mailto:${emailAddr}`}
                          className="text-xs sm:text-sm font-semibold text-[#262626] dark:text-[#F3F5F3] hover:text-[#115B38] dark:hover:text-[#FF6600] break-all transition-colors"
                        >
                          {emailAddr}
                        </a>
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 border-t border-[#F7F8F6] dark:border-[#252A27]">
                          <a
                            href={`mailto:${emailAddr}`}
                            className="text-xs font-medium text-[#115B38] dark:text-[#42C082] hover:underline"
                          >
                            Écrire un message →
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopy(emailAddr)}
                            aria-label={`Copier l'adresse ${emailAddr}`}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#F7F8F6] dark:bg-[#252A27] hover:bg-[#EEF5F0] dark:hover:bg-[#115B38]/30 px-2.5 py-1 text-xs font-medium text-[#626B65] dark:text-[#B4BEB8] hover:text-[#115B38] dark:hover:text-[#42C082] transition-colors shrink-0"
                          >
                            {isCopied ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-[#115B38] dark:text-[#42C082]" />
                                <span className="text-[#115B38] dark:text-[#42C082]">
                                  Copié
                                </span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>Copier</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#E2E7E2] dark:border-[#2C332E] text-xs text-[#626B65] dark:text-[#A3ADA7]">
                Utilisez également le{' '}
                <a
                  href="#devis"
                  className="font-semibold text-[#115B38] dark:text-[#42C082] underline"
                >
                  formulaire de devis
                </a>{' '}
                pour structurer votre demande.
              </div>
            </div>
          </div>

          {/* Bloc Localisation & Repères (Sans faux marqueur GPS) */}
          <div className="lg:col-span-5 min-w-0">
            <div className="h-full rounded-2xl bg-[#262626] dark:bg-[#1E2320] text-white p-4 sm:p-7 lg:p-8 border border-[#262626] dark:border-[#2C332E] flex flex-col justify-between relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 h-2 w-24 sm:w-28 bg-[#FF6600]"
              />

              <div className="min-w-0">
                <div className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#115B38] text-white mb-3.5 sm:mb-4">
                  <MapPin className="h-5 w-5 text-[#FF6600]" aria-hidden="true" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Localisation du siège
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-[#FF6600] break-words">
                  {siteConfig.companyName}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#BFBFBF]">
                  {siteConfig.locationDetail}
                </p>

                {/* Mention explicite demandée */}
                <div className="mt-5 sm:mt-6 rounded-xl bg-white/5 border border-white/10 p-3.5 sm:p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <Compass className="h-4 w-4 text-[#FF6600] shrink-0" aria-hidden="true" />
                    <span>Repère géographique</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#BFBFBF] leading-relaxed">
                    {siteConfig.locationNotice}
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-white/15 space-y-3">
                {siteConfig.mapsUrl ? (
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6600] px-3.5 sm:px-4 py-3 text-xs sm:text-sm font-semibold text-[#262626] hover:bg-[#e55c00] transition-colors text-center"
                  >
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Ouvrir le point de localisation validé</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  </a>
                ) : (
                  <a
                    href={siteConfig.indicativeMapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-3.5 sm:px-4 py-3 text-xs sm:text-sm font-medium text-white transition-colors text-center"
                  >
                    <Compass className="h-4 w-4 text-[#FF6600] shrink-0" aria-hidden="true" />
                    <span>Situer le secteur Tradex Ahala (indicatif)</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-75" aria-hidden="true" />
                  </a>
                )}

                <p className="text-[11px] text-[#BFBFBF] text-center leading-relaxed">
                  Cette recherche situe le secteur général à titre indicatif. Appelez-nous pour obtenir l’itinéraire exact jusqu’à nos bureaux.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
