-- ====================================
-- SCHÉMA DE BASE DE DONNÉES SUPABASE
-- ====================================

-- Extensions PostGIS (déjà activées)
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- ====================================
-- TABLES PRINCIPALES
-- ====================================

-- Table des profils administrateurs
CREATE TABLE public.admin_profiles (
    id UUID NOT NULL PRIMARY KEY,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    permissions JSONB DEFAULT '{"read": true, "write": false, "delete": false}',
    two_factor_enabled BOOLEAN DEFAULT false,
    two_factor_secret VARCHAR(255),
    last_login TIMESTAMP WITH TIME ZONE,
    login_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des régions
CREATE TABLE public.regions (
    id_region INTEGER NOT NULL PRIMARY KEY,
    nom_region VARCHAR,
    geom GEOMETRY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des départements
CREATE TABLE public.departements (
    id_departement INTEGER NOT NULL PRIMARY KEY,
    nom_departement VARCHAR,
    id_region INTEGER,
    geom GEOMETRY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des arrondissements
CREATE TABLE public.arrondissements (
    id_arrondissement INTEGER NOT NULL PRIMARY KEY,
    nom_arrondissement VARCHAR(100),
    id_departement INTEGER,
    geom GEOMETRY,
    name CHAR(30),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des villages
CREATE TABLE public.villages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    village_name VARCHAR NOT NULL,
    id_arrondissement INTEGER NOT NULL,
    chief_name VARCHAR,
    email VARCHAR,
    telephone VARCHAR,
    categorie VARCHAR,
    chief_photo_url TEXT,
    chief_start_date DATE,
    chief_photo_uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    population INTEGER,
    area_hectares NUMERIC,
    geom GEOMETRY NOT NULL,
    centroid GEOMETRY,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_by UUID,
    updated_by UUID
);

-- Table des descriptions de villages
CREATE TABLE public.village_descriptions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    village_id UUID,
    description_limites TEXT,
    histoire_origine TEXT,
    importance_region TEXT,
    structure_demographique TEXT,
    groupes_ethniques TEXT,
    activites_generatrices TEXT,
    produits_terroir TEXT,
    infrastructures_scolaires TEXT,
    infrastructures_sante TEXT,
    infrastructures_routes TEXT,
    acces_electricite_eau TEXT,
    sites_naturels TEXT,
    sites_culturels TEXT,
    fetes_traditionnelles TEXT,
    danses_musiques_rites TEXT,
    gastronomie_locale TEXT,
    personnalites_originaires TEXT,
    is_published BOOLEAN DEFAULT false,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des photos de villages
CREATE TABLE public.village_photos (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    village_id UUID NOT NULL,
    photo_url TEXT NOT NULL,
    photo_name VARCHAR,
    photo_order INTEGER DEFAULT 1,
    file_size INTEGER,
    uploaded_by UUID,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des types de POI
CREATE TABLE public.poi_types (
    type VARCHAR NOT NULL PRIMARY KEY,
    label VARCHAR NOT NULL,
    description TEXT,
    icon VARCHAR,
    color VARCHAR,
    is_active BOOLEAN DEFAULT true
);

-- Table des points d'intérêt (POI)
CREATE TABLE public.poi (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    description TEXT,
    geom GEOMETRY NOT NULL,
    village_id UUID,
    is_active BOOLEAN DEFAULT true,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des noms géographiques
CREATE TABLE public.geonames (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nom VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    description TEXT,
    geom GEOMETRY NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des paiements
CREATE TABLE public.payments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    transaction_id VARCHAR NOT NULL,
    amount NUMERIC NOT NULL DEFAULT 2000.00,
    currency VARCHAR DEFAULT 'XAF',
    status VARCHAR DEFAULT 'pending',
    payment_method VARCHAR,
    user_session VARCHAR,
    map_bounds JSONB,
    print_format VARCHAR,
    print_title VARCHAR,
    flutterwave_tx_ref VARCHAR,
    flutterwave_tx_id VARCHAR,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des notifications de villages
CREATE TABLE public.village_notifications (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    village_id UUID NOT NULL,
    notification_type VARCHAR DEFAULT 'anniversary',
    subject VARCHAR,
    message TEXT,
    email_to VARCHAR DEFAULT 'monvillage.cm@gmail.com',
    scheduled_date DATE NOT NULL,
    status VARCHAR DEFAULT 'scheduled',
    sent_date TIMESTAMP WITH TIME ZONE,
    retry_count INTEGER DEFAULT 0,
    last_error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des sessions utilisateur
CREATE TABLE public.user_sessions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    session_token VARCHAR,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des logs d'audit
CREATE TABLE public.audit_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table des imports de données
CREATE TABLE public.data_imports (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    imported_by UUID,
    file_name VARCHAR(255),
    file_type VARCHAR(50),
    data_type VARCHAR(50),
    total_records INTEGER,
    successful_records INTEGER,
    failed_records INTEGER,
    status VARCHAR DEFAULT 'processing',
    error_log TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table de configuration système
CREATE TABLE public.system_config (
    key VARCHAR NOT NULL PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_by UUID,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ====================================
-- VUES MATERIALISÉES
-- ====================================

-- Vue des villages avec informations complètes
CREATE VIEW public.villages_complete AS
SELECT 
    v.*,
    a.nom_arrondissement as arrondissement_name,
    d.nom_departement as departement_name,
    d.id_region,
    r.nom_region as region_name
FROM villages v
LEFT JOIN arrondissements a ON v.id_arrondissement = a.id_arrondissement
LEFT JOIN departements d ON a.id_departement = d.id_departement
LEFT JOIN regions r ON d.id_region = r.id_region;

-- Vue des villages avec informations étendues
CREATE VIEW public.villages_complete_extended AS
SELECT 
    v.*,
    a.nom_arrondissement,
    CASE 
        WHEN v.chief_start_date IS NOT NULL 
        THEN DATE_PART('year', AGE(CURRENT_DATE, v.chief_start_date))::INTEGER
        ELSE NULL 
    END as chief_years_of_service,
    (SELECT COUNT(*) FROM village_photos vp WHERE vp.village_id = v.id) as photos_count
FROM villages v
LEFT JOIN arrondissements a ON v.id_arrondissement = a.id_arrondissement;

-- Vue des POI avec localisation
CREATE VIEW public.poi_with_location AS
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

-- Vue complète des villages avec toutes les informations
CREATE VIEW public.villages_with_full_info AS
SELECT 
    v.*,
    a.nom_arrondissement,
    vd.description_limites,
    vd.histoire_origine,
    vd.importance_region,
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
    vd.fetes_traditionnelles,
    vd.danses_musiques_rites,
    vd.gastronomie_locale,
    vd.personnalites_originaires,
    vd.is_published as description_published,
    json_agg(
        json_build_object(
            'id', vp.id,
            'photo_url', vp.photo_url,
            'photo_name', vp.photo_name,
            'photo_order', vp.photo_order
        ) ORDER BY vp.photo_order
    ) FILTER (WHERE vp.id IS NOT NULL) as village_photos_json
FROM villages v
LEFT JOIN arrondissements a ON v.id_arrondissement = a.id_arrondissement
LEFT JOIN village_descriptions vd ON v.id = vd.village_id
LEFT JOIN village_photos vp ON v.id = vp.village_id
GROUP BY v.id, a.nom_arrondissement, vd.description_limites, vd.histoire_origine, 
         vd.importance_region, vd.structure_demographique, vd.groupes_ethniques,
         vd.activites_generatrices, vd.produits_terroir, vd.infrastructures_scolaires,
         vd.infrastructures_sante, vd.infrastructures_routes, vd.acces_electricite_eau,
         vd.sites_naturels, vd.sites_culturels, vd.fetes_traditionnelles,
         vd.danses_musiques_rites, vd.gastronomie_locale, vd.personnalites_originaires,
         vd.is_published;

-- ====================================
-- POLITIQUES RLS (Row Level Security)
-- ====================================

-- Activer RLS sur les tables principales
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geonames ENABLE ROW LEVEL SECURITY;

-- Politiques pour les profils admin
CREATE POLICY "Admin profiles readable by authenticated users" 
ON public.admin_profiles FOR SELECT 
TO authenticated USING (true);

-- Politiques pour les villages
CREATE POLICY "Villages are viewable by everyone" 
ON public.villages FOR SELECT 
USING (is_active = true);

CREATE POLICY "Villages are editable by authenticated users" 
ON public.villages FOR ALL 
TO authenticated USING (auth.uid() IS NOT NULL);

-- Politiques pour les descriptions de villages
CREATE POLICY "Public read access for published descriptions" 
ON public.village_descriptions FOR SELECT 
USING (is_published = true);

CREATE POLICY "Admin full access" 
ON public.village_descriptions FOR ALL 
TO authenticated USING (auth.role() = 'authenticated');

-- Politiques pour les photos de villages
CREATE POLICY "Village photos are viewable by everyone" 
ON public.village_photos FOR SELECT 
USING (village_id IN (SELECT id FROM villages WHERE is_active = true));

CREATE POLICY "Village photos are editable by authenticated users" 
ON public.village_photos FOR ALL 
TO authenticated USING (auth.uid() IS NOT NULL);

-- Politiques pour les POI
CREATE POLICY "POI are viewable by everyone" 
ON public.poi FOR SELECT 
USING (is_active = true);

CREATE POLICY "POI are editable by authenticated users" 
ON public.poi FOR ALL 
TO authenticated USING (auth.uid() IS NOT NULL);

-- Politiques pour les geonames
CREATE POLICY "Geonames are viewable by everyone" 
ON public.geonames FOR SELECT 
USING (is_active = true);

CREATE POLICY "Geonames are editable by authenticated users" 
ON public.geonames FOR ALL 
TO authenticated USING (auth.uid() IS NOT NULL);

-- ====================================
-- INDEX POUR PERFORMANCE
-- ====================================

-- Index géographiques
CREATE INDEX IF NOT EXISTS idx_villages_geom ON public.villages USING GIST (geom);
CREATE INDEX IF NOT EXISTS idx_villages_centroid ON public.villages USING GIST (centroid);
CREATE INDEX IF NOT EXISTS idx_poi_geom ON public.poi USING GIST (geom);
CREATE INDEX IF NOT EXISTS idx_geonames_geom ON public.geonames USING GIST (geom);
CREATE INDEX IF NOT EXISTS idx_arrondissements_geom ON public.arrondissements USING GIST (geom);
CREATE INDEX IF NOT EXISTS idx_departements_geom ON public.departements USING GIST (geom);
CREATE INDEX IF NOT EXISTS idx_regions_geom ON public.regions USING GIST (geom);

-- Index pour les clés étrangères
CREATE INDEX IF NOT EXISTS idx_villages_arrondissement ON public.villages (id_arrondissement);
CREATE INDEX IF NOT EXISTS idx_arrondissements_departement ON public.arrondissements (id_departement);
CREATE INDEX IF NOT EXISTS idx_departements_region ON public.departements (id_region);
CREATE INDEX IF NOT EXISTS idx_village_descriptions_village ON public.village_descriptions (village_id);
CREATE INDEX IF NOT EXISTS idx_village_photos_village ON public.village_photos (village_id);
CREATE INDEX IF NOT EXISTS idx_poi_village ON public.poi (village_id);

-- Index pour les recherches
CREATE INDEX IF NOT EXISTS idx_villages_name ON public.villages (village_name);
CREATE INDEX IF NOT EXISTS idx_villages_active ON public.villages (is_active);
CREATE INDEX IF NOT EXISTS idx_poi_type ON public.poi (type);
CREATE INDEX IF NOT EXISTS idx_poi_active ON public.poi (is_active);
CREATE INDEX IF NOT EXISTS idx_geonames_type ON public.geonames (type);
