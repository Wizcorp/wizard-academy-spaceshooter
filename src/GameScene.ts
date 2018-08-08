import { TimesteppedScene } from "./base/TimesteppedScene";

export class GameScene extends TimesteppedScene {
	private bg: Phaser.Sprite;

	preload() {
		this.game.load.image('bg', 'assets/bg.png');
		this.game.load.image('player', 'assets/player.png');
	}

	create() {
		this.bg = this.game.add.sprite(this.game.width, 0, 'bg');
	}

	fixedUpdate() {
		// Move 30 pixels/second left
		this.bg.x -= 30 * this.fixedDt;
	}
}
