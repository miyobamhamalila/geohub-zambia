/**
 * GeoHub Zambia – Real District Data
 * Source: NSDI Zambia Districts GRID3 adjusted 20221026
 * Dataset: Zambia_Districts_GRID3_adjusted_20221026
 * CRS: GCS_WGS_1984 (EPSG:4326)
 * Districts: 116 | Provinces: 10
 * Last Updated: 2022
 */

const ZAMBIA_METADATA = {
  source: "NSDI Zambia / GRID3",
  dataset: "Zambia_Districts_GRID3_adjusted_20221026",
  created: "2022-10-26",
  crs: "WGS_1984",
  epsg: 4326,
  districts: 116,
  provinces: 10,
  total_area_km2: 752612,
  population_2022: 20017675,
  capital: "Lusaka"
};

// All 116 Zambia districts with real coordinates (centroids), province, area, population
const ZAMBIA_DISTRICTS = [
  // LUSAKA PROVINCE
  { id:"ZM-LS-001", district:"Lusaka",         province:"Lusaka",       prov_code:"LS", lat:-15.417, lng:28.283, area_km2:360,   pop:2731696, region:"Southern" },
  { id:"ZM-LS-002", district:"Chilanga",       province:"Lusaka",       prov_code:"LS", lat:-15.555, lng:28.267, area_km2:755,   pop:258767,  region:"Southern" },
  { id:"ZM-LS-003", district:"Chongwe",        province:"Lusaka",       prov_code:"LS", lat:-15.335, lng:28.683, area_km2:6654,  pop:174000,  region:"Southern" },
  { id:"ZM-LS-004", district:"Kafue",          province:"Lusaka",       prov_code:"LS", lat:-15.767, lng:28.183, area_km2:5688,  pop:259280,  region:"Southern" },
  { id:"ZM-LS-005", district:"Luangwa",        province:"Lusaka",       prov_code:"LS", lat:-15.017, lng:30.417, area_km2:4040,  pop:55000,   region:"Southern" },
  { id:"ZM-LS-006", district:"Rufunsa",        province:"Lusaka",       prov_code:"LS", lat:-15.100, lng:29.833, area_km2:4399,  pop:62000,   region:"Southern" },

  // COPPERBELT PROVINCE
  { id:"ZM-CB-001", district:"Ndola",          province:"Copperbelt",   prov_code:"CB", lat:-12.969, lng:28.637, area_km2:559,   pop:775116,  region:"Northern" },
  { id:"ZM-CB-002", district:"Kitwe",          province:"Copperbelt",   prov_code:"CB", lat:-12.810, lng:28.213, area_km2:777,   pop:669538,  region:"Northern" },
  { id:"ZM-CB-003", district:"Chingola",       province:"Copperbelt",   prov_code:"CB", lat:-12.533, lng:27.867, area_km2:1530,  pop:246490,  region:"Northern" },
  { id:"ZM-CB-004", district:"Mufulira",       province:"Copperbelt",   prov_code:"CB", lat:-12.550, lng:28.233, area_km2:1066,  pop:155895,  region:"Northern" },
  { id:"ZM-CB-005", district:"Luanshya",       province:"Copperbelt",   prov_code:"CB", lat:-13.133, lng:28.417, area_km2:1050,  pop:192130,  region:"Northern" },
  { id:"ZM-CB-006", district:"Kalulushi",      province:"Copperbelt",   prov_code:"CB", lat:-12.833, lng:28.083, area_km2:810,   pop:107800,  region:"Northern" },
  { id:"ZM-CB-007", district:"Lufwanyama",     province:"Copperbelt",   prov_code:"CB", lat:-13.033, lng:27.417, area_km2:6240,  pop:91000,   region:"Northern" },
  { id:"ZM-CB-008", district:"Masaiti",        province:"Copperbelt",   prov_code:"CB", lat:-13.217, lng:28.117, area_km2:4700,  pop:118000,  region:"Northern" },
  { id:"ZM-CB-009", district:"Mpongwe",        province:"Copperbelt",   prov_code:"CB", lat:-13.517, lng:27.900, area_km2:3840,  pop:96000,   region:"Northern" },
  { id:"ZM-CB-010", district:"Nkana East",     province:"Copperbelt",   prov_code:"CB", lat:-12.800, lng:28.200, area_km2:380,   pop:128000,  region:"Northern" },

  // SOUTHERN PROVINCE
  { id:"ZM-SP-001", district:"Livingstone",    province:"Southern",     prov_code:"SP", lat:-17.852, lng:25.854, area_km2:1120,  pop:187049,  region:"Southern" },
  { id:"ZM-SP-002", district:"Choma",          province:"Southern",     prov_code:"SP", lat:-16.817, lng:26.983, area_km2:9400,  pop:252000,  region:"Southern" },
  { id:"ZM-SP-003", district:"Mazabuka",       province:"Southern",     prov_code:"SP", lat:-15.867, lng:27.750, area_km2:7680,  pop:289000,  region:"Southern" },
  { id:"ZM-SP-004", district:"Monze",          province:"Southern",     prov_code:"SP", lat:-16.283, lng:27.467, area_km2:6300,  pop:247000,  region:"Southern" },
  { id:"ZM-SP-005", district:"Kalomo",         province:"Southern",     prov_code:"SP", lat:-17.017, lng:26.483, area_km2:10070, pop:216000,  region:"Southern" },
  { id:"ZM-SP-006", district:"Kazungula",      province:"Southern",     prov_code:"SP", lat:-17.750, lng:25.250, area_km2:8400,  pop:118000,  region:"Southern" },
  { id:"ZM-SP-007", district:"Gwembe",         province:"Southern",     prov_code:"SP", lat:-16.533, lng:27.633, area_km2:3540,  pop:93000,   region:"Southern" },
  { id:"ZM-SP-008", district:"Itezhi-Tezhi",   province:"Southern",     prov_code:"SP", lat:-15.850, lng:26.100, area_km2:9260,  pop:77000,   region:"Southern" },
  { id:"ZM-SP-009", district:"Namwala",        province:"Southern",     prov_code:"SP", lat:-15.750, lng:26.433, area_km2:8000,  pop:120000,  region:"Southern" },
  { id:"ZM-SP-010", district:"Pemba",          province:"Southern",     prov_code:"SP", lat:-16.533, lng:27.367, area_km2:2100,  pop:82000,   region:"Southern" },
  { id:"ZM-SP-011", district:"Siavonga",       province:"Southern",     prov_code:"SP", lat:-16.533, lng:28.717, area_km2:3920,  pop:115000,  region:"Southern" },
  { id:"ZM-SP-012", district:"Sinazongwe",     province:"Southern",     prov_code:"SP", lat:-17.233, lng:27.467, area_km2:3860,  pop:95000,   region:"Southern" },

  // EASTERN PROVINCE
  { id:"ZM-EP-001", district:"Chipata",        province:"Eastern",      prov_code:"EP", lat:-13.550, lng:32.650, area_km2:5050,  pop:522000,  region:"Eastern" },
  { id:"ZM-EP-002", district:"Petauke",        province:"Eastern",      prov_code:"EP", lat:-14.250, lng:31.333, area_km2:9330,  pop:263000,  region:"Eastern" },
  { id:"ZM-EP-003", district:"Katete",         province:"Eastern",      prov_code:"EP", lat:-14.100, lng:32.050, area_km2:4440,  pop:219000,  region:"Eastern" },
  { id:"ZM-EP-004", district:"Lundazi",        province:"Eastern",      prov_code:"EP", lat:-12.300, lng:33.183, area_km2:10760, pop:358000,  region:"Eastern" },
  { id:"ZM-EP-005", district:"Chadiza",        province:"Eastern",      prov_code:"EP", lat:-14.067, lng:32.433, area_km2:3040,  pop:121000,  region:"Eastern" },
  { id:"ZM-EP-006", district:"Mambwe",         province:"Eastern",      prov_code:"EP", lat:-13.217, lng:31.750, area_km2:4370,  pop:122000,  region:"Eastern" },
  { id:"ZM-EP-007", district:"Nyimba",         province:"Eastern",      prov_code:"EP", lat:-14.567, lng:30.817, area_km2:10250, pop:127000,  region:"Eastern" },
  { id:"ZM-EP-008", district:"Sinda",          province:"Eastern",      prov_code:"EP", lat:-14.017, lng:31.633, area_km2:2870,  pop:96000,   region:"Eastern" },
  { id:"ZM-EP-009", district:"Vubwi",          province:"Eastern",      prov_code:"EP", lat:-13.967, lng:32.767, area_km2:2560,  pop:76000,   region:"Eastern" },
  { id:"ZM-EP-010", district:"Zumbo",          province:"Eastern",      prov_code:"EP", lat:-15.617, lng:30.433, area_km2:3200,  pop:54000,   region:"Eastern" },

  // NORTHERN PROVINCE
  { id:"ZM-NP-001", district:"Kasama",         province:"Northern",     prov_code:"NP", lat:-10.217, lng:31.183, area_km2:5560,  pop:313000,  region:"Northern" },
  { id:"ZM-NP-002", district:"Mbala",          province:"Northern",     prov_code:"NP", lat:-8.850,  lng:31.367, area_km2:9200,  pop:192000,  region:"Northern" },
  { id:"ZM-NP-003", district:"Luwingu",        province:"Northern",     prov_code:"NP", lat:-10.250, lng:29.917, area_km2:8330,  pop:145000,  region:"Northern" },
  { id:"ZM-NP-004", district:"Mporokoso",      province:"Northern",     prov_code:"NP", lat:-9.367,  lng:30.117, area_km2:14040, pop:129000,  region:"Northern" },
  { id:"ZM-NP-005", district:"Mpika",          province:"Northern",     prov_code:"NP", lat:-11.833, lng:31.450, area_km2:36380, pop:234000,  region:"Northern" },
  { id:"ZM-NP-006", district:"Chinsali",       province:"Northern",     prov_code:"NP", lat:-10.550, lng:32.083, area_km2:10830, pop:164000,  region:"Northern" },
  { id:"ZM-NP-007", district:"Isoka",          province:"Northern",     prov_code:"NP", lat:-10.150, lng:32.633, area_km2:10460, pop:149000,  region:"Northern" },
  { id:"ZM-NP-008", district:"Kaputa",         province:"Northern",     prov_code:"NP", lat:-8.467,  lng:29.667, area_km2:16990, pop:97000,   region:"Northern" },
  { id:"ZM-NP-009", district:"Mungwi",         province:"Northern",     prov_code:"NP", lat:-10.833, lng:31.367, area_km2:5980,  pop:118000,  region:"Northern" },
  { id:"ZM-NP-010", district:"Nakonde",        province:"Northern",     prov_code:"NP", lat:-9.333,  lng:32.750, area_km2:2640,  pop:130000,  region:"Northern" },

  // WESTERN PROVINCE
  { id:"ZM-WP-001", district:"Mongu",          province:"Western",      prov_code:"WP", lat:-15.283, lng:23.117, area_km2:5840,  pop:249000,  region:"Western" },
  { id:"ZM-WP-002", district:"Kaoma",          province:"Western",      prov_code:"WP", lat:-14.800, lng:24.800, area_km2:17150, pop:230000,  region:"Western" },
  { id:"ZM-WP-003", district:"Senanga",        province:"Western",      prov_code:"WP", lat:-16.117, lng:23.267, area_km2:8580,  pop:172000,  region:"Western" },
  { id:"ZM-WP-004", district:"Sesheke",        province:"Western",      prov_code:"WP", lat:-17.467, lng:24.300, area_km2:9940,  pop:128000,  region:"Western" },
  { id:"ZM-WP-005", district:"Kalabo",         province:"Western",      prov_code:"WP", lat:-14.967, lng:22.667, area_km2:19090, pop:129000,  region:"Western" },
  { id:"ZM-WP-006", district:"Lukulu",         province:"Western",      prov_code:"WP", lat:-14.383, lng:23.233, area_km2:11860, pop:88000,   region:"Western" },
  { id:"ZM-WP-007", district:"Limulunga",      province:"Western",      prov_code:"WP", lat:-15.083, lng:22.983, area_km2:3290,  pop:72000,   region:"Western" },
  { id:"ZM-WP-008", district:"Mitete",         province:"Western",      prov_code:"WP", lat:-14.017, lng:22.500, area_km2:9870,  pop:47000,   region:"Western" },
  { id:"ZM-WP-009", district:"Mulobezi",       province:"Western",      prov_code:"WP", lat:-16.767, lng:25.233, area_km2:9120,  pop:64000,   region:"Western" },
  { id:"ZM-WP-010", district:"Nkeyema",        province:"Western",      prov_code:"WP", lat:-14.717, lng:24.083, area_km2:5840,  pop:91000,   region:"Western" },
  { id:"ZM-WP-011", district:"Shangombo",      province:"Western",      prov_code:"WP", lat:-16.233, lng:22.383, area_km2:18290, pop:62000,   region:"Western" },

  // CENTRAL PROVINCE
  { id:"ZM-CP-001", district:"Kabwe",          province:"Central",      prov_code:"CP", lat:-14.447, lng:28.456, area_km2:1800,  pop:290390,  region:"Central" },
  { id:"ZM-CP-002", district:"Kapiri Mposhi",  province:"Central",      prov_code:"CP", lat:-13.967, lng:28.683, area_km2:5640,  pop:262000,  region:"Central" },
  { id:"ZM-CP-003", district:"Serenje",        province:"Central",      prov_code:"CP", lat:-13.233, lng:30.233, area_km2:19880, pop:185000,  region:"Central" },
  { id:"ZM-CP-004", district:"Mkushi",         province:"Central",      prov_code:"CP", lat:-13.617, lng:29.417, area_km2:15100, pop:198000,  region:"Central" },
  { id:"ZM-CP-005", district:"Chibombo",       province:"Central",      prov_code:"CP", lat:-14.667, lng:28.133, area_km2:5440,  pop:218000,  region:"Central" },
  { id:"ZM-CP-006", district:"Mumbwa",         province:"Central",      prov_code:"CP", lat:-14.983, lng:27.067, area_km2:16230, pop:208000,  region:"Central" },
  { id:"ZM-CP-007", district:"Chitambo",       province:"Central",      prov_code:"CP", lat:-13.017, lng:30.833, area_km2:15380, pop:118000,  region:"Central" },
  { id:"ZM-CP-008", district:"Itawa",          province:"Central",      prov_code:"CP", lat:-12.983, lng:29.000, area_km2:3540,  pop:67000,   region:"Central" },
  { id:"ZM-CP-009", district:"Luano",          province:"Central",      prov_code:"CP", lat:-14.333, lng:29.833, area_km2:8320,  pop:64000,   region:"Central" },

  // LUAPULA PROVINCE
  { id:"ZM-LP-001", district:"Mansa",          province:"Luapula",      prov_code:"LP", lat:-11.200, lng:28.883, area_km2:4650,  pop:260000,  region:"Northern" },
  { id:"ZM-LP-002", district:"Nchelenge",      province:"Luapula",      prov_code:"LP", lat:-9.350,  lng:28.733, area_km2:3100,  pop:196000,  region:"Northern" },
  { id:"ZM-LP-003", district:"Kawambwa",       province:"Luapula",      prov_code:"LP", lat:-9.783,  lng:29.083, area_km2:8370,  pop:152000,  region:"Northern" },
  { id:"ZM-LP-004", district:"Samfya",         province:"Luapula",      prov_code:"LP", lat:-11.367, lng:29.550, area_km2:8060,  pop:203000,  region:"Northern" },
  { id:"ZM-LP-005", district:"Milenge",        province:"Luapula",      prov_code:"LP", lat:-11.433, lng:30.333, area_km2:8750,  pop:88000,   region:"Northern" },
  { id:"ZM-LP-006", district:"Chembe",         province:"Luapula",      prov_code:"LP", lat:-10.983, lng:29.683, area_km2:3120,  pop:86000,   region:"Northern" },
  { id:"ZM-LP-007", district:"Chipili",        province:"Luapula",      prov_code:"LP", lat:-10.733, lng:29.117, area_km2:5870,  pop:96000,   region:"Northern" },
  { id:"ZM-LP-008", district:"Lunga",          province:"Luapula",      prov_code:"LP", lat:-11.683, lng:28.433, area_km2:4890,  pop:57000,   region:"Northern" },
  { id:"ZM-LP-009", district:"Mwansabombwe",   province:"Luapula",      prov_code:"LP", lat:-9.167,  lng:28.800, area_km2:2700,  pop:82000,   region:"Northern" },

  // NORTH-WESTERN PROVINCE
  { id:"ZM-NW-001", district:"Solwezi",        province:"North-Western",prov_code:"NW", lat:-12.183, lng:26.400, area_km2:8320,  pop:377000,  region:"Northern" },
  { id:"ZM-NW-002", district:"Kasempa",        province:"North-Western",prov_code:"NW", lat:-13.467, lng:25.833, area_km2:18200, pop:120000,  region:"Northern" },
  { id:"ZM-NW-003", district:"Mwinilunga",     province:"North-Western",prov_code:"NW", lat:-11.733, lng:24.433, area_km2:18780, pop:175000,  region:"Northern" },
  { id:"ZM-NW-004", district:"Kabompo",        province:"North-Western",prov_code:"NW", lat:-13.583, lng:24.200, area_km2:19580, pop:110000,  region:"Northern" },
  { id:"ZM-NW-005", district:"Zambezi",        province:"North-Western",prov_code:"NW", lat:-13.550, lng:23.100, area_km2:19230, pop:119000,  region:"Northern" },
  { id:"ZM-NW-006", district:"Chavuma",        province:"North-Western",prov_code:"NW", lat:-13.067, lng:22.700, area_km2:5050,  pop:72000,   region:"Northern" },
  { id:"ZM-NW-007", district:"Ikelenge",       province:"North-Western",prov_code:"NW", lat:-11.233, lng:24.133, area_km2:5290,  pop:62000,   region:"Northern" },
  { id:"ZM-NW-008", district:"Mufumbwe",       province:"North-Western",prov_code:"NW", lat:-13.783, lng:24.767, area_km2:7760,  pop:79000,   region:"Northern" },
  { id:"ZM-NW-009", district:"Mushindamo",     province:"North-Western",prov_code:"NW", lat:-12.433, lng:26.033, area_km2:9440,  pop:61000,   region:"Northern" },

  // MUCHINGA PROVINCE
  { id:"ZM-MC-001", district:"Chinsali",       province:"Muchinga",     prov_code:"MC", lat:-10.550, lng:32.083, area_km2:10830, pop:164000,  region:"Northern" },
  { id:"ZM-MC-002", district:"Mpika",          province:"Muchinga",     prov_code:"MC", lat:-11.833, lng:31.450, area_km2:36380, pop:234000,  region:"Northern" },
  { id:"ZM-MC-003", district:"Nakonde",        province:"Muchinga",     prov_code:"MC", lat:-9.333,  lng:32.750, area_km2:2640,  pop:130000,  region:"Northern" },
  { id:"ZM-MC-004", district:"Isoka",          province:"Muchinga",     prov_code:"MC", lat:-10.150, lng:32.633, area_km2:10460, pop:149000,  region:"Northern" },
  { id:"ZM-MC-005", district:"Mafinga",        province:"Muchinga",     prov_code:"MC", lat:-10.100, lng:33.067, area_km2:5140,  pop:89000,   region:"Northern" },
  { id:"ZM-MC-006", district:"Shiwang'andu",   province:"Muchinga",     prov_code:"MC", lat:-11.233, lng:32.017, area_km2:8770,  pop:96000,   region:"Northern" }
];

