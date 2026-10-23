-- ============================================================
-- UGANDA TABLES - MonVillage Multi-Country Extension
-- Creates: ug_regions, ug_districts, ug_villages, ug_village_ponctuel
-- Idempotent: safe to run multiple times
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================

-- ============================================================
-- 0. EXTENSIONS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ============================================================
-- 1. TABLE ug_regions
-- Uganda's 4 administrative regions (Central, Eastern, Northern, Western)
-- ============================================================

CREATE TABLE IF NOT EXISTS ug_regions (
    id serial PRIMARY KEY,
    osm_id varchar(20),
    name varchar(255) NOT NULL,
    geom geometry(MultiPolygon, 4326),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE ug_regions IS 'Administrative regions of Uganda (level 1 division)';

CREATE INDEX IF NOT EXISTS idx_ug_regions_geom ON ug_regions USING gist (geom);
CREATE INDEX IF NOT EXISTS idx_ug_regions_name_trgm ON ug_regions USING gin (name gin_trgm_ops);

-- ============================================================
-- 2. TABLE ug_districts
-- Uganda's 135+ districts, each belonging to a region
-- ============================================================

CREATE TABLE IF NOT EXISTS ug_districts (
    id serial PRIMARY KEY,
    osm_id varchar(20),
    name varchar(255) NOT NULL,
    region_id integer REFERENCES ug_regions(id),
    geom geometry(MultiPolygon, 4326),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE ug_districts IS 'Administrative districts of Uganda (level 2 division), linked to ug_regions';

CREATE INDEX IF NOT EXISTS idx_ug_districts_geom ON ug_districts USING gist (geom);
CREATE INDEX IF NOT EXISTS idx_ug_districts_name_trgm ON ug_districts USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_ug_districts_region_id ON ug_districts (region_id);

-- ============================================================
-- 3. TABLE ug_villages
-- Village polygons with district linkage
-- ============================================================

CREATE TABLE IF NOT EXISTS ug_villages (
    id serial PRIMARY KEY,
    osm_id varchar(20),
    name varchar(255),
    district_id integer REFERENCES ug_districts(id),
    district_name varchar(255),  -- denormalized for quick access
    geom geometry(MultiPolygon, 4326),
    population integer,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

COMMENT ON TABLE ug_villages IS 'Village polygons of Uganda, linked to ug_districts. district_name is denormalized for performance';

CREATE INDEX IF NOT EXISTS idx_ug_villages_geom ON ug_villages USING gist (geom);
CREATE INDEX IF NOT EXISTS idx_ug_villages_name_trgm ON ug_villages USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_ug_villages_district_id ON ug_villages (district_id);
CREATE INDEX IF NOT EXISTS idx_ug_villages_is_active ON ug_villages (is_active) WHERE is_active = true;

-- ============================================================
-- 4. TABLE ug_village_ponctuel
-- Point-based village/town/city locations (from OSM place nodes)
-- ============================================================

CREATE TABLE IF NOT EXISTS ug_village_ponctuel (
    id serial PRIMARY KEY,
    gid integer,
    osm_id varchar(20),
    name varchar(255),
    type varchar(50),  -- village, town, city, hamlet, suburb, locality, etc.
    district_name varchar(255),
    population integer DEFAULT 0,
    geom geometry(Point, 4326),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    created_by uuid REFERENCES auth.users(id),
    updated_by uuid REFERENCES auth.users(id)
);

COMMENT ON TABLE ug_village_ponctuel IS 'Point locations for Uganda settlements (villages, towns, cities, hamlets, etc.) sourced from OSM place nodes';

CREATE INDEX IF NOT EXISTS idx_ug_village_ponctuel_geom ON ug_village_ponctuel USING gist (geom);
CREATE INDEX IF NOT EXISTS idx_ug_village_ponctuel_name_trgm ON ug_village_ponctuel USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_ug_village_ponctuel_type ON ug_village_ponctuel (type);

-- ============================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================

-- --- Enable RLS on all Uganda tables ---
ALTER TABLE ug_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ug_districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ug_villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ug_village_ponctuel ENABLE ROW LEVEL SECURITY;

-- --- ug_regions RLS ---

DROP POLICY IF EXISTS "ug_regions_select_public" ON ug_regions;
CREATE POLICY "ug_regions_select_public" ON ug_regions
    FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "ug_regions_insert_admin" ON ug_regions;
CREATE POLICY "ug_regions_insert_admin" ON ug_regions
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "ug_regions_update_admin" ON ug_regions;
CREATE POLICY "ug_regions_update_admin" ON ug_regions
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "ug_regions_delete_admin" ON ug_regions;
CREATE POLICY "ug_regions_delete_admin" ON ug_regions
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- ug_districts RLS ---

DROP POLICY IF EXISTS "ug_districts_select_public" ON ug_districts;
CREATE POLICY "ug_districts_select_public" ON ug_districts
    FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "ug_districts_insert_admin" ON ug_districts;
CREATE POLICY "ug_districts_insert_admin" ON ug_districts
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "ug_districts_update_admin" ON ug_districts;
CREATE POLICY "ug_districts_update_admin" ON ug_districts
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "ug_districts_delete_admin" ON ug_districts;
CREATE POLICY "ug_districts_delete_admin" ON ug_districts
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- ug_villages RLS ---

DROP POLICY IF EXISTS "ug_villages_select_public" ON ug_villages;
CREATE POLICY "ug_villages_select_public" ON ug_villages
    FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "ug_villages_insert_admin" ON ug_villages;
CREATE POLICY "ug_villages_insert_admin" ON ug_villages
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "ug_villages_update_admin" ON ug_villages;
CREATE POLICY "ug_villages_update_admin" ON ug_villages
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "ug_villages_delete_admin" ON ug_villages;
CREATE POLICY "ug_villages_delete_admin" ON ug_villages
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- ug_village_ponctuel RLS ---

DROP POLICY IF EXISTS "ug_village_ponctuel_select_public" ON ug_village_ponctuel;
CREATE POLICY "ug_village_ponctuel_select_public" ON ug_village_ponctuel
    FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "ug_village_ponctuel_insert_admin" ON ug_village_ponctuel;
CREATE POLICY "ug_village_ponctuel_insert_admin" ON ug_village_ponctuel
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "ug_village_ponctuel_update_admin" ON ug_village_ponctuel;
CREATE POLICY "ug_village_ponctuel_update_admin" ON ug_village_ponctuel
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "ug_village_ponctuel_delete_admin" ON ug_village_ponctuel;
CREATE POLICY "ug_village_ponctuel_delete_admin" ON ug_village_ponctuel
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- ============================================================
-- 6. VERIFICATION
-- ============================================================

SELECT 'ug_regions' AS table_name, COUNT(*) AS row_count FROM ug_regions
UNION ALL
SELECT 'ug_districts', COUNT(*) FROM ug_districts
UNION ALL
SELECT 'ug_villages', COUNT(*) FROM ug_villages
UNION ALL
SELECT 'ug_village_ponctuel', COUNT(*) FROM ug_village_ponctuel;
