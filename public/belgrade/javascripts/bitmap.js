//
// svg selector tools
//

// element lazy init
var $ = function (el) {
	return elementFromCss(el);
}

// document init callback
var onPageLoad = function(callback) {
	document.addEventListener("DOMContentLoaded", callback);
}

// create Element from css selector
var elementFromCss = function(el) {
	return new Element(document.querySelector(el));
}

// node container
var Element = function(obj) {
	this.obj = obj;
	return this;
}

// add element
Element.prototype.add = function(el) {
	return new Element(this.obj.appendChild(document.createElementNS("http://www.w3.org/2000/svg", el)));
}

// set element attribute
Element.prototype.attr = function(key, value) {
	this.obj.setAttribute(key, value);
	return this;
}

// set element text
Element.prototype.val = function(val) {
	this.obj.innerHTML = val;
	return this;
}

// append element text
Element.prototype.append = function(val) {
	this.obj.innerHTML += val;
	return this;
}

// creation

Element.prototype.circle = function() {
	return this.add('circle');
}

Element.prototype.ellipse = function() {
	return this.add('ellipse');
}

Element.prototype.line = function() {
	return this.add('line');
}

Element.prototype.polygon = function() {
	return this.add('polygon');
}

Element.prototype.rect = function() {
	return this.add('rect');
}

Element.prototype.text = function() {
	return this.add('text');
}

// attributes

Element.prototype.width = function(value) {
	return this.attr('width', value);
}

Element.prototype.height = function(value) {
	return this.attr('height', value);
}

Element.prototype.x = function(value) {
	return this.attr('x', value);
}

Element.prototype.cx = function(value) {
	return this.attr('cx', value);
}

Element.prototype.y = function(value) {
	return this.attr('y', value);
}

Element.prototype.cy = function(value) {
	return this.attr('cy', value);
}

Element.prototype.fill = function(value) {
	return this.attr('fill', value);
}

Element.prototype.fontsize = function(value) {
	return this.attr('font-size', value);
}

Element.prototype.r = function(value) {
	return this.attr('r', value);
}

Element.prototype.fillopacity = function(value) {
	return this.attr('fill-opacity', value);
}

Element.prototype.x1 = function(value) {
	return this.attr('x1', value);
}

Element.prototype.x2 = function(value) {
	return this.attr('x2', value);
}

Element.prototype.y1 = function(value) {
	return this.attr('y1', value);
}

Element.prototype.y2 = function(value) {
	return this.attr('y2', value);
}

Element.prototype.stroke = function(value) {
	return this.attr('stroke', value);
}

Element.prototype.strokewidth = function(value) {
	return this.attr('stroke-width', value);
}

Element.prototype.transform = function(value) {
	return this.attr('transform', value);
}

Element.prototype.id = function(value) {
	return this.attr('id', value);
}

Element.prototype.class = function(value) {
	return this.attr('class', value);
}

// 
// utils
// 

var size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}

var ajaxGet = function(url, callback) {
	var xmlhttp = new XMLHttpRequest(),
    	method = 'GET',
    	url = url;

	xmlhttp.open(method, url, true);
	xmlhttp.onreadystatechange = function () {
    	if (xmlhttp.readyState !== XMLHttpRequest.DONE) {
        	return;
    	}
    	if (xmlhttp.status !== 200) {
        	return;
    	}
    	callback(JSON.parse(xmlhttp.responseText));
	};
	xmlhttp.send();

}