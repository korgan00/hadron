//Se supone ordenado en orden creciente de z
var canvas = document.getElementById('c');
var ctx = document.getElementById('c').getContext('2d');
var TIME_INTERVAL = 10;//ms
var CANVAS_BORDER = 2;
var lastMouseX = 0;
var lastMouseY = 0;
var actualMouseX = 0;
var actualMouseY = 0;

var offsetX = canvas.offsetLeft + CANVAS_BORDER;
var offsetY = canvas.offsetTop + CANVAS_BORDER;

var xt = 0;
var yt = 0;

var drawing = null;
var drawHeight = false;

var cont = 0;
var selectedId = -1;

function Ortoedro(){
	this.id = null;
	
	this.xOrigin = null;
	this.yOrigin = null;
	
	this.x0 = null;
	this.y0 = null;
	
	this.height = null;
	
	this.drawBase = function(){
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black';
		ctx.moveTo(0,0);
		
		ctx.lineTo(ortoedro.x0, ortoedro.y0);

		var o = stickToX(ortoedro.x0, ortoedro.y0);
		ctx.lineTo(o[0], o[1]);
		ctx.lineTo(0,0);
		
		ctx.moveTo(ortoedro.x0,ortoedro.y0);
		o = stickToZ(ortoedro.x0, ortoedro.y0);
		ctx.lineTo(o[0], o[1]);
		ctx.lineTo(0,0);
		
		ctx.stroke();
		
		ctx.closePath();
	};
	
	this.drawBaseH = function(){
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black';
		ctx.moveTo(0,0);
		
		ctx.lineTo(0, ortoedro.height);

		var o = stickToX(ortoedro.x0, ortoedro.y0);
		
		ctx.lineTo(o[0], o[1]+ortoedro.height);
		ctx.lineTo(o[0], o[1]);
		
		ctx.moveTo(ortoedro.x0,ortoedro.y0);
		ctx.lineTo(ortoedro.x0,ortoedro.y0 + ortoedro.height);
		ctx.lineTo(o[0], o[1]+ortoedro.height);
		
		ctx.moveTo(ortoedro.x0,ortoedro.y0 + ortoedro.height);
		o = stickToZ(ortoedro.x0,ortoedro.y0);
		
		ctx.lineTo(o[0], o[1]+ortoedro.height);
		ctx.lineTo(o[0], o[1]);
		
		ctx.moveTo(o[0], o[1]+ortoedro.height);
		ctx.lineTo(0, ortoedro.height);
		
		ctx.stroke();
		
		ctx.closePath();
	};
	
	this.drawComplete = function(width){
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.strokeStyle = 'black';
		ctx.moveTo(0,0);
		{ ///BASE
		var o = stickToX(this.x0,this.y0);
		ctx.lineTo(o[0], o[1]);
		ctx.lineTo(this.x0, this.y0);
		o = stickToZ(this.x0, this.y0);
		ctx.lineTo(o[0], o[1]);
		ctx.lineTo(0,0);
		}
		ctx.lineTo(0,this.height);
		ctx.lineTo(o[0], o[1]+this.height);
		ctx.lineTo(o[0], o[1]);
		ctx.moveTo(o[0], o[1]+this.height);
		ctx.lineTo(this.x0, this.y0 + this.height);
		ctx.lineTo(this.x0, this.y0);
		ctx.moveTo(this.x0, this.y0 + this.height);
		o = stickToX(this.x0, this.y0);
		ctx.lineTo(o[0], o[1] + this.height);
		ctx.lineTo(o[0], o[1]);
		ctx.moveTo(o[0], o[1] + this.height);
		ctx.lineTo(0, this.height);
		
		ctx.stroke();
	};
	
	this.isSelected = function(x,y){
		x -= this.xOrigin;
		y -= this.yOrigin;
		
		var points = [];
		
		points[0] = [0,0];
		points[1] = stickToZ(this.x0, this.y0);
		points[2] = [points[1][0] + this.height, points[1][1] + this.height];
		points[3] = [this.x0 + this.height, this.y0 + this.height];
		points[5] = stickToX(this.x0, this.y0);
		points[4] = [points[5][0] + this.height, points[5][1] + this.height];
		
		var res = this._izq_der(points[0], points[1], [x,y]);
		var loc = res / Math.abs(res);
		
		for (var i = 1; i < 5; i++){
			res = this._izq_der(points[i], points[i+1], [x,y]);
			res /= Math.abs(res);
			if (!(res == loc || res == 0)){
				return false;
			}
		}
		res = this._izq_der(points[5], points[0], [x,y]);
		res /= Math.abs(res);
		if (!(res == loc || res == 0))
			return false;
		return true;
	};
	
	this._izq_der = function(s1,s2,p){
		var p1 = [];
		var p2 = [];
		
		p1[0] = p[0] - s1[0];
		p1[1] = p[1] - s1[1];
		
		p2[0] = s2[0] - s1[0];
		p2[1] = s2[1] - s1[1];
		
		return (p1[0]*p2[1])-(p2[0]*p1[1]);
	};
	
/*	this.isSelected = function(x,y){
		x -= this.xOrigin;
		y -= this.yOrigin;
		
		var limitX = stickToX(this.x0+this.height, this.y0+this.height);
		var absLimitX = [Math.abs(limitX[0]), Math.abs(limitX[1])];
		
		var limitZ = stickToZ(this.x0+this.height, this.y0+this.height);
		var absLimitZ = [Math.abs(limitZ[0]), Math.abs(limitZ[1])];
		
		var point = stickToX(x,y);
		var absPoint = [Math.abs(point[0]), Math.abs(point[1])];
		
		
		if ((absPoint[0] <= absLimitX[0]) && 
			(absPoint[1] <= absLimitX[1])){
			
			point = stickToZ(x,y);
			absPoint = [Math.abs(point[0]), Math.abs(point[1])];
			
			if ((absPoint[0] <= absLimitZ[0]) && 
				(absPoint[1] <= absLimitZ[1])){
				
				var l = stickToX(this.x0, this.y0);
				var r = stickToZ(this.x0, this.y0);
				
				l[0] = Math.min(0, this.x0, l[0], r[0]);
				r[0] = Math.max(0, this.x0, l[0], r[0]);
				
				if (l[0] <= x && x <= r[0]){
					console.log(this.id);
					return true;
				}
				
			}
		}
	};*/
};
	
