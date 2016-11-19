// width and height of grid blocks in pixels
var blockWidth = 101;
var blockHeight = 83;

// number of rows & columns
var numRows = 6;
var numCols = 5;

// Enemies our player must avoid
// Parameter: x, x position of enemy
// Parameter: y, y position of enemy
// Parameter: speed, speed of enemy
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The player avatar
var Player = function() {

    // The image/sprite for our player
    this.sprite = 'images/char-princess-girl.png';

    // Position player in middle of bottom row to start
    this.x = Math.floor(numCols / 2) * blockWidth;
    this.y = (numRows - 1.5) * blockHeight;
};


Player.prototype.update = function() {
  /* I'm not sure how this is supposed to be used …
  * Changes to the player's position are handled
  * by my handleInput method. I tried calling update()
  * from handleInput(), and passing arguments for the
  * new x/y position. But then engine.js would also
  * have to pass arguments to this functions. In the
  * end, I decided to do everything in handleInput();
  */
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the player's position based on keyboard input
/* Parameter: input, a string ('left', 'right', 'up', or 'down')
*  representing the arrow key that was pressed */
Player.prototype.handleInput = function(input) {
  /* For each direction, we check to see if the
  * move would keep the player within the canvas. If
  * so, we update the player position. Otherwise,
  * the player does not move and the 'error'
  * sound plays. */
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
        // Player has reached water. Reset to original position.
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


// Instantiate enemies
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

// Instantiate player object
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
