import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class SelectLevel extends Scene
{
    background: GameObjects.Image;
    backButton: GameObjects.Text;
    selectLevelButton: GameObjects.Text;

    constructor ()
    {
        super('SelectLevel');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        //this.logo = this.add.image(512, 300, 'logo').setDepth(100);

        this.backButton = this.add.text(512, 460, 'Back to Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive().on('pointerdown', () => this.changeScene('MainMenu') );

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene (scene: string)
    {
        /*if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }*/

        this.scene.start(scene);
    }

    moveLogo (vueCallback: ({ x, y }: { x: number, y: number }) => void)
    {
        /*if (this.logoTween)
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        } 
        else
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (vueCallback)
                    {
                        vueCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }*/
    }
}