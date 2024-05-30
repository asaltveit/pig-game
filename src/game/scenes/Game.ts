import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Player from '../sprites/Player';
import Snatcher from '../sprites/Snatcher';

export class Game extends Scene
{
    
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Physics.Arcade.Sprite;
    snatcher: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    camera: Phaser.Cameras.Scene2D.Camera;
    // Whether to disable right and left keys for player
    isPlayerWalkable: Boolean; 
    //background: Phaser.GameObjects.Image;
    //msg_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    sendSnatcher () {
        this.snatcher.setVelocityX(40);
    } 

    create ()
    {
        // TODO figure out what to do with cameras
        this.camera = this.cameras.main;

        // right, top, bottom edges are collided, left is checked against
        // Hopefully -> not working
        this.physics.world.setBounds(0, 0, 1024, 768, true, true, true, true);
        
        // TODO should it be made singular?
        this.platforms = this.physics.add.staticGroup();
        // Add ground
        this.platforms.create(0, 768, 'ground').setTintFill(0x8000).setDisplaySize(2048, 200).refreshBody(); // .setScale(4)

        // TODO Add something to background to signify you die if you go that way

        // Pig player starts on right side of screen
        this.player = this.physics.add.existing(new Player(this, 900, 600));
        this.isPlayerWalkable = true;

        // Snatcher starts on left side of screen
        this.snatcher = this.physics.add.existing(new Snatcher(this, 100, 600)); //.setDisplaySize(10, 200);

        // Pig sits on the ground
        this.physics.add.collider(this.player, this.platforms);
        // Snatcher doesn't fall through the floor
        this.physics.add.collider(this.snatcher, this.platforms);
       // Snatcher stops when it collides with pig
       this.physics.add.collider(this.snatcher, this.player, () => this.snatcherCollidesPlayer());
       // Snatcher waits, and then moves towards the right
       this.time.delayedCall(2000, this.sendSnatcher, undefined, this);

       // Affects React button on right side of screen
       EventBus.emit('current-scene-ready', this);

    }

    update() {
        // TODO connect pig to snatcher so that 
        // multiple cases end game and look better?

        /*
        player:
            connectedSnatcher
            isWalkable if !connectedSnatcher
            connectedSnatcher = null if "player jumps"
            connectSnatcher(snatcher) -> the snatcher could call this on the player?
            Can a snatcher access the player's velocity?
            should I add the platforms to set bounds on?
            Includes what it looks like


        */



        if (this.player.x < 50) {
            this.changeScene();
        }

        this.cursors = this.input.keyboard?.createCursorKeys();
        if (this.cursors?.left.isDown && this.isPlayerWalkable)
            {
                this.player.setVelocityX(-160);
            }
            else if (this.cursors?.right.isDown && this.isPlayerWalkable)
            {
                this.player.setVelocityX(160);
            }
            else
            {
                this.player.setVelocityX(0);
            }
            
            if (this.cursors?.up.isDown) // && this?.player?.body?.touching.down
            {
                this.player.setVelocityY(-300);
                this.isPlayerWalkable = true;
            }
            this.snatcherDirection()
    }

    snatcherCollidesPlayer () {
        this.isPlayerWalkable = false;
        this.snatcher.setVelocityX(-40);
        // Snatcher tries to carry pig away
        // TODO Need to get the player on top of the snatcher?
        this.player.setVelocityX(-40);
    }

    snatcherDirection () {
        // Snatcher doesn't jump for now
        const snatcherX = this.snatcher.x;
        const playerX = this.player.x;

        // If player is to the right
        if (playerX > snatcherX && this.isPlayerWalkable) {
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
    }
    
    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
