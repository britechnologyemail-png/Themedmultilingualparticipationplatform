# CiviAgora - Back-Office Administration Panel

## 📋 Vue d'ensemble

Application back-office institutionnelle professionnelle pour la gestion de la plateforme de démocratie participative CiviAgora.

## 🎯 Utilisateurs cibles

- **Administrateur système** : Accès complet à toutes les fonctionnalités
- **Gestionnaire institutionnel** : Gestion des processus et contenus
- **Modérateur** : Modération des contributions citoyennes
- **Observateur / Auditeur** : Accès en lecture seule aux statistiques et rapports

## 🏗️ Architecture

### Structure des fichiers

```
/src/app/admin/
├── components/
│   ├── AdminLayout.tsx         # Layout principal avec sidebar
│   └── StatCard.tsx           # Composant réutilisable pour KPIs
├── pages/
│   ├── AdminDashboard.tsx     # Tableau de bord principal
│   ├── UsersManagement.tsx    # Gestion utilisateurs & rôles
│   ├── ProcessesManagement.tsx # Gestion processus participatifs
│   └── ModerationPage.tsx     # Modération des contenus
```

## 🎨 Design System

### Principes de conception

- **Clean & Institutionnel** : Design sobre et professionnel
- **Lisibilité maximale** : Hiérarchie claire, typographie lisible
- **Navigation verticale** : Sidebar fixe à gauche
- **Responsive** : Adapté desktop-first avec support mobile
- **Accessibilité** : Contraste élevé, labels clairs

### Palette de couleurs

