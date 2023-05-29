import { LightningElement, wire } from "lwc";
import getContacts from "@salesforce/apex/ContactController.getContacts";

export default class EventWithData extends LightningElement {
  @wire(getContacts) contacts;

  selectedContact;

  handleSelect(event) {
    this.selectedContact = this.contacts.data.find(
      (contact) => contact.Id === event.detail
    );
  }
}
