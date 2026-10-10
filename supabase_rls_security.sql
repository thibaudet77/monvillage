-- ============================================================
-- FIX RLS COMPLET - MonVillage (Supabase)
-- Script idempotent : safe à exécuter plusieurs fois
-- Exécuter dans: Supabase Dashboard > SQL Editor
-- ============================================================

-- ============================================================
-- 1. ACTIVER RLS SUR TOUTES LES TABLES
-- ============================================================

ALTER TABLE IF EXISTS villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS poi ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS poi_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS geonames ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS village_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS village_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS departements ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS arrondissements ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS village_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS data_imports ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS system_config ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 2. TABLES PUBLIQUES EN LECTURE (anon + authenticated SELECT)
--    Admin seul pour INSERT/UPDATE/DELETE
-- ============================================================

-- --- VILLAGES ---
DROP POLICY IF EXISTS "Villages are viewable by everyone" ON villages;
DROP POLICY IF EXISTS "Villages are editable by authenticated users" ON villages;
DROP POLICY IF EXISTS "villages_select_public" ON villages;
DROP POLICY IF EXISTS "villages_insert_admin" ON villages;
DROP POLICY IF EXISTS "villages_update_admin" ON villages;
DROP POLICY IF EXISTS "villages_delete_admin" ON villages;

CREATE POLICY "villages_select_public" ON villages
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "villages_insert_admin" ON villages
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

CREATE POLICY "villages_update_admin" ON villages
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

CREATE POLICY "villages_delete_admin" ON villages
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- POI ---
DROP POLICY IF EXISTS "POI are viewable by everyone" ON poi;
DROP POLICY IF EXISTS "POI are editable by authenticated users" ON poi;
DROP POLICY IF EXISTS "poi_select_public" ON poi;
DROP POLICY IF EXISTS "poi_insert_admin" ON poi;
DROP POLICY IF EXISTS "poi_update_admin" ON poi;
DROP POLICY IF EXISTS "poi_delete_admin" ON poi;

CREATE POLICY "poi_select_public" ON poi
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "poi_insert_admin" ON poi
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

CREATE POLICY "poi_update_admin" ON poi
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

CREATE POLICY "poi_delete_admin" ON poi
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- POI_TYPES ---
DROP POLICY IF EXISTS "poi_types_select_public" ON poi_types;
DROP POLICY IF EXISTS "poi_types_modify_admin" ON poi_types;

CREATE POLICY "poi_types_select_public" ON poi_types
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "poi_types_modify_admin" ON poi_types
    FOR ALL TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- GEONAMES ---
DROP POLICY IF EXISTS "geonames_select_public" ON geonames;
DROP POLICY IF EXISTS "geonames_insert_admin" ON geonames;
DROP POLICY IF EXISTS "geonames_update_admin" ON geonames;
DROP POLICY IF EXISTS "geonames_delete_admin" ON geonames;

CREATE POLICY "geonames_select_public" ON geonames
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "geonames_insert_admin" ON geonames
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

CREATE POLICY "geonames_update_admin" ON geonames
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

CREATE POLICY "geonames_delete_admin" ON geonames
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- VILLAGE_PHOTOS ---
DROP POLICY IF EXISTS "Village photos are viewable by everyone" ON village_photos;
DROP POLICY IF EXISTS "Village photos are editable by authenticated users" ON village_photos;
DROP POLICY IF EXISTS "village_photos_select_public" ON village_photos;
DROP POLICY IF EXISTS "village_photos_insert_admin" ON village_photos;
DROP POLICY IF EXISTS "village_photos_update_admin" ON village_photos;
DROP POLICY IF EXISTS "village_photos_delete_admin" ON village_photos;

CREATE POLICY "village_photos_select_public" ON village_photos
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "village_photos_insert_admin" ON village_photos
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

CREATE POLICY "village_photos_update_admin" ON village_photos
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

CREATE POLICY "village_photos_delete_admin" ON village_photos
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- VILLAGE_DESCRIPTIONS ---
DROP POLICY IF EXISTS "village_descriptions_select_public" ON village_descriptions;
DROP POLICY IF EXISTS "village_descriptions_insert_admin" ON village_descriptions;
DROP POLICY IF EXISTS "village_descriptions_update_admin" ON village_descriptions;
DROP POLICY IF EXISTS "village_descriptions_delete_admin" ON village_descriptions;

CREATE POLICY "village_descriptions_select_public" ON village_descriptions
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "village_descriptions_insert_admin" ON village_descriptions
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

