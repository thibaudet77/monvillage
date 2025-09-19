# Schéma de Base de Données Supabase Actuel - MonVillage

## Vue d'ensemble

Base de données PostgreSQL avec extension PostGIS hébergée sur Supabase.
**Système de coordonnées** : WGS84 (SRID 4326)

## Tables Existantes

### 1. users (Supabase Auth)
Table système Supabase pour l'authentification des utilisateurs.

### 2. admin_profiles
Profils administrateurs avec permissions étendues.

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

-- RLS activé
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
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

-- Index spatial
CREATE INDEX sidx_regions_geom ON regions USING gist (geom);
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

-- Index spatial
CREATE INDEX sidx_departements_geom ON departements USING gist (geom);

-- Clé étrangère
ALTER TABLE departements 
ADD CONSTRAINT departements_new_id_region_fkey 
FOREIGN KEY (id_region) REFERENCES regions(id_region);
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

-- Index spatial
CREATE INDEX sidx_arrondissements_geom ON arrondissements USING gist (geom);

-- Clé étrangère
ALTER TABLE arrondissements 
ADD CONSTRAINT arrondissements_new_id_departement_fkey 
FOREIGN KEY (id_departement) REFERENCES departements(id_departement);
```

### 6. villages
Table principale des villages du Cameroun.

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

-- RLS activé
ALTER TABLE villages ENABLE ROW LEVEL SECURITY;

-- Index spatiaux
CREATE INDEX idx_villages_geom ON villages USING gist (geom);
CREATE INDEX idx_villages_centroid ON villages USING gist (centroid);

-- Index textuels (trigram pour recherche)
CREATE INDEX idx_villages_name_trgm ON villages USING gin (village_name gin_trgm_ops);
CREATE INDEX idx_villages_chief_name_trgm ON villages USING gin (chief_name gin_trgm_ops);

-- Index fonctionnels
CREATE INDEX idx_villages_active ON villages (is_active) WHERE is_active = true;
CREATE INDEX idx_villages_arrondissement_id ON villages (id_arrondissement);

-- Clés étrangères
ALTER TABLE villages ADD CONSTRAINT villages_arrondissement_fkey 
FOREIGN KEY (id_arrondissement) REFERENCES arrondissements(id_arrondissement) ON DELETE CASCADE;
ALTER TABLE villages ADD CONSTRAINT villages_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE villages ADD CONSTRAINT villages_updated_by_fkey 
FOREIGN KEY (updated_by) REFERENCES users(id);

-- Politiques RLS
CREATE POLICY "Villages are viewable by everyone" ON villages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Villages are editable by authenticated users" ON villages
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL);
```

### 7. village_photos
Photos des villages (maximum 2 par village).

```sql
CREATE TABLE village_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  village_id uuid NOT NULL REFERENCES villages(id) ON DELETE CASCADE,
  photo_url text NOT NULL,
  photo_name varchar(255),
  photo_order integer DEFAULT 1 CHECK (photo_order IN (1, 2)),
  file_size integer,
  uploaded_at timestamptz DEFAULT now(),
  uploaded_by uuid REFERENCES users(id)
);

-- RLS activé
ALTER TABLE village_photos ENABLE ROW LEVEL SECURITY;

-- Contraintes
ALTER TABLE village_photos ADD CONSTRAINT unique_village_photo_order 
UNIQUE (village_id, photo_order);
ALTER TABLE village_photos ADD CONSTRAINT village_photos_photo_order_check 
CHECK (photo_order = ANY (ARRAY[1, 2]));

-- Index
CREATE INDEX idx_village_photos_village_id ON village_photos (village_id);

-- Clés étrangères
ALTER TABLE village_photos ADD CONSTRAINT village_photos_village_fkey 
FOREIGN KEY (village_id) REFERENCES villages(id) ON DELETE CASCADE;
ALTER TABLE village_photos ADD CONSTRAINT village_photos_uploaded_by_fkey 
FOREIGN KEY (uploaded_by) REFERENCES users(id);

-- Politiques RLS
CREATE POLICY "Village photos are viewable by everyone" ON village_photos
  FOR SELECT USING (
    village_id IN (
      SELECT id FROM villages WHERE is_active = true
    )
  );

CREATE POLICY "Village photos are editable by authenticated users" ON village_photos
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL);
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

-- RLS activé
ALTER TABLE poi ENABLE ROW LEVEL SECURITY;

-- Index spatiaux
CREATE INDEX idx_poi_geom ON poi USING gist (geom);

-- Index textuels
CREATE INDEX idx_poi_name_trgm ON poi USING gin (name gin_trgm_ops);

-- Index fonctionnels
CREATE INDEX idx_poi_type ON poi (type) WHERE is_active = true;
CREATE INDEX idx_poi_village_id ON poi (village_id);

-- Clés étrangères
ALTER TABLE poi ADD CONSTRAINT poi_village_fkey 
FOREIGN KEY (village_id) REFERENCES villages(id) ON DELETE SET NULL;
ALTER TABLE poi ADD CONSTRAINT poi_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES users(id);

-- Politiques RLS
CREATE POLICY "POI are viewable by everyone" ON poi
  FOR SELECT USING (is_active = true);

CREATE POLICY "POI are editable by authenticated users" ON poi
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL);
```

