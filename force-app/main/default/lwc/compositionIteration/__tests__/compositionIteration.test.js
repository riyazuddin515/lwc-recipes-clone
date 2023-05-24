import { createElement } from "lwc";
import CompositionIteration from "c/compositionIteration";

describe("c-composition-iteration", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("contact tile elements render", () => {
    const element = createElement("c-composition-iteration", {
      is: CompositionIteration
    });
    document.body.appendChild(element);

    const ctEl = element.shadowRoot.querySelectorAll("c-contact-tile");
    expect(ctEl.length).toBe(3);
  });

  it("contact tile elements propery values check", () => {
    const element = createElement("c-composition-iteration", {
      is: CompositionIteration
    });
    document.body.appendChild(element);

    const CONTACT_INPUT = [
      {
        Id: "003171931112854375",
        Name: "Amy Taylor",
        Title: "VP of Engineering",
        Phone: "6172559632",
        Picture__c:
          "https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/amy_taylor.jpg"
      },
      {
        Id: "003192301009134555",
        Name: "Michael Jones",
        Title: "VP of Sales",
        Phone: "6172551122",
        Picture__c:
          "https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/michael_jones.jpg"
      },
      {
        Id: "003848991274589432",
        Name: "Jennifer Wu",
        Title: "CEO",
        Phone: "6172558877",
        Picture__c:
          "https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/jennifer_wu.jpg"
      }
    ];

    element.shadowRoot
      .querySelectorAll("c-contact-tile")
      .forEach((ctEl, index) => {
        expect(ctEl.contact.Picture__c).toBe(CONTACT_INPUT[index].Picture__c);
        expect(ctEl.contact.Name).toBe(CONTACT_INPUT[index].Name);
        expect(ctEl.contact.Title).toBe(CONTACT_INPUT[index].Title);
        expect(ctEl.contact.Phone).toBe(CONTACT_INPUT[index].Phone);
      });
  });
});
