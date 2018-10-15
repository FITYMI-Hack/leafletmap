
// Setup Map
var mapCenterCoordinates = [39.8333333, -98.585522];
var zoomLevel = 4;
var maxZoomLevel = 19;
// var mapLocation = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

var mapLocation = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

//Load Map
var map = L.map('map', {
    center: mapCenterCoordinates,
    zoom: zoomLevel,
    zoomControl: true
});

var mapLayer = L.tileLayer(mapLocation, {
    maxZoom: maxZoomLevel,
    attribution: attribution
});

mapLayer.addTo(map);

//Load Data
loadGeoJSONData();



// FUNCTIONS //

function buildMarkers(feature, layer) {
    //Setup Map Markers
    var circleIcon = L.divIcon({ className : 'circle',
    iconSize : [ 15, 15 ]});
    layer.setIcon(circleIcon);

    //Setup PopUp
    layer.bindPopup('<div class="tweet-info"><div class="tweet-img"><img src="https://pbs.twimg.com/profile_images/1039147701244325889/6qGpmATq_400x400.jpg"></div>' +
                    '<div class="tweet-name">' + feature.properties.RegionName + '</div>' +
                    '<div class="tweet-text">' + feature.properties.tweets + '</div>' +
                    '</div>');
  
}


function loadGeoJSONData() {
// TODO:  Need to change test_data to production data value
    L.geoJson(test_data, {
        onEachFeature: buildMarkers
    }).addTo(map);  
}

