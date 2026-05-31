# Cahier des Charges - MonVillage

## 1. Présentation du Projet

**MonVillage** est une application web de cartographie interactive des villages du Cameroun. Elle permet de visualiser, rechercher et explorer les villages avec leurs informations géographiques et administratives.

## 2. Objectifs

### Objectifs Principaux
- Cartographier tous les villages du Cameroun
- Fournir un accès facile aux informations géographiques
- Permettre la recherche et l'exploration interactive
- Offrir des outils de mesure et d'analyse spatiale

### Objectifs Secondaires
- Faciliter l'administration territoriale
- Supporter la planification urbaine et rurale
- Fournir des données pour la recherche académique
- Promouvoir la connaissance du territoire camerounais

## 3. Fonctionnalités

### 3.1 Cartographie Interactive
- **Carte principale** : Visualisation avec Leaflet.js
- **Fonds de carte** : Mapbox (satellite, terrain, rues)
- **Navigation** : Zoom, déplacement, centrage automatique
- **Responsive** : Adaptation mobile et desktop

### 3.2 Données Géographiques
- **Villages** : Localisation, informations administratives
- **Divisions administratives** : Régions, départements, arrondissements
- **Points d'intérêt (POI)** : Écoles, hôpitaux, marchés, etc.
- **Géonymes** : Noms de lieux géographiques

### 3.3 Recherche et Filtrage
- **Recherche textuelle** : Par nom de village
- **Filtres géographiques** : Par région, département, arrondissement
- **Recherche de POI** : Par type d'établissement
- **Autocomplétion** : Suggestions en temps réel

### 3.4 Outils de Mesure
- **Mesure de distance** : Entre deux points
- **Mesure de surface** : Calcul d'aires
- **Coordonnées** : Affichage lat/lng au clic

### 3.5 Interface Utilisateur
- **Sidebar** : Panneau latéral pour les couches et informations
- **Toolbar** : Barre d'outils avec fonctions principales
- **Popups** : Informations détaillées au clic
- **Légendes** : Explication des symboles et couleurs

### 3.6 Administration
- **Panneau admin** : Gestion des données (accès protégé)
- **CRUD Villages** : Création, lecture, mise à jour, suppression
- **Gestion POI** : Administration des points d'intérêt
- **Import/Export** : Gestion des données en lot

### 3.7 Fonctionnalités Avancées
- **Impression** : Génération de cartes PDF
- **Partage** : URLs de partage de vues spécifiques
- **Notifications** : Système d'alertes pour les anniversaires de villages
- **Audit** : Traçabilité des modifications

## 4. Architecture Technique

### 4.1 Frontend
- **HTML5/CSS3/JavaScript** : Technologies de base
- **Leaflet.js** : Bibliothèque cartographique
- **Mapbox** : Fournisseur de tuiles cartographiques
- **Interface responsive** : Bootstrap/CSS Grid

### 4.2 Backend
- **Supabase** : Base de données PostgreSQL + API REST
- **PostGIS** : Extension spatiale PostgreSQL
- **Row Level Security (RLS)** : Sécurité au niveau des lignes
- **Edge Functions** : Fonctions serverless pour logique métier

### 4.3 APIs Externes
- **Mapbox** : Cartes et géocodage
- **Flutterwave** : Paiements (pour impressions)

## 5. Modèle de Données

### 5.1 Entités Principales

#### Villages
- Informations de base (nom, chef, contact)
- Géométrie (polygones, centroïdes)
- Données démographiques (population)
- Métadonnées (dates, auteurs)

#### Divisions Administratives
- **Régions** : 10 régions du Cameroun
- **Départements** : Subdivisions des régions
- **Arrondissements** : Subdivisions des départements

#### Points d'Intérêt (POI)
- Localisation ponctuelle
- Typologie (école, hôpital, marché, etc.)
- Informations descriptives

### 5.2 Utilisateurs et Sécurité
- **Utilisateurs publics** : Lecture seule
- **Administrateurs** : Accès complet CRUD
- **Audit** : Traçabilité des actions
- **Sessions** : Gestion des connexions

## 6. Sécurité

### 6.1 Authentification
- **Email/Mot de passe** : Système Supabase Auth
- **Profils admin** : Gestion des rôles et permissions
- **Sessions sécurisées** : Tokens JWT

### 6.2 Autorisation
- **RLS (Row Level Security)** : Contrôle d'accès au niveau base de données
- **Politiques de sécurité** : Règles par table
- **Validation des entrées** : Prévention des injections

## 7. Performance

### 7.1 Optimisations Cartographiques
- **Clustering** : Regroupement des points proches
- **Niveaux de zoom** : Affichage conditionnel selon l'échelle
- **Cache des tuiles** : Mise en cache côté client

### 7.2 Optimisations Base de Données
- **Index spatiaux** : Index GiST sur les géométries
- **Index textuels** : Index trigram pour la recherche
- **Vues matérialisées** : Pour les requêtes complexes

## 8. Déploiement

### 8.1 Environnements
- **Développement** : Local avec Vite
- **Production** : Hébergement statique (Vercel/Netlify)
- **Base de données** : Supabase Cloud

### 8.2 Configuration
- **Variables d'environnement** : Clés API sécurisées
- **CORS** : Configuration pour domaines autorisés
- **HTTPS** : Chiffrement obligatoire en production

## 9. Maintenance

### 9.1 Monitoring
- **Logs d'erreurs** : Suivi des problèmes
- **Métriques d'usage** : Statistiques d'utilisation
- **Performance** : Temps de réponse et disponibilité

### 9.2 Mises à Jour
- **Données** : Mise à jour régulière des villages
- **Sécurité** : Patches de sécurité
- **Fonctionnalités** : Évolutions selon besoins utilisateurs

## 10. Contact et Support

- **Email** : monvillage.cm@gmail.com
- **Téléphone** : +237 697 182 925
- **Documentation** : Guides utilisateur et administrateur
- **Support technique** : Assistance pour problèmes techniques