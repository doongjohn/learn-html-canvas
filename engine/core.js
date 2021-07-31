class GameObject {
  constructor() {
    this.x = 0; // world pos x
    this.y = 0; // world pos y
  }

  getScreenPos() {
    return { x: center.x + this.x, y: center.y - this.y };
  }
}

function gameLoop(func) {
  var prevTime = performance.now();
  const loop = () => {
    // calc delta time
    var dt = (performance.now() - prevTime) / 1000;

    // clear screen
    clearScreen();

    // run game logic
    func(dt);

    // reset input
    Input.resetUpDown();

    // for delta time
    prevTime = performance.now();

    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
