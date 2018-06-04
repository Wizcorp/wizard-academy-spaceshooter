module Spaceshooter {

	export class Game extends Phaser.Game {

		constructor() {
			super(960/2, 540/2, Phaser.AUTO, 'content', null);

			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('MainGame', MainGame, false);

			this.state.start('Boot');
		}

	}

}