var listaOrtoedros = new Array();
var ortoedro = null;

function start(){
	canvas.onmousedown = startDrawing;
	canvas.onmouseup = stopDrawing;
	canvas.onmousemove = drag;
	setInterval(draw, TIME_INTERVAL);
}

function startDrawing(e){
	var evt = window.event || e;
	if (evt.button === 0){
		if (evt.ctrlKey == false){
			if (drawHeight == false){
				selectedId = -1;
				ortoedro = new Ortoedro();
				ortoedro.id = cont;
				cont++;
				ortoedro.xOrigin = evt.clientX - offsetX;
				ortoedro.yOrigin = evt.clientY - offsetY;
			}
			drawing = true;
		}
		else{
			//FIXME
			ctx.restore();
			ctx.save();
			for (var i = 0; i < listaOrtoedros.length; i++){
				if (listaOrtoedros[i].isSelected(evt.clientX - offsetX,
						evt.clientY - offsetY)){
					ctx.translate(listaOrtoedros[i].xOrigin, listaOrtoedros[i].yOrigin);
					listaOrtoedros[i].drawComplete(4);
					selectedId = listaOrtoedros[i].id;
				}
			}
			ctx.restore();
		}
	};
}

function stopDrawing(e){
	var evt = window.evt || e;
	if (evt.button === 0){
		drawing = false;
		if (drawHeight == false && selectedId == -1){
			drawHeight = true;
			listaOrtoedros.push(ortoedro);
		}
		
		else drawHeight = false;
	};
}

