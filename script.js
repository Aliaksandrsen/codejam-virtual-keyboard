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
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'Ctrl', 'Alt', 'space', 'Alt', 'Ctrl',
    ];

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>Backspace</span>';

          keyElement.addEventListener('click', () => {
            this.properties.value = document.querySelector('.use-keyboard-input').value;
            this.properties.value = this.properties.value
              .slice(0, this.properties.value.length - 1);
            document.querySelector('.use-keyboard-input').value = this.properties.value;
          });

          break;

        case 'caps':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>CapsLk</span>';

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key_wide');
          keyElement.innerHTML = '<span>Enter</span>';

          keyElement.addEventListener('click', () => {
            this.properties.value = document.querySelector('.use-keyboard-input').value;
            this.properties.value += '\n';
            document.querySelector('.use-keyboard-input').value = this.properties.value;
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key_extra-wide');
          keyElement.innerHTML = '<span> _ </span>';

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
      if (key.childElementCount === 0) {
        if (this.properties.capsLock) {
          key.textContent = key.textContent.toUpperCase();
        } else {
          key.textContent = key.textContent.toLowerCase();
        }
      }
    });
  },
};

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});
