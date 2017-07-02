mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aGlsZG8iLCJhIjoiY2lrdHZvMHdsMDAxMHdvbTR0MWZkY3FtaCJ9.u4bFYLBtEGNv4Qaa8Uaqzw';

var map_mode = "default"; //draw


var mapMarkers=[]; //adding objects of type {name: elementName, marker: markerObj}

var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
  center: [139.8, 35.7], // starting position
  zoom: 6 // starting zoom
});

//var Draw = new MapboxDraw();
//map.addControl(Draw)
//console.log(Draw.getMode());

// map.on("draw.modechange", function(){
//   console.log('modechange');
//   console.log(Draw.getMode());
//   if(Draw.getMode() == "simple_select"){
//     //Turn on draw mode
//     console.log("Change mode to default");
//     map_mode = "default"
//   }else{
//     console.log("Change mode to draw");
//     map_mode = "draw"
//   }
// });

var address_el = document.getElementById("address-search");
var geocoder = new google.maps.Geocoder();

// set bounding box for japan to avoid getting hits for other areas?
autocomplete = new google.maps.places.Autocomplete(address_el);

autocomplete.addListener('place_changed', function() {
  var place = autocomplete.getPlace();
  if (!place.geometry) {
    // User entered the name of a Place that was not suggested and
    // pressed the Enter key, or the Place Details request failed.
    window.alert("No details available for input: '" + place.name + "'");
    return;
  }else{
    coords = [
      place.geometry.location.lng(),
      place.geometry.location.lat()
    ];
    map.flyTo({
      center:coords,
      zoom: 10
    });
    map.getSource('single-point').setData({
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": coords
        },
        "properties": {
          "name": "current"
        }
    });

    setFormCoords(coords);
    setFormValues(place);
  }
});


//Remove - not using anymore
//google geolocater:

function  codeAddress(){
  var address = document.getElementById("address-search").value;

  geocoder.geocode({ address: address }, function(results, status) {
    console.log(results);
    if (status === google.maps.GeocoderStatus.OK) {
      coords = [
        results[0].geometry.location.lng(),
        results[0].geometry.location.lat()
      ];
      map.flyTo({
        center:coords,
        zoom: 10
      });
      map.getSource('single-point').setData({
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": coords
          },
          "properties": {
            "name": "current"
          }
      });
      setFormCoords(coords);
    }
  });
}

//gps marker
//map.addControl(new mapboxgl.GeolocateControl());

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
  // geocoder.on('result', function(ev) {
  //     console.log(ev.result.geometry);
  //         map.getSource('single-point').setData(ev.result.geometry);
  //         setFormCoords(ev.result.geometry.coordinates);
  // });

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
    el.style.backgroundImage = 'url("../../img/star.png")';
  }else{
    el.style.backgroundImage = 'url(' + element.img + ')';
  }
  el.addEventListener('click', function() {
    if(map_mode == "default"){
      setMenuContent(element, type);
    }
  });

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
  addElementsToMap(type);
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

function addElementsToMap(type){
  ajaxGet(type, function(elements){
    console.log("Get req returns:");
    console.log(elements);
    elements.forEach(
      function(el) {
        addMarker(el, type);
      }
    );
  });
}
