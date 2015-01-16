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

activeGridspaces = [
	"1_1", "1_2", "1_3", "1_4", "1_5", "1_6", "1_7", "1_8", "1_9", "1_10",
		"1_11", "1_12", "1_13", "1_14", "1_15", "1_16", "1_17", "1_18", "1_19", "1_20",
	"2_1", "2_2", "2_3", "2_4", "2_5", "2_6", "2_7", "2_8", "2_9", "2_10",
		"2_11", "2_12", "2_13", "2_14", "2_15", "2_16", "2_17", "2_18", "2_19", "2_20",
	"3_1", "3_2", "3_3", "3_4", "3_5", "3_6", "3_7", "3_8", "3_9", "3_10",
		"3_11", "3_12", "3_13", "3_14", "3_15", "3_16", "3_17", "3_18", "3_19", "3_20",
	"4_1", "4_2", "4_3", "4_4", "4_5", "4_6", "4_7", "4_8", "4_9", "4_10",
		"4_11", "4_12", "4_13", "4_14", "4_15", "4_16", "4_17", "4_18", "4_19", "4_20",
	"5_1", "5_2", "5_3", "5_4", "5_5", "5_6", "5_7", "5_8", "5_9", "5_10",
		"5_11", "5_12", "5_13", "5_14", "5_15", "5_16", "5_17", "5_18", "5_19", "5_20",
	"6_1", "6_2", "6_3", "6_4", "6_5", "6_6", "6_7", "6_8", "6_9", "6_10",
		"6_11", "6_12", "6_13", "6_14", "6_15", "6_16", "6_17", "6_18", "6_19", "6_20",
	"7_1", "7_2", "7_3", "7_4", "7_5", "7_6", "7_7", "7_8", "7_9", "7_10",
		"7_11", "7_12", "7_13", "7_14", "7_15", "7_16", "7_17", "7_18", "7_19", "7_20",
	"8_1", "8_2", "8_3", "8_4", "8_5", "8_6", "8_7", "8_8", "8_9", "8_10",
		"8_11", "8_12", "8_13", "8_14", "8_15", "8_16", "8_17", "8_18", "8_19", "8_20",
	"9_1", "9_2", "9_3", "9_4", "9_5", "9_6", "9_7", "9_8", "9_9", "9_10",
		"9_11", "9_12", "9_13", "9_14", "9_15", "9_16", "9_17", "9_18", "9_19", "9_20",
	"10_1", "10_2", "10_3", "10_4", "10_5", "10_6", "10_7", "10_8", "10_9", "10_10",
		"10_11", "10_12", "10_13", "10_14", "10_15", "10_16", "10_17", "10_18", "10_19", "10_20",
	"11_1", "11_2", "11_3", "11_4", "11_5", "11_6", "11_7", "11_8", "11_9", "11_10",
		"11_11", "11_12", "11_13", "11_14", "11_15", "11_16", "11_17", "11_18", "11_19", "11_20",
	"12_1", "12_2", "12_3", "12_4", "12_5", "12_6", "12_7", "12_8", "12_9", "12_10",
		"12_11", "12_12", "12_13", "12_14", "12_15", "12_16", "12_17", "12_18", "12_19", "12_20"
]

waypointList = ["0_10", "1_10", "2_10", "3_10", 
"4_10", "5_10", "6_10", "7_10", "8_10", "9_10", 
"10_10", "10_9", "10_8", "10_7", "10_6", "10_5",
"10_4", "10_3", "10_2"];

waves = [null, 
	[
		[
			{spawnTime : 3, enemy : {id : 0, level : 1}},
			{spawnTime : 5, enemy : {id : 0, level : 1}}
		]
	]
]

// function called to start the game
function startGame() {
	Game.render();
	Game.initialize();
}

//--------------------------------GAME------------------------------------------

var Game = {
	interval : 10, //the interval is every 1/100 seconds
	intervalMultiplier : 100,
	intervalCounter : 0,
	wave : 0,
	currentWaveData : null,
	waves : waves.length - 1,
	towers : [],
	enemies : [],
	enemiesToRemove : [],
	bullets : [],
	bulletsToRemove : [],

	gameLoop : null
}

Game.render = function() {
	// // construct the grid
	// $('.grid').css('display', 'block');
	// var html = "";
	// html += "<div class='row'>";
	// for (var j=-1; j<columns+1; j++) {
	// 	html += "<div class='spawn-space' id='-1_"+j+"'></div>";
	// }
	// html += "</div>";
	// for(var i=0; i<rows; i++) {
	// 	html += "<div class='row'>";
	// 	html += "<div class='spawn-space' id='"+i+"_-1'></div>"
	// 	for(var j=0; j<columns; j++) {
	//   		html += "<div class='game-space' id="+i+"_"+j+" onclick=Menu.show(0)></div>";
	// 	}
	// 	html += "<div class='spawn-space' id="+i+"_"+columns+"></div>"
	// 	html += "</div>";
	// }
	// html += "<div class='row'>";
	// for (var j=-1; j<columns+1; j++) {
	// 	html += "<div class='spawn-space' id="+rows+"_"+j+"'></div>";
	// }
	// html += "</div>";
	// //html += "<div class='viewframe'></div>";
	// $('.grid').html(html);

	// construct the grid
	$('.grid').css('display', 'block');
	var html = "";
	for(var i=0; i<rows+2; i++) {
		html += "<div class='row'>";
		for(var j=0; j<columns+2; j++) {
	  		html += "<div class='game-space' id="+i+"_"+j+" onclick=Menu.show(0)></div>";
		}
		html += "</div>";
	}
	//html += "<div class='viewframe'></div>";
	$('.grid').html(html);
}


