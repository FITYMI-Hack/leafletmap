


// load a tile layer
var map = L.map('map').setView([40.73, -73.93], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var twitterIcon = L.icon({
iconUrl:'img/twitter2.png',
iconSize: [50, 46]
});

L.marker([51.5, -0.09], {icon: twitterIcon}).addTo(map)
.bindPopup('A tweet goes here')
.openPopup();

L.marker([40.73, -73.93], {icon: twitterIcon}).addTo(map)
.bindPopup('Yet another tweet')
.openPopup();

//load GeoJSON
$.getJSON("test_data.geojson",function(data){
L.geoson(data).addTo(map);
});
