mapboxgl.accessToken = 'pk.eyJ1IjoibWF0aGlsZG8iLCJhIjoiY2lrdHZvMHdsMDAxMHdvbTR0MWZkY3FtaCJ9.u4bFYLBtEGNv4Qaa8Uaqzw';


var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [139.8, 35.7], // starting position
    zoom: 10 // starting zoom
});


function addMarker(hostel){
    console.log("Adding marker")
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(' + hostel.img + ')';
    el.addEventListener('click', function() {
        setMenuContent(hostel, 'hostel');
    });

    //var popup = createPopup(hostel, 'hostel');

    // add marker to map
    var iconSize=[70, 70];
    new mapboxgl.Marker(el, {offset: [-iconSize[0] / 2, -iconSize[1] / 2]})
    .setLngLat(hostel.coords)
    //.setPopup(popup)
    .addTo(map);
}

// function createPopup(element, type){
//     var popup = new mapboxgl.Popup({offset: 25})
//         .setText('Construction on the Washington Monument began in 1848.')
//         .setHTML('<a href='+ element.link +' target="_blank">Link</a>');
//
//     return popup;
// }

function getHostels(){
    ajaxGet('hostels', function(hostels){
        
        hostels.forEach(
            function(hostel) {
                addMarker(hostel);
            }
        );
    });
}
