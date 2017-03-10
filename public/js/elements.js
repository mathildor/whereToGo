// logic for saving new elements from frontend

var newElementFromMapClick=false;

document.getElementById('saveNewElement-btn').addEventListener('click', function(){
    console.log("click in mode: "+popup.mode);
    if(popup.mode === 'edit'){
        saveEditedElement(sideMenu.active.type);
    }else{
        //removed this functionality? now only form at bottom that saves new elements
        //saveNewElement();
    }
});

function saveNewElement(type){ //type = hostels / cites / restaurants
    console.log('saving element of type: '+type);
    var newElement = getFormElement('form');
    console.log('element to save is: ');
    console.log(newElement);
    ajaxPost(type, newElement, function(){
        console.log('saved!');
        addMarker(newElement);
    });
}

//Both for popup and form at bottom of page
function getFormElement(formType, elementType){
    var newElement={};
    newElement.name=document.getElementById(form.active+'-'+formType+'-name').value;
    newElement.img=document.getElementById(form.active+'-'+formType+'-img').value;
    newElement.link=document.getElementById(form.active+'-'+formType+'-link').value;
    newElement.rank=document.getElementById(form.active+'-'+formType+'-score').value;
    newElement.comment=document.getElementById(form.active+'-'+formType+'-comment').value;

    //ADD if forms are different depending on type!
    // if(elementType === 'hostel'){
    //
    // }

    coordinates=[];
    if(newElementFromMapClick){
        //Set coordinates based on last double-map-click
        //newElement.coordinates.push(map.getCoo);
    }else{
        coordinates.push(parseFloat(document.getElementById(form.active+'-'+formType+'-long').value));
        coordinates.push(parseFloat(document.getElementById(form.active+'-'+formType+'-lat').value));
    }
    newElement.coords=coordinates;
    return newElement;
}

function saveEditedElement(type){ //type = hostels / cites / restaurants
    var element = getFormElement('pop');
    var url = type+"/"+activeElementName;
    ajaxPut(url, element, function(){
        console.log("element updated");
        //Reload sidemenu:
        setMenuContent(element, type.substring(0, type.length-1)); //second input = hostel/cite/restaurant -> remove s from type
    });
    popup.mode = 'default';
    activeElementName = ""; //remove as active

    //Close popup
    toggleWindow();

}

function editElementInDB(type){ //type = hostels / cites / restaurants
    console.log("ready to edit");
    popup.mode = "edit";

    var url = type+"/"+activeElementName;
    ajaxGet(url, function(data){
        console.log("found element");
        console.log(data[0]);
        toggleWindow(data[0]); //Sending in current data, to avoid haveing to write everyone again!
    });
}

function deleteElementInDb(type){ //type = hostels / cites / restaurants
    console.log('ready to delete from DB');
    var url = type+"/"+activeElementName;
    console.log(url);
    ajaxDelete(url, function(){
        console.log("deleted element");
    });
}
