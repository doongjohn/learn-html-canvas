function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // 최댓값은 제외
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // 최댓값도 포함
}

function randomPointFromRectEdge(w, h, minDist, maxDist) {
  const dist = getRandomIntInclusive(minDist, maxDist);
  let x = dist;
  let y = dist;
  w -= dist * 2;
  h -= dist * 2;
  if (Math.random() < w / (w + h)) {
    x = Math.random() * w + x;
    y = Math.random() < 0.5 ? y : y + h - 1;
  } else {
    y = Math.random() * h + y;
    x = Math.random() < 0.5 ? x : x + w - 1;
  }
  return { x: x, y: y };
}

function randomPointFromScreenEdge() {
  return randomPointFromRectEdge(Screen.width, Screen.height, 0, 0);
}

function calcRatio(num1, num2) {
  const result = { x: num1, y: num2 };
  for (let num = num2; num > 1; --num) {
    if ((result.x % num) == 0 && (result.y % num) == 0) {
      result.x /= num;
      result.y /= num;
    }
  }
  return result;
}

function distance(vec) {
  return Math.sqrt(vec.x ** 2 + vec.y ** 2);
}

function normalize(vec) {
  const result = { x: 0, y: 0 };
  if (vec.x == 0 && vec.y == 0)
    return result;

  const dist = distance(vec);
  result.x = vec.x / dist;
  result.y = vec.y / dist;
  return result;
}

function direction(cur, to) {
  return normalize({
    x: to.x - cur.x,
    y: to.y - cur.y
  });
}
