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
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'Control', 'Space', 'Alt',
    ];

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', '\\', 'Enter', '?'].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      // Every button have date attribute
      keyElement.setAttribute('data-key', `${key}`);
      // if (key === '\\') { //!!!!
      //   keyElement.setAttribute('data-key', '\\sl');
      // }

      switch (key) {
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
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            if (this.properties.capsLock) {
              this.properties.value = document.querySelector('.use-keyboard-input').value;
              this.properties.value += key.toUpperCase();
            } else {
              this.properties.value = document.querySelector('.use-keyboard-input').value;
              this.properties.value += key.toLowerCase();
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

document.addEventListener('keydown', (event) => {
  const key = document.querySelector(`button[data-key='${event.key}']`);// date attribute
  if (event.key === 'CapsLock') {
    keyboard._toggleCapsLock.call(keyboard);
    key.classList.toggle('keyboard__key_activeted');
  }
  key.classList.toggle('keyboard__key_activeted');
});

document.addEventListener('keyup', (event) => {
  // console.log(event.key);
  // console.log(document.querySelector(`button[data-key='${event.key}']`));
  document.querySelector(`button[data-key='${event.key}']`).classList.toggle('keyboard__key_activeted');
});

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});
