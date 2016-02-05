var RADIUS = 10;

function init() {
	var x_max = size.width;
	var y_max = Math.floor(size.height*0.95);

	var graph = $('#bitmap').add('svg').attr('width', x_max).attr('height', y_max);

	for (var i=RADIUS; i<x_max; i+=2*(RADIUS + 1)) {
	for (var j=RADIUS; j<y_max; j+=2*(RADIUS + 1)) {
			graph.circle().class("dot")
			.attr("data-x", (i-RADIUS)/(2*(RADIUS + 1))).attr("data-y", (j-RADIUS)/(2*(RADIUS + 1)))
			.cx(i).cy(j)
			.r(RADIUS - 2)
			.stroke("white")
			.strokewidth(1).fill((Math.random() > 0.5) ? "black" : "white");
		}
	}
}

function xmax() {
	return Math.floor((size.width-RADIUS)/(2*(RADIUS + 1)));
}

function ymax() {
	return Math.floor((size.height*0.95-RADIUS)/(2*(RADIUS + 1)));
}

// dot access

function getElem(x, y) {
	return document.querySelectorAll("[data-x='" + x + "'][data-y='" + y + "']")[0];
}

function getRow(x) {
	return document.querySelectorAll("[data-x='" + x + "']");
}

function getColumn(y) {
	return document.querySelectorAll("[data-y='" + y + "']");
}

function getAll() {
	return document.getElementsByClassName("dot");
}

function kNN(x,y,k) {
	var result = [];
	for (i = Math.max(x-k, 0); i <= Math.min(x+k, xmax()); i++) {
		for (j = Math.max(y-k, 0); j <= Math.min(y+k, ymax()); j++) {
			result.push(getElem(i, j));
		}
	}
	return result;
}

// dot control

function on(el) {
	el.setAttribute("fill", "white");
}

function off(el) {
	el.setAttribute("fill", "black");
}

function flip(el) {
	el.setAttribute("fill", (el.getAttribute("fill") == "white") ? "black" : "white");
}

function reset() {
	var elems = getAll();
	for (var i=0; i<elems.length; i++) {
		off(elems[i]);
	}
}

// fun

function g1Handler(x, y) {
	var elems = getRow(x);
	for (var i=0; i<elems.length; i++) {
		off(elems[i]);
	}
	var elems = getColumn(y);
	for (var i=0; i<elems.length; i++) {
		flip(elems[i]);
	}
}

function g2Handler(x, y) {
	var elems = kNN(x, y, 3);
	for (var i=0; i < elems.length; i++) {
		flip(elems[i]);
	}
}

function defaultG1() {
	var elems = getAll();
	for(var i = 3; i < elems.length; i++) {
		elems[i].onclick=function(obj){
			x = parseInt(obj.target.getAttribute("data-x"));
			y = parseInt(obj.target.getAttribute("data-y"));
			g1Handler(x,y);
		}
	}
}

function defaultG2() {
	var elems = getAll();
	for(var i = 3; i < elems.length; i++) {
		elems[i].onclick=function(obj){
			x = parseInt(obj.target.getAttribute("data-x"));
			y = parseInt(obj.target.getAttribute("data-y"));
			g2Handler(x,y);
		}
	}
}

// 

onPageLoad(function(event) {

	init();

	getElem(0, 0).onclick = function(obj) {
		x = obj.target.getAttribute("data-x");
		y = obj.target.getAttribute("data-y");
		reset();
	}

	getElem(0, 1).onclick = function(obj) {
		defaultG1();
	}

	getElem(0, 2).onclick = function(obj) {
		defaultG2();
	}

	defaultG1();

});

