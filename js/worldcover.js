// Sentinel Hub Custom Script for ESA WorldCover Land Cover Visualization
// Uses ColorMapVisualizer to display land cover classes

// WorldCover classification legend (ESA WorldCover v200, 2021)
// Based on user description: Tree cover, Shrubland, Grassland, Cropland, Built up, 
// Bare/sparse vegetation, Snow/Ice, Water bodies, Wetlands, Mangroves, Moss/lichen

// Legend scale for GEE layers
// Each entry: value -> [r, g, b]
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
  100: { label: "Moss/lichen",          color: "#64FFFF", rgb: [0x64, 0xFF, 0xFF] }
};

// Color map for visualization
var colorMap = new ColorMapVisualizer({
    // Class values and their corresponding colors
    // WorldCover classes: 10-110 in steps of 10
    10: [0x00, 0x64, 0x00],   // Tree cover - dark green
    20: [0x00, 0x96, 0x00],   // Shrubland - green
    30: [0x00, 0xC8, 0x00],   // Grassland - light green
    40: [0x00, 0xD8, 0x00],   // Cropland - very light green
    50: [0x00, 0xE8, 0x00],   // Built up - yellow-green
    60: [0x00, 0xF8, 0x00],   // Bare/sparse vegetation - light yellow
    70: [0x00, 0xFF, 0x00],   // Snow/Ice - yellow
    80: [0x00, 0xFF, 0x64],   // Water bodies - light blue-green
    90: [0x00, 0xFF, 0xC8],   // Wetlands - cyan
    95: [0x00, 0xFF, 0xFF],   // Mangroves - light cyan
    100: [0x64, 0xFF, 0xFF],  // Moss/lichen - blue-cyan
});

// Evaluate the color map for each pixel using the classification data
// For WorldCover, the data is a single-band classification layer
if (typeof data !== 'undefined' && typeof colorMap !== 'undefined') {
  colorMap.process(data);
}

// Export scale for external use
// WORLDCOVER_SCALE is available globally for legend rendering