# Guide Utilisateur: Consultations Législatives

## Vue d'ensemble

Le module **Consultations Législatives** permet aux citoyens de participer activement à l'élaboration des textes législatifs en:
- 📖 Lisant les projets de loi article par article
- 💬 Annotant et commentant chaque article
- 👍👎 Votant sur les commentaires de la communauté
- 🤖 Consultant une synthèse IA de la participation

## Accéder aux Consultations Législatives

### Depuis le Dashboard
1. Scrollez jusqu'à la section "Consultations Législatives"
2. Cliquez sur une consultation mise en avant, ou
3. Cliquez sur "Voir toutes" pour accéder à la liste complète

### Depuis le menu de navigation
*(À implémenter: ajouter le lien dans le Header si souhaité)*

## Page de Liste

### Filtrer les Consultations

La page de liste offre 3 filtres:

**1. Statut**
- Tous
- Ouvertes (participation active)
- À venir
- Fermées

**2. Type de texte**
- Tous
- Projet de loi
- Règlement
- Décret
- Ordonnance
- Amendement

**3. Thème**
- Tous
- Environnement & climat
- Urbanisme & logement
- Mobilité & transport
- etc.

### Informations affichées par carte

- **Type de texte** (badge)
- **Titre** de la consultation
- **Statut** (open, upcoming, closed)
- **Nombre d'articles**
- **Nombre d'annotations**
- **Nombre de participants**
- **Plage de dates**

## Page de Détail

### Header

Le header affiche:
- **Type de texte** (Projet de loi, Règlement, etc.)
- **Numéro de référence** (si disponible)
- **Titre** et **description** de la consultation
- **Dates** de début et fin
- **Statistiques globales**: articles, annotations, participants
- **Thème** associé

### Onglet "Articles" - Lecture et Annotation

#### 1. Table des matières (sidebar gauche)

- Liste de tous les articles du texte
- Numéro d'article + titre (si présent)
- Badge indiquant le nombre d'annotations par article
- Article sélectionné en surbrillance
- **Cliquez sur un article** pour le lire et l'annoter

#### 2. Contenu de l'article (zone principale)

**Lecture:**
- Numéro et titre de l'article
- Texte complet de l'article
- Nombre total d'annotations

**Ajouter une annotation** (si consultation ouverte):
1. Saisissez votre commentaire dans la zone de texte
2. Cliquez sur "Publier"
3. Votre annotation apparaît dans la liste

**Liste des annotations:**
- Avatar et nom de l'auteur
- Date de publication
- Contenu de l'annotation
- Badge "Mise en avant" pour les annotations importantes
- **Boutons de vote:**
  - 👍 Upvote si vous êtes d'accord
  - 👎 Downvote si vous n'êtes pas d'accord
- Score total (upvotes - downvotes)
- Réponses aux annotations (affichées en retrait)

### Onglet "Synthèse IA"

La synthèse générée par IA fournit:

**1. Vue d'ensemble**
- Résumé général de la consultation et de la participation

**2. Aperçu de la participation**
- **Tendance de sentiment** (positive, négative, neutre, mixte)
- **Thèmes récurrents** dans les commentaires
- **Articles les plus discutés**

**3. Articles clés**
Pour chaque article important:
- **Numéro** de l'article
- **Résumé** de son contenu
- **Niveau de controverse** (faible, moyen, élevé)
- **Principales préoccupations** exprimées par les citoyens

**4. Recommandations**
- Liste de recommandations basées sur l'analyse de la participation

## Bonnes Pratiques

### Pour annoter efficacement

✅ **Soyez constructif**
- Proposez des améliorations ou des alternatives
- Expliquez votre point de vue

✅ **Soyez précis**
- Référencez des passages spécifiques si possible
- Utilisez des exemples concrets

✅ **Restez respectueux**
- Concentrez-vous sur le contenu, pas sur les personnes
- Acceptez les désaccords

❌ **À éviter**
- Commentaires hors-sujet
- Attaques personnelles
- Spam ou répétitions

### Pour voter sur les annotations

👍 **Upvote** si:
- L'annotation apporte une perspective intéressante
- Vous êtes d'accord avec le point soulevé
- L'annotation est constructive

👎 **Downvote** si:
- L'annotation est hors-sujet
- L'annotation contient des informations fausses
- L'annotation ne contribue pas au débat

**Note:** Les votes aident à faire remonter les meilleures contributions!

## États de la Consultation

### 🟢 Ouverte
- Vous pouvez lire, annoter et voter
- Les annotations sont publiées immédiatement
- Le compteur de temps restant est affiché

### 🟡 À venir
- Vous pouvez voir le contenu
- Les annotations ne sont pas encore possibles
- Date de début affichée

### 🔴 Fermée
- Vous pouvez lire le contenu et les annotations
- Vous ne pouvez plus ajouter d'annotations
- Les votes restent possibles (selon configuration)
- La synthèse IA est disponible

## Statistiques et Badges

### Badges spéciaux sur les annotations

**⭐ Mise en avant**
- Annotation jugée particulièrement pertinente
- Sélectionnée par les modérateurs ou l'algorithme
- Affichée en priorité

### Scores

Le **score** d'une annotation = upvotes - downvotes
- Score positif: annotation bien reçue
- Score négatif: annotation controversée
- Les annotations sont triées par score (à implémenter)

## FAQ

### Puis-je modifier mon annotation après l'avoir publiée?
Actuellement non. Réfléchissez bien avant de publier!
*(Fonctionnalité à implémenter)*

### Puis-je répondre à une annotation?
Pas directement dans cette version. Créez une nouvelle annotation pour répondre.
*(Fonctionnalité de réponses à implémenter)*

### Combien de temps ai-je pour participer?
Les dates de début et fin sont affichées en haut de chaque consultation. Un badge "X jours restants" indique l'urgence.

### Mes annotations sont-elles anonymes?
Non, votre nom est affiché avec vos annotations. Cela favorise un débat responsable.

### Que se passe-t-il après la clôture?
Une synthèse IA est générée et les décideurs consultent toutes les contributions pour améliorer le texte.

### Comment fonctionne la synthèse IA?
L'IA analyse toutes les annotations pour identifier:
- Les thèmes récurrents
- Les articles les plus controversés
- Les principales préoccupations
- Des recommandations d'amélioration

## Support

Pour toute question ou problème:
- 📧 Email: support@civiagora.example
- 💬 Chat en direct (assistant IA disponible)
- 📚 Consultez les guides pratiques

---

**Ensemble, faisons avancer la démocratie participative!** 🌍
