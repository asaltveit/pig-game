import Player from '../sprites/Player';
import Snatcher from '../sprites/Snatcher';
import DayLevel from './DayLevel';
import { EndStates } from './GameOver';

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
    
    pigLives: number;
    pigHealthText: Phaser.GameObjects.Text;

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
        
        // Left bound is not concrete, rest are
        this.physics.world.setBounds(0, 0, 1024, 768, false, true, true, true);

        // Adds moving clouds background
        let { width, height } = this.sys.game.canvas;
        this.createBackground(width, height);

        // Perhaps name player, not pig
        this.pigLives = 3;
        this.pigHealthText = this.add.text(440, 40, `LIVES: ${this.pigLives}`, {fontSize: '32px', color: '#fff'});

        this.floor = this.physics.add.staticGroup();
        // Add ground
        this.floor.create(0, 768, 'ground').setTintFill(0x8000).setDisplaySize(2048, 200).refreshBody();
        
        // TODO Add something to background to signify you die if you go that way

        // Pig player starts on right side of screen
        this.player = this.physics.add.existing(new Player(this, 900, 550));
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

        if (this.player.x < -10) { // Put all end states here?
            this.scene.start('GameOver', {endState: EndStates.PlayerCapture});
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
                // Pig can get away if double jump allowed
                this.isPlayerWalkable = true;
                // Could allow double jump if it looks more like jumping
                this.player.setVelocityY(-300);
                
            }
    }

    snatcherCollidesPlayer () {
        if (this.snatcher.body?.touching.right) {
            this.isPlayerWalkable = false;
            this.flashRed(this.player);
            
            this.pigLives -= 1;
            this.pigHealthText.setText('LIVES: ' + this.pigLives);
            
            this.snatcherBounceBack();

            if (this.pigLives < 1) {
                this.scene.start('GameOver', {endState: EndStates.PlayerDeath});
            }
        }
    }

    snatcherBounceBack () {
        this.snatcher.setVelocityX(-256);
        this.time.addEvent({
            delay: 250,
            callback: () => {this.snatcher.setVelocityX(40); this.isPlayerWalkable = true;},
            callbackScope: this,
        });
    }
     
    flashRed(character: Phaser.Physics.Arcade.Sprite) {
        this.tweens.add({
            targets: character,
            duration: 50,
            tint: 0xff0000,
            callbackScope: this,
            onComplete: function(tween, sprites) {
                character.clearTint();
            }
        });
    }

    snatcherDirection () {
        /*  Snatcher doesn't jump for now  */
        if (this.isPlayerWalkable) {
            this.snatcher.play('walk', true);
            this.snatcher.setVelocityX(40);
        } else {
            /*  Snatcher bounces back, player loses a life  */
        }
    }

    sendSnatcher () {
        this.snatcher.play('walk', true);
        this.snatcher.setVelocityX(40);
    }  

    // TODO Figure out an object/import for this?
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
