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

let walls;
let player;
let level = 0;
let end;
const mazes = [
  [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 1, 1, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
  ], [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 1, 1, 0, 0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
  ]
];

function preload(){
  this.load.spritesheet('player', 'src/assets/11111.png', { frameWidth: 32, frameHeight: 32 });
  this.load.image('wallImage', 'src/assets/wall.png')
  this.load.image('tile000', 'src/assets/tile000.png');
  this.load.image('tile001', 'src/assets/tile001.png');
  this.load.image('tile002', 'src/assets/tile002.png');
  this.load.image('tile003', 'src/assets/tile003.png');
  this.load.image('tile004', 'src/assets/tile004.png');
  this.load.image('tile005', 'src/assets/tile005.png');
  this.load.image('tile006', 'src/assets/tile006.png');
  this.load.image('tile007', 'src/assets/tile007.png');
  this.load.image('tile008', 'src/assets/tile008.png');
  this.load.image('tile009', 'src/assets/tile009.png');
  this.load.image('tile010', 'src/assets/tile010.png');
  this.load.image('tile011', 'src/assets/tile011.png');
  this.load.image('tile012', 'src/assets/tile012.png');
  this.load.image('tile013', 'src/assets/tile013.png');
  this.load.image('tile014', 'src/assets/tile014.png');
  this.load.image('tile015', 'src/assets/tile015.png');
  this.load.image('tile016', 'src/assets/tile016.png');
  this.load.image('tile017', 'src/assets/tile017.png');
  this.load.image('tile018', 'src/assets/tile018.png');
  this.load.image('tile035', 'src/assets/tile035.png');
}

function create(){
  walls = this.physics.add.staticGroup();
  createMaze.call(this, level);

  const tileSize = 30;
  const playerSize = tileSize * 1.2; // Increase the player size

  const scene = this;

  player = this.physics.add.sprite(90, 90, 'tile001');
  end = this.physics.add.sprite(190, 200);
  end.setTexture('tile035');

  const desiredScale = 1.8; // Increase the size by 1.2 times
  player.setScale((playerSize / player.width) * desiredScale);
  end.setScale((playerSize / player.width)*2);

  this.physics.add.collider(player, walls);
  this.physics.add.collider(player, end, function () {
    handleEndCollision(scene, tileSize);
  });
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();

  player.setVelocity(0);

  if (cursors.left.isDown) {
    player.setVelocityX(-120);
  } else if (cursors.right.isDown) {
    player.setVelocityX(120);
  } else if (cursors.up.isDown) {
    player.setVelocityY(-120);
  } else if (cursors.down.isDown) {
    player.setVelocityY(120);
  } 
}
function createMaze(level) {
  const tileSize = 40;
  for (let row = 0; row < mazes[level].length; row++) {
    for (let col = 0; col < mazes[level][row].length; col++) {
      const tileValue = mazes[level][row][col];
      if (tileValue === 0) {
        walls.create(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2,'wallImage' );
      } else if (tileValue === 1) {
        const pathSprite = this.add.rectangle(
          col * tileSize + tileSize / 2,
          row * tileSize + tileSize / 2,
          tileSize,
          tileSize,
          0xffffff
        );
        pathSprite.setOrigin(0.5, 0.5);
      }
    }
  }
}


const game = new Phaser.Game(config);
game.scene.start('scene');