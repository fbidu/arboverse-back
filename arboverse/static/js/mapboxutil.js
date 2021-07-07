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

function update_map(cb) {
    var clickedLayer = cb.id
    console.log(cb.id)
    console.log(map.getStyle().layers)
    if (cb.checked) {
        map.setLayoutProperty(
            clickedLayer,
            'visibility',
            'visible'
        );
    } else {
        map.setLayoutProperty(
            clickedLayer,
            'visibility',
            'none'
        );
    }

    console.log(cb.checked);
}



// run the API call once the map is loaded (API call is asnyc)
map.on('load', async () => {
    // add a layer to the map
    addTileLayerToMap(map, 'arboverse.bkdd701g', 'mapbox://arboverse.bkdd701g', 'fill', { 'fill-color': ['match', ['get', 'classes'], [1], "#f94144", [2], "#f9844a", [3], "#43aa8b", [4], "#f9c74f", [5], "#6930c3", "#000000"] }, 'Cover_loss_dominant_drivers-bbybfd');
});
