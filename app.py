from flask import Flask, render_template, jsonify, request, send_file, Response
import ee
import os
import json
import google.auth
from google.oauth2 import service_account
from google.auth.transport.requests import Request
import requests

app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')
# Disable caching for templates
app.jinja_env.cache = None
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Initialize Earth Engine when the app starts
def initialize_earth_engine():
    try:
        creds_path = os.path.join(os.path.dirname(__file__), 'credentials.json')
        service_account = 'geohub-zambia@gen-lang-client-0917578591.iam.gserviceaccount.com'
        project_id = 'gen-lang-client-0917578591'

        # Strategy 1: Service account with explicit project
        if os.path.exists(creds_path):
            try:
                print('Trying EE init with service account + project...')
                credentials = ee.ServiceAccountCredentials(service_account, creds_path)
                ee.Initialize(credentials, project=project_id)
                print('Earth Engine initialized (service account + project)')
                test = ee.Number(1).getInfo()
                print('EE test value:', test)
                return
            except Exception as e:
                print('Strategy 1 failed:', str(e))

        # Strategy 2: Default credentials (user's EE auth)
        try:
            print('Trying EE init with default credentials...')
            ee.Initialize()
            print('Earth Engine initialized (default credentials)')
            test = ee.Number(1).getInfo()
            print('EE test value:', test)
            return
        except Exception as e:
            print('Strategy 2 failed:', str(e))

        # Strategy 3: Service account without explicit project
        if os.path.exists(creds_path):
            try:
                print('Trying EE init with service account only...')
                credentials = ee.ServiceAccountCredentials(service_account, creds_path)
                ee.Initialize(credentials)
                print('Earth Engine initialized (service account only)')
                test = ee.Number(1).getInfo()
                print('EE test value:', test)
                return
            except Exception as e:
                print('Strategy 3 failed:', str(e))

        raise Exception('All EE initialization strategies failed')
    except Exception as e:
        print('Earth Engine initialization failed:', str(e))
        raise

# Initialize Earth Engine
initialize_earth_engine()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/map')
def map_page():
    return render_template('map.html')

@app.route('/hello')
def hello():
    return jsonify({'message': 'Hello from Flask with Earth Engine!'})

@app.route('/api/tile')
def proxy_tile():
    """Proxy Earth Engine tile requests with authentication"""
    dataset = request.args.get('dataset')
    year = request.args.get('year')
    z = request.args.get('z')
    x = request.args.get('x')
    y = request.args.get('y')

    if not all([dataset, year, z, x, y]):
        return jsonify({'error': 'Missing parameters'}), 400

    try:
        # Get tile URL from the appropriate dataset function
        if dataset == 'lulc':
            tile_url_template = get_lulc_tile_url(year)
        elif dataset == 'ndvi':
            tile_url_template = get_ndvi_tile_url(year)
        elif dataset == 'chirps':
            tile_url_template = get_chirps_tile_url(year)
        elif dataset == 'lst':
            tile_url_template = get_lst_tile_url(year)
        elif dataset == 'drought':
            tile_url_template = get_drought_tile_url(year)
        elif dataset == 'flood':
            tile_url_template = get_flood_tile_url(year)
        else:
            return jsonify({'error': 'Invalid dataset'}), 400

        # Format tile URL with coordinates
        formatted_url = tile_url_template.format(z=z, x=x, y=y)

        # Use Earth Engine's persistent credentials (same as used for getMapId)
        credentials = ee.data.get_persistent_credentials()
        if not credentials or not credentials.token:
            raise Exception('No Earth Engine credentials available')
        token = credentials.token

        # Fetch tile from Earth Engine with auth
        headers = {'Authorization': 'Bearer ' + token}
        resp = requests.get(formatted_url, headers=headers, timeout=15)

        if resp.status_code == 200:
            return Response(resp.content, content_type=resp.headers.get('Content-Type', 'image/png'))
        else:
            return Response(resp.content, status=resp.status_code)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


