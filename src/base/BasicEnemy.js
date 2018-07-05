"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Phaser = require("phaser-ce");
class EnemyBehaviourDesc {
    constructor(movementFunc) {
        this.movementFunc = movementFunc;
    }
}
exports.EnemyBehaviourDesc = EnemyBehaviourDesc;
class BasicEnemy extends Phaser.Sprite {
    constructor(game, x, y, behaviourDesc) {
        super(game, x, y, 'basicenemy');
        this.destroyed = false;
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
    hasBeenHitByBullet(bullet) {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.animations.play('destroyed');
        this.body.velocity.x = this.body.velocity.y = 0;
        this.animations.currentAnim.onComplete.add(() => {
            this.destroy(true);
        });
        bullet.destroy(true);
    }
}
exports.BasicEnemy = BasicEnemy;
//# sourceMappingURL=BasicEnemy.js.map