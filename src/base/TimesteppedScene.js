"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Phaser = require("phaser-ce");
const BASIC_DT = 1.0 / 60.0;
class TimesteppedScene extends Phaser.State {
    create() {
        this.lastUpdateTime = 0;
    }
    update() {
        let time = this.game.time.totalElapsedSeconds();
        if (!this.lastUpdateTime) {
            this.lastUpdateTime = time;
        }
        while (time - this.lastUpdateTime >= BASIC_DT) {
            this.fixedUpdate();
            this.lastUpdateTime += BASIC_DT;
        }
    }
    fixedUpdate() {
        console.log(`Please override fixedUpdate`);
    }
}
exports.TimesteppedScene = TimesteppedScene;
//# sourceMappingURL=TimesteppedScene.js.map