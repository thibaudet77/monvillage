# Cahier des Charges - MonVillage
## Version 3.0 - Décembre 2024

## 1. Présentation du Projet

**MonVillage** est une application web de cartographie interactive des villages du Cameroun. Elle permet de visualiser, rechercher et explorer les villages avec leurs informations géographiques et administratives, incluant un système d'exportation cartographique professionnel avec sélection de zone interactive et paiement intégré.

## 2. Objectifs

### Objectifs Principaux
- Cartographier tous les villages du Cameroun avec leurs divisions administratives
- Fournir un accès facile aux informations géographiques et calculs de superficies automatiques
- Permettre la recherche et l'exploration interactive avec géolocalisation utilisateur
- Offrir des outils de mesure et d'analyse spatiale natifs
- Proposer un système d'exportation cartographique professionnel avec sélection de zone et paiement sécurisé

### Objectifs Secondaires
- Faciliter l'administration territoriale avec données précises
- Supporter la planification urbaine et rurale
- Fournir des données pour la recherche académique
- Promouvoir la connaissance du territoire camerounais
- Générer des revenus via les exportations payantes

## 3. Fonctionnalités Implémentées

### 3.1 Cartographie Interactive Avancée
- **Carte principale** : Visualisation optimisée avec Leaflet.js et rendu Canvas
- **Fonds de carte** : Mapbox Streets et Vue satellite alternative (ArcGIS)
- **Navigation** : Zoom, déplacement, centrage automatique avec contrôles optimisés
- **Géolocalisation** : Bouton de localisation utilisateur avec indicateur de position bleu
- **Responsive** : Adaptation mobile et desktop avec toolbar repositionnée
- **Chargement optimisé** : Chargement parallèle et conditionnel selon le niveau de zoom
- **Variables d'environnement** : Configuration externalisée pour déploiement sécurisé

