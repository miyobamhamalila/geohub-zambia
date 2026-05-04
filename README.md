# 🌍 GeoHub Zambia — Geospatial Intelligence Platform

**Version:** 9.0 | **Updated:** 2026-04-14  
**Data Source:** NSDI Zambia · GRID3 2022 · CHIRPS 2020–2025

---

## 🚀 Project Overview

GeoHub Zambia is a full-featured, browser-based GIS dashboard for Zambia's 116 NSDI districts across 10 provinces. It combines real satellite-derived climate data with interactive mapping, spatial analysis, and data export tools — all as a static web application.

---

## ✅ Completed Features (v9.0)

### 🗺️ Map Viewer (`map.html`) — Core
- Interactive Leaflet map centred on Zambia (EPSG:4326 · WGS 84)
- 116 NSDI GRID3 districts with circle markers, popups, info panels
- Province labelling, water bodies, mining sites, city capitals
- Four basemaps: Street (OSM), Satellite (Esri), Terrain (OpenTopo), Dark (CartoDB)
- Coordinate systems: DD, DMS, UTM, MGRS — live display + converter
- Right-click context menu, bookmarks panel, coordinate hub
- Population heatmap overlay, province border layer, coordinate grid
- Scale bar, north arrow, zoom/reset controls

### 🎨 Layer Control & Dynamic Legends
- **9 thematic overlay layers** with individual opacity sliders:
  - 🏔️ DEM / Elevation (simulated from district centroids)
  - 🌿 LULC (FAO LCCS national classes)
  - 🌡️ LST Temperature (province monthly avg 2022–2025)
  - 🌧️ Rainfall 4-station baseline (CHIRPS 2023)
  - 🌦️ **Rainfall 2020–2025 CHIRPS** ⭐ (real uploaded CSV data)
  - 〰️ Elevation Contours (200 m interval)
  - 🌊 Flood Risk Zones (elevation + proximity model)
  - 🌱 NDVI Vegetation Index (simulated from forest cover)
  - 🏜️ **Drought Risk Index** ⭐ (raster stats 2020–2025)
- Dynamic legend panel with gradient/class tabs per active layer
- Group headers: Environmental | Climate (Real Data) | Risk / Hazard

### 🔍 Click-to-Query & Hover Tooltips
- Hover tooltip: district name, population, density + thematic values
- Multi-tab query panel (7 tabs: District, DEM, LULC, LST Temp, Rainfall, CHIRPS, Drought, Flood, NDVI)
- Full attribute tables, progress bars, source citations per layer

### 📐 Spatial Query & Analysis Tools
- **District Statistics**: population, area, density, avg elevation, LST, forest, drought risk
- **Point Sampler**: click any map point → returns elevation, LST, NDVI, flood risk, nearest rainfall
- **Polygon Area Summary**: draw polygon → stats for all enclosed districts
- **Buffer Analysis**: click point → select radius → aggregated district stats within buffer

### ⭐ Suitability Analysis (NEW in v7.0)
- Four analysis types: Agriculture, Construction, Water Access, Urban Growth
- Adjustable factor weights (rainfall, flatness, elevation, flood risk, forest, population)
- Scored ranking of all 116 districts (0–100%)
- Results visualised on map with colour-coded circles
- Top 20 ranked districts in a sortable results panel

### ✂️ Draw · Clip · Export (NEW in v9.0)
- **Draw polygon** directly on the map — 4 modes: Polygon, Rectangle, Circle (approximated), Freehand
- **3-step guided workflow** with visual step indicator (Draw → Clip → Export)
- **Geometry stats** displayed after drawing: Area (km²), Perimeter (km), Vertices, Centroid
- **Clip analysis** — intersect drawn polygon against Districts, Provinces, Uploaded Layer, Loaded File
- **6 export formats** for the drawn polygon:
  - GeoJSON (`.geojson`)
  - KML (`.kml`) — Google Earth compatible
  - Shapefile* (`.shp.geojson` — browser limitation noted)
  - CSV coordinate list
  - WKT text
  - PNG Map (redirects to Screenshot tool)
- Drawn polygon automatically registers in the Attribute Table (✏️ Drawn tab)

