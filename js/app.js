class Creature {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.sprite = 'images/Key.png';
	}
	// Methods
	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt){
    // TODO: Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.	
	}
	// Draw the enemy on the screen, required method for game
	render () {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

// Enemies our player must avoid
class Enemy extends Creature {
	constructor(x,y) {
		super(x,y);
		this.sprite = 'images/enemy-bug.png';
		this.speed = Math.floor(Math.random() * 10)+5;;
	}
	update(dt){super.update(dt);}
	render(){super.render();}
	/* Functions for an Enemy */
	// reset enemy to random position on y
	resetObj(){
		this.x = -106;
		let yPositions = [68,151,234];
		this.y = yPositions[Math.floor(Math.random() * 3)];		
		this.speed = Math.floor(Math.random() * 10)+5;
	}
	// This is what makes enemy runs
	handleRun(){
		if (this.x < 506) {
			this.x += 2 * this.speed;
		}
		else
		{
			this.resetObj();
		}
	}
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Creature {
	constructor(x,y){
		super(x,y);
		this.sprite = 'images/char-boy.png';
	}
	update(dt){super.update(dt);}
	render(){super.render();}
	/* Functions for player */
	// Reset player to original point
	resetObj(){
		this.x = 200;
		this.y = 400;
	}
	// Move player with keyboard keys
	handleInput(key){
		if(key == 'left' && this.x > -4) {
			this.x -= 102;
		} 
		else if(key == 'right' && this.x < 404) {
			this.x += 102;
		} 
		else if(key == 'up' && this.y > -15){
			this.y -= 83;
		}
		else if(key == 'down' && this.y < 400){
			this.y += 83;
		}
		else {
		}
	}
}

// Instantiating objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200,400);
var enemy1 = new Enemy(-106,234,5);
var enemy2 = new Enemy(-106,151,5);
var enemy3 = new Enemy(-106,68,5);
var allEnemies = [enemy1,enemy2,enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Detects if collision happens between obj1 and obj2
function detectCollision(obj1,obj2){
	let result = false;
	if (obj1.y == obj2.y) {
		if (Math.abs(obj1.x - obj2.x) < 77) {
			result = true;
		}
	}
	return result;
}

// Tells if player wins
function detectWinner(obj){
	let result = (obj.y == -15) ? true : false;
	return result;
}

// A function to open modal message
// Source: W3Schools
function displayModal(){
	// Get the modal
	modal = document.getElementById('myModal');
	// Stop timer
	clearInterval(timer);
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	// Show the modal
	modal.style.display = "block";
}

// Restarting the game if player wins
function restartGame() {
	player.resetObj();
	enemy1.resetObj();
	enemy2.resetObj();
	enemy3.resetObj();
	document.getElementById('myModal').style.display = "none";
	startGame();
}

// Main function to start the game
function startGame() {
	timer = window.setInterval(function() {
		enemy1.handleRun();
		enemy2.handleRun();
		enemy3.handleRun();
		// Collision algorithm
		if (detectCollision(player,enemy1) || detectCollision(player,enemy2) || detectCollision(player,enemy3)) {
			player.resetObj();
		}
		else if (detectWinner(player)){
			displayModal();
		}
	}, 100);
}

startGame();