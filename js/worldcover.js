// Sentinel Hub Custom Script for ESA WorldCover Land Cover Visualization
// Uses ColorMapVisualizer to display land cover classes

// WorldCover classification legend (ESA WorldCover v200, 2021)
// Based on user description: Tree cover, Shrubland, Grassland, Cropland, Built up, 
// Bare/sparse vegetation, Snow/Ice, Water bodies, Wetlands, Mangroves, Moss/lichen

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

// Evaluate the color map for each pixel
return colorMap.process(B01); // Using B01 as placeholder - in real script would use appropriate bands