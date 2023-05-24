import { createElement } from "lwc";
import ContactTile from "c/contactTile";

const CONTACT_INPUT = {
  Name: "Amy Taylor",
  Title: "VP of Engineering",
  Phone: "6172559632",
  Picture__c:
    "https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/amy_taylor.jpg"
};

describe("c-contact-tile", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("when contact property not set", () => {
    const element = createElement("c-contact-tile", {
      is: ContactTile
    });
    document.body.appendChild(element);

    const p = element.shadowRoot.querySelector("p");
    expect(p.textContent).toBe("No contact data available.");

    const ll = element.shadowRoot.querySelector("lightning-layout");
    expect(ll).toBe(null);
  });

  it("when contact property set", () => {
    const element = createElement("c-contact-tile", {
      is: ContactTile
    });

    element.contact = CONTACT_INPUT;
    document.body.appendChild(element);

    const imgEl = element.shadowRoot.querySelector("img");
    expect(imgEl.src).toBe(CONTACT_INPUT.Picture__c);

    const pEls = element.shadowRoot.querySelectorAll("p");
    expect(pEls[0].textContent).toBe(CONTACT_INPUT.Name);
    expect(pEls[1].textContent).toBe(CONTACT_INPUT.Title);

    const lfpEl = element.shadowRoot.querySelector("lightning-formatted-phone");
    expect(lfpEl.value).toBe(CONTACT_INPUT.Phone);
  });
});
