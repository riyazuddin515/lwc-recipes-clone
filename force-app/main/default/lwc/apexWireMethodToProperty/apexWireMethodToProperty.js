import { LightningElement, wire } from "lwc";
import getContacts from "@salesforce/apex/ContactController.getContacts";

export default class ApexWireMethodToProperty extends LightningElement {
  @wire(getContacts) contacts;
}
