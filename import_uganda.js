/**
 * Import Uganda GeoJSON data into Supabase tables
 *
 * Usage: node import_uganda.js
 *
 * Prerequisites:
 *   - Run ug_tables_create.sql in Supabase SQL Editor first
 *   - GeoJSON files must exist at the paths below
 */

const fs = require('fs');
const https = require('https');

const SUPABASE_URL = 'https://hrlufnjhwhgddxkpyzst.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhybHVmbmpod2hnZGR4a3B5enN0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjczMjAzNywiZXhwIjoyMDY4MzA4MDM3fQ.VQW8bJ_2DVlHXavcxzcSYR6Pn_IxsZqSQWuTZunIKZo';

const ADMIN_FILE = 'C:/Users/LENOVO/Desktop/projet_misael/projet_uganda/ug_adminarea.geojson';
const GEONAME_FILE = 'C:/Users/LENOVO/Desktop/projet_misael/projet_uganda/ug_geoname.geojson';

const BATCH_SIZE = 200;

function supabaseRequest(method, path, body) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, SUPABASE_URL);
        const postData = body ? JSON.stringify(body) : null;
        const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'apikey': SERVICE_ROLE_KEY,
                'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation',
            }
        };
        if (postData) options.headers['Content-Length'] = Buffer.byteLength(postData);

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try { resolve(JSON.parse(data)); } catch { resolve(data); }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data.substring(0, 500)}`));
                }
            });
        });
        req.on('error', reject);
        if (postData) req.write(postData);
        req.end();
    });
}

async function insertBatch(table, rows) {
    if (rows.length === 0) return;
    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
        const batch = rows.slice(i, i + BATCH_SIZE);
        await supabaseRequest('POST', `/rest/v1/${table}`, batch);
        process.stdout.write(`  ${table}: ${Math.min(i + BATCH_SIZE, rows.length)}/${rows.length}\r`);
    }
    console.log(`  ${table}: ${rows.length}/${rows.length} done`);
}

function pointInPolygon(point, polygon) {
    const [px, py] = point;
    let inside = false;
    for (const ring of polygon) {
        for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
            const [xi, yi] = ring[i];
            const [xj, yj] = ring[j];
            if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) {
                inside = !inside;
            }
        }
    }
    return inside;
}

function getCentroid(geometry) {
    let coords;
    if (geometry.type === 'MultiPolygon') {
        coords = geometry.coordinates[0][0];
    } else if (geometry.type === 'Polygon') {
        coords = geometry.coordinates[0];
    } else if (geometry.type === 'Point') {
        return geometry.coordinates;
    } else {
        return null;
    }
    let sumX = 0, sumY = 0;
    for (const [x, y] of coords) { sumX += x; sumY += y; }
    return [sumX / coords.length, sumY / coords.length];
}

function findContainingFeature(point, features) {
    for (const f of features) {
        const geom = f.geometry;
        if (geom.type === 'MultiPolygon') {
            for (const poly of geom.coordinates) {
                if (pointInPolygon(point, poly)) return f;
            }
        } else if (geom.type === 'Polygon') {
            if (pointInPolygon(point, geom.coordinates)) return f;
        }
    }
    return null;
}

async function main() {
    console.log('=== MonVillage Uganda Data Import ===\n');

    // Load GeoJSON files
    console.log('Loading GeoJSON files...');
    const adminData = JSON.parse(fs.readFileSync(ADMIN_FILE, 'utf8'));
    console.log(`  ug_adminarea: ${adminData.features.length} features`);

    let geonameData = null;
    if (fs.existsSync(GEONAME_FILE)) {
        geonameData = JSON.parse(fs.readFileSync(GEONAME_FILE, 'utf8'));
        console.log(`  ug_geoname: ${geonameData.features.length} features`);
    } else {
        console.log('  ug_geoname: file not found, skipping village_ponctuel import');
    }

    // Classify features by admin level
    const byLevel = {};
    for (const f of adminData.features) {
        const type = f.properties.type;
        if (!byLevel[type]) byLevel[type] = [];
        byLevel[type].push(f);
    }
    console.log('\nFeature counts by type:');
    for (const [type, features] of Object.entries(byLevel)) {
        console.log(`  ${type}: ${features.length}`);
    }

    // Step 1: Import regions (admin_level3)
    console.log('\n--- Step 1: Importing ug_regions (admin_level3) ---');
    const regionFeatures = byLevel['admin_level3'] || [];
    const regionRows = regionFeatures.map(f => ({
        osm_id: f.properties.osm_id,
        name: f.properties.name,
        geom: JSON.stringify(f.geometry),
    }));
    await insertBatch('ug_regions', regionRows);

    // Fetch inserted regions to get their IDs
    const regionsDb = await supabaseRequest('GET', '/rest/v1/ug_regions?select=id,name,geom');
    console.log(`  Fetched ${regionsDb.length} regions from DB`);

    // Step 2: Import districts (admin_level4) with region linkage
    console.log('\n--- Step 2: Importing ug_districts (admin_level4) ---');
    const districtFeatures = byLevel['admin_level4'] || [];
    const districtRows = districtFeatures.map(f => {
        const centroid = getCentroid(f.geometry);
        let regionId = null;
        if (centroid) {
            const containingRegion = findContainingFeature(centroid, regionFeatures);
            if (containingRegion) {
                const dbRegion = regionsDb.find(r => r.name === containingRegion.properties.name);
                if (dbRegion) regionId = dbRegion.id;
            }
        }
        return {
            osm_id: f.properties.osm_id,
            name: f.properties.name,
            region_id: regionId,
            geom: JSON.stringify(f.geometry),
        };
    });
    await insertBatch('ug_districts', districtRows);

    // Fetch inserted districts
    const districtsDb = await supabaseRequest('GET', '/rest/v1/ug_districts?select=id,name,geom');
    console.log(`  Fetched ${districtsDb.length} districts from DB`);
    const orphanDistricts = districtRows.filter(d => d.region_id === null).length;
    if (orphanDistricts > 0) console.log(`  Warning: ${orphanDistricts} districts without region linkage`);

    // Step 3: Import villages (admin_level10) with district linkage
    console.log('\n--- Step 3: Importing ug_villages (admin_level10) ---');
    const villageFeatures = byLevel['admin_level10'] || [];
    const villageRows = villageFeatures.map(f => {
        const centroid = getCentroid(f.geometry);
        let districtId = null;
        let districtName = null;
        if (centroid) {
            const containingDistrict = findContainingFeature(centroid, districtFeatures);
            if (containingDistrict) {
                districtName = containingDistrict.properties.name;
                const dbDistrict = districtsDb.find(d => d.name === containingDistrict.properties.name);
                if (dbDistrict) districtId = dbDistrict.id;
            }
        }
        return {
            osm_id: f.properties.osm_id,
            name: f.properties.name,
            district_id: districtId,
            district_name: districtName,
            geom: JSON.stringify(f.geometry),
            population: f.properties.population || null,
            is_active: true,
        };
    });
    await insertBatch('ug_villages', villageRows);
    const orphanVillages = villageRows.filter(v => v.district_id === null).length;
    if (orphanVillages > 0) console.log(`  Warning: ${orphanVillages} villages without district linkage`);

    // Step 4: Import village_ponctuel from geoname file
    if (geonameData) {
        console.log(`\n--- Step 4: Importing ug_village_ponctuel (${geonameData.features.length} points) ---`);
        const vpRows = geonameData.features.map(f => {
            const coords = f.geometry.coordinates;
            let districtName = null;
            const containingDistrict = findContainingFeature(coords, districtFeatures);
            if (containingDistrict) {
                districtName = containingDistrict.properties.name;
            }
            return {
                gid: f.properties.gid,
                osm_id: f.properties.osm_id,
                name: f.properties.name,
                type: f.properties.type || 'village',
                district_name: districtName,
                population: f.properties.population || 0,
                geom: JSON.stringify(f.geometry),
            };
        });
        await insertBatch('ug_village_ponctuel', vpRows);
    }

    // Step 5: Verification
    console.log('\n--- Verification ---');
    for (const table of ['ug_regions', 'ug_districts', 'ug_villages', 'ug_village_ponctuel']) {
        try {
            const result = await supabaseRequest('GET', `/rest/v1/${table}?select=id&limit=1&offset=0`);
            const countResp = await supabaseRequest('GET', `/rest/v1/${table}?select=id`, null);
            console.log(`  ${table}: ${Array.isArray(countResp) ? countResp.length : '?'} rows`);
        } catch (e) {
            console.log(`  ${table}: error - ${e.message.substring(0, 100)}`);
        }
    }

    console.log('\n=== Import complete ===');
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
