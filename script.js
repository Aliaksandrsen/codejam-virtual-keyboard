class Keyboard {
  constructor() {
    this.elements = {
      main: null,
      textarea: null,
      keysContainer: null,
      keys: [],
    };

    this.properties = {
      value: '',
      capsLock: false,
      // change from localStorage
      isRrussian: false,
    };

    this.keyLayout = [
      ['`', 'ё', 'Backquote'], ['1', '1', 'Digit1'], ['2', '2', 'Digit2'], ['3', '3', 'Digit3'], ['4', '4', 'Digit4'], ['5', '5', 'Digit5'], ['6', '6', 'Digit6'], ['7', '7', 'Digit7'], ['8', '8', 'Digit8'], ['9', '9', 'Digit9'], ['0', '0', 'Digit0'], ['-', '-', 'Minus'], ['=', '=', 'Equal'], ['Backspace', 'Backspace', 'Backspace'],
      ['Tab', 'Tab', 'Tab'], ['q', 'й', 'KeyQ'], ['w', 'ц', 'KeyW'], ['e', 'у', 'KeyE'], ['r', 'к', 'KeyR'], ['t', 'е', 'KeyT'], ['y', 'н', 'KeyY'], ['u', 'г', 'KeyU'], ['i', 'ш', 'KeyI'], ['o', 'щ', 'KeyO'], ['p', 'з', 'KeyP'], ['[', 'х', 'BracketLeft'], [']', 'ъ', 'BracketRight'], ['\\', '|', 'Backslash'],
      ['CapsLock', 'CapsLock', 'CapsLock'], ['a', 'ф', 'KeyA'], ['s', 'ы', 'KeyS'], ['d', 'в', 'KeyD'], ['f', 'а', 'KeyF'], ['g', 'п', 'KeyG'], ['h', 'р', 'KeyH'], ['j', 'о', 'KeyJ'], ['k', 'л', 'KeyK'], ['l', 'д', 'KeyL'], [';', 'ж', 'Semicolon'], ["'", 'э', 'Quote'], ['Enter', 'Enter', 'Enter'],
      ['Shift', 'Shift', 'ShiftLeft'], ['z', 'я', 'KeyZ'], ['x', 'ч', 'KeyX'], ['c', 'с', 'KeyC'], ['v', 'и', 'KeyV'], ['b', 'и', 'KeyB'], ['n', 'т', 'KeyN'], ['m', 'ь', 'KeyM'], [',', 'б', 'Comma'], ['.', 'ю', 'Period'], ['/', '/', 'Slash'],
      ['Control', 'Control', 'ControlLeft'], ['Alt', 'Alt', 'AltLeft'], ['Space', 'Space', 'Space'], ['Alt', 'Alt', 'AltRight'], ['Control', 'Control', 'ControlRight'],
    ];
  }

  initTextarea() {
    this.elements.textarea = document.createElement('textarea');
    this.elements.textarea.classList.add('use-keyboard-input');
    document.body.appendChild(this.elements.textarea);
  }

  initVirtual() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    // use lang
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);


    if (this.properties.isRrussian === false) {
      localStorage.setItem('lang', 'false');
    }
    if (this.properties.isRrussian === true) {
      localStorage.setItem('lang', 'true');
    }
  }

  createKeys() {
    const fragment = document.createDocumentFragment();

    this.keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', '\\', 'Enter', '/'].indexOf(key[0]) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      // Every button have date attribute(with code)
      keyElement.setAttribute('data-key', `${key[2]}`);

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
            this.toggleCapsLock();
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

          break;

        case 'Control':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>Control</span>';

          break;

        case 'Alt':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>Alt</span>';

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

        default: {
          // eslint-disable-next-line no-case-declarations
          let lenguageLetter;
          if (!this.properties.isRrussian) {
            // eslint-disable-next-line prefer-destructuring
            lenguageLetter = key[0];
          } else {
            // eslint-disable-next-line prefer-destructuring
            lenguageLetter = key[1];
          }

          keyElement.textContent = lenguageLetter.toLowerCase();

          keyElement.addEventListener('click', () => {
            if (this.properties.capsLock) {
              this.properties.value = document.querySelector('.use-keyboard-input').value;
              this.properties.value += lenguageLetter.toUpperCase();
            } else {
              this.properties.value = document.querySelector('.use-keyboard-input').value;
              this.properties.value += lenguageLetter.toLowerCase();
            }

            document.querySelector('.use-keyboard-input').value = this.properties.value;
          });

          break;
        }
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        // add br after some keys
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }

  toggleCapsLock() {
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
  }

  /**  work with real keyboard */
  initReal() {
    document.addEventListener('keydown', (event) => {
      // Use date attribute
      const key = document.querySelector(`button[data-key='${event.code}']`);
      event.preventDefault();
      switch (event.code) {
        case 'Backspace':
          this.properties.value = document.querySelector('.use-keyboard-input').value;
          this.properties.value = this.properties.value
            .slice(0, this.properties.value.length - 1);
          document.querySelector('.use-keyboard-input').value = this.properties.value;
          break;

        case 'Tab':
          document.querySelector('.use-keyboard-input').value += '\t';
          break;

        case 'CapsLock':
          this.toggleCapsLock();
          key.classList.add('keyboard__key_activeted');
          return;

        case 'Enter':
          document.querySelector('.use-keyboard-input').value += '\n';
          // keyboard.properties.value = document.querySelector('.use-keyboard-input');
          break;

        case 'ShiftLeft':
          this.toggleCapsLock();
          // key.classList.add('keyboard__key_activeted');
          break;

        case 'ControlLeft':
        case 'ControlRight':
        case 'AltLeft':
        case 'AltRight':
          break;

        case 'Space':
          document.querySelector('.use-keyboard-input').value += ' ';
          break;

        default:
          this.keyLayout.forEach((item) => {
            if (item[2] === event.code) {
              // english
              if (!this.properties.isRrussian) {
                if (!this.properties.capsLock) {
                  document.querySelector('.use-keyboard-input').value += item[0].toLowerCase();
                }
                if (this.properties.capsLock) {
                  document.querySelector('.use-keyboard-input').value += item[0].toUpperCase();
                }
                // russian
              } else {
                if (!this.properties.capsLock) {
                  document.querySelector('.use-keyboard-input').value += item[1].toLowerCase();
                }
                if (this.properties.capsLock) {
                  document.querySelector('.use-keyboard-input').value += item[1].toUpperCase();
                }
              }
            }
          });
      }

      key.classList.add('keyboard__key_activeted');
    });

    document.addEventListener('keyup', (event) => {
      const key = document.querySelector(`button[data-key='${event.code}']`);
      if (event.code === 'ShiftLeft') {
        this.toggleCapsLock();
      }
      key.classList.remove('keyboard__key_activeted');
    });

    function runOnKeys(func, ...codes) {
      const pressed = new Set();

      document.addEventListener('keydown', (event) => {
        pressed.add(event.code);

        // Are all keys from the set pressed?
        for (let i = 0; i < codes.length; i += 1) {
          if (!pressed.has(codes[i])) {
            return;
          }
        }

        pressed.clear();
        func();
      });

      document.addEventListener('keyup', (event) => {
        pressed.delete(event.code);
      });
    }

    runOnKeys(
      () => {
        this.properties.isRrussian = !this.properties.isRrussian;
        // delete old
        document.querySelector('.keyboard').remove();
        this.initVirtual();
      },
      'ShiftLeft',
      'AltLeft',
    );
  }
}

const keyboard = new Keyboard();

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('lang') === 'false') {
    keyboard.properties.isRrussian = false;
  }
  if (localStorage.getItem('lang') === 'true') {
    keyboard.properties.isRrussian = true;
  }
  keyboard.initTextarea();
  keyboard.initVirtual();
  keyboard.initReal();
});
