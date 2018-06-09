namespace Spaceshooter {
	enum AnimationState {
		normal = 'normal',
		upwards = 'upwards',
		downwards = 'downwards',
		destroyed = 'destroyed',
	}

	export class Player extends Phaser.Sprite {
		static readonly TargetSpeed = 150;
		static readonly ShotBulletSpeed = 300;
		static readonly AccelerationMultiplier = 0.2;
		static readonly BulletRepeatDelayMs = 200;

		// Keep in order to communicate with root
		scene: GameScene;

		currentState: AnimationState;
		lastShotAt: number;

		constructor(scene: GameScene, x: number, y: number) {
			super(scene.game, x, y, 'player', 0);
			this.smoothed = false;

			this.game.physics.arcade.enableBody(this);

			this.anchor.setTo(0.5, 0.5);

			this.animations.add(AnimationState.normal, [0], 0, true);
			this.animations.add(AnimationState.upwards, [1], 0, true);
			this.animations.add(AnimationState.downwards, [2], 0, true);
			this.animations.add(AnimationState.destroyed, [3, 4, 5, 6], 6, false);

			this.scene = scene;
			this.lastShotAt = this.game.time.now;
		}

		// TODO Florian -- this should be a fixed step function! But I don't know how to do that in phaser.
		update() {
			// Nothing to do when dead
			if (this.currentState === AnimationState.destroyed) {
				return;
			}

			let targetVX = 0, targetVY = 0;

			// Move the ship with input
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				targetVX = -Player.TargetSpeed
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				targetVX = +Player.TargetSpeed
			}

			if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				targetVY = -Player.TargetSpeed
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
				targetVY = +Player.TargetSpeed
			}

			// Apply acceleration to velocity
			this.body.velocity.x += (targetVX - this.body.velocity.x) * Player.AccelerationMultiplier;
			this.body.velocity.y += (targetVY - this.body.velocity.y) * Player.AccelerationMultiplier;

			// Right animation type depending on velocity
			if (this.body.velocity.y >= Player.TargetSpeed * 0.9) {
				this.setState(AnimationState.upwards);
			} else if (this.body.velocity.y <= -Player.TargetSpeed * 0.9) {
				this.setState(AnimationState.downwards);
			} else {
				this.setState(AnimationState.normal);
			}

			// Bullet shooting support
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) &&
				this.game.time.now - this.lastShotAt >= Player.BulletRepeatDelayMs)
			{
				// Shoot from the right part of our ship
				this.scene.spawnPlayerBullet(this.x + this.width / 2, this.y, Player.ShotBulletSpeed);
				this.lastShotAt = this.game.time.now;
			}

		}

		setState(state: AnimationState) {
			if (state !== this.currentState) {
				this.currentState = state;
				this.animations.play(this.currentState);
			}
		}

		hasBeenHitByEnemy(enemy: BasicEnemy) {
			if (this.currentState === AnimationState.destroyed) {
				return;
			}
			this.currentState = AnimationState.destroyed;

			// Play a destroy animation and kill ourselves
			this.animations.play(AnimationState.destroyed);
			this.animations.currentAnim.onComplete.add(() => {
				this.scene.playerHasDied(this);
			});
			this.body.velocity.x = this.body.velocity.y = 0;
		}
	}
}
