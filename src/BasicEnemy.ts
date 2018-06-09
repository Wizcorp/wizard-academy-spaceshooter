namespace Spaceshooter {

	enum EnemyAnimationState {
		normal = 'normal',
		destroyed = 'destroyed',
	}

	export class EnemyBehaviourDesc {
		movementFunc: () => Phaser.Point;

		constructor(movementFunc: () => Phaser.Point) {
			this.movementFunc = movementFunc;
		}
	}

	export class BasicEnemy extends Phaser.Sprite {
		behaviour: EnemyBehaviourDesc;
		animationState: EnemyAnimationState;


		constructor(game: Phaser.Game, x: number, y: number, behaviourDesc: EnemyBehaviourDesc) {
			super(game, x, y, 'basicenemy');
			this.smoothed = false;

			this.game.physics.arcade.enableBody(this);
			this.anchor.setTo(0.5, 0.5);
			this.animations.add(EnemyAnimationState.normal, [0, 1, 2, 1], 8, true);
			this.animations.add(EnemyAnimationState.destroyed, [3, 4, 5], 3, false);

			this.behaviour = behaviourDesc;
			this.setState(EnemyAnimationState.normal);

			game.add.existing(this);
		}

		// TODO Florian -- this should be a fixed step function! But I don't know how to do that in phaser.
		update() {
			const result = this.behaviour.movementFunc();
			this.body.velocity = result;
		}

		setState(state: EnemyAnimationState) {
			if (state !== this.animationState) {
				this.animationState= state;
				this.animations.play(this.animationState);
			}
		}
	}
}
