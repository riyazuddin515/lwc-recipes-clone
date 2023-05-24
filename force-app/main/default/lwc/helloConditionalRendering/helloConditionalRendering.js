import { LightningElement } from "lwc";

export default class HelloConditionalRendering extends LightningElement {
  show = false;

  handleChange(event) {
    this.show = event.target.checked;
  }
}
