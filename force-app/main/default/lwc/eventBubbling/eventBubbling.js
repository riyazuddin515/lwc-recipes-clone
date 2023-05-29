import { LightningElement, wire } from "lwc";
import getContacts from "@salesforce/apex/ContactController.getContacts";

export default class EventBubbling extends LightningElement {
  @wire(getContacts) contacts;

  selectedContact;

  handleContactSelect(event) {
    this.selectedContact = event.target.contact;
  }
}
