
var Entity = function(coordinateString) {
	this.position = {
		top : pxTopCoordinate(parseRow(coordinateString)),
		left : pxLeftCoordinate(parseColumn(coordinateString))
	}
	this.destination = null;
}

Entity.prototype.move = function(x, y) {
	var newTop = parseFloat(this.element.css("top")) + y;
	this.element.css("top", pixilize(newTop));
	this.position.top += y;
	var newLeft = parseFloat(this.element.css("left")) + x;
	this.element.css("left", pixilize(newLeft));
	this.position.left += x;
}

Entity.prototype.setDestination = function(newDestination) {
	this.destination = newDestination;
}

Entity.prototype.approach = function() {

}