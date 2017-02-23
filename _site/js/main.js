window.onload = function(){
    var head=document.getElementById('header');
    head.addEventListener('click', function(){
        addMapElement();
    });

    var close = document.getElementById('close-button');
    close.addEventListener('click', function(){
        toggleWindow();
    });
};

function toggleWindow(){
    var popupWindow = document.getElementById('popup-window');
    if(popupWindow.className === "hide"){
        popupWindow.className = "show"
    }else{
        popupWindow.className = "hide"
    }
}

function setMenuContent(element, type){
    div=document.getElementById('sideMenu');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    newText('h1', element.name, div);
    newSrc('img', element.img, '', div);
    newText('h1', element.score, div);
    newHref('a', element.link, 'homepage', div);
}

function newText(type, inner, parent){
    var el=document.createElement(type);
    el.innerHTML=inner;
    parent.appendChild(el);
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
