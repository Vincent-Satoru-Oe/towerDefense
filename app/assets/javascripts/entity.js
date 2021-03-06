
var Entity = function(coordinateString) {
	this.position = {
		top : pxTopCoordinate(parseRow(coordinateString)),
		left : pxLeftCoordinate(parseColumn(coordinateString))
	}
	this.center = {
		top : this.position.top + gridspaceHeight/2,
		left : this.position.left + gridspaceWidth/2
	}
	this.destination = null;
}

Entity.prototype.move = function(x, y) {
	var newLeft = parseFloat(this.element.css("left")) + x;
	this.element.css("left", pixilize(newLeft));
	this.position.left += x;
	this.center.left += x;
	var newTop = parseFloat(this.element.css("top")) + y;
	this.element.css("top", pixilize(newTop));
	this.position.top += y;
	this.center.top += y;
}

Entity.prototype.setDestination = function(newDestination) {
	this.destination = newDestination;
}

Entity.prototype.approachDestination = function() {
	xdiff = this.destination.position.left - this.position.left;
	ydiff = this.destination.position.top - this.position.top;
	magnitude = Math.sqrt(Math.pow(ydiff, 2) + Math.pow(xdiff, 2));
	if (magnitude <= this.speed) {
		this.reachedDestination();
	} else {
		unitX = xdiff / magnitude;
		unitY = ydiff / magnitude;
		x = unitX * this.speed;
		y = unitY * this.speed;
		this.move(x, y);
	}
}

Entity.prototype.reachedDestination = function() {
	
}