import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { SelectLevel } from './scenes/SelectLevel';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';
import { LevelWin } from './scenes/LevelWin';
import { Level2 } from './scenes/Level2';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300, x: 0 },
            debug: false,
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        SelectLevel,
        MainGame,
        Level2,
        GameOver,
        LevelWin,
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
