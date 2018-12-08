import { PropertiesLite } from '@tjmonsi/element-lite/mixins/properties-lite';
import { TemplateLite } from '@tjmonsi/element-lite/mixins/template-lite';
import { render, html } from 'lit-html'
import { firebase } from '../../firebase';
import { changeLocation } from '../../change-location';

class PageTodo extends TemplateLite(PropertiesLite(HTMLElement)) {
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
          Todo App
        </h1>
        <form @submit="${this.todo.bind(this)}">
          <input placeholder="Please put your todo" name="todo" required>
          <button>Add Todo</button>
        </form>

        <button @click="${this.logout.bind(this)}">Logout</a>
      </div>
    `;
  }

  async todo (e) {
    e.preventDefault();
    const { shadowRoot } = this;
    const snack = document.querySelector('.snackbar');
    const todo = shadowRoot.querySelector('[name=todo]').value;

    try {
      const user = firebase.auth().currentUser;
      if (!user) {
        snack.showText('Not allowed');
        changeLocation('/');
        return;
      }

      const updates = {};
      const { key } = firebase.database().ref(`todo/data/${user.uid}`).push();
      updates[`todo/data/${user.uid}/${key}`] = {
        todo,
        done: false
      }

      await firebase.database().ref().update(updates);
      shadowRoot.querySelector('[name=todo]').value = ''

      snack.showText('Todo Added Successfully');
    } catch (error) {
      console.log(error);
      snack.showText(error.message);
    }
  }

  async logout () {
    const snack = document.querySelector('.snackbar');
    await firebase.auth().signOut();
    snack.showText('Signed out');
    changeLocation('/');
  }
}


customElements.define('page-todo', PageTodo);
