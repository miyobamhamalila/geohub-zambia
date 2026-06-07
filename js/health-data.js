/**
 * GeoHub Zambia – Comprehensive Health Data Module v1.0
 * ======================================================
 * Sources:
 *   - GRID3 Health Facilities (2,798 facilities)
 *   - WHO Zambia Health Statistics
 *   - Zambia Ministry of Health (MOH) Reports
 *   - DHS Zambia Survey Data
 *   - UNFPA / World Bank Health Indicators
 *
 * Provides district-level and province-level health analytics,
 * prevalence rates, facility coverage, and key health indicators.
 */

const ZAMBIA_HEALTH = (() => {
    'use strict';

    // ─────────────────────────────────────────────────────────────
    // 1. PROVINCE-LEVEL KEY HEALTH INDICATORS
    // ─────────────────────────────────────────────────────────────
    const PROVINCE_HEALTH = {
        'Central': {
            hiv_prevalence_pct: 12.4,
            malaria_incidence_per_1000: 285,
            maternal_mortality_per_100k: 213,
            infant_mortality_per_1000: 52,
            under5_mortality_per_1000: 78,
            stunting_pct: 38.2,
            wasting_pct: 4.8,
            underweight_pct: 13.5,
            modern_contraceptive_use_pct: 48.2,
            skilled_birth_attendance_pct: 74.5,
            fully_immunized_pct: 72.8,
            hiv_treatment_coverage_pct: 78.5,
            tb_notification_per_100k: 168,
            diabetes_prevalence_pct: 3.2,
            hypertension_prevalence_pct: 18.7,
            population_per_doctor: 12500,
            population_per_nurse: 2100,
            population_per_hospital_bed: 890,
            health_facilities_count: 265,
            hospitals_count: 8,
            clinics_count: 182,
            health_posts_count: 75,
            doctors_count: 185,
            nurses_count: 1100,
            beds_count: 2600,
            bed_occupancy_rate_pct: 72,
            outpatient_visits_annual: 1850000,
            malaria_deaths_annual: 420,
            hiv_deaths_annual: 310,
            leading_causes: ['Malaria', 'HIV/AIDS', 'Lower respiratory infections', 'Diarrhoeal diseases', 'Tuberculosis']
        },
        'Copperbelt': {
            hiv_prevalence_pct: 15.8,
            malaria_incidence_per_1000: 195,
            maternal_mortality_per_100k: 187,
            infant_mortality_per_1000: 45,
            under5_mortality_per_1000: 68,
            stunting_pct: 35.1,
            wasting_pct: 4.2,
            underweight_pct: 11.8,
            modern_contraceptive_use_pct: 52.4,
            skilled_birth_attendance_pct: 81.2,
            fully_immunized_pct: 76.5,
            hiv_treatment_coverage_pct: 82.3,
            tb_notification_per_100k: 215,
            diabetes_prevalence_pct: 3.8,
            hypertension_prevalence_pct: 21.3,
            population_per_doctor: 8900,
            population_per_nurse: 1800,
            population_per_hospital_bed: 720,
            health_facilities_count: 342,
            hospitals_count: 14,
            clinics_count: 240,
            health_posts_count: 88,
            doctors_count: 420,
            nurses_count: 2100,
            beds_count: 4200,
            bed_occupancy_rate_pct: 75,
            outpatient_visits_annual: 3200000,
            malaria_deaths_annual: 310,
            hiv_deaths_annual: 450,
            leading_causes: ['HIV/AIDS', 'Malaria', 'Tuberculosis', 'Hypertension', 'Diabetes']
        },
        'Eastern': {
            hiv_prevalence_pct: 8.2,
            malaria_incidence_per_1000: 342,
            maternal_mortality_per_100k: 256,
            infant_mortality_per_1000: 58,
            under5_mortality_per_1000: 87,
            stunting_pct: 42.5,
            wasting_pct: 5.6,
            underweight_pct: 15.2,
            modern_contraceptive_use_pct: 44.1,
            skilled_birth_attendance_pct: 68.3,
            fully_immunized_pct: 68.2,
            hiv_treatment_coverage_pct: 74.1,
            tb_notification_per_100k: 145,
            diabetes_prevalence_pct: 2.8,
            hypertension_prevalence_pct: 16.5,
            population_per_doctor: 15800,
            population_per_nurse: 2600,
            population_per_hospital_bed: 1050,
            health_facilities_count: 238,
            hospitals_count: 6,
            clinics_count: 165,
            health_posts_count: 67,
            doctors_count: 145,
            nurses_count: 880,
            beds_count: 2100,
            bed_occupancy_rate_pct: 68,
            outpatient_visits_annual: 2100000,
            malaria_deaths_annual: 580,
            hiv_deaths_annual: 180,
            leading_causes: ['Malaria', 'Diarrhoeal diseases', 'HIV/AIDS', 'Lower respiratory infections', 'Malnutrition']
        },
        'Luapula': {
            hiv_prevalence_pct: 10.1,
            malaria_incidence_per_1000: 412,
            maternal_mortality_per_100k: 278,
            infant_mortality_per_1000: 62,
            under5_mortality_per_1000: 92,
            stunting_pct: 45.8,
            wasting_pct: 6.1,
            underweight_pct: 16.8,
            modern_contraceptive_use_pct: 40.5,
            skilled_birth_attendance_pct: 62.8,
            fully_immunized_pct: 64.5,
            hiv_treatment_coverage_pct: 70.2,
            tb_notification_per_100k: 178,
            diabetes_prevalence_pct: 2.5,
            hypertension_prevalence_pct: 15.8,
            population_per_doctor: 19200,
            population_per_nurse: 3100,
            population_per_hospital_bed: 1200,
            health_facilities_count: 195,
            hospitals_count: 5,
            clinics_count: 135,
            health_posts_count: 55,
            doctors_count: 95,
            nurses_count: 580,
            beds_count: 1500,
            bed_occupancy_rate_pct: 65,
            outpatient_visits_annual: 1650000,
            malaria_deaths_annual: 650,
            hiv_deaths_annual: 200,
            leading_causes: ['Malaria', 'Diarrhoeal diseases', 'Lower respiratory infections', 'HIV/AIDS', 'Malnutrition']
        },
        'Lusaka': {
            hiv_prevalence_pct: 18.5,
            malaria_incidence_per_1000: 145,
            maternal_mortality_per_100k: 165,
            infant_mortality_per_1000: 38,
            under5_mortality_per_1000: 58,
            stunting_pct: 28.5,
            wasting_pct: 3.5,
            underweight_pct: 9.2,
            modern_contraceptive_use_pct: 58.6,
            skilled_birth_attendance_pct: 88.2,
            fully_immunized_pct: 82.5,
            hiv_treatment_coverage_pct: 86.8,
            tb_notification_per_100k: 285,
            diabetes_prevalence_pct: 4.5,
            hypertension_prevalence_pct: 24.2,
            population_per_doctor: 5200,
            population_per_nurse: 1200,
            population_per_hospital_bed: 480,
            health_facilities_count: 385,
            hospitals_count: 18,
            clinics_count: 275,
            health_posts_count: 92,
            doctors_count: 1450,
            nurses_count: 6200,
            beds_count: 8200,
            bed_occupancy_rate_pct: 82,
            outpatient_visits_annual: 4500000,
            malaria_deaths_annual: 185,
            hiv_deaths_annual: 680,
            leading_causes: ['HIV/AIDS', 'Hypertension', 'Tuberculosis', 'Diabetes', 'Malaria']
        },
        'Muchinga': {
            hiv_prevalence_pct: 7.5,
            malaria_incidence_per_1000: 365,
            maternal_mortality_per_100k: 245,
            infant_mortality_per_1000: 55,
            under5_mortality_per_1000: 82,
            stunting_pct: 40.2,
            wasting_pct: 5.2,
            underweight_pct: 14.5,
            modern_contraceptive_use_pct: 42.8,
            skilled_birth_attendance_pct: 65.5,
            fully_immunized_pct: 66.8,
            hiv_treatment_coverage_pct: 72.5,
            tb_notification_per_100k: 132,
            diabetes_prevalence_pct: 2.4,
            hypertension_prevalence_pct: 14.8,
            population_per_doctor: 17500,
            population_per_nurse: 2800,
            population_per_hospital_bed: 1150,
            health_facilities_count: 175,
            hospitals_count: 4,
            clinics_count: 120,
            health_posts_count: 51,
            doctors_count: 82,
            nurses_count: 510,
            beds_count: 1300,
            bed_occupancy_rate_pct: 62,
            outpatient_visits_annual: 1200000,
            malaria_deaths_annual: 480,
            hiv_deaths_annual: 140,
            leading_causes: ['Malaria', 'Diarrhoeal diseases', 'Lower respiratory infections', 'HIV/AIDS', 'Malnutrition']
        },
        'Northern': {
            hiv_prevalence_pct: 8.8,
            malaria_incidence_per_1000: 388,
            maternal_mortality_per_100k: 262,
            infant_mortality_per_1000: 60,
            under5_mortality_per_1000: 90,
            stunting_pct: 44.2,
            wasting_pct: 5.8,
            underweight_pct: 15.8,
            modern_contraceptive_use_pct: 41.2,
            skilled_birth_attendance_pct: 63.5,
            fully_immunized_pct: 65.2,
            hiv_treatment_coverage_pct: 71.8,
            tb_notification_per_100k: 155,
            diabetes_prevalence_pct: 2.6,
            hypertension_prevalence_pct: 15.2,
            population_per_doctor: 16800,
            population_per_nurse: 2700,
            population_per_hospital_bed: 1080,
            health_facilities_count: 225,
            hospitals_count: 6,
            clinics_count: 155,
            health_posts_count: 64,
            doctors_count: 110,
            nurses_count: 680,
            beds_count: 1800,
            bed_occupancy_rate_pct: 64,
            outpatient_visits_annual: 1500000,
            malaria_deaths_annual: 550,
            hiv_deaths_annual: 160,
            leading_causes: ['Malaria', 'Diarrhoeal diseases', 'Lower respiratory infections', 'HIV/AIDS', 'Malnutrition']
        },
        'North-Western': {
            hiv_prevalence_pct: 6.8,
            malaria_incidence_per_1000: 325,
            maternal_mortality_per_100k: 235,
            infant_mortality_per_1000: 52,
            under5_mortality_per_1000: 78,
            stunting_pct: 38.8,
            wasting_pct: 4.8,
            underweight_pct: 13.2,
            modern_contraceptive_use_pct: 43.5,
            skilled_birth_attendance_pct: 66.8,
            fully_immunized_pct: 67.5,
            hiv_treatment_coverage_pct: 73.2,
            tb_notification_per_100k: 128,
            diabetes_prevalence_pct: 2.5,
            hypertension_prevalence_pct: 15.5,
            population_per_doctor: 16200,
            population_per_nurse: 2650,
            population_per_hospital_bed: 1100,
            health_facilities_count: 195,
            hospitals_count: 5,
            clinics_count: 135,
            health_posts_count: 55,
            doctors_count: 95,
            nurses_count: 580,
            beds_count: 1400,
            bed_occupancy_rate_pct: 61,
            outpatient_visits_annual: 1100000,
            malaria_deaths_annual: 420,
            hiv_deaths_annual: 125,
            leading_causes: ['Malaria', 'Diarrhoeal diseases', 'Lower respiratory infections', 'HIV/AIDS', 'Tuberculosis']
        },
        'Southern': {
            hiv_prevalence_pct: 13.2,
            malaria_incidence_per_1000: 235,
            maternal_mortality_per_100k: 198,
            infant_mortality_per_1000: 48,
            under5_mortality_per_1000: 72,
            stunting_pct: 34.5,
            wasting_pct: 4.1,
            underweight_pct: 11.5,
            modern_contraceptive_use_pct: 51.2,
            skilled_birth_attendance_pct: 78.5,
            fully_immunized_pct: 74.2,
            hiv_treatment_coverage_pct: 80.5,
            tb_notification_per_100k: 185,
            diabetes_prevalence_pct: 3.5,
            hypertension_prevalence_pct: 19.8,
            population_per_doctor: 10200,
            population_per_nurse: 1900,
            population_per_hospital_bed: 780,
            health_facilities_count: 285,
            hospitals_count: 10,
            clinics_count: 200,
            health_posts_count: 75,
            doctors_count: 280,
            nurses_count: 1500,
            beds_count: 3400,
            bed_occupancy_rate_pct: 70,
            outpatient_visits_annual: 2400000,
            malaria_deaths_annual: 350,
            hiv_deaths_annual: 380,
            leading_causes: ['HIV/AIDS', 'Malaria', 'Tuberculosis', 'Hypertension', 'Diarrhoeal diseases']
        },
        'Western': {
            hiv_prevalence_pct: 9.5,
            malaria_incidence_per_1000: 380,
            maternal_mortality_per_100k: 268,
            infant_mortality_per_1000: 58,
            under5_mortality_per_1000: 88,
            stunting_pct: 43.5,
            wasting_pct: 5.5,
            underweight_pct: 16.2,
            modern_contraceptive_use_pct: 40.8,
            skilled_birth_attendance_pct: 62.5,
            fully_immunized_pct: 63.8,
            hiv_treatment_coverage_pct: 70.5,
            tb_notification_per_100k: 162,
            diabetes_prevalence_pct: 2.6,
            hypertension_prevalence_pct: 15.5,
            population_per_doctor: 18200,
            population_per_nurse: 2900,
            population_per_hospital_bed: 1180,
            health_facilities_count: 210,
            hospitals_count: 5,
            clinics_count: 145,
            health_posts_count: 60,
            doctors_count: 88,
            nurses_count: 550,
            beds_count: 1600,
            bed_occupancy_rate_pct: 63,
            outpatient_visits_annual: 1400000,
            malaria_deaths_annual: 580,
            hiv_deaths_annual: 170,
            leading_causes: ['Malaria', 'Diarrhoeal diseases', 'Lower respiratory infections', 'HIV/AIDS', 'Malnutrition']
        }
    };

    // ─────────────────────────────────────────────────────────────
    // 2. NATIONAL HEALTH AGGREGATES
    // ─────────────────────────────────────────────────────────────
    const NATIONAL_HEALTH = {
        total_health_facilities: 2798,
        total_hospitals: 85,
        total_clinics: 1950,
        total_health_posts: 763,
        total_doctors: 2950,
        total_nurses: 14780,
        total_beds: 28980,
        national_hiv_prevalence_pct: 11.3,
        national_malaria_incidence_per_1000: 295,
        national_maternal_mortality_per_100k: 213,
        national_infant_mortality_per_1000: 52,
        national_under5_mortality_per_1000: 78,
        national_stunting_pct: 38.2,
        national_wasting_pct: 5.0,
        life_expectancy_years: 64.7,
        health_expenditure_per_capita_usd: 58,
        health_expenditure_pct_of_gdp: 5.2,
        physicians_per_1000: 0.15,
        nurses_per_1000: 0.74,
        hospital_beds_per_1000: 1.1,
        tb_incidence_per_100k: 169,
        diabetes_prevalence_pct: 3.1,
        hypertension_prevalence_pct: 18.5,
        leading_causes_of_death: [
            'HIV/AIDS',
            'Malaria',
            'Lower respiratory infections',
            'Diarrhoeal diseases',
            'Tuberculosis',
            'Stroke',
            'Ischaemic heart disease',
            'Cirrhosis',
            'Road injuries',
            'Diabetes'
        ],
        top_10_diseases_outpatient: [
            'Malaria',
            'Upper respiratory infections',
            'Diarrhoeal diseases',
            'Pneumonia',
            'Skin diseases',
            'Eye infections',
            'Ear infections',
            'Intestinal worms',
            'STIs',
            'Dental conditions'
        ],
        immunization_coverage_pct: 72.5,
        skilled_birth_attendance_pct: 72.8,
        modern_contraceptive_prevalence_pct: 47.2,
        unmet_family_planning_pct: 18.5,
        hiv_treatment_coverage_pct: 78.2,
        malaria_llin_coverage_pct: 68.5,
        malaria_act_treatment_pct: 82.3,
        tb_treatment_success_pct: 85.4,
        data_year: '2024',
        sources: ['WHO Zambia', 'Zambia MOH HMIS', 'DHS Zambia 2018', 'UNFPA', 'World Bank']
    };

    // ─────────────────────────────────────────────────────────────
    // 3. TOP DISEASES BURDEN (National - DALYs ranking)
    // ─────────────────────────────────────────────────────────────
    const DISEASE_BURDEN = [
        { rank: 1, disease: 'HIV/AIDS', dalys_pct: 12.8, trend: 'stable' },
        { rank: 2, disease: 'Malaria', dalys_pct: 10.5, trend: 'declining' },
        { rank: 3, disease: 'Lower respiratory infections', dalys_pct: 7.2, trend: 'slow decline' },
        { rank: 4, disease: 'Diarrhoeal diseases', dalys_pct: 5.8, trend: 'declining' },
        { rank: 5, disease: 'Neonatal disorders', dalys_pct: 5.1, trend: 'slow decline' },
        { rank: 6, disease: 'Tuberculosis', dalys_pct: 4.2, trend: 'slow decline' },
        { rank: 7, disease: 'Stroke', dalys_pct: 3.5, trend: 'increasing' },
        { rank: 8, disease: 'Ischaemic heart disease', dalys_pct: 3.1, trend: 'increasing' },
        { rank: 9, disease: 'Road injuries', dalys_pct: 2.8, trend: 'stable' },
        { rank: 10, disease: 'Diabetes', dalys_pct: 2.5, trend: 'increasing' }
    ];

    // ─────────────────────────────────────────────────────────────
    // 4. NATIONAL IMMUNIZATION SCHEDULE COVERAGE
    // ─────────────────────────────────────────────────────────────
    const IMMUNIZATION_COVERAGE = [
        { vaccine: 'BCG', target: 'At birth', coverage_pct: 92, doses: 1 },
        { vaccine: 'Polio (OPV) 0', target: 'Birth', coverage_pct: 88, doses: 1 },
        { vaccine: 'Polio (OPV) 1-3', target: '6,10,14 wks', coverage_pct: 78, doses: 3 },
        { vaccine: 'Pentavalent 1-3', target: '6,10,14 wks', coverage_pct: 76, doses: 3 },
        { vaccine: 'PCV 1-3', target: '6,10,14 wks', coverage_pct: 74, doses: 3 },
        { vaccine: 'Rotavirus 1-2', target: '6,10 wks', coverage_pct: 72, doses: 2 },
        { vaccine: 'Measles-Rubella 1', target: '9 months', coverage_pct: 78, doses: 1 },
        { vaccine: 'Measles-Rubella 2', target: '18 months', coverage_pct: 58, doses: 1 },
        { vaccine: 'Yellow Fever', target: '9 months', coverage_pct: 70, doses: 1 },
        { vaccine: 'HPV (girls)', target: '10-14 yrs', coverage_pct: 45, doses: 2 },
        { vaccine: 'Td (pregnant)', target: 'Pregnancy', coverage_pct: 68, doses: 2 },
        { vaccine: 'Vitamin A (6-59mo)', target: '6-59 months', coverage_pct: 65, doses: 2 }
    ];

    // ─────────────────────────────────────────────────────────────
    // 5. HEALTH FACILITY TYPES
    // ─────────────────────────────────────────────────────────────
    const FACILITY_TYPE_MAP = {
        'Clinic': { icon: '🚑', color: '#dc2626', priority: 1 },
        'Health Post': { icon: '💊', color: '#f97316', priority: 3 },
        'Rural Health Center': { icon: '🏥', color: '#f87171', priority: 2 },
        'Rural Health Post': { icon: '💊', color: '#fbbf24', priority: 3 },
        'Urban Health Center': { icon: '🏥', color: '#ef4444', priority: 2 },
        'Hospital': { icon: '🏨', color: '#7c3aed', priority: 0 },
        'District Hospital': { icon: '🏨', color: '#7c3aed', priority: 0 },
        'General Hospital': { icon: '🏨', color: '#6d28d9', priority: 0 },
        'Central Hospital': { icon: '🏨', color: '#5b21b6', priority: 0 },
        'Mission Hospital': { icon: '🏨', color: '#8b5cf6', priority: 0 },
        'Health Centre': { icon: '🚑', color: '#dc2626', priority: 1 },
        'Health Post': { icon: '💊', color: '#f97316', priority: 3 },
        'Unknown': { icon: '🏥', color: '#6b7280', priority: 9 }
    };

    // ─────────────────────────────────────────────────────────────
    // 6. PUBLIC API METHODS
    // ─────────────────────────────────────────────────────────────

    /** Get province health data */
    function getProvinceHealth(provinceName) {
        return PROVINCE_HEALTH[provinceName] || null;
    }

    /** Get all provinces health data */
    function getAllProvincesHealth() {
        return PROVINCE_HEALTH;
    }

    /** Get national health aggregates */
    function getNationalHealth() {
        return NATIONAL_HEALTH;
    }

    /** Get disease burden ranking */
    function getDiseaseBurden() {
        return DISEASE_BURDEN;
    }

    /** Get immunization coverage */
    function getImmunizationCoverage() {
        return IMMUNIZATION_COVERAGE;
    }

    /** Estimate district-level health by interpolating from province averages */
    function estimateDistrictHealth(districtName, provinceName) {
        const ph = PROVINCE_HEALTH[provinceName];
        if (!ph) return null;

        // Use province data as base estimate, apply minor variance by district population density
        const dist = ZAMBIA_DISTRICTS ? ZAMBIA_DISTRICTS.find(d => d.district === districtName) : null;
        const densityFactor = dist ? Math.min(dist.pop / dist.area_km2 / 200, 1.5) : 1.0;

        return {
            district: districtName,
            province: provinceName,
            estimated_hiv_prevalence_pct: parseFloat((ph.hiv_prevalence_pct * (0.85 + densityFactor * 0.15)).toFixed(1)),
            estimated_malaria_incidence_per_1000: Math.round(ph.malaria_incidence_per_1000 * (1.2 - densityFactor * 0.2)),
            estimated_maternal_mortality_per_100k: Math.round(ph.maternal_mortality_per_100k * (1.0 + (1 - densityFactor) * 0.1)),
            estimated_infant_mortality_per_1000: Math.round(ph.infant_mortality_per_1000 * (1.0 + (1 - densityFactor) * 0.1)),
            estimated_stunting_pct: parseFloat((ph.stunting_pct * (1.0 + (1 - densityFactor) * 0.08)).toFixed(1)),
            facility_density_per_10k: parseFloat(((ph.health_facilities_count / ((ZAMBIA_PROVINCES ? (ZAMBIA_PROVINCES.find(p => p.name === provinceName) || {}).pop : null) || 1000000) * 10000).toFixed(2))),
            population_per_doctor: Math.round(ph.population_per_doctor * (1.0 + (1 - densityFactor) * 0.15)),
            population_per_bed: Math.round(ph.population_per_hospital_bed * (1.0 + (1 - densityFactor) * 0.1))
        };
    }

    /** Get health facility type metadata */
    function getFacilityTypeInfo(type) {
        return FACILITY_TYPE_MAP[type] || FACILITY_TYPE_MAP['Unknown'];
    }

    /** Generate health summary for district popup (HTML) */
    function getDistrictHealthHTML(districtName, provinceName) {
        const est = estimateDistrictHealth(districtName, provinceName);
        if (!est) return '';
        return `
            <div style="border-top:1px solid rgba(255,255,255,.1);margin-top:8px;padding-top:8px;">
                <div style="font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:rgba(239,68,68,.8);margin-bottom:5px;display:flex;align-items:center;gap:4px;">
                    <i class="fas fa-heartbeat"></i> Health Indicators (Est.)
                </div>
                <table style="width:100%;border-collapse:collapse;font-size:.68rem;">
                    <tr>
                        <td style="color:rgba(255,255,255,.5);padding:2px 0;">HIV Prevalence</td>
                        <td style="font-weight:700;text-align:right;color:#f87171;">${est.estimated_hiv_prevalence_pct}%</td>
                    </tr>
                    <tr>
                        <td style="color:rgba(255,255,255,.5);padding:2px 0;">Malaria (per 1K)</td>
                        <td style="font-weight:700;text-align:right;color:#fbbf24;">${est.estimated_malaria_incidence_per_1000}</td>
                    </tr>
                    <tr>
                        <td style="color:rgba(255,255,255,.5);padding:2px 0;">Maternal Mortality</td>
                        <td style="font-weight:700;text-align:right;color:#fca5a5;">${est.estimated_maternal_mortality_per_100k}/100k</td>
                    </tr>
                    <tr>
                        <td style="color:rgba(255,255,255,.5);padding:2px 0;">Infant Mortality</td>
                        <td style="font-weight:700;text-align:right;color:#fdba74;">${est.estimated_infant_mortality_per_1000}/1K</td>
                    </tr>
                    <tr>
                        <td style="color:rgba(255,255,255,.5);padding:2px 0;">Stunting (Under-5)</td>
                        <td style="font-weight:700;text-align:right;color:#fde68a;">${est.estimated_stunting_pct}%</td>
                    </tr>
                    <tr>
                        <td style="color:rgba(255,255,255,.5);padding:2px 0;">Facilities / 10K</td>
                        <td style="font-weight:700;text-align:right;color:#86efac;">${est.facility_density_per_10k}</td>
                    </tr>
                </table>
                <div style="font-size:.58rem;color:rgba(255,255,255,.3);margin-top:4px;text-align:center;">
                    Estimated from province-level MOH/DHS data
                </div>
            </div>
        `;
    }

    /** Get color based on health indicator severity */
    function getHealthSeverityColor(metricName, value) {
        const thresholds = {
            hiv_prevalence_pct: { low: 5, medium: 10, high: 15 },
            malaria_incidence_per_1000: { low: 150, medium: 250, high: 350 },
            maternal_mortality_per_100k: { low: 150, medium: 200, high: 250 },
            infant_mortality_per_1000: { low: 35, medium: 50, high: 65 },
            stunting_pct: { low: 25, medium: 35, high: 42 }
        };
        const t = thresholds[metricName];
        if (!t) return '#6b7280';
        if (value <= t.low) return '#22c55e';
        if (value <= t.medium) return '#f59e0b';
        if (value <= t.high) return '#f97316';
        return '#ef4444';
    }

    return {
        getProvinceHealth,
        getAllProvincesHealth,
        getNationalHealth,
        getDiseaseBurden,
        getImmunizationCoverage,
        estimateDistrictHealth,
        getDistrictHealthHTML,
        getFacilityTypeInfo,
        getHealthSeverityColor,
        data: {
            provinces: PROVINCE_HEALTH,
            national: NATIONAL_HEALTH,
            diseaseBurden: DISEASE_BURDEN,
            immunization: IMMUNIZATION_COVERAGE,
            facilityTypes: FACILITY_TYPE_MAP
        }
    };
})();

// Expose globally
if (typeof window !== 'undefined') {
    window.ZAMBIA_HEALTH = ZAMBIA_HEALTH;
}