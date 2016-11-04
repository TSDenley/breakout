var mainState = {
  preload: function() {
    game.load.image('paddle', 'assets/paddle.png');
    game.load.image('brick', 'assets/brick.png');
    game.load.image('ball', 'assets/ball.png');
  },

  create: function() {
    game.stage.backgroundColor = '#000';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

    // Controls
    this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    // Paddle
    this.paddle = game.add.sprite(160, 400, 'paddle');
    this.paddle.body.immovable = true;
    this.paddle.body.collideWorldBounds = true;

    // Bricks
    this.bricks = game.add.group();

    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        var brick = game.add.sprite(65 + i * 60, 55 + j * 36, 'brick');
        brick.body.immovable = true;
        this.bricks.add(brick);
      }
    }

    // Ball
    this.ball = game.add.sprite(100, 220, 'ball');
    this.ball.body.velocity.x = 200;
    this.ball.body.velocity.y = 200;
    this.ball.body.bounce.setTo(1);
    this.ball.body.collideWorldBounds = true;
  },

  update: function() {
    // Move paddle when keys are pressed
    if (this.left.isDown) {
      this.paddle.body.velocity.x = -300;
    } else if (this.right.isDown) {
      this.paddle.body.velocity.x = 300;
    } else {
      this.paddle.body.velocity.x = 0;
    }

    // Ball/paddle collision
    game.physics.arcade.collide(this.paddle, this.ball);
    // Remove brick when hit by ball
    game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

    // Restart the game if the ball goes below the paddle
    if (this.ball.y > this.paddle.y) {
      game.state.start('main');
    }
  },

  hit: function(ball, brick) {
    brick.kill();
  }
};


var game = new Phaser.Game(400, 450);
game.state.add('main', mainState);
game.state.start('main');
