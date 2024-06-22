import { EventBus } from '../EventBus';
import { GameObjects, Scene } from 'phaser';

export enum EndStates {
    PlayerDeath = "PLAYER_DEATH",
    PlayerCapture = "PLAYER_CAPTURE",
    BrethrenDeath = "BRETHREN_DEATH",
}

export type GameOverDataType = {
    endState: EndStates,
};

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText : Phaser.GameObjects.Text;
    restartButton: GameObjects.Text;
    mainMenuButton: GameObjects.Text;
    
    endState: EndStates;
    endText: string;

    constructor ()
    {
        super('GameOver');
    }

    init (data: GameOverDataType) {
        this.endState = data.endState;
    }

    create ()
    {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        if (this.endState == EndStates.PlayerDeath) {
            this.endText = "You died!";
        } else if (this.endState == EndStates.PlayerCapture) {
            this.endText = "You were captured!";
        } else if (this.endState == EndStates.BrethrenDeath) {
            this.endText = "One of your fellow pigs was taken!";
        } else {
            // Error
            this.endText = "Missing end state";
        }

        this.gameOverText = this.add.text(512, 384, this.endText, {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.restartButton = this.add.text(512, 460, 'Restart', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive({cursor: "grab"}).on('pointerdown', () => this.changeScene('Game') );

        this.mainMenuButton = this.add.text(512, 510, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive({cursor: "grab"}).on('pointerdown', () => this.changeScene('MainMenu') );
        
        EventBus.emit('current-scene-ready', this);
    }

    changeScene (scene: string)
    {
        this.scene.start(scene);
    }
}
