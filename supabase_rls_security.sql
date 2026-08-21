-- ============================================================
-- SCRIPT DE SECURITE RLS - MonVillage (Supabase)
-- Résout l'alerte: "Table publicly accessible / rls_disabled_in_public"
--
-- À exécuter dans: Supabase Dashboard > SQL Editor
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

-- ============================================================
-- 2. TABLES PUBLIQUES (lecture pour tous, écriture pour admins)
--    Visiteurs = anon/authenticated peuvent lire
--    Seuls les admins authentifiés peuvent modifier
-- ============================================================

-- --- VILLAGES ---
DROP POLICY IF EXISTS "villages_select_public" ON villages;
CREATE POLICY "villages_select_public" ON villages
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "villages_insert_admin" ON villages;
CREATE POLICY "villages_insert_admin" ON villages
    FOR INSERT WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "villages_update_admin" ON villages;
CREATE POLICY "villages_update_admin" ON villages
    FOR UPDATE USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "villages_delete_admin" ON villages;
CREATE POLICY "villages_delete_admin" ON villages
    FOR DELETE USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- POI ---
DROP POLICY IF EXISTS "poi_select_public" ON poi;
CREATE POLICY "poi_select_public" ON poi
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "poi_insert_admin" ON poi;
CREATE POLICY "poi_insert_admin" ON poi
    FOR INSERT WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "poi_update_admin" ON poi;
CREATE POLICY "poi_update_admin" ON poi
    FOR UPDATE USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "poi_delete_admin" ON poi;
CREATE POLICY "poi_delete_admin" ON poi
    FOR DELETE USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- POI_TYPES ---
DROP POLICY IF EXISTS "poi_types_select_public" ON poi_types;
CREATE POLICY "poi_types_select_public" ON poi_types
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "poi_types_modify_admin" ON poi_types;
CREATE POLICY "poi_types_modify_admin" ON poi_types
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- GEONAMES ---
DROP POLICY IF EXISTS "geonames_select_public" ON geonames;
CREATE POLICY "geonames_select_public" ON geonames
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "geonames_insert_admin" ON geonames;
CREATE POLICY "geonames_insert_admin" ON geonames
    FOR INSERT WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "geonames_update_admin" ON geonames;
CREATE POLICY "geonames_update_admin" ON geonames
    FOR UPDATE USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "geonames_delete_admin" ON geonames;
CREATE POLICY "geonames_delete_admin" ON geonames
    FOR DELETE USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- VILLAGE_PHOTOS ---
DROP POLICY IF EXISTS "village_photos_select_public" ON village_photos;
CREATE POLICY "village_photos_select_public" ON village_photos
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "village_photos_insert_admin" ON village_photos;
CREATE POLICY "village_photos_insert_admin" ON village_photos
    FOR INSERT WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "village_photos_update_admin" ON village_photos;
CREATE POLICY "village_photos_update_admin" ON village_photos
    FOR UPDATE USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "village_photos_delete_admin" ON village_photos;
CREATE POLICY "village_photos_delete_admin" ON village_photos
    FOR DELETE USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- VILLAGE_DESCRIPTIONS ---
