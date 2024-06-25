
// Make character flash red when injured
export function flashRed (character: Phaser.Physics.Arcade.Sprite, scene: Phaser.Scene) {
    scene.tweens.add({
        targets: character,
        duration: 50,
        tint: 0xff0000,
        callbackScope: scene,
        onComplete: function(tween, sprites) {
            character.clearTint();
        }
    });
}

export function characterBounceUp (character: Phaser.Physics.Arcade.Sprite, scene: Phaser.Scene) {
    character.setVelocityY(-200);
    scene.time.addEvent({
            delay: 250,
            callback: () => {character.setVelocityY(0);},
            callbackScope: scene,
        });
}

export function characterBounceBack (character: Phaser.Physics.Arcade.Sprite, scene: Phaser.Scene) {
    character.setVelocityX(-256);
    scene.time.addEvent({
        delay: 250,
        callback: () => {character.setVelocityX(40);}, // scene.isPlayerWalkable = true;
        callbackScope: scene,
    });
}

/*export function createBackground (scene: Phaser.Scene, width: number, height: number) {
    scene.dayCloudsBack = this.add.tileSprite(0,
        height - this.textures.get('day-clouds-back').getSourceImage().height - 100,
        width,
        this.textures.get('day-clouds-back').getSourceImage().height,
        'day-clouds-back'
    ).setScale(3);

    this.dayCloudsMid1 = this.add.tileSprite(0,
        height - this.textures.get('day-clouds-mid1').getSourceImage().height - 100,
        width,
        this.textures.get('day-clouds-mid1').getSourceImage().height,
        'day-clouds-mid1'
    ).setScale(2);

    this.dayCloudsMid2 = this.add.tileSprite(0,
        height - this.textures.get('day-clouds-mid2').getSourceImage().height - 100,
        width,
        this.textures.get('day-clouds-mid2').getSourceImage().height,
        'day-clouds-mid2'
    ).setScale(2);
}*/


