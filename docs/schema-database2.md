# Schéma de Base de Données - MonVillage
## Version Actualisée - Décembre 2024

## Vue d'ensemble

La base de données utilise **PostgreSQL** avec l'extension **PostGIS** pour les données spatiales, hébergée sur **Supabase**. Le schéma a été optimisé pour supporter le système d'exportation cartographique avec paiement intégré et la classification des chefferies.

## Tables Principales

### 1. users (Supabase Auth)
Table système Supabase pour l'authentification.

### 2. admin_profiles
Profils des administrateurs avec permissions étendues.

```sql
CREATE TABLE admin_profiles (
  id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  full_name varchar(255),
  role varchar(50) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  permissions jsonb DEFAULT '{"read": true, "write": false, "delete": false}',
  two_factor_enabled boolean DEFAULT false,
  two_factor_secret varchar(255),
  last_login timestamptz,
  login_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 3. regions
Les 10 régions du Cameroun.

```sql
CREATE TABLE regions (
  id_region integer PRIMARY KEY,
  nom_region varchar(100),
  geom geometry(MultiPolygon, 4326),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 4. departements
Départements par région.

```sql
CREATE TABLE departements (
  id_departement integer PRIMARY KEY,
  nom_departement varchar(100),
  id_region integer REFERENCES regions(id_region),
  geom geometry(MultiPolygon, 4326),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 5. arrondissements
Arrondissements par département.

```sql
CREATE TABLE arrondissements (
  id_arrondissement integer PRIMARY KEY,
  nom_arrondissement varchar(100),
  id_departement integer REFERENCES departements(id_departement),
  name char(30),
  geom geometry(MultiPolygon, 4326),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### 6. villages
Table principale des villages avec classification des chefferies.

```sql
CREATE TABLE villages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_name varchar(255) NOT NULL,
  chief_name varchar(255),
  email varchar(255),
  telephone varchar(20),
  id_arrondissement integer NOT NULL REFERENCES arrondissements(id_arrondissement) ON DELETE CASCADE,
  -- NOUVEAU: Classification des chefferies
  categorie varchar(50) NULL CHECK (categorie IS NULL OR categorie IN ('chefferie_1er_degre', 'chefferie_2eme_degre', 'chefferie_3eme_degre')),
  geom geometry(MultiPolygon, 4326) NOT NULL,
  centroid geometry(Point, 4326),
  area_hectares numeric(12,4),
  population integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id),
  updated_by uuid REFERENCES users(id)
);

-- Commentaire explicatif
COMMENT ON COLUMN villages.categorie IS 'Classification des chefferies uniquement: chefferie_1er_degre, chefferie_2eme_degre, chefferie_3eme_degre. NULL pour les villages ordinaires';
```

### 7. village_photos
Photos des villages (max 2 par village).

```sql
CREATE TABLE village_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id uuid NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  photo_url text NOT NULL,
  photo_name varchar(255),
  photo_order integer DEFAULT 1 CHECK (photo_order IN (1, 2)),
  file_size integer,
  uploaded_at timestamptz DEFAULT now(),
  uploaded_by uuid REFERENCES users(id),
  UNIQUE(village_id, photo_order)
);
```

### 8. poi (Points of Interest)
Points d'intérêt géolocalisés.

```sql
CREATE TABLE poi (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  type varchar(100) NOT NULL,
  description text,
  village_id uuid REFERENCES villages(id) ON DELETE SET NULL,
  geom geometry(Point, 4326) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id)
);
```

### 9. poi_types
Types de points d'intérêt avec configuration d'affichage.

```sql
CREATE TABLE poi_types (
  type varchar(100) PRIMARY KEY,
  label varchar(255) NOT NULL,
  icon varchar(100),
  color varchar(7),
  description text,
  is_active boolean DEFAULT true
);
```

### 10. geonames
Noms géographiques et toponymes.

```sql
CREATE TABLE geonames (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom varchar(255) NOT NULL,
  type varchar(100) NOT NULL,
  description text,
  geom geometry(Point, 4326) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id)
);
```

### 11. payments (NOUVEAU)
Gestion des paiements pour les exportations cartographiques.

```sql
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id varchar(255) UNIQUE NOT NULL,
  user_session varchar(255),
  amount numeric(10,2) NOT NULL,
  currency varchar(3) DEFAULT 'XAF',
  status varchar(50) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
  payment_method varchar(50),
  flutterwave_tx_ref varchar(255),
  flutterwave_tx_id varchar(255),
  -- Détails de l'export
  print_format varchar(10) CHECK (print_format IN ('A4', 'A3', 'A2', 'A1', 'A0')),
  print_title varchar(255),
  output_format varchar(10) DEFAULT 'pdf' CHECK (output_format IN ('pdf', 'png')),
  map_scale integer,
  map_bounds jsonb,
  show_north_arrow boolean DEFAULT true,
  show_scale boolean DEFAULT true,
  show_legend boolean DEFAULT true,
  show_coordinates boolean DEFAULT true,
  -- Métadonnées
  processed_at timestamptz,
  created_at timestamptz DEFAULT now()
);
```

### 12. Tables de Support

#### village_notifications
```sql
CREATE TABLE village_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id uuid NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  notification_type varchar(50) DEFAULT 'anniversary' CHECK (notification_type IN ('anniversary', 'reminder', 'alert')),
  scheduled_date date NOT NULL,
  sent_date timestamptz,
  status varchar(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'sent', 'failed', 'cancelled')),
  email_to varchar(255) DEFAULT 'monvillage.cm@gmail.com',
  subject varchar(255),
  message text,
  retry_count integer DEFAULT 0,
  last_error text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

#### audit_logs
```sql
CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  action varchar(100) NOT NULL,
  table_name varchar(100),
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);
```

#### user_sessions
```sql
CREATE TABLE user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  session_token varchar(255) UNIQUE,
  expires_at timestamptz NOT NULL,
  ip_address inet,
  user_agent text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
```

#### data_imports
```sql
CREATE TABLE data_imports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  imported_by uuid REFERENCES users(id),
  file_name varchar(255),
  file_type varchar(50),
  data_type varchar(50),
  total_records integer,
  successful_records integer,
  failed_records integer,
  error_log text,
  status varchar(50) DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);
