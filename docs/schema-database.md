# Schéma de Base de Données - MonVillage

## Vue d'ensemble

La base de données utilise **PostgreSQL** avec l'extension **PostGIS** pour les données spatiales, hébergée sur **Supabase**.

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
Table principale des villages.

```sql
CREATE TABLE villages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_name varchar(255) NOT NULL,
  chief_name varchar(255),
  email varchar(255),
  telephone varchar(20),
  id_arrondissement integer NOT NULL REFERENCES arrondissements(id_arrondissement) ON DELETE CASCADE,
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

### 11. payments
Gestion des paiements pour les impressions.

```sql
CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id varchar(255) UNIQUE NOT NULL,
  user_session varchar(255),
  amount numeric(10,2) DEFAULT 2000.00 NOT NULL,
  currency varchar(3) DEFAULT 'XAF',
  status varchar(50) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
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

### Index Fonctionnels
```sql
-- Performance et filtrage
CREATE INDEX idx_villages_active ON villages (is_active) WHERE is_active = true;
CREATE INDEX idx_poi_type ON poi (type) WHERE is_active = true;
CREATE INDEX idx_villages_arrondissement_id ON villages (id_arrondissement);
CREATE INDEX idx_poi_village_id ON poi (village_id);
```

## Vues

### villages_complete
Vue complète avec informations administratives.

```sql
CREATE VIEW villages_complete AS
SELECT 
  v.*,
  a.nom_arrondissement as arrondissement_name,
  d.id_departement,
  d.nom_departement as departement_name,
  r.id_region,
  r.nom_region as region_name
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

### Photos de Villages
```sql
-- Lecture publique pour photos de villages actifs
CREATE POLICY "Village photos are viewable by everyone" ON village_photos
  FOR SELECT USING (
    village_id IN (
      SELECT id FROM villages WHERE is_active = true
    )
  );

-- Modification pour utilisateurs authentifiés
CREATE POLICY "Village photos are editable by authenticated users" ON village_photos
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL);
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

### Configuration Système
```sql
INSERT INTO system_config (key, value, description) VALUES
('app_name', 'MonVillage', 'Nom de l\'application'),
('app_version', '1.0.0', 'Version de l\'application'),
('default_zoom', '6', 'Niveau de zoom par défaut'),
('center_lat', '7.3697', 'Latitude du centre par défaut (Cameroun)'),
('center_lng', '12.3547', 'Longitude du centre par défaut (Cameroun)'),
('max_file_size', '5242880', 'Taille maximale des fichiers (5MB)'),
('contact_email', 'monvillage.cm@gmail.com', 'Email de contact'),
('contact_phone', '+237 697 182 925', 'Téléphone de contact');
```

## Contraintes et Validations

### Contraintes Géométriques
- Toutes les géométries utilisent le système de coordonnées WGS84 (SRID 4326)
- Les villages doivent avoir des géométries valides (polygones)
- Les POI doivent être des points valides

### Contraintes Métier
- Maximum 2 photos par village
- Les villages doivent appartenir à un arrondissement existant
- Les POI peuvent être optionnellement liés à un village
- Les notifications sont programmées automatiquement

### Contraintes de Sécurité
- RLS activé sur toutes les tables sensibles
- Authentification requise pour les modifications
- Audit automatique des actions administratives
- Sessions avec expiration automatique

## Performance et Monitoring

### Métriques Importantes
- Nombre total de villages : ~30,000 attendus
- Nombre de POI : ~100,000 attendus
- Requêtes spatiales optimisées avec index GiST
- Recherche textuelle avec index trigram

### Maintenance
- Vacuum automatique PostgreSQL
- Réindexation périodique des index spatiaux
- Nettoyage des sessions expirées
- Archivage des logs d'audit anciens

## Sauvegardes et Récupération

### Stratégie de Sauvegarde
- Sauvegardes automatiques Supabase (quotidiennes)
- Export périodique des données critiques
- Réplication en temps réel (Supabase)
- Point de restauration (PITR) disponible

### Plan de Récupération
- RTO (Recovery Time Objective) : < 4 heures
- RPO (Recovery Point Objective) : < 1 heure
- Tests de récupération mensuels
- Documentation des procédures de restauration