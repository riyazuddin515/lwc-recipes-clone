import { LightningElement } from "lwc";
import getContacts from "@salesforce/apex/ContactController.getContacts";

export default class ApexImperativeMethod extends LightningElement {
  contacts;
  error;

  handleClick() {
    getContacts()
      .then((result) => {
        this.contacts = result;
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
        this.contacts = undefined;
      });
  }
}
