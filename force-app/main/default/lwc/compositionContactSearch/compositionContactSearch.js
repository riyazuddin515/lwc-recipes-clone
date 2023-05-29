import { LightningElement } from "lwc";
import findContacts from "@salesforce/apex/ContactController.findContacts";

const DELAY = 350;

export default class CompositionContactSearch extends LightningElement {
  contacts;
  error;

  handleChange(event) {
    clearTimeout(this.delayTimeout);
    const searchKey = event.target.value;
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.delayTimeout = setTimeout(() => {
      findContacts({ searchKey })
        .then((result) => {
          this.contacts = result;
          this.error = undefined;
          console.log(result);
        })
        .catch((error) => {
          this.error = error;
          this.contacts = undefined;
          console.log(error);
        });
    }, DELAY);
  }
}
