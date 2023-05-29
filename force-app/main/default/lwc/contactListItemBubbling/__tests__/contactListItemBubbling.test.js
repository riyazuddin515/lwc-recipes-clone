import { createElement } from "lwc";
import ContactListItemBubbling from "c/contactListItemBubbling";

const CONTACT_INPUT = {
  Id: "0031700000pJRRSAA4",
  Name: "Amy Taylor",
  Title: "VP of Engineering",
  Phone: "6172559632",
  Eail: "amy@demo.net",
  Picture__c:
    "https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/amy_taylor.jpg"
};

describe("c-contact-list-item-bubbling", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("render contact details", () => {
    const element = createElement("c-contact-list-item-bubbling", {
      is: ContactListItemBubbling
    });
    element.contact = CONTACT_INPUT;
    document.body.appendChild(element);

    const imgEl = element.shadowRoot.querySelector("img");
    expect(imgEl.src).toBe(CONTACT_INPUT.Picture__c);

    const pEl = element.shadowRoot.querySelector("p");
    expect(pEl.textContent).toBe(CONTACT_INPUT.Name);
  });

  it("send contact select event", async () => {
    const element = createElement("c-contact-list-item-bubbling", {
      is: ContactListItemBubbling
    });
    element.contact = CONTACT_INPUT;
    const selectHandler = jest.fn();
    element.addEventListener("contactselect", selectHandler);
    document.body.appendChild(element);

    const lleL = element.shadowRoot.querySelector("lightning-layout");
    lleL.click();

    await Promise.resolve();

    expect(selectHandler.mock.calls.length).toBe(1);
    expect(selectHandler.mock.calls[0][0].bubbles).toBeTruthy();
  });
});
