import TimesteppedScene from "./base/TimesteppedScene";

export default class TitleScene extends TimesteppedScene {
	private contentDiv: HTMLDivElement;
	private bg: Phaser.TileSprite;

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
		this.bg = this.game.add.tileSprite(0, 0, 398, 224, 'bg');

		// Title and start button
		this.contentDiv = document.querySelector('#divForUi') as HTMLDivElement;

		const title = document.createElement('div');
		title.className = 'titleText';
		title.textContent = 'Space shooter';
		this.contentDiv.appendChild(title);

		const button = document.createElement('button');
		button.className = 'startButton';
		button.appendChild(document.createTextNode("START"));
		this.contentDiv.appendChild(button);

		button.addEventListener('click', this.buttonOnClick.bind(this));
	}

	/**
	 * Ran when the scene is left (this.game.state.start('otherState')).
	 */
	shutdown() {
		// Remove all child nodes (title, button, etc.)
		while (this.contentDiv.hasChildNodes()) {
			this.contentDiv.removeChild(this.contentDiv.lastChild);
		}
	}

	/**
	 * Ran every frame (this.fixedDt).
	 */
	fixedUpdate(dt: number) {
		// Move 30 pixels/second left
		this.bg.tilePosition.x -= 30 * dt;

		// Skip to next scene with space or return
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.buttonOnClick();
		}
}

	/**
	 * Callback for button.
	 */
	buttonOnClick() {
		this.game.state.start('GameScene');
	}
}