function draw() {
	if (drawing == true){
		canvas.width = canvas.width;
		
		for (var i = 0; i < listaOrtoedros.length; i++){
			ctx.save();
			ctx.translate(listaOrtoedros[i].xOrigin,listaOrtoedros[i].yOrigin);
			drawAxis();
			listaOrtoedros[i].drawComplete(1);
			ctx.restore();
			
		};
		ctx.save();
		if (drawHeight == false){
			ctx.translate(ortoedro.xOrigin, ortoedro.yOrigin);
			ortoedro.x0 = xt-ortoedro.xOrigin;
			ortoedro.y0 = yt-ortoedro.yOrigin;
			drawAxis();
			ortoedro.drawBase();
		}
		
		else {
			ctx.translate(ortoedro.xOrigin, ortoedro.yOrigin);
			drawAxis();
			ortoedro.height = -ortoedro.y0 + yt-ortoedro.yOrigin;
			ctx.beginPath();
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 2;
			ctx.moveTo(0,0);
			ctx.lineTo(ortoedro.x0,ortoedro.y0 + ortoedro.height);
			ctx.stroke();
			ortoedro.drawBase();
			ortoedro.drawBaseH();
		}
		ctx.restore();
	};
}

function drawAxis(){
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'red';
	ctx.moveTo(0,0);
	ctx.lineTo(0,-canvas.height);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.strokeStyle = 'green';
	ctx.moveTo(-canvas.width, Math.sin(15*Math.PI/180)*canvas.height);
	ctx.lineTo(canvas.width, -Math.sin(15*Math.PI/180)*canvas.height);
	ctx.stroke();

	ctx.beginPath();
	ctx.strokeStyle = 'blue';
	ctx.moveTo(-canvas.width, -Math.sin(15*Math.PI/180)*canvas.height);
	ctx.lineTo(canvas.width, Math.sin(15*Math.PI/180)*canvas.height);
	ctx.stroke();	
}

function drag(e){
	var evt=window.event || e ;//cross browser event object
	 xt = evt.clientX - offsetX;
	 yt = evt.clientY - offsetY;
	 
}

function stickToX(x, y){
	var originAngle = (Math.PI*2 - Math.atan2(y,x)) - 15*Math.PI/180;
//	var xyangle = Math.PI-originAngle-(30*Math.PI/180);
	//TODOS LOS ANGULOS
	
	var a = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	var b = a*Math.sin(originAngle) / Math.sin(30*Math.PI/180);
		
	x = Math.cos(165*Math.PI/180)*b;
	y = -Math.sin(165*Math.PI/180)*b;
	return [x,y];

}

function stickToZ(x, y){
	var originAngle = Math.atan2(y,x) - (15*Math.PI/180);
//	var xyangle = Math.PI-originAngle-(30*Math.PI/180);
	//TODOS LOS ANGULOS
	
	var a = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	var b = a*Math.sin(originAngle) / Math.sin(30*Math.PI/180);
	
	x = -Math.cos(15*Math.PI/180)*b;
	y = Math.sin(15*Math.PI/180)*b;
	return [x,y];
};


function stickToXPoint(x, y, xOrigin, yOrigin){
//	var originAngle = (Math.PI*2 - Math.atan2(y,x)) - 15*Math.PI/180;
//	var xyangle = Math.PI-originAngle-(30*Math.PI/180);
	//TODOS LOS ANGULOS
	
	var a = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	var b = a*Math.sin(originAngle) / Math.sin(30*Math.PI/180);
	
	x = Math.cos(165*Math.PI/180)*b;
	y = -Math.sin(165*Math.PI/180)*b;
	return [x,y];

}

function stickToZPoint(x, y, xOrigin, yOrigin){
	var originAngle = Math.atan2(y,x) - (15*Math.PI/180);
//	var xyangle = Math.PI-originAngle-(30*Math.PI/180);
	//TODOS LOS ANGULOS
	
	var a = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	var b = a*Math.sin(originAngle) / Math.sin(30*Math.PI/180);
	
	x = -Math.cos(15*Math.PI/180)*b;
	y = Math.sin(15*Math.PI/180)*b;
	return [x,y];
};
