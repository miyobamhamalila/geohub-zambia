from flask import Flask, render_template, jsonify, request
import ee

app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')

# Initialize Earth Engine when the app starts
def initialize_earth_engine():
    try:
        ee.Initialize()
        print('Earth Engine initialized successfully')
    except Exception as e:
        print('Earth Engine initialization failed:', str(e))
        # Try to authenticate if initialization fails
        try:
            ee.Authenticate()
            ee.Initialize()
            print('Earth Engine authenticated and initialized')
        except Exception as auth_error:
            print('Earth Engine authentication failed:', str(auth_error))
            raise auth_error

# Initialize Earth Engine
initialize_earth_engine()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/hello')
def hello():
    return jsonify({'message': 'Hello from Flask with Earth Engine!'})

@app.route('/map')
def get_map():
    dataset = request.args.get('dataset')
    year = request.args.get('year')

    if dataset == 'lulc':
        return get_lulc_map(year)

    elif dataset == 'ndvi':
        return get_ndvi_map(year)

    elif dataset == 'chirps':
        return get_chirps_map(year)

    elif dataset == 'lst':
        return get_lst_map(year)

    elif dataset == 'drought':
        return get_drought_map(year)

    elif dataset == 'flood':
        return get_flood_map(year)
    
    return jsonify({'error': 'Invalid dataset'})

def get_lulc_map(year):
    # Zambia boundary
    zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
        .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
        .geometry()

    # Updated to non-deprecated MODIS/061 collection
    lulc_collection = ee.ImageCollection("MODIS/061/MCD12Q1") \
        .filterDate(f'{year}-01-01', f'{year}-12-31') \
        .select('LC_Type1')

    # Fallback to 2022 if no data available for the requested year
    lulc_fallback = ee.ImageCollection("MODIS/061/MCD12Q1") \
        .filterDate('2022-01-01', '2022-12-31') \
        .select('LC_Type1')

    # Use mosaic() instead of first() so all MODIS tiles are combined
    # (Zambia spans ~4 sinusoidal tiles; first() only returns one)
    lulc = ee.Image(ee.Algorithms.If(
        lulc_collection.size().gt(0),
        lulc_collection.mosaic().clip(zambia),
        lulc_fallback.mosaic().clip(zambia)
    ))

    # Full IGBP palette — 17 classes (LC_Type1 values 1-17)
    vis = {
        'min': 1,
        'max': 17,
        'palette': [
            '05450a',  # 1  Evergreen Needleleaf Forest
            '086a10',  # 2  Evergreen Broadleaf Forest
            '54a708',  # 3  Deciduous Needleleaf Forest
            '78d203',  # 4  Deciduous Broadleaf Forest
            '009900',  # 5  Mixed Forest
            'c6b044',  # 6  Closed Shrubland
            'dcd159',  # 7  Open Shrubland
            'dade48',  # 8  Woody Savanna
            'fbff13',  # 9  Savanna
            'b6ff05',  # 10 Grassland
            '27ff87',  # 11 Permanent Wetland
            'c24f44',  # 12 Cropland
            'a5a5a5',  # 13 Urban and Built-up
            'ff6d4c',  # 14 Cropland/Natural Veg. Mosaic
            '69fff8',  # 15 Permanent Snow and Ice
            'f9ffa4',  # 16 Barren
            '1c0dff'   # 17 Water Bodies
        ]
    }

    map_id = lulc.getMapId(vis)
    return jsonify({'tile_url': map_id['tile_fetcher'].url_format})

def get_ndvi_map(year):
    """Get NDVI map for specified year"""
    try:
        # Zambia boundary
        zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
            .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
            .geometry()
        
        # Get NDVI from MODIS
        ndvi = ee.ImageCollection("MODIS/006/MOD13A2") \
            .filter(ee.Filter.date(f'{year}-01-01', f'{year}-12-31')) \
            .mean() \
            .select('NDVI') \
            .clip(zambia)
        
        # Get map ID for visualization
        map_id = ndvi.getMapId({
            'min': 0,
            'max': 10000,
            'palette': ['ffffff', 'ce7e45', 'df923d', 'f1b555', 'fcd163', '99b718', '74a901', '66a000', '529400', '3e8601', '207401', '056201', '004c00', '023b01', '012e01']
        })
        
        return jsonify({
            'mapid': map_id['mapid'],
            'token': map_id['token'],
            'dataset': 'ndvi',
            'year': year
        })
    except Exception as e:
        return jsonify({'error': str(e)})

