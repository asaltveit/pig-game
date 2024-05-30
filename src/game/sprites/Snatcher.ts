
export default class Snatcher extends Phaser.Physics.Arcade.Sprite {
    
    // Add a target? 
    // (Player, or later on a common pig/just getting past the player?)
    
    constructor (scene: Phaser.Scene, x: number, y:number) {
        super(scene, x, y, 'dude');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setTintFill(0x000000);
        this.setPosition(x, y);
        this.setCollideWorldBounds(true);
        // Could add health and a method to affect it
        // Could add an attachable weapon
    }
}