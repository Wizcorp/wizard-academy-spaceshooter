import * as Phaser from 'phaser';

const config:GameConfig = {
	type: Phaser.AUTO,
	parent: 'content',
	width: 640,
	height: 480,
	resolution: 1,
	backgroundColor: "#EDEEC9",
	scene: [
	]
};

new Phaser.Game(config);
console.log(`TEMP ICI`, Phaser);
