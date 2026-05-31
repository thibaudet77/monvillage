# Guide Administrateur - MonVillage

## Accès Administrateur

### Identifiants par défaut
- **Email** : `admin@monvillage.cm`
- **Mot de passe** : `admin123`

⚠️ **IMPORTANT** : Changez ces identifiants par défaut après la première connexion pour des raisons de sécurité.

## Fonctionnalités Admin

### Panneau d'administration
- Gestion des villages
- Ajout/modification/suppression de données
- Gestion des utilisateurs
- Configuration des paramètres

### Accès au panneau
1. Cliquez sur l'icône "Paramètres" (⚙️) dans la barre d'outils
2. Saisissez les identifiants administrateur
3. Accédez aux fonctionnalités d'administration

### Sécurité
- Changez le mot de passe par défaut
- Utilisez un mot de passe fort
- Déconnectez-vous après utilisation
- Limitez l'accès aux personnes autorisées

### Modification des identifiants
Pour changer les identifiants administrateur, modifiez les valeurs dans le code JavaScript :
```javascript
// Dans index.html, section CONFIG
adminCredentials: {
    email: 'votre-nouveau-email@domain.com',
    password: 'votre-nouveau-mot-de-passe'
}
```

## Support
Pour toute question concernant l'administration :
- Email : monvillage.cm@gmail.com
- Téléphone : +237 697 182 925