```

#### system_config
```sql
CREATE TABLE system_config (
  key varchar(100) PRIMARY KEY,
  value text NOT NULL,
  description text,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES users(id)
);
```

#### export_statistics (NOUVEAU)
Table pour analyser l'utilisation des exports.

```sql
CREATE TABLE export_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  export_date date NOT NULL,
  format varchar(10) NOT NULL,
  output_type varchar(10) NOT NULL,
  revenue numeric(10,2) NOT NULL,
  user_session varchar(255),
  success boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
```

## Index et Optimisations

### Index Spatiaux (GiST)
```sql
-- Géométries principales
CREATE INDEX idx_villages_geom ON villages USING gist (geom);
CREATE INDEX idx_villages_centroid ON villages USING gist (centroid);
CREATE INDEX idx_poi_geom ON poi USING gist (geom);
CREATE INDEX idx_geonames_geom ON geonames USING gist (geom);

-- Divisions administratives
CREATE INDEX sidx_regions_geom ON regions USING gist (geom);
CREATE INDEX sidx_departements_geom ON departements USING gist (geom);
CREATE INDEX sidx_arrondissements_geom ON arrondissements USING gist (geom);
```

### Index Textuels (Trigram)
```sql
-- Extension pour recherche textuelle
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Index de recherche
CREATE INDEX idx_villages_name_trgm ON villages USING gin (village_name gin_trgm_ops);
CREATE INDEX idx_villages_chief_name_trgm ON villages USING gin (chief_name gin_trgm_ops);
CREATE INDEX idx_poi_name_trgm ON poi USING gin (name gin_trgm_ops);
CREATE INDEX idx_geonames_nom_trgm ON geonames USING gin (nom gin_trgm_ops);
```

### Index Fonctionnels et Nouveaux
```sql
-- Performance et filtrage
CREATE INDEX idx_villages_active ON villages (is_active) WHERE is_active = true;
CREATE INDEX idx_villages_categorie ON villages (categorie); -- NOUVEAU pour chefferies
CREATE INDEX idx_poi_type ON poi (type) WHERE is_active = true;
CREATE INDEX idx_villages_arrondissement_id ON villages (id_arrondissement);
CREATE INDEX idx_poi_village_id ON poi (village_id);

