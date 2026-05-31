# Cahier des Charges - MonVillage
## Version Actualisée - Décembre 2024

## 1. Présentation du Projet

**MonVillage** est une application web de cartographie interactive des villages du Cameroun. Elle permet de visualiser, rechercher et explorer les villages avec leurs informations géographiques et administratives, incluant un système d'exportation cartographique professionnel avec paiement intégré.

## 2. Objectifs

### Objectifs Principaux
- Cartographier tous les villages du Cameroun avec leurs divisions administratives
- Fournir un accès facile aux informations géographiques et calculs de superficies automatiques
- Permettre la recherche et l'exploration interactive avec géolocalisation utilisateur
- Offrir des outils de mesure et d'analyse spatiale natifs
- Proposer un système d'exportation cartographique professionnel avec paiement sécurisé

### Objectifs Secondaires
- Faciliter l'administration territoriale avec données précises
- Supporter la planification urbaine et rurale
- Fournir des données pour la recherche académique
- Promouvoir la connaissance du territoire camerounais
- Générer des revenus via les exportations payantes

## 3. Fonctionnalités Implémentées

### 3.1 Cartographie Interactive Avancée
- **Carte principale** : Visualisation optimisée avec Leaflet.js et rendu Canvas
- **Fonds de carte** : Mapbox Streets et Vue satellite Google
- **Navigation** : Zoom, déplacement, centrage automatique avec contrôles optimisés
- **Géolocalisation** : Bouton de localisation utilisateur avec indicateur de position bleu
- **Responsive** : Adaptation mobile et desktop avec toolbar repositionnée
- **Chargement optimisé** : Chargement parallèle et conditionnel selon le niveau de zoom

