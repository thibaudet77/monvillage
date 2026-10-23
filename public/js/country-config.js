/* ===================================================================
   country-config.js  –  Multi-country configuration for MonVillage
   =================================================================== */

var COUNTRY_CONFIG = {

  /* ── Cameroon ─────────────────────────────────────────────────── */
  cm: {
    code: 'cm',
    flag: '🇨🇲',
    name: { fr: 'Cameroun', en: 'Cameroon' },
    defaultLang: 'fr',
    map: { center: [5.2, 12.7], zoom: 7 },
    currency: 'XAF',
    phonePrefix: '+237',

    adminLevels: [
      {
        key: 'regions',
        table: 'regions',
        nameCol: 'nom_region',
        idCol: 'id_region',
        labelKey: 'sidebar.regions',
        color: '#d62728',
        weight: 3,
        fillOpacity: 0.05,
        minZoom: 0,
        pane: 'regionsPane',
        zIndex: 400
      },
      {
        key: 'departements',
        table: 'departements',
        nameCol: 'nom_departement',
        idCol: 'id_departement',
        labelKey: 'sidebar.departements',
        color: '#000000',
        weight: 2,
        fillOpacity: 0.02,
        minZoom: 6,
        pane: 'departementsPane',
        zIndex: 410
      },
      {
        key: 'arrondissements',
        table: 'arrondissements',
        nameCol: 'nom_arrondissement',
        idCol: 'id_arrondissement',
        labelKey: 'sidebar.arrondissements',
        color: '#8B008B',
        weight: 1,
        dashArray: '5,5',
        fillOpacity: 0.02,
        minZoom: 9,
        pane: 'arrondissementsPane',
        zIndex: 650
      }
    ],

    villageTable: 'villages_complete_extended',
    villageSearchTable: 'villages_complete',
    villageNameCol: 'village_name',
    villageIdCol: 'id',

    vpTable: 'village_ponctuel',
    vpNameCol: 'name',
    vpParentCol: 'arrondissement_name',
    hasVP: true,

    hasChefferie: true,
    hasDepartements: true,
    paymentCountry: 'CM',
    vpMinZoom: 10,
    vpLabelMinZoom: 12
  },

  /* ── Uganda ───────────────────────────────────────────────────── */
  ug: {
    code: 'ug',
    flag: '🇺🇬',
    name: { fr: 'Ouganda', en: 'Uganda' },
    defaultLang: 'en',
    map: { center: [1.37, 32.29], zoom: 7 },
    currency: 'UGX',
    phonePrefix: '+256',

    adminLevels: [
      {
        key: 'regions',
        table: 'ug_regions',
        nameCol: 'name',
        idCol: 'id',
        labelKey: 'sidebar.regions',
        color: '#d62728',
        weight: 3,
        fillOpacity: 0.05,
        minZoom: 0,
        pane: 'regionsPane',
        zIndex: 400
      },
      {
        key: 'districts',
        table: 'ug_districts',
        nameCol: 'name',
        idCol: 'id',
        labelKey: 'sidebar.districts',
        color: '#000000',
        weight: 2,
        fillOpacity: 0.02,
        minZoom: 6,
        pane: 'departementsPane',
        zIndex: 410
      }
    ],

    villageTable: 'ug_villages',
    villageSearchTable: 'ug_villages',
    villageNameCol: 'name',
    villageIdCol: 'id',

    vpTable: 'ug_village_ponctuel',
    vpNameCol: 'name',
    vpParentCol: 'district_name',
    hasVP: true,

    hasChefferie: false,
    hasDepartements: false,
    paymentCountry: 'UG',
    vpMinZoom: 10,
    vpLabelMinZoom: 12
  }
};

/* ── Active country state ──────────────────────────────────────── */

var currentCountry = 'cm';

/**
 * Return the config object for the currently active country.
 */
function getCountryConfig() {
  return COUNTRY_CONFIG[currentCountry];
}

/**
 * Switch the active country.
 * @param {string} code  – 'cm' or 'ug'
 */
function setCountry(code) {
  if (!COUNTRY_CONFIG[code]) {
    console.warn('[country-config] Unknown country code:', code);
    return;
  }
  currentCountry = code;
  window.currentCountry = code;
  localStorage.setItem('monvillage_country', code);
  window.dispatchEvent(new CustomEvent('countryChanged', { detail: { country: code } }));
}

/**
 * Initialise the active country from localStorage (or default to 'cm').
 */
function initCountry() {
  var saved = localStorage.getItem('monvillage_country');
  if (saved && COUNTRY_CONFIG[saved]) {
    currentCountry = saved;
  } else {
    currentCountry = 'cm';
  }
  window.currentCountry = currentCountry;
  return currentCountry;
}

/**
 * Guess the country from a geographic position using bounding boxes.
 * @param {number} lat
 * @param {number} lng
 * @returns {'cm'|'ug'|null}
 */
function detectCountryByPosition(lat, lng) {
  // Cameroon bounding box
  if (lat >= 1.6 && lat <= 13.1 && lng >= 8.4 && lng <= 16.2) {
    return 'cm';
  }
  // Uganda bounding box
  if (lat >= -1.5 && lat <= 4.2 && lng >= 29.5 && lng <= 35.0) {
    return 'ug';
  }
  return null;
}

/* ── Expose everything as globals ──────────────────────────────── */

window.COUNTRY_CONFIG        = COUNTRY_CONFIG;
window.currentCountry        = currentCountry;
window.getCountryConfig      = getCountryConfig;
window.setCountry            = setCountry;
window.initCountry           = initCountry;
window.detectCountryByPosition = detectCountryByPosition;
