// TO MAKE THE MAP APPEAR YOU MUST ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJib3ZlcnNlIiwiYSI6ImNrbXA2ODdnMzJibDAycXF1ODc2dmJtNngifQ.qHL3R2dqFpECCzUckaSl3w';

// initiate a new map by passing an object describing a config
// for more info see: https://docs.mapbox.com/mapbox-gl-js/api/map/
var map = new mapboxgl.Map({
    // id of div that will hold map
    container: 'map',

    // one of the existing mapbox map styles
    style: 'mapbox://styles/arboverse/ckomxnbu91h8o17o0uvo36cky',

    // zoom in (greater = smaller area displayed)
    zoom: 2,

    // longitude, latitude of the map center
    center: [20, 0]
});

// declare a function that can add a raster tile layer to a Mapbox map
// takes three parameters:
//   (mapVar) the Mapbox map object
//   (title) a string identifier for the source and layer
//   (url) the raster tile URL to add to the map
const addTileLayerToMap = (mapVar, title, url, type, paint, source_layer) => {
    console.log(mapVar, title, url)
    // need to first add a source
    mapVar.addSource(title, {
        type: 'vector',
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
        'paint': paint,
        "source-layer": source_layer
    });

    mapVar.setLayoutProperty(
        title,
        'visibility',
        'none'
    );
}
// ...
// var map = new mapboxgl.Map({
// ...

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

