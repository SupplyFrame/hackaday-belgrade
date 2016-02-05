var RADIUS = 10;

function init() {
	var x_max = size.width;
	var y_max = Math.floor(size.height*0.95);

	var graph = $('#bitmap').add('svg').attr('width', x_max).attr('height', y_max);

	for (var i=RADIUS; i<x_max; i+=RADIUS*2 + 2) {
	for (var j=RADIUS; j<y_max; j+=RADIUS*2 + 2) {
			graph.circle().class("dot").attr("data-x", i).attr("data-y", j).cx(i).cy(j).r(RADIUS - 2).stroke("white").strokewidth(1).fill((Math.random() > 0.5) ? "black" : "white");
		}
	}
}

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

function update(x, y) {
	var elems = getRow(x);
	for (var i=0; i<elems.length; i++) {
		off(elems[i]);
	}
	var elems = getColumn(y);
	for (var i=0; i<elems.length; i++) {
		flip(elems[i]);
	}
}

onPageLoad(function(event) {

	init();

	getElem(RADIUS, RADIUS).onclick = function(obj) {
		x = obj.target.getAttribute("data-x");
		y = obj.target.getAttribute("data-y");
		reset();
	}

	var elems = getAll();
	for(var i = 1; i < elems.length; i++) {
    	elems[i].onclick=function(obj){
    		x = parseInt(obj.target.getAttribute("data-x"));
    		y = parseInt(obj.target.getAttribute("data-y"));
    		update(x,y);
    	}
	}
});

