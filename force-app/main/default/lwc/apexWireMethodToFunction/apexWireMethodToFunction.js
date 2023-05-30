import { LightningElement, wire } from "lwc";
import getContacts from "@salesforce/apex/ContactController.getContacts";

export default class ApexWireMethodToFunction extends LightningElement {
  contacts;
  error;

  @wire(getContacts)
  WiredContacts({ data, error }) {
    if (data) {
      this.contacts = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.contacts = undefined;
    }
  }
}
