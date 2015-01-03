
var Grid = {
	element : null,
	grid : [],
	waypoints : []
}

Grid.getGridspaceFromCoordinateString = function(coordinateString) {
	return Grid.grid[parseRow(coordinateString)][parseColumn(coordinateString)];
}

Grid.getGridspaceFromRowColumn = function(row, column) {
	return Grid.grid[row][column];
}

//------------------------------ GRIDSPACE --------------------------------------

var Gridspace = function(coordinateString) {
	Gridspace(parseRow(coordinateString), parseColumn(coordinateString));
}

var Gridspace = function(row, col) {
	this.coordinateString = stringify(row, col);
	this.element = $("#" + this.coordinateString);
	this.row = row;
	this.column = col;
	this.position = {
		top : pxTopCoordinate(this.row),
		left : pxLeftCoordinate(this.column)
	}
	this.center = {
		top : this.top + gridspaceHeight/2,
		left : this.left + gridspaceWidth/2
	}
	this.isWaypoint = false;
	this.tower = null
}

Gridspace.prototype.setWaypoint = function() {
	this.isWaypoint = true;
	this.element.css("border-color", "red");
	this.element.attr("onclick", null);
}

function stringify(row, column) {
	return row.toString() + "-" + column.toString();
}

function parseRow(coordinate) {
	return coordinate.split("-")[0];
}

function parseColumn(coordinate) {
	return coordinate.split("-")[1];
}

function pxTopCoordinate(row) {
	if (row < rows) {
		return row * gridspaceHeight;
	}
}

function pxLeftCoordinate(column) {
	if (column < columns) {
		return column * gridspaceWidth;
	}
}