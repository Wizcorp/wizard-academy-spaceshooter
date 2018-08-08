import { Bullet } from "./Bullet";

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
	}

	fixedUpdate() {
		if (!this.destroyed) {
			this.body.velocity = this.behaviour.movementFunc();
		}
	}

	hasBeenHitByBullet(bullet: Bullet) {
		// Already dead? Do not eat another bullet / restart the animation.
		if (this.destroyed) {
			return;
		}
		this.destroyed = true;

		// Play a destroy animation and kill ourselves
		this.animations.play('destroyed');
		this.body.velocity.x = this.body.velocity.y = 0;
		this.animations.currentAnim.onComplete.add(() => {
			this.destroy(true);
		});

		// Destroy the bullet too
		bullet.destroy(true);
	}
}
