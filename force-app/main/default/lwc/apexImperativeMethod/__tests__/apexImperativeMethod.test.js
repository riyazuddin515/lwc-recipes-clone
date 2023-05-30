import { createElement } from "lwc";
import ApexImperativeMethod from "c/apexImperativeMethod";
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

const MOCK_ERROR_RESPONSE = {
  body: { message: "An Internal server error has occurred" },
  ok: false,
  status: 400,
  statusText: "Bad Request"
};

describe("c-apex-imperative-method", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    jest.clearAllMocks();
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("render btn and no contacts initially", () => {
    const element = createElement("c-apex-imperative-method", {
      is: ApexImperativeMethod
    });
    document.body.appendChild(element);

    const lbEl = element.shadowRoot.querySelector("lightning-button");
    expect(lbEl).not.toBeNull();

    const p = element.shadowRoot.querySelector("p");
    expect(p).toBeNull();
  });

  it("render contacts on successfull response", async () => {
    getContacts.mockResolvedValue(MOCK_CONTACTS_RESPONSE);

    const element = createElement("c-apex-imperative-method", {
      is: ApexImperativeMethod
    });
    document.body.appendChild(element);

    const lbEl = element.shadowRoot.querySelector("lightning-button");
    lbEl.click();

    await flushPromises();

    const pEl = element.shadowRoot.querySelectorAll("p");
    expect(pEl.length).toBe(MOCK_CONTACTS_RESPONSE.length);
    expect(pEl[0].textContent).toBe(MOCK_CONTACTS_RESPONSE[0].Name);
    expect(pEl[1].textContent).toBe(MOCK_CONTACTS_RESPONSE[1].Name);
  });

  it("render error panel on error response", async () => {
    getContacts.mockRejectedValue(MOCK_ERROR_RESPONSE);

    const element = createElement("c-apex-imperative-method", {
      is: ApexImperativeMethod
    });
    document.body.appendChild(element);

    const lbEl = element.shadowRoot.querySelector("lightning-button");
    lbEl.click();

    await flushPromises();

    const pEl = element.shadowRoot.querySelector("p");
    expect(pEl).toBeNull();

    const epEl = element.shadowRoot.querySelector("c-error-panel");
    expect(epEl).not.toBeNull();
  });
});
