
var Waypoint = function(gridspace) {
	this.gridspace = gridspace;
	this.next = null;
	this.position = this.gridspace.position;
	this.coordinateString = this.gridspace.coordinateString;

	this.gridspace.setWaypoint();
}

Waypoint.prototype.setNext = function(next) {
	this.next = next;
}