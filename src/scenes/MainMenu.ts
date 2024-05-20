import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    platforms: Phaser.Physics.Arcade.StaticGroup;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(0, 768, 'ground').setTintFill(0x8000).setDisplaySize(2048, 200).refreshBody(); // .setScale(4)

        this.player = this.physics.add.sprite(100, 450, 'dude').setTintFill(0xFFC0CB);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

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
                this.player.setVelocityY(-330);
            }
    }
}
