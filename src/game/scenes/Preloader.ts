import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('day-clouds-back', 'Clouds-1/1.png');
		this.load.image('day-clouds-mid1', 'Clouds-1/2.png');
		this.load.image('day-clouds-mid2', 'Clouds-1/4.png');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');

        this.load.atlas('pig-right', 'Pig/pig_right/pig_sprite.png', 'Pig/pig_right/pig_sprite.json');
        this.load.atlas('pig-left', 'Pig/pig_left/pig_left.png', 'Pig/pig_left/pig_left.json');

        //this.load.spritesheet('skeleton-idle', 'Skeleton/Skeleton Idle.png', { frameWidth: 20, frameHeight: 16 }); // 25?, 37
        this.load.spritesheet('skeleton-walk', 'Skeleton/Skeleton Walk.png', { frameWidth: 22, frameHeight: 33 });
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
