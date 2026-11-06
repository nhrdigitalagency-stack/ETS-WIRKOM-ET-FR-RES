export type ServiceId =
  | 'commerce-general'
  | 'prestations-services'
  | 'import-export'
  | 'restauration-collective'
  | 'evenementiel';

export interface ServiceItem {
  id: ServiceId;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  ctaLabel: string;
  iconName: 'PackageCheck' | 'Briefcase' | 'Globe' | 'Utensils' | 'CalendarRange';
  imageUrl: string;
  imageAlt: string;
  scopePoints: string[];
  preparationTips: string[];
  cautionNote: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface RealizationItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
}

export interface SiteConfig {
  companyName: string;
  shortName: string;
  city: string;
  country: string;
  locationLabel: string;
  locationDetail: string;
  locationNotice: string;
  phones: string[];
  phonesFormatted: string[];
  primaryPhoneIndex: number;
  emails: string[];
  primaryEmail: string;
  whatsappNumber: string;
  mapsUrl: string;
  indicativeMapsSearchUrl: string;
  logoUrl: string;
  referenceDocumentUrl: string;
  siteUrl: string;
  primaryColor: string;
  secondaryColor: string;
  darkColor: string;
  showRealizations: boolean;
  realizations: RealizationItem[];
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  hero: {
    kicker: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    locationBadge: string;
    imageUrl: string;
    imageAlt: string;
  };
  companyOverview: {
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    needsPromptTitle: string;
    needsPrompts: {
      id: string;
      question: string;
      subtext: string;
      targetServiceId: ServiceId;
    }[];
  };
  services: ServiceItem[];
  processSteps: ProcessStep[];
  faq: FaqItem[];
  budgetOptions: string[];
}

/**
 * CONFIGURATION CENTRALISÉE — ETS WIRKOM ET FRÈRES
 *
 * Ce fichier centralise toutes les coordonnées, couleurs, textes éditoriaux
 * et options d'affichage. Le propriétaire peut modifier facilement :
 * - primaryEmail : l'adresse e-mail qui reçoit les demandes par défaut
 * - primaryPhoneIndex : l'indice (0 ou 1) du téléphone mis en avant
 * - whatsappNumber : ex. "+237695713487" (uniquement après validation WhatsApp)
 * - mapsUrl : lien Google Maps exact validé par l'entreprise
 * - logoUrl : chemin vers le fichier logo autonome (ex. "/assets/logo-wirkom.svg")
 * - showRealizations : passer à true uniquement lorsque de vrais projets sont fournis
 */
