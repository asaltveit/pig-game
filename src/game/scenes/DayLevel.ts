import { Scene } from 'phaser';

export class DayLevel extends Scene
{
    
    platforms: Phaser.Physics.Arcade.StaticGroup;
    //background: Phaser.GameObjects.Image;
    //camera: Phaser.Cameras.Scene2D.Camera;
    //background: Phaser.GameObjects.Image;
    //msg_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('DayLevel');
    }

    create ()
    {
        // TODO Can probably be made singular
        this.platforms = this.physics.add.staticGroup();
        // Add ground
        this.platforms.create(0, 768, 'ground').setTintFill(0x8000).setDisplaySize(2048, 200).refreshBody();
    }

    update() {
        
    }
}