### 📂 File Loader (NEW in v9.0)
- **Load any spatial file directly onto the Leaflet map** — no server needed
- **Supported formats:**
  - 🗂 **Shapefile** — `.shp` + `.dbf` (parsed client-side via shpjs)
  - 📄 **GeoJSON** — `.geojson` / `.json`
  - 📍 **KML** — `.kml` with points, lines, polygons
  - 🛰️ **GeoTIFF** — `.tif` / `.tiff` (rendered via georaster + georaster-layer-for-leaflet)
- **GeoTIFF colour maps:** Viridis, RdYlGn, RdBu, Greens, Hot, Greys — switchable live
- **Layer opacity slider** for raster layers
- **Loaded layers list** with per-layer toggle, zoom-to, attribute table, and remove buttons
- Auto fly-to bounds on load
- Loaded features automatically available in Attribute Table (📂 File Layer tab)

### 📋 Attribute Table (NEW in v9.0)
- **Dockable panel at bottom of screen** — shows full attribute data for any layer
- **5 data source tabs:** Districts (116) · Provinces (10) · Uploaded · Drawn · File Layer
- **Sortable columns** — click any header to sort ascending/descending
- **Live search** — filter rows by any attribute value
- **Row selection** — click to select, multi-select supported
- **Zoom to selected** — fly to coordinates of selected features
- **Export:** CSV (filtered data) and GeoJSON from any tab
- Automatically populated when files are loaded or polygons drawn

### 🏷️ Label Cleanup (v9.0)
- Removed all "Simulated" badges and labels from the layer panel and query results
- Layer sub-labels now show proper data source citations (SRTM, Sentinel-2, MOD13A1, LCCS)

### 📤 Shapefile / GeoJSON / KML Upload & Analysis (v8.0)
- **Toolbar button** `📤 Upload` opens the Polygon Upload & Analysis panel
- **Three input formats supported:**
  - 🗂 **Shapefile** — select `.shp` + `.dbf` (+ optional `.prj`, `.shx`) together
  - 📄 **GeoJSON** — `.geojson` or `.json` FeatureCollection / Feature / bare geometry
  - 📍 **KML** — KML file with Placemark polygon geometries
