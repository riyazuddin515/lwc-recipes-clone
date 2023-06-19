import { LightningElement, wire } from "lwc";
import checkApexTypes from "@salesforce/apex/ApexTypesController.checkApexTypes";

export default class ApexWireMethodWithComplexParams extends LightningElement {
  someString = "Some String";
  someInteger = 50;
  someListSize = 0;

  parameters = {
    someString: this.someString,
    someInteger: this.someInteger,
    someList: []
  };

  @wire(checkApexTypes, { wrapper: "$parameters" }) response;

  handleStringChange(event) {
    this.someString = event.target.value;
    this.parameters = { ...this.parameters, someString: this.someString };
  }

  handleIntegerChange(event) {
    this.someInteger = event.target.value;
    this.parameters = { ...this.parameters, someInteger: this.someInteger };
  }

  handleListSizeChange(event) {
    this.someListSize = event.target.value;
    const someList = [];
    for (let i = 0; i < this.someListSize; i++) {
      someList.push(this.someString);
    }
    this.parameters = { ...this.parameters, someList: someList };
  }
}
