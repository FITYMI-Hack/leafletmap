
// Setup Map
var mapCenterCoordinates = [39.8333333, -98.585522];
var zoomLevel = 4;
var minZoomLevel = 2;
var maxZoomLevel = 19;

var mapLocation = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

//Setup Map Markers
var tweetIcon = L.divIcon({
    className: 'circle fab fa-twitter',
    iconSize: [20, 20]
});
var circleIcon = L.divIcon({
    className: 'circle',
    iconSize: [20, 20]
});

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

//Load Map
var map = L.map('map', {
    center: mapCenterCoordinates,
    zoom: zoomLevel,
    zoomControl: true,
    tap: false
});

if (isMobile == true) {
    map.dragging.disable();
    map.setZoom(3);
}

var mapLayer = L.tileLayer(mapLocation, {
    maxZoom: maxZoomLevel,
    minZoom: minZoomLevel,
    attribution: attribution
});

mapLayer.addTo(map);
var geojson;
//Load Data
loadGeoJSONData();

// After loading json a random marker will popup every 10 seconds
openRandomMarker();
var myVar = setInterval(openRandomMarker, 10000);

//TODO: Add a way to stop opening random markers

function resetInterval() {
    clearInterval(myVar);
    myVar = setInterval(openRandomMarker, 10000);

}



// FUNCTIONS //
function loadGeoJSONData() {

    // TODO:  Need to change test_data to production data value
        geojson = L.geoJson(test_data, {
            onEachFeature: buildMarkers
        }).addTo(map);  
    
        //Trying cluster grouping
        //  var markers = L.markerClusterGroup();
        // geojson = L.geoJson(test_data, {
        //     onEachFeature: buildMarkers
        // });
        // markers.addLayer(geojson);
        // map.addLayer(markers);
    
    }
    
    
function buildMarkers(feature, layer) {

     layer.setIcon(circleIcon);
     layer.setOpacity(0.3);

    // Remove to change icon on zoom
    //  map.on('zoomend', function(ev){
    //     if (map.getZoom() > 7) {
    //       layer.setIcon(tweetIcon);
    //       layer.setOpacity(1);
    //     } else {
    //       layer.setIcon(circleIcon);
    //       layer.setOpacity(0.3);
    //     }
    //   })
      
      layer.on({
        click: function(e) { resetInterval();
            geojson.eachLayer(function(feature){
                    feature.setIcon(circleIcon);
                    feature.setOpacity(0.3);
           });
   
            layer.setIcon(tweetIcon);
            layer.setOpacity(1);
            layer.setZIndexOffset(1000);
  
    }});
    //Setup PopUp
    layer.bindPopup('<div class="tweet-info">' +
                    '<div class="tweet-img">' +
                    '<a href="https://twitter.com/' + feature.properties.s_name + '" target="_blank"><img src="' + feature.properties.image_url + '" alt=""></a></div>' +
                    '<div class="tweet-name"><a href="https://twitter.com/' + feature.properties.s_name + '" target="_blank">@' + feature.properties.s_name  + '</a></div>' +
                    '<div class="tweet-text">' + linkify(cleanText(feature.properties.t_text)) + '</div>' +
                    '<div class="tweet-date">' + formatDate(feature.properties.t_date) + '</div>' +
                    '<div class="tweet-location">' + feature.properties.City + ' - ' + feature.properties.State + '</div>' +
                    '</div>');
  
}




function getRandomMarker() {
    var features = [];
    map.eachLayer( function(layer) {
      if(layer instanceof L.Marker) {
        if(map.getBounds().contains(layer.getLatLng())) {
          features.push(layer.feature);
        }
      }
    });

    return features[getRandomInt(0, features.length)];
  }

  function openRandomMarker(){
        var marker = getRandomMarker();
        var id = marker.properties.ID;
        console.log(id);
        geojson.eachLayer(function(feature){
             if(feature.feature.properties.ID==id){
                 feature.openPopup();
                 feature.setZIndexOffset(1000);
                feature.setIcon(tweetIcon);
                feature.setOpacity(1);

             }
             else {
                 feature.setIcon(circleIcon);
                 feature.setOpacity(0.3);
             }
        
        });

}
// Code to filter out special characters in the tweet
function cleanText(txtString) {
    var regEx = /[^èéòàùì.,'"@?\/#!$%\^&\*;:{}=\-_`~()\\#\w\s]/gi;
    return txtString.replace(regEx, ' ');
}

function formatDate(dateText) {
    var dateValue = new Date(dateText);
    var dateString = '';
    var dateString = dateValue.getTime() + ' - ' + dateValue.getDay() + ' ' + dateValue.getMonth() + ' ' + dateValue.getFullYear();
    return moment(dateValue).format('h:mm a - DD MMM YYYY');
}


// Code to turn URL into clickable link
function linkify(inputText) {
    //URLs starting with http://, https://, or ftp://
    var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with www. (without // before it, or it'd re-link the ones done above)
    var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    var replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');


    return replacedText;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


