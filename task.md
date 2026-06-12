# Tâche en cours : Sécurisation de l'administration (Middleware & Rôle Admin)

## Micro-étapes
- [x] Modifier la migration `users` pour inclure `is_admin` (boolean, par défaut `false`)
- [x] Ajouter `is_admin` dans les attributs fillable/casts de `User.php`
- [x] Définir l'état `admin` dans `UserFactory.php`
- [x] Configurer `UserSeeder.php` pour que l'utilisateur de test (`test@example.com`) soit administrateur
- [x] Créer le middleware de sécurité `AdminMiddleware`
- [x] Déclarer le middleware `admin` dans `bootstrap/app.php`
- [x] Protéger les routes de ressource `workshops` avec le middleware `admin` dans `routes/web.php`
- [x] Mettre à jour et faire passer tous les tests de sécurité dans `WorkshopControllerTest.php`
