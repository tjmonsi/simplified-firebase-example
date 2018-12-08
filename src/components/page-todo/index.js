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
      },
      main: {
        type: String,
        value: ''
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

        input[type=checkbox] {
          display: inline-block;
          width: auto;
          margin-right: 12px;
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
          ${this.main ? html`Newly created Status: ${this.main}` : 'Todos...'}
        </h2>

        <ul>
        ${this.todos && this.todos.length
          ? this.todos.map(item => html`
            <li class="todo">
              <input type="checkbox" .checked="${item.done}" value="${item.$key}" @click="${this.toggleTodo.bind(this)}">
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
    this._boundHandleMainStatus = this._handleMainStatus.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    if (this._ref) this._ref.off('value', this._boundHandleTodos);
    if (this._mainRef) this._mainRef.off('value', this._boundHandleMainStatus);
  }

  _getTodos () {
    if (this.user && this.user.uid) {
      this._ref = firebase.database().ref(`todo/data/${this.user.uid}`);
      this._ref.on('value', this._boundHandleTodos, this._handleErrors);
      this._mainRef = firebase.database().ref(`status/data/${this.user.uid}`);
      this._mainRef.on('value', this._boundHandleMainStatus, this._handleErrors);
    }
  }

  _handleErrors (error) {
    const snack = document.querySelector('.snackbar');
    snack.showText(error.message);
  }

  _handleMainStatus (snap) {
    this.main = snap.val();
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

  async toggleTodo (e) {
    const { target } = e;
    const { value, checked } = target;
    const snack = document.querySelector('.snackbar');
    if (this.user) {
      await firebase.database().ref(`todo/data/${this.user.uid}/${value}/done`).set(checked);
      snack.showText(!checked ? 'Todo Undone' : 'Todo Done');
    }
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
