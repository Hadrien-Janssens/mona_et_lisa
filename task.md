# Tâches en cours : Étape 5 - Système de Réservation & Tunnel d'Achat

## Objectif du jour
Implémenter le tunnel de réservation et la redirection vers Stripe pour le paiement, en recueillant les informations de l'acheteur sans forcer la création de compte au préalable.

## Étapes techniques
- [x] Mettre en place une page ou un composant de formulaire de réservation recueillant les coordonnées (Prénom, Nom, Email, Téléphone, Date de naissance, et le nombre de places).
- [x] Mettre en place la validation des données du formulaire (Form Request Laravel) pour s'assurer des informations.
- [x] Créer le contrôleur Laravel (`CheckoutController` ou équivalent) pour initier une session Stripe Checkout avec les détails de l'atelier (`price`, `duration`) et les données de l'utilisateur.
- [x] Configurer la redirection de l'utilisateur vers l'URL sécurisée Stripe pour le paiement.
