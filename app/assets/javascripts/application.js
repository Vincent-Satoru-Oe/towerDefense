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

rows = 12;
columns = 20;

gridspaceWidth = 40;
gridspaceHeight = 40;

waypointList = ["0_10", "1_10", "2_10", "3_10", 
"4_10", "5_10", "6_10", "7_10", "8_10", "9_10", 
"10_10", "10_9", "10_8", "10_7", "10_6", "10_5",
"10_4", "10_3", "10_2", "10_1", "10_0"];

// function called to start the game
function startGame() {
	Game.render();
	Game.initialize();
}

//--------------------------------GAME------------------------------------------

var Game = {
	interval : 10,
	towers : [],
	enemies : [],
	enemiesToRemove : [],
	bullets : []
}

Game.render = function() {
	// construct the grid
	$('.grid').css('display', 'block');
	var html = "";
	html += "<div class='row'>";
	for (var j=-1; j<columns+1; j++) {
		html += "<div class='spawn-space' id='-1_"+j+"'></div>";
	}
	html += "</div>";
	for(var i=0; i<rows; i++) {
		html += "<div class='row'>";
		html += "<div class='spawn-space' id='"+i+"_-1'></div>"
		for(var j=0; j<columns; j++) {
	  		html += "<div class='game-space' id="+i+"_"+j+" onclick=Menu.show(0)></div>";
		}
		html += "<div class='spawn-space' id="+i+"_"+columns+"></div>"
		html += "</div>";
	}
	html += "<div class='row'>";
	for (var j=-1; j<columns+1; j++) {
		html += "<div class='spawn-space' id="+rows+"_"+j+"'></div>";
	}
	html += "</div>";
	//html += "<div class='viewframe'></div>";
	$('.grid').html(html);
}


Game.initialize = function() {
	Game.player = new Player();

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

	enemy = new Enemy("-1_10");
	enemy.setDestination(Grid.waypoints[0]);
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

	//Movement of enemies / update visibilities to towers
	var enemy;
	for (var i = 0; i < Game.enemies.length; i++) {
		enemy = Game.enemies[i];
		enemy.approachDestination();
		enemy.updateVisibility();
	}

	//Rotation of Towers

	//Spawning of enemies

	//Towers shoot enemies
	for (var i = 0; i < Game.towers.length; i++) {
		Game.towers[i].loadShot();
	}

	var enemyToRemove;
	var indexToRemove;
	for (var i = 0; i < Game.enemiesToRemove.length; i++) {
		enemyToRemove = Game.enemiesToRemove[i];
		indexToRemove = Game.enemies.indexOf(enemyToRemove);
		Game.enemies.splice(indexToRemove, 1);
	}
	Game.enemiesToRemove = [];
}

Game.createTower = function(coordinateString, type) {
	return new Tower(coordinateString, towerIndex[type]);
}

Game.loseGame = function() {
	window.clearInterval(Game.gameLoop);
	alert("you lost");
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

function distance(source, target) {
	ydiff = target.position.top - source.position.top;
	xdiff = target.position.left - source.position.left;
	magnitude = Math.sqrt(Math.pow(ydiff, 2) + Math.pow(xdiff, 2));
	return magnitude;
}

