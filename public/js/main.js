//GLOBAL VARIABLES
activeElementName="";


window.onload = function(){
    var head=document.getElementById('header');
    head.addEventListener('click', function(){
        addMapElement();
    });

    var close = document.getElementById('close-button');
    close.addEventListener('click', function(){
        toggleWindow();
    });

    getHostels();
};


function ajaxGet(url, callback){
    $.ajax({
        url: url,
        method: "GET",
        success: function(data){
            callback(data)
        }
    });
}
function ajaxPost(url, inputData, callback){
    $.ajax({
        url: url,
        method: "POST",
        data: inputData,
        success: function(data){
            callback(data)
        }
    });
}
function ajaxPut(url, inputData, callback){
    $.ajax({
        url: url,
        method: "PUT",
        data: inputData,
        success: function(data){
            callback(data)
        }
    });
}

function toggleWindow(){
    var popupWindow = document.getElementById('popup-window');
    if(popupWindow.className === "hide"){
        popupWindow.className = "show"
    }else{
        popupWindow.className = "hide"
    }
}

function setMenuContent(element, type){
    //Setting global variabel - to be able to edit and delete element
    activeElementName = element.name;

    div=document.getElementById('sideMenu');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    newText('h1', element.name, div);
    newSrc('img', element.img, '', div);
    newText('h1', element.rank, div);
    newHref('a', element.link, 'homepage', div);
    newText('h5', 'edit', div, 'edit-element').addEventListener('click',function(){
        editElementInDB();
    });

}

function newText(type, inner, parent, idName){
    var el=document.createElement(type);
    el.innerHTML=inner;
    parent.appendChild(el);
    if(idName){
        el.id=idName;
    }
    return el;
}
function newSrc(type, src, inner, parent){
    var el=document.createElement(type);
    el.innerHTML=inner;
    el.setAttribute('src', src);
    parent.appendChild(el);
    return el;
}
function newHref(type, src, inner, parent){
    var el=document.createElement(type);
    el.innerHTML=inner;
    el.setAttribute('href', src);
    el.setAttribute('target', '_blank');
    parent.appendChild(el);
    return el;
}

function addMapElement(){
    toggleWindow();
}
