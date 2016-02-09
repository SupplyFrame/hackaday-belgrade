var RADIUS = 10;
var GAME = 0;
var TOGGLE = false;

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
    return Math.floor((size.width-RADIUS)/(2*(RADIUS + 1))) - 1;
}

function ymax() {
    return Math.floor((size.height*0.95-RADIUS)/(2*(RADIUS + 1))) - 1;
}

function randx() {
    return Math.floor(Math.random() * xmax());
}

function randy() {
    return Math.floor(Math.random() * ymax());
}

function nrandx() {
    return Math.floor(xmax()*Math.abs(normal(0.5,0.75))%xmax());
}

function nrandy() {
    return Math.floor(ymax()*Math.abs(normal(0.5,0.75))%ymax());
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

function isOn(el) {
    return (el.getAttribute("fill") == "white");
}

function off(el) {
    el.setAttribute("fill", "black");
}

function isOff(el) {
    return (el.getAttribute("fill") == "black");
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

function g3Handler(x, y) {
    var elems = kNN(x, y, 3);
    for (var i=5; i < elems.length; i++) {
	off(elems[i]);
    }
}

function drawHandler() {
    var elems = getAll();
    for(var i = 8; i < elems.length; i++) {
	elems[i].onmouseover=function(obj){
	    if (!TOGGLE) {
		obj.target.setAttribute("fill", "white");
		TOGGLE = true;
	    }
	}
	elems[i].click=function(obj){
	    TOGGLE = !TOGGLE;
	}
    }
}

function pentominoFlip() {
    startx = nrandx();
    starty = nrandy();
    el = getElem(startx, starty);
    flip(el);
    flip(getElem(startx, Math.min(starty+1, ymax())));
    flip(getElem(startx, Math.max(0, starty-1)));
    flip(getElem(Math.min(startx+1, xmax()), Math.max(starty-1, 0)));
    flip(getElem(Math.max(0, startx-1), starty));
}

function bitFlip() {
    startx = nrandx();
    starty = nrandy();
    el = getElem(startx, starty);
    flip(el);
}

function life() {
    x = randx();
    y = randy();
    el = getElem(x, y);   
    count = neighAlive(x, y);
    if (isOn(el) && (count < 2 || count > 3)) {
	off(el);
    } else if (isOff(el) && (count == 3)) {
	on(el);
    }
}

function neighAlive(x, y) {
    var count = 0;
    for (var i=Math.max(0, x-1); i<= Math.min(x+1, xmax()); i++) {
	for (var j=Math.max(0, y-1); j<=Math.min(y+1, ymax()); j++) {
	    if (isOn(getElem(i,j))) {
		count = count + 1;
	    }
	}
    }
    return count;
}

function setHandler() {
    var elems = getAll();
    for(var i = 8; i < elems.length; i++) {
	elems[i].onclick=function(obj){
	    x = parseInt(obj.target.getAttribute("data-x"));
	    y = parseInt(obj.target.getAttribute("data-y"));
	    switch(GAME) {
	    case 1:
		g1Handler(x,y);
		break;
	    case 2:
		g2Handler(x,y);
		break;
	    case 3:
		g3Handler(x,y);
		break;
	    case 4:
		drawHandler();
		break;
	    default:
		g1Handler(x, y);
	    }
	}
    }
}

// utils

function normal(mu, sigma, nsamples){
    if(!nsamples) nsamples = 6
    if(!sigma) sigma = 1
    if(!mu) mu=0

    var run_total = 0
    for(var i=0 ; i<nsamples ; i++){
	run_total += Math.random()
    }

    return sigma*(run_total - nsamples/2)/(nsamples/2) + mu
}

// 

onPageLoad(function(event) {

    init();

    // ux

    var elems = getAll();
    for (var i=0; i<elems.length; i++) {
	elems[i].onmouseover=function(obj){
	    obj.target.setAttribute("stroke-width", "2");
	    obj.target.setAttribute("fill-opacity", "0.9");
	}
	elems[i].onmouseout=function(obj){
	    obj.target.setAttribute("stroke-width", "1");
	    obj.target.setAttribute("fill-opacity", "1.0");
	}
    }

    // control

    getElem(0,0).onclick = function(obj) {
	reset();
	setInterval(bitFlip, 10);
    }

    getElem(0, 1).onclick = function(obj) {
	setInterval(life, 10);
    }

    getElem(0, 2).onclick = function(obj) {
	setInterval(pentominoFlip, 10);
    }
    
    getElem(0, 3).onclick = function(obj) {
	GAME = 1;
	setHandler();
    }

    getElem(0, 4).onclick = function(obj) {
	GAME = 2;
	setHandler();
    }

    getElem(0, 5).onclick = function(obj) {
	GAME = 3;
	setHandler();
    }

    getElem(0, 6).onclick = function(obj) {
	GAME = 4;
	setHandler();
    }

    getElem(0,7).onclick = function(obj) {
	reset();
    }

    setHandler();

});