### 9. poi_types
Configuration des types de POI.

```sql
CREATE TABLE poi_types (
  type varchar(100) PRIMARY KEY,
  label varchar(255) NOT NULL,
  icon varchar(100),
  color varchar(7),
  description text,
  is_active boolean DEFAULT true
);

-- Données par défaut
INSERT INTO poi_types (type, label, icon, color, description) VALUES
('school', 'École', 'school', '#4CAF50', 'Établissement scolaire'),
('hospital', 'Hôpital', 'hospital', '#F44336', 'Établissement de santé'),
('market', 'Marché', 'store', '#FF9800', 'Marché ou commerce'),
('church', 'Église', 'church', '#9C27B0', 'Lieu de culte chrétien'),
('mosque', 'Mosquée', 'mosque', '#009688', 'Lieu de culte musulman'),
('government', 'Administration', 'government', '#2196F3', 'Bâtiment administratif'),
('water', 'Point d''eau', 'water', '#00BCD4', 'Source, puits, forage'),
('transport', 'Transport', 'bus', '#607D8B', 'Gare, arrêt de bus');
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

-- RLS activé
ALTER TABLE geonames ENABLE ROW LEVEL SECURITY;

-- Index spatiaux
CREATE INDEX idx_geonames_geom ON geonames USING gist (geom);

-- Index textuels
CREATE INDEX idx_geonames_nom_trgm ON geonames USING gin (nom gin_trgm_ops);

-- Clé étrangère
ALTER TABLE geonames ADD CONSTRAINT geonames_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES users(id);

-- Politiques RLS
CREATE POLICY "Geonames are viewable by everyone" ON geonames
  FOR SELECT USING (is_active = true);

CREATE POLICY "Geonames are editable by authenticated users" ON geonames
  FOR ALL TO authenticated USING (auth.uid() IS NOT NULL);
```

### 11. payments
Gestion des paiements pour impressions.

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

-- RLS activé
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Index
CREATE INDEX idx_payments_transaction_id ON payments (transaction_id);
CREATE INDEX idx_payments_status ON payments (status);
```

### 12. village_notifications
Système de notifications pour anniversaires.

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

-- RLS activé
ALTER TABLE village_notifications ENABLE ROW LEVEL SECURITY;

-- Index
CREATE INDEX idx_village_notifications_village_id ON village_notifications (village_id);
CREATE INDEX idx_village_notifications_scheduled_date ON village_notifications (scheduled_date);
CREATE INDEX idx_village_notifications_status ON village_notifications (status);

-- Clé étrangère
ALTER TABLE village_notifications ADD CONSTRAINT village_notifications_village_fkey 
FOREIGN KEY (village_id) REFERENCES villages(id) ON DELETE CASCADE;
```

### 13. audit_logs
Journalisation des actions administratives.

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

-- Index
CREATE INDEX idx_audit_logs_user_date ON audit_logs (user_id, created_at);
CREATE INDEX idx_audit_logs_table_name ON audit_logs (table_name);