### 3.2 Données Géographiques Complètes
- **Villages** : Localisation avec informations administratives et superficies
- **Divisions administratives** : 
  - Régions (contour rouge, 3px)
  - Départements (contour noir, 2px) 
  - Arrondissements (contour violet pointillé, priorité d'affichage)
- **Calcul automatique des superficies** : Formatage intelligent (m², ha, km²)
- **Chargement intelligent** : Toutes les entités sans limitation avec optimisations performance

### 3.3 Système de Géolocalisation
- **Bouton discret** : Style SW Maps en haut-droite, détaché du toolbar
- **Indicateur de position** : Marqueur bleu avec animation pulsante
- **Cercle de précision** : Indication visuelle de la précision GPS
- **Toggle intuitif** : Activer/désactiver la localisation d'un clic
- **Popup informative** : Coordonnées, précision et horodatage
- **Responsive** : Visible et accessible sur tous les écrans

### 3.4 Outils de Mesure Natifs
- **Mesure de distance** : Entre deux points avec ligne pointillée
- **Mesure de surface** : Polygones avec remplissage semi-transparent
- **Affichage temps réel** : Tooltips avec résultats formatés
- **Effacement sélectif** : Nettoyage des mesures sans affecter les données
- **Gestion des interactions** : Désactivation temporaire des popups pendant les mesures

### 3.5 Interface Utilisateur Optimisée
- **Sidebar responsive** : Panneau latéral avec contrôles de couches
- **Toolbar repositionnée** : Positionnement intelligent desktop/mobile
- **Popups enrichies** : Informations détaillées avec superficies calculées
- **Légendes interactives** : Explication des symboles et couleurs
- **Notifications système** : Feedback utilisateur pour toutes les actions

### 3.6 Système d'Exportation Professionnel
#### Configuration d'Export
- **Formats papier** : A4 (500 XAF), A3 (1000 XAF), A2 (2000 XAF), A1 (4000 XAF), A0 (6000 XAF)
- **Types de fichiers** : PDF (recommandé) et PNG
- **Échelles personnalisables** : 1:25,000 à 1:500,000 avec presets
- **Titre personnalisable** : Titre de carte éditable
- **Options d'affichage** : Flèche Nord, échelle graphique, légende, coordonnées

#### Prévisualisation
- **Aperçu temps réel** : Mise à jour automatique selon les paramètres
- **Interface intuitive** : Sélection visuelle des formats
- **Résumé détaillé** : Récapitulatif avant paiement

#### Système de Paiement Flutterwave
- **Paiement sécurisé** : Intégration Flutterwave avec clés de test
- **Méthodes multiples** : Cartes bancaires, Mobile Money, USSD
- **Gestion d'erreurs** : Messages explicites selon le type d'erreur
- **Traçabilité** : Enregistrement des transactions en base de données

#### Génération et Téléchargement
- **Métadonnées complètes** : Informations cartographiques détaillées
- **Gestion des couches actives** : Export uniquement des couches visibles
- **Overlay de progression** : Feedback visuel pendant la génération
- **Téléchargement automatique** : Fichier disponible immédiatement

### 3.7 Administration
- **Panneau admin** : Gestion des données (accès protégé simulé)
- **Gestion des paiements** : Historique des transactions
- **Audit des exportations** : Traçabilité des demandes
- **Configuration système** : Paramètres de l'application

## 4. Architecture Technique

### 4.1 Frontend Optimisé
- **HTML5/CSS3/JavaScript** : Technologies natives sans frameworks
- **Leaflet.js** : Bibliothèque cartographique avec rendu Canvas
- **Performance** : Chargement parallèle, simplification géométrique
- **Interface responsive** : CSS Grid et Flexbox

### 4.2 Backend et Base de Données
- **Supabase** : Base de données PostgreSQL + API REST
- **PostGIS** : Extension spatiale pour calculs géométriques
- **Row Level Security (RLS)** : Sécurité au niveau des lignes
- **Optimisations** : Index spatiaux GiST et textuels trigram

### 4.3 APIs Externes Intégrées
- **Mapbox** : Cartes Streets vectorielles
- **Google** : Imagerie satellite haute résolution
- **Flutterwave** : Passerelle de paiement sécurisée
- **Geolocation API** : Localisation utilisateur native

### 4.4 Système de Paiement
- **Flutterwave SDK v3** : Intégration complète
- **Gestion des devises** : Support du Franc CFA (XAF)
- **Sécurité** : Clés publiques/privées séparées
- **Webhook** : Confirmation automatique des paiements

## 5. Modèle de Données Actualisé

### 5.1 Tables Principales Optimisées

#### Regions, Departements, Arrondissements
- Géométries MultiPolygon avec optimisations
- Index spatiaux pour performances
- Calculs de superficie automatiques
- Chargement sans limitation de quantité

#### Payments (Nouveau)
```sql
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id varchar(255) UNIQUE NOT NULL,
  user_session varchar(255),
  amount numeric(10,2) NOT NULL,
  currency varchar(3) DEFAULT 'XAF',
  status varchar(50) DEFAULT 'pending',
  payment_method varchar(50),
  flutterwave_tx_ref varchar(255),
  flutterwave_tx_id varchar(255),
  print_format varchar(10),
  print_title varchar(255),
  map_bounds jsonb,
  processed_at timestamptz,
  created_at timestamptz DEFAULT now()
);
```

### 5.2 Optimisations de Performance
- **Chargement parallèle** : Promise.all() pour les 3 couches
- **Simplification géométrique** : Réduction des points pour l'affichage
- **Chargement conditionnel** : Affichage selon le niveau de zoom
- **Cache navigateur** : Optimisation des tuiles cartographiques

## 6. Sécurité et Paiements

### 6.1 Sécurité Renforcée
- **Clés séparées** : Publique (frontend) / Privée (backend)
- **Validation côté serveur** : Vérification des montants
- **HTTPS obligatoire** : Chiffrement de toutes les communications
- **Tokens temporaires** : Session limitée dans le temps

### 6.2 Conformité Paiements
- **PCI DSS** : Standards de sécurité Flutterwave
- **Audit trail** : Traçabilité complète des transactions
- **Gestion des échecs** : Retry automatique et gestion d'erreurs
- **Facturation** : Enregistrement pour comptabilité

## 7. Tarification et Modèle Économique

### 7.1 Grille Tarifaire
| Format | Dimensions (mm) | Prix (XAF) | Usage Recommandé |
|--------|----------------|------------|------------------|
| A4     | 210 × 297      | 500        | Consultation, archivage |
| A3     | 297 × 420      | 1,000      | Présentation bureau |
| A2     | 420 × 594      | 2,000      | Affichage mural |
| A1     | 594 × 841      | 4,000      | Plans techniques |
| A0     | 841 × 1,189    | 6,000      | Plans industriels |

### 7.2 Revenus Estimés
- **Utilisateurs cibles** : Administrations, bureaux d'études, universités
- **Volume estimé** : 50-200 exports/mois selon l'adoption
- **Revenu mensuel** : 75,000 - 300,000 XAF potentiel

## 8. Performance et Optimisations

### 8.1 Métriques de Performance
- **Chargement initial** : < 3 secondes pour les couches principales
- **Géolocalisation** : < 10 secondes avec haute précision
- **Export PDF/PNG** : < 30 secondes selon la complexité
- **Responsivité** : Fluide sur mobile et desktop

### 8.2 Optimisations Techniques
- **Rendu Canvas** : Performance supérieure au SVG
- **Debouncing** : Limitation des requêtes répétitives
- **Lazy loading** : Chargement à la demande selon le zoom
- **Compression** : Optimisation des géométries complexes

## 9. Expérience Utilisateur

### 9.1 Navigation Intuitive
- **Raccourcis clavier** : 
  - Ctrl+L (géolocalisation)
  - Ctrl+D (mesure distance)
  - Ctrl+S (mesure surface)
  - Ctrl+P (impression)
  - Escape (annulation)

### 9.2 Feedback Utilisateur
- **Notifications contextuelles** : Statut des actions en temps réel
- **États visuels** : Boutons actifs/inactifs clairement identifiés
- **Messages d'erreur** : Explicites avec solutions proposées
- **Progression** : Indicateurs pour les opérations longues

## 10. Déploiement et Maintenance

### 10.1 Environnements
- **Développement** : Local avec données de test
- **Test** : Environnement Flutterwave test
- **Production** : Hébergement statique + Supabase Cloud

### 10.2 Configuration Actuelle
```env
VITE_SUPABASE_URL=https://hrlufnjhwhgddxkpyzst.supabase.co
VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-***
VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1...***
```

### 10.3 Monitoring et Analytics
- **Logs de performance** : Temps de chargement des couches
- **Analytics paiements** : Conversion et abandons
- **Erreurs utilisateur** : Traçage pour améliorations
- **Utilisation mobile** : Statistiques d'adoption

## 11. Roadmap et Améliorations Futures

### 11.1 Fonctionnalités Prévues
- **Recherche textuelle** : Autocomplete villages et lieux
- **Villages layer** : Affichage des villages avec POI
- **Export batch** : Plusieurs cartes en une fois
- **API publique** : Accès développeurs tiers

### 11.2 Optimisations Techniques
- **WebGL** : Rendu haute performance pour grandes données
- **Service Worker** : Cache offline et PWA
- **WebAssembly** : Calculs géométriques ultra-rapides
- **CDN** : Distribution mondiale des assets

## 12. Contact et Support

- **Email technique** : monvillage.cm@gmail.com
- **Téléphone** : +237 697 182 925
- **Support utilisateur** : Interface d'aide intégrée
- **Documentation** : Guides utilisateur et développeur

## 13. Conformité et Légal

### 13.1 Protection des Données
- **RGPD compliance** : Respect de la vie privée
- **Géolocalisation** : Consentement explicite utilisateur
- **Données de paiement** : Traitement sécurisé via Flutterwave

### 13.2 Propriété Intellectuelle
- **Code source** : Propriétaire MonVillage
- **Données cartographiques** : Sources publiques et licenciées
- **Marque** : MonVillage® protégée

---

**Version** : 2.0 - Décembre 2024  
**Statut** : Production avec système de paiement fonctionnel  
**Prochaine révision** : Q1 2025


uidd : 65cf3374-9dee-4248-8065-38ed3a7b7d18