-- NOUVEAUX: Index pour les paiements
CREATE INDEX idx_payments_status ON payments (status);
CREATE INDEX idx_payments_created_date ON payments (DATE(created_at));
CREATE INDEX idx_payments_flutterwave_ref ON payments (flutterwave_tx_ref);
CREATE INDEX idx_payments_transaction_id ON payments (transaction_id);

-- Index pour les statistiques d'export
CREATE INDEX idx_export_stats_date ON export_statistics (export_date);
CREATE INDEX idx_export_stats_format ON export_statistics (format);
```

## Vues

### villages_complete
Vue complète avec informations administratives et classification.

```sql
CREATE VIEW villages_complete AS
SELECT 
  v.*,
  a.nom_arrondissement as arrondissement_name,
  d.id_departement,
  d.nom_departement as departement_name,
  r.id_region,
  r.nom_region as region_name,
  -- Classification enrichie
  CASE 
    WHEN v.categorie IS NULL THEN 'Village'
    WHEN v.categorie = 'chefferie_1er_degre' THEN 'Chefferie 1er degré'
    WHEN v.categorie = 'chefferie_2eme_degre' THEN 'Chefferie 2ème degré'
    WHEN v.categorie = 'chefferie_3eme_degre' THEN 'Chefferie 3ème degré'
  END as type_localite
FROM villages v
LEFT JOIN arrondissements a ON v.id_arrondissement = a.id_arrondissement
LEFT JOIN departements d ON a.id_departement = d.id_departement
LEFT JOIN regions r ON d.id_region = r.id_region;
```

### poi_with_location
POI avec informations de localisation administrative.

```sql
CREATE VIEW poi_with_location AS
SELECT 
  p.*,
  v.village_name,
  a.nom_arrondissement as arrondissement_name,
  d.nom_departement as departement_name,
  r.nom_region as region_name
FROM poi p
LEFT JOIN villages v ON p.village_id = v.id
LEFT JOIN arrondissements a ON v.id_arrondissement = a.id_arrondissement
LEFT JOIN departements d ON a.id_departement = d.id_departement
LEFT JOIN regions r ON d.id_region = r.id_region;
```

### export_revenue_summary (NOUVELLE)
Synthèse des revenus d'exportation.

```sql
CREATE VIEW export_revenue_summary AS
SELECT 
  DATE_TRUNC('month', created_at) as mois,
  print_format,
  COUNT(*) as nombre_exports,
  SUM(amount) as revenu_total,
  AVG(amount) as revenu_moyen,
  COUNT(*) FILTER (WHERE status = 'success') as exports_reussis,
  COUNT(*) FILTER (WHERE status = 'failed') as exports_echoues
FROM payments 
WHERE status IN ('success', 'failed')
GROUP BY DATE_TRUNC('month', created_at), print_format
ORDER BY mois DESC, print_format;
```

## Fonctions et Triggers

### Calculs Automatiques
```sql
-- Fonction pour calculer centroïde et superficie
CREATE OR REPLACE FUNCTION update_village_calculations()
RETURNS TRIGGER AS $$
BEGIN
  NEW.centroid = ST_Centroid(NEW.geom);
  NEW.area_hectares = ST_Area(NEW.geom::geography) / 10000;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER trigger_update_village_calculations
  BEFORE INSERT OR UPDATE OF geom ON villages
  FOR EACH ROW EXECUTE FUNCTION update_village_calculations();