//VECTORTiles
// run the API call once the map is loaded (API call is asnyc)
map.on('load', async () => {
    // add a layer to the map
    addTileLayerToMap(map, 'arboverse.bkdd701g', 'mapbox://arboverse.bkdd701g', 'fill', { 'fill-color': ['match', ['get', 'classes'], [1], "#f94144", [2], "#f9844a", [3], "#43aa8b", [4], "#f9c74f", [5], "#6930c3", "#000000"] }, 'Cover_loss_dominant_drivers-bbybfd');
    addTileLayerToMap(map, 'arboverse.ckokkepkj1n2o21qr5mvoxy6y-8mech', 'mapbox://arboverse.ckokkepkj1n2o21qr5mvoxy6y-8mech', 'circle', {'circle-radius': 3, 'circle-color': ["match",["get", "status"],["Operational"],"#f2a65a",["Under Construction"],"#e86c5f",["Planned"],"hsl(69, 60%, 56%)",["Inventoried"],"#3abb9b",["Suspended"],"#dd2c2f",["Unknown"],"#822faf","#fff"]}, 'major_Dams_new');
    addTileLayerToMap(map, 'arboverse.presentfull', 'mapbox://arboverse.presentfull', 'fill', { 'fill-color': [ "case", [ "==", ["get", "classes"], 0 ], "hsla(0, 0%, 0%, 0)", [ "match", ["get", "classes"], [1], true, false ], "hsl(240, 100%, 50%)", [ "match", ["get", "classes"], [2], true, false ], "hsl(212, 100%, 50%)", [ "match", ["get", "classes"], [3], true, false ], "hsl(207, 95%, 63%)", [ "match", ["get", "classes"], [4], true, false ], "hsl(0, 100%, 50%)", [ "match", ["get", "classes"], [5], true, false ], "hsl(0, 100%, 79%)", [ "match", ["get", "classes"], [6], true, false ], "hsl(40, 100%, 48%)", [ "match", ["get", "classes"], [7], true, false ], "hsl(46, 100%, 70%)", [ "match", ["get", "classes"], [8], true, false ], "hsl(60, 100%, 50%)", [ "match", ["get", "classes"], [9], true, false ], "hsl(60, 100%, 39%)", [ "match", ["get", "classes"], [10], true, false ], "hsl(60, 100%, 29%)", [ "match", ["get", "classes"], [11], true, false ], "hsl(120, 100%, 79%)", [ "match", ["get", "classes"], [12], true, false ], "hsl(120, 48%, 59%)", [ "match", ["get", "classes"], [13], true, false ], "hsl(120, 50%, 39%)", [ "match", ["get", "classes"], [14], true, false ], "hsl(79, 100%, 66%)", [ "match", ["get", "classes"], [15], true, false ], "hsl(113, 100%, 66%)", [ "match", ["get", "classes"], [16], true, false ], "hsl(105, 100%, 39%)", [ "match", ["get", "classes"], [17], true, false ], "hsl(300, 100%, 50%)", [ "match", ["get", "classes"], [18], true, false ], "hsl(300, 100%, 39%)", [ "match", ["get", "classes"], [19], true, false ], "hsl(300, 50%, 39%)", [ "match", ["get", "classes"], [20], true, false ], "hsl(300, 20%, 49%)", [ "match", ["get", "classes"], [21], true, false ], "hsl(236, 100%, 83%)", [ "match", ["get", "classes"], [22], true, false ], "hsl(226, 65%, 61%)", [ "match", ["get", "classes"], [23], true, false ], "hsl(235, 44%, 49%)", [ "match", ["get", "classes"], [24], true, false ], "hsl(262, 100%, 26%)", [ "match", ["get", "classes"], [26], true, false ], "hsl(197, 100%, 61%)", [ "match", ["get", "classes"], [27], true, false ], "hsl(180, 100%, 25%)", [ "match", ["get", "classes"], [28], true, false ], "hsl(196, 100%, 19%)", [ "match", ["get", "classes"], [29], true, false ], "hsl(0, 0%, 70%)", [ "match", ["get", "classes"], [30], true, false ], "hsl(0, 0%, 40%)", [ "match", ["get", "classes"], [25], true, false ], "hsl(180, 100%, 50%)", [ "match", ["id"], [8875156905546390], true, false ], "hsl(240, 100%, 50%)", "#000000" ]}, 'kopeen_fullpresent');
    addTileLayerToMap(map, 'arboverse.koppenfuture', 'mapbox://arboverse.koppenfuture', 'fill', { 'fill-color': [ "case", [ "==", ["get", "classes"], 0 ], "hsla(0, 0%, 0%, 0)", [ "match", ["get", "classes"], [1], true, false ], "hsl(240, 100%, 50%)", [ "match", ["get", "classes"], [2], true, false ], "hsl(212, 100%, 50%)", [ "match", ["get", "classes"], [3], true, false ], "hsl(207, 95%, 63%)", [ "match", ["get", "classes"], [4], true, false ], "hsl(0, 100%, 50%)", [ "match", ["get", "classes"], [5], true, false ], "hsl(0, 100%, 79%)", [ "match", ["get", "classes"], [6], true, false ], "hsl(40, 100%, 48%)", [ "match", ["get", "classes"], [7], true, false ], "hsl(46, 100%, 70%)", [ "match", ["get", "classes"], [8], true, false ], "hsl(60, 100%, 50%)", [ "match", ["get", "classes"], [9], true, false ], "hsl(60, 100%, 39%)", [ "match", ["get", "classes"], [10], true, false ], "hsl(60, 100%, 29%)", [ "match", ["get", "classes"], [11], true, false ], "hsl(120, 100%, 79%)", [ "match", ["get", "classes"], [12], true, false ], "hsl(120, 48%, 59%)", [ "match", ["get", "classes"], [13], true, false ], "hsl(120, 50%, 39%)", [ "match", ["get", "classes"], [14], true, false ], "hsl(79, 100%, 66%)", [ "match", ["get", "classes"], [15], true, false ], "hsl(113, 100%, 66%)", [ "match", ["get", "classes"], [16], true, false ], "hsl(105, 100%, 39%)", [ "match", ["get", "classes"], [17], true, false ], "hsl(300, 100%, 50%)", [ "match", ["get", "classes"], [18], true, false ], "hsl(300, 100%, 39%)", [ "match", ["get", "classes"], [19], true, false ], "hsl(300, 50%, 39%)", [ "match", ["get", "classes"], [20], true, false ], "hsl(300, 20%, 49%)", [ "match", ["get", "classes"], [21], true, false ], "hsl(236, 100%, 83%)", [ "match", ["get", "classes"], [22], true, false ], "hsl(226, 65%, 61%)", [ "match", ["get", "classes"], [23], true, false ], "hsl(235, 44%, 49%)", [ "match", ["get", "classes"], [24], true, false ], "hsl(262, 100%, 26%)", [ "match", ["get", "classes"], [26], true, false ], "hsl(197, 100%, 61%)", [ "match", ["get", "classes"], [27], true, false ], "hsl(180, 100%, 25%)", [ "match", ["get", "classes"], [28], true, false ], "hsl(196, 100%, 19%)", [ "match", ["get", "classes"], [29], true, false ], "hsl(0, 0%, 70%)", [ "match", ["get", "classes"], [30], true, false ], "hsl(0, 0%, 40%)", [ "match", ["get", "classes"], [25], true, false ], "hsl(180, 100%, 50%)", [ "match", ["id"], [8875156905546390], true, false ], "hsl(240, 100%, 50%)", "#000000" ]}, 'kopeen_future');
    addTileLayerToMap(map, 'arboverse.ifl_2000', 'mapbox://arboverse.ifl_2000', 'fill', { 'fill-color': "hsl(78, 33%, 50%)" }, 'ifl_2000');
    addTileLayerToMap(map, 'arboverse.ifl_2013', 'mapbox://arboverse.ifl_2013', 'fill', { 'fill-color': "hsl(92, 45%, 32%)" }, 'ifl_2013');
    addTileLayerToMap(map, 'arboverse.ifl_2016', 'mapbox://arboverse.ifl_2016', 'fill', { 'fill-color': "hsl(113, 33%, 26%)" }, 'ifl_2016');
});
//RASTERTiles
map.on('load', async()=>{
    addRasterTileLayerToMap(map, 'arboverse.land_Cover_1km_nearest', 'mapbox://arboverse.land_Cover_1km_nearest', 'raster', 'mapbox://arboverse.land_Cover_1km_nearest', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_nam_1km', 'mapbox://arboverse.height_2019_nam_1km', 'raster', 'mapbox://arboverse.height_2019_nam_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_sam_1km', 'mapbox://arboverse.height_2019_sam_1km', 'raster', 'mapbox://arboverse.height_2019_sam_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_aus_1km', 'mapbox://arboverse.height_2019_aus_1km', 'raster', 'mapbox://arboverse.height_2019_aus_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_narf_1km', 'mapbox://arboverse.height_2019_narf_1km', 'raster', 'mapbox://arboverse.height_2019_narf_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_safr_1km', 'mapbox://arboverse.height_2019_safr_1km', 'raster', 'mapbox://arboverse.height_2019_safr_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_nasia_1m', 'mapbox://arboverse.height_2019_nasia_1m', 'raster', 'mapbox://arboverse.height_2019_nasia_1m', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_sasia_1km', 'mapbox://arboverse.height_2019_sasia_1km', 'raster', 'mapbox://arboverse.height_2019_sasia_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_africa_1km', 'mapbox://arboverse.primary_africa_1km', 'raster', 'mapbox://arboverse.primary_africa_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_southamerica_1km', 'mapbox://arboverse.primary_southamerica_1km', 'raster', 'mapbox://arboverse.primary_southamerica_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_madagascar_1km', 'mapbox://arboverse.primary_madagascar_1km', 'raster', 'mapbox://arboverse.primary_madagascar_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_asia_1km', 'mapbox://arboverse.primary_asia_1km', 'raster', 'mapbox://arboverse.primary_asia_1km', 0, 19);
});
