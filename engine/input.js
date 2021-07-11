class Input {
  static #down = new Map();
  static #hold = new Map();
  static #up = new Map();

  static resetUpDown() {
    Input.#down.clear();
    Input.#up.clear();
  }
  static keyDown(key) {
    return Input.#down.has(key);
  }
  static keyHold(key) {
    return Input.#hold.has(key);
  }
  static keyUp(key) {
    return Input.#up.has(key);
  }

  static initInputSystem() {
    window.addEventListener('keydown', (keyEvent) => {
      if (!Input.#hold.has(keyEvent.key))
        Input.#down.set(keyEvent.key, keyEvent);
      Input.#hold.set(keyEvent.key, keyEvent);
    });

    window.addEventListener('keyup', (keyEvent) => {
      Input.#hold.delete(keyEvent.key);
      Input.#up.set(keyEvent.key, keyEvent);
    });
  }
};

Input.initInputSystem();
