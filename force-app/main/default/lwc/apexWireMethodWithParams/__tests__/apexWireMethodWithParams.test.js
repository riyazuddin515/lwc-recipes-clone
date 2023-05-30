import { createElement } from "lwc";
import ApexWireMethodWithParams from "c/apexWireMethodWithParams";
import findContacts from "@salesforce/apex/ContactController.findContacts";

const MOCK_RESPONSE = [
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

describe("c-apex-wire-method-with-params", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

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

  it("findContacts @wire data", async () => {
    const element = createElement("c-apex-wire-method-with-params", {
      is: ApexWireMethodWithParams
    });
    document.body.appendChild(element);

    const SEARCH_KEY = "Amy";
    const WIRE_PARMETERS = { searchKey: SEARCH_KEY };

    const liEl = element.shadowRoot.querySelector("lightning-input");
    liEl.value = SEARCH_KEY;
    liEl.dispatchEvent(new CustomEvent("change"));

    jest.runAllTimers();
    await flushPromises();

    expect(findContacts.getLastConfig()).toEqual(WIRE_PARMETERS);
  });
  it("render contact data", async () => {
    const element = createElement("c-apex-wire-method-with-params", {
      is: ApexWireMethodWithParams
    });
    document.body.appendChild(element);

    const SEARCH_KEY = "Amy";

    const liEl = element.shadowRoot.querySelector("lightning-input");
    liEl.value = SEARCH_KEY;
    liEl.dispatchEvent(new CustomEvent("change"));

    jest.runAllTimers();
    findContacts.emit(MOCK_RESPONSE);
    await flushPromises();

    const pEl = element.shadowRoot.querySelectorAll("p");
    expect(pEl.length).toBe(MOCK_RESPONSE.length);
    expect(pEl[0].textContent).toBe(MOCK_RESPONSE[0].Name);
  });
  it("render error panel on error", async () => {
    const element = createElement("c-apex-wire-method-with-params", {
      is: ApexWireMethodWithParams
    });
    document.body.appendChild(element);

    findContacts.error();
    await flushPromises();

    const epEl = element.shadowRoot.querySelector("c-error-panel");
    expect(epEl).not.toBeNull();
  });
});
