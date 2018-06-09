module Spaceshooter {

	export class GameScene extends Phaser.State {

		player: Player;
		// We need to keep track of that to enable collisions to be handled at the root
		bullets: Bullet[] = [];
		enemies: BasicEnemy[] = [];

		preload() {
			this.load.spritesheet('player', 'assets/player.png', 32, 16);
			this.load.image('bullet', 'assets/bullet.png');
			this.load.spritesheet('basicenemy', 'assets/basicenemy.png', 16, 16);
		}

		create() {
			this.player = new Player(this, this.game.width/2, this.game.height/2);

			const behaviour2 = new EnemyBehaviourDesc(() => new Phaser.Point(-50, 0));

			// Move the enemy 100 pixels left per second
			const simpleMovement = () => {
				// Return the velocity of the enemy
				return new Phaser.Point(-100, 0);
			};
			const behaviour = new EnemyBehaviourDesc(simpleMovement);

			this.enemies.push(new BasicEnemy(this.game, this.game.width, this.game.height /2, behaviour));
		}

		update() {
			// Check collisions between bullets and enemies
			for (const bullet of this.bullets) {
				for (const enemy of this.enemies) {
					if (this.game.physics.arcade.overlap(bullet, enemy)) {
						enemy.hasBeenHitByBullet(bullet);
					}
				}
			}
		}

		spawnPlayerBullet(x: number, y: number, shotBulletSpeed: number) {
			const bullet = new Bullet(this.game, x, y, shotBulletSpeed);
			this.bullets.push(bullet);
		}
	}
}