def get_lulc_tile_url(year):
    """Helper to get raw LULC tile URL (no JSON wrapper)"""
    zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
        .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
        .geometry()
    lulc_collection = ee.ImageCollection("MODIS/061/MCD12Q1") \
        .filterDate(f'{year}-01-01', f'{year}-12-31') \
        .select('LC_Type1')
    lulc_fallback = ee.ImageCollection("MODIS/061/MCD12Q1") \
        .filterDate('2022-01-01', '2022-12-31') \
        .select('LC_Type1')
    lulc = ee.Image(ee.Algorithms.If(
        lulc_collection.size().gt(0),
        lulc_collection.mosaic().clip(zambia),
        lulc_fallback.mosaic().clip(zambia)
    ))
    vis = {
        'min': 1, 'max': 17,
        'palette': ['05450a','086a10','54a708','78d203','009900','c6b044','dcd159','dade48','fbff13','b6ff05','27ff87','c24f44','a5a5a5','ff6d4c','69fff8','f9ffa4','1c0dff']
    }
    map_id = lulc.getMapId(vis)
    return map_id['tile_fetcher'].url_format


def get_ndvi_tile_url(year):
    zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
        .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
        .geometry()
    ndvi_col = ee.ImageCollection("MODIS/061/MOD13A2") \
        .filter(ee.Filter.date(f'{year}-01-01', f'{year}-12-31')) \
        .select('NDVI')
    ndvi_fallback = ee.ImageCollection("MODIS/061/MOD13A2") \
        .filter(ee.Filter.date('2023-01-01', '2023-12-31')) \
        .select('NDVI')
    ndvi = ee.Image(ee.Algorithms.If(
        ndvi_col.size().gt(0),
        ndvi_col.mean(),
        ndvi_fallback.mean()
    )).clip(zambia)
    ndvi_scaled = ndvi.multiply(0.0001)
    vis = {'min': 0.1, 'max': 0.8, 'palette': ['ce7e45','df923d','f1b555','fcd163','99b718','74a901','66a000','529400','3e8601','207401','056201','004c00']}
    map_id = ndvi_scaled.getMapId(vis)
    return map_id['tile_fetcher'].url_format


def get_chirps_tile_url(year):
    zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
        .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
        .geometry()
    precip = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY") \
        .filter(ee.Filter.date(f'{year}-01-01', f'{year}-12-31')) \
        .sum() \
        .clip(zambia)
    map_id = precip.getMapId({
        'min': 0, 'max': 2000,
        'palette': ['fff7fb','d0d1e6','a6bddb','74a9cf','3690c0','0570b0','034e7b']
    })
    return map_id['tile_fetcher'].url_format


def get_lst_tile_url(year):
    zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
        .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
        .geometry()
    lst_col = ee.ImageCollection("MODIS/061/MOD11A2") \
        .filter(ee.Filter.date(f'{year}-01-01', f'{year}-12-31')) \
        .select('LST_Day_1km')
    lst_fallback = ee.ImageCollection("MODIS/061/MOD11A2") \
        .filter(ee.Filter.date('2023-01-01', '2023-12-31')) \
        .select('LST_Day_1km')
    lst = ee.Image(ee.Algorithms.If(
        lst_col.size().gt(0),
        lst_col.mean(),
        lst_fallback.mean()
    ))
    lst_celsius = lst.multiply(0.02).subtract(273.15).clip(zambia)
    map_id = lst_celsius.getMapId({
        'min': 15, 'max': 50,
        'palette': ['040274','040281','0502a3','0502b8','0602ff','235cb1','307ef3','269db1','30c8e2','32d3ef','3be285','3ff38f','86e26f','3ae237','b5e22e','d6e21f','fff705','ffd611','ffb613','ff8b13','ff6e08','ff500d','ff0000','de0101','c21301','a71001','911003']
    })
    return map_id['tile_fetcher'].url_format