```

### Notifications Automatiques
```sql
-- Fonction pour programmer les notifications d'anniversaire
CREATE OR REPLACE FUNCTION schedule_village_anniversary()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO village_notifications (
    village_id,
    notification_type,
    scheduled_date,
    subject,
    message
  ) VALUES (
    NEW.id,
    'anniversary',
    (NEW.created_at + INTERVAL '1 year')::date,
    'Anniversaire du village ' || NEW.village_name,
    'Le village ' || NEW.village_name || ' fête son premier anniversaire sur MonVillage.'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER trigger_schedule_village_anniversary
  AFTER INSERT ON villages
  FOR EACH ROW EXECUTE FUNCTION schedule_village_anniversary();
```

### Statistiques d'Export (NOUVELLE)
```sql
-- Fonction pour enregistrer les statistiques d'export
CREATE OR REPLACE FUNCTION record_export_statistics()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'success' AND OLD.status != 'success' THEN
    INSERT INTO export_statistics (
      export_date,
      format,
      output_type,
      revenue,
      user_session,
      success
    ) VALUES (
      CURRENT_DATE,
      NEW.print_format,
      NEW.output_format,
      NEW.amount,
      NEW.user_session,
      true
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour statistiques
CREATE TRIGGER trigger_export_statistics
  AFTER UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION record_export_statistics();
```

## Politiques RLS (Row Level Security)

### Villages
```sql
-- Lecture publique pour villages actifs
CREATE POLICY "Villages are viewable by everyone" ON villages
  FOR SELECT USING (is_active = true);

-- Modification pour utilisateurs authentifiés
CREATE POLICY "Villages are editable by authenticated users" ON villages
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL);
```

### POI
```sql
-- Lecture publique pour POI actifs
CREATE POLICY "POI are viewable by everyone" ON poi
  FOR SELECT USING (is_active = true);

-- Modification pour utilisateurs authentifiés
CREATE POLICY "POI are editable by authenticated users" ON poi
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL);
```

### Payments (NOUVEAU)
```sql
-- Les paiements ne sont visibles que par les administrateurs
CREATE POLICY "Payments viewable by admins only" ON payments
  FOR SELECT TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles 
      WHERE id = auth.uid() AND is_active = true
    )
  );

-- Insertion libre pour les paiements (processus automatique)
CREATE POLICY "Anyone can create payments" ON payments
  FOR INSERT WITH CHECK (true);
