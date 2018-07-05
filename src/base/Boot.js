"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Phaser = require("phaser-ce");
class Boot extends Phaser.State {
    init() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(398, 224, 398 * 2, 224 * 2);
        if (this.game.device.desktop) {
            this.scale.pageAlignHorizontally = true;
        }
        else {
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }
    }
    preload() {
        this.load.image('preloadBar', 'assets/loader.png');
    }
    create() {
        this.game.state.start('Preloader');
    }
}
exports.Boot = Boot;
//# sourceMappingURL=Boot.js.map