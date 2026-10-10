-- ============================================================
-- TABLE village_ponctuel - Structure seule (données via Mapbox)
-- Exécuter dans: Supabase Dashboard > SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS village_ponctuel (
    id serial PRIMARY KEY,
    gid integer UNIQUE,
    name varchar(255),
    population integer,
    arrondissement_name varchar(255),
    geom geometry(Point, 4326),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    created_by uuid REFERENCES auth.users(id),
    updated_by uuid REFERENCES auth.users(id)
);

CREATE INDEX IF NOT EXISTS idx_village_ponctuel_geom ON village_ponctuel USING gist (geom);

-- RLS
ALTER TABLE village_ponctuel ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "village_ponctuel_select_public" ON village_ponctuel;
CREATE POLICY "village_ponctuel_select_public" ON village_ponctuel
    FOR SELECT TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "village_ponctuel_insert_admin" ON village_ponctuel;
CREATE POLICY "village_ponctuel_insert_admin" ON village_ponctuel
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "village_ponctuel_update_admin" ON village_ponctuel;
CREATE POLICY "village_ponctuel_update_admin" ON village_ponctuel
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "village_ponctuel_delete_admin" ON village_ponctuel;
CREATE POLICY "village_ponctuel_delete_admin" ON village_ponctuel
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- Vérification
SELECT 'Table village_ponctuel créée avec RLS' AS status;
