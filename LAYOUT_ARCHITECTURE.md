# CiviAgora - Architecture de Layout Centrée

## Vue d'ensemble

La plateforme CiviAgora utilise maintenant une architecture de layout avec **axe de symétrie vertical centré** pour créer une interface visuellement équilibrée et professionnelle.

## Principes de conception

### 1. Axe de symétrie central
- Tous les conteneurs principaux sont centrés horizontalement sur le viewport
- Largeur maximale : `1400px`
- Marges égales des deux côtés
- Alignement vertical constant

### 2. Structure HTML

```html
<div className="w-full flex justify-center">
  <div className="w-full max-w-[1400px] px-6 lg:px-8">
    {/* Contenu centré */}
  </div>
</div>
```

### 3. Composants principaux

#### Header (Navigation)
- **Layout** : Grid 3 colonnes `grid-cols-[auto_1fr_auto]`
  - Colonne gauche : Logo + nom
  - Colonne centrale : Navigation (centrée avec `justify-center`)
  - Colonne droite : Actions (recherche, langue, connexion)
- **Largeur max** : 1400px
- **Padding** : `px-6 lg:px-8`

#### Footer
- **Layout** : Identique au header avec conteneur centré
- **Largeur max** : 1400px
- **Grid** : 4 colonnes sur desktop, responsive

#### PageBanner
- **Layout** : Conteneur centré avec max-width 1400px
- **Flexbox** : Alignement horizontal des éléments

#### PublicLayout Component
```tsx
<PublicLayout className="py-8">
  {/* Contenu de la page */}
</PublicLayout>
```

## Migration des pages

### Ancien pattern
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {/* Contenu */}
</div>
```

### Nouveau pattern
```tsx
import { PublicLayout } from '../components/PublicLayout';

<PublicLayout className="py-8">
  {/* Contenu */}
</PublicLayout>
```

## Breakpoints et Responsive

| Breakpoint | Padding | Max Width |
|------------|---------|-----------|
| Mobile (<lg) | `px-6` | 100% |
| Desktop (≥lg) | `px-8` | 1400px |

## Avantages

✅ **Symétrie visuelle** : Axe vertical central clair  
✅ **Cohérence** : Tous les éléments alignés sur le même axe  
✅ **Professionnalisme** : Look institutionnel GovTech  
✅ **Responsive** : Adaptatif sans perdre la symétrie  
✅ **Maintenabilité** : Composant réutilisable `PublicLayout`  
✅ **Performance** : Grid CSS optimisé  

## Grid Layout du Header

```
┌─────────────────────────────────────────────────────────────┐
│              Centré sur viewport (1400px max)                │
├──────────────┬──────────────────────────┬───────────────────┤
│     Logo     │   Navigation (center)    │   Actions (right) │
│  CiviAgora   │  Home | Consultations..  │  Search | Lang    │
└──────────────┴──────────────────────────┴───────────────────┘
```

## Exemple complet

```tsx
export function ExamplePage() {
  return (
    <div>
      {/* Banner avec centrage automatique */}
      <PageBanner
        title="Titre"
        description="Description"
        gradient="from-blue-600 to-purple-600"
        icon={<Icon />}
      />

      {/* Contenu principal centré */}
      <PublicLayout className="py-8">
        <h1>Mon contenu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cards, etc */}
        </div>
      </PublicLayout>
    </div>
  );
}
```

## Notes techniques

- Le conteneur parent `w-full flex justify-center` assure le centrage  
- Le conteneur enfant `max-w-[1400px]` limite la largeur  
- Le padding `px-6 lg:px-8` crée les marges latérales  
- Grid 3 colonnes dans le header maintient la symétrie  
- Navigation centrée avec `justify-center`  

## Checklist de migration

- [ ] Remplacer `max-w-7xl` par `max-w-[1400px]`
- [ ] Envelopper dans `w-full flex justify-center`
- [ ] Utiliser `PublicLayout` pour les pages
- [ ] Vérifier l'alignement sur différentes tailles d'écran
- [ ] Tester la symétrie visuelle
