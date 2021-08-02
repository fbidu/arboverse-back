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
    center: [20, 0],
    preserveDrawingBuffer: true
});
var exportBtn = document.getElementById('downloadLink');
exportBtn.addEventListener('click', function(){
    var imgMap = map.getCanvas().toDataURL('image/png')
    this.href = imgMap
})
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
// To labels appear on top of the layers
map.on('load', function(){
    var layers = map.getStyle().layers;
    //Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for(var i = 0; i < layers.length; i++){
        if(layers[i].type === 'symbol'){
            firstSymbolId = layers[i].id;
            break;
        }
    }
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

map.on('load', async()=>{
    addTileLayerToMap(map, 'arboverse.presentfull', 'mapbox://arboverse.presentfull', 'fill', { 'fill-color': [ "case", [ "==", ["get", "classes"], 0 ], "hsla(0, 0%, 0%, 0)", [ "match", ["get", "classes"], [1], true, false ], "hsl(240, 100%, 50%)", [ "match", ["get", "classes"], [2], true, false ], "hsl(212, 100%, 50%)", [ "match", ["get", "classes"], [3], true, false ], "hsl(207, 95%, 63%)", [ "match", ["get", "classes"], [4], true, false ], "hsl(0, 100%, 50%)", [ "match", ["get", "classes"], [5], true, false ], "hsl(0, 100%, 79%)", [ "match", ["get", "classes"], [6], true, false ], "hsl(40, 100%, 48%)", [ "match", ["get", "classes"], [7], true, false ], "hsl(46, 100%, 70%)", [ "match", ["get", "classes"], [8], true, false ], "hsl(60, 100%, 50%)", [ "match", ["get", "classes"], [9], true, false ], "hsl(60, 100%, 39%)", [ "match", ["get", "classes"], [10], true, false ], "hsl(60, 100%, 29%)", [ "match", ["get", "classes"], [11], true, false ], "hsl(120, 100%, 79%)", [ "match", ["get", "classes"], [12], true, false ], "hsl(120, 48%, 59%)", [ "match", ["get", "classes"], [13], true, false ], "hsl(120, 50%, 39%)", [ "match", ["get", "classes"], [14], true, false ], "hsl(79, 100%, 66%)", [ "match", ["get", "classes"], [15], true, false ], "hsl(113, 100%, 66%)", [ "match", ["get", "classes"], [16], true, false ], "hsl(105, 100%, 39%)", [ "match", ["get", "classes"], [17], true, false ], "hsl(300, 100%, 50%)", [ "match", ["get", "classes"], [18], true, false ], "hsl(300, 100%, 39%)", [ "match", ["get", "classes"], [19], true, false ], "hsl(300, 50%, 39%)", [ "match", ["get", "classes"], [20], true, false ], "hsl(300, 20%, 49%)", [ "match", ["get", "classes"], [21], true, false ], "hsl(236, 100%, 83%)", [ "match", ["get", "classes"], [22], true, false ], "hsl(226, 65%, 61%)", [ "match", ["get", "classes"], [23], true, false ], "hsl(235, 44%, 49%)", [ "match", ["get", "classes"], [24], true, false ], "hsl(262, 100%, 26%)", [ "match", ["get", "classes"], [26], true, false ], "hsl(197, 100%, 61%)", [ "match", ["get", "classes"], [27], true, false ], "hsl(180, 100%, 25%)", [ "match", ["get", "classes"], [28], true, false ], "hsl(196, 100%, 19%)", [ "match", ["get", "classes"], [29], true, false ], "hsl(0, 0%, 70%)", [ "match", ["get", "classes"], [30], true, false ], "hsl(0, 0%, 40%)", [ "match", ["get", "classes"], [25], true, false ], "hsl(180, 100%, 50%)", [ "match", ["id"], [8875156905546390], true, false ], "hsl(240, 100%, 50%)", "#000000" ]}, 'kopeen_fullpresent');
    addTileLayerToMap(map, 'arboverse.koppenfuture', 'mapbox://arboverse.koppenfuture', 'fill', { 'fill-color': [ "case", [ "==", ["get", "classes"], 0 ], "hsla(0, 0%, 0%, 0)", [ "match", ["get", "classes"], [1], true, false ], "hsl(240, 100%, 50%)", [ "match", ["get", "classes"], [2], true, false ], "hsl(212, 100%, 50%)", [ "match", ["get", "classes"], [3], true, false ], "hsl(207, 95%, 63%)", [ "match", ["get", "classes"], [4], true, false ], "hsl(0, 100%, 50%)", [ "match", ["get", "classes"], [5], true, false ], "hsl(0, 100%, 79%)", [ "match", ["get", "classes"], [6], true, false ], "hsl(40, 100%, 48%)", [ "match", ["get", "classes"], [7], true, false ], "hsl(46, 100%, 70%)", [ "match", ["get", "classes"], [8], true, false ], "hsl(60, 100%, 50%)", [ "match", ["get", "classes"], [9], true, false ], "hsl(60, 100%, 39%)", [ "match", ["get", "classes"], [10], true, false ], "hsl(60, 100%, 29%)", [ "match", ["get", "classes"], [11], true, false ], "hsl(120, 100%, 79%)", [ "match", ["get", "classes"], [12], true, false ], "hsl(120, 48%, 59%)", [ "match", ["get", "classes"], [13], true, false ], "hsl(120, 50%, 39%)", [ "match", ["get", "classes"], [14], true, false ], "hsl(79, 100%, 66%)", [ "match", ["get", "classes"], [15], true, false ], "hsl(113, 100%, 66%)", [ "match", ["get", "classes"], [16], true, false ], "hsl(105, 100%, 39%)", [ "match", ["get", "classes"], [17], true, false ], "hsl(300, 100%, 50%)", [ "match", ["get", "classes"], [18], true, false ], "hsl(300, 100%, 39%)", [ "match", ["get", "classes"], [19], true, false ], "hsl(300, 50%, 39%)", [ "match", ["get", "classes"], [20], true, false ], "hsl(300, 20%, 49%)", [ "match", ["get", "classes"], [21], true, false ], "hsl(236, 100%, 83%)", [ "match", ["get", "classes"], [22], true, false ], "hsl(226, 65%, 61%)", [ "match", ["get", "classes"], [23], true, false ], "hsl(235, 44%, 49%)", [ "match", ["get", "classes"], [24], true, false ], "hsl(262, 100%, 26%)", [ "match", ["get", "classes"], [26], true, false ], "hsl(197, 100%, 61%)", [ "match", ["get", "classes"], [27], true, false ], "hsl(180, 100%, 25%)", [ "match", ["get", "classes"], [28], true, false ], "hsl(196, 100%, 19%)", [ "match", ["get", "classes"], [29], true, false ], "hsl(0, 0%, 70%)", [ "match", ["get", "classes"], [30], true, false ], "hsl(0, 0%, 40%)", [ "match", ["get", "classes"], [25], true, false ], "hsl(180, 100%, 50%)", [ "match", ["id"], [8875156905546390], true, false ], "hsl(240, 100%, 50%)", "#000000" ]}, 'kopeen_future');
    addRasterTileLayerToMap(map, 'arboverse.land_Cover_1km_nearest', 'mapbox://arboverse.land_Cover_1km_nearest', 'raster', 'mapbox://arboverse.land_Cover_1km_nearest', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.pop_2015', 'mapbox://arboverse.pop_2015', 'raster', 'mapbox://arboverse.pop_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.pop_2020', 'mapbox://arboverse.pop_2020', 'raster', 'mapbox://arboverse.pop_2020', 0, 19);
    addTileLayerToMap(map, 'arboverse.bkdd701g', 'mapbox://arboverse.bkdd701g', 'fill', { 'fill-color': ['match', ['get', 'classes'], [1], "#f94144", [2], "#f9844a", [3], "#43aa8b", [4], "#f9c74f", [5], "#6930c3", "#000000"] }, 'Cover_loss_dominant_drivers-bbybfd');
    addRasterTileLayerToMap(map, 'arboverse.flii_oceania_1km', 'mapbox://arboverse.flii_oceania_1km', 'raster', 'mapbox://arboverse.flii_oceania_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.flii_africa_1km', 'mapbox://arboverse.flii_africa_1km', 'raster', 'mapbox://arboverse.flii_africa_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.flii_northamerica_1km', 'mapbox://arboverse.flii_northamerica_1km', 'raster', 'mapbox://arboverse.flii_northamerica_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.flii_southamerica_1km', 'mapbox://arboverse.flii_southamerica_1km', 'raster', 'mapbox://arboverse.flii_southamerica_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_nam_1km', 'mapbox://arboverse.height_2019_nam_1km', 'raster', 'mapbox://arboverse.height_2019_nam_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_sam_1km', 'mapbox://arboverse.height_2019_sam_1km', 'raster', 'mapbox://arboverse.height_2019_sam_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_aus_1km', 'mapbox://arboverse.height_2019_aus_1km', 'raster', 'mapbox://arboverse.height_2019_aus_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_narf_1km', 'mapbox://arboverse.height_2019_narf_1km', 'raster', 'mapbox://arboverse.height_2019_narf_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_safr_1km', 'mapbox://arboverse.height_2019_safr_1km', 'raster', 'mapbox://arboverse.height_2019_safr_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_nasia_1m', 'mapbox://arboverse.height_2019_nasia_1m', 'raster', 'mapbox://arboverse.height_2019_nasia_1m', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.height_2019_sasia_1km', 'mapbox://arboverse.height_2019_sasia_1km', 'raster', 'mapbox://arboverse.height_2019_sasia_1km', 0, 19);
    addTileLayerToMap(map, 'arboverse.ifl_2000', 'mapbox://arboverse.ifl_2000', 'fill', { 'fill-color': "hsl(78, 33%, 50%)" }, 'ifl_2000');
    addTileLayerToMap(map, 'arboverse.ifl_2013', 'mapbox://arboverse.ifl_2013', 'fill', { 'fill-color': "hsl(92, 45%, 32%)" }, 'ifl_2013');
    addTileLayerToMap(map, 'arboverse.ifl_2016', 'mapbox://arboverse.ifl_2016', 'fill', { 'fill-color': "hsl(113, 33%, 26%)" }, 'ifl_2016');
    addRasterTileLayerToMap(map, 'arboverse.primary_africa_1km', 'mapbox://arboverse.primary_africa_1km', 'raster', 'mapbox://arboverse.primary_africa_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_southamerica_1km', 'mapbox://arboverse.primary_southamerica_1km', 'raster', 'mapbox://arboverse.primary_southamerica_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_madagascar_1km', 'mapbox://arboverse.primary_madagascar_1km', 'raster', 'mapbox://arboverse.primary_madagascar_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_asia_1km', 'mapbox://arboverse.primary_asia_1km', 'raster', 'mapbox://arboverse.primary_asia_1km', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.tree_cover_loss_1km_2001-2010', 'mapbox://arboverse.tree_cover_loss_1km_2001-2010', 'raster', 'mapbox://arboverse.tree_cover_loss_1km_2001-2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.tree_cover_loss_1km_2011-2020', 'mapbox://arboverse.tree_cover_loss_1km_2011-2020', 'raster', 'mapbox://arboverse.tree_cover_loss_1km_2011-2020', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.soy_300m', 'mapbox://arboverse.soy_300m', 'raster', 'mapbox://arboverse.soy_300m', 0, 19);
    addTileLayerToMap(map, 'arboverse.mining1', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#e56b6f" }, 'cameroon_mining');
    addTileLayerToMap(map, 'arboverse.mining2', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#e56b6f" }, 'brazil_mining');
    addTileLayerToMap(map, 'arboverse.mining3', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#e56b6f" }, 'canada_mining');
    addTileLayerToMap(map, 'arboverse.mining4', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#e56b6f" }, 'colombia_mining');
    addTileLayerToMap(map, 'arboverse.mining5', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#e56b6f" }, 'democratic_republic_mining');
    addTileLayerToMap(map, 'arboverse.mining6', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#e56b6f" }, 'gabon_mining');
    addTileLayerToMap(map, 'arboverse.mining7', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#e56b6f" }, 'licadho_mining');
    addTileLayerToMap(map, 'arboverse.mining8', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#e56b6f" }, 'mexico_mining');
    addTileLayerToMap(map, 'arboverse.mining9', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#e56b6f" }, 'preu_mining');
    addTileLayerToMap(map, 'arboverse.mining10', 'mapbox://arboverse.mining', 'fill', { 'fill-color': "#e56b6f" }, 'republic_congo_mining');
    addTileLayerToMap(map, 'arboverse.logging1', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#0b525b" }, 'sarawak_logging');
    addTileLayerToMap(map, 'arboverse.logging2', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#0b525b" }, 'liberia_logging');
    addTileLayerToMap(map, 'arboverse.logging3', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#0b525b" }, 'gabon_logging');
    addTileLayerToMap(map, 'arboverse.logging4', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#0b525b" }, 'equatorial_guinea_logging');
    addTileLayerToMap(map, 'arboverse.logging5', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#0b525b" }, 'democratic_republic_logging');
    addTileLayerToMap(map, 'arboverse.logging6', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#0b525b" }, 'centra_africa_logging');
    addTileLayerToMap(map, 'arboverse.logging7', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#0b525b" }, 'camerron_logging');
    addTileLayerToMap(map, 'arboverse.logging8', 'mapbox://arboverse.canada_logging', 'fill', { 'fill-color': "#0b525b" }, 'canada_logging_nova');
    addTileLayerToMap(map, 'arboverse.ckokkepkj1n2o21qr5mvoxy6y-8mech', 'mapbox://arboverse.ckokkepkj1n2o21qr5mvoxy6y-8mech', 'circle', {'circle-radius': 4, 'circle-color': ["match",["get", "status"],["Operational"],"#f2a65a",["Under Construction"],"#e86c5f",["Planned"],"hsl(69, 60%, 56%)",["Inventoried"],"#3abb9b",["Suspended"],"#dd2c2f",["Unknown"],"#822faf","#fff"]}, 'major_Dams_new');
})
//Number of passengers
map.on('load', function(){
    //Filter by year
    //initial date
    var filterYear = ['==', ['number', ['get', 'year']], 1970];
    var filterDepYear = ['==', ['number', ['get', 'year']], 1995];
    var filterArrYear = ['==', ['number', ['get', 'year']], 1995];
    map.addSource('arboverse.cts68r85', {
        type: 'vector',
        // Use any Mapbox-hosted tileset using its tileset id.
        // Learn more about where to find a tileset id:
        // https://docs.mapbox.com/help/glossary/tileset-id/
        url: 'mapbox://arboverse.cts68r85'
    });
    map.addSource('arboverse.2mtp8qji',{
        type: 'vector',
        url: 'mapbox://arboverse.2mtp8qji'
    });
    map.addSource('arboverse.cgwofgmt',{
        type: 'vector',
        url: 'mapbox://arboverse.cgwofgmt'
    })
    // then add the layer, referencing the source
    map.addLayer({
        'id': 'arboverse.cts68r85',
        'type': 'circle',
        'source': 'arboverse.cts68r85',
        'paint': {'circle-radius': [ "step", [ "get", "passengers carried" ], 0, 100, 3, 1000, 6, 10000, 9, 100000, 12, 1000000, 15, 10000000, 18, 100000000, 21, 157873000, 24 ], 'circle-color': [ "step", [ "get", "passengers carried" ], "hsl(61, 0%, 100%)", 100, "#d9ed92", 1000, "#b5e48c", 10000, "#99d98c", 100000, "#76c893", 1000000, "#52b69a", 10000000, "#34a0a4", 100000000, "#168aad", 926737000, "#1a759f" ]},
        'source-layer': 'air_transport_06_30_21_WDI-7a456y',
        'filter': ['all', filterYear]
    });
    map.addLayer({
        'id': 'arboverse.2mtp8qji',
        'type': 'circle',
        'source': 'arboverse.2mtp8qji',
        'paint': {'circle-radius': ['step',[ "get", "departures"], 0, 100, 3, 1000, 6, 10000, 9, 100000, 12, 1000000, 15, 10000000, 18, 100000000, 21, 926737000, 24], 'circle-color': ["step", ["get", "departures"], "hsl(61, 0%, 100%)", 100, "#FF99AC", 1000, "#EA88AD", 10000, "#D577AF", 100000, "#C066B0", 1000000, "#AC56B2", 10000000, "#9745B3", 100000000, "#8234B5", 926737000, "#6D23B6"]},
        'source-layer': 'tourism_departures_06_30_21_W-5zcnfa',
        'filter': ['all', filterDepYear]
    });
    map.addLayer({
        'id': 'arboverse.cgwofgmt',
        'type': 'circle',
        'source': 'arboverse.cgwofgmt',
        'paint': {'circle-radius': ['step',[ "get", "arrivals"], 0, 100, 3, 1000, 6, 10000, 9, 100000, 12, 1000000, 15, 10000000, 18, 100000000, 21, 211998000, 24], 'circle-color': ["step", ["get", "arrivals"], "hsl(61, 0%, 100%)", 100, "#60EFFF", 1000, "#52DBFF", 10000, "#45C6FF", 100000, "#37B2FF", 1000000, "#299EFF", 10000000, "#1B8AFF", 100000000, "#0E75FF", 926737000, "#0061FF"]},
        'source-layer': 'tourism_arrivals_06_30_21_WDI-aza97h',
        'filter': ['all', filterArrYear]
    });
    map.setLayoutProperty(
        'arboverse.cts68r85',
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        'arboverse.2mtp8qji',
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        'arboverse.cgwofgmt',
        'visibility',
        'none'
    );    
    // update year filter when the slider is dragged
    document
            .querySelector("input[name=number_passengers]")
            .addEventListener('input', function(e){
                var year = parseInt(e.target.value);
                //update the map
                filterYear = ['==', ['number', ['get', 'year']], year];
                map.setFilter('arboverse.cts68r85', ['all', filterYear])
            });
    document
            .querySelector("input[name=departures]") 
            .addEventListener('input', function(e){
                var depYear = parseInt(e.target.value);
                //update the map
                filterDepYear = ['==', ['number', ['get', 'year']], depYear];
                map.setFilter('arboverse.2mtp8qji', ['all', filterDepYear])
            }); 
    document
            .querySelector("input[name=arrivals]")
            .addEventListener('input', function(e){
                var arrYear = parseInt(e.target.value);
                //update the map
                filterArrYear = ['==', ['number', ['get', 'year']], arrYear];
                map.setFilter('arboverse.cgwofgmt', ['all', filterArrYear])
            });              
});


//Opacity 
const addOpacityVector = (element, title1) =>{
    element.addEventListener('input', function(e){
        map.setPaintProperty(
            title1,
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
    })
};
const addOpacityTwoVector = (element, title1, title2) =>{
    element.addEventListener('input', function(e){
        map.setPaintProperty(
            title1,
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            title2,
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
    })
};
const addOpacityRaster = (element, title1) =>{
    element.addEventListener('input', function(e){
        map.setPaintProperty(
            title1,
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
    })
};
const addOpacityCircle = (element, title1) =>{
    element.addEventListener('input', function(e){
        map.setPaintProperty(
            title1,
            'circle-opacity',
            parseInt(e.target.value,10)/100
        );
    })
};

const addOpacityTwoRaster = (element, title1, title2) =>{
    element.addEventListener('input', function(e){
        map.setPaintProperty(
            title1,
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            title2,
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
    })
};

map.on('load', function(){
    var cliSlider = document.querySelector('input[name=climate-opacity]');
    var lossSlider = document.querySelector('input[name=coverloss-opacity]');
    var driveSlider = document.querySelector('input[name=drive-opacity]');
    var primarySlider = document.querySelector('input[name=primary-opacity]');
    var heightSlider = document.querySelector('input[name=height-opacity]');
    var intactSlider = document.querySelector('input[name=intact_opacity]');
    var indexSlider = document.querySelector('input[name=index-opacity]');
    var landSlider = document.querySelector('input[name=land-opacity]');
    var miniSlider = document.querySelector('input[name=mini-opacity]');
    var logSlider = document.querySelector('input[name=log-opacity]');
    var soySlider = document.querySelector('input[name=soy-opacity]');
    var damsSlider = document.querySelector('input[name=dams-opacity]');
    var popSlider = document.querySelector('input[name=pop-opacity]');
    var arrSlider = document.querySelector('input[name=opacity-Arr]');
    var depSlider = document.querySelector('input[name=dep-opacity]');
    var passengersSlider = document.querySelector('input[name=pass-opacity]');

    addOpacityTwoVector(cliSlider, 'arboverse.presentfull', 'arboverse.koppenfuture');
    addOpacityTwoRaster(lossSlider, 'arboverse.tree_cover_loss_1km_2001-2010', 'arboverse.tree_cover_loss_1km_2011-2020');
    addOpacityVector(driveSlider, 'arboverse.bkdd701g');
    addOpacityRaster(landSlider, 'arboverse.land_Cover_1km_nearest');
    addOpacityRaster(soySlider, 'arboverse.soy_300m');
    addOpacityCircle(damsSlider, 'arboverse.ckokkepkj1n2o21qr5mvoxy6y-8mech');
    addOpacityTwoRaster(popSlider, 'arboverse.pop_2015', 'arboverse.pop_2020');
    addOpacityCircle(arrSlider, 'arboverse.cgwofgmt');
    addOpacityCircle(depSlider, 'arboverse.2mtp8qji');
    addOpacityCircle(passengersSlider, 'arboverse.cts68r85');
    
    

    primarySlider.addEventListener('input', function(e){
        map.setPaintProperty(
            'arboverse.primary_africa_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.primary_southamerica_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.primary_madagascar_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.primary_asia_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
    });
    heightSlider.addEventListener('input', function(e){
        map.setPaintProperty(
            'arboverse.height_2019_nam_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.height_2019_sam_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.height_2019_aus_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.height_2019_narf_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.height_2019_safr_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.height_2019_sasia_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.height_2019_nasia_1m',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
    })
    intactSlider.addEventListener('input', function(e){
        map.setPaintProperty(
            'arboverse.ifl_2000',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.ifl_2013',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.ifl_2016',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
    });
    indexSlider.addEventListener('input', function(e){
        map.setPaintProperty(
            'arboverse.flii_oceania_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.flii_africa_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.flii_northamerica_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.flii_southamerica_1km',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
    });
    miniSlider.addEventListener('input', function(e){
        map.setPaintProperty(
            'arboverse.mining1',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.mining2',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.mining3',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.mining4',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.mining5',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.mining6',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.mining7',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.mining8',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.mining9',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.mining10',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
    });
    logSlider.addEventListener('input', function(e){
        map.setPaintProperty(
            'arboverse.logging1',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.logging2',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.logging3',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.logging4',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.logging5',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.logging6',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.logging7',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.logging8',
            'fill-opacity',
            parseInt(e.target.value,10)/100
        );
    });

})
// Holds visible vectors features for filtering
var vectors = [];
// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false
    });
var filterEl = document.getElementById('vector_dist');
var listingEl = document.getElementById('feature-listing');

//Render List in specific location Ok 
function renderListings(features){
    var empty = document.createElement('p');
    //clear any existing listings
    listingEl.innerHTML = '';
    if(features.length) {
        features.forEach(function(feature) {
            var item = document.createElement('a');
            item.textContent = feature.properties.species;
            item.addEventListener('mouseover', function(){
                //highlight corresponding feature on the map
                popup
                    .setLngLat(feature.geometry.coordinates)
                    .setText( feature.properties.species)
                    .addTo(map);
            });
            listingEl.appendChild(item);
        });
    }else if(features.length === 0 && filterEl.value !== ''){
        empty.textContent = 'No results found';
        listingEl.appendChild(empty)
    } else {
        empty.textContent = 'Zoom desired area to populate results';
        listingEl.appendChild(empty);
        // remove features filter
        map.setFilter('arboverse.vector_distribution', ['has', 'species']);
    }
}
function normalize(string){
    return string.trim().toLowerCase();
}
function getUniqueFeatures(array, comparatorProperty) {
    var existingFeatureKeys = {};
    // Because features come from tiled vector data, feature geometries may be split
    // or duplicated across tile boundaries and, as a result, features may appear
    // multiple times in query results.
    var uniqueFeatures = array.filter(function(el){
        if (existingFeatureKeys[el.properties[comparatorProperty]]){
            return false;
        } else {
            existingFeatureKeys[el.properties[comparatorProperty]] = true;
            return true;
        }
    });
    return uniqueFeatures;
}
map.on('load', function(){
    var vectorType = ['==', ['string', ['get', 'type']], "Mosquito"];
    map.addSource('arboverse.vector_distribution',{
        'type': 'vector',
        'url': 'mapbox://arboverse.vector_distribution'
    });
    map.addLayer({
        'id': 'arboverse.vector_distribution',
        'source': 'arboverse.vector_distribution',
        'source-layer': 'vector_distribution',
        'type': 'circle',
        'paint':  {'circle-radius': [ "interpolate", ["linear"], ["zoom"], 0, 4, 22, 8 ], 'circle-color': [ "match", ["get", "type"], ["mosquito"], "hsl(6, 93%, 69%)", ["sandfly"], "#57a9c0", ["midge"], "hsl(288, 92%, 73%)", ["tick"], "hsl(82, 60%, 46%)", ["other"], "hsl(36, 91%, 51%)", "#000000" ]},
        'filter': ['all', vectorType]
    });
    map.setLayoutProperty(
        'arboverse.vector_distribution',
        'visibility',
        'none'
    );
    
    //Select the vectors which are rendered on the map 
    map.on('movestart', function(){
        // reset features filter as the map starts moving
        map.setFilter('arboverse.vector_distribution', ['has', 'species']);
    });
    map.on('moveend', function(){
        var features = map.queryRenderedFeatures({ layers: ['arboverse.vector_distribution'] });
        if (features){
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
    map.on('mousemove', 'arboverse.vector_distribution', function(e){
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
    map.on('mouseleave', 'arboverse.vector_distribution', function(){
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
    //Filter by the search box 
    filterEl.addEventListener('keyup', function (e) {
        //normalize the letters
        var value = normalize(e.target.value);
        
        // Filter visible features that don't match the input value.
        var filtered = vectors.filter(function (feature){
            var species = normalize(feature.properties.species);
            return species.indexOf(value) > -1 ;
        });
        //populate the side bar with filtered results
        renderListings(filtered);

        //set the filter to populate features into the layer
        if (filtered.length) {
            map.setFilter('arboverse.vector_distribution', [
                'match',
                ['get', 'species'],
                filtered.map(function (feature){
                    return feature.properties.species;
                }),
                true,
                false
            ]);
        }

    });
    renderListings([]);
})