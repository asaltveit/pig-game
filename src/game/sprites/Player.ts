
export default class Player extends Phaser.Physics.Arcade.Sprite {
    // Perhaps still want to attach a snatcher?

    // Could allow player to name their pig, 
    // need to protect against bad names?
    
    constructor (scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'pig', 'Pig.psd-2.png');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setScale(0.5);
        this.setSize(350, 200).setOffset(250, 130);

        this.anims.create({
            key: 'right',
            frames: [
                { key: 'pig', frame: 'Pig.psd-2.png' },
                { key: 'pig', frame: 'Pig.psd.png' },
            ],
            frameRate: 4,
            repeat: -1
        });

        this.setBounce(0.35);
        this.setCollideWorldBounds(true);
        
        // Can fill in the pig shape with a solid color
        // Good for getting hit?
        // this.setTintFill(0xFFC0CB);

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