- **Primaire** : Bleu institutionnel (#3b82f6)
- **Secondaire** : Violet (#8b5cf6)
- **Succès** : Vert (#10b981)
- **Attention** : Orange (#f59e0b)
- **Danger** : Rouge (#ef4444)
- **Neutre** : Gris (#6b7280)

## 📱 Écrans implémentés

### 1. Tableau de bord institutionnel
**Route** : `/admin`

**Fonctionnalités** :
- 4 KPI cards (Processus actifs, Participants, Contributions, Taux d'engagement)
- Graphique d'évolution de la participation
- Distribution par thème (pie chart)
- État des processus (bar chart)
- Activité récente
- Modérations en attente
- Alertes et notifications

### 2. Gestion des utilisateurs & rôles
**Route** : `/admin/users`

**Fonctionnalités** :
- Liste complète des utilisateurs avec filtres
- Statistiques (Total, Admins, Modérateurs, Actifs)
- Recherche et filtres (rôle, statut)
- Matrice des permissions par rôle
- Actions : Modifier, Gérer permissions, Supprimer

**Rôles disponibles** :
- Administrateur (accès complet)
- Gestionnaire (gestion processus & contenus)
- Modérateur (modération uniquement)
- Observateur (lecture seule)
- Utilisateur (citoyen standard)

### 3. Gestion des processus participatifs
**Route** : `/admin/processes`

**Fonctionnalités** :
- Création de nouveaux processus
- Liste avec filtres (statut, recherche)
- Statistiques (Actifs, Brouillons, Terminés, Participants)
- Gestion des phases et calendrier
- Association multi-thèmes
- Actions : Voir détails, Modifier, Gérer phases, Supprimer

**Statuts** :
- Brouillon (draft)
- Actif (active)
- Terminé (closed)
- À venir (upcoming)

**Phases** :
- Préparation
- Consultation
- Propositions
- Vote
- Résultats

### 4. Modération des contenus
**Route** : `/admin/moderation`

**Fonctionnalités** :
- Vue en 2 colonnes (liste + aperçu)
- Filtrage par statut (En attente, Approuvées, Rejetées)
- Statistiques de modération
- Système de priorité (Urgent, Moyen, Faible)
- Actions : Approuver, Rejeter avec commentaire
- Historique des modérations

## 🛠️ Composants réutilisables

### StatCard
Carte KPI réutilisable avec :
- Titre
- Valeur principale
- Description
- Icône
- Tendance (optionnelle)

**Usage** :
```tsx
<StatCard
  title="Processus actifs"
  value="12"
  description="3 en phase de consultation"
  icon={Activity}
  trend={{ value: 8.2, isPositive: true }}
  iconColor="text-blue-600"
  iconBgColor="bg-blue-100"
/>
```

### AdminLayout
Layout principal avec :
- Header fixe avec logo et menu utilisateur
- Sidebar verticale avec navigation
- Gestion des permissions par rôle
- Support mobile avec sidebar collapsible

## 🔐 Gestion des permissions

### Matrice d'accès

| Permission | Admin | Manager | Moderator | Observer |
|-----------|-------|---------|-----------|----------|
| Gérer les utilisateurs | ✅ | ✅ | ❌ | ❌ |
| Créer des processus | ✅ | ✅ | ❌ | ❌ |
| Modérer les contenus | ✅ | ✅ | ✅ | ❌ |
| Voir les statistiques | ✅ | ✅ | ✅ | ✅ |
| Exporter les données | ✅ | ✅ | ❌ | ✅ |
| Gérer les thèmes | ✅ | ✅ | ❌ | ❌ |
| Publier les résultats | ✅ | ✅ | ❌ | ❌ |
| Configuration système | ✅ | ❌ | ❌ | ❌ |

## 📊 Graphiques et visualisations

Utilisation de **Recharts** pour :
- Line charts (évolution temporelle)
- Pie charts (distributions)
- Bar charts (comparaisons)

## 🚀 Prochaines étapes

### Écrans à implémenter

5. **Gestion des thèmes**
   - Vue hiérarchique (arbre)
   - Drag & drop pour réorganiser
   - Toggle visibilité publique

6. **Calendrier & Phases**
   - Timeline visuelle
   - Configuration des phases
   - Gestion des échéances

7. **Indicateurs & Statistiques**
   - Dashboards dynamiques
   - Filtres avancés
   - Export de rapports

8. **Publication des résultats**
   - Workflow de validation
   - Gestion des versions
   - Publication officielle

9. **Exports & Rapports**
   - Export CSV/Excel/PDF
   - Rapports personnalisés
   - Filtres avancés

10. **Services & Paramètres**
    - Gestion des notifications
    - Logs d'audit
    - Archivage
    - Configuration API

## 💡 Bonnes pratiques

### Code
- Composants réutilisables
- TypeScript pour la sûreté de typage
- Hooks React pour la gestion d'état
- Context API pour les données globales

### UI/UX
- Design system cohérent
- Feedback utilisateur immédiat
- Loading states
- Error handling
- Confirmation des actions destructives

### Accessibilité
- Contraste WCAG AA minimum
- Navigation au clavier
- Labels ARIA appropriés
- Focus visible

## 🔗 Routes disponibles

- `/admin` - Dashboard principal
- `/admin/users` - Gestion utilisateurs
- `/admin/processes` - Gestion processus
- `/admin/moderation` - Modération contenus

## 📝 Notes techniques

- **Framework** : React + TypeScript
- **Routing** : React Router v7
- **UI Components** : Radix UI + Tailwind CSS
- **Charts** : Recharts
- **Icons** : Lucide React
- **State Management** : React Hooks + Context API

## 🎓 Utilisation

### Accès au back-office
Naviguer vers `/admin` pour accéder au panneau d'administration.

### Navigation
- Sidebar gauche pour naviguer entre les sections
- Breadcrumbs pour situer l'utilisateur
- Menu utilisateur en haut à droite pour déconnexion

### Filtres et recherche
- Tous les tableaux incluent des options de recherche
- Filtres multiples disponibles (statut, rôle, date, etc.)
- Résultats en temps réel

---

**Version** : 1.0.0  
**Dernière mise à jour** : 6 janvier 2026  
**Auteur** : CiviAgora Team
