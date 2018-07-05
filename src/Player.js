"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimationState;
(function (AnimationState) {
    AnimationState["normal"] = "normal";
    AnimationState["upwards"] = "upwards";
    AnimationState["downwards"] = "downwards";
    AnimationState["destroyed"] = "destroyed";
})(AnimationState || (AnimationState = {}));
class Player extends Phaser.Sprite {
    constructor(scene, x, y) {
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
    fixedUpdate() {
        if (this.currentState === AnimationState.destroyed) {
            return;
        }
        let targetVX = 0, targetVY = 0;
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            targetVX = -Player.TargetSpeed;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            targetVX = +Player.TargetSpeed;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            targetVY = -Player.TargetSpeed;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            targetVY = +Player.TargetSpeed;
        }
        this.body.velocity.x += (targetVX - this.body.velocity.x) * Player.AccelerationMultiplier;
        this.body.velocity.y += (targetVY - this.body.velocity.y) * Player.AccelerationMultiplier;
        if (this.body.velocity.y >= Player.TargetSpeed * 0.9) {
            this.setState(AnimationState.upwards);
        }
        else if (this.body.velocity.y <= -Player.TargetSpeed * 0.9) {
            this.setState(AnimationState.downwards);
        }
        else {
            this.setState(AnimationState.normal);
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) &&
            this.game.time.now - this.lastShotAt >= Player.BulletRepeatDelayMs) {
            this.scene.spawnPlayerBullet(this.x + this.width / 2, this.y, Player.ShotBulletSpeed);
            this.lastShotAt = this.game.time.now;
        }
        this.x = Math.max(this.x, this.scene.cameraOffset + this.width / 2);
    }
    setState(state) {
        if (state !== this.currentState) {
            this.currentState = state;
            this.animations.play(this.currentState);
        }
    }
    hasBeenHitByEnemy(enemy) {
        if (this.currentState === AnimationState.destroyed) {
            return;
        }
        this.currentState = AnimationState.destroyed;
        this.animations.play(AnimationState.destroyed);
        this.animations.currentAnim.onComplete.add(() => {
            this.scene.playerHasDied(this);
        });
        this.body.velocity.x = this.body.velocity.y = 0;
    }
}
Player.TargetSpeed = 150;
Player.ShotBulletSpeed = 300;
Player.AccelerationMultiplier = 0.2;
Player.BulletRepeatDelayMs = 200;
exports.Player = Player;
//# sourceMappingURL=Player.js.map