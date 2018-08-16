import TimesteppedScene from "./base/TimesteppedScene";

export default class MainScene extends TimesteppedScene {
	marioSprite: Phaser.Sprite;

	preload() {
		this.game.load.image('frame', 'assets/Frame.png');
		this.game.load.image('mario', 'assets/Mario-sprite.png');
	}

	create() {
		this.game.add.sprite(0, 0, 'frame');
		this.marioSprite = this.game.add.sprite(this.game.width / 2, this.game.height /2, 'mario');
	}

	fixedUpdate(dt: number) {
	}
}