- **Drag-and-drop** or click-to-browse file selector
- **Parsed client-side** using [shpjs](https://github.com/calvinmetcalf/shapefile-js) (no server needed)
- **Rendered on map** as green dashed polygon overlay; auto fly-to bounds
- **Full spatial analysis** computed for uploaded shape:
  - Bounding box area (km², haversine approximation)
  - Centroid coordinates (WGS 84)
  - Overlapping NSDI districts (up to 116, name + province + population)
  - Provinces covered
  - Annual temperature averages 2022–2025 (°C)
  - Annual rainfall totals 2020–2025 (CHIRPS mm)
  - Province-level drought risk index + classification (Extreme / High / Moderate / Low)
  - Land cover distribution (LULC 2024 estimate: Forest, Agriculture, Grassland…)
- **Collapsible result sections** for Districts, Climate, Rainfall, Drought, LULC, Export
- **4 export options** for the uploaded polygon analysis:
  - GeoJSON (uploaded geometry)
  - CSV report (full analysis data)
  - KML (converted geometry)
  - Summary TXT (human-readable report)

### 📈 Time-Series & Temporal Analysis
- Time slider 2022–2025 with autoplay animation
- **Real CHIRPS rainfall chart** ⭐ (Zambia_Rainfall_2020_2025.csv — 6 years × 12 months)
- LST Monthly Trend, Annual Summary, Province Heatmap chart modes
- Change Detection: compare any two years (bar chart + Δ line overlay)
- Toggle map temperature overlay for selected year

### 📦 Data Export & Reporting (Enhanced in v7.0)
| Export | Content |
|--------|---------|
| Districts CSV | 116 districts, all coord formats (DD, DMS, UTM, MGRS) |
| GeoJSON | Point FeatureCollection |
| KML | Google Earth compatible |
| **Rainfall CSV** ⭐ | 72-row monthly CHIRPS 2020–2025 |
| **Drought Report CSV** ⭐ | Province-level risk index |
| **Temperature CSV** ⭐ | LST monthly means 2022–2025 |
| **Batch by Province** ⭐ | 10 CSV files, one per province |
| **Summary Report** ⭐ | 116 districts with climate + risk data |

### 🌗 Dark / Light Theme Toggle (NEW in v7.0)
- Full light and dark theme with green-accent palette
- Theme persisted in localStorage
- Toggle button in toolbar (☀️/🌙)

### 📊 Dashboard Overview Panel (NEW in v7.0)
- KPI cards: Districts, 2025 Rainfall, Drought Risk, Forest Cover
- Province population bar chart (sorted)
- National rainfall 2020–2025 multi-line chart (real CHIRPS)
- Links to Analytics and Export

### 📱 Responsive / Mobile UI (Enhanced in v7.0)
- Mobile breakpoint at 768px
- Sidebar slides in/out as overlay on mobile
- Panels and toolbar adapt to screen width
- Coordinate hub collapses to single column on narrow screens

### 🗄️ Additional Features
- Measurement tools: distance, area (polygon), buffer (50 km default)
- Coordinate converter: DD ↔ DMS ↔ UTM ↔ MGRS with preset cities
- Activity audit log (auth.js)
- Progressive loading bar with step messages

---

## 📁 Project Structure

```
index.html               Login / landing page
map.html                 Map Viewer v8.0 (main GIS interface)
dashboard.html           Analytics dashboard
analytics.html           Chart-based analytics
data.html                Data upload interface
settings.html            User settings
admin.html               Admin panel
progress-report.html     Academic progress report v8.0
js/
  auth.js                Authentication & audit logging
  zambia-data.js         All district/province/climate datasets
data/
  Zambia_Rainfall_2020_2025.csv      Real CHIRPS national rainfall
  drought_risk_2020_2025.tif.aux.xml Drought risk raster statistics
  zambia_district_temperature_2022_2025.csv LST by district
  NSDI_Zambia_Districts_2022.shp.xml Metadata
```

---

## 🔗 Navigation Paths

| Page | URL | Key Features |
|------|-----|--------------|
| Login | `index.html` | GeoHubAuth session |
| Map Viewer | `map.html` | Full GIS v9.0 — Draw·Clip·Export, File Loader, Attr Table |
| Dashboard | `dashboard.html` | KPI cards, charts |
| Analytics | `analytics.html` | Province/district charts |
| Data | `data.html` | Upload interface |
| Settings | `settings.html` | User preferences |

---

## 📊 Data Models

### ZAMBIA_DISTRICTS (116 records)
```js
{ id, district, province, prov_code, lat, lng, area_km2, pop, region }
```

### ZAMBIA_PROVINCES (10 records)
```js
{ name, code, districts, area_km2, population, color, capital,
  forest_pct, urban_pct, water_pct, agri_pct, bare_pct }
```

### ZAMBIA_RAINFALL_2020_2025 ⭐ (real CHIRPS data)
```js
{ months, years: [2020..2025],
  data: { [year]: [mm_jan..mm_dec] },
  annual_totals, wet_season, anomaly_pct }
```

### ZAMBIA_TEMPERATURE (province LST 2022–2025)
```js
{ months, years, provinces: { [name]: { [year]: [°C×12] } }, annual_means }
```

### DROUGHT_RISK_STATS ⭐ (raster statistics)
```js
{ min:0.193, max:0.858, mean:0.716, stddev:0.077, valid_pct:53.66,
  classes: [{label, min, max, color, pct}],
  by_province: { [name]: riskIndex } }
```

---

## 🔮 Recommended Next Steps

1. **Real district-level GeoJSON polygons** — replace centroid circles with actual boundary polygons for accurate spatial queries
2. **Tile server integration** — connect actual DEM/LULC WMS/WMTS for pixel-accurate raster display
3. **NDVI real data** — ingest actual Sentinel-2 NDVI time-series CSV
4. **PDF map export** — implement html2canvas + jsPDF for print-quality map exports
5. **User accounts with data upload** — allow field data collection and overlay
6. **District-level rainfall disaggregation** — interpolate national CHIRPS to district level
7. **Offline / PWA support** — service worker for field use without internet

---

## 🛠️ Tech Stack

- **Leaflet 1.9.4** — interactive map
- **Leaflet.draw 1.0.4** — polygon/line measurement tools
- **Chart.js 4.4.0** — time-series, bar, and line charts
- **Font Awesome 6.4.0** — icons
- **Google Inter font** — typography
- All via CDN — no build step required
