import { LightningElement } from "lwc";

export default class ApiMethod extends LightningElement {
  handleClick() {
    this.template.querySelector("c-clock").refresh();
  }
}
