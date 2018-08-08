/**
 * This file just bootstraps the game. Add your scenes here and then start the ones that you want by using
 * game.state.start.
 */
import "phaser-ce"; // Just imports types
import {Boot} from "./base/Boot";
import {GameScene} from "./GameScene";
import {TitleScene} from "./TitleScene";

const game = new Phaser.Game(398, 224, Phaser.AUTO, 'content', null);
game.state.add('Boot', Boot, false);
game.state.add('TitleScene', TitleScene, false);
game.state.add('GameScene', GameScene, false);

game.state.start('Boot');