```

## Configuration Système

### Types de POI par défaut
```sql
INSERT INTO poi_types (type, label, icon, color, description) VALUES
('school', 'École', 'school', '#4CAF50', 'Établissement scolaire'),
('hospital', 'Hôpital', 'hospital', '#F44336', 'Établissement de santé'),
('market', 'Marché', 'store', '#FF9800', 'Marché ou commerce'),
('church', 'Église', 'church', '#9C27B0', 'Lieu de culte chrétien'),
('mosque', 'Mosquée', 'mosque', '#009688', 'Lieu de culte musulman'),
('government', 'Administration', 'government', '#2196F3', 'Bâtiment administratif'),
('water', 'Point d\'eau', 'water', '#00BCD4', 'Source, puits, forage'),
('transport', 'Transport', 'bus', '#607D8B', 'Gare, arrêt de bus');
```

### Configuration Système Actualisée
```sql
INSERT INTO system_config (key, value, description) VALUES
('app_name', 'MonVillage', 'Nom de l\'application'),
('app_version', '2.0.0', 'Version de l\'application avec système de paiement'),
('default_zoom', '6', 'Niveau de zoom par défaut'),
('center_lat', '7.3697', 'Latitude du centre par défaut (Cameroun)'),
('center_lng', '12.3547', 'Longitude du centre par défaut (Cameroun)'),
('max_file_size', '5242880', 'Taille maximale des fichiers (5MB)'),
('contact_email', 'monvillage.cm@gmail.com', 'Email de contact'),
('contact_phone', '+237 697 182 925', 'Téléphone de contact'),
-- NOUVELLES configurations pour les exports
('print_a4_price', '500', 'Prix export A4 en XAF'),
('print_a3_price', '1000', 'Prix export A3 en XAF'),
('print_a2_price', '2000', 'Prix export A2 en XAF'),
('print_a1_price', '4000', 'Prix export A1 en XAF'),
('print_a0_price', '6000', 'Prix export A0 en XAF'),
('flutterwave_public_key', 'FLWPUBK_TEST-***', 'Clé publique Flutterwave'),
('enable_geolocation', 'true', 'Activer la géolocalisation'),
('max_zoom_villages', '12', 'Zoom minimum pour afficher les villages');
```

## Contraintes et Validations

### Contraintes Géométriques
- Toutes les géométries utilisent le système de coordonnées WGS84 (SRID 4326)
- Les villages doivent avoir des géométries valides (polygones)
- Les POI doivent être des points valides

### Contraintes Métier Actualisées
- Maximum 2 photos par village
- Les villages doivent appartenir à un arrondissement existant
- Les chefferies doivent avoir une catégorie valide (1er, 2ème, 3ème degré)
- Les paiements doivent avoir un montant positif et un format valide
- Les exports doivent spécifier un format de papier standard

### Contraintes de Sécurité
- RLS activé sur toutes les tables sensibles
- Authentification requise pour les modifications
- Paiements protégés (lecture admin uniquement)
- Audit automatique des actions administratives

## Performance et Monitoring

### Métriques Importantes Actualisées
- Nombre total de villages : ~30,000 attendus
- Nombre de chefferies par degré : statistiques à surveiller
- Nombre de POI : ~100,000 attendus
- Volume d'exports par mois : métriques business
- Revenus d'exportation : suivi financier

### Maintenance
- Vacuum automatique PostgreSQL
- Réindexation périodique des index spatiaux
- Nettoyage des sessions expirées
- Archivage des logs d'audit anciens
- Purge des statistiques d'export anciennes (> 2 ans)

## Sauvegardes et Récupération

### Stratégie de Sauvegarde
- Sauvegardes automatiques Supabase (quotidiennes)
- Export périodique des données de paiement (critiques)
- Réplication en temps réel (Supabase)
- Point de restauration (PITR) disponible

### Plan de Récupération
- RTO (Recovery Time Objective) : < 4 heures
- RPO (Recovery Point Objective) : < 1 heure
- Tests de récupération mensuels
- Documentation des procédures de restauration
- Plan de continuité pour les paiements

## Nouvelles Fonctionnalités de Monitoring

### Dashboard Administrateur
```sql
-- Vue pour dashboard admin
CREATE VIEW admin_dashboard AS
SELECT 
  (SELECT COUNT(*) FROM villages WHERE is_active = true) as total_villages,
  (SELECT COUNT(*) FROM villages WHERE categorie IS NOT NULL) as total_chefferies,
  (SELECT COUNT(*) FROM payments WHERE status = 'success' AND DATE(created_at) = CURRENT_DATE) as exports_today,
  (SELECT SUM(amount) FROM payments WHERE status = 'success' AND DATE(created_at) = CURRENT_DATE) as revenue_today,
  (SELECT COUNT(*) FROM villages WHERE created_at > CURRENT_DATE - INTERVAL '30 days') as new_villages_month;
```

### Alertes Automatiques
- Monitoring des échecs de paiement
- Surveillance des temps de réponse
- Alertes de revenus quotidiens anormaux
- Détection d'usage frauduleux

---

**Version** : 2.0 - Décembre 2024  
**Statut** : Production avec système de classification des chefferies  
**Prochaine révision** : Q1 2025