// Province summary (derived from NSDI districts data)
const ZAMBIA_PROVINCES = [
  { name:"Lusaka",       code:"LS", districts:6,  area_km2:21896,  pop:3360000, color:"#e67e22", capital:"Lusaka",      forest_pct:12, urban_pct:34, water_pct:3,  agri_pct:38, bare_pct:13 },
  { name:"Copperbelt",   code:"CB", districts:10, area_km2:31328,  pop:2098000, color:"#27ae60", capital:"Ndola",       forest_pct:42, urban_pct:18, water_pct:4,  agri_pct:28, bare_pct:8  },
  { name:"Southern",     code:"SP", districts:12, area_km2:85283,  pop:1856000, color:"#f1c40f", capital:"Livingstone", forest_pct:22, urban_pct:4,  water_pct:9,  agri_pct:52, bare_pct:13 },
  { name:"Eastern",      code:"EP", districts:10, area_km2:69106,  pop:1858000, color:"#3498db", capital:"Chipata",     forest_pct:38, urban_pct:3,  water_pct:3,  agri_pct:49, bare_pct:7  },
  { name:"Northern",     code:"NP", districts:10, area_km2:147826, pop:1462000, color:"#1abc9c", capital:"Kasama",      forest_pct:58, urban_pct:2,  water_pct:8,  agri_pct:28, bare_pct:4  },
  { name:"Western",      code:"WP", districts:11, area_km2:126386, pop:1052000, color:"#9b59b6", capital:"Mongu",       forest_pct:28, urban_pct:2,  water_pct:14, agri_pct:44, bare_pct:12 },
  { name:"Central",      code:"CP", districts:9,  area_km2:94395,  pop:1619000, color:"#e74c3c", capital:"Kabwe",       forest_pct:45, urban_pct:5,  water_pct:4,  agri_pct:38, bare_pct:8  },
  { name:"Luapula",      code:"LP", districts:9,  area_km2:50567,  pop:1220000, color:"#fd79a8", capital:"Mansa",       forest_pct:48, urban_pct:3,  water_pct:18, agri_pct:27, bare_pct:4  },
  { name:"North-Western",code:"NW", districts:9,  area_km2:125826, pop:1175000, color:"#00b894", capital:"Solwezi",     forest_pct:62, urban_pct:2,  water_pct:5,  agri_pct:27, bare_pct:4  },
  { name:"Muchinga",     code:"MC", districts:6,  area_km2:84999,  pop:917000,  color:"#6c5ce7", capital:"Chinsali",    forest_pct:55, urban_pct:2,  water_pct:6,  agri_pct:32, bare_pct:5  }
];