def get_drought_tile_url(year):
    zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
        .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
        .geometry()
    modis_collection = "MODIS/061/MOD13A2"
    ndvi_year = ee.ImageCollection(modis_collection) \
        .filter(ee.Filter.date(f'{year}-01-01', f'{year}-12-31')) \
        .select('NDVI')
    ndvi_fallback = ee.ImageCollection(modis_collection) \
        .filter(ee.Filter.date('2023-01-01', '2023-12-31')) \
        .select('NDVI')
    ndvi_mean = ee.Image(ee.Algorithms.If(
        ndvi_year.size().gt(0),
        ndvi_year.mean(),
        ndvi_fallback.mean()
    ))
    baseline = ee.ImageCollection(modis_collection) \
        .filter(ee.Filter.date('2000-01-01', '2023-12-31')) \
        .select('NDVI')
    ndvi_min = baseline.reduce(ee.Reducer.min()).rename('NDVI')
    ndvi_max = baseline.reduce(ee.Reducer.max()).rename('NDVI')
    vci = ndvi_mean.subtract(ndvi_min).divide(ndvi_max.subtract(ndvi_min)).multiply(100).clip(zambia)
    map_id = vci.getMapId({
        'min': 0, 'max': 100,
        'palette': ['a50026','d73027','f46d43','fdae61','fee08b','ffffbf','d9ef8b','a6d96a','66bd63','1a9850','006837']
    })
    return map_id['tile_fetcher'].url_format


def get_flood_tile_url(year):
    zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
        .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
        .geometry()
    MAX_JRC_YEAR = 2021
    query_year = min(int(year), MAX_JRC_YEAR)
    yearly = ee.ImageCollection("JRC/GSW1_4/YearlyHistory") \
        .filter(ee.Filter.calendarRange(query_year, query_year, 'year')) \
        .first()
    fallback = ee.ImageCollection("JRC/GSW1_4/YearlyHistory") \
        .filter(ee.Filter.calendarRange(MAX_JRC_YEAR, MAX_JRC_YEAR, 'year')) \
        .first()
    water_img = ee.Image(ee.Algorithms.If(
        ee.ImageCollection("JRC/GSW1_4/YearlyHistory")
            .filter(ee.Filter.calendarRange(query_year, query_year, 'year'))
            .size().gt(0),
        yearly,
        fallback
    ))
    water_mask = water_img.select('waterClass').gte(2).selfMask().clip(zambia)
    map_id = water_mask.getMapId({'min': 1, 'max': 1, 'palette': ['1a75ff']})
    return map_id['tile_fetcher'].url_format


DATASET_INFO = {
    'lulc':    {'units': '',  'palette': ['05450a','086a10','54a708','78d203','009900','c6b044','dcd159','dade48','fbff13','b6ff05','27ff87','c24f44','a5a5a5','ff6d4c','69fff8','f9ffa4','1c0dff'], 'min': 1,  'max': 17},
    'ndvi':    {'units': '',  'palette': ['ce7e45','df923d','f1b555','fcd163','99b718','74a901','66a000','529400','3e8601','207401','056201','004c00'],                              'min': 0.1,'max': 0.8},
    'chirps':  {'units': 'mm', 'palette': ['fff7fb','d0d1e6','a6bddb','74a9cf','3690c0','0570b0','034e7b'],                                                 'min': 0,  'max': 2000},
    'lst':     {'units': '°C', 'palette': ['040274','040281','0502a3','0502b8','0602ff','235cb1','307ef3','269db1','30c8e2','32d3ef','3be285','3ff38f','86e26f','3ae237','b5e22e','d6e21f','fff705','ffd611','ffb613','ff8b13','ff6e08','ff500d','ff000d','de0101','c21301','a71001','911003'], 'min': 15, 'max': 50},
    'drought': {'units': 'VCI', 'palette': ['a50026','d73027','f46d43','fdae61','fee08b','ffffbf','d9ef8b','a6d96a','66bd63','1a9850','006837'],                    'min': 0,  'max': 100},
    'flood':   {'units': 'water', 'palette': ['1a75ff'],                                                                                                         'min': 1,  'max': 1},
}
GEE_LABELS = {
    'lulc':    'Land Use / Land Cover',
    'ndvi':    'NDVI (Vegetation)',
    'chirps':  'Rainfall (CHIRPS)',
    'lst':     'Land Surface Temp',
    'drought': 'Drought Risk (VCI)',
    'flood':   'Flood / Surface Water',
}
GEE_UNITS = {
    'lulc':    '',
    'ndvi':    '',
    'chirps':  'mm',
    'lst':     '°C',
    'drought': 'VCI',
    'flood':   'Water',
}
GEE_PALETTES = {
    'lulc':    ['05450a','086a10','54a708','78d203','009900','c6b044','dcd159','dade48','fbff13','b6ff05','27ff87','c24f44','a5a5a5','ff6d4c','69fff8','f9ffa4','1c0dff'],
    'ndvi':    ['ce7e45','df923d','f1b555','fcd163','99b718','74a901','66a000','529400','3e8601','207401','056201','004c00'],
    'chirps':  ['fff7fb','d0d1e6','a6bddb','74a9cf','3690c0','0570b0','034e7b'],
    'lst':     ['040274','040281','0502a3','0502b8','0602ff','235cb1','307ef3','269db1','30c8e2','32d3ef','3be285','3ff38f','86e26f','3ae237','b5e22e','d6e21f','fff705','ffd611','ffb613','ff8b13','ff6e08','ff500d','ff000d','de0101','c21301','a71001','911003'],
    'drought': ['a50026','d73027','f46d43','fdae61','fee08b','ffffbf','d9ef8b','a6d96a','66bd63','1a9850','006837'],
    'flood':   ['1a75ff'],
}
GEE_MIN = {
    'lulc':    1,
    'ndvi':    0.1,
    'chirps':  0,
    'lst':     15,
    'drought': 0,
    'flood':   1,
}
GEE_MAX = {
    'lulc':    17,
    'ndvi':    0.8,
    'chirps':  2000,
    'lst':     50,
    'drought': 100,
    'flood':   1,
}

