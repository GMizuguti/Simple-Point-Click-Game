// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";








// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects

var monster = {
	x: 0,
	y: 0
};

var monstersCaught = 0;


// Respawns monster player catches a monster
var reset = function () {

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};



//mouse stuff
var xCord;
var yCord;


function getMousePosition(canvas, event) {
	let rect = canvas.getBoundingClientRect();
	xCord = event.clientX - rect.left;
	yCord = event.clientY - rect.top;
	console.log("Coordinate x: " + xCord,
		"Coordinate y: " + yCord);
}

let canvasElem = document.querySelector("canvas");

canvasElem.addEventListener("mousedown", function (e) {
	getMousePosition(canvasElem, e);
}); 


// Update game objects
var update = function (event) {
	// Are they touching?
	if (
		xCord <= (monster.x + 32)
		&& monster.x <= (xCord + 32)
		&& yCord <= (monster.y + 32)
		&& monster.y <= (yCord + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}


	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);


};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update();
	render();

	then = now;
	

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
