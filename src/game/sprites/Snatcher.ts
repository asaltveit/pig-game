
export default class Snatcher extends Phaser.Physics.Arcade.Sprite {
    
    // Add a target? 
    // (Player, or later on a common pig/just getting past the player?)
    
    constructor (scene: Phaser.Scene, x: number, y:number) {
        super(scene, x, y, 'skeleton-walk');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.setTintFill(0x000000);
        this.setScale(3);
        this.setPosition(x, y);
        // Hitbox
        this.setSize(25, 28);
        this.setCollideWorldBounds(true);
        // Could add health and a method to affect it
        // Could add an attachable weapon

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('skeleton-walk', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

    }
}