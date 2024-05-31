import { Scene } from 'phaser';

export default class DayLevel extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    floor: Phaser.Physics.Arcade.StaticGroup;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    player: Phaser.Physics.Arcade.Sprite;
    isPlayerWalkable: Boolean; 
    //snatcher: Phaser.Physics.Arcade.Sprite;
    background: Phaser.GameObjects.Image; // clouds from online

    constructor (key?: string)
    {
        super(key);
    }

    create ()
    {

    }

    update() {

    }
}
