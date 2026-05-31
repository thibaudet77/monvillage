# Documentation Complète - Base de Données Villages du Cameroun

## 📋 Vue d'ensemble

Cette documentation présente le schéma complet de la base de données Supabase pour le projet "Villages du Cameroun". La base de données est conçue pour gérer les informations géographiques, démographiques et culturelles des villages camerounais.

## 🏗️ Architecture de la Base de Données

### Projet Supabase
- **ID du Projet**: `hrlufnjhwhgddxkpyzst`
- **URL**: `https://hrlufnjhwhgddxkpyzst.supabase.co`
- **Clé Anon**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhybHVmbmpod2hnZGR4a3B5enN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MzIwMzcsImV4cCI6MjA2ODMwODAzN30.0gMYonFDAU84i3boEIKZDK4OQhDrAXXJySGDa80wTZ8`

## 📁 Fichiers Fournis

### 1. `database-schema-complete.sql`
**Schéma principal de la base de données**

Contient :
- ✅ Définition de toutes les tables
- ✅ Index spatiaux et standards
- ✅ Contraintes et clés étrangères
- ✅ Vues optimisées
- ✅ Policies RLS (Row Level Security)
- ✅ Configuration du storage
- ✅ Triggers de base
- ✅ Données initiales

### 2. `database-functions-triggers.sql`
**Fonctions métier et triggers avancés**

Contient :
- ✅ Fonctions géographiques
- ✅ Fonctions de statistiques
- ✅ Système d'audit automatique
- ✅ Validation des données
- ✅ Notifications automatiques
- ✅ Fonctions de maintenance
- ✅ API helpers

### 3. `database-queries-examples.sql`
**Requêtes d'exemple et maintenance**

Contient :
- ✅ Requêtes courantes
- ✅ Analyses géographiques
- ✅ Statistiques par région
- ✅ Monitoring qualité
- ✅ Procédures de maintenance
- ✅ Tests de performance

## 🗄️ Structure des Tables Principales

### Tables Géographiques
```
regions → departements → arrondissements → villages
```

- **`regions`** : Régions administratives du Cameroun
- **`departements`** : Départements par région
- **`arrondissements`** : Arrondissements par département
- **`villages`** : Villages avec géométries et informations de base

### Tables de Contenu
- **`village_descriptions`** : Descriptions détaillées (histoire, culture, infrastructures)
- **`village_photos`** : Photos des villages
- **`poi`** : Points d'intérêt (écoles, hôpitaux, marchés, etc.)
- **`poi_types`** : Types de points d'intérêt
- **`geonames`** : Noms géographiques

### Tables Administratives
- **`admin_profiles`** : Profils des administrateurs
- **`user_sessions`** : Sessions utilisateurs
- **`audit_logs`** : Logs d'audit
- **`payments`** : Gestion des paiements
- **`village_notifications`** : Notifications automatiques
- **`data_imports`** : Suivi des imports de données
- **`system_config`** : Configuration système

## 🔐 Sécurité (RLS Policies)

### Tables Publiques (lecture pour tous)
- `villages` : Villages actifs visibles par tous
- `poi` : Points d'intérêt actifs visibles par tous
- `geonames` : Noms géographiques actifs visibles par tous
- `village_photos` : Photos des villages actifs

### Tables Restreintes
- `village_descriptions` : Seules les descriptions publiées sont visibles
- `admin_profiles` : Accessible aux utilisateurs authentifiés
- `payments` : Pas d'accès direct via API
- `audit_logs` : Pas d'accès direct via API

## 💾 Storage Configuration

### Bucket `village-photos`
- **Public** : Oui
- **Limite de taille** : 10MB par fichier
- **Types MIME autorisés** : `image/jpeg`, `image/jpg`, `image/png`, `image/webp`

### Policies Storage
- Lecture publique pour toutes les photos
- Upload réservé aux utilisateurs authentifiés

## 🛠️ Installation et Utilisation

### 1. Installation du Schéma Principal
```sql
-- Exécuter dans l'ordre :
\i database-schema-complete.sql
```

### 2. Installation des Fonctions
```sql
-- Après le schéma principal :
\i database-functions-triggers.sql
```

### 3. Tests et Exemples
```sql
-- Pour tester et comprendre :
\i database-queries-examples.sql
```

## 📊 Vues Principales

### `villages_complete`
Village avec informations géographiques complètes (région, département, arrondissement)

### `villages_complete_extended`
Inclut le nombre de photos et les années de service du chef

### `villages_with_full_info`
Toutes les informations : village + descriptions + photos (format JSON)

### `poi_with_location`
Points d'intérêt avec informations de localisation complètes

## 🔧 Fonctions Utiles

### Recherche et Géolocalisation
```sql
-- Recherche textuelle
SELECT * FROM public.search_villages('Yaoundé');

-- Villages dans un rayon
SELECT * FROM public.find_villages_in_radius(3.8480, 11.5174, 50);
```

### Statistiques
```sql
-- Statistiques globales
SELECT public.get_global_stats();

-- Statistiques par arrondissement
SELECT public.get_arrondissement_stats(123);
```

### Maintenance
```sql
-- Nettoyer les sessions expirées
SELECT public.cleanup_expired_sessions();