@app.route('/api/map')
def get_map():
    dataset = request.args.get('dataset')
    year = request.args.get('year')

    if dataset == 'lulc':
        try:
            tile_url_template = get_lulc_tile_url(year)
            # Return our proxy URL with placeholders
            proxy_url = f"/api/tile?dataset=lulc&year={year}&z={{z}}&x={{x}}&y={{y}}"
            return jsonify({
                'tile_url': proxy_url, 'dataset': 'lulc', 'year': year,
                'label': 'Land Use / Land Cover', 'units': '',
                'palette': GEE_PALETTES['lulc'], 'min': GEE_MIN['lulc'], 'max': GEE_MAX['lulc'],
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif dataset == 'ndvi':
        try:
            proxy_url = f"/api/tile?dataset=ndvi&year={year}&z={{z}}&x={{x}}&y={{y}}"
            return jsonify({
                'tile_url': proxy_url, 'dataset': 'ndvi', 'year': year,
                'label': 'NDVI (Vegetation)', 'units': '',
                'palette': GEE_PALETTES['ndvi'], 'min': GEE_MIN['ndvi'], 'max': GEE_MAX['ndvi'],
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif dataset == 'chirps':
        try:
            proxy_url = f"/api/tile?dataset=chirps&year={year}&z={{z}}&x={{x}}&y={{y}}"
            return jsonify({
                'tile_url': proxy_url, 'dataset': 'chirps', 'year': year,
                'label': 'Rainfall (CHIRPS)', 'units': 'mm',
                'palette': GEE_PALETTES['chirps'], 'min': GEE_MIN['chirps'], 'max': GEE_MAX['chirps'],
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif dataset == 'lst':
        try:
            proxy_url = f"/api/tile?dataset=lst&year={year}&z={{z}}&x={{x}}&y={{y}}"
            return jsonify({
                'tile_url': proxy_url, 'dataset': 'lst', 'year': year,
                'label': 'Land Surface Temp', 'units': '°C',
                'palette': GEE_PALETTES['lst'], 'min': GEE_MIN['lst'], 'max': GEE_MAX['lst'],
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif dataset == 'drought':
        try:
            proxy_url = f"/api/tile?dataset=drought&year={year}&z={{z}}&x={{x}}&y={{y}}"
            return jsonify({
                'tile_url': proxy_url, 'dataset': 'drought', 'year': year,
                'label': 'Drought Risk (VCI)', 'units': 'VCI',
                'palette': GEE_PALETTES['drought'], 'min': GEE_MIN['drought'], 'max': GEE_MAX['drought'],
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    elif dataset == 'flood':
        try:
            proxy_url = f"/api/tile?dataset=flood&year={year}&z={{z}}&x={{x}}&y={{y}}"
            return jsonify({
                'tile_url': proxy_url, 'dataset': 'flood', 'year': year,
                'label': 'Flood / Surface Water', 'units': 'Water',
                'palette': GEE_PALETTES['flood'], 'min': GEE_MIN['flood'], 'max': GEE_MAX['flood'],
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid dataset'}), 400

if __name__ == '__main__':
    app.run(debug=True)