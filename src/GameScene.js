"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Phaser = require("phaser-ce");
const TimesteppedScene_1 = require("./base/TimesteppedScene");
const Player_1 = require("./Player");
const Bullet_1 = require("./Bullet");
const BasicEnemy_1 = require("./base/BasicEnemy");
class GameScene extends TimesteppedScene_1.TimesteppedScene {
    preload() {
        this.game.load.image('bg', 'assets/bg.png');
        this.game.load.tilemap('bgmap', 'assets/level01.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('bg_tiles', 'assets/level01.tmx.png');
        this.load.spritesheet('player', 'assets/player.png', 32, 16);
        this.load.image('bullet', 'assets/bullet.png');
        this.load.spritesheet('basicenemy', 'assets/basicenemy.png', 16, 16);
    }
    create() {
        this.bullets = [];
        this.enemies = [];
        this.walls = [];
        this.bg = this.game.add.tileSprite(0, 0, 1024 * 1024, 208, 'bg');
        const map = this.game.add.tilemap('bgmap');
        map.addTilesetImage('tileset', 'bg_tiles');
        const layer = map.createLayer('BG');
        layer.resizeWorld();
        this.collisionLayer = map.createLayer('Collisions');
        this.collisionLayer.visible = false;
        this.game.physics.arcade.enable(this.collisionLayer);
        map.setCollision(162, true, 'Collisions');
        this.player = new Player_1.Player(this, this.game.width / 2, this.game.height / 2);
        this.game.add.existing(this.player);
        this.createSquareWall(0, -8, map.widthInPixels, 8);
        this.createSquareWall(0, map.heightInPixels, map.widthInPixels, 8);
        this.leftWall = this.createSquareWall(-8, 0, 8, map.heightInPixels);
        this.rightWall = this.createSquareWall(this.game.width, 0, 8, map.heightInPixels);
        const simpleMovement = () => {
            return new Phaser.Point(-100, 0);
        };
        const behaviour = new BasicEnemy_1.EnemyBehaviourDesc(simpleMovement);
        const enemy = new BasicEnemy_1.BasicEnemy(this.game, 600 + this.game.width, this.game.height / 2, behaviour);
        this.enemies.push(enemy);
        this.game.add.existing(enemy);
        this.cameraOffset = 600;
        this.cameraMoveSpeed = 0.33;
    }
    fixedUpdate() {
        this.player.fixedUpdate();
        this.game.physics.arcade.collide(this.player, this.collisionLayer);
        for (const bullet of this.bullets) {
            bullet.fixedUpdate();
            if (this.game.physics.arcade.collide(bullet, this.collisionLayer)) {
                bullet.hitAWall();
            }
        }
        for (const enemy of this.enemies) {
            enemy.fixedUpdate();
            for (const bullet of this.bullets) {
                if (this.game.physics.arcade.overlap(bullet, enemy)) {
                    enemy.hasBeenHitByBullet(bullet);
                }
            }
            if (this.game.physics.arcade.overlap(this.player, enemy)) {
                this.player.hasBeenHitByEnemy(enemy);
            }
        }
        for (const wall of this.walls) {
            this.game.physics.arcade.collide(wall, this.player);
        }
        this.cameraOffset += this.cameraMoveSpeed;
        this.game.camera.x = this.cameraOffset;
        this.bg.x = -7 * this.cameraOffset;
        this.leftWall.x = this.cameraOffset - this.leftWall.width;
        this.rightWall.x = this.cameraOffset + this.game.width;
    }
    createSquareWall(x, y, width, height) {
        const wall = this.game.add.sprite(x, y);
        this.game.physics.arcade.enableBody(wall);
        wall.body.immovable = true;
        wall.body.setSize(width, height);
        this.walls.push(wall);
        return wall;
    }
    fadeOut() {
        this.camera.fade(0, 1 * Phaser.Timer.SECOND);
        this.camera.onFadeComplete.add(() => {
            this.game.state.start('Boot');
        });
    }
    playerHasDied(player) {
        this.game.time.events.add(1 * Phaser.Timer.SECOND, () => {
            this.fadeOut();
        });
    }
    spawnPlayerBullet(x, y, shotBulletSpeed) {
        const bullet = new Bullet_1.Bullet(this.game, x, y, shotBulletSpeed);
        this.game.add.existing(bullet);
        this.bullets.push(bullet);
    }
}
exports.GameScene = GameScene;
//# sourceMappingURL=GameScene.js.map