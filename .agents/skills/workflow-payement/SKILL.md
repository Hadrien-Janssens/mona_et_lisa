---
name: workflow-payement
description: Use this skill when implementing or reviewing the Stripe payment and reservation workflow. It contains the architecture and specifications to handle race conditions, database locks, Stripe checkout sessions, webhooks, and cancellations. Trigger when working on bookings, payments, or Stripe webhooks.
---

# Spécification Technique : Module de Réservation d'Ateliers & Paiement Stripe (Anti-Race Conditions)

## Rôle attendu pour l'IA
Agis en tant qu'Expert en Architecture logicielle et Lead Developer. Génère un code propre, modulaire, sécurisé et documenté selon les spécifications strictes ci-dessous, en te basant sur le modèle de données existant.

## 1. Modèle de Données & Base de Données

Le système s'appuie sur la structure existante avec des ajustements pour la sécurité transactionnelle.

### A. Table `workshop_sessions` (L'entité à verrouiller)
Gère le stock et les dates.
- L'entité à verrouiller pessimistement (`FOR UPDATE`).
- Possède la méthode `hasPlacesLeft(int $seats)` pour la vérification du stock.
- Possède la méthode modifiée `getBookedSeatsCountAttribute()` pour compter le stock réel.

### B. Table `bookings` (Mise à jour)
Doit inclure les nouveaux champs pour le système temporaire :
- `expires_at` (Datetime, Nullable) : Timestamp d'expiration du verrou temporaire.
- `stripe_payment_intent_id` (String, Nullable) : Pour faciliter les remboursements ultérieurs.
- `payment_status` : Utilise les valeurs `pending`, `paid`, `failed_overbooked`, `cancelled`.

---

## 2. Logique Modèle : `WorkshopSession`

La méthode `getBookedSeatsCountAttribute()` doit être mise à jour pour refléter le vrai stock :
Places `paid` + Places `pending` dont `expires_at > NOW()`.
La somme doit se faire sur la colonne `seats`.

---

## 3. Étape 1 : Intention de Réservation (Le Contrôleur Principal)

Lorsqu'un utilisateur (connecté) clique sur "Réserver" :
1. **Transaction & Verrou Pessimiste :** Ouvrir une transaction DB. Appliquer `Lock for Update` sur la `WorkshopSession` concernée.
2. **Vérification :** Utiliser `$session->hasPlacesLeft($request->seats)`. Si false, lever exception/erreur 422.
3. **Verrou Temporaire :** Créer une entrée `bookings` (`user_id`, `workshop_session_id`, `seats`, `total_price`...) avec `payment_status = 'pending'` et `expires_at = NOW() + 30 minutes`.
4. **Session Stripe Checkout :**
    - `expires_at` aligné (30 minutes en timestamp UNIX).
    - `metadata` contenant `booking_id`.
5. **Enregistrement :** Sauvegarder `stripe_session_id` sur la réservation, `COMMIT` la transaction, et rediriger.

---

## 4. Étape 2 : Le Webhook Stripe (Validation Finale)

### A. Événement `checkout.session.completed`
1. Extraire `booking_id` depuis les `metadata`.
2. Extraire `payment_intent` depuis l'objet session de Stripe.
3. Transaction DB + `Lock for Update` sur la `WorkshopSession`.
4. **Gestion du Edge Case (Webhook en retard) :**
    - **Si `! $session->hasPlacesLeft($booking->seats)` (Surbooking) :**
        - Mettre à jour `payment_status` à `failed_overbooked`, enregistrer `stripe_payment_intent_id`.
        - Rembourser via l'API Stripe en utilisant le `payment_intent`.
        - Envoyer email d'excuse & remboursement.
    - **Si ok (Cas normal) :**
        - Passer `payment_status` à `paid`.
        - Vider `expires_at` (ou ignorer).
        - Enregistrer `stripe_payment_intent_id`.
        - Envoyer email de confirmation.
5. `COMMIT` et HTTP 200.

### B. Événement `checkout.session.expired`
1. Extraire `booking_id`.
2. Passer `payment_status` à `cancelled` pour libérer la place. HTTP 200.

---

## 5. Étape 3 : Annulation par le Client & Remboursement

Route : POST `/bookings/{id}/cancel` (auth).
1. **Contrôle d'accès :** L'utilisateur possède bien la réservation.
2. **Statut :** La réservation est `paid`.
3. **Délai :** La date actuelle est au minimum 48 heures avant `$session->start_at`. Sinon erreur 403/422.
4. **Action (Transaction) :**
    - Remboursement Stripe via le `stripe_payment_intent_id`.
    - Passer `payment_status` à `cancelled`.
    - Email de confirmation d'annulation.
