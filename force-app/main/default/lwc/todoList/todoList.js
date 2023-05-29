import { LightningElement, api } from "lwc";

export default class TodoList extends LightningElement {
  _todos = [];
  filteredTodos = [];
  priority = false;

  @api
  get todos() {
    return this._todos;
  }
  set todos(value) {
    this._todos = value;
    this.filterTodos();
  }

  handleChange(event) {
    this.priority = event.target.checked;
    this.filterTodos();
  }

  filterTodos() {
    if (this.priority) {
      this.filteredTodos = this._todos.filter((todo) => todo.priority === true);
    } else {
      this.filteredTodos = this._todos;
    }
  }
}
