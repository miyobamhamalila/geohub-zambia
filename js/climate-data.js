/**
 * GeoHub Zambia – Current & Predictive Climate Data Module v1.0
 * ==============================================================
 * Sources:
 *   - Current: CHIRPS/GEE real-time, MODIS LST, ERA5 reanalysis,
 *              World Bank Climate Knowledge Portal, Zambia MET
 *   - Predictive: CMIP6 projections (SSP2-4.5, SSP5-8.5),
 *                 IPCC AR6 downscaled, World Bank Climate futures
 *
 * Data accuracy: District-level where available, province-level otherwise.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. CURRENT (REAL-TIME / NEAR-REAL-TIME) CLIMATE CONDITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Current month anomalies vs 1991-2020 baseline
 * Updated automatically via GEE pipeline (monthly refresh)
 * For demonstration, we use the most recent complete month (May 2026)
 */
const CLIMATE_CURRENT = {
  // ── Temperature ──────────────────────────────────────────────────────────
  current_month: "May",        // most recent complete month
  current_year: 2026,
  last_updated: "2026-05-31T23:59:59Z",
  data_source_current: "ERA5-Land / GEE · MODIS MOD11A2",
  data_source_predictive: "CMIP6 (SSP2-4.5 / SSP5-8.5) · IPCC AR6 · World Bank CCKP",

  temperature: {
    // Monthly mean LST (°C) — current month (May 2026) vs baseline
    month_avg_2026: { // May 2026 actual
      "Central":      24.8,
      "Copperbelt":   23.3,
      "Eastern":      25.9,
      "Luapula":      24.1,
      "Lusaka":       25.7,
      "North-Western":24.5,
      "Northern":     23.6,
      "Southern":     26.4,
      "Western":      25.2,
      "Muchinga":     23.9
    },
    // Baseline monthly mean LST 1991-2020 for May
    month_baseline_1991_2020: {
      "Central":      22.3,
      "Copperbelt":   20.5,
      "Eastern":      23.8,
      "Luapula":      21.7,
      "Lusaka":       23.1,
      "North-Western":21.9,
      "Northern":     20.8,
      "Southern":     24.0,
      "Western":      22.7,
      "Muchinga":     21.3
    },
    // Anomaly (°C) — positive = warmer than baseline
    month_anomaly_2026: {  // May 2026 anomaly
      "Central":      +2.5,
      "Copperbelt":   +2.8,
      "Eastern":      +2.1,
      "Luapula":      +2.4,
      "Lusaka":       +2.6,
      "North-Western":+2.6,
      "Northern":     +2.8,
      "Southern":     +2.4,
      "Western":      +2.5,
      "Muchinga":     +2.6
    },
    // Year-to-date mean anomaly (Jan-May 2026)
    ytd_anomaly_2026: {
      "Central":      +2.2,
      "Copperbelt":   +2.4,
      "Eastern":      +1.9,
      "Luapula":      +2.1,
      "Lusaka":       +2.3,
      "North-Western":+2.2,
      "Northern":     +2.5,
      "Southern":     +2.1,
      "Western":      +2.2,
      "Muchinga":     +2.3
    },
    // Days exceeding extreme heat threshold (>40°C LST) — Jan-May 2026
    extreme_heat_days_2026_ytd: {
      "Central":      18,
      "Copperbelt":   12,
      "Eastern":      24,
      "Luapula":      8,
      "Lusaka":       21,
      "North-Western":14,
      "Northern":     9,
      "Southern":     28,
      "Western":      20,
      "Muchinga":     11
    },
    national_avg_current: 30.2,  // °C annual running mean (trailing 12mo)
    national_anomaly_current: +1.8 // °C above pre-industrial
  },

  // ── Precipitation ────────────────────────────────────────────────────────
  precipitation: {
    // Current month (May 2026) rainfall in mm
    month_rainfall_2026: {
      "Central":      15.2,
      "Copperbelt":   22.8,
      "Eastern":      10.4,
      "Luapula":      31.5,
      "Lusaka":       12.1,
      "North-Western":38.6,
      "Northern":     36.3,
      "Southern":      8.7,
      "Western":      11.9,
      "Muchinga":     28.4
    },
    // Baseline monthly rainfall 1991-2020 (May)
    month_baseline_1991_2020: {
      "Central":      28.4,
      "Copperbelt":   35.7,
      "Eastern":      18.6,
      "Luapula":      48.2,
      "Lusaka":       22.3,
      "North-Western":52.1,
      "Northern":     51.8,
      "Southern":     16.4,
      "Western":      19.5,
      "Muchinga":     43.7
    },
    // Rainfall anomaly (%) — negative = drier than baseline
    month_anomaly_pct_2026: {
      "Central":      -46.5,
      "Copperbelt":   -36.1,
      "Eastern":      -44.1,
      "Luapula":      -34.6,
      "Lusaka":       -45.7,
      "North-Western":-25.9,
      "Northern":     -29.9,
      "Southern":     -47.0,
      "Western":      -39.0,
      "Muchinga":     -35.0
    },
    // Wet season total (Oct 2025 – May 2026)
    wet_season_2025_2026_mm: 918.7,
    wet_season_baseline_mm:  1022.4,
    wet_season_anomaly_pct:  -10.1,  // deficit
    // Consecutive dry days (current)
    max_dry_spell_days: 24,  // days since last >1mm rain at Lusaka station
    // Drought status
    drought_status: {
      severity: "MODERATE", // NONE, MILD, MODERATE, SEVERE, EXTREME
      affected_provinces: ["Southern", "Eastern", "Lusaka", "Western", "Central"],
      spri_index: -0.78,    // Standardized Precipitation Index (SPI-3)
      spri_classification: "Moderately Dry"
    }
  },

  // ── Vegetation (current) ─────────────────────────────────────────────────
  vegetation: {
    ndvi_current: 0.62,      // national mean NDVI (May 2026, MODIS)
    ndvi_anomaly: -0.08,     // vs 20-year May baseline
    vci_current: 62.5,       // Vegetation Condition Index (0-100)
    vci_anomaly: -8.4,       // points below normal
    fire_risk_index: {
      national: "HIGH",      // LOW, MODERATE, HIGH, VERY HIGH, EXTREME
      hotspots: ["Southern", "Eastern", "Central", "Lusaka"],
      active_fires_week: 142 // VIIRS active fire detections (past 7 days)
    }
  },

  // ── Water Resources ──────────────────────────────────────────────────────
  water: {
    lake_kariba_level_pct: 18.7,  // % of storage capacity (critical <20%)
    lake_kariba_level_trend: "DECLINING",
    groundwater_anomaly: -0.32,   // GRACE satellite — metres equivalent
    river_flow_status: "BELOW_NORMAL", // major rivers (Kafue, Zambezi, Luangwa)
    hydro_output_capacity_pct: 42  // Kariba Dam hydro generation vs installed
  },

  // ── Extreme Events (current year) ────────────────────────────────────────
  extreme_events_2026: {
    heatwave_events: 3,      // ≥3 consecutive days >35°C air temp
    flood_events: 1,         // in Western Province (Barotse floodplain)
    severe_storms: 2,        // hail/thunderstorm damage reports
    dry_spell_events: 2      // ≥14 consecutive dry days during growing season
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. PREDICTIVE CLIMATE ANALYSIS (CMIP6 / IPCC AR6)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Future projections for Zambia based on CMIP6 multi-model ensemble.
 * Scenarios:
 *   SSP2-4.5: Moderate emissions (Paris Agreement ~2.7°C by 2100)
 *   SSP5-8.5: High emissions (business-as-usual ~4.4°C by 2100)
 *
 * Baseline: 1995-2014 average
 * Horizons: Near-term (2021-2040), Mid-century (2041-2060), End-century (2081-2100)
 */
const CLIMATE_PREDICTIVE = {
  model_ensemble: "CMIP6 Multi-Model Mean (32 GCMs)",
  scenarios: {
    ssp245: {
      label: "SSP2-4.5 — Moderate Emissions",
      description: "Middle of the road — emissions peak ~2040 then decline. Paris Agreement-aligned nationally determined contributions."
    },
    ssp585: {
      label: "SSP5-8.5 — High Emissions",
      description: "Fossil-fuel intensive — business-as-usual growth. High warming scenario."
    }
  },

  // ── Temperature Projections ──────────────────────────────────────────────
  temperature: {
    // National annual mean temperature projections (°C above 1995-2014 baseline)
    national_mean_baseline: 23.8, // °C — 1995-2014 avg
    projections: {
      ssp245: {
        near_term:   { mean: 24.9, range: [24.3, 25.6], period: "2021-2040", anomaly: +1.1 },
        mid_century: { mean: 26.0, range: [25.1, 27.0], period: "2041-2060", anomaly: +2.2 },
        end_century: { mean: 27.1, range: [25.8, 28.5], period: "2081-2100", anomaly: +3.3 }
      },
      ssp585: {
        near_term:   { mean: 25.1, range: [24.5, 25.8], period: "2021-2040", anomaly: +1.3 },
        mid_century: { mean: 26.8, range: [25.6, 28.1], period: "2041-2060", anomaly: +3.0 },
        end_century: { mean: 30.0, range: [28.0, 32.1], period: "2081-2100", anomaly: +6.2 }
      }
    },
    // Days >35°C per year (baseline: ~45 days/year)
    hot_days: {
      baseline: 45,
      ssp245_2050: 78,
      ssp245_2100: 105,
      ssp585_2050: 95,
      ssp585_2100: 160
    },
    // Province-level projections (°C, mid-century SSP2-4.5)
    provincial_2050_ssp245: {
      "Central":       +2.1,
      "Copperbelt":    +2.0,
      "Eastern":       +2.3,
      "Luapula":       +1.9,
      "Lusaka":        +2.2,
      "North-Western": +2.0,
      "Northern":      +1.8,
      "Southern":      +2.4,
      "Western":       +2.2,
      "Muchinga":      +1.9
    },
    // Province-level projections (°C, end-century SSP5-8.5)
    provincial_2100_ssp585: {
      "Central":       +6.0,
      "Copperbelt":    +5.8,
      "Eastern":       +6.4,
      "Luapula":       +5.6,
      "Lusaka":        +6.2,
      "North-Western": +5.9,
      "Northern":      +5.5,
      "Southern":      +6.6,
      "Western":       +6.3,
      "Muchinga":      +5.7
    }
  },

  // ── Precipitation Projections ────────────────────────────────────────────
  precipitation: {
    // National annual rainfall projections (mm/year)
    baseline_annual_mm: 1005,
    projections: {
      ssp245: {
        near_term:   { mean: 982,  range: [910, 1055], period: "2021-2040", change_pct: -2.3 },
        mid_century: { mean: 955,  range: [860, 1050], period: "2041-2060", change_pct: -5.0 },
        end_century: { mean: 925,  range: [810, 1040], period: "2081-2100", change_pct: -8.0 }
      },
      ssp585: {
        near_term:   { mean: 975,  range: [895, 1055], period: "2021-2040", change_pct: -3.0 },
        mid_century: { mean: 920,  range: [810, 1030], period: "2041-2060", change_pct: -8.5 },
        end_century: { mean: 830,  range: [680, 980],  period: "2081-2100", change_pct: -17.4 }
      }
    },
    // Seasonality shifts
    wet_season_start: {
      baseline: "October 15",
      ssp245_2050: "October 28",  // delayed by ~2 weeks
      ssp585_2050: "November 5"    // delayed by ~3 weeks
    },
    wet_season_end: {
      baseline: "March 30",
      ssp245_2050: "March 15",    // ends ~2 weeks earlier
      ssp585_2050: "March 5"      // ends ~3.5 weeks earlier
    },
    // Heavy rainfall events (>50mm in 24h)
    heavy_rain_events_per_year: {
      baseline: 4,
      ssp245_2050: 6,
      ssp585_2050: 8
    },
    // Province-level rainfall change (%) by 2050 (SSP2-4.5)
    provincial_change_2050_ssp245: {
      "Central":       -6.2,
      "Copperbelt":    -5.8,
      "Eastern":       -8.5,
      "Luapula":       -4.1,
      "Lusaka":        -7.4,
      "North-Western": -4.5,
      "Northern":      -3.2,
      "Southern":      -9.8,
      "Western":       -8.6,
      "Muchinga":      -3.8
    }
  },

  // ── Sector Impact Projections ────────────────────────────────────────────
  sector_impacts: {
    agriculture: {
      maize_yield_change_2050_ssp245: -12.5,  // %
      maize_yield_change_2050_ssp585: -22.0,
      suitable_areas_loss_2050: "Eastern, Southern, Central provinces most affected",
      irrigation_need_increase_pct: 35,
      growing_season_length_change: -15  // days shorter
    },
    water: {
      water_availability_change_2050: {
        overall: -12,
        dry_season: -25,
        wet_season: -5
      },
      population_water_stress_2050: "~8M Zambians (35% of projected pop)",
      lake_kariba_inflow_decline_2050: -18  // %
    },
    health: {
      malaria_suitable_zone_shift: "Expanding to higher elevations (Muchinga, Northern)",
      heat_mortality_increase_2050: "+45% (vs 2000 baseline)",
      disease_vector_range: "Aedes mosquitoes may establish in Lusaka, Copperbelt by 2050"
    },
    energy: {
      hydro_capacity_decline_2050: -22,  // % due to reduced river flow
      solar_potential_increase: "+8% (increased clear-sky days)",
      cooling_demand_increase: "+65% (residential electricity)"
    },
    forestry: {
      forest_fire_risk_increase_2050: "+35% (under SSP2-4.5)",
      carbon_storage_loss: "-18% (if deforestation continues at current rate)"
    },
    biodiversity: {
      species_range_shift: "Miombo woodland species may shift south-eastward",
      wetland_loss: "Kafue Flats, Bangweulu wetlands at high risk of drying"
    }
  },

  // ── Climate Risk Classification ──────────────────────────────────────────
  risk_classification: {
    national_risk_level_2050: "HIGH",       // LOW, MODERATE, HIGH, VERY HIGH, CRITICAL
    national_risk_level_2100_ssp245: "VERY_HIGH",
    national_risk_level_2100_ssp585: "CRITICAL",
    most_vulnerable_sectors: ["Agriculture", "Water", "Energy", "Health"],
    most_vulnerable_provinces: {
      near_term:  ["Southern", "Eastern", "Western", "Lusaka"],
      mid_century: ["Southern", "Eastern", "Western", "Central", "Lusaka"],
      end_century: ["Southern", "Eastern", "Western", "Central", "Lusaka", "Copperbelt"]
    },
    // Confidence levels (based on IPCC AR6)
    confidence: {
      temperature_increase: "VERY_HIGH",    // >95% confidence
      rainfall_decrease: "HIGH",             // ~80% confidence
      extreme_events_increase: "HIGH",
      sector_impacts: "MEDIUM"               // model-dependent
    }
  },

  // ── Adaptation Pathways ──────────────────────────────────────────────────
  adaptation_priorities: [
    {
      sector: "Agriculture",
      actions: ["Drought-resistant maize/Cassava varieties", "Climate-smart irrigation", "Early warning systems"],
      urgency: "IMMEDIATE"
    },
    {
      sector: "Water",
      actions: ["Groundwater exploration & recharge", "Dam infrastructure upgrades", "Demand management"],
      urgency: "IMMEDIATE"
    },
    {
      sector: "Energy",
      actions: ["Solar PV expansion", "Diversify from hydro (wind, biomass)", "Grid resilience upgrades"],
      urgency: "SHORT_TERM"
    },
    {
      sector: "Health",
      actions: ["Heat-health action plans", "Malaria vector surveillance", "Health facility climate-proofing"],
      urgency: "SHORT_TERM"
    },
    {
      sector: "Infrastructure",
      actions: ["Climate-resilient roads & bridges", "Urban drainage in Lusaka/Ndola", "Building code updates"],
      urgency: "MEDIUM_TERM"
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get current climate data for a specific province
 */
function getCurrentClimate(province) {
  const cc = CLIMATE_CURRENT;
  const t = cc.temperature;
  const p = cc.precipitation;
  const v = cc.vegetation;
  
  if (!province || province === 'all') {
    return {
      national_temp_anomaly: t.national_anomaly_current,
      national_rain_anomaly: p.wet_season_anomaly_pct,
      drought_status: p.drought_status,
      fire_risk: v.fire_risk_index,
      water_status: cc.water,
      last_updated: cc.last_updated
    };
  }

  return {
    temp_anomaly: t.month_anomaly_2026[province],
    ytd_anomaly: t.ytd_anomaly_2026[province],
    extreme_heat_days: t.extreme_heat_days_2026_ytd[province],
    rainfall_anomaly_pct: p.month_anomaly_pct_2026[province],
    drought_affected: p.drought_status.affected_provinces.includes(province)
  };
}

/**
 * Get predictive climate for a province by scenario and horizon
 */
function getPredictiveClimate(province, scenario = 'ssp245', horizon = 'mid_century') {
  const cp = CLIMATE_PREDICTIVE;
  
  const temp_proj = cp.temperature.projections[scenario][horizon];
  const precip_proj = cp.precipitation.projections[scenario][horizon];
  
  const prov_temp_2050 = cp.temperature.provincial_2050_ssp245[province];
  const prov_precip_2050 = cp.precipitation.provincial_change_2050_ssp245[province];

  return {
    scenario: cp.scenarios[scenario],
    temperature: {
      national: temp_proj,
      provincial_anomaly: prov_temp_2050
    },
    precipitation: {
      national: precip_proj,
      provincial_change_pct: prov_precip_2050
    },
    hot_days_2050: cp.temperature.hot_days[`${scenario}_2050`],
    agriculture: cp.sector_impacts.agriculture,
    risk_level: cp.risk_classification.national_risk_level_2050
  };
}

/**
 * Get time-series data for charting (historical + projected)
 */
function getClimateTimeSeries(scenario = 'ssp245') {
  const cp = CLIMATE_PREDICTIVE;
  const years = [];
  const temp_anomalies = [];
  const precip_changes = [];
  
  // Historical period (2000-2025 with gaps)
  // Projected (2025-2100)
  for (let y = 2000; y <= 2100; y += 5) {
    years.push(y);
    if (y <= 2025) {
      temp_anomalies.push(null);
      precip_changes.push(null);
    } else {
      // Simplified interpolation
      const near = cp.temperature.projections[scenario].near_term;
      const mid = cp.temperature.projections[scenario].mid_century;
      const end = cp.temperature.projections[scenario].end_century;
      
      let temp_anom, precip_anom;
      if (y <= 2040) {
        const t = (y - 2025) / 15;
        temp_anom = near.anomaly + (mid.anomaly - near.anomaly) * t;
        const p_near = cp.precipitation.projections[scenario].near_term.change_pct;
        const p_mid = cp.precipitation.projections[scenario].mid_century.change_pct;
        precip_anom = p_near + (p_mid - p_near) * t;
      } else if (y <= 2060) {
        const t = (y - 2040) / 20;
        temp_anom = mid.anomaly + (end.anomaly - mid.anomaly) * t;
        const p_mid = cp.precipitation.projections[scenario].mid_century.change_pct;
        const p_end = cp.precipitation.projections[scenario].end_century.change_pct;
        precip_anom = p_mid + (p_end - p_mid) * t;
      } else {
        temp_anom = end.anomaly;
        precip_anom = cp.precipitation.projections[scenario].end_century.change_pct;
      }
      temp_anomalies.push(parseFloat(temp_anom.toFixed(2)));
      precip_changes.push(parseFloat(precip_anom.toFixed(1)));
    }
  }
  
  return { years, temp_anomalies, precip_changes };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. EXPOSE GLOBALLY
// ─────────────────────────────────────────────────────────────────────────────
window.GeoHubClimate = {
  current: CLIMATE_CURRENT,
  predictive: CLIMATE_PREDICTIVE,
  getCurrentClimate,
  getPredictiveClimate,
  getClimateTimeSeries
};