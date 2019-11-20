let score =0;
let scoreElement;
 window.onload=function(){
    document.getElementById("score");
}
// Enemies our player must avoid
class Enemy{
    constructor (x,y,speed) {
        this.x =x;
        this.y=y;
        this.sprite= 'images/enemy-bug.png';
        this.boundry =this.step*5;
        this.step=101;
        this.resetPos=-this.step;
        this.speed=Math.random()*  300 + 100;
    }
    update(dt) {
        //to ensure the game runs at the same speed for all computer       
      
       
       if (this.x >550){
        this.x = -100;
       }
        //multiply any movement by the dt parameter
        this.x +=this.speed * dt;

    }
    render() {
        // Draw the enemy on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
    }
}



// Now write our own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{ 
    constructor(x,y){
        this.x =x;
        this.y=y;
        this.startX=this.x;
        this.startY=this.y;
        this.sprite= 'images/char-princess-girl.png';

    }
    update(dt) {
        for (let enemy of allEnemies) {
            let xx = this.x -enemy.x;
            let yy= this.y-enemy.y;
            let distance =Math.sqrt(xx*xx + yy*yy);
            //collision happen
            if(distance <56 /2) {
                collide =true;
                //restart
                this.reset();
            }

        }
        //if player win
        if(this.y<0) {
            this.x=200;
            this.y=300;
            //increase score
            score += 1;
            const scoreElement = document.querySelector(".score");
            scoreElement.innerText = score;


        }

    }
    render() {
        // Draw the player on the screen, required method for game
        ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
    }

    //to make sure player will play on the exact boundry
    handleInput (direction) {
        switch (direction){
            case 'up' :
              if (this.y>0) {this.y -= 83;} 
              break

            case 'down' :
              if (this.y<300) {this.y += 83}; 
              break

            case 'right' :
              if (this.x < 400) {this.x += 101;} 
              break

            case 'left' :
              if (this.x>0) {this.x -= 101;} 
              break

            default :
              break;

        }
        console.log(this.y);
    }
    reset(){
        this.x=this.startX;
        this.y=this.startY;
    }
}


// Now instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy (100,55);
let enemy2 = new Enemy (100,138);
let enemy3 = new Enemy (100,221);
let allEnemies = [enemy1, enemy2, enemy3];
let player = new Player (200, 300);
let collide =0;


// This listens for key presses and sends the keys to
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
