
$(document).ready(function() {

var player = $("#player");
var gameWindow = $("#game-window");
var width = gameWindow.width() - player.width();
var height = gameWindow.height() - player.height();
var enemy1 = $("#enemy1"), enemy2 = $("#enemy2"), enemy3 = $("#enemy3"), enemy4 = $("#enemy4"), enemy5 = $("#enemy5");
var eWidth = gameWindow.width() - enemy1.width();
var eHeight = gameWindow.height() - enemy1.height();
var direction;
var enemyD1, enemyD2, enemyD3, enemyD4, enemyD5;
var score = 0;
var fruit = $("#fruit");
var x;
var y;
var gameOver = 0;

var interval;

function start() {
	direction = 0;
	score = 0;
	player.css("top", "240px");
	player.css("left", "240px")
	fruit.remove();
	createFruit();
	setEnemies();
	interval = 	setInterval(function() {
		move(5, player, direction, width, height);
		enemyMove();
		touch(fruit, fruitTouch, 15, 15);
		enemyTouch();
		$("#score").text("Score: " + score);
	}, 50);
}

start();

function move(speed, obj, direction, w, h) {
	switch(direction) {
		case "left":
			left(speed, obj, w, h);
			break;
		case "right":
			right(speed, obj, w, h);
			break;
		case "up":
			up(speed, obj, w, h);
			break;
		case "down":
			down(speed, obj, w, h);
			break;
	}
}

function enemyMove() {
	move(9, enemy1, enemyD1, eWidth, eHeight);
	move(9, enemy2, enemyD2, eWidth, eHeight);
	move(9, enemy3, enemyD3, eWidth, eHeight);
	move(9, enemy4, enemyD4, eWidth, eHeight);
	move(9, enemy5, enemyD4, eWidth, eHeight);
}

function randPosition(max) {
  x = Math.floor(Math.random() * 1000);
  while (x >= max || (x >= 220 && x <= 260)) {
    x = Math.floor(Math.random() * 1000); 
  }
  y = Math.floor(Math.random() * 1000);
  while (y >= max || (y >= 220 && y <= 260)) {
    y = Math.floor(Math.random() * 1000); 
  }
}

function randDirection() {
	var number = Math.ceil(Math.random() * 10);
	while (number > 4) {
		number = Math.ceil(Math.random() * 10)
	}
  var enemyD;
	if (number === 1) enemyD = "left";
	else if (number === 2) enemyD = "right";
	else if (number === 3) enemyD = "up";
	else enemyD = "down";
	return enemyD;
}

function setEnemies() {
	randPosition(451);
	enemy1.css("left", x);
	enemy1.css("top", y);
	randPosition(451);
	enemy2.css("left", x);
	enemy2.css("top", y);
	randPosition(451);
	enemy3.css("left", x);
	enemy3.css("top", y);
	randPosition(451);
	enemy4.css("left", x);
	enemy4.css("top", y);
	randPosition(451);
	enemy5.css("left", x);
	enemy5.css("top", y);
	enemyD1 = randDirection();
	enemyD2 = randDirection();
	enemyD3 = randDirection();
	enemyD4 = randDirection();
	enemyD5 = randDirection();
}

function createFruit() {
	gameWindow.prepend("<div id='fruit'></div>");
	fruit = $("#fruit")
	randPosition(486);
	var fruitCSS = {
		"height": "15px",
		"width": "15px",
		"background-color": "purple",
		"border-radius": "50%",
		"position": "absolute",
		"top": y + "px",
		"left": x + "px"
	};
	fruit.css(fruitCSS);
}

function fruitTouch() {
	fruit.remove();
	score += 1;
	createFruit();
}

function enemyTouch() {
	touch(enemy1, enemyTouchAction, 20, 20);
	touch(enemy2, enemyTouchAction, 20, 20);
	touch(enemy3, enemyTouchAction, 20, 20);
	touch(enemy4, enemyTouchAction, 20, 20);
	touch(enemy5, enemyTouchAction, 20, 20);
}

function enemyTouchAction() {
	gameWindow.append("<div id ='game-over'><h2>Game Over!</h2><p>Press Enter to start new game...</p></div>");
	clearInterval(interval);
	gameOver = 1;
}

function touch(obj, action, w, h) {
	var playerPos = {x: player.position().left, y: player.position().top, width: 20, height: 20};
	var fruitPos = {x: obj.position().left, y: obj.position().top, width: w, height: h};
	if (fruitPos.x + fruitPos.width > playerPos.x &&
	playerPos.x + playerPos.width > fruitPos.x &&
  fruitPos.y + fruitPos.height > playerPos.y &&
  playerPos.height + playerPos.y > fruitPos.y) {
		action();
	}
}


function left(diff, obj, w, h) {
	if (!(obj.position().left <= 0))
		obj.css("left", (obj.position().left - diff) + "px");
	else
		obj.css("left", w);
}

function right(diff, obj, w, h) {
	if (!(obj.position().left >= w))
		obj.css("left", (obj.position().left + diff) + "px");
	else
		obj.css("left", "0px");
}

function up(diff, obj, w, h) {
	if (!(obj.position().top <= 0))
		obj.css("top", (obj.position().top - diff) + "px");
	else
		obj.css("top", h);
}

function down(diff, obj, w, h) {
	if (!(obj.position().top >= h))
		obj.css("top", (obj.position().top + diff) + "px");
	else
		obj.css("top", "0px");
}

$(window).keydown(function(e){
	switch(e.which) {
		case 37:
			direction = "left";
			break;
		case 38:
			direction = "up";
			break;
		case 39:
			direction = "right";
			break;
		case 40:
			direction = "down";
			break;
		case 13:
			if (gameOver === 1) {
				gameOver = 0;
				$("#game-over").remove();
				start();
			}
			break;
	}	
})



})
