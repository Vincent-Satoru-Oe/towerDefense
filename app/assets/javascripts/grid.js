
var Grid = {
	element : null,
	grid : [],
	waypoints : [],
	spawnPoints : []
}

Grid.getGridspaceFromCoordinateString = function(coordinateString) {
	return Grid.grid[parseRow(coordinateString)][parseColumn(coordinateString)];
}

Grid.getGridspaceFromRowColumn = function(row, column) {
	return Grid.grid[row][column];
}

//------------------------------ GRIDSPACE --------------------------------------

var Gridspace = function(coordinateString) {
	this.coordinateString = coordinateString;
	this.element = $("#" + this.coordinateString);
	this.row = parseRow(coordinateString);
	this.column = parseColumn(coordinateString);
	this.position = {
		top : pxTopCoordinate(this.row),
		left : pxLeftCoordinate(this.column)
	}
	this.center = {
		top : this.top + gridspaceHeight/2,
		left : this.left + gridspaceWidth/2
	}
	this.active = false;
	this.isWaypoint = false;
	this.tower = null

}

Gridspace.prototype.setActive = function() {
	this.element.addClass("grid-space");
	this.active = true;
}

Gridspace.prototype.setWaypoint = function() {
	this.element.removeClass("grid-space");
	this.element.addClass("waypoint-space");
	this.isWaypoint = true;
}

Gridspace.prototype.createTower = function(type) {
	var newTower = Game.createTower(this.coordinateString, type);
	this.element.append(newTower.element);
	this.tower = newTower;
}

//---------------------------------------grid parsing helpers--------------------------

function stringify(row, column) {
	return row.toString() + "_" + column.toString();
}

function parseRow(coordinate) {
	return coordinate.split("_")[0];
}

function parseColumn(coordinate) {
	return coordinate.split("_")[1];
}

function pxTopCoordinate(row) {
	row = parseInt(row);
	if (row >= -1 && row <= rows) {
		// return (row * gridspaceHeight) + gridspaceHeight;
		return row * gridspaceHeight;
	}
}

function pxLeftCoordinate(column) {
	column = parseInt(column);
	if (column >= -1 && column <= columns) {
		// return (column * gridspaceWidth) + gridspaceWidth;
		return column * gridspaceWidth;
	}
}