DROP POLICY IF EXISTS "village_descriptions_select_public" ON village_descriptions;
CREATE POLICY "village_descriptions_select_public" ON village_descriptions
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "village_descriptions_insert_admin" ON village_descriptions;
CREATE POLICY "village_descriptions_insert_admin" ON village_descriptions
    FOR INSERT WITH CHECK (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "village_descriptions_update_admin" ON village_descriptions;
CREATE POLICY "village_descriptions_update_admin" ON village_descriptions
    FOR UPDATE USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "village_descriptions_delete_admin" ON village_descriptions;
CREATE POLICY "village_descriptions_delete_admin" ON village_descriptions
    FOR DELETE USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- REGIONS ---
DROP POLICY IF EXISTS "regions_select_public" ON regions;
CREATE POLICY "regions_select_public" ON regions
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "regions_modify_admin" ON regions;
CREATE POLICY "regions_modify_admin" ON regions
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- DEPARTEMENTS ---
DROP POLICY IF EXISTS "departements_select_public" ON departements;
CREATE POLICY "departements_select_public" ON departements
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "departements_modify_admin" ON departements;
CREATE POLICY "departements_modify_admin" ON departements
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- ARRONDISSEMENTS ---
DROP POLICY IF EXISTS "arrondissements_select_public" ON arrondissements;
CREATE POLICY "arrondissements_select_public" ON arrondissements
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "arrondissements_modify_admin" ON arrondissements;
CREATE POLICY "arrondissements_modify_admin" ON arrondissements
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- ============================================================
-- 3. TABLES SENSIBLES (accès restreint)
-- ============================================================

-- --- ADMIN_PROFILES ---
-- Les admins ne peuvent lire que leur propre profil
-- Seul un admin actif peut modifier son propre profil
DROP POLICY IF EXISTS "admin_profiles_select_own" ON admin_profiles;
CREATE POLICY "admin_profiles_select_own" ON admin_profiles
    FOR SELECT USING (auth.uid() = id);

-- Policy pour que le login puisse vérifier si l'utilisateur est admin
DROP POLICY IF EXISTS "admin_profiles_select_auth" ON admin_profiles;
CREATE POLICY "admin_profiles_select_auth" ON admin_profiles
    FOR SELECT USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "admin_profiles_update_own" ON admin_profiles;
CREATE POLICY "admin_profiles_update_own" ON admin_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Seul un admin existant peut gérer les profils admin (pour la page admin)
DROP POLICY IF EXISTS "admin_profiles_all_admin" ON admin_profiles;
CREATE POLICY "admin_profiles_all_admin" ON admin_profiles
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- PAYMENTS ---
-- Les visiteurs peuvent insérer un paiement (flow Flutterwave)
-- Seuls les admins peuvent lire tous les paiements
DROP POLICY IF EXISTS "payments_insert_anyone" ON payments;
CREATE POLICY "payments_insert_anyone" ON payments
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "payments_select_admin" ON payments;
CREATE POLICY "payments_select_admin" ON payments
    FOR SELECT USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

DROP POLICY IF EXISTS "payments_update_admin" ON payments;
CREATE POLICY "payments_update_admin" ON payments
    FOR UPDATE USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- --- USER_SESSIONS ---
-- Les visiteurs anonymes peuvent insérer leur session (tracking)
-- Seuls les admins peuvent lire les sessions
DROP POLICY IF EXISTS "user_sessions_insert_anyone" ON user_sessions;
CREATE POLICY "user_sessions_insert_anyone" ON user_sessions
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "user_sessions_select_admin" ON user_sessions;
CREATE POLICY "user_sessions_select_admin" ON user_sessions
    FOR SELECT USING (
        auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- ============================================================
-- 4. VUES (les vues n'ont pas de RLS directement, elles héritent
--    des policies des tables sous-jacentes via SECURITY INVOKER)
--    Si vos vues sont SECURITY DEFINER, les recréer en INVOKER:
-- ============================================================

-- Vérifier si les vues existent et les recréer en SECURITY INVOKER
-- pour qu'elles respectent le RLS des tables sources.
-- Note: adapter selon la définition exacte de vos vues.

DO $$
BEGIN
    -- villages_complete
    IF EXISTS (SELECT 1 FROM pg_views WHERE viewname = 'villages_complete') THEN
        EXECUTE (
            SELECT 'CREATE OR REPLACE VIEW villages_complete WITH (security_invoker = true) AS ' ||
                   pg_get_viewdef('villages_complete', true)
        );
    END IF;

    -- villages_complete_extended
    IF EXISTS (SELECT 1 FROM pg_views WHERE viewname = 'villages_complete_extended') THEN
        EXECUTE (
            SELECT 'CREATE OR REPLACE VIEW villages_complete_extended WITH (security_invoker = true) AS ' ||
                   pg_get_viewdef('villages_complete_extended', true)
        );
    END IF;

    -- poi_with_location
    IF EXISTS (SELECT 1 FROM pg_views WHERE viewname = 'poi_with_location') THEN
        EXECUTE (
            SELECT 'CREATE OR REPLACE VIEW poi_with_location WITH (security_invoker = true) AS ' ||
                   pg_get_viewdef('poi_with_location', true)
        );
    END IF;
END $$;

-- ============================================================
-- 5. SECURISER LE STORAGE (bucket village-photos)
-- ============================================================

-- Lecture publique des photos
DROP POLICY IF EXISTS "village_photos_bucket_select" ON storage.objects;
CREATE POLICY "village_photos_bucket_select" ON storage.objects
    FOR SELECT USING (bucket_id = 'village-photos');

-- Upload réservé aux admins authentifiés
DROP POLICY IF EXISTS "village_photos_bucket_insert" ON storage.objects;
CREATE POLICY "village_photos_bucket_insert" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'village-photos'
        AND auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- Suppression réservée aux admins
DROP POLICY IF EXISTS "village_photos_bucket_delete" ON storage.objects;
CREATE POLICY "village_photos_bucket_delete" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'village-photos'
        AND auth.uid() IN (SELECT id FROM admin_profiles WHERE is_active = true)
    );

-- ============================================================
-- 6. VERIFICATION FINALE
-- ============================================================

-- Lister toutes les tables avec leur statut RLS
SELECT
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
