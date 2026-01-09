# CiviAgora - SaaS Back-Office Documentation

## Vue d'ensemble

Le module **SaaS Back-Office** est une interface d'administration centralisée pour gérer l'ensemble de la plateforme CiviAgora. Il permet aux super-administrateurs de gérer plusieurs organisations, leurs utilisateurs, et tous les modules participatifs de manière unifiée.

## Architecture

### Structure des fichiers

```
/src/app/saas/
├── components/
│   ├── SaasLayout.tsx          # Layout principal avec navigation
│   └── OrganizationWizard.tsx  # Wizard de création d'organisation (6 étapes)
└── pages/
    ├── SaasDashboard.tsx       # Tableau de bord principal
    ├── OrganizationsPage.tsx   # Gestion des organisations
    ├── UsersPage.tsx           # Gestion des utilisateurs et rôles
    ├── ModulesPage.tsx         # Modules participatifs
    ├── StatisticsPage.tsx      # Statistiques et rapports
    └── AuditPage.tsx           # Audit et notifications
```

## Pages principales

### 1. Dashboard (`/saas`)

**Fonctionnalités:**
- Widgets de statistiques clés (organisations actives, utilisateurs, processus, débats, votes)
- Graphiques de participation par module (Bar Chart)
- Graphique d'évolution mensuelle (Line Chart)
- Distribution des modules (Pie Chart)
- Activités récentes en temps réel
- Alertes système

**Technologies:**
- Recharts pour les graphiques
- Motion pour les animations
- Cards avec gradients institutionnels

### 2. Organizations (`/saas/organizations`)

**Fonctionnalités:**
- Liste des organisations avec recherche et filtres
- Statistiques: Total, Actives, En attente, Nombre d'utilisateurs
- Actions: View, Edit, Deactivate
- Wizard de création d'organisation en 6 étapes

**Wizard d'onboarding (6 étapes):**

#### Étape 1 : Informations générales
- Nom de l'organisation
- Slug (auto-généré depuis le nom)
- Description
- Upload du logo

#### Étape 2 : Paramètres
- Langue par défaut (FR/DE/EN)
- Fuseau horaire
- Personnalisation visuelle (couleurs primaire/secondaire)

#### Étape 3 : Utilisateur administrateur
- Prénom / Nom
- Email
- Rôle (Admin / Manager)
- Email de bienvenue automatique

#### Étape 4 : Activation des modules
- Votes & Référendums
- Débats & Consultations
- Initiatives & Pétitions
- Assemblées citoyennes
- Conférences & Événements

#### Étape 5 : Sécurité
- MFA requis (on/off)
- Longueur minimale du mot de passe
- Restrictions IP (on/off)
- Délai d'expiration de session

#### Étape 6 : Récapitulatif
- Affichage de toutes les informations configurées
- Validation finale avant création

### 3. Users & Roles (`/saas/users`)

**Onglet Utilisateurs:**
- Liste des utilisateurs avec recherche
- Informations: Nom, Email, Rôle, Organisation, Statut
- Actions: Edit, Email, Reset Password, Delete
- Export des données

**Onglet Rôles & Permissions:**
- Cartes des rôles avec permissions
- 5 rôles prédéfinis:
  - **Super Admin**: Accès complet à toutes les organisations
  - **Admin**: Gestion complète de l'organisation
  - **Manager**: Gestion des processus et modération
  - **Moderator**: Modération du contenu
  - **Observer**: Accès en lecture seule
- Actions: Edit Permissions, Add Role, Delete Role

### 4. Modules Participatifs (`/saas/modules`)

**Modules disponibles:**
- Votes & Référendums
- Débats & Consultations
- Initiatives & Pétitions
- Assemblées citoyennes
- Conférences & Événements

**Fonctionnalités:**
- Statistiques par module
- Tabs pour filtrer par type de module
- Vue d'ensemble de tous les modules actifs

### 5. Statistics & Reports (`/saas/statistics`)

**Graphiques:**
- Participation mensuelle (Bar Chart)
- Croissance utilisateurs (Line Chart)
- Export PDF des rapports

**Filtres:**
- Par module
- Par date
- Par statut

### 6. Audit & Notifications (`/saas/audit`)

**Onglet Audit Logs:**
- Historique complet des actions
- Colonnes: Utilisateur, Action, Entité, Organisation, Date
- Types d'actions: Create, Update, Publish, Moderate, Delete
- Recherche et filtres avancés
- Export des logs

