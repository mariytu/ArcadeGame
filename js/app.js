//
const widthImage = 101;
const heightImage = 83;
const numRows = 6;
const numCols = 5;
const maxEnemies = 5;
const movesForStar = 15;
let moves = 0;
let stars = 3;
const myTimer = new Timer();
let player;
let allEnemies;


/**
 * @name Enemy
 * @constructor
 * @module Enemy
 * @description contains all variables for the enemy object. Enemies our player must avoid
 */
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init();
};

/**
 * @name init
 * @module Enemy
 * @description Initializes the position and speed of the enemy;
 */
Enemy.prototype.init = function() {
	this.x = 0;
	this.y = Math.floor(Math.random() * (4 - 1) + 1);
	this.speed = Math.floor(Math.random() * 5) + 1;
}

/**
 * @name update
 * @module Enemy
 * @description Update the enemy's position, required method for game
 * @param dt a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 6) {
    	this.x += this.speed * dt;
    } else {
    	this.init();
    }
};

/**
 * @name render
 * @module Enemy
 * @description Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * widthImage, this.y * heightImage - 20);
};

/**
 * @name Player
 * @constructor
 * @module Player
 * @description contains all variables for the player object.
 */
var Player = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.init();
};

/**
 * @name init
 * @module Player
 * @description Initializes the position and speed of the enemy;
 */
Player.prototype.init = function() {
	this.x = 2;
	this.y = 5;
};

/**
 * @name update
 * @module Player
 * @description Update the enemy's position, required method for game
 * @param dt a time delta between ticks
 */
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.y === 0) {
    	launchModal();
    }
};

/**
 * @name render
 * @module Player
 * @description Draw the player on the screen, required method for game
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * widthImage, this.y * heightImage - 30);
};

/**
 * @name handleInput
 * @module Player
 * @description 
 */
Player.prototype.handleInput = function(key) {
    if (key !== undefined) {
		if (key === 'left') {
			if ((player.x - 1) >= 0) { //validating if it is a movement within the ranges of the matrix
				player.x = player.x - 1;
				updateMoves();
				updateStar();
			}
		}
		else if (key === 'up') {
			if ((player.y - 1) >= 0) { //validating if it is a movement within the ranges of the matrix
				player.y = player.y - 1;
				updateMoves();
				updateStar();
			}
		}
		else if (key === 'right') {
			if ((player.x + 1) < numCols) { //validating if it is a movement within the ranges of the matrix
				player.x = player.x + 1;
				updateMoves();
				updateStar();
			}
		}
		else if (key === 'down') {
			if ((player.y + 1) < numRows) { //validating if it is a movement within the ranges of the matrix
				player.y = player.y + 1;
				updateMoves();
				updateStar();
			}
		}
		player.render();
	}
};

/**
* @name launchModal
* @description Launch the congrats modal with play again button.
*/
function launchModal() {
	
	//const time = myTimer.getTimeValues().toString();
	myTimer.stop();
	
	const textMessage = `With ${moves} moves and ${stars} stars.
						Woooo!!`;
	
	swal({
		title: "Congratulations! You Won!",
		text: textMessage,
		type: "success",
		confirmButtonColor: "#1ab394",
		confirmButtonText: "Play again!"
	},
	function (isConfirm) {
		init();
	});	
}

/**
* @name updateMoves
* @description Increase the moves counter and update this in the front end
*/
function updateMoves() {
    moves++;
    const movesContainer = document.querySelector('.moves');
    movesContainer.textContent = moves;
}

/**
* @name updateStar
* @description Update the star count if the moves pass some value. If this occurs, so the counter in 
* the front end are updated
*/
function updateStar() {
	if (moves % movesForStar == 0) {
		const auxStar = stars - 1;
		if (auxStar > 0) {
			stars--;
			const remainingStars = document.querySelectorAll('.stars .fa-star');
			remainingStars[remainingStars.length - 1].className = 'fa fa-star-o';
		}
	}	
}

/**
* @description Init the elements at score panel
*/
function initElements() {
	//init for moves
	const movesContainer = document.querySelector('.moves');
	movesContainer.textContent = moves;
	
	//init for stars
	const allStars = document.querySelectorAll('.stars .fa');
	for (const star of allStars) {
		star.className = 'fa fa-star';
	}
}

/**
* @name init
* @description Init the default values for moves and star. Now instantiate your objects.
* Place all enemy objects in an array called allEnemies
* Place the player object in a variable called player
*/
function init() {
	moves = 0;
	stars = 3;

	myTimer.reset();
	document.querySelector('#timer').innerHTML = myTimer.getTimeValues().toString();
	myTimer.start();

	initElements();

	player = new Player();
	allEnemies = [];

	for (var i = 0; i < maxEnemies; i++) {
		allEnemies.push(new Enemy());
	}
}

/**
* @name addEventListener
* @description This listens for key presses and sends the keys to your
* Player.handleInput() method. You don't need to modify this.
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

myTimer.addEventListener('secondsUpdated', function (e) {
	document.querySelector('#timer').innerHTML = myTimer.getTimeValues().toString();
});

this.init();