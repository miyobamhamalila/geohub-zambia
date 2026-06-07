/**
 * GeoHub Zambia — Interactive Tutorial & Onboarding System v1.0
 * ==============================================================
 * Walks users through all major features of the platform with
 * step-by-step guided tours, tooltips, and a help hub.
 */

const GeoHubTutorial = (() => {
    'use strict';

    // ─────────────────────────────────────────────────────────────
    // TOUR DEFINITIONS
    // ─────────────────────────────────────────────────────────────

    // ── Dashboard Tour ────────────────────────────────────────────
    const DASHBOARD_TOUR = [
        {
            title: '👋 Welcome to GeoHub Zambia!',
            content: 'This is your <strong>National Spatial Data Platform</strong> — a comprehensive GIS dashboard for all 116 districts across 10 provinces.<br><br>Let\'s take a quick tour of the key features!',
            icon: '🌍',
            position: 'center',
            highlight: null
        },
        {
            title: '📊 Key Statistics',
            content: 'The <strong>Stats Cards</strong> at the top show you key national metrics at a glance:<br><br>• 116 Districts Mapped<br>• 752,612 km² Total Area<br>• 20M Population<br>• Land Surface Temperature data<br><br><em>Hover over any card for more details.</em>',
            icon: '📊',
            position: 'top',
            highlight: '.stats8'
        },
        {
            title: '⚡ Quick Actions',
            content: 'The <strong>Quick Action Buttons</strong> give you one-click access to:<br><br>• 🗺️ Map Viewer — Full interactive map<br>• 📈 Analytics — Charts & insights<br>• 📤 Upload Data — GeoJSON, CSV, SHP<br>• 🔄 Coordinate Converter — DD/DMS/UTM/MGRS<br>• 📏 Measurement Tools<br>• 🌡️ Temperature Data (LST 2022-2025)',
            icon: '⚡',
            position: 'bottom',
            highlight: '.qa-grid'
        },
        {
            title: '📈 Charts & Visualizations',
            content: 'The dashboard contains <strong>interactive charts</strong> powered by Chart.js:<br><br>• 🌲 Land Cover Donut Chart<br>• 🌳 Forest Cover Trends<br>• 🌧️ Monthly Rainfall Comparisons<br>• 👥 Population by Province<br><br><em>Click, hover, or toggle chart types to explore data.</em>',
            icon: '📈',
            position: 'top',
            highlight: '.row3'
        },
        {
            title: '🌡️ Land Surface Temperature',
            content: 'The <strong>Temperature Module</strong> is one of our newest features:<br><br>• 📊 Monthly LST charts by province<br>• 🔥 Heatmap comparisons across years<br>• 📋 Detailed data tables with CSV export<br>• 🗺️ Temperature overlay on the mini-map<br>• 📈 Multi-year trend analysis (2022-2025)<br><br>Switch between provinces and years to explore!',
            icon: '🌡️',
            position: 'top',
            highlight: '#tempSection'
        },
        {
            title: '🗺️ Interactive Mini-Map',
            content: 'The built-in <strong>Mini-Map</strong> includes:<br><br>• 116 district markers with popup info<br>• 4 basemaps: Street, Satellite, Terrain, Dark<br>• 9 overlay layers (Districts, Water, Mining, Temperature, etc.)<br>• Real-time coordinate display on mouseover<br>• Province labels with temperature overlay<br>• Color districts by Province, Population, or Area<br><br><em>Click any district to see full details!</em>',
            icon: '🗺️',
            position: 'left',
            highlight: '.map-section'
        },
        {
            title: '📍 Coordinate System',
            content: 'GeoHub supports <strong>4 coordinate formats</strong>:<br><br>• <strong>DD</strong> — Decimal Degrees (WGS 84)<br>• <strong>DMS</strong> — Degrees Minutes Seconds<br>• <strong>UTM</strong> — Universal Transverse Mercator<br>• <strong>MGRS</strong> — Military Grid Reference System<br><br>Use the coordinate widget to quickly convert between formats for major Zambia cities. The Map Viewer has an even more powerful converter!',
            icon: '📍',
            position: 'right',
            highlight: '.coord-widget'
        },
        {
            title: '🚀 GeoHub Features Hub',
            content: 'Click the <strong>green rocket button</strong> (🚀) at the bottom-right to access our premium features:<br><br>• 🤖 AI Chat Assistant<br>• 📊 Compare Districts<br>• 📄 Export PDF Reports<br>• 🌤️ Weather Alerts<br>• ⌨️ Keyboard Shortcuts<br>• 🌐 Multi-Language (EN/NY/BE)<br>• 📖 Data Storytelling<br>• 🚜 Agriculture Hub<br>• 💧 Water Bodies & More!',
            icon: '🚀',
            position: 'bottom-right',
            highlight: '#ghzFeaturesBtn'
        },
        {
            title: '🚜 Agriculture Hub',
            content: 'Our <strong>Agriculture Module</strong> provides Zambian farmers and planners with:<br><br>• 🌽 Crop Suitability Engine (8 crops)<br>• 📊 Yield Predictions<br>• 🧪 Fertilizer Recommendations<br>• 🗺️ 21 Agricultural Zones<br>• 📈 Market Prices (FRA, Cotton Board)<br>• 💧 Irrigation Potential<br>• 🐛 Pest & Disease Alerts<br>• 🌱 Soil Type Database (12 types)<br><br><em>Essential for agricultural planning!</em>',
            icon: '🚜',
            position: 'right',
            highlight: '.ds-grid'
        },
        {
            title: '🎯 Keyboard Shortcuts',
            content: 'Press <kbd>?</kbd> anytime to view all shortcuts:<br><br>• <kbd>Shift+D</kbd> → Dashboard<br>• <kbd>Shift+M</kbd> → Map Viewer<br>• <kbd>Shift+A</kbd> → Analytics<br>• <kbd>Shift+C</kbd> → Compare Districts<br>• <kbd>Shift+H</kbd> → AI Chat<br>• <kbd>Shift+L</kbd> → Language<br>• <kbd>Shift+K</kbd> → Data Story<br>• <kbd>Shift+W</kbd> → Weather<br>• <kbd>F11</kbd> → Fullscreen<br><br><strong>Pro tip:</strong> Use keyboard shortcuts for faster navigation!',
            icon: '⌨️',
            position: 'center',
            highlight: null
        },
        {
            title: '🎉 You\'re Ready!',
            content: 'You\'ve completed the GeoHub Zambia tour! Here\'s a quick recap:<br><br>✅ Dashboard with live statistics & charts<br>✅ Temperature data (LST 2022-2025)<br>✅ Interactive map with 9+ layers<br>✅ Coordinate converter (DD/DMS/UTM/MGRS)<br>✅ AI Assistant & District Comparison<br>✅ Agriculture Intelligence & Reports<br>✅ Multi-language support<br><br><strong>Start exploring your data now!</strong> 🌍',
            icon: '🎉',
            position: 'center',
            highlight: null,
            final: true
        }
    ];

    // ── Map Viewer Tour ──────────────────────────────────────────
    const MAP_TOUR = [
        {
            title: '🗺️ Map Viewer Overview',
            content: 'Welcome to the <strong>GeoHub Map Viewer</strong> — a full-featured GIS platform with district polygons, satellite imagery, and advanced analysis tools.',
            icon: '🗺️',
            position: 'center',
            highlight: null
        },
        {
            title: '📋 Layer Controls',
            content: 'On the left sidebar, you can toggle <strong>11 data layers</strong>:<br><br>• Districts (116 polygons)<br>• Province Labels<br>• Water Bodies (12 features)<br>• Mining Sites (6)<br>• Capitals<br>• Population Heatmap<br>• Temperature Overlay<br>• Coordinate Grid<br>• Plus WMS overlays<br><br>Each layer can be toggled on/off and has adjustable opacity!',
            icon: '📋',
            position: 'left',
            highlight: '#layerList'
        },
        {
            title: '🔍 Search & Navigation',
            content: 'Use the <strong>search bar</strong> to find any district or place of interest. You can also:<br><br>• 🖱️ Click any district for full info popup<br>• 🔄 Use mouse wheel to zoom<br>• 🗺️ Switch basemaps (Street/Satellite/Terrain/Dark)<br>• 📍 View real-time coordinates at bottom<br><br>Try searching "Lusaka" or "Livingstone"!',
            icon: '🔍',
            position: 'left',
            highlight: '.sb-search'
        },
        {
            title: '📐 Analysis Tools',
            content: 'The <strong>Analysis Tools</strong> panel provides advanced GIS capabilities:<br><br>• 📏 Measure Distance<br>• 📐 Measure Area (click-to-draw polygons)<br>• 🔵 Point Buffer Analysis<br>• 🔎 Spatial Query<br>• ⏳ Temporal Analysis<br>• ⭐ Suitability Analysis<br>• ✂️ Draw & Clip<br>• 📂 Load Files (SHP/GeoJSON/KML/TIF)<br>• 📋 Attribute Table<br>• 🌊 Flood Prediction<br>• 🏗️ Climate-Resilient Construction',
            icon: '📐',
            position: 'left',
            highlight: '.tool-grid'
        },
        {
            title: '🌍 Earth Engine Layers',
            content: 'Load <strong>Google Earth Engine datasets</strong> directly onto the map:<br><br>• 🌿 Land Use/Land Cover<br>• 🍃 NDVI Vegetation Index<br>• 🌧️ CHIRPS Rainfall<br>• 🌡️ Land Surface Temperature<br>• 🏜️ Drought Risk (VCI)<br>• 🌊 Flood / Surface Water<br><br>Select a year and click the dataset — GEE generates a tile layer in real-time!',
            icon: '🌍',
            position: 'left',
            highlight: '[id^="gee-"]'
        },
        {
            title: '🔄 Coordinate Converter',
            content: 'The powerful <strong>Coordinate Converter</strong> supports all formats:<br><br>• DD ↔ DMS ↔ UTM ↔ MGRS<br>• Preset locations (Lusaka, Livingstone, etc.)<br>• Load current cursor position<br>• Convert between all formats simultaneously<br>• Copy results to clipboard<br>• Fly-to button to navigate to any location!',
            icon: '🔄',
            position: 'right',
            highlight: '#coordConverter'
        },
    ];

    // ─────────────────────────────────────────────────────────────
    // STATE
    // ─────────────────────────────────────────────────────────────
    let _activeTour = null;       // 'dashboard' | 'map' | null
    let _currentStep = 0;
    let _tourSteps = [];
    let _overlay = null;
    let _tooltip = null;
    let _highlightBox = null;
    let _isRunning = false;

    // ─────────────────────────────────────────────────────────────
    // TOUR UI ELEMENTS
    // ─────────────────────────────────────────────────────────────

    function createOverlay() {
        if (!_overlay) {
            _overlay = document.createElement('div');
            _overlay.id = 'ghz-tour-overlay';
            _overlay.style.cssText = `
                position: fixed; inset: 0; z-index: 99999;
                background: rgba(0,0,0,0.55);
                backdrop-filter: blur(4px);
                display: none;
                transition: opacity .3s ease;
            `;
            document.body.appendChild(_overlay);
        }
        return _overlay;
    }

    function makeElementDraggable(el, handleSelector) {
        if (!el) return;
        let handle = handleSelector ? el.querySelector(handleSelector) : el;
        if (!handle) {
            handle = el;
        }
        if (!handle) return;
        handle.style.cursor = 'grab';
        handle.style.userSelect = 'none';

        let rect = null;
        let startX = 0;
        let startY = 0;
        let startLeft = 0;
        let startTop = 0;

        handle.addEventListener('pointerdown', function(e) {
            if (e.button !== 0) return;
            e.preventDefault();
            rect = el.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            startLeft = rect.left;
            startTop = rect.top;
            el.style.transition = 'none';
            el.setPointerCapture?.(e.pointerId);

            function onPointerMove(evt) {
                const dx = evt.clientX - startX;
                const dy = evt.clientY - startY;
                const width = rect.width;
                const height = rect.height;
                let nextLeft = startLeft + dx;
                let nextTop = startTop + dy;
                nextLeft = Math.min(Math.max(nextLeft, 10), window.innerWidth - width - 10);
                nextTop = Math.min(Math.max(nextTop, 10), window.innerHeight - height - 10);
                el.style.left = nextLeft + 'px';
                el.style.top = nextTop + 'px';
                el.style.right = 'auto';
            }

            function onPointerUp() {
                el.style.transition = '';
                document.removeEventListener('pointermove', onPointerMove);
                document.removeEventListener('pointerup', onPointerUp);
            }

            document.addEventListener('pointermove', onPointerMove);
            document.addEventListener('pointerup', onPointerUp);
        });
    }

    function createTooltip() {
        if (!_tooltip) {
            _tooltip = document.createElement('div');
            _tooltip.id = 'ghz-tour-tooltip';
            _tooltip.style.cssText = `
                position: fixed; z-index: 100000;
                background: rgba(6,15,10,.98);
                border: 1px solid rgba(76,175,80,.3);
                border-radius: 14px;
                backdrop-filter: blur(16px);
                box-shadow: 0 12px 48px rgba(0,0,0,.7);
                display: none;
                font-family: 'Inter', system-ui, sans-serif;
                max-width: 480px;
                width: 90vw;
                overflow: hidden;
                transition: opacity .25s ease, transform .25s cubic-bezier(.16,1,.3,1);
                transform: translateY(10px);
                opacity: 0;
                cursor: grab;
                user-select: none;
            `;
            document.body.appendChild(_tooltip);
            makeElementDraggable(_tooltip, '.ghz-tour-tooltip-head');
        }
        return _tooltip;
    }

    function createHighlight() {
        if (!_highlightBox) {
            _highlightBox = document.createElement('div');
            _highlightBox.id = 'ghz-tour-highlight';
            _highlightBox.style.cssText = `
                position: fixed; z-index: 99999;
                border: 3px solid #4CAF50;
                border-radius: 10px;
                box-shadow: 0 0 0 4px rgba(76,175,80,.25), 0 0 30px rgba(76,175,80,.15);
                display: none;
                pointer-events: none;
                transition: all .35s cubic-bezier(.16,1,.3,1);
            `;
            document.body.appendChild(_highlightBox);
        }
        return _highlightBox;
    }

    function buildTooltipContent(step, index, total) {
        const isLast = step.final || index === total - 1;
        return `
            <div style="padding: 0;">
                <div class="ghz-tour-tooltip-head" style="background: linear-gradient(135deg, rgba(26,107,53,.2), rgba(45,158,95,.08));
                    padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,.06);
                    display: flex; align-items: center; gap: 10px; cursor: grab; user-select: none;">
                    <span style="font-size: 1.3rem; flex-shrink: 0;">${step.icon || '🌍'}</span>
                    <div style="flex: 1;">
                        <div style="font-weight: 800; font-size: .85rem; color: #fff;">${step.title}</div>
                        <div style="font-size: .65rem; color: rgba(255,255,255,.4);">Step ${index+1} of ${total}</div>
                    </div>
                    <button onclick="GeoHubTutorial.endTour()" style="background: none; border: none; color: rgba(255,255,255,.35); cursor: pointer; font-size: 1rem; padding: 2px 5px; border-radius: 5px; transition: all .15s;"
                        onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.35)'"
                        title="Close tour">&times;</button>
                </div>
                <div style="padding: 16px 18px;">
                    <div style="font-size: .78rem; line-height: 1.7; color: rgba(255,255,255,.85);">
                        ${step.content}
                    </div>
                </div>
                <div style="padding: 10px 14px; background: rgba(0,0,0,.2); border-top: 1px solid rgba(255,255,255,.05);
                    display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; gap: 4px;">
                        ${Array.from({length: total}, (_, i) =>
                            `<div style="width: ${i === index ? '18px' : '6px'}; height: 6px;
                                border-radius: ${i === index ? '4px' : '3px'};
                                background: ${i === index ? '#4CAF50' : 'rgba(255,255,255,.2)'};
                                transition: all .3s;"></div>`
                        ).join('')}
                    </div>
                    <div style="display: flex; gap: 6px;">
                        ${index > 0 ? `<button onclick="GeoHubTutorial.prevStep()" style="padding: 6px 12px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 7px; color: rgba(255,255,255,.7); font-size: .7rem; font-weight: 700; cursor: pointer; font-family: Inter; transition: all .15s;"
                            onmouseover="this.style.background='rgba(255,255,255,.12)'" onmouseout="this.style.background='rgba(255,255,255,.06)'"><i class="fas fa-arrow-left"></i> Back</button>` : ''}
                        ${isLast
                            ? `<button onclick="GeoHubTutorial.endTour()" style="padding: 6px 16px; background: linear-gradient(135deg, #1a6b35, #2d9e5f); border: none; border-radius: 7px; color: #fff; font-size: .7rem; font-weight: 800; cursor: pointer; font-family: Inter; box-shadow: 0 2px 8px rgba(26,107,53,.3);"><i class="fas fa-check"></i> Complete</button>`
                            : `<button onclick="GeoHubTutorial.nextStep()" style="padding: 6px 14px; background: linear-gradient(135deg, #1a6b35, #2d9e5f); border: none; border-radius: 7px; color: #fff; font-size: .7rem; font-weight: 800; cursor: pointer; font-family: Inter; box-shadow: 0 2px 8px rgba(26,107,53,.3);">Next <i class="fas fa-arrow-right"></i></button>`
                        }
                    </div>
                </div>
            </div>
        `;
    }

    // ─────────────────────────────────────────────────────────────
    // TOUR NAVIGATION
    // ─────────────────────────────────────────────────────────────
    function startTour(tourName) {
        if (_isRunning) endTour();
        _isRunning = true;

        if (tourName === 'dashboard') {
            _activeTour = 'dashboard';
            _tourSteps = DASHBOARD_TOUR;
        } else if (tourName === 'map') {
            _activeTour = 'map';
            _tourSteps = MAP_TOUR;
        } else if (tourName === 'quick') {
            // Quick tour (shorter version)
            _activeTour = 'dashboard';
            _tourSteps = [
                DASHBOARD_TOUR[0],
                DASHBOARD_TOUR[1],
                DASHBOARD_TOUR[4],
                DASHBOARD_TOUR[5],
                DASHBOARD_TOUR[7],
                DASHBOARD_TOUR[10]
            ];
        } else {
            return;
        }

        _currentStep = 0;
        createOverlay();
        createTooltip();
        createHighlight();

        _overlay.style.display = 'block';
        _overlay.style.opacity = '0';
        setTimeout(() => { _overlay.style.opacity = '1'; }, 10);

        showStep(_currentStep);
        GeoHubAuth?.addAuditLog('TUTORIAL_START', `Started ${tourName} tour`, GeoHubAuth.getSession()?.id);
    }

    function endTour() {
        _isRunning = false;
        _activeTour = null;
        _currentStep = 0;

        if (_overlay) {
            _overlay.style.opacity = '0';
            setTimeout(() => { _overlay.style.display = 'none'; }, 300);
        }
        if (_tooltip) { _tooltip.style.display = 'none'; }
        if (_highlightBox) { _highlightBox.style.display = 'none'; }

        // Re-enable body scroll if needed
        document.body.style.overflow = '';

        GeoHubAuth?.addAuditLog('TUTORIAL_END', 'Completed tour', GeoHubAuth.getSession()?.id);
    }

    function nextStep() {
        if (_currentStep < _tourSteps.length - 1) {
            _currentStep++;
            showStep(_currentStep);
            // Scroll to element if needed
            const step = _tourSteps[_currentStep];
            if (step.highlight) {
                const el = document.querySelector(step.highlight);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        } else {
            endTour();
        }
    }

    function prevStep() {
        if (_currentStep > 0) {
            _currentStep--;
            showStep(_currentStep);
            const step = _tourSteps[_currentStep];
            if (step.highlight) {
                const el = document.querySelector(step.highlight);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    }

    function showStep(index) {
        const step = _tourSteps[index];
        if (!step) return;

        // Remove highlight from all tooltips
        document.querySelectorAll('.ghz-tour-pulse').forEach(e => e.remove());

        // Build and show tooltip
        _tooltip.innerHTML = buildTooltipContent(step, index, _tourSteps.length);
        _tooltip.style.display = 'block';

        // Position tooltip based on step.position + highlight element
        positionTooltip(step);

        // Handle highlight box
        if (step.highlight) {
            const el = document.querySelector(step.highlight);
            if (el) {
                const rect = el.getBoundingClientRect();
                _highlightBox.style.display = 'block';
                _highlightBox.style.left = (rect.left - 6) + 'px';
                _highlightBox.style.top = (rect.top - 6) + 'px';
                _highlightBox.style.width = (rect.width + 12) + 'px';
                _highlightBox.style.height = (rect.height + 12) + 'px';
                // Add pulse animation
                const pulse = document.createElement('div');
                pulse.className = 'ghz-tour-pulse';
                pulse.style.cssText = `
                    position: fixed; left: ${rect.left - 10}px; top: ${rect.top - 10}px;
                    width: ${rect.width + 20}px; height: ${rect.height + 20}px;
                    border-radius: 14px; pointer-events: none; z-index: 99998;
                    border: 2px solid rgba(76,175,80,.3);
                    animation: tourPulse 2s infinite;
                `;
                document.body.appendChild(pulse);
                // Add keyframes if not exists
                if (!document.getElementById('ghz-tour-keyframes')) {
                    const style = document.createElement('style');
                    style.id = 'ghz-tour-keyframes';
                    style.textContent = `
                        @keyframes tourPulse {
                            0%, 100% { opacity: 1; transform: scale(1); }
                            50% { opacity: .5; transform: scale(1.03); }
                        }
                    `;
                    document.head.appendChild(style);
                }
            } else {
                _highlightBox.style.display = 'none';
            }
        } else {
            _highlightBox.style.display = 'none';
        }

        // Fade in
        setTimeout(() => {
            _tooltip.style.opacity = '1';
            _tooltip.style.transform = 'translateY(0)';
        }, 50);
    }

    function positionTooltip(step) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const tW = Math.min(480, vw * 0.9);
        let left, top;

        switch (step.position) {
            case 'center':
                left = (vw - tW) / 2;
                top = vh / 2 - 180;
                break;
            case 'top':
                left = (vw - tW) / 2;
                top = 20;
                break;
            case 'bottom':
                left = (vw - tW) / 2;
                top = vh - 280;
                break;
            case 'left':
                left = 20;
                top = vh / 2 - 150;
                break;
            case 'right':
                left = vw - tW - 20;
                top = vh / 2 - 150;
                break;
            case 'bottom-right':
                left = vw - tW - 20;
                top = vh - 320;
                break;
            default:
                left = (vw - tW) / 2;
                top = vh / 2 - 180;
        }

        // If there's a highlight element, position tooltip relative to it
        if (step.highlight) {
            const el = document.querySelector(step.highlight);
            if (el) {
                const rect = el.getBoundingClientRect();
                switch (step.position) {
                    case 'top':
                        top = rect.bottom + 16;
                        left = Math.min(Math.max(rect.left + rect.width / 2 - tW / 2, 10), vw - tW - 10);
                        break;
                    case 'bottom':
                        top = rect.top - 270;
                        left = Math.min(Math.max(rect.left + rect.width / 2 - tW / 2, 10), vw - tW - 10);
                        break;
                    case 'left':
                        top = Math.min(Math.max(rect.top + rect.height / 2 - 150, 10), vh - 320);
                        left = rect.right + 16;
                        break;
                    case 'right':
                        top = Math.min(Math.max(rect.top + rect.height / 2 - 150, 10), vh - 320);
                        left = rect.left - tW - 16;
                        break;
                    case 'bottom-right':
                        top = rect.top - 270;
                        left = rect.right - tW;
                        break;
                }
                // Clamp to viewport
                left = Math.max(10, Math.min(left, vw - tW - 10));
                top = Math.max(10, Math.min(top, vh - 280));
            }
        }

        _tooltip.style.left = left + 'px';
        _tooltip.style.top = top + 'px';
        _tooltip.style.width = tW + 'px';
    }

    // ─────────────────────────────────────────────────────────────
    // HELP HUB / GETTING STARTED
    // ─────────────────────────────────────────────────────────────
    function openHelpHub() {
        const content = `
            <div style="padding: 12px 14px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 10px;">
                    <div onclick="GeoHubTutorial.startTour('dashboard')" style="background: rgba(76,175,80,.08); border: 1px solid rgba(76,175,80,.2); border-radius: 9px; padding: 10px; cursor: pointer; text-align: center; transition: all .15s;"
                        onmouseover="this.style.background='rgba(76,175,80,.15)'" onmouseout="this.style.background='rgba(76,175,80,.08)'">
                        <div style="font-size: 1.5rem; margin-bottom: 4px;">🚀</div>
                        <div style="font-size: .7rem; font-weight: 800; color: #fff;">Dashboard Tour</div>
                        <div style="font-size: .6rem; color: var(--muted);">11 steps</div>
                    </div>
                    <div onclick="GeoHubTutorial.startTour('quick')" style="background: rgba(16,185,129,.08); border: 1px solid rgba(16,185,129,.2); border-radius: 9px; padding: 10px; cursor: pointer; text-align: center; transition: all .15s;"
                        onmouseover="this.style.background='rgba(16,185,129,.15)'" onmouseout="this.style.background='rgba(16,185,129,.08)'">
                        <div style="font-size: 1.5rem; margin-bottom: 4px;">⚡</div>
                        <div style="font-size: .7rem; font-weight: 800; color: #fff;">Quick Tour</div>
                        <div style="font-size: .6rem; color: var(--muted);">6 steps</div>
                    </div>
                </div>

                <div style="font-size: .6rem; font-weight: 800; text-transform: uppercase; letter-spacing: .6px; color: var(--g5); margin-bottom: 6px;">📚 Help Resources</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; margin-bottom: 8px;">
                    <div onclick="GeoHubTutorial.showHelpVideo('basics')" style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 7px; padding: 7px 9px; cursor: pointer; transition: all .15s;"
                        onmouseover="this.style.background='rgba(255,255,255,.08)'" onmouseout="this.style.background='rgba(255,255,255,.04)'">
                        <div style="font-size: .72rem; font-weight: 700; color: #fff;">📖 Platform Basics</div>
                        <div style="font-size: .62rem; color: var(--muted);">Navigation, login, data</div>
                    </div>
                    <div onclick="GeoHubTutorial.showHelpVideo('agriculture')" style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 7px; padding: 7px 9px; cursor: pointer; transition: all .15s;"
                        onmouseover="this.style.background='rgba(255,255,255,.08)'" onmouseout="this.style.background='rgba(255,255,255,.04)'">
                        <div style="font-size: .72rem; font-weight: 700; color: #fff;">🚜 Agriculture Guide</div>
                        <div style="font-size: .62rem; color: var(--muted);">Crops, soil, markets</div>
                    </div>
                    <div onclick="GeoHubTutorial.showHelpVideo('map')" style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 7px; padding: 7px 9px; cursor: pointer; transition: all .15s;"
                        onmouseover="this.style.background='rgba(255,255,255,.08)'" onmouseout="this.style.background='rgba(255,255,255,.04)'">
                        <div style="font-size: .72rem; font-weight: 700; color: #fff;">🗺️ Map Viewer Guide</div>
                        <div style="font-size: .62rem; color: var(--muted);">Layers, tools, coordinates</div>
                    </div>
                    <div onclick="GeoHubTutorial.showHelpVideo('features')" style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 7px; padding: 7px 9px; cursor: pointer; transition: all .15s;"
                        onmouseover="this.style.background='rgba(255,255,255,.08)'" onmouseout="this.style.background='rgba(255,255,255,.04)'">
                        <div style="font-size: .72rem; font-weight: 700; color: #fff;">✨ Premium Features</div>
                        <div style="font-size: .62rem; color: var(--muted);">Chat, weather, compare</div>
                    </div>
                </div>

                <div style="font-size: .6rem; font-weight: 800; text-transform: uppercase; letter-spacing: .6px; color: var(--g5); margin-bottom: 6px;">⌨️ Keyboard Shortcuts</div>
                <div style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.07); border-radius: 8px; padding: 8px 10px; margin-bottom: 8px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3px;">
                        <div style="display: flex; justify-content: space-between; padding: 2px 0; font-size: .65rem;">
                            <span style="color: rgba(255,255,255,.6);">Shortcuts</span>
                            <code style="font-size: .62rem; background: rgba(255,255,255,.08); padding: 1px 6px; border-radius: 3px; color: var(--g5);">?</code>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 2px 0; font-size: .65rem;">
                            <span style="color: rgba(255,255,255,.6);">Dashboard</span>
                            <code style="font-size: .62rem; background: rgba(255,255,255,.08); padding: 1px 6px; border-radius: 3px; color: var(--g5);">Shift+D</code>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 2px 0; font-size: .65rem;">
                            <span style="color: rgba(255,255,255,.6);">Map Viewer</span>
                            <code style="font-size: .62rem; background: rgba(255,255,255,.08); padding: 1px 6px; border-radius: 3px; color: var(--g5);">Shift+M</code>
                        </div>
                        <div style="display: flex; justify-content: space-between; padding: 2px 0; font-size: .65rem;">
                            <span style="color: rgba(255,255,255,.6);">AI Assistant</span>
                            <code style="font-size: .62rem; background: rgba(255,255,255,.08); padding: 1px 6px; border-radius: 3px; color: var(--g5);">Shift+H</code>
                        </div>
                    </div>
                </div>

                <div style="font-size: .6rem; font-weight: 800; text-transform: uppercase; letter-spacing: .6px; color: var(--g5); margin-bottom: 4px;">❓ Frequently Asked Questions</div>
                <div style="max-height: 180px; overflow-y: auto;">
                    ${renderFAQ()}
                </div>
            </div>`;

        if (GeoHubFeatures && GeoHubFeatures.createFloatingPanel) {
            GeoHubFeatures.createFloatingPanel('helpHub', 'Help & Getting Started', 'fas fa-question-circle', content, {
                position: 'top: calc(var(--nb,62px) + 10px); right: 12px;',
                width: '400px',
                maxHeight: '85vh'
            });
        }
    }

    function renderFAQ() {
        const faqs = [
            { q: 'How do I view district data?', a: 'Click any district on the map or in the Province table. A detailed info panel will appear with population, area, coordinates, and climate data.' },
            { q: 'What coordinate formats are supported?', a: 'DD (Decimal Degrees), DMS (Degrees Minutes Seconds), UTM (Universal Transverse Mercator), and MGRS (Military Grid Reference System). Use the coordinate widget or converter.' },
            { q: 'How do I use the AI Assistant?', a: 'Click the Features Hub button (green rocket, bottom-right) → AI Chat Assistant. Or press Shift+H. Ask questions like "Population of Lusaka" or "Climate in Copperbelt".' },
            { q: 'How do I export data?', a: 'Use the "Export" buttons in each section. You can export CSV, GeoJSON, KML, and generate PDF reports from the Features Hub.' },
            { q: 'How do I change the language?', a: 'Press Shift+L to open the language selector. Choose from English, Nyanja (Chinyanja), or Bemba (Ichibemba).' },
            { q: 'How do I upload my own GIS data?', a: 'Go to the Map Viewer and click "Upload" button or use the File Loader tool. Supports GeoJSON, Shapefile (.zip), KML, and GeoTIFF.' },
        ];
        return faqs.map((f, i) => `
            <div style="padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,.04); cursor: pointer;"
                onclick="this.querySelector('.faq-a').style.display = this.querySelector('.faq-a').style.display === 'none' ? 'block' : 'none'; this.querySelector('.faq-toggle').textContent = this.querySelector('.faq-a').style.display === 'block' ? '−' : '+'">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: .68rem; font-weight: 700; color: rgba(255,255,255,.85);">${f.q}</span>
                    <span class="faq-toggle" style="font-size: .8rem; color: var(--g5); font-weight: 700;">+</span>
                </div>
                <div class="faq-a" style="display: none; font-size: .66rem; color: var(--muted); padding: 4px 0 2px; line-height: 1.5;">
                    ${f.a}
                </div>
            </div>
        `).join('');
    }

    // ─────────────────────────────────────────────────────────────
    // HELP "VIDEO" (animated slide guide)
    // ─────────────────────────────────────────────────────────────
    function showHelpVideo(topic) {
        const guides = {
            basics: {
                title: '📖 Platform Basics',
                slides: [
                    { icon: '🌍', title: 'Welcome to GeoHub Zambia', text: 'A national spatial data platform covering all 116 districts across 10 provinces. Built on NSDI GRID3 2022 data.' },
                    { icon: '🔑', title: 'Logging In', text: 'Use your email and password to sign in. Admin users have access to user management. You can also sign in with Google.' },
                    { icon: '📊', title: 'The Dashboard', text: 'The Dashboard shows key national statistics, charts, temperature data, and a mini-map. Use the Quick Actions to jump to any feature.' },
                    { icon: '🗺️', title: 'Map Viewer', text: 'Access the full Map Viewer with 11+ data layers, coordinate converter, GIS analysis tools, and Google Earth Engine integration.' },
                    { icon: '🚀', title: 'Features Hub', text: 'Click the green rocket button (bottom-right) to access AI chat, district comparison, PDF export, weather alerts, language settings, and more.' },
                ]
            },
            agriculture: {
                title: '🚜 Agriculture Guide',
                slides: [
                    { icon: '🌽', title: 'Agriculture Hub', text: 'Access from Features Hub → Agriculture Hub. Includes 9 tools for crop analysis, fertilizer advice, pest alerts, and market prices.' },
                    { icon: '✅', title: 'Crop Suitability', text: 'Select a crop and district to see the agro-climatic suitability score. Scores are based on temperature, rainfall, soil type, elevation, and province match.' },
                    { icon: '📊', title: 'Yield Prediction', text: 'Predict crop yields for any district for 2024-2026 seasons based on climate, soil, and technology trend factors.' },
                    { icon: '🧪', title: 'Fertilizer Recommendations', text: 'Get N-P-K fertilizer recommendations per crop per district, adjusted for soil fertility. Includes cost estimates.' },
                    { icon: '🐛', title: 'Pest & Disease Alerts', text: 'Real-time risk assessment for pests and diseases affecting maize, cotton, cassava, groundnuts, and rice based on current month and climate conditions.' },
                    { icon: '📈', title: 'Market Prices', text: 'View current farm-gate prices for all 8 major crops. Sources include FRA, Cotton Board, and local markets.' },
                ]
            },
            map: {
                title: '🗺️ Map Viewer Guide',
                slides: [
                    { icon: '🗺️', title: 'Map Navigation', text: 'Pan by clicking and dragging. Zoom with mouse wheel or +/− buttons. Search districts using the search bar. Switch basemaps (Street/Satellite/Terrain/Dark).' },
                    { icon: '📋', title: 'Layers Control', text: 'Toggle data layers on/off using the sidebar. Adjust opacity with sliders. Change district colouring by Province, Population, or Area.' },
                    { icon: '📍', title: 'Coordinate Systems', text: '4 formats available: DD, DMS, UTM, MGRS. Click any point on the map to see coordinates in all formats in the Coordinate Hub. Use the Converter to transform coordinates.' },
                    { icon: '📐', title: 'Analysis Tools', text: 'Measure distances, areas, create buffers, run spatial queries, and use temporal analysis tools. All results show on the map.' },
                    { icon: '🌍', title: 'GEE Layers', text: 'Load Google Earth Engine data: LULC, NDVI, CHIRPS rainfall, LST temperature, drought risk, and flood maps. Select year and click to load.' },
                ]
            },
            features: {
                title: '✨ Premium Features',
                slides: [
                    { icon: '🤖', title: 'AI Chat Assistant', text: 'Ask questions in natural language: "Population of Ndola", "Climate in Eastern Province", "Open map". The AI answers with real data and can navigate the app.' },
                    { icon: '📊', title: 'District Comparison', text: 'Compare up to 4 districts side-by-side. Shows population, area, density, and climate factors with visual bar charts.' },
                    { icon: '📄', title: 'PDF Reports', text: 'Generate professional district profile reports with population, area, climate data, and rankings. Opens in a print-ready window.' },
                    { icon: '🌤️', title: 'Weather Alerts', text: 'Current conditions across all 10 provinces with severity indicators (High/Medium/Low). Based on ERA5-Land/GEE data.' },
                    { icon: '🌐', title: 'Multi-Language', text: 'Switch between English, Nyanja (Chinyanja), and Bemba (Ichibemba). Press Shift+L to select your preferred language.' },
                ]
            }
        };

        const guide = guides[topic];
        if (!guide) return;

        let slideIndex = 0;
        const slides = guide.slides;

        function buildSlideContent(index) {
            const s = slides[index];
            return `
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 2.8rem; margin-bottom: 12px;">${s.icon}</div>
                    <h3 style="font-size: 1rem; font-weight: 900; color: #fff; margin-bottom: 8px;">${s.title}</h3>
                    <p style="font-size: .78rem; color: rgba(255,255,255,.75); line-height: 1.6; max-width: 380px; margin: 0 auto;">${s.text}</p>
                    <div style="display: flex; gap: 5px; justify-content: center; margin-top: 14px;">
                        ${slides.map((_, i) => `<div style="width: ${i === index ? '16px' : '6px'}; height: 6px; border-radius: ${i === index ? '4px' : '3px'}; background: ${i === index ? '#4CAF50' : 'rgba(255,255,255,.2)'}; transition: all .3s;"></div>`).join('')}
                    </div>
                    <div style="display: flex; gap: 8px; justify-content: center; margin-top: 14px;">
                        ${index > 0 ? `<button onclick="GeoHubTutorial._navSlide(${topic}, ${index - 1})" style="padding: 6px 14px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 7px; color: rgba(255,255,255,.7); font-size: .7rem; font-weight: 700; cursor: pointer; font-family: Inter;"><i class="fas fa-arrow-left"></i> Back</button>` : `<div></div>`}
                        ${index < slides.length - 1
                            ? `<button onclick="GeoHubTutorial._navSlide(${topic}, ${index + 1})" style="padding: 6px 14px; background: linear-gradient(135deg, #1a6b35, #2d9e5f); border: none; border-radius: 7px; color: #fff; font-size: .7rem; font-weight: 800; cursor: pointer; font-family: Inter;">Next <i class="fas fa-arrow-right"></i></button>`
                            : `<button onclick="document.getElementById('ghz-tutorial-video')?.remove()" style="padding: 6px 14px; background: linear-gradient(135deg, #1a6b35, #2d9e5f); border: none; border-radius: 7px; color: #fff; font-size: .7rem; font-weight: 800; cursor: pointer; font-family: Inter;">✅ Done</button>`
                        }
                    </div>
                </div>
            `;
        }

        // Remove existing video panel
        document.getElementById('ghz-tutorial-video')?.remove();

        const panel = document.createElement('div');
        panel.id = 'ghz-tutorial-video';
        panel.style.cssText = `
            position: fixed; top: calc(var(--nb, 62px) + 10px); left: 50%; transform: translateX(-50%);
            width: min(460px, calc(100vw - 24px)); z-index: 9700;
            background: rgba(6,15,10,.98); border: 1px solid rgba(76,175,80,.2);
            border-radius: 16px; backdrop-filter: blur(16px);
            box-shadow: 0 12px 48px rgba(0,0,0,.6); overflow: hidden;
            font-family: 'Inter', sans-serif;
        `;
        panel.innerHTML = `
            <div class="ghz-tutorial-video-head" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: linear-gradient(90deg,rgba(26,107,53,.2),rgba(45,158,95,.08)); border-bottom: 1px solid rgba(255,255,255,.06); cursor: grab; user-select: none;">
                <span style="font-size: .8rem; font-weight: 800; color: #fff; display: flex; align-items: center; gap: 7px;">${guide.title}</span>
                <button onclick="this.closest('#ghz-tutorial-video').remove()" style="background: none; border: none; color: var(--muted); cursor: pointer; font-size: .9rem; padding: 3px;">&times;</button>
            </div>
            <div id="ghz-video-content">${buildSlideContent(0)}</div>
        `;
        document.body.appendChild(panel);
        makeElementDraggable(panel, '.ghz-tutorial-video-head');

        // Store nav function
        GeoHubTutorial._navSlide = function(t, idx) {
            slideIndex = idx;
            const content = document.getElementById('ghz-video-content');
            if (content) content.innerHTML = buildSlideContent(idx);
        };
    }

    // ─────────────────────────────────────────────────────────────
    // INIT & EVENT WIRING
    // ─────────────────────────────────────────────────────────────
    function init() {
        // Add keyboard shortcut for help
        document.addEventListener('keydown', function(e) {
            // F1 for help
            if (e.key === 'F1' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                openHelpHub();
            }
            // Escape to end tour if running
            if (e.key === 'Escape' && _isRunning) {
                endTour();
            }
        });

        // Auto-show tour on first visit (if not shown before)
        if (!localStorage.getItem('ghz_tour_seen')) {
            // Wait for page load
            if (document.readyState === 'complete') {
                setTimeout(() => {
                    // Don't auto-start on login page
                    if (!window.location.href.includes('index.html')) {
                        // Check if user prefers not to see auto tours
                        if (!localStorage.getItem('ghz_tour_dismissed')) {
                            // Show a subtle prompt instead of auto-starting
                            showTourPrompt();
                        }
                    }
                }, 3000);
            } else {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        if (!window.location.href.includes('index.html') && !localStorage.getItem('ghz_tour_dismissed')) {
                            showTourPrompt();
                        }
                    }, 3000);
                });
            }
        }
    }

    function showTourPrompt() {
        const prompt = document.createElement('div');
        prompt.id = 'ghz-tour-prompt';
        prompt.style.cssText = `
            position: fixed; bottom: 80px; right: 90px; z-index: 9900;
            background: rgba(6,15,10,.97); border: 1px solid rgba(76,175,80,.3);
            border-radius: 14px; padding: 14px 16px;
            backdrop-filter: blur(12px); box-shadow: 0 8px 32px rgba(0,0,0,.5);
            font-family: 'Inter', sans-serif; max-width: 300px;
            animation: slideUp .4s cubic-bezier(.16,1,.3,1) both;
        `;
        prompt.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 8px;">
                <span style="font-size: 1.5rem; flex-shrink: 0;">👋</span>
                <div style="flex: 1;">
                    <div style="font-size: .8rem; font-weight: 800; color: #fff; margin-bottom: 4px;">Welcome to GeoHub!</div>
                    <div style="font-size: .7rem; color: rgba(255,255,255,.65); line-height: 1.5; margin-bottom: 8px;">Would you like a quick tour of the platform?</div>
                    <div style="display: flex; gap: 6px;">
                        <button onclick="GeoHubTutorial.startTour('quick');this.closest('#ghz-tour-prompt').remove();localStorage.setItem('ghz_tour_seen','1')" style="flex: 1; padding: 6px; background: linear-gradient(135deg, #1a6b35, #2d9e5f); border: none; border-radius: 7px; color: #fff; font-size: .7rem; font-weight: 700; cursor: pointer; font-family: Inter;">🚀 Start Tour</button>
                        <button onclick="this.closest('#ghz-tour-prompt').remove();localStorage.setItem('ghz_tour_dismissed','1')" style="flex: 1; padding: 6px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); border-radius: 7px; color: rgba(255,255,255,.6); font-size: .7rem; font-weight: 600; cursor: pointer; font-family: Inter;">Dismiss</button>
                    </div>
                    <div style="margin-top: 6px; font-size: .6rem; color: var(--muted); text-align: center;">
                        <span onclick="document.getElementById('ghz-tour-prompt')?.remove();localStorage.setItem('ghz_tour_seen','1')" style="cursor: pointer;">Don't show again</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(prompt);
    }

    // Auto-init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ─────────────────────────────────────────────────────────────
    // PUBLIC API
    // ─────────────────────────────────────────────────────────────
    return {
        startTour,
        endTour,
        nextStep,
        prevStep,
        openHelpHub,
        showHelpVideo,
        DASHBOARD_TOUR,
        MAP_TOUR,
        _navSlide: null, // will be set dynamically
    };
})();

if (typeof window !== 'undefined') {
    window.GeoHubTutorial = GeoHubTutorial;
}