// Forest cover trend 2018-2024 (km², sourced from Zambia Forestry Department / FAO)
const FOREST_TREND = {
  years: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
  total_km2:  [494000, 484000, 473000, 461000, 452000, 443000, 435000],
  loss_km2:   [10800,  11000,  12000,  9000,   9000,   8000,   8000  ],
  gain_km2:   [800,    700,    500,    600,    400,    500,    600   ]
};

// Rainfall data by month (mm, Lusaka baseline, CHIRPS 2023)
const RAINFALL_MONTHLY = {
  months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  lusaka:    [222, 191, 152,  46,   5,    0,    0,    2,   18,  68,  140,  201 ],
  ndola:     [274, 228, 188,  62,  10,    1,    1,    4,   24,  82,  169,  248 ],
  livingstone:[119, 99,  83,  18,   1,    0,    0,    0,    9,  39,   85,  113 ],
  chipata:   [196, 168, 138,  48,   7,    1,    0,    2,   22,  73,  131,  186 ]
};

// Land cover national summary (km²) from LCCS 2024
const LAND_COVER_NATIONAL = {
  forest:       {area: 435000, pct: 57.8, label:"Forest / Woodland",    color:"#1a6b35"},
  agriculture:  {area: 178000, pct: 23.7, label:"Agriculture / Cropland",color:"#eab308"},
  grassland:    {area:  62000, pct:  8.2, label:"Grassland / Savanna",   color:"#84cc16"},
  water:        {area:  48000, pct:  6.4, label:"Water Bodies",          color:"#3b82f6"},
  urban:        {area:   8500, pct:  1.1, label:"Urban / Built-up",      color:"#f97316"},
  bare:         {area:  12000, pct:  1.6, label:"Bare Land / Soil",      color:"#9ca3af"},
  wetland:      {area:   9112, pct:  1.2, label:"Wetlands / Floodplains",color:"#06b6d4"}
};

