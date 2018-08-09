import TimesteppedScene from "./base/TimesteppedScene";

export default class TitleScene extends TimesteppedScene {

	/**
	 * Load sprites and various assets here.
	 */
	preload() {
		this.game.load.image('bg', 'assets/bg.png');
		this.game.load.spritesheet('startButton', 'assets/startButton.png', 200, 40);
	}

	/**
	 * Ran once at initialization.
	 */
	create() {
		// Background
		this.game.add.sprite(0, 0, 'bg');

		// Start button
		this.game.add.button(this.game.world.centerX - 100, this.game.world.centerY - 20, 'startButton', this.buttonOnClick, this, 2, 0, 1);
	}

	/**
	 * Ran every frame (this.fixedDt).
	 */
	fixedUpdate() {
	}

	/**
	 * Callback for button.
	 */
	buttonOnClick() {
		this.game.state.start('GameScene');
	}
}
