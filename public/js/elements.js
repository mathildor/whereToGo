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

function saveNewElement(type){ //type = hostels / cites / restaurants / places
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
    console.log('form.active');
    console.log(form.active);
    console.log(formType);
    var newElement={};
    var coordinates=[];

    if(formType == 'pop'){
        console.log('id is:');
        console.log(formType+'-name');
        newElement.name=document.getElementById(formType+'-name').value;
        newElement.img=document.getElementById(formType+'-img').value;
        newElement.link=document.getElementById(formType+'-link').value;
        newElement.rank=document.getElementById(formType+'-score').value;
        newElement.comment=document.getElementById(formType+'-comment').value;
        coordinates.push(parseFloat(document.getElementById(formType+'-long').value));
        coordinates.push(parseFloat(document.getElementById(formType+'-lat').value));
    }else{
        activeForm = form.active+'-';
        newElement.name=document.getElementById(activeForm+formType+'-name').value;
        newElement.img=document.getElementById(activeForm+formType+'-img').value;
        newElement.link=document.getElementById(activeForm+formType+'-link').value;
        newElement.rank=document.getElementById(activeForm+formType+'-score').value;
        newElement.comment=document.getElementById(activeForm+formType+'-comment').value;
        coordinates.push(parseFloat(document.getElementById(form.active+'-'+formType+'-long').value));
        coordinates.push(parseFloat(document.getElementById(form.active+'-'+formType+'-lat').value));
    }
    newElement.coords=coordinates;

    //ADD if forms are different depending on type!
    if(elementType == 'place'){ //For place there is also a status field: visit / visited + maybe others
        if(formType == 'pop'){
            newElement.status = document.getElementById(formType+'-status').value;
        }else{
            newElement.status = document.getElementById(activeForm+formType+'-status').value;
        }
    }
    console.log(newElement)
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
