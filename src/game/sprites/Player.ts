
export default class Player extends Phaser.Physics.Arcade.Sprite {
    // Perhaps still want to attach a snatcher?

    // Could allow player to name their pig, 
    // need to protect against bad names?
    
    constructor (scene: Phaser.Scene, x: number, y: number) {
        //let { width, height } = scene.sys.game.canvas;
        super(scene, x, y, 'pig');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.displayWidth = 100;
        // Scale the image proportionally
        this.scaleY = this.scaleX;
        
        // Can fill in the pig shape with a solid color
        // this.setTintFill(0xFFC0CB);

        this.setBounce(0.35);
        this.setCollideWorldBounds(true);
        // Could add health and a method to affect it
        // Could add an attachable weapon
        /*
            Perhaps aliens could offer different weapon choices, 
            which determines difficulty and success

            player:
            connectedSnatcher
            isWalkable if !connectedSnatcher
            connectedSnatcher = null if "player jumps"
            connectSnatcher(snatcher) -> the snatcher could call this on the player?
            Can a snatcher access the player's velocity?
            should I add the platforms to set bounds on?
            Includes what it looks like


        */
    }
}