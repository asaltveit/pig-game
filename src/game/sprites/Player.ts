
export default class Player extends Phaser.Physics.Arcade.Sprite {
    
    isPlayerWalkable: boolean; // might want to do soomething with this?
    // Perhaps still want to attach a snatcher?
    
    constructor (scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'pig');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setTintFill(0xFFC0CB);
        this.setPosition(x, y);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        // Could add health and a method to affect it
        // Could add an attachable weapon
        /*
            Perhaps aliens could offer different weapon choices, 
            which determines difficulty and success
        */
    }
}