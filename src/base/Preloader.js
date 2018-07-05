"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Phaser = require("phaser-ce");
class Preloader extends Phaser.State {
    constructor() {
        super(...arguments);
        this.ready = false;
    }
    preload() {
        this.preloadBar = this.add.sprite(300, 400, 'preloadBar');
        this.load.setPreloadSprite(this.preloadBar);
    }
    create() {
        this.game.state.start('GameScene');
    }
}
exports.Preloader = Preloader;
//# sourceMappingURL=Preloader.js.map