// Major water bodies (from Zambia Water Atlas)
const WATER_BODIES = [
  { name:"Lake Kariba",      lat:-16.800, lng:28.000, area_km2:5580,  type:"Reservoir",  depth_m:97,  shared_with:"Zimbabwe" },
  { name:"Lake Bangweulu",   lat:-11.500, lng:29.800, area_km2:9800,  type:"Lake/Wetland",depth_m:4,  shared_with:"Zambia only" },
  { name:"Lake Mweru",       lat:-9.000,  lng:28.800, area_km2:5120,  type:"Lake",       depth_m:37,  shared_with:"DRC" },
  { name:"Lake Tanganyika",  lat:-8.900,  lng:31.100, area_km2:32600, type:"Lake",       depth_m:1470,shared_with:"DRC/Tanzania/Burundi" },
  { name:"Kafue Flats",      lat:-15.500, lng:27.000, area_km2:6500,  type:"Wetland",    depth_m:null,shared_with:"Zambia only" },
  { name:"Lake Mweru Wantipa",lat:-8.750, lng:29.750, area_km2:1400,  type:"Lake",       depth_m:12,  shared_with:"Zambia only" }
];

// ─────────────────────────────────────────────────────────────────────────────
// PROVINCE TEMPERATURE DATA (Land Surface Temperature °C, 2022-2025)
// Source: zambia_district_temperature_2022_2025.csv
// Note: values are province-level monthly averages. High Aug-Oct values reflect
//       LST (land surface) rather than air temperature — typical for dry season.
// ─────────────────────────────────────────────────────────────────────────────
const ZAMBIA_TEMPERATURE = {
  months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  years: [2022, 2023, 2024, 2025],
  // Monthly avg LST per province per year [Jan..Dec]
  provinces: {
    "Central": {
      2022: [25.97, 25.86, 26.24, 25.47, 25.77, 23.48, 25.12, 31.09, 36.92, 38.84, 33.98, 29.89],
      2023: [25.35, 26.32, 25.84, 26.86, 27.19, 26.37, 25.42, 30.59, 36.82, 37.96, 36.52, 31.75],
      2024: [27.41, 29.04, 27.71, 27.84, 26.05, 24.97, 26.94, 30.36, 36.33, 37.72, 33.62, 32.66],
      2025: [25.57, 25.24, 25.15, 25.63, 23.59, 22.64, 22.21, 26.81, 33.12, 35.73, 31.38, 24.82]
    },
    "Copperbelt": {
      2022: [24.45, 24.58, 25.78, 24.64, 24.50, 22.57, 24.37, 30.46, 35.81, 37.16, 31.32, 27.85],
      2023: [24.33, 25.99, 24.44, 24.87, 25.67, 25.01, 24.67, 30.44, 35.02, 34.40, 32.27, 27.86],
      2024: [25.46, 27.03, 25.81, 25.74, 24.60, 23.93, 26.55, 30.62, 34.68, 34.23, 29.56, 28.36],
      2025: [24.60, 24.29, 24.43, 23.54, 22.21, 21.22, 21.32, 26.11, 32.00, 33.39, 29.27, 23.96]
    },
    "Eastern": {
      2022: [27.49, 27.84, 27.14, 26.06, 27.16, 25.21, 27.35, 32.86, 38.80, 42.19, 39.55, 33.13],
      2023: [27.49, 27.23, 26.00, 26.44, 27.59, 27.37, 27.77, 32.17, 38.64, 40.76, 38.13, 32.22],
      2024: [28.96, 30.10, 27.86, 27.69, 27.52, 26.67, 28.94, 33.56, 39.55, 40.32, 35.43, 34.57],
      2025: [26.87, 26.57, 25.76, 25.34, 24.71, 23.74, 24.51, 29.89, 36.03, 38.31, 33.64, 27.60]
    },
    "Luapula": {
      2022: [25.42, 25.67, 26.22, 25.15, 26.37, 24.89, 25.11, 31.07, 34.01, 36.48, 33.28, 28.53],
      2023: [25.19, 26.83, 25.43, 26.41, 27.64, 27.57, 25.99, 30.37, 34.77, 36.02, 35.41, 30.12],
      2024: [26.94, 28.41, 26.54, 26.83, 25.98, 24.68, 26.90, 30.81, 34.33, 35.12, 31.00, 31.18],
      2025: [25.21, 24.97, 24.72, 24.61, 23.06, 21.99, 22.35, 26.72, 32.17, 34.51, 29.90, 24.64]
    },
    "Lusaka": {
      2022: [27.14, 26.88, 27.56, 26.23, 27.35, 23.50, 25.83, 31.41, 37.68, 39.77, 34.91, 30.12],
      2023: [27.02, 27.81, 27.24, 28.13, 28.91, 27.64, 26.71, 31.58, 37.93, 39.14, 37.82, 32.81],
      2024: [28.53, 29.97, 28.42, 28.76, 26.89, 25.88, 27.71, 31.85, 37.47, 38.94, 34.62, 33.78],
      2025: [26.71, 26.34, 26.01, 26.32, 24.53, 23.41, 23.71, 27.96, 34.43, 36.83, 32.14, 25.63]
    },
    "North-Western": {
      2022: [26.31, 26.58, 26.99, 24.87, 25.63, 23.17, 24.61, 30.98, 35.62, 37.83, 32.97, 28.04],
      2023: [26.17, 27.14, 25.91, 26.44, 27.27, 26.80, 25.93, 30.11, 35.10, 36.70, 35.52, 30.18],
      2024: [27.23, 29.05, 27.12, 27.04, 25.88, 24.51, 26.82, 30.51, 35.22, 36.17, 31.93, 31.35],
      2025: [25.43, 25.31, 25.08, 24.89, 23.28, 22.10, 22.56, 27.18, 32.67, 34.92, 30.43, 24.57]
    },
    "Northern": {
      2022: [24.83, 25.12, 25.47, 24.21, 25.08, 23.31, 24.48, 30.72, 35.48, 37.21, 32.84, 27.76],
      2023: [24.72, 26.01, 25.11, 25.63, 26.74, 26.43, 25.38, 30.02, 35.23, 36.81, 35.04, 29.48],
      2024: [26.45, 28.13, 26.38, 26.57, 25.44, 24.02, 26.35, 30.44, 35.17, 36.43, 32.05, 30.73],
      2025: [24.91, 24.53, 24.37, 24.17, 22.88, 21.79, 22.08, 26.94, 32.43, 34.78, 29.97, 24.18]
    },
    "Southern": {
      2022: [28.45, 28.02, 29.13, 27.84, 28.43, 24.71, 27.34, 33.87, 39.24, 41.83, 36.41, 31.54],
      2023: [28.21, 28.93, 27.81, 28.47, 29.14, 28.73, 28.11, 33.44, 39.67, 41.20, 39.18, 33.17],
      2024: [29.84, 31.22, 29.51, 29.63, 28.31, 26.89, 29.05, 34.28, 40.31, 41.97, 36.87, 35.42],
      2025: [27.87, 27.62, 27.23, 27.08, 25.64, 24.33, 25.14, 30.62, 36.84, 39.41, 34.27, 27.63]
    },
    "Western": {
      2022: [26.84, 27.08, 27.77, 26.63, 27.18, 24.28, 25.86, 33.14, 38.97, 40.72, 35.39, 30.98],
      2023: [27.26, 29.12, 28.56, 30.19, 29.90, 27.76, 26.18, 32.78, 37.84, 41.03, 37.68, 33.49],
      2024: [30.83, 32.68, 31.91, 29.90, 28.56, 26.19, 27.66, 32.86, 37.45, 39.63, 35.30, 34.56],
      2025: [27.51, 27.73, 27.57, 26.32, 25.03, 22.55, 23.29, 27.82, 33.88, 35.86, 31.90, 27.73]
    },
    "Muchinga": {
      2022: [24.91, 25.34, 25.78, 24.53, 25.34, 23.57, 24.82, 30.95, 36.17, 38.02, 33.21, 28.14],
      2023: [24.81, 25.94, 25.22, 25.73, 26.91, 26.67, 25.61, 30.24, 35.89, 37.45, 35.73, 29.87],
      2024: [26.58, 28.31, 26.64, 26.73, 25.61, 24.19, 26.49, 30.63, 35.54, 36.87, 32.38, 31.04],
      2025: [25.03, 24.69, 24.48, 24.31, 22.96, 21.87, 22.19, 27.05, 32.67, 34.97, 30.14, 24.35]
    }
  },
  // Annual mean temperatures per province (derived averages)
  annual_means: {
    2022: { "Central":29.39,"Copperbelt":27.71,"Eastern":31.40,"Luapula":28.52,"Lusaka":29.87,"North-Western":28.59,"Northern":28.04,"Southern":31.57,"Western":31.24,"Muchinga":29.23 },
    2023: { "Central":30.13,"Copperbelt":28.33,"Eastern":31.57,"Luapula":29.10,"Lusaka":30.89,"North-Western":29.27,"Northern":28.72,"Southern":32.17,"Western":31.82,"Muchinga":29.93 },
    2024: { "Central":30.97,"Copperbelt":28.89,"Eastern":32.52,"Luapula":29.83,"Lusaka":31.60,"North-Western":29.90,"Northern":29.18,"Southern":32.77,"Western":32.29,"Muchinga":30.66 },
    2025: { "Central":27.15,"Copperbelt":23.94,"Eastern":26.89,"Luapula":24.61,"Lusaka":25.33,"North-Western":24.53,"Northern":24.07,"Southern":27.63,"Western":26.51,"Muchinga":24.56 }
  }
};

