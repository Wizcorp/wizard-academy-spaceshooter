module Spaceshooter {

	export class MainGame extends Phaser.State {

		// background: Phaser.Sprite;
		// logo: Phaser.Sprite;
		// music: Phaser.Sound;
		player: Player;

		preload() {
			this.load.spritesheet('player', 'assets/player.png', 32, 16);
			this.load.image('bullet', 'assets/bullet.png');
			this.load.spritesheet('basicenemy', 'assets/basicenemy.png', 16, 16);
		}

		create() {
			this.player = new Player(this.game, this.game.width/2, this.game.height/2);

			// Move the enemy 100 pixels left per second
			const simpleMovement = () => {
				// Return the velocity of the enemy
				return new Phaser.Point(-100, 0);
			};
			const behaviour = new EnemyBehaviourDesc(simpleMovement);
			const enemy = new BasicEnemy(this.game, this.game.width, this.game.height /2, behaviour)
		}
	}
}