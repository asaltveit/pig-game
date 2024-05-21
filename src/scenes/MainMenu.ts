import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    startButton: GameObjects.Text;
    menu: GameObjects.Container;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.startButton = this.add.text(500, 300, 'Start')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('Game');
    }
);
    }

    update() {
        
    }
}