-- Créer les notifications d'anniversaire
SELECT public.create_village_anniversary_notifications();
```

## 📈 Monitoring et Performance

### Tables de Monitoring
- `audit_logs` : Traçabilité des modifications
- `user_sessions` : Sessions actives
- `data_imports` : Suivi des imports

### Index Optimisés
- Index spatiaux sur toutes les géométries
- Index sur les colonnes de recherche fréquente
- Index composites pour les requêtes complexes

## 🚀 Extensions Requises

- **PostGIS** : Données géographiques
- **uuid-ossp** : Génération d'UUID
- **pgcrypto** : Cryptage
- **pg_trgm** : Recherche textuelle

## 📝 Configuration Système

Les paramètres système sont stockés dans `system_config` :
- Nom du site
- Email de contact
- Configuration de la carte
- Montants de paiement
- Clés API externes

## 🔄 Maintenance Régulière

### Quotidienne
- Nettoyage des sessions expirées
- Vérification des notifications

### Hebdomadaire
- Mise à jour des statistiques
- Vérification de l'intégrité des données

### Mensuelle
- Archivage des logs anciens
- Rapport d'activité
- Optimisation des index

## ⚡ Optimisations

### Index Spatiaux
Tous les champs géométriques sont indexés avec GiST pour des performances optimales.

### Vues Matérialisées
Les vues complexes peuvent être matérialisées pour de meilleures performances sur de gros volumes.

### Partitioning
Les tables de logs peuvent être partitionnées par date pour optimiser les requêtes historiques.

## 🧪 Tests de Performance

Des requêtes de test sont fournies dans `database-queries-examples.sql` pour :
- Mesurer les performances des requêtes spatiales
- Tester les fonctions de recherche
- Valider l'efficacité des index

## 📞 Support et Maintenance

### Logs d'Audit
Toutes les modifications importantes sont tracées automatiquement.

### Notifications Automatiques
Le système peut envoyer des notifications pour :
- Anniversaires de prise de fonction des chefs
- Alertes de maintenance
- Rapports périodiques

## 🎯 Cas d'Usage Principaux

1. **Cartographie Interactive** : Affichage des villages avec détails
2. **Recherche Géographique** : Localisation par proximité ou nom
3. **Gestion de Contenu** : Upload photos et descriptions
4. **Analyses Statistiques** : Rapports démographiques
5. **Administration** : Gestion des utilisateurs et audit
6. **API REST** : Accès programmatique aux données

---

## 📧 Contact

Pour toute question sur cette base de données :
- Email : monvillage.cm@gmail.com
- Documentation Supabase : https://supabase.com/docs

---

*Cette documentation couvre l'intégralité du schéma de base de données pour le projet Villages du Cameroun. Tous les scripts SQL sont fournis et prêts à l'emploi.*

 FONCTIONS PERSONNALISÉES ET TRIGGERS AVANCÉS
-- Base de données: Villages du Cameroun
-- ================================================================

-- ================================================================
-- FONCTIONS UTILITAIRES GÉOGRAPHIQUES
-- ================================================================

-- Fonction pour calculer la surface d'un village en hectares
CREATE OR REPLACE FUNCTION public.calculate_village_area(geom geometry)
RETURNS numeric AS $$
BEGIN
    -- Calcul de la surface en mètres carrés puis conversion en hectares
    RETURN ROUND((ST_Area(ST_Transform(geom, 32633)) / 10000.0)::numeric, 2);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Fonction pour calculer le centroïde d'un village
CREATE OR REPLACE FUNCTION public.calculate_village_centroid(geom geometry)
RETURNS geometry AS $$
BEGIN
    RETURN ST_Centroid(geom);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Fonction pour trouver les villages dans un rayon donné
CREATE OR REPLACE FUNCTION public.find_villages_in_radius(
    center_lat double precision,
    center_lng double precision,
    radius_km double precision
)
RETURNS TABLE (
    village_id uuid,
    village_name varchar,
    distance_km double precision
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.village_name,
        ROUND(
            (ST_Distance(
                ST_Transform(ST_SetSRID(ST_MakePoint(center_lng, center_lat), 4326), 32633),
                ST_Transform(v.centroid, 32633)
            ) / 1000.0)::numeric, 2
        )::double precision AS distance_km
    FROM public.villages v
    WHERE v.is_active = true
        AND ST_DWithin(
            ST_Transform(ST_SetSRID(ST_MakePoint(center_lng, center_lat), 4326), 32633),
            ST_Transform(v.centroid, 32633),
            radius_km * 1000
        )
    ORDER BY distance_km;
END;
$$ LANGUAGE plpgsql STABLE;

-- ================================================================
-- FONCTIONS DE STATISTIQUES
-- ================================================================

-- Fonction pour obtenir les statistiques d'un arrondissement
CREATE OR REPLACE FUNCTION public.get_arrondissement_stats(arrondissement_id integer)
RETURNS json AS $$
DECLARE
    result json;
BEGIN
    SELECT json_build_object(
        'total_villages', COUNT(*),
        'total_population', COALESCE(SUM(population), 0),
        'total_area_hectares', COALESCE(ROUND(SUM(area_hectares), 2), 0),
        'villages_with_photos', COUNT(*) FILTER (WHERE photos_count > 0),
        'villages_with_descriptions', COUNT(*) FILTER (WHERE has_description = true)
    ) INTO result
    FROM (
        SELECT 
            v.*,
            COALESCE(p.photos_count, 0) as photos_count,
            CASE WHEN vd.id IS NOT NULL THEN true ELSE false END as has_description
        FROM public.villages v
        LEFT JOIN (
            SELECT village_id, COUNT(*) as photos_count
            FROM public.village_photos
            GROUP BY village_id
        ) p ON v.id = p.village_id
        LEFT JOIN public.village_descriptions vd ON v.id = vd.village_id
        WHERE v.id_arrondissement = arrondissement_id
            AND v.is_active = true
    ) stats;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql STABLE;

-- Fonction pour obtenir les statistiques globales
CREATE OR REPLACE FUNCTION public.get_global_stats()
RETURNS json AS $$
DECLARE
    result json;
BEGIN
    SELECT json_build_object(
        'total_villages', (SELECT COUNT(*) FROM public.villages WHERE is_active = true),
        'total_population', (SELECT COALESCE(SUM(population), 0) FROM public.villages WHERE is_active = true),
        'total_area_hectares', (SELECT COALESCE(ROUND(SUM(area_hectares), 2), 0) FROM public.villages WHERE is_active = true),
        'total_photos', (SELECT COUNT(*) FROM public.village_photos),
        'total_poi', (SELECT COUNT(*) FROM public.poi WHERE is_active = true),
        'regions', (SELECT COUNT(*) FROM public.regions),
        'departements', (SELECT COUNT(*) FROM public.departements),
        'arrondissements', (SELECT COUNT(*) FROM public.arrondissements),
        'villages_with_descriptions', (
            SELECT COUNT(DISTINCT village_id) 
            FROM public.village_descriptions 
            WHERE is_published = true
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql STABLE;

-- ================================================================
-- FONCTIONS DE RECHERCHE
-- ================================================================

-- Fonction de recherche textuelle avancée
CREATE OR REPLACE FUNCTION public.search_villages(search_term text)
RETURNS TABLE (
    village_id uuid,
    village_name varchar,
    arrondissement_name varchar,
    departement_name varchar,
    region_name varchar,
    similarity_score double precision
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        vc.id,
        vc.village_name,
        vc.arrondissement_name,
        vc.departement_name,
        vc.region_name,
        GREATEST(
            similarity(vc.village_name, search_term),
            similarity(vc.arrondissement_name, search_term),
            similarity(vc.departement_name, search_term),
            similarity(vc.region_name, search_term)
        ) as similarity_score
    FROM public.villages_complete vc
    WHERE vc.is_active = true
        AND (
            vc.village_name ILIKE '%' || search_term || '%'
            OR vc.arrondissement_name ILIKE '%' || search_term || '%'
            OR vc.departement_name ILIKE '%' || search_term || '%'
            OR vc.region_name ILIKE '%' || search_term || '%'
            OR similarity(vc.village_name, search_term) > 0.3
        )
    ORDER BY similarity_score DESC, vc.village_name
    LIMIT 50;
END;
$$ LANGUAGE plpgsql STABLE;

-- ================================================================
-- FONCTIONS DE VALIDATION
-- ================================================================

-- Fonction pour valider un email
CREATE OR REPLACE FUNCTION public.is_valid_email(email text)
RETURNS boolean AS $$
BEGIN
    RETURN email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Fonction pour valider un numéro de téléphone camerounais
CREATE OR REPLACE FUNCTION public.is_valid_cameroon_phone(phone text)
RETURNS boolean AS $$
BEGIN
    -- Format: +237XXXXXXXXX ou 237XXXXXXXXX ou 6XXXXXXXX
    RETURN phone ~* '^(\+?237)?[6-9][0-9]{8}$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ================================================================
-- FONCTIONS D'AUDIT ET LOGGING
-- ================================================================

-- Fonction pour enregistrer les modifications dans les logs d'audit
CREATE OR REPLACE FUNCTION public.log_audit_event()
RETURNS trigger AS $$
DECLARE
    old_data jsonb;
    new_data jsonb;
    user_id uuid;
BEGIN
    -- Récupération de l'ID utilisateur (si disponible)
    user_id := auth.uid();
    
    -- Préparation des données selon le type d'opération
    IF TG_OP = 'DELETE' THEN
        old_data := to_jsonb(OLD);
        new_data := NULL;
    ELSIF TG_OP = 'INSERT' THEN
        old_data := NULL;
        new_data := to_jsonb(NEW);
    ELSIF TG_OP = 'UPDATE' THEN
        old_data := to_jsonb(OLD);
        new_data := to_jsonb(NEW);
    END IF;
    
    -- Insertion dans les logs d'audit
    INSERT INTO public.audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_values,
        new_values,
        ip_address
    ) VALUES (
        user_id,
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        old_data,
        new_data,
        inet_client_addr()
    );
    
    -- Retour de l'enregistrement approprié
    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================================
-- FONCTIONS DE NOTIFICATION
-- ================================================================

-- Fonction pour créer des notifications d'anniversaire de villages
CREATE OR REPLACE FUNCTION public.create_village_anniversary_notifications()
RETURNS integer AS $$
DECLARE
    village_record record;
    notification_count integer := 0;
BEGIN
    -- Parcours des villages ayant une date de début de mandat de chef
    FOR village_record IN 
        SELECT 
            id,
            village_name,
            chief_name,
            chief_start_date,
            email
        FROM public.villages
        WHERE chief_start_date IS NOT NULL
            AND is_active = true
            AND EXTRACT(MONTH FROM chief_start_date) = EXTRACT(MONTH FROM CURRENT_DATE)
            AND EXTRACT(DAY FROM chief_start_date) = EXTRACT(DAY FROM CURRENT_DATE)
    LOOP
        -- Création de la notification d'anniversaire
        INSERT INTO public.village_notifications (
            village_id,
            notification_type,
            subject,
            message,
            scheduled_date,
            status
        ) VALUES (
            village_record.id,
            'anniversary',
            'Anniversaire de prise de fonction - ' || village_record.village_name,
            format('Aujourd''hui marque l''anniversaire de la prise de fonction de %s comme chef du village %s. Félicitations !',
                COALESCE(village_record.chief_name, 'le chef'),
                village_record.village_name
            ),
            CURRENT_DATE,
            'scheduled'
        ) ON CONFLICT DO NOTHING;
        
        notification_count := notification_count + 1;
    END LOOP;
    
    RETURN notification_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================================
-- TRIGGERS POUR L'AUDIT
-- ================================================================

-- Triggers d'audit sur les tables principales
CREATE TRIGGER audit_villages_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.villages
    FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

CREATE TRIGGER audit_village_descriptions_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.village_descriptions
    FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

CREATE TRIGGER audit_village_photos_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.village_photos
    FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

CREATE TRIGGER audit_poi_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.poi
    FOR EACH ROW EXECUTE FUNCTION public.log_audit_event();

-- ================================================================
-- TRIGGERS POUR LA MAINTENANCE AUTOMATIQUE
-- ================================================================

-- Trigger pour calculer automatiquement la surface et le centroïde des villages
CREATE OR REPLACE FUNCTION public.auto_calculate_village_geometry()
RETURNS trigger AS $$
BEGIN
    -- Calcul automatique de la surface en hectares
    IF NEW.geom IS NOT NULL THEN
        NEW.area_hectares := public.calculate_village_area(NEW.geom);
        NEW.centroid := public.calculate_village_centroid(NEW.geom);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_village_geometry
    BEFORE INSERT OR UPDATE OF geom ON public.villages
    FOR EACH ROW 
    WHEN (NEW.geom IS NOT NULL)
    EXECUTE FUNCTION public.auto_calculate_village_geometry();

-- Trigger pour valider les données avant insertion/mise à jour
CREATE OR REPLACE FUNCTION public.validate_village_data()
RETURNS trigger AS $$
BEGIN
    -- Validation de l'email s'il est fourni
    IF NEW.email IS NOT NULL AND NEW.email != '' THEN
        IF NOT public.is_valid_email(NEW.email) THEN
            RAISE EXCEPTION 'Format d''email invalide: %', NEW.email;
        END IF;
    END IF;
    
    -- Validation du téléphone s'il est fourni
    IF NEW.telephone IS NOT NULL AND NEW.telephone != '' THEN
        IF NOT public.is_valid_cameroon_phone(NEW.telephone) THEN
            RAISE EXCEPTION 'Format de numéro de téléphone camerounais invalide: %', NEW.telephone;
        END IF;
    END IF;
    
    -- Validation de la population
    IF NEW.population IS NOT NULL AND NEW.population < 0 THEN
        RAISE EXCEPTION 'La population ne peut pas être négative';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_village_data
    BEFORE INSERT OR UPDATE ON public.villages
    FOR EACH ROW EXECUTE FUNCTION public.validate_village_data();

-- ================================================================
-- FONCTIONS POUR LES API ET WEBHOOKS
-- ================================================================

-- Fonction pour formater les données de village pour l'API
CREATE OR REPLACE FUNCTION public.format_village_for_api(village_id uuid)
RETURNS json AS $$
DECLARE
    result json;
BEGIN
    SELECT json_build_object(
        'id', v.id,
        'name', v.village_name,
        'chief', json_build_object(
            'name', v.chief_name,
            'start_date', v.chief_start_date,
            'photo_url', v.chief_photo_url,
            'years_of_service', CASE 
                WHEN v.chief_start_date IS NOT NULL 
                THEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, v.chief_start_date))::integer
                ELSE NULL
            END
        ),
        'contact', json_build_object(
            'email', v.email,
            'telephone', v.telephone
        ),
        'demographics', json_build_object(
            'population', v.population,
            'area_hectares', v.area_hectares
        ),
        'location', json_build_object(
            'arrondissement', a.nom_arrondissement,
            'departement', d.nom_departement,
            'region', r.nom_region,
            'coordinates', json_build_object(
                'latitude', ST_Y(v.centroid),
                'longitude', ST_X(v.centroid)
            )
        ),
        'media', json_build_object(
            'photos_count', COALESCE(photos.count, 0),
            'has_description', CASE WHEN vd.id IS NOT NULL THEN true ELSE false END
        ),
        'timestamps', json_build_object(
            'created_at', v.created_at,
            'updated_at', v.updated_at
        )
    ) INTO result
    FROM public.villages v
    JOIN public.arrondissements a ON v.id_arrondissement = a.id_arrondissement
    JOIN public.departements d ON a.id_departement = d.id_departement
    JOIN public.regions r ON d.id_region = r.id_region
    LEFT JOIN (
        SELECT village_id, COUNT(*) as count
        FROM public.village_photos
        GROUP BY village_id
    ) photos ON v.id = photos.village_id
    LEFT JOIN public.village_descriptions vd ON v.id = vd.village_id
    WHERE v.id = village_id AND v.is_active = true;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql STABLE;

-- ================================================================
-- FONCTIONS DE MAINTENANCE
-- ================================================================

-- Fonction pour nettoyer les sessions expirées
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS integer AS $$
DECLARE
    deleted_count integer;
BEGIN
    DELETE FROM public.user_sessions
    WHERE expires_at < now() OR is_active = false;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour archiver les anciens logs d'audit
CREATE OR REPLACE FUNCTION public.archive_old_audit_logs(days_to_keep integer DEFAULT 365)
RETURNS integer AS $$
DECLARE
    archived_count integer;
    cutoff_date timestamp with time zone;
BEGIN
    cutoff_date := now() - (days_to_keep || ' days')::interval;
    
    -- Pour l'instant, on supprime simplement les anciens logs
    -- Dans une implémentation complète, on pourrait les déplacer vers une table d'archive
    DELETE FROM public.audit_logs
    WHERE created_at < cutoff_date;
    
    GET DIAGNOSTICS archived_count = ROW_COUNT;
    RETURN archived_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================================
-- FONCTIONS DE RAPPORTS
-- ================================================================

-- Fonction pour générer un rapport mensuel
CREATE OR REPLACE FUNCTION public.generate_monthly_report(report_month date DEFAULT date_trunc('month', CURRENT_DATE))
RETURNS json AS $$
DECLARE
    result json;
    start_date date;
    end_date date;
BEGIN
    start_date := date_trunc('month', report_month);
    end_date := start_date + interval '1 month' - interval '1 day';
    
    SELECT json_build_object(
        'period', json_build_object(
            'start_date', start_date,
            'end_date', end_date
        ),
        'villages', json_build_object(
            'created_count', (
                SELECT COUNT(*) FROM public.villages 
                WHERE created_at >= start_date AND created_at <= end_date
            ),
            'updated_count', (
                SELECT COUNT(*) FROM public.villages 
                WHERE updated_at >= start_date AND updated_at <= end_date
                    AND created_at < start_date
            )
        ),
        'photos', json_build_object(
            'uploaded_count', (
                SELECT COUNT(*) FROM public.village_photos 
                WHERE uploaded_at >= start_date AND uploaded_at <= end_date
            )
        ),
        'descriptions', json_build_object(
            'created_count', (
                SELECT COUNT(*) FROM public.village_descriptions 
                WHERE created_at >= start_date AND created_at <= end_date
            ),
            'published_count', (
                SELECT COUNT(*) FROM public.village_descriptions 
                WHERE updated_at >= start_date AND updated_at <= end_date
                    AND is_published = true
            )
        ),
        'payments', json_build_object(
            'total_count', (
                SELECT COUNT(*) FROM public.payments 
                WHERE created_at >= start_date AND created_at <= end_date
            ),
            'successful_count', (
                SELECT COUNT(*) FROM public.payments 
                WHERE created_at >= start_date AND created_at <= end_date
                    AND status = 'success'
            ),
            'total_amount', (
                SELECT COALESCE(SUM(amount), 0) FROM public.payments 
                WHERE created_at >= start_date AND created_at <= end_date
                    AND status = 'success'
            )
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql STABLE;

-- ================================================================
-- PERMISSIONS ET SÉCURITÉ
-- ================================================================

-- Attribution des permissions appropriées
GRANT EXECUTE ON FUNCTION public.get_global_stats() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_arrondissement_stats(integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.search_villages(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.find_villages_in_radius(double precision, double precision, double precision) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.format_village_for_api(uuid) TO anon, authenticated;

-- Fonctions d'administration restreintes aux utilisateurs authentifiés
GRANT EXECUTE ON FUNCTION public.create_village_anniversary_notifications() TO authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_expired_sessions() TO authenticated;
GRANT EXECUTE ON FUNCTION public.archive_old_audit_logs(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_monthly_report(date) TO authenticated;

-- ================================================================
-- COMMENTAIRES ET DOCUMENTATION
-- ================================================================

COMMENT ON FUNCTION public.calculate_village_area(geometry) IS 'Calcule la surface d''un village en hectares à partir de sa géométrie';
COMMENT ON FUNCTION public.get_global_stats() IS 'Retourne les statistiques globales de la plateforme';
COMMENT ON FUNCTION public.search_villages(text) IS 'Recherche textuelle avancée avec score de similarité';
COMMENT ON FUNCTION public.create_village_anniversary_notifications() IS 'Crée automatiquement les notifications d''anniversaire';
COMMENT ON FUNCTION public.log_audit_event() IS 'Fonction trigger pour l''audit automatique des modifications';

-- ================================================================
-- FIN DES FONCTIONS ET TRIGGERS
-- ================================================================


- ================================================================
-- REQUÊTES D'EXEMPLE ET PROCÉDURES DE MAINTENANCE
-- Base de données: Villages du Cameroun
-- ================================================================

-- ================================================================
-- REQUÊTES D'EXEMPLE POUR L'UTILISATION COURANTE
-- ================================================================

-- ================================================================
-- 1. REQUÊTES DE BASE POUR LES VILLAGES
-- ================================================================

-- Lister tous les villages actifs avec leurs informations de base
SELECT 
    v.id,
    v.village_name,
    v.chief_name,
    v.population,
    v.area_hectares,
    a.nom_arrondissement,
    d.nom_departement,
    r.nom_region
FROM public.villages v
JOIN public.arrondissements a ON v.id_arrondissement = a.id_arrondissement
JOIN public.departements d ON a.id_departement = d.id_departement
JOIN public.regions r ON d.id_region = r.id_region
WHERE v.is_active = true
ORDER BY r.nom_region, d.nom_departement, a.nom_arrondissement, v.village_name;

-- Trouver les villages les plus peuplés
SELECT 
    village_name,
    chief_name,
    population,
    area_hectares,
    nom_arrondissement
FROM public.villages_complete
WHERE population IS NOT NULL
ORDER BY population DESC
LIMIT 20;

-- Villages avec le plus de photos
SELECT 
    v.village_name,
    COUNT(vp.id) as photos_count,
    v.population,
    a.nom_arrondissement
FROM public.villages v
LEFT JOIN public.village_photos vp ON v.id = vp.village_id
JOIN public.arrondissements a ON v.id_arrondissement = a.id_arrondissement
WHERE v.is_active = true
GROUP BY v.id, v.village_name, v.population, a.nom_arrondissement
HAVING COUNT(vp.id) > 0
ORDER BY photos_count DESC;

-- ================================================================
-- 2. REQUÊTES GÉOGRAPHIQUES ET SPATIALES
-- ================================================================

-- Villages dans un rayon de 50km autour de Yaoundé (exemple de coordonnées)
SELECT 
    village_name,
    chief_name,
    ROUND(
        ST_Distance(
            ST_Transform(ST_SetSRID(ST_MakePoint(11.5174, 3.8480), 4326), 32633),
            ST_Transform(centroid, 32633)
        ) / 1000.0, 2
    ) AS distance_km
FROM public.villages
WHERE is_active = true
    AND ST_DWithin(
        ST_Transform(ST_SetSRID(ST_MakePoint(11.5174, 3.8480), 4326), 32633),
        ST_Transform(centroid, 32633),
        50000
    )
ORDER BY distance_km;

-- Villages par densité de population (habitants/km²)
SELECT 
    village_name,
    population,
    area_hectares,
    CASE 
        WHEN area_hectares > 0 THEN ROUND((population::numeric / (area_hectares / 100))::numeric, 2)
        ELSE NULL
    END as density_per_km2,
    nom_arrondissement
FROM public.villages_complete
WHERE population IS NOT NULL 
    AND area_hectares IS NOT NULL 
    AND area_hectares > 0
ORDER BY density_per_km2 DESC NULLS LAST;

-- ================================================================
-- 3. STATISTIQUES PAR RÉGION ADMINISTRATIVE
-- ================================================================

-- Statistiques par région
SELECT 
    r.nom_region,
    COUNT(v.id) as nombre_villages,
    COALESCE(SUM(v.population), 0) as population_totale,
    COALESCE(ROUND(SUM(v.area_hectares), 2), 0) as superficie_totale_ha,
    COALESCE(ROUND(AVG(v.population), 0), 0) as population_moyenne,
    COALESCE(ROUND(AVG(v.area_hectares), 2), 0) as superficie_moyenne_ha
FROM public.regions r
LEFT JOIN public.departements d ON r.id_region = d.id_region
LEFT JOIN public.arrondissements a ON d.id_departement = a.id_departement
LEFT JOIN public.villages v ON a.id_arrondissement = v.id_arrondissement AND v.is_active = true
GROUP BY r.id_region, r.nom_region
ORDER BY nombre_villages DESC;

-- Statistiques par département
SELECT 
    d.nom_departement,
    r.nom_region,
    COUNT(v.id) as nombre_villages,
    COUNT(DISTINCT a.id_arrondissement) as nombre_arrondissements,
    COALESCE(SUM(v.population), 0) as population_totale,
    COUNT(vp.id) as nombre_photos_total
FROM public.departements d
JOIN public.regions r ON d.id_region = r.id_region
LEFT JOIN public.arrondissements a ON d.id_departement = a.id_departement
LEFT JOIN public.villages v ON a.id_arrondissement = v.id_arrondissement AND v.is_active = true
LEFT JOIN public.village_photos vp ON v.id = vp.village_id
GROUP BY d.id_departement, d.nom_departement, r.nom_region
ORDER BY nombre_villages DESC;

-- ================================================================
-- 4. REQUÊTES SUR LES POINTS D'INTÉRÊT (POI)
-- ================================================================

-- Répartition des POI par type
SELECT 
    pt.label,
    pt.type,
    COUNT(p.id) as nombre_poi,
    COUNT(DISTINCT p.village_id) as villages_concernes
FROM public.poi_types pt
LEFT JOIN public.poi p ON pt.type = p.type AND p.is_active = true
GROUP BY pt.type, pt.label
ORDER BY nombre_poi DESC;

-- Villages avec le plus de POI
SELECT 
    v.village_name,
    a.nom_arrondissement,
    COUNT(p.id) as nombre_poi,
    string_agg(DISTINCT pt.label, ', ' ORDER BY pt.label) as types_poi
FROM public.villages v
JOIN public.arrondissements a ON v.id_arrondissement = a.id_arrondissement
LEFT JOIN public.poi p ON v.id = p.village_id AND p.is_active = true
LEFT JOIN public.poi_types pt ON p.type = pt.type
WHERE v.is_active = true
GROUP BY v.id, v.village_name, a.nom_arrondissement
HAVING COUNT(p.id) > 0
ORDER BY nombre_poi DESC;

-- POI par région avec détails
SELECT 
    r.nom_region,
    pt.label as type_poi,
    COUNT(p.id) as nombre,
    COUNT(DISTINCT v.id) as villages_concernes
FROM public.regions r
JOIN public.departements d ON r.id_region = d.id_region
JOIN public.arrondissements a ON d.id_departement = a.id_departement
JOIN public.villages v ON a.id_arrondissement = v.id_arrondissement AND v.is_active = true
JOIN public.poi p ON v.id = p.village_id AND p.is_active = true
JOIN public.poi_types pt ON p.type = pt.type
GROUP BY r.nom_region, pt.type, pt.label
ORDER BY r.nom_region, nombre DESC;

-- ================================================================
-- 5. REQUÊTES DE SUIVI ET QUALITÉ DES DONNÉES
-- ================================================================

-- Villages sans photos
SELECT 
    v.village_name,
    v.chief_name,
    v.population,
    a.nom_arrondissement,
    v.created_at
FROM public.villages v
JOIN public.arrondissements a ON v.id_arrondissement = a.id_arrondissement
LEFT JOIN public.village_photos vp ON v.id = vp.village_id
WHERE v.is_active = true
    AND vp.id IS NULL
ORDER BY v.created_at DESC;

-- Villages sans description
SELECT 
    v.village_name,
    v.chief_name,
    a.nom_arrondissement,
    v.created_at
FROM public.villages v
JOIN public.arrondissements a ON v.id_arrondissement = a.id_arrondissement
LEFT JOIN public.village_descriptions vd ON v.id = vd.village_id
WHERE v.is_active = true
    AND vd.id IS NULL
ORDER BY v.created_at DESC;

-- Qualité des données par arrondissement
SELECT 
    a.nom_arrondissement,
    d.nom_departement,
    COUNT(v.id) as total_villages,
    COUNT(vp.village_id) as villages_avec_photos,
    COUNT(vd.village_id) as villages_avec_descriptions,
    COUNT(CASE WHEN v.population IS NOT NULL THEN 1 END) as villages_avec_population,
    COUNT(CASE WHEN v.chief_name IS NOT NULL AND v.chief_name != '' THEN 1 END) as villages_avec_chef,
    ROUND(
        (COUNT(vp.village_id)::numeric / NULLIF(COUNT(v.id), 0)) * 100, 1
    ) as pourcentage_photos,
    ROUND(
        (COUNT(vd.village_id)::numeric / NULLIF(COUNT(v.id), 0)) * 100, 1
    ) as pourcentage_descriptions
FROM public.arrondissements a
JOIN public.departements d ON a.id_departement = d.id_departement
LEFT JOIN public.villages v ON a.id_arrondissement = v.id_arrondissement AND v.is_active = true
LEFT JOIN (
    SELECT DISTINCT village_id FROM public.village_photos
) vp ON v.id = vp.village_id
LEFT JOIN (
    SELECT DISTINCT village_id FROM public.village_descriptions WHERE is_published = true
) vd ON v.id = vd.village_id
GROUP BY a.id_arrondissement, a.nom_arrondissement, d.nom_departement
HAVING COUNT(v.id) > 0
ORDER BY total_villages DESC;

-- ================================================================
-- 6. REQUÊTES DE PERFORMANCE ET MONITORING
-- ================================================================

-- Activité récente (derniers 30 jours)
SELECT 
    'Villages' as type_entite,
    COUNT(*) as nombre_ajouts
FROM public.villages
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'

UNION ALL

SELECT 
    'Photos' as type_entite,
    COUNT(*) as nombre_ajouts
FROM public.village_photos
WHERE uploaded_at >= CURRENT_DATE - INTERVAL '30 days'

UNION ALL

SELECT 
    'Descriptions' as type_entite,
    COUNT(*) as nombre_ajouts
FROM public.village_descriptions
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'

UNION ALL

SELECT 
    'POI' as type_entite,
    COUNT(*) as nombre_ajouts
FROM public.poi
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days';

-- Taille des tables principales
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as taille_totale,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as taille_donnees,
    pg_size_pretty(pg_indexes_size(schemaname||'.'||tablename)) as taille_index
FROM pg_tables 
WHERE schemaname = 'public'
    AND tablename IN ('villages', 'village_photos', 'village_descriptions', 'poi', 'audit_logs', 'payments')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ================================================================
-- 7. REQUÊTES D'ANALYSE BUSINESS
-- ================================================================

-- Évolution mensuelle des créations de villages
SELECT 
    DATE_TRUNC('month', created_at) as mois,
    COUNT(*) as nouveaux_villages,
    SUM(COALESCE(population, 0)) as population_ajoutee
FROM public.villages
WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY mois;

-- Top 10 des arrondissements les plus actifs (nouvelles données)
SELECT 
    a.nom_arrondissement,
    d.nom_departement,
    COUNT(DISTINCT v.id) as nombre_villages,
    COUNT(vp.id) as nombre_photos,
    COUNT(DISTINCT vd.village_id) as villages_avec_descriptions,
    MAX(v.created_at) as derniere_creation
FROM public.arrondissements a
JOIN public.departements d ON a.id_departement = d.id_departement
LEFT JOIN public.villages v ON a.id_arrondissement = v.id_arrondissement AND v.is_active = true
LEFT JOIN public.village_photos vp ON v.id = vp.village_id
LEFT JOIN public.village_descriptions vd ON v.id = vd.village_id AND vd.is_published = true
GROUP BY a.id_arrondissement, a.nom_arrondissement, d.nom_departement
ORDER BY nombre_villages DESC, nombre_photos DESC
LIMIT 10;

-- ================================================================
-- PROCÉDURES DE MAINTENANCE ET OPTIMISATION
-- ================================================================

-- ================================================================
-- 1. PROCÉDURES DE NETTOYAGE
-- ================================================================

-- Nettoyer les sessions expirées (à exécuter quotidiennement)
DO $$
DECLARE
    deleted_sessions integer;
BEGIN
    SELECT public.cleanup_expired_sessions() INTO deleted_sessions;
    RAISE NOTICE 'Sessions expirées supprimées: %', deleted_sessions;
END $$;

-- Archiver les anciens logs d'audit (à exécuter mensuellement)
DO $$
DECLARE
    archived_logs integer;
BEGIN
    -- Garder 1 an de logs
    SELECT public.archive_old_audit_logs(365) INTO archived_logs;
    RAISE NOTICE 'Logs d''audit archivés: %', archived_logs;
END $$;

-- ================================================================
-- 2. PROCÉDURES DE MISE À JOUR DES STATISTIQUES
-- ================================================================

-- Recalculer les surfaces et centroïdes pour tous les villages
DO $$
DECLARE
    village_record record;
    updated_count integer := 0;
BEGIN
    FOR village_record IN 
        SELECT id, geom 
        FROM public.villages 
        WHERE geom IS NOT NULL AND is_active = true
    LOOP
        UPDATE public.villages
        SET 
            area_hectares = public.calculate_village_area(geom),
            centroid = public.calculate_village_centroid(geom),
            updated_at = now()
        WHERE id = village_record.id;
        
        updated_count := updated_count + 1;
    END LOOP;
    
    RAISE NOTICE 'Villages mis à jour: %', updated_count;
END $$;

-- ================================================================
-- 3. PROCÉDURES DE VÉRIFICATION DE L'INTÉGRITÉ
-- ================================================================

-- Vérifier l'intégrité des références géographiques
DO $$
DECLARE
    orphan_count integer;
BEGIN
    -- Villages sans arrondissement valide
    SELECT COUNT(*) INTO orphan_count
    FROM public.villages v
    LEFT JOIN public.arrondissements a ON v.id_arrondissement = a.id_arrondissement
    WHERE a.id_arrondissement IS NULL;
    
    IF orphan_count > 0 THEN
        RAISE WARNING 'Villages orphelins (sans arrondissement): %', orphan_count;
    END IF;
    
    -- POI sans village valide
    SELECT COUNT(*) INTO orphan_count
    FROM public.poi p
    LEFT JOIN public.villages v ON p.village_id = v.id
    WHERE p.village_id IS NOT NULL AND v.id IS NULL;
    
    IF orphan_count > 0 THEN
        RAISE WARNING 'POI orphelins (sans village valide): %', orphan_count;
    END IF;
    
    -- Photos sans village valide
    SELECT COUNT(*) INTO orphan_count
    FROM public.village_photos vp
    LEFT JOIN public.villages v ON vp.village_id = v.id
    WHERE v.id IS NULL;
    
    IF orphan_count > 0 THEN
        RAISE WARNING 'Photos orphelines (sans village valide): %', orphan_count;
    END IF;
END $$;

-- ================================================================
-- 4. PROCÉDURES D'OPTIMISATION DES PERFORMANCES
-- ================================================================

-- Réindexer les tables principales
REINDEX TABLE public.villages;
REINDEX TABLE public.village_photos;
REINDEX TABLE public.poi;
REINDEX TABLE public.audit_logs;

-- Mettre à jour les statistiques pour l'optimiseur de requêtes
ANALYZE public.villages;
ANALYZE public.village_photos;
ANALYZE public.village_descriptions;
ANALYZE public.poi;
ANALYZE public.arrondissements;
ANALYZE public.departements;
ANALYZE public.regions;

-- ================================================================
-- 5. SAUVEGARDE ET RESTAURATION (EXEMPLES DE COMMANDES)
-- ================================================================

/*
-- Commandes à exécuter depuis le système (pas dans psql)

-- Sauvegarde complète de la base
pg_dump -h hostname -U username -d database_name -f backup_villages_$(date +%Y%m%d).sql

-- Sauvegarde uniquement des données (sans structure)
pg_dump -h hostname -U username -d database_name --data-only -f backup_data_$(date +%Y%m%d).sql

-- Sauvegarde des schémas géographiques avec PostGIS
pg_dump -h hostname -U username -d database_name -T 'spatial_ref_sys' -f backup_without_srs_$(date +%Y%m%d).sql

-- Restauration depuis une sauvegarde
psql -h hostname -U username -d database_name -f backup_villages_20251201.sql
*/

-- ================================================================
-- 6. REQUÊTES DE DIAGNOSTIC SYSTÈME
-- ================================================================

-- Vérifier l'espace disque utilisé par les tables
SELECT 
    table_name,
    pg_size_pretty(pg_total_relation_size('public.'||table_name)) as taille_totale,
    pg_size_pretty(pg_relation_size('public.'||table_name)) as taille_donnees,
    pg_size_pretty(pg_indexes_size('public.'||table_name)) as taille_index
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
ORDER BY pg_total_relation_size('public.'||table_name) DESC;

-- Vérifier les requêtes lentes (si pg_stat_statements est activé)
/*
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements
WHERE query ILIKE '%villages%' OR query ILIKE '%poi%'
ORDER BY mean_time DESC
LIMIT 10;
*/

-- Vérifier les verrous actifs
SELECT 
    pg_class.relname,
    pg_locks.locktype,
    pg_locks.mode,
    pg_stat_activity.state,
    pg_stat_activity.query,
    pg_stat_activity.query_start
FROM pg_locks
JOIN pg_class ON pg_locks.relation = pg_class.oid
JOIN pg_stat_activity ON pg_locks.pid = pg_stat_activity.pid
WHERE pg_class.relname IN ('villages', 'village_photos', 'poi')
ORDER BY pg_stat_activity.query_start;

-- ================================================================
-- 7. TESTS DE PERFORMANCE
-- ================================================================

-- Test de performance pour la recherche de villages
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM public.search_villages('Yaoundé');

-- Test de performance pour les requêtes géographiques
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM public.find_villages_in_radius(3.8480, 11.5174, 50);

-- Test de performance pour les statistiques globales
EXPLAIN (ANALYZE, BUFFERS)
SELECT public.get_global_stats();

-- ================================================================
-- FIN DES REQUÊTES D'EXEMPLE ET PROCÉDURES
-- ================================================================

-- Ces requêtes et procédures couvrent :
-- 1. Consultation des données de base
-- 2. Analyses géographiques et spatiales  
-- 3. Statistiques par division administrative
-- 4. Suivi de la qualité des données
-- 5. Monitoring des performances
-- 6. Analyses business et tendances
-- 7. Maintenance et optimisation
-- 8. Vérification de l'intégrité
-- 9. Diagnostic système
-- 10. Tests de performance



SCHÉMA COMPLET DE LA BASE DE DONNÉES SUPABASE
-- Projet: Villages du Cameroun (ID: hrlufnjhwhgddxkpyzst)
-- Date: 2025-09-26
-- ================================================================

-- ================================================================
-- EXTENSIONS REQUISES
-- ================================================================

-- Extension PostGIS pour les données géographiques
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS postgis_topology;

-- Extension UUID pour la génération d'identifiants uniques
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extension pour les fonctions de cryptage
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ================================================================
-- SCHÉMA PUBLIC - TABLES PRINCIPALES
-- ================================================================

-- Table des régions administratives
CREATE TABLE public.regions (
    id_region integer NOT NULL,
    nom_region character varying(100),
    geom geometry(MultiPolygon, 4326),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT regions_pkey PRIMARY KEY (id_region)
);

-- Index spatial pour les régions
CREATE INDEX idx_regions_geom ON public.regions USING gist (geom);

-- Table des départements
CREATE TABLE public.departements (
    id_departement integer NOT NULL,
    nom_departement character varying(100),
    id_region integer,
    geom geometry(MultiPolygon, 4326),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT departements_pkey PRIMARY KEY (id_departement),
    CONSTRAINT fk_departements_region FOREIGN KEY (id_region) REFERENCES public.regions(id_region)
);

-- Index spatial pour les départements
CREATE INDEX idx_departements_geom ON public.departements USING gist (geom);

-- Table des arrondissements
CREATE TABLE public.arrondissements (
    id_arrondissement integer NOT NULL,
    nom_arrondissement character varying(100),
    id_departement integer,
    geom geometry(MultiPolygon, 4326),
    name character(30),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT arrondissements_pkey PRIMARY KEY (id_arrondissement),
    CONSTRAINT fk_arrondissements_departement FOREIGN KEY (id_departement) REFERENCES public.departements(id_departement)
);

-- Index spatial pour les arrondissements
CREATE INDEX idx_arrondissements_geom ON public.arrondissements USING gist (geom);

-- Table principale des villages
CREATE TABLE public.villages (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    village_name character varying(100) NOT NULL,
    id_arrondissement integer NOT NULL,
    geom geometry(MultiPolygon, 4326) NOT NULL,
    centroid geometry(Point, 4326),
    area_hectares numeric(10,2),
    population integer,
    chief_name character varying(100),
    chief_start_date date,
    chief_photo_url text,
    chief_photo_uploaded_at timestamp with time zone DEFAULT now(),
    email character varying(100),
    telephone character varying(20),
    categorie character varying(50),
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    created_by uuid,
    updated_by uuid,
    CONSTRAINT villages_pkey PRIMARY KEY (id),
    CONSTRAINT fk_villages_arrondissement FOREIGN KEY (id_arrondissement) REFERENCES public.arrondissements(id_arrondissement)
);

-- Index spatial pour les villages
CREATE INDEX idx_villages_geom ON public.villages USING gist (geom);
CREATE INDEX idx_villages_centroid ON public.villages USING gist (centroid);
CREATE INDEX idx_villages_name ON public.villages (village_name);
CREATE INDEX idx_villages_active ON public.villages (is_active);

-- Table des descriptions détaillées des villages
CREATE TABLE public.village_descriptions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    village_id uuid,
    histoire_origine text,
    description_limites text,
    importance_region text,
    structure_demographique text,
    groupes_ethniques text,
    activites_generatrices text,
    produits_terroir text,
    infrastructures_scolaires text,
    infrastructures_sante text,
    infrastructures_routes text,
    acces_electricite_eau text,
    sites_naturels text,
    sites_culturels text,
    fetes_traditionnelles text,
    danses_musiques_rites text,
    gastronomie_locale text,
    personnalites_originaires text,
    is_published boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    created_by uuid,
    CONSTRAINT village_descriptions_pkey PRIMARY KEY (id),
    CONSTRAINT fk_village_descriptions_village FOREIGN KEY (village_id) REFERENCES public.villages(id) ON DELETE CASCADE
);

-- Table des photos de villages
CREATE TABLE public.village_photos (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    village_id uuid NOT NULL,
    photo_url text NOT NULL,
    photo_name character varying(255),
    photo_order integer DEFAULT 1,
    file_size integer,
    uploaded_at timestamp with time zone DEFAULT now(),
    uploaded_by uuid,
    CONSTRAINT village_photos_pkey PRIMARY KEY (id),
    CONSTRAINT fk_village_photos_village FOREIGN KEY (village_id) REFERENCES public.villages(id) ON DELETE CASCADE
);

-- Index pour optimiser les requêtes sur les photos
CREATE INDEX idx_village_photos_village_id ON public.village_photos (village_id);
CREATE INDEX idx_village_photos_order ON public.village_photos (village_id, photo_order);

-- Table des types de points d'intérêt
CREATE TABLE public.poi_types (
    type character varying(50) NOT NULL,
    label character varying(100) NOT NULL,
    description text,
    icon character varying(50),
    color character varying(20),
    is_active boolean DEFAULT true,
    CONSTRAINT poi_types_pkey PRIMARY KEY (type)
);

-- Données initiales pour les types de POI
INSERT INTO public.poi_types (type, label, description, icon, color, is_active) VALUES
('school', 'École', 'Établissement scolaire', 'school', '#4CAF50', true),
('hospital', 'Hôpital', 'Centre de santé', 'local_hospital', '#F44336', true),
('church', 'Église', 'Lieu de culte chrétien', 'church', '#9C27B0', true),
('mosque', 'Mosquée', 'Lieu de culte musulman', 'mosque', '#607D8B', true),
('market', 'Marché', 'Marché local', 'store', '#FF9800', true),
('water', 'Point d\'eau', 'Source, puits, forage', 'water_drop', '#2196F3', true),
('bridge', 'Pont', 'Pont ou passerelle', 'bridge', '#795548', true),
('monument', 'Monument', 'Monument historique', 'account_balance', '#9E9E9E', true);

-- Table des points d'intérêt (POI)
CREATE TABLE public.poi (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name character varying(100) NOT NULL,
    type character varying(50) NOT NULL,
    description text,
    geom geometry(Point, 4326) NOT NULL,
    village_id uuid,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    created_by uuid,
    CONSTRAINT poi_pkey PRIMARY KEY (id),
    CONSTRAINT fk_poi_type FOREIGN KEY (type) REFERENCES public.poi_types(type),
    CONSTRAINT fk_poi_village FOREIGN KEY (village_id) REFERENCES public.villages(id) ON DELETE SET NULL
);

-- Index spatial pour les POI
CREATE INDEX idx_poi_geom ON public.poi USING gist (geom);
CREATE INDEX idx_poi_type ON public.poi (type);
CREATE INDEX idx_poi_village ON public.poi (village_id);

-- Table des noms géographiques (geonames)
CREATE TABLE public.geonames (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    nom character varying(100) NOT NULL,
    type character varying(50) NOT NULL,
    description text,
    geom geometry(Point, 4326) NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    created_by uuid,
    CONSTRAINT geonames_pkey PRIMARY KEY (id)
);

-- Index spatial pour les geonames
CREATE INDEX idx_geonames_geom ON public.geonames USING gist (geom);
CREATE INDEX idx_geonames_type ON public.geonames (type);
CREATE INDEX idx_geonames_nom ON public.geonames (nom);

-- ================================================================
-- TABLES ADMINISTRATIVES ET DE GESTION
-- ================================================================

-- Table des profils administrateurs
CREATE TABLE public.admin_profiles (
    id uuid NOT NULL,
    full_name character varying(255),
    role character varying(50) DEFAULT 'admin',
    permissions jsonb DEFAULT '{"read": true, "write": false, "delete": false}',
    two_factor_enabled boolean DEFAULT false,
    two_factor_secret character varying(255),
    last_login timestamp with time zone,
    login_count integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT admin_profiles_pkey PRIMARY KEY (id)
);

-- Table des sessions utilisateurs
CREATE TABLE public.user_sessions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    session_token character varying(255),
    ip_address inet,
    user_agent text,
    expires_at timestamp with time zone NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT user_sessions_pkey PRIMARY KEY (id)
);

-- Index pour optimiser les requêtes sur les sessions
CREATE INDEX idx_user_sessions_token ON public.user_sessions (session_token);
CREATE INDEX idx_user_sessions_user_id ON public.user_sessions (user_id);
CREATE INDEX idx_user_sessions_expires ON public.user_sessions (expires_at);

-- Table des logs d'audit
CREATE TABLE public.audit_logs (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid,
    action character varying(100) NOT NULL,
    table_name character varying(100),
    record_id uuid,
    old_values jsonb,
    new_values jsonb,
    ip_address inet,
    user_agent text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT audit_logs_pkey PRIMARY KEY (id)
);

-- Index pour optimiser les requêtes sur les logs
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs (user_id);
CREATE INDEX idx_audit_logs_table_name ON public.audit_logs (table_name);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs (created_at);

-- Table des paiements
CREATE TABLE public.payments (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    transaction_id character varying(100) NOT NULL,
    amount numeric(10,2) NOT NULL DEFAULT 2000.00,
    currency character varying(3) DEFAULT 'XAF',
    status character varying(20) DEFAULT 'pending',
    payment_method character varying(50),
    user_session character varying(255),
    map_bounds jsonb,
    print_format character varying(50),
    print_title character varying(255),
    flutterwave_tx_ref character varying(100),
    flutterwave_tx_id character varying(100),
    processed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT payments_pkey PRIMARY KEY (id),
    CONSTRAINT payments_transaction_id_unique UNIQUE (transaction_id)
);

-- Index pour optimiser les requêtes sur les paiements
CREATE INDEX idx_payments_status ON public.payments (status);
CREATE INDEX idx_payments_created_at ON public.payments (created_at);

-- Table des imports de données
CREATE TABLE public.data_imports (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    file_name character varying(255),
    file_type character varying(50),
    data_type character varying(50),
    status character varying(20) DEFAULT 'processing',
    total_records integer,
    successful_records integer,
    failed_records integer,
    error_log text,
    imported_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    completed_at timestamp with time zone,
    CONSTRAINT data_imports_pkey PRIMARY KEY (id)
);

-- Table de configuration système
CREATE TABLE public.system_config (
    key character varying(100) NOT NULL,
    value text NOT NULL,
    description text,
    updated_at timestamp with time zone DEFAULT now(),
    updated_by uuid,
    CONSTRAINT system_config_pkey PRIMARY KEY (key)
);

-- Table des notifications de villages
CREATE TABLE public.village_notifications (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    village_id uuid NOT NULL,
    notification_type character varying(50) DEFAULT 'anniversary',
    subject character varying(255),
    message text,
    email_to character varying(100) DEFAULT 'monvillage.cm@gmail.com',
    scheduled_date date NOT NULL,
    status character varying(20) DEFAULT 'scheduled',
    sent_date timestamp with time zone,
    retry_count integer DEFAULT 0,
    last_error text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT village_notifications_pkey PRIMARY KEY (id),
    CONSTRAINT fk_village_notifications_village FOREIGN KEY (village_id) REFERENCES public.villages(id) ON DELETE CASCADE
);

-- ================================================================
-- VUES POUR FACILITER LES REQUÊTES
-- ================================================================

-- Vue des villages avec informations complètes
CREATE OR REPLACE VIEW public.villages_complete AS
SELECT 
    v.id,
    v.village_name,
    v.chief_name,
    v.email,
    v.telephone,
    v.population,
    v.area_hectares,
    v.geom,
    v.centroid,
    v.is_active,
    v.created_at,
    v.updated_at,
    a.id_arrondissement,
    a.nom_arrondissement AS arrondissement_name,
    d.id_departement,
    d.nom_departement AS departement_name,
    r.id_region,
    r.nom_region AS region_name
FROM public.villages v
JOIN public.arrondissements a ON v.id_arrondissement = a.id_arrondissement
JOIN public.departements d ON a.id_departement = d.id_departement
JOIN public.regions r ON d.id_region = r.id_region;

-- Vue des villages avec informations étendues (incluant photos et années de service)
CREATE OR REPLACE VIEW public.villages_complete_extended AS
SELECT 
    v.*,
    a.nom_arrondissement,
    COALESCE(photos.photos_count, 0) AS photos_count,
    CASE 
        WHEN v.chief_start_date IS NOT NULL 
        THEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, v.chief_start_date))::integer
        ELSE NULL
    END AS chief_years_of_service
FROM public.villages v
JOIN public.arrondissements a ON v.id_arrondissement = a.id_arrondissement
LEFT JOIN (
    SELECT 
        village_id, 
        COUNT(*) AS photos_count
    FROM public.village_photos 
    GROUP BY village_id
) photos ON v.id = photos.village_id;

-- Vue des villages avec toutes les informations (descriptions + photos)
CREATE OR REPLACE VIEW public.villages_with_full_info AS
SELECT 
    v.id,
    v.village_name,
    v.chief_name,
    v.chief_photo_url,
    v.chief_start_date,
    v.email,
    v.telephone,
    v.population,
    v.area_hectares,
    v.geom,
    v.is_active,
    v.created_at,
    v.updated_at,
    a.id_arrondissement,
    a.nom_arrondissement,
    
    -- Informations descriptives
    vd.histoire_origine,
    vd.description_limites,
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
    vd.is_published AS description_published,
    
    -- Photos du village (format JSON)
    COALESCE(
        json_agg(
            json_build_object(
                'id', vp.id,
                'photo_url', vp.photo_url,
                'photo_name', vp.photo_name,
                'photo_order', vp.photo_order
            ) ORDER BY vp.photo_order
        ) FILTER (WHERE vp.id IS NOT NULL),
        '[]'::json
    ) AS village_photos_json
    
FROM public.villages v
JOIN public.arrondissements a ON v.id_arrondissement = a.id_arrondissement
LEFT JOIN public.village_descriptions vd ON v.id = vd.village_id
LEFT JOIN public.village_photos vp ON v.id = vp.village_id
GROUP BY 
    v.id, v.village_name, v.chief_name, v.chief_photo_url, v.chief_start_date,
    v.email, v.telephone, v.population, v.area_hectares, v.geom,
    v.is_active, v.created_at, v.updated_at,
    a.id_arrondissement, a.nom_arrondissement,
    vd.histoire_origine, vd.description_limites, vd.importance_region,
    vd.structure_demographique, vd.groupes_ethniques, vd.activites_generatrices,
    vd.produits_terroir, vd.infrastructures_scolaires, vd.infrastructures_sante,
    vd.infrastructures_routes, vd.acces_electricite_eau, vd.sites_naturels,
    vd.sites_culturels, vd.fetes_traditionnelles, vd.danses_musiques_rites,
    vd.gastronomie_locale, vd.personnalites_originaires, vd.is_published;

-- Vue des POI avec informations de localisation
CREATE OR REPLACE VIEW public.poi_with_location AS
SELECT 
    p.id,
    p.name,
    p.type,
    p.description,
    p.geom,
    p.is_active,
    p.created_at,
    v.village_name,
    a.nom_arrondissement AS arrondissement_name,
    d.nom_departement AS departement_name,
    r.nom_region AS region_name
FROM public.poi p
LEFT JOIN public.villages v ON p.village_id = v.id
LEFT JOIN public.arrondissements a ON v.id_arrondissement = a.id_arrondissement
LEFT JOIN public.departements d ON a.id_departement = d.id_departement
LEFT JOIN public.regions r ON d.id_region = r.id_region;

-- ================================================================
-- FONCTIONS UTILITAIRES
-- ================================================================

-- Fonction pour mettre à jour le timestamp updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ================================================================
-- TRIGGERS POUR LES TIMESTAMPS
-- ================================================================

-- Triggers pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_regions_updated_at
    BEFORE UPDATE ON public.regions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_departements_updated_at
    BEFORE UPDATE ON public.departements
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_arrondissements_updated_at
    BEFORE UPDATE ON public.arrondissements
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_villages_updated_at
    BEFORE UPDATE ON public.villages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_village_descriptions_updated_at
    BEFORE UPDATE ON public.village_descriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_poi_updated_at
    BEFORE UPDATE ON public.poi
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_profiles_updated_at
    BEFORE UPDATE ON public.admin_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_system_config_updated_at
    BEFORE UPDATE ON public.system_config
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_village_notifications_updated_at
    BEFORE UPDATE ON public.village_notifications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ================================================================

-- Activation de RLS sur les tables nécessaires
ALTER TABLE public.villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geonames ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Policies pour les villages
CREATE POLICY "Villages are viewable by everyone" ON public.villages
    FOR SELECT USING (is_active = true);

CREATE POLICY "Villages are editable by authenticated users" ON public.villages
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Policies pour les descriptions de villages
CREATE POLICY "Public read access for published descriptions" ON public.village_descriptions
    FOR SELECT USING (is_published = true);

CREATE POLICY "Admin full access" ON public.village_descriptions
    FOR ALL USING (auth.role() = 'authenticated');

-- Policies pour les photos de villages
CREATE POLICY "Village photos are viewable by everyone" ON public.village_photos
    FOR SELECT USING (
        village_id IN (
            SELECT id FROM public.villages WHERE is_active = true
        )
    );

CREATE POLICY "Authenticated users can insert village photos" ON public.village_photos
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update village photos" ON public.village_photos
    FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete village photos" ON public.village_photos
    FOR DELETE USING (true);

-- Policies pour les notifications
CREATE POLICY "Allow system inserts for village notifications" ON public.village_notifications
    FOR INSERT WITH CHECK (true);

-- Policies pour les POI
CREATE POLICY "POI are viewable by everyone" ON public.poi
    FOR SELECT USING (is_active = true);

CREATE POLICY "POI are editable by authenticated users" ON public.poi
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Policies pour les geonames
CREATE POLICY "Geonames are viewable by everyone" ON public.geonames
    FOR SELECT USING (is_active = true);

CREATE POLICY "Geonames are editable by authenticated users" ON public.geonames
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Policies pour les profils admin
CREATE POLICY "Admin profiles readable by authenticated users" ON public.admin_profiles
    FOR SELECT TO authenticated USING (true);

-- ================================================================
-- STORAGE CONFIGURATION
-- ================================================================

-- Création du bucket pour les photos de villages
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'village-photos',
    'village-photos',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Policies pour le storage des photos
CREATE POLICY "Public can view village photos" ON storage.objects
    FOR SELECT USING (bucket_id = 'village-photos');

CREATE POLICY "Authenticated users can upload to village-photos" ON storage.objects
    FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'village-photos');

-- ================================================================
-- DONNÉES D'EXEMPLE / CONFIGURATION INITIALE
-- ================================================================

-- Configuration système par défaut
INSERT INTO public.system_config (key, value, description) VALUES
('site_name', 'Villages du Cameroun', 'Nom du site web'),
('contact_email', 'monvillage.cm@gmail.com', 'Email de contact principal'),
('map_default_zoom', '7', 'Niveau de zoom par défaut de la carte'),
('map_center_lat', '7.3697', 'Latitude du centre par défaut'),
('map_center_lng', '12.3547', 'Longitude du centre par défaut'),
('payment_amount', '2000', 'Montant des paiements en XAF'),
('flutterwave_public_key', '', 'Clé publique Flutterwave'),
('notification_enabled', 'true', 'Notifications activées')
ON CONFLICT (key) DO NOTHING;

-- ================================================================
-- COMMENTAIRES ET DOCUMENTATION
-- ================================================================

COMMENT ON TABLE public.villages IS 'Table principale contenant les informations sur les villages du Cameroun';
COMMENT ON TABLE public.village_descriptions IS 'Descriptions détaillées des villages (histoire, culture, infrastructures)';
COMMENT ON TABLE public.village_photos IS 'Photos associées aux villages';
COMMENT ON TABLE public.poi IS 'Points d''intérêt (écoles, hôpitaux, marchés, etc.)';
COMMENT ON TABLE public.geonames IS 'Noms géographiques et lieux remarquables';
COMMENT ON TABLE public.admin_profiles IS 'Profils des administrateurs du système';
COMMENT ON TABLE public.audit_logs IS 'Logs d''audit pour tracer les modifications';
COMMENT ON TABLE public.payments IS 'Transactions de paiement pour l''accès aux cartes';
COMMENT ON TABLE public.village_notifications IS 'Notifications automatiques pour les anniversaires de villages';

-- ================================================================
-- INDEXES SUPPLÉMENTAIRES POUR OPTIMISATION
-- ================================================================

-- Index composites pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_villages_arrondissement_active 
    ON public.villages (id_arrondissement, is_active);

CREATE INDEX IF NOT EXISTS idx_village_descriptions_published 
    ON public.village_descriptions (village_id, is_published);

CREATE INDEX IF NOT EXISTS idx_poi_village_type_active 
    ON public.poi (village_id, type, is_active);

-- Index pour les recherches textuelles
CREATE INDEX IF NOT EXISTS idx_villages_name_trgm 
    ON public.villages USING gin (village_name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_geonames_nom_trgm 
    ON public.geonames USING gin (nom gin_trgm_ops);

-- Extension pour la recherche textuelle
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ================================================================
-- FIN DU SCHÉMA
-- ================================================================

-- Ce schéma représente la structure complète de la base de données
-- pour le projet "Villages du Cameroun". Il inclut :
-- 
-- 1. Tables géographiques (régions, départements, arrondissements, villages)
-- 2. Tables de contenu (descriptions, photos, POI)
-- 3. Tables administratives (profils admin, sessions, logs)
-- 4. Tables de gestion (paiements, imports, notifications)
-- 5. Vues optimisées pour les requêtes complexes
-- 6. Policies RLS pour la sécurité
-- 7. Configuration du storage Supabase
-- 8. Index pour les performances
-- 9. Triggers pour la maintenance automatique
-- 10. Données de configuration initiale