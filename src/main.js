// init canvas
const { canvas, gl } = initCanvas2D({
  resolution: { x: 1920, y: 1080 },
  aspectRatio: { x: 16, y: 9 },
  clearColor: 'black'
});

class World {
  static gameObjects = [];
}

class Player extends GameObject {
  moveDir = { x: 0, y: 0 };
  speed = 5;

  constructor() {
    super();
    World.gameObjects.push(this);
  }

  static moveInput(curDir, plusKey, minusKey) {
    if (!Input.keyHold(plusKey) && !Input.keyHold(minusKey))
      return 0;
    if (Input.keyDown(plusKey) || (Input.keyHold(plusKey) && Input.keyUp(minusKey)))
      return 1;
    if (Input.keyDown(minusKey) || (Input.keyHold(minusKey) && Input.keyUp(plusKey)))
      return -1;
    return curDir;
  }

  move() {
    this.moveDir.y = Player.moveInput(this.moveDir.y, 'w', 's');
    this.moveDir.x = Player.moveInput(this.moveDir.x, 'd', 'a');
    this.moveDir = normalize(this.moveDir);
    this.x += this.moveDir.x * this.speed;
    this.y += this.moveDir.y * this.speed;
  }

  draw() {
    let pos = this.getScreenPos();
    gl.fillStyle = '#7777ff';
    gl.font = '20px consolas';
    gl.textBaseline = 'middle';
    gl.textAlign = 'center';
    drawText(pos.x, pos.y - 20, "이학현");
    drawRect(pos.x, pos.y, 20, 20);
  }
}

class Enemy extends GameObject {
  moveDir = { x: 0, y: 0 };
  speed = 5;

  constructor() {
    super();
    World.gameObjects.push(this);

    // random position
    const screenPos = randomPointFromScreenEdge();
    const pos = screenToWorldPos(screenPos.x, screenPos.y);
    this.x = pos.x;
    this.y = pos.y;
  }

  move() {
    this.moveDir = direction(this, player);
    this.x += this.moveDir.x * this.speed;
    this.y += this.moveDir.y * this.speed;
  }

  draw() {
    let pos = this.getScreenPos();
    gl.fillStyle = '#ff7777';
    gl.font = '20px consolas';
    gl.textBaseline = 'middle';
    gl.textAlign = 'center';
    drawText(pos.x, pos.y - 20, "군대");
    drawRect(pos.x, pos.y, 20, 20);
  }
}

const player = new Player();

// game loop
gameLoop((dt) => {
  for (go of World.gameObjects) {
    go.move();
    go.draw();
  }
});

// spawn enemies
// setInterval(() => {
//   repeat(3, () => new Enemy());
// }, 300);