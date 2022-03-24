// TO MAKE THE MAP APPEAR YOU MUST ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJib3ZlcnNlIiwiYSI6ImNrbXA2ODdnMzJibDAycXF1ODc2dmJtNngifQ.qHL3R2dqFpECCzUckaSl3w';

// initiate a new map by passing an object describing a config
// for more info see: https://docs.mapbox.com/mapbox-gl-js/api/map/
var map = new mapboxgl.Map({
    // id of div that will hold map
    container: 'map',

    // one of the existing mapbox map styles
    style: 'mapbox://styles/arboverse/ckoept4vi2anl18msq2tl9svx',

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



map.on('load', async()=>{
    addTileLayerToMap(map, 'arboverse.presentfull', 'mapbox://arboverse.presentfull', 'fill', { 'fill-color': [ "case", [ "==", ["get", "classes"], 0 ], "hsla(0, 0%, 0%, 0)", [ "match", ["get", "classes"], [1], true, false ], "#8c0273", [ "match", ["get", "classes"], [2], true, false ], "#8f1966", [ "match", ["get", "classes"], [3], true, false ], "#91285a", [ "match", ["get", "classes"], [4], true, false ], "#922e54", [ "match", ["get", "classes"], [5], true, false ], "#943c4a", [ "match", ["get", "classes"], [6], true, false ], "#964941", [ "match", ["get", "classes"], [7], true, false ], "#974f3c", [ "match", ["get", "classes"], [8], true, false ], "#996330", [ "match", ["get", "classes"], [9], true, false ], "#9a692b", [ "match", ["get", "classes"], [10], true, false ], "#9b7127", [ "match", ["get", "classes"], [11], true, false ], "#9c7923", [ "match", ["get", "classes"], [12], true, false ], "#9c801f", [ "match", ["get", "classes"], [13], true, false ], "#9d891c", [ "match", ["get", "classes"], [14], true, false ], "#9c911c", [ "match", ["get", "classes"], [15], true, false ], "#9b9a1d", [ "match", ["get", "classes"], [16], true, false ], "#99a323", [ "match", ["get", "classes"], [17], true, false ], "#91b437", [ "match", ["get", "classes"], [18], true, false ], "#8cba44", [ "match", ["get", "classes"], [19], true, false ], "#86c051", [ "match", ["get", "classes"], [20], true, false ], "#80c55f", [ "match", ["get", "classes"], [21], true, false ], "#79ca6d", [ "match", ["get", "classes"], [22], true, false ], "#73ce7b", [ "match", ["get", "classes"], [23], true, false ], "#6dd389", [ "match", ["get", "classes"], [24], true, false ], "#68d797", [ "match", ["get", "classes"], [26], true, false ], "#60e0b5", [ "match", ["get", "classes"], [27], true, false ], "#60e4c4", [ "match", ["get", "classes"], [28], true, false ], "#65e8d2", [ "match", ["get", "classes"], [29], true, false ], "#8ff0f1", [ "match", ["get", "classes"], [30], true, false ], "#b3f2fd", [ "match", ["get", "classes"], [25], true, false ], "#62dca7", "#000000" ]}, 'kopeen_fullpresent');
    addTileLayerToMap(map, 'arboverse.koppenfuture', 'mapbox://arboverse.koppenfuture', 'fill', { 'fill-color': [ "case", [ "==", ["get", "classes"], 0 ], "hsla(0, 0%, 0%, 0)", [ "match", ["get", "classes"], [1], true, false ], "#8c0273", [ "match", ["get", "classes"], [2], true, false ], "#8f1966", [ "match", ["get", "classes"], [3], true, false ], "#91285a", [ "match", ["get", "classes"], [4], true, false ], "#922e54", [ "match", ["get", "classes"], [5], true, false ], "#943c4a", [ "match", ["get", "classes"], [6], true, false ], "#964941", [ "match", ["get", "classes"], [7], true, false ], "#974f3c", [ "match", ["get", "classes"], [8], true, false ], "#996330", [ "match", ["get", "classes"], [9], true, false ], "#9a692b", [ "match", ["get", "classes"], [10], true, false ], "#9b7127", [ "match", ["get", "classes"], [11], true, false ], "#9c7923", [ "match", ["get", "classes"], [12], true, false ], "#9c801f", [ "match", ["get", "classes"], [13], true, false ], "#9d891c", [ "match", ["get", "classes"], [14], true, false ], "#9c911c", [ "match", ["get", "classes"], [15], true, false ], "#9b9a1d", [ "match", ["get", "classes"], [16], true, false ], "#99a323", [ "match", ["get", "classes"], [17], true, false ], "#91b437", [ "match", ["get", "classes"], [18], true, false ], "#8cba44", [ "match", ["get", "classes"], [19], true, false ], "#86c051", [ "match", ["get", "classes"], [20], true, false ], "#80c55f", [ "match", ["get", "classes"], [21], true, false ], "#79ca6d", [ "match", ["get", "classes"], [22], true, false ], "#73ce7b", [ "match", ["get", "classes"], [23], true, false ], "#6dd389", [ "match", ["get", "classes"], [24], true, false ], "#68d797", [ "match", ["get", "classes"], [26], true, false ], "#60e0b5", [ "match", ["get", "classes"], [27], true, false ], "#60e4c4", [ "match", ["get", "classes"], [28], true, false ], "#65e8d2", [ "match", ["get", "classes"], [29], true, false ], "#8ff0f1", [ "match", ["get", "classes"], [30], true, false ], "#b3f2fd", [ "match", ["get", "classes"], [25], true, false ], "#62dca7", "#000000" ]}, 'kopeen_future');
    //aridity
    addRasterTileLayerToMap(map, 'arboverse.aridity_5km_1970_2000', 'mapbox://arboverse.aridity_5km_1970_2000', 'raster', 'mapbox://arboverse.aridity_5km_1970_2000', 0, 19);  
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
    addRasterTileLayerToMap(map, 'arboverse.8xtrhkxq', 'mapbox://arboverse.8xtrhkxq', 'raster', 'mapbox://arboverse.arboverse.8xtrhkxq', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.pop_2015', 'mapbox://arboverse.pop_2015', 'raster', 'mapbox://arboverse.pop_2015', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.pop_2020', 'mapbox://arboverse.pop_2020', 'raster', 'mapbox://arboverse.pop_2020', 0, 19);
    addTileLayerToMap(map, 'arboverse.bkdd701g', 'mapbox://arboverse.bkdd701g', 'fill', { 'fill-color': ['match', ['get', 'classes'], [1], "#FDAFA5", [2], "#50744B", [3], "#1A5762", [4], "#A58B2C", [5], "#0F3B5F", "#000000"] }, 'Cover_loss_dominant_drivers-bbybfd');
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
    addTileLayerToMap(map, 'arboverse.ifl_2000', 'mapbox://arboverse.ifl_2000', 'fill', { 'fill-color': "#356A59" }, 'ifl_2000');
    addTileLayerToMap(map, 'arboverse.ifl_2013', 'mapbox://arboverse.ifl_2013', 'fill', { 'fill-color': "#677B3E " }, 'ifl_2013');
    addTileLayerToMap(map, 'arboverse.ifl_2016', 'mapbox://arboverse.ifl_2016', 'fill', { 'fill-color': "#175262" }, 'ifl_2016');
    addRasterTileLayerToMap(map, 'arboverse.primary_africa_1km_2010', 'mapbox://arboverse.primary_africa_1km_2010', 'raster', 'mapbox://arboverse.primary_africa_1km_2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_south_america_1km_2010', 'mapbox://arboverse.primary_south_america_1km_2010', 'raster', 'mapbox://arboverse.primary_south_america_1km_2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_madagascar_1km_2010', 'mapbox://arboverse.primary_madagascar_1km_2010', 'raster', 'mapbox://arboverse.primary_madagascar_1km_2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.primary_asia_1km_2010', 'mapbox://arboverse.primary_asia_1km_2010', 'raster', 'mapbox://arboverse.primary_asia_1km_2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.tree_cover_loss_1km_2001-2010', 'mapbox://arboverse.tree_cover_loss_1km_2001-2010', 'raster', 'mapbox://arboverse.tree_cover_loss_1km_2001-2010', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.tree_cover_loss_1km_2011-2020', 'mapbox://arboverse.tree_cover_loss_1km_2011-2020', 'raster', 'mapbox://arboverse.tree_cover_loss_1km_2011-2020', 0, 19);
    addRasterTileLayerToMap(map, 'arboverse.soy_expansion_300m_10_set', 'mapbox://arboverse.soy_expansion_300m_10_set', 'raster', 'mapbox://arboverse.soy_expansion_300m_10_set', 0, 19);
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
    addTileLayerToMap(map, 'arboverse.logging1', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'sarawak_logging');
    addTileLayerToMap(map, 'arboverse.logging2', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'liberia_logging');
    addTileLayerToMap(map, 'arboverse.logging3', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'gabon_logging');
    addTileLayerToMap(map, 'arboverse.logging4', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'equatorial_guinea_logging');
    addTileLayerToMap(map, 'arboverse.logging5', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'democratic_republic_logging');
    addTileLayerToMap(map, 'arboverse.logging6', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'centra_africa_logging');
    addTileLayerToMap(map, 'arboverse.logging7', 'mapbox://arboverse.logging', 'fill', { 'fill-color': "#08255B" }, 'camerron_logging');
    addTileLayerToMap(map, 'arboverse.logging8', 'mapbox://arboverse.canada_logging', 'fill', { 'fill-color': "#08255B" }, 'canada_logging_nova');
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
        'paint': {'circle-radius': [ "step", [ "get", "passengers carried" ], 0, 100, 3, 1000, 6, 10000, 9, 100000, 12, 1000000, 15, 10000000, 18, 100000000, 21, 157873000, 24 ], 'circle-color': [ "step", [ "get", "passengers carried" ], "hsl(61, 0%, 100%)", 100, "#e6e6f0", 1000, "#d9c1d7", 10000, "#d39fbf", 100000, "#d37fa8", 1000000, "#ae6795", 10000000, "#835f8b", 100000000, "#54426e", 926737000, "#2e214d" ]},
        'source-layer': 'air_transport_06_30_21_WDI-7a456y',
        'filter': ['all', filterYear]
    });
    map.addLayer({
        'id': 'arboverse.2mtp8qji',
        'type': 'circle',
        'source': 'arboverse.2mtp8qji',
        'paint': {'circle-radius': ['step',[ "get", "departures"], 0, 100, 3, 1000, 6, 10000, 9, 100000, 12, 1000000, 15, 10000000, 18, 100000000, 21, 926737000, 24], 'circle-color': ["step", ["get", "departures"], "hsl(61, 0%, 100%)", 100, "#fef2f3", 1000, "#e4c8b1", 10000, "#a5a795", 100000, "#7398a0", 1000000, "#487da3", 10000000, "#305c98", 100000000, "#253681", 926737000, "#1a0c64"]},
        'source-layer': 'tourism_departures_06_30_21_W-5zcnfa',
        'filter': ['all', filterDepYear]
    });
    map.addLayer({
        'id': 'arboverse.cgwofgmt',
        'type': 'circle',
        'source': 'arboverse.cgwofgmt',
        'paint': {'circle-radius': ['step',[ "get", "arrivals"], 0, 100, 3, 1000, 6, 10000, 9, 100000, 12, 1000000, 15, 10000000, 18, 100000000, 21, 211998000, 24], 'circle-color': ["step", ["get", "arrivals"], "hsl(61, 0%, 100%)", 100, "#fefed8", 1000, "#c6eab2", 10000, "#9bbb95", 100000, "#92988a", 1000000, "#8c7681", 10000000, "#7e5172", 100000000, "#522754", 926737000, "#1a0e34"]},
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
    var forecastSlider= document.querySelector('input[name=forecast-opacity]');
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
    var ariditySlider = document.querySelector('input[name=aridity-opacity]');

    addOpacityTwoVector(cliSlider, 'arboverse.presentfull', 'arboverse.koppenfuture');
    addOpacityTwoRaster(lossSlider, 'arboverse.tree_cover_loss_1km_2001-2010', 'arboverse.tree_cover_loss_1km_2011-2020');
    addOpacityVector(driveSlider, 'arboverse.bkdd701g');
    addOpacityRaster(landSlider, 'arboverse.8xtrhkxq');
    addOpacityRaster(ariditySlider, 'arboverse.aridity_5km_1970_2000');
    addOpacityRaster(soySlider, 'arboverse.soy_expansion_300m_10_set');
    addOpacityCircle(damsSlider, 'arboverse.ckokkepkj1n2o21qr5mvoxy6y-8mech');
    addOpacityTwoRaster(popSlider, 'arboverse.pop_2015', 'arboverse.pop_2020');
    addOpacityCircle(arrSlider, 'arboverse.cgwofgmt');
    addOpacityCircle(depSlider, 'arboverse.2mtp8qji');
    addOpacityCircle(passengersSlider, 'arboverse.cts68r85');
    
    //Forecast MOsquito opacity control
    forecastSlider.addEventListener('input', function(e) {
        map.setPaintProperty(
            'arboverse.c89hazcs',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.cugep9k4',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.9uh1mltv',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.7va6tx65',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.bud0k3bq',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.cot4nhox',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.59jzfz3w',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.2wsi2z3v',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.a51uv49z',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.92xut72i',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
    })
    primarySlider.addEventListener('input', function(e){
        map.setPaintProperty(
            'arboverse.primary_africa_1km_2010',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.primary_south_america_1km_2010',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.primary_madagascar_1km_2010',
            'raster-opacity',
            parseInt(e.target.value,10)/100
        );
        map.setPaintProperty(
            'arboverse.primary_asia_1km_2010',
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
    closeButton: false,
    className: "vector_popup"
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
map.on('load', function(){
    var vectorFilter = ["==", ["string", ["get", "type"]], "mosquito"];
    map.addSource('arboverse.vector_distribution',{
        'type': 'vector',
        'url': 'mapbox://arboverse.vector_distribution'
    });
    map.addLayer({
        'id': 'arboverse.vector_distribution',
        'source': 'arboverse.vector_distribution',
        'source-layer': 'vector_distribution',
        'type': 'circle',
        'paint':  {'circle-radius': [ "interpolate", ["linear"], ["zoom"], 0, 4, 22, 8 ], 'circle-color': [ "match", ["get", "type"], ["mosquito"], "#FDADA0", ["sandfly"], "#CB923E", ["midge"], "#2D675D", ["tick"], "#031C5A", ["other"], "#868330", "#000000" ]},
        'filter': ["all", vectorFilter]
    });
    map.setLayoutProperty(
        'arboverse.vector_distribution',
        'visibility',
        'none'
    );
    //Select option Vector type
     const vectorType = document.getElementById("vectortype")
     vectorType.addEventListener('change', function(){
         console.log(vectorType.value)
         var vecType = vectorType.value
         vectorFilter = ["==", ["string", ["get", "type"]], vecType]
         map.setFilter('arboverse.vector_distribution', ["all", vectorFilter])
     });

    //Select the vectors which are rendered on the map 
    map.on('movestart', function(){
        // reset features filter as the map starts moving
        map.setFilter('arboverse.vector_distribution', ['has', 'species']);// applied to species and type
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
function renderListFamily(features){
    const empty = document.createElement('p');
    // clear existing linst 
   listingFamily.innerHTML = '';
    if(features.length){
        for(const feature of features){
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
function renderListGenus(features){
    const empty = document.createElement('p');
    // clear existing linst 
   listingGenus.innerHTML = '';
    if(features.length){
        for(const feature of features){
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
function renderListSpecies(features){
    const empty = document.createElement('p');
    // clear existing linst 
   listingSpecies.innerHTML = '';
    if(features.length){
        for(const feature of features){
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
map.on('load', function(){
    
    map.addSource('arboverse.6qvctboh', {
        'type': 'vector',
        'url': 'mapbox://arboverse.6qvctboh'
    })
    map.addLayer({
        'id': 'arboverse.6qvctboh',
        'source': 'arboverse.6qvctboh',
        'source-layer': 'virus_discovery-5quy5w',
        'type': 'circle',
        'paint': {'circle-radius': ["interpolate", ["linear"], ["zoom"], 0, 7, 22, 11], 
                'circle-color': [ "match", ["get", "family"], ["Nodaviridae"], "hsl(350, 48%, 72%)", ["Reoviridae"], "#0E365E", ["Orthomyxoviridae"], "#8A842F", ["Peribunyaviridae"], "#FCBDCF", ["Togaviridae"], "#C8913B", ["Phenuiviridae"], "#FDB2AD", ["Nairoviridae"], "#FCC5E5", ["Nyamiviridae"], "#26635F", ["Flaviviridae"], "#E39754", ["Asfarviridae"], "#6D7C3B", ["Rhabdoviridae"], "#0f574e", ["unk"], "#FCA993", "#000000" ],
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
        const features = map.queryRenderedFeatures({layers: ['arboverse.6qvctboh']});
        
        if(features){
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

        const filteredFamily = families.filter(function(feature){
            var family = normalize(feature.properties.family);
                return family.indexOf(value) > -1 ;

        })
       
        //populate the side bar with filtered results
        renderListFamily(filteredFamily);
        //set the filter to populate features into the layer
        if(filteredFamily.length){
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

        const filteredGenus = genuses.filter(function(feature){
            var genus = normalize(feature.properties.genus);
                return  genus.indexOf(value) > -1;
        })

        renderListGenus(filteredGenus);
        if(filteredGenus.length){
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

        const filteredSpeciesDiscovery = speciesDiscovery.filter(function(feature){
            var specieDiscover = normalize(feature.properties.species);
                return  specieDiscover.indexOf(value) > -1;
        })

        renderListSpecies(filteredSpeciesDiscovery);
        if(filteredSpeciesDiscovery.length){
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
    
