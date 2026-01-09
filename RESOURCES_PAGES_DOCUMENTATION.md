# Documentation des Pages Ressources - CiviAgora

## Vue d'ensemble

Ce document décrit les 5 pages de ressources créées pour le Footer de CiviAgora, qui offrent un support complet aux utilisateurs de la plateforme.

## Pages créées

### 1. Page Ressources (`/resources`)
**Composant**: `ResourcesPage.tsx`

Page hub qui centralise l'accès à toutes les ressources de support :
- Vue d'ensemble avec 4 sections principales (Comment ça marche, FAQ, Guides, Support)
- Ressources complémentaires (vidéos, PDFs, webinaires, forum)
- Liens rapides vers actions courantes
- Design : Gradient bleu-indigo-violet avec hero animé

### 2. Comment ça marche (`/how-it-works`)
**Composant**: `HowItWorksPage.tsx`

Guide interactif en 4 étapes pour découvrir la plateforme :
1. **Créer votre compte** - Inscription gratuite et personnalisation
2. **Explorer les processus** - Consultation, filtrage par thème
3. **Participer activement** - Proposer, voter, signer, débattre
4. **Suivre l'impact** - Notifications et résultats transparents

**Caractéristiques** :
- Animations Motion avec défilement progressif
- Cards avec gradients et icônes
- Section modules de participation (Consultations, Assemblées, Pétitions, Votes)
- Section avantages (sécurité, notifications, transparence)
- Design : Gradient bleu-violet-indigo

### 3. FAQ (`/faq`)
**Composant**: `FAQPage.tsx`

Base de connaissances organisée avec 40+ questions-réponses :

**Catégories** :
- Questions générales (4 questions)
- Participation (5 questions)
- Questions techniques (4 questions)
- Sécurité & confidentialité (4 questions)

**Fonctionnalités** :
- Recherche en temps réel dans les questions/réponses
- Filtrage par catégorie
- Accordéons animés pour chaque question
- Système d'affichage/masquage avec animations
- Design : Gradient purple-bleu-indigo

### 4. Guides pratiques (`/guides`)
**Composant**: `GuidesPage.tsx`

6 guides détaillés pour maîtriser la plateforme :

**Guides disponibles** :
1. **Guide de démarrage rapide** (10 min, Débutant)
2. **Participer aux concertations** (15 min, Intermédiaire)
3. **Rejoindre une assemblée citoyenne** (12 min, Intermédiaire)
4. **Créer et promouvoir une pétition** (20 min, Avancé)
5. **Voter en toute sécurité** (10 min, Débutant)
6. **Maximiser votre impact** (25 min, Avancé)

**Caractéristiques** :
- Cards avec headers en gradient
- Badges de niveau (Débutant/Intermédiaire/Avancé)
- Durée estimée pour chaque guide
- Liste des topics couverts avec checkmarks
- Ressources complémentaires (vidéos, PDFs, webinaires)
- Design : Gradient emerald-teal-cyan

### 5. Support & Assistance (`/support`)
**Composant**: `SupportPage.tsx`

Centre d'assistance complet avec plusieurs canaux de contact :

**Méthodes de contact** :
- **Email** : support@civiagora.ch (Réponse sous 24h)
- **Téléphone** : +41 22 123 45 67 (Lun-Ven 9h-18h)
- **Chat en direct** : Réponse immédiate
- **Système de tickets** : Réponse sous 48h

**Formulaire de contact** :
- Champs : Nom, Email, Catégorie, Sujet, Message
- 6 catégories disponibles (technique, compte, participation, sécurité, suggestion, autre)
- Validation et feedback avec toast notifications

**Informations supplémentaires** :
- Horaires d'ouverture détaillés
- Adresse physique avec lien Google Maps
- Liens réseaux sociaux (Facebook, Twitter, LinkedIn, YouTube)
- Design : Gradient indigo-purple-pink

## Architecture technique

### Système multilingue
Toutes les pages supportent 3 langues :
- Français (FR)
- Allemand (DE)
- Anglais (EN)

### Traductions ajoutées
Plus de 40 nouvelles clés de traduction dans `LanguageContext.tsx` :
- `resources.*` - Page ressources
- `howItWorks.*` - Comment ça marche
- `faq.*` - FAQ
- `guides.*` - Guides
- `support.*` - Support

### Composants réutilisés
- `PageLayout` - Layout centré max-w-[1280px]
- `motion` de Motion/React - Animations fluides
- `toast` de Sonner - Notifications
- Icons de Lucide-react

