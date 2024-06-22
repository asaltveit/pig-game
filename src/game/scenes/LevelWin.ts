import { GameObjects, Scene } from 'phaser';

export class LevelWin extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText : Phaser.GameObjects.Text;
    nextLevelButton: GameObjects.Text;
    mainMenuButton: GameObjects.Text;
    
    //endState: EndStates;
    endText: string;

    constructor ()
    {
        super('LevelWin');
    }

    /*init (data: GameOverDataType) {
        this.endState = data.endState;
    }*/

    create ()
    {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);
        this.background = this.add.image(512, 384, 'background');

        // Make this reusable later - names of defeated elements
        this.endText = "You defeated the skeleton!";

        this.gameOverText = this.add.text(512, 384, this.endText, {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Add next levels, using data, when there are multiple levels
        this.nextLevelButton = this.add.text(512, 460, 'Next Level', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive({cursor: "grab"}).on('pointerdown', () => this.changeScene('Game') );

        this.mainMenuButton = this.add.text(512, 510, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive({cursor: "grab"}).on('pointerdown', () => this.changeScene('MainMenu') );
    }

    changeScene (scene: string)
    {
        this.scene.start(scene);
    }
}