import Player from '../sprites/Player';
import Snatcher from '../sprites/Snatcher';
import DayLevel from './DayLevel';

// TODO Game will become Level_1 in the future
export class Game extends DayLevel {
    /* 
        How much does it really help to have the vars defined beforehand?
        Would the preload() work?
    
    */
    // Newly declared vars
    snatcher: Phaser.Physics.Arcade.Sprite;
    // TODO background object/individual backgrounds objects
    dayCloudsBack: Phaser.GameObjects.TileSprite;
    dayCloudsMid1: Phaser.GameObjects.TileSprite;
    dayCloudsMid2: Phaser.GameObjects.TileSprite;

    /* Inherited vars
    floor: Phaser.Physics.Arcade.StaticGroup;
    camera: Phaser.Cameras.Scene2D.Camera;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    isPlayerWalkable: Boolean; 
    background: Phaser.GameObjects.Image;
    */

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        // TODO figure out what to do with cameras
        this.camera = this.cameras.main;
        this.physics.world.setBounds(0, 0, 1024, 768, false, true, true, true);

        let { width, height } = this.sys.game.canvas;
        this.createBackground(width, height);

        // TODO Can probably be made singular?
        this.floor = this.physics.add.staticGroup();
        // Add ground
        this.floor.create(0, 768, 'ground').setTintFill(0x8000).setDisplaySize(2048, 200).refreshBody();
        
        // TODO Add something to background to signify you die if you go that way

        // Pig player starts on right side of screen
        this.player = this.physics.add.existing(new Player(this, 400, 550));
        this.isPlayerWalkable = true;

        // Pig sits on the ground
        this.physics.add.collider(this.player, this.floor);

        // Snatcher starts on left side of screen
        this.snatcher = this.physics.add.existing(new Snatcher(this, 50, 550)); //.setDisplaySize(10, 200);

        // Snatcher doesn't fall through the floor
        this.physics.add.collider(this.snatcher, this.floor);
        // Snatcher stops when it collides with pig
        this.physics.add.collider(this.snatcher, this.player, () => this.snatcherCollidesPlayer());
        // Snatcher waits, and then moves towards the right
        this.time.delayedCall(2000, this.sendSnatcher, undefined, this);
    }

    update() {
        this.dayCloudsBack.tilePositionX -= 0.05; // 0.05
        this.dayCloudsMid1.tilePositionX -= 0.15; // 0.3
        this.dayCloudsMid2.tilePositionX -= 0.4; // 0.75

        if (this.player.x < 0) {
            this.scene.start('GameOver');
        }
        this.playerDirection();
        this.snatcherDirection();
    }

    playerDirection () {
        this.cursors = this.input.keyboard?.createCursorKeys();
        if (this.cursors?.left.isDown && this.isPlayerWalkable)
            {
                this.player.play('left', true);
                this.player.setVelocityX(-160);
            }
            else if (this.cursors?.right.isDown && this.isPlayerWalkable)
            {
                //this.player.goRight(); // change hitbox
                this.player.play('right', true);
                this.player.setVelocityX(160);
            }
            else
            {
                this.player.stop();
                this.player.setVelocityX(0);
            }
            
            if (this.cursors?.up.isDown) // && this?.player?.body?.touching.down
            {
                // TODO: Pig doesn't get away unless lucky on a corner of snatcher
                // Pig can get away if double jump allowed
                this.isPlayerWalkable = true;
                // Could allow double jump if it looks more like jumping
                this.player.setVelocityY(-300);
                
            }
    }

    snatcherCollidesPlayer () {
        this.isPlayerWalkable = false;
        //this.snatcher.setSize(24, 37);
        //this.physics.add.collider(this.snatcher, this.floor);
        this.snatcher.stop();
        this.snatcher.play('attack');
    }

    snatcherDirection () {
        // Snatcher doesn't jump for now
        const snatcherX = this.snatcher.x;
        const playerX = this.player.x;

        if (this.isPlayerWalkable) {
            this.snatcher.play('walk', true);
            this.snatcher.setVelocityX(40);
        } else {
            //this.snatcher.setSize(24, 37);
            //this.physics.add.collider(this.snatcher, this.floor);
            //this.snatcher.play('attack');
        }

        /*
        // If player is to the right
        if (playerX > snatcherX && this.isPlayerWalkable) {
            this.snatcher.play('walk', true);
            this.snatcher.setVelocityX(40); // speed up to 100?
        } 
        // If player is to the left
        else if (playerX < snatcherX) {
            this.snatcher.setVelocityX(-40);
        }
        else {
            this.snatcher.setVelocityX(-40);
            // Snatcher tries to carry pig away
            this.player.setVelocityX(-40);
        }
        */
    }

    sendSnatcher () {
        this.snatcher.play('walk', true);
        this.snatcher.setVelocityX(40);
    }  

    // TODO Figure out an object for this
    createBackground (width: number, height: number) {
        this.dayCloudsBack = this.add.tileSprite(0,
            height - this.textures.get('day-clouds-back').getSourceImage().height - 100,
            width,
            this.textures.get('day-clouds-back').getSourceImage().height,
            'day-clouds-back'
        ).setScale(3);

        this.dayCloudsMid1 = this.add.tileSprite(0,
            height - this.textures.get('day-clouds-mid1').getSourceImage().height - 100,
            width,
            this.textures.get('day-clouds-mid1').getSourceImage().height,
            'day-clouds-mid1'
        ).setScale(2);

        this.dayCloudsMid2 = this.add.tileSprite(0,
            height - this.textures.get('day-clouds-mid2').getSourceImage().height - 100,
            width,
            this.textures.get('day-clouds-mid2').getSourceImage().height,
            'day-clouds-mid2'
        ).setScale(2);
    }
}
