// width and height of grid blocks in pixels
var blockWidth = 101;
var blockHeight = 83;
var numRows = 6;
var numCols = 5;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';

    // position player in middle of bottom row.
    this.x = Math.floor(numCols / 2) * blockWidth;
    this.y = (numRows - 1.5) * blockHeight;
};


Player.prototype.update = function() {

};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//    console.log("PlayerX: " + this.x);
//    console.log("PlayerY: " + this.y);
};


Player.prototype.handleInput = function(input) {
    if(input == 'left') {
      if(this.x > 0) {
        this.x -= blockWidth;
      } else {
        Resources.get('sound/error.mp3').play();
      }
    } else if(input == 'right') {
      if(this.x < (numCols - 1) * blockWidth) {
        this.x += blockWidth;
      } else {
        Resources.get('sound/error.mp3').play();
      }
    } else if(input == 'up') {
      if(this.y > blockHeight / 2) {
        this.y -= blockHeight;
      } else {
        // Player has reached water. Reset to original position
        Resources.get('sound/splash.mp3').play();
        Resources.get('sound/yay.mp3').play();
        this.x = Math.floor(numCols / 2) * blockWidth;
        this.y = (numRows - 1.5) * blockHeight;
      }
    } else if(input == 'down') {
      if(this.y < (numRows - 1.5) * blockHeight) {
        this.y += blockHeight;
      } else {
        Resources.get('sound/error.mp3').play();
      }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numEnemies = 20;
var allEnemies = [];
var randY;
var randX;
var randSpeed;

for(var i = 0; i < numEnemies; i++) {
  // generate random Y position for enemy (will appear in one of three rows)
  randY = (Math.floor(Math.random()*3) * blockHeight) + blockHeight * 0.75;

  // generate random X position for enemy (starts off screen)
  randX = Math.floor(Math.random() * 1000) * - 1;

  // generate random speed for enemy (50, 100, 150, 200, 250)
  randSpeed = Math.floor(Math.random()*5 + 1) * 50;

  // add enemy to array
  allEnemies[i] = new Enemy(randX, randY, randSpeed);
}

var player = new Player();


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
