import Phaser from 'phaser';


// import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 1370,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false, // Set to true to see collision debug information
    },
  },
  scene: {
    preload:preload,
    create: create,
    update: update,
  },
};


game.scene.start('scene');
const game = new Phaser.Game(config);
