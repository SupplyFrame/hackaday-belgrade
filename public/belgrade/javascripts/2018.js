
var xmax = window.innerWidth
var ymax = window.innerHeight	

function toRad(angle) {
	return angle * (Math.PI / 180)
}

function rndAngle() {
	return Math.random() < 0.6 ? Math.floor(Math.random()*8)*45 : Math.floor(Math.random()*4)*90;
}

renderText = function(params, text) {
		document.getElementById('results').appendChild(addSVG('text', params)).appendChild(document.createTextNode(text.substring(0,120)))
}

addSVG = function(tag, attrs) {
	var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
	for (var k in attrs) {
    	el.setAttribute(k, attrs[k]);
	}
	return el;
}

textNode = function(x, y, text) {
	renderText({
		x: x,
		y: y,
		fill: "white"
	}, text)
}

class Line {

	constructor(x, y, angle, length, duration) {
		this.color = "white"
		this.stroke = 1
		this.x1 = Math.floor(x)
		this.y1 = Math.floor(y)
		this.x2 = this.x1 + Math.floor(length*Math.cos(toRad(angle)))
		this.y2 = this.y1 - Math.floor(length*Math.sin(toRad(angle)))
		this.angle = angle
		this.length = length
		this.duration = duration ? duration : 0
		// hack 
		this.x2 = (Math.abs(this.x1 - this.x2) < 2) ? this.x1 : this.x2
		this.y2 = (Math.abs(this.y1 - this.y2) < 2) ? this.y1 : this.y2
	}

	setAttrs(el, attrs) {
		for (var k in attrs) {
			el.setAttribute(k, attrs[k]);
		}
	}

	inBounds(xmax, ymax) {
		return (this.x1 > 0 && this.x1 < xmax) && (this.x2 > 0 && this.x2 < xmax) && (this.y1 > 0 && this.y1 < ymax) && (this.y2 > 0 && this.y2 < ymax)
	}

	addSVG(tag, attrs) {

		var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
		this.setAttrs(el, attrs)

		if (this.duration > 0) {

			var animate = document.createElementNS('http://www.w3.org/2000/svg', "animate");
			this.setAttrs(animate, {
				attributeType: "XML",
				attributeName: "x2",
				from: this.x1,
				to: this.x2,
				dur: this.duration + "s",
				repeatCount: "indefinite"
			})
			el.appendChild(animate)

			animate = document.createElementNS('http://www.w3.org/2000/svg', "animate");
			this.setAttrs(animate, {
				attributeType: "XML",
				attributeName: "y2",
				from: this.y1,
				to: this.y2,
				dur: this.duration + "s",
				repeatCount: "indefinite"
			})
			el.appendChild(animate)

		}

		return el;
	}

	render(dom_element) {
		document.getElementById(dom_element).appendChild(this.addSVG("line", {
			x1: this.x1,
			y1: this.y1,
			x2: this.x2,
			y2: this.y2,
			style: "stroke:" + this.color + ";stroke-width:" + this.width + ";opacity:1.0"
		}));	
		document.getElementById(dom_element).appendChild(addSVG("circle", {
			cx: this.x1,
			cy: this.y1,
			r: 6,
			stroke: "none",
			fill: "white",
			style: "stroke-width:0"
		}));

	}

	toString() {
		return "(" + this.x1 + "," + this.y1 + ")" + " - (" + this.x2 + "," + this.y2 + ")"
	}

}

render = function() {
	
	var len = Math.floor(Math.max(20, Math.min(xmax, ymax)/10))
	var path = []

	for (var it = 0; it < 4; it++) {
		
		var x = Math.floor(xmax * Math.random())
		var y = Math.floor(ymax * Math.random())

		for (var i=0; i<128; i++) {
			
			var matchFound = true
			
			var angle = rndAngle()
			var line = new Line(x, y, angle, len, 2)

			if (matchFound && line.inBounds(xmax, ymax)) {
				line.width = 1 + Math.floor(Math.random()*5)
				line.render('results')
				path.push(line)
				// textNode(line.x1 + 8, line.y1 + 16, "(" + line.x1 + "," + line.y1 + ")")
				// textNode(line.x2 + 8, line.y2 + 16, "(" + line.x2 + "," + line.y2 + ")")
				x = line.x2
				y = line.y2
			}

		}
	}
}