### 3.2 Données Géographiques Complètes
- **Villages** : Localisation avec informations administratives et superficies
- **Divisions administratives** : 
  - Régions (contour rouge, 3px)
  - Départements (contour noir, 2px) 
  - Arrondissements (contour violet pointillé, priorité d'affichage)
- **Calcul automatique des superficies** : Formatage intelligent (m², ha, km²)
- **Chargement intelligent** : Toutes les entités sans limitation avec optimisations performance
- **Descriptions détaillées** : Système complet de descriptions de villages avec onglets

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
- **Modal villages** : Système d'onglets avec informations complètes et photos

### 3.6 Système d'Exportation Professionnel Avancé

#### Configuration d'Export Améliorée
- **Formats papier** : A4 (500 XAF), A3 (1000 XAF), A2 (2000 XAF), A1 (4000 XAF), A0 (6000 XAF)
- **Types de fichiers** : PDF (recommandé) et PNG
- **Échelles personnalisables** : 1:25,000 à 1:500,000 avec presets
- **Titre personnalisable** : Titre de carte éditable
- **Options d'affichage** : Flèche Nord, échelle graphique, légende, coordonnées

#### Sélection de Zone Interactive (Nouveau)
- **Sélection par clic-glissé** : Dessiner un rectangle sur la carte pour sélectionner la zone
- **Utilisation de la vue actuelle** : Export de ce qui est visible à l'écran
- **Visualisation en temps réel** : Rectangle bleu avec bordure pointillée
- **Contrôles intuitifs** : Boutons pour sélectionner, utiliser la vue, ou effacer
- **Feedback utilisateur** : Messages contextuels pour guider l'utilisateur

#### Prévisualisation Cartographique Réaliste (Nouveau)
- **Mini-carte interactive** : Carte d'aperçu de 350×350px dans le modal
- **Tuiles réelles** : Utilise les mêmes tuiles Mapbox que la carte principale
- **Synchronisation automatique** : L'aperçu se met à jour selon la zone sélectionnée
- **Indicateur de zone** : Rectangle rouge pour visualiser la zone d'exportation
- **Éléments cartographiques** : Flèche Nord et échelle selon les options

#### Système de Paiement Flutterwave Amélioré
- **Interface de sélection** : Choix visuel entre méthodes de paiement
- **Mobile Money** : Support Orange Money et MTN MoMo avec icône dédiée
- **Carte Bancaire** : Support Visa et Mastercard avec icône dédiée
- **Sélection par défaut** : Mobile Money pré-sélectionné (marché local)
- **Customisation dynamique** : Messages et options selon la méthode choisie
- **Gestion d'erreurs avancée** : Messages explicites selon le type d'erreur
- **Traçabilité complète** : Enregistrement des transactions avec métadonnées

#### Génération et Téléchargement
- **Zone personnalisée** : Export uniquement de la zone sélectionnée
- **Métadonnées complètes** : Informations cartographiques détaillées
- **Gestion des couches actives** : Export uniquement des couches visibles
- **Overlay de progression** : Feedback visuel pendant la génération
- **Téléchargement automatique** : Fichier disponible immédiatement
- **Nettoyage automatique** : Suppression des sélections après export

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
- **Variables d'environnement** : Configuration via import.meta.env
- **Gestion d'erreurs** : Système global de capture et notification

### 4.2 Backend et Base de Données
- **Supabase** : Base de données PostgreSQL + API REST
- **PostGIS** : Extension spatiale pour calculs géométriques
- **Row Level Security (RLS)** : Sécurité au niveau des lignes
- **Optimisations** : Index spatiaux GiST et textuels trigram

### 4.3 APIs Externes Intégrées
- **Mapbox** : Cartes Streets vectorielles
- **ArcGIS** : Imagerie satellite haute résolution (fallback Google)
- **Flutterwave** : Passerelle de paiement sécurisée avec support multi-méthodes
- **Geolocation API** : Localisation utilisateur native

### 4.4 Système de Paiement Avancé
- **Flutterwave SDK v3** : Intégration complète avec sélection de méthodes
- **Gestion des devises** : Support du Franc CFA (XAF)
- **Sécurité** : Clés publiques/privées séparées
- **Support multi-méthodes** : Card, Mobile Money, USSD
- **Webhook** : Confirmation automatique des paiements
- **Métadonnées enrichies** : Traçage complet des transactions

## 5. Modèle de Données Actualisé

### 5.1 Tables Principales Optimisées

#### Regions, Departements, Arrondissements
- Géométries MultiPolygon avec optimisations
- Index spatiaux pour performances
- Calculs de superficie automatiques
- Chargement sans limitation de quantité

#### Villages (Étendu)
- **Informations de base** : Nom, arrondissement, chef, population
- **Données du chef** : Photo, date de prise de service, années de service
- **Contacts** : Téléphone, email
- **Géométrie** : Polygones avec calcul automatique de superficie
- **Statut** : is_active pour gestion de la visibilité

#### Village_Descriptions (Nouveau)
```sql
- histoire_origine : Histoire et origine du nom
- description_limites : Description des limites
- importance_region : Importance dans la région
- structure_demographique : Structure démographique
- groupes_ethniques : Groupes ethniques
- activites_generatrices : Activités génératrices de revenus
- produits_terroir : Produits typiques du terroir
- infrastructures_scolaires : Établissements scolaires
- infrastructures_sante : Centres de santé
- infrastructures_routes : Routes et transport
- acces_electricite_eau : Accès électricité/eau
- sites_naturels : Sites naturels
- sites_culturels : Sites culturels
- fetes_traditionnelles : Fêtes traditionnelles
- danses_musiques_rites : Danses, musiques, rites
- gastronomie_locale : Gastronomie locale
- personnalites_originaires : Personnalités originaires
- is_published : Statut de publication
```

#### Village_Photos (Nouveau)
```sql
- village_id : Référence au village
- photo_url : URL de la photo
- photo_name : Nom du fichier
- photo_order : Ordre d'affichage
- file_size : Taille du fichier
```

#### Payments (Amélioré)
```sql
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id varchar(255) UNIQUE NOT NULL,
  user_session varchar(255),
  amount numeric(10,2) NOT NULL,
  currency varchar(3) DEFAULT 'XAF',
  status varchar(50) DEFAULT 'pending',
  payment_method varchar(50),
  payment_type varchar(50), -- card, mobilemoney, ussd
  flutterwave_tx_ref varchar(255),
  flutterwave_tx_id varchar(255),
  print_format varchar(10),
  print_title varchar(255),
  map_bounds jsonb, -- Zone sélectionnée pour l'export
  processed_at timestamptz,
  created_at timestamptz DEFAULT now()
);
```

### 5.2 Optimisations de Performance
- **Chargement parallèle** : Promise.all() pour les 3 couches
- **Simplification géométrique** : Réduction des points pour l'affichage
- **Chargement conditionnel** : Affichage selon le niveau de zoom
- **Cache navigateur** : Optimisation des tuiles cartographiques
- **Variables d'environnement** : Configuration externalisée

## 6. Sécurité et Paiements

### 6.1 Sécurité Renforcée
- **Variables d'environnement** : Configuration sécurisée via Vercel
- **Clés séparées** : Publique (frontend) / Privée (backend)
- **Validation côté serveur** : Vérification des montants
- **HTTPS obligatoire** : Chiffrement de toutes les communications
- **Tokens temporaires** : Session limitée dans le temps

### 6.2 Conformité Paiements
- **PCI DSS** : Standards de sécurité Flutterwave
- **Audit trail** : Traçabilité complète des transactions avec métadonnées
- **Support multi-méthodes** : Card, Mobile Money, USSD
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
- **Volume estimé** : 100-400 exports/mois avec nouvelle interface
- **Revenu mensuel** : 150,000 - 600,000 XAF potentiel (doublé avec améliorations)
- **Conversion améliorée** : +50% grâce à la sélection de zone et aperçu

## 8. Performance et Optimisations

### 8.1 Métriques de Performance
- **Chargement initial** : < 2 secondes pour les couches principales
- **Géolocalisation** : < 8 secondes avec haute précision
- **Sélection de zone** : Temps réel avec feedback visuel
- **Aperçu cartographique** : < 1 seconde de mise à jour
- **Export PDF/PNG** : < 20 secondes selon la complexité
- **Responsivité** : Fluide sur mobile et desktop

### 8.2 Optimisations Techniques
- **Rendu Canvas** : Performance supérieure au SVG
- **Variables d'environnement** : Configuration optimisée pour le déploiement
- **Debouncing** : Limitation des requêtes répétitives
- **Lazy loading** : Chargement à la demande selon le zoom
- **Compression** : Optimisation des géométries complexes
- **Gestion d'erreurs** : Système global pour une meilleure stabilité

## 9. Expérience Utilisateur

### 9.1 Navigation Intuitive
- **Raccourcis clavier** : 
  - Ctrl+L (géolocalisation)
  - Ctrl+D (mesure distance)
  - Ctrl+S (mesure surface)
  - Ctrl+P (impression)
  - Escape (annulation globale)

### 9.2 Feedback Utilisateur Amélioré
- **Notifications contextuelles** : Statut des actions en temps réel
- **États visuels** : Boutons actifs/inactifs clairement identifiés
- **Messages d'erreur** : Explicites avec solutions proposées
- **Progression** : Indicateurs pour les opérations longues
- **Sélection de zone** : Guide visuel pour l'exportation
- **Aperçu temps réel** : Visualisation immédiate des modifications

## 10. Déploiement et Configuration

### 10.1 Variables d'Environnement
```env
VITE_SUPABASE_URL=https://hrlufnjhwhgddxkpyzst.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoiZWthbnNvbiIsImEiOiJjbWUy...
VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-de06efbef44902ddb3aa4a1680436c38-X
```

### 10.2 Environnements
- **Développement** : Variables par défaut dans le code
- **Test** : Environnement Flutterwave test avec clés spécifiques
- **Production** : Variables définies dans Vercel avec clés live

### 10.3 Monitoring et Analytics
- **Logs de performance** : Temps de chargement des couches
- **Analytics paiements** : Conversion et abandons par méthode
- **Utilisation des zones** : Statistiques de sélection d'export
- **Erreurs utilisateur** : Traçage pour améliorations
- **Utilisation mobile** : Statistiques d'adoption

## 11. Nouveautés Version 3.0

### 11.1 Sélection de Zone Interactive
- Interface intuitive de sélection par clic-glissé
- Visualisation en temps réel avec rectangle de sélection
- Trois modes : sélection libre, vue actuelle, effacement
- Intégration complète avec le système d'export

### 11.2 Aperçu Cartographique Réaliste
- Mini-carte avec tuiles réelles dans le modal d'impression
- Synchronisation automatique avec la zone sélectionnée
- Éléments cartographiques selon les options choisies
- Mise à jour temps réel des modifications

### 11.3 Interface de Paiement Améliorée
- Sélection visuelle entre Mobile Money et Carte
- Support natif des méthodes de paiement locales
- Interface adaptée au marché camerounais
- Messages et options dynamiques selon la méthode

### 11.4 Architecture Technique Robuste
- Variables d'environnement pour configuration sécurisée
- Gestion d'erreurs globale avec notifications
- Performance optimisée pour les opérations complexes
- Code modulaire et maintenable

## 12. Roadmap et Améliorations Futures

### 12.1 Fonctionnalités Prévues
- **Recherche textuelle** : Autocomplete villages et lieux
- **Villages layer** : Affichage des villages avec POI
- **Export batch** : Plusieurs cartes en une fois
- **API publique** : Accès développeurs tiers
- **Système de cache** : Amélioration des performances

### 12.2 Optimisations Techniques
- **WebGL** : Rendu haute performance pour grandes données
- **Service Worker** : Cache offline et PWA
- **WebAssembly** : Calculs géométriques ultra-rapides
- **CDN** : Distribution mondiale des assets

## 13. Contact et Support

- **Email technique** : monvillage.cm@gmail.com
- **Téléphone** : +237 697 182 925
- **Support utilisateur** : Interface d'aide intégrée
- **Documentation** : Guides utilisateur et développeur

## 14. Conformité et Légal

### 14.1 Protection des Données
- **RGPD compliance** : Respect de la vie privée
- **Géolocalisation** : Consentement explicite utilisateur
- **Données de paiement** : Traitement sécurisé via Flutterwave
- **Variables d'environnement** : Configuration sécurisée

### 14.2 Propriété Intellectuelle
- **Code source** : Propriétaire MonVillage
- **Données cartographiques** : Sources publiques et licenciées
- **Marque** : MonVillage® protégée

---

**Version** : 3.0 - Décembre 2024  
**Statut** : Production avec sélection de zone interactive et paiement multi-méthodes  
**Prochaine révision** : Q2 2025

**UUID** : 65cf3374-9dee-4248-8065-38ed3a7b7d18