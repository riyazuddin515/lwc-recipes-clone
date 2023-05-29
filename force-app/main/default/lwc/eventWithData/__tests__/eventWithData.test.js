import { createElement } from "lwc";
import EventWithData from "c/eventWithData";
import getContacts from "@salesforce/apex/ContactController.getContacts";

const MOCK_CONTACTS_RESPONSE = [
  {
    Id: "0031700000pJRRSAA4",
    Name: "Amy Taylor",
    Title: "VP of Engineering",
    Phone: "4152568563",
    Email: "amy@demo.net",
    Picture__c:
      "https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/amy_taylor.jpg"
  },
  {
    Id: "0031700000pJRRTAA4",
    Name: "Michael Jones",
    Title: "VP of Sales",
    Phone: "4158526633",
    Email: "michael@demo.net",
    Picture__c:
      "https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/michael_jones.jpg"
  }
];

jest.mock(
  "@salesforce/apex/ContactController.getContacts",
  () => {
    const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
    return {
      default: createApexTestWireAdapter(jest.fn())
    };
  },
  { virtual: true }
);

describe("c-event-with-data", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("render c-contact-list-item elements", async () => {
    const element = createElement("c-event-with-data", {
      is: EventWithData
    });
    document.body.appendChild(element);

    getContacts.emit(MOCK_CONTACTS_RESPONSE);

    await flushPromises();
    const ctlEls = element.shadowRoot.querySelectorAll("c-contact-list-item");
    expect(ctlEls.length).toBe(MOCK_CONTACTS_RESPONSE.length);
  });

  it("render error panel on @wire error", async () => {
    const element = createElement("c-event-with-data", {
      is: EventWithData
    });
    document.body.appendChild(element);

    getContacts.error();

    await flushPromises();

    const epEl = element.shadowRoot.querySelector("c-error-panel");
    expect(epEl).not.toBeNull();
  });

  it("show selected contact details after event fire", async () => {
    const element = createElement("c-event-with-data", {
      is: EventWithData
    });
    document.body.appendChild(element);

    getContacts.emit(MOCK_CONTACTS_RESPONSE);

    await flushPromises();

    const cliEl = element.shadowRoot.querySelectorAll("c-contact-list-item");
    cliEl[0].dispatchEvent(
      new CustomEvent("select", { detail: MOCK_CONTACTS_RESPONSE[0].Id })
    );

    await flushPromises();

    const imgEl = element.shadowRoot.querySelector("img");
    expect(imgEl).not.toBeNull();

    const pEl = element.shadowRoot.querySelectorAll("p");
    expect(pEl.length).toBe(4);

    expect(pEl[0].textContent).toBe(MOCK_CONTACTS_RESPONSE[0].Name);
    expect(pEl[1].textContent).toBe(MOCK_CONTACTS_RESPONSE[0].Title);
  });
});