def get_chirps_map(year):
    """Get CHIRPS precipitation map for specified year"""
    try:
        # Zambia boundary
        zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
            .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
            .geometry()
        
        # Get CHIRPS precipitation data
        precip = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY") \
            .filter(ee.Filter.date(f'{year}-01-01', f'{year}-12-31')) \
            .sum() \
            .clip(zambia)
        
        # Get map ID for visualization
        map_id = precip.getMapId({
            'min': 0,
            'max': 2000,
            'palette': ['ffffe5', 'fff7bc', 'fee391', 'fec44f', 'fe9929', 'ec7014', 'cc4c02', '993404', '662506']
        })
        
        return jsonify({
            'mapid': map_id['mapid'],
            'token': map_id['token'],
            'dataset': 'chirps',
            'year': year
        })
    except Exception as e:
        return jsonify({'error': str(e)})

def get_lst_map(year):
    """Get Land Surface Temperature map for specified year"""
    try:
        # Zambia boundary
        zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
            .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
            .geometry()
        
        # Get LST from MODIS
        lst = ee.ImageCollection("MODIS/006/MOD11A2") \
            .filter(ee.Filter.date(f'{year}-01-01', f'{year}-12-31')) \
            .mean() \
            .select('LST_Day_1km') \
            .clip(zambia)
        
        # Convert Kelvin to Celsius (scale factor 0.02)
        lst_celsius = lst.multiply(0.02).subtract(273.15)
        
        # Get map ID for visualization
        map_id = lst_celsius.getMapId({
            'min': 0,
            'max': 50,
            'palette': ['blue', 'cyan', 'green', 'yellow', 'red']
        })
        
        return jsonify({
            'mapid': map_id['mapid'],
            'token': map_id['token'],
            'dataset': 'lst',
            'year': year
        })
    except Exception as e:
        return jsonify({'error': str(e)})

def get_drought_map(year):
    """Get drought map for specified year using VCI (Vegetation Condition Index)"""
    try:
        # Zambia boundary
        zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
            .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
            .geometry()

        # Use updated MODIS collection (061 supersedes deprecated 006)
        modis_collection = "MODIS/061/MOD13A2"

        # Get NDVI for the requested year; fall back to 2023 if collection is empty
        ndvi_year = ee.ImageCollection(modis_collection) \
            .filter(ee.Filter.date(f'{year}-01-01', f'{year}-12-31')) \
            .select('NDVI')

        ndvi_fallback = ee.ImageCollection(modis_collection) \
            .filter(ee.Filter.date('2023-01-01', '2023-12-31')) \
            .select('NDVI')

        # Server-side conditional: use requested year if data exists, else fallback
        ndvi_mean = ee.Image(ee.Algorithms.If(
            ndvi_year.size().gt(0),
            ndvi_year.mean(),
            ndvi_fallback.mean()
        ))

        # Historical baseline for VCI (2000-2023)
        baseline = ee.ImageCollection(modis_collection) \
            .filter(ee.Filter.date('2000-01-01', '2023-12-31')) \
            .select('NDVI')

        # After reduce(), band is renamed to 'NDVI_min' / 'NDVI_max' — rename back
        ndvi_min = baseline.reduce(ee.Reducer.min()).rename('NDVI')
        ndvi_max = baseline.reduce(ee.Reducer.max()).rename('NDVI')

        # VCI = (NDVI - NDVI_min) / (NDVI_max - NDVI_min) * 100
        vci = ndvi_mean \
            .subtract(ndvi_min) \
            .divide(ndvi_max.subtract(ndvi_min)) \
            .multiply(100) \
            .clip(zambia)

        map_id = vci.getMapId({
            'min': 0,
            'max': 100,
            'palette': ['red', 'yellow', 'green']
        })

        return jsonify({
            'mapid': map_id['mapid'],
            'token': map_id['token'],
            'dataset': 'drought',
            'year': year
        })
    except Exception as e:
        return jsonify({'error': str(e)})

def get_flood_map(year):
    """Get flood/surface-water map for specified year using JRC GSW YearlyHistory"""
    try:
        # Zambia boundary
        zambia = ee.FeatureCollection("FAO/GAUL/2015/level0") \
            .filter(ee.Filter.eq('ADM0_NAME', 'Zambia')) \
            .geometry()

        # JRC GSW YearlyHistory covers 1984-2021; clamp to latest available year
        MAX_JRC_YEAR = 2021
        query_year = min(int(year), MAX_JRC_YEAR)

        # YearlyHistory has a 'waterClass' band:
        #   0 = no data, 1 = not water, 2 = seasonal water, 3 = permanent water
        yearly = ee.ImageCollection("JRC/GSW1_4/YearlyHistory") \
            .filter(ee.Filter.calendarRange(query_year, query_year, 'year')) \
            .first()

        # Fallback to most recent known year if somehow still empty
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

        # Water mask: waterClass >= 2 (seasonal or permanent water)
        water_mask = water_img.select('waterClass').gte(2).clip(zambia)

        map_id = water_mask.getMapId({
            'min': 0,
            'max': 1,
            'palette': ['ffffff', '0000ff']
        })

        return jsonify({
            'mapid': map_id['mapid'],
            'token': map_id['token'],
            'dataset': 'flood',
            'year': year
        })
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)