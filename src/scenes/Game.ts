import { Scene } from 'phaser';

export class Game extends Scene
{
    
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Physics.Arcade.Sprite;
    snatcher: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    //camera: Phaser.Cameras.Scene2D.Camera;
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
        // TODO Can probably be made singular
        this.platforms = this.physics.add.staticGroup();
        // Add ground
        this.platforms.create(0, 768, 'ground').setTintFill(0x8000).setDisplaySize(2048, 200).refreshBody(); // .setScale(4)

        // Pig player starts on right side of screen
        this.player = this.physics.add.sprite(900, 600, 'dude').setTintFill(0xFFC0CB);
        this.player.setBounce(0.2);
        // Pig player can't walk off the screen
        this.player.setCollideWorldBounds(true);

         // Snatcher starts on left side of screen
       this.snatcher = this.physics.add.sprite(0, 600, 'dude').setTintFill(0x000000)//.setDisplaySize(10, 200);
       this.snatcher.setCollideWorldBounds(true);

        // Pig sits on the ground
        this.physics.add.collider(this.player, this.platforms);
        // Snatcher doesn't fall through the floor
        this.physics.add.collider(this.snatcher, this.platforms);
       // Snatcher stops when it collides with pig
       this.physics.add.collider(this.snatcher, this.player);
       // Snatcher waits, and then moves towards the right
       this.time.delayedCall(2000, this.sendSnatcher, undefined, this);

    }

    update() {
        this.cursors = this.input.keyboard?.createCursorKeys();
        if (this.cursors?.left.isDown)
            {
                this.player.setVelocityX(-160);
            }
            else if (this.cursors?.right.isDown)
            {
                this.player.setVelocityX(160);
            }
            else
            {
                this.player.setVelocityX(0);
            }
            
            if (this.cursors?.up.isDown && this?.player?.body?.touching.down)
            {
                this.player.setVelocityY(-300);
            }
    }
}
