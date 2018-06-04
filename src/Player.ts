namespace Spaceshooter {
    enum AnimationState {
        normal = 'normal',
        upwards = 'upwards',
        downwards = 'downwards',
        destroyed = 'destroyed',
    }

    export class Player extends Phaser.Sprite {
        static readonly TargetSpeed = 150;
        static readonly AccelerationMultiplier = 0.2;
        currentState: AnimationState

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'player', 0);

            this.game.physics.arcade.enableBody(this);

            this.anchor.setTo(0.5, 0.5);

            this.animations.add(AnimationState.normal, [0], 0, false);
            this.animations.add(AnimationState.upwards, [1], 0, false);
            this.animations.add(AnimationState.downwards, [2], 0, false);
            this.animations.add(AnimationState.destroyed, [3, 4, 5, 6], 3, true);

            game.add.existing(this);

            this.body.velocity.x = 0;
        }

        // TODO Florian -- this should be a fixed step function! But I don't know how to do that in phaser.
        update() {
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
        }

        setState(state: AnimationState) {
            if (state !== this.currentState) {
                this.currentState = state;
                this.animations.play(this.currentState);
            }
        }

    }
}
