// TO MAKE THE MAP APPEAR YOU MUST ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJib3ZlcnNlIiwiYSI6ImNrbXA2ODdnMzJibDAycXF1ODc2dmJtNngifQ.qHL3R2dqFpECCzUckaSl3w';

console.log('mapbox code loaded')

// initiate a new map by passing an object describing a config
// for more info see: https://docs.mapbox.com/mapbox-gl-js/api/map/
var map = new mapboxgl.Map({
    // id of div that will hold map
    container: 'map',

    // one of the existing mapbox map styles
    style: 'mapbox://styles/arboverse/ckq2l5cb12g8118qvn9bce5oj',

    // zoom in (greater = smaller area displayed)
    zoom: 2,

    // longitude, latitude of the map center
    center: [20, 0],
    preserveDrawingBuffer: true
});

var exportBtn = document.getElementById('downloadLink');
exportBtn.addEventListener('click', function () {
    this.href = map.getCanvas().toDataURL('image/png')
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// To labels appear on top of the layers
map.on('load', function () {
    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
});

// Declare a function that can add a raster tile layer to a Mapbox map
// Takes three parameters:
//   (mapVar) the Mapbox map object
//   (title) a string identifier for the source and layer
//   (url) the raster tile URL to add to the map
const addTileLayerToMap = (mapVar, title, url, type, paint, source_layer) => {
    console.log(mapVar, title, url);
    // Need to first add a source
    mapVar.addSource(title, {
        type: 'vector',
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        url: url
    });
    // Then add the layer, referencing the source
    mapVar.addLayer({
        'id': title,
        'type': type,
        'source': title,
        'paint': paint,
        'source-layer': source_layer
    });

    mapVar.setLayoutProperty(
        title,
        'visibility',
        'none'
    );
};

//RASTER
// declare a function that can add a raster tile layer to a Mapbox map
// takes three parameters:
//   (mapVar) the Mapbox map object
//   (title) a string identifier for the source and layer
//   (url) the raster tile URL to add to the map
const addRasterTileLayerToMap = (mapVar, title, url, type, source_layer, minzoom, maxzoom) => {
    console.log(mapVar, title, url)
    // need to first add a source
    mapVar.addSource(title, {
        type: 'raster',
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        url: url
    });
    // then add the layer, referencing the source
    map.addLayer({
        'id': title,
        'type': type,
        'source': title,
        "source-layer": source_layer,
        'minzoom': minzoom,
        'maxzoom': maxzoom
    });

    mapVar.setLayoutProperty(
        title,
        'visibility',
        'none'
    );
}
//map visibility checked
function update_map(cb) {
    var clickedLayers = cb.id
    clickedLayersList = clickedLayers.split(',')
    console.log(clickedLayersList)
    if (cb.checked) {
        for (let i = 0; i < clickedLayersList.length; i++) {
            clickedLayer = clickedLayersList[i];
            map.setLayoutProperty(
                clickedLayer,
                'visibility',
                'visible'
            );
        }

    } else {
        for (let i = 0; i < clickedLayersList.length; i++) {
            clickedLayer = clickedLayersList[i];
            map.setLayoutProperty(
                clickedLayer,
                'visibility',
                'none'
            );
        }
    }

    console.log(cb.checked);
}

var activeLayer = {}
function update_map_time(cb, model, year, prefix) {
    var yearFinal = parseInt(year) + 30
    var clickedLayer = "arboverse." + prefix + "_" + model + "_" + year + "_" + yearFinal
    if (prefix.startsWith('temp_')) {
        prefix = "temp_"
    }
    console.log(clickedLayer);
    if (cb.checked) {
        if (prefix in activeLayer) {
            map.setLayoutProperty(
                activeLayer[prefix],
                'visibility',
                'none'
            );
        }
        activeLayer[prefix] = clickedLayer
        map.setLayoutProperty(
            clickedLayer,
            'visibility',
            'visible'
        );
    } else {
        map.setLayoutProperty(
            activeLayer[prefix],
            'visibility',
            'none'
        );
        delete activeLayer[prefix];
    }
    console.log(activeLayer);
    console.log(cb.checked);
}

clickedLayer_old = ""
function update_map_only_time(cb, year, prefix) {
    var clickedLayer = "arboverse." + prefix + "_" + year
    console.log(clickedLayer);
    if (cb.checked) {
        if (clickedLayer_old !== "") {
            map.setLayoutProperty(
                clickedLayer_old,
                'visibility',
                'none'
            );
        }
        clickedLayer_old = clickedLayer
        map.setLayoutProperty(
            clickedLayer,
            'visibility',
            'visible'
        );
    } else {
        map.setLayoutProperty(
            clickedLayer_old,
            'visibility',
            'none'
        );
    }
    console.log(cb.checked);
}
map.on('load', async () => {
    //Annual temperature
    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp45_1985_2015', 'mapbox://arboverse.temp_min_rcp45_1985_2015', 'raster', 'mapbox://arboverse.temp_min_rcp45_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp45_1985_2015', 'mapbox://arboverse.temp_average_rcp45_1985_2015', 'raster', 'mapbox://arboverse.temp_average_rcp45_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp45_1985_2015', 'mapbox://arboverse.temp_max_rcp45_1985_2015', 'raster', 'mapbox://arboverse.temp_max_rcp45_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp85_1985_2015', 'mapbox://arboverse.temp_min_rcp85_1985_2015', 'raster', 'mapbox://arboverse.temp_min_rcp85_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp85_1985_2015', 'mapbox://arboverse.temp_average_rcp85_1985_2015', 'raster', 'mapbox://arboverse.temp_average_rcp85_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp85_1985_2015', 'mapbox://arboverse.temp_max_rcp85_1985_2015', 'raster', 'mapbox://arboverse.temp_max_rcp85_1985_2015', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp45_1995_2025', 'mapbox://arboverse.temp_min_rcp45_1995_2025', 'raster', 'mapbox://arboverse.temp_min_rcp45_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp45_1995_2025', 'mapbox://arboverse.temp_average_rcp45_1995_2025', 'raster', 'mapbox://arboverse.temp_average_rcp45_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp45_1995_2025', 'mapbox://arboverse.temp_max_rcp45_1995_2025', 'raster', 'mapbox://arboverse.temp_max_rcp45_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp85_1995_2025', 'mapbox://arboverse.temp_min_rcp85_1995_2025', 'raster', 'mapbox://arboverse.temp_min_rcp85_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp85_1995_2025', 'mapbox://arboverse.temp_average_rcp85_1995_2025', 'raster', 'mapbox://arboverse.temp_average_rcp85_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp85_1995_2025', 'mapbox://arboverse.temp_max_rcp85_1995_2025', 'raster', 'mapbox://arboverse.temp_max_rcp85_1995_2025', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp45_2005_2035', 'mapbox://arboverse.temp_min_rcp45_2005_2035', 'raster', 'mapbox://arboverse.temp_min_rcp45_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp45_2005_2035', 'mapbox://arboverse.temp_average_rcp45_2005_2035', 'raster', 'mapbox://arboverse.temp_average_rcp45_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp45_2005_2035', 'mapbox://arboverse.temp_max_rcp45_2005_2035', 'raster', 'mapbox://arboverse.temp_max_rcp45_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp85_2005_2035', 'mapbox://arboverse.temp_min_rcp85_2005_2035', 'raster', 'mapbox://arboverse.temp_min_rcp85_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp85_2005_2035', 'mapbox://arboverse.temp_average_rcp85_2005_2035', 'raster', 'mapbox://arboverse.temp_average_rcp85_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp85_2005_2035', 'mapbox://arboverse.temp_max_rcp85_2005_2035', 'raster', 'mapbox://arboverse.temp_max_rcp85_2005_2035', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp45_2015_2045', 'mapbox://arboverse.temp_min_rcp45_2015_2045', 'raster', 'mapbox://arboverse.temp_min_rcp45_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp45_2015_2045', 'mapbox://arboverse.temp_average_rcp45_2015_2045', 'raster', 'mapbox://arboverse.temp_average_rcp45_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp45_2015_2045', 'mapbox://arboverse.temp_max_rcp45_2015_2045', 'raster', 'mapbox://arboverse.temp_max_rcp45_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp85_2015_2045', 'mapbox://arboverse.temp_min_rcp85_2015_2045', 'raster', 'mapbox://arboverse.temp_min_rcp85_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp85_2015_2045', 'mapbox://arboverse.temp_average_rcp85_2015_2045', 'raster', 'mapbox://arboverse.temp_average_rcp85_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp85_2015_2045', 'mapbox://arboverse.temp_max_rcp85_2015_2045', 'raster', 'mapbox://arboverse.temp_max_rcp85_2015_2045', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp45_2025_2055', 'mapbox://arboverse.temp_min_rcp45_2025_2055', 'raster', 'mapbox://arboverse.temp_min_rcp45_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp45_2025_2055', 'mapbox://arboverse.temp_average_rcp45_2025_2055', 'raster', 'mapbox://arboverse.temp_average_rcp45_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp45_2025_2055', 'mapbox://arboverse.temp_max_rcp45_2025_2055', 'raster', 'mapbox://arboverse.temp_max_rcp45_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp85_2025_2055', 'mapbox://arboverse.temp_min_rcp85_2025_2055', 'raster', 'mapbox://arboverse.temp_min_rcp85_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp85_2025_2055', 'mapbox://arboverse.temp_average_rcp85_2025_2055', 'raster', 'mapbox://arboverse.temp_average_rcp85_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp85_2025_2055', 'mapbox://arboverse.temp_max_rcp85_2025_2055', 'raster', 'mapbox://arboverse.temp_max_rcp85_2025_2055', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp45_2035_2065', 'mapbox://arboverse.temp_min_rcp45_2035_2065', 'raster', 'mapbox://arboverse.temp_min_rcp45_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp45_2035_2065', 'mapbox://arboverse.temp_average_rcp45_2035_2065', 'raster', 'mapbox://arboverse.temp_average_rcp45_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp45_2035_2065', 'mapbox://arboverse.temp_max_rcp45_2035_2065', 'raster', 'mapbox://arboverse.temp_max_rcp45_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp85_2035_2065', 'mapbox://arboverse.temp_min_rcp85_2035_2065', 'raster', 'mapbox://arboverse.temp_min_rcp85_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp85_2035_2065', 'mapbox://arboverse.temp_average_rcp85_2035_2065', 'raster', 'mapbox://arboverse.temp_average_rcp85_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp85_2035_2065', 'mapbox://arboverse.temp_max_rcp85_2035_2065', 'raster', 'mapbox://arboverse.temp_max_rcp85_2035_2065', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp45_2045_2075', 'mapbox://arboverse.temp_min_rcp45_2045_2075', 'raster', 'mapbox://arboverse.temp_min_rcp45_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp45_2045_2075', 'mapbox://arboverse.temp_average_rcp45_2045_2075', 'raster', 'mapbox://arboverse.temp_average_rcp45_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp45_2045_2075', 'mapbox://arboverse.temp_max_rcp45_2045_2075', 'raster', 'mapbox://arboverse.temp_max_rcp45_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp85_2045_2075', 'mapbox://arboverse.temp_min_rcp85_2045_2075', 'raster', 'mapbox://arboverse.temp_min_rcp85_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp85_2045_2075', 'mapbox://arboverse.temp_average_rcp85_2045_2075', 'raster', 'mapbox://arboverse.temp_average_rcp85_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp85_2045_2075', 'mapbox://arboverse.temp_max_rcp85_2045_2075', 'raster', 'mapbox://arboverse.temp_max_rcp85_2045_2075', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp45_2055_2085', 'mapbox://arboverse.temp_min_rcp45_2055_2085', 'raster', 'mapbox://arboverse.temp_min_rcp45_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp45_2055_2085', 'mapbox://arboverse.temp_average_rcp45_2055_2085', 'raster', 'mapbox://arboverse.temp_average_rcp45_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp45_2055_2085', 'mapbox://arboverse.temp_max_rcp45_2055_2085', 'raster', 'mapbox://arboverse.temp_max_rcp45_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp85_2055_2085', 'mapbox://arboverse.temp_min_rcp85_2055_2085', 'raster', 'mapbox://arboverse.temp_min_rcp85_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp85_2055_2085', 'mapbox://arboverse.temp_average_rcp85_2055_2085', 'raster', 'mapbox://arboverse.temp_average_rcp85_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp85_2055_2085', 'mapbox://arboverse.temp_max_rcp85_2055_2085', 'raster', 'mapbox://arboverse.temp_max_rcp85_2055_2085', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp45_2065_2095', 'mapbox://arboverse.temp_min_rcp45_2065_2095', 'raster', 'mapbox://arboverse.temp_min_rcp45_2065_2095', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp45_2065_2095', 'mapbox://arboverse.temp_average_rcp45_2065_2095', 'raster', 'mapbox://arboverse.temp_average_rcp45_2065_2095', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp45_2065_2095', 'mapbox://arboverse.temp_max_rcp45_2065_2095', 'raster', 'mapbox://arboverse.temp_max_rcp45_2065_2095', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_min_rcp85_2065_2095', 'mapbox://arboverse.temp_min_rcp85_2065_2095', 'raster', 'mapbox://arboverse.temp_min_rcp85_2065_2095', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_average_rcp85_2065_2095', 'mapbox://arboverse.temp_average_rcp85_2065_2095', 'raster', 'mapbox://arboverse.temp_average_rcp85_2065_2095', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.temp_max_rcp85_2065_2095', 'mapbox://arboverse.temp_max_rcp85_2065_2095', 'raster', 'mapbox://arboverse.temp_max_rcp85_2065_2095', 0, 19);

    //Hot days
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp45_1985_2015', 'mapbox://arboverse.hot_days_yr_rcp45_1985_2015', 'raster', 'mapbox://arboverse.hot_days_yr_rcp45_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp45_1995_2025', 'mapbox://arboverse.hot_days_yr_rcp45_1995_2025', 'raster', 'mapbox://arboverse.hot_days_yr_rcp45_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp45_2005_2035', 'mapbox://arboverse.hot_days_yr_rcp45_2005_2035', 'raster', 'mapbox://arboverse.hot_days_yr_rcp45_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp45_2015_2045', 'mapbox://arboverse.hot_days_yr_rcp45_2015_2045', 'raster', 'mapbox://arboverse.hot_days_yr_rcp45_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp45_2025_2055', 'mapbox://arboverse.hot_days_yr_rcp45_2025_2055', 'raster', 'mapbox://arboverse.hot_days_yr_rcp45_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp45_2035_2065', 'mapbox://arboverse.hot_days_yr_rcp45_2035_2065', 'raster', 'mapbox://arboverse.hot_days_yr_rcp45_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp45_2045_2075', 'mapbox://arboverse.hot_days_yr_rcp45_2045_2075', 'raster', 'mapbox://arboverse.hot_days_yr_rcp45_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp45_2055_2085', 'mapbox://arboverse.hot_days_yr_rcp45_2055_2085', 'raster', 'mapbox://arboverse.hot_days_yr_rcp45_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp45_2065_2095', 'mapbox://arboverse.hot_days_yr_rcp45_2065_2095', 'raster', 'mapbox://arboverse.hot_days_yr_rcp45_2065_2095', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp85_1985_2015', 'mapbox://arboverse.hot_days_yr_rcp85_1985_2015', 'raster', 'mapbox://arboverse.hot_days_yr_rcp85_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp85_1995_2025', 'mapbox://arboverse.hot_days_yr_rcp85_1995_2025', 'raster', 'mapbox://arboverse.hot_days_yr_rcp85_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp85_2005_2035', 'mapbox://arboverse.hot_days_yr_rcp85_2005_2035', 'raster', 'mapbox://arboverse.hot_days_yr_rcp85_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp85_2015_2045', 'mapbox://arboverse.hot_days_yr_rcp85_2015_2045', 'raster', 'mapbox://arboverse.hot_days_yr_rcp85_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp85_2025_2055', 'mapbox://arboverse.hot_days_yr_rcp85_2025_2055', 'raster', 'mapbox://arboverse.hot_days_yr_rcp85_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp85_2035_2065', 'mapbox://arboverse.hot_days_yr_rcp85_2035_2065', 'raster', 'mapbox://arboverse.hot_days_yr_rcp85_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp85_2045_2075', 'mapbox://arboverse.hot_days_yr_rcp85_2045_2075', 'raster', 'mapbox://arboverse.hot_days_yr_rcp85_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp85_2055_2085', 'mapbox://arboverse.hot_days_yr_rcp85_2055_2085', 'raster', 'mapbox://arboverse.hot_days_yr_rcp85_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hot_days_yr_rcp85_2065_2095', 'mapbox://arboverse.hot_days_yr_rcp85_2065_2095', 'raster', 'mapbox://arboverse.hot_days_yr_rcp85_2065_2095', 0, 19);
    //Precipitation
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp45_1985_2015', 'mapbox://arboverse.prec_rcp45_1985_2015', 'raster', 'mapbox://arboverse.prec_rcp45_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp45_1995_2025', 'mapbox://arboverse.prec_rcp45_1995_2025', 'raster', 'mapbox://arboverse.prec_rcp45_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp45_2005_2035', 'mapbox://arboverse.prec_rcp45_2005_2035', 'raster', 'mapbox://arboverse.prec_rcp45_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp45_2015_2045', 'mapbox://arboverse.prec_rcp45_2015_2045', 'raster', 'mapbox://arboverse.prec_rcp45_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp45_2025_2055', 'mapbox://arboverse.prec_rcp45_2025_2055', 'raster', 'mapbox://arboverse.prec_rcp45_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp45_2035_2065', 'mapbox://arboverse.prec_rcp45_2035_2065', 'raster', 'mapbox://arboverse.prec_rcp45_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp45_2045_2075', 'mapbox://arboverse.prec_rcp45_2045_2075', 'raster', 'mapbox://arboverse.prec_rcp45_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp45_2055_2085', 'mapbox://arboverse.prec_rcp45_2055_2085', 'raster', 'mapbox://arboverse.prec_rcp45_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp45_2065_2095', 'mapbox://arboverse.prec_rcp45_2065_2095', 'raster', 'mapbox://arboverse.prec_rcp45_2065_2095', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.prec_rcp85_1985_2015', 'mapbox://arboverse.prec_rcp85_1985_2015', 'raster', 'mapbox://arboverse.prec_rcp85_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp85_1995_2025', 'mapbox://arboverse.prec_rcp85_1995_2025', 'raster', 'mapbox://arboverse.prec_rcp85_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp85_2005_2035', 'mapbox://arboverse.prec_rcp85_2005_2035', 'raster', 'mapbox://arboverse.prec_rcp85_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp85_2015_2045', 'mapbox://arboverse.prec_rcp85_2015_2045', 'raster', 'mapbox://arboverse.prec_rcp85_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp85_2025_2055', 'mapbox://arboverse.prec_rcp85_2025_2055', 'raster', 'mapbox://arboverse.prec_rcp85_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp85_2035_2065', 'mapbox://arboverse.prec_rcp85_2035_2065', 'raster', 'mapbox://arboverse.prec_rcp85_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp85_2045_2075', 'mapbox://arboverse.prec_rcp85_2045_2075', 'raster', 'mapbox://arboverse.prec_rcp85_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp85_2055_2085', 'mapbox://arboverse.prec_rcp85_2055_2085', 'raster', 'mapbox://arboverse.prec_rcp85_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.prec_rcp85_2065_2095', 'mapbox://arboverse.prec_rcp85_2065_2095', 'raster', 'mapbox://arboverse.prec_rcp85_2065_2095', 0, 19);

    //Extreme Precipitation
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp45_1985_2015', 'mapbox://arboverse.extreme_rcp45_1985_2015', 'raster', 'mapbox://arboverse.extreme_rcp45_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp45_1995_2025', 'mapbox://arboverse.extreme_rcp45_1995_2025', 'raster', 'mapbox://arboverse.extreme_rcp45_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp45_2005_2035', 'mapbox://arboverse.extreme_rcp45_2005_2035', 'raster', 'mapbox://arboverse.extreme_rcp45_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp45_2015_2045', 'mapbox://arboverse.extreme_rcp45_2015_2045', 'raster', 'mapbox://arboverse.extreme_rcp45_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp45_2025_2055', 'mapbox://arboverse.extreme_rcp45_2025_2055', 'raster', 'mapbox://arboverse.extreme_rcp45_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp45_2035_2065', 'mapbox://arboverse.extreme_rcp45_2035_2065', 'raster', 'mapbox://arboverse.extreme_rcp45_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp45_2045_2075', 'mapbox://arboverse.extreme_rcp45_2045_2075', 'raster', 'mapbox://arboverse.extreme_rcp45_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp45_2055_2085', 'mapbox://arboverse.extreme_rcp45_2055_2085', 'raster', 'mapbox://arboverse.extreme_rcp45_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp45_2065_2095', 'mapbox://arboverse.extreme_rcp45_2065_2095', 'raster', 'mapbox://arboverse.extreme_rcp45_2065_2095', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp85_1985_2015', 'mapbox://arboverse.extreme_rcp85_1985_2015', 'raster', 'mapbox://arboverse.extreme_rcp85_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp85_1995_2025', 'mapbox://arboverse.extreme_rcp85_1995_2025', 'raster', 'mapbox://arboverse.extreme_rcp85_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp85_2005_2035', 'mapbox://arboverse.extreme_rcp85_2005_2035', 'raster', 'mapbox://arboverse.extreme_rcp85_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp85_2015_2045', 'mapbox://arboverse.extreme_rcp85_2015_2045', 'raster', 'mapbox://arboverse.extreme_rcp85_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp85_2025_2055', 'mapbox://arboverse.extreme_rcp85_2025_2055', 'raster', 'mapbox://arboverse.extreme_rcp85_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp85_2035_2065', 'mapbox://arboverse.extreme_rcp85_2035_2065', 'raster', 'mapbox://arboverse.extreme_rcp85_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp85_2045_2075', 'mapbox://arboverse.extreme_rcp85_2045_2075', 'raster', 'mapbox://arboverse.extreme_rcp85_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp85_2055_2085', 'mapbox://arboverse.extreme_rcp85_2055_2085', 'raster', 'mapbox://arboverse.extreme_rcp85_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.extreme_rcp85_2065_2095', 'mapbox://arboverse.extreme_rcp85_2065_2095', 'raster', 'mapbox://arboverse.extreme_rcp85_2065_2095', 0, 19);

    //Dryspells
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp45_1985_2015', 'mapbox://arboverse.dryspells_ch_rcp45_1985_2015', 'raster', 'mapbox://arboverse.dryspells_ch_rcp45_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp45_1995_2025', 'mapbox://arboverse.dryspells_ch_rcp45_1995_2025', 'raster', 'mapbox://arboverse.dryspells_ch_rcp45_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp45_2005_2035', 'mapbox://arboverse.dryspells_ch_rcp45_2005_2035', 'raster', 'mapbox://arboverse.dryspells_ch_rcp45_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp45_2015_2045', 'mapbox://arboverse.dryspells_ch_rcp45_2015_2045', 'raster', 'mapbox://arboverse.dryspells_ch_rcp45_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp45_2025_2055', 'mapbox://arboverse.dryspells_ch_rcp45_2025_2055', 'raster', 'mapbox://arboverse.dryspells_ch_rcp45_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp45_2035_2065', 'mapbox://arboverse.dryspells_ch_rcp45_2035_2065', 'raster', 'mapbox://arboverse.dryspells_ch_rcp45_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp45_2045_2075', 'mapbox://arboverse.dryspells_ch_rcp45_2045_2075', 'raster', 'mapbox://arboverse.dryspells_ch_rcp45_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp45_2055_2085', 'mapbox://arboverse.dryspells_ch_rcp45_2055_2085', 'raster', 'mapbox://arboverse.dryspells_ch_rcp45_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp45_2065_2095', 'mapbox://arboverse.dryspells_ch_rcp45_2065_2095', 'raster', 'mapbox://arboverse.dryspells_ch_rcp45_2065_2095', 0, 19);

    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp85_1985_2015', 'mapbox://arboverse.dryspells_ch_rcp85_1985_2015', 'raster', 'mapbox://arboverse.dryspells_ch_rcp85_1985_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp85_1995_2025', 'mapbox://arboverse.dryspells_ch_rcp85_1995_2025', 'raster', 'mapbox://arboverse.dryspells_ch_rcp85_1995_2025', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp85_2005_2035', 'mapbox://arboverse.dryspells_ch_rcp85_2005_2035', 'raster', 'mapbox://arboverse.dryspells_ch_rcp85_2005_2035', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp85_2015_2045', 'mapbox://arboverse.dryspells_ch_rcp85_2015_2045', 'raster', 'mapbox://arboverse.dryspells_ch_rcp85_2015_2045', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp85_2025_2055', 'mapbox://arboverse.dryspells_ch_rcp85_2025_2055', 'raster', 'mapbox://arboverse.dryspells_ch_rcp85_2025_2055', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp85_2035_2065', 'mapbox://arboverse.dryspells_ch_rcp85_2035_2065', 'raster', 'mapbox://arboverse.dryspells_ch_rcp85_2035_2065', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp85_2045_2075', 'mapbox://arboverse.dryspells_ch_rcp85_2045_2075', 'raster', 'mapbox://arboverse.dryspells_ch_rcp85_2045_2075', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp85_2055_2085', 'mapbox://arboverse.dryspells_ch_rcp85_2055_2085', 'raster', 'mapbox://arboverse.dryspells_ch_rcp85_2055_2085', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.dryspells_ch_rcp85_2065_2095', 'mapbox://arboverse.dryspells_ch_rcp85_2065_2095', 'raster', 'mapbox://arboverse.dryspells_ch_rcp85_2065_2095', 0, 19);
    //Koppengeiger
    addTileLayerToMap(map, 'arboverse.presentfull', 'mapbox://arboverse.presentfull', 'fill', { 'fill-color': ["case", ["==", ["get", "classes"], 0], "hsla(0, 0%, 0%, 0)", ["match", ["get", "classes"], [1], true, false], "#8c0273", ["match", ["get", "classes"], [2], true, false], "#8f1966", ["match", ["get", "classes"], [3], true, false], "#91285a", ["match", ["get", "classes"], [4], true, false], "#922e54", ["match", ["get", "classes"], [5], true, false], "#943c4a", ["match", ["get", "classes"], [6], true, false], "#964941", ["match", ["get", "classes"], [7], true, false], "#974f3c", ["match", ["get", "classes"], [8], true, false], "#996330", ["match", ["get", "classes"], [9], true, false], "#9a692b", ["match", ["get", "classes"], [10], true, false], "#9b7127", ["match", ["get", "classes"], [11], true, false], "#9c7923", ["match", ["get", "classes"], [12], true, false], "#9c801f", ["match", ["get", "classes"], [13], true, false], "#9d891c", ["match", ["get", "classes"], [14], true, false], "#9c911c", ["match", ["get", "classes"], [15], true, false], "#9b9a1d", ["match", ["get", "classes"], [16], true, false], "#99a323", ["match", ["get", "classes"], [17], true, false], "#91b437", ["match", ["get", "classes"], [18], true, false], "#8cba44", ["match", ["get", "classes"], [19], true, false], "#86c051", ["match", ["get", "classes"], [20], true, false], "#80c55f", ["match", ["get", "classes"], [21], true, false], "#79ca6d", ["match", ["get", "classes"], [22], true, false], "#73ce7b", ["match", ["get", "classes"], [23], true, false], "#6dd389", ["match", ["get", "classes"], [24], true, false], "#68d797", ["match", ["get", "classes"], [26], true, false], "#60e0b5", ["match", ["get", "classes"], [27], true, false], "#60e4c4", ["match", ["get", "classes"], [28], true, false], "#65e8d2", ["match", ["get", "classes"], [29], true, false], "#8ff0f1", ["match", ["get", "classes"], [30], true, false], "#b3f2fd", ["match", ["get", "classes"], [25], true, false], "#62dca7", "#000000"] }, 'kopeen_fullpresent');
    addTileLayerToMap(map, 'arboverse.koppenfuture', 'mapbox://arboverse.koppenfuture', 'fill', { 'fill-color': ["case", ["==", ["get", "classes"], 0], "hsla(0, 0%, 0%, 0)", ["match", ["get", "classes"], [1], true, false], "#8c0273", ["match", ["get", "classes"], [2], true, false], "#8f1966", ["match", ["get", "classes"], [3], true, false], "#91285a", ["match", ["get", "classes"], [4], true, false], "#922e54", ["match", ["get", "classes"], [5], true, false], "#943c4a", ["match", ["get", "classes"], [6], true, false], "#964941", ["match", ["get", "classes"], [7], true, false], "#974f3c", ["match", ["get", "classes"], [8], true, false], "#996330", ["match", ["get", "classes"], [9], true, false], "#9a692b", ["match", ["get", "classes"], [10], true, false], "#9b7127", ["match", ["get", "classes"], [11], true, false], "#9c7923", ["match", ["get", "classes"], [12], true, false], "#9c801f", ["match", ["get", "classes"], [13], true, false], "#9d891c", ["match", ["get", "classes"], [14], true, false], "#9c911c", ["match", ["get", "classes"], [15], true, false], "#9b9a1d", ["match", ["get", "classes"], [16], true, false], "#99a323", ["match", ["get", "classes"], [17], true, false], "#91b437", ["match", ["get", "classes"], [18], true, false], "#8cba44", ["match", ["get", "classes"], [19], true, false], "#86c051", ["match", ["get", "classes"], [20], true, false], "#80c55f", ["match", ["get", "classes"], [21], true, false], "#79ca6d", ["match", ["get", "classes"], [22], true, false], "#73ce7b", ["match", ["get", "classes"], [23], true, false], "#6dd389", ["match", ["get", "classes"], [24], true, false], "#68d797", ["match", ["get", "classes"], [26], true, false], "#60e0b5", ["match", ["get", "classes"], [27], true, false], "#60e4c4", ["match", ["get", "classes"], [28], true, false], "#65e8d2", ["match", ["get", "classes"], [29], true, false], "#8ff0f1", ["match", ["get", "classes"], [30], true, false], "#b3f2fd", ["match", ["get", "classes"], [25], true, false], "#62dca7", "#000000"] }, 'kopeen_future');
    //land cover
    addRasterTileLayerToMap(map, 'arboverse.8xtrhkxq', 'mapbox://arboverse.8xtrhkxq', 'raster', 'mapbox://arboverse.8xtrhkxq', 0, 19);
    // biomes
    addTileLayerToMap(map, 'arboverse.biomes', 'mapbox://arboverse.biomes', 'fill', { 'fill-color': ["match", ["get", "BIOME_NUM"], [1], "#011959", [2], "#0d335e", [3], "#124761", [4], "#1a5762", [5], "#2c665d", [6], "#457051", [7], "#627940", [8], "#828231", [9], "#a58b2c", [10], "#c8913b", [11], "#e79858", [12], "#f9a381", [13], "#fdb1aa", [14], "#fcbed1", "#000000"] }, 'biomes');
    // biomes recovery index
    addTileLayerToMap(map, 'arboverse.biomesindex', 'mapbox://arboverse.biomes', 'fill', { 'fill-color': ["match", ["get", "NNH"], [4], "#88c369", [3], "#408a80", [2], "#1a608f", [1], "#031327", "#000000"] }, 'biomes');
    // drought vulnerabity
    addTileLayerToMap(map, 'arboverse.vulnerability', 'mapbox://arboverse.vulnerability', 'fill', { 'fill-color': ["match", ["get", "GW_vulnera"], ["low vulnerability to floods and droughts"], "#ffcf67", ["moderate vulnerability to floods and low vulnerability to droughts"], "#e7a95a", ["low vulnerability to floods and moderate vulnerability to droughts"], "#cf874f", ["moderate vulnerability to floods and droughts"], "#b76945", ["high vulnerability to floods and moderate vulnerability to droughts"], "#9d4e3d", ["moderate vulnerability to floods and high vulnerability to droughts"], "#7e3739", ["high vulnerability to floods and droughts"], "#61293f", "#000000"] }, 'vulnerability');
    addTileLayerToMap(map, 'arboverse.rivers', 'mapbox://arboverse.rivers', 'line', { 'line-color': "#81e7ff", 'line-width': ["interpolate", ["linear"], ["zoom"], 0, 1, 22, 2] }, 'rivers');
    addTileLayerToMap(map, 'arboverse.icesheets', 'mapbox://arboverse.icesheets', 'fill', { 'fill-color': "#505f9e" }, 'icesheets');
    addTileLayerToMap(map, 'arboverse.waterbodies', 'mapbox://arboverse.waterbodies', 'fill', { 'fill-color': "#669ed2" }, 'waterbodies');
    //aridity
    addRasterTileLayerToMap(map, 'arboverse.aridity_index_5km_modificado', 'mapbox://arboverse.aridity_index_5km_modificado', 'raster', 'mapbox://arboverse.aridity_index_5km_modificado', 0, 19);
    //population density
    addRasterTileLayerToMap(map, 'arboverse.pop_2000', 'mapbox://arboverse.pop_2000', 'raster', 'mapbox://arboverse.pop_2000', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.pop_2005', 'mapbox://arboverse.pop_2005', 'raster', 'mapbox://arboverse.pop_2005', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.pop_2010', 'mapbox://arboverse.pop_2010', 'raster', 'mapbox://arboverse.pop_2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.pop_2015', 'mapbox://arboverse.pop_2015', 'raster', 'mapbox://arboverse.pop_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.pop_2020', 'mapbox://arboverse.pop_2020', 'raster', 'mapbox://arboverse.pop_2020', 0, 19);
    //GDP
    addRasterTileLayerToMap(map, 'arboverse.gdp_1990', 'mapbox://arboverse.gdp_1990', 'raster', 'mapbox://arboverse.gdp_1990', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_1991', 'mapbox://arboverse.gdp_1991', 'raster', 'mapbox://arboverse.gdp_1991', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_1992', 'mapbox://arboverse.gdp_1992', 'raster', 'mapbox://arboverse.gdp_1992', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_1993', 'mapbox://arboverse.gdp_1993', 'raster', 'mapbox://arboverse.gdp_1993', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_1994', 'mapbox://arboverse.gdp_1994', 'raster', 'mapbox://arboverse.gdp_1994', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_1995', 'mapbox://arboverse.gdp_1995', 'raster', 'mapbox://arboverse.gdp_1995', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_1996', 'mapbox://arboverse.gdp_1996', 'raster', 'mapbox://arboverse.gdp_1996', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_1997', 'mapbox://arboverse.gdp_1997', 'raster', 'mapbox://arboverse.gdp_1997', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_1998', 'mapbox://arboverse.gdp_1998', 'raster', 'mapbox://arboverse.gdp_1998', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_1999', 'mapbox://arboverse.gdp_1999', 'raster', 'mapbox://arboverse.gdp_1999', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2000', 'mapbox://arboverse.gdp_2000', 'raster', 'mapbox://arboverse.gdp_2000', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2001', 'mapbox://arboverse.gdp_2001', 'raster', 'mapbox://arboverse.gdp_2001', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2002', 'mapbox://arboverse.gdp_2002', 'raster', 'mapbox://arboverse.gdp_2002', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2003', 'mapbox://arboverse.gdp_2003', 'raster', 'mapbox://arboverse.gdp_2003', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2004', 'mapbox://arboverse.gdp_2004', 'raster', 'mapbox://arboverse.gdp_2004', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2005', 'mapbox://arboverse.gdp_2005', 'raster', 'mapbox://arboverse.gdp_2005', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2006', 'mapbox://arboverse.gdp_2006', 'raster', 'mapbox://arboverse.gdp_2006', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2007', 'mapbox://arboverse.gdp_2007', 'raster', 'mapbox://arboverse.gdp_2007', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2008', 'mapbox://arboverse.gdp_2008', 'raster', 'mapbox://arboverse.gdp_2008', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2009', 'mapbox://arboverse.gdp_2009', 'raster', 'mapbox://arboverse.gdp_2009', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2010', 'mapbox://arboverse.gdp_2010', 'raster', 'mapbox://arboverse.gdp_2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2011', 'mapbox://arboverse.gdp_2011', 'raster', 'mapbox://arboverse.gdp_2011', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2012', 'mapbox://arboverse.gdp_2012', 'raster', 'mapbox://arboverse.gdp_2012', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2013', 'mapbox://arboverse.gdp_2013', 'raster', 'mapbox://arboverse.gdp_2013', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2014', 'mapbox://arboverse.gdp_2014', 'raster', 'mapbox://arboverse.gdp_2014', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.gdp_2015', 'mapbox://arboverse.gdp_2015', 'raster', 'mapbox://arboverse.gdp_2015', 0, 19);
    //HDI
    addRasterTileLayerToMap(map, 'arboverse.hdi_1990', 'mapbox://arboverse.hdi_1990', 'raster', 'mapbox://arboverse.hdi_1990', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_1991', 'mapbox://arboverse.hdi_1991', 'raster', 'mapbox://arboverse.hdi_1991', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_1992', 'mapbox://arboverse.hdi_1992', 'raster', 'mapbox://arboverse.hdi_1992', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_1993', 'mapbox://arboverse.hdi_1993', 'raster', 'mapbox://arboverse.hdi_1993', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_1994', 'mapbox://arboverse.hdi_1994', 'raster', 'mapbox://arboverse.hdi_1994', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_1995', 'mapbox://arboverse.hdi_1995', 'raster', 'mapbox://arboverse.hdi_1995', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_1996', 'mapbox://arboverse.hdi_1996', 'raster', 'mapbox://arboverse.hdi_1996', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_1997', 'mapbox://arboverse.hdi_1997', 'raster', 'mapbox://arboverse.hdi_1997', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_1998', 'mapbox://arboverse.hdi_1998', 'raster', 'mapbox://arboverse.hdi_1998', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_1999', 'mapbox://arboverse.hdi_1999', 'raster', 'mapbox://arboverse.hdi_1999', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2000', 'mapbox://arboverse.hdi_2000', 'raster', 'mapbox://arboverse.hdi_2000', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2001', 'mapbox://arboverse.hdi_2001', 'raster', 'mapbox://arboverse.hdi_2001', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2002', 'mapbox://arboverse.hdi_2002', 'raster', 'mapbox://arboverse.hdi_2002', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2003', 'mapbox://arboverse.hdi_2003', 'raster', 'mapbox://arboverse.hdi_2003', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2004', 'mapbox://arboverse.hdi_2004', 'raster', 'mapbox://arboverse.hdi_2004', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2005', 'mapbox://arboverse.hdi_2005', 'raster', 'mapbox://arboverse.hdi_2005', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2006', 'mapbox://arboverse.hdi_2006', 'raster', 'mapbox://arboverse.hdi_2006', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2007', 'mapbox://arboverse.hdi_2007', 'raster', 'mapbox://arboverse.hdi_2007', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2008', 'mapbox://arboverse.hdi_2008', 'raster', 'mapbox://arboverse.hdi_2008', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2009', 'mapbox://arboverse.hdi_2009', 'raster', 'mapbox://arboverse.hdi_2009', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2010', 'mapbox://arboverse.hdi_2010', 'raster', 'mapbox://arboverse.hdi_2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2011', 'mapbox://arboverse.hdi_2011', 'raster', 'mapbox://arboverse.hdi_2011', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2012', 'mapbox://arboverse.hdi_2012', 'raster', 'mapbox://arboverse.hdi_2012', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2013', 'mapbox://arboverse.hdi_2013', 'raster', 'mapbox://arboverse.hdi_2013', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2014', 'mapbox://arboverse.hdi_2014', 'raster', 'mapbox://arboverse.hdi_2014', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.hdi_2015', 'mapbox://arboverse.hdi_2015', 'raster', 'mapbox://arboverse.hdi_2015', 0, 19);
    //livestock
    addRasterTileLayerToMap(map, 'arboverse.livestock_catle_2010_da_10km', 'mapbox://arboverse.livestock_catle_2010_da_10km', 'raster', 'mapbox://arboverse.livestock_catle_2010_da_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.livestock_bufalo_2010_da_10km', 'mapbox://arboverse.livestock_bufalo_2010_da_10km', 'raster', 'mapbox://arboverse.livestock_bufalo_2010_da_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.livestock_sheep_2010_da_10km', 'mapbox://arboverse.livestock_sheep_2010_da_10km', 'raster', 'mapbox://arboverse.livestock_sheep_2010_da_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.livestock_goat_2010_da_10km', 'mapbox://arboverse.livestock_goat_2010_da_10km', 'raster', 'mapbox://arboverse.livestock_goat_2010_da_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.livestock_horse_2010_da_10km', 'mapbox://arboverse.livestock_horse_2010_da_10km', 'raster', 'mapbox://arboverse.livestock_horse_2010_da_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.livestock_pig_2010_da_10km', 'mapbox://arboverse.livestock_pig_2010_da_10km', 'raster', 'mapbox://arboverse.livestock_pig_2010_da_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.livestock_chicken_2010_da_10km', 'mapbox://arboverse.livestock_chicken_2010_da_10km', 'raster', 'mapbox://arboverse.livestock_chicken_2010_da_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.livestock_duck_2010_da_10km', 'mapbox://arboverse.livestock_duck_2010_da_10km', 'raster', 'mapbox://arboverse.livestock_duck_2010_da_10km', 0, 19);
    //cities accessibility
    addRasterTileLayerToMap(map, 'arboverse.cities_accessibility_5km_2015', 'mapbox://arboverse.cities_accessibility_5km_2015', 'raster', 'mapbox://arboverse.cities_accessibility_5km_2015', 0, 19);
    //cities accessibility
    addRasterTileLayerToMap(map, 'arboverse.healthcare_time_walking_5km_2020', 'mapbox://arboverse.healthcare_time_walking_5km_2020', 'raster', 'mapbox://arboverse.healthcare_time_walking_5km_2020', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.healthcare_time_motorized', 'mapbox://arboverse.healthcare_time_motorized', 'raster', 'mapbox://arboverse.healthcare_time_motorized', 0, 19);
    //Biodiversity intactness index
    addRasterTileLayerToMap(map, 'arboverse.bii', 'mapbox://arboverse.bii', 'raster', 'mapbox://arboverse.bii', 0, 19);
    //forecast mosquito
    addRasterTileLayerToMap(map, 'arboverse.c89hazcs', 'mapbox://arboverse.c89hazcs', 'raster', 'mapbox://arboverse.c89hazcs', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.cugep9k4', 'mapbox://arboverse.cugep9k4', 'raster', 'mapbox://arboverse.cugep9k4', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.9uh1mltv', 'mapbox://arboverse.9uh1mltv', 'raster', 'mapbox://arboverse.9uh1mltv', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.7va6tx65', 'mapbox://arboverse.7va6tx65', 'raster', 'mapbox://arboverse.7va6tx65', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bud0k3bq', 'mapbox://arboverse.bud0k3bq', 'raster', 'mapbox://arboverse.bud0k3bq', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.cot4nhox', 'mapbox://arboverse.cot4nhox', 'raster', 'mapbox://arboverse.cot4nhox', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.59jzfz3w', 'mapbox://arboverse.59jzfz3w', 'raster', 'mapbox://arboverse.59jzfz3w', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.2wsi2z3v', 'mapbox://arboverse.2wsi2z3v', 'raster', 'mapbox://arboverse.2wsi2z3v', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.a51uv49z', 'mapbox://arboverse.a51uv49z', 'raster', 'mapbox://arboverse.a51uv49z', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.92xut72i', 'mapbox://arboverse.92xut72i', 'raster', 'mapbox://arboverse.92xut72i', 0, 19);
    //Amphibians biodiversity
    addRasterTileLayerToMap(map, 'arboverse.bio_amp_richness_10km', 'mapbox://arboverse.bio_amp_richness_10km', 'raster', 'mapbox://arboverse.bio_amp_richness_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_amp_gymnophiona_10km', 'mapbox://arboverse.bio_amp_gymnophiona_10km', 'raster', 'mapbox://arboverse.bio_amp_gymnophiona_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_amp_threatened_10km', 'mapbox://arboverse.bio_amp_threatened_10km', 'raster', 'mapbox://arboverse.bio_amp_threatened_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_amp_caudata_10km', 'mapbox://arboverse.bio_amp_caudata_10km', 'raster', 'mapbox://arboverse.bio_amp_caudata_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_amp_anura_10km', 'mapbox://arboverse.bio_amp_anura_10km', 'raster', 'mapbox://arboverse.bio_amp_anura_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_amp_data_def_10km', 'mapbox://arboverse.bio_amp_data_def_10km', 'raster', 'mapbox://arboverse.bio_amp_data_def_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_amp_smal_range_10km', 'mapbox://arboverse.bio_amp_smal_range_10km', 'raster', 'mapbox://arboverse.bio_amp_smal_range_10km', 0, 19);
    //Birds biodiversity
    addRasterTileLayerToMap(map, 'arboverse.biodiversity_birds_richness_10km', 'mapbox://arboverse.biodiversity_birds_richness_10km', 'raster', 'mapbox://arboverse.biodiversity_birds_richness_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_birds_trochilidae_10km', 'mapbox://arboverse.bio_birds_trochilidae_10km', 'raster', 'mapbox://arboverse.bio_birds_trochilidae_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_birds_small_ranged_10km', 'mapbox://arboverse.bio_birds_small_ranged_10km', 'raster', 'mapbox://arboverse.bio_birds_small_ranged_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_birds_non_passeriformes', 'mapbox://arboverse.bio_birds_non_passeriformes', 'raster', 'mapbox://arboverse.bio_birds_non_passeriformes', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_birds_passeriformes_10km', 'mapbox://arboverse.bio_birds_passeriformes_10km', 'raster', 'mapbox://arboverse.bio_birds_passeriformes_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_birds_nonbreeding_10km', 'mapbox://arboverse.bio_birds_nonbreeding_10km', 'raster', 'mapbox://arboverse.bio_birds_nonbreeding_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_birds_threatened_bird', 'mapbox://arboverse.bio_birds_threatened_bird', 'raster', 'mapbox://arboverse.bio_birds_threatened_bird', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_birds_psittaciformes_10km', 'mapbox://arboverse.bio_birds_psittaciformes_10km', 'raster', 'mapbox://arboverse.bio_birds_psittaciformes_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_birds_breeding_range_10km', 'mapbox://arboverse.bio_birds_breeding_range_10km', 'raster', 'mapbox://arboverse.bio_birds_breeding_range_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_birds_threatened_small', 'mapbox://arboverse.bio_birds_threatened_small', 'raster', 'mapbox://arboverse.bio_birds_threatened_small', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_birds_data_deficient_10km', 'mapbox://arboverse.bio_birds_data_deficient_10km', 'raster', 'mapbox://arboverse.bio_birds_data_deficient_10km', 0, 19);
    //Mammals biodiversity
    addRasterTileLayerToMap(map, 'arboverse.bio_mammals_primates_10km', 'mapbox://arboverse.bio_mammals_primates_10km', 'raster', 'mapbox://arboverse.bio_mammals_primates_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_mammals_threatened_10km', 'mapbox://arboverse.bio_mammals_threatened_10km', 'raster', 'mapbox://arboverse.bio_mammals_threatened_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_mammals_marsupialia_10km', 'mapbox://arboverse.bio_mammals_marsupialia_10km', 'raster', 'mapbox://arboverse.bio_mammals_marsupialia_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_mammals_data_deficient_10km', 'mapbox://arboverse.bio_mammals_data_deficient_10km', 'raster', 'mapbox://arboverse.bio_mammals_data_deficient_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_mammals_richness_10km', 'mapbox://arboverse.bio_mammals_richness_10km', 'raster', 'mapbox://arboverse.bio_mammals_richness_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_mammals_eulipotyphla_10km', 'mapbox://arboverse.bio_mammals_eulipotyphla_10km', 'raster', 'mapbox://arboverse.bio_mammals_eulipotyphla_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_mammals_rodentia_10km', 'mapbox://arboverse.bio_mammals_rodentia_10km', 'raster', 'mapbox://arboverse.bio_mammals_rodentia_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_mammals_carnivora_10km', 'mapbox://arboverse.bio_mammals_carnivora_10km', 'raster', 'mapbox://arboverse.bio_mammals_carnivora_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_mammals_small_ranged_10km', 'mapbox://arboverse.bio_mammals_small_ranged_10km', 'raster', 'arboverse.bio_mammals_small_ranged_10km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_mammals_cetartiodactyla', 'mapbox://arboverse.bio_mammals_cetartiodactyla', 'raster', 'mapbox://arboverse.bio_mammals_cetartiodactyla', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.bio_mammals_chiroptera_10km', 'mapbox://arboverse.bio_mammals_chiroptera_10km', 'raster', 'mapbox://arboverse.bio_mammals_chiroptera_10km', 0, 19);
    // Tree cover loss by dominat drivers
    addTileLayerToMap(map, 'arboverse.drivers', 'mapbox://arboverse.drivers', 'fill', { 'fill-color': ['match', ['get', 'classes'], [1], "#ea8d6b", [2], "#c36660", [3], "#89606e", [4], "#5d5d79", [5], "#1e4368", "#000000"] }, 'drivers');
    //forest landscape integrity index
    addRasterTileLayerToMap(map, 'arboverse.flii_oceania_5km', 'mapbox://arboverse.flii_oceania_5km', 'raster', 'mapbox://arboverse.flii_oceania_5km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.flii_africa_5km', 'mapbox://arboverse.flii_africa_5km', 'raster', 'mapbox://arboverse.flii_africa_5km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.flii_southamerica_5km', 'mapbox://arboverse.flii_southamerica_5km', 'raster', 'mapbox://arboverse.flii_southamerica_5km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.flii_northamerica_5km', 'mapbox://arboverse.flii_northamerica_5km', 'raster', 'mapbox://arboverse.flii_northamerica_5km', 0, 19);
    //Tree cover height
    addRasterTileLayerToMap(map, 'arboverse.height_2019_nam_1km', 'mapbox://arboverse.height_2019_nam_1km', 'raster', 'mapbox://arboverse.height_2019_nam_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_sam_1km', 'mapbox://arboverse.height_2019_sam_1km', 'raster', 'mapbox://arboverse.height_2019_sam_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_aus_1km', 'mapbox://arboverse.height_2019_aus_1km', 'raster', 'mapbox://arboverse.height_2019_aus_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_narf_1km', 'mapbox://arboverse.height_2019_narf_1km', 'raster', 'mapbox://arboverse.height_2019_narf_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_safr_1km', 'mapbox://arboverse.height_2019_safr_1km', 'raster', 'mapbox://arboverse.height_2019_safr_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_nasia_1m', 'mapbox://arboverse.height_2019_nasia_1m', 'raster', 'mapbox://arboverse.height_2019_nasia_1m', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_sasia_1km', 'mapbox://arboverse.height_2019_sasia_1km', 'raster', 'mapbox://arboverse.height_2019_sasia_1km', 0, 19);
    //intact forest landscape 2000 2013 2016
    addTileLayerToMap(map, 'arboverse.ifl_2000', 'mapbox://arboverse.ifl_2000', 'fill', { 'fill-color': "#00404d" }, 'ifl_2000');
    addTileLayerToMap(map, 'arboverse.ifl_2013', 'mapbox://arboverse.ifl_2013', 'fill', { 'fill-color': "#3a652a" }, 'ifl_2013');
    addTileLayerToMap(map, 'arboverse.ifl_2016', 'mapbox://arboverse.ifl_2016', 'fill', { 'fill-color': "#969206" }, 'ifl_2016');
    //primary forest
    addRasterTileLayerToMap(map, 'arboverse.primary_africa_1km_2010', 'mapbox://arboverse.primary_africa_1km_2010', 'raster', 'mapbox://arboverse.primary_africa_1km_2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_south_america_1km_2010', 'mapbox://arboverse.primary_south_america_1km_2010', 'raster', 'mapbox://arboverse.primary_south_america_1km_2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_madagascar_1km_2010', 'mapbox://arboverse.primary_madagascar_1km_2010', 'raster', 'mapbox://arboverse.primary_madagascar_1km_2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_asia_1km_2010', 'mapbox://arboverse.primary_asia_1km_2010', 'raster', 'mapbox://arboverse.primary_asia_1km_2010', 0, 19);
    //minig
    addTileLayerToMap(map, 'arboverse.mining1', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#EB9A60" }, 'cameroon_mining');
    addTileLayerToMap(map, 'arboverse.mining2', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#EB9A60" }, 'brazil_mining');
    addTileLayerToMap(map, 'arboverse.mining3', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#EB9A60" }, 'canada_mining');
    addTileLayerToMap(map, 'arboverse.mining4', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#EB9A60" }, 'colombia_mining');
    addTileLayerToMap(map, 'arboverse.mining5', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#EB9A60" }, 'democratic_republic_mining');
    addTileLayerToMap(map, 'arboverse.mining6', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#EB9A60" }, 'gabon_mining');
    addTileLayerToMap(map, 'arboverse.mining7', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#EB9A60" }, 'licadho_mining');
    addTileLayerToMap(map, 'arboverse.mining8', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#EB9A60" }, 'mexico_mining');
    addTileLayerToMap(map, 'arboverse.mining9', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#EB9A60" }, 'preu_mining');
    addTileLayerToMap(map, 'arboverse.mining10', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#EB9A60" }, 'republic_congo_mining');
    //logging
    addTileLayerToMap(map, 'arboverse.logging1', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'sarawak_logging');
    addTileLayerToMap(map, 'arboverse.logging2', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'liberia_logging');
    addTileLayerToMap(map, 'arboverse.logging3', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'gabon_logging');
    addTileLayerToMap(map, 'arboverse.logging4', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'equatorial_guinea_logging');
    addTileLayerToMap(map, 'arboverse.logging5', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'democratic_republic_logging');
    addTileLayerToMap(map, 'arboverse.logging6', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'centra_africa_logging');
    addTileLayerToMap(map, 'arboverse.logging7', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'camerron_logging');
    addTileLayerToMap(map, 'arboverse.logging8', 'mapbox://arboverse.canada_logging', 'fill', { 'fill-color': "#08255B" }, 'canada_logging_nova');
    //Over 38k dams
    addTileLayerToMap(map, 'arboverse.dams', 'mapbox://arboverse.dams', 'circle', { 'circle-radius': ["interpolate", ["linear"], ["zoom"], 0, 2, 22, 9], 'circle-color': "#c2618a", 'circle-stroke-color': "#bd548e", 'circle-stroke-width': 0.5 }, 'dams');
    //vector resistance inseticide
    addTileLayerToMap(map, 'arboverse.resistance', 'mapbox://arboverse.resistance', 'circle', { 'circle-radius': ["interpolate", ["linear"], ["zoom"], 0, 3, 22, 15], 'circle-color': ["match", ["get", "Insecticide class"], ["Carbamates"], "#829d8a", ["Pyrethroids"], "#234a8c", ["Organochlorines"], "#5f8598", ["Organophosphates"], "#f2f2d0", "#000000"] }, 'resistance');
})
//Number of passengers
map.on('load', function () {
    //Filter by year
    //initial date
    var filterYear = ['==', ['number', ['get', 'year']], 1970];
    var filterDepYear = ['==', ['number', ['get', 'year']], 1995];
    var filterArrYear = ['==', ['number', ['get', 'year']], 1995];
    map.addSource('arboverse.transportation', {
        type: 'vector',
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        url: 'mapbox://arboverse.transportation'
    });
    map.addSource('arboverse.departures', {
        type: 'vector',
        url: 'mapbox://arboverse.departures'
    });
    map.addSource('arboverse.arrivals', {
        type: 'vector',
        url: 'mapbox://arboverse.arrivals'
    })
    // then add the layer, referencing the source
    map.addLayer({
        'id': 'arboverse.transportation',
        'type': 'circle',
        'source': 'arboverse.transportation',
        'paint': { 'circle-radius': ["step", ["get", "passengers carried"], 0, 100, 3, 1000, 6, 10000, 9, 100000, 12, 1000000, 15, 10000000, 18, 100000000, 21, 157873000, 24], 'circle-color': ["step", ["get", "passengers carried"], "hsl(61, 0%, 100%)", 100, "#fdf5da", 1000, "#e6bd91", 10000, "#ea8d6b", 100000, "#c36660", 1000000, "#89606e", 10000000, "#5d5d79", 100000000, "#1e4368", 926737000, "#031326"] },
        'source-layer': 'transportation',
        'filter': ['all', filterYear]
    });
    map.addLayer({
        'id': 'arboverse.departures',
        'type': 'circle',
        'source': 'arboverse.departures',
        'paint': { 'circle-radius': ['step', ["get", "departures"], 0, 100, 3, 1000, 6, 10000, 9, 100000, 12, 1000000, 15, 10000000, 18, 100000000, 21, 926737000, 24], 'circle-color': ["step", ["get", "departures"], "hsl(61, 0%, 100%)", 100, "#fef2f3", 1000, "#e4c8b1", 10000, "#a5a795", 100000, "#7398a0", 1000000, "#487da3", 10000000, "#305c98", 100000000, "#253681", 926737000, "#1a0c64"] },
        'source-layer': 'departures',
        'filter': ['all', filterDepYear]
    });
    map.addLayer({
        'id': 'arboverse.arrivals',
        'type': 'circle',
        'source': 'arboverse.arrivals',
        'paint': { 'circle-radius': ['step', ["get", "arrivals"], 0, 100, 3, 1000, 6, 10000, 9, 100000, 12, 1000000, 15, 10000000, 18, 100000000, 21, 211998000, 24], 'circle-color': ["step", ["get", "arrivals"], "hsl(61, 0%, 100%)", 100, "#fefed8", 1000, "#c6eab2", 10000, "#9bbb95", 100000, "#92988a", 1000000, "#8c7681", 10000000, "#7e5172", 100000000, "#522754", 926737000, "#1a0e34"] },
        'source-layer': 'arrivals',
        'filter': ['all', filterArrYear]
    });
    map.setLayoutProperty(
        'arboverse.transportation',
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        'arboverse.departures',
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        'arboverse.arrivals',
        'visibility',
        'none'
    );
    // update year filter when the slider is dragged
    document
        .querySelector("input[name=number_passengers]")
        .addEventListener('input', function (e) {
            var year = parseInt(e.target.value);
            //update the map
            filterYear = ['==', ['number', ['get', 'year']], year];
            map.setFilter('arboverse.transportation', ['all', filterYear])
        });
    document
        .querySelector("input[name=departures]")
        .addEventListener('input', function (e) {
            var depYear = parseInt(e.target.value);
            //update the map
            filterDepYear = ['==', ['number', ['get', 'year']], depYear];
            map.setFilter('arboverse.departures', ['all', filterDepYear])
        });
    document
        .querySelector("input[name=arrivals]")
        .addEventListener('input', function (e) {
            var arrYear = parseInt(e.target.value);
            //update the map
            filterArrYear = ['==', ['number', ['get', 'year']], arrYear];
            map.setFilter('arboverse.arrivals', ['all', filterArrYear])
        });
});


//Opacity
const addOpacityVector = (element, title1) => {
    element.addEventListener('input', function (e) {
        map.setPaintProperty(
            title1,
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
};
const addOpacityTwoVector = (element, title1, title2) => {
    element.addEventListener('input', function (e) {
        map.setPaintProperty(
            title1,
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            title2,
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
};
const addOpacityRaster = (element, title1) => {
    element.addEventListener('input', function (e) {
        map.setPaintProperty(
            title1,
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
};
const addOpacityCircle = (element, title1) => {
    element.addEventListener('input', function (e) {
        map.setPaintProperty(
            title1,
            'circle-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
};

const addOpacityTwoRaster = (element, title1, title2) => {
    element.addEventListener('input', function (e) {
        map.setPaintProperty(
            title1,
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            title2,
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
};
//Opacity response
map.on('load', function () {
    var dryspellsSlider = document.querySelector('input[name=dryspells-opacity]')
    var extremeSlider = document.querySelector('input[name=extreme-opacity]')
    var hotdaysSlider = document.querySelector('input[name=hotdays-opacity]')
    var precSlider = document.querySelector('input[name=precipitation-opacity]')
    var tempSlider = document.querySelector('input[name=temp-opacity]')
    var hdiSlider = document.querySelector('input[name=hdi-opacity]')
    var gdpSlider = document.querySelector('input[name=gdp-opacity]')
    var mammalsSlider = document.querySelector('input[name=mammals-opacity]')
    var birdsSlider = document.querySelector('input[name=birds-opacity]')
    var amphibiansSlider = document.querySelector('input[name=amphibians-opacity]')
    var resistanceSlider = document.querySelector('input[name=resistance-opacity]')
    var droughtSlider = document.querySelector('input[name=drought-opacity]')
    var healthSlider = document.querySelector('input[name=health-opacity]')
    var citiesSlider = document.querySelector('input[name=cities-opacity]')
    var biodiversitySlider = document.querySelector('input[name=biodiversity-opacity]')
    var biomeSlider = document.querySelector('input[name=biome-opacity]')
    var protectBiomeSlider = document.querySelector('input[name=protect-biome-opacity]')
    var cliSlider = document.querySelector('input[name=climate-opacity]');
    var forecastSlider = document.querySelector('input[name=forecast-opacity]');
    var driveSlider = document.querySelector('input[name=drive-opacity]');
    var primarySlider = document.querySelector('input[name=primary-opacity]');
    var heightSlider = document.querySelector('input[name=height-opacity]');
    var intactSlider = document.querySelector('input[name=intact_opacity]');
    var indexSlider = document.querySelector('input[name=index-opacity]');
    var landSlider = document.querySelector('input[name=land-opacity]');
    var miniSlider = document.querySelector('input[name=mini-opacity]');
    var logSlider = document.querySelector('input[name=log-opacity]');
    var damsSlider = document.querySelector('input[name=dams-opacity]')
    var popSlider = document.querySelector('input[name=pop-opacity]');
    var arrSlider = document.querySelector('input[name=opacity-Arr]');
    var depSlider = document.querySelector('input[name=dep-opacity]');
    var passengersSlider = document.querySelector('input[name=pass-opacity]');
    var ariditySlider = document.querySelector('input[name=aridity-opacity]');
    var livestockSlider = document.querySelector('input[name=stock-opacity]');

    addOpacityTwoVector(cliSlider, 'arboverse.presentfull', 'arboverse.koppenfuture');
    addOpacityVector(driveSlider, 'arboverse.drivers');
    addOpacityCircle(resistanceSlider, 'arboverse.resistance');
    addOpacityVector(biomeSlider, 'arboverse.biomes');
    addOpacityVector(protectBiomeSlider, 'arboverse.biomesindex');
    addOpacityRaster(biodiversitySlider, 'arboverse.bii');
    addOpacityRaster(landSlider, 'arboverse.8xtrhkxq');
    addOpacityRaster(ariditySlider, 'arboverse.aridity_index_5km_modificado');
    addOpacityCircle(arrSlider, 'arboverse.arrivals');
    addOpacityCircle(depSlider, 'arboverse.departures');
    addOpacityCircle(passengersSlider, 'arboverse.transportation');
    addOpacityRaster(citiesSlider, 'arboverse.cities_accessibility_5km_2015')
    addOpacityTwoRaster(healthSlider, 'arboverse.healthcare_time_motorized', 'arboverse.healthcare_time_walking_5km_2020')

    popSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.pop_2000',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.pop_2005',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.pop_2010',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.pop_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.pop_2020',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })

    gdpSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.gdp_1990',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_1991',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_1992',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_1993',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_1994',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_1995',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_1996',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.gdp_1997',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_1998',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_1999',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2000',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2001',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2002',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2003',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2004',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2005',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2006',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2007',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2008',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2009',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2010',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2011',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2012',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2013',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2014',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.gdp_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })

    hdiSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.hdi_1990',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_1991',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_1992',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_1993',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_1994',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_1995',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_1996',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.hdi_1997',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_1998',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_1999',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2000',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2001',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2002',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2003',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2004',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2005',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2006',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2007',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2008',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2009',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2010',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2011',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2012',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2013',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2014',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hdi_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })

    mammalsSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.bio_mammals_primates_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_mammals_threatened_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_mammals_marsupialia_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_mammals_data_deficient_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_mammals_richness_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_mammals_eulipotyphla_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_mammals_rodentia_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.bio_mammals_carnivora_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_mammals_small_ranged_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_mammals_cetartiodactyla',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_mammals_chiroptera_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
    birdsSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.biodiversity_birds_richness_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_birds_trochilidae_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_birds_small_ranged_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_birds_non_passeriformes',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_birds_passeriformes_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_birds_nonbreeding_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_birds_threatened_bird',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.bio_birds_psittaciformes_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_birds_breeding_range_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_birds_threatened_small',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_birds_data_deficient_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
    amphibiansSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.bio_amp_richness_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_amp_gymnophiona_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_amp_threatened_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_amp_caudata_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_amp_anura_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_amp_data_def_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bio_amp_smal_range_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
    //Forecast MOsquito opacity control
    forecastSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.c89hazcs',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.cugep9k4',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.9uh1mltv',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.7va6tx65',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.bud0k3bq',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.cot4nhox',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.59jzfz3w',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.2wsi2z3v',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.a51uv49z',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.92xut72i',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
    primarySlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.primary_africa_1km_2010',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.primary_south_america_1km_2010',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.primary_madagascar_1km_2010',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.primary_asia_1km_2010',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    });
    heightSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.height_2019_nam_1km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.height_2019_sam_1km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.height_2019_aus_1km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.height_2019_narf_1km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.height_2019_safr_1km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.height_2019_sasia_1km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.height_2019_nasia_1m',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })

    damsSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.dams',
            'circle-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dams',
            'circle-stroke-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
    intactSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.ifl_2000',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.ifl_2013',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.ifl_2016',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
    });
    droughtSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.vulnerability',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.icesheets',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.waterbodies',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.rivers',
            'line-opacity',
            parseInt(e.target.value, 10) / 100
        );
    });

    miniSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.mining1',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.mining2',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.mining3',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.mining4',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.mining5',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.mining6',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.mining7',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.mining8',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.mining9',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.mining10',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
    });
    logSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.logging1',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.logging2',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.logging3',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.logging4',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.logging5',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.logging6',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.logging7',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.logging8',
            'fill-opacity',
            parseInt(e.target.value, 10) / 100
        );
    });
    livestockSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.livestock_goat_2010_da_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.livestock_bufalo_2010_da_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.livestock_sheep_2010_da_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.livestock_duck_2010_da_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.livestock_catle_2010_da_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.livestock_chicken_2010_da_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.livestock_pig_2010_da_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.livestock_horse_2010_da_10km',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    });
    tempSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.temp_min_rcp45_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp45_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp45_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp85_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp85_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp85_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp45_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.temp_average_rcp45_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp45_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp85_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp85_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp85_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp45_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp45_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp45_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp85_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp85_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp85_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp45_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp45_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp45_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp85_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp85_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp85_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp45_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp45_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp45_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp85_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp85_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp85_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp45_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp45_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp45_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp85_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp85_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp85_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp45_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp45_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp45_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp85_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp85_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp85_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp45_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp45_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp45_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp85_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp85_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp85_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp45_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp45_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp45_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_min_rcp85_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_average_rcp85_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.temp_max_rcp85_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
    //hotdays
    hotdaysSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp45_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp45_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp45_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp45_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp45_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp45_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp45_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp45_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp45_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp85_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp85_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp85_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp85_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp85_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp85_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp85_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp85_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.hot_days_yr_rcp85_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
    //precipitation
    precSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.prec_rcp45_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp45_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp45_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp45_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp45_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp45_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp45_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.prec_rcp45_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp45_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp85_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp85_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp85_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp85_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp85_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp85_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp85_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.prec_rcp85_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.prec_rcp85_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
    //extreme
    extremeSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.extreme_rcp45_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp45_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp45_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp45_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp45_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp45_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp45_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.extreme_rcp45_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp45_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp85_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp85_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp85_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp85_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp85_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp85_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp85_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.extreme_rcp85_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.extreme_rcp85_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
     //dryspells
     dryspellsSlider.addEventListener('input', function (e) {
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp45_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp45_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp45_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp45_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp45_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp45_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp45_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp45_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp45_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp85_1985_2015',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp85_1995_2025',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp85_2005_2035',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp85_2015_2045',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp85_2025_2055',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp85_2035_2065',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp85_2045_2075',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );

        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp85_2055_2085',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        map.setPaintProperty(
            'arboverse.dryspells_ch_rcp85_2065_2095',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
    })
})

// Holds visible vectors features for filtering
var vectors = [];
// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    className: "vector_popup"
});
var filterEl = document.getElementById('vector_dist');
var listingEl = document.getElementById('feature-listing');

//Render List in specific location Ok
function renderListings(features) {
    var empty = document.createElement('p');
    //clear any existing listings
    listingEl.innerHTML = '';
    if (features.length) {
        features.forEach(function (feature) {
            var item = document.createElement('a');
            item.textContent = feature.properties.species;
            item.addEventListener('mouseover', function () {
                //highlight corresponding feature on the map
                popup
                    .setLngLat(feature.geometry.coordinates)
                    .setText(feature.properties.species)
                    .addTo(map);
            });
            listingEl.appendChild(item);
        });
    } else if (features.length === 0 && filterEl.value !== '') {
        empty.textContent = 'No results found';
        listingEl.appendChild(empty)
    } else {
        empty.textContent = 'Zoom desired area to populate results';
        listingEl.appendChild(empty);
        // remove features filter
        map.setFilter('arboverse.vector_distribution', ['has', 'species']);
    }
}
function normalize(string) {
    return string.trim().toLowerCase();
}

// Because features come from tiled vector data,
// feature geometries may be split
// or duplicated across tile boundaries.
// As a result, features may appear
// multiple times in query results.
function getUniqueFeatures(features, comparatorProperty) {
    const uniqueIds = new Set();
    const uniqueFeatures = [];
    for (const feature of features) {
        const id = feature.properties[comparatorProperty];
        if (!uniqueIds.has(id)) {
            uniqueIds.add(id);
            uniqueFeatures.push(feature);
        }
    }
    return uniqueFeatures;
}
//VECTOR DISTRIBUTION
map.on('load', function () {
    var vectorFilter = ["==", ["string", ["get", "type"]], "mosquito"];
    map.addSource('arboverse.vector_distribution', {
        'type': 'vector',
        'url': 'mapbox://arboverse.vector_distribution'
    });
    map.addLayer({
        'id': 'arboverse.vector_distribution',
        'source': 'arboverse.vector_distribution',
        'source-layer': 'vector_distribution',
        'type': 'circle',
        'paint': { 'circle-radius': ["interpolate", ["linear"], ["zoom"], 0, 4, 22, 8], 'circle-color': ["match", ["get", "type"], ["mosquito"], "#0b4578", ["sandfly"], "#65ab6c", ["midge"], "#408a80", ["tick"], "#28728f", ["other"], "#bbdb88", "#000000"] },
        'filter': ["all", vectorFilter]
    });
    map.setLayoutProperty(
        'arboverse.vector_distribution',
        'visibility',
        'none'
    );
    //Select option Vector type
    const vectorType = document.getElementById("vectortype")
    vectorType.addEventListener('change', function () {
        console.log(vectorType.value)
        var vecType = vectorType.value
        vectorFilter = ["==", ["string", ["get", "type"]], vecType]
        map.setFilter('arboverse.vector_distribution', ["all", vectorFilter])
    });

    //Select the vectors which are rendered on the map
    map.on('movestart', function () {
        // reset features filter as the map starts moving
        map.setFilter('arboverse.vector_distribution', ['has', 'species']);// applied to species and type
    });
    map.on('moveend', function () {
        var features = map.queryRenderedFeatures({ layers: ['arboverse.vector_distribution'] });
        if (features) {
            var uniqueFeatures = getUniqueFeatures(features, 'species');
            // Populate features for the listing overlay.
            renderListings(uniqueFeatures);
            // Clear the input container
            filterEl.value = '';

            // Store the current features in sn `airports` variable to
            // later use for filtering on `keyup`.
            vectors = uniqueFeatures;
        }
    });
    //Popup
    map.on('mousemove', 'arboverse.vector_distribution', function (e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates based on the feature.
        var feature = e.features[0];
        popup
            .setLngLat(feature.geometry.coordinates)
            .setText('Species: ' + feature.properties.species + ' | Order: ' + feature.properties.order + ' | Family: ' + feature.properties.family + ' | Year: ' + feature.properties.year)
            .addTo(map);
        var popupElem = popup.getElement();
        popupElem.style.fontSize = "14px";
    });
    map.on('mouseleave', 'arboverse.vector_distribution', function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
    //Filter by the search box
    filterEl.addEventListener('keyup', function (e) {
        //normalize the letters
        var value = normalize(e.target.value);

        // Filter visible features that don't match the input value.
        var filtered = vectors.filter(function (feature) {
            var species = normalize(feature.properties.species);
            return species.indexOf(value) > -1;
        });
        //populate the side bar with filtered results
        renderListings(filtered);

        //set the filter to populate features into the layer
        if (filtered.length) {
            map.setFilter('arboverse.vector_distribution', [
                'match',
                ['get', 'species'],
                filtered.map(function (feature) {
                    return feature.properties.species;
                }),
                true,
                false
            ]);
        }

    });
    renderListings([]);
})
//VIRUS DISCOVERY
// holds visible families features for filtering
let virusFamily = [];
let virusGenus = [];
let virusSpecies = [];
//Create Popup, but do not add any information
const popupDiscovery = new mapboxgl.Popup({
    closeButton: false,
    className: "discovery_popup"
});

const filterFamily = document.getElementById('family-discovery-search');
const listingFamily = document.getElementById('family-listing');

const filterGenus = document.getElementById('genus-discovery-search');
const listingGenus = document.getElementById('genus-listing');

const filterSpecies = document.getElementById('species-discovery-search');
const listingSpecies = document.getElementById('species-listing');
//Render the list of families in the listing box
function renderListFamily(features) {
    const empty = document.createElement('p');
    // clear existing linst
    listingFamily.innerHTML = '';
    if (features.length) {
        for (const feature of features) {
            const itemLink = document.createElement('a');
            itemLink.textContent = feature.properties.family;
            itemLink.addEventListener('mouseover', () => {
                // highlight the corresponding feature on the map
                popupDiscovery
                    .setLngLat(feature.geometry.coordinates)
                    .setText(feature.properties.family)
                    .addTo(map);
            });
            listingFamily.appendChild(itemLink);
        }

    } else if (features.length === 0 && filterFamily.value !== '') {
        empty.textContent = 'No results found';
        listingFamily.appendChild(empty);
    } else {
        empty.textContent = 'Drag the map to populate results';
        listingFamily.appendChild(empty);

        //remove features filter
        map.setFilter('arboverse.6qvctboh', ['has', 'family'])
    }
}
//Render the list of genus in the listing box
function renderListGenus(features) {
    const empty = document.createElement('p');
    // clear existing linst
    listingGenus.innerHTML = '';
    if (features.length) {
        for (const feature of features) {
            const itemLink = document.createElement('a');
            itemLink.textContent = feature.properties.genus;
            itemLink.addEventListener('mouseover', () => {
                // highlight the corresponding feature on the map
                popupDiscovery
                    .setLngLat(feature.geometry.coordinates)
                    .setText(feature.properties.genus)
                    .addTo(map);
            });
            listingGenus.appendChild(itemLink);
        }

    } else if (features.length === 0 && filterGenus.value !== '') {
        empty.textContent = 'No results found';
        listingGenus.appendChild(empty);
    } else {
        empty.textContent = 'Drag the map to populate results';
        listingGenus.appendChild(empty);

        //remove features filter
        map.setFilter('arboverse.6qvctboh', ['has', 'genus'])
    }
}
//Render the list of Species in the listing box
function renderListSpecies(features) {
    const empty = document.createElement('p');
    // clear existing linst
    listingSpecies.innerHTML = '';
    if (features.length) {
        for (const feature of features) {
            const itemLink = document.createElement('a');
            itemLink.textContent = feature.properties.species;
            itemLink.addEventListener('mouseover', () => {
                // highlight the corresponding feature on the map
                popupDiscovery
                    .setLngLat(feature.geometry.coordinates)
                    .setText(feature.properties.species)
                    .addTo(map);
            });
            listingSpecies.appendChild(itemLink);
        }

    } else if (features.length === 0 && filterSpecies.value !== '') {
        empty.textContent = 'No results found';
        listingSpecies.appendChild(empty);
    } else {
        empty.textContent = 'Drag the map to populate results';
        listingSpecies.appendChild(empty);

        //remove features filter
        map.setFilter('arboverse.6qvctboh', ['has', 'species'])
    }
}
map.on('load', function () {

    map.addSource('arboverse.6qvctboh', {
        'type': 'vector',
        'url': 'mapbox://arboverse.6qvctboh'
    })
    map.addLayer({
        'id': 'arboverse.6qvctboh',
        'source': 'arboverse.6qvctboh',
        'source-layer': 'virus_discovery-5quy5w',
        'type': 'circle',
        'paint': {
            'circle-radius': ["interpolate", ["linear"], ["zoom"], 0, 7, 22, 11],
            'circle-color': ["match", ["get", "family"], ["Nodaviridae"], "#a46267", ["Reoviridae"], "#e99a73", ["Orthomyxoviridae"], "#e57b62", ["Peribunyaviridae"], "#6b5f76", ["Togaviridae"], "#2a4b70", ["Phenuiviridae"], "#85606f", ["Nairoviridae"], "#515b7a", ["Nyamiviridae"], "#c8675f", ["Flaviviridae"], "#0c2e4d", ["Asfarviridae"], "#031326", ["Rhabdoviridae"], "#0f574e", ["unk"], "#e5b589", "#000000"],
        }
    })
    map.setLayoutProperty(
        'arboverse.6qvctboh',
        'visibility',
        'none'
    );
    map.on('movestart', () => {
        // reset features filter as the map starts moving
        map.setFilter('arboverse.6qvctboh', ['has', 'family']);
    });
    map.on('moveend', () => {
        const features = map.queryRenderedFeatures({ layers: ['arboverse.6qvctboh'] });

        if (features) {
            const uniqueFeaturesFamily = getUniqueFeatures(features, 'family');
            renderListFamily(uniqueFeaturesFamily)
            //clear the input container for family
            filterFamily.value = '';

            families = uniqueFeaturesFamily;

            const uniqueFeaturesGenus = getUniqueFeatures(features, 'genus');
            renderListGenus(uniqueFeaturesGenus)
            //clear the input container for genus
            filterGenus.value = '';

            genuses = uniqueFeaturesGenus;

            const uniqueFeaturesSpeciesDiscovery = getUniqueFeatures(features, 'species');
            renderListSpecies(uniqueFeaturesSpeciesDiscovery)
            //clear the input container for species
            filterSpecies.value = '';

            speciesDiscovery = uniqueFeaturesSpeciesDiscovery;
        }
    });
    map.on('mousemove', 'arboverse.6qvctboh', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        const feature = e.features[0];
        //Popup when hover on virus discovery
        popupDiscovery
            .setLngLat(feature.geometry.coordinates)
            .setText(
                `${feature.properties.virus_name} was discovered in ${feature.properties.collection_year}  in ${feature.properties.country}. It belogs to ${feature.properties.family} family, ${feature.properties.genus} genus and ${feature.properties.species} species.`
            )
            .addTo(map);
    });
    map.on('mouseleave', 'arboverse.6qvctboh', () => {
        map.getCanvas().style.cursor = '';
        popupDiscovery.remove();
    });
    filterFamily.addEventListener('keyup', (e) => {
        const value = normalize(e.target.value);

        const filteredFamily = families.filter(function (feature) {
            var family = normalize(feature.properties.family);
            return family.indexOf(value) > -1;

        })

        //populate the side bar with filtered results
        renderListFamily(filteredFamily);
        //set the filter to populate features into the layer
        if (filteredFamily.length) {
            map.setFilter('arboverse.6qvctboh', [
                'match',
                ['get', 'family'],
                filteredFamily.map((feature) => {
                    return feature.properties.family;
                }),
                true,
                false
            ]);
        }
    });
    filterGenus.addEventListener('keyup', (e) => {
        const value = normalize(e.target.value);

        const filteredGenus = genuses.filter(function (feature) {
            var genus = normalize(feature.properties.genus);
            return genus.indexOf(value) > -1;
        })

        renderListGenus(filteredGenus);
        if (filteredGenus.length) {
            map.setFilter('arboverse.6qvctboh', [
                'match',
                ['get', 'genus'],
                filteredGenus.map((feature) => {
                    return feature.properties.genus;
                }),
                true,
                false
            ]);
        }
    });

    filterSpecies.addEventListener('keyup', (e) => {
        const value = normalize(e.target.value);

        const filteredSpeciesDiscovery = speciesDiscovery.filter(function (feature) {
            var specieDiscover = normalize(feature.properties.species);
            return specieDiscover.indexOf(value) > -1;
        })

        renderListSpecies(filteredSpeciesDiscovery);
        if (filteredSpeciesDiscovery.length) {
            map.setFilter('arboverse.6qvctboh', [
                'match',
                ['get', 'species'],
                filteredSpeciesDiscovery.map((feature) => {
                    return feature.properties.species;
                }),
                true,
                false
            ]);
        }
    })
    renderListFamily([]);
    renderListGenus([]);
    renderListSpecies([]);
})

//VECTOR Resistance POPUp
map.on('load', function () {
    var resistancePopup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "resistance_popup"
    })
    map.on('mouseenter', 'arboverse.resistance', function (e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates based on the feature.
        var feature = e.features[0];
        resistancePopup
            .setLngLat(feature.geometry.coordinates)
            .setMaxWidth("300px")
            .setText('Resistance Status: ' + feature.properties.RESISTANCE_STATUS + ' | Country: ' + feature.properties.COUNTRY_NAME + ' | Location: ' + feature.properties.SITE_NAME + ' | Vector Species: ' + feature.properties.SPECIES + ' | Vector Development Stage: ' + feature.properties.STAGE_ORIGIN + ' | Collection Period: ' + feature.properties.YEAR_START + ' | Inseticide Type: ' + feature.properties.INSECTICIDE_TYPE + ' | Inseticide Dosage: ' + feature.properties.INSECTICIDE_CONC + ' | IR Test Method: ' + feature.properties.TEST_TYPE + ' | Number Exposed: ' + feature.properties.MOSQUITO_NUMBER + ' | Mortality (%): ' + feature.properties.MORTALITY_ADJUSTED + ' | Data Curator: ' + feature.properties.DATA_CURATOR)
            .addTo(map);
        var popupElem = popup.getElement();
        popupElem.style.fontSize = "16px";
    });
    map.on('mouseleave', 'arboverse.resistance', function () {
        map.getCanvas().style.cursor = '';
        resistancePopup.remove();
    });

})
