import { LightningElement, api } from "lwc";

export default class ErrorPanel extends LightningElement {
  friendlyMessage = "Error while retrieving data";
  @api error;
  show = false;
  errorMessages = [];

  handleShowDetails() {
    this.reduceError();
    this.show = !this.show;
  }

  handleHideDetails() {
    this.show = false;
  }

  reduceError() {
    this.errorMessages = [];
    if (this.error?.body?.message) {
      this.errorMessages = [...this.errorMessages, this.error.body.message];
    }
  }
}
