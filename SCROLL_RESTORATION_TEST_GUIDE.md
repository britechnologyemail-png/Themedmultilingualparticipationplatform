# 🧪 Guide de test - Conservation du scroll

## ⏱️ Test en 1 minute

Suivez ces étapes pour vérifier que la conservation de scroll fonctionne :

---

## 📍 Test rapide (30 secondes)

### **Étape 1 : Aller sur l'Accueil**
1. Ouvrez l'application
2. Allez sur `/` (page d'Accueil)

### **Étape 2 : Scroller vers le bas**
1. Scrollez jusqu'à voir les cartes de consultations législatives
2. Notez mentalement votre position (ou prenez un repère visuel)

### **Étape 3 : Naviguer vers une page de détail**
1. Cliquez sur une carte de consultation (ex: "Transition Énergétique")
2. Vous êtes redirigé vers la page de détail

### **Étape 4 : Revenir en arrière**
1. Cliquez sur le bouton **"Précédent"** (←) de votre navigateur
2. **Observez la page d'Accueil**

**✅ Résultat attendu :** Vous revenez exactement à la même position où vous étiez avant de cliquer sur la carte.

**❌ Si ça ne fonctionne pas :** Vous revenez en haut de la page (position 0).

---

## 🎯 Tests détaillés

### **Test 1 : Navigation simple (1 min)**

**Objectif :** Vérifier que la position est conservée lors d'un aller-retour simple.

**Étapes :**
1. Aller sur `/` (Accueil)
2. Scroller à environ 50% de la page
3. Cliquer sur "Consultations" dans le Header
4. **Vérifier :** Page `/consultations` s'ouvre en haut
5. Cliquer sur le bouton "Précédent" du navigateur
6. **✅ Vérifier :** Retour à la position ~50% sur l'Accueil

---

### **Test 2 : Navigation avec plusieurs pages (2 min)**

**Objectif :** Vérifier que chaque page conserve sa propre position.

**Étapes :**
1. Aller sur `/` (Accueil), scroller à 30%
2. Aller sur `/consultations`, scroller à 60%
3. Aller sur `/petitions`, scroller à 40%
4. Cliquer 2 fois sur "Précédent"
5. **✅ Vérifier :** Retour à 60% sur `/consultations`
6. Cliquer 1 fois sur "Précédent"
7. **✅ Vérifier :** Retour à 30% sur `/` (Accueil)

---

### **Test 3 : Navigation depuis une carte spécifique (1 min)**

**Objectif :** Vérifier qu'on retrouve exactement la carte qu'on avait cliquée.

**Étapes :**
1. Aller sur `/` (Accueil)
2. Scroller jusqu'à voir la section "Consultations Législatives"
3. Repérer la carte "Transition Énergétique 2026"
4. Cliquer sur cette carte
5. Sur la page de détail, lire quelques informations
6. Cliquer sur "Précédent" du navigateur
7. **✅ Vérifier :** La carte "Transition Énergétique 2026" est visible à l'écran

---

### **Test 4 : Navigation profonde (2 min)**

**Objectif :** Vérifier que la position est conservée même après plusieurs navigations.

**Étapes :**
1. Aller sur `/` (Accueil), scroller à position X
2. Cliquer sur une carte de pétition
3. Cliquer sur un lien dans la page de détail (ex: thème associé)
4. Cliquer sur un autre lien
5. Cliquer 3 fois sur "Précédent" pour revenir à l'Accueil
6. **✅ Vérifier :** Retour à la position X

---

### **Test 5 : Navigation avant vs arrière (1 min)**

**Objectif :** Vérifier que la navigation avant scroll en haut et la navigation arrière restaure.

**Étapes :**
1. Aller sur `/` (Accueil), scroller à position X
2. Cliquer sur "Consultations" dans le Header
3. **✅ Vérifier :** Page `/consultations` s'ouvre en haut (0px)
4. Cliquer sur "Précédent"
5. **✅ Vérifier :** Retour à la position X sur l'Accueil

---

## 📊 Checklist de validation

Cochez mentalement :

- [ ] Le scroll est restauré lors de la navigation arrière
- [ ] Le scroll est en haut lors de la navigation avant
- [ ] Chaque page conserve sa propre position
- [ ] La position est conservée après plusieurs navigations
- [ ] La carte/élément cliqué est visible au retour
- [ ] Pas de saccade ou de flash lors de la restauration
- [ ] Fonctionne sur toutes les pages du frontoffice

**Si tous les points sont cochés → La fonctionnalité fonctionne ! ✅**

---

## 🎬 Scénario de démonstration (30 sec)

**Pour montrer la fonctionnalité à quelqu'un :**

1. Ouvrez l'Accueil
2. Dites : "Je vais scroller jusqu'à cette section"
3. Scrollez jusqu'à voir les consultations législatives
4. Dites : "Je clique sur cette carte"
5. Cliquez sur une carte
6. Dites : "Maintenant je vais revenir en arrière"
7. Cliquez sur le bouton "Précédent" du navigateur
8. Dites : "Regardez, je reviens exactement où j'étais !"
9. Montrez que la même carte est visible

**Effet garanti ! 🎉**

---

## 🐛 Dépannage

### **Problème : La position n'est pas restaurée**

**Solutions :**
1. Actualisez la page (F5) et réessayez
2. Vérifiez que vous utilisez le bouton "Précédent" du navigateur (pas un bouton custom)
3. Vérifiez la console (F12) pour les erreurs JavaScript
4. Vérifiez que le fichier `/src/app/components/ScrollRestoration.tsx` existe
5. Vérifiez que `ScrollRestoration` est importé dans `App.tsx`

### **Problème : La page "saute" lors de la restauration**

**Solutions :**
1. C'est normal si le contenu charge lentement (images, etc.)
2. Le composant utilise `requestAnimationFrame` pour minimiser ce problème
3. Si le problème persiste, attendez que toutes les images soient chargées

### **Problème : La position est perdue après actualisation (F5)**

**C'est normal !** La position n'est pas persistée dans le LocalStorage. Elle est réinitialisée à chaque actualisation de page. C'est le comportement attendu pour une expérience de navigation session.

---

## 📱 Test sur mobile

### **Navigation tactile**

1. Ouvrez l'application sur mobile
2. Scrollez avec votre doigt
3. Tapez sur une carte
4. Utilisez le geste "retour" de votre navigateur mobile
5. **✅ Vérifier :** La position est restaurée

### **Navigation avec boutons**

Si votre navigateur mobile a des boutons de navigation :
1. Suivez les mêmes étapes que sur desktop
2. Utilisez le bouton "Précédent" physique ou virtuel

---

## 🎯 Points à vérifier spécifiquement

### **1. Page d'Accueil**
- [ ] Conservation du scroll dans la section "Modules de participation"
- [ ] Conservation du scroll dans la section "Consultations Législatives"
- [ ] Conservation du scroll dans la section "Actualités"

### **2. Pages de liste**
- [ ] `/consultations` → Clic sur une consultation → Retour
- [ ] `/petitions` → Clic sur une pétition → Retour
- [ ] `/votes` → Clic sur un vote → Retour
- [ ] `/legislative-consultations` → Clic sur une consultation → Retour

### **3. Navigation complexe**
- [ ] Accueil → Thème → Consultation → 2× Retour
- [ ] Accueil → Liste → Détail → Profil → 3× Retour

---

## ⏱️ Temps total des tests

- Test rapide : 30 secondes
- Test 1 : 1 minute
- Test 2 : 2 minutes
- Test 3 : 1 minute
- Test 4 : 2 minutes
- Test 5 : 1 minute

**TOTAL : ~7 minutes pour tester complètement**

---

## 🎉 Conclusion

Si vous avez suivi le test rapide (30 secondes) et que la position est restaurée, **la fonctionnalité fonctionne parfaitement ! ✅**

Pour une validation complète, suivez les 5 tests détaillés (7 minutes).

---

## 📞 Besoin d'aide ?

Consultez :
- Documentation complète : `/SCROLL_RESTORATION_DOCUMENTATION.md`
- Code source : `/src/app/components/ScrollRestoration.tsx`
- Configuration : `/src/app/App.tsx` (ligne 110)

---

**La conservation de scroll est prête pour la production ! 🚀**

*Guide de test - Version 1.0*  
*Temps estimé : 30 secondes (rapide) à 7 minutes (complet)*
