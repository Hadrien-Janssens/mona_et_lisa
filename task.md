# Tâche en cours : Étape 3 - Panel Administration (Back-Office)

## Micro-étapes
- [ ] Mettre à jour `schema.md` pour ajouter le champ `is_admin` dans la table `users`
- [ ] Modifier la migration `users` pour inclure `is_admin` (boolean, par défaut `false`)
- [ ] Ajouter `is_admin` dans les attributs fillable/casts de `User.php`
- [ ] Configurer `UserSeeder.php` pour que l'utilisateur de test (`test@example.com`) soit administrateur (`is_admin => true`)
- [ ] Créer un middleware de sécurité `AdminMiddleware`
- [ ] Déclarer le middleware dans `bootstrap/app.php` et définir le groupe de routes `/admin`
- [ ] Créer le Layout d'administration avec React + Shadcn/ui
