import TimesteppedScene from "./base/TimesteppedScene";

type Vector2 = { x: number, y: number };

function addVectors(a: Vector2, b: Vector2): Vector2 {
	return { x: a.x + b.x, y: a.y + b.y };
}

function multVector(a: Vector2, s: number): Vector2 {
	return { x: a.x * s, y: a.y * s };
}

export default class MainScene extends TimesteppedScene {
	marioSprite: Phaser.Sprite;
	velocity: Vector2;
	position: Vector2;

	preload() {
		this.game.load.image('frame', 'assets/Frame.png');
		this.game.load.image('mario', 'assets/Mario-sprite.png');
	}

	create() {
		this.game.add.sprite(0, 0, 'frame');
		this.marioSprite = new Phaser.Sprite(this.game, this.game.width / 2, 0, 'mario');
		this.game.add.existing(this.marioSprite);

		this.velocity = { x: 0, y: 0 };
		this.position = { x: this.marioSprite.x, y: this.marioSprite.y };
	}

	fixedUpdate(dt: number) {
		const Gravity = { x: 0, y: 720 };
		const JumpImpulse = { x: 0, y: -480 };

		// When we are on the ground, we allow to jump!
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.velocity = JumpImpulse;
		}

		// Gravity is a force that is applied always
		this.velocity = addVectors(this.velocity, multVector(Gravity, dt));

		// Integrate velocity into position
		this.position = addVectors(this.position, multVector(this.velocity, dt));

		// When we hit the ground, we bring Mario back and reset the velocity (stabilize)
		if (this.position.y + this.marioSprite.height >= this.game.height) {
			this.position.y = this.game.height - this.marioSprite.height;
			this.velocity.y = 0;
		}

		// Position Mario on the screen
		this.marioSprite.x = this.position.x;
		this.marioSprite.y = this.position.y;
	}

}
