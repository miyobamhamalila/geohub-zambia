/**
 * GeoHub Zambia – Places of Interest (POI) Search Module v1.0
 * ============================================================
 * Sources:
 *   - GRID3_ZMB_School_v01beta.csv   (8,509 records)
 *   - GRID3_ZMB_HealthFac_v01beta.geojson  (2,798 facilities)
 *
 * Loaded on demand to keep initial page load fast.
 * Search is performed client-side across both datasets.
 */

const PLACES_DATA = {
  schools: [],
  healthFacilities: [],
  loaded: false
};

/**
 * Load school data from CSV (hosted alongside the app)
 */
async function loadSchools() {
  try {
    const resp = await fetch('GRID3_ZMB_School_v01beta_706378779913050614.csv');
    const csv = await resp.text();
    const lines = csv.split('\n');
    // Skip header
    const schools = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      // Parse CSV with quoted fields
      const parts = parseCSVLine(line);
      if (parts.length < 13) continue;
      const lat = parseFloat(parts[11]);
      const lng = parseFloat(parts[12]);
      if (isNaN(lat) || isNaN(lng)) continue;
      
      const name = parts[4] || '';
      const type = parts[2] || 'School';
      const subType = parts[3] || '';
      const province = parts[7] || '';
      const district = parts[9] || '';
      
      schools.push({
        id: `sch_${i}`,
        name: cleanName(name),
        type: type,
        subType: subType,
        category: 'school',
        province: province,
        district: district,
        lat: lat,
        lng: lng,
        source: 'GRID3 / ZamStats',
        year: parts[13] || ''
      });
    }
    PLACES_DATA.schools = schools;
    console.log(`Loaded ${schools.length} schools`);
  } catch (err) {
    console.error('Failed to load school data:', err);
  }
}

/**
 * Load health facility data from GeoJSON
 */
async function loadHealthFacilities() {
  try {
    const resp = await fetch('GRID3_ZMB_HealthFac_v01beta_-2329207463181782115.geojson');
    const gj = await resp.json();
    const facilities = (gj.features || []).map((f, i) => {
      const p = f.properties || {};
      return {
        id: `hfac_${i + 1}`,
        name: cleanName(p.Name || p.Label || 'Health Facility'),
        type: p.Type || 'Health Facility',
        subType: p.SubType || '',
        category: 'health',
        province: p.Province || '',
        district: p.District || '',
        lat: parseFloat(p.LAT) || (f.geometry?.coordinates?.[1]) || 0,
        lng: parseFloat(p.LONG) || (f.geometry?.coordinates?.[0]) || 0,
        source: p.Source || 'MOH',
        year: p.Data_year || ''
      };
    }).filter(f => f.lat && f.lng);
    PLACES_DATA.healthFacilities = facilities;
    console.log(`Loaded ${facilities.length} health facilities`);
  } catch (err) {
    console.error('Failed to load health facility data:', err);
  }
}

/**
 * Load all place datasets
 */
async function loadAllPlaces() {
  if (PLACES_DATA.loaded) return;
  PLACES_DATA.loaded = true;
  await Promise.all([loadSchools(), loadHealthFacilities()]);
}

/**
 * Search places by query string
 * Returns top 50 matches across all datasets
 */
function searchPlaces(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase().trim();
  
  const results = [];
  
  // Search schools
  for (const s of PLACES_DATA.schools) {
    if (matchesQuery(s, q)) {
      results.push(s);
      if (results.length >= 50) break;
    }
  }
  
  // Search health facilities (if we have room)
  for (const h of PLACES_DATA.healthFacilities) {
    if (results.length >= 50) break;
    if (matchesQuery(h, q)) {
      results.push(h);
    }
  }
  
  // Also search districts from existing ZAMBIA_DISTRICTS
  if (typeof ZAMBIA_DISTRICTS !== 'undefined') {
    for (const d of ZAMBIA_DISTRICTS) {
      if (results.length >= 50) break;
      const dn = (d.district || '').toLowerCase();
      const pn = (d.province || '').toLowerCase();
      if (dn.includes(q) || pn.includes(q)) {
        results.push({
          id: d.id,
          name: d.district,
          type: 'District',
          subType: '',
          category: 'district',
          province: d.province,
          district: d.district,
          lat: d.lat,
          lng: d.lng,
          source: 'NSDI GRID3 2022',
          year: '2022',
          pop: d.pop,
          area_km2: d.area_km2
        });
      }
    }
  }
  
  // Sort by relevance (name match first, then type, then location)
  results.sort((a, b) => {
    const aName = a.name.toLowerCase().includes(q) ? 1 : 0;
    const bName = b.name.toLowerCase().includes(q) ? 1 : 0;
    if (aName !== bName) return bName - aName;
    // Prefer schools over districts over health
    const order = { school: 0, district: 1, health: 2 };
    return (order[a.category] || 0) - (order[b.category] || 0);
  });
  
  return results.slice(0, 50);
}

function matchesQuery(item, q) {
  const name = (item.name || '').toLowerCase();
  const province = (item.province || '').toLowerCase();
  const district = (item.district || '').toLowerCase();
  const subType = (item.subType || '').toLowerCase();
  const type = (item.type || '').toLowerCase();
  
  return name.includes(q) || province.includes(q) || district.includes(q) || 
         subType.includes(q) || type.includes(q);
}

/** Simple CSV line parser handling quoted fields */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

/** Clean up names (title case, remove weird chars) */
function cleanName(name) {
  if (!name) return '';
  // Remove underscores, extra spaces
  let cleaned = name.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  // Title case
  return cleaned.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

function getPlaceIcon(category, subType) {
  const icons = {
    school: '🏫', 'Community School': '📚', 'School': '🏫',
    'health': '🏥', 'Health Center': '🏥', 'Health Post': '💊', 
    'Rural Health Center': '🏥', 'Rural Health Post': '💊',
    'Hospital': '🏨', 'Clinic': '🚑', 'district': '🏛️'
  };
  return icons[subType] || icons[category] || '📍';
}

// Expose globally
window.GeoHubPlaces = {
  loadAll: loadAllPlaces,
  search: searchPlaces,
  data: PLACES_DATA,
  getIcon: getPlaceIcon
};