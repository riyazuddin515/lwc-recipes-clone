import { createElement } from "lwc";
import CompositionContactSearch from "c/compositionContactSearch";
import findContacts from "@salesforce/apex/ContactController.findContacts";

// Mocking imperative Apex method call
jest.mock(
  "@salesforce/apex/ContactController.findContacts",
  () => {
    return {
      default: jest.fn()
    };
  },
  { virtual: true }
);

// Sample data for imperative Apex call
const APEX_CONTACTS_SUCCESS = [
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

// Sample error for imperative Apex call
const APEX_CONTACTS_ERROR = {
  body: { message: "An internal server error has occurred" },
  ok: false,
  status: 400,
  statusText: "Bad Request"
};

describe("c-composition-contact-search", () => {
  beforeEach(() => {
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

  it("no contact tile render initially", () => {
    const element = createElement("c-composition-contact-search", {
      is: CompositionContactSearch
    });
    document.body.appendChild(element);

    const contactTiles = element.shadowRoot.querySelectorAll("c-contact-tile");
    expect(contactTiles.length).toBe(0);
  });

  it("render contact tile based on user input", async () => {
    const USER_INP = "amy";

    findContacts.mockResolvedValue(APEX_CONTACTS_SUCCESS);

    const element = createElement("c-composition-contact-search", {
      is: CompositionContactSearch
    });
    document.body.appendChild(element);

    const inputEl = element.shadowRoot.querySelector("lightning-input");
    inputEl.valu = USER_INP;
    inputEl.dispatchEvent(new CustomEvent("change"));

    jest.runAllTimers();

    await flushPromises();

    const contactTile = element.shadowRoot.querySelector("c-contact-tile");
    expect(contactTile).not.toBeNull();
    expect(contactTile.contact.Name).toBe(APEX_CONTACTS_SUCCESS[0].Name);
  });

  it("render error panel on error received from apex", async () => {
    const USER_INP = "amy";

    findContacts.mockRejectedValue(APEX_CONTACTS_ERROR);

    const element = createElement("c-composition-contact-search", {
      is: CompositionContactSearch
    });
    document.body.appendChild(element);

    const inputEl = element.shadowRoot.querySelector("lightning-input");
    inputEl.valu = USER_INP;
    inputEl.dispatchEvent(new CustomEvent("change"));

    jest.runAllTimers();

    await flushPromises();

    const errorPanel = element.shadowRoot.querySelector("c-error-panel");
    expect(errorPanel).not.toBeNull();
  });
});
