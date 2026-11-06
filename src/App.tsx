/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { ServiceId } from './config/siteConfig';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CompanyOverview } from './components/CompanyOverview';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { QuoteForm } from './components/QuoteForm';
import { RealizationsSection } from './components/RealizationsSection';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';

const THEME_STORAGE_KEY = 'wirkom_theme_preference';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] =
    useState<ServiceId>('commerce-general');
  const [activeSection, setActiveSection] = useState<string>('accueil');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);

  // Gestion du mode sombre global avec persistance locale
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
    } catch {
      // Ignore storage error
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage error
    }
  }, [isDark]);

  const handleToggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // Suivi de la section active au défilement pour la navigation
  useEffect(() => {
    const sectionIds = [
      'accueil',
      'entreprise',
      'services',
      'demarche',
      'devis',
      'faq',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Présélection d'un service et défilement vers le formulaire sans effacer les données saisies
  const handleSelectServiceAndScroll = useCallback((serviceId: ServiceId) => {
    setSelectedServiceId(serviceId);
    const quoteElement = document.getElementById('devis');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#F7F8F6] dark:bg-[#121413] text-[#262626] dark:text-[#F3F5F3] transition-colors duration-200">
      {/* Lien d'évitement pour l'accessibilité clavier */}
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-[#262626] focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Aller au contenu principal
      </a>

      {/* Navigation principale sticky avec sélecteur de thème */}
      <Header
        activeSection={activeSection}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      {/* Contenu principal */}
      <main id="contenu-principal" className="flex-1 w-full max-w-full overflow-x-hidden">
        <Hero onSelectService={handleSelectServiceAndScroll} />

        <CompanyOverview onSelectService={handleSelectServiceAndScroll} />

        <ServicesSection
          selectedServiceId={selectedServiceId}
          onSelectService={handleSelectServiceAndScroll}
        />

        <ProcessSection />

        <QuoteForm
          selectedServiceId={selectedServiceId}
          onServiceChange={setSelectedServiceId}
        />

        <RealizationsSection />

        <FAQ />

        <ContactSection />
      </main>

      {/* Pied de page corporate */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onSelectService={handleSelectServiceAndScroll}
      />

      {/* Fenêtre modale de confidentialité accessible */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
