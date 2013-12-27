var draggingWindow = null;
var currentX = 0;
var currentY = 0;
var offsetX = 0;
var offsetY = 0;


function displayMetaPanel(){
	document.getElementById('objectEditorWrapper').classList.toggle('Displayed');
}

window.onload = addListeners();

function addListeners(){
    //document.getElementById('elemId').addEventListener('mousedown', startDragWindow, false);
    window.addEventListener('mouseup', stopDragWindow, false);
}

function stopDragWindow(){
	draggingWindow = null;
    window.removeEventListener('mousemove', dragWindow, true);
}

function startDragWindow(elemId){
	var evt = window.event;
	draggingWindow = document.getElementById(elemId);
  window.addEventListener('mousemove', dragWindow, true);
  var rect = draggingWindow.getBoundingClientRect();
  offsetX = evt.clientX - rect.left;
  offsetY = evt.clientY - rect.top;
}

function dragWindow(e){
	var evt = window.event || e;
    var div = draggingWindow;
    if (div !== null) {
	  div.style.position = 'absolute';
	  div.style.top = Math.max((evt.clientY - offsetY), 0) + 'px';
	  div.style.left = Math.max((evt.clientX - offsetX), 0) + 'px';
    }
}
/*
function startDragWindow(elemId){
	var evt = window.event;
	draggingWindow = document.getElementById(elemId);
	initWindowX = draggingWindow.getBoundingClientRect().left;
	initWindowY = draggingWindow.getBoundingClientRect().top;
	currentX = evt.pageX;
	currentY = evt.pageY;
}
function stopDragWindow(){
	draggingWindow = null;
}
function dragWindow(){
	var evt = window.event;
	if (draggingWindow !== null){
		
		var diffX = currentX - evt.pageX;
		var diffY = currentY - evt.pageY;
		
		draggingWindow.style.left = (initWindowX + diffX) + "px";
		draggingWindow.style.top = (initWindowY + diffY) + "px";
		
		currentX = evt.pageX;
		currentY = evt.pageY;
	}
}*/