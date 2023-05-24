import { createElement } from "lwc";
import CompositionBasic from "c/compositionBasic";

describe("c-composition-basic", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("render contact tile component", () => {
    const element = createElement("c-composition-basic", {
      is: CompositionBasic
    });
    document.body.appendChild(element);

    const clEl = element.shadowRoot.querySelector("c-contact-tile");
    expect(clEl).not.toBe(null);
  });

  it("render contact with details", () => {
    const CONTACT_INPUT = {
      Name: "Amy Taylor",
      Title: "VP of Engineering",
      Phone: "6172559632",
      Picture__c:
        "https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/amy_taylor.jpg"
    };
    const element = createElement("c-composition-basic", {
      is: CompositionBasic
    });
    document.body.appendChild(element);

    const clEl = element.shadowRoot.querySelector("c-contact-tile");
    expect(clEl.contact.Picture__c).toBe(CONTACT_INPUT.Picture__c);
    expect(clEl.contact.Name).toBe(CONTACT_INPUT.Name);
    expect(clEl.contact.Title).toBe(CONTACT_INPUT.Title);
    expect(clEl.contact.Phone).toBe(CONTACT_INPUT.Phone);
  });
});
