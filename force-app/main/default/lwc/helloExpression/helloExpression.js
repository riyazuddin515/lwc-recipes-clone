import { LightningElement } from "lwc";

export default class HelloExpression extends LightningElement {
  firstName = "";
  lastName = "";

  handleChange(event) {
    if (event.target.name === "firstName") {
      this.firstName = event.target.value;
    } else {
      this.lastName = event.target.value;
    }
  }
  get upperCaseFullName() {
    return `${this.firstName} ${this.lastName}`.trim().toUpperCase();
  }
}
