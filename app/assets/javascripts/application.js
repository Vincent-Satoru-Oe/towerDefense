// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

viewHeight = 560;
viewWidth = 800;

rows = 14;
columns = 20;

gridspaceWidth = 40;
gridspaceHeight = 40;

waypointList = ["0-10", "1-10", "2-10", "3-10", 
"4-10", "5-10", "6-10", "7-10", "8-10", "9-10", 
"10-10", "10-9", "10-8", "10-7", "10-6", "10-5",
"10-4", "10-3", "10-2", "10-1", "10-0"];

// function called to start the game
function startGame() {
  Game.render();
}

//--------------------------------GAME------------------------------------------

var Game = {
	interval : 5,
}

Game.render = function() {

	// construct the grid
	$('.viewport').css('display', 'block');
	var html = "";
	for(var i=0; i<rows; i++) {
		html += "<div class='row'>";
		for(var j=0; j<columns; j++) {
	  		html += "<div class='game-space' id="+i+"-"+j+" onclick=Menu.show(0)></div>";
		}
		html += "</div>";
	}
	$('.viewport').html(html);

	for(var i=0; i<rows; i++) {
		row = [];
		for(var j=0; j<columns; j++) {
			gridspace = new Gridspace(i, j);
			row.push(gridspace)
		}
		Grid.grid.push(row);
	}

	// set the menu element to the correct DOM element
	Menu.element = $('.menu-modal');

	//Set the waypoint gridspots according to waypointList
	for (i = 0; i < waypointList.length; i++) {
		gs = Grid.getGridspaceFromCoordinateString(waypointList[i]);
		waypoint = new Waypoint(gs);
		Grid.waypoints.push(waypoint);
	}
	i = 0;
	while (i < Grid.waypoints.length-1) {
		Grid.waypoints[i].setNext(Grid.waypoints[i+1]);
		i++;
	}
	Grid.waypoints[i].setNext(null);

	// run the game loop
	Game.runLoop();

	enemy = new Enemy("0-10");
}

Game.runLoop = function() {
	Game.gameLoop = window.setInterval(
		function() {
			Game.update()
		}, 
		Game.interval
	);
}

Game.update = function() {
	approach(enemy, Grid.waypoints[11]);
}

//--------------------------------------------HELPERS--------------------------------

function pixilize(value) {
	return value + "px";
}

function approach(source, target) {

	ydiff = target.position.top - source.position.top;
	xdiff = target.position.left - source.position.left;

	magnitude = Math.sqrt(Math.pow(ydiff, 2) + Math.pow(xdiff, 2));

	unitX = xdiff / magnitude;
	unitY = ydiff / magnitude;

	source.move(unitX, unitY);
}

