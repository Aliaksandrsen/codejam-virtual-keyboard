const keyboard = {
  elements: {
    main: null,
    textarea: null,
    keysContainer: null,
    keys: [],
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.textarea = document.createElement('textarea');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.textarea.classList.add('use-keyboard-input');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      ['`', 'Backquote'], ['1', 'Digit1'], ['2', 'Digit2'], ['3', 'Digit3'], ['4', 'Digit4'], ['5', 'Digit5'], ['6', 'Digit6'], ['7', 'Digit7'], ['8', 'Digit8'], ['9', 'Digit9'], ['0', 'Digit0'], ['-', 'Minus'], ['=', 'Equal'], ['Backspace', 'Backspace'],
      ['Tab', 'Tab'], ['q', 'KeyQ'], ['w', 'KeyW'], ['e', 'KeyE'], ['r', 'KeyR'], ['t', 'KeyT'], ['y', 'KeyY'], ['u', 'KeyU'], ['i', 'KeyI'], ['o', 'KeyO'], ['p', 'KeyP'], ['[', 'BracketLeft'], [']', 'BracketRight'], ['\\', 'Backslash'],
      ['CapsLock', 'CapsLock'], ['a', 'KeyA'], ['s', 'KeyS'], ['d', 'KeyD'], ['f', 'KeyF'], ['g', 'KeyG'], ['h', 'KeyH'], ['j', 'KeyJ'], ['k', 'KeyK'], ['l', 'KeyL'], [';', 'Semicolon'], ["'", 'Quote'], ['Enter', 'Enter'],
      ['Shift', 'ShiftLeft'], ['z', 'KeyZ'], ['x', 'KeyX'], ['c', 'KeyC'], ['v', 'KeyV'], ['b', 'KeyB'], ['n', 'KeyN'], ['m', 'KeyM'], [',', 'Comma'], ['.', 'Period'], ['/', 'Slash'],
      ['Control', 'ControlLeft'], ['Alt', 'AltLeft'], ['Space', 'Space'], ['Alt', 'AltRight'], ['Control', 'ControlRight'],
    ];

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', '\\', 'Enter', '/'].indexOf(key[0]) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      // Every button have date attribute
      keyElement.setAttribute('data-key', `${key[1]}`);

      switch (key[0]) {
        case 'Backspace':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>Backspace</span>';

          keyElement.addEventListener('click', () => {
            this.properties.value = document.querySelector('.use-keyboard-input').value;
            this.properties.value = this.properties.value
              .slice(0, this.properties.value.length - 1);
            document.querySelector('.use-keyboard-input').value = this.properties.value;
          });

          break;

        case 'Tab':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>Tab</span>';

          keyElement.addEventListener('click', () => {
            this.properties.value = document.querySelector('.use-keyboard-input').value;
            this.properties.value += '\t';
            document.querySelector('.use-keyboard-input').value = this.properties.value;
          });

          break;

        case 'CapsLock':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>CapsLock</span>';

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard__key_activeted', this.properties.capsLock);
          });

          break;

        case 'Enter':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>Enter</span>';

          keyElement.addEventListener('click', () => {
            this.properties.value = document.querySelector('.use-keyboard-input').value;
            this.properties.value += '\n';
            document.querySelector('.use-keyboard-input').value = this.properties.value;
          });

          break;

        case 'Shift':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>Shift</span>';

          keyElement.addEventListener('click', () => {
            // this.properties.value = document.querySelector('.use-keyboard-input').value;
            // this.properties.value += '\n';
            // document.querySelector('.use-keyboard-input').value = this.properties.value;
          });

          break;

        case 'Control':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>Control</span>';

          keyElement.addEventListener('click', () => {
            // this.properties.value = document.querySelector('.use-keyboard-input').value;
            // this.properties.value += '\n';
            // document.querySelector('.use-keyboard-input').value = this.properties.value;
          });

          break;

        case 'Alt':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>Alt</span>';

          keyElement.addEventListener('click', () => {
            // this.properties.value = document.querySelector('.use-keyboard-input').value;
            // this.properties.value += '\n';
            // document.querySelector('.use-keyboard-input').value = this.properties.value;
          });

          break;

        case 'Space':
          keyElement.classList.add('keyboard__key_extra-wide');
          keyElement.innerHTML = '<span> </span>';

          keyElement.addEventListener('click', () => {
            this.properties.value = document.querySelector('.use-keyboard-input').value;
            this.properties.value += ' ';
            document.querySelector('.use-keyboard-input').value = this.properties.value;
          });

          break;

        default:
          keyElement.textContent = key[0].toLowerCase();

          keyElement.addEventListener('click', () => {
            if (this.properties.capsLock) {
              this.properties.value = document.querySelector('.use-keyboard-input').value;
              this.properties.value += key[0].toUpperCase();
            } else {
              this.properties.value = document.querySelector('.use-keyboard-input').value;
              this.properties.value += key[0].toLowerCase();
            }

            document.querySelector('.use-keyboard-input').value = this.properties.value;
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br')); // add br after some keys
      }
    });

    return fragment;
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    this.elements.keys.forEach((key) => {
      const myKey = key;
      if (myKey.childElementCount === 0) {
        if (this.properties.capsLock) {
          myKey.textContent = myKey.textContent.toUpperCase();
        } else {
          myKey.textContent = myKey.textContent.toLowerCase();
        }
      }
    });
  },
};

// ===================================================== work with real keyboard

document.addEventListener('keydown', (event) => {
  // Use date attribute
  const key = document.querySelector(`button[data-key='${event.code}']`);
  if (event.code === 'CapsLock') {
    keyboard._toggleCapsLock.call(keyboard);
    key.classList.toggle('keyboard__key_activeted');
  }
  // Resolve default events
  if (event.code === 'Tab' || event.code === 'AltLeft' || event.code === 'AltRight' || event.code === 'ShiftLeft') {
    event.preventDefault();
    if (event.code === 'Tab') {
      document.querySelector('.use-keyboard-input').value += '\t';
    }
    if (event.code === 'ShiftLeft') {
      keyboard._toggleCapsLock.call(keyboard);
    }
  }
  key.classList.toggle('keyboard__key_activeted');
});

document.addEventListener('keyup', (event) => {
  document.querySelector(`button[data-key='${event.code}']`).classList.toggle('keyboard__key_activeted');
  if (event.code === 'ShiftLeft') {
    keyboard._toggleCapsLock.call(keyboard);
  }
});


window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});
