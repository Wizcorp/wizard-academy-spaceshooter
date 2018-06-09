module Spaceshooter {

	export class GameScene extends Phaser.State {
		background: Phaser.Sprite;
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
			this.game.add.existing(this.player);

			// Move the enemy 100 pixels left per second
			const simpleMovement = () => {
				// Return the velocity of the enemy
				return new Phaser.Point(-100, 0);
			};
			const behaviour = new EnemyBehaviourDesc(simpleMovement);
			const enemy = new BasicEnemy(this.game, this.game.width, this.game.height /2, behaviour);
			this.enemies.push(enemy);
			this.game.add.existing(enemy);
		}

		update() {
			for (const enemy of this.enemies) {
				// Check collisions between bullets and enemies
				for (const bullet of this.bullets) {
					if (this.game.physics.arcade.overlap(bullet, enemy)) {
						enemy.hasBeenHitByBullet(bullet);
					}
				}

				// And also players vs the enemy
				if (this.game.physics.arcade.overlap(this.player, enemy)) {
					this.player.hasBeenHitByEnemy(enemy);
				}
			}
		}

		fadeOut() {
			this.camera.fade(0, 1 * Phaser.Timer.SECOND);
			this.camera.onFadeComplete.add(() => {
				// Reboot game for now
				this.game.state.start('Boot');
			});
		}

		playerHasDied(player: Player) {
			// One second later, fade out
			this.game.time.events.add(1 * Phaser.Timer.SECOND, () => {
				this.fadeOut();
			});
		}

		spawnPlayerBullet(x: number, y: number, shotBulletSpeed: number) {
			const bullet = new Bullet(this.game, x, y, shotBulletSpeed);
			this.game.add.existing(bullet);
			this.bullets.push(bullet);
		}
	}
}