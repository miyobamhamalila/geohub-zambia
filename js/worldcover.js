/**
 * GeoHub Zambia – ESA WorldCover Land Cover Visualization
 * ========================================================
 * Legend scale data for ESA WorldCover land cover classes.
 * This file provides classification data only — no runtime
 * visualization code (Sentinel Hub / GEE uses its own pipeline).
 */

// Legend scale for GEE layers
// Each entry: value -> { label, color, rgb }
var WORLDCOVER_SCALE = {
  10: { label: "Tree cover",             color: "#006400", rgb: [0x00, 0x64, 0x00] },
  20: { label: "Shrubland",              color: "#009600", rgb: [0x00, 0x96, 0x00] },
  30: { label: "Grassland",              color: "#00C800", rgb: [0x00, 0xC8, 0x00] },
  40: { label: "Cropland",               color: "#00D800", rgb: [0x00, 0xD8, 0x00] },
  50: { label: "Built up",               color: "#00E800", rgb: [0x00, 0xE8, 0x00] },
  60: { label: "Bare/sparse vegetation", color: "#00F800", rgb: [0x00, 0xF8, 0x00] },
  70: { label: "Snow/Ice",               color: "#00FF00", rgb: [0x00, 0xFF, 0x00] },
  80: { label: "Water bodies",           color: "#00FF64", rgb: [0x00, 0xFF, 0x64] },
  90: { label: "Wetlands",               color: "#00FFC8", rgb: [0x00, 0xFF, 0xC8] },
  95: { label: "Mangroves",              color: "#00FFFF", rgb: [0x00, 0xFF, 0xFF] },
  100: { label: "Moss/lichen",           color: "#64FFFF", rgb: [0x64, 0xFF, 0xFF] }
};

// WORLDCOVER_SCALE is available globally for legend rendering