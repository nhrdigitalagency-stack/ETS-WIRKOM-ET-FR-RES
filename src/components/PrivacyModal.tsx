import React, { useEffect, useRef } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262626]/70 dark:bg-black/75 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#1B1E1C] border border-[#E2E7E2] dark:border-[#2C332E] shadow-xl overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 bg-[#262626] dark:bg-[#141715] text-white border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-[#FF6600] shrink-0" aria-hidden="true" />
            <h2 id="privacy-modal-title" className="text-sm sm:text-lg font-bold">
              Politique de confidentialité & Données
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre de confidentialité"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-[#626B65] dark:text-[#B4BEB8] leading-relaxed max-h-[75vh] overflow-y-auto">
          <div>
            <h3 className="font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1">
              1. Responsable des échanges
            </h3>
            <p>
              Ce site de présentation appartient aux{' '}
              <strong className="text-[#262626] dark:text-white">
                {siteConfig.companyName}
              </strong>
              , implantés à {siteConfig.locationDetail}.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1">
              2. Traitement de votre demande de devis
            </h3>
            <p>
              Les informations que vous renseignez dans le formulaire de préparation de devis ne sont transmises à aucun serveur tiers automatique : elles servent uniquement à préparer le message dans votre propre application de messagerie (ou dans votre presse-papiers) afin que vous puissiez l’adresser volontairement à nos adresses officielles.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1">
              3. Sauvegarde locale de confort
            </h3>
            <p>
              Pour éviter toute perte accidentelle de votre texte en cours de rédaction, les champs du formulaire sont conservés temporairement sur votre navigateur. Vous pouvez les effacer à tout moment via le bouton « Effacer les champs » situé sous le formulaire.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#262626] dark:text-[#F3F5F3] mb-1">
              4. Contact et exercice de vos droits
            </h3>
            <p>
              Pour toute question relative à vos échanges ou pour demander la suppression d’un e-mail envoyé, vous pouvez nous écrire directement à{' '}
              <a
                href={`mailto:${siteConfig.primaryEmail}`}
                className="font-semibold text-[#115B38] dark:text-[#42C082] underline"
              >
                {siteConfig.primaryEmail}
              </a>
              .
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-4 bg-[#F7F8F6] dark:bg-[#141715] border-t border-[#E2E7E2] dark:border-[#2C332E] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#115B38] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-[#0c4329] transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
