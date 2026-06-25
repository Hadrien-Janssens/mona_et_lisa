# Plan d'implémentation : Étape 6 - Webhook Stripe, Emails & Finalisation de la Commande

## 1. Emails de Confirmation & Remboursement
- [ ] Créer un mailable `BookingConfirmed` pour la confirmation de réservation avec les détails de l'atelier et un lien vers l'espace client.
- [ ] Créer un mailable `BookingOverbooked` en cas de paiement réussi mais atelier plein (pour informer du remboursement).
- [ ] Déclencher `BookingConfirmed` dans `StripeWebhookController` lors du succès de `checkout.session.completed` (cas normal).
- [ ] Déclencher `BookingOverbooked` dans `StripeWebhookController` en cas de surbooking.

## 2. Page de Succès & Activation de Compte
- [ ] Mettre à jour `CheckoutController@success` pour vérifier si l'utilisateur lié à la session Stripe a un mot de passe (`password === null`).
- [ ] Si le mot de passe est `null`, afficher un formulaire sur `checkout-success.tsx` invitant à créer un mot de passe ("Activer mon compte").
- [ ] Créer une route et une méthode `CheckoutController@activateAccount` pour valider et enregistrer le mot de passe de l'utilisateur.
- [ ] Connecter automatiquement l'utilisateur après l'activation de son compte.

## 3. Espace "Mes Réservations" (Dashboard)
- [ ] Créer un contrôleur `UserBookingController` ou utiliser un composant existant pour l'espace "Mes Réservations".
- [ ] Récupérer les réservations de l'utilisateur connecté avec les informations de la `WorkshopSession` et `Workshop` associés.
- [ ] Créer la page React `dashboard.tsx` (ou `bookings/index.tsx`) pour lister les réservations actives et passées.
- [ ] Ajouter un bouton "Annuler ma réservation" sur les réservations futures (si > 48h avant le début) qui appelle la route `bookings.cancel` déjà créée.

## 4. Finitions & Tests
- [ ] Tester le parcours d'activation de compte.
- [ ] Vérifier que les emails s'envoient correctement via Mailpit/Log.
- [ ] Vérifier l'affichage de l'espace "Mes Réservations" et le fonctionnement du bouton d'annulation (si testable avec clé Stripe).
