var CIRCLE_RADIUS = 10;

onPageLoad(function(event) {

	// generate background

	var x_max = size.width;
	var y_max = Math.floor(size.height*0.90);

	var graph = $('#bitmap').add('svg').attr('width', x_max).attr('height', y_max);

	for (var i=CIRCLE_RADIUS; i<x_max; i+=CIRCLE_RADIUS*2 + 2) {
	for (var j=CIRCLE_RADIUS; j<y_max; j+=CIRCLE_RADIUS*2 + 2) {
			graph.circle().class("bg").cx(i).cy(j).r(CIRCLE_RADIUS - 2).stroke("white").strokewidth(1).fill((Math.random() > 0.5) ? "black" : "white");
		}
	}
});