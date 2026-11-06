import React from 'react';
import { ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig, ServiceId } from '../config/siteConfig';

interface FooterProps {
  onOpenPrivacy: () => void;
  onSelectService: (serviceId: ServiceId) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onSelectService,
}) => {
  const currentYear = new Date().getFullYear();

  const socialEntries = Object.entries(siteConfig.socialLinks).filter(
    ([, url]) => typeof url === 'string' && url.trim().length > 0
  );

  return (
    <footer className="w-full max-w-full overflow-hidden bg-[#262626] dark:bg-[#111312] text-white border-t-4 border-[#115B38] relative">
      {/* Détail géométrique inspiré du bas de page du document */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-48 h-48 bg-[#115B38]/40 hidden lg:block"
        style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
      />

      <div className="mx-auto w-full max-w-7xl px-3.5 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10">
          {/* Colonne 1 : Identité et résumé des activités */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-4 min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#115B38] text-white font-bold text-lg relative overflow-hidden shrink-0"
              >
                <span>W</span>
                <span
                  className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-[#FF6600]"
                  style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
                />
              </span>
              <div className="min-w-0">
                <p className="text-base sm:text-lg font-bold tracking-tight text-[#FF6600] truncate">
                  {siteConfig.companyName}
                </p>
                <p className="text-xs text-[#BFBFBF] truncate">
                  {siteConfig.locationDetail}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#BFBFBF] leading-relaxed break-words">
              Entreprise polyvalente basée à Yaoundé intervenant dans le commerce général, les prestations de services, l’import-export, la restauration collective et l’événementiel.
            </p>

            {/* Liens sociaux : affichés uniquement si des URL officielles sont renseignées */}
            {socialEntries.length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {socialEntries.map(([network, url]) => (
                  <a
                    key={network}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[#BFBFBF] hover:text-white underline capitalize"
                  >
                    {network}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Colonne 2 : Navigation rapide */}
          <div className="lg:col-span-2 space-y-2.5 sm:space-y-3 min-w-0">
            <h3 className="text-xs font-semibold tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#BFBFBF]">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-[#FF6600] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#devis"
                  className="text-[#FF6600] font-medium hover:underline"
                >
                  Demander un devis
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Les 5 domaines d'activité */}
          <div className="lg:col-span-3 space-y-2.5 sm:space-y-3 min-w-0">
            <h3 className="text-xs font-semibold tracking-wider text-white">
              Domaines d’intervention
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#BFBFBF]">
              {siteConfig.services.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="text-left hover:text-white transition-colors flex items-center gap-2 min-w-0"
                  >
                    <span className="text-xs font-mono text-[#FF6600] shrink-0">
                      {service.number}.
                    </span>
                    <span className="truncate">{service.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 : Coordonnées directes */}
          <div className="lg:col-span-3 space-y-2.5 sm:space-y-3 min-w-0">
            <h3 className="text-xs font-semibold tracking-wider text-white">
              Coordonnées
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#BFBFBF] min-w-0">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#FF6600] shrink-0 mt-0.5" aria-hidden="true" />
                <span className="break-words">{siteConfig.locationDetail}</span>
              </div>

              {siteConfig.phones.map((rawPhone, idx) => (
                <div key={rawPhone} className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#115B38] shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${rawPhone}`}
                    className="hover:text-white transition-colors tabular-nums"
                  >
                    {siteConfig.phonesFormatted[idx] || rawPhone}
                  </a>
                </div>
              ))}

              {siteConfig.emails.map((emailAddr) => (
                <div key={emailAddr} className="flex items-center gap-2.5 min-w-0">
                  <Mail className="h-4 w-4 text-[#FF6600] shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${emailAddr}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {emailAddr}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barre inférieure : Copyright, Confidentialité et Retour en haut */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#BFBFBF]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 sm:gap-x-4 gap-y-2 text-center sm:text-left">
            <span>
              © {currentYear} {siteConfig.companyName}. Tous droits réservés.
            </span>
            <span aria-hidden="true" className="hidden sm:inline text-white/20">
              ·
            </span>
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-white underline underline-offset-4 transition-colors"
            >
              Confidentialité
            </button>
          </div>

          <a
            href="#accueil"
            aria-label="Retour en haut de la page"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-[#115B38] px-4 py-2 text-xs font-semibold text-white transition-colors shrink-0"
          >
            <span>Retour en haut</span>
            <ArrowUp className="h-3.5 w-3.5 text-[#FF6600] shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
