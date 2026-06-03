import re

with open('map.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Step 1: Replace old geeScale CSS with new CSS
old_css_start = '    /* ── GEE DATA SCALE BAR (colour gradient + value labels) ── */'
old_css_end = '    .gee-scale-axis{margin-bottom:9px;}'

new_css = """    /* ── GEE LEGEND PANEL (colour gradient + class swatches) ── */
    #geeScale{position:fixed;right:12px;bottom:84px;z-index:400;
      background:rgba(9,28,13,.94);border:1px solid var(--border);border-radius:9px;
      padding:9px 13px 9px;backdrop-filter:blur(10px);display:none;min-width:220px;max-width:260px;
      box-shadow:0 6px 24px rgba(0,0,0,.5);transition:right .25s ease;
    }
    body.sidebar-collapsed #geeScale{right:12px;}
    #geeScale .gee-header{display:flex;align-items:center;gap:6px;margin-bottom:7px;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,.08);}
    #geeScale .gee-header .gee-ico{width:20px;height:20px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:.68rem;flex-shrink:0;}
    #geeScale .gee-header h4{font-size:.64rem;font-weight:800;color:var(--g5);text-transform:uppercase;letter-spacing:.6px;flex:1;margin:0;}
    #geeScale .gee-header .gee-sub{font-size:.57rem;color:var(--muted);font-weight:500;}
    .gee-legend-gradient{margin-bottom:6px;}
    .gee-gradient-bar{height:14px;border-radius:4px;margin-bottom:3px;border:1px solid rgba(255,255,255,.1);}
    .gee-gradient-labels{display:flex;justify-content:space-between;font-size:.58rem;font-weight:600;color:rgba(255,255,255,.7);margin-bottom:2px;}
    .gee-gradient-labels .gee-tick{text-align:center;white-space:nowrap;}
    .gee-gradient-labels .gee-tick-min{text-align:left;}
    .gee-gradient-labels .gee-tick-max{text-align:right;}
    .gee-gradient-labels .gee-tick-mid{text-align:center;}
    .gee-gradient-unit{font-size:.55rem;color:var(--muted);text-align:right;margin-top:1px;}
    .gee-legend-classes{}
    .gee-class-row{display:flex;align-items:center;gap:7px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.04);}
    .gee-class-row:last-child{border-bottom:none;}
    .gee-class-swatch{width:14px;height:10px;border-radius:2px;flex-shrink:0;border:1px solid rgba(255,255,255,.12);}
    .gee-class-label{font-size:.66rem;color:rgba(255,255,255,.8);flex:1;}
    .gee-class-val{font-size:.6rem;color:var(--muted);text-align:right;}
    .gee-type-badge{display:inline-block;font-size:.5rem;font-weight:700;padding:1px 5px;border-radius:3px;text-transform:uppercase;letter-spacing:.4px;}
    .gee-type-grad{background:rgba(56,189,248,.15);color:#7dd3fc;border:1px solid rgba(56,189,248,.25);}
    .gee-type-class{background:rgba(74,222,128,.15);color:#86efac;border:1px solid rgba(74,222,128,.25);}
    .gee-footer{border-top:1px solid rgba(255,255,255,.06);margin-top:6px;padding-top:5px;display:flex;justify-content:space-between;align-items:center;}
    .gee-footer .gee-source{font-size:.55rem;color:var(--muted);}
    .gee-footer .gee-close-btn{background:none;border:none;color:var(--muted);cursor:pointer;font-size:.6rem;padding:2px 6px;border-radius:4px;transition:all .15s;}
    .gee-footer .gee-close-btn:hover{color:#fff;background:rgba(255,255,255,.08);}"""

old_css_idx = content.find(old_css_start)
if old_css_idx >= 0:
    old_css_end_idx = content.find(old_css_end, old_css_idx) + len(old_css_end)
    content = content[:old_css_idx] + new_css + content[old_css_end_idx:]
    print("CSS replaced successfully")
else:
    print("CSS NOT FOUND - already replaced?")

# Step 2: Replace the old geeScale HTML with new HTML
old_html = """<!-- GEE DATA COLOUR SCALE BAR -->
<div id="geeScale">
  <h4><i class="fas fa-ruler-combined"></i>Rainfall (CHIRPS)</h4>
  <div class="gee-scale-grad"></div>
  <div class="gee-scale-ticks"><span>0 mm</span><span>2000 mm</span></div>
</div>"""

new_html = """<!-- GEE LEGEND PANEL (colour gradient + class swatches) -->
<div id="geeScale">
  <div class="gee-header">
    <div class="gee-ico" id="gee-legend-icon" style="background:rgba(76,175,80,.15);">&#x1f6f0;</div>
    <h4 id="gee-legend-title">GEE Layer</h4>
    <span class="gee-type-badge gee-type-class" id="gee-legend-badge" style="display:none;">GRADIENT</span>
  </div>
  <div id="gee-legend-body">
    <!-- Gradient legend (default) -->
    <div class="gee-legend-gradient" id="gee-legend-gradient">
      <div class="gee-gradient-bar" id="gee-gradient-bar"></div>
      <div class="gee-gradient-labels" id="gee-gradient-labels">
        <span class="gee-tick gee-tick-min" id="gee-grad-min">0</span>
        <span class="gee-tick gee-tick-mid" id="gee-grad-mid"></span>
        <span class="gee-tick gee-tick-max" id="gee-grad-max">100</span>
      </div>
      <div class="gee-gradient-unit" id="gee-gradient-unit"></div>
    </div>
    <!-- Class-based legend (hidden by default) -->
    <div class="gee-legend-classes" id="gee-legend-classes" style="display:none;"></div>
  </div>
  <div class="gee-footer">
    <span class="gee-source" id="gee-legend-source">Google Earth Engine</span>
    <button class="gee-close-btn" onclick="document.getElementById('geeScale').style.display='none'"><i class="fas fa-times"></i></button>
  </div>
</div>"""

if old_html in content:
    content = content.replace(old_html, new_html)
    print("HTML replaced successfully")
else:
    print("HTML NOT FOUND - already replaced?")

    # Find any div with id="geeScale"
    import re
    matches = list(re.finditer(r'<!--.*?-->|<div[^>]*id=["\']geeScale["\'][^>]*>', content))
    for m in matches:
        print(f"Found near: {m.group()[:100]}")

# Step 3: Replace showGEEScale function with new enhanced version
old_func_start = "// ── GEE Colour Scale helper ────────────────────────────────────────────────"
old_func_end = "function escHtml"

new_func = """// ── GEE Legend definitions for each GEE dataset (class-based + gradient) ─────
const GEE_LEGEND_DEFS = {
  lulc: {
    type: 'classes', icon: '🌿', title: 'Land Use / Land Cover',
    classes: [
      { color:'#05450a', label:'Evergreen needleleaf forests' },
      { color:'#086a10', label:'Evergreen broadleaf forests' },
      { color:'#54a708', label:'Deciduous needleleaf forests' },
      { color:'#78d203', label:'Deciduous broadleaf forests' },
      { color:'#009900', label:'Mixed forests' },
      { color:'#c6b044', label:'Closed shrublands' },
      { color:'#dcd159', label:'Open shrublands' },
      { color:'#dade48', label:'Woody savannas' },
      { color:'#fbff13', label:'Savannas' },
      { color:'#b6ff05', label:'Grasslands' },
      { color:'#27ff87', label:'Permanent wetlands' },
      { color:'#c24f44', label:'Croplands' },
      { color:'#a5a5a5', label:'Urban & built-up' },
      { color:'#ff6d4c', label:'Cropland/natural mosaic' },
      { color:'#69fff8', label:'Snow & ice' },
      { color:'#f9ffa4', label:'Barren / sparse' },
      { color:'#1c0dff', label:'Water bodies' }
    ]
  },
  ndvi: {
    type: 'gradient', icon: '🌱', title: 'NDVI (Vegetation Index)',
    stops: ['#ce7e45','#df923d','#f1b555','#fcd163','#99b718','#74a901','#66a000','#529400','#3e8601','#207401','#056201','#004c00'],
    labels: ['0.1','0.2','0.3','0.4','0.5','0.6','0.7','0.8'],
    source: 'MODIS / Sentinel-2'
  },
  chirps: {
    type: 'gradient', icon: '🌧️', title: 'Rainfall (CHIRPS)',
    stops: ['#fff7fb','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b'],
    labels: ['0 mm','500 mm','1000 mm','1500 mm','2000 mm'],
    source: 'Climate Hazards Group'
  },
  lst: {
    type: 'gradient', icon: '🌡️', title: 'Land Surface Temperature',
    stops: ['#040274','#040281','#0502a3','#0502b8','#0602ff','#235cb1','#307ef3','#269db1','#30c8e2','#32d3ef','#3be285','#3ff38f','#86e26f','#3ae237','#b5e22e','#d6e21f','#fff705','#ffd611','#ffb613','#ff8b13','#ff6e08','#ff500d','#ff000d','#de0101','#c21301','#a71001','#911003'],
    labels: ['15°C','20°C','25°C','30°C','35°C','40°C','45°C','50°C'],
    source: 'MODIS LST 8-day composite'
  },
  drought: {
    type: 'classes', icon: '🏜️', title: 'Drought Risk (VCI)',
    classes: [
      { color:'#a50026', label:'Extreme Drought (0-10)' },
      { color:'#d73027', label:'Severe Drought (10-20)' },
      { color:'#f46d43', label:'Moderate Drought (20-30)' },
      { color:'#fdae61', label:'Abnormally Dry (30-40)' },
      { color:'#fee08b', label:'Near Normal (40-50)' },
      { color:'#ffffbf', label:'Normal (50-60)' },
      { color:'#d9ef8b', label:'Slightly Wet (60-70)' },
      { color:'#a6d96a', label:'Moderately Wet (70-80)' },
      { color:'#66bd63', label:'Very Wet (80-90)' },
      { color:'#1a9850', label:'Extremely Wet (90-100)' }
    ]
  },
  flood: {
    type: 'classes', icon: '🌊', title: 'Flood / Surface Water',
    classes: [
      { color:'#1a75ff', label:'Water / Flood detected' }
    ]
  }
};

// ── Enhanced GEE Legend (supports gradient AND class-based legends) ────────────
function showGEEScale(data) {
  var dataset  = data.dataset || '';
  var label    = data.label  || 'GEE Layer';
  var palette  = data.palette || [];
  var valMin   = typeof data.min === 'number' ? data.min : null;
  var valMax   = typeof data.max === 'number' ? data.max : null;
  var units    = data.units || '';

  var def = GEE_LEGEND_DEFS[dataset] || null;

  var el = document.getElementById('geeScale');
  el.style.display = 'block';

  // --- Header ---
  var ico  = def ? def.icon : '🛰️';
  var icBg = dataset === 'lulc'     ? 'rgba(5,69,10,.2)' :
             dataset === 'ndvi'     ? 'rgba(0,76,0,.2)' :
             dataset === 'chirps'   ? 'rgba(3,78,123,.2)' :
             dataset === 'lst'      ? 'rgba(145,16,3,.2)' :
             dataset === 'drought'  ? 'rgba(165,0,38,.2)' :
             dataset === 'flood'    ? 'rgba(26,117,255,.2)' :
             'rgba(76,175,80,.15)';

  document.getElementById('gee-legend-icon').textContent = ico;
  document.getElementById('gee-legend-icon').style.background = icBg;
  document.getElementById('gee-legend-title').textContent = label;

  var badgeEl = document.getElementById('gee-legend-badge');
  if (def && def.type === 'classes') {
    badgeEl.textContent = 'CLASSES';
    badgeEl.className = 'gee-type-badge gee-type-class';
    badgeEl.style.display = 'inline-block';
  } else if (def && def.type === 'gradient') {
    badgeEl.textContent = 'GRADIENT';
    badgeEl.className = 'gee-type-badge gee-type-grad';
    badgeEl.style.display = 'inline-block';
  } else {
    badgeEl.style.display = 'none';
  }

  document.getElementById('gee-legend-source').textContent = def ? (def.source || 'Google Earth Engine') : 'Google Earth Engine';

  var gradBody  = document.getElementById('gee-legend-gradient');
  var classBody = document.getElementById('gee-legend-classes');

  if (def && def.type === 'classes') {
    gradBody.style.display  = 'none';
    classBody.style.display = 'block';

    classBody.innerHTML = def.classes.map(function(c) {
      return '<div class="gee-class-row">' +
        '<span class="gee-class-swatch" style="background:' + c.color + ';"></span>' +
        '<span class="gee-class-label">' + escHtml(c.label) + '</span>' +
        (c.val ? '<span class="gee-class-val">' + escHtml(c.val) + '</span>' : '') +
        '</div>';
    }).join('');
  } else {
    gradBody.style.display  = 'block';
    classBody.style.display = 'none';

    var hex  = palette.length > 0 ? palette : (def ? def.stops : ['#aaa']);
    var grad = hex.join(', ');
    document.getElementById('gee-gradient-bar').style.background = 'linear-gradient(to right,' + grad + ')';

    var labels = [];
    if (def && def.labels) {
      labels = def.labels;
    } else {
      var minL = (valMin !== null) ? strVal(valMin) + ' ' + units : (hex[0] || '');
      var maxL = (valMax !== null) ? strVal(valMax) + ' ' + units : (hex[hex.length-1] || '');
      var midL = (valMin !== null && valMax !== null) ? strVal((valMin + valMax) / 2) + ' ' + units : '';
      labels = [minL.trim(), midL.trim(), maxL.trim()];
    }

    var labEl = document.getElementById('gee-gradient-labels');
    if (labels.length <= 3) {
      labEl.innerHTML =
        '<span class="gee-tick gee-tick-min">' + escHtml(labels[0] || '') + '</span>' +
        '<span class="gee-tick gee-tick-mid">' + escHtml(labels[1] || '') + '</span>' +
        '<span class="gee-tick gee-tick-max">' + escHtml(labels[labels.length-1] || '') + '</span>';
    } else {
      labEl.innerHTML = labels.map(function(l) {
        return '<span class="gee-tick">' + escHtml(l) + '</span>';
      }).join('');
    }

    document.getElementById('gee-gradient-unit').textContent = units ? 'Unit: ' + units : '';
  }
}

"""

old_func_idx = content.find(old_func_start)
if old_func_idx >= 0:
    func_end_idx = content.find("function escHtml", old_func_idx)
    if func_end_idx >= 0:
        content = content[:old_func_idx] + new_func + content[func_end_idx:]
        print("showGEEScale function replaced successfully")
    else:
        print("Could not find end of old function")
else:
    print("showGEEScale function NOT FOUND")
    # Check for new version
    if "GEE_LEGEND_DEFS" in content:
        print("New version already exists")

with open('map.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")