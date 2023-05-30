import { LightningElement, wire } from "lwc";
import findContacts from "@salesforce/apex/ContactController.findContacts";

export default class ApexWireMethodWithParams extends LightningElement {
  searchKey = "";

  @wire(findContacts, { searchKey: "$searchKey" }) contacts;

  handleSearch(event) {
    const searchKey = event.target.value;
    clearTimeout(this.delayTimeout);
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.delayTimeout = setTimeout(() => {
      this.searchKey = searchKey;
    }, 350);
  }
}
