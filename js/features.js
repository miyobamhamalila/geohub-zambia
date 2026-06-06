/**
 * GeoHub Zambia — Exciting New Features Module v2.0
 * ===================================================
 * 10 powerful features added to supercharge the platform:
 *   1. GeoHub AI Chat Assistant
 *   2. District Comparison Tool
 *   3. PDF Report Export
 *   4. Real-time Zambia Weather Alerts
 *   5. Saved Map States
 *   6. Keyboard Shortcuts Guide
 *   7. Multi-language Support (EN/NY/BE)
 *   8. Animated Data Storytelling
 *   9. Geocoding / Reverse Geocoding
 *  10. Water Body Layer
 */

const GeoHubFeatures = (() => {
    'use strict';

    // ─────────────────────────────────────────────────────────────
    // i18n — Multi-language Support (English, Nyanja, Bemba)
    // ─────────────────────────────────────────────────────────────
    const LANGS = {
        en: { name: 'English', native: 'English' },
        ny: { name: 'Nyanja', native: 'Chinyanja' },
        be: { name: 'Bemba', native: 'Ichibemba' }
    };

    let _currentLang = localStorage.getItem('ghz_lang') || 'en';

    const TRANSLATIONS = {
        en: {
            app_name: 'GeoHub Zambia',
            dashboard: 'Dashboard',
            map: 'Map Viewer',
            analytics: 'Analytics',
            admin: 'Admin',
            signout: 'Sign Out',
            search: 'Search districts...',
            total_districts: 'Total Districts',
            total_provinces: 'Total Provinces',
            total_population: 'Total Population',
            area_covered: 'Area Covered',
            population: 'Population',
            area: 'Area (km²)',
            province: 'Province',
            district: 'District',
            climate: 'Climate',
            temperature: 'Temperature',
            rainfall: 'Rainfall',
            humidity: 'Humidity',
            loading: 'Loading...',
            error: 'Error',
            success: 'Success',
            info: 'Information',
            warning: 'Warning',
            close: 'Close',
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            export: 'Export',
            compare_districts: 'Compare Districts',
            chat_assistant: 'GeoHub AI Assistant',
            weather_alerts: 'Weather Alerts',
            keyboard_shortcuts: 'Keyboard Shortcuts',
            data_story: 'Zambia Data Story',
            geocode: 'Find Place',
            saved_states: 'Saved Map States',
            water_bodies: 'Water Bodies',
            report_export: 'Export Report',
            language: 'Language',
            help: 'Help',
            settings: 'Settings',
            no_data: 'No data available',
            click_to_learn: 'Click on any district to learn more',
            last_updated: 'Last updated',
            data_source: 'Data Source',
            share: 'Share',
            print: 'Print',
            fullscreen: 'Fullscreen',
        },
        ny: {
            app_name: 'GeoHub Zambia',
            dashboard: 'Chiwonelo',
            map: 'Mapu',
            analytics: 'Kusanthula',
            admin: 'Admin',
            signout: 'Tuluka',
            search: 'Fufuzani zigawo...',
            total_districts: 'Zigawo Zonse',
            total_provinces: 'Zigawo Zikulu Zonse',
            total_population: 'Anthu Onse',
            area_covered: 'Malo Otetezedwa',
            population: 'Anthu',
            area: 'Malo (km²)',
            province: 'Chigawo Chikulu',
            district: 'Chigawo',
            climate: 'Nyengo',
            temperature: 'Kutentha',
            rainfall: 'Mvula',
            humidity: 'Chinyezi',
            loading: 'Kutsegula...',
            error: 'Vuto',
            success: 'Chabwino',
            info: 'Chidziwitso',
            warning: 'Chenjezo',
            close: 'Tseka',
            save: 'Sunga',
            cancel: 'Leka',
            delete: 'Chotsa',
            edit: 'Konza',
            export: 'Tulutsa',
            compare_districts: 'Yerekezera Zigawo',
            chat_assistant: 'Mthandizi wa GeoHub',
            weather_alerts: 'Chenjezo la Nyengo',
            keyboard_shortcuts: 'Njira Zachidule',
            data_story: 'Nkhani ya Zambia',
            geocode: 'Pezani Malo',
            saved_states: 'Mapu Osungidwa',
            water_bodies: 'Madzi',
            report_export: 'Tulutsa Lipoti',
            language: 'Chilankhulo',
            help: 'Thandizo',
            settings: 'Zokonda',
            no_data: 'Palibe deta',
            click_to_learn: 'Dinani pa chigawo kuti muphunzire zambiri',
            last_updated: 'Kusinthidwa komaliza',
            data_source: 'Gwero la Deta',
            share: 'Gawana',
            print: 'Sindikiza',
            fullscreen: 'Skrini yonse',
        },
        be: {
            app_name: 'GeoHub Zambia',
            dashboard: 'Ukubona',
            map: 'Icindunshi',
            analytics: 'Ukupima',
            admin: 'Admin',
            signout: 'Fumapo',
            search: 'Fwaya impanga...',
            total_districts: 'Imipanga Yonse',
            total_provinces: 'Icala Yonse',
            total_population: 'Abantu Bonse',
            area_covered: 'Icungwe',
            population: 'Abantu',
            area: 'Icungwe (km²)',
            province: 'Icela',
            district: 'Impanga',
            climate: 'Ilyo',
            temperature: 'Ubushiku',
            rainfall: 'Imfula',
            humidity: 'Unye',
            loading: 'Ukusenda...',
            error: 'Ububi',
            success: 'Chisuma',
            info: 'Ishuko',
            warning: 'Ukuka',
            close: 'Isala',
            save: 'Sunga',
            cancel: 'Leka',
            delete: 'Fumya',
            edit: 'Kosola',
            export: 'Fumisha',
            compare_districts: 'Linganya Impanga',
            chat_assistant: 'Wakwafwa wa GeoHub',
            weather_alerts: 'Ukuka wa Ilyo',
            keyboard_shortcuts: 'Inshila Shicindushi',
            data_story: 'Ilyashi lya Zambia',
            geocode: 'Fwaya Icungwe',
            saved_states: 'Ifishanya Fyalindilwa',
            water_bodies: 'Ameenshi',
            report_export: 'Fumisha Lipoti',
            language: 'Ululimi',
            help: 'Ukukwafwa',
            settings: 'Ifipe',
            no_data: 'Takwata data',
            click_to_learn: 'Yandako impanga pakuti umfwe ifingi',
            last_updated: 'Ukukosola kwakulekelesha',
            data_source: 'Isambi lya Data',
            share: 'Pana',
            print: 'Pitinta',
            fullscreen: 'Icindunshi conse',
        }
    };

    function t(key) {
        return TRANSLATIONS[_currentLang]?.[key] || TRANSLATIONS.en[key] || key;
    }

    function setLanguage(lang) {
        if (LANGS[lang]) {
            _currentLang = lang;
            localStorage.setItem('ghz_lang', lang);
            document.dispatchEvent(new CustomEvent('ghz:langchange', { detail: { lang } }));
            // Update data-lang attributes on root
            document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : lang === 'ny' ? 'ny' : 'bem');
        }
    }

    function getLanguage() { return _currentLang; }

    // ─────────────────────────────────────────────────────────────
    // 1. GeoHub AI Chat Assistant (rule-based NLP query engine)
    // ─────────────────────────────────────────────────────────────
    function _findDistrict(query) {
        const q = query.toLowerCase();
        // Search by district name
        for (const d of ZAMBIA_DISTRICTS) {
            if (d.district.toLowerCase().includes(q) || d.province.toLowerCase().includes(q)) {
                return d;
            }
        }
        return null;
    }

    function _findDistrictsByProvince(province) {
        const p = province.toLowerCase();
        return ZAMBIA_DISTRICTS.filter(d => d.province.toLowerCase().includes(p));
    }

    function _getClimateSummary(district) {
        const prov = district.province;
        if (!CLIMATE_CURRENT?.temperature?.province) return null;
        const t = CLIMATE_CURRENT.temperature.province[prov];
        const r = CLIMATE_CURRENT.rainfall?.province?.[prov];
        const h = CLIMATE_CURRENT.humidity?.province?.[prov];
        if (!t) return null;
        return {
            temp: t.current_month || t.annual_mean || 'N/A',
            rain: r?.annual || 'N/A',
            humidity: h?.annual || 'N/A',
            season: CLIMATE_CURRENT.current_month || ''
        };
    }

    function chatQuery(query) {
        query = query.trim();
        if (!query) return { text: 'Please ask a question about Zambia districts, climate, or data.', type: 'info' };

        const q = query.toLowerCase();

        // Population queries
        if (q.includes('population') || q.includes('people') || q.includes('anthu') || q.includes('abantu')) {
            // Which province/district?
            for (const d of ZAMBIA_DISTRICTS) {
                if (q.includes(d.district.toLowerCase())) {
                    return {
                        text: `📊 <strong>${d.district}</strong> district (${d.province} Province) has a population of <strong>${d.pop.toLocaleString()}</strong> people. Area: ${d.area_km2.toLocaleString()} km².`,
                        type: 'data'
                    };
                }
            }
            // Province level
            const provs = [...new Set(ZAMBIA_DISTRICTS.map(d => d.province))];
            for (const p of provs) {
                if (q.includes(p.toLowerCase())) {
                    const dists = ZAMBIA_DISTRICTS.filter(d => d.province === p);
                    const totalPop = dists.reduce((s, d) => s + d.pop, 0);
                    const totalArea = dists.reduce((s, d) => s + d.area_km2, 0);
                    return {
                        text: `🏛️ <strong>${p} Province</strong> has <strong>${dists.length}</strong> districts. Total population: <strong>${totalPop.toLocaleString()}</strong>. Total area: ${totalArea.toLocaleString()} km².`,
                        type: 'data'
                    };
                }
            }
            // Total
            const totalPop = ZAMBIA_DISTRICTS.reduce((s, d) => s + d.pop, 0);
            return { text: `👥 Zambia's total population (all 116 districts): <strong>${totalPop.toLocaleString()}</strong>`, type: 'data' };
        }

        // Area queries
        if (q.includes('area') || q.includes('size') || q.includes('km') || q.includes('malo') || q.includes('icungwe')) {
            for (const d of ZAMBIA_DISTRICTS) {
                if (q.includes(d.district.toLowerCase())) {
                    return {
                        text: `📐 <strong>${d.district}</strong> district covers <strong>${d.area_km2.toLocaleString()}</strong> km² in ${d.province} Province.`,
                        type: 'data'
                    };
                }
            }
            return { text: `🌍 Zambia covers a total area of <strong>${ZAMBIA_METADATA.total_area_km2.toLocaleString()}</strong> km² across <strong>116 districts</strong> in <strong>10 provinces</strong>.`, type: 'data' };
        }

        // Climate queries
        if (q.includes('climate') || q.includes('weather') || q.includes('temperature') || q.includes('rainfall') ||
            q.includes('nyengo') || q.includes('ilyo') || q.includes('kutentha') || q.includes('ubushiku') || q.includes('mvula') || q.includes('imfula')) {
            const district = _findDistrict(q);
            if (district) {
                const c = _getClimateSummary(district);
                if (c) {
                    return {
                        text: `🌡️ <strong>${district.district}</strong> (${district.province}): Current temp ~<strong>${c.temp}°C</strong>${c.rain !== 'N/A' ? `, Rainfall: <strong>${c.rain}mm</strong>` : ''}${c.humidity !== 'N/A' ? `, Humidity: <strong>${c.humidity}%</strong>` : ''}. Data: ERA5-Land / GEE.`,
                        type: 'data'
                    };
                }
                return { text: `🌡️ <strong>${district.district}</strong> (${district.province}) — Temperature data available in the Climate Analytics panel.`, type: 'info' };
            }
            return { text: `🌡️ Zambia's climate varies by region. Current month: <strong>${CLIMATE_CURRENT.current_month || 'N/A'}</strong>. Use the Climate panel or select a specific district.`, type: 'info' };
        }

        // Province info
        if (q.includes('province') || q.includes('chigawo') || q.includes('icela') || q.includes('prov')) {
            for (const p of [...new Set(ZAMBIA_DISTRICTS.map(d => d.province))]) {
                if (q.includes(p.toLowerCase())) {
                    const dists = ZAMBIA_DISTRICTS.filter(d => d.province === p);
                    const totalPop = dists.reduce((s, d) => s + d.pop, 0);
                    const names = dists.map(d => d.district).join(', ');
                    return {
                        text: `🏛️ <strong>${p} Province</strong> — ${dists.length} districts. Population: ${totalPop.toLocaleString()}.<br><small>Districts: ${names}</small>`,
                        type: 'data'
                    };
                }
            }
        }

        // Districts by region
        if (q.includes('region') || q.includes('southern') || q.includes('northern')) {
            const region = q.includes('southern') ? 'Southern' : 'Northern';
            const dists = ZAMBIA_DISTRICTS.filter(d => d.region === region);
            return {
                text: `📍 <strong>${region} Region</strong> has <strong>${dists.length}</strong> districts. Total population: ${dists.reduce((s, d) => s + d.pop, 0).toLocaleString()}.`,
                type: 'data'
            };
        }

        // Largest / smallest
        if (q.includes('largest') || q.includes('biggest') || q.includes('most populated')) {
            const sorted = [...ZAMBIA_DISTRICTS].sort((a, b) => b.pop - a.pop);
            const top = sorted.slice(0, 5);
            const list = top.map((d, i) => `${i + 1}. ${d.district} — ${d.pop.toLocaleString()}`).join('<br>');
            return { text: `🏆 <strong>Top 5 Most Populated Districts:</strong><br>${list}`, type: 'data' };
        }
        if (q.includes('smallest') || q.includes('least')) {
            const sorted = [...ZAMBIA_DISTRICTS].sort((a, b) => a.pop - b.pop);
            const bottom = sorted.slice(0, 5);
            const list = bottom.map((d, i) => `${i + 1}. ${d.district} — ${d.pop.toLocaleString()}`).join('<br>');
            return { text: `📉 <strong>5 Least Populated Districts:</strong><br>${list}`, type: 'data' };
        }

        // Capital
        if (q.includes('capital') || q.includes('lusaka')) {
            const lusaka = ZAMBIA_DISTRICTS.find(d => d.district === 'Lusaka');
            if (lusaka) {
                return {
                    text: `🏙️ <strong>Lusaka</strong> — Capital City of Zambia. Population: <strong>${lusaka.pop.toLocaleString()}</strong>. Area: ${lusaka.area_km2} km². Province: Lusaka Province.`,
                    type: 'data'
                };
            }
        }

        // Help
        if (q.includes('help') || q.includes('what can') || q.includes('thandizo') || q.includes('ukukwafwa')) {
            return {
                text: `🤖 <strong>I can answer questions like:</strong><br>
                • "Population of Lusaka"<br>
                • "Districts in Copperbelt"<br>
                • "Climate in Livingstone"<br>
                • "Largest districts"<br>
                • "Total population"<br>
                • "Area of Zambia"<br>
                • "Southern region districts"<br><br>
                <em>I also help navigate the app — try "open dashboard" or "show map"!</em>`,
                type: 'help'
            };
        }

        // Navigation commands
        if (q.includes('open') || q.includes('go to') || q.includes('show') || q.includes('pita') || q.includes('lola')) {
            if (q.includes('map') || q.includes('mapu') || q.includes('cindunshi')) {
                return { text: '🗺️ Opening Map Viewer...', type: 'navigate', action: 'map' };
            }
            if (q.includes('dashboard') || q.includes('chiwonelo') || q.includes('ukubona')) {
                return { text: '📊 Opening Dashboard...', type: 'navigate', action: 'dashboard' };
            }
            if (q.includes('analytics') || q.includes('kusanthula') || q.includes('ukupima')) {
                return { text: '📈 Opening Analytics...', type: 'navigate', action: 'analytics' };
            }
            if (q.includes('admin')) {
                return { text: '🔐 Opening Admin Panel...', type: 'navigate', action: 'admin' };
            }
            if (q.includes('weather') || q.includes('nyengo') || q.includes('ilyo')) {
                return { text: '🌤️ Opening Weather Alerts...', type: 'navigate', action: 'weather' };
            }
            if (q.includes('compare') || q.includes('yerekezera') || q.includes('linganya')) {
                return { text: '📋 Opening District Comparison...', type: 'navigate', action: 'compare' };
            }
        }

        // Default: general info
        return {
            text: `ℹ️ I'm GeoHub Assistant! I can help with:<br>
            • District data (population, area)<br>
            • Climate information<br>
            • Province details<br>
            • Navigation within the app<br><br>
            <em>Try asking "Help" for all options, or type a district name!</em>`,
            type: 'info'
        };
    }

    // ─────────────────────────────────────────────────────────────
    // 2. District Comparison Tool
    // ─────────────────────────────────────────────────────────────
    let _comparisonDistricts = [];

    function addToComparison(districtName) {
        const d = ZAMBIA_DISTRICTS.find(x => x.district.toLowerCase() === districtName.toLowerCase());
        if (!d) return { success: false, error: 'District not found' };
        if (_comparisonDistricts.find(x => x.district === d.district)) {
            return { success: false, error: 'Already in comparison' };
        }
        if (_comparisonDistricts.length >= 4) {
            return { success: false, error: 'Maximum 4 districts can be compared' };
        }
        _comparisonDistricts.push(d);
        return { success: true, districts: _comparisonDistricts };
    }

    function removeFromComparison(districtName) {
        _comparisonDistricts = _comparisonDistricts.filter(d => d.district !== districtName);
        return { success: true, districts: _comparisonDistricts };
    }

    function clearComparison() {
        _comparisonDistricts = [];
        return { success: true, districts: [] };
    }

    function getComparison() {
        return _comparisonDistricts;
    }

    function getComparisonData() {
        if (_comparisonDistricts.length === 0) return null;
        const keys = ['district', 'province', 'region', 'pop', 'area_km2'];
        const rows = _comparisonDistricts.map(d => ({
            district: d.district,
            province: d.province,
            region: d.region,
            population: d.pop,
            area: d.area_km2,
            density: Math.round(d.pop / d.area_km2)
        }));
        return { districts: rows };
    }

    function renderComparisonHTML() {
        const data = getComparisonData();
        if (!data) return '<div style="padding:20px;text-align:center;color:var(--muted);">Add districts to compare (up to 4)</div>';
        let html = '<table style="width:100%;border-collapse:collapse;font-size:.78rem;">';
        html += '<thead><tr style="border-bottom:2px solid var(--g5);">';
        html += '<th style="padding:8px 10px;text-align:left;font-weight:800;color:var(--g5);">Attribute</th>';
        data.districts.forEach(d => {
            html += `<th style="padding:8px 10px;text-align:center;font-weight:800;color:#fff;">${d.district}</th>`;
        });
        html += '</tr></thead><tbody>';
        const attrs = [
            { key: 'province', label: 'Province' },
            { key: 'region', label: 'Region' },
            { key: 'population', label: 'Population', fmt: v => v.toLocaleString() },
            { key: 'area', label: 'Area (km²)', fmt: v => v.toLocaleString() },
            { key: 'density', label: 'Density/km²', fmt: v => v.toLocaleString() },
        ];
        attrs.forEach(attr => {
            html += `<tr style="border-bottom:1px solid rgba(255,255,255,.06);">`;
            html += `<td style="padding:7px 10px;font-weight:700;color:var(--muted);">${attr.label}</td>`;
            data.districts.forEach(d => {
                const val = attr.fmt ? attr.fmt(d[attr.key]) : d[attr.key];
                html += `<td style="padding:7px 10px;text-align:center;font-weight:700;color:#fff;">${val}</td>`;
            });
            html += `</tr>`;
        });
        // Population bar
        html += `<tr><td style="padding:7px 10px;font-weight:700;color:var(--muted);">Population Bar</td>`;
        const maxPop = Math.max(...data.districts.map(d => d.population));
        data.districts.forEach(d => {
            const pct = (d.population / maxPop) * 100;
            html += `<td style="padding:7px 10px;text-align:center;">
                <div style="background:rgba(255,255,255,.08);border-radius:4px;height:16px;overflow:hidden;">
                    <div style="width:${pct}%;height:100%;background:linear-gradient(90deg,var(--g3),var(--g5));border-radius:4px;"></div>
                </div>
                <span style="font-size:.65rem;color:var(--g5);font-weight:700;">${pct.toFixed(0)}%</span>
            </td>`;
        });
        html += `</tr>`;
        html += '</tbody></table>';
        return html;
    }

    // ─────────────────────────────────────────────────────────────
    // 3. PDF Report Export
    // ─────────────────────────────────────────────────────────────
    function exportPDF(title, content, opts = {}) {
        // Creates a printable window for PDF export
        const win = window.open('', '_blank');
        if (!win) {
            alert('Please allow popups to export PDF');
            return;
        }
        const session = GeoHubAuth.getSession();
        win.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${title} — GeoHub Zambia</title>
                <style>
                    @page { margin: 20mm 15mm; }
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    body { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; color: #111827; padding: 20px; font-size: 12px; }
                    .report-header { border-bottom: 3px solid #1a6b35; padding-bottom: 15px; margin-bottom: 20px; }
                    .report-header h1 { font-size: 20px; font-weight: 900; color: #1a6b35; }
                    .report-header p { font-size: 11px; color: #6b7280; margin-top: 4px; }
                    .report-meta { display: flex; gap: 20px; font-size: 10px; color: #6b7280; margin-bottom: 16px; }
                    .report-meta span { background: #f3f4f6; padding: 3px 8px; border-radius: 4px; }
                    .report-section { margin-bottom: 18px; }
                    .report-section h2 { font-size: 14px; font-weight: 800; color: #1a6b35; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid #e5e7eb; }
                    table { width: 100%; border-collapse: collapse; margin: 8px 0; }
                    th { background: #f0fdf4; padding: 6px 8px; text-align: left; font-size: 10px; font-weight: 700; color: #1a6b35; border: 1px solid #e5e7eb; }
                    td { padding: 5px 8px; border: 1px solid #e5e7eb; font-size: 10px; }
                    .footer { margin-top: 30px; padding-top: 10px; border-top: 1px solid #e5e7eb; font-size: 9px; color: #9ca3af; text-align: center; }
                    .badge { display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 9px; font-weight: 700; }
                    .badge-green { background: #f0fdf4; color: #16a34a; }
                    .print-btn { position: fixed; bottom: 20px; right: 20px; padding: 10px 20px; background: #1a6b35; color: #fff; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; z-index: 999; box-shadow: 0 4px 12px rgba(0,0,0,.2); }
                    @media print { .print-btn { display: none; } }
                </style>
            </head>
            <body>
                <div class="report-header">
                    <h1>🌍 ${title}</h1>
                    <p>GeoHub Zambia — National Spatial Data Platform | Generated ${new Date().toLocaleString()}</p>
                </div>
                <div class="report-meta">
                    <span>👤 ${session?.name || 'Guest'}</span>
                    <span>🏛️ ${session?.role || 'Standard'} User</span>
                    <span>📅 ${new Date().toLocaleDateString()}</span>
                </div>
                ${content}
                <div class="footer">
                    GeoHub Zambia — NSDI GRID3 2022 Data | Powered by GeoHub Platform v9.0<br>
                    This report was generated automatically. Data accuracy subject to source metadata.
                </div>
                <button class="print-btn" onclick="window.print()">🖨️ Print / Save PDF</button>
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        if ('${opts.autoPrint}') setTimeout(function() { window.print(); }, 500);
                    });
                <\/script>
            </body>
            </html>
        `);
        win.document.close();
        return { success: true };
    }

    function exportDistrictReport(districtName) {
        const d = ZAMBIA_DISTRICTS.find(x => x.district.toLowerCase() === districtName.toLowerCase());
        if (!d) return { success: false, error: 'District not found' };
        // Try to get climate data
        let climateInfo = '';
        const c = _getClimateSummary(d);
        if (c) {
            climateInfo = `
                <div class="report-section">
                    <h2>🌡️ Climate Data</h2>
                    <table>
                        <tr><td>Current Month</td><td><strong>${c.season}</strong></td></tr>
                        <tr><td>Temperature</td><td><strong>${c.temp}°C</strong></td></tr>
                        <tr><td>Rainfall</td><td><strong>${c.rain}mm</strong></td></tr>
                        <tr><td>Humidity</td><td><strong>${c.humidity}%</strong></td></tr>
                    </table>
                </div>
            `;
        }
        const content = `
            <div class="report-section">
                <h2>📍 District Profile: ${d.district}</h2>
                <table>
                    <tr><th>Attribute</th><th>Value</th></tr>
                    <tr><td>District</td><td><strong>${d.district}</strong></td></tr>
                    <tr><td>Province</td><td><strong>${d.province}</strong></td></tr>
                    <tr><td>Region</td><td><strong>${d.region}</strong></td></tr>
                    <tr><td>Population</td><td><strong>${d.pop.toLocaleString()}</strong></td></tr>
                    <tr><td>Area</td><td><strong>${d.area_km2.toLocaleString()} km²</strong></td></tr>
                    <tr><td>Density</td><td><strong>${Math.round(d.pop / d.area_km2).toLocaleString()} / km²</strong></td></tr>
                    <tr><td>District Code</td><td><code>${d.id}</code></td></tr>
                </table>
            </div>
            ${climateInfo}
            <div class="report-section">
                <h2>📊 Key Metrics</h2>
                <table>
                    <tr><th>Metric</th><th>Value</th></tr>
                    <tr><td>Share of Province Population</td><td><strong>${((d.pop / ZAMBIA_DISTRICTS.filter(x => x.province === d.province).reduce((s, x) => s + x.pop, 0)) * 100).toFixed(1)}%</strong></td></tr>
                    <tr><td>Share of National Population</td><td><strong>${((d.pop / ZAMBIA_DISTRICTS.reduce((s, x) => s + x.pop, 0)) * 100).toFixed(2)}%</strong></td></tr>
                    <tr><td>Population Rank</td><td><strong>#${ZAMBIA_DISTRICTS.sort((a, b) => b.pop - a.pop).findIndex(x => x.district === d.district) + 1}</strong> of 116</td></tr>
                </table>
            </div>
        `;
        return exportPDF(`District Report — ${d.district}`, content);
    }

    // ─────────────────────────────────────────────────────────────
    // 4. Real-time Zambia Weather Alerts (simulated from climate data)
    // ─────────────────────────────────────────────────────────────
    function getWeatherAlerts() {
        const alerts = [];
        // Generate alerts based on current climate data
        if (CLIMATE_CURRENT?.temperature) {
            const provs = Object.keys(CLIMATE_CURRENT.temperature.province || {});
            provs.forEach(prov => {
                const t = CLIMATE_CURRENT.temperature.province[prov];
                const temp = t.current_month || t.annual_mean;
                if (temp && temp > 35) {
                    alerts.push({
                        type: 'extreme_heat',
                        severity: 'high',
                        province: prov,
                        message: `Extreme heat warning: ${temp.toFixed(1)}°C in ${prov}`,
                        icon: '🔥'
                    });
                }
                const r = CLIMATE_CURRENT.rainfall?.province?.[prov];
                if (r && r.annual && r.annual > 1200) {
                    alerts.push({
                        type: 'heavy_rain',
                        severity: 'medium',
                        province: prov,
                        message: `High rainfall (${r.annual.toFixed(0)}mm) expected in ${prov}`,
                        icon: '🌧️'
                    });
                }
            });
        }
        // Add a general alert
        if (alerts.length === 0) {
            alerts.push({
                type: 'normal',
                severity: 'low',
                province: 'National',
                message: `Weather conditions normal across Zambia. Current month: ${CLIMATE_CURRENT.current_month || 'N/A'}`,
                icon: '☀️'
            });
        }
        return alerts;
    }

    function renderWeatherPanel() {
        const alerts = getWeatherAlerts();
        let html = `<div style="padding:10px 14px;">`;
        html += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <i class="fas fa-cloud-sun" style="color:var(--g5);font-size:1.1rem;"></i>
            <span style="font-size:.65rem;color:var(--muted);">Zambia — ${CLIMATE_CURRENT.current_month || ''} ${CLIMATE_CURRENT.current_year || ''} | Updated: ${CLIMATE_CURRENT.last_updated ? new Date(CLIMATE_CURRENT.last_updated).toLocaleDateString() : 'N/A'}</span>
        </div>`;
        alerts.forEach(a => {
            const severityColors = { high: '#ef4444', medium: '#f59e0b', low: '#10b981' };
            html += `<div style="display:flex;align-items:center;gap:10px;padding:9px 11px;margin-bottom:6px;border-radius:8px;background:rgba(255,255,255,.04);border-left:3px solid ${severityColors[a.severity] || '#6b7280'};">
                <span style="font-size:1.2rem;">${a.icon}</span>
                <div style="flex:1;">
                    <div style="font-size:.73rem;font-weight:700;color:#fff;">${a.message}</div>
                    <div style="font-size:.62rem;color:var(--muted);margin-top:2px;">${a.province} · ${a.type.replace('_', ' ').toUpperCase()}</div>
                </div>
                <span style="font-size:.6rem;font-weight:800;text-transform:uppercase;padding:2px 7px;border-radius:4px;background:${severityColors[a.severity]}22;color:${severityColors[a.severity]};">${a.severity}</span>
            </div>`;
        });
        html += `<div style="margin-top:8px;font-size:.62rem;color:var(--muted);text-align:center;">Data: ERA5-Land / GEE · MODIS MOD11A2</div>`;
        html += `</div>`;
        return html;
    }

    // ─────────────────────────────────────────────────────────────
    // 5. Saved Map States (localStorage)
    // ─────────────────────────────────────────────────────────────
    const MAP_STATES_KEY = 'ghz_map_states';

    function saveMapState(name, state) {
        const states = getMapStates();
        const id = 'ms_' + Date.now();
        states.push({
            id, name, created: new Date().toISOString(),
            center: state.center || [-13.133, 27.849],
            zoom: state.zoom || 7,
            basemap: state.basemap || 'dark',
            layers: state.layers || [],
            coordFormat: state.coordFormat || 'dd'
        });
        localStorage.setItem(MAP_STATES_KEY, JSON.stringify(states.slice(-20))); // keep last 20
        return { success: true, id, states };
    }

    function getMapStates() {
        try {
            return JSON.parse(localStorage.getItem(MAP_STATES_KEY)) || [];
        } catch { return []; }
    }

    function deleteMapState(id) {
        const states = getMapStates().filter(s => s.id !== id);
        localStorage.setItem(MAP_STATES_KEY, JSON.stringify(states));
        return { success: true, states };
    }

    function loadMapState(id) {
        const states = getMapStates();
        return states.find(s => s.id === id) || null;
    }

    // ─────────────────────────────────────────────────────────────
    // 6. Keyboard Shortcuts Guide
    // ─────────────────────────────────────────────────────────────
    const SHORTCUTS = [
        { key: '?', desc: 'Show keyboard shortcuts', scope: 'Global' },
        { key: 'Shift + D', desc: 'Open Dashboard', scope: 'Global' },
        { key: 'Shift + M', desc: 'Open Map Viewer', scope: 'Global' },
        { key: 'Shift + A', desc: 'Open Analytics', scope: 'Global' },
        { key: 'Shift + C', desc: 'Open District Comparison', scope: 'Global' },
        { key: 'Shift + W', desc: 'Toggle Weather Alerts', scope: 'Global' },
        { key: 'Shift + L', desc: 'Toggle Language Selector', scope: 'Global' },
        { key: 'Shift + S', desc: 'Save Current Map State', scope: 'Map' },
        { key: 'Shift + H', desc: 'Open GeoHub AI Assistant', scope: 'Global' },
        { key: 'Escape', desc: 'Close active panel', scope: 'Global' },
        { key: 'Ctrl+F', desc: 'Search districts', scope: 'Dashboard' },
        { key: 'Ctrl+P', desc: 'Print / Export PDF', scope: 'Dashboard' },
        { key: 'F11', desc: 'Toggle fullscreen', scope: 'Global' },
        { key: 'Shift + N', desc: 'Toggle light/dark theme', scope: 'Map' },
        { key: 'Shift + K', desc: 'Open Data Story', scope: 'Global' },
    ];

    function renderShortcutsHTML() {
        let html = `<div style="padding:14px 18px;max-height:400px;overflow-y:auto;">`;
        html += `<h3 style="font-size:.85rem;font-weight:800;color:#fff;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-keyboard" style="color:var(--g5);"></i> Keyboard Shortcuts</h3>`;
        const groups = {};
        SHORTCUTS.forEach(s => {
            if (!groups[s.scope]) groups[s.scope] = [];
            groups[s.scope].push(s);
        });
        Object.keys(groups).forEach(scope => {
            html += `<div style="font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:.6px;color:rgba(76,175,80,.7);padding:8px 0 4px;border-top:1px solid rgba(255,255,255,.06);">${scope}</div>`;
            groups[scope].forEach(s => {
                html += `<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;">
                    <span style="font-size:.73rem;color:rgba(255,255,255,.8);">${s.desc}</span>
                    <code style="font-size:.68rem;font-weight:700;background:rgba(255,255,255,.08);padding:2px 8px;border-radius:4px;color:var(--g5);">${s.key}</code>
                </div>`;
            });
        });
        html += `<div style="margin-top:12px;font-size:.65rem;color:var(--muted);text-align:center;border-top:1px solid rgba(255,255,255,.06);padding-top:10px;">Press <kbd style="background:rgba(255,255,255,.08);padding:1px 5px;border-radius:3px;color:#fff;">?</kbd> anytime to show this guide</div>`;
        html += `</div>`;
        return html;
    }

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // '?' key
            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                document.dispatchEvent(new CustomEvent('ghz:shortcuts'));
            }
            // Shift+D — Dashboard
            if (e.key === 'D' && e.shiftKey) {
                e.preventDefault();
                if (window.location.href.includes('dashboard')) return;
                window.location.href = 'dashboard.html';
            }
            // Shift+M — Map
            if (e.key === 'M' && e.shiftKey) {
                e.preventDefault();
                if (window.location.href.includes('map')) return;
                window.location.href = 'map.html';
            }
            // Shift+A — Analytics
            if (e.key === 'A' && e.shiftKey) {
                e.preventDefault();
                document.dispatchEvent(new CustomEvent('ghz:analytics'));
            }
            // Shift+C — Compare
            if (e.key === 'C' && e.shiftKey) {
                e.preventDefault();
                document.dispatchEvent(new CustomEvent('ghz:compare'));
            }
            // Shift+W — Weather
            if (e.key === 'W' && e.shiftKey) {
                e.preventDefault();
                document.dispatchEvent(new CustomEvent('ghz:weather'));
            }
            // Shift+H — AI Assistant
            if (e.key === 'H' && e.shiftKey) {
                e.preventDefault();
                document.dispatchEvent(new CustomEvent('ghz:chat'));
            }
            // Shift+K — Data Story
            if (e.key === 'K' && e.shiftKey) {
                e.preventDefault();
                document.dispatchEvent(new CustomEvent('ghz:story'));
            }
            // Shift+L — Language
            if (e.key === 'L' && e.shiftKey) {
                e.preventDefault();
                document.dispatchEvent(new CustomEvent('ghz:language'));
            }
        });
    }

    // ─────────────────────────────────────────────────────────────
    // 7. Animated Data Storytelling
    // ─────────────────────────────────────────────────────────────
    const DATA_STORY_SLIDES = [
        {
            title: 'Welcome to GeoHub Zambia',
            subtitle: 'National Spatial Data Platform',
            icon: '🌍',
            content: 'Explore Zambia through data — 116 districts, 10 provinces, 752,612 km² of diverse landscapes.',
            color: '#1a6b35'
        },
        {
            title: 'Population',
            subtitle: '20+ Million Zambians',
            icon: '👥',
            content: `Zambia's total population across 116 districts: <strong>${ZAMBIA_DISTRICTS.reduce((s, d) => s + d.pop, 0).toLocaleString()}</strong> (GRID3 2022).`,
            color: '#2563eb'
        },
        {
            title: 'Lusaka — Capital City',
            subtitle: 'Most Populous District',
            icon: '🏙️',
            content: `Lusaka district: <strong>${ZAMBIA_DISTRICTS.find(d => d.district === 'Lusaka')?.pop?.toLocaleString() || '2.7M'}</strong> residents — the economic and administrative heart of Zambia.`,
            color: '#f59e0b'
        },
        {
            title: 'Largest Province',
            subtitle: 'By Area',
            icon: '🗺️',
            content: getLargestProvinceStory(),
            color: '#7c3aed'
        },
        {
            title: 'Climate & Environment',
            subtitle: 'Diverse Ecosystems',
            icon: '🌿',
            content: `Current conditions: ${CLIMATE_CURRENT.current_month || 'N/A'} ${CLIMATE_CURRENT.current_year || ''}. Temperature data available for all provinces via ERA5-Land / GEE.`,
            color: '#10b981'
        },
        {
            title: '10 Provinces',
            subtitle: 'One Nation',
            icon: '🤝',
            content: getProvinceSummaryStory(),
            color: '#ec4899'
        },
        {
            title: 'Data for Development',
            subtitle: 'NSDI GRID3 2022',
            icon: '📊',
            content: 'GeoHub Zambia is built on authoritative NSDI GRID3 2022 district data — supporting evidence-based planning and decision-making across all sectors.',
            color: '#1a6b35'
        }
    ];

    function getLargestProvinceStory() {
        const provs = [...new Set(ZAMBIA_DISTRICTS.map(d => d.province))];
        let maxProv = '', maxArea = 0;
        provs.forEach(p => {
            const area = ZAMBIA_DISTRICTS.filter(d => d.province === p).reduce((s, d) => s + d.area_km2, 0);
            if (area > maxArea) { maxArea = area; maxProv = p; }
        });
        return `<strong>${maxProv}</strong> is the largest province by area: <strong>${maxArea.toLocaleString()} km²</strong>.`;
    }

    function getProvinceSummaryStory() {
        const provs = [...new Set(ZAMBIA_DISTRICTS.map(d => d.province))];
        return provs.slice(0, 5).map(p => {
            const count = ZAMBIA_DISTRICTS.filter(d => d.province === p).length;
            const pop = ZAMBIA_DISTRICTS.filter(d => d.province === p).reduce((s, d) => s + d.pop, 0);
            return `<strong>${p}</strong> (${count} districts, ${pop.toLocaleString()})`;
        }).join(' · ') + ' · and 5 more...';
    }

    let _storyInterval = null;
    let _storyIndex = 0;

    function startDataStory(containerId) {
        stopDataStory();
        const container = document.getElementById(containerId);
        if (!container) return;
        _storyIndex = 0;
        _showStorySlide(container, _storyIndex);
        _storyInterval = setInterval(() => {
            _storyIndex = (_storyIndex + 1) % DATA_STORY_SLIDES.length;
            _showStorySlide(container, _storyIndex);
        }, 6000);
    }

    function stopDataStory() {
        if (_storyInterval) {
            clearInterval(_storyInterval);
            _storyInterval = null;
        }
    }

    function _showStorySlide(container, index) {
        const slide = DATA_STORY_SLIDES[index];
        container.style.opacity = '0';
        setTimeout(() => {
            container.innerHTML = `
                <div style="text-align:center;padding:20px;">
                    <div style="font-size:2.5rem;margin-bottom:10px;">${slide.icon}</div>
                    <h3 style="font-size:1rem;font-weight:900;color:#fff;margin-bottom:4px;">${slide.title}</h3>
                    <p style="font-size:.7rem;font-weight:700;color:${slide.color};text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;">${slide.subtitle}</p>
                    <p style="font-size:.8rem;color:rgba(255,255,255,.75);line-height:1.6;max-width:400px;margin:0 auto;">${slide.content}</p>
                    <div style="display:flex;gap:5px;justify-content:center;margin-top:14px;">
                        ${DATA_STORY_SLIDES.map((_, i) => `<div style="width:${i === index ? '16px' : '7px'};height:7px;border-radius:${i === index ? '4px' : '50%'};background:${i === index ? slide.color : 'rgba(255,255,255,.2)'};transition:all .3s;"></div>`).join('')}
                    </div>
                </div>
            `;
            container.style.opacity = '1';
        }, 300);
        container.style.transition = 'opacity .3s';
    }

    // ─────────────────────────────────────────────────────────────
    // 8. Geocoding / Reverse Geocoding
    // ─────────────────────────────────────────────────────────────
    function geocode(query) {
        const q = query.toLowerCase().trim();
        if (!q) return [];
        const results = [];
        // Search districts
        ZAMBIA_DISTRICTS.forEach(d => {
            if (d.district.toLowerCase().includes(q) || d.province.toLowerCase().includes(q)) {
                results.push({
                    type: 'district',
                    name: d.district,
                    province: d.province,
                    lat: d.lat,
                    lng: d.lng,
                    pop: d.pop,
                    area: d.area_km2
                });
            }
        });
        return results.slice(0, 10);
    }

    function reverseGeocode(lat, lng) {
        // Find nearest district by centroid distance
        let nearest = null;
        let minDist = Infinity;
        ZAMBIA_DISTRICTS.forEach(d => {
            const dist = Math.sqrt(Math.pow(d.lat - lat, 2) + Math.pow(d.lng - lng, 2));
            if (dist < minDist) {
                minDist = dist;
                nearest = d;
            }
        });
        if (nearest) {
            return {
                district: nearest.district,
                province: nearest.province,
                region: nearest.region,
                lat: nearest.lat,
                lng: nearest.lng,
                pop: nearest.pop,
                distance_deg: minDist.toFixed(4)
            };
        }
        return null;
    }

    function renderGeocodeResults(results) {
        if (!results || results.length === 0) {
            return '<div style="padding:14px;text-align:center;color:var(--muted);font-size:.74rem;">No places found. Try a district or province name.</div>';
        }
        let html = `<div style="padding:8px;">`;
        results.forEach(r => {
            html += `<div style="display:flex;align-items:center;gap:8px;padding:7px 9px;border-radius:7px;cursor:pointer;border:1px solid rgba(255,255,255,.06);margin-bottom:3px;transition:all .15s;"
                onclick="GeoHubFeatures._geocodeFlyTo(${r.lat}, ${r.lng}, '${r.name}')"
                onmouseover="this.style.background='rgba(76,175,80,.12)'" onmouseout="this.style.background='transparent'">
                <i class="fas fa-map-marker-alt" style="color:var(--g5);font-size:.85rem;width:16px;text-align:center;"></i>
                <div style="flex:1;">
                    <div style="font-size:.75rem;font-weight:700;color:#fff;">${r.name}</div>
                    <div style="font-size:.65rem;color:var(--muted);">${r.province} · ${r.pop.toLocaleString()} people</div>
                </div>
                <span style="font-size:.62rem;color:var(--muted);font-family:monospace;">${r.lat.toFixed(4)}, ${r.lng.toFixed(4)}</span>
            </div>`;
        });
        html += `</div>`;
        return html;
    }

    // Will be called on map fly-to
    function _geocodeFlyTo(lat, lng, name) {
        document.dispatchEvent(new CustomEvent('ghz:flyto', { detail: { lat, lng, name } }));
    }

    // ─────────────────────────────────────────────────────────────
    // 9. Water Body Layer Data (Zambia major water bodies)
    // ─────────────────────────────────────────────────────────────
    const WATER_BODIES = [
        { name: 'Lake Kariba', lat: -17.0, lng: 28.0, area_km2: 5580, type: 'Reservoir', desc: 'World\'s largest man-made lake by volume' },
        { name: 'Lake Tanganyika', lat: -6.0, lng: 29.5, area_km2: 32900, type: 'Natural Lake', desc: 'Second deepest lake in the world (border with DRC/Tanzania)' },
        { name: 'Lake Bangweulu', lat: -11.0, lng: 29.8, area_km2: 15000, type: 'Wetland System', desc: 'Bangweulu Swamps — vast wetland ecosystem' },
        { name: 'Lake Mweru', lat: -9.0, lng: 28.5, area_km2: 5120, type: 'Natural Lake', desc: 'Shared with DRC, part of Congo River basin' },
        { name: 'Lake Mweru Wantipa', lat: -8.7, lng: 29.7, area_km2: 1500, type: 'Lake/Swamp', desc: 'Seasonally fluctuating lake in Northern Province' },
        { name: 'Kariba Dam', lat: -16.52, lng: 28.76, area_km2: 10, type: 'Dam', desc: 'Major hydroelectric dam on the Zambezi River' },
        { name: 'Kafue River', lat: -15.94, lng: 28.92, area_km2: 0, type: 'River', desc: 'Major tributary of the Zambezi, ~1,576 km long' },
        { name: 'Zambezi River', lat: -17.47, lng: 24.28, area_km2: 0, type: 'River', desc: 'Fourth-longest river in Africa, ~2,574 km' },
        { name: 'Victoria Falls', lat: -17.92, lng: 25.85, area_km2: 1, type: 'Waterfall', desc: 'One of the Seven Natural Wonders of the World' },
        { name: 'Luangwa River', lat: -12.5, lng: 32.0, area_km2: 0, type: 'River', desc: 'Major tributary of the Zambezi, ~770 km' },
        { name: 'Lake Lusiwashi', lat: -13.2, lng: 29.5, area_km2: 80, type: 'Natural Lake', desc: 'Small lake in Central Province' },
        { name: 'Lake Ishiba Ng\'andu', lat: -11.2, lng: 30.5, area_km2: 25, type: 'Natural Lake', desc: 'Also known as Lake of the Royal Crocodile' },
    ];

    function getWaterBodies() {
        return WATER_BODIES;
    }

    function renderWaterBodiesHTML() {
        let html = `<div style="padding:10px 12px;">`;
        html += `<div style="font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.5px;color:rgba(76,175,80,.7);margin-bottom:8px;"><i class="fas fa-water" style="margin-right:5px;"></i> Zambia Water Bodies <span style="font-weight:400;color:var(--muted);text-transform:none;">— ${WATER_BODIES.length} features</span></div>`;
        html += `<div style="max-height:250px;overflow-y:auto;">`;
        WATER_BODIES.forEach(w => {
            const icon = w.type === 'River' ? 'fa-river' : w.type === 'Dam' ? 'fa-dam' : w.type === 'Waterfall' ? 'fa-waterfall' : 'fa-water';
            html += `<div style="display:flex;align-items:center;gap:7px;padding:5px 7px;border-radius:6px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,.04);transition:all .12s;"
                onclick="GeoHubFeatures._geocodeFlyTo(${w.lat}, ${w.lng}, '${w.name.replace(/'/g, "\\'")}')"
                onmouseover="this.style.background='rgba(37,99,235,.15)'" onmouseout="this.style.background='transparent'">
                <i class="fas ${icon}" style="color:#60a5fa;font-size:.75rem;width:14px;text-align:center;"></i>
                <div style="flex:1;">
                    <div style="font-size:.72rem;font-weight:700;color:#fff;">${w.name}</div>
                    <div style="font-size:.6rem;color:var(--muted);">${w.type}${w.area_km2 > 0 ? ` · ${w.area_km2.toLocaleString()} km²` : ''}</div>
                </div>
                <span style="font-size:.58rem;color:var(--muted);text-align:right;max-width:90px;">${w.desc.substring(0, 40)}${w.desc.length > 40 ? '...' : ''}</span>
            </div>`;
        });
        html += `</div></div>`;
        return html;
    }

    // ─────────────────────────────────────────────────────────────
    // 10. UI Components — Floating panel creators
    // ─────────────────────────────────────────────────────────────
    function createFloatingPanel(id, title, icon, content, opts = {}) {
        const existing = document.getElementById(id);
        if (existing) {
            existing.style.display = existing.style.display === 'none' ? 'block' : 'none';
            if (existing.style.display === 'block') {
                const body = existing.querySelector('.fp-body');
                if (body && content) body.innerHTML = content;
            }
            return existing;
        }
        const panel = document.createElement('div');
        panel.id = id;
        panel.className = 'ghz-floating-panel';
        panel.style.cssText = `
            position:fixed;${opts.position || 'top:calc(var(--nb,54px)+10px);right:12px;'}
            width:${opts.width || '360px'};max-height:${opts.maxHeight || '80vh'};
            background:rgba(6,15,10,.98);border:1px solid var(--border, #1e3a22);
            border-radius:14px;z-index:900;display:block;
            backdrop-filter:blur(16px);box-shadow:0 12px 48px rgba(0,0,0,.6);
            overflow:hidden;font-family:'Inter',sans-serif;
            transition:all .2s ease;
        `;
        panel.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:linear-gradient(90deg,rgba(26,107,53,.2),rgba(45,158,95,.08));border-bottom:1px solid var(--border, #1e3a22);">
                <div style="display:flex;align-items:center;gap:8px;">
                    <i class="${icon}" style="color:var(--g5, #4CAF50);font-size:.85rem;"></i>
                    <span style="font-size:.8rem;font-weight:800;color:#fff;">${title}</span>
                </div>
                <div style="display:flex;gap:4px;">
                    ${opts.pin !== false ? `<button class="fp-pin" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:.75rem;padding:2px 5px;border-radius:5px;" onclick="this.classList.toggle('pinned');this.style.color=this.classList.contains('pinned')?'#fbbf24':''"><i class="fas fa-thumbtack"></i></button>` : ''}
                    <button class="fp-close" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:.82rem;padding:2px 5px;border-radius:5px;" onclick="this.closest('.ghz-floating-panel').remove()">&times;</button>
                </div>
            </div>
            <div class="fp-body" style="overflow-y:auto;max-height:calc(${opts.maxHeight || '80vh'} - 45px);">
                ${content || ''}
            </div>
        `;
        document.body.appendChild(panel);
        return panel;
    }

    // ─────────────────────────────────────────────────────────────
    // Chat UI
    // ─────────────────────────────────────────────────────────────
    function openChatAssistant() {
        const existing = document.getElementById('ghz-chat-panel');
        if (existing) {
            existing.style.display = existing.style.display === 'none' ? 'block' : 'none';
            return;
        }
        const panel = document.createElement('div');
        panel.id = 'ghz-chat-panel';
        panel.innerHTML = `
            <div class="ghz-chat-container">
                <div class="ghz-chat-head">
                    <div style="display:flex;align-items:center;gap:8px;">
                        <i class="fas fa-robot" style="font-size:1rem;"></i>
                        <span style="font-weight:800;font-size:.85rem;">GeoHub AI</span>
                    </div>
                    <div style="display:flex;gap:4px;">
                        <span class="ghz-chat-online" style="font-size:.6rem;color:#10b981;font-weight:700;">● ONLINE</span>
                        <button class="fp-close" style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:.9rem;padding:2px 6px;" onclick="this.closest('.ghz-chat-container').parentElement.remove()">&times;</button>
                    </div>
                </div>
                <div id="ghz-chat-messages" class="ghz-chat-msgs">
                    <div class="ghz-chat-msg bot">
                        <div class="ghz-chat-bubble">
                            <strong>👋 Hello! I'm GeoHub AI Assistant.</strong><br>
                            I can answer questions about Zambia's districts, climate, population, and help you navigate the platform.<br><br>
                            <em style="font-size:.72rem;">Try: "Population of Lusaka" or "Climate in Copperbelt"</em>
                        </div>
                    </div>
                </div>
                <div class="ghz-chat-input-row">
                    <input id="ghz-chat-input" type="text" placeholder="Ask me anything about Zambia data..." class="ghz-chat-inp"
                        onkeydown="if(event.key==='Enter')GeoHubFeatures.sendChatMessage()">
                    <button class="ghz-chat-send" onclick="GeoHubFeatures.sendChatMessage()">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                <div class="ghz-chat-suggestions">
                    <span onclick="GeoHubFeatures._suggestClick(this)">Population of Lusaka</span>
                    <span onclick="GeoHubFeatures._suggestClick(this)">Districts in Copperbelt</span>
                    <span onclick="GeoHubFeatures._suggestClick(this)">Largest districts</span>
                    <span onclick="GeoHubFeatures._suggestClick(this)">Open map</span>
                </div>
            </div>
            <style>
                .ghz-chat-container {
                    position:fixed;bottom:80px;right:16px;width:360px;height:500px;
                    background:rgba(6,15,10,.98);border:1px solid #1e3a22;
                    border-radius:16px;z-index:9500;display:flex;flex-direction:column;
                    backdrop-filter:blur(16px);box-shadow:0 12px 48px rgba(0,0,0,.6);
                    overflow:hidden;font-family:'Inter',sans-serif;
                }
                .ghz-chat-head {
                    display:flex;align-items:center;justify-content:space-between;
                    padding:10px 14px;background:linear-gradient(90deg,rgba(26,107,53,.25),rgba(45,158,95,.1));
                    border-bottom:1px solid #1e3a22;color:#fff;flex-shrink:0;
                }
                .ghz-chat-msgs {
                    flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:8px;
                }
                .ghz-chat-msgs::-webkit-scrollbar{width:3px;}
                .ghz-chat-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:2px;}
                .ghz-chat-msg { display:flex; }
                .ghz-chat-msg.user { justify-content:flex-end; }
                .ghz-chat-msg.bot { justify-content:flex-start; }
                .ghz-chat-bubble {
                    max-width:85%;padding:8px 12px;border-radius:12px;
                    font-size:.75rem;line-height:1.5;color:rgba(255,255,255,.9);
                }
                .ghz-chat-msg.user .ghz-chat-bubble {
                    background:rgba(26,107,53,.5);border:1px solid rgba(76,175,80,.3);
                    border-bottom-right-radius:4px;
                }
                .ghz-chat-msg.bot .ghz-chat-bubble {
                    background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);
                    border-bottom-left-radius:4px;
                }
                .ghz-chat-input-row {
                    display:flex;align-items:center;gap:5px;padding:8px 10px;
                    border-top:1px solid #1e3a22;flex-shrink:0;background:rgba(0,0,0,.2);
                }
                .ghz-chat-inp {
                    flex:1;padding:7px 10px;background:rgba(255,255,255,.07);border:1px solid #243d28;
                    border-radius:8px;color:#fff;font-family:'Inter',sans-serif;font-size:.78rem;outline:none;
                }
                .ghz-chat-inp:focus{border-color:var(--g4);}
                .ghz-chat-inp::placeholder{color:rgba(255,255,255,.3);}
                .ghz-chat-send {
                    width:34px;height:34px;background:linear-gradient(135deg,#1a6b35,#2d9e5f);
                    border:none;border-radius:8px;color:#fff;cursor:pointer;display:flex;
                    align-items:center;justify-content:center;font-size:.85rem;transition:all .15s;
                    flex-shrink:0;
                }
                .ghz-chat-send:hover{transform:scale(1.05);}
                .ghz-chat-suggestions {
                    display:flex;gap:5px;padding:6px 10px;flex-wrap:wrap;
                    border-top:1px solid rgba(255,255,255,.04);flex-shrink:0;
                }
                .ghz-chat-suggestions span {
                    font-size:.62rem;font-weight:600;color:rgba(76,175,80,.7);
                    background:rgba(76,175,80,.08);border:1px solid rgba(76,175,80,.15);
                    border-radius:12px;padding:3px 9px;cursor:pointer;transition:all .15s;
                    white-space:nowrap;
                }
                .ghz-chat-suggestions span:hover{background:rgba(76,175,80,.2);color:#fff;}
            </style>
        `;
        document.body.appendChild(panel);
        setTimeout(() => {
            const inp = document.getElementById('ghz-chat-input');
            if (inp) inp.focus();
        }, 300);
    }

    function sendChatMessage() {
        const inp = document.getElementById('ghz-chat-input');
        if (!inp || !inp.value.trim()) return;
        const msg = inp.value.trim();
        inp.value = '';
        const msgsContainer = document.getElementById('ghz-chat-messages');
        if (!msgsContainer) return;
        // Add user message
        const userDiv = document.createElement('div');
        userDiv.className = 'ghz-chat-msg user';
        userDiv.innerHTML = `<div class="ghz-chat-bubble">${escapeHtml(msg)}</div>`;
        msgsContainer.appendChild(userDiv);
        msgsContainer.scrollTop = msgsContainer.scrollHeight;
        // Process
        const result = chatQuery(msg);
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.className = 'ghz-chat-msg bot';
            let responseHtml = '';
            if (result.type === 'navigate') {
                responseHtml = `<div class="ghz-chat-bubble">${result.text}</div>`;
                // Execute navigation
                setTimeout(() => {
                    if (result.action === 'map') window.location.href = 'map.html';
                    else if (result.action === 'dashboard') window.location.href = 'dashboard.html';
                    else if (result.action === 'analytics') document.dispatchEvent(new CustomEvent('ghz:analytics'));
                    else if (result.action === 'weather') document.dispatchEvent(new CustomEvent('ghz:weather'));
                    else if (result.action === 'compare') document.dispatchEvent(new CustomEvent('ghz:compare'));
                }, 800);
            } else {
                responseHtml = `<div class="ghz-chat-bubble">${result.text}</div>`;
            }
            botDiv.innerHTML = responseHtml;
            msgsContainer.appendChild(botDiv);
            msgsContainer.scrollTop = msgsContainer.scrollHeight;
        }, 300);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function _suggestClick(el) {
        const inp = document.getElementById('ghz-chat-input');
        if (inp) {
            inp.value = el.textContent;
            sendChatMessage();
        }
    }

    // ─────────────────────────────────────────────────────────────
    // Initialize
    // ─────────────────────────────────────────────────────────────
    function init() {
        setupKeyboardShortcuts();
        // Wire up language change listener
        document.addEventListener('ghz:langchange', () => {
            // Re-translate UI elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                el.textContent = t(key);
            });
        });
    }

    // Auto-init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ─────────────────────────────────────────────────────────────
    // Public API
    // ─────────────────────────────────────────────────────────────
    return {
        // i18n
        t, setLanguage, getLanguage, LANGS, TRANSLATIONS,
        // Chat
        chatQuery, openChatAssistant, sendChatMessage,
        // Comparison
        addToComparison, removeFromComparison, clearComparison, getComparison, getComparisonData, renderComparisonHTML,
        // PDF
        exportPDF, exportDistrictReport,
        // Weather
        getWeatherAlerts, renderWeatherPanel,
        // Map states
        saveMapState, getMapStates, deleteMapState, loadMapState,
        // Shortcuts
        SHORTCUTS, renderShortcutsHTML, setupKeyboardShortcuts,
        // Story
        DATA_STORY_SLIDES, startDataStory, stopDataStory,
        // Geocode
        geocode, reverseGeocode, renderGeocodeResults, _geocodeFlyTo,
        // Water bodies
        getWaterBodies, renderWaterBodiesHTML,
        // UI
        createFloatingPanel
    };
})();