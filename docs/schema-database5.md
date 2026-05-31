-- ============================================================================
-- SCHÉMA BASE DE DONNÉES MONVILLAGE - VERSION ACTUALISÉE
-- Application de cartographie des villages du Cameroun
-- ============================================================================

-- Extension PostGIS pour les données géospatiales
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================================================
-- 1. TABLES GÉOGRAPHIQUES ADMINISTRATIVES
-- ============================================================================

-- Table des régions
CREATE TABLE regions (
    id_region SERIAL PRIMARY KEY,
    nom_region VARCHAR(100) NOT NULL,
    code_region VARCHAR(10),
    geom GEOMETRY(MULTIPOLYGON, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Table des départements
CREATE TABLE departements (
    id_departement SERIAL PRIMARY KEY,
    nom_departement VARCHAR(100) NOT NULL,
    code_departement VARCHAR(10),
    id_region INTEGER REFERENCES regions(id_region),
    geom GEOMETRY(MULTIPOLYGON, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Table des arrondissements
CREATE TABLE arrondissements (
    id_arrondissement SERIAL PRIMARY KEY,
    nom_arrondissement VARCHAR(100) NOT NULL,
    code_arrondissement VARCHAR(10),
    id_departement INTEGER REFERENCES departements(id_departement),
    geom GEOMETRY(MULTIPOLYGON, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- ============================================================================
-- 2. TABLE VILLAGES (COEUR DE L'APPLICATION)
-- ============================================================================

CREATE TABLE villages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    village_name VARCHAR(200) NOT NULL,
    id_arrondissement INTEGER REFERENCES arrondissements(id_arrondissement),
    
    -- Informations du chef de village
    chief_name VARCHAR(200),
    chief_photo_url TEXT,
    chief_start_date DATE,
    
    -- Contacts et population
    email VARCHAR(255),
    telephone VARCHAR(20),
    population INTEGER,
    
    -- Géométrie du village
    geom GEOMETRY(MULTIPOLYGON, 4326) NOT NULL,
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    is_active BOOLEAN DEFAULT true,
    
    -- Contraintes
    CONSTRAINT valid_email CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' OR email IS NULL),
    CONSTRAINT valid_population CHECK (population > 0 OR population IS NULL)
);

-- ============================================================================
-- 3. TABLE DESCRIPTIONS DÉTAILLÉES DES VILLAGES (NOUVEAU)
-- ============================================================================

CREATE TABLE village_descriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    village_id UUID REFERENCES villages(id) ON DELETE CASCADE,
    
    -- 1. Présentation générale
    histoire_origine TEXT,
    description_limites TEXT,
    importance_region TEXT,
    
    -- 2. Culture & Traditions
    danses_musiques_rites TEXT,
    gastronomie_locale TEXT,
    fetes_traditionnelles TEXT,
    
    -- 3. Population détaillée
    structure_demographique TEXT,
    groupes_ethniques TEXT,
    
    -- 4. Économie locale
    activites_generatrices TEXT,
    produits_terroir TEXT,
    
    -- 5. Infrastructures
    infrastructures_scolaires TEXT,
    infrastructures_sante TEXT,
    infrastructures_routes TEXT,
    acces_electricite_eau TEXT,
    
    -- 6. Tourisme & Attractions
    sites_naturels TEXT,
    sites_culturels TEXT,
    
    -- 7. Personnalités
    personnalites_originaires TEXT,
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    is_published BOOLEAN DEFAULT false,
    
    -- Contrainte : une seule description par village
    UNIQUE(village_id)
);

-- ============================================================================
-- 4. TABLE PHOTOS DES VILLAGES
-- ============================================================================

CREATE TABLE village_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    village_id UUID REFERENCES villages(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    photo_order INTEGER DEFAULT 1,
    file_size INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contrainte : maximum 2 photos par village
    CONSTRAINT valid_photo_order CHECK (photo_order BETWEEN 1 AND 2)
);

-- ============================================================================
-- 5. TABLES POINTS D'INTÉRÊT (POI)
-- ============================================================================

CREATE TABLE poi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    village_id UUID REFERENCES villages(id) ON DELETE SET NULL,
    geom GEOMETRY(POINT, 4326) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    is_active BOOLEAN DEFAULT true,
    
    -- Types de POI autorisés
    CONSTRAINT valid_poi_type CHECK (type IN (
        'school', 'hospital', 'market', 'church', 'mosque', 
        'government', 'water', 'transport', 
        'chefferie_1', 'chefferie_2', 'chefferie_3'
    ))
);

-- ============================================================================
-- 6. TABLE GÉONYMES
-- ============================================================================

CREATE TABLE geonames (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    geom GEOMETRY(POINT, 4326) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    is_active BOOLEAN DEFAULT true,
    
    -- Types de géonymes autorisés
    CONSTRAINT valid_geoname_type CHECK (type IN (
        'montagne', 'colline', 'riviere', 'lac', 'foret', 
        'plateau', 'vallee', 'autre'
    ))
);

-- ============================================================================
-- 7. TABLES ADMINISTRATIVES
-- ============================================================================

-- Profils administrateurs
CREATE TABLE admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(200),
    role VARCHAR(50) DEFAULT 'admin',
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Historique des paiements (pour l'export de cartes)
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    amount INTEGER NOT NULL, -- En centimes (XAF)
    currency VARCHAR(3) DEFAULT 'XAF',
    status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_type VARCHAR(50), -- 'card', 'mobilemoney', 'ussd'
    
    -- Données Flutterwave
    flutterwave_tx_ref VARCHAR(100),
    flutterwave_tx_id VARCHAR(100),
    
    -- Détails de l'impression
    print_format VARCHAR(10),
    print_title TEXT,
    map_bounds JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT valid_status CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
    CONSTRAINT valid_currency CHECK (currency IN ('XAF', 'EUR', 'USD')),
    CONSTRAINT valid_amount CHECK (amount > 0)
);

-- ============================================================================
-- 8. INDEX D'OPTIMISATION
-- ============================================================================

-- Index géospatiaux
CREATE INDEX idx_regions_geom ON regions USING GIST (geom);
CREATE INDEX idx_departements_geom ON departements USING GIST (geom);
CREATE INDEX idx_arrondissements_geom ON arrondissements USING GIST (geom);
CREATE INDEX idx_villages_geom ON villages USING GIST (geom);
CREATE INDEX idx_poi_geom ON poi USING GIST (geom);
CREATE INDEX idx_geonames_geom ON geonames USING GIST (geom);

-- Index de performance
CREATE INDEX idx_villages_active ON villages (is_active);
CREATE INDEX idx_villages_arrondissement ON villages (id_arrondissement);
CREATE INDEX idx_village_descriptions_village_id ON village_descriptions (village_id);
CREATE INDEX idx_village_descriptions_published ON village_descriptions (is_published);
CREATE INDEX idx_village_photos_village_id ON village_photos (village_id);
CREATE INDEX idx_poi_active ON poi (is_active);
CREATE INDEX idx_poi_type ON poi (type);
CREATE INDEX idx_poi_village ON poi (village_id);
CREATE INDEX idx_geonames_active ON geonames (is_active);
CREATE INDEX idx_geonames_type ON geonames (type);

-- Index textuels pour la recherche
CREATE INDEX idx_villages_name_trgm ON villages USING gin (village_name gin_trgm_ops);
CREATE INDEX idx_villages_chief_trgm ON villages USING gin (chief_name gin_trgm_ops);

-- ============================================================================
-- 9. POLITIQUES DE SÉCURITÉ (RLS - ROW LEVEL SECURITY)
-- ============================================================================

-- Activer RLS sur les tables sensibles
ALTER TABLE villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE poi ENABLE ROW LEVEL SECURITY;
ALTER TABLE geonames ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique
CREATE POLICY "Public read access for active villages" 
ON villages FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for published descriptions" 
ON village_descriptions FOR SELECT USING (is_published = true);

CREATE POLICY "Public read access for village photos" 
ON village_photos FOR SELECT USING (
    EXISTS (SELECT 1 FROM villages WHERE villages.id = village_photos.village_id AND villages.is_active = true)
);

CREATE POLICY "Public read access for active poi" 
ON poi FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for active geonames" 
ON geonames FOR SELECT USING (is_active = true);

-- Politiques administrateur
CREATE POLICY "Admin full access villages" 
ON villages FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access descriptions" 
ON village_descriptions FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access photos" 
ON village_photos FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access poi" 
ON poi FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access geonames" 
ON geonames FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin profiles self access" 
ON admin_profiles FOR ALL USING (auth.uid() = id);

-- ============================================================================
-- 10. VUES UTILES
-- ============================================================================

-- Vue complète des villages avec toutes les informations
CREATE OR REPLACE VIEW villages_with_full_info AS
SELECT 
    v.id,
    v.village_name,
    v.chief_name,
    v.chief_photo_url,
    v.chief_start_date,
    v.email,
    v.telephone,
    v.population,
    v.geom,
    v.is_active,
    v.created_at,
    v.updated_at,
    a.nom_arrondissement,
    a.id_arrondissement,
    
    -- Descriptions détaillées
    vd.histoire_origine,
    vd.description_limites,
    vd.importance_region,
    vd.danses_musiques_rites,
    vd.gastronomie_locale,
    vd.fetes_traditionnelles,
    vd.structure_demographique,
    vd.groupes_ethniques,
    vd.activites_generatrices,
    vd.produits_terroir,
    vd.infrastructures_scolaires,
    vd.infrastructures_sante,
    vd.infrastructures_routes,
    vd.acces_electricite_eau,
    vd.sites_naturels,
    vd.sites_culturels,
    vd.personnalites_originaires,
    vd.is_published as description_published,
    
    -- Photos du village (JSON agrégé, max 2)
    (SELECT json_agg(
        json_build_object(
            'id', vp.id,
            'photo_url', vp.photo_url,
            'photo_order', vp.photo_order
        ) ORDER BY vp.photo_order
    ) FROM village_photos vp WHERE vp.village_id = v.id LIMIT 2) as village_photos_json,
    
    -- Calcul automatique de la superficie en hectares
    CASE 
        WHEN ST_GeometryType(v.geom) IS NOT NULL 
        THEN ROUND((ST_Area(ST_Transform(v.geom, 3857)) / 10000)::numeric, 2)
        ELSE NULL 
    END as area_hectares,
    
    -- Nombre de photos
    (SELECT COUNT(*) FROM village_photos vp WHERE vp.village_id = v.id) as photos_count

FROM villages v
LEFT JOIN arrondissements a ON v.id_arrondissement = a.id_arrondissement
LEFT JOIN village_descriptions vd ON v.id = vd.village_id AND vd.is_published = true
WHERE v.is_active = true;

-- Vue POI avec localisation
CREATE OR REPLACE VIEW poi_with_location AS
SELECT 
    p.*,
    v.village_name,
    a.nom_arrondissement,
    CASE p.type
        WHEN 'school' THEN 'École'
        WHEN 'hospital' THEN 'Hôpital'
        WHEN 'market' THEN 'Marché'
        WHEN 'church' THEN 'Église'
        WHEN 'mosque' THEN 'Mosquée'
        WHEN 'government' THEN 'Administration'
        WHEN 'water' THEN 'Point d''eau'
        WHEN 'transport' THEN 'Transport'
        WHEN 'chefferie_1' THEN 'Chefferie 1er degré'
        WHEN 'chefferie_2' THEN 'Chefferie 2ème degré'
        WHEN 'chefferie_3' THEN 'Chefferie 3ème degré'
        ELSE p.type
    END as type_label
FROM poi p
LEFT JOIN villages v ON p.village_id = v.id
LEFT JOIN arrondissements a ON v.id_arrondissement = a.id_arrondissement
WHERE p.is_active = true;

-- ============================================================================
-- 11. FONCTIONS UTILES
-- ============================================================================

-- Fonction pour calculer la distance entre deux points
CREATE OR REPLACE FUNCTION calculate_distance(
    lat1 DOUBLE PRECISION, 
    lng1 DOUBLE PRECISION, 
    lat2 DOUBLE PRECISION, 
    lng2 DOUBLE PRECISION
) RETURNS DOUBLE PRECISION AS $$
BEGIN
    RETURN ST_Distance(
        ST_Transform(ST_SetSRID(ST_MakePoint(lng1, lat1), 4326), 3857),
        ST_Transform(ST_SetSRID(ST_MakePoint(lng2, lat2), 4326), 3857)
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Fonction de recherche de villages
CREATE OR REPLACE FUNCTION search_villages(search_term TEXT)
RETURNS TABLE(
    id UUID,
    village_name VARCHAR,
    chief_name VARCHAR,
    nom_arrondissement VARCHAR,
    similarity REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.village_name,
        v.chief_name,
        a.nom_arrondissement,
        GREATEST(
            similarity(v.village_name, search_term),
            similarity(COALESCE(v.chief_name, ''), search_term),
            similarity(a.nom_arrondissement, search_term)
        ) as sim
    FROM villages v
    LEFT JOIN arrondissements a ON v.id_arrondissement = a.id_arrondissement
    WHERE v.is_active = true
    AND (
        v.village_name ILIKE '%' || search_term || '%'
        OR v.chief_name ILIKE '%' || search_term || '%'
        OR a.nom_arrondissement ILIKE '%' || search_term || '%'
        OR similarity(v.village_name, search_term) > 0.3
        OR similarity(COALESCE(v.chief_name, ''), search_term) > 0.3
        OR similarity(a.nom_arrondissement, search_term) > 0.3
    )
    ORDER BY sim DESC, v.village_name
    LIMIT 20;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 12. TRIGGERS ET FONCTIONS DE MAINTENANCE
-- ============================================================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_villages_updated_at 
    BEFORE UPDATE ON villages FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_village_descriptions_updated_at 
    BEFORE UPDATE ON village_descriptions FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_poi_updated_at 
    BEFORE UPDATE ON poi FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_geonames_updated_at 
    BEFORE UPDATE ON geonames FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- 13. DONNÉES DE CONFIGURATION
-- ============================================================================

-- Types de POI avec leurs icônes et couleurs (pour référence)
COMMENT ON COLUMN poi.type IS 'Types: school(École), hospital(Hôpital), market(Marché), church(Église), mosque(Mosquée), government(Administration), water(Point eau), transport(Transport), chefferie_1/2/3(Chefferies)';

-- Configuration des photos
COMMENT ON TABLE village_photos IS 'Maximum 2 photos par village, stockées sur Supabase Storage';

-- Configuration des descriptions
COMMENT ON TABLE village_descriptions IS 'Descriptions détaillées selon 7 sections thématiques, avec système de publication';

-- ============================================================================
-- FIN DU SCHÉMA
-- ============================================================================

-- Commandes pour vérifier l'installation
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
-- SELECT schemaname,tablename,attname,typname FROM pg_catalog.pg_attribute a JOIN pg_catalog.pg_type t ON a.atttypid = t.oid JOIN pg_catalog.pg_class c ON a.attrelid = c.oid JOIN pg_catalog.pg_namespace n ON c.relnamespace = n.oid WHERE n.nspname = 'public' AND c.relname = 'villages';