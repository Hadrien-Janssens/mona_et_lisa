# Tâche : Développement du module de gestion de contenu (CMS)

## Objectif

Créer l'interface d'administration ergonomique permettant de modifier le contenu du site (textes et images) pour les différentes sections fixes. L'interface utilisera la stratégie des **"Onglets verticaux"** pour une navigation instantanée côté client via React et Inertia.js. Le backend Laravel doit sauvegarder ces données de manière persistante et gérer les uploads.
attention, l'interface d'admnistration est deja partiellement crée, il faut uniqueent créer la partie "content" dans /js/pages/admin/content. popur bien coder, pense diviser en plusieurs composant plus petits, et si il y a des gros bloc, divise dans un dossier /partials.

## 1. Backend (Laravel)

### Base de données & Stockage

- Mettre en place un système de stockage pour les contenus.
    - _Option recommandée_ : Une table `settings` (clé/valeur) ou un modèle unique `SiteContent` avec des colonnes JSON par section (ex: `header_content`, `about_content`).
    - Les champs dynamiques (liste des horaires, liste des numéros de téléphone) doivent être stockés sous forme de tableaux JSON.
- Gérer l'upload et le stockage des images sur le disque `public` (ex: `storage/app/public/content`).
- Mettre en place la suppression des anciennes images (nettoyage) lorsqu'elles sont remplacées.

### Contrôleur et Routes

- Créer un `ContentController`.
- **GET** (ex: `/admin/content`) : Renvoyer l'ensemble du contenu du site groupé par section pour hydrater le composant React.
- **POST/PUT** (ex: `/admin/content`) : Valider et sauvegarder les textes et les images (utiliser une FormRequest appropriée).

## 2. Frontend (React + Inertia.js + Tailwind CSS)

### Interface Générale

- Créer la vue principale : `resources/js/Pages/Admin/Content/Index.tsx` (ou `.jsx`).
- Mettre en place le Layout avec **Onglets Verticaux** à gauche :
    - _En-tête, À propos, Atelier, Horaires, Contact, Footer_.
- Le changement de section doit se faire uniquement via l'état local React (sans rechargement de page Inertia).
- Intégrer un système de sauvegarde global (ou par onglet) avec retour visuel (bouton de chargement, notification/toast de succès).
- utiliser les composants déja fait si il y en a et les composant shadcn

### Sémantique des Sections & Champs

#### A. En-tête (Header)

- Titre principal
- Sous-titre (Textarea)
- Boutons : Label du bouton 1, Label du bouton 2
- Visuels : 3 emplacements de photos (drag & drop ou upload classique avec aperçu).

#### B. À propos (About)

- Titre
- Texte de présentation
- Images (sémantique claire pour l'interface utilisateur) :
    - **"Images par défaut (visibles au premier plan)"** (2 emplacements)
    - **"Images alternatives (visibles au survol)"** (2 emplacements)

#### C. Atelier (Workshop)

- Titre
- Label du bouton d'action

#### D. Horaires et Accès

- Titre et Sous-titre
- Image d'illustration
- Label du bouton d'action
- **Tableau des horaires** : Interface dynamique permettant d'ajouter, modifier ou supprimer des lignes (ex: Ligne 1 -> Jour: "Mercredi", Heures: "14h-18h").

#### E. Contact

- Titre et Sous-titre
- Email
- Adresse (Textarea)
- **Téléphone(s)** : Interface dynamique pour ajouter un ou plusieurs numéros de téléphone.

#### F. Pied de page (Footer)

- Sous-titre
- Accroche de fin

## 3. Directives Techniques

- **Wayfinder** : Utiliser l'intégration Wayfinder pour générer les URLs des routes Laravel côté React de manière typée.
- **Tests** : Écrire les tests avec **Pest** (vérifier la persistance des contenus JSON et le bon upload des images).
- Utiliser les composants UI existants (Boutons, Inputs, Cards) de l'application pour maintenir la cohérence visuelle.
