// logic for saving new elements from frontend

var newElementFromMapClick=false;

document.getElementById('saveNewElement-btn').addEventListener('click',function(){
    saveNewElement();
});

function saveNewElement(){
    var newElement={};

    newElement.name=document.getElementById('pop-name').value;
    newElement.img=document.getElementById('pop-img').value;
    newElement.link=document.getElementById('pop-link').value;
    newElement.rank=document.getElementById('pop-score').value;

    coordinates=[];

    if(newElementFromMapClick){
        //Set coordinates based on last double-map-click
        //newElement.coordinates.push(map.getCoo);

    }else{
        coordinates.push(parseFloat(document.getElementById('pop-long').value));
        coordinates.push(parseFloat(document.getElementById('pop-lat').value));
    }
    newElement.coords=coordinates;

    console.log('newElement');
    console.log(newElement);

    ajaxPost('hostels', newElement, function(){
        console.log('hostel saved!');
    });
}

function editElementInDB(){
    console.log("ready to edit");
    var url = "hostels/{"+activeElementName+"}";
    var element = {
        // name: "",
        // rank:
    }
    ajaxPut(url, element, function(){
        console.log("hostel updated");
    });
}
