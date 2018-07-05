"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Phaser = require("phaser-ce");
const Boot_1 = require("./Boot");
const Preloader_1 = require("./Preloader");
const GameScene_1 = require("../GameScene");
class Game extends Phaser.Game {
    constructor() {
        super(398, 224, Phaser.AUTO, 'content', null);
        this.state.add('Boot', Boot_1.Boot, false);
        this.state.add('Preloader', Preloader_1.Preloader, false);
        this.state.add('GameScene', GameScene_1.GameScene, false);
        this.state.start('Boot');
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map