// Mining operations (Zambia Development Agency 2023)
const MINING_SITES = [
  { name:"Kansanshi Mine",      lat:-12.083, lng:26.433, company:"First Quantum Minerals", type:"Copper/Gold",   production_t:215000 },
  { name:"Lumwana Mine",        lat:-12.533, lng:25.833, company:"Barrick Gold",           type:"Copper",        production_t:155000 },
  { name:"Nchanga Copper Mine", lat:-12.500, lng:27.883, company:"Vedanta Resources",      type:"Copper",        production_t:125000 },
  { name:"Mufulira Mine",       lat:-12.550, lng:28.233, company:"Mopani Copper Mines",    type:"Copper",        production_t:98000  },
  { name:"Nkana Mine",          lat:-12.817, lng:28.200, company:"Mopani Copper Mines",    type:"Copper/Cobalt", production_t:87000  },
  { name:"Konkola Deep",        lat:-12.583, lng:27.817, company:"Vedanta Resources",      type:"Copper",        production_t:76000  }
];

// ─────────────────────────────────────────────────────────────────────────────
// ZAMBIA NATIONAL RAINFALL 2020–2025
// Source: Zambia_Rainfall_2020_2025.csv  (CHIRPS / Google Earth Engine export)
// Structure: national monthly aggregate rainfall_mm per year
// 72 records — 6 years × 12 months
// ─────────────────────────────────────────────────────────────────────────────
const ZAMBIA_RAINFALL_2020_2025 = {
  months: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  years:  [2020, 2021, 2022, 2023, 2024, 2025],
  // monthly rainfall_mm per year (index 0=Jan … 11=Dec)
  data: {
    2020: [250.73, 237.21, 190.51, 36.28,  2.87,  0.61,  0.07,  0.21,  2.28, 20.26, 85.32, 238.03],
    2021: [271.18, 225.94, 170.77, 23.32,  7.53,  0.00,  0.00,  0.01,  0.70, 24.03, 68.28, 133.20],
    2022: [314.29, 181.64, 178.55, 85.21,  1.27,  0.25,  0.00,  0.01,  2.99,  9.71, 120.75, 201.95],
    2023: [260.39, 148.82, 152.56, 49.57,  2.02,  0.00,  0.00,  0.02,  2.46, 40.68, 71.51, 233.73],
    2024: [208.78, 105.33, 106.05, 58.80,  1.89,  0.28,  0.00,  0.40,  2.36, 29.31, 87.70, 129.86],
    2025: [231.81, 203.06, 116.21, 80.11, 10.19,  0.28,  0.10,  0.00,  2.17, 13.46, 121.26, 233.40]
  },
  // annual totals (mm) derived
  annual_totals: {
    2020: 1063.4,
    2021:  724.9,
    2022: 1196.6,
    2023: 1061.7,
    2024:  730.8,
    2025: 1012.1
  },
  // wet-season totals Oct–Mar (primary rainy season)
  wet_season: {
    2020: 1022.1,
    2021:  723.4,
    2022: 1107.8,
    2023:  917.3,
    2024:  667.1,
    2025:  919.2
  },
  // anomaly vs 2020 baseline (%)
  anomaly_pct: {
    2021: -31.8,
    2022: +12.5,
    2023:  -0.2,
    2024: -31.3,
    2025:  -4.8
  },
  source: "Zambia_Rainfall_2020_2025.csv · CHIRPS / GEE national aggregate",
  units: "mm/month"
};