export const siteConfig: SiteConfig = {
  companyName: 'ETS WIRKOM ET FRÈRES',
  shortName: 'WIRKOM',
  city: 'Yaoundé',
  country: 'Cameroun',
  locationLabel: 'Secteur Tradex Ahala',
  locationDetail: 'Tradex Ahala, Yaoundé, Cameroun',
  locationNotice:
    'Secteur Tradex Ahala. Contactez-nous pour obtenir les indications précises.',
  phones: ['+237695713487', '+237694888284'],
  phonesFormatted: ['+237 695 713 487', '+237 694 888 284'],
  primaryPhoneIndex: 0,
  emails: [
    'wirkomservices@gmail.com',
    'rahmaninternationalwirkom@gmail.com',
  ],
  primaryEmail: 'wirkomservices@gmail.com',
  whatsappNumber: '', // Vide par défaut : s'active uniquement après validation par l'entreprise
  mapsUrl: '', // Vide par défaut : utiliser uniquement un point GPS ou lien validé
  indicativeMapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Tradex+Ahala+Yaounde+Cameroun',
  logoUrl: '', // Vide par défaut : affiche la signature typographique sobre WIRKOM
  referenceDocumentUrl: '/assets/aistudio/wirkom_services_f587c2f3.pdf',
  siteUrl: '',
  primaryColor: '#FF6600',
  secondaryColor: '#115B38',
  darkColor: '#262626',
  showRealizations: false,
  realizations: [],
  socialLinks: {},

  navigation: [
    { label: 'Accueil', href: '#accueil' },
    { label: 'L’entreprise', href: '#entreprise' },
    { label: 'Nos services', href: '#services' },
    { label: 'Notre démarche', href: '#demarche' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    kicker: 'Commerce • Services • Solutions',
    title: 'Un interlocuteur pour accompagner vos besoins professionnels.',
    description:
      'Basés à Yaoundé, les ETS WIRKOM ET FRÈRES interviennent dans le commerce général, les prestations de services, l’import-export, la restauration collective et l’événementiel.',
    primaryCta: 'Présenter mon projet',
    secondaryCta: 'Découvrir nos services',
    locationBadge: 'Yaoundé · Tradex Ahala',
    imageUrl: '/src/assets/images/service_prestations_services_1793966164289.jpg',
    imageAlt:
      'Illustration d’un espace de travail et de coordination de projets professionnels',
  },

  companyOverview: {
    title: 'Une entreprise, plusieurs domaines d’intervention.',
    description:
      'ETS WIRKOM ET FRÈRES réunit plusieurs activités pour répondre à des besoins variés en commerce, services, approvisionnement, restauration collective et événementiel. L’entreprise est située à Yaoundé, au niveau de Tradex Ahala.',
    imageUrl: '/src/assets/images/hero_wirkom_corporate_1793966159764.jpg',
    imageAlt:
      'Visuel d’illustration symbolisant les échanges et la coordination multisectorielle',
    needsPromptTitle: 'Parlons de votre besoin',
    needsPrompts: [
      {
        id: 'need-supply',
        question: 'Vous recherchez un produit ou un approvisionnement ?',
        subtext:
          'Fournitures professionnelles, marchandises générales ou opérations d’import-export.',
        targetServiceId: 'commerce-general',
      },
      {
        id: 'need-event',
        question: 'Vous préparez un projet ou un événement ?',
        subtext:
          'Organisation événementielle ou dispositif de restauration collective adapté à votre contexte.',
        targetServiceId: 'evenementiel',
      },
      {
        id: 'need-service',
        question: 'Vous souhaitez discuter d’une prestation ?',
        subtext:
          'Définition du périmètre, des modalités pratiques et étude personnalisée de votre besoin.',
        targetServiceId: 'prestations-services',
      },
    ],
  },

  services: [
    {
      id: 'commerce-general',
      number: '01',
      title: 'Commerce général',
      shortTitle: 'Commerce général',
      description:
        'Présentez vos besoins en produits et fournitures afin d’échanger sur les possibilités d’approvisionnement.',
      ctaLabel: 'Décrire mon besoin',
      iconName: 'PackageCheck',
      imageUrl: '/src/assets/images/service_commerce_general_1793966162211.jpg',
      imageAlt:
        'Illustration d’approvisionnement en fournitures et équipements professionnels',
      scopePoints: [
        'Identification des produits, fournitures ou équipements recherchés',
        'Étude des quantités souhaitées et de la périodicité éventuelle',
        'Échange sur les modalités de mise à disposition à Yaoundé ou selon votre projet',
      ],
      preparationTips: [
        'Nature exacte des produits ou fournitures souhaités',
        'Volume ou quantité indicative',
        'Échéance souhaitée et lieu de livraison envisagé',
      ],
      cautionNote:
        'Les disponibilités et conditions d’approvisionnement sont étudiées au cas par cas selon votre demande.',
    },
    {
      id: 'prestations-services',
      number: '02',
      title: 'Prestations de services',
      shortTitle: 'Prestations de services',
      description:
        'Échangeons sur votre besoin pour préciser la prestation recherchée, son périmètre et ses modalités.',
      ctaLabel: 'Parler de ma prestation',
      iconName: 'Briefcase',
      imageUrl: '/src/assets/images/service_prestations_services_1793966164289.jpg',
      imageAlt:
        'Illustration de cadrage et planification de prestations de services professionnelles',
      scopePoints: [
        'Analyse du besoin opérationnel ou professionnel exprimé',
        'Cadrage du périmètre d’intervention et des attentes',
        'Définition conjointe des modalités pratiques d’accompagnement',
      ],
      preparationTips: [
        'Objectif principal de la prestation attendue',
        'Contraintes particulières (lieu, calendrier, organisation)',
        'Durée ponctuelle ou récurrente envisagée',
      ],
      cautionNote:
        'Chaque demande fait l’objet d’un échange préalable afin de vérifier l’adéquation avec nos capacités d’intervention.',
    },
    {
      id: 'import-export',
      number: '03',
      title: 'Import-export',
      shortTitle: 'Import-export',
      description:
        'Contactez l’entreprise pour étudier une demande liée à l’importation ou à l’exportation de marchandises.',
      ctaLabel: 'Présenter ma demande',
      iconName: 'Globe',
      imageUrl: '/src/assets/images/service_import_export_1793966165057.jpg',
      imageAlt:
        'Illustration d’opérations d’import-export et d’acheminement de marchandises',
      scopePoints: [
        'Examen des demandes liées à l’acheminement ou au négoce de marchandises',
        'Prise en compte de la nature des produits et des volumes envisagés',
        'Étude de faisabilité selon l’origine ou la destination indiquée',
      ],
      preparationTips: [
        'Type de marchandise concernée',
        'Quantité ou volume estimatif',
        'Provenance ou destination connue et calendrier souhaité',
      ],
      cautionNote:
        'Les modalités et conditions d’intervention en import-export sont précisées après étude détaillée de votre dossier.',
    },
    {
      id: 'restauration-collective',
      number: '04',
      title: 'Restauration collective',
      shortTitle: 'Restauration collective',
      description:
        'Présentez votre besoin de restauration collective, le nombre de personnes concernées et le contexte de la prestation.',
      ctaLabel: 'Préparer ma demande',
      iconName: 'Utensils',
      imageUrl:
        '/src/assets/images/service_restauration_evenementiel_1793966165229.jpg',
      imageAlt:
        'Illustration d’un service de restauration collective et de buffet professionnel',
      scopePoints: [
        'Restauration pour structures professionnelles, organisations ou rassemblements',
        'Adaptation selon l’effectif annoncé et la fréquence souhaitée',
        'Coordination selon le lieu et les contraintes horaires de votre structure',
      ],
      preparationTips: [
        'Nombre estimatif de personnes à servir',
        'Fréquence (ponctuelle, sur plusieurs jours ou régulière)',
        'Lieu de la prestation et contraintes particulières',
      ],
      cautionNote:
        'Les formules, menus et modalités d’organisation sont définis directement lors de l’étude de votre demande.',
    },
    {
      id: 'evenementiel',
      number: '05',
      title: 'Événementiel',
      shortTitle: 'Événementiel',
      description:
        'Partagez les informations essentielles de votre événement pour échanger sur l’accompagnement recherché.',
      ctaLabel: 'Parler de mon événement',
      iconName: 'CalendarRange',
      imageUrl:
        '/src/assets/images/service_restauration_evenementiel_1793966165229.jpg',
      imageAlt:
        'Illustration d’aménagement et d’organisation de réception événementielle',
      scopePoints: [
        'Écoute et cadrage des besoins liés à votre événement professionnel ou privé',
        'Identification des volets sur lesquels vous recherchez un appui',
        'Coordination avec nos autres activités (notamment restauration si souhaité)',
      ],
      preparationTips: [
        'Nature de l’événement (rencontre professionnelle, cérémonie, réception, etc.)',
        'Date envisagée et nombre estimatif de participants',
        'Lieu prévu et besoins d’accompagnement prioritaires',
      ],
      cautionNote:
        'Le périmètre exact de l’accompagnement événementiel est établi sur mesure après échange avec vous.',
    },
  ],

  processSteps: [
    {
      stepNumber: '01',
      title: 'Vous présentez votre besoin',
      description:
        'Indiquez le domaine concerné et décrivez votre projet via le formulaire de préparation ou en nous contactant directement par téléphone ou e-mail.',
    },
    {
      stepNumber: '02',
      title: 'Les éléments nécessaires sont précisés avec vous',
      description:
        'Nous échangeons pour clarifier le contexte, les quantités, le nombre de personnes, la localité ou les attentes particulières.',
    },
    {
      stepNumber: '03',
      title: 'Les possibilités et conditions sont étudiées',
      description:
        'Votre demande est examinée afin de déterminer les solutions adaptées et les modalités concrètes de mise en œuvre.',
    },
    {
      stepNumber: '04',
      title: 'Une proposition peut être préparée après échange',
      description:
        'Lorsque l’ensemble des paramètres est validé avec vous, une proposition chiffrée et adaptée à votre besoin peut vous être transmise.',
    },
  ],

  faq: [
    {
      id: 'faq-domaines',
      question: 'Quels sont vos domaines d’intervention ?',
      answer:
        'Les ETS WIRKOM ET FRÈRES interviennent dans cinq domaines d’activité : le commerce général, les prestations de services, l’import-export, la restauration collective et l’événementiel.',
    },
    {
      id: 'faq-localisation',
      question: 'Où se trouve l’entreprise ?',
      answer:
        'L’entreprise est implantée à Yaoundé, au Cameroun, dans le secteur Tradex Ahala. Nous vous invitons à nous contacter par téléphone ou par e-mail avant votre déplacement afin d’obtenir les repères exacts.',
    },
    {
      id: 'faq-devis',
      question: 'Comment demander un devis ?',
      answer:
        'Vous pouvez utiliser le formulaire de cette page pour structurer votre besoin : il prépare automatiquement un e-mail complet prêt à être envoyé depuis votre messagerie, ou vous permet de copier votre demande. Vous pouvez également nous joindre directement par téléphone ou par e-mail.',
    },
    {
      id: 'faq-informations',
      question: 'Quelles informations fournir ?',
      answer:
        'Pour faciliter l’étude de votre demande, précisez le domaine concerné, la nature de votre besoin, ainsi que la quantité ou le nombre de personnes, le lieu du projet et l’échéance souhaitée lorsque ces éléments sont connus.',
    },
    {
      id: 'faq-tarifs',
      question: 'Les tarifs sont-ils affichés en ligne ?',
      answer:
        'Aucune grille tarifaire standard n’est publiée en ligne. Chaque besoin (approvisionnement, prestation, restauration collective ou événement) présente des spécificités qui nécessitent une étude préalable avant l’établissement d’une proposition.',
    },
    {
      id: 'faq-hors-yaounde',
      question: 'Intervenez-vous hors de Yaoundé ?',
      answer:
        'Contactez l’entreprise pour vérifier les possibilités d’intervention selon votre projet et la localité concernée.',
    },
  ],

  budgetOptions: [
    'À définir',
    'Moins de 250 000 FCFA',
    '250 000 FCFA – 1 000 000 FCFA',
    '1 000 000 FCFA – 5 000 000 FCFA',
    'Plus de 5 000 000 FCFA',
  ],
};
