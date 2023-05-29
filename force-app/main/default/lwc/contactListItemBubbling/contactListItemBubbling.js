import { LightningElement, api } from "lwc";

export default class ContactListItemBubbling extends LightningElement {
  @api contact;

  handleSelect() {
    this.dispatchEvent(new CustomEvent("contactselect", { bubbles: true }));
  }
}