**Onglet Notifications:**
- Gestion des templates de notifications
- Types: Email, SMS
- Statut: Active / Inactive
- Actions: Edit Template, Test, Activate/Deactivate

## Design System

### Couleurs institutionnelles

Le SaaS Back-Office utilise une palette de gradients GovTech:

- **Bleu-Violet**: `from-blue-600 via-purple-600 to-emerald-500`
- **Primaire**: Bleu (`#3b82f6`)
- **Secondaire**: Violet (`#8b5cf6`)
- **Accent**: Émeraude (`#10b981`)

### Composants réutilisables

- **KPICard**: Cards de statistiques avec gradients
- **StatCard**: Cartes de métriques simplifiées
- **Badge**: Indicateurs de statut avec couleurs contextuelles
- **Table**: Tables responsives avec actions au hover
- **Dialog**: Modales pour les formulaires et wizards

## Navigation

### Menu principal (Sidebar)

1. **Dashboard** - Vue d'ensemble
2. **Organizations** - Gestion des organisations
3. **Users & Roles** - Gestion des utilisateurs
4. **Participatory Modules** - Modules participatifs
5. **Statistics & Reports** - Analyses et rapports
6. **Audit & Notifications** - Logs et notifications

### Header

- Logo CiviAgora SaaS avec gradient animé
- Notifications avec badge
- Menu utilisateur:
  - Paramètres
  - Retour au site
  - Déconnexion

## Multilingue

Support complet de 3 langues:
- **Français** (FR)
- **Deutsch** (DE)
- **English** (EN)

Toutes les interfaces, labels, messages et contenus sont traduits.

## Responsive Design

- **Desktop-first**: Optimisé pour les écrans larges
- **Sidebar collapsible**: Navigation adaptative
- **Mobile overlay**: Menu mobile avec fond semi-transparent
- **Breakpoints**: Grilles adaptatives (md, lg)

## Sécurité

### Contrôle d'accès
- Authentification requise
- Gestion des rôles et permissions
- Logs d'audit complets

### Paramètres de sécurité
- MFA (Multi-Factor Authentication)
- Politique de mots de passe configurable
- Restrictions IP
- Session timeout

## Intégration Backend

Toutes les fonctionnalités incluent des handlers `TODO` prêts pour la connexion backend:

```typescript
// Exemple de handler
const handleSubmit = () => {
  // TODO: Submit form data to backend
  console.log('Organization data:', formData);
  onComplete();
};
```

## État actuel

✅ **Implémenté:**
- Layout SaaS avec navigation verticale
- Dashboard avec widgets et graphiques
- Page Organizations avec liste et wizard complet
- Page Users avec gestion des rôles
- Page Modules simplifiée
- Page Statistics avec graphiques
- Page Audit avec logs et notifications
- Support multilingue complet
- Design institutionnel cohérent
- Animations Motion

🔄 **À implémenter:**
- Connexion au backend
- Authentification et autorisation
- Upload de fichiers (logos)
- Filtres avancés
- Pagination des tables
- Export réel des données (CSV, Excel, PDF)
- Système de notifications en temps réel
- Tests unitaires

## Routes

```
/saas                      → Dashboard
/saas/organizations        → Organizations List + Wizard
/saas/users               → Users & Roles Management
/saas/modules             → Participatory Modules
/saas/statistics          → Statistics & Reports
/saas/audit               → Audit Logs & Notifications
```

## Accès

Depuis le front-office, lien dans le footer:
- **"Back-office SaaS"** avec icône Settings bleue

Ou directement via l'URL: `https://civiagora.com/saas`

## Technologies utilisées

- **React** 18.3.1
- **React Router** v7
- **Motion** (Framer Motion) pour animations
- **Recharts** pour graphiques
- **Radix UI** pour composants accessibles
- **Tailwind CSS** v4 pour styling
- **Lucide React** pour icônes
- **TypeScript** pour typage

## Notes de développement

Le module SaaS est totalement indépendant du back-office standard (`/admin`). Il est conçu pour:

1. **Super Admins**: Gestion multi-organisations
2. **SaaS Platform**: Administration centralisée
3. **Scalabilité**: Support de centaines d'organisations
4. **Monitoring**: Statistiques et audit globaux

Le back-office standard (`/admin`) reste dédié à la gestion d'une seule organisation par les administrateurs locaux.