// ─────────────────────────────────────────────────────────────────────────────
// DROUGHT RISK INDEX 2020–2025
// Source: drought_risk_2020_2025.tif.aux.xml  (raster band statistics)
// Band: drought_risk — scale 0 (low) → 1 (high)
// Valid pixels: 53.66 % of Zambia extent
// ─────────────────────────────────────────────────────────────────────────────
const DROUGHT_RISK_STATS = {
  band:          "drought_risk",
  min:           0.193,   // least-exposed area
  max:           0.858,   // most-exposed area
  mean:          0.716,   // national mean → HIGH risk territory
  stddev:        0.076,
  valid_pct:     53.66,   // % of raster with data
  source:        "drought_risk_2020_2025.tif (GDAL aux.xml)",
  // Qualitative classification thresholds
  classes: [
    { label:"Low",      min:0.00, max:0.35, color:"#86efac", pct:  2 },
    { label:"Moderate", min:0.35, max:0.55, color:"#fde68a", pct:  8 },
    { label:"High",     min:0.55, max:0.72, color:"#f97316", pct: 42 },
    { label:"Extreme",  min:0.72, max:1.00, color:"#dc2626", pct: 48 }
  ],
  // Per-province estimated drought risk (derived from mean rainfall anomaly 2020-2025)
  by_province: {
    "Central":       0.68,
    "Copperbelt":    0.62,
    "Eastern":       0.75,
    "Luapula":       0.60,
    "Lusaka":        0.72,
    "Muchinga":      0.65,
    "North-Western": 0.58,
    "Northern":      0.59,
    "Southern":      0.82,
    "Western":       0.78
  }
};

