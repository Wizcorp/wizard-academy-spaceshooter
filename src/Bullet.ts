namespace Spaceshooter {

	export class Bullet extends Phaser.Sprite {

		// Constructs a bullet which has an initial velocity (vx)
		constructor(game: Phaser.Game, x: number, y: number, vx: number) {

			super(game, x, y, 'bullet', 0);
			this.smoothed = false;

			this.game.physics.arcade.enableBody(this);

			game.add.existing(this);

			// Set the bullet to have the speed passed in parameter. Flip it if negative, since the sprite is looking right.
			this.body.velocity.x = vx;
			this.scale.x = vx > 0 ? 1 : -1;
			// Anchor it accordingly
			this.anchor.setTo(vx > 0 ? 0 : 1, 0.5);
		}

		// TODO Florian -- this should be a fixed step function! But I don't know how to do that in phaser.
		update() {
		}
	}
}
