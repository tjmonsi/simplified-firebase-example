import { PropertiesLite } from '@tjmonsi/element-lite/mixins/properties-lite';
import { TemplateLite } from '@tjmonsi/element-lite/mixins/template-lite';
import { render, html } from 'lit-html'
import { firebase } from '../../firebase';

class PageCreateAccount extends TemplateLite(PropertiesLite(HTMLElement)) {
  static get renderer () { return render; }
  template () {
    return html`
      <style>
        .card {
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          padding: 24px;
          margin: 24px auto;
          text-align: center;
        }

        input {
          display: block;
          padding: 12px;
          border: 1px solid black;
          margin: 12px 0;
          width: 100%;
          box-sizing: border-box;
        }

        form {
          padding: 24px;
        }

        button {
          background: teal;
          color: white;
          padding: 12px 24px;
          border: 0;
        }
      </style>
      <div class="card">
        <h1>
          Signup
        </h1>
        <form @submit="${this.signup.bind(this)}">
          <input placeholder="Email" name="email" type="email" required>
          <input placeholder="Password" name="password" type="password" required>

          <button>Signup</button>
        </form>

        <a href="/">Login</a>
      </div>
    `;
  }

  async signup (e) {
    e.preventDefault();
    const { shadowRoot } = this;
    const snack = document.querySelector('.snackbar');
    const email = shadowRoot.querySelector('[name=email]').value;
    const password = shadowRoot.querySelector('[name=password]').value;
    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if (user) {
        snack.showText('Created account for ' + email);
      }
    } catch (error) {
      console.log(error);
      snack.showText(error.message);
    }

  }
}

customElements.define('page-create-account', PageCreateAccount);
