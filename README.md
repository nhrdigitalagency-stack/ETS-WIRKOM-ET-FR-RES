# ETS WIRKOM ET FRÈRES — Site Vitrine Corporate

Landing page corporate responsive développée pour **ETS WIRKOM ET FRÈRES** (Yaoundé, Secteur Tradex Ahala, Cameroun).

## Domaines d’intervention présentés
1. **Commerce général**
2. **Prestations de services**
3. **Import-export**
4. **Restauration collective**
5. **Événementiel**

## Fonctionnalités principales
- **Navigation par ancres & Header responsive** (Desktop & Mobile accessible au clavier, fermeture avec `Échap`).
- **Mode clair / Mode sombre global** (persisté dans `localStorage`, respectant la charte graphique `#FF6600`, `#115B38`, `#262626`).
- **Animations fluides sur les cartes Services** (`motion/react` avec respect de `prefers-reduced-motion`).
- **Formulaire de préparation de devis progressif** :
  - Présélection dynamique du service sans effacer les saisies existantes.
  - Champs contextuels adaptés au service choisi.
  - Préparation d’e-mail encodé (`mailto:`) et copie en un clic dans le presse-papiers.

## Configuration centralisée
Toutes les coordonnées, couleurs et options se trouvent dans :
- `src/config/siteConfig.ts`

## Installation et démarrage en local

```bash
npm install
npm run dev
```

Build de production :
```bash
npm run build
```
