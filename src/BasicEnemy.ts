namespace Spaceshooter {

	export class EnemyBehaviourDesc {
		movementFunc: () => Phaser.Point;

		constructor(movementFunc: () => Phaser.Point) {
			this.movementFunc = movementFunc;
		}
	}

	export class BasicEnemy extends Phaser.Sprite {
		behaviour: EnemyBehaviourDesc;
		destroyed: boolean = false;


		constructor(game: Phaser.Game, x: number, y: number, behaviourDesc: EnemyBehaviourDesc) {
			super(game, x, y, 'basicenemy');
			this.smoothed = false;

			this.game.physics.arcade.enableBody(this);
			this.anchor.setTo(0.5, 0.5);
			this.animations.add('normal', [0, 1, 2, 1], 8, true);
			this.animations.add('destroyed', [3, 4, 5], 4, false);

			this.behaviour = behaviourDesc;
			this.animations.play('normal');

			game.add.existing(this);
		}

		// TODO Florian -- this should be a fixed step function! But I don't know how to do that in phaser.
		update() {
			if (this.destroyed) {
				this.body.velocity.x = this.body.velocity.y = 0;
				return;
			}

			this.body.velocity = this.behaviour.movementFunc();
		}

		hasBeenHitByBullet(bullet: Spaceshooter.Bullet) {
			this.destroyed = true;
			this.animations.play('destroyed');
			this.animations.currentAnim.onComplete.add(() => {
				this.destroy(true);
			});
		}
	}
}
