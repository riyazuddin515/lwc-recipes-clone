import { LightningElement } from "lwc";

export default class ApiSetterGetter extends LightningElement {
  todos = [
    { id: 1, description: "Explore recipes", priority: true },
    { id: 2, description: "Install Ebikes sample app", priority: false }
  ];

  description;
  priority = false;

  handleChange(event) {
    if (event.target.label === "Description") {
      this.description = event.target.value;
    } else if (event.target.label === "Priority") {
      this.priority = event.target.checked;
    }
  }
  handleAddTodo() {
    this.todos = [
      ...this.todos,
      {
        id: this.todos.length + 1,
        description: this.description,
        priority: this.priority
      }
    ];
    this.description = "";
    this.priority = false;
  }
}
