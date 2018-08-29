import TimesteppedScene from "./base/TimesteppedScene";

var turnedLeft = false;
var turnedRight = true;

export default class GameScene extends TimesteppedScene {
	private player: Phaser.Sprite;
	private background : Phaser.Sprite;

	preload() {
		this.game.load.image('player', 'assets/player.png');
		this.game.load.image('background','assets/background.jpg');
	}

	create() {
		this.setBackground();
		this.player = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'player');
		this.player.smoothed = false;
		this.player.anchor.set(0.5, 0.5);
		this.player.scale.set(2, 2);
	}

	fixedUpdate(dt: number) {

		if(this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			this.turnLeft();
		}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.E)){
			this.turnRight();
		}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.W) && this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
			this.goUpRight();
		}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.W) && this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
			this.goUpLeft();
		}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S) && this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
			this.goDownRight();
		}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S) && this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
			this.goDownLeft();
		}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.A)){
			this.goLeft();
		}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.D)){
			this.goRight();
		}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)){
			this.goUp();
		}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
			this.goDown();
		}
	}

	/**
	 * set background
	 */
	setBackground(){
		this.background = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'background');
		this.background.anchor.set(0.5, 0.5);
	}

	/**
	 * turn left
	 */
	turnLeft(){
		if(!turnedLeft){
			this.player.scale.set(-2, 2);
			this.player.anchor.set(-this.player.anchor.x,this.player.anchor.y);
			this.updatePlayerDir();
		}
	}

	/**
	 * turn right
	 */
	turnRight(){
		if(!turnedRight){
			this.player.scale.set(2, 2);
			this.player.anchor.set(-this.player.anchor.x,this.player.anchor.y);
			this.updatePlayerDir();
		}
	}

	/**
	 * update player direction
	 */
	updatePlayerDir(){
		if(!turnedLeft){
			turnedLeft = true;
			turnedRight = false;
		}else{
			turnedLeft = false;
			turnedRight = true;
		}
	}

	/**
	 * go Up left
	 */
	goUpLeft(){
		if(!this.checkUpBoundary() || !this.checkLeftBoundary())
			return;

		if(turnedRight)
			this.player.anchor.set(this.player.anchor.x + 0.1, this.player.anchor.y + 0.1);
		else
			this.player.anchor.set(this.player.anchor.x - 0.1, this.player.anchor.y + 0.1);
	}

	/**
	 * go Up right
	 */
	goUpRight(){
		if(!this.checkUpBoundary() || !this.checkRightBoundary())
			return;

		if(turnedRight)
			this.player.anchor.set(this.player.anchor.x - 0.1, this.player.anchor.y + 0.1);
		else
			this.player.anchor.set(this.player.anchor.x + 0.1, this.player.anchor.y + 0.1);
	}

	/**
	 * go down left
	 */
	goDownLeft(){
		if(!this.checkDownBoundary() || !this.checkLeftBoundary())
			return;

		if(turnedRight)
			this.player.anchor.set(this.player.anchor.x + 0.1, this.player.anchor.y - 0.1);
		else
			this.player.anchor.set(this.player.anchor.x - 0.1, this.player.anchor.y - 0.1);
	}

	/**
	 * go Down Right
	 */
	goDownRight(){
		if(!this.checkDownBoundary() || !this.checkRightBoundary())
			return;

		if(turnedRight)
			this.player.anchor.set(this.player.anchor.x - 0.1, this.player.anchor.y - 0.1);
		else
			this.player.anchor.set(this.player.anchor.x + 0.1, this.player.anchor.y - 0.1);
	}

	/**
	 * go left
	 */
	goLeft(){
		if(!this.checkLeftBoundary())
			return;

		if(!turnedLeft)
			this.player.anchor.set(this.player.anchor.x +0.1, this.player.anchor.y);
		else
			this.player.anchor.set(this.player.anchor.x -0.1, this.player.anchor.y);
	}

	/**
	 * go right
	 */
	goRight(){
		if(!this.checkRightBoundary())
			return;

		if(turnedRight)
			this.player.anchor.set(this.player.anchor.x -0.1, this.player.anchor.y);
		else
			this.player.anchor.set(this.player.anchor.x +0.1, this.player.anchor.y);
	}

	/**
	 * go UP
	 */
	goUp(){
		if(!this.checkUpBoundary())
			return;

		this.player.anchor.set(this.player.anchor.x, this.player.anchor.y + 0.1);
	}

	/**
	 * go Down
	 */
	goDown(){
		if(!this.checkDownBoundary())
			return;

		this.player.anchor.set(this.player.anchor.x, this.player.anchor.y - 0.1);
	}

	/**
	 * check Up boundary
	 */
	checkUpBoundary(){
		if(this.player.anchor.y < 7.4)
			return true;
		else
			return false;
	}

	/**
	 * check Down boundary
	 */
	checkDownBoundary(){
		if(this.player.anchor.y > -6.6)
			return true;
		else
			return false;
	}

	/**
	 * check left boundary
	 */
	checkLeftBoundary(){
		if(this.player.anchor.x < 8.5)
			return true;
		else
			return false;
	}

	/**
	 * check right boundary
	 */
	checkRightBoundary(){
		if(this.player.anchor.x > -7.5)
			return true;
		else
			return false;
	}
}