CREATE POLICY "village_descriptions_update_admin" ON village_descriptions
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

CREATE POLICY "village_descriptions_delete_admin" ON village_descriptions
    FOR DELETE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- REGIONS ---
DROP POLICY IF EXISTS "regions_select_public" ON regions;
DROP POLICY IF EXISTS "regions_modify_admin" ON regions;

CREATE POLICY "regions_select_public" ON regions
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "regions_modify_admin" ON regions
    FOR ALL TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- DEPARTEMENTS ---
DROP POLICY IF EXISTS "departements_select_public" ON departements;
DROP POLICY IF EXISTS "departements_modify_admin" ON departements;

CREATE POLICY "departements_select_public" ON departements
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "departements_modify_admin" ON departements
    FOR ALL TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- ARRONDISSEMENTS ---
DROP POLICY IF EXISTS "arrondissements_select_public" ON arrondissements;
DROP POLICY IF EXISTS "arrondissements_modify_admin" ON arrondissements;

CREATE POLICY "arrondissements_select_public" ON arrondissements
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "arrondissements_modify_admin" ON arrondissements
    FOR ALL TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- ============================================================
-- 3. TABLES SENSIBLES
-- ============================================================

-- --- ADMIN_PROFILES ---
DROP POLICY IF EXISTS "admin_profiles_select_own" ON admin_profiles;
DROP POLICY IF EXISTS "admin_profiles_select_auth" ON admin_profiles;
DROP POLICY IF EXISTS "admin_profiles_update_own" ON admin_profiles;
DROP POLICY IF EXISTS "admin_profiles_all_admin" ON admin_profiles;

CREATE POLICY "admin_profiles_select_auth" ON admin_profiles
    FOR SELECT TO authenticated
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "admin_profiles_update_own" ON admin_profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "admin_profiles_all_admin" ON admin_profiles
    FOR ALL TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- PAYMENTS ---
DROP POLICY IF EXISTS "payments_insert_anyone" ON payments;
DROP POLICY IF EXISTS "payments_select_admin" ON payments;
DROP POLICY IF EXISTS "payments_update_admin" ON payments;

CREATE POLICY "payments_insert_anyone" ON payments
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "payments_select_admin" ON payments
    FOR SELECT TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

CREATE POLICY "payments_update_admin" ON payments
    FOR UPDATE TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- USER_SESSIONS ---
DROP POLICY IF EXISTS "user_sessions_insert_anyone" ON user_sessions;
DROP POLICY IF EXISTS "user_sessions_select_admin" ON user_sessions;

CREATE POLICY "user_sessions_insert_anyone" ON user_sessions
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "user_sessions_select_admin" ON user_sessions
    FOR SELECT TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- ============================================================
-- 4. TABLES DE SUPPORT (admin uniquement)
-- ============================================================

DROP POLICY IF EXISTS "village_notifications_admin" ON village_notifications;
CREATE POLICY "village_notifications_admin" ON village_notifications
    FOR ALL TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "audit_logs_admin" ON audit_logs;
CREATE POLICY "audit_logs_admin" ON audit_logs
    FOR ALL TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "data_imports_admin" ON data_imports;
CREATE POLICY "data_imports_admin" ON data_imports
    FOR ALL TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "system_config_admin" ON system_config;
CREATE POLICY "system_config_admin" ON system_config
    FOR ALL TO authenticated
    USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- ============================================================
-- 5. STORAGE (bucket village-photos)
-- ============================================================

DROP POLICY IF EXISTS "village_photos_bucket_select" ON storage.objects;
CREATE POLICY "village_photos_bucket_select" ON storage.objects
    FOR SELECT TO anon, authenticated
    USING (bucket_id = 'village-photos');

DROP POLICY IF EXISTS "village_photos_bucket_insert" ON storage.objects;
CREATE POLICY "village_photos_bucket_insert" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (
        bucket_id = 'village-photos'
        AND auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "village_photos_bucket_delete" ON storage.objects;
CREATE POLICY "village_photos_bucket_delete" ON storage.objects
    FOR DELETE TO authenticated
    USING (
        bucket_id = 'village-photos'
        AND auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- ============================================================
-- 6. VERIFICATION FINALE
-- ============================================================

SELECT
    t.tablename,
    t.rowsecurity AS rls_on,
    count(p.policyname) AS policies
FROM pg_tables t
LEFT JOIN pg_policies p ON p.tablename = t.tablename AND p.schemaname = t.schemaname
WHERE t.schemaname = 'public'
GROUP BY t.tablename, t.rowsecurity
ORDER BY t.tablename;
