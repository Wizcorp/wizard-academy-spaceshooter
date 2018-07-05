"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Phaser = require("phaser-ce");
class Bullet extends Phaser.Sprite {
    constructor(game, x, y, vx) {
        super(game, x, y, 'bullet', 0);
        this.smoothed = false;
        this.game.physics.arcade.enableBody(this);
        this.body.velocity.x = vx;
        this.scale.x = vx > 0 ? 1 : -1;
        this.anchor.setTo(vx > 0 ? 0 : 1, 0.5);
    }
    fixedUpdate() {
    }
    hitAWall() {
        this.destroy(true);
    }
}
exports.Bullet = Bullet;
//# sourceMappingURL=Bullet.js.map