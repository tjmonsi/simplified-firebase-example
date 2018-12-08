import { ObserversLite } from '@tjmonsi/element-lite/mixins/observers-lite';
import { TemplateLite } from '@tjmonsi/element-lite/mixins/template-lite';
import { render, html } from 'lit-html'
import { firebase } from '../../firebase';
import { changeLocation } from '../../change-location';

class PageTodo extends TemplateLite(ObserversLite(HTMLElement)) {
  static get renderer () { return render; }

  static get properties () {
    return {
      todos: {
        type: Array,
        value: []
      },
      user: {
        type: Object,
        value: {},
        observer: '_getTodos'
      }
    }
  }

  template () {
    return html`
      <style>
        .card {
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          padding: 24px;
          margin: 24px auto;
          text-align: center;
        }

        .todo {
          text-align: left;
          margin: 6px 12px;
        }

        ul {
          margin: 0;
          padding: 0;
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

      <div class="card">
        <h2>
          Todos...
        </h2>

        <ul>
        ${this.todos && this.todos.length
          ? this.todos.map(item => html`
            <li class="todo">
              ${item.todo}
            </li>
          `)
          : html`
            No todos yet...
          `}
        </ul>
      </div>
    `;
  }

  constructor () {
    super();
    this._boundHandleTodos = this._handleTodos.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    if (this._ref) {
      this._ref.off('value', this._boundHandleTodos);
    }
  }

  _getTodos () {
    this._ref = firebase.database().ref(`todo/data/${this.user.uid}`);
    this._ref.on('value', this._boundHandleTodos);
  }

  _handleTodos (snap) {
    const todos = [];
    snap.forEach(item => {
      const todo = {
        ...item.val(),
        $key: item.key
      };
      todos.push(todo);
    });
    this.todos = todos;
  }

  async todo (e) {
    e.preventDefault();
    const { shadowRoot, user } = this;
    const snack = document.querySelector('.snackbar');
    const todo = shadowRoot.querySelector('[name=todo]').value;

    try {
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
    snack.showText('Signing Out');
    const snack = document.querySelector('.snackbar');
    await firebase.auth().signOut();
    snack.showText('Signed out');
    changeLocation('/');
  }
}


customElements.define('page-todo', PageTodo);
