// logic for saving new elements from frontend

// example:
// {
// name: 'Emblem Hostel Nishiarai',
// img: "http://ucd.hwstatic.com/propertyimages/1/102785/2_70.jpg",
// coordinates: [139.791436, 35.778228],
// score: 9.3,
// link: 'http://www.hostelworld.com/hosteldetails.php/Emblem-Hostel-Nishiarai/Tokyo/102785?dateFrom=2017-02-21&dateTo=2017-02-24&number_of_guests=2&sc_pos=1'
// }

//dummy variable for now - change based on how the new element was added, map click of plus click
var newElementFromMapClick=false;

document.getElementById('saveNewElement-btn').addEventListener('click',function(){
    saveNewElement();
});

function saveNewElement(){
    var newElement={};

    newElement.name=document.getElementById('pop-name').value;
    newElement.img=document.getElementById('pop-img').value;
    newElement.link=document.getElementById('pop-link').value;
    newElement.score=document.getElementById('pop-score').value;

    coordinates=[];

    if(newElementFromMapClick){
        //Set coordinates based on last double-map-click
        //newElement.coordinates.push(map.getCoo);

    }else{
        coordinates.push(parseFloat(document.getElementById('pop-long').value));
        coordinates.push(parseFloat(document.getElementById('pop-lat').value));
    }
    newElement.coordinates=coordinates;

    console.log('newElement');
    console.log(newElement);
}
