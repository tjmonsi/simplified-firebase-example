import { TemplateLite } from '@tjmonsi/element-lite/mixins/template-lite.js';
import { template } from './template.js';
const { HTMLElement, customElements } = window;

class Component extends TemplateLite(HTMLElement) {
  static get is () { return 'snackbar-lite'; }

  constructor () {
    super();
    this.auto = true;
    this.timeout = 5000;
    this.__timeoutCaller = null;
  }

  template () {
    return `<style>
      @media screen and (max-width: 500px) {
        .snackbar {
          left: 30px;
          right: 30px;
          min-width 200px;
        }
      }
      .snackbar {
        z-index: 100000;
        visibility: hidden; /* Hidden by default. Visible on click */
        min-width: 250px; /* Set a default minimum width */
        background-color: #333; /* Black background color */
        color: #fff; /* White text color */
        text-align: center; /* Centered text */
        border-radius: 2px; /* Rounded borders */
        padding: 16px; /* Padding */
        position: fixed; /* Sit on top of the screen */
        left: 30px;
        bottom: 30px; /* 30px from the bottom */
        border-radius: 10px;
      }

      .snackbar.show {
        visibility: visible;
        animation: fadein 0.5s
      }

      .snackbar.close {
        animation: fadeout 0.5s;
      }


      @keyframes fadein {
        from: {bottom: 0; opacity: 0;}
        to: {bottom: 30px; opacity: 1;}
      }


      @keyframes fadeout {
        from: {bottom: 30px; opacity: 1;}
        to: {bottom: 0; opacity: 0;}
      }

    </style>${template()}`;
  }

  show () {
    const snackbar = this.shadowRoot.querySelector('.snackbar');
    if (this.__timeoutCaller) {
      clearTimeout(this.__timeoutCaller);
      this.__timeoutCaller = null;
      snackbar.classList.remove('show');
    }
    snackbar.classList.remove('close');
    snackbar.classList.add('show');
    if (this.auto) {
      this.__timeoutCaller = setTimeout(() => {
        this.__timeoutCaller = null;
        this.close();
      }, this.timeout);
    }
  }

  showText (text, timeout) {
    this.auto = true;
    this.textContent = text;
    this.timeout = timeout || 5000;
    this.show();
  }

  close () {
    const snackbar = this.shadowRoot.querySelector('.snackbar');
    snackbar.classList.add('close');
    setTimeout(() => {
      snackbar.classList.remove('show');
      snackbar.classList.remove('close');
    }, 500);
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
