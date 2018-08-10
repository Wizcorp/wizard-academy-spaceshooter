import TimesteppedScene from "./base/TimesteppedScene";

export default class GameScene extends TimesteppedScene {
	private player: Phaser.Sprite;

	preload() {
		this.game.load.image('player', 'assets/player.png');
	}

	create() {
		this.player = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'player');
		this.player.anchor.set(0.5, 0.5);
	}

	fixedUpdate() {
	}
}
