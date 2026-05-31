## création d'un utilisateur admin


1. Créer un utilisateur admin dans Supabase
    Dans Authentication > Users, créer un utilisateur ou utiliser le SQL :
    (Vous pouvez le faire via l'interface Supabase Auth)

2. Ajouter un profil admin

    -- Remplacez 'user-uuid-here' par l'UUID réel de votre utilisateur
INSERT INTO admin_profiles (
    id, 
    full_name, 
    role, 
    permissions, 
    is_active
) VALUES (
    'user-uuid-here',  -- UUID de l'utilisateur Supabase Auth
    'Administrateur Principal',
    'super_admin',
    '{"read": true, "write": true, "delete": true}',
    true
);


## about Monvillage

MonVillage is a comprehensive web-based mapping application dedicated to cataloging and visualizing villages across Cameroon. The platform provides interactive geographical data for all administrative divisions including regions, departments, arrondissements, and individual villages, complete with detailed information about traditional chiefs, population data, and precise geographic boundaries. Users can explore the map using advanced measurement tools, search functionality, and geolocation features, while the application also offers a professional map export system with secure payment integration through Flutterwave. Built on modern web technologies with Supabase as the backend, MonVillage serves as both a valuable resource for territorial administration and urban planning, and a digital preservation tool for Cameroon's rich village heritage and traditional leadership structures.

## importation des données sql vers  supabase (après avois créer l'extension postgis)
 ## Commande pour importer les  donnees  de regions , departements, arrondissements  dans supabase :  


## psql "postgresql://postgres.accawudgrlhrsiwepnfw:nefertyty586@aws-1-eu-north-1.pooler.supabase.com:5432/postgres" -f C:\Users\LENOVO\Desktop\projet_foncier_app_data\data_bon\road_l_data.sql

## psql "postgresql://postgres.accawudgrlhrsiwepnfw:nefertyty586@aws-1-eu-north-1.pooler.supabase.com:6534/postgres" -f C:\Users\LENOVO\Desktop\projet_foncier_app_data\data_bon\road_l_data.sql


C:\Users\LENOVO>

psql   "postgresql://postgres.hrlufnjhwhgddxkpyzst:nefertyty586@aws-0-eu-north-1.pooler.supabase.com:6543/postgres" -f C:\Users\LENOVO\Desktop\projet_foncier_app_data\data_bon\regions_data.sql


C:\Users\LENOVO> psql   "postgresql://postgres.hrlufnjhwhgddxkpyzst:nefertyty586@aws-0-eu-north-1.pooler.supabase.com:6543/postgres" -f C:\Users\LENOVO\Desktop\projet_foncier_app_data\data_bon\departements_data.sql

C:\Users\LENOVO> psql   "postgresql://postgres.hrlufnjhwhgddxkpyzst:nefertyty586@aws-0-eu-north-1.pooler.supabase.com:6543/postgres" -f C:\Users\LENOVO\Desktop\projet_foncier_app_data\data_bon\arrondissements_data.sql


## importation de PostgreSQL
  

  pg_dump -h localhost -U postgres -d telecom -t arrondissements --data-only --column-inserts -f 
   C:\Users\LENOVO\Desktop\projet_foncier_app_data\data_bon\arrondissements_data.sql


pg_dump -h localhost -U postgres -d telecom -t departements --data-only --column-inserts -f 
   C:\Users\LENOVO\Desktop\projet_foncier_app_data\data_bon\departements_data.sql

pg_dump -h localhost -U postgres -d telecom -t departeregionsments --data-only --column-inserts -f 
   C:\Users\LENOVO\Desktop\projet_foncier_app_data\data_bon\regions_data.sql



C:\Users\LENOVO> psql   "postgresql://postgres.accawudgrlhrsiwepnfw:nefertyty586@aws-0-eu-north-1.pooler.supabase.com:6543/postgres" -f C:\Users\LENOVO\Desktop\projet_foncier_app_data\data_bon\road_l_data.sql


 psql "postgresql://postgres.accawudgrlhrsiwepnfw:nefertyty586@aws-1-eu-north-1.pooler.supabase.com:5432/postgres" -f C:\Users\LENOVO\Desktop\projet_foncier_app_data\data_bon\road_l_data.sql
