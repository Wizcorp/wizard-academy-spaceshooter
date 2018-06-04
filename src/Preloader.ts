module Spaceshooter {

	export class Preloader extends Phaser.State {

		preloadBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {
			//	These are the assets we loaded in Boot.js
			this.preloadBar = this.add.sprite(300, 400, 'preloadBar');

			//	This sets the preloadBar sprite as a loader sprite.
			//	What that does is automatically crop the sprite from 0 to full-width
			//	as the files below are loaded in.
			this.load.setPreloadSprite(this.preloadBar);
		}

		create() {
			this.game.state.start('MainGame');
		}
	}
}