/**
 * GeoHub Zambia — Agriculture Intelligence Module v1.0
 * ======================================================
 * 10 powerful agriculture-focused features:
 *   1. Agro-Climatic Suitability Engine (8 major crops)
 *   2. Crop Yield Prediction Model
 *   3. Fertilizer Recommendation (N-P-K per crop per district)
 *   4. Growing Season Calendar
 *   5. Zambia Farming Areas Overlay
 *   6. Agricultural Statistics Dashboard
 *   7. Market Price Index
 *   8. Irrigation Potential Map
 *   9. Pest & Disease Risk Alert
 *  10. Soil Type Database
 */

const GeoHubAgriculture = (() => {
    'use strict';

    // ─────────────────────────────────────────────────────────────
    // 1. Zambia Soil Type Database
    // ─────────────────────────────────────────────────────────────
    const SOIL_TYPES = [
        { id: 'ST-001', name: 'Acrisols', zambian_distribution: 'Northern, Luapula, Copperbelt', characteristics: 'Highly leached, acidic, low base saturation', texture: 'Loamy to clayey', drainage: 'Moderate to good', ph_range: '4.5-5.5', organic_matter: 'Low to moderate', fertility: 'Low', crops_suitable: ['Cassava', 'Groundnuts', 'Sweet Potato'], coverage_pct: 18 },
        { id: 'ST-002', name: 'Ferralsols', zambian_distribution: 'Central, Muchinga, Eastern highlands', characteristics: 'Deep, well-drained, rich in iron oxides', texture: 'Clayey', drainage: 'Good', ph_range: '4.5-6.0', organic_matter: 'Low to moderate', fertility: 'Low to moderate', crops_suitable: ['Maize', 'Soybeans', 'Cotton', 'Tobacco'], coverage_pct: 15 },
        { id: 'ST-003', name: 'Luvisols', zambian_distribution: 'Southern, Lusaka, Central valleys', characteristics: 'High base status, moderate organic matter', texture: 'Sandy loam to clay loam', drainage: 'Moderate to good', ph_range: '5.5-7.0', organic_matter: 'Moderate', fertility: 'Moderate to high', crops_suitable: ['Maize', 'Cotton', 'Sorghum', 'Groundnuts'], coverage_pct: 14 },
        { id: 'ST-004', name: 'Cambisols', zambian_distribution: 'All provinces (young soils)', characteristics: 'Young, developing soil with moderate profile', texture: 'Variable (loam to clay)', drainage: 'Moderate', ph_range: '5.0-6.5', organic_matter: 'Moderate', fertility: 'Moderate', crops_suitable: ['Maize', 'Cassava', 'Sweet Potato', 'Vegetables'], coverage_pct: 12 },
        { id: 'ST-005', name: 'Vertisols', zambian_distribution: 'Kafue Flats, Bangweulu Basin, Barotse', characteristics: 'Clay-rich, shrinking/swelling, cracking clay', texture: 'Heavy clay', drainage: 'Poor (seasonally waterlogged)', ph_range: '5.5-7.5', organic_matter: 'Moderate to high', fertility: 'High (but waterlogging risk)', crops_suitable: ['Rice', 'Sorghum', 'Sugarcane'], coverage_pct: 6 },
        { id: 'ST-006', name: 'Gleysols', zambian_distribution: 'Wetlands, dambos, floodplains', characteristics: 'Groundwater-affected, greyish colour', texture: 'Clay to silty clay', drainage: 'Poor to very poor', ph_range: '4.5-6.5', organic_matter: 'High', fertility: 'Moderate to high', crops_suitable: ['Rice', 'Sugarcane', 'Taro'], coverage_pct: 5 },
        { id: 'ST-007', name: 'Leptosols', zambian_distribution: 'Escarpments, Muchinga, hill slopes', characteristics: 'Shallow, rocky, limited soil depth (<30cm)', texture: 'Skeletal/gravelly', drainage: 'Excessive', ph_range: '5.0-7.0', organic_matter: 'Very low', fertility: 'Very low', crops_suitable: ['Sorghum', 'Millet'], coverage_pct: 8 },
        { id: 'ST-008', name: 'Regosols', zambian_distribution: 'Sandveld areas, Western Province, Kalahari', characteristics: 'Deep sandy soils, low water retention', texture: 'Sand to loamy sand', drainage: 'Excessive', ph_range: '4.5-5.5', organic_matter: 'Very low', fertility: 'Very low', crops_suitable: ['Cassava', 'Groundnuts', 'Millet'], coverage_pct: 10 },
        { id: 'ST-009', name: 'Nitisols', zambian_distribution: 'Copperbelt, Eastern Province pockets', characteristics: 'Deep, red, well-structured, high clay', texture: 'Clay', drainage: 'Good', ph_range: '5.0-6.5', organic_matter: 'Moderate', fertility: 'High', crops_suitable: ['Coffee', 'Maize', 'Soybeans', 'Tobacco'], coverage_pct: 4 },
        { id: 'ST-010', name: 'Histosols', zambian_distribution: 'Bangweulu, Lukanga, Kafue wetlands', characteristics: 'Organic/peat soils, high carbon', texture: 'Peaty', drainage: 'Very poor', ph_range: '4.0-5.5', organic_matter: 'Very high', fertility: 'Low (nutrient-poor peat)', crops_suitable: ['Rice', 'Taro'], coverage_pct: 2 },
        { id: 'ST-011', name: 'Planosols', zambian_distribution: 'Plateau areas, Eastern Province', characteristics: 'Surface leaching, abrupt textural change', texture: 'Sandy over clay subsoil', drainage: 'Seasonally poor', ph_range: '4.5-6.0', organic_matter: 'Low to moderate', fertility: 'Low', crops_suitable: ['Groundnuts', 'Cassava', 'Millet'], coverage_pct: 4 },
        { id: 'ST-012', name: 'Arenosols', zambian_distribution: 'Western Province sand dunes', characteristics: 'Deep sand, very low nutrient/water holding', texture: 'Sand', drainage: 'Excessive', ph_range: '4.0-5.5', organic_matter: 'Very low', fertility: 'Very low', crops_suitable: ['Cassava', 'Millet', 'Cowpeas'], coverage_pct: 2 },
    ];

    // ─────────────────────────────────────────────────────────────
    // 2. Major Crops Database
    // ─────────────────────────────────────────────────────────────
    const CROPS = {
        maize: {
            name: 'Maize', icon: '🌽', scientific: 'Zea mays',
            is_staple: true, growing_days: 120,
            water_requirement_mm: 400, min_temp: 18, max_temp: 35, optimal_temp: 28,
            plants_per_ha: 44000, seed_rate_kg_ha: 20,
            national_production_t: 3600000, national_area_ha: 2200000,
            avg_yield_kg_ha: 1636,
            major_provinces: ['Lusaka', 'Central', 'Eastern', 'Southern', 'Copperbelt'],
            seasons: { planting: 'Nov-Dec', growing: 'Dec-Mar', harvest: 'Apr-May' },
            soil_preference: ['Luvisols', 'Ferralsols', 'Nitisols', 'Cambisols'],
            ph_min: 5.5, ph_max: 7.0, description: 'Primary staple food crop grown across all 10 provinces',
            market_price_zmw_kg: 5.80, price_source: 'FRA 2024-25',
            fertilizer_n: { basal: '10-20-10', top: '34-0-0', rate_kg_ha: 200 },
            pests: ['Fall armyworm', 'Stem borer', 'Maize streak virus', 'Termites'],
            diseases: ['Gray leaf spot', 'Northern corn leaf blight', 'Maize rust']
        },
        cotton: {
            name: 'Cotton', icon: '🧶', scientific: 'Gossypium hirsutum',
            is_staple: false, growing_days: 150,
            water_requirement_mm: 600, min_temp: 20, max_temp: 38, optimal_temp: 30,
            plants_per_ha: 25000, seed_rate_kg_ha: 8,
            national_production_t: 120000, national_area_ha: 250000,
            avg_yield_kg_ha: 480,
            major_provinces: ['Eastern', 'Central', 'Southern', 'Lusaka'],
            seasons: { planting: 'Nov-Dec', growing: 'Dec-Apr', harvest: 'Apr-Jun' },
            soil_preference: ['Luvisols', 'Ferralsols', 'Cambisols'],
            ph_min: 5.5, ph_max: 7.0, description: 'Major cash crop, mainly smallholder production',
            market_price_zmw_kg: 8.50, price_source: 'Cotton Board 2024-25',
            fertilizer_n: { basal: '10-20-10', top: '26-0-0', rate_kg_ha: 150 },
            pests: ['Cotton bollworm', 'Aphids', 'Whiteflies', 'Red spider mite'],
            diseases: ['Fusarium wilt', 'Bacterial blight', 'Cotton leaf curl']
        },
        tobacco: {
            name: 'Tobacco', icon: '🚬', scientific: 'Nicotiana tabacum',
            is_staple: false, growing_days: 100,
            water_requirement_mm: 500, min_temp: 18, max_temp: 32, optimal_temp: 25,
            plants_per_ha: 15000, seed_rate_kg_ha: 0.3,
            national_production_t: 65000, national_area_ha: 80000,
            avg_yield_kg_ha: 812,
            major_provinces: ['Eastern', 'Central', 'Muchinga'],
            seasons: { planting: 'Oct-Nov', growing: 'Nov-Feb', harvest: 'Feb-Mar' },
            soil_preference: ['Ferralsols', 'Luvisols', 'Nitisols'],
            ph_min: 5.0, ph_max: 6.5, description: 'High-value export crop, mainly grown in Eastern Province',
            market_price_zmw_kg: 25.00, price_source: 'Tobacco Board 2024',
            fertilizer_n: { basal: '6-12-18', top: '15-0-0', rate_kg_ha: 350 },
            pests: ['Aphids', 'Whiteflies', 'Thrips', 'Cutworms'],
            diseases: ['Tobacco mosaic virus', 'Fusarium wilt', 'Black shank', 'Powdery mildew']
        },
        groundnuts: {
            name: 'Groundnuts', icon: '🥜', scientific: 'Arachis hypogaea',
            is_staple: false, growing_days: 130,
            water_requirement_mm: 450, min_temp: 20, max_temp: 35, optimal_temp: 28,
            plants_per_ha: 55000, seed_rate_kg_ha: 80,
            national_production_t: 130000, national_area_ha: 350000,
            avg_yield_kg_ha: 371,
            major_provinces: ['Eastern', 'Northern', 'Muchinga', 'Central'],
            seasons: { planting: 'Nov-Dec', growing: 'Dec-Mar', harvest: 'Mar-Apr' },
            soil_preference: ['Acrisols', 'Planosols', 'Arenosols', 'Luvisols'],
            ph_min: 5.5, ph_max: 7.0, description: 'Important legume for food and cash, nitrogen-fixing',
            market_price_zmw_kg: 9.00, price_source: 'SAS 2024-25',
            fertilizer_n: { basal: '0-20-20', top: 'none', rate_kg_ha: 100 },
            pests: ['Aphids', 'Thrips', 'Leaf miner', 'Termites'],
            diseases: ['Rosette virus', 'Leaf spot', 'Rust', 'Aflatoxin']
        },
        soybeans: {
            name: 'Soybeans', icon: '🫘', scientific: 'Glycine max',
            is_staple: false, growing_days: 110,
            water_requirement_mm: 450, min_temp: 18, max_temp: 34, optimal_temp: 26,
            plants_per_ha: 330000, seed_rate_kg_ha: 60,
            national_production_t: 350000, national_area_ha: 160000,
            avg_yield_kg_ha: 2187,
            major_provinces: ['Central', 'Copperbelt', 'Eastern', 'Lusaka'],
            seasons: { planting: 'Nov-Dec', growing: 'Dec-Mar', harvest: 'Apr' },
            soil_preference: ['Nitisols', 'Ferralsols', 'Luvisols'],
            ph_min: 5.5, ph_max: 7.0, description: 'Growing oilseed crop, soybean meal for livestock',
            market_price_zmw_kg: 6.20, price_source: 'SOYA Board 2024-25',
            fertilizer_n: { basal: '0-20-20', top: 'none', rate_kg_ha: 120 },
            pests: ['Aphids', 'Stink bugs', 'Bean leaf beetle', 'Soybean loopers'],
            diseases: ['Soybean rust', 'Bacterial blight', 'Frogeye leaf spot']
        },
        rice: {
            name: 'Rice', icon: '🍚', scientific: 'Oryza sativa',
            is_staple: false, growing_days: 120,
            water_requirement_mm: 900, min_temp: 20, max_temp: 38, optimal_temp: 30,
            plants_per_ha: 250000, seed_rate_kg_ha: 40,
            national_production_t: 65000, national_area_ha: 50000,
            avg_yield_kg_ha: 1300,
            major_provinces: ['Northern', 'Luapula', 'Muchinga', 'Western', 'Central'],
            seasons: { planting: 'Nov-Dec', growing: 'Dec-Mar', harvest: 'Mar-May' },
            soil_preference: ['Vertisols', 'Gleysols', 'Histosols'],
            ph_min: 4.5, ph_max: 7.0, description: 'Grown in wetlands, dambos and irrigated schemes',
            market_price_zmw_kg: 7.50, price_source: 'Rice Association 2024',
            fertilizer_n: { basal: '10-20-20', top: '46-0-0', rate_kg_ha: 180 },
            pests: ['Stem borer', 'Rice bugs', 'Armyworm', 'Leaf folder'],
            diseases: ['Rice blast', 'Brown spot', 'Bacterial leaf blight', 'Sheath rot']
        },
        cassava: {
            name: 'Cassava', icon: '🌿', scientific: 'Manihot esculenta',
            is_staple: true, growing_days: 270,
            water_requirement_mm: 600, min_temp: 18, max_temp: 38, optimal_temp: 28,
            plants_per_ha: 10000, seed_rate_kg_ha: 0,
            national_production_t: 2900000, national_area_ha: 250000,
            avg_yield_kg_ha: 11600,
            major_provinces: ['Luapula', 'Northern', 'Muchinga', 'Western', 'North-Western'],
            seasons: { planting: 'Oct-Dec', growing: 'Dec-Aug', harvest: 'Aug-Sep' },
            soil_preference: ['Acrisols', 'Regosols', 'Arenosols', 'Planosols'],
            ph_min: 4.5, ph_max: 7.5, description: 'Drought-tolerant root crop, food security staple in north',
            market_price_zmw_kg: 2.50, price_source: 'Fresh Cassava 2024',
            fertilizer_n: { basal: '10-10-10', top: 'none', rate_kg_ha: 100 },
            pests: ['Cassava green mite', 'Mealybug', 'Whitefly', 'Scale insects'],
            diseases: ['Cassava mosaic disease', 'Cassava brown streak', 'Bacterial blight', 'Anthracnose']
        },
        sorghum: {
            name: 'Sorghum', icon: '🌾', scientific: 'Sorghum bicolor',
            is_staple: false, growing_days: 105,
            water_requirement_mm: 350, min_temp: 15, max_temp: 40, optimal_temp: 30,
            plants_per_ha: 60000, seed_rate_kg_ha: 8,
            national_production_t: 30000, national_area_ha: 40000,
            avg_yield_kg_ha: 750,
            major_provinces: ['Southern', 'Western', 'Eastern', 'Central'],
            seasons: { planting: 'Nov-Dec', growing: 'Dec-Feb', harvest: 'Mar-Apr' },
            soil_preference: ['Vertisols', 'Luvisols', 'Leptosols'],
            ph_min: 5.0, ph_max: 7.5, description: 'Drought-tolerant cereal for marginal rainfall areas',
            market_price_zmw_kg: 4.50, price_source: 'Local market 2024',
            fertilizer_n: { basal: '10-20-10', top: '26-0-0', rate_kg_ha: 120 },
            pests: ['Stem borer', 'Aphids', 'Shoot fly', 'Midges'],
            diseases: ['Anthracnose', 'Smut', 'Grain mold', 'Leaf blight']
        },
    };

    // ─────────────────────────────────────────────────────────────
    // 3. Zambia Agricultural Zones
    // ─────────────────────────────────────────────────────────────
    const AGRI_ZONES = [
        { id: 'AZ-001', name: 'Lusaka Plateau', province: 'Lusaka', lat: -15.42, lng: 28.28, area_ha: 360000, primary_crop: 'Maize', description: 'Intensive maize production area surrounding the capital. High input use, access to markets, irrigation potential along Kafue River.' },
        { id: 'AZ-002', name: 'Mumbwa Maize Belt', province: 'Central', lat: -14.98, lng: 27.06, area_ha: 680000, primary_crop: 'Maize', description: 'One of Zambia\'s most productive maize-growing regions. Dark Luvisol soils, reliable rainfall (800-1000mm), strong extension services.' },
        { id: 'AZ-003', name: 'Eastern Province Cotton Belt', province: 'Eastern', lat: -13.55, lng: 32.65, area_ha: 520000, primary_crop: 'Cotton', description: 'Largest cotton-producing region in Zambia. Smallholder outgrower schemes, contract farming with ginneries, good road access to Chipata-Mchinji.' },
        { id: 'AZ-004', name: 'Chipata Mixed Farming', province: 'Eastern', lat: -13.65, lng: 32.65, area_ha: 400000, primary_crop: 'Tobacco', description: 'High-value tobacco and groundnut production. Ferralsol soils, well-distributed rainfall, high population density drives intensive farming.' },
        { id: 'AZ-005', name: 'Copperbelt Agricultural Corridor', province: 'Copperbelt', lat: -12.97, lng: 28.63, area_ha: 550000, primary_crop: 'Soybeans', description: 'Growing soybean production hub. Former mine towns have market demand, emerging commercial farms, good road and rail infrastructure.' },
        { id: 'AZ-006', name: 'Kafue River Valley', province: 'Lusaka/Central', lat: -15.77, lng: 28.18, area_ha: 300000, primary_crop: 'Sugarcane', description: 'Irrigated agriculture along Kafue River. Large-scale sugar estates (Nanga, Nakambala), ideal for rice and horticulture under irrigation.' },
        { id: 'AZ-007', name: 'Barotse Floodplain', province: 'Western', lat: -15.28, lng: 23.17, area_ha: 850000, primary_crop: 'Rice', description: 'Traditional rice-growing area of the Lozi people. Annual Zambezi flooding provides natural irrigation. Vertisol soils, low input system.' },
        { id: 'AZ-008', name: 'Northern Province Cassava Belt', province: 'Northern', lat: -10.22, lng: 31.18, area_ha: 600000, primary_crop: 'Cassava', description: 'Major cassava production in high-rainfall northern Zambia. Acrisol soils, shifting cultivation systems, emerging cassava processing.' },
        { id: 'AZ-009', name: 'Luapula Cassava & Rice', province: 'Luapula', lat: -11.37, lng: 29.55, area_ha: 520000, primary_crop: 'Cassava', description: 'Cassava and wetland rice production. Lake Bangweulu system provides fishing-farming integration. Limited market access.' },
        { id: 'AZ-010', name: 'Muchinga Highlands', province: 'Muchinga', lat: -11.83, lng: 31.45, area_ha: 450000, primary_crop: 'Groundnuts', description: 'Groundnut and maize production on Ferralsol soils. Moderate temperatures, good rainfall, emerging coffee production in higher areas.' },
        { id: 'AZ-011', name: 'Gwembe Valley', province: 'Southern', lat: -16.53, lng: 27.63, area_ha: 280000, primary_crop: 'Sorghum', description: 'Hot, dry valley along Lake Kariba. Drought-tolerant sorghum and millet. Limited rainfall (<600mm), supplementary irrigation from lake.' },
        { id: 'AZ-012', name: 'Mkushi Farm Block', province: 'Central', lat: -13.62, lng: 29.39, area_ha: 350000, primary_crop: 'Soybeans', description: 'Large-scale commercial farming block. Well-developed agricultural infrastructure, irrigation schemes, wheat and soya production.' },
        { id: 'AZ-013', name: 'Serenje Plateau', province: 'Central', lat: -13.25, lng: 30.23, area_ha: 300000, primary_crop: 'Maize', description: 'High-altitude maize production area. Good rainfall (1100mm), cool temperatures reduce pest pressure, emerging potato production.' },
        { id: 'AZ-014', name: 'Kalabo/Lukulu Wetlands', province: 'Western', lat: -14.97, lng: 22.67, area_ha: 720000, primary_crop: 'Rice', description: 'Extensive Zambezi floodplain rice production. Traditional water management systems, sorghum on higher ground, fishing integration.' },
        { id: 'AZ-015', name: 'Nchelenge/Mweru Lakeshore', province: 'Luapula', lat: -9.35, lng: 28.73, area_ha: 180000, primary_crop: 'Cassava', description: 'Lake Mweru fishing-farming communities. Intensive cassava cultivation, vegetables on lakeshore, emerging banana production.' },
        { id: 'AZ-016', name: 'Southern Province Livestock & Crop', province: 'Southern', lat: -17.85, lng: 25.86, area_ha: 650000, primary_crop: 'Maize', description: 'Mixed crop-livestock system around Livingstone/Choma. Maize, sorghum, cotton. Cattle integration provides manure, draft power.' },
        { id: 'AZ-017', name: 'North-Western Maize/Soya', province: 'North-Western', lat: -12.18, lng: 26.40, area_ha: 380000, primary_crop: 'Maize', description: 'Emerging agricultural frontier. Solwezi mining town provides growing market. New commercial farms exploiting Ferralsol soils.' },
        { id: 'AZ-018', name: 'Kabwe Agricultural Hub', province: 'Central', lat: -14.43, lng: 28.45, area_ha: 320000, primary_crop: 'Maize', description: 'Strategic agricultural hub with rail access to Lusaka/Copperbelt. Strong input supply chain, grain aggregation, milling industry.' },
        { id: 'AZ-019', name: 'Petauke/Sinda Smallholder', province: 'Eastern', lat: -14.25, lng: 31.33, area_ha: 420000, primary_crop: 'Cotton', description: 'High-density smallholder cotton and groundnut area. Contract farming with cotton ginneries, food security maize intercropped.' },
        { id: 'AZ-020', name: 'Lake Tanganyika Rice Belt', province: 'Northern', lat: -8.90, lng: 31.10, area_ha: 150000, primary_crop: 'Rice', description: 'Lake Tanganyika shoreline rice production. Mpulungu market access, lakeshore irrigation, emerging banana and coffee in highlands.' },
        { id: 'AZ-021', name: 'Western Sandveld Cassava', province: 'Western', lat: -14.80, lng: 24.80, area_ha: 500000, primary_crop: 'Cassava', description: 'Deep Kalahari sand soils, cassava is the only reliable crop. Millet, groundnuts, and livestock integration. Very low soil fertility.' },
    ];

    // ─────────────────────────────────────────────────────────────
    // 4. Market Price Data (2024-25 season)
    // ─────────────────────────────────────────────────────────────
    const MARKET_PRICES = {
        maize: { current: 5.80, unit: 'ZMW/kg', change: '+0.40', change_pct: '+7.4%', month: 'June', source: 'FRA 2024-25', high_5yr: 8.50, low_5yr: 3.50 },
        cotton: { current: 8.50, unit: 'ZMW/kg', change: '+0.50', change_pct: '+6.3%', month: 'June', source: 'Cotton Board 2024-25', high_5yr: 10.00, low_5yr: 5.00 },
        tobacco: { current: 25.00, unit: 'ZMW/kg', change: '+1.50', change_pct: '+6.4%', month: 'June', source: 'Tobacco Board 2024', high_5yr: 32.00, low_5yr: 18.00 },
        groundnuts: { current: 9.00, unit: 'ZMW/kg', change: '+0.60', change_pct: '+7.1%', month: 'June', source: 'SAS 2024-25', high_5yr: 12.00, low_5yr: 6.00 },
        soybeans: { current: 6.20, unit: 'ZMW/kg', change: '+0.30', change_pct: '+5.1%', month: 'June', source: 'SOYA Board 2024-25', high_5yr: 8.00, low_5yr: 4.50 },
        rice: { current: 7.50, unit: 'ZMW/kg', change: '+0.80', change_pct: '+11.9%', month: 'June', source: 'Rice Association 2024', high_5yr: 10.00, low_5yr: 5.50 },
        cassava: { current: 2.50, unit: 'ZMW/kg', change: '+0.20', change_pct: '+8.7%', month: 'June', source: 'Fresh Cassava 2024', high_5yr: 3.50, low_5yr: 1.80 },
        sorghum: { current: 4.50, unit: 'ZMW/kg', change: '+0.25', change_pct: '+5.9%', month: 'June', source: 'Local market 2024', high_5yr: 6.00, low_5yr: 3.00 },
    };

    // ─────────────────────────────────────────────────────────────
    // 5. Pest & Disease Risk Calculation
    // ─────────────────────────────────────────────────────────────
    const PEST_DISEASE_PROFILES = {
        maize: {
            pests: [
                { name: 'Fall armyworm', risk: 'High', season: 'Dec-Feb', temp_range: '20-35°C', humidity: 'Moderate to high', lat_min: -18, lat_max: -8 },
                { name: 'Stem borer', risk: 'Moderate', season: 'Jan-Mar', temp_range: '22-30°C', humidity: 'Moderate' },
                { name: 'Termites', risk: 'Moderate', season: 'Sep-Nov (dry)', temp_range: '25-40°C', humidity: 'Low' },
            ],
            diseases: [
                { name: 'Gray leaf spot', risk: 'Moderate', season: 'Wet season', conditions: 'High humidity, warm temps' },
                { name: 'Maize streak virus', risk: 'Low-Moderate', season: 'Dec-Feb', conditions: 'Transmitted by leafhoppers, dry conditions' },
            ]
        },
        cotton: {
            pests: [
                { name: 'Cotton bollworm', risk: 'High', season: 'Jan-Mar', temp_range: '20-35°C', humidity: 'Moderate' },
                { name: 'Aphids', risk: 'Moderate', season: 'Dec-Feb', temp_range: '18-30°C', humidity: 'Moderate' },
                { name: 'Red spider mite', risk: 'Moderate', season: 'Dry periods', temp_range: '25-35°C', humidity: 'Low' },
            ],
            diseases: [
                { name: 'Bacterial blight', risk: 'Moderate', season: 'Wet season', conditions: 'Rainfall >800mm, high humidity' },
                { name: 'Fusarium wilt', risk: 'Low-Moderate', season: 'Throughout', conditions: 'Poor drainage, acid soils' },
            ]
        },
        cassava: {
            pests: [
                { name: 'Cassava green mite', risk: 'High', season: 'Dry season', temp_range: '22-35°C', humidity: 'Low' },
                { name: 'Mealybug', risk: 'Moderate', season: 'Dry season', temp_range: '20-35°C', humidity: 'Low-Moderate' },
                { name: 'Whitefly', risk: 'High', season: 'Throughout', temp_range: '18-35°C', humidity: 'Moderate', note: 'Vector for CMD' },
            ],
            diseases: [
                { name: 'Cassava mosaic disease (CMD)', risk: 'Very High', season: 'Throughout', conditions: 'Whitefly vector, infected cuttings', note: 'Major constraint in all growing areas' },
                { name: 'Cassava brown streak disease', risk: 'Moderate', season: 'Throughout', conditions: 'Whitefly vector, spreading from DRC' },
                { name: 'Bacterial blight', risk: 'Moderate', season: 'Wet season', conditions: 'High rainfall, poor sanitation' },
            ]
        },
        groundnuts: {
            pests: [
                { name: 'Aphids', risk: 'Moderate', season: 'Dec-Feb', temp_range: '18-30°C', humidity: 'Moderate', note: 'Vector for rosette virus' },
                { name: 'Termites', risk: 'Moderate', season: 'Dry periods', temp_range: '25-38°C', humidity: 'Low' },
                { name: 'Leaf miner', risk: 'Low-Moderate', season: 'Jan-Mar', temp_range: '20-34°C', humidity: 'Moderate' },
            ],
            diseases: [
                { name: 'Rosette virus', risk: 'High', season: 'Throughout', conditions: 'Aphid vector, widespread in smallholder fields' },
                { name: 'Leaf spot (Cercospora)', risk: 'Moderate', season: 'Wet season', conditions: 'High humidity, prolonged leaf wetness' },
                { name: 'Aflatoxin', risk: 'Moderate-High', season: 'Harvest/Storage', conditions: 'Drought stress during pod fill, poor drying' },
            ]
        },
        rice: {
            pests: [
                { name: 'Stem borer', risk: 'High', season: 'Throughout', temp_range: '20-32°C', humidity: 'High' },
                { name: 'Rice bugs (stink bugs)', risk: 'Moderate', season: 'Heading stage', temp_range: '22-35°C', humidity: 'Moderate' },
                { name: 'Armyworm', risk: 'Moderate', season: 'Vegetative stage', temp_range: '20-30°C', humidity: 'Moderate' },
            ],
            diseases: [
                { name: 'Rice blast', risk: 'High', season: 'Wet season', conditions: 'High humidity >90%, prolonged leaf wetness, high N' },
                { name: 'Brown spot', risk: 'Moderate', season: 'Throughout', conditions: 'Nutrient-deficient soils, water stress' },
                { name: 'Bacterial leaf blight', risk: 'Moderate', season: 'Wet season', conditions: 'High rainfall, flooding, high N fertilizer' },
            ]
        },
    };

    // ─────────────────────────────────────────────────────────────
    // 6. Growing Season Calendar (aligned with Zambia climate)
    // ─────────────────────────────────────────────────────────────
    const GROWING_CALENDAR = [
        { month: 'October', dry_season: true, rainy_season_start: true, avg_rainfall_mm: 25, avg_temp: 27, activities: 'Land preparation, maize planting begins in Eastern Province. Tobacco seedbed preparation.' },
        { month: 'November', dry_season: false, rainy_season_start: true, avg_rainfall_mm: 85, avg_temp: 26, activities: 'Main planting season: maize, cotton, groundnuts, soybeans, rice. Cassava planting continues.' },
        { month: 'December', dry_season: false, rainy_season: true, avg_rainfall_mm: 160, avg_temp: 25, activities: 'Peak planting. First weeding of early-planted crops. Cotton and tobacco transplanting. Top-dressing of maize.' },
        { month: 'January', dry_season: false, rainy_season: true, avg_rainfall_mm: 190, avg_temp: 25, activities: 'Weeding, fertilizer application. Pest and disease monitoring. Rice transplanting continues.' },
        { month: 'February', dry_season: false, rainy_season: true, avg_rainfall_mm: 175, avg_temp: 24, activities: 'Weeding, second top dressing. Tobacco reaping begins. Groundnut pegging period.' },
        { month: 'March', dry_season_end: true, rainy_season: true, avg_rainfall_mm: 130, avg_temp: 24, activities: 'Late weeding. Early maize harvest in Southern Province. Groundnuts nearing maturity.' },
        { month: 'April', dry_season: true, rainy_season: false, avg_rainfall_mm: 55, avg_temp: 23, activities: 'Main maize harvest begins. Tobacco curing, cotton picking, soybean harvest. Groundnut lifting and drying.' },
        { month: 'May', dry_season: true, rainy_season: false, avg_rainfall_mm: 10, avg_temp: 21, activities: 'Peak harvest: maize, soybeans, groundnuts. Tobacco sales. Post-harvest handling, shelling, storage.' },
        { month: 'June', dry_season: true, rainy_season: false, avg_rainfall_mm: 2, avg_temp: 19, activities: 'Late harvest, threshing. Market deliveries. FRA maize purchases begin. Cotton harvest continues.' },
        { month: 'July', dry_season: true, rainy_season: false, avg_rainfall_mm: 0, avg_temp: 19, activities: 'Harvest completion, shelling and drying. Land clearing for next season. Winter ploughing where possible.' },
        { month: 'August', dry_season: true, rainy_season: false, avg_rainfall_mm: 0, avg_temp: 21, activities: 'Land preparation. Market deliveries, crop marketing. Tobacco grading and sales peak.' },
        { month: 'September', dry_season: true, rainy_season: false, avg_rainfall_mm: 5, avg_temp: 25, activities: 'Land clearing, ploughing, harrowing. Basin making (conservation agriculture). Early planting in some areas.' },
    ];

    // ─────────────────────────────────────────────────────────────
    // District soil mapping (simplified - dominant soil per province)
    // ─────────────────────────────────────────────────────────────
    const PROVINCE_SOIL = {
        'Lusaka': 'Luvisols',
        'Copperbelt': 'Nitisols',
        'Eastern': 'Ferralsols',
        'Central': 'Ferralsols',
        'Southern': 'Luvisols',
        'Western': 'Regosols',
        'Northern': 'Acrisols',
        'Luapula': 'Acrisols',
        'Muchinga': 'Ferralsols',
        'North-Western': 'Cambisols'
    };

    // ─────────────────────────────────────────────────────────────
    // Helper: get soil for a district
    // ─────────────────────────────────────────────────────────────
    function getSoilForDistrict(district) {
        const prov = district.province;
        const soilName = PROVINCE_SOIL[prov] || 'Cambisols';
        return SOIL_TYPES.find(s => s.name === soilName) || SOIL_TYPES[3];
    }

    // ─────────────────────────────────────────────────────────────
    // Helper: get climate data for a province
    // ─────────────────────────────────────────────────────────────
    function getProvinceClimate(province) {
        if (typeof CLIMATE_CURRENT === 'undefined') {
            return { temp: 25, rainfall: 800, humidity: 55 };
        }
        const t = CLIMATE_CURRENT.temperature?.province?.[province];
        const r = CLIMATE_CURRENT.rainfall?.province?.[province];
        const h = CLIMATE_CURRENT.humidity?.province?.[province];
        return {
            temp: t?.annual_mean || 27,
            rainfall: r?.annual || 800,
            humidity: h?.annual || 55
        };
    }

    // ─────────────────────────────────────────────────────────────
    // FEATURE 1: Agro-Climatic Suitability Engine
    // ─────────────────────────────────────────────────────────────
    function calculateCropSuitability(cropKey, district) {
        const crop = CROPS[cropKey];
        if (!crop || !district) return null;

        const climate = getProvinceClimate(district.province);
        const soil = getSoilForDistrict(district);
        const elev = 900 + (district.lat + 18) * 30; // approx elevation

        // Temperature suitability (0-100)
        const tempScore = Math.max(0, Math.min(100,
            100 * (1 - Math.abs(climate.temp - crop.optimal_temp) / 15)
        ));

        // Rainfall suitability (0-100)
        const rainOptimal = crop.water_requirement_mm;
        const rainScore = Math.max(0, Math.min(100,
            100 * (1 - Math.abs(climate.rainfall - rainOptimal) / 400)
        ));

        // Soil suitability (0-100)
        const soilMatch = crop.soil_preference.includes(soil.name);
        const phScore = (district.area_km2 % 100) / 100 * 100; // simulated
        const soilScore = soilMatch ? (70 + phScore * 0.3) : (30 + phScore * 0.3);

        // Elevation suitability
        const elevScore = Math.max(0, Math.min(100,
            cropKey === 'cassava' ? 90 : 100 * (1 - Math.abs(elev - 1100) / 800)
        ));

        // Province match
        const provMatch = crop.major_provinces.includes(district.province);
        const provScore = provMatch ? 85 : 40;

        // Weighted composite score
        const score = (
            tempScore * 0.20 +
            rainScore * 0.25 +
            soilScore * 0.15 +
            elevScore * 0.10 +
            provScore * 0.30
        );

        const result = {
            crop: cropKey,
            crop_name: crop.name,
            crop_icon: crop.icon,
            district: district.district,
            province: district.province,
            score: Math.min(100, Math.round(score)),
            temp_score: Math.round(tempScore),
            rain_score: Math.round(rainScore),
            soil_score: Math.round(soilScore),
            elev_score: Math.round(elevScore),
            province_score: Math.round(provScore),
            climate_data: climate,
            soil_type: soil.name,
            suitability_class: score >= 75 ? 'Highly Suitable' : score >= 55 ? 'Suitable' : score >= 35 ? 'Marginally Suitable' : 'Unsuitable'
        };

        return result;
    }

    function calculateAllCropSuitability(district) {
        const result = {};
        Object.keys(CROPS).forEach(key => {
            result[key] = calculateCropSuitability(key, district);
        });
        return Object.values(result)
            .filter(r => r !== null)
            .sort((a, b) => b.score - a.score);
    }

    function calculateCropSuitabilityForProvince(cropKey, province) {
        const dists = typeof ZAMBIA_DISTRICTS !== 'undefined'
            ? ZAMBIA_DISTRICTS.filter(d => d.province === province)
            : [];
        if (!dists.length) return null;
        const results = dists.map(d => calculateCropSuitability(cropKey, d)).filter(r => r !== null);
        const avgScore = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
        return {
            crop: cropKey,
            crop_name: CROPS[cropKey]?.name || cropKey,
            province,
            district_count: results.length,
            avg_score: avgScore,
            best_district: results.reduce((best, r) => r.score > best.score ? r : best, { score: -1 }),
            scores: results,
            avg_temp_score: Math.round(results.reduce((s, r) => s + r.temp_score, 0) / results.length),
            avg_rain_score: Math.round(results.reduce((s, r) => s + r.rain_score, 0) / results.length),
        };
    }

    // ─────────────────────────────────────────────────────────────
    // FEATURE 2: Crop Yield Prediction
    // ─────────────────────────────────────────────────────────────
    function predictYield(cropKey, district, season_year = 2025) {
        const suitability = calculateCropSuitability(cropKey, district);
        if (!suitability) return null;

        const crop = CROPS[cropKey];
        const baseYield = crop.avg_yield_kg_ha;
        const suitFactor = suitability.score / 100;

        // Seasonal adjustment based on month
        const month = new Date().getMonth() + 1;
        const seasonFactor = (month >= 11 || month <= 4) ? 1.1 : 0.85;

        // Technology trend
        const techFactor = 1.0 + (season_year - 2022) * 0.015;

        // Soil adjustment
        const soil = getSoilForDistrict(district);
        const soilBase = soil.fertility === 'High' ? 1.2 : soil.fertility === 'Moderate' ? 1.0 : 0.8;

        // Predicted yield
        const predicted = Math.round(baseYield * suitFactor * seasonFactor * techFactor * soilBase);

        const confidence = suitFactor >= 0.7 ? 'High' : suitFactor >= 0.5 ? 'Medium' : 'Low';
        return {
            crop: cropKey,
            crop_name: crop.name,
            district: district.district,
            province: district.province,
            base_yield_kg_ha: baseYield,
            predicted_yield_kg_ha: predicted,
            predicted_t_ha: (predicted / 1000).toFixed(2),
            suit_score: suitability.score,
            confidence,
            year: season_year,
            factors: {
                suitability_weight: suitFactor,
                season_weight: seasonFactor,
                tech_trend: techFactor,
                soil_quality: soilBase
            }
        };
    }

    // ─────────────────────────────────────────────────────────────
    // FEATURE 3: Fertilizer Recommendation
    // ─────────────────────────────────────────────────────────────
    function getFertilizerRecommendation(cropKey, district) {
        const crop = CROPS[cropKey];
        if (!crop) return null;
        const soil = getSoilForDistrict(district);
        const suitability = calculateCropSuitability(cropKey, district);
        const baseRate = crop.fertilizer_n.rate_kg_ha;

        // Adjust rate based on soil fertility
        let adjRate = baseRate;
        if (soil.fertility === 'Very low') adjRate = Math.round(baseRate * 1.3);
        else if (soil.fertility === 'Low') adjRate = Math.round(baseRate * 1.15);
        else if (soil.fertility === 'Moderate') adjRate = baseRate;
        else if (soil.fertility === 'High') adjRate = Math.round(baseRate * 0.85);

        return {
            crop: cropKey,
            crop_name: crop.name,
            district: district.district,
            province: district.province,
            soil_type: soil.name,
            soil_fertility: soil.fertility,
            basal_formula: crop.fertilizer_n.basal,
            top_dressing: crop.fertilizer_n.top,
            recommended_rate_kg_ha: adjRate,
            base_rate_kg_ha: baseRate,
            recommendation_text: `Apply ${adjRate} kg/ha of ${crop.fertilizer_n.basal} as basal dressing at planting, followed by ${crop.fertilizer_n.top === 'none' ? 'no top dressing needed (legume crop)' : crop.fertilizer_n.top + ' as top dressing 4-6 weeks after planting.'}`,
            cost_estimate_zmw: Math.round(adjRate * 3.50),
            notes: soil.fertility === 'Very low' ? 'Consider organic matter incorporation before planting. Manure at 5 t/ha recommended.' : ''
        };
    }

    // ─────────────────────────────────────────────────────────────
    // FEATURE 4: Growing Season Calendar
    // ─────────────────────────────────────────────────────────────
    function getCropGrowingSeason(cropKey) {
        const crop = CROPS[cropKey];
        if (!crop) return null;
        const season = crop.seasons;
        return {
            crop: cropKey,
            crop_name: crop.name,
            planting_window: season.planting,
            growing_period: season.growing,
            harvest_window: season.harvest,
            growing_days: crop.growing_days,
            description: `${crop.name}: Plant during ${season.planting}. Harvest from ${season.harvest} (∼${crop.growing_days} days).`
        };
    }

    // ─────────────────────────────────────────────────────────────
    // FEATURE 5: Zambia Farming Areas Overlay
    // ─────────────────────────────────────────────────────────────
    function getAgriZones() {
        return AGRI_ZONES;
    }

    function getAgriZonesByProvince(province) {
        return AGRI_ZONES.filter(z => z.province.includes(province));
    }

    function getAgriZonesByCrop(cropKey) {
        const crop = CROPS[cropKey];
        if (!crop) return [];
        return AGRI_ZONES.filter(z =>
            z.primary_crop.toLowerCase() === crop.name.toLowerCase() ||
            z.primary_crop.toLowerCase().includes(crop.name.toLowerCase())
        );
    }

    // ─────────────────────────────────────────────────────────────
    // FEATURE 6: Agricultural Statistics Dashboard
    // ─────────────────────────────────────────────────────────────
    function getCropStats() {
        const stats = {};
        Object.entries(CROPS).forEach(([key, crop]) => {
            stats[key] = {
                name: crop.name,
                icon: crop.icon,
                production_t: crop.national_production_t,
                area_ha: crop.national_area_ha,
                yield_kg_ha: crop.avg_yield_kg_ha,
                price_zmw_kg: crop.market_price_zmw_kg,
                major_provinces: crop.major_provinces,
                is_staple: crop.is_staple,
                growing_days: crop.growing_days,
                water_requirement: crop.water_requirement_mm,
            };
        });
        return stats;
    }

    function getProvinceCropStats(province) {
        const dists = typeof ZAMBIA_DISTRICTS !== 'undefined'
            ? ZAMBIA_DISTRICTS.filter(d => d.province === province)
            : [];
        const totalArea = dists.reduce((s, d) => s + d.area_km2, 0);
        const totalPop = dists.reduce((s, d) => s + d.pop, 0);
        const climate = getProvinceClimate(province);
        const soil = SOIL_TYPES.find(s => s.name === PROVINCE_SOIL[province]);

        return {
            province,
            districts: dists.length,
            total_area_km2: totalArea,
            arable_est_km2: Math.round(totalArea * 0.35),
            population: totalPop,
            climate,
            soil_type: soil?.name || 'Unknown',
            soil_fertility: soil?.fertility || 'Unknown',
            top_crops: Object.entries(CROPS)
                .filter(([, c]) => c.major_provinces.includes(province))
                .map(([k, c]) => ({ key: k, name: c.name, icon: c.icon })),
            avg_suitability: {}
        };
    }

    // ─────────────────────────────────────────────────────────────
    // FEATURE 7: Market Price Index
    // ─────────────────────────────────────────────────────────────
    function getMarketPrices() {
        return MARKET_PRICES;
    }

    function getMarketPriceForCrop(cropKey) {
        return MARKET_PRICES[cropKey] || null;
    }

    // ─────────────────────────────────────────────────────────────
    // FEATURE 8: Irrigation Potential
    // ─────────────────────────────────────────────────────────────
    function getIrrigationPotential(district) {
        const prov = district.province;
        const climate = getProvinceClimate(prov);
        const soil = getSoilForDistrict(district);
        const nearWater = typeof WATER_BODIES !== 'undefined'
            ? WATER_BODIES.some(w => Math.sqrt((district.lat - w.lat) ** 2 + (district.lng - w.lng) ** 2) < 2.5)
            : false;

        // Groundwater potential (simplified)
        let gwScore = 50;
        if (soil.drainage === 'Poor' || soil.drainage === 'Moderate') gwScore += 20;
        if (soil.texture.includes('Clay') || soil.texture.includes('Loam')) gwScore += 10;
        if (climate.rainfall > 800) gwScore += 15;

        // Surface water potential
        let swScore = 50;
        if (nearWater) swScore += 30;
        if (climate.rainfall > 900) swScore += 15;

        const totalScore = Math.round((gwScore * 0.4 + swScore * 0.6));
        return {
            district: district.district,
            province: prov,
            groundwater_potential: gwScore >= 70 ? 'High' : gwScore >= 45 ? 'Moderate' : 'Low',
            surface_water_potential: swScore >= 70 ? 'High' : swScore >= 45 ? 'Moderate' : 'Low',
            overall_potential: totalScore >= 70 ? 'High' : totalScore >= 45 ? 'Moderate' : 'Low',
            score: totalScore,
            near_water_body: nearWater,
            soil_drainage: soil.drainage,
            annual_rainfall_mm: climate.rainfall,
            recommendation: totalScore >= 70 ? 'Strong potential for irrigation development' : totalScore >= 45 ? 'Moderate potential, consider supplementary irrigation' : 'Limited potential, requires significant investment'
        };
    }

    // ─────────────────────────────────────────────────────────────
    // FEATURE 9: Pest & Disease Risk Alert
    // ─────────────────────────────────────────────────────────────
    function getPestDiseaseRisk(cropKey, district) {
        const profile = PEST_DISEASE_PROFILES[cropKey];
        const crop = CROPS[cropKey];
        if (!profile || !crop) return null;

        const climate = getProvinceClimate(district.province);
        const month = new Date().getMonth();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentMonth = monthNames[month];

        const activePests = profile.pests.filter(p => {
            const season = p.season || '';
            const monthNum = month + 1;
            if (season.includes('Dec-Feb') && monthNum >= 12 && monthNum <= 2) return true;
            if (season.includes('Jan-Mar') && monthNum >= 1 && monthNum <= 3) return true;
            if (season.includes('Sep-Nov') && monthNum >= 9 && monthNum <= 11) return true;
            if (season.includes('Throughout') || season.includes('Dry season')) return monthNum >= 4 && monthNum <= 10;
            if (season.includes('Wet season')) return monthNum >= 11 || monthNum <= 4;
            return false;
        });

        const activeDiseases = profile.diseases.filter(d => {
            const season = d.season || '';
            const monthNum = month + 1;
            if (season.includes('Throughout')) return true;
            if (season.includes('Wet season')) return monthNum >= 11 || monthNum <= 4;
            if (season.includes('Harvest') || season.includes('Storage')) return monthNum >= 4 && monthNum <= 8;
            return false;
        });

        const overallRisk = activePests.some(p => p.risk === 'Very High' || p.risk === 'High') ? 'High' :
            activePests.some(p => p.risk === 'Moderate') || activeDiseases.some(d => d.risk === 'Very High' || d.risk === 'High') ? 'Moderate' : 'Low';

        return {
            crop: cropKey,
            crop_name: crop.name,
            district: district.district,
            province: district.province,
            current_month: currentMonth,
            overall_risk: overallRisk,
            active_pests: activePests,
            active_diseases: activeDiseases,
            temperature: climate.temp,
            humidity: climate.humidity,
            recommendation: overallRisk === 'High' ? 'Take immediate action: scout fields, consider preventive spraying.' :
                overallRisk === 'Moderate' ? 'Monitor fields regularly. Prepare control measures.' :
                'Low risk currently. Conduct routine field scouting.',
        };
    }

    // ─────────────────────────────────────────────────────────────
    // FEATURE 10: Soil Type Database
    // ─────────────────────────────────────────────────────────────
    function getSoilTypes() {
        return SOIL_TYPES;
    }

    function getSoilByName(name) {
        return SOIL_TYPES.find(s => s.name.toLowerCase() === name.toLowerCase()) || null;
    }

    function getSoilByProvince(province) {
        const soilName = PROVINCE_SOIL[province];
        if (!soilName) return null;
        return getSoilByName(soilName);
    }

    // ─────────────────────────────────────────────────────────────
    // RENDER HELPERS
    // ─────────────────────────────────────────────────────────────
    function renderSuitabilityTable(results) {
        if (!results || !results.length) return '<div style="padding:14px;color:var(--muted);font-size:.74rem;">No suitability data available</div>';
        let html = '<table style="width:100%;border-collapse:collapse;font-size:.72rem;">';
        html += '<thead><tr style="border-bottom:2px solid var(--g5);">';
        html += '<th style="padding:5px 7px;text-align:left;font-weight:800;color:var(--g5);">Crop</th>';
        html += '<th style="padding:5px 7px;text-align:center;font-weight:800;color:var(--g5);">Score</th>';
        html += '<th style="padding:5px 7px;text-align:center;font-weight:800;color:var(--g5);">Temp</th>';
        html += '<th style="padding:5px 7px;text-align:center;font-weight:800;color:var(--g5);">Rain</th>';
        html += '<th style="padding:5px 7px;text-align:center;font-weight:800;color:var(--g5);">Soil</th>';
        html += '<th style="padding:5px 7px;text-align:right;font-weight:800;color:var(--g5);">Class</th>';
        html += '</tr></thead><tbody>';
        results.forEach(r => {
            const col = r.score >= 75 ? '#4ade80' : r.score >= 55 ? '#fbbf24' : r.score >= 35 ? '#fb923c' : '#f87171';
            html += `<tr style="border-bottom:1px solid rgba(255,255,255,.05);">`;
            html += `<td style="padding:5px 7px;font-weight:700;color:#fff;">${r.crop_icon} ${r.crop_name}</td>`;
            html += `<td style="padding:5px 7px;text-align:center;font-weight:800;color:${col};">${r.score}%</td>`;
            html += `<td style="padding:5px 7px;text-align:center;">${r.temp_score}%</td>`;
            html += `<td style="padding:5px 7px;text-align:center;">${r.rain_score}%</td>`;
            html += `<td style="padding:5px 7px;text-align:center;">${r.soil_score}%</td>`;
            html += `<td style="padding:5px 7px;text-align:right;"><span style="font-size:.6rem;font-weight:700;padding:2px 6px;border-radius:10px;background:${col}22;color:${col};">${r.suitability_class.split(' ')[0]}</span></td>`;
            html += `</tr>`;
        });
        html += '</tbody></table>';
        return html;
    }

    function renderYieldPrediction(prediction) {
        if (!prediction) return '<div style="padding:14px;color:var(--muted);">No prediction available</div>';
        const confColor = prediction.confidence === 'High' ? '#4ade80' : prediction.confidence === 'Medium' ? '#fbbf24' : '#f87171';
        return `
            <div style="padding:10px 14px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                    <span style="font-size:1.5rem;">${CROPS[prediction.crop]?.icon || '🌽'}</span>
                    <div>
                        <div style="font-size:.85rem;font-weight:800;color:#fff;">${prediction.crop_name} Yield Prediction</div>
                        <div style="font-size:.65rem;color:var(--muted);">${prediction.district}, ${prediction.province} · ${prediction.year} season</div>
                    </div>
                </div>
                <div style="background:rgba(76,175,80,.06);border:1px solid rgba(76,175,80,.15);border-radius:8px;padding:10px 12px;margin-bottom:8px;">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                        <div><div style="font-size:.62rem;color:var(--muted);">Predicted Yield</div><div style="font-size:1.2rem;font-weight:900;color:#fff;">${prediction.predicted_yield_kg_ha.toLocaleString()}<span style="font-size:.7rem;color:var(--muted);font-weight:400;"> kg/ha</span></div></div>
                        <div><div style="font-size:.62rem;color:var(--muted);">Base Yield</div><div style="font-size:.9rem;font-weight:700;color:rgba(255,255,255,.7);">${prediction.base_yield_kg_ha.toLocaleString()} kg/ha</div></div>
                        <div><div style="font-size:.62rem;color:var(--muted);">Tons per ha</div><div style="font-size:.9rem;font-weight:700;color:var(--g5);">${prediction.predicted_t_ha} t/ha</div></div>
                        <div><div style="font-size:.62rem;color:var(--muted);">Confidence</div><div style="font-size:.9rem;font-weight:700;color:${confColor};">${prediction.confidence}</div></div>
                    </div>
                </div>
                <div style="font-size:.62rem;color:var(--muted);text-align:center;">Based on agro-climatic model. Actual yields vary with management.</div>
            </div>`;
    }

    function renderFertilizerRecommendation(rec) {
        if (!rec) return '<div style="padding:14px;color:var(--muted);">No recommendation available</div>';
        return `
            <div style="padding:10px 14px;">
                <div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:6px;">${CROPS[rec.crop]?.icon || ''} ${rec.crop_name} — Fertilizer Recommendation</div>
                <div style="background:rgba(76,175,80,.06);border:1px solid rgba(76,175,80,.15);border-radius:8px;padding:10px 12px;">
                    <div class="qp-stat"><span class="qp-k">Soil Type</span><span class="qp-v">${rec.soil_type}</span></div>
                    <div class="qp-stat"><span class="qp-k">Soil Fertility</span><span class="qp-v" style="color:${rec.soil_fertility === 'High' ? '#4ade80' : rec.soil_fertility === 'Moderate' ? '#fbbf24' : '#f87171'};">${rec.soil_fertility}</span></div>
                    <div class="qp-stat"><span class="qp-k">Basal Fertilizer</span><span class="qp-v" style="color:var(--g5);">${rec.basal_formula}</span></div>
                    <div class="qp-stat"><span class="qp-k">Top Dressing</span><span class="qp-v">${rec.top_dressing === 'none' ? 'Not required' : rec.top_dressing}</span></div>
                    <div class="qp-stat"><span class="qp-k">Recommended Rate</span><span class="qp-v" style="color:#fff;font-weight:700;">${rec.recommended_rate_kg_ha} kg/ha</span></div>
                    <div class="qp-stat"><span class="qp-k">Est. Cost (ZMW)</span><span class="qp-v">ZMW ${rec.cost_estimate_zmw.toLocaleString()}/ha</span></div>
                </div>
                <div style="margin-top:6px;padding:7px 10px;background:rgba(16,185,129,.06);border:1px solid rgba(16,185,129,.15);border-radius:7px;font-size:.68rem;color:rgba(255,255,255,.75);line-height:1.5;">
                    ${rec.recommendation_text}
                    ${rec.notes ? '<br><br><strong style="color:var(--g5);">💡 Tip:</strong> ' + rec.notes : ''}
                </div>
            </div>`;
    }

    function renderGrowingSeason(cropKey) {
        const season = getCropGrowingSeason(cropKey);
        if (!season) return '';
        return `
            <div style="padding:8px 0;display:flex;align-items:center;gap:8px;border-bottom:1px solid rgba(255,255,255,.04);">
                <span style="font-size:1.1rem;">${CROPS[cropKey]?.icon || ''}</span>
                <div style="flex:1;">
                    <div style="font-size:.75rem;font-weight:700;color:#fff;">${season.crop_name}</div>
                    <div style="font-size:.65rem;color:var(--muted);">Plant: ${season.planting_window} · Harvest: ${season.harvest_window}</div>
                </div>
                <span style="font-size:.65rem;font-weight:700;color:var(--g5);">${season.growing_days}d</span>
            </div>`;
    }

    function renderMarketPrices() {
        let html = '<div style="padding:8px 12px;">';
        html += '<div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:6px;">📈 Farm-Gate Prices — Zambia 2024-25</div>';
        Object.entries(MARKET_PRICES).forEach(([key, p]) => {
            const icon = CROPS[key]?.icon || '';
            const isUp = p.change_pct.startsWith('+');
            html += `<div style="display:flex;align-items:center;gap:7px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04);">
                <span style="font-size:.9rem;width:20px;">${icon}</span>
                <div style="flex:1;">
                    <div style="font-size:.72rem;font-weight:700;color:#fff;">${CROPS[key]?.name || key}</div>
                    <div style="font-size:.6rem;color:var(--muted);">${p.source} · ${p.month}</div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:.82rem;font-weight:900;color:#fff;">ZMW ${p.current.toFixed(2)}</div>
                    <div style="font-size:.62rem;font-weight:700;color:${isUp ? '#4ade80' : '#f87171'};">${p.change} ${isUp ? '↑' : '↓'}</div>
                </div>
            </div>`;
        });
        html += `<div style="margin-top:6px;font-size:.6rem;color:var(--muted);text-align:center;">Sources: FRA, Cotton Board, SAS, local markets</div>`;
        html += '</div>';
        return html;
    }

    function renderIrrigationPotential(district) {
        const pot = getIrrigationPotential(district);
        if (!pot) return '';
        const col = pot.overall_potential === 'High' ? '#4ade80' : pot.overall_potential === 'Moderate' ? '#fbbf24' : '#f87171';
        return `
            <div style="padding:10px 14px;">
                <div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:8px;">💧 Irrigation Potential — ${district.district}</div>
                <div style="background:rgba(16,185,129,.06);border:1px solid rgba(16,185,129,.15);border-radius:8px;padding:10px 12px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <span style="font-size:.68rem;color:var(--muted);">Overall Potential</span>
                        <span style="font-size:.9rem;font-weight:800;color:${col};">${pot.overall_potential}</span>
                    </div>
                    <div style="background:rgba(255,255,255,.08);border-radius:4px;height:8px;overflow:hidden;margin-bottom:8px;">
                        <div style="width:${pot.score}%;height:100%;background:linear-gradient(90deg,#f97316,${col});border-radius:4px;"></div>
                    </div>
                    <div class="qp-stat"><span class="qp-k">Groundwater</span><span class="qp-v">${pot.groundwater_potential}</span></div>
                    <div class="qp-stat"><span class="qp-k">Surface Water</span><span class="qp-v">${pot.surface_water_potential}</span></div>
                    <div class="qp-stat"><span class="qp-k">Soil Drainage</span><span class="qp-v">${pot.soil_drainage}</span></div>
                    <div class="qp-stat"><span class="qp-k">Annual Rainfall</span><span class="qp-v">${pot.annual_rainfall_mm} mm</span></div>
                    <div class="qp-stat"><span class="qp-k">Near Water Body</span><span class="qp-v" style="color:${pot.near_water_body ? '#4ade80' : '#f87171'};">${pot.near_water_body ? 'Yes' : 'No'}</span></div>
                </div>
                <div style="margin-top:6px;font-size:.65rem;color:var(--g5);font-weight:700;">💡 ${pot.recommendation}</div>
            </div>`;
    }

    function renderPestAlert(alert) {
        if (!alert) return '';
        const riskColor = alert.overall_risk === 'High' ? '#f87171' : alert.overall_risk === 'Moderate' ? '#fbbf24' : '#4ade80';
        let html = `<div style="padding:10px 14px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <span style="font-size:1rem;">🐛</span>
                <div>
                    <div style="font-size:.78rem;font-weight:800;color:#fff;">${alert.crop_name} — Pest & Disease Alert</div>
                    <div style="font-size:.62rem;color:var(--muted);">${alert.district}, ${alert.province} · ${alert.current_month}</div>
                </div>
                <span style="margin-left:auto;font-size:.6rem;font-weight:800;padding:2px 8px;border-radius:10px;background:${riskColor}22;color:${riskColor};">${alert.overall_risk} RISK</span>
            </div>
            <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:8px 10px;">`;
        if (alert.active_pests.length) {
            html += '<div style="font-size:.62rem;font-weight:700;color:#f97316;margin-bottom:4px;">🦗 Active Pests</div>';
            alert.active_pests.forEach(p => {
                html += `<div class="qp-stat"><span class="qp-k" style="font-size:.65rem;">${p.name}</span><span class="qp-v" style="font-size:.65rem;color:${p.risk === 'High' || p.risk === 'Very High' ? '#f87171' : '#fbbf24'};">${p.risk} Risk</span></div>`;
            });
        }
        if (alert.active_diseases.length) {
            html += '<div style="font-size:.62rem;font-weight:700;color:#34d399;margin-top:4px;">🦠 Active Diseases</div>';
            alert.active_diseases.forEach(d => {
                html += `<div class="qp-stat"><span class="qp-k" style="font-size:.65rem;">${d.name}</span><span class="qp-v" style="font-size:.65rem;color:${d.risk === 'Very High' || d.risk === 'High' ? '#f87171' : '#fbbf24'};">${d.risk} Risk</span></div>`;
            });
        }
        html += `</div>
            <div style="margin-top:6px;font-size:.65rem;font-weight:700;color:${riskColor};">💡 ${alert.recommendation}</div>
        </div>`;
        return html;
    }

    function renderSoilDatabase() {
        let html = '<div style="padding:8px 10px;">';
        html += '<div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:6px;">🌱 Zambia Soil Types</div>';
        SOIL_TYPES.forEach(s => {
            html += `<div style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;" onclick="GeoHubAgriculture.showSoilDetail('${s.id}')">
                <div style="display:flex;align-items:center;gap:6px;">
                    <span style="width:8px;height:8px;border-radius:50%;background:${s.fertility === 'High' ? '#4ade80' : s.fertility === 'Moderate' ? '#fbbf24' : '#f87171'};flex-shrink:0;"></span>
                    <div style="flex:1;">
                        <div style="font-size:.72rem;font-weight:700;color:#fff;">${s.name}</div>
                        <div style="font-size:.6rem;color:var(--muted);">${s.zambian_distribution}</div>
                    </div>
                    <span style="font-size:.6rem;font-weight:700;padding:1px 5px;border-radius:4px;background:rgba(76,175,80,.1);color:var(--g5);">${s.coverage_pct}%</span>
                </div>
            </div>`;
        });
        html += '</div>';
        return html;
    }

    function showSoilDetail(soilId) {
        const soil = SOIL_TYPES.find(s => s.id === soilId);
        if (!soil) return;
        const content = `
            <div style="padding:14px;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                    <span style="font-size:1.5rem;">🌱</span>
                    <div>
                        <div style="font-size:.82rem;font-weight:800;color:#fff;">${soil.name}</div>
                        <div style="font-size:.62rem;color:var(--muted);">${soil.id} · ${soil.coverage_pct}% of Zambia</div>
                    </div>
                </div>
                <div style="background:rgba(76,175,80,.06);border:1px solid rgba(76,175,80,.15);border-radius:8px;padding:10px;">
                    <div class="qp-stat"><span class="qp-k">Distribution</span><span class="qp-v">${soil.zambian_distribution}</span></div>
                    <div class="qp-stat"><span class="qp-k">Texture</span><span class="qp-v">${soil.texture}</span></div>
                    <div class="qp-stat"><span class="qp-k">Drainage</span><span class="qp-v">${soil.drainage}</span></div>
                    <div class="qp-stat"><span class="qp-k">pH Range</span><span class="qp-v">${soil.ph_range}</span></div>
                    <div class="qp-stat"><span class="qp-k">Fertility</span><span class="qp-v" style="color:${soil.fertility === 'High' ? '#4ade80' : soil.fertility === 'Moderate' ? '#fbbf24' : '#f87171'};">${soil.fertility}</span></div>
                    <div class="qp-stat"><span class="qp-k">Organic Matter</span><span class="qp-v">${soil.organic_matter}</span></div>
                    <div class="qp-stat"><span class="qp-k">Suitable Crops</span><span class="qp-v" style="font-size:.62rem;">${soil.crops_suitable.join(', ')}</span></div>
                </div>
                <div style="margin-top:8px;font-size:.65rem;color:var(--muted);">${soil.characteristics}</div>
            </div>`;
        if (GeoHubFeatures && GeoHubFeatures.createFloatingPanel) {
            GeoHubFeatures.createFloatingPanel('soilDetail', soil.name, 'fas fa-seedling', content, { position: 'top:calc(var(--nb,62px)+10px);right:12px;', width: '340px' });
        }
    }

    // ─────────────────────────────────────────────────────────────
    // UI: Agriculture Hub Panel
    // ─────────────────────────────────────────────────────────────
    function openAgricultureHub() {
        const content = `
            <div style="padding:8px 10px;">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:8px;">
                    <div style="background:rgba(76,175,80,.06);border:1px solid rgba(76,175,80,.15);border-radius:8px;padding:8px;text-align:center;">
                        <div style="font-size:1.3rem;">🌽</div>
                        <div style="font-size:.65rem;font-weight:800;color:var(--g5);">${Object.keys(CROPS).length} Crops</div>
                        <div style="font-size:.58rem;color:var(--muted);">Analysed</div>
                    </div>
                    <div style="background:rgba(16,185,129,.06);border:1px solid rgba(16,185,129,.15);border-radius:8px;padding:8px;text-align:center;">
                        <div style="font-size:1.3rem;">🌱</div>
                        <div style="font-size:.65rem;font-weight:800;color:#06b6d4;">${SOIL_TYPES.length} Soils</div>
                        <div style="font-size:.58rem;color:var(--muted);">Types mapped</div>
                    </div>
                    <div style="background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.15);border-radius:8px;padding:8px;text-align:center;">
                        <div style="font-size:1.3rem;">🗺️</div>
                        <div style="font-size:.65rem;font-weight:800;color:#fbbf24;">${AGRI_ZONES.length} Zones</div>
                        <div style="font-size:.58rem;color:var(--muted);">Farming areas</div>
                    </div>
                    <div style="background:rgba(249,115,22,.06);border:1px solid rgba(249,115,22,.15);border-radius:8px;padding:8px;text-align:center;">
                        <div style="font-size:1.3rem;">📈</div>
                        <div style="font-size:.65rem;font-weight:800;color:#fb923c;">${Object.keys(MARKET_PRICES).length} Prices</div>
                        <div style="font-size:.58rem;color:var(--muted);">Market index</div>
                    </div>
                </div>
                <div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:5px;">🔧 Agriculture Tools</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
                    <button onclick="GeoHubAgriculture.openSuitabilityExplorer()" style="padding:7px;background:rgba(76,175,80,.08);border:1px solid rgba(76,175,80,.2);border-radius:7px;color:#fff;font-size:.68rem;font-weight:700;cursor:pointer;font-family:Inter;"><i class="fas fa-check-circle"></i> Suitability</button>
                    <button onclick="GeoHubAgriculture.openYieldPredictor()" style="padding:7px;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);border-radius:7px;color:#fff;font-size:.68rem;font-weight:700;cursor:pointer;font-family:Inter;"><i class="fas fa-chart-line"></i> Yield</button>
                    <button onclick="GeoHubAgriculture.openFertilizerAdvisor()" style="padding:7px;background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.2);border-radius:7px;color:#fff;font-size:.68rem;font-weight:700;cursor:pointer;font-family:Inter;"><i class="fas fa-flask"></i> Fertilizer</button>
                    <button onclick="GeoHubAgriculture.openGrowingCalendar()" style="padding:7px;background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.2);border-radius:7px;color:#fff;font-size:.68rem;font-weight:700;cursor:pointer;font-family:Inter;"><i class="fas fa-calendar-alt"></i> Calendar</button>
                    <button onclick="GeoHubAgriculture.openFarmingZones()" style="padding:7px;background:rgba(249,115,22,.08);border:1px solid rgba(249,115,22,.2);border-radius:7px;color:#fff;font-size:.68rem;font-weight:700;cursor:pointer;font-family:Inter;"><i class="fas fa-map"></i> Zones</button>
                    <button onclick="GeoHubAgriculture.openMarketPrices()" style="padding:7px;background:rgba(139,92,246,.08);border:1px solid rgba(139,92,246,.2);border-radius:7px;color:#fff;font-size:.68rem;font-weight:700;cursor:pointer;font-family:Inter;"><i class="fas fa-chart-bar"></i> Prices</button>
                    <button onclick="GeoHubAgriculture.openIrrigationExplorer()" style="padding:7px;background:rgba(6,182,212,.08);border:1px solid rgba(6,182,212,.2);border-radius:7px;color:#fff;font-size:.68rem;font-weight:700;cursor:pointer;font-family:Inter;"><i class="fas fa-water"></i> Irrigation</button>
                    <button onclick="GeoHubAgriculture.openPestDiseaseAlert()" style="padding:7px;background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.2);border-radius:7px;color:#fff;font-size:.68rem;font-weight:700;cursor:pointer;font-family:Inter;"><i class="fas fa-bug"></i> Pest Alert</button>
                    <button onclick="GeoHubAgriculture.openSoilExplorer()" style="grid-column:span 2;padding:7px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:7px;color:#fff;font-size:.68rem;font-weight:700;cursor:pointer;font-family:Inter;"><i class="fas fa-seedling"></i> Soil Explorer</button>
                </div>
            </div>`;
        if (GeoHubFeatures && GeoHubFeatures.createFloatingPanel) {
            GeoHubFeatures.createFloatingPanel('agriHub', 'GeoHub Agriculture', 'fas fa-tractor', content, {
                position: 'top:calc(var(--nb,62px)+10px);right:12px;',
                width: '380px',
                maxHeight: '85vh'
            });
        }
    }

    // ── Sub-panel openers (used by buttons above) ──────────────────────────
    function openSuitabilityExplorer() {
        const dists = typeof ZAMBIA_DISTRICTS !== 'undefined' ? ZAMBIA_DISTRICTS : [];
        const cropOptions = Object.entries(CROPS).map(([k, c]) => `<option value="${k}">${c.icon} ${c.name}</option>`).join('');
        const content = `
            <div style="padding:10px 14px;">
                <div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:6px;">Check Crop Suitability</div>
                <select id="agriCropSel" style="width:100%;padding:6px 8px;background:rgba(255,255,255,.06);border:1px solid #243d28;border-radius:7px;color:#fff;font-family:Inter;font-size:.73rem;outline:none;margin-bottom:6px;">${cropOptions}</select>
                <select id="agriDistSel" style="width:100%;padding:6px 8px;background:rgba(255,255,255,.06);border:1px solid #243d28;border-radius:7px;color:#fff;font-family:Inter;font-size:.73rem;outline:none;margin-bottom:6px;">
                    ${dists.map(d => `<option value="${d.id}">${d.district}, ${d.province}</option>`).join('')}
                </select>
                <button onclick="var c=document.getElementById('agriCropSel').value;var d=dists.find(x=>x.id===document.getElementById('agriDistSel').value);var r=GeoHubAgriculture.calculateCropSuitability(c,d);var el=document.getElementById('agriResult');if(r){el.innerHTML=GeoHubAgriculture.renderSuitabilityTable([r])+'<div style=\\'margin-top:6px;background:rgba(76,175,80,.06);border:1px solid rgba(76,175,80,.15);border-radius:7px;padding:8px;font-size:.68rem;color:rgba(255,255,255,.75);\\'>🌡️ <strong>Climate:</strong> '+r.temp_score+'% temp, '+r.rain_score+'% rain<br>🌱 <strong>Soil:</strong> '+r.soil_type+' ('+r.soil_score+'%)<br><strong>Suitability: '+r.suitability_class+'</strong></div>';}" style="width:100%;padding:7px;background:linear-gradient(135deg,#1a6b35,#2d9e5f);border:none;border-radius:7px;color:#fff;font-weight:700;cursor:pointer;font-family:Inter;font-size:.74rem;"><i class="fas fa-search"></i> Check Suitability</button>
                <button onclick="var d=dists.find(x=>x.id===document.getElementById('agriDistSel').value);var all=GeoHubAgriculture.calculateAllCropSuitability(d);document.getElementById('agriResult').innerHTML=GeoHubAgriculture.renderSuitabilityTable(all);" style="width:100%;margin-top:4px;padding:6px;background:rgba(255,255,255,.06);border:1px solid #243d28;border-radius:7px;color:rgba(255,255,255,.7);font-size:.68rem;font-weight:600;cursor:pointer;font-family:Inter;">All Crops for this District</button>
                <div id="agriResult" style="margin-top:8px;"></div>
            </div>`;
        if (GeoHubFeatures) GeoHubFeatures.createFloatingPanel('agriSuit', 'Crop Suitability Explorer', 'fas fa-check-double', content, {
            position: 'top:calc(var(--nb,62px)+10px);right:12px;',
            width: '420px',
            maxHeight: '85vh'
        });
    }

    function openYieldPredictor() {
        const dists = typeof ZAMBIA_DISTRICTS !== 'undefined' ? ZAMBIA_DISTRICTS : [];
        const cropOptions = Object.entries(CROPS).map(([k, c]) => `<option value="${k}">${c.icon} ${c.name}</option>`).join('');
        const content = `
            <div style="padding:10px 14px;">
                <div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:6px;">📊 Crop Yield Prediction Model</div>
                <select id="yieldCropSel" style="width:100%;padding:6px 8px;background:rgba(255,255,255,.06);border:1px solid #243d28;border-radius:7px;color:#fff;font-family:Inter;font-size:.73rem;outline:none;margin-bottom:6px;">${cropOptions}</select>
                <select id="yieldDistSel" style="width:100%;padding:6px 8px;background:rgba(255,255,255,.06);border:1px solid #243d28;border-radius:7px;color:#fff;font-family:Inter;font-size:.73rem;outline:none;margin-bottom:6px;">
                    ${dists.map(d => `<option value="${d.id}">${d.district}, ${d.province}</option>`).join('')}
                </select>
                <select id="yieldYearSel" style="width:100%;padding:6px 8px;background:rgba(255,255,255,.06);border:1px solid #243d28;border-radius:7px;color:#fff;font-family:Inter;font-size:.73rem;outline:none;margin-bottom:6px;">
                    <option value="2024">2024 Season</option><option value="2025" selected>2025 Season</option><option value="2026">2026 Season</option>
                </select>
                <button onclick="var c=document.getElementById('yieldCropSel').value;var d=dists.find(x=>x.id===document.getElementById('yieldDistSel').value);var y=parseInt(document.getElementById('yieldYearSel').value);document.getElementById('yieldResult').innerHTML=GeoHubAgriculture.renderYieldPrediction(GeoHubAgriculture.predictYield(c,d,y));" style="width:100%;padding:7px;background:linear-gradient(135deg,#1a6b35,#2d9e5f);border:none;border-radius:7px;color:#fff;font-weight:700;cursor:pointer;font-family:Inter;font-size:.74rem;"><i class="fas fa-chart-line"></i> Predict Yield</button>
                <div id="yieldResult" style="margin-top:8px;"></div>
            </div>`;
        if (GeoHubFeatures) GeoHubFeatures.createFloatingPanel('agriYield', 'Yield Prediction', 'fas fa-chart-line', content, {
            position: 'top:calc(var(--nb,62px)+10px);right:12px;',
            width: '380px'
        });
    }

    function openFertilizerAdvisor() {
        const dists = typeof ZAMBIA_DISTRICTS !== 'undefined' ? ZAMBIA_DISTRICTS : [];
        const cropOptions = Object.entries(CROPS).map(([k, c]) => `<option value="${k}">${c.icon} ${c.name}</option>`).join('');
        const content = `
            <div style="padding:10px 14px;">
                <div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:6px;">🧪 Fertilizer Recommendation Engine</div>
                <select id="fertCropSel" style="width:100%;padding:6px 8px;background:rgba(255,255,255,.06);border:1px solid #243d28;border-radius:7px;color:#fff;font-family:Inter;font-size:.73rem;outline:none;margin-bottom:6px;">${cropOptions}</select>
                <select id="fertDistSel" style="width:100%;padding:6px 8px;background:rgba(255,255,255,.06);border:1px solid #243d28;border-radius:7px;color:#fff;font-family:Inter;font-size:.73rem;outline:none;margin-bottom:6px;">
                    ${dists.map(d => `<option value="${d.id}">${d.district}, ${d.province}</option>`).join('')}
                </select>
                <button onclick="var c=document.getElementById('fertCropSel').value;var d=dists.find(x=>x.id===document.getElementById('fertDistSel').value);document.getElementById('fertResult').innerHTML=GeoHubAgriculture.renderFertilizerRecommendation(GeoHubAgriculture.getFertilizerRecommendation(c,d));" style="width:100%;padding:7px;background:linear-gradient(135deg,#b45309,#d97706);border:none;border-radius:7px;color:#fff;font-weight:700;cursor:pointer;font-family:Inter;font-size:.74rem;"><i class="fas fa-flask"></i> Get Recommendation</button>
                <div id="fertResult" style="margin-top:8px;"></div>
            </div>`;
        if (GeoHubFeatures) GeoHubFeatures.createFloatingPanel('agriFert', 'Fertilizer Advisor', 'fas fa-flask', content, {
            position: 'top:calc(var(--nb,62px)+10px);right:12px;',
            width: '380px'
        });
    }

    function openGrowingCalendar() {
        const content = `
            <div style="padding:10px 14px;">
                <div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:6px;">📅 Growing Season Calendar</div>
                <div style="margin-bottom:8px;">
                    ${Object.keys(CROPS).map(k => renderGrowingSeason(k)).join('')}
                </div>
                <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:8px 10px;">
                    <div style="font-size:.7rem;font-weight:700;color:#fff;margin-bottom:6px;">Monthly Activities</div>
                    ${GROWING_CALENDAR.slice(new Date().getMonth(), new Date().getMonth() + 3).map(m => `
                        <div style="display:flex;gap:7px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.04);">
                            <span style="font-size:.6rem;font-weight:800;color:${m.rainy_season ? '#38bdf8' : '#fbbf24'};width:60px;">${m.month}</span>
                            <span style="font-size:.65rem;color:rgba(255,255,255,.7);">${m.activities}</span>
                        </div>
                    `).join('')}
                </div>
            </div>`;
        if (GeoHubFeatures) GeoHubFeatures.createFloatingPanel('agriCalendar', 'Growing Season Calendar', 'fas fa-calendar-alt', content, {
            position: 'top:calc(var(--nb,62px)+10px);right:12px;',
            width: '380px',
            maxHeight: '80vh'
        });
    }

    function openFarmingZones() {
        let content = `<div style="padding:8px 10px;">
            <div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:6px;">🗺️ Zambia Agricultural Zones (${AGRI_ZONES.length})</div>`;
        AGRI_ZONES.forEach(z => {
            content += `<div style="padding:6px 8px;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;" onclick="map && map.flyTo([${z.lat},${z.lng}],9);document.querySelector('.ghz-floating-panel[id*=\\'agri\\']')?.remove();showToast('${z.name} — ${z.primary_crop}','info')">
                <div style="font-size:.72rem;font-weight:700;color:#fff;">${z.name}</div>
                <div style="font-size:.62rem;color:var(--muted);">🌽 ${z.primary_crop} · ${z.province} · ${(z.area_ha/1000).toFixed(0)}K ha</div>
            </div>`;
        });
        content += '</div>';
        if (GeoHubFeatures) GeoHubFeatures.createFloatingPanel('agriZones', 'Farming Zones', 'fas fa-map', content, {
            position: 'top:calc(var(--nb,62px)+10px);right:12px;',
            width: '380px',
            maxHeight: '85vh'
        });
    }

    function openMarketPrices() {
        const content = renderMarketPrices();
        if (GeoHubFeatures) GeoHubFeatures.createFloatingPanel('agriPrices', 'Market Prices', 'fas fa-chart-bar', content, {
            position: 'top:calc(var(--nb,62px)+10px);right:12px;',
            width: '340px'
        });
    }

    function openIrrigationExplorer() {
        const dists = typeof ZAMBIA_DISTRICTS !== 'undefined' ? ZAMBIA_DISTRICTS : [];
        const content = `
            <div style="padding:10px 14px;">
                <div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:6px;">💧 Irrigation Potential Explorer</div>
                <select id="irrDistSel" style="width:100%;padding:6px 8px;background:rgba(255,255,255,.06);border:1px solid #243d28;border-radius:7px;color:#fff;font-family:Inter;font-size:.73rem;outline:none;margin-bottom:6px;">
                    ${dists.map(d => `<option value="${d.id}">${d.district}, ${d.province}</option>`).join('')}
                </select>
                <button onclick="var d=dists.find(x=>x.id===document.getElementById('irrDistSel').value);document.getElementById('irrResult').innerHTML=GeoHubAgriculture.renderIrrigationPotential(d);" style="width:100%;padding:7px;background:linear-gradient(135deg,#0e7490,#0891b2);border:none;border-radius:7px;color:#fff;font-weight:700;cursor:pointer;font-family:Inter;font-size:.74rem;"><i class="fas fa-water"></i> Check Potential</button>
                <div id="irrResult" style="margin-top:8px;"></div>
            </div>`;
        if (GeoHubFeatures) GeoHubFeatures.createFloatingPanel('agriIrr', 'Irrigation Potential', 'fas fa-water', content, {
            position: 'top:calc(var(--nb,62px)+10px);right:12px;',
            width: '360px'
        });
    }

    function openPestDiseaseAlert() {
        const dists = typeof ZAMBIA_DISTRICTS !== 'undefined' ? ZAMBIA_DISTRICTS : [];
        const cropOptions = Object.entries(PEST_DISEASE_PROFILES).map(([k]) => `<option value="${k}">${CROPS[k]?.icon || ''} ${CROPS[k]?.name || k}</option>`).join('');
        const content = `
            <div style="padding:10px 14px;">
                <div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:var(--g5);margin-bottom:6px;">🐛 Pest & Disease Risk Alert</div>
                <select id="pestCropSel" style="width:100%;padding:6px 8px;background:rgba(255,255,255,.06);border:1px solid #243d28;border-radius:7px;color:#fff;font-family:Inter;font-size:.73rem;outline:none;margin-bottom:6px;">${cropOptions}</select>
                <select id="pestDistSel" style="width:100%;padding:6px 8px;background:rgba(255,255,255,.06);border:1px solid #243d28;border-radius:7px;color:#fff;font-family:Inter;font-size:.73rem;outline:none;margin-bottom:6px;">
                    ${dists.map(d => `<option value="${d.id}">${d.district}, ${d.province}</option>`).join('')}
                </select>
                <button onclick="var c=document.getElementById('pestCropSel').value;var d=dists.find(x=>x.id===document.getElementById('pestDistSel').value);document.getElementById('pestResult').innerHTML=GeoHubAgriculture.renderPestAlert(GeoHubAgriculture.getPestDiseaseRisk(c,d));" style="width:100%;padding:7px;background:linear-gradient(135deg,#dc2626,#ef4444);border:none;border-radius:7px;color:#fff;font-weight:700;cursor:pointer;font-family:Inter;font-size:.74rem;"><i class="fas fa-bug"></i> Check Risk</button>
                <div id="pestResult" style="margin-top:8px;"></div>
            </div>`;
        if (GeoHubFeatures) GeoHubFeatures.createFloatingPanel('agriPest', 'Pest & Disease Alert', 'fas fa-bug', content, {
            position: 'top:calc(var(--nb,62px)+10px);right:12px;',
            width: '380px'
        });
    }

    function openSoilExplorer() {
        const content = renderSoilDatabase();
        if (GeoHubFeatures) GeoHubFeatures.createFloatingPanel('agriSoil', 'Soil Types Database', 'fas fa-seedling', content, {
            position: 'top:calc(var(--nb,62px)+10px);right:12px;',
            width: '360px',
            maxHeight: '85vh'
        });
    }

    // ─────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────
    return {
        // Data exports
        CROPS,
        SOIL_TYPES,
        AGRI_ZONES,
        MARKET_PRICES,
        GROWING_CALENDAR,
        PEST_DISEASE_PROFILES,

        // Core feature functions
        calculateCropSuitability,
        calculateAllCropSuitability,
        calculateCropSuitabilityForProvince,
        predictYield,
        getFertilizerRecommendation,
        getCropGrowingSeason,
        getAgriZones,
        getAgriZonesByProvince,
        getAgriZonesByCrop,
        getCropStats,
        getProvinceCropStats,
        getMarketPrices,
        getMarketPriceForCrop,
        getIrrigationPotential,
        getPestDiseaseRisk,
        getSoilTypes,
        getSoilByName,
        getSoilForDistrict,
        getSoilByProvince,

        // Render helpers
        renderSuitabilityTable,
        renderYieldPrediction,
        renderFertilizerRecommendation,
        renderGrowingSeason,
        renderMarketPrices,
        renderIrrigationPotential,
        renderPestAlert,
        renderSoilDatabase,
        showSoilDetail,

        // UI Panels
        openAgricultureHub,
        openSuitabilityExplorer,
        openYieldPredictor,
        openFertilizerAdvisor,
        openGrowingCalendar,
        openFarmingZones,
        openMarketPrices,
        openIrrigationExplorer,
        openPestDiseaseAlert,
        openSoilExplorer,
    };
})();

// Auto-export to window
if (typeof window !== 'undefined') {
    window.GeoHubAgriculture = GeoHubAgriculture;
}