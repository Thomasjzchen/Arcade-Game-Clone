// Draw the enemy and player objects on the screen

Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Reset player to beginning position
Object.prototype.reset = function() {
  player.x = 200;
  player.y = 400;
}

// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    //x and y coordinates and movement speed
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 100);
}

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if(this.x <= 550){
          this.x += this.speed * dt;
      }else{
          this.x = -2;
      }

      //If the player comes within 30px of an enemy's x and y coordinates, reset the game
      if(player.x >= this.x - 30 && player.x <= this.x + 30){
          if(player.y >= this.y - 30 && player.y <= this.y + 30){
              this.reset();
          }
      }
}

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}

Player.prototype.update = function(){
    //if left key is pressed and player is not on edge of map, pressed decrement x
    if(this.ctlKey === 'left' && this.x > 0){
        this.x = this.x - 50;
    //if right key is pressed and player is not on edge of map increment x
    }else if(this.ctlKey === 'right' && this.x != 400){
        this.x = this.x + 50;
    //if up key is pressed increment y
    }else if(this.ctlKey === 'up'){
        this.y = this.y - 50;
    //if down key is pressed and player is not on edge of map decrement y
    }else if (this.ctlKey === 'down' && this.y != 400){
        this.y = this.y + 50;
    }
    this.ctlKey = null;

    //If on water, reset
    if(this.y < 25){
        this.reset();
    }
}

//Input handler for player
Player.prototype.handleInput = function(e){
    this.ctlKey = e;
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
(function setEnemies(){
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2,150));
    allEnemies.push(new Enemy(-2,220));
}());

var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
