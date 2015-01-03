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

function render() {
  $('.viewport').css('display', 'block');
  var html = "";
  for(var i=0; i<14; i++) {
    html += "<div class='row'>";
    for(var j=0; j<20; j++) {
      	html += "<div class='game-space' id="+i+"-"+j+"></div>";
    }
    html += "</div>";
  }
  $('.viewport').html(html);

  var newBullet = $(document.createElement("div"));
  newBullet.css("background-image", "url(python.png)");
  newBullet.css("position", "absolute");
  newBullet.css("height", "40px");
  newBullet.css("width", "40px");
  newBullet.css("top", "0px");
  newBullet.css("left", "0px")

  //$('.viewport').append(newBullet);
  createSquare();
}

function createSquare() {
  var aShape = $(document.createElement("div"));
  aShape.css("background-image", "url(Square.png)");
  aShape.css("position", "absolute");
  aShape.css("height", "90px");
  aShape.css("width", "90px");
  aShape.css("top", "15px");
  aShape.css("left", "15px")

  $('.viewport').append(aShape);
  alert("This worked");
}

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
waypoints = [];

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
		gs = Grid.getGridspaceFromCoordinate(waypointList[i]);
		waypoint = new Waypoint(gs);
		waypoints.push(waypoint);
	}
	i = 0;
	while (i < waypoints.length-1) {
		waypoints[i].setNext(waypoints[i+1]);
		i++;
	}
	waypoints[i].setNext(null);

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
	approach(enemy, 0);
}

//--------------------------------------------HELPERS--------------------------------

function pixilize(value) {
	return value + "px";
}

function approach(source, target) {
	ydiff = source.position.top - target.position.top;
	xdiff = source.position.left - target.position.left;
	source.move(1,1);
}

