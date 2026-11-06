import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface HeaderProps {
  activeSection: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrollMetrics = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 16);

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (docHeight > 0) {
        const progress = Math.min(1, Math.max(0, scrollTop / docHeight));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', updateScrollMetrics, { passive: true });
    window.addEventListener('resize', updateScrollMetrics, { passive: true });
    updateScrollMetrics();

    return () => {
      window.removeEventListener('scroll', updateScrollMetrics);
      window.removeEventListener('resize', updateScrollMetrics);
    };
  }, []);

  // Gestion de la touche Échap et du focus pour l'accessibilité mobile
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const timer = setTimeout(() => {
      firstMenuLinkRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const progressPercentage = Math.round(scrollProgress * 100);

  return (
    <header className="sticky top-2 sm:top-3 z-50 w-full max-w-full px-2.5 sm:px-6 lg:px-8 transition-all duration-200">
      <div
        className={`relative overflow-hidden mx-auto w-full max-w-7xl rounded-2xl bg-white/95 dark:bg-[#1B1E1C]/95 backdrop-blur-md border border-[#E2E7E2] dark:border-[#2C332E] transition-all duration-200 ${
          isScrolled
            ? 'shadow-[0_8px_30px_rgb(38,38,38,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.45)]'
            : 'shadow-[0_2px_12px_rgb(38,38,38,0.04)] dark:shadow-[0_2px_12px_rgb(0,0,0,0.25)]'
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-6 px-3 sm:px-6 py-2.5 sm:py-3.5 min-w-0">
          {/* Zone 1 : Signature typographique sobre ou logo autonome */}
          <a
            href="#accueil"
            onClick={handleNavClick}
            className="group flex items-center gap-2 sm:gap-3 min-w-0 shrink rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#1B1E1C]"
            aria-label={`${siteConfig.companyName} — Retour à l'accueil`}
          >
            {siteConfig.logoUrl ? (
              <img
                src={siteConfig.logoUrl}
                alt={siteConfig.companyName}
                width={150}
                height={40}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            ) : (
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                {/* Repère géométrique inspiré des angles du document */}
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-[#115B38] text-[#FFFFFF] font-bold text-base tracking-tight relative overflow-hidden shrink-0"
                >
                  <span className="relative z-10">W</span>
                  <span
                    className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-[#FF6600]"
                    style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
                  />
                </span>
                <div className="flex flex-col leading-none min-w-0">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-[#262626] dark:text-[#F3F5F3] group-hover:text-[#115B38] dark:group-hover:text-[#FF6600] transition-colors truncate">
                    {siteConfig.shortName}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-medium text-[#626B65] dark:text-[#A3ADA7] tracking-wider mt-0.5 truncate">
                    {siteConfig.companyName}
                  </span>
                </div>
              </div>
            )}
          </a>

          {/* Zone 2 : Navigation centrale sur ordinateur */}
          <nav
            aria-label="Navigation principale"
            className="hidden lg:flex items-center gap-5 xl:gap-8"
          >
            {siteConfig.navigation.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-md px-1.5 py-1.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] ${
                    isActive
                      ? 'text-[#115B38] dark:text-[#42C082] font-semibold'
                      : 'text-[#262626] dark:text-[#D5DDD8] hover:text-[#115B38] dark:hover:text-[#FF6600]'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-[#FF6600] transition-all duration-200 ${
                      isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3 : Bascule Mode Sombre + Action principale à droite + bouton menu mobile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Sélecteur de thème clair / sombre */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                isDark ? 'Activer le mode clair' : 'Activer le mode sombre'
              }
              title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              className="inline-flex h-10 w-10 sm:w-auto sm:px-3 items-center justify-center gap-2 rounded-xl border border-[#E2E7E2] dark:border-[#2C332E] bg-[#F7F8F6] dark:bg-[#252A27] text-[#262626] dark:text-[#F3F5F3] hover:border-[#115B38] dark:hover:border-[#FF6600] hover:bg-[#EEF5F0] dark:hover:bg-[#2E3531] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] transition-colors shrink-0"
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4 text-[#FF6600] shrink-0" aria-hidden="true" />
                  <span className="hidden xl:inline text-xs font-medium whitespace-nowrap">
                    Clair
                  </span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-[#115B38] shrink-0" aria-hidden="true" />
                  <span className="hidden xl:inline text-xs font-medium whitespace-nowrap">
                    Sombre
                  </span>
                </>
              )}
            </button>

            <a
              href="#devis"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#FF6600] px-4 py-2.5 text-sm font-semibold text-[#262626] hover:bg-[#e55c00] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#115B38] focus-visible:ring-offset-2 transition-all duration-150 whitespace-nowrap shrink-0 shadow-xs"
            >
              <span>Demander un devis</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={
                mobileMenuOpen
                  ? 'Fermer le menu de navigation'
                  : 'Ouvrir le menu de navigation'
              }
              className="inline-flex lg:hidden h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-[#E2E7E2] dark:border-[#2C332E] bg-[#F7F8F6] dark:bg-[#252A27] text-[#262626] dark:text-[#F3F5F3] hover:bg-[#EEF5F0] dark:hover:bg-[#2E3531] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] transition-colors shrink-0"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Barre de progression de défilement (Scroll Progress Bar) fixée sous le header */}
        <div
          role="progressbar"
          aria-label="Progression de lecture de la page"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercentage}
          className="h-1 w-full bg-[#E2E7E2]/60 dark:bg-[#2C332E]/70 overflow-hidden"
        >
          <div
            className="h-full w-full origin-left bg-gradient-to-r from-[#115B38] via-[#FF6600] to-[#FF6600] transform-gpu transition-transform duration-100 ease-out"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>

        {/* Menu Mobile accessible */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            ref={mobileMenuRef}
            role="region"
            aria-label="Menu mobile"
            className="lg:hidden border-t border-[#E2E7E2] dark:border-[#2C332E] px-3.5 sm:px-4 pt-3 pb-4 bg-white dark:bg-[#1B1E1C] rounded-b-2xl"
          >
            <nav
              aria-label="Navigation principale mobile"
              className="flex flex-col space-y-1"
            >
              {siteConfig.navigation.map((item, idx) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.href}
                    ref={idx === 0 ? firstMenuLinkRef : undefined}
                    href={item.href}
                    onClick={handleNavClick}
                    className={`flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-sm sm:text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] ${
                      isActive
                        ? 'bg-[#EEF5F0] dark:bg-[#115B38]/30 text-[#115B38] dark:text-[#42C082] font-semibold'
                        : 'text-[#262626] dark:text-[#F3F5F3] hover:bg-[#F7F8F6] dark:hover:bg-[#252A27]'
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    {isActive && (
                      <span className="text-xs font-medium text-[#115B38] dark:text-[#42C082] shrink-0">
                        Active
                      </span>
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Bascule mode sombre explicite dans le menu mobile */}
            <div className="mt-3 pt-3 border-t border-[#E2E7E2] dark:border-[#2C332E]">
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-[#F7F8F6] dark:bg-[#252A27] text-[#262626] dark:text-[#F3F5F3] border border-[#E2E7E2] dark:border-[#2C332E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600]"
              >
                <span>Apparence du site</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#115B38] dark:text-[#FF6600] shrink-0">
                  {isDark ? (
                    <>
                      <Sun className="h-4 w-4 text-[#FF6600]" aria-hidden="true" />
                      <span>Mode clair</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 text-[#115B38]" aria-hidden="true" />
                      <span>Mode sombre</span>
                    </>
                  )}
                </span>
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-[#E2E7E2] dark:border-[#2C332E] flex flex-col gap-2.5">
              <a
                href="#devis"
                onClick={handleNavClick}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6600] px-4 py-3 text-sm font-semibold text-[#262626] hover:bg-[#e55c00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#115B38] transition-colors"
              >
                <span>Demander un devis</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#626B65] dark:text-[#A3ADA7] px-1 pt-1">
                <span>{siteConfig.locationDetail}</span>
                <a
                  href={`tel:${siteConfig.phones[siteConfig.primaryPhoneIndex]}`}
                  className="font-medium text-[#115B38] dark:text-[#42C082] underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6600] rounded"
                >
                  {siteConfig.phonesFormatted[siteConfig.primaryPhoneIndex]}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