Game.initialize = function() {
	Game.player = new Player();

	for(var i=0; i<rows+2; i++) {
		row = [];
		for(var j=0; j<columns+2; j++) {
			gridspace = new Gridspace(stringify(i, j));
			row.push(gridspace)
		}
		Grid.grid.push(row);
	}

	for (var i=0; i < activeGridspaces.length; i++) {
		gridspace = Grid.getGridspaceFromCoordinateString(activeGridspaces[i]);
		gridspace.setActive();
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
	Grid.spawnPoints.push(Grid.waypoints[0]);

	// begin the first intermission
	Game.beginIntermission();

	// enemy = new Enemy("-1_10", enemyIndex[0]);
	// enemy.setDestination(Grid.waypoints[0]);
}

Game.beginIntermission = function() {
	if (Game.didWin()) {
		alert("YOU WIN!");
	}
	window.clearInterval(Game.gameLoop);
	Game.intervalCounter = 0;
	Game.increaseWave();
}

Game.didWin = function() {
	return Game.wave == Game.waves;
}

Game.increaseWave = function() {
	Game.wave += 1;
	$("#wave-display").text("wave:" + Game.wave.toString());
	$("#start-wave-button").css("display", "block");
	Game.currentWaveData = waves[Game.wave];
}

Game.startWave = function() {
	// preload he correct wave of enemies
	$("#start-wave-button").css("display", "none");
	// run the game loop
	Game.runLoop();
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

	Game.intervalCounter += 1;

	//Movement of enemies / update visibilities to towers
	var enemy;
	for (var i = 0; i < Game.enemies.length; i++) {
		enemy = Game.enemies[i];
		enemy.approachDestination();
		enemy.updateVisibility();
	}

	//Rotation of Towers

	//Spawning of enemies
	for (var i = 0; i < Game.currentWaveData.length; i++) {
		if (Game.currentWaveData[i].length > 0 && Game.currentWaveData[i][0].spawnTime <= toSeconds(Game.intervalCounter)) {
			Game.createEnemy(Grid.spawnPoints[i],
				Game.currentWaveData[i][0].enemy.id,
				Game.currentWaveData[i][0].enemy.level);
			Game.currentWaveData[i].shift();
		}
	}

	//Towers shoot enemies
	for (var i = 0; i < Game.towers.length; i++) {
		Game.towers[i].loadShot();
	}
	for (var i = 0; i < Game.bullets.length; i++) {
		Game.bullets[i].approachDestination();
	}

	var enemyToRemove;
	var indexToRemove;
	for (var i = 0; i < Game.enemiesToRemove.length; i++) {
		enemyToRemove = Game.enemiesToRemove[i];
		indexToRemove = Game.enemies.indexOf(enemyToRemove);
		var newArr = Game.enemies.slice(0, indexToRemove).concat(Game.enemies.slice(indexToRemove + 1, Game.enemies.length));
		Game.enemies = newArr;

	}
	Game.enemiesToRemove = [];
	var bulletToRemove;
	var indexToRemove;
	for (var i = 0; i < Game.bulletsToRemove.length; i++) {
		bulletToRemove = Game.bulletsToRemove[i];
		indexToRemove = Game.bullets.indexOf(bulletToRemove);
		var newArr = Game.bullets.slice(0, indexToRemove).concat(Game.bullets.slice(indexToRemove + 1, Game.bullets.length));
		Game.bullets = newArr;
	}
	Game.bulletsToRemove = [];

	var waveEnd = true;
	for (var i = 0; i < Game.currentWaveData.length; i++) {
		if (Game.currentWaveData[i].length > 0) {
			waveEnd = false;
		}
	}
	if (Game.enemies.length > 0) {
		waveEnd = false;
	}
	if (waveEnd) {
		Game.beginIntermission();
	}
}

Game.createTower = function(coordinateString, type) {
	return new towerIndex[type](coordinateString);
	// return new Tower(coordinateString, towerIndex[type]);
}

Game.createEnemy = function(spawnPoint, type, level) {
	enemy = new enemyIndex[type](spawnPoint.gridspace.coordinateString, level);
	enemy.setDestination(spawnPoint.next);
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

function toSeconds(count) {
	return count / Game.intervalMultiplier;
}

