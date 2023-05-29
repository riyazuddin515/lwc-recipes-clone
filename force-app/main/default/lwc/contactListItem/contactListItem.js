import { LightningElement, api } from "lwc";

export default class ContactListItem extends LightningElement {
  @api contact;

  handleSelect() {
    this.dispatchEvent(new CustomEvent("select", { detail: this.contact.Id }));
  }
}
