import { LightningElement } from 'lwc';

export default class HelloBinding extends LightningElement {

    inp = 'World';

    handleChange(event) {
        this.inp = event.target.value;
    }
}