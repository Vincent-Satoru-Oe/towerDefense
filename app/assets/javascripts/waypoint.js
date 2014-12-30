
var Waypoint = function(position) {
	this.position = position;
	positions = position.split("-");
	this.top = rowCoordinate(positions[0]) + gridSpaceHeight/2
	this.left = columnCoordinate(positions[1]) + gridSpaceWidth/2

	var newBullet = $(document.createElement("div"));
	newBullet.css("background-image", "url(python.png)");
	newBullet.css("position", "absolute");
	newBullet.css("height", "40px");
	newBullet.css("width", "40px");

	newBullet.css("top", pixilize(this.top));
	newBullet.css("left", pixilize(this.left));

	$('.viewport').append(newBullet);
}