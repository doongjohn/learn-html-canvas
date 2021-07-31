const center = { x: 0, y: 0 };

class Screen {
  static resolution = { x: 300, y: 300 };
  static aspectRatio = { x: 0, y: 0 };
  static scale = 1;
  static width;
  static height;
}

function canvasResize(canvas, gl) {
  let ratioScale = Math.min(
    window.innerWidth / Screen.aspectRatio.x,
    window.innerHeight / Screen.aspectRatio.y
  );
  canvas.width = Screen.aspectRatio.x * ratioScale;
  canvas.height = Screen.aspectRatio.y * ratioScale;

  // scale everything
  Screen.scale = Math.min(
    window.innerWidth / Screen.resolution.x,
    window.innerHeight / Screen.resolution.y
  );
  gl.scale(Screen.scale, Screen.scale);

  // update width & height
  Screen.width = canvas.width / Screen.scale;
  Screen.height = canvas.height / Screen.scale;

  // update center position
  center.x = Screen.width / 2;
  center.y = Screen.height / 2;
}

function initCanvas2D({ resolution, clearColor, } = {}) {
  // init canvas and context
  const canvas = document.getElementById('canvas');
  const gl = canvas.getContext('2d');

  // set config
  Screen.resolution = resolution;
  Screen.aspectRatio = calcRatio(resolution.x, resolution.y);
  canvas.style.background = clearColor;

  // resize
  canvasResize(canvas, gl);
  window.addEventListener('resize', () => {
    canvasResize(canvas, gl);
  });

  return {
    canvas: canvas,
    gl: gl
  };
}

function screenToWorldPos(x, y) {
  return {
    x: x - center.x,
    y: center.y - y
  };
}

function worldToScreenPos(x, y) {
  return { x: center.x + x, y: center.y - y };
}

function clearScreen() {
  gl.clearRect(0, 0, Screen.width, Screen.height);
}

function drawPixel(x, y) {
  gl.fillRect(x, y, 1, 1);
}

function drawCircle(x, y, radius) {
  gl.beginPath();
  gl.arc(x, y, radius, 0, 180 * Math.PI);
  gl.closePath();
  gl.fill();
}

function drawRect(x, y, width, height) {
  gl.fillRect(x - (width / 2), y - (height / 2), width, height);
}

function drawText(x, y, text) {
  gl.fillText(text, x, y);
}