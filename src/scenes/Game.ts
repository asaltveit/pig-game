import { Scene } from 'phaser';

export class Game extends Scene
{
    
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    //camera: Phaser.Cameras.Scene2D.Camera;
    //background: Phaser.GameObjects.Image;
    //msg_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
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

        // Pig sits on the ground
        this.physics.add.collider(this.player, this.platforms);
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