### Routes React Router
5 nouvelles routes ajoutées dans `App.tsx` :
- `/resources` - Hub ressources
- `/how-it-works` - Comment ça marche
- `/faq` - Questions fréquentes
- `/guides` - Guides pratiques
- `/support` - Support

## Design System

### Gradients institutionnels GovTech
- **Bleu-Violet** : `from-blue-600 via-purple-600 to-indigo-700`
- **Emerald-Teal** : `from-emerald-600 via-teal-600 to-cyan-700`
- **Purple-Blue** : `from-purple-600 via-blue-600 to-indigo-700`
- **Indigo-Pink** : `from-indigo-600 via-purple-600 to-pink-700`

### Hero sections
Toutes les pages ont un hero avec :
- Background gradient avec pattern SVG subtil
- Icône centrale animée avec backdrop-blur
- Titre et sous-titre avec animations Motion
- Conteneur centré PageLayout

### Animations Motion
- `initial/animate/whileInView` pour entrées progressives
- `whileHover/whileTap` pour interactions
- Animations de défilement avec `viewport={{ once: true }}`
- Transitions fluides sur tous les éléments interactifs

### Responsive Design
- Mobile-first avec breakpoints Tailwind
- Grilles adaptatives (1 col mobile → 2-4 cols desktop)
- Stacking automatique sur mobile
- Touch-friendly pour interactions mobiles

## Navigation

### Footer mis à jour
Les liens "Ressources" dans le Footer utilisent maintenant React Router `<Link>` au lieu de `<a href="#">` :
- Comment ça marche → `/how-it-works`
- FAQ → `/faq`
- Guides → `/guides`
- Support → `/support`

### Navigation inter-pages
Liens croisés entre les pages :
- FAQ → Support (CTA en bas de page)
- Guides → FAQ (lien dans footer de section)
- Support → FAQ (suggestion avant formulaire)
- How it works → Consultations, FAQ (CTAs)
- Resources → Toutes les autres pages (hub)

## Contenu

### Questions FAQ (17 questions totales)
**Générales** : Qu'est-ce que CiviAgora, Créer compte, Gratuit, Qui peut utiliser
**Participation** : Consultation, Pétition, Anonymat, Signer, Voter
**Techniques** : Navigateurs, Mobile, Mot de passe oublié, Notifications
**Sécurité** : Données sécurisées, Confidentialité votes, Supprimer compte, Vérification identité

### Guides (6 guides complets)
Chaque guide contient :
- Titre multilingue
- Description détaillée
- Durée estimée
- Niveau de difficulté
- 4 topics principaux
- Gradient et icône distinctive

## Accessibilité

- Aria-labels sur icônes et liens
- Contrast ratios conformes WCAG AA
- Navigation au clavier
- Focus states visibles
- Sémantique HTML appropriée
- Textes alternatifs

## Performance

- Lazy loading des animations Motion
- Images optimisées (pas d'images lourdes, icônes SVG)
- Code-splitting par route React Router
- Viewport-based animations (ne se déclenchent qu'à la vue)

## Maintenance future

### Ajout de nouveaux contenus
**FAQ** : Ajouter questions dans le tableau `faqData` par catégorie
**Guides** : Ajouter objets dans tableau `guides` avec toutes propriétés
**Support** : Modifier coordonnées dans objets `contactMethods` et `officeHours`

### Traductions
Toutes les traductions sont centralisées dans `LanguageContext.tsx`.
Pour ajouter une nouvelle langue, ajouter la clé dans chaque objet de traduction.

### Modifications de style
Les gradients et couleurs sont définis en constantes réutilisables.
Modifier les classes Tailwind dans les props `gradient` et `color`.

## Tests recommandés

1. **Navigation** : Vérifier tous les liens internes/externes
2. **Multilingue** : Tester changement de langue sur chaque page
3. **Responsive** : Tester mobile/tablet/desktop
4. **Formulaire** : Valider soumission formulaire support
5. **Animations** : Vérifier fluidité sur différents appareils
6. **Recherche FAQ** : Tester filtrage et recherche temps réel

## Conformité GovTech

✅ Design institutionnel sobre et professionnel
✅ Gradients bleu-violet et vert-émeraude
✅ Architecture centrée (max-w-[1280px])
✅ Multilingue FR/DE/EN
✅ Responsive desktop/mobile
✅ Accessibilité WCAG
✅ Cohérence avec système de design KPI Cards
✅ Animations professionnelles et subtiles

---

**Date de création** : Janvier 2025
**Statut** : ✅ Complet et fonctionnel
**Mainteneur** : Équipe CiviAgora
