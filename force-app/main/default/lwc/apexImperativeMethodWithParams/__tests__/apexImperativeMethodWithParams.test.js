import { createElement } from "lwc";
import ApexImperativeMethodWithParams from "c/apexImperativeMethodWithParams";
import findContacts from "@salesforce/apex/ContactController.findContacts";

const MOCK_CONTACTS_RESPONSE = [
  {
    Id: "0031700000pJRRSAA4",
    Name: "Amy Taylor",
    Title: "VP of Engineering",
    Phone: "4152568563",
    Email: "amy@demo.net",
    Picture__c:
      "https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/people/amy_taylor.jpg"
  }
];

const MOCK_ERROR_RESPONSE = {
  body: { message: "An internal server error has occurred" },
  ok: false,
  status: 400,
  statusText: "Bad Request"
};

jest.mock(
  "@salesforce/apex/ContactController.findContacts",
  () => {
    const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
    return {
      default: createApexTestWireAdapter(jest.fn())
    };
  },
  { virtual: true }
);

describe("c-apex-imperative-method-with-params", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  async function flushPromises() {
    return Promise.resolve();
  }

  it("render lightning-input and search button", () => {
    const element = createElement("c-apex-imperative-method-with-params", {
      is: ApexImperativeMethodWithParams
    });
    document.body.appendChild(element);

    const liEl = element.shadowRoot.querySelector("lightning-input");
    expect(liEl).not.toBeNull();

    const lbEl = element.shadowRoot.querySelector("lightning-button");
    expect(lbEl).not.toBeNull();
  });

  it("render one contact", async () => {
    const element = createElement("c-apex-imperative-method-with-params", {
      is: ApexImperativeMethodWithParams
    });
    document.body.appendChild(element);

    findContacts.mockResolvedValue(MOCK_CONTACTS_RESPONSE);

    const INPUT = "Amy";
    const PAREMETERS = { searchKey: INPUT };

    const liEl = element.shadowRoot.querySelector("lightning-input");
    liEl.value = INPUT;
    liEl.dispatchEvent(new CustomEvent("change"));

    const lbEl = element.shadowRoot.querySelector("lightning-button");
    lbEl.click();

    await flushPromises();

    expect(findContacts.mock.calls[0][0]).toEqual(PAREMETERS);

    const pEls = element.shadowRoot.querySelectorAll("p");
    expect(pEls.length).toBe(MOCK_CONTACTS_RESPONSE.length);
    expect(pEls[0].textContent).toBe(MOCK_CONTACTS_RESPONSE[0].Name);
  });

  it("render error panel on error response", async () => {
    const element = createElement("c-apex-imperative-method-with-params", {
      is: ApexImperativeMethodWithParams
    });
    document.body.appendChild(element);

    findContacts.mockRejectedValue(MOCK_ERROR_RESPONSE);

    const liEl = element.shadowRoot.querySelector("lightning-input");
    liEl.value = "Amy";
    liEl.dispatchEvent(new CustomEvent("change"));

    const lbEl = element.shadowRoot.querySelector("lightning-button");
    lbEl.click();

    await flushPromises();

    const epEl = element.shadowRoot.querySelector("c-error-panel");
    expect(epEl).not.toBeNull();
  });
});
