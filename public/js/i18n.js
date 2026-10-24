/**
 * MonVillage i18n - Bilingual translation system (FR/EN)
 */
(function() {
    'use strict';

    const TRANSLATIONS = {
        fr: {
            // App
            app: {
                title: 'MonVillage',
                subtitle_cm: 'Cartographie des Villages du Cameroun',
                subtitle_ug: 'Cartographie des Villages de l\'Ouganda',
                copyright_cm: '© 2024 MonVillage - Cartographie des Villages du Cameroun',
                copyright_ug: '© 2024 MonVillage - Cartographie des Villages de l\'Ouganda',
            },

            // Header
            header: {
                admin: 'Admin',
            },

            // Search
            search: {
                placeholder_cm: 'Rechercher un village ou un chef...',
                placeholder_ug: 'Rechercher un village ou une ville...',
                no_results: 'Aucun résultat trouvé',
                offline_warning: 'Recherche hors ligne limitée',
                badge_village: 'Village',
                badge_ponctuel: 'Ponctuel',
                badge_town: 'Ville',
                badge_city: 'Cité',
                badge_hamlet: 'Hameau',
                badge_suburb: 'Banlieue',
                badge_locality: 'Localité',
            },

            // Sidebar
            sidebar: {
                legend: 'Légende',
                layers: 'Couches cartographiques',
                regions: 'Régions',
                departements: 'Départements',
                arrondissements: 'Arrondissements',
                districts: 'Districts',
                villages: 'Villages',
                villages_ponctuels: 'Villages ponctuels',
                poi: 'Points d\'intérêt',
                geonames: 'Géonymes',
            },

            // Legend
            legend: {
                regions: 'Régions',
                departements: 'Départements',
                arrondissements: 'Arrondissements',
                districts: 'Districts',
                villages: 'Villages',
                chefferie_1: 'Chefferie 1er degré',
                chefferie_2: 'Chefferie 2ème degré',
                chefferie_3: 'Chefferie 3ème degré',
                schools: 'Écoles',
                health_centers: 'Centres de santé',
            },

            // Toolbar
            toolbar: {
                measure_distance: 'Mesurer une distance',
                measure_area: 'Mesurer une surface',
                clear_measurements: 'Effacer les mesures',
                print_map: 'Imprimer la carte',
                zoom_home: 'Vue d\'ensemble',
                satellite_view: 'Vue satellite',
                view_3d: 'Vue 3D',
                my_position: 'Ma position',
            },

            // VP Admin
            vp: {
                cancel: 'Annuler',
                add_tool: 'Ajouter',
                add_title: 'Ajouter un village (clic sur carte)',
                edit_mode: 'Mode édition',
                end_edit: 'Fin édition',
                move_click: 'Cliquez pour placer le village',
                edit: 'Modifier',
                move: 'Déplacer',
                delete: 'Supprimer',
            },

            // Disclaimer
            disclaimer: {
                title: 'Avertissement important',
                welcome_cm: 'Bienvenue sur <strong>MonVillage</strong>, plateforme de cartographie communautaire des villages du Cameroun.',
                welcome_ug: 'Bienvenue sur <strong>MonVillage</strong>, plateforme de cartographie communautaire des villages de l\'Ouganda.',
                warning: 'Cette cartographie est fournie <strong>à titre purement indicatif et informatif</strong>. Elle ne saurait en aucun cas être utilisée pour régler des litiges territoriaux ou fonciers.',
                limits_cm: 'Les <strong>limites administratives</strong> (régions, départements, arrondissements) ainsi que certains <strong>noms de lieux</strong> et <strong>localisations de villages</strong> sont approximatifs et peuvent comporter des inexactitudes.',
                limits_ug: 'Les <strong>limites administratives</strong> (régions, districts) ainsi que certains <strong>noms de lieux</strong> et <strong>localisations de villages</strong> sont approximatifs et peuvent comporter des inexactitudes.',
                refer: 'Pour toute question officielle relative aux limites territoriales, veuillez vous référer aux autorités administratives compétentes.',
                accept: 'J\'ai compris et j\'accepte',
            },

            // Popups
            popup: {
                type: 'Type',
                area: 'Superficie',
                population: 'Population',
                inhabitants: 'habitants',
                region: 'Région',
                departement: 'Département',
                arrondissement: 'Arrondissement',
                district: 'District',
                village: 'Village',
                village_ponctuel: 'Village ponctuel',
                vp_type: 'Village ponctuel',
                village_chief: 'Chef de Village',
                chief_photo: 'Photo du chef',
                chief: 'Chef de Village',
                chief_years: '{years} ans de service',
                years_service: 'ans de service',
                learn_more: 'En savoir plus',
                no_name: 'Sans nom',
                undetermined: 'Non déterminé',
                edit: 'Modifier',
                move: 'Déplacer',
            },

            // Village modal
            village: {
                chief_label: 'Chef de Village',
                chief_start_date: 'Date de Prise de Service',
                telephone: 'Téléphone',
                email: 'Email',
                area: 'Superficie',
                estimated_pop: 'Population Estimée',
                not_specified: 'Non renseigné',
                not_specified_f: 'Non renseignée',
                not_provided: 'Non renseignée',
                not_available: 'Non disponible',
                not_calculated: 'Non calculée',
                not_determined: 'Non déterminé',
                photos: 'Photos',
                tab_info: 'Informations',
                tab_description: 'Description Complète',
                general_info: 'Informations Générales',
                belongs_to: 'Ce village fait partie de l\'arrondissement',
                no_description: 'Aucune description détaillée n\'est disponible pour ce village pour le moment.',
                // Description sections
                desc_presentation: '1. Présentation Générale',
                desc_history: 'Histoire et Origine',
                desc_limits: 'Description des Limites',
                desc_importance: 'Importance dans la Région',
                desc_culture: '2. Culture & Traditions',
                desc_dances: 'Danses, Musiques et Rites',
                desc_gastronomy: 'Gastronomie Locale',
                desc_festivals: 'Fêtes Traditionnelles',
                desc_population: '3. Population',
                desc_demography: 'Structure Démographique',
                desc_ethnic: 'Groupes Ethniques',
                desc_economy: '4. Économie Locale',
                desc_activities: 'Activités Génératrices de Revenus',
                desc_products: 'Produits du Terroir',
                desc_infrastructure: '5. Infrastructures',
                desc_schools: 'Établissements Scolaires',
                desc_health: 'Centres de Santé',
                desc_roads: 'Routes et Transport',
                desc_utilities: 'Électricité et Eau',
                desc_tourism: '6. Tourisme & Attractions',
                desc_natural_sites: 'Sites Naturels',
                desc_cultural_sites: 'Sites Culturels',
                desc_personalities: '7. Personnalités',
                desc_notable: 'Personnalités Originaires',
            },

            // Print/Export modal
            print: {
                title: 'Exporter la Carte',
                map_title_label: 'Titre de la carte',
                map_title_default: 'Carte des Villages - MonVillage',
                zone_source: 'Source de la zone',
                manual_select: 'Sélection manuelle sur la carte',
                admin_unit: 'Unité administrative / Village',
                type_label: 'Type',
                choose: '-- Choisir --',
                choose_entity: '-- Choisir une entité --',
                select_zone: 'Sélectionner une zone',
                current_view: 'Vue actuelle',
                clear: 'Effacer',
                output_format: 'Format de sortie',
                png_label: 'PNG (image haute qualité)',
                pdf_label: 'PDF',
                paper_size: 'Taille du papier',
                custom: 'Perso.',
                custom_price: '10k/m²',
                custom_dimensions: 'Dimensions personnalisées (m)',
                custom_hint: 'Min 1m, Max 2m. Prix: 10 000 {currency}/m²',
                scale_label: 'Échelle souhaitée (optionnel)',
                scale_hint: 'Définir une échelle impose un format de papier. Laisser vide pour calcul auto.',
                display_options: 'Options d\'affichage',
                north_arrow: 'Flèche Nord',
                scale_bar: 'Échelle graphique',
                legend_opt: 'Légende',
                coordinates: 'Coordonnées',
                preview: 'Aperçu',
                summary_format: 'Format:',
                summary_file: 'Fichier:',
                summary_scale: 'Échelle calculée:',
                summary_zone: 'Zone:',
                summary_price: 'Prix total:',
                no_selection: 'Aucune sélection',
                cancel: 'Annuler',
                pay_export: 'Payer et Exporter',
                region: 'Région',
                departement: 'Département',
                arrondissement: 'Arrondissement',
                district: 'District',
                village: 'Village',
                export_title: 'Exportation de Carte',
                progress_preparing: 'Préparation de votre carte...',
                progress_adjusting: 'Ajustement de la vue...',
                progress_labels: 'Ajout des labels...',
                progress_tiles: 'Chargement des tuiles...',
                progress_capture: 'Capture de la carte...',
                progress_composing: 'Composition de la carte...',
                progress_generating: 'Génération du fichier...',
                progress_ready: 'Carte prête ! Passage au paiement...',
                legend_title: 'Légende',
                legend_regions: 'Régions',
                legend_departements: 'Départements',
                legend_districts: 'Districts',
                legend_arrondissements: 'Arrondissements',
                legend_villages: 'Villages',
                footer_scale: 'Échelle',
                stop_selection: 'Arrêter sélection',
                validate_zone: 'Valider la zone',
                format_too_large: 'format trop grand !',
                very_detailed: 'très détaillé',
                very_large_zone: 'très grande zone',
                custom_label: 'Personnalisé',
                geo_intl_rate: '<strong>🌍 Tarif international</strong> — Les prix sont multipliés par 3 hors Afrique. <a href="mailto:intello.corporation@gmail.com?subject=MonVillage Abonnement" style="color:#4a7c59;font-weight:bold;">Abonnez-vous à 10$/mois</a> pour des exports illimités.',
            },

            // Payment modal
            payment: {
                title: 'Paiement sécurisé',
                details: 'Détails:',
                mobile_money: 'Mobile Money',
                mobile_desc_cm: 'Orange / MTN MoMo',
                mobile_desc_ug: 'MTN / Airtel Money',
                card: 'Carte Bancaire',
                card_desc: 'Visa, Mastercard',
                phone_label: 'Numéro de téléphone *',
                phone_placeholder_cm: '+237 6XX XXX XXX',
                phone_placeholder_ug: '+256 7XX XXX XXX',
                name_label: 'Nom sur la carte *',
                name_placeholder: 'Nom complet',
                cancel: 'Annuler',
                pay: 'Payer',
                pay_mobile: 'Payer par Mobile Money',
                pay_card: 'Payer par Carte',
            },

            // Measurement
            measure: {
                total: 'Total',
                surface: 'Surface',
                points: 'points',
                segments: 'segments',
            },

            // Subscription modal
            subscription: {
                title: 'Accès illimité depuis l\'étranger',
                text: 'Nous avons détecté que vous naviguez depuis l\'extérieur de l\'Afrique. Les exports de carte sont disponibles au tarif international, ou vous pouvez souscrire un abonnement illimité :',
                month: 'mois',
                includes: 'Exports de cartes illimités dans tous les formats',
                alt: 'Ou continuez avec le paiement à l\'export au tarif x3.',
                close: 'Plus tard',
                subscribe: 'S\'abonner',
            },

            // Loading
            loading: {
                generating: 'Génération de votre carte...',
                please_wait: 'Veuillez patienter.',
            },

            // Admin panel
            admin: {
                col_name: 'Nom',
                col_parent_cm: 'Arrondissement',
                col_parent_ug: 'District',
                col_chief: 'Chef',
                col_population: 'Population',
                col_actions: 'Actions',
            },

            // Notifications
            notif: {
                loading_layers: 'Chargement des couches...',
                data_loaded: 'Données chargées',
                demo_mode: 'Mode démo - pas de données',
                load_error: 'Erreur de chargement des données',
                search_error: 'Erreur lors de la recherche',
                offline_search: 'Recherche hors ligne limitée',
                geo_not_supported: 'Géolocalisation non supportée par ce navigateur',
                geo_searching: 'Recherche de votre position...',
                geo_tracking_off: 'Suivi de position désactivé',
                geo_found: 'Position trouvée (±{accuracy}m) — suivi actif',
                geo_error: 'Impossible d\'obtenir votre position',
                select_zone: 'Veuillez sélectionner une zone avant de payer',
                payment_success: 'Paiement réussi',
                payment_mobile_success: 'Paiement Mobile Money réussi',
                payment_card_success: 'Paiement par carte réussi',
                payment_cancelled: 'Paiement annulé. La carte n\'a pas été exportée.',
                payment_error: 'Erreur de paiement',
                export_error: 'Erreur: la carte n\'a pas pu être préparée. Réessayez.',
                village_added: 'Village ajouté',
                village_updated: 'Village modifié',
                village_deleted: 'Village supprimé',
                name_required: 'Le nom est requis',
                invalid_coords: 'Coordonnées invalides',
                admin_only: 'Accès réservé aux administrateurs',
                app_loaded: 'MonVillage chargé avec succès',
                measure_distance_start: 'Cliquez sur la carte pour mesurer la distance',
                measure_area_start: 'Cliquez sur la carte pour dessiner une surface',
                measurements_cleared: 'Mesures effacées',
                zone_selected: 'Zone sélectionnée',
                print_area_draw: 'Dessinez un rectangle sur la carte',
                session_expired: 'Session expirée, veuillez vous reconnecter',
                copy_success: 'Copié dans le presse-papiers',
                village_found: 'Village "{name}" trouvé',
                print_zone_activated: 'Zone de sélection activée - Déplacez le rectangle ou ses coins',
                current_view_selected: 'Vue actuelle sélectionnée',
                selection_cleared: 'Sélection effacée',
                scale_too_large: 'A cette échelle, le papier devrait mesurer {width}m x {height}m, ce qui dépasse le maximum de 2m x 2m. Choisissez une échelle plus petite.',
                data_not_loaded: 'Données non chargées. Veuillez attendre le chargement complet.',
                no_geometry: 'Pas de géométrie pour cette entité',
                invalid_geometry: 'Géométrie invalide',
                entity_zone_selected: 'Zone de l\'entité sélectionnée',
                entity_bounds_error: 'Impossible de déterminer les limites de cette entité',
                village_details_error: 'Impossible de charger les détails du village',
                geo_permission_denied: 'Autorisation de géolocalisation refusée',
                geo_position_unavailable: 'Position non disponible',
                geo_timeout: 'Délai de géolocalisation dépassé. Nouvelle tentative...',
                all_measures_cleared: 'Toutes les mesures effacées',
                measure_click_to_add: 'Cliquez pour ajouter des points. Double-clic pour terminer.',
                total_distance: 'Distance totale: {distance}',
                measure_draw_polygon: 'Cliquez pour dessiner un polygone. Double-clic pour terminer.',
                area_result: 'Surface: {area}',
                map_prep_error: 'Erreur lors de la préparation de la carte. Réessayez.',
                payment_not_completed: 'Le paiement n\'a pas abouti. Veuillez réessayer.',
                payment_processing_error: 'Erreur lors du traitement du paiement',
                payment_ussd_success: 'Paiement USSD réussi',
                payment_ok_export_error: 'Paiement réussi mais erreur lors de la génération',
                payment_cancelled_short: 'Paiement annulé',
                subscriber_export: 'Export gratuit (abonnement actif)',
                map_exported: 'Carte exportée: {filename}',
                export_success: 'Exportation réussie: {filename}',
                export_cross_origin_error: 'Erreur lors de l\'export. Les tuiles cross-origin peuvent bloquer la capture. Essayez le format PDF ou la vue satellite.',
                error_prefix: 'Erreur: {message}',
                delete_error: 'Erreur suppression',
                offline_demo: 'Mode hors ligne - données démo',
                unexpected_error: 'Une erreur inattendue s\'est produite',
                connection_error: 'Erreur de connexion - vérifiez votre réseau',
            },

            // Measurements
            measure: {
                distance: 'Distance',
                area: 'Surface',
                total: 'Total',
            },

            // Geolocation popup
            geo: {
                your_position: 'Votre Position',
                latitude: 'Latitude',
                longitude: 'Longitude',
                precision: 'Précision',
                speed: 'Vitesse',
                tracking_active: 'Suivi en temps réel actif',
                km_h: 'km/h',
            },

            // Footer
            footer: {
                email: 'monvillage.cm@gmail.com',
                phone: '+237 697 182 925',
            },

            // Country selector
            country: {
                label: 'Pays',
                cameroon: 'Cameroun',
                uganda: 'Ouganda',
            },

            // Language selector
            lang: {
                label: 'Langue',
                fr: 'Français',
                en: 'English',
            },

            // Admin panel
            admin: {
                dashboard: 'Tableau de bord',
                villages: 'Villages',
                villages_ponctuels: 'Villages ponctuels',
                poi: 'Points d\'intérêt',
                geonames: 'Géonymes',
                users: 'Utilisateurs',
                payments: 'Paiements',
                my_account: 'Mon compte',
                logout: 'Déconnexion',
                general_stats: 'Statistiques générales',
                weekly_visits: 'Visites par jour (7 derniers jours)',
                weekly_payments: 'Historique des paiements (7 derniers jours)',
                village_management: 'Gestion des Villages',
                new_village: 'Nouveau Village',
                new_poi: 'Nouveau POI',
                new_geoname: 'Nouveau Géonyme',
                new_vp: 'Nouveau Village Ponctuel',
                new_user: 'Nouvel Utilisateur',
                export_csv: 'Exporter CSV',
                save: 'Enregistrer',
                save_village: 'Enregistrer le Village',
                save_poi: 'Enregistrer le POI',
                save_geoname: 'Enregistrer le Géonyme',
                save_user: 'Enregistrer l\'Utilisateur',
                cancel: 'Annuler',
                edit: 'Éditer',
                delete: 'Supprimer',
                confirm_delete: 'Confirmer la suppression ?',
                loading: 'Chargement...',
                no_data: 'Aucune donnée',
                prev: '← Préc.',
                next: 'Suiv. →',
                // Table headers
                th_name: 'Nom',
                th_arrondissement: 'Arrondissement',
                th_district: 'District',
                th_chief: 'Chef',
                th_population: 'Population',
                th_actions: 'Actions',
                th_type: 'Type',
                th_village: 'Village',
                th_role: 'Rôle',
                th_active: 'Actif',
                th_date: 'Date',
                th_amount: 'Montant',
                th_method: 'Méthode',
                th_contact: 'Contact',
                th_format: 'Format',
                th_status: 'Statut',
                th_map_title: 'Titre carte',
                th_ref: 'Réf. Transaction',
                // Village form
                form_village_name: 'Nom du village *',
                form_arrondissement: 'Arrondissement *',
                form_district: 'District *',
                form_chief_name: 'Nom du chef',
                form_chief_date: 'Date de prise de service',
                form_email: 'Email',
                form_telephone: 'Téléphone',
                form_population: 'Population estimée',
                form_chefferie: 'Catégorie de chefferie',
                form_chefferie_select: 'Sélectionner une catégorie...',
                form_chefferie_1: 'Chefferie 1er degré',
                form_chefferie_2: 'Chefferie 2ème degré',
                form_chefferie_3: 'Chefferie 3ème degré',
                form_area: 'Superficie (hectares)',
                form_area_auto: 'Sera calculée automatiquement après saisie de la géométrie',
                form_geom_method: 'Méthode de saisie de la géométrie *',
                form_geom_upload: 'Upload SQL',
                form_geom_draw: 'Dessiner',
                form_geom_format: 'Format de géométrie *',
                form_geom: 'Géométrie',
                form_start_draw: 'Commencer le dessin',
                form_clear: 'Effacer',
                form_chief_photo: 'Photo du chef (optionnel)',
                form_village_photos: 'Photos du village (max 2)',
                form_description: 'Description détaillée du village',
                form_add_description: 'Ajouter une description détaillée',
                form_publish: 'Publier cette description (visible au public)',
                // VP form
                form_vp_name: 'Nom *',
                form_vp_parent: 'Arrondissement',
                form_vp_parent_ug: 'District',
                form_vp_population: 'Population',
                form_vp_coords: 'Coordonnées',
                form_vp_click: 'Cliquez sur la carte pour placer le village',
                // Description sub-sections
                desc_s1: '1. Présentation générale',
                desc_s1_history: 'Histoire ou origine du nom',
                desc_s1_limits: 'Description des limites',
                desc_s1_importance: 'Importance dans la région',
                desc_s2: '2. Culture & Traditions',
                desc_s2_dances: 'Danses, musiques, rites',
                desc_s2_gastro: 'Gastronomie locale',
                desc_s2_festivals: 'Fêtes traditionnelles',
                desc_s3: '3. Population',
                desc_s3_demog: 'Structure démographique',
                desc_s3_ethnic: 'Groupes ethniques',
                desc_s4: '4. Économie locale',
                desc_s4_activities: 'Activités génératrices de revenus',
                desc_s4_products: 'Produits typiques du terroir',
                desc_s5: '5. Infrastructures',
                desc_s5_schools: 'Écoles',
                desc_s5_health: 'Centres de santé',
                desc_s5_roads: 'Routes et transport',
                desc_s5_utilities: 'Accès à l\'électricité/eau',
                desc_s6: '6. Tourisme & Attractions',
                desc_s6_natural: 'Sites naturels',
                desc_s6_cultural: 'Sites culturels',
                desc_s7: '7. Personnalités',
                desc_s7_notable: 'Personnalités originaires du village',
                // Geoname types
                geo_type_mountain: 'Montagne',
                geo_type_hill: 'Colline',
                geo_type_river: 'Rivière',
                geo_type_lake: 'Lac',
                geo_type_forest: 'Forêt',
                geo_type_plateau: 'Plateau',
                geo_type_valley: 'Vallée',
                geo_type_other: 'Autre',
                // POI form
                form_poi_coords: 'Coordonnées',
                form_poi_click: 'Clic sur carte',
                // Filters
                filter_all_arr: 'Tous les arrondissements',
                filter_all_districts: 'Tous les districts',
                filter_all_status: 'Tous les statuts',
                filter_success: 'Succès',
                filter_pending: 'En attente',
                filter_failed: 'Échoué',
                filter_all_period: 'Toute période',
                filter_7days: '7 derniers jours',
                filter_30days: '30 derniers jours',
                filter_3months: '3 derniers mois',
                // Mon compte
                account_info: 'Informations du compte',
                account_email: 'Email',
                account_name: 'Nom complet',
                account_role: 'Rôle',
                account_last_login: 'Dernière connexion',
                account_change_pwd: 'Changer le mot de passe',
                account_new_pwd: 'Nouveau mot de passe',
                account_confirm_pwd: 'Confirmer le nouveau mot de passe',
                account_pwd_placeholder: 'Minimum 8 caractères',
                account_pwd_confirm_placeholder: 'Retapez le mot de passe',
                account_submit_pwd: 'Modifier le mot de passe',
                pwd_rule_length: 'Au moins 8 caractères',
                pwd_rule_upper: 'Une lettre majuscule',
                pwd_rule_digit: 'Un chiffre',
                pwd_rule_special: 'Un caractère spécial (@, #, $, etc.)',
                // Messages
                msg_connected: 'Admin connecté',
                msg_auth_error: 'Erreur d\'authentification',
                msg_section_error: 'Erreur lors du changement de section',
                msg_dashboard_error: 'Erreur lors du chargement du tableau de bord',
                msg_visits: ' visites',
                msg_no_payment_week: 'Aucun paiement cette semaine',
                msg_mobile_unknown: 'Mobile (non renseigné)',
                msg_card_unknown: 'Carte (non renseigné)',
                msg_undefined_cat: 'Non définie',
                msg_not_calculated: 'Non calculée',
                msg_village_load_error: 'Erreur lors du chargement des villages',
                msg_poi_load_error: 'Erreur lors du chargement des POI',
                msg_geo_load_error: 'Erreur lors du chargement des géonymes',
                msg_user_load_error: 'Erreur lors du chargement des utilisateurs',
                msg_village_saved: 'Village enregistré avec succès !',
                msg_chefferie_invalid: 'Catégorie de chefferie invalide.',
                msg_village_exists: 'Un village avec ce nom existe déjà.',
                msg_arr_invalid: 'Arrondissement sélectionné invalide.',
                msg_auth_issue: 'Problème d\'autorisation. Vérifiez votre connexion.',
                msg_no_geom_drawn: 'Aucune géométrie dessinée',
                msg_geom_required: 'Géométrie requise',
                msg_max_photos: 'Maximum 2 photos autorisées',
                msg_delete_error: 'Erreur lors de la suppression du village',
                msg_no_vp: 'Aucun village ponctuel trouvé',
                msg_vp_name_required: 'Le nom est requis',
                msg_vp_click_place: 'Cliquez sur la carte pour placer le village',
                msg_vp_updated: 'Village ponctuel modifié',
                msg_vp_added: 'Village ponctuel ajouté',
                msg_no_payment: 'Aucun paiement trouvé',
                msg_no_export: 'Aucun paiement à exporter',
                msg_never: 'Jamais',
                msg_pwd_mismatch: 'Les mots de passe ne correspondent pas.',
                msg_pwd_weak: 'Le mot de passe ne respecte pas les critères requis.',
                msg_pwd_changing: 'Modification en cours...',
                msg_pwd_changed: 'Mot de passe modifié avec succès !',
                msg_no_village_select: 'Aucun village spécifique',
                // Additional admin keys for multi-country
                title: 'MonVillage Admin',
                poi_management: 'Gestion des Points d\'Intérêt',
                geoname_management: 'Gestion des Géonymes',
                user_management: 'Gestion des Utilisateurs',
                payments_listing: 'Listing des Paiements',
                add_village_title: 'Ajouter un Village',
                edit_village_title: 'Éditer le Village',
                add_poi_title: 'Ajouter un Point d\'Intérêt',
                add_geoname_title: 'Ajouter un Géonyme',
                add_vp_title: 'Ajouter un Village Ponctuel',
                edit_vp_title: 'Modifier le Village Ponctuel',
                add_user_title: 'Ajouter un Utilisateur',
                form_poi_name: 'Nom du POI *',
                form_poi_village: 'Village associé',
                form_poi_type: 'Type de POI *',
                form_poi_description: 'Description',
                form_poi_method: 'Méthode de positionnement *',
                form_geoname_name: 'Nom du géonyme *',
                form_geoname_type: 'Type *',
                form_geoname_description: 'Description',
                form_geoname_method: 'Méthode de positionnement *',
                form_user_name: 'Nom complet',
                form_user_role: 'Rôle',
                form_user_active: 'Actif',
                form_latitude: 'Latitude *',
                form_longitude: 'Longitude *',
                search_contact_placeholder: 'Rechercher un contact...',
                search_village_placeholder: 'Rechercher un village...',
                total_label: 'Total',
                total_this_week: 'Total cette semaine',
                revenue_this_week: 'Revenu cette semaine',
                vp_total_label: 'villages ponctuels',
                payments_total: 'paiements',
                amount_total: 'Montant',
                vp_position_label: 'Position (cliquez sur la carte) *',
                yes_label: 'Oui',
                no_label: 'Non',
                descriptions: 'Descriptions',
            },

            // Login page
            login: {
                title: 'Connexion Admin - MonVillage',
                heading: 'Administration',
                subtitle: 'Accès à l\'interface d\'administration MonVillage',
                email_label: 'Email',
                email_placeholder: 'votre.email@exemple.com',
                password_label: 'Mot de passe',
                password_placeholder: 'Votre mot de passe',
                submit: 'Se connecter',
                otp_sent: 'Un code de vérification à 6 chiffres a été envoyé à votre adresse email. Consultez votre boîte de réception (et vos spams).',
                otp_label: 'Code OTP',
                otp_verify: 'Vérifier le code',
                otp_resend: 'Renvoyer le code',
                back_to_login: 'Retour à la connexion',
                back_to_app: 'Retour à l\'application',
                otp_expired: 'Code expiré. Veuillez en demander un nouveau.',
                otp_valid_for: 'Code valide pendant {min}:{sec}',
                verifying: 'Vérification...',
                auth_error: 'Erreur d\'authentification',
                not_authorized: 'Accès non autorisé. Vous devez être administrateur.',
                otp_sent_to: 'Un code de vérification a été envoyé à {email}',
                enter_6_digits: 'Veuillez saisir un code à 6 chiffres.',
                code_expired: 'Le code a expiré. Veuillez en demander un nouveau.',
                code_incorrect: 'Code incorrect. Veuillez réessayer.',
                verified: 'Vérification réussie ! Redirection...',
                new_code_sent: 'Un nouveau code a été envoyé.',
                resend_error: 'Erreur lors du renvoi du code. Réessayez dans quelques instants.',
            },
        },

        en: {
            // App
            app: {
                title: 'MonVillage',
                subtitle_cm: 'Mapping of Cameroon Villages',
                subtitle_ug: 'Mapping of Uganda Villages',
                copyright_cm: '© 2024 MonVillage - Mapping of Cameroon Villages',
                copyright_ug: '© 2024 MonVillage - Mapping of Uganda Villages',
            },

            // Header
            header: {
                admin: 'Admin',
            },

            // Search
            search: {
                placeholder_cm: 'Search for a village or chief...',
                placeholder_ug: 'Search for a village or town...',
                no_results: 'No results found',
                offline_warning: 'Limited offline search',
                badge_village: 'Village',
                badge_ponctuel: 'Point',
                badge_town: 'Town',
                badge_city: 'City',
                badge_hamlet: 'Hamlet',
                badge_suburb: 'Suburb',
                badge_locality: 'Locality',
            },

            // Sidebar
            sidebar: {
                legend: 'Legend',
                layers: 'Map layers',
                regions: 'Regions',
                departements: 'Divisions',
                arrondissements: 'Subdivisions',
                districts: 'Districts',
                villages: 'Villages',
                villages_ponctuels: 'Point villages',
                poi: 'Points of interest',
                geonames: 'Geonames',
            },

            // Legend
            legend: {
                regions: 'Regions',
                departements: 'Divisions',
                arrondissements: 'Subdivisions',
                districts: 'Districts',
                villages: 'Villages',
                chefferie_1: '1st degree chieftaincy',
                chefferie_2: '2nd degree chieftaincy',
                chefferie_3: '3rd degree chieftaincy',
                schools: 'Schools',
                health_centers: 'Health centers',
            },

            // Toolbar
            toolbar: {
                measure_distance: 'Measure distance',
                measure_area: 'Measure area',
                clear_measurements: 'Clear measurements',
                print_map: 'Print map',
                zoom_home: 'Overview',
                satellite_view: 'Satellite view',
                view_3d: '3D View',
                my_position: 'My location',
            },

            // VP Admin
            vp: {
                cancel: 'Cancel',
                add_tool: 'Add',
                add_title: 'Add a village (click on map)',
                edit_mode: 'Edit mode',
                end_edit: 'End editing',
                move_click: 'Click to place the village',
                edit: 'Edit',
                move: 'Move',
                delete: 'Delete',
            },

            // Disclaimer
            disclaimer: {
                title: 'Important Notice',
                welcome_cm: 'Welcome to <strong>MonVillage</strong>, a community mapping platform for Cameroon villages.',
                welcome_ug: 'Welcome to <strong>MonVillage</strong>, a community mapping platform for Uganda villages.',
                warning: 'This mapping is provided <strong>for informational purposes only</strong>. It cannot be used to settle territorial or land disputes.',
                limits_cm: '<strong>Administrative boundaries</strong> (regions, departments, subdivisions) as well as some <strong>place names</strong> and <strong>village locations</strong> are approximate and may contain inaccuracies.',
                limits_ug: '<strong>Administrative boundaries</strong> (regions, districts) as well as some <strong>place names</strong> and <strong>village locations</strong> are approximate and may contain inaccuracies.',
                refer: 'For any official questions regarding territorial boundaries, please refer to the competent administrative authorities.',
                accept: 'I understand and accept',
            },

            // Popups
            popup: {
                type: 'Type',
                area: 'Area',
                population: 'Population',
                inhabitants: 'inhabitants',
                region: 'Region',
                departement: 'Division',
                arrondissement: 'Subdivision',
                district: 'District',
                village: 'Village',
                village_ponctuel: 'Point village',
                vp_type: 'Point village',
                village_chief: 'Village Chief',
                chief_photo: 'Chief photo',
                chief: 'Village Chief',
                chief_years: '{years} years of service',
                years_service: 'years of service',
                learn_more: 'Learn more',
                no_name: 'Unnamed',
                undetermined: 'Undetermined',
                edit: 'Edit',
                move: 'Move',
            },

            // Village modal
            village: {
                chief_label: 'Village Chief',
                chief_start_date: 'Date of Appointment',
                telephone: 'Phone',
                email: 'Email',
                area: 'Area',
                estimated_pop: 'Estimated Population',
                not_specified: 'Not specified',
                not_specified_f: 'Not specified',
                not_provided: 'Not specified',
                not_available: 'Not available',
                not_calculated: 'Not calculated',
                not_determined: 'Undetermined',
                photos: 'Photos',
                tab_info: 'Information',
                tab_description: 'Full Description',
                general_info: 'General Information',
                belongs_to: 'This village belongs to the subdivision',
                no_description: 'No detailed description is available for this village at this time.',
                desc_presentation: '1. General Overview',
                desc_history: 'History and Origin',
                desc_limits: 'Boundary Description',
                desc_importance: 'Regional Importance',
                desc_culture: '2. Culture & Traditions',
                desc_dances: 'Dances, Music and Rituals',
                desc_gastronomy: 'Local Gastronomy',
                desc_festivals: 'Traditional Festivals',
                desc_population: '3. Population',
                desc_demography: 'Demographic Structure',
                desc_ethnic: 'Ethnic Groups',
                desc_economy: '4. Local Economy',
                desc_activities: 'Income-Generating Activities',
                desc_products: 'Local Products',
                desc_infrastructure: '5. Infrastructure',
                desc_schools: 'Schools',
                desc_health: 'Health Centers',
                desc_roads: 'Roads and Transport',
                desc_utilities: 'Electricity and Water',
                desc_tourism: '6. Tourism & Attractions',
                desc_natural_sites: 'Natural Sites',
                desc_cultural_sites: 'Cultural Sites',
                desc_personalities: '7. Notable Figures',
                desc_notable: 'Notable Natives',
            },

            // Print/Export modal
            print: {
                title: 'Export Map',
                map_title_label: 'Map title',
                map_title_default: 'Village Map - MonVillage',
                zone_source: 'Zone source',
                manual_select: 'Manual selection on map',
                admin_unit: 'Administrative unit / Village',
                type_label: 'Type',
                choose: '-- Choose --',
                choose_entity: '-- Choose an entity --',
                select_zone: 'Select a zone',
                current_view: 'Current view',
                clear: 'Clear',
                output_format: 'Output format',
                png_label: 'PNG (high quality image)',
                pdf_label: 'PDF',
                paper_size: 'Paper size',
                custom: 'Custom',
                custom_price: '10k/m²',
                custom_dimensions: 'Custom dimensions (m)',
                custom_hint: 'Min 1m, Max 2m. Price: 10,000 {currency}/m²',
                scale_label: 'Desired scale (optional)',
                scale_hint: 'Setting a scale imposes a paper size. Leave empty for auto.',
                display_options: 'Display options',
                north_arrow: 'North arrow',
                scale_bar: 'Scale bar',
                legend_opt: 'Legend',
                coordinates: 'Coordinates',
                preview: 'Preview',
                summary_format: 'Format:',
                summary_file: 'File:',
                summary_scale: 'Calculated scale:',
                summary_zone: 'Zone:',
                summary_price: 'Total price:',
                no_selection: 'No selection',
                cancel: 'Cancel',
                pay_export: 'Pay and Export',
                region: 'Region',
                departement: 'Division',
                arrondissement: 'Subdivision',
                district: 'District',
                village: 'Village',
                export_title: 'Map Export',
                progress_preparing: 'Preparing your map...',
                progress_adjusting: 'Adjusting the view...',
                progress_labels: 'Adding labels...',
                progress_tiles: 'Loading tiles...',
                progress_capture: 'Capturing the map...',
                progress_composing: 'Composing the map...',
                progress_generating: 'Generating file...',
                progress_ready: 'Map ready! Proceeding to payment...',
                legend_title: 'Legend',
                legend_regions: 'Regions',
                legend_departements: 'Divisions',
                legend_districts: 'Districts',
                legend_arrondissements: 'Subdivisions',
                legend_villages: 'Villages',
                footer_scale: 'Scale',
                stop_selection: 'Stop selection',
                validate_zone: 'Validate zone',
                format_too_large: 'format too large!',
                very_detailed: 'very detailed',
                very_large_zone: 'very large zone',
                custom_label: 'Custom',
                geo_intl_rate: '<strong>🌍 International rate</strong> — Prices are 3× for users outside Africa. <a href="mailto:intello.corporation@gmail.com?subject=MonVillage Subscription" style="color:#4a7c59;font-weight:bold;">Subscribe for $10/month</a> for unlimited exports.',
            },

            // Payment modal
            payment: {
                title: 'Secure Payment',
                details: 'Details:',
                mobile_money: 'Mobile Money',
                mobile_desc_cm: 'Orange / MTN MoMo',
                mobile_desc_ug: 'MTN / Airtel Money',
                card: 'Bank Card',
                card_desc: 'Visa, Mastercard',
                phone_label: 'Phone number *',
                phone_placeholder_cm: '+237 6XX XXX XXX',
                phone_placeholder_ug: '+256 7XX XXX XXX',
                name_label: 'Name on card *',
                name_placeholder: 'Full name',
                cancel: 'Cancel',
                pay: 'Pay',
                pay_mobile: 'Pay with Mobile Money',
                pay_card: 'Pay with Card',
            },

            // Measurement
            measure: {
                total: 'Total',
                surface: 'Area',
                points: 'points',
                segments: 'segments',
            },

            // Subscription modal
            subscription: {
                title: 'Unlimited access from abroad',
                text: 'We noticed you\'re browsing from outside Africa. Map exports are available at international rates, or you can subscribe for unlimited access:',
                month: 'month',
                includes: 'Unlimited map exports in all formats',
                alt: 'Or continue with pay-per-export at 3× the local rate.',
                close: 'Later',
                subscribe: 'Subscribe',
            },

            // Loading
            loading: {
                generating: 'Generating your map...',
                please_wait: 'Please wait.',
            },

            // Admin panel
            admin: {
                col_name: 'Name',
                col_parent_cm: 'Subdivision',
                col_parent_ug: 'District',
                col_chief: 'Chief',
                col_population: 'Population',
                col_actions: 'Actions',
            },

            // Notifications
            notif: {
                loading_layers: 'Loading layers...',
                data_loaded: 'Data loaded',
                demo_mode: 'Demo mode - no data',
                load_error: 'Data loading error',
                search_error: 'Search error',
                offline_search: 'Limited offline search',
                geo_not_supported: 'Geolocation is not supported by this browser',
                geo_searching: 'Searching for your position...',
                geo_tracking_off: 'Position tracking disabled',
                geo_found: 'Position found (±{accuracy}m) — tracking active',
                geo_error: 'Unable to get your position',
                select_zone: 'Please select a zone before paying',
                payment_success: 'Payment successful',
                payment_mobile_success: 'Mobile Money payment successful',
                payment_card_success: 'Card payment successful',
                payment_cancelled: 'Payment cancelled. The map was not exported.',
                payment_error: 'Payment error',
                export_error: 'Error: the map could not be prepared. Try again.',
                village_added: 'Village added',
                village_updated: 'Village updated',
                village_deleted: 'Village deleted',
                name_required: 'Name is required',
                invalid_coords: 'Invalid coordinates',
                admin_only: 'Access restricted to administrators',
                app_loaded: 'MonVillage loaded successfully',
                measure_distance_start: 'Click on the map to measure distance',
                measure_area_start: 'Click on the map to draw an area',
                measurements_cleared: 'Measurements cleared',
                zone_selected: 'Zone selected',
                print_area_draw: 'Draw a rectangle on the map',
                session_expired: 'Session expired, please log in again',
                copy_success: 'Copied to clipboard',
                village_found: 'Village "{name}" found',
                print_zone_activated: 'Selection zone activated - Move the rectangle or its corners',
                current_view_selected: 'Current view selected',
                selection_cleared: 'Selection cleared',
                scale_too_large: 'At this scale, the paper would need to be {width}m x {height}m, exceeding the 2m x 2m maximum. Choose a smaller scale.',
                data_not_loaded: 'Data not loaded. Please wait for full loading.',
                no_geometry: 'No geometry for this entity',
                invalid_geometry: 'Invalid geometry',
                entity_zone_selected: 'Entity zone selected',
                entity_bounds_error: 'Unable to determine the bounds of this entity',
                village_details_error: 'Unable to load village details',
                geo_permission_denied: 'Geolocation permission denied',
                geo_position_unavailable: 'Position unavailable',
                geo_timeout: 'Geolocation timeout. Retrying...',
                all_measures_cleared: 'All measurements cleared',
                measure_click_to_add: 'Click to add points. Double-click to finish.',
                total_distance: 'Total distance: {distance}',
                measure_draw_polygon: 'Click to draw a polygon. Double-click to finish.',
                area_result: 'Area: {area}',
                map_prep_error: 'Error preparing the map. Please try again.',
                payment_not_completed: 'Payment was not completed. Please try again.',
                payment_processing_error: 'Error processing payment',
                payment_ussd_success: 'USSD payment successful',
                payment_ok_export_error: 'Payment successful but error during generation',
                payment_cancelled_short: 'Payment cancelled',
                subscriber_export: 'Free export (active subscription)',
                map_exported: 'Map exported: {filename}',
                export_success: 'Export successful: {filename}',
                export_cross_origin_error: 'Export error. Cross-origin tiles may block capture. Try PDF format or satellite view.',
                error_prefix: 'Error: {message}',
                delete_error: 'Deletion error',
                offline_demo: 'Offline mode - demo data',
                unexpected_error: 'An unexpected error occurred',
                connection_error: 'Connection error - check your network',
            },

            // Measurements
            measure: {
                distance: 'Distance',
                area: 'Area',
                total: 'Total',
            },

            // Geolocation popup
            geo: {
                your_position: 'Your Position',
                latitude: 'Latitude',
                longitude: 'Longitude',
                precision: 'Accuracy',
                speed: 'Speed',
                tracking_active: 'Real-time tracking active',
                km_h: 'km/h',
            },

            // Footer
            footer: {
                email: 'monvillage.cm@gmail.com',
                phone: '+237 697 182 925',
            },

            // Country selector
            country: {
                label: 'Country',
                cameroon: 'Cameroon',
                uganda: 'Uganda',
            },

            // Language selector
            lang: {
                label: 'Language',
                fr: 'Français',
                en: 'English',
            },

            // Admin panel
            admin: {
                dashboard: 'Dashboard',
                villages: 'Villages',
                villages_ponctuels: 'Point villages',
                poi: 'Points of interest',
                geonames: 'Geonames',
                users: 'Users',
                payments: 'Payments',
                my_account: 'My account',
                logout: 'Log out',
                general_stats: 'General statistics',
                weekly_visits: 'Visits per day (last 7 days)',
                weekly_payments: 'Payment history (last 7 days)',
                village_management: 'Village Management',
                new_village: 'New Village',
                new_poi: 'New POI',
                new_geoname: 'New Geoname',
                new_vp: 'New Point Village',
                new_user: 'New User',
                export_csv: 'Export CSV',
                save: 'Save',
                save_village: 'Save Village',
                save_poi: 'Save POI',
                save_geoname: 'Save Geoname',
                save_user: 'Save User',
                cancel: 'Cancel',
                edit: 'Edit',
                delete: 'Delete',
                confirm_delete: 'Confirm deletion?',
                loading: 'Loading...',
                no_data: 'No data',
                prev: '← Prev',
                next: 'Next →',
                th_name: 'Name',
                th_arrondissement: 'Subdivision',
                th_district: 'District',
                th_chief: 'Chief',
                th_population: 'Population',
                th_actions: 'Actions',
                th_type: 'Type',
                th_village: 'Village',
                th_role: 'Role',
                th_active: 'Active',
                th_date: 'Date',
                th_amount: 'Amount',
                th_method: 'Method',
                th_contact: 'Contact',
                th_format: 'Format',
                th_status: 'Status',
                th_map_title: 'Map title',
                th_ref: 'Transaction Ref.',
                form_village_name: 'Village name *',
                form_arrondissement: 'Subdivision *',
                form_district: 'District *',
                form_chief_name: 'Chief name',
                form_chief_date: 'Date of appointment',
                form_email: 'Email',
                form_telephone: 'Phone',
                form_population: 'Estimated population',
                form_chefferie: 'Chieftaincy category',
                form_chefferie_select: 'Select a category...',
                form_chefferie_1: '1st degree chieftaincy',
                form_chefferie_2: '2nd degree chieftaincy',
                form_chefferie_3: '3rd degree chieftaincy',
                form_area: 'Area (hectares)',
                form_area_auto: 'Will be calculated automatically after geometry input',
                form_geom_method: 'Geometry input method *',
                form_geom_upload: 'Upload SQL',
                form_geom_draw: 'Draw',
                form_geom_format: 'Geometry format *',
                form_geom: 'Geometry',
                form_start_draw: 'Start drawing',
                form_clear: 'Clear',
                form_chief_photo: 'Chief photo (optional)',
                form_village_photos: 'Village photos (max 2)',
                form_description: 'Detailed village description',
                form_add_description: 'Add a detailed description',
                form_publish: 'Publish this description (visible to public)',
                form_vp_name: 'Name *',
                form_vp_parent: 'Subdivision',
                form_vp_parent_ug: 'District',
                form_vp_population: 'Population',
                form_vp_coords: 'Coordinates',
                form_vp_click: 'Click on the map to place the village',
                desc_s1: '1. General overview',
                desc_s1_history: 'History or origin of the name',
                desc_s1_limits: 'Boundary description',
                desc_s1_importance: 'Regional importance',
                desc_s2: '2. Culture & Traditions',
                desc_s2_dances: 'Dances, music, rituals',
                desc_s2_gastro: 'Local gastronomy',
                desc_s2_festivals: 'Traditional festivals',
                desc_s3: '3. Population',
                desc_s3_demog: 'Demographic structure',
                desc_s3_ethnic: 'Ethnic groups',
                desc_s4: '4. Local economy',
                desc_s4_activities: 'Income-generating activities',
                desc_s4_products: 'Typical local products',
                desc_s5: '5. Infrastructure',
                desc_s5_schools: 'Schools',
                desc_s5_health: 'Health centers',
                desc_s5_roads: 'Roads and transport',
                desc_s5_utilities: 'Electricity/water access',
                desc_s6: '6. Tourism & Attractions',
                desc_s6_natural: 'Natural sites',
                desc_s6_cultural: 'Cultural sites',
                desc_s7: '7. Notable figures',
                desc_s7_notable: 'Notable people from the village',
                geo_type_mountain: 'Mountain',
                geo_type_hill: 'Hill',
                geo_type_river: 'River',
                geo_type_lake: 'Lake',
                geo_type_forest: 'Forest',
                geo_type_plateau: 'Plateau',
                geo_type_valley: 'Valley',
                geo_type_other: 'Other',
                form_poi_coords: 'Coordinates',
                form_poi_click: 'Click on map',
                filter_all_arr: 'All subdivisions',
                filter_all_districts: 'All districts',
                filter_all_status: 'All statuses',
                filter_success: 'Success',
                filter_pending: 'Pending',
                filter_failed: 'Failed',
                filter_all_period: 'All time',
                filter_7days: 'Last 7 days',
                filter_30days: 'Last 30 days',
                filter_3months: 'Last 3 months',
                account_info: 'Account information',
                account_email: 'Email',
                account_name: 'Full name',
                account_role: 'Role',
                account_last_login: 'Last login',
                account_change_pwd: 'Change password',
                account_new_pwd: 'New password',
                account_confirm_pwd: 'Confirm new password',
                account_pwd_placeholder: 'Minimum 8 characters',
                account_pwd_confirm_placeholder: 'Retype the password',
                account_submit_pwd: 'Change password',
                pwd_rule_length: 'At least 8 characters',
                pwd_rule_upper: 'One uppercase letter',
                pwd_rule_digit: 'One digit',
                pwd_rule_special: 'One special character (@, #, $, etc.)',
                msg_connected: 'Admin connected',
                msg_auth_error: 'Authentication error',
                msg_section_error: 'Error switching section',
                msg_dashboard_error: 'Error loading dashboard',
                msg_visits: ' visits',
                msg_no_payment_week: 'No payments this week',
                msg_mobile_unknown: 'Mobile (not specified)',
                msg_card_unknown: 'Card (not specified)',
                msg_undefined_cat: 'Undefined',
                msg_not_calculated: 'Not calculated',
                msg_village_load_error: 'Error loading villages',
                msg_poi_load_error: 'Error loading POI',
                msg_geo_load_error: 'Error loading geonames',
                msg_user_load_error: 'Error loading users',
                msg_village_saved: 'Village saved successfully!',
                msg_chefferie_invalid: 'Invalid chieftaincy category.',
                msg_village_exists: 'A village with this name already exists.',
                msg_arr_invalid: 'Invalid selected subdivision.',
                msg_auth_issue: 'Authorization issue. Check your connection.',
                msg_no_geom_drawn: 'No geometry drawn',
                msg_geom_required: 'Geometry required',
                msg_max_photos: 'Maximum 2 photos allowed',
                msg_delete_error: 'Error deleting village',
                msg_no_vp: 'No point village found',
                msg_vp_name_required: 'Name is required',
                msg_vp_click_place: 'Click on the map to place the village',
                msg_vp_updated: 'Point village updated',
                msg_vp_added: 'Point village added',
                msg_no_payment: 'No payment found',
                msg_no_export: 'No payment to export',
                msg_never: 'Never',
                msg_pwd_mismatch: 'Passwords do not match.',
                msg_pwd_weak: 'Password does not meet the required criteria.',
                msg_pwd_changing: 'Changing password...',
                msg_pwd_changed: 'Password changed successfully!',
                msg_no_village_select: 'No specific village',
                // Additional admin keys for multi-country
                title: 'MonVillage Admin',
                poi_management: 'Points of Interest Management',
                geoname_management: 'Geonames Management',
                user_management: 'User Management',
                payments_listing: 'Payments Listing',
                add_village_title: 'Add a Village',
                edit_village_title: 'Edit Village',
                add_poi_title: 'Add a Point of Interest',
                add_geoname_title: 'Add a Geoname',
                add_vp_title: 'Add a Point Village',
                edit_vp_title: 'Edit Point Village',
                add_user_title: 'Add a User',
                form_poi_name: 'POI name *',
                form_poi_village: 'Associated village',
                form_poi_type: 'POI type *',
                form_poi_description: 'Description',
                form_poi_method: 'Positioning method *',
                form_geoname_name: 'Geoname name *',
                form_geoname_type: 'Type *',
                form_geoname_description: 'Description',
                form_geoname_method: 'Positioning method *',
                form_user_name: 'Full name',
                form_user_role: 'Role',
                form_user_active: 'Active',
                form_latitude: 'Latitude *',
                form_longitude: 'Longitude *',
                search_contact_placeholder: 'Search a contact...',
                search_village_placeholder: 'Search a village...',
                total_label: 'Total',
                total_this_week: 'Total this week',
                revenue_this_week: 'Revenue this week',
                vp_total_label: 'point villages',
                payments_total: 'payments',
                amount_total: 'Amount',
                vp_position_label: 'Position (click on the map) *',
                yes_label: 'Yes',
                no_label: 'No',
                descriptions: 'Descriptions',
            },

            // Login page
            login: {
                title: 'Admin Login - MonVillage',
                heading: 'Administration',
                subtitle: 'Access the MonVillage administration panel',
                email_label: 'Email',
                email_placeholder: 'your.email@example.com',
                password_label: 'Password',
                password_placeholder: 'Your password',
                submit: 'Log in',
                otp_sent: 'A 6-digit verification code has been sent to your email address. Check your inbox (and spam folder).',
                otp_label: 'OTP Code',
                otp_verify: 'Verify code',
                otp_resend: 'Resend code',
                back_to_login: 'Back to login',
                back_to_app: 'Back to the application',
                otp_expired: 'Code expired. Please request a new one.',
                otp_valid_for: 'Code valid for {min}:{sec}',
                verifying: 'Verifying...',
                auth_error: 'Authentication error',
                not_authorized: 'Access denied. You must be an administrator.',
                otp_sent_to: 'A verification code has been sent to {email}',
                enter_6_digits: 'Please enter a 6-digit code.',
                code_expired: 'The code has expired. Please request a new one.',
                code_incorrect: 'Incorrect code. Please try again.',
                verified: 'Verification successful! Redirecting...',
                new_code_sent: 'A new code has been sent.',
                resend_error: 'Error resending the code. Try again in a moment.',
            },
        }
    };

    let currentLang = 'fr';

    function t(key, params) {
        const keys = key.split('.');
        let value = TRANSLATIONS[currentLang];
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                let fallback = TRANSLATIONS['fr'];
                for (const fk of keys) {
                    if (fallback && typeof fallback === 'object' && fk in fallback) {
                        fallback = fallback[fk];
                    } else {
                        return key;
                    }
                }
                value = fallback;
                break;
            }
        }
        if (typeof value !== 'string') return key;
        if (params) {
            return value.replace(/\{(\w+)\}/g, (_, p) => params[p] !== undefined ? params[p] : `{${p}}`);
        }
        return value;
    }

    function tc(key, params) {
        const cc = window.currentCountry || 'cm';
        const countryKey = key + '_' + cc;
        const keys = countryKey.split('.');
        let value = TRANSLATIONS[currentLang];
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return t(key, params);
            }
        }
        if (typeof value !== 'string') return t(key, params);
        if (params) {
            return value.replace(/\{(\w+)\}/g, (_, p) => params[p] !== undefined ? params[p] : `{${p}}`);
        }
        return value;
    }

    function translatePage() {
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.getAttribute('data-i18n');
            const translated = t(key);
            if (translated !== key) {
                if (el.hasAttribute('data-i18n-html')) {
                    el.innerHTML = translated;
                } else {
                    el.textContent = translated;
                }
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
            const key = el.getAttribute('data-i18n-placeholder');
            const translated = t(key);
            if (translated !== key) {
                el.placeholder = translated;
            }
        });
        document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
            const key = el.getAttribute('data-i18n-title');
            const translated = t(key);
            if (translated !== key) {
                el.title = translated;
            }
        });
        document.querySelectorAll('[data-i18n-value]').forEach(function(el) {
            const key = el.getAttribute('data-i18n-value');
            const translated = t(key);
            if (translated !== key) {
                el.value = translated;
            }
        });
        const htmlEl = document.documentElement;
        if (htmlEl) {
            htmlEl.lang = currentLang;
        }
    }

    function translateCountrySpecific() {
        document.querySelectorAll('[data-i18n-country]').forEach(function(el) {
            const key = el.getAttribute('data-i18n-country');
            const translated = tc(key);
            if (translated !== key) {
                if (el.hasAttribute('data-i18n-html')) {
                    el.innerHTML = translated;
                } else {
                    el.textContent = translated;
                }
            }
        });
    }

    function setLang(lang) {
        if (!TRANSLATIONS[lang]) return;
        currentLang = lang;
        localStorage.setItem('monvillage_lang', lang);
        translatePage();
        translateCountrySpecific();
        document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang: lang } }));
    }

    function getLang() {
        return currentLang;
    }

    function initLang() {
        const saved = localStorage.getItem('monvillage_lang');
        if (saved && TRANSLATIONS[saved]) {
            currentLang = saved;
        } else {
            const cc = window.currentCountry || 'cm';
            const config = window.COUNTRY_CONFIG && window.COUNTRY_CONFIG[cc];
            currentLang = config ? config.defaultLang : 'fr';
        }
        return currentLang;
    }

    window.TRANSLATIONS = TRANSLATIONS;
    window.t = t;
    window.tc = tc;
    window.translatePage = translatePage;
    window.translateCountrySpecific = translateCountrySpecific;
    window.setLang = setLang;
    window.getLang = getLang;
    window.initLang = initLang;

    window.i18n = { t, tc, translatePage, translateCountrySpecific, setLang, getLang, initLang, TRANSLATIONS };
})();