-- Clé étrangère
ALTER TABLE audit_logs ADD CONSTRAINT audit_logs_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES users(id);
```

### 14. user_sessions
Gestion des sessions utilisateurs.

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

-- Index
CREATE INDEX idx_user_sessions_user_id ON user_sessions (user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions (session_token);

-- Clé étrangère
ALTER TABLE user_sessions ADD CONSTRAINT user_sessions_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

### 15. data_imports
Historique des imports de données.

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

-- Clé étrangère
ALTER TABLE data_imports ADD CONSTRAINT data_imports_imported_by_fkey 
FOREIGN KEY (imported_by) REFERENCES users(id);
```

### 16. system_config
Configuration système de l'application.

```sql
CREATE TABLE system_config (
  key varchar(100) PRIMARY KEY,
  value text NOT NULL,
  description text,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES users(id)
);

-- Clé étrangère
ALTER TABLE system_config ADD CONSTRAINT system_config_updated_by_fkey 
FOREIGN KEY (updated_by) REFERENCES users(id);
```

### 17. spatial_ref_sys
Table système PostGIS pour les systèmes de référence spatiale.

```sql
-- Table système PostGIS (ne pas modifier)
-- Contient les définitions des systèmes de coordonnées
```

## Vues Métier

### villages_complete
Vue complète avec informations administratives.

```sql
CREATE VIEW villages_complete AS
SELECT 
  v.id,
  v.village_name,
  v.chief_name,
  v.email,
  v.telephone,
  v.area_hectares,
  v.population,
  v.geom,
  v.centroid,
  v.is_active,
  v.created_at,
  v.updated_at,
  v.id_arrondissement,
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
  p.id,
  p.name,
  p.type,
  p.description,
  p.geom,
  p.is_active,
  p.created_at,
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

### geography_columns et geometry_columns
Vues système PostGIS pour les métadonnées spatiales.

## Fonctions et Triggers

### 1. Calculs Automatiques des Villages

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

### 2. Notifications d'Anniversaire

```sql
-- Fonction pour programmer les notifications
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

### 3. Fonctions Système PostGIS

```sql
-- Fonctions système PostGIS disponibles
-- postgis_cache_bbox() - Cache des bounding boxes
-- checkauthtrigger() - Vérification d'autorisation
```

## Extensions PostgreSQL Activées

```sql
-- Extensions spatiales
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Extension pour recherche textuelle
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## Agrégats Spatiaux Disponibles

- **st_union** - Union de géométries
- **st_collect** - Collection de géométries  
- **st_extent** - Boîte englobante
- **st_makeline** - Création de lignes
- **st_polygonize** - Création de polygones
- **st_clusterwithin** - Clustering spatial
- **st_asmvt** - Export Mapbox Vector Tiles
- **st_asgeobuf** - Export GeoBuf
- **st_asflatgeobuf** - Export FlatGeoBuf

## Statistiques Actuelles

- **Tables** : 17 tables (dont 7 système PostGIS)
- **Vues** : 4 vues métier
- **Index** : 25+ index optimisés
- **Triggers** : 2 triggers fonctionnels
- **Politiques RLS** : 8 politiques de sécurité
- **Contraintes** : 15+ contraintes d'intégrité

## Configuration de Sécurité

### Row Level Security (RLS)
- ✅ **Activé** sur toutes les tables sensibles
- ✅ **Lecture publique** pour données actives
- ✅ **Modification** réservée aux utilisateurs authentifiés

### Politiques par Défaut
- **Données publiques** : Villages, POI, Geonames actifs
- **Données protégées** : Profils admin, logs d'audit
- **Données utilisateur** : Sessions, imports

## Maintenance et Performance

### Index Optimisés
- **Spatiaux (GiST)** : Pour requêtes géographiques
- **Textuels (GIN)** : Pour recherche full-text
- **Fonctionnels** : Pour filtrage par statut

### Contraintes d'Intégrité
- **Clés étrangères** : Relations entre tables
- **Check constraints** : Validation des valeurs
- **Unique constraints** : Unicité des données

Cette structure supporte environ **30,000 villages** et **100,000 POI** avec des performances optimales grâce aux index spatiaux et textuels.