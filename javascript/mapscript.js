
// Setup Map
var mapCenterCoordinates = [39.8333333, -98.585522];
var zoomLevel = 4;
var maxZoomLevel = 19;

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
    var circleIcon = L.divIcon({ className : 'circle fab fa-twitter',
    iconSize : [ 20, 20 ]});
    layer.setIcon(circleIcon);

    //Setup PopUp
    layer.bindPopup('<div class="tweet-info"><div class="tweet-img">' +
                    '<img src="' + feature.properties.image_url + '"></div>' +
                    '<div class="tweet-name">' + feature.properties.s_name + '</div>' +
                    '<div class="tweet-text">' + cleanText(feature.properties.t_text) + '</div>' +
                    '<div class="tweet-date">' + feature.properties.t_date + '</div>' +
                    '</div>');
  
}


function loadGeoJSONData() {
// TODO:  Need to change test_data to production data value
    L.geoJson(test_data, {
        onEachFeature: buildMarkers
    }).addTo(map);  
}
function cleanText(txtString) {
    var regEx = /[^\w\s:\/#]/gi;
    return txtString.replace(regEx, '');
}

