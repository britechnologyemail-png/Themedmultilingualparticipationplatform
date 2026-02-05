# ⚡ TEST RAPIDE - Correction du Scroll FrontOffice

## 🎯 Tests en 2 minutes

### ✅ **Test 1 : Navigation arrive EN HAUT (30 secondes)**

**Objectif :** Vérifier qu'on arrive toujours en haut d'une nouvelle page

**Étapes :**
1. Ouvrez `/` (Accueil)
2. Scrollez jusqu'au milieu de la page
3. Cliquez sur n'importe quel lien (ex: "Consultations" dans le Header)
4. **Observez la nouvelle page**

**✅ RÉSULTAT ATTENDU :** Vous voyez le HAUT de la page "Consultations" (titre, bannière)

**❌ SI BUGUÉ :** Vous voyez le BAS de la page (footer)

---

### ✅ **Test 2 : Bouton Précédent RESTAURE la position (30 secondes)**

**Objectif :** Vérifier qu'on revient à la bonne position avec le bouton Précédent

**Étapes :**
1. Ouvrez `/` (Accueil)
2. Scrollez jusqu'à voir les cartes "Consultations Législatives" (environ 70% de la page)
3. Mémorisez visuellement une carte (ex: "Transition Énergétique")
4. Cliquez sur cette carte
5. Vous êtes sur la page de détail
6. Cliquez sur le bouton **"Précédent" (←)** de votre navigateur
7. **Observez la page Accueil**

**✅ RÉSULTAT ATTENDU :** Vous voyez à nouveau la carte "Transition Énergétique" (même position qu'avant)

**❌ SI BUGUÉ :** Vous voyez le haut de la page Accueil

---

### ✅ **Test 3 : Navigation profonde (1 minute)**

**Objectif :** Vérifier que les multiples retours fonctionnent

**Étapes :**
1. Accueil → Scrollez à 30% → Cliquez "Consultations" (Header)
2. **Vérifiez :** Arrive en haut de /consultations ✅
3. Consultations → Scrollez à 70% → Cliquez sur une consultation
4. **Vérifiez :** Arrive en haut de la page de détail ✅
5. Cliquez 1× "Précédent"
6. **Vérifiez :** Retour à 70% sur /consultations ✅
7. Cliquez 1× "Précédent"
8. **Vérifiez :** Retour à 30% sur / (Accueil) ✅

---

## 📊 Checklist de validation

Cochez mentalement :

- [ ] Navigation vers nouvelle page → En haut ✅
- [ ] Bouton "Précédent" → Restaure position ✅
- [ ] Navigation profonde → Conserve positions ✅
- [ ] Pas de saut/flash visuel
- [ ] Fonctionne sur mobile
- [ ] Fonctionne sur desktop

**Si tout est coché → Les problèmes sont RÉSOLUS ! ✅**

---

## 🐛 Dépannage rapide

### **Problème : Arrive toujours au footer**

**Solutions :**
1. Actualisez la page (F5)
2. Vérifiez que le fichier `/src/app/components/ScrollRestoration.tsx` a été mis à jour
3. Videz le cache du navigateur (Ctrl+Shift+R)
4. Vérifiez la console (F12) pour les erreurs

### **Problème : Retour en haut au lieu de restaurer**

**Solutions :**
1. Vérifiez que vous utilisez bien le bouton "Précédent" du navigateur (pas un bouton custom)
2. Actualisez la page et réessayez
3. Testez dans un autre navigateur

### **Problème : La page "saute"**

**C'est normal si :**
- Le contenu charge lentement (images, etc.)
- Le composant utilise plusieurs RAF pour minimiser ce problème
- Attendez que toutes les images soient chargées

---

## 🎬 Démonstration rapide (30 sec)

**Pour montrer à quelqu'un que ça fonctionne :**

1. Ouvrez l'Accueil
2. Dites : "Je scrolle jusqu'ici" (section Consultations)
3. Dites : "Je clique sur cette carte"
4. Cliquez sur une carte
5. Dites : "Regardez, j'arrive en HAUT de la page" ✅
6. Dites : "Maintenant je reviens en arrière"
7. Cliquez sur "Précédent"
8. Dites : "Et je reviens exactement où j'étais !" ✅

---

## 📱 Test sur mobile

1. Ouvrez l'application sur mobile
2. Scrollez avec votre doigt
3. Tapez sur une carte
4. **Vérifiez :** Arrive en haut ✅
5. Utilisez le geste/bouton "retour"
6. **Vérifiez :** Restaure position ✅

---

## ⏱️ Temps total

- Test 1 : 30 secondes
- Test 2 : 30 secondes
- Test 3 : 1 minute

**TOTAL : 2 minutes pour valider complètement**

---

## ✅ Conclusion

Si vous avez suivi les Tests 1 et 2 (1 minute) et que :
- Navigation vers nouvelle page → En haut ✅
- Bouton Précédent → Restaure position ✅

**Alors les problèmes sont RÉSOLUS ! 🎉**

Pour une validation complète, suivez le Test 3 (1 minute supplémentaire).

---

## 📚 Documentation complète

Pour plus de détails, consultez :
- **[SCROLL_RESTORATION_FIX.md](./SCROLL_RESTORATION_FIX.md)** → Explication complète des corrections
- **[SCROLL_RESTORATION_DOCUMENTATION.md](./SCROLL_RESTORATION_DOCUMENTATION.md)** → Documentation technique originale

---

**Les corrections du scroll sont prêtes ! Testez maintenant ! 🚀**

*Guide de test rapide - Version 2.0*  
*Tests : 2 minutes (complet)*
