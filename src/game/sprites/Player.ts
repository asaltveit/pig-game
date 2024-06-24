
export default class Player extends Phaser.Physics.Arcade.Sprite {
    // Perhaps still want to attach a snatcher?

    // Could allow player to name their pig, 
    // need to protect against bad names?
    
    constructor (scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'pig-left', 'output-onlinepngtools.png'); // 'pig-left', 'output-onlinepngtools.png'

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setScale(0.3);
        // Set hit box - works when facing left
        this.setSize(350, 200).setOffset(400, 130);
        // .setOffset(250, 130); works when facing right

        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'pig-right', frame: 'Pig.psd-2.png' },
                { key: 'pig-right', frame: 'Pig.psd.png' },
                
            ],
            frameRate: 4,
            repeat: -1
        });

        /* Images were flipped manually
        this.anims.create({
            key: 'left',
            frames: [
                { key: 'pig-left', frame: 'output-onlinepngtools.png' },
                { key: 'pig-left', frame: 'output-onlinepngtools-2.png' },
                
            ],
            frameRate: 4,
            repeat: -1
        });*/

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

    goLeft () {
        this.setOffset(400, 130);
    }

    goRight () {
        this.setSize(350, 200).setOffset(250, 130);
    }
}