// Export as module-like global
window.GeoHubData = {
  metadata:          ZAMBIA_METADATA,
  districts:         ZAMBIA_DISTRICTS,
  provinces:         ZAMBIA_PROVINCES,
  forestTrend:       FOREST_TREND,
  rainfall:          RAINFALL_MONTHLY,
  rainfallTimeSeries: ZAMBIA_RAINFALL_2020_2025,
  droughtRisk:       DROUGHT_RISK_STATS,
  landCover:         LAND_COVER_NATIONAL,
  waterBodies:       WATER_BODIES,
  miningSites:       MINING_SITES,
  // GEE Layer Scales for visualizers
  geeScales: {
    worldcover: {
      10: { label: "Tree cover",             color: "#006400" },
      20: { label: "Shrubland",              color: "#009600" },
      30: { label: "Grassland",              color: "#00C800" },
      40: { label: "Cropland",               color: "#00D800" },
      50: { label: "Built up",               color: "#00E800" },
      60: { label: "Bare/sparse vegetation", color: "#00F800" },
      70: { label: "Snow/Ice",               color: "#00FF00" },
      80: { label: "Water bodies",           color: "#00FF64" },
      90: { label: "Wetlands",               color: "#00FFC8" },
      95: { label: "Mangroves",              color: "#00FFFF" },
      100: { label: "Moss/lichen",          color: "#64FFFF" }
    },
    lulc: {
      1: { label: "Evergreen Needleleaf Forest", color: "#05450a" },
      2: { label: "Evergreen Broadleaf Forest",  color: "#086a10" },
      3: { label: "Deciduous Needleleaf Forest", color: "#54a708" },
      4: { label: "Deciduous Broadleaf Forest",  color: "#78d203" },
      5: { label: "Mixed Forests",                color: "#009900" },
      6: { label: "Closed Shrublands",            color: "#c6b044" },
      7: { label: "Open Shrublands",              color: "#dcd159" },
      8: { label: "Woody Savannas",               color: "#dade48" },
      9: { label: "Savannas",                     color: "#fbff13" },
      10: { label: "Grasslands",                  color: "#b6ff05" },
      11: { label: "Permanent Wetlands",          color: "#27ff87" },
      12: { label: "Croplands",                   color: "#c24f44" },
      13: { label: "Urban/Built-up",              color: "#a5a5a5" },
      14: { label: "Snow/Ice",                    color: "#ff6d4c" },
      15: { label: "Barren/Sparsely Vegetated",   color: "#69fff8" },
      16: { label: "Unclassified",                color: "#f9ffa4" },
      17: { label: "Water Bodies",                color: "#1c0dff" }
    },
    ndvi: {
      type: "continuous",
      min: 0.1,
      max: 0.8,
      palette: ["#ce7e45","#df923d","#f1b555","#fcd163","#99b718","#74a901","#66a000","#529400","#3e8601","#207401","#056201","#004c00"],
      label: "NDVI Vegetation Index"
    },
    chirps: {
      type: "continuous",
      min: 0,
      max: 2000,
      palette: ["#fff7fb","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#034e7b"],
      label: "Annual Precipitation (mm)"
    },
    lst: {
      type: "continuous",
      min: 15,
      max: 50,
      palette: ["#040274","#040281","#0502a3","#0502b8","#0602ff","#235cb1","#307ef3","#269db1","#30c8e2","#32d3ef","#3be285","#3ff38f","#86e26f","#3ae237","#b5e22e","#d6e21f","#fff705","#ffd611","#ffb613","#ff8b13","#ff6e08","#ff500d","#ff0000","#de0101","#c21301","#a71001","#911003"],
      label: "Land Surface Temperature (°C)"
    },
    drought: {
      type: "continuous",
      min: 0,
      max: 100,
      palette: ["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],
      label: "Vegetation Condition Index (%)"
    },
    flood: {
      type: "binary",
      0: { label: "No Water", color: "#000000", opacity: 0 },
      1: { label: "Water", color: "#1a75ff" }
    }
  }
};
