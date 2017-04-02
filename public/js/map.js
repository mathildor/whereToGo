mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aGlsZG8iLCJhIjoiY2lrdHZvMHdsMDAxMHdvbTR0MWZkY3FtaCJ9.u4bFYLBtEGNv4Qaa8Uaqzw';

var mapMarkers=[]; //adding objects of type {name: elementName, marker: markerObj}

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [139.8, 35.7], // starting position
    zoom: 10 // starting zoom
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});
map.addControl(geocoder, 'bottom-left');

map.on('load', function() {
    map.addSource('single-point', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    });

    map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            "circle-color": "#007cbf"
        }
    });
    geocoder.on('result', function(ev) {
        console.log(ev.result.geometry);
            map.getSource('single-point').setData(ev.result.geometry);
            setFormCoords(ev.result.geometry.coordinates);
    });

    map.on('dblclick', function(data){
        console.log(data.lngLat);
        setFormCoords([data.lngLat.lng, data.lngLat.lat]);
    });
});

function addMarker(element, type){
    console.log("Adding marker")
    var el = document.createElement('div');

    el.className = 'marker '+type;
    if(type=="places"){ //want a star in map independent of saved img for place
        el.style.backgroundImage = 'url(http://weknownyourdreamz.com/images/star/star-04.jpg)';
    }else{
        el.style.backgroundImage = 'url(' + element.img + ')';
    }
    el.addEventListener('click', function() {
        setMenuContent(element, type);
    });

    //var popup = createPopup(element, 'element');

    // add marker to map
    var iconSize=[70, 70];
    var newMarker = new mapboxgl.Marker(el, {offset: [-iconSize[0] / 2, -iconSize[1] / 2]})
    .setLngLat(element.coords)
    //.setPopup(popup)
    .addTo(map);
    markerObj={
        name: element.name,
        marker: newMarker
    };
    mapMarkers.push(markerObj);
}

function addMarkers(type){
    console.log("Adding markers");
    addElementesToMap(type);
}

function removeMarkers(type){
    ajaxGet(type, function(elements){
        elements.forEach(
            function(el) {
                removeMarker(el, type);
            }
        );
    });
}


function toggleMarkers(type, btn_id){
    if(document.getElementById(btn_id).className == "active"){
        document.getElementById(btn_id).className = "disable";
        removeMarkers(type);
    }else{
        addMarkers(type);
        document.getElementById(btn_id).className = "active";
    }
}

function removeMarker(el, type){
    //loop through all mapMarkers
    for(var i = 0; i<mapMarkers.length; i++){
        if(mapMarkers[i].name === el.name){
            mapMarkers[i].marker.remove();
            mapMarkers.splice(i, 1); //removing marker from list
            break;
        }
    }
}

function addElementesToMap(type){
    ajaxGet(type, function(elements){
        elements.forEach(
            function(el) {
                addMarker(el, type);
            }
        );
    });
}
