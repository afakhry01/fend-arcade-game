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
    // You should multiply any movement by the dt parameter
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
	constructor(x,y,speed) {
		super(x,y);
		this.sprite = 'images/enemy-bug.png';
		this.speed = speed;
	}
	update(dt){super.update(dt);}
	render(){super.render();}
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
	handleInput(key){
		if(key == 'left' && this.x > -4) {
			this.x -= 102;
			console.log(this.x);
		} 
		else if(key == 'right' && this.x < 404) {
			this.x += 102;
			console.log(this.x);
		} 
		else if(key == 'up' && this.y > -15){
			this.y -= 83;
			console.log(this.y);
		}
		else if(key == 'down' && this.y < 400){
			this.y += 83;
			console.log(this.y);
		}
		else {
			console.log("I cannot move");
		}
	}
}

var player = new Player(200,400);
var enemy1 = new Enemy(200,100,5);
var enemy2 = new Enemy(300,100,5);
var enemy3 = new Enemy(400,100,5);
var allEnemies = [enemy1,enemy2,enemy3];
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
