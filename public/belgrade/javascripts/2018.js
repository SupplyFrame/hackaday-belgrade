var palette = ["white", "#808183", "#A7A9AC", "#EE352E"]

var xmax = window.innerWidth
var ymax = window.innerHeight	

function toRad(angle) {
	return angle * (Math.PI / 180)
}

function rndAngle() {
	return Math.random() < 0.6 ? Math.floor(Math.random()*8)*45 : Math.floor(Math.random()*4)*90;
}

rndColor = function() {
	return palette[Math.floor(Math.random()*palette.length)]
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

	inBounds(xmin, xmax, ymin, ymax) {
		return (this.x1 > xmin && this.x1 < xmax) && (this.x2 > xmin && this.x2 < xmax) && (this.y1 > ymin && this.y1 < ymax) && (this.y2 > ymin && this.y2 < ymax)
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
				repeatCount: 1
			})
			el.appendChild(animate)

			animate = document.createElementNS('http://www.w3.org/2000/svg', "animate");
			this.setAttrs(animate, {
				attributeType: "XML",
				attributeName: "y2",
				from: this.y1,
				to: this.y2,
				dur: this.duration + "s",
				repeatCount: 1
			})
			el.appendChild(animate)

		}

		return el;
	}

	render(dom_element) {
		var color = rndColor()
		document.getElementById(dom_element).appendChild(this.addSVG("line", {
			x1: this.x1,
			y1: this.y1,
			x2: this.x2,
			y2: this.y2,
			style: "stroke:" + color + ";stroke-width:" + this.width + ";opacity:1.0"
		}));	
		document.getElementById(dom_element).appendChild(this.addSVG("circle", {
			cx: this.x1,
			cy: this.y1,
			r: 6,
			stroke: "none",
			fill: color,
			style: "stroke-width:0"
		}));
		// document.getElementById('results').appendChild(this.addSVG('text', {
		// 	x: this.x1 + 10,
		// 	y: this.y1 + 10,
		// 	fill: color,
		// })).appendChild(document.createTextNode("(" + this.x1 + "," + this.y1 + ")"));

	}

	toString() {
		return "(" + this.x1 + "," + this.y1 + ")" + " - (" + this.x2 + "," + this.y2 + ")"
	}

}

render = function() {
	
	var len = Math.floor(Math.max(20, Math.min(xmax, ymax)/10))
	var path = []

	for (var it = 0; it < 4; it++) {
		
		var x = Math.floor(xmax*Math.random())
		var y = Math.floor(ymax*Math.random())

		var rendered = 0

		while (rendered < 64) {
			
			var angle = rndAngle()
			var line = new Line(x, y, angle, len, 1)

			if (line.inBounds(0.05*xmax, 0.62*xmax, 0.1*ymax, 0.9*ymax)) {
				line.width = 1 + Math.floor(Math.random()*5)
				rendered++
				line.render('results')
				path.push(line)
				x = line.x2
				y = line.y2
			} else {
				if (Math.random() < 0.1) {
					x = Math.floor(xmax*Math.random())
					y = Math.floor(ymax*Math.random())
				}
			}

		}
	}
}

