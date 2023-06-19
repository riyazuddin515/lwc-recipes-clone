import { LightningElement, wire } from "lwc";
import { getSObjectValue } from "@salesforce/apex";
import getContact from "@salesforce/apex/ContactController.getContact";

import NAME_FIELD from "@salesforce/schema/Contact.Name";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import TITLE_FIELD from "@salesforce/schema/Contact.Title";

export default class ApexStaticSchema extends LightningElement {
  @wire(getContact) contact;

  get name() {
    return this.contact.data
      ? getSObjectValue(this.contact.data, NAME_FIELD)
      : "";
  }
  get email() {
    return this.contact.data
      ? getSObjectValue(this.contact.data, EMAIL_FIELD)
      : "";
  }
  get title() {
    return this.contact.data
      ? getSObjectValue(this.contact.data, TITLE_FIELD)